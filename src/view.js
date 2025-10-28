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
    }

    updateView() {
        
    }
    
}