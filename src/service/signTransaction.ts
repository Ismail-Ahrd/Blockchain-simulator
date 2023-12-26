import forge from "node-forge";

export const signMessage = (
  privateKey: string,
  sender: string,
  receiver: string,
  amount: number
) => {
  try {
    const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey);
    const md = forge.md.sha256.create();
    md.update(sender + receiver + amount, "utf8");
    const signature = rsaPrivateKey.sign(md);
    const signatureBase64 = forge.util.encode64(signature);
    return signatureBase64;
  } catch (error) {
    console.error("Error signing message:", error);
    return null;
  }
};


