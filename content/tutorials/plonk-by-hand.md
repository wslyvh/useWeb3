---
title: 'PLONK by Hand'
description: 'This article will explain how to execute a PLONK zero-knowledge proof system completely by hand.'
authors: ['@metastatedev']
tags: ['Privacy','Cryptography']
languages: []
url: 'https://research.metastate.dev/plonk-by-hand-part-1/'
dateAdded: 2021-11-15
level: 'Advanced'
date: 2020-09-30
---

In this series of posts, we will show how to execute a PLONK zero-knowledge proof system completely by hand. All of the math used in these posts can reasonably be done with just pencil-and-paper (and a little patience). For each kind of computation we will give you at least one fully worked example—often several—and tricks to help save time and notebook paper.

Most of the math we will do is elementary, though some higher-level concepts do appear. This series assumes the reader is familiar with polynomial and matrix arithmetic as well as finite fields and their simple extensions.

Having some knowledge about elliptic curves will be helpful, but the needed formulas are provided and can be used even if you are unfamiliar with them.

While this series is intended to show that even a complex construction like PLONK can be done on paper, you might want to use a computational helper like WolframAlpha to move through the posts more quickly, if you wish.

In this first post we will show you how to choose parameters, run a trusted setup, and convert a statement into a PLONK-style circuit by hand. The next post will show you how to create a proof, and in the final post in the series we will verify the proof.