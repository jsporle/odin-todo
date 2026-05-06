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

    const createListLine = (itemData, index) => {
        const li = document.createElement("li")
        const textInput = document.createElement("textarea");

        const adjustHeight = (el) => {
            el.style.height = "auto"
            el.style.height = (el.scrollHeight) + "px";
        };

        textInput.value = itemData.text || "";

        const textID = `todo-${todoObj.id}-item-${index}`;
        textInput.id = textID;
        textInput.rows = 1;

        textInput.addEventListener("input", function() {
            adjustHeight(this);
        });

        setTimeout(() => adjustHeight(textInput), 0);

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
                    const allInputs = ul.querySelectorAll("textarea");
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
    };

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
