export const DisplayController = {
    renderTodo(todoObj, container, { onDelete, onUpdate }) {
        const div = document.createElement("div");
        div.classList.add("todo-item");
        
        const titleInput = document.createElement("input");
        titleInput.value = todoObj.title;
        titleInput.classList.add("todo-title");
        titleInput.addEventListener("blur", ()=> {
            onUpdate("title", titleInput.value);
        }) 

        const inputID = `title-${todoObj.id}`;
        titleInput.id = inputID;
        titleInput.name = inputID;

        titleInput.addEventListener("focus", () => {
            if (titleInput.value === "Add new title") {
            titleInput.value = "";
            }
        });

        titleInput.addEventListener("blur", () => {
            if (titleInput.value === "") {
                titleInput.value = "Add new title";
                }
        });

        const ul = document.createElement("ul");

        const createListLine = (itemData, index) => {
            const li = document.createElement("li")
            
            const textInput = document.createElement("input");
            textInput.type = "text"
            const textID = `todo-${todoObj.id}-item-${index}`;
            textInput.id = textID;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const checkID = `check-${todoObj.id}-item-${index}`;
            checkbox.id = checkID;
            checkbox.name = checkID;
            checkbox.checked = itemData.checked;

            checkbox.addEventListener("change", () => {
                todoObj.list[index].checked = checkbox.checked;

                todoObj.save();
            })

            textInput.value = itemData.text;

            textInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const newIndex = index + 1;

                    todoObj.list.splice(index + 1, 0, { text: "", checked: false});
                    todoObj.save();

                    refreshList();
                    
                    setTimeout(() => {
                        const nextID = `todo-${todoObj.id}-item-${newIndex}`;
                        const nextInput = document.getElementById(nextID)
                        if (nextInput) {
                            nextInput.focus();
                        }
                    }, 0);
                } 
                else if (e.key === "Backspace" && textInput.value === "" && todoObj.list.length > 1) {
                    e.preventDefault()
                    todoObj.list.splice(index, 1);
                    todoObj.save()
                    refreshList();

                    setTimeout(() => {
                        const allInputs = ul.querySelectorAll('input[type="text"]');
                        const targetIndex = index > 0 ? index -1 : 0;
                        if (allInputs[targetIndex]) {
                            allInputs[targetIndex].focus();
                        }
                    }, 0);
                }
            });

            textInput.addEventListener("focus", () => {
                if (textInput.value === "add new list item") {
                textInput.value = "";
                }
            });

            textInput.addEventListener("blur", () => {
                if (textInput.value === "") {
                textInput.value = "add new list item";
                }
                if (todoObj.list[index]) {
                    todoObj.list[index].text = textInput.value;todoObj.save();
                }
            });

            li.appendChild(textInput);
            li.appendChild(checkbox);
            return li;
        }

        const refreshList = () => {
            ul.innerHTML = "";
            if (todoObj.list.length === 0) todoObj.list.push({ text: "", checked: false});

            todoObj.list.forEach((item, index) => {
                ul.appendChild(createListLine(item, index));
            });
        };

        refreshList();
    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn")

        const deleteBtnID = `delete-${todoObj.id}`;
        deleteBtn.id = deleteBtnID;
        deleteBtn.name = deleteBtnID;

        deleteBtn.addEventListener("click", () => {
            onDelete();
            div.remove();
        });
        
        const itemDueDate = document.createElement("span");
        itemDueDate.textContent = todoObj.dueDate;

        div.append(titleInput, ul, itemDueDate, deleteBtn)
        container.appendChild(div);
    }
};