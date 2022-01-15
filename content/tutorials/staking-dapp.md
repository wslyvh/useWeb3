---
title: 'Staking dApp'
description: 'The end goal of the project is to mimic the Ethereum 2.0 staking contract using scaffold-eth.'
authors: ['@StErMi']
tags: ['Dapp','Smart Contracts']
languages: ['Solidity','JavaScript']
url: 'https://stermi.medium.com/how-to-write-your-first-decentralized-app-scaffold-eth-challenge-1-staking-dapp-b0b6a6f4d242'
dateAdded: 2021-09-01
level: 'Intermediate'
date: 2021-08-31
---

In this blog post, I’m going to cover the first scaffold-eth speed run project: creating a Staking dApp. If you want to know more about scaffold-eth and my current journey in the web3 world you should read my previous article: My journey in Web3 development: scaffold-eth.

The goal of the dApp
The end goal of the project is to mimic the Ethereum 2.0 staking contract. The requirements are pretty simple:
- allow anyone to stack ether and track their balance
- if a time and stack amount deadline have reached don’t allow - users to withdraw their fund (those found are used for a future project, like the Ethereum PoS)