import "./style.css"
import { loadLayout } from "./init.js";
import { Todo } from "./todoItem.js";
import { DisplayController } from "./displayController.js";

const { mainDisplay } = loadLayout();

const task = new Todo("Finish Project", "Complete todo list", "07/05/2026");

DisplayController.renderTodo(task, mainDisplay);
