package com.blockchain.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blockchain.demo.model.Block;
import com.blockchain.demo.model.Blockchain;
import com.blockchain.demo.model.TransactionsResult;
import com.blockchain.demo.service.BlockchainService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/v1/")
@CrossOrigin("*")
public class NAMApiController {
    private Blockchain blockchain ;
    private BlockchainService blockchainService;

    @GetMapping(path="/blocks/{index}")
    public ResponseEntity<Block > getBlock(@PathVariable int index){
        if(index < blockchain.getBlockchain().size()) {
            Block block = blockchain.getBlockchain().get(index);
            return ResponseEntity.ok().body(block) ;
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping(path = "/blockchain")
    public ResponseEntity<Blockchain> getBlockchain(){
        return ResponseEntity.ok().body(blockchain);
    }

    @GetMapping("/transactions")
    public ResponseEntity<TransactionsResult> getTransactions(@RequestParam(defaultValue = "1") int page) {
        TransactionsResult result = blockchainService.getTransactions(blockchain, page);
        return ResponseEntity.ok().body(result);
    }


}
