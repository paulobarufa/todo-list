export class Task {

    completed = false;
    priority = 0;

    constructor(name, description, dueDate, project, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.id = crypto.randomUUID;
        this.priority = priority;
    }

    markCompleted() {
        this.completed = true;
    }

    markUncompleted() {
        this.completed = false;
    }
}