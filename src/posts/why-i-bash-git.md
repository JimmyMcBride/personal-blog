---
title: "Why I Bash Git (And Why You Should Too)"
description: "In this blog, I break down my favorite Bash functions and aliases that make working with Git faster and more efficient. Learn how to create custom Git workflows in your terminal that save time and reduce typing. Whether you’re a terminal purist or just curious about automating your Git commands, this post has something for everyone!"
date: "2024-9-15"
image: /why-i-bash-git-banner.png
categories:
  - tutoiral
  - bash
  - git
published: true
---

A lot of people these days use tools like **oh-my-zsh** that come packed with a ton of helpful features out of the box, including Git shortcuts. And don’t get me wrong—they’re great. But I think it’s really important to understand how things work under the hood. You can slap on all the tools you want, but there’s real value in building your own workflow from the ground up.

If you’re curious about my take on **why you should write your own tools**, you can check out my thoughts [here](https://jimmymcbride.dev/blog/writing-your-own-tools). But for now, I want to show you how **Bash functions** and **aliases** can make Git workflows faster, easier, and just plain better. I hope this post gets you excited to dig into your shell’s rc file and start writing your own custom functions and aliases, not just for Git, but for everything you do!

---

### 1. **Git Aliases**

First up, let’s simplify some of those common Git commands. Here are some aliases I’ve set up to make life a little easier in the terminal. Why type a long command every time when you can shorten it to two letters?

```bash
alias gs="git status"    # Show Git status
alias ga="git add ."     # Add all files to the staging area
alias gc="git commit -m" # Commit with a message
alias gp="git push"      # Push the current branch to the remote
alias gl="git pull"      # Pull from the remote branch
alias glog="git log --oneline --graph --all --decorate" # View Git log in one-line format
alias gco="git checkout" # Checkout a branch
alias gcb="git checkout -b" # Create and switch to a new branch
alias gd="git diff --cached" # View the difference of staged changes
alias grh="git reset --hard HEAD" # Hard reset to the latest commit
alias gb="git branch -vv"  # Show branches and last commit in one-line format
alias gf="git fetch --all" # Fetch all remote branches
```

These aliases shave off seconds, but those seconds add up. Plus, they just feel good to use.

---

### 2. **Bash Functions for More Complex Git Workflows**

Now, let’s kick it up a notch with some custom **Bash functions** that automate a bit more of your workflow. Functions like these can save you from typing out multiple commands and ensure you don’t miss any steps.

#### 2.1. **Create a New Branch and Push It**
```bash
gnew() {
  git checkout -b "$1"
  git push -u origin "$1"
}
# Usage: gnew branch_name
```

#### 2.2. **Quick Commit and Push**
```bash
gquick() {
  git add .
  git commit -m "$1"
  git push
}
# Usage: gquick "commit message"
```

#### 2.3. **Rebase Current Branch onto Main**
```bash
grebase() {
  git checkout main
  git pull origin main
  git checkout -
  git rebase main
}
# Usage: grebase
```

#### 2.4. **Undo the Last Commit**
```bash
gundo() {
  git reset --soft HEAD~1
}
# Usage: gundo
```

#### 2.5. **Squash Commits**
```bash
gsquash() {
  git reset --soft HEAD~"$1"
  git commit --amend
}
# Usage: gsquash 3 (to squash the last 3 commits)
```

#### 2.6. **Sync Fork with Upstream**
```bash
gupdate-fork() {
  git fetch upstream
  git checkout main
  git merge upstream/main
  git push origin main
}
# Usage: gupdate-fork
```

#### 2.7. **Interactive Rebase on Previous Commits**
```bash
grebasei() {
  git rebase -i HEAD~"$1"
}
# Usage: grebasei 3 (to interactively rebase the last 3 commits)
```

---

### 3. **General Workflow Enhancers**

These final functions enhance general Git workflows to make things even more efficient.

#### 3.1. **Show Git Tree**
```bash
glogtree() {
  git log --graph --oneline --decorate --all
}
# Usage: glogtree
```

#### 3.2. **Reset Branch to Remote**
```bash
gresetremote() {
  git fetch origin
  git reset --hard origin/"$(git rev-parse --abbrev-ref HEAD)"
}
# Usage: gresetremote
```

---

### 4. **Add Aliases and Functions to Your `.bashrc` or `.zshrc`**

If you want these functions and aliases to persist across terminal sessions, you’ll need to add them to your `.bashrc` or `.zshrc`. Here’s how:

1. Open your shell configuration file:
    ```bash
    nano ~/.bashrc  # OR ~/.zshrc
    ```
2. Paste the aliases and functions into the file.
3. After saving, refresh your shell:
    ```bash
    source ~/.bashrc  # OR ~/.zshrc
    ```

---

These are just some of the ways you can make Git work for you, rather than the other way around. By taking a few minutes to tweak your shell setup, you can save hours of typing and clicking over time. **So what about you?**
