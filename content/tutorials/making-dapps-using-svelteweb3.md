---
title: 'Making DAPPs using SvelteWeb3'
description: 'My web3 experience started from Svelte but because I didn’t know how to use the window[‘ethereum’] global had to move to React so I could use the web3-react library.'
authors: ['@chiuzon']
tags: ['Dapp']
languages: ['Vyper']
url: 'https://chiuzon.medium.com/enjoy-making-dapps-using-svelteweb3-b78dfea1d902'
dateAdded: 2021-11-15
level: 'Intermediate'
date: 2021-11-14
---

My web3 experience started from Svelte but because I didn’t know how to use the window[‘ethereum’] global had to move to React so I could use the web3-react library. I got tired of writing useEffect() so I taught how hard will be to make a library like web3-react but for svelte. It wasn’t exactly that hard, I don’t know why no one did it before me.

SvelteWeb3 is an adapter for web3-react connectors, at first I wanted to make my own connectors but after some thinking I realized that would be useless and it would add more dependencies.