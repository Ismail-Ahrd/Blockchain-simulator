import React, { useState } from "react";
import Connect from "./Connect.jsx";
import { Button } from "@nextui-org/react";
import Block from "./Block.jsx"
import SignUp from "./SignUp";

const Sign = () => {
  return (
    <div className="w-full overflow-x-hidden flex h-screen justify-center items-center gap-6 px-40">
      <div className="flex flex-col gap-16 pl-10">
        <Connect />
        <SignUp />
      </div>
      <Block/>
    </div>
  );
};

export default Sign;
