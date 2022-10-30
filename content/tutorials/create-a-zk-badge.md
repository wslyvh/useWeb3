---
title: "Create your ZK Badge"
description: "This tutorial will walk you through the creation of your first ZK Badge for your app or your community"
authors: ["@sismo_eth"]
tags: ["Cryptography","Privacy", "NFT"]
languages: ['JavaScript']
url: "https://docs.sismo.io/sismo-docs/devs-tutorials/create-your-zk-badge-in-15-minutes"
dateAdded: 2022-10-29
level: "Beginner"
---

A Badge is a Non-Transferable Token (ERC-1155) that can only be minted by an eligible group of users for this ZK Badge (groups of addresses or web2 accounts).

A (ZK) Badge is related to two accounts: the source account (address or web2 account), from which the user will generate a proof of eligibility and a destination account (address) where the user will receive the badge. The (ZK) proof of eligibility is verified on-chain by a smart contract called a (ZK) Attester.

ZK Badges use ZK Proofs and are privacy preserving, from a badge held on a destination account, no one can infer which source account was used!