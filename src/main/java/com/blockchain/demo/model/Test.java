package com.blockchain.demo.model;
import java.util.Base64;


public class Test {

    public static void main(String[] args) {
        String base64String = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1CNHdEUVlKS29aSWh2Y05BUUVCQlFBRERRQXdDZ0lEQUpVdkFnTUJBQUU9DQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0NCg==";
        
        // Decode Base64 string to byte array
        byte[] decodedBytes = Base64.getDecoder().decode(base64String);

        // Convert byte array to PEM format
        String pemString = new String(decodedBytes);

        System.out.println("PEM String:\n" + pemString);
    }
}
