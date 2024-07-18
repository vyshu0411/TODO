function addTask() {
    const taskInput = document.getElementById('new-task');
    const deadlineInput = document.getElementById('task-deadline');
    const priorityInput = document.getElementById('task-priority');
    const labelInput = document.getElementById('task-label');
    
    const taskText = taskInput.value.trim();
    const taskDeadline = deadlineInput.value;
    const taskPriority = priorityInput.value;
    const taskLabel = labelInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        
        const taskDetails = [];
        if (taskDeadline) taskDetails.push(`Deadline: ${taskDeadline}`);
        if (taskPriority) taskDetails.push(`Priority: ${taskPriority}`);
        if (taskLabel) taskDetails.push(`Label: ${taskLabel}`);
        
        newTask.innerHTML = `
            <span onclick="toggleComplete(this)">${taskText}</span>
            <div class="task-details">${taskDetails.join(' | ')}</div>
            <div class="actions">
                <button class="edit" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
                <button onclick="removeTask(this)"><i class="fas fa-trash"></i></button>
            </div>
        `;

        taskList.appendChild(newTask);
        taskInput.value = '';
        deadlineInput.value = '';
        priorityInput.selectedIndex = 0;
        labelInput.value = '';
    }
}

function toggleComplete(taskElement) {
    taskElement.parentElement.classList.toggle('completed');
}

function removeTask(buttonElement) {
    const taskToRemove = buttonElement.parentElement.parentElement;
    taskToRemove.remove();
}

function editTask(buttonElement) {
    const taskElement = buttonElement.parentElement.previousElementSibling;
    const taskText = taskElement.innerText.split(' | ')[0]; // Get the task text

    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.onkeypress = function (event) {
        if (event.key === 'Enter') {
            saveTask(input);
        }
    };

    taskElement.replaceWith(input);
    input.focus();
}

function saveTask(inputElement) {
    const newTaskText = inputElement.value.trim();

    if (newTaskText !== '') {
        const taskElement = document.createElement('span');
        taskElement.innerText = newTaskText;
        taskElement.onclick = function () {
            toggleComplete(taskElement);
        };

        inputElement.replaceWith(taskElement);
    } else {
        inputElement.parentElement.remove();
    }
}
