// Selecting elements
const taskInput = document.getElementById("task-input");
const taskDateTime = document.getElementById("task-datetime");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDateTimeValue = taskDateTime.value;

  if (taskText !== "" && taskDateTimeValue !== "") {
    const newTask = {
      id: Date.now(),
      text: taskText,
      dateTime: taskDateTimeValue,
      isCompleted: false, // Add isCompleted property to track task completion
    };

    tasks.push(newTask);
    taskInput.value = "";
    taskDateTime.value = "";
    renderTasks();
  } else {
    alert("Please enter a task and a date/time.");
  }
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    if (task.isCompleted) {
      li.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.textContent = `${task.text} - ${new Date(
      task.dateTime
    ).toLocaleString()}`;

    const markDoneBtn = document.createElement("button");
    markDoneBtn.textContent = task.isCompleted ? "Undo" : "Mark as Done";
    markDoneBtn.classList.add("mark-done");
    markDoneBtn.addEventListener("click", () => toggleTaskCompletion(task.id));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(taskText);
    li.appendChild(markDoneBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  task.isCompleted = !task.isCompleted;
  renderTasks();
}

// Delete task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Edit task
function editTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);

  taskInput.value = task.text;
  taskDateTime.value = task.dateTime;

  deleteTask(taskId);
}
