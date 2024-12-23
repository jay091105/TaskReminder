let tasks = []; // Array to store tasks

// Add a new task to the list
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const taskName = document.getElementById("taskName").value;
    const dueTime = parseInt(document.getElementById("dueTime").value); // in minutes
    const priority = parseInt(document.getElementById("priority").value);

    if (taskName && dueTime > 0 && priority >= 1 && priority <= 5) {
        const dueDate = new Date();
        dueDate.setMinutes(dueDate.getMinutes() + dueTime); // Calculate the due date based on the input

        const task = {
            name: taskName,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        displayTasks(); // Update task list
        document.getElementById("taskName").value = '';
        document.getElementById("dueTime").value = '';
        document.getElementById("priority").value = '';
    } else {
        alert("Please fill all fields correctly!");
    }
});

// Display tasks in the list
function displayTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ''; // Clear the list before displaying updated tasks

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = `${task.name} - Due at: ${task.dueDate.toLocaleTimeString()} - Priority: ${task.priority}`;
        
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // Add "Mark as Completed" button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Mark as Completed";
        completeButton.onclick = function() {
            task.completed = true;
            displayTasks();
        };

        // Add "Remove" button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Task";
        removeButton.onclick = function() {
            tasks.splice(index, 1);
            displayTasks();
        };

        taskElement.appendChild(completeButton);
        taskElement.appendChild(removeButton);

        taskListElement.appendChild(taskElement);
    });
}

// Check tasks that are due soon (within the next 10 minutes)
document.getElementById("checkDueTasks").addEventListener("click", function() {
    const now = new Date();
    tasks.forEach(task => {
        const timeLeft = (task.dueDate - now) / 60000; // Time left in minutes
        if (timeLeft <= 10 && timeLeft > 0 && !task.completed) {
            alert(`Reminder: Task "${task.name}" is due soon at ${task.dueDate.toLocaleTimeString()}`);
        }
    });
});

// Remove completed tasks
document.getElementById("removeCompleted").addEventListener("click", function() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
});
