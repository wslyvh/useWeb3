---
title: "Flavours of On-Chain SVG NFTs"
description: "Store NFT visuals as SVG in the data URI, so it does not need ancillary infrastructure to support it."
authors: ["@simondlr"]
tags: ["Smart Contracts","NFT"]
languages: ["Solidity"]
url: "https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum"
dateAdded: 2021-09-24
levels: ["Intermediate"]
date: 2021-08-25
---

NFTs, as unique items on the blockchain, has a URI that points to data containing the metadata & the corresponding visuals. This URI can be an HTTP link, pointing to a video or image hosted on a normal server, or other services like IPFS (hash-based addresses), or Arweave (incentivized hosting of hash-based content).

There is another way, however, a format that's become increasingly popular: the usage of a data URI. These URIs contain all the information within it. There is thus no server at the other end. Using data URIs has allowed NFT creators to experiment with putting all the content related to an NFT 'on-chain'. It adds a vector of permanence to the art. If Ethereum continues, it does not need ancillary infrastructure to support it. A common format, currently, is to store the NFT visuals as SVG in the data URI, since most browsers are able to natively parse it.

It's fun, and due to some of the constraints of smart contract coding (limited execution & expensive storage), it becomes in itself a game of gas golf, trying to pack as much as one can into the architecture to create dynamic art that will live (currently) forever on Ethereum.