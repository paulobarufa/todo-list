// Import classes and styles
import "./styles.css";
import { Project } from "./project";
import { Task } from "./task";
import { StorageWriter } from "./storage";
import { HTMLwriter } from "./HTMLwriter";
import { ViewController } from "./view";

// Get wrappers
const leftPanel = document.querySelector(".left-panel");
const mainPanel = document.querySelector(".right-panel");

// Get project Array from storage
const projArray = StorageWriter.getStorage();

// Create viewController
const viewController = new ViewController(projArray);

// Create views
const colWrapper = HTMLwriter.generateCol(projArray);
const viewWrapper = HTMLwriter.generateView(viewController);

// Clear Wrappers
//mainPanel.innerHTML = "";
leftPanel.innerHTML = "";

//Append views
leftPanel.appendChild(colWrapper);
mainPanel.appendChild(viewWrapper);











/*
let proj1 = new Project("First Project", "This is the first project.", "notes notes notes", "1 week");

let task1 = new Task("Task 1", "Task task task", "random notes", "tmrw", proj1.id, 0);
let task2 = new Task("Task 2", "Task task task", "random notes", "tmrw", proj1.id, 0);
let task3 = new Task("Task 3", "Task task task", "random notes", "tmrw", proj1.id, 1);

proj1.addTask(task1)
proj1.addTask(task2)
proj1.addTask(task3)

let proj2 = new Project("Second Project", "This is the first project.", "notes notes notes", "2 weeks");

let task4 = new Task("Task 1", "Task task task", "random notes", "tmrw", proj2.id, 1);
let task5 = new Task("Task 2", "Task task task", "random notes", "tmrw", proj2.id, 0);

proj2.addTask(task4)
proj2.addTask(task5)
*/