import { HTMLwriter } from "./HTMLwriter";
/* 
Represent application state.

Views:
1 - Due today
2 - Upcoming
3 - Important
4 - Project
5 - Task

Modes:
1 - View
2 - New
3 - Edit
*/

export class ViewController {

    view = 1;
    mode = 1;
    id = "";

    constructor(projects) {
        this.projects = projects;

        // Get wrappers
        this.leftPanel = document.querySelector(".left-panel");
        this.mainPanel = document.querySelector(".right-panel");

        // Create views
        const colWrapper = HTMLwriter.generateCol(this);
        const viewWrapper = HTMLwriter.generateView(this);

        // Clear Wrappers
        //mainPanel.innerHTML = "";
        this.leftPanel.innerHTML = "";

        //Append views
        this.leftPanel.appendChild(colWrapper);
        this.mainPanel.appendChild(viewWrapper);
    }

    getProject(projectid) {
        return this.projects.find(obj => { return obj.projectid === projectid })
    }

    getTask(taskid) {
        for (let project of this.projects) {
            for (let task of project.tasks) {
                if (task.id == taskid) return task;
            }
        }
    }

    getDueToday() {

    }

    getUpcoming() {

    }

    getImportant() {

    }

    sortItems() {

    }
    
    updateView(e) {
        console.log(this.mode)
    }
    
}