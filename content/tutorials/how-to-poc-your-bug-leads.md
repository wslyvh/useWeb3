---
title: 'How to PoC your Bug Leads'
description: 'In this tutorial you’ll learn how to use a forked environment via Hardhat, to write a PoC for the Alchemix Access Control Exploit.'
authors: ['@immunefi']
tags: ['Smart Contracts','Security']
languages: ['Solidity']
url: 'https://medium.com/immunefi/how-to-poc-your-bug-leads-5ec76abdc1d8'
level: 'Advanced'
date: 2021-10-12
---

Picture this scenario: you’ve spent the entire day fruitlessly examining smart contract code. And now you’ve stumbled across a snippet of code that makes your Spidey-Senses tingle. You get excited. Could this be the bug that makes you a million dollars, turns you into a hall of fame legendary hacker, and changes your life forever?

But you’re not 100% sure. How can you tell if that potential vulnerability you just found is critical or non-critical?

You need to know if there’s a real issue at hand. You don’t want to sound the alarm bell for a false positive.

Enter the proof-of-concept (PoC). If the bug is valid, a PoC quickly confirms this.

Having a PoC will also make your bug report easier to follow and much more likely for the project to take it seriously. Not only do they know that the exploit is definitely real, but a PoC often demonstrates the magnitude of the potential damage, which helps to get bug hunters much, much larger rewards.