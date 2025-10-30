import { HTMLwriter } from "./HTMLwriter";
import { OperationManager } from "./operation";
import { StorageWriter } from "./storage";
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
        this.operationManager = new OperationManager(this)

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

        // Append views
        this.leftPanel.appendChild(colWrapper);
        this.mainPanel.appendChild(viewWrapper);
        this.rightNav.appendChild(buttonWrapper);

        // Event listener for create project
        const createProject = document.querySelector(".add-project")
        createProject.dataset.view = "4";
        createProject.dataset.mode = "2";
        createProject.dataset.id = "";
        createProject.addEventListener("click", (e) => this.updateView(e))
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
        
        if (e instanceof Event) {
            this.view = e.target.dataset.view;
            this.mode = e.target.dataset.mode;
            this.id = e.target.dataset.id;
        }
        
        
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

    deleteObject(objectType, objectId) {

        if (objectType == "4") {

            this.operationManager.deleteProject(objectId)
            this.view = "1";
            this.mode = "1";
            this.id = "";

        } else if (objectType == "5") {

            const projectId = this.getTask(objectId).projectid
            this.operationManager.deleteTask(projectId, objectId)
            this.view = "4";
            this.mode = "1";
            this.id = projectId;
        }

        this.updateView()

    }

    saveChanges(objectType, objectMode) {
        // New project
        if (objectType == "4" && objectMode == "2") {
            this.id = this.operationManager.newProject();
        }

        // Edit project
        if (objectType == "4" && objectMode == "3") {
            this.id = this.operationManager.saveProject(this.id);
        }

        // New task
        if (objectType == "5" && objectMode == "2") {
            this.id = this.operationManager.newTask(this.id);
        }

        // Edit task
        if (objectType == "5" && objectMode == "3") {
            this.id = this.operationManager.saveTask(this.id);
        }

        this.updateView()

    }
    
    markCompleted(objectType, objectId) {
        if (objectType == "4") this.getProject(objectId).markCompleted();
        if (objectType == "5") this.getTask(objectId).markCompleted();
        StorageWriter.setStorage(this.projects)
        this.updateView()
    }
}