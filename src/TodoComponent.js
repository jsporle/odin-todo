const autoResizeListItem = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
};

const addNewTaskItem = (todoObj, index, onUpdate) => {
    todoObj.list.splice(index + 1, 0, { text: "", checked: false });
    onUpdate("list", todoObj.list);
};

const removeTaskItem = (todoObj, index, onUpdate) => {
    todoObj.list.splice(index, 1);
    onUpdate("list", todoObj.list);
};

const handleKeyboardNavigation = (e, index, todoObj, refreshCallback, onUpdate) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addNewTaskItem(todoObj, index, onUpdate);
        refreshCallback(index + 1);
    } 
    else if (e.key === "Backspace" && e.target.value === "" && todoObj.list.length > 1) {
        e.preventDefault();
        removeTaskItem(todoObj, index, onUpdate);
        refreshCallback(index > 0 ? index - 1 : 0);
    };
};

const handleTextUpdate = (textInput, index, todoObj, onUpdate) => {
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
                todoObj.list[index].text = textInput.value;
                onUpdate("list", todoObj.list);
            }
        });
};

export const renderTodo = (todoObj, container, { onDelete, onUpdate }) => {
    const div = document.createElement("div");
    div.classList.add("todo-item");
    
    const titleInput = document.createElement("input");
    titleInput.value = todoObj.title || "Add new title";
    titleInput.classList.add("todo-title");
    titleInput.addEventListener("blur", ()=> {
        let finalValue = titleInput.value.trim();
        if (titleInput.value === "") {
            titleInput.value = "Add new title";
            onUpdate("title", "");
        } else {
            onUpdate("title", finalValue);
        }
    });

    const inputID = `title-${todoObj.id}`;
    titleInput.id = inputID;
    titleInput.name = inputID;

    titleInput.addEventListener("focus", () => {
        if (titleInput.value === "Add new title") {
        titleInput.value = "";
        }
    });

    const ul = document.createElement("ul");

    const createListLine = (itemData, index, onUpdate) => {
        const li = document.createElement("li")
        const textInput = document.createElement("textarea");
        const checkbox = document.createElement("input");

        handleTextUpdate(textInput, index, todoObj, onUpdate);

        textInput.value = itemData.text || "";
        textInput.id = `todo-${todoObj.id}-item-${index}`;
        textInput.rows = 1;

        textInput.addEventListener("input", () => autoResizeListItem(textInput));

        textInput.addEventListener("keydown", (e) => {
            handleKeyboardNavigation(e, index, todoObj, (newFocusIndex) => {
                refreshList();
                const nextInput = document.getElementById(`todo-${todoObj.id}-item-${newFocusIndex}`);
                if (nextInput) nextInput.focus();
            }, onUpdate);
        });

        checkbox.type = "checkbox";
        checkbox.checked = itemData.checked;
        checkbox.addEventListener("change", () => {
            todoObj.list[index].checked = checkbox.checked;
            onUpdate("list", todoObj.list);
        });      

        li.append(textInput, checkbox);
        setTimeout(() => autoResizeListItem(textInput),0);
        return li;
    };

    const refreshList = () => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        if (todoObj.list.length === 0) {
            todoObj.list.push({ text: "", checked: false});
        }

        todoObj.list.forEach((item, index) => {
            ul.appendChild(createListLine(item, index, onUpdate));
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
    
    const dateContainer = document.createElement ("div");
    dateContainer.classList.add("date-container");

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Deadline: "

    const dateInputID = `date=${todoObj.id}`;
    dateLabel.setAttribute("for", dateInputID);

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = dateInputID;
    dateInput.classList.add("todo-date");

    const today = new Date().toISOString().split("T")[0];
    dateInput.value = todoObj.dueDate || today;

    dateInput.addEventListener("change", () => {
        onUpdate("dueDate", dateInput.value);
    });

    dateContainer.append(dateLabel, dateInput);

    div.append(
        titleInput,
        ul, 
        dateContainer, 
        deleteBtn
    );

    container.appendChild(div);
};
