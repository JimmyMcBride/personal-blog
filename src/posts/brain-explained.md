---
title: "Brain, Explained"
description: "Brain gives AI coding agents a durable memory and context layer inside the repo, so they can start with the right docs, decisions, and workflow rules instead of starting cold."
date: "2026-04-16"
updated: "2026-04-17"
image: /brain-explained-banner.webp
categories:
  - ai
  - open-source
  - productivity
topics:
  - ai
published: true
---

Alright, let’s talk about AI coding. If you’ve been using ChatGPT, Codex, Claude… whatever your weapon of choice is — you’ve probably felt this already. Sometimes it’s insane. Like… how did it just write that? Other times, it’s just frustrating. You explain something. It kind of gets it. Then you ask something else and it completely forgets everything you just said.

I’ve hit that wall a lot.

## What’s actually going wrong

It’s not that AI is bad, it’s that AI doesn’t know your project. It doesn’t know:

* how your code is structured
* why things are the way they are
* what you’ve already tried
* what just changed

So every time you ask it to do something, it’s basically guessing. And yeah… sometimes it guesses right, but a lot of times it doesn’t.

## This is where Brain comes in

Brain is super simple. It just lives inside your project and does one job:

> it keeps track of what matters, and feeds the right context into AI

That’s it! No crazy UI, no “platform”, no extra thing you have to manage.

If you want to poke around, Brain is open source on GitHub: [JimmyMcBride/brain](https://github.com/JimmyMcBride/brain).

## Quick example

Let’s say you’re fixing a bug:

> token refresh race condition

Normally you’d:

* open a few files
* copy some code
* explain the problem
* paste it into AI

And hope for the best. Now with Brain:

```bash
brain context compile --task "fix token refresh race condition" --budget small
```

That one command pulls together:

* past bugs you’ve written down
* the files involved
* nearby tests
* your project structure
* what’s currently changing

Now AI actually understands what it’s working on. And that `--budget small` part matters too. It tells Brain to start tight instead of dumping the whole kitchen sink into the model.

## The three things Brain is doing

You don’t really need to understand everything, but this helps.

### 1. Memory

Your project stops forgetting stuff. Fix a bug? Save it. Make a decision? Save it. Now it’s part of the project forever and AI can use it later.

### 2. Retrieval

You can actually find things without remembering the exact phrase you used three weeks ago.

```bash
brain search "auth bug"
```

This is where the hybrid search starts to matter. Brain is using lexical and semantic search together, which really just means it can work when you remember the exact words, and it can still help when you only remember the idea.

* If you search with the real words, the lexical side helps lock onto exact terms and close keyword matches.
* If your note says `token refresh race condition` and you search `token auth race` or `refresh bug`, the semantic side can still pull you toward the right thing.
* Put together, it feels a lot more like “find what I mean” and a lot less like “hope I guessed the exact filename.”

### 3. Context

This is the big one. Instead of throwing your whole project at AI… Brain builds a packet for whatever you’re working on. A packet is just a small, task-focused bundle of context. Not the whole repo. Not every note you’ve ever written. Just the stuff Brain thinks actually matters for that task.

And this is also where budgets come in. `small`, `default`, and `large` are basically ways to tell Brain how much context it should try to pull together. Smaller packets are usually better than people think, because “more context” sounds smart right up until the model gets distracted by a bunch of irrelevant junk.

So if I’m doing something narrow, I’ll usually start with `small`. If the task is broader, I can loosen it up. And if the budget is tight, Brain can show that some lower-priority stuff got left out instead of burying the useful context under a giant dump of everything. That’s the point: keep the signal, drop the noise.

## Real world difference

Let’s say you’re adding a new endpoint.

Without Brain:

* AI makes up structure
* naming is off
* auth is wrong
* logging doesn’t match

You end up rewriting half of it. With Brain:

* it sees your existing endpoints
* it follows your patterns
* it fits into your system

Now you’re just reviewing instead of rewriting.

## Sessions (lightweight, but useful)

When you start working:

```bash
brain session start --task "add endpoint"
```

Brain keeps track of what’s going on, so when you finish:

```bash
brain session finish
```

It just checks:

* did you verify things?
* did you save anything important?

Nothing crazy. Just enough to keep things clean.

## Distill (this part is actually really nice)

After a session:

```bash
brain distill --session
```

It’ll suggest:

* what changed
* what might be worth saving

You review it, keep what matters, and move on. That’s it.

## The part I didn’t expect

After using this for a bit… Your project starts to feel different. It remembers things, it adapts and gets more consistent, and you stop doing this loop of:

> explain → fix → explain again → fix again

## Why I don’t build without it anymore

Without Brain:

* AI feels random
* you repeat yourself constantly
* knowledge just disappears

With it:

* AI has context
* your project has memory
* things actually improve over time

It just makes everything smoother.

## Last thing

AI is powerful, but without context, it’s still guessing. That’s what Brain fixes, and once you feel that difference… it’s really hard to go back.
