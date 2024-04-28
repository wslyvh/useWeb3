---
title: "web3.py Patterns: Bloom Filters"
description: "This post will quickly describe Bloom filters, how they're leveraged in Ethereum, and how to filter blocks for events in Python."
authors: ["@wolovim"]
tags: ["Smart Contracts","Dapp", "Design Patterns"]
languages: ["Python"]
url: "https://snakecharmers.ethereum.org/bloom-filters/"
dateAdded: 2024-04-28
level: "Intermediate"
---

Have you ever queried an Ethereum block and wondered what that "logsBloom" was? Have you gone looking for the most efficient way to find an event within a block? If you answered "yes" to either of the above, then you're in for a good time. This post will quickly describe Bloom filters, how they're leveraged in Ethereum, and how to filter blocks for events in Python.