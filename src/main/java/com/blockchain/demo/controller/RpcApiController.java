package com.blockchain.demo.controller;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blockchain.demo.model.Blockchain;
import com.blockchain.demo.model.Transaction;
import com.blockchain.demo.service.BlockchainService;
import com.blockchain.demo.service.GenerateKeyPair;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/v1/")
@CrossOrigin("*")
public class RpcApiController {
    private GenerateKeyPair gKeyPair;
    private Blockchain blockchain ;
    private BlockchainService blockchainService;
    
    @PostMapping(path = "/accounts")
    public Map<String, String> createAccount() throws NoSuchAlgorithmException {
        Map<String, String> keys = gKeyPair.generateKeyPair();
        blockchain.getListUsers().add(keys.get("publicKey"));
        return keys;
    }



    @PostMapping("/nam/{publicKey}")
    public ResponseEntity<Map<String,String>> receiveNAM(@PathVariable String publicKey) {
        Transaction transaction = new Transaction("system", publicKey, blockchain.getIntitialBalance(), "");
        System.out.println("_______________");
        System.out.println("Public Key:");
        System.out.println(publicKey);
        System.out.println("_______________");
        boolean added = blockchainService.addTransaction(blockchain, transaction);
        Map<String,String> map = new HashMap<>();
        if(!added) {
            map.put("message", "verification failed");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(map);
        }
        while(blockchain.getTransactionsPool().size() != 0) {
            //System.out.println("Size:"+blockchain.getTransactionsPool().size());
        }
        map.put("message", "success");
        return ResponseEntity.ok().body(map);
    }

    @PostMapping("/transactions")
    public ResponseEntity<Map<String,String>> addTransaction(@RequestBody Transaction transaction) {
        Map<String,String> map = new HashMap<>();
        if (transaction.getSender().equals(transaction.getReceiver())) {
            map.put("message", "you can't send transaction to yourself!");
        }
        boolean added = blockchainService.addTransaction(blockchain, transaction);
        
        if(!added) {
            System.out.println("not added");
            map.put("message", "verification failed");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(map);
        }
        while(blockchain.getTransactionsPool().size() != 0) {
            System.out.println("Amount: " + transaction.getAmount());
        }
        map.put("message", "success");
        return ResponseEntity.ok().body(map);
    }


    @GetMapping("/balances/{publicKey}")
    public ResponseEntity<Map<String,Double>> getBalance(@PathVariable String publicKey) {
        double balance = blockchainService.getBalance(blockchain, publicKey);
        Map<String,Double> map = new HashMap<>();
        map.put("balance", balance);    
        return ResponseEntity.ok().body(map);   
    }


    @PostMapping("/test")
    public boolean test(@RequestBody Test p) {
        System.out.println("Hello");
        System.out.println(p.publicKey);
        boolean test = gKeyPair.verifySignature(p.publicKey, p.message, p.signature);
        return test;
    }


}

class Test {
    String publicKey;
    String signature;
    String message;
    Test(
        String publicKey,
        String signature,
        String message) {
            this.message= message;
            this.publicKey=publicKey;
            this.signature=signature;
    }
}