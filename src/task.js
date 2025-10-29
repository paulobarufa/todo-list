export class Task {

    constructor(name, description, notes, dueDate, projectid, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.projectid = projectid;
        this.id = crypto.randomUUID();
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }

    markCompleted() {
        this.completed = true;
    }

    markUncompleted() {
        this.completed = false;
    }
}