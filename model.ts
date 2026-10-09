type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

let nextId = 1;

function addTask(tasks: Task[], title: string): Task[] {
    const newTask: Task = {
        id: nextId++,
        title: title,
        status: "todo"
    };

    return [...tasks, newTask];
}

function completeTask(tasks: Task[], id: number): Task[] {
    return tasks.map((task) =>
        task.id === id
            ? { ...task, status: "done" }
            : task
    );
}

function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter((task) => task.status === status);
}

// Removes a task by ID without modifying the original array.
function deleteTask(tasks: Task[], id: number): Task[] {
    return tasks.filter((task) => task.id !== id);
}
