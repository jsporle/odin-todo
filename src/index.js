import "./style.css"
import { loadLayout } from "./init.js";
import { StorageManager } from "./StorageManager.js";
import { Todo } from "./todoItem.js";
import { DisplayController } from "./displayController.js";

const db = StorageManager(localStorage);

const handleDelete = (todo) => {
    db.remove(todo.id);
};

const handleUpdate = (todo, property, value) => {
    todo.updateProperty(property, value);
    db.save(todo.id, todo);
};

const { sidebar, mainDisplay } = loadLayout();

DisplayController.renderAddButton(sidebar, () => {

    const newTodo = new Todo();

    db.save(newTodo.id, newTodo);

    DisplayController.renderTodo(newTodo, mainDisplay, stageView(newTodo));
});

const stageView = (task) => ({
    onDelete: () => handleDelete(task),
    onUpdate: (property, value) => handleUpdate(task, property, value)
});

const savedTasks = db.getAllTodos();

if (savedTasks.length > 0) {
    savedTasks.forEach(task => {
        DisplayController.renderTodo(task, mainDisplay, stageView(task));
    });
} else {
    const defaultTask = new Todo();
    db.save(defaultTask.id, defaultTask);
    DisplayController.renderTodo(defaultTask, mainDisplay, stageView(defaultTask));
};
