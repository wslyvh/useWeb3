---
title: 'Optimizing your contract’s gas usage'
description: 'We will look into tuning and optimizing our Solidity contract to minimize the amount of gas required.'
authors: ['@cipherzzz']
tags: ['Smart Contracts']
languages: ['Solidity']
url: 'https://medium.com/coinmonks/optimizing-your-solidity-contracts-gas-usage-9d65334db6c7'
dateAdded: 2021-09-01
level: 'Intermediate'
date: 2018-04-05
---

As everyone in the Ethereum community knows, Gas is a necessary evil for the execution of smart contracts. If you specify too little, your transaction may not get picked up for processing in a timely manner — or, die in the middle of processing a smart contract action. That being said, a smart contract should not be greedy or loose with the valuable resources that the users entrust to them. It is for this reason that we will look into tuning and optimizing our contract to minimize the amount of gas required.