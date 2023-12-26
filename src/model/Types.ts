import { signMessage } from "../service/signTransaction";
import forge from "node-forge";
export type Keys = {
  publicKey: string;
  privateKey: string;
};
import { ethers } from "ethers";
export class Transaction {
  sender: string;
  receiver: string;
  amount: number;
  signature: Promise<any>;
  constructor(sender: string, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.signature =this.signTransaction() ;
  }
  async signMessage(privateKey:string, message:string) {
    const wallet = new ethers.Wallet(privateKey);
    const signature = await wallet.signMessage(message);
    return signature;
  }

  async signTransaction(): Promise<any> {
    return (
      await this.signMessage(localStorage.getItem("privateKey") + "",this.sender+this.receiver+this.amount)
    );
  }
}
