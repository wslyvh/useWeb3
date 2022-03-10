---
title: "Fetch data from Ethereum with SWR"
description: "How to Fetch and Update Data From Ethereum with React and SWR"
authors: ["@aboutlo"]
tags: ["Dapp"]
languages: ["JavaScript"]
url: "https://consensys.net/blog/developers/how-to-fetch-and-update-data-from-ethereum-with-react-and-swr/"
dateAdded: 2021-08-17
levels: ["Intermediate"]
date: 2020-06-18
---

Ethereum allows us to build decentralized applications (dapps). The main difference between a typical application and a dapp is that you don’t need to deploy a backend—at least as long as you take advantage of the other smart contracts deployed on the Ethereum mainnet.

Because of that, the frontend plays a major role. It is in charge of marshaling and unmarshaling the data from the smart contracts, handling the interactions with the wallet (hardware or software) and, as usual, managing the UX. Not only that, by design, a dapp uses JSON-RPC calls and it can open a socket connection to receive updates.

As you can see there are a few things to orchestrate but don’t worry, the ecosystem has matured quite a lot in the last few months.