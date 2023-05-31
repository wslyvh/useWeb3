---
title: "Polynomials 101"
description: "You can't understand ZKPs without understanding polynomials"
authors: ["@iam_preethi"]
tags: ["ZKP","Cryptography"]
languages: []
url: "https://www.zkcamp.xyz/blog/you-cant-understand-zkps-without-understanding-polynomials"
dateAdded: 2023-05-30
level: "Advanced"
---

You know how data structures and algorithms are pretty much Computer Science 101? They’re fundamental to just about everything in the field. Well, polynomials are just as fundamental to zero knowledge proofs (ZKPs).

In case you need a primer, ZKPs let us prove a fact without revealing the fact. You can read my [ZKP 101 post](https://www.zkcamp.xyz/blog/what-is-a-zkp-anyway) for all the details. But before we get into level 201, there’s a bit of math and cryptography we should cover.

In this blog post, we’ll focus on the math that makes ZKPs possible: Polynomials. Why? Because they’re really helpful in three major ways:

- They can encode an unbounded amount of data
- They can encode relationships between data
- They let us efficiently check whether two pieces of data are the same
