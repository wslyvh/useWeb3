---
title: "STARKs: Scaling decentralized games"
description: "Verifying complex auto battler calculation on Ethereum"
authors: ["@Qhuesten"]
tags: ["Smart Contracts","Scalability","Cryptography"]
languages: ["Cairo"]
url: "https://killari.medium.com/starks-verifying-a-complex-auto-battler-calculation-on-ethereum-d8698f29808d"
dateAdded: 2021-11-23
level: "Advanced"
date: 2021-10-06
---

Executing complex functions on chain Ethereum has always been a big no-no, something that you should never do. Blockchain computation is very expensive as all the nodes are needed to execute the same calculation to verify its correctness.

StarkWare is one of the Ethereum scaling services that is attempting to scale Ethereum using STARKs (Scalable Transparent ARgument of Knowledge) proofs. I will not go too deep into how STARKs work in this blogpost, but I am going to give a practical overview on how they can be used in practice.