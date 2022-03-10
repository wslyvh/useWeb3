---
title: "SMTChecker: (almost) practical superpower"
description: "A tool that performs formal verification of your contract: you define a specification and SMTChecker formally proves that the contract conforms to the spec."
authors: ["@owpckcr"]
tags: ["Security","Smart Contracts"]
languages: ["Solidity"]
url: "https://medium.com/@sblowpckcr/smtchecker-almost-practical-superpower-5a3efdb3cf19"
dateAdded: 2021-09-01
levels: ["Advanced"]
date: 2021-08-31
---

Would you bet your firstborn that the contract you just deployed doesn’t have critical vulnerabilities? If you’re like me, the answer is a resounding ‘no’.
I’ve seen enough hacks in traditional software engineering to know that you can never be 100% sure. That is scary, but a combination of different techniques can get us pretty close to the desired level of confidence. SMTChecker is one of them.