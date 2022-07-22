---
title: "Let’s play EVM Puzzles"
description: "A collection of EVM puzzles. Each puzzle consists on sending a successful transaction to a contract. The bytecode of the contract is provided, and you need to fill the transaction data that won’t revert the execution."
authors: ["@StErMi"]
tags: ["Smart Contracts",'Security','EVM']
languages: ["Solidity"]
url: "https://stermi.medium.com/lets-play-evm-puzzles-learning-ethereum-evm-while-playing-43a8354a02b3"
dateAdded: 2022-07-22
level: "Intermediate"
date: 2022-06-09
---

In this blog post, I’m going to cover the first scaffold-eth speed run project: creating a Staking dApp. If you want to know more about scaffold-eth and my current journey in the web3 world you should read my previous article: My journey in Web3 development: scaffold-eth.

The goal of the dApp
The end goal of the project is to mimic the Ethereum 2.0 staking contract. The requirements are pretty simple:
- allow anyone to stack ether and track their balance
- if a time and stack amount deadline have reached don’t allow - users to withdraw their fund (those found are used for a future project, like the Ethereum PoS)