---
title: "Learn how to code elliptic curve cryptography"
description: "This article gives an introduction to understanding elliptic curve cryptography and coding it."
authors: ["@wieblebub"]
tags: ["Cryptography","Security"]
languages: []
url: "https://medium.com/coinmonks/learn-how-to-code-elliptic-curve-cryptography-a952dfdc20ab"
dateAdded: 2022-04-08
level: "Intermediate"
---

As most of you probably have some crypto assets on your own, you might have heard of the words ‘public key’ and ‘private key’. In a blockchain network, the public key kind of works as your address. If anyone else in the network wants to send you some funds, he or she is going to send it to your public key. Your private key can be seen as your signature — whenever you like to make a transaction of funds, you prove that you are the one owning the private key belonging to your public key without showing it to anyone in the network. Participants of the network, who check your transaction, can prove that you, with your public key, are the owner of the private key, without even knowing what it is. Pretty cool! But how does this really work on a more fundamental level? Let’s dig a little bit into the theory.