---
title: "A Low-Level Guide To Solidity's Storage Management"
description: "Learn how the EVMs storage system works by interacting with it through smart contracts using solidity's inline assembly/yul, taking you a step closer to bridging the gap between high and low level programming!"
authors: ["@DeGatchi"]
tags: ["Smart Contracts","Security","EVM"]
languages: []
url: "https://degatchi.com/articles/low_level_guide_to_soliditys_storage_management"
dateAdded: 2023-03-03
level: "Intermediate"
---

We'll walkthrough each encounter you will face by learning deal with them using bitwise operations alongside SLOAD and SSTORE to control the EVMs storage at will.

### Storage

Storage is a persistent mapping with 2^256 - 1 available 32 byte words for each contract. When you set a state variable’s value it stores it at the assigned slot where it will remain in the EVM unless overriden with another value of the same type.