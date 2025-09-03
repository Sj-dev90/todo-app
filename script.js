// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn">✔</button>
        <button class="edit-btn">✏</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    // Complete
    li.querySelector(".complete-btn").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Edit
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    });

    // Delete
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Dark mode toggle
const toggleThemeBtn = document.getElementById("toggle-theme");

// Check if dark mode was saved before
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  toggleThemeBtn.textContent = "☀ Light Mode";
}

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleThemeBtn.textContent = "☀ Light Mode";
    localStorage.setItem("darkMode", "enabled");
  } else {
    toggleThemeBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("darkMode", "disabled");
  }
});
// Filter buttons
document.getElementById("all").addEventListener("click", () => renderTasks("all"));
document.getElementById("completed").addEventListener("click", () => renderTasks("completed"));
document.getElementById("pending").addEventListener("click", () => renderTasks("pending"));

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn">✔</button>
        <button class="edit-btn">✏</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    // Complete
    li.querySelector(".complete-btn").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    });

    // Edit
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText;
        saveTasks();
        renderTasks(filter);
      }
    });

    // Delete
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks(filter);
    });

    taskList.appendChild(li);
  });
}

