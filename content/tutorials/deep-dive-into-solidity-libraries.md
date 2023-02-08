---
title: "Deep Dive Into Solidity Libraries"
description: "In this article we will look at how the EVM interprets libraries, and walk through an example of how to create one."
authors: ["@marqymarq10"]
tags: ["Smart Contracts"]
languages: ["Standards", "Solidity"]
url: "https://coinsbench.com/deep-dive-into-solidity-libraries-e9bd7f9061fb"
dateAdded: 2023-02-11
level: "Beginner"
---

Libraries are similar to smart contracts, but, typically, are only deployed once. Their code is reused by taking advantage of delegatecall(). This means that the context of the code is executed in the calling contract. The library functions will not be explicitly visible in the inheritance hierarchy. The use of delegatecall() can allow us to access state variables from our calling smart contract. However, since libraries are an isolated piece of code, you must supply the state variables for the library to access them.