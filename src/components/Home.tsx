import axios from "axios";
import React, { useState, useRef } from "react";
import { Transaction } from "../model/Types";

const Home = () => {
  const [balance, setBalance] = useState<number>(0);
  const receiver = useRef<HTMLInputElement | null>(null);
  const amount = useRef<HTMLInputElement | null>(null);

  async function getBalance() {
    const res = await axios.get(
      `http://192.168.43.136:8080/api/v1/balances/${localStorage.getItem(
        "publicKey"
      )}`
    );
    setBalance(res.data.balance);
  }
  async function getInitialAmountOfNam() {
    await axios.post(
      `http://192.168.43.136:8080/api/v1/nam/${localStorage.getItem(
        "publicKey"
      )}`
    );

    setBalance((prev) => prev + 40);
  }

  async function sendTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const transaction: Transaction = new Transaction(
      localStorage.getItem("publicKey") + "",
      receiver.current?.value + "",
      Number(amount.current?.value)
    );
    const result = await axios
      .post("http://192.168.43.136:8080/api/v1/transactions", {
        sender: transaction.sender,
        receiver: transaction.receiver,
        amount: transaction.amount,
        signature: transaction.signature,
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="p-5 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            className="border-solid border-2 rounded-lg border-black p-2"
            onClick={getBalance}
          >
            Get balance
          </button>
          <button
            className="border-solid border-2 rounded-lg border-black p-2"
            onClick={getInitialAmountOfNam}
          >
            Get 40 NAM
          </button>
        </div>
        <div className="border-solid border-2 rounded-lg border-black p-2 bg-blue-500">
          {" "}
          Balance : {balance} NAM
        </div>
      </div>
      <form action="" onSubmit={(evt) => sendTransaction(evt)}>
        {/* <label htmlFor="sender">
            <input type="text" id="sender" ref={sender} />
          </label> */}
        <label htmlFor="receiver">
          <input
            className="border-solid border-black border-2"
            type="text"
            id="receiver"
            ref={receiver}
          />
        </label>
        <label htmlFor="amount">
          <input
            className="border-solid border-black border-2"
            type="text"
            name="NAM"
            id="amount"
            ref={amount}
          />
        </label>
        <button>Send</button>
      </form>
    </>
  );
};

export default Home;
