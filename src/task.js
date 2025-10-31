import { differenceInCalendarDays, formatRelative, format } from "date-fns";
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

    getDateFormat() {
        if (differenceInCalendarDays(this.dueDate, new Date()) >= 8) {
            return format(this.dueDate, "dd.MM.yyyy")
        } else {
            return formatRelative(this.dueDate, new Date()).split(' at ')[0]
        }
    }
}