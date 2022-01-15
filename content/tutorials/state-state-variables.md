---
title: 'State & State Variables'
description: 'Solidity Basics: An Introduction To State In Solidity And How To Change It'
authors: ['@paul_can_code']
tags: ['Smart Contracts']
languages: ['Solidity']
url: 'https://blog.paulmcaviney.ca/state-variables'
dateAdded: 2021-11-15
level: 'Beginner'
date: 2021-11-06
---

One of the great things about blockchains are their ability to store data in their distributed ledger systems. This is typically done through transactions, and once accepted, they form part of a block and then permanently become part of the blockchain. When the information is part of the blockchain it is immutable, meaning there is a permanent record of that transaction that can never be deleted or modified.

The Ethereum Blockchain however is more advanced than this. It can store blocks of code called smart contracts and through the Ethereum Virtual Machine (EVM) can execute the code stored in these contracts. This effectively allows for the modification of the EVM's state from block to block. Due to the immutability aspect, the previous state is still in the records of the blockchain, albeit in the form of hexadecimal hashes instead of human-readable text.

In this article we will write a simple smart contract with a function we can use to change its state. Before we get into coding though, it is important to understand a few concepts around contract state and transactions.