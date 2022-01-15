---
title: 'Anatomy of a STARK'
description: 'This tutorial series explains the mechanics of the STARK proof system. It is directed towards a technically-inclined audience with knowledge of basic maths and programming.'
authors: ['@aszepieniec']
tags: ['Cryptography','Security','Privacy','Scalability']
languages: []
url: 'https://aszepieniec.github.io/stark-anatomy/'
dateAdded: 2021-10-30
level: 'Advanced'
date: 2021-10-28
---

One of the most exciting recent advances in the field of cryptographic proof systems is the development of STARKs. It comes in the wake of a booming blockchain industry, for which proof systems in general seem tailor-made: blockchain networks typically consist of mutually distrusting parties that wish to transact, or generally update collective state according to state evolution rules, using secret information. Since the participants are mutually distrusting, they require the means to verify the validity of transactions (or state updates) proposed by their peers. Zk-SNARKs are naturally equipped to provide assurance of computational integrity in this environment, as a consequence of their features:

- zk-SNARKs are (typically) universal, meaning that they are capable of proving the integrity of arbitrary computations;
- zk-SNARKs are non-interactive, meaning that the entire integrity proof consists of a single message;
- zk-SNARKs are efficiently verifiable, meaning that the verifier has an order of magnitude less work compared to naïvely re-running the computation;
- zk-SNARKs are zero-knowledge, meaning that they do not leak any information about secret inputs to the computation.