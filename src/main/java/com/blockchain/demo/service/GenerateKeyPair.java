package com.blockchain.demo.service;

import java.security.KeyFactory;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;


import org.springframework.stereotype.Service;

@Service
public class GenerateKeyPair {
    public Map<String,String> generateKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator=KeyPairGenerator.getInstance("RSA");
        var keyPair=keyPairGenerator.generateKeyPair();
        byte[] pub = keyPair.getPublic().getEncoded();
        byte[] pri = keyPair.getPrivate().getEncoded();
        String publicKeyBase64 = Base64.getEncoder().encodeToString(pub);
        String privateKeyBase64 = Base64.getEncoder().encodeToString(pri);
        Map<String, String> keyPairMap = new HashMap<>();
        keyPairMap.put("publicKey", publicKeyBase64);
        keyPairMap.put("privateKey", privateKeyBase64);
        return keyPairMap;
    }


    public boolean verifySignature(String publicKeyString, String message, String signature) {
        try {
             // Decode Base64 string to byte array
            byte[] decodedBytes = Base64.getDecoder().decode(publicKeyString);

            // Convert byte array to PEM format
            String pemString = new String(decodedBytes);

            System.out.println("____________");
            System.out.println("signature");
            System.out.println(signature);
            System.out.println("_______________");

            System.out.println("____________");
            System.out.println("Public key:");
            System.out.println(publicKeyString);
            System.out.println("_______________");

            byte[] signatureBytes = Base64.getDecoder().decode(signature);

            System.out.println("____________");
            System.out.println("signatureBytes key:");
            System.out.println(signatureBytes);
            System.out.println("_______________"); 

            // Decode the PEM string to get the actual Base64-encoded public key
            String base64EncodedKey = pemString
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");  
            
            
            System.out.println("____________");
            System.out.println("base64EncodedKey key:");
            System.out.println(base64EncodedKey);
            System.out.println("_______________");    

            // Decode the base64 public key to bytes
            byte[] publicKeyBytes = Base64.getDecoder().decode(base64EncodedKey);

            System.out.println("____________");
            System.out.println("publicKeyBytes key:");
            System.out.println(publicKeyBytes);
            System.out.println("_______________");   

            // Create a public key specification
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);

    

            // Get the RSA public key from the specification
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicKey = keyFactory.generatePublic(keySpec);

            // Initialize the signature object with the public key
            Signature sign = Signature.getInstance("SHA256withRSA");
            sign.initVerify(publicKey);

            // Update the signature object with the message
            sign.update(message.getBytes());

            // Verify the signature
            return sign.verify(signatureBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
    




