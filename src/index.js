// Import classes and styles
import "./styles.css";
import { Project } from "./project";
import { StorageWriter } from "./storage";
import { ViewController } from "./view";
import { addMonths, startOfToday } from "date-fns";

// Get project Array from storage
const projArray = StorageWriter.getStorage();

if (projArray.length == 0) {
    let newProject = new Project(
        "Default Project", 
        "This your default project.", 
        "Feel free to edit this project or create a new one.", 
        addMonths(startOfToday(), 1));

    projArray.push(newProject)
    StorageWriter.setStorage(projArray)
}

// Create viewController
const viewController = new ViewController(projArray);
