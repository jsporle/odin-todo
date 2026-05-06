import { renderTodo } from "./TodoComponent.js";

export const DisplayController = {
    renderTodo,

    renderAddButton(container, onAdd) {
        const btn = document.createElement("button");
        btn.textContent = "+ Add New To-Do List";
        btn.classList.add("add-todo-btn");
        btn.addEventListener("click", onAdd);
        container.appendChild(btn);
    }
};