import { Project } from "./project";
import { Task } from "./task";

export class StorageWriter {
    
    getStorage() {
        const projectListObject = JSON.parse(localStorage.getItem("projectList"));

        let projectList = [];

        for (const project of projectList) {
            
        }

    }

    setStorage(projectList) {
        localStorage.setItem("projectList", JSON.stringify(projectList));
    }

}