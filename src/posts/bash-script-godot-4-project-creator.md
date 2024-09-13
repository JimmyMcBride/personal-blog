---
title: "Learn By Example: Bash Script - Godot 4 Project Creator"
description: "In this blog, I walk through the process of automating Godot project creation using a custom bash script. Learn how to set up new projects, add specific assets, initialize Git, and streamline your game development workflow. Perfect for anyone looking to automate repetitive tasks in game development!"
date: "2024-9-13"
image: /bash-script-godot-4-project-creator-banner.png
categories:
  - advice
  - career
published: true
---

Bash scripting is a powerful way to automate workflows, build your own tools, and ultimately save a lot of time. In this blog post, we’ll dive into a real-world bash script I’ve created to automate the setup of new Godot projects. We’ll walk through this script step-by-step, explaining key concepts and how they come together to create a useful tool for your own projects.

Before we begin, if you’re new to bash scripting or need a refresher, feel free to check out my [Bash Script Tool Kit](https://dev.to/jimmymcbride/bash-script-tool-kit-56i7) for foundational concepts.

---

### The Problem:
I love dabbling in game development on the side. It's been a super fun hobby, and I find myself starting new projects all the time. However, as time went on, I accumulated a lot of assets and wrote various tools and utilities in C# that I like to add to each project. But here’s the issue—I don’t want to add **all** of them to every project. I have grouped my assets and tools into modules, and some projects need certain assets and tools while others don’t.

Manually adding these files and assets to each new project became incredibly cumbersome. So, I decided to write a bash script to automate the process!

### Overview of the Script:
Here’s what I needed the script to do:
At its simplest, I wanted to run `gdcreate "{name of project}"` and have it create a new Godot project. But I also wanted some additional options:
- **Initialize a Git repository** and push it to a remote (in this case, GitLab, because their free tier is great for private projects—especially when I have proprietary assets I don’t want the world downloading for free).
- **Add specific asset packs** from my collection, grouped into modules (e.g., dark fantasy assets, biomes, character controllers).
- **Add common C# utilities** that I use throughout my Godot projects.

For example, I wanted to run a command like this:  
`gdcreate ProjectName --assets "dfantasy,biomes,ccontrollers" --gitinit --utils`

This command would:
1. Create a new Godot 4 project.
2. Add the asset packs I’ve grouped as `dfantasy`, `biomes`, and `ccontrollers` to the project.
3. Add my favorite C# utilities.
4. Initialize Git and push the project to my private GitLab group.

Now, let’s break everything down step by step!

---

### Step 1: Script Usage Function

```bash
usage() {
    echo "Usage: gdcreate ProjectName --assets \"dfantasy,biomes,ccontrollers\" --gitinit --utils"
    exit 1
}
```

The `usage` function defines how the script should be used. It helps guide the user by showing them the correct format for calling the script. If the script is run incorrectly, this function will display usage instructions and then `exit` the script with a failure status (`1`).

Key Bash Concepts:
- `function_name() {}`: Defines a bash function.
- `echo`: Prints a string to the terminal.
- `exit 1`: Terminates the script with an error code.

---

### Step 2: Copying Assets Based on User Input

```bash
copy_assets() {
    cp -r "$HOME/Documents/Godot/Template/src/Materials" "$PROJECT_DIR/src/Materials"
    local project_dir=$1
    IFS=',' read -ra ASSETS <<< "$2"
    for asset in "${ASSETS[@]}"; do
        case "$asset" in
            dfantasy) src_path="$HOME/Documents/Godot/Template/src/DarkFantasy";;
            biomes) src_path="$HOME/Documents/Godot/Template/src/Biomes";;
            ccontrollers) src_path="$HOME/Documents/Godot/Template/src/CharacterControllers"
                          dest_path="$project_dir/src/CharacterControllers"
                          mkdir -p "$(dirname "$dest_path")"
                          cp -r "$src_path" "$dest_path"
                          update_namespace "$dest_path"
                          continue;;
            *) echo "Unknown asset: $asset"; exit 1;;
        esac
        dest_path="$project_dir/src/$(basename "$src_path")"
        mkdir -p "$(dirname "$dest_path")"
        cp -r "$src_path" "$dest_path"
    done
}
```

The `copy_assets` function copies the specified assets (such as "Dark Fantasy" or "Biomes") into the new project directory. Here’s a breakdown of what’s happening:
- `cp -r`: Copies files recursively (meaning it includes subdirectories).
- `local`: Declares variables that are scoped only within the function.
- `IFS=','`: Defines the delimiter used to split the asset list into an array. In this case, we’re splitting by commas.
- `for asset in ...`: Loops through each asset provided by the user.
- `case`: Evaluates the asset name and sets the `src_path` accordingly.

Key Concepts:
- **Arrays in Bash:** The `IFS` and `read` command allow us to split a string into an array and loop over it.
- **Switch-case:** The `case` block allows for conditional logic based on the asset name.

---

### Step 3: Updating Namespaces in `.cs` Files

```bash
update_namespace() {
    local directory=$1
    local old_namespace="Template"
    local new_namespace=$PROJECT_NAME
    find "$directory" -type f -name "*.cs" -exec sed -i "s/namespace $old_namespace/namespace $new_namespace/g" {} +
    find "$directory" -type f -name "*.cs" -exec sed -i "s/using $old_namespace/using $new_namespace/g" {} +
}
```

This function updates namespaces in all `.cs` files within a given directory by replacing occurrences of `Template` with the project’s name. It uses the powerful combination of `find` and `sed`.

Key Concepts:
- **`find` command**: Searches through directories to find files that match specific criteria (in this case, `.cs` files).
- **`sed` command**: A stream editor used to modify files. Here, it’s being used to replace text within the files.
- **`-exec` option**: Executes a command on each file found by `find`.

---

### Step 4: Creating GUIDs

```bash
generate_guid() {
    uuidgen | tr '[:upper:]' '[:lower:]'
}
```

This function generates a unique identifier (GUID) and ensures it’s in lowercase. `uuidgen` generates a UUID, and `tr` translates uppercase letters to lowercase.

Key Concepts:
- **`uuidgen`**: A command-line tool for generating universally unique identifiers.
- **`tr`**: A command used to translate characters in a string.

---

### Step 5: Creating the Project Directory and Files

```bash
mkdir -p "$PROJECT_DIR/src"

cat > "$PROJECT_DIR/$PROJECT_NAME.csproj" <<EOL
<Project Sdk="Godot.NET.Sdk/4.2.2">
  ...
</Project>
EOL
```

This creates the project directory (`mkdir -p`) and writes the `.csproj` file using a `heredoc`. A heredoc allows you to create multi-line strings in bash scripts, making it easier to write template files like this.

Key Concepts:
- **`mkdir -p`**: Creates a directory and any necessary parent directories.
- **Heredoc (`<<EOL`)**: A way to write multi-line strings in bash.

---

### Step 6: Git Initialization and Repository Creation

```bash
if $GITINIT; then
    cp "$HOME/Documents/Godot/Template/.gitignore" "$PROJECT_DIR/"
    cd "$PROJECT_DIR"
    glab repo create learning-godot-4/$PROJECT_NAME --private --group --source . --push
    git init -b trunk
    git add .
    git commit -m "Initial commit"
    git remote add origin "git@gitlab.com:learning-godot-4/$PROJECT_NAME.git"
    git push -u origin trunk
fi
```

This section initializes a Git repository, creates a new project on GitLab using the `glab` CLI, and pushes the project to the remote repository.

Key Concepts:
- **`glab`**: A CLI tool for GitLab that lets you manage repositories directly from the command line.
- **`git` commands**: Initializes a repository, stages changes, commits them, and pushes to a remote repository.

---

### Step 7: Final Touches

The script wraps up by copying utilities if the `--utils` flag is provided and appending configurations to the Godot project’s configuration file (`project.godot`).

---

### Conclusion

This script demonstrates how you can use bash to automate repetitive tasks, making your workflow more efficient and freeing up time to focus on coding. It covers concepts like string manipulation, loops, conditionals, and file handling—core tools in any bash scripter’s toolkit.

If you're wondering whether it's worth building your own tools, I encourage you to check out my blog post on [why writing your own tools matters](https://dev.to/jimmymcbride/why-writing-your-own-tools-is-more-important-than-you-think-2b1b).

I hope this breakdown has helped you understand the power of bash scripting and how you can leverage it to build tools that build tools! Feel free to share your thoughts or questions in the comments below. Until next time, happy scripting! 🧙
