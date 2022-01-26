---
title: "Solidity Gas Optimizations Pt. 3 - Packing Structs"
description: "How to pack structs efficiently to save gas in Solidity"
authors: ["@javier123454321"]
tags: ["Smart Contracts"]
languages: ["Solidity"]
url: "https://dev.to/javier123454321/solidity-gas-optimizations-pt-3-packing-structs-23f4"
dateAdded: 2021-10-03
level: "Intermediate"
date: 2021-10-03
---

Packing structs is one of the ways you can optimize your smart contracts, especially if you will be doing multiple read and writes to storage in the same operation. Here we go over how, and some of the caveats associated with this method. 