---
title: "I Survived a Massive DDoS Attack and Made My Server Bulletproof"
description: "After facing a massive DDoS attack on my self-hosted server, I learned the hard way how important firewalls are—especially cloud firewalls that can stop malicious traffic before it even reaches your server. In this blog, I share my journey from near-server meltdown to bulletproofing my setup, exploring the difference between traditional and cloud firewalls, and how a few simple steps can protect your server from hackers and their bots. If you're thinking about self-hosting, you won't want to miss this!"
short: "Learn how I survived a DDoS attack and made my server bulletproof with cloud firewalls. 🚀"
date: "2024-10-22"
updated: "2024-10-22"
image: /i-survived-a-massive-ddos-attack-banner.webp
categories:
  - linux
  - security
topics:
  - self-hosting
published: true
---

So, maybe you can relate... I can be a bit of a noob sometimes! I decided to migrate my website to 100% open-source and self-hosted tools, and I forgot one major step. I didn’t fully understand that step, so now I want to help you understand how **not** to get every hacker and their dog's bot spamming the open SSH port you forgot to hide behind a firewall. 😬

![yikes](https://media1.tenor.com/m/78T_NTBNlskAAAAC/steve-carell-the-office.gif)

## Firewalls! 🔥🔥🔥

Let’s talk about firewalls! There are 2 types of firewalls we need to know about: cloud firewalls and traditional firewalls.

- **Traditional Firewall**: A traditional firewall is a security system installed directly on your server’s hardware. It sets up rules for who is allowed to connect to what port on your server. It’s a very useful tool for making sure only the right people have access to a given port. However...
- **Cloud Firewall**: A cloud firewall is a network-level firewall. What’s significant about this is that it can stop traffic **before it even reaches your server**!

![you shall not pass](https://media1.tenor.com/m/Rv-IfOOXPSIAAAAC/you-shall-not-pass-lotr.gif)

So, while I **did** set up key-based authentication on my server, making it impossible for anyone to brute force their way in, the number of denied requests to that server consumed a lot of CPU and IO rate—enough to take my site down! Trying to figure out what was happening was almost impossible because the server was so slow! Even setting up the traditional firewall didn’t stop hackers from bombarding my SSH port! However, once I set up a cloud firewall through my provider (DigitalOcean, not a sponsor but open to the idea 😉😉), the bots couldn’t even reach my server’s SSH port at all. No need for obscurity! I can keep my SSH on port 22, and you can’t even touch it! 🚀

However, I can’t block website traffic to my blog, so I can still be DDoSed through those ports, but hey, a win’s a win!

---

## Join The Community

If you like what you’ve read, love to code, and are a fan of Linux, open source, and building your own projects, you’d probably have a great time in my Discord community, [The Developers Lounge](https://discord.gg/4PCy4Bz)! We’re a rapidly growing community with lots of great people with a diverse set of skills among us. I’m super active in here, and we have a ton of cool people just waiting to chat. So what are you waiting for? Hop on in!
