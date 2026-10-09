import {
    type Task,
    type TaskStatus,
    addTask,
    completeTask,
    filterByStatus
} from "./model.js";

let tasks: Task[] = [];
let currentFilter: TaskStatus | "all" = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const statusInput = document.getElementById("status") as HTMLSelectElement;
const addButton = document.getElementById("add") as HTMLButtonElement;
const taskList = document.getElementById("list") as HTMLUListElement;
const chips = document.getElementById("chips") as HTMLDivElement;

function renderTasks(): void {
    taskList.innerHTML = "";

    const visibleTasks =
        currentFilter === "all"
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

function renderFilters(): void {
    chips.innerHTML = "";

    const filters: (TaskStatus | "all")[] = [
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

    const selectedStatus = statusInput.value as TaskStatus;

    tasks = addTask(tasks, title);

    const lastIndex = tasks.length - 1;
    tasks[lastIndex]!.status = selectedStatus;

    titleInput.value = "";
    renderTasks();
});

titleInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});

renderFilters();
renderTasks();
