import axios from "axios";
import React, { useState, useRef } from "react";
import { Transaction } from "../model/Types";
import TableComponent from "./TableComponent"
import SendTransaction from "./SendTransaction"

const Home = () => {
  

  return (
    <div className="w-screen flex flex-col gap-6 items-center justify-center min-h-screen">
      <SendTransaction/>
      <TableComponent/>
    </div>
  );
};

export default Home;
