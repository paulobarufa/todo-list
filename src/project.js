import { isToday, differenceInCalendarDays, formatRelative, format } from "date-fns";
export class Project {

    tasks = [];

    constructor(name, description, notes, dueDate) {
        this.name = name;
        this.description = description;
        this.id = crypto.randomUUID();
        this.notes = notes;
        this.dueDate = dueDate;
        this.completed = false;
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

    getTasksDueToday() {
        const tasksToday = []
        for (let task of this.tasks) {
            if (isToday(task.dueDate)) {
                tasksToday.push(task);
            };
        }
        return tasksToday;
    }

    getImportantTasks() {
        const tasksImportant = []
        for (let task of this.tasks) {
            if (task.priority == 1) {
                tasksImportant.push(task);
            };
        }
        return tasksImportant;
    }

    getUpcomingTasks() {
        const upcomingTasks = []
        for (let task of this.tasks) {
            const dateDifference = differenceInCalendarDays(task.dueDate, new Date())
            console.log(dateDifference)
            if (dateDifference >= 0 && dateDifference <= 7) {
                upcomingTasks.push(task);
            };
        }
        return upcomingTasks;
    }

    getDateFormat() {
        if (differenceInCalendarDays(this.dueDate, new Date()) >= 8) {
            return format(this.dueDate, "dd.MM.yyyy")
        } else {
            return formatRelative(this.dueDate, new Date()).split(' at ')[0]
        }
    }
}