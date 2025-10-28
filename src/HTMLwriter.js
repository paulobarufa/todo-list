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


        return HTMLwriter.generateProjectEdit()

    }

    static generateProjectView(project) {


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

            dateDiv.append(taskImg, document.createTextNode(task.dueDate))

            taskDiv.append(dateDiv, document.createTextNode(task.name))

            taskWrapper.appendChild(taskDiv);
        }


        // Append everything
        mainWrapper.append(titleWrapper, description, dueDate, notesHeader, notes, tasksHeader, taskWrapper);

        return mainWrapper;

    }

    static generateTaskView(task) {

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
        dueDate.appendChild(document.createTextNode(task.dueDate))

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

    static generateProjectEdit() {

        // View Wrapper
        const mainWrapper = document.createElement("div")

        // Information objects
        const formObject = document.createElement("form")
        formObject.classList.add("create-project")

        const formHeader = document.createElement("h1")
        formHeader.classList.add("project-title")
        formHeader.append(document.createTextNode("New Project"))

        // Title fieldset
        const fieldsetTitle = document.createElement("fieldset")
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

        return mainWrapper;
    }

    /*         <form class="create-project">

            <fieldset>
                <label for="form-project-description" class="form-label">Description</label>
                <input type="text" name="input-project-description" id="input-project-description" class="text-input">
            </fieldset>
            <fieldset>
                <label for="form-project-date" class="form-label">Due date</label>
                <input type="text" name="input-project-date" id="input-project-date" class="text-input">
            </fieldset>
            <fieldset>
                <label for="form-project-notes" class="form-label">Notes</label>
                <textarea name="input-project-notes" id="input-project-notes" rows="6" class="text-input"></textarea>
            </fieldset>



        </form> */



}