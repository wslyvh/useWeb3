---
title: "Formally Verifying The World’s Most Popular Smart Contract"
description: "Proving the safety of the Wrapped ETH smart contract, using the Z3 Theorem Prover"
authors: ["@gf_256"]
tags: ["Smart Contracts","Security",'Formal Verification']
languages: ['Solidity']
url: "https://www.zellic.io/blog/formal-verification-weth"
dateAdded: 2022-11-30
level: "Intermediate"
---

Wrapped ETH, or WETH, is one of Ethereum’s most popular smart contracts. While WETH serves a simple purpose, a significant portion of all Ethereum transactions depend on it. WETH now underpins large parts of DeFi. In this blog post, we prove critical safety guarantees and invariants within the WETH contract. We do so by leveraging Z3, a battle-tested SMT solver.