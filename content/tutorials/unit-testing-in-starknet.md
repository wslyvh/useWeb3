---
title: 'Unit testing in Starknet'
description: 'Tests your contracts before deployment'
authors: ['@eth_worm']
tags: ['Smart Contracts','Scalability']
languages: ['Cairo']
url: 'https://perama-v.github.io/cairo/examples/unit_test/'
dateAdded: 2022-01-15
level: 'Intermediate'
---

Below is a contract that stores pen and paper inventory across different warehouses. To test that the contract works as expected a test is created that stores to the inventory twice with record_items(), then calls check_items(). By asserting that the values received match those that are expected, the test identifies errors before deployment.