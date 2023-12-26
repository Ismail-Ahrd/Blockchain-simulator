import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Snippet,
} from "@nextui-org/react";
import forge from "node-forge";
import { useNavigate } from "react-router";
import { Keys } from "../model/Types.js";
import { CopyIcon } from "./CopyIcon";
import { CheckIcon } from "./CheckIcon";
export default function Connect() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [keys, setKeys] = useState<Keys>();
  const generateKeyPair = async (): Promise<Keys> => {
    const rsaKeyPair = await forge.pki.rsa.generateKeyPair({ bits: 1024 });
    const privateKey = forge.pki.privateKeyToPem(rsaKeyPair.privateKey);
    const publicKey = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);

    return { privateKey, publicKey };
  };
  async function createAccount() {
    const generatedKeys = await generateKeyPair();
    setKeys({
      publicKey: forge.util.encode64(generatedKeys.publicKey + ""),
      privateKey: forge.util.encode64(generatedKeys.privateKey + ""),
    });
    localStorage.setItem(
      "publicKey",
      forge.util.encode64(generatedKeys.publicKey + "")
    );
    localStorage.setItem(
      "privateKey",
      forge.util.encode64(generatedKeys.privateKey + "")
    );
    onOpen();
  }
  function close() {
    console.log("her");
    navigate("/home");
  }

  return (
    <>
      <Button className="w-[250px] py-8 bg-[#808080]" onPress={createAccount} color="primary">
        Create Account
      </Button>
      <Modal className="bg-[#3b3636]" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Account
              </ModalHeader>
              <ModalBody>
                <Snippet
                  variant="bordered"
                  className="text-slate-300 overflow-x-hidden justify-end text-start p-2 flex flex-wrap"
                  copyIcon={<CopyIcon className="self-center" />}
                  checkIcon={<CheckIcon />}
                >
                  {keys.publicKey}
                </Snippet>
                <Snippet
                  variant="bordered"
                  copyIcon={<CopyIcon />}
                  checkIcon={<CheckIcon />}
                  className="text-slate-300 overflow-x-hidden p-2 justify-end flex flex-wrap"
                >
                  {keys.privateKey}
                </Snippet>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="bg-[#C73848] text-white " variant="flat" onPress={close}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
