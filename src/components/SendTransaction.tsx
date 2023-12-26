import React, { useEffect, useRef, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Snippet} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import { IoIosRefresh } from "react-icons/io";
import axios from "axios";
import {LockIcon} from './LockIcon.jsx';
import { CopyIcon } from "./CopyIcon";
import { CheckIcon } from "./CheckIcon";
import { Transaction } from "../model/Types.js";
import { useNavigate } from "react-router";
import { ethers } from "ethers";
import { Wallet } from "ethers";
import { Signer } from "ethers";

const API_URL="http://localhost:8080";

export default function App() {
  const navigate = useNavigate();

  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [balance, setBalance] = useState<number>(0);
  const receiver = useRef<HTMLInputElement | null>(null);
  const amount = useRef<HTMLInputElement | null>(null);
  
  useEffect(()=>{
    getBalance();
  },[balance])
  async function getBalance() {
    const res = await axios.get(
      `${API_URL}/api/v1/balances/${localStorage.getItem(
        "publicKey"
      )}`
    );
    setBalance(res.data.balance);
  }
  async function getInitialAmountOfNam() {
    await axios.post(
      `${API_URL}/api/v1/nam/${localStorage.getItem(
        "publicKey"
      )}`
    );

    setBalance((prev) => prev + 40);
  }
  const deconnect =()=>{
    localStorage.removeItem("publicKey")
    localStorage.removeItem("privateKey")
    navigate("/")
  }

  // async function signMessage(privateKey:string, message:string) {
  //   const wallet = new ethers.Wallet(privateKey);
  //   const signature = await wallet.signMessage(message);
  //   return signature;
  // }
  async function signMessage(privateKey: string, message: string) {
    const wallet = new Wallet(privateKey);

    // Sign the message and obtain the signature

    // Use the Signer class to get the raw signature
    const signer: Signer = wallet.connect(wallet.provider);
    const rawSignature = await signer.signMessage(message);

    // Convert the raw signature to a hex string
    const formattedSignature = ethers.hexlify(ethers.toBeArray(rawSignature));

    return formattedSignature;
}

  async function sendTransaction() {
    console.log("seeeeeeeeeeend");
    const sender=localStorage.getItem("publicKey") + "";
    const receiverValue=receiver.current?.value + "";
    const amountValue=Number(amount.current?.value);

    const signature=await signMessage(localStorage.getItem("privateKey") + "", sender+receiverValue+amount)
    console.log({
      sender: sender,
      receiver: receiverValue,
      amount: amountValue,
      signature: signature,
    });
    
    const result = await axios
      .post(`${API_URL}/api/v1/transactions`, {
        sender: sender,
        receiver: receiverValue,
        amount: amountValue,
        signature: signature,
      })
      .catch((err) => console.log(err));
      getBalance()
  }

  return (
    <>
    <div className="flex gap-6 items-center">
      <div className="flex items-center">Balance : {balance} NAM <button onClick={getBalance} className="text-[#C73848] ml-2" color="primary"><IoIosRefresh size={23}/></button></div>
      {/* <Button onPress={getBalance} className="w-[200px] py-6 bg-[#808080]" color="primary">Refresh Balance</Button> */}
      <Button onPress={getInitialAmountOfNam} className="w-[200px] py-6 bg-[#808080]" color="primary">get Some Amount Of Nam</Button>

      <Button onPress={onOpen} className="w-[200px] py-6 bg-[#C73848] text-white" color="primary">Send Transaction</Button>
      <Button onPress={deconnect} className="w-[200px] py-6 bg-[#808080]" color="primary">Deconnect</Button>
      <div className="flex gap-3 items-center">
        PublicKey: 
        <Snippet
          variant="bordered"
          className="text-slate-300 w-[300px] overflow-x-hidden justify-start text-start p-2 flex flex-wrap"
          copyIcon={<CopyIcon className="self-center" />}
          checkIcon={<CheckIcon />}
        >
          {localStorage.getItem("publicKey")}
        </Snippet>
      </div>

    </div>
      <Modal 
      className="bg-[#252323]"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Send a Transaction</ModalHeader>
              <ModalBody>    
                <form className="flex flex-col gap-6" >
                  <Input className="text-white" variant="bordered" size="md" type="text" label="Receiver" placeholder="Enter the receiver publicKey" ref={receiver}/>
                  <Input className="text-white" variant="bordered" size="md" type="number" label="Amount" placeholder="Enter the amount" ref={amount}/>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="bg-[#C73848] text-white " variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" className="bg-[#808080]" onPress={sendTransaction}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
