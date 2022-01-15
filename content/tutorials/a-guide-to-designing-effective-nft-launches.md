---
title: 'A Guide to Designing Effective NFT Launches'
description: 'This article starts with real-world examples of NFT launches and explores the design space for well-designed launch mechanisms for the community to use and build on.'
authors: ['@paradigm','@hasufl','@_anishagnihotri']
tags: ['NFT']
languages: []
url: 'https://www.paradigm.xyz/2021/10/a-guide-to-designing-effective-nft-launches/'
dateAdded: 2021-10-16
date: 2021-10-13
---

Blockchains revolutionized fundraising for open-source software, but not everything worked right from the start. In fact, ICOs of the 2016-2018 era were often horribly broken mechanisms that allowed founders to cash out before delivering any products. Many lessons have been learned since, with today’s projects having a working product before launching a token and distributing it to incentivize usage and decentralize governance.

NFTs are proving to be another clear product-market-fit for crypto, but they are experiencing their own growing pains. The life of every NFT begins in an NFT launch (also sometimes called a mint or drop). An NFT launch is where a new collection is first created, sold, and distributed to buyers, who then decide to hold or trade it in secondary markets.

Like any item that goes on sale for the first time, NFT launches face the challenge of pricing something that has never had a price before. But unlike most other sales, they have the added difficulty of taking place in a highly adversarial environment full of idiosyncrasies that already alienate inexperienced users—a public blockchain. As a result, developers have to design mechanisms that are efficient and robust to exploitation.

This article starts with real-world examples of launches that empirically hurt their users to identify what goals a good launch should satisfy. Next, we deconstruct the idea of a launch into individual steps, exploring the design space for each of them. Finally, we provide a reference implementation of what we think is one well-designed launch mechanism for the community to use and build on.