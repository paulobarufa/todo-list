export class Project {

    tasks = [];
    completed = false;

    constructor(name, description, notes, dueDate) {
        this.name = name;
        this.description = description;
        this.id = crypto.randomUUID();
        this.notes = notes;
        this.dueDate = dueDate;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskid) {
        this.tasks = this.tasks.filter(item => item.id !== taskid)
    }

    markCompleted() {
        this.completed = true;
    }

    markUncompleted() {
        this.completed = false;
    }

}