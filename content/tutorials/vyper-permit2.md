---
title: "Vyper Permit2 Tutorial"
description: "Permit21 is a contract that allows using Permit signatures2 with any token. You just approve a Permit2 contract once and then you can use it with any contract that integrates it."
authors: ["@bantg"]
tags: ["Smart Contracts", "Design Patterns"]
languages: ["Python", "Vyper"]
url: "https://banteg.xyz/posts/vyper-permit2/"
dateAdded: 2024-04-28
level: "Intermediate"
---

Permit21 is a contract that allows using Permit signatures2 with any token. You just approve a Permit2 contract once and then you can use it with any contract that integrates it.

It solves a crucial UX problem, but it has seen quite slow adoption. Possibly because its documentation leaves the developers scratching their heads instead of giving them an idea how to integrate Permit2 in their contracts.

This tutorial will teach you how to use Permit2 contract from Vyper and Python using copy and paste method.