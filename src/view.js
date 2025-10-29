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

    view = "1";
    mode = "1";
    id = "";

    constructor(projects) {
        this.projects = projects;

        // Get wrappers
        this.leftPanel = document.querySelector(".left-panel");
        this.mainPanel = document.querySelector(".right-panel");
        this.rightNav = document.querySelector(".right-nav");

        // Clear Wrappers
        this.mainPanel.innerHTML = "";
        this.leftPanel.innerHTML = "";
        this.rightNav.innerHTML = "";

        // Create views
        const colWrapper = HTMLwriter.generateCol(this);
        const viewWrapper = HTMLwriter.generateView(this);
        const buttonWrapper = HTMLwriter.generateButtons(this);

        //Append views
        this.leftPanel.appendChild(colWrapper);
        this.mainPanel.appendChild(viewWrapper);
        this.rightNav.appendChild(buttonWrapper);
    }

    getProject(projectid) {
        for (let project of this.projects) {
            if (project.id == projectid) return project
        }
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
        this.view = e.target.dataset.view;
        this.mode = e.target.dataset.mode;
        this.id = e.target.dataset.id;
        
        // Clear Wrappers
        this.mainPanel.innerHTML = "";
        this.leftPanel.innerHTML = "";
        this.rightNav.innerHTML = "";
        
        // Create views
        const colWrapper = HTMLwriter.generateCol(this);
        const viewWrapper = HTMLwriter.generateView(this);
        const buttonWrapper = HTMLwriter.generateButtons(this);
        
        //Append views
        this.leftPanel.appendChild(colWrapper);
        this.mainPanel.appendChild(viewWrapper);
        this.rightNav.appendChild(buttonWrapper);

    }
    
}