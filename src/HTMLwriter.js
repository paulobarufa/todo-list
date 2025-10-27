import projectIcon from "./images/project.svg"
import taskIcon from "./images/task.svg"
import checkIcon from "./images/check.svg"

export class HTMLwriter {

    static generateCol(projArray) {

        let newWrapper = document.createElement("div");

        for (const project of projArray) {
            let projDiv = document.createElement("div");
            projDiv.classList.add("col-item", "proj-col-title");

            const projTitle = document.createTextNode(project.name);

            const projImage = document.createElement("img");
            projImage.src = projectIcon;
            projImage.classList.add("col-icon");

            projDiv.append(projImage, projTitle);

            newWrapper.appendChild(projDiv);

            for (const task of project.tasks) {
                let taskDiv = document.createElement("div");
                taskDiv.classList.add("col-item", "task-col-title");

                const taskTitle = document.createTextNode(task.name);
                
                const taskImg = document.createElement("img");
                taskImg.src = taskIcon;
                taskImg.classList.add("col-icon", "task-icon");
                
                taskDiv.append(taskImg, taskTitle);

                newWrapper.appendChild(taskDiv);
            }
        }

        return newWrapper;
    }
}