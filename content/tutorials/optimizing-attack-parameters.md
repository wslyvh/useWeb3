---
title: 'Optimizing Attack Parameters'
description: 'How to Get a Bigger Bounty by Optimizing Attack Parameters'
authors: ['@bobface16','@immunefi']
tags: ['Security','DeFi']
languages: []
url: 'https://medium.com/immunefi/how-to-get-a-bigger-bounty-by-optimizing-attack-parameters-a51b144f5cc2'
dateAdded: 2021-09-24
level: 'Advanced'
date: 2021-09-15
---

Imagine the following scenario: you just found a critical vulnerability that allows funds in a smart contract to be drained. The exploit, however, is complicated and requires multiple payload parameters to be set correctly for it to be effective or even profitable at all.

It quickly turns out that calculating optimal parameters by hand is infeasible, due to the complex nature of the exploit. And yet, you want to responsibly disclose a Proof of Concept (PoC) that maximizes the amount of funds that can be drained from the contract. Why? Because it’s often true that the greater the funds at risk, the higher the bug bounty reward.

In such a situation, linear programming can be an exceptionally helpful tool. This is an advanced tutorial for whitehats who are looking to take their hacking skills to the next level.