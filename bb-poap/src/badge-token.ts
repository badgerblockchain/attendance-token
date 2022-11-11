import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent,
} from "../generated/BadgeToken/BadgeToken"
import { BadgeToken, Transfer } from "../generated/schema"

// export function handleApproval(event: ApprovalEvent): void {
//   let approval = new Approval(event.params._event.toHex());
//   if (!approval) {
//     approval.address_from = event.params.owner.toString();
//     approval.address_to = event.params.spender;
//     approval.number_tokens = event.params.value;
//   }
//   approval.save()
// }

export function handleTransfer(event: TransferEvent): void {
  let transfer = BadgeToken.load(event.params.tokenOwner.toString());
  if (!transfer) {
    transfer.address_from = event.params.from
    transfer.address_to = event.params.to
    transfer.number_tokens = event.params.value
  }
  transfer.save()
}
