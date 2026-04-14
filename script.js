let currentFilter = "all";

// GET tasks
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// SAVE tasks
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADD TASK
function addTask() {
  let input = document.getElementById("taskInput");
  let time = document.getElementById("taskTime").value;

  let text = input.value.trim();
  if (text === "") return;

  let tasks = getTasks();
  tasks.push({ text: text, done: false, time: time });

  saveTasks(tasks);
  input.value = "";
  showTasks();
}

// SHOW TASKS
function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = getTasks();
  let searchValue = document.getElementById("searchInput").value.toLowerCase();

  let visibleCount = 0;

  tasks.forEach((task, index) => {

    // FILTER
    if (currentFilter === "completed" && !task.done) return;
    if (currentFilter === "pending" && task.done) return;

    // SEARCH
    if (!task.text.toLowerCase().includes(searchValue)) return;

    visibleCount++;

    let li = document.createElement("li");

    // CHECKBOX
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = () => toggleTask(index);

    // TEXT + TIME
    let span = document.createElement("span");
    span.innerText = task.text + (task.time ? " ⏰ " + task.time : "");

    if (task.done) span.classList.add("completed");

    // EDIT BUTTON
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editTask(index);
    };

    // DELETE BUTTON
    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  // EMPTY MESSAGE
  if (visibleCount === 0) {
    taskList.innerHTML = "<p style='text-align:center;'>No tasks found 😔</p>";
  }

  // COUNTER
  document.getElementById("taskCount").innerText =
    `Showing: ${visibleCount} / Total: ${tasks.length}`;
}

// TOGGLE TASK
function toggleTask(index) {
  let tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
  showTasks();
}

// DELETE TASK
function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  showTasks();
}

// EDIT TASK
function editTask(index) {
  let tasks = getTasks();
  let newText = prompt("Edit your task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks(tasks);
    showTasks();
  }
}

// FILTER TASKS
function filterTasks(type) {
  currentFilter = type;
  showTasks();
}

// SEARCH
function searchTask() {
  showTasks();
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// LOAD ON START
window.onload = showTasks;