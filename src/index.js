import "./style.css"
import { loadLayout } from "./init.js";
import { StorageManager } from "./StorageManager.js";
import { Todo } from "./todoItem.js";
import { DisplayController } from "./displayController.js";

const { mainDisplay } = loadLayout();

const handleUpdate = (todo, property, value) => {
    todo.updateProperty(property, value);
};

const handleDelete = (todo) => {
    localStorage.removeItem(todo.id);
};

const stageView = (task) => ({
    onDelete: () => handleDelete(task),
    onUpdate: (property, value) => handleUpdate(task, property, value)
});

const savedTasks = StorageManager.getAllTodos().map(data => {
    const task = new Todo(data.title, data.list, data.dueDate);
    task.id = data.id;
    return task;
});

if (savedTasks.length > 0) {
    savedTasks.forEach(task => {
        DisplayController.renderTodo(task, mainDisplay, stageView(task));
    });
} else {
    const defaultTask = new Todo("Add new title", [{ text: "add new list item", checked:false }], "01/01/2099");
    defaultTask.save();
    DisplayController.renderTodo(defaultTask, mainDisplay, stageView(defaultTask));
};
