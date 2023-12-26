import React, { useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { LockIcon } from "./LockIcon";
import forge from "node-forge";
import { useNavigate } from "react-router";

export default function Connect() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const privateKey = useRef();
  function connect() {
    const key = privateKey.current.value;
    localStorage.setItem("privateKey", key);
    const decodeKey = forge.util.decode64(key);
    const publicKey = forge.util.encode64(
      forge.pki.publicKeyToPem(
        forge.pki.setRsaPublicKey(
          forge.pki.privateKeyFromPem(decodeKey).n,
          forge.pki.privateKeyFromPem(decodeKey).e
        )
      )
    );
    //#4E4E4E
    localStorage.setItem("publicKey", publicKey);
    navigate("/home");
    
  }
  return (
    <>
      <Button className="w-[250px] py-8 bg-[#C73848] text-white" onPress={onOpen} color="">
        Connect
      </Button>
      <Modal className="bg-[#3b3636]" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Connect</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus 
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Private Key"
                  placeholder="Enter your private key"
                  variant="bordered"
                  type="password"
                  className="placeholder:text-white text-white"
                  ref={privateKey}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="bg-[#C73848] text-white " variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" className="bg-[#808080]" onPress={connect}>
                  connect
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
