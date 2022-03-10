---
title: "Ethereum private keys attacks"
description: "This article is an introduction to possible attacks against cryptography algorithms used in blockchains and is to arouse your curiosity about cryptography."
authors: ["@pierre_ia"]
tags: ["Cryptography","Security"]
languages: []
url: "https://medium.com/@pierreia/quick-tour-on-ethereum-private-keys-attacks-3082846b7632"
dateAdded: 2022-01-10
levels: ["Intermediate"]
date: 2021-12-26
---

Your entire Ethereum (and almost every other blockchains) wallet is accessible by your private key, which is basically a random 256 bits long number. In fact, you could enter any 32 hex characters long key, and import an account to your Metamask for example. If you want to try this out, there are two ways: some websites like https://keys.lol/ allow you to see random private keys, and even compute their balance. However, I’d be tempted to think that if you use such websites to compute a private key, you’ll probably won’t be able to withdraw from one whose balance is not zero, as there’s a high chance the website installed a bot that filters the latter and instantly transfers the funds to another address, such as the website owner’s.