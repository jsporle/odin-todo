export class Todo {
    constructor(
        title = "Add new title",
        list = [{ text: "add new list item", checked: false}], 
        dueDate = new Date().toISOString().split("T")[0]
    ) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.list = (Array.isArray(list) && list.length > 0) ? list : [{ text: "add new list item", checked: false }];
        this.dueDate = dueDate;
    }

    updateProperty(property, newValue) {
        this[property] = newValue;
    }
}