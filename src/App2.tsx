import axios from "axios";
import { useState, useRef } from "react";
import { Keys, Transaction } from "./model/Types";
import endPoint from "./service/endPoint";
import { KEYUTIL, KJUR, RSAKey, hextob64u, b64tohex } from "jsrsasign";
import forge from "node-forge";
const App = () => {
 
  const [balance, setBalance] = useState<number>(0);
  const receiver = useRef<HTMLInputElement | null>(null);
  // const receiver = useRef<HTMLInputElement | null>(null);
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
    const res = await axios.post(
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


  // async function getNam(){

  // }
  // const verifySignature = (publicKey, message, signature) => {
  //   try {
  //     const signatureHex = b64tohex(signature);

  //     console.log("signature2", signatureHex);
  //     // Initialize the RSA public key
  //     const rsaKey = KEYUTIL.getKey(publicKey);

  //     // Create a new Signature object
  //     const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });

  //     // Initialize the Signature object with the public key
  //     sig.init(rsaKey);

  //     // Update the Signature object with the message
  //     sig.updateString(message);

  //     // Verify the signature
  //     const isValid = sig.verify(signatureHex);

  //     return isValid;
  //   } catch (error) {
  //     console.error("Error verifying signature:", error);
  //     return false;
  //   }
  // };

  const [blockchain, setBlockchain] = useState(null);
  async function getBlockChain() {
    const res = await axios.get("http://192.168.43.136:8080/api/v1/blockchain");
    setBlockchain(res.data.blockchain);
    console.log(res.data.blockchain);
  }
  return (
    <div>
      <button onClick={getBalance}>Get balance</button> <br />
      <button onClick={getBlockChain}>Get blockchain</button>
      <button onClick={createAccount}>Create Account</button>
      <div>{localStorage?.publicKey}</div>
      <br />
      <button onClick={getInitialAmountOfNam}>Get 40 NAM</button>
      <div>{balance || 0} NAM</div> *
      <form action="" onSubmit={(evt) => sendTransaction(evt)}>
        {/* <label htmlFor="sender">
          <input type="text" id="sender" ref={sender} />
        </label> */}
        <label htmlFor="receiver">
          <input type="text" id="receiver" ref={receiver} />
        </label>
        <label htmlFor="amount">
          <input type="text" name="NAM" id="amount" ref={amount} />
        </label>
        <button>Send</button>
      </form>
      <br />
      <br />
      <pre>{JSON.stringify(blockchain)}</pre>
    </div>
  );
};

export default App;
