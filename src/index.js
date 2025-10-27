// Import classes and styles
import "./styles.css";
import { Project } from "./project";
import { Task } from "./task";
import { StorageWriter } from "./storage";
import { HTMLwriter } from "./HTMLwriter";

const dynamicWrapper = document.querySelector(".dynamic-wrapper");

let proj1 = new Project("First Project", "This is the first project.");

let task1 = new Task("Task 1", "Task task task", "tmrw", proj1, 1);
let task2 = new Task("Task 2", "Task task task", "tmrw", proj1, 1);
let task3 = new Task("Task 3", "Task task task", "tmrw", proj1, 1);

proj1.addTask(task1)
proj1.addTask(task2)
proj1.addTask(task3)

let proj2 = new Project("Second Project", "This is the first project.");

let task4 = new Task("Task 1", "Task task task", "tmrw", proj2, 1);
let task5 = new Task("Task 2", "Task task task", "tmrw", proj2, 1);

proj2.addTask(task4)
proj2.addTask(task5)

const projArray = [proj1, proj2];

const newWrapper = HTMLwriter.generateCol(projArray);

dynamicWrapper.appendChild(newWrapper);

