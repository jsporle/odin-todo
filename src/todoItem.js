export class Todo {
    constructor(
        title = "Add new title",
        list = [{ text: "add new list item", checked: false}], 
        dueDate = new Date().toISOString().split("T")[0],
        priority = "1",
        createdAt = Date.now()
    ) {
        this.id = self.crypto.randomUUID();
        this.title = title;
        this.list = (Array.isArray(list) && list.length > 0) ? list : [{ text: "add new list item", checked: false }];
        this.dueDate = dueDate;
        this.priority = priority;
        this.createdAt = createdAt;
    }

    updateProperty(property, newValue) {
        this[property] = newValue;
    }
}