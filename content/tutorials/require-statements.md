---
title: "You're writing require statements wrong"
description: "A new pattern for DeFi Smart Contract Security"
authors: ["@brockjelmore"]
tags: ["Security", "Smart Contracts", "Design Patterns"]
languages: ["Solidity"]
url: "https://www.nascent.xyz/idea/youre-writing-require-statements-wrong"
dateAdded: 2023-08-01
level: "Intermediate"
---

Don't just write require statements for a specific function; write require statements for your protocol. Function Requirements-Effects-Interactions + Protocol Invariants or the FREI-PI pattern can help make your contracts safer by forcing developers to focus on protocol level invariants in addition to function level safety.