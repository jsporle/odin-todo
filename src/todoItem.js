export class Todo {
    constructor(title, list = [], dueDate) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.list = Array.isArray(list) ? list : [];
        this.dueDate = dueDate;
    }

    updateProperty(property, newValue) {
        this[property] = newValue;
        this.save();
    }

    updateListItem(index, text, checked) {
        if (this.list[index] !== undefined) {
            this.list[index] = { text, checked };
            this.save();
        }
    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }
}