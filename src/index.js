import "./style.css"
import { loadLayout } from "./init.js";
import { StorageManager } from "./StorageManager.js";
import { Todo } from "./todoItem.js";
import { DisplayController } from "./displayController.js";

const { sidebar, mainDisplay } = loadLayout();

DisplayController.renderAddButton(sidebar, () => {

    const newTodo = new Todo();

    newTodo.save()

    DisplayController.renderTodo(newTodo, mainDisplay, stageView(newTodo));
});

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

const savedTasks = StorageManager.getAllTodos();

if (savedTasks.length > 0) {
    savedTasks.forEach(task => {
        DisplayController.renderTodo(task, mainDisplay, stageView(task));
    });
} else {
    const defaultTask = new Todo();
    defaultTask.save();
    DisplayController.renderTodo(defaultTask, mainDisplay, stageView(defaultTask));
};
