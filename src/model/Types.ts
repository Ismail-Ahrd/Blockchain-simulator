import { signMessage } from "../service/signTransaction";
import forge from "node-forge";
export type Keys = {
  publicKey: string;
  privateKey: string;
};

export class Transaction {
  sender: string;
  receiver: string;
  amount: number;
  signature: string;
  constructor(sender: string, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.signature = this.signTransaction();
  }

  signTransaction(): any {
    return (
      signMessage(
        forge.util.decode64(localStorage.getItem("privateKey") + ""),
        this.sender,
        this.receiver,
        this.amount
      ) || ""
    );
  }
}
