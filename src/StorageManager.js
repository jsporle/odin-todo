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
            for (let i = 0; i < storageEngine.length; i++) {
                const key = storageEngine.key(i);
                const rawData = JSON.parse(storageEngine.getItem(key));

                if (rawData && rawData.title !== undefined) {
                    const todo = new Todo(
                        rawData.title, 
                        rawData.list, 
                        rawData.dueDate,
                        rawData.priority);
                    todo.id = rawData.id;
                    todo.createdAt = rawData.createdAt || Date.now();
                    
                    todos.push(todo);
                }
            }
            return todos.sort((a, b) => a.createdAt - b.createdAt);
        }
    }
};