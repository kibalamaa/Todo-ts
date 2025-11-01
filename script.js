var input = require("prompt-sync")();
var items = [];
function addItem() {
    var task = input('Add new task item: ');
    if (task.trim() === "") {
        console.log("Task cannot be empty.");
        return;
    }
    var item = {
        task: task,
        done: false,
    };
    items.push(item);
    console.log("".concat(task, " was added."));
}
function deleteItem() {
    if (items.length === 0) {
        console.log('No tasks yet.');
        return;
    }
    displayItems();
    var to_del = Number(input('Enter index of item to remove: '));
    if (isNaN(to_del) || to_del < 0 || to_del >= items.length) {
        console.log("Not a valid index.");
        return;
    }
    var removed = items.splice(to_del, 1);
    console.log("\"".concat(removed[0].task, "\" was deleted."));
}
function editItem() {
    if (items.length === 0) {
        console.log('No tasks yet.');
        return;
    }
    displayItems();
    var idx = Number(input('Enter index of item to edit: '));
    if (isNaN(idx) || idx < 0 || idx >= items.length) {
        console.log("Not a valid index.");
        return;
    }
    var newVal = input("Enter new value for \"".concat(items[idx].task, "\": "));
    items[idx].task = newVal;
    console.log("Task updated to \"".concat(newVal, "\"."));
}
function completeTask() {
    if (items.length === 0) {
        console.log('No tasks yet.');
        return;
    }
    displayItems();
    var idx = Number(input('Enter index of task to mark done: '));
    if (isNaN(idx) || idx < 0 || idx >= items.length) {
        console.log("Not a valid index.");
        return;
    }
    items[idx].done = true;
    console.log("Task \"".concat(items[idx].task, "\" marked as done."));
}
function viewCmd() {
    console.log('\nTODO APP COMMANDS');
    console.log('1. Add Task');
    console.log('2. Delete Task');
    console.log('3. Edit Task');
    console.log('4. View Tasks');
    console.log('5. Mark Task as Done');
    console.log('6. Exit');
}
function chooseCmd() {
    viewCmd();
    var cmd = parseInt(input('Choose command: '));
    switch (cmd) {
        case 1:
            addItem();
            break;
        case 2:
            deleteItem();
            break;
        case 3:
            editItem();
            break;
        case 4:
            displayItems();
            break;
        case 5:
            completeTask();
            break;
        case 6:
            console.log('Bye Bye');
            process.exit(0);
        default:
            console.log('Not Allowed, Try Again!');
    }
    input('\nPress Enter to continue...');
}
function displayItems() {
    console.clear();
    if (items.length === 0) {
        console.log('No tasks yet.');
        return;
    }
    console.log('Your Tasks:');
    for (var i = 0; i < items.length; i++) {
        var status_1 = items[i].done ? '✅' : ' ';
        console.log("".concat(i, ". ").concat(status_1, " ").concat(items[i].task));
    }
}
while (true) {
    chooseCmd();
}
