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
            projImage.src = project.completed ? checkIcon : projectIcon;
            projImage.classList.add("col-icon", "icon");

            projDiv.append(projImage, projTitle);

            newWrapper.appendChild(projDiv);

            for (const task of project.tasks) {
                let taskDiv = document.createElement("div");
                taskDiv.classList.add("col-item", "task-col-title");

                const taskTitle = document.createTextNode(task.name);
                
                const taskImg = document.createElement("img");
                taskImg.src = task.completed ? checkIcon : taskIcon;
                taskImg.classList.add("col-icon", "task-icon", "icon");
                
                taskDiv.append(taskImg, taskTitle);

                newWrapper.appendChild(taskDiv);
            }
        }

        return newWrapper;
    }

    static generateView(viewObj) {


        /* 
    <div class="main-title-wrapper">
        <img src="./images/project.svg" class="main-project-icon icon">
        <h1 class="project-title">Project Title</h1>
    </div>
        <p class="main-text">This is the description of the project.</p>
        <p class="due-date">Due in x days (dd/mm/yyyy)</p>
        <h2 class="main-header">Notes</h2>
        <p class="main-text">Notes</p>
        <h2 class="main-header">Tasks</h2>
        */
    }

    #generateProjectView(project) {

        const mainWrapper = document.createElement("div")

        const titleWrapper = document.createElement("div")
        titleWrapper.classList.add("main-title-wrapper")

        const projectImg = document.createElement("img")
        img.src = project.completed ? checkIcon : projectIcon;
        img.classList.add("main-project-icon", "icon")

        const projectTitle = document.createElement("h1")
        projectTitle.classList.add("project-title")

        projectTitle.appendChild(document.createTextNode(project.name))

        titleWrapper.append(projectImg, projectTitle)

        const description = document.createElement("p")
        description.classList.add("main-text")
        description.appendChild(document.createTextNode(project.description))

        const dueDate = document.createElement("p")
        dueDate.classList.add("due-date")
        dueDate.appendChild(document.createTextNode(project.dueDate))

        const notesHeader = document.createElement("h2")
        notesHeader.classList.add("main-header")
        notesHeader.appendChild(document.createTextNode("Notes"))

        const notes = document.createElement("p")
        notes.classList.add("main-text")
        notes.appendChild(document.createTextNode(project.notes))

        const tasksHeader = document.createElement("h2")
        tasksHeader.classList.add("main-header")
        tasksHeader.appendChild(document.createTextNode("Tasks"))

        // Create tasks goes here, include task id in data property

        mainWrapper.append(titleWrapper, description, dueDate, notesHeader, notes, tasksHeader);




    }


}