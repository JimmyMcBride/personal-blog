---
title: "Hitchhiker's Guide to the Arch Linux Installation"
description: "This guide is the perfect companion for your first Arch Linux installation. It breaks down the process step by step, simplifying the technical details, and ensuring you don’t feel lost. From partitioning the disk to setting up a swap file, I’ll guide you through it all—including a few pro tips to save you from the mistakes I made as a beginner."
date: "2024-9-24"
image: /hitchhikers-guide-to-the-arch-linux-installation-banner.png
categories:
  - linux
  - arch
  - tutorial
published: true
---

Welcome back to the **Textual Healing** series! In the first part, we dove into the basics of text manipulation using `cat`, `grep`, and pipes. Now, we’re stepping things up a notch with one of the most powerful tools in your shell arsenal: **`sed`**, the stream editor.

`sed` is all about **transformation**. It’s designed to take in streams of text (or data), edit that text on the fly, and spit it back out—either to the terminal, a file, or even piped into another command. Think of `sed` as a scalpel for your text, performing precise operations to search, replace, delete, or modify patterns with ease. It’s especially handy for automating repetitive edits, which makes it an essential tool for any shell wizard.

---

### **1. The Basics of `sed`**

At its core, `sed` follows a simple structure:

```bash
sed 's/search_pattern/replacement/' filename
```

- **`s`** stands for **substitute**, telling `sed` to find the **search_pattern** and replace it with **replacement**. The command operates on the file line by line.

For example, if you want to replace "apple" with "orange" in a file called `fruits.txt`:

```bash
sed 's/apple/orange/' fruits.txt
```

This will find the first occurrence of "apple" on each line and replace it with "orange." Simple enough, but `sed` has a lot more depth when you need it.

---

### **2. Global Substitution with `g` Flag**

By default, `sed` only replaces the **first** occurrence of the pattern on each line. But what if you want to replace **every** instance of the pattern? This is where the **global flag** (`g`) comes in:

```bash
sed 's/apple/orange/g' fruits.txt
```

Now, every "apple" on every line will be replaced with "orange."

---

### **3. Editing Files In-Place with `-i` Flag**

One of the coolest things about `sed` is that you can make changes directly to your files without needing to create a new output file. To edit a file in-place, you’ll use the **`-i`** flag:

```bash
sed -i 's/apple/orange/g' fruits.txt
```

This command will modify `fruits.txt` directly, saving the changes back to the original file.

**Warning**: Use the `-i` flag with caution. Once the file is edited in-place, you can’t undo the changes easily unless you’ve made a backup.

---

### **4. Deleting Lines with `d`**

`sed` isn’t just about finding and replacing text—it’s also super handy for **deleting lines** that match a specific pattern. Let’s say you want to delete every line in a file that contains the word "banana":

```bash
sed '/banana/d' fruits.txt
```

This command tells `sed` to delete all lines containing "banana" and output the result. If you want to delete a specific line number, you can also do:

```bash
sed '5d' fruits.txt
```

This would delete the 5th line from the file.

---

### **5. Substituting Multiple Patterns**

Let’s say you want to replace multiple words in a file in one go. You don’t need to run `sed` multiple times—you can chain multiple substitution commands together:

```bash
sed -e 's/apple/orange/g' -e 's/grape/mango/g' fruits.txt
```

Here, we’re replacing "apple" with "orange" and "grape" with "mango" in a single command.

---

### **6. Using `sed` with Regular Expressions**

![Regex Meme](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fpracticaldev%2Fimage%2Ffetch%2Fs--Y7UrCHfr--%2Fc_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_500%2Cq_auto%2Cw_1000%2Fhttps%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2F3umga1qn8k7lwrr1ltw8.png&f=1&nofb=1&ipt=f71e65d9c8a7f5d771acce4eed226b7ad3a4e2d57ea7dd8f384bff93d591c196&ipo=images)

We all feel the pain of regex's weird syntax, but hey, **we're not going to let that stop us from achieving greatness**! Despite its quirks, regex is a powerhouse when used in combination with `sed`. Let’s harness its strength!

`sed` becomes a real powerhouse when you start using regex to match patterns more intelligently. For example, suppose you want to replace any sequence of digits with the word "[number]":

```bash
sed 's/[0-9]\+/[number]/g' text.txt
```

This will replace any group of digits (`[0-9]+`) with "[number]" throughout the file. Regex allows you to create powerful and flexible searches, letting you target specific patterns of text, not just exact strings.

---

### **7. Inserting and Appending Text**

Need to insert or append lines into a file? `sed` can do that too! To insert text before a specific line, use the **`i`** command:

```bash
sed '3i\This is inserted before line 3' file.txt
```

This will insert the text "This is inserted before line 3" just before the 3rd line. To append text **after** a line, use **`a`**:

```bash
sed '3a\This is appended after line 3' file.txt
```

---

### **8. Combining `sed` with Other Commands**

Like all powerful shell commands, `sed` works beautifully when combined with other tools like `cat`, `grep`, or even `find`. Let’s say you want to find all text files in a directory and replace "apple" with "orange" in all of them:

```bash
find . -name "*.txt" -exec sed -i 's/apple/orange/g' {} \;
```

This command finds every `.txt` file in the current directory and applies the `sed` substitution to replace "apple" with "orange" directly within each file.

---

### **9. Real-World Use Cases**

`sed` is a lifesaver in real-world scenarios, like quickly making bulk text changes in configuration files, automating logs cleanup, or prepping data for further processing. For example:

- **Update URLs in HTML files**: Replace old URLs with new ones in all `.html` files:

  ```bash
  sed -i 's/oldsite.com/newsite.com/g' *.html
  ```

- **Clean up logs**: Remove unnecessary log entries (e.g., removing "INFO" lines from log files):

  ```bash
  sed '/INFO/d' log.txt
  ```

---

### **Wrapping Up**

`sed` is a game-changer when it comes to stream editing and text manipulation. It’s fast, flexible, and powerful enough to handle everything from quick find-and-replace tasks to complex text transformations. Once you get comfortable with the basics, you’ll find `sed` to be an indispensable tool in your shell toolkit.

Next up in the **Textual Healing** series, we’re diving deep into **`awk`**, another heavy hitter for text processing that’ll help you analyze and manipulate data with ease.

---

**Want to hang out with other Linux lovers and coding enthusiasts?** Come join our community on **Discord**! We’re a group of friendly folks who love to code, share tips, and help each other grow. **[Click here to join the conversation!](https://discord.gg/4PCy4Bz)**
