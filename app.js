const form = document.querySelector('#add-item'); // Entire form
const input = document.querySelector('#new-item'); // User input in form
const itemList = document.querySelector('#item-list'); // Entire ul that holds individual li task items

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Should start with empty list if no tasks found in local storage

// Loop through list in local storage to check for new tasks added, every saved task should include the user input text and the remove button
for (let i = 0; i < savedTasks.length; i++) {
    let newTask = document.createElement("li");
    newTask.innerText = savedTasks[i].task;
    newTask.isCompleted = savedTasks[i].isCompleted ? true : false;
    newTask.isDeleted = savedTasks[i].isDeleted ? true : false; 

    let removeButton = document.createElement('button');
    removeButton.innerText = 'X'; // Something here is causing my issue where task returns with an extra 'x' after page is refreshed
    newTask.appendChild(removeButton);

    itemList.appendChild(newTask);

    // When retrieved from local storage this isn't working (task doesn't come back with line-through & deleted task reappears with an X added to innertext)
    if (newTask.isCompleted) {
        newTask.style.textDecoration = "line-through";
    } else if (newTask.isDeleted) {
        savedTasks.pop(newTask);
    };

    input.value = '';
}

// Event listener for form when submitted, prevent refresh, new task appears on page with user input text and remove button, input is cleared after submitted, save to localstorage
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let newTask = document.createElement("li");
    newTask.innerText = input.value;
    newTask.isCompleted = false;
    newTask.isDeleted = false;
    itemList.appendChild(newTask);

    let removeButton = document.createElement('button');
    removeButton.innerText = 'X';
    newTask.appendChild(removeButton);
     
    input.value = ''

    savedTasks.push({ task: newTask.innerText, isCompleted: false, isDeleted: false });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
});

// Event listener for li item clicked to line-through & toggle
// Does toggle between line & no line-through but returns without line-through when refreshed, need help here
itemList.addEventListener("click", function(event) {
    let clickedTask = event.target;

    if (!clickedTask.isCompleted) {
        clickedTask.style.textDecoration = 'line-through';
        clickedTask.isCompleted = true;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    } else {
        clickedTask.style.textDecoration = 'none';
        clickedTask.isCompleted = false;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    };
});

// Event listener for button clicked to delete tasks
// Does delete when clicked but deleted task comes back when page is refreshed, need help here
itemList.addEventListener("click", function(event) {
    let deletedTask = event.target;

    if (event.target.tagName === 'BUTTON'){
        event.target.parentElement.remove();
        deletedTask.isDeleted = true; 
        localStorage.removeItem('newTask');
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    } else {
        deletedTask.isDeleted = false;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    };
});
