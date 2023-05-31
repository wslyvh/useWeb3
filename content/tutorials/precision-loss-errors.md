---
title: "Precision Loss Errors"
description: "Solidity computations can lead to some devious loss of precision errors"
authors: ["@DevDacian"]
tags: ["Smart Contracts","Security"]
languages: ["Solidity"]
url: "https://dacian.me/precision-loss-errors"
dateAdded: 2023-05-31
level: "Intermediate"
---

Numerical operations in solidity can result in precision loss, where the amount that is calculated, saved and returned is incorrect and typically lower than it should be. These bugs can disadvantage users of decentralized finance platforms and they can also sometimes be used by attackers to drain funds from such platforms.