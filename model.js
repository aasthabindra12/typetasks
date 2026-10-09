let nextId = 1;
export function addTask(tasks, title) {
    const newTask = {
        id: nextId++,
        title: title,
        status: "todo"
    };
    return [...tasks, newTask];
}
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id
        ? { ...task, status: "done" }
        : task);
}
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// Extra operation: delete a task by its ID.
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
//# sourceMappingURL=model.js.map