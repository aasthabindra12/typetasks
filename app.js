import { addTask, completeTask, filterByStatus } from "./model.js";
let tasks = [];
let currentFilter = "all";
const titleInput = document.getElementById("title");
const statusInput = document.getElementById("status");
const addButton = document.getElementById("add");
const taskList = document.getElementById("list");
const chips = document.getElementById("chips");
function renderTasks() {
    taskList.innerHTML = "";
    const visibleTasks = currentFilter === "all"
        ? tasks
        : filterByStatus(tasks, currentFilter);
    if (visibleTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks here yet!";
        taskList.appendChild(emptyMessage);
        return;
    }
    visibleTasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = "task";
        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        const taskStatus = document.createElement("small");
        taskStatus.textContent = task.status;
        item.appendChild(taskTitle);
        item.appendChild(taskStatus);
        if (task.status !== "done") {
            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.addEventListener("click", () => {
                tasks = completeTask(tasks, task.id);
                renderTasks();
            });
            item.appendChild(completeButton);
        }
        taskList.appendChild(item);
    });
}
function renderFilters() {
    chips.innerHTML = "";
    const filters = [
        "all",
        "todo",
        "in-progress",
        "done"
    ];
    filters.forEach((filter) => {
        const button = document.createElement("button");
        button.textContent = filter === "all" ? "All" : filter;
        button.className = currentFilter === filter ? "active" : "";
        button.addEventListener("click", () => {
            currentFilter = filter;
            renderFilters();
            renderTasks();
        });
        chips.appendChild(button);
    });
}
addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (title === "") {
        titleInput.focus();
        return;
    }
    const selectedStatus = statusInput.value;
    tasks = addTask(tasks, title);
    const lastIndex = tasks.length - 1;
    tasks[lastIndex].status = selectedStatus;
    titleInput.value = "";
    renderTasks();
});
titleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});
renderFilters();
renderTasks();
//# sourceMappingURL=app.js.map