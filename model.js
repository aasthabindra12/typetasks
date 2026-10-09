"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let nextId = 1;
function addTask(tasks, title) {
    const newTask = {
        id: nextId++,
        title: title,
        status: "todo"
    };
    return [...tasks, newTask];
}
function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id
        ? { ...task, status: "done" }
        : task);
}
function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// Extra operation: delete a task by its ID.
function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
let tasks = [];
tasks = addTask(tasks, "Study TypeScript");
tasks = addTask(tasks, "Complete assignment");
console.log("All tasks:", tasks);
console.log("Completed:", completeTask(tasks, 1));
console.log("To-do tasks:", filterByStatus(tasks, "todo"));
console.log("After deletion:", deleteTask(tasks, 2));
//# sourceMappingURL=model.js.map