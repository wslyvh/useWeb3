---
title: 'Uniswap v2 Code walk-through'
description: 'Uniswap v2 can create an exchange market between any two ERC-20 tokens. In this article we will go over the source code for the contracts that implement this protocol.'
authors: ['@ori_pomerantz']
tags: ['Smart Contracts','Tokens']
languages: ['Solidity']
url: 'https://ethereum.org/en/developers/tutorials/uniswap-v2-annotated-code/'
dateAdded: 2021-11-15
level: 'Intermediate'
date: 2021-05-01
---

Basically, there are two types of users: liquidity providers and traders.

The liquidity providers provide the pool with the two tokens that can be exchanged (we'll call them Token0 and Token1). In return, they receive a third token that represents partial ownership of the pool called a liquidity token.

Traders send one type of token to the pool and receive the other (for example, send Token0 and receive Token1) out of the pool provided by the liquidity providers. The exchange rate is determined by the relative number of Token0s and Token1s that the pool has. In addition, the pool takes a small percent as a reward for the liquidity pool.

When liquidity providers want their assets back they can burn the pool tokens and receive back their tokens, including their share of the rewards.