---
title: "Swipe Away Tasks: Jetpack Compose & Material 3 Todo App Quick-Start Guide 🎯"
description: Welcome to this fantastic journey into the world of Jetpack Compose, Material 3, and animations! If you've been looking for a comprehensive guide to help you create a task app using these cutting-edge technologies, you've come to the right place.
date: "2023-5-3"
image: https://res.cloudinary.com/practicaldev/image/fetch/s--U9q86BAR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t2ci6vk2vktgt7iy8is1.png
categories:
  - kotlin
  - android
  - animation
  - tutorial
published: true
---

Welcome to this fantastic journey into the world of Jetpack Compose, Material 3, and animations! If you've been looking for a comprehensive guide to help you create a task app using these cutting-edge technologies, you've come to the right place. We'll walk you through the whole process, step by step, ensuring you gain a thorough understanding of the underlying concepts and practical implementations. So, let's buckle up and get ready to dive into the realm of modern Android development with a touch of elegance and energy!

## 🚀 Setting Up Our Project Gradle

To kick things off, we'll first make sure our project-level `build.gradle` file is up-to-date with the necessary dependencies and build features. This will ensure we have all the tools we need to create a sleek and functional task app using Jetpack Compose, Material 3, and animations.

```groovy
plugins {
    id 'com.android.application' version '8.0.0' apply false
    id 'com.android.library' version '8.0.0' apply false
    id 'org.jetbrains.kotlin.android' version '1.8.10' apply false
}
```

## 🛠️ Configuring Module Gradle

Now, let's move on to our module-level `build.gradle` file. Here, we'll ensure we have the correct dependencies and build features. Make sure to use Material 3 version `1.1.0-rc01` or later to take advantage of exciting features like swipe-to-delete and the date picker.

```groovy
// ...
android {
    // ...
    buildFeatures {
        compose true
    }
    composeOptions {
        kotlinCompilerExtensionVersion '1.4.2'
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.10.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.1'
    implementation 'androidx.activity:activity-compose:1.7.1'
    implementation 'androidx.compose.ui:ui:1.4.2'
    implementation 'androidx.compose.ui:ui-graphics:1.4.2'
    implementation 'androidx.compose.ui:ui-tooling-preview:1.4.2'
    implementation 'androidx.compose.material3:material3:1.1.0-rc01'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.compose.ui:ui-test-junit4:1.4.2'
    debugImplementation 'androidx.compose.ui:ui-tooling:1.4.2'
    debugImplementation 'androidx.compose.ui:ui-test-manifest:1.4.2'
}
```

Keep in mind that Compose versions are tied to Kotlin versions. During our experiments, we found that `material3:1.1.0-rc01` does not work on Kotlin version 1.7.x.

## 🗂️ Organizing Our Codebase

Before diving into the code, it's essential to keep our project well-organized. We'll create a few packages to ensure a clean and maintainable codebase. In this tutorial, we'll keep things simple and avoid complex design patterns, as our app is relatively small.

```sh
./
  components/
  models/
  screens/
  utils/
  view_models/
```

Great! With our packages in place, it's time to start writing some code and bring our task app to life.

## 🏗️ Building Our Task App with Jetpack Compose, Material 3, and Animations

Let's start by adding our Task screen. Create a new file `./screens/TaskScreen.kt` with the following content.

```kotlin
@Composable
fun TaskScreen(viewModel: TaskViewModel) {
  Scaffold() { paddingValues ->
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(paddingValues),
    ) {
      Text("Hello, world!")
    }
  }
}
```

In this snippet, we're using a `Scaffold` to create the base structure for our Task screen. `Scaffold` is a versatile component in Jetpack Compose that provides a high-level layout for common application UI patterns. It takes care of handling the status bar, navigation bar, and other app bars for you.

The `paddingValues` parameter represents the system-defined padding values. It ensures that our content is placed correctly within the screen without overlapping system UI elements.

We use `Modifier.fillMaxSize()` to make the Column occupy the entire available screen space. This ensures that our Task screen takes up the full width and height of the display.

Now let's integrate our Task screen into the `MainActivity`:

```kotlin
class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
      MyTestApplicationTheme {
        TaskScreen()
      }
    }
  }
}
```

Composable previews are a powerful feature in Jetpack Compose that allows you to see the appearance of your composable functions without needing to run the app. Let's add previews for our `TaskScreen` at the bottom of `./screens/TaskScreen.kt`:

```kotlin
// ...
@Preview
@Composable
fun TaskScreenPreview() {
  MyTestApplicationTheme {
    TaskScreen(viewModel = TaskViewModel())
  }
}

@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun DarkTaskScreenPreview() {
  MyTestApplicationTheme {
    TaskScreen(viewModel = TaskViewModel())
  }
}
```

Notice how we added two previews – one for light mode and another for dark mode. The preview option `uiMode = Configuration.UI_MODE_NIGHT_YES` allows us to see what our component looks like in dark mode.

For more fine-grained control over our background color, let's add a custom background color in our `./ui/theme/Color.kt`:

```kotlin
// ...
val ColorScheme.backgroundColor
  @Composable
  get() = if (isSystemInDarkTheme()) Gray800 else Gray300

val Gray300 = Color(0xFFE0E0E0)
val Gray800 = Color(0xFF424242)
```

This customization ensures that we have a consistent background color that adapts to the current theme (light or dark mode) in our app.

## 📝 Writing The ViewModel

Before we move any further, let's handle the business logic of our app. I prefer to set up the business logic before diving too deeply into the UI. In my experience, this approach leads to quicker development, since the logic is already there and just needs to be plugged in. So, let's create our view model: `./view_models/TaskViewModel.kt`.

```kotlin
class TaskViewModel : ViewModel() {
  /* we use private set on our taskList so that it can't be 
  mutated from the view */
  var taskList by mutableStateOf<List<Task>>(listOf())
    private set

  /* we use a pair here for simple error handling
  the first value stands for isError, and the second value is 
  the error message. */
  fun addTask(body: String): Pair<Boolean, String> {
    // ...
  }

  // ...
}
```

Our `TaskViewModel` extends the `ViewModel` class, which is part of the Android Architecture Components. The `ViewModel` class is designed to store and manage UI-related data in a lifecycle-conscious way, allowing data to survive configuration changes such as screen rotations. This way, we don't lose our app state when the activity is recreated.

Now, let's set up our `ViewModel` in our `./MainActivity.kt`:

```kotlin
class MainActivity : ComponentActivity() {
  // this is how we can instantiate our view model for now
  private val viewModel by viewModels<TaskViewModel>()
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
      MyTestApplicationTheme {
        // let's pass our view model to our TaskScreen
        TaskScreen(viewModel)
      }
    }
  }
}

// we can create a parameter for our viewModel in the TaskScreen
@Composable
fun TaskScreen(viewModel: TaskViewModel) {
// ...

```

By using `viewModels<TaskViewModel>()`, we delegate the creation and management of our `TaskViewModel` instance to the Android system. This ensures that our ViewModel is correctly scoped to the activity's lifecycle and that it's retained across configuration changes.

We then pass our `ViewModel` to the `TaskScreen` composable, enabling the screen to interact with the app's business logic, while keeping a clear separation of concerns between the UI and the data management.

## 🔝 Setup Top App Bar

Now that we have our `ViewModel` set up and accessible in our `TaskScreen`, our next step is to create our top app bar. Let's start by creating a new file in our components folder: `./components/TaskAppTopBar.kt`.

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskAppTopBar(
  deleteAllTasksDialog: MutableState<Boolean>,
) {
  TopAppBar(
    title = {
      Text(text = "My Task App")
    },
    actions = {
      IconButton(onClick = {
        deleteAllTasksDialog.value = true
      }) {
        Icon(
          Icons.Default.Delete,
          contentDescription = "Delete Icon",
          tint = MaterialTheme.colorScheme.error
        )
      }
    })
}
```

Here, we've got an `IconButton` to delete all completed tasks. When we click on this button, we'll show an alert dialog to the user asking them if they're sure they want to delete all completed tasks. If they select yes, we'll do it; if they select no, nothing will happen.

To manage the dialog visibility, we use a `MutableState<Boolean>`, which is a state object that holds a single mutable value. With Jetpack Compose, we typically use remember to create and remember such state objects within the composable function. This way, the state is preserved across recompositions, so our UI can react to state changes.

Now, let's include our top app bar in the `TaskScreen` scaffold:

```kotlin
@Composable
fun TaskScreen(viewModel: TaskViewModel) {
  /* our state doesn't toggle the dialog yet, but we'll come 
  back to this */
  val deleteAllTasksDialog = remember {
    mutableStateOf(false)
  }

  Scaffold(
    topBar = {
      TaskAppTopBar(deleteAllTasksDialog)
    }) { paddingValues ->
// ...
```

## 📥 Task Input

Next, let's create a component for our input. We need an input field to enter new tasks to our list. Create a new file: `./components/AddTaskInput.kt`.

```kotlin
@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun AddTaskInput(viewModel: TaskViewModel) {
  // focusManager allows us to clear the focus programmatically
  val focusManager = LocalFocusManager.current
  // keyboardController enables us to close the keyboard programmatically
  val keyboardController = LocalSoftwareKeyboardController.current

  // state for our new task body
  var body by remember {
    mutableStateOf("")
  }

  // states for managing errors
  var error by remember { mutableStateOf("") }
  var isErrorVisible by remember { mutableStateOf(false) }

  Column(modifier = Modifier.padding(MEDIUM_PADDING, SMALL_PADDING)) {
    OutlinedTextField(
      modifier = Modifier
        .fillMaxWidth(),
      value = body,
      onValueChange = {
        isErrorVisible = false
        body = it
      },
      label = { Text("Enter task") },
      keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
      keyboardActions = KeyboardActions(
        onDone = {
          val (hasError, errorMessage) = viewModel.addTask(body)
          error = errorMessage
          isErrorVisible = hasError

          if (!hasError) {
            body = ""
            keyboardController?.hide()
            focusManager.clearFocus()
          }
        }),
      isError = isErrorVisible,
    )
    if (isErrorVisible) {
      Text(text = error, color = MaterialTheme.colorScheme.error)
    }
  }
}
```

`keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done)` configures the keyboard's action button as "Done". When a user presses this button, it triggers the `onDone` lambda within `keyboardActions`.

Now, let's integrate our input component into the `TaskScreen` and create a list to display the tasks from our ViewModel.

Inside `./screens/TaskScreen.kt`:

```kotlin
// ...
  Scaffold(
    topBar = {
      TaskAppTopBar(deleteAllTasksDialog, isInputVisible)
    }) { paddingValues ->
    Column(
      modifier = Modifier
        .background(MaterialTheme.colorScheme.backgroundColor)
        .fillMaxSize()
        .padding(paddingValues)
        .imePadding(),
    ) {
      AddTaskInput(viewModel) // add our new component here
      // ...
```
Next, let's work on rendering our list. Start by creating `./components/TaskCard.kt`.

```kotlin
@Composable
fun TaskCard(
  task: Task,
  toggleCompleted: (Task) -> Unit,
) {
  Card(
    modifier = Modifier
      .padding(SMALL_PADDING)
      .fillMaxWidth(),
    colors = CardDefaults.cardColors(
      containerColor = MaterialTheme.colorScheme.surface
    )
  ) {
    Row(
      modifier = Modifier
        .padding(SMALL_PADDING)
        .fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Text(
        modifier = Modifier
          .padding(start = MEDIUM_PADDING)
          .weight(1f),
        text = task.body,
        style = TextStyle(
          textDecoration = if (task.completed) TextDecoration.LineThrough
          else TextDecoration.None
        )
      )
      Checkbox(checked = task.completed, onCheckedChange = {
        toggleCompleted(task)
      })
    }
  }
}
```

`Modifier.weight` assigns a weight to a layout element, which determines how the available space is distributed amongst the elements. In this case, we give the Text a weight of 1, so it takes up all available horizontal space in the Row.

`colors = CardDefaults.cardColors` sets the default color of the Card using Material Theme's color scheme.

In Column and Row, `verticalAlignment` and `horizontalArrangement` properties are used to define the alignment and arrangement of child elements. In this case, we align the items in the row vertically in the center and space them out horizontally.

## 📜 Display Our Task List

Now, let's loop through our task list in `./screens/TaskScreen.kt` and display each task in our task card:

```kotlin
// ...
  Scaffold(
    topBar = {
      TaskAppTopBar(deleteAllTasksDialog, isInputVisible)
    }) { paddingValues ->
    Column(
      modifier = Modifier
        .background(MaterialTheme.colorScheme.backgroundColor)
        .fillMaxSize()
        .padding(paddingValues)
        .imePadding(),
    ) {
      AddTaskInput(viewModel)
      // this is where we add our task list
      LazyColumn(
        modifier = Modifier.weight(1f),
        content = {
          items(items = viewModel.taskList, key = {
            it.id
          }) { task ->
            TaskCard(task, viewModel::toggleTaskCompleted)
          }
        })
    }
  }
// ...
```

`LazyColumn` is a vertically scrolling list that composes and lays out visible items on-demand. The `items` function is used to define the list items and their layout.

## ❌ Delete All Completed Tasks

Let's hook up the delete all completed tasks functionality we were working on earlier. To set this up, we're going to use the magic of Kotlin's extension functions. Create `./utils/DeleteAllTasksDialog.kt`:

```kotlin
@Composable
fun MutableState<Boolean>.deleteAllTasksDialog(
  viewModel: TaskViewModel,
): MutableState<Boolean> {
  if (this.value) {
    AlertDialog(
      onDismissRequest = {
        this.value = false
      },
      title = {
        Text(text = "Are you sure you want to delete all completed tasks?")
      },
      confirmButton = {
        Button(
          colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.error
          ),
          onClick = {
            viewModel.deleteCompletedTasks()
            this.value = false
          }) {
          Text(text = "Yes")
        }
      },
      dismissButton = {
        Button(
          colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
          ),
          onClick = {
            this.value = false
          }) {
          Text(text = "No")
        }
      },
    )
  }
  return this
}
```

This code block creates an extension function for `MutableState<Boolean>` named `deleteAllTasksDialog`. It takes a `viewModel` parameter to interact with the tasks list.

When `this.value` is true, it shows an `AlertDialog` with a title asking the user if they are sure they want to delete all completed tasks. The dialog has two buttons: a confirm button labeled "Yes" and a dismiss button labeled "No".

The confirm button uses the `error` color from the Material Theme's color scheme. When clicked, it calls the `deleteCompletedTasks` function from the `viewModel` and sets `this.value` to false, closing the dialog.

The dismiss button uses the `primary` color from the Material Theme's color scheme. When clicked, it sets `this.value` to false, closing the dialog without deleting the tasks.

By creating this extension function, you can easily show a delete all tasks confirmation dialog in your app by using the `deleteAllTasksDialog` function with a `MutableState<Boolean>` controlling the visibility of the dialog and passing the view model.

## 🎬 Add Task Input Animation

Now that we have our state for toggling input visibility and the icons to control it, let's bring our input to life with animations! We'll make the "enter task" input slide down when it becomes visible and slide up when it's dismissed, as if it were hiding behind the top bar. First, we'll pass `isInputVisible` to our `TaskAppTopBar` component and add the icons that will toggle between a plus (to show the input) and an X (to hide the input).

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskAppTopBar(
  deleteAllTasksDialog: MutableState<Boolean>,
  isInputVisible: MutableState<Boolean>,
) {
  TopAppBar(
    title = {
      Text(text = "My Task App")
    },
    actions = {
      // Add our new icon button to the actions
      IconButton(onClick = {
        isInputVisible.value = !isInputVisible.value
      }) {
        // If the input is visible, show the Clear icon
        if (isInputVisible.value) {
          Icon(
            Icons.Default.Clear,
            contentDescription = "Clear Icon",
            tint = MaterialTheme.colorScheme.error
          )
        // If the input is NOT visible, show the Add icon
        } else {
          Icon(
            Icons.Default.Add,
            contentDescription = "Add Icon",
          tint = MaterialTheme.colorScheme.onPrimary
          )
        }
      }
      IconButton(onClick = {
        deleteAllTasksDialog.value = true
      }) {
        Icon(
          Icons.Default.Delete,
          contentDescription = "Delete Icon",
          tint = MaterialTheme.colorScheme.onPrimary
        )
      }
    }
    colors = TopAppBarDefaults.topAppBarColors(
      containerColor = MaterialTheme.colorScheme.primary,
      titleContentColor = MaterialTheme.colorScheme.onPrimary
    )
  )
}
```

To create a smooth sliding animation, we'll leverage the power of Kotlin's extension functions once more. First, add `const val ANIMATION_DURATION = 300` to the `./ui/theme/Dimensions.kt` file. This constant will define the duration of our animation.

It's time to make our app even more engaging with animations! In this section, we'll create an `ExpandAndShrinkAnimation` extension function that can be applied to any mutable state of type Boolean. This function will display its content with a smooth expanding or shrinking animation based on the state's value. Create a new file named `./utils/ExpandAndShrinkAnimation.kt`.

```kotlin
@Composable
fun MutableState<Boolean>.ExpandAndShrinkAnimation(
  content: @Composable () -> Unit,
) {
  AnimatedVisibility(
    visible = this.value,
    enter = expandVertically(
      animationSpec = tween(
        durationMillis = ANIMATION_DURATION
      )
    ),
    exit = shrinkVertically(
      animationSpec = tween(
        durationMillis = ANIMATION_DURATION
      )
    )
  ) {
    content()
  }
}
```

The `content` parameter is a higher-order function that accepts a composable function as input. This enables us to use the `ExpandAndShrinkAnimation` function as a wrapper for any composable content we want to animate.

Now, we can apply our `ExpandAndShrinkAnimation` to the `isInputVisible` state in the `TaskScreen` component.

```kotlin
// ...
  Scaffold(
    topBar = {
      TaskAppTopBar(deleteAllTasksDialog, isInputVisible)
    }) { paddingValues ->
    Column(
      modifier = Modifier
        .background(MaterialTheme.colorScheme.backgroundColor)
        .fillMaxSize()
        .padding(paddingValues)
        .imePadding(),
    ) {
      // Call our extension function and place the AddTaskInput component inside the content block
      isInputVisible.ExpandAndShrinkAnimation {
        AddTaskInput(viewModel)
      }
      LazyColumn(
        modifier = Modifier.weight(1f),
        content = {
          items(items = viewModel.taskList, key = {
            it.id
          }) { task ->
            TaskItem(viewModel, task)
          }
        })
    }
  }
// ...
```

Click the + icon and watch our new animation in action!

## 🚪 Task Enter and Exit Animation

Let's add some extra flair to our tasks as well. We'll apply the `ExpandAndShrinkAnimation` to each task item, and while we're at it, we'll also set up the foundation for a swipe-to-delete animation. Since we'll be wrapping our `TaskCard` with a lot of animation logic, we'll create a new component called `TaskItem` to hold this logic and wrap the `TaskCard`. Create a new file: `./components/TaskItem.kt`:

```kotlin
@Composable
fun TaskItem(
  viewModel: TaskViewModel,
  task: Task,
) {
  val itemAppeared = remember { mutableStateOf(false) }

  LaunchedEffect(
    key1 = true,
  ) {
    itemAppeared.value = true
  }

  itemAppeared.ExpandAndShrinkAnimation {
    TaskCard(
      task = task,
      toggleCompleted = viewModel::toggleTaskCompleted
    )
  }
}
```

Now, replace the `TaskCard` component with our new `TaskItem` in the `TaskScreen`.

```kotlin
// ...
      LazyColumn(
        modifier = Modifier.weight(1f),
        content = {
          items(items = viewModel.taskList, key = {
            it.id
          }) { task ->
            TaskItem(viewModel, task)
          }
        })
// ...
```

Add a task and watch our animation bring even more life to the app!

## 📛 Finally, Swipe To Delete Animation

Brace yourselves for the grand finale: our swipe-to-delete animation! We'll implement this feature within our `TaskItem` component. Let's dive in!

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskItem(
  viewModel: TaskViewModel,
  task: Task,
) {
  // Add our dismiss state for the animation
  val dismissState = rememberDismissState()
  // Swipe from left to right to dismiss
  val isDismissed =
    dismissState.isDismissed(DismissDirection.StartToEnd)

  val itemAppeared = remember { mutableStateOf(false) }

  LaunchedEffect(
    key1 = true,
  ) {
    itemAppeared.value = true
  }

  /* If the task has been dismissed, we want to play the swipe-to-delete
  animation, and once it's done, we'll play the task exit animation to
  make the swipe-to-dismiss background leave the view */
  LaunchedEffect(
    key1 = dismissState.isDismissed(DismissDirection.StartToEnd)
  ) {
    if (isDismissed) {
      itemAppeared.value = false
      delay(ANIMATION_DURATION.toLong())
      viewModel.deleteTask(task)
    }
  }

  itemAppeared.ExpandAndShrinkAnimation {
    // Wrap our component in the SwipeToDismiss component
    SwipeToDismiss(
      state = dismissState,
      modifier = Modifier,
      // Set our direction for swipe to dismiss
      directions = setOf(
        DismissDirection.StartToEnd
      ),
      // As we drag our component, this will be what is shown behind it
      background = {
        val color by animateColorAsState(
          when (dismissState.targetValue) {
            DismissValue.Default -> Color.White
            else -> MaterialTheme.colorScheme.error
          }
        )

        val scale by animateFloatAsState(
          if (dismissState.targetValue == DismissValue.Default) 0.75f else 1f
        )

        Box(
          Modifier
            .fillMaxSize()
            .background(color),
          contentAlignment = Alignment.CenterStart
        ) {
          Icon(
            Icons.Default.Delete,
            contentDescription = "Delete Icon",
            modifier = Modifier.scale(scale)
          )
        }
      },
      // The component we will be swiping to dismiss
      dismissContent = {
        /* We will see a red background behind our card, so we'll
        wrap it in this column with our background color to hide
        the background for a cleaner look */
        Column(
          modifier = Modifier.background(
            MaterialTheme.colorScheme.backgroundColor
          )
        ) {
          TaskCard(
            task = task,
            toggleCompleted = viewModel::toggleTaskCompleted
          )
        }
      }
    )
  }
}
```

And there you have it! We've successfully implemented a swipe-to-delete animation for our tasks. Congratulations on making it to the end of this tutorial!

---

In conclusion, we've built a dynamic and engaging to-do app using Jetpack Compose, Material 3, and animations. You've learned how to create custom animations and apply them to various components, making your app more interactive and visually appealing. Keep experimenting and exploring the possibilities with Jetpack Compose, and don't forget to have fun while doing it! Happy coding!
