import axios from "axios";
import React, { useState, useRef } from "react";
import { Transaction } from "../model/Types";
import TableComponent from "./TableComponent"
import SendTransaction from "./SendTransaction"

const Home = () => {
  

  return (
    <div className="w-screen flex pt-20 flex-col gap-6 items-center min-h-screen">
      <SendTransaction/>
    </div>
  );
};

export default Home;
