// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
  // Clear the lists
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  // Loop through tasks and add them to the appropriate list
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // Create a list item
    const li = document.createElement("li");
    li.textContent = `${task.text} (Added: ${task.addedOn})`;

    // Create buttons for complete, edit, and delete
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = () => toggleComplete(i);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.onclick = () => editTask(i);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(i);

    // Append buttons to the list item
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Add the task to the appropriate list
    if (task.completed) {
      li.classList.add("completed");
      completedTasks.appendChild(li);
    } else {
      pendingTasks.appendChild(li);
    }
  }
}

// Function to add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return; // Don't add empty tasks

  // Create a new task object
  const newTask = {
    text: text,
    completed: false,
    addedOn: new Date().toLocaleString(),
  };

  // Add the task to the array
  tasks.push(newTask);

  // Clear the input field
  taskInput.value = "";

  // Re-render the tasks
  renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1); // Remove the task from the array
    renderTasks();
  }
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(); // Add task on pressing Enter
});

// Initial render
renderTasks();
