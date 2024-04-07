---
title: "web3.py Patterns: WebSocketProvider"
description: "In this post, we're diving into the new and improved WebSocketProvider. We'll introduce the WebSocket protocol, why the WebSocketProvider got a makeover, and how to use the new features."
authors: ["@wolovim", "fselmo2"]
tags: ["Smart Contracts","Dapp", "Design Patterns"]
languages: ["Python"]
url: "https://snakecharmers.ethereum.org/websocketprovider/"
dateAdded: 2024-04-07
level: "Intermediate"
---

Included in the (beta) release of web3.py v7 are some important and exciting updates to the asynchronous providers:

- The AsyncIPCProvider is live.
- WebsocketProviderV2 has graduated from beta and been renamed to WebSocketProvider (note the capital S).
- The original WebsocketProvider has been deprecated and renamed to LegacyWebSocketProvider.