import projectIcon from "./images/project.svg"
import taskIcon from "./images/task.svg"
import checkIcon from "./images/check.svg"
import todayIcon from "./images/today.svg"
import upcomingIcon from "./images/upcoming.svg"
import importantIcon from "./images/important.svg"
import addIcon from "./images/plus.svg"
import saveIcon from "./images/save.svg"
import cancelIcon from "./images/cancel.svg"
import deleteIcon from "./images/delete.svg"
import editIcon from "./images/edit.svg"

export class HTMLwriter {

    static generateCol(viewObj) {

        // Main wrapper
        const wrapperPanel = document.createElement("div")
        wrapperPanel.classList.add("left-wrapper")

        const logo = document.createElement("div")
        logo.classList.add("logo")
        logo.appendChild(document.createTextNode("MauList."))

        const listWrapper = document.createElement("div")
        listWrapper.classList.add("list-wrapper")

        // Fixed wrapper
        const fixedWrapper = document.createElement("div")
        fixedWrapper.classList.add("fixed-wrapper")

        const colToday = document.createElement("div")
        if (viewObj.view == "1") colToday.classList.add("col-selected")
        colToday.classList.add("col-item", "today")
        const todayImg = document.createElement("img")
        todayImg.src = todayIcon;
        todayImg.classList.add("col-icon", "icon")
        colToday.append(todayImg, document.createTextNode("Due today"))
        colToday.dataset.view = "1";
        colToday.dataset.mode = "1";
        colToday.dataset.id = "";
        colToday.addEventListener("click", (e) => viewObj.updateView(e))

        const colUpcoming = document.createElement("div")
        if (viewObj.view == "2") colUpcoming.classList.add("col-selected")
        colUpcoming.classList.add("col-item", "upcoming")
        const UpcomingImg = document.createElement("img")
        UpcomingImg.src = upcomingIcon;
        UpcomingImg.classList.add("col-icon", "icon")
        colUpcoming.dataset.view = "2";
        colUpcoming.dataset.mode = "1";
        colUpcoming.dataset.id = "";
        colUpcoming.append(UpcomingImg, document.createTextNode("Upcoming"))
        colUpcoming.addEventListener("click", (e) => viewObj.updateView(e))

        const colImportant = document.createElement("div")
        if (viewObj.view == "3") colImportant.classList.add("col-selected")
        colImportant.classList.add("col-item", "important")
        const importantImg = document.createElement("img")
        importantImg.src = importantIcon;
        importantImg.classList.add("col-icon", "icon")
        colImportant.dataset.view = "3";
        colImportant.dataset.mode = "1";
        colImportant.dataset.id = "";
        colImportant.append(importantImg, document.createTextNode("Important"))
        colImportant.addEventListener("click", (e) => viewObj.updateView(e))

        const lineSeparator = document.createElement("hr")
        lineSeparator.classList.add("line-separator")

        fixedWrapper.append(colToday, colUpcoming, colImportant, lineSeparator)

        // Dynamic Wrapper
        const dynamicWrapper = document.createElement("div");
        dynamicWrapper.classList.add("dynamic-wrapper")

        for (const project of viewObj.projects) {
            const projDiv = document.createElement("div");
            projDiv.classList.add("col-item", "proj-col-title");
            if (viewObj.id == project.id) projDiv.classList.add("col-selected")

            const projTitle = document.createTextNode(project.name);

            const projImage = document.createElement("img");
            projImage.src = project.completed ? checkIcon : projectIcon;
            projImage.classList.add("col-icon", "icon");

            projDiv.append(projImage, projTitle);
            projDiv.dataset.view = "4";
            projDiv.dataset.mode = "1";
            projDiv.dataset.id = project.id;
            projDiv.addEventListener("click", (e) => viewObj.updateView(e))

            dynamicWrapper.appendChild(projDiv);

            for (const task of project.tasks) {
                const taskDiv = document.createElement("div");
                if (viewObj.id == task.id) taskDiv.classList.add("col-selected")
                taskDiv.classList.add("col-item", "task-col-title");

                const taskTitle = document.createTextNode(task.name);
                
                const taskImg = document.createElement("img");
                taskImg.src = task.completed ? checkIcon : taskIcon;
                taskImg.classList.add("col-icon", "task-icon", "icon");
                
                taskDiv.append(taskImg, taskTitle);

                taskDiv.dataset.view = "5";
                taskDiv.dataset.mode = "1";
                taskDiv.dataset.id = task.id;
                taskDiv.addEventListener("click", (e) => viewObj.updateView(e))

                dynamicWrapper.appendChild(taskDiv);
            }
        }

        listWrapper.append(fixedWrapper, dynamicWrapper)
        wrapperPanel.append(logo, listWrapper)

        return wrapperPanel;
    }

    static generateView(viewObj) {

        switch (viewObj.view) {
            case "1":
            case "2":
            case "3":
                return HTMLwriter.generateFixedView(viewObj)

            case "4":
                const project = viewObj.getProject(viewObj.id)
                if (viewObj.mode == "1") {
                    return HTMLwriter.generateProjectView(viewObj, project)
                } else {
                    return HTMLwriter.generateProjectEdit(viewObj, project)
                }

            case "5":
                const task = viewObj.getTask(viewObj.id)
                if (viewObj.mode == "1") {
                    return HTMLwriter.generateTaskView(viewObj, task)
                } else {
                    return HTMLwriter.generateTaskEdit(viewObj, task)
                }

            default:
                break;
        }

    }

    static generateProjectView(viewObj, project) {

        // View Wrapper
        const mainWrapper = document.createElement("div")

        // Information objects
        const titleWrapper = document.createElement("div")
        titleWrapper.classList.add("main-title-wrapper")

        const projectImg = document.createElement("img")
        projectImg.src = project.completed ? checkIcon : projectIcon;
        projectImg.classList.add("main-project-icon", "icon")

        const projectTitle = document.createElement("h1")
        projectTitle.classList.add("project-title")

        projectTitle.appendChild(document.createTextNode(project.name))

        titleWrapper.append(projectImg, projectTitle)

        const description = document.createElement("p")
        description.classList.add("main-text")
        description.appendChild(document.createTextNode(project.description))

        const dueDate = document.createElement("p")
        dueDate.classList.add("due-date")
        const dateString = "Due " + project.getDateFormat()
        dueDate.appendChild(document.createTextNode(dateString))

        const notesHeader = document.createElement("h2")
        notesHeader.classList.add("main-header")
        notesHeader.appendChild(document.createTextNode("Notes"))

        const notes = document.createElement("p")
        notes.classList.add("main-text")
        notes.appendChild(document.createTextNode(project.notes))

        const tasksHeader = document.createElement("h2")
        tasksHeader.classList.add("main-header")
        tasksHeader.appendChild(document.createTextNode("Tasks"))

        // Task objects

        const taskWrapper = document.createElement("div")
        taskWrapper.classList.add("task-wrapper")

        for (const task of project.tasks) {
            const taskDiv = document.createElement("div")
            taskDiv.classList.add("proj-task")

            const dateDiv = document.createElement("div")
            dateDiv.classList.add("proj-task-date")

            const taskImg = document.createElement("img")
            taskImg.src = task.completed ? checkIcon : taskIcon;
            taskImg.classList.add("project-task-icon", "icon")
            const dateTaskString = "Due " + task.getDateFormat()
            dateDiv.append(taskImg, document.createTextNode(dateTaskString))

            taskDiv.append(dateDiv, document.createTextNode(task.name))

            taskDiv.dataset.view = "5";
            taskDiv.dataset.mode = "1";
            taskDiv.dataset.id = task.id;
            taskDiv.addEventListener("click", (e) => viewObj.updateView(e))

            taskWrapper.appendChild(taskDiv);
        }


        // Append everything
        mainWrapper.append(titleWrapper, description, dueDate, notesHeader, notes, tasksHeader, taskWrapper);

        return mainWrapper;

    }

    static generateTaskView(viewObj, task) {

        // View Wrapper
        const mainWrapper = document.createElement("div")

        // Information objects
        const titleWrapper = document.createElement("div")
        titleWrapper.classList.add("main-title-wrapper")

        const taskImg = document.createElement("img")
        taskImg.src = task.completed ? checkIcon : taskIcon;
        taskImg.classList.add("main-project-icon", "icon")

        const taskTitle = document.createElement("h1")
        taskTitle.classList.add("project-title")

        taskTitle.appendChild(document.createTextNode(task.name))

        titleWrapper.append(taskImg, taskTitle)

        const description = document.createElement("p")
        description.classList.add("main-text")
        description.appendChild(document.createTextNode(task.description))

        const dueDate = document.createElement("p")
        dueDate.classList.add("due-date")
        const dateTaskString = "Due " + task.getDateFormat()
        dueDate.appendChild(document.createTextNode(dateTaskString))

        const notesHeader = document.createElement("h2")
        notesHeader.classList.add("main-header")
        notesHeader.appendChild(document.createTextNode("Notes"))

        const notes = document.createElement("p")
        notes.classList.add("main-text")
        notes.appendChild(document.createTextNode(task.notes))

        // Append everything
        mainWrapper.append(titleWrapper, description, dueDate, notesHeader, notes);

        return mainWrapper;
    }

    static generateProjectEdit(viewObj, project) {

        // View Wrapper
        const mainWrapper = document.createElement("div")

        // Information objects
        const formObject = document.createElement("form")
        formObject.classList.add("create-project")

        const formHeader = document.createElement("h1")
        formHeader.classList.add("project-title")
        const headerNode = viewObj.mode == "3" ? "Edit project" : "New project"
        formHeader.append(document.createTextNode(headerNode))

        // Title fieldset
        const fieldsetTitle = document.createElement("fieldset")
        fieldsetTitle.classList.add("fieldset-form")
        const labelTitle = document.createElement("label")
        labelTitle.classList.add("form-label")
        labelTitle.htmlFor = "form-project-title";
        labelTitle.appendChild(document.createTextNode("Title"))
        const inputTitle = document.createElement("input")
        inputTitle.type = "text";
        inputTitle.name = "input-project-title";
        inputTitle.id = "input-project-title";
        inputTitle.classList.add("text-input")
        fieldsetTitle.append(labelTitle, inputTitle)

        // Description fieldset
        const fieldsetDescription = document.createElement("fieldset")
        fieldsetDescription.classList.add("fieldset-form")
        const labelDescription = document.createElement("label")
        labelDescription.classList.add("form-label")
        labelDescription.htmlFor = "form-project-description";
        labelDescription.appendChild(document.createTextNode("Description"))
        const inputDescription = document.createElement("input")
        inputDescription.type = "text";
        inputDescription.name = "input-project-description";
        inputDescription.id = "input-project-description";
        inputDescription.classList.add("text-input")
        fieldsetDescription.append(labelDescription, inputDescription)

        // Date fieldset
        const fieldsetDate = document.createElement("fieldset")
        fieldsetDate.classList.add("fieldset-form")
        const labelDate = document.createElement("label")
        labelDate.classList.add("form-label")
        labelDate.htmlFor = "form-project-date";
        labelDate.appendChild(document.createTextNode("Due Date"))
        const inputDate = document.createElement("input")
        inputDate.type = "date";
        inputDate.name = "input-project-date";
        inputDate.id = "input-project-date";
        inputDate.classList.add("date-input")
        fieldsetDate.append(labelDate, inputDate)

        // Notes fieldset
        const fieldsetNotes = document.createElement("fieldset")
        fieldsetNotes.classList.add("fieldset-form")
        const labelNotes = document.createElement("label")
        labelNotes.classList.add("form-label")
        labelNotes.htmlFor = "form-project-notes";
        labelNotes.appendChild(document.createTextNode("Notes"))
        const inputNotes = document.createElement("textarea")
        inputNotes.name = "input-project-notes";
        inputNotes.id = "input-project-notes";
        inputNotes.rows = "6";
        inputNotes.classList.add("text-input")
        fieldsetNotes.append(labelNotes, inputNotes)

        // Append everything
        formObject.append(formHeader, fieldsetTitle, fieldsetDescription, fieldsetDate, fieldsetNotes);
        mainWrapper.append(formObject);

        // Set values if editing
        if (viewObj.mode == "3") {
            inputTitle.value = project.name;
            inputDescription.value = project.description;
            inputNotes.value = project.notes;
            inputDate.valueAsDate = project.dueDate;
        }

        return mainWrapper;
    }

    static generateTaskEdit(viewObj, task) {

        // View Wrapper
        const mainWrapper = document.createElement("div")

        // Information objects
        const formObject = document.createElement("form")
        formObject.classList.add("create-project")

        const formHeader = document.createElement("h1")
        formHeader.classList.add("project-title")
        formHeader.append(document.createTextNode("New Task"))

        // Title fieldset
        const fieldsetTitle = document.createElement("fieldset")
        fieldsetTitle.classList.add("fieldset-form")
        const labelTitle = document.createElement("label")
        labelTitle.classList.add("form-label")
        labelTitle.htmlFor = "form-task-title";
        labelTitle.appendChild(document.createTextNode("Title"))
        const inputTitle = document.createElement("input")
        inputTitle.type = "text";
        inputTitle.name = "input-task-title";
        inputTitle.id = "input-task-title";
        inputTitle.classList.add("text-input")
        fieldsetTitle.append(labelTitle, inputTitle)

        // Description fieldset
        const fieldsetDescription = document.createElement("fieldset")
        fieldsetDescription.classList.add("fieldset-form")
        const labelDescription = document.createElement("label")
        labelDescription.classList.add("form-label")
        labelDescription.htmlFor = "form-task-description";
        labelDescription.appendChild(document.createTextNode("Description"))
        const inputDescription = document.createElement("input")
        inputDescription.type = "text";
        inputDescription.name = "input-task-description";
        inputDescription.id = "input-task-description";
        inputDescription.classList.add("text-input")
        fieldsetDescription.append(labelDescription, inputDescription)

        // Date fieldset
        const fieldsetDate = document.createElement("fieldset")
        fieldsetDate.classList.add("fieldset-form")
        const labelDate = document.createElement("label")
        labelDate.classList.add("form-label")
        labelDate.htmlFor = "form-task-date";
        labelDate.appendChild(document.createTextNode("Due Date"))
        const inputDate = document.createElement("input")
        inputDate.type = "date";
        inputDate.name = "input-task-date";
        inputDate.id = "input-task-date";
        inputDate.classList.add("date-input")
        fieldsetDate.append(labelDate, inputDate)

        // Notes fieldset
        const fieldsetNotes = document.createElement("fieldset")
        fieldsetNotes.classList.add("fieldset-form")
        const labelNotes = document.createElement("label")
        labelNotes.classList.add("form-label")
        labelNotes.htmlFor = "form-task-notes";
        labelNotes.appendChild(document.createTextNode("Notes"))
        const inputNotes = document.createElement("textarea")
        inputNotes.name = "input-task-notes";
        inputNotes.id = "input-task-notes";
        inputNotes.rows = "6";
        inputNotes.classList.add("text-input")
        fieldsetNotes.append(labelNotes, inputNotes)

        // Priority fieldset
        const fieldsetPriority = document.createElement("fieldset")
        fieldsetPriority.classList.add("fieldset-form")
        const legendPriority = document.createElement("label")
        legendPriority.classList.add("form-label")
        legendPriority.appendChild(document.createTextNode("Priority"))

        const radioStandardWrapper = document.createElement("div")
        radioStandardWrapper.classList.add("radio-wrapper")
        const inputRadioStandard = document.createElement("input")
        inputRadioStandard.classList.add("radio-input")
        inputRadioStandard.type = "radio";
        inputRadioStandard.id = "radio-standard";
        inputRadioStandard.name = "task-priority";
        inputRadioStandard.value = 0;
        inputRadioStandard.checked = true;
        const labelStandard = document.createElement("label")
        labelStandard.classList.add("radio-label")
        labelStandard.htmlFor = "radio-standard";
        labelStandard.appendChild(document.createTextNode("Standard"))
        radioStandardWrapper.append(inputRadioStandard, labelStandard)

        const radioImportantWrapper = document.createElement("div")
        radioImportantWrapper.classList.add("radio-wrapper")
        const inputRadioImportant = document.createElement("input")
        inputRadioImportant.classList.add("radio-input")
        inputRadioImportant.type = "radio";
        inputRadioImportant.id = "radio-important";
        inputRadioImportant.name = "task-priority";
        inputRadioImportant.value = 1;
        const labelImportant = document.createElement("label")
        labelImportant.classList.add("radio-label")
        labelImportant.htmlFor = "radio-important";
        labelImportant.appendChild(document.createTextNode("Important"))
        radioImportantWrapper.append(inputRadioImportant, labelImportant)

        fieldsetPriority.append(legendPriority, radioStandardWrapper, radioImportantWrapper)

        // Append everything
        formObject.append(formHeader, fieldsetTitle, fieldsetDescription, fieldsetDate, fieldsetNotes, fieldsetPriority);
        mainWrapper.append(formObject);

        // Set values if editing
        if (viewObj.mode == "3") {
            inputTitle.value = task.name;
            inputDescription.value = task.description;
            inputNotes.value = task.notes;
            inputDate.valueAsDate = task.dueDate;
            inputRadioStandard.checked = task.important ? 0 : 1;
            inputRadioImportant.checked = task.important ? 1 : 0;
        }

        return mainWrapper;
    }

    static generateButtons(viewObj) {
        // Button wrapper
        const buttonWrapper = document.createElement("div")
        buttonWrapper.classList.add("button-wrapper")

        // Return empty for fixed views
        if (viewObj.view <= 3) return buttonWrapper;
        
        // New task button
        const newTask = document.createElement("div")
        newTask.classList.add("add-task", "add-btn")
        const addImg = document.createElement("img")
        addImg.src = addIcon;
        addImg.classList.add("add-icon", "icon")

        newTask.append(addImg, document.createTextNode("New task"))

        // Edit project button
        const editProject = document.createElement("div")
        editProject.classList.add("add-task", "add-btn")
        const editImg = document.createElement("img")
        editImg.src = editIcon;
        editImg.classList.add("add-icon", "icon", "min-icon")

        editProject.append(editImg, document.createTextNode("Edit project"))

        // Edit task button
        const editTask = document.createElement("div")
        editTask.classList.add("add-task", "add-btn")
        const editTaskImg = document.createElement("img")
        editTaskImg.src = editIcon;
        editTaskImg.classList.add("add-icon", "icon", "min-icon")

        editTask.append(editTaskImg, document.createTextNode("Edit task"))

        // Mark completed button
        const markCompleted = document.createElement("div")
        markCompleted.classList.add("add-task", "add-btn")
        const completedImg = document.createElement("img")
        completedImg.src = checkIcon;
        completedImg.classList.add("add-icon", "icon", "min-icon")

        markCompleted.append(completedImg, document.createTextNode("Completed"))

        // Delete project button
        const deleteProject = document.createElement("div")
        deleteProject.classList.add("add-task", "add-btn")
        const deleteImg = document.createElement("img")
        deleteImg.src = deleteIcon;
        deleteImg.classList.add("add-icon", "icon", "min-icon")

        deleteProject.append(deleteImg, document.createTextNode("Delete"))

        // Cancel button
        const cancelButton = document.createElement("div")
        cancelButton.classList.add("add-task", "add-btn")
        const cancelImg = document.createElement("img")
        cancelImg.src = cancelIcon;
        cancelImg.classList.add("add-icon", "icon")

        cancelButton.append(cancelImg, document.createTextNode("Cancel"))

        // Save button
        const saveButton = document.createElement("div")
        saveButton.classList.add("add-task", "add-btn")
        const saveImg = document.createElement("img")
        saveImg.src = saveIcon;
        saveImg.classList.add("add-icon", "icon")

        saveButton.append(saveImg, document.createTextNode("Save"))

        // Project view
        if (viewObj.view == "4") {
            switch (viewObj.mode) {
                case "1":
                    // View mode
                    newTask.dataset.view = "5";
                    newTask.dataset.mode = "2";
                    newTask.dataset.id = viewObj.id;
                    
                    newTask.addEventListener("click", (e) => viewObj.updateView(e))


                    editProject.dataset.view = "4";
                    editProject.dataset.mode = "3";
                    editProject.dataset.id = viewObj.id;

                    editProject.addEventListener("click", (e) => viewObj.updateView(e))


                    markCompleted.dataset.view = "4";
                    markCompleted.dataset.mode = "1";
                    markCompleted.dataset.id = viewObj.id;

                    markCompleted.addEventListener("click", (e) => {
                        viewObj.markCompleted(viewObj.view, viewObj.id)
                    })

                    deleteProject.addEventListener("click", (e) => {
                        if (window.confirm("Are you sure you want to delete project?")) {
                            viewObj.deleteObject(viewObj.view, viewObj.id)
                        }
                    })

                    buttonWrapper.append(newTask, editProject, deleteProject)
                    if (!viewObj.getProject(viewObj.id).completed) buttonWrapper.append(markCompleted)
                    break;

                case "2":
                    // New mode
                    saveButton.addEventListener("click", (e) => {
                        viewObj.saveChanges(viewObj.view, viewObj.mode)
                    })

                    cancelButton.dataset.view = "1";
                    cancelButton.dataset.mode = "1";
                    cancelButton.dataset.id = "";

                    cancelButton.addEventListener("click", (e) => {
                        viewObj.updateView(e)
                    })

                    buttonWrapper.append(saveButton, cancelButton)
                    break;

                case "3":
                    // Edit mode
                    saveButton.addEventListener("click", (e) => {
                        viewObj.saveChanges(viewObj.view, viewObj.mode)
                    })

                    cancelButton.dataset.view = "4";
                    cancelButton.dataset.mode = "1";
                    cancelButton.dataset.id = viewObj.id;

                    cancelButton.addEventListener("click", (e) => {
                        viewObj.updateView(e)
                    })

                    buttonWrapper.append(saveButton, cancelButton)
                    break;
            
                default:
                    break;
            }
        }

        // Task view
        if (viewObj.view == "5") {
            switch (viewObj.mode) {
                case "1":
                    // View mode
                    markCompleted.dataset.view = "5";
                    markCompleted.dataset.mode = "1";
                    markCompleted.dataset.id = viewObj.id;

                    markCompleted.addEventListener("click", (e) => {
                        viewObj.markCompleted(viewObj.view, viewObj.id)
                    })

                    editTask.dataset.view = "5";
                    editTask.dataset.mode = "3";
                    editTask.dataset.id = viewObj.id;

                    editTask.addEventListener("click", (e) => viewObj.updateView(e))

                    deleteProject.addEventListener("click", (e) => {
                        if (window.confirm("Are you sure you want to delete task?")) {
                            viewObj.deleteObject(viewObj.view, viewObj.id)
                        }
                    })

                    if (!viewObj.getTask(viewObj.id).completed) buttonWrapper.append(markCompleted)

                    buttonWrapper.append(editTask, deleteProject)
                    break;

                case "2":
                    // New mode
                    saveButton.addEventListener("click", (e) => {
                        viewObj.saveChanges(viewObj.view, viewObj.mode)
                    })

                    cancelButton.dataset.view = "4";
                    cancelButton.dataset.mode = "1";
                    cancelButton.dataset.id = viewObj.id;

                    cancelButton.addEventListener("click", (e) => {
                        viewObj.updateView(e)
                    })

                    buttonWrapper.append(saveButton, cancelButton)
                    break;

                case "3":
                    // Edit mode
                    saveButton.addEventListener("click", (e) => {
                        viewObj.saveChanges(viewObj.view, viewObj.mode)
                    })

                    cancelButton.dataset.view = "5";
                    cancelButton.dataset.mode = "1";
                    cancelButton.dataset.id = viewObj.id;

                    cancelButton.addEventListener("click", (e) => {
                        viewObj.updateView(e)
                    })

                    buttonWrapper.append(saveButton, cancelButton)
                    break;
            
                default:
                    break;
            }
        }

        return buttonWrapper;
    }

    static generateFixedView(viewObj) {
        // View Wrapper
        const mainWrapper = document.createElement("div")

        // Information object
        const titleWrapper = document.createElement("div")
        titleWrapper.classList.add("main-title-wrapper")

        const titleImg = document.createElement("img")
        titleImg.classList.add("main-project-icon", "icon")

        const title = document.createElement("h1")
        title.classList.add("project-title")

        let hasTasks = false;

        switch (viewObj.view) {
            case "1":
                titleImg.src = todayIcon;
                title.appendChild(document.createTextNode("Due today"))

                for (let project of viewObj.projects) {
                    if (project.getTasksDueToday().length) hasTasks = true;
                }
                break;

            case "2":
                titleImg.src = upcomingIcon;
                title.appendChild(document.createTextNode("Upcoming"))

                for (let project of viewObj.projects) {
                    if (project.getUpcomingTasks().length) hasTasks = true;
                }
                break;
            case "3":
                titleImg.src = importantIcon;
                title.appendChild(document.createTextNode("Important"))

                for (let project of viewObj.projects) {
                    if (project.getImportantTasks().length) hasTasks = true;
                }
                break;

            default:
                break;
        }

        titleWrapper.append(titleImg, title)

        // Task objects
        const taskWrapper = document.createElement("div")
        taskWrapper.classList.add("task-wrapper")

        if (hasTasks) {

            for (const project of viewObj.projects) {

                let taskList = [];
                switch (viewObj.view) {
                    case "1":
                        taskList = project.getTasksDueToday();
                        break;
                    case "2":
                        taskList = project.getUpcomingTasks();
                        break;
                    case "3":
                        taskList = project.getImportantTasks();
                        break;
                    default:
                        break;
                }

                if (taskList.length > 0) {

                    const projDiv = document.createElement("div")
                    projDiv.classList.add("proj-proj")

                    const projImg = document.createElement("img")
                    projImg.src = project.completed ? checkIcon : projectIcon;
                    projImg.classList.add("project-proj-icon", "icon")

                    projDiv.append(projImg, document.createTextNode(project.name))

                    projDiv.dataset.view = "4";
                    projDiv.dataset.mode = "1";
                    projDiv.dataset.id = project.id;
                    projDiv.addEventListener("click", (e) => viewObj.updateView(e))

                    taskWrapper.appendChild(projDiv)

                    for (const task of taskList) {

                        const taskDiv = document.createElement("div")
                        taskDiv.classList.add("proj-task")

                        const dateDiv = document.createElement("div")
                        dateDiv.classList.add("proj-task-date")

                        const taskImg = document.createElement("img")
                        taskImg.src = task.completed ? checkIcon : taskIcon;
                        taskImg.classList.add("project-task-icon", "icon")

                        dateDiv.append(taskImg, document.createTextNode(task.getDateFormat()))

                        taskDiv.append(dateDiv, document.createTextNode(task.name))

                        taskDiv.dataset.view = "5";
                        taskDiv.dataset.mode = "1";
                        taskDiv.dataset.id = task.id;
                        taskDiv.addEventListener("click", (e) => viewObj.updateView(e))

                        taskWrapper.appendChild(taskDiv);
                    }
                }
            }

        } else {
            taskWrapper.append(document.createTextNode("No tasks to display"))
            // append no tasks to display
        }
        

        mainWrapper.append(titleWrapper, taskWrapper)

        return mainWrapper;

    }

}