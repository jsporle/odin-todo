import { Todo } from "./todoItem.js";

export const StorageManager = (storageEngine) => {
    return {
        save(key, data) {
            storageEngine.setItem(key, JSON.stringify(data));
        },

        remove(key) {
            storageEngine.removeItem(key);
        },
    
        getAllTodos() {
            const todos = []
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const rawData = JSON.parse(localStorage.getItem(key));

                if (rawData && rawData.title !== undefined) {
                    const todo = new Todo(rawData.title, rawData.list, rawData.dueDate);
                    todo.id = rawData.id;
                    todos.push(todo);
                }
            }
            return todos;
        }
    };
};