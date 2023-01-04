import {
  BadgeToken,
  Transfer as TransferEvent,
} from "../generated/BadgeToken/BadgeToken";
import { Holder, Token, Transfer } from "../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  const btAddress = BadgeToken.bind(event.address);

  // get or create token entity
  let token = Token.load(event.address);
  if (!token) {
    token = new Token(event.address);
    const tryName = btAddress.try_name();
    const trySymbol = btAddress.try_symbol();
    const tryDecimals = btAddress.try_decimals();
    const tryTotalSupply = btAddress.try_totalSupply();
    token.name = tryName.reverted ? "Unknown" : tryName.value;
    token.symbol = trySymbol.reverted ? "Unknown" : trySymbol.value;
    token.decimals = tryDecimals.reverted ? -1 : tryDecimals.value;
    token.totalSupply = tryTotalSupply.reverted
      ? BigInt.fromI32(0)
      : tryTotalSupply.value;
    token.transferCount = 0;
    token.uniqueHolderCount = 0;
    token.save();
  }
  token.transferCount += 1;
  token.save();

  // get or create holders entity
  let toHolder = Holder.load(event.params.to);
  if (!toHolder) {
    toHolder = new Holder(event.params.to);
    toHolder.balance = BigDecimal.fromString("0");
    toHolder.token = token.id;
    toHolder.save();

    token.uniqueHolderCount += 1;
    token.save();
  }
  let fromHolder = Holder.load(event.params.from);
  if (!fromHolder) {
    fromHolder = new Holder(event.params.to);
    fromHolder.balance = BigDecimal.fromString("0");
    fromHolder.token = token.id;
    fromHolder.save();

    token.uniqueHolderCount += 1;
    token.save();
  }

  // update holder balances
  const tryFromBalance = btAddress.try_balanceOf(event.params.from);
  const tryToBalance = btAddress.try_balanceOf(event.params.to);
  fromHolder.balance = tryFromBalance.reverted
    ? fromHolder.balance
    : tryFromBalance.value.toBigDecimal().div(BigDecimal.fromString("1000000000000000000"));
  toHolder.balance = tryToBalance.reverted
    ? toHolder.balance
    : tryToBalance.value.toBigDecimal().div(BigDecimal.fromString("1000000000000000000"));;
  fromHolder.save();
  toHolder.save();

  // get or create transfer entity
  const transfer = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.token = token.id;
  transfer.amount = event.params.tokens;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;
  transfer.hash = event.transaction.hash;
  transfer.save();
}
