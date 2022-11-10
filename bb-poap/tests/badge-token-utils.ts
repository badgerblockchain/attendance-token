import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Approval, Transfer } from "../generated/BadgeToken/BadgeToken"

export function createApprovalEvent(
  tokenOwner: Address,
  spender: Address,
  tokens: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenOwner",
      ethereum.Value.fromAddress(tokenOwner)
    )
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )

  return approvalEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokens: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )

  return transferEvent
}
