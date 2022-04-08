---
title: "Authenticating Rails users with MetaMask "
description: "This article is a complete step-by-step deep-dive to securely establish a Ruby-on-Rails user session with an Ethereum account instead of a password."
authors: ["@q9fmz"]
tags: ["Dapp", 'UX & Design', 'DevEx']
languages: ["Ruby"]
url: "https://dev.to/q9/finally-authenticating-rails-users-with-metamask-3fj"
dateAdded: 2022-04-08
level: "Beginner"
---

It's not a secret that passwords are a relic from a different century. However, modern cryptography provides us with far better means to authenticate with applications, such as Ethereum's Secp256k1 public-private key pairs. This article is a complete step-by-step deep-dive to securely establish a Ruby-on-Rails user session with an Ethereum account instead of a password. In addition, it aims to explain how it's done by providing code samples and expands on the security implications.