import { Project } from "./project";
import { Task } from "./task";

export class StorageWriter {
    
    static getStorage() {
        
        const projectListObject = JSON.parse(localStorage.getItem("projectList"));

        let projectList = [];

        for (const projectObj of projectListObject) {
            let project = new Project(projectObj.name, projectObj.description, projectObj.notes, projectObj.dueDate)

            project.completed = projectObj.completed;
            project.id = projectObj.id;

            for (const taskObj of projectObj.tasks) {
                let task = new Task(taskObj.name, taskObj.description, taskObj.notes, taskObj.dueDate, taskObj.projectid, taskObj.priority);

                task.id = taskObj.id;
                task.completed = taskObj.completed;

                project.tasks.push(task);
            }

            projectList.push(project);

        }

        return projectList;

    }

    static setStorage(projectList) {
        localStorage.setItem("projectList", JSON.stringify(projectList));
    }

}