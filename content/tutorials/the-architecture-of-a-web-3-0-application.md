---
title: "The Architecture of a Web 3.0 application"
description: "The architecture of Web 3.0 applications (or 'DApps') are completely different from Web 2.0 applications."
authors: ["@iam_preethi"]
tags: ["DevEx","Dapp"]
languages: []
url: "https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application"
dateAdded: 2021-11-15
level: "Intermediate"
date: 2021-09-22
---

Take Medium, for example, a simple blogging site that lets users publish their own content and interact with content from others.

As a web 2.0 application, it may sound simple, but there’s a lot that goes into Medium’s architecture to make it all possible:

First, there must be a place to store essential data, such as users, posts, tags, comments, likes, and so on. This requires a constantly updated database.

Second, backend code (written in a language like Node.js, Java, or Python) must define Medium’s business logic. For example, what happens when a new user signs up, publishes a new blog, or comments on someone else’s blog?

Third, frontend code (typically written in JavaScript, HTML, and CSS) must define Medium’s UI logic. For instance, what does the site look like, and what happens when a user interacts with each element on the page?

Putting it all together, when you write a blog post on Medium, you interact with its frontend, which talks to its backend, which talks to its database. All of this code is hosted on centralized servers and sent to users through an internet browser. This is a good high-level summary of how most Web 2.0 applications work today.

But all of that’s changing.

Blockchain technology has unlocked an exciting new direction for Web 3.0 applications. In this article, we're going to focus on what the Ethereum blockchain brings to the table.