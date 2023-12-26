import React, { useEffect, useRef, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Snippet} from "@nextui-org/react";
import { IoIosRefresh } from "react-icons/io";
import axios from "axios";
import { CopyIcon } from "./CopyIcon";
import { CheckIcon } from "./CheckIcon";
import { Transaction } from "../model/Types.js";
import { useNavigate } from "react-router";
import { useMemo } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const API_URL = "http://localhost:8080"

export default function App() {
  const [page, setPage] = React.useState(1);

  const trim=(ch)=>{
    if(ch.length>=40){
      return ch.substring(0,40)+"..."
    }
    else return ch;
  }

  const {data, isLoading,mutate} = useSWR(`${API_URL}/api/v1/transactions?page=${page}`, fetcher, {
    keepPreviousData: true,
  });
  console.log(data);

  const rowsPerPage = 8;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading ? "loading" : "idle";
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
    mutate(`${API_URL}/api/v1/transactions?page=${1}`);
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
  async function sendTransaction() {
    console.log("seeeeeeeeeeend");
    
    const transaction: Transaction = new Transaction(
      localStorage.getItem("publicKey") + "",
      receiver.current?.value + "",
      Number(amount.current?.value)
    );
    const result = await axios
      .post(`${API_URL}/api/v1/transactions`, {
        sender: transaction.sender,
        receiver: transaction.receiver,
        amount: transaction.amount,
        signature: transaction.signature,
      })
      .catch((err) => alert(err.response.data.message));
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
      <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="sender">sender</TableColumn>
        <TableColumn key="receiver">receiver</TableColumn>
        <TableColumn key="amount">amount</TableColumn>
        <TableColumn key="signature">signature</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.results ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow  key={item?.sender+data?.results.indexOf(item)}>
            {(columnKey) => <TableCell className="">{trim(getKeyValue(item, columnKey))}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  );
}
