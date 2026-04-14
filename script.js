function showTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = getTasks();
  let searchValue = document.getElementById("searchInput").value.toLowerCase();

  tasks.forEach((task, index) => {

    if (currentFilter === "completed" && !task.done) return;
    if (currentFilter === "pending" && task.done) return;

    if (!task.text.toLowerCase().includes(searchValue)) return;

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

    // EDIT
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editTask(index);
    };

    // DELETE
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

  // COUNTER
  document.getElementById("taskCount").innerText =
    "Total: " + tasks.length;
}