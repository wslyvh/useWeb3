---
title: 'Circom language tutorial with circomlib walkthrough'
description: 'This tutorial introduces the Circom language and how to use it, along with common pitfalls'
authors: ['@Jeyffre', 'rareskills_io']
tags: ['ZKP', 'Cryptography', 'Privacy']
languages: ['Circom', 'Solidity']
url: 'https://www.rareskills.io/post/circom-tutorial'
dateAdded: 2023-10-03
level: 'Intermediate'
---

Circom is a fantastic tool for learning zk-snarks. However, because it is quite low-level, there are more opportunities to accidentally add subtle bugs. In real applications, programmers should consider using higher level zero knowledge programming languages. You should always get an audit before deploying a smart contract that holds user funds, but this is especially true for zk circuits, as the attack vectors are less well known.
