---
title: "Gas Optimizations for the Rest of Us"
description: "The basics of optimizing Solidity contracts, explained for regular coders."
authors: ["@m1guelpf"]
tags: ["Smart Contracts"]
languages: ["Solidity"]
url: "https://m1guelpf.blog/d0gBiaUn48Odg8G2rhs3xLIjaL8MfrWReFkjg8TmDoM"
dateAdded: 2022-04-08
level: "Intermediate"
---

Writing smart contracts is hard. Not only do you get a single chance to write bug-free code, but depending on exactly how you write, it’ll cost your users more or less to interact with it.

When you compile a smart contract, every line of Solidity gets converted into a series of operations (called opcodes), which have a set gas cost. Your goal is to write your program using as little opcodes as possible (or replace the most expensive with cheaper ones).

Of course, this is all very complex, so let’s take it slowly. Instead of going down the opcode rabbit hole, here are some simple optimizations you can apply to your contracts today.