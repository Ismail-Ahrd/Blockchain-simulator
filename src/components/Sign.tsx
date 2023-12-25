import React, { useState } from "react";
import Connect from "./Connect.jsx";
import { Button } from "@nextui-org/react";

import SignUp from "./SignUp";

const Sign = () => {
  return (
    <div>
      <Connect />
      <SignUp />
    </div>
  );
};

export default Sign;
