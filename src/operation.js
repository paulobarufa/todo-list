import { Project } from "./project";
import { Task } from "./task";
import { ViewController } from "./view";
import { StorageWriter } from "./storage";

export class OperationManager {

    constructor(viewController) {
        this.viewController = viewController;
    }

    newTask() {

    }

    saveTask() {

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

    }

    saveProject() {

    }

    deleteProject(projectid) {

        this.viewController.projects = this.viewController.projects.filter(item => item.id !== projectid)

        StorageWriter.setStorage(this.viewController.projects)

        this.viewController.view = 1;
        this.viewController.mode = 1;
        this.id = "";

    }

}