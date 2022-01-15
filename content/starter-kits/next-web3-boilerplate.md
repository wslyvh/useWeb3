---
title: "Next Web3 boilerplate"
description: "Slightly opinionated Web3 boilerplate based on Next.js and SWR"
authors: ["@mirshko"]
tags: ["Smart Contracts","Dapp"]
languages: ["Solidity","JavaScript"]
url: "https://github.com/mirshko/next-web3-boilerplate"
dateAdded: 2021-09-16
level: "All"
---

This is a default Next.js project bootstrapped with create-next-app, customized as the default boilerplate for new Web3 projects.

Features
- Separate packages from ethers.js for improved tree-shaking, often only ethers Contracts
- Hooks-first approach to fetching and caching data from Contracts and memoization for performance with SWR
- web3-react for ease of connecting to Web3 providers with a solid API
- Auto-generates types for the contract ABIs in the /contracts folder via TypeChain