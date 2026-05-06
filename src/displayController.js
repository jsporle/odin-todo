export const DisplayController = {
    renderTodo(todoObj, container) {
        const div = document.createElement("div");
        div.classList.add("todo-item");
        
        const itemTitle = document.createElement("span");
        itemTitle.textContent = todoObj.title;
        
        const itemDescription = document.createElement("span");
        itemDescription.textContent = todoObj.description;
        
        const itemDueDate = document.createElement("span");
        itemDueDate.textContent = todoObj.dueDate;

        div.appendChild(itemTitle);
        div.appendChild(itemDescription);
        div.appendChild(itemDueDate);
        container.appendChild(div);
    }
};