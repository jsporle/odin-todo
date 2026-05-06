export class Todo {
    constructor(title, description, dueDate) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }

    updateProperty(property, newValue) {
        this[property] = newValue;
        this.save();
    }
}