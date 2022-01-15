---
title: 'How To Save 50% on Gas Costs'
description: 'When we built the first version of Goldfinch, we did not really pay attention to gas costs. This resulted in even basic actions being insanely expensive on our protocol.'
authors: ['@_blakewest']
tags: ['Smart Contracts']
languages: ['Solidity']
url: 'https://medium.com/goldfinch-fi/solidity-learnings-how-to-save-50-on-gas-costs-5e598c364ab2'
level: 'Intermediate'
date: 2021-05-18
---

When we built the first version of Goldfinch, we did not really pay attention to gas costs. This resulted in even basic actions being insanely expensive on our protocol. Borrowing money cost $250+ at high gas times 😟. So the first improvement we made was to see how we could reduce gas costs. We spent hours profiling, researching, and going through our code, more or less line by line, to figure out how we could cut gas. Along the way we learned a lot of really useful rules of thumb. These are high level concepts you can always keep in the back of your mind while writing Solidity, both for what adds gas, and what doesn’t add gas, which is not always intuitive. Following these, we were able to cut costs of most functions by 30–50%, without sacrificing much in terms of readability.