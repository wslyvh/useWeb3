---
title: "SMTChecker, Remix & Dapptools"
description: "Using SMTChecker formal verification module in Solidity compiler with  Remix & Dapptools"
authors: ["@leonardoalt"]
tags: ["Smart Contracts","Security","EVM"]
languages: ["Solidity"]
url: "https://fv.ethereum.org/2021/12/01/smtchecker-dapptools/"
dateAdded: 2021-12-05
level: "Advanced"
date: 2021-12-01
---

The SMTChecker is a formal verification module inside the Solidity compiler. Historically it has been complicated to run the SMTChecker on your own contracts, since you had to compile the compiler with an SMT/Horn solver, usually z3. We have been working on different solutions to this, and nowadays it is quite easy to run it.