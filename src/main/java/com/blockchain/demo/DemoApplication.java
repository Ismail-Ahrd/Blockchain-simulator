package com.blockchain.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.blockchain.demo.model.Blockchain;
import com.blockchain.demo.service.BlockchainService;

@SpringBootApplication
public class DemoApplication {
	@Autowired
	private BlockchainService blockchainService ;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public Blockchain initBLockChain(){
		return blockchainService.blockchainInit(4, 2, 40) ;
	}

}
