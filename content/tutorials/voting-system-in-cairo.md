---
title: 'Voting system in Cairo'
description: 'In this guide we will write Cairo code for a small voting system, which can be used, for example, to run a secure (non-private) voting with a lot of voters.'
authors: ['@CairoLang']
tags: ['Smart Contracts','Scalability']
languages: ['Cairo']
url: 'https://www.cairo-lang.org/docs/hello_cairo/voting.html'
level: 'Intermediate'
---

In this section we will write Cairo code for a small voting system. This voting system can be used, for example, to run a secure (non-private) voting with a lot of voters on a blockchain. We will assume that each voter has a pair of private and public keys (for the ECDSA signature scheme) and that the list of voters’ public keys is fixed. Each voter may vote “Yes” (1) or “No” (0). The system will not guarantee anonymity.

This section assumes some basic knowledge of cryptographic primitives such as hash functions, digital signatures and Merkle trees. In addition, if you haven’t already read the previous parts of the “Hello, Cairo” tutorial, you are encouraged to do so before reading this part.