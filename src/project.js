export class Project {

    tasks = [];
    completed = false;

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.id = id = crypto.randomUUID();
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(item => item.id !== task.id)
    }

    markCompleted() {
        this.completed = true;
    }

    markUncompleted() {
        this.completed = false;
    }

}