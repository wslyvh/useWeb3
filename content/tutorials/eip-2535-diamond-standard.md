---
title: 'EIP-2535 Diamond standard'
description: 'EIP-2535: A standard for organizing and upgrading a modular smart contract system.'
authors: ['@gorgos']
tags: ['Smart Contracts']
languages: ['Solidity']
url: 'https://soliditydeveloper.com/eip-2535'
level: 'Advanced'
date: 2021-10-16
---

The EIP-2535 standard has several projects already using it, most notably Aavegotchi holding many millions of dollars.

What is it and should you use it instead of the commonly used proxy upgrade pattern?

We're not talking about diamond programmer hands here of course. A diamond refers to a smart contract system where functionality and storage is split up into separate contracts. You might already be familiar with the upgrade proxy pattern. It shares some similarities to a diamond. In short to fix the problem of smart contracts not being upgradable due to their immutability, a proxy pattern deploys two contracts.