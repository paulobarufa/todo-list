import { Project } from "./project";
import { Task } from "./task";
import { ViewController } from "./view";
import { StorageWriter } from "./storage";

export class OperationManager {

    constructor(viewController) {
        this.viewController = viewController;
    }

    newTask(projectid) {

        const taskTitle = document.querySelector("#input-task-title").value
        const taskDescription = document.querySelector("#input-task-description").value
        const taskDate = document.querySelector("#input-task-date").value
        const taskNotes = document.querySelector("#input-task-notes").value
        const taskPriority = document.querySelector('input[name=task-priority]:checked').value

        const project = this.viewController.getProject(projectid)

        const newTask = new Task(taskTitle, taskDescription, taskNotes, taskDate, projectid, taskPriority)
        project.addTask(newTask)

        StorageWriter.setStorage(this.viewController.projects)

        this.viewController.view = 5;
        this.viewController.mode = 1;
        this.id = projectid;

        return newTask.id;

    }

    saveTask(taskid) {
        const task = this.viewController.getTask(taskid)

        task.name = document.querySelector("#input-task-title").value
        task.description = document.querySelector("#input-task-description").value
        task.dueDate = document.querySelector("#input-task-date").value
        task.notes = document.querySelector("#input-task-notes").value
        task.priority = document.querySelector('input[name=task-priority]:checked').value

        StorageWriter.setStorage(this.viewController.projects)

        this.viewController.view = 5;
        this.viewController.mode = 1;
        this.id = projectid;

        return task.id;

    }

    deleteTask(projectid, taskid) {

        const project = this.viewController.projects.find(obj => { return obj.projectid === projectid })
        project.removeTask(taskid)

        StorageWriter.setStorage(this.viewController.projects)

        this.viewController.view = 4;
        this.viewController.mode = 1;
        this.id = projectid;

    }

    newProject() {
        const projectTitle = document.querySelector("#input-project-title").value
        const projectDescription = document.querySelector("#input-project-description").value
        const projectDate = document.querySelector("#input-project-date").value
        const projectNotes = document.querySelector("#input-project-notes").value

        const project = new Project(projectTitle, projectDescription, projectNotes, projectDate)
        this.viewController.projects.push(project)

        this.viewController.view = 4;
        this.viewController.mode = 1;
        this.id = project.id;

        return project.id;
    }

    saveProject(projectid) {
        const project = this.viewController.getProject(projectid)

        project.name = document.querySelector("#input-project-title").value
        project.description = document.querySelector("#input-project-description").value
        project.dueDate = document.querySelector("#input-project-date").value
        project.notes = document.querySelector("#input-project-notes").value

        StorageWriter.setStorage(this.viewController.projects)

        this.viewController.view = 4;
        this.viewController.mode = 1;
        this.id = project.id;

        return project.id;
    }

    deleteProject(projectid) {

        this.viewController.projects = this.viewController.projects.filter(item => item.id !== projectid)

        StorageWriter.setStorage(this.viewController.projects)

        this.viewController.view = 1;
        this.viewController.mode = 1;
        this.id = "";

    }

}