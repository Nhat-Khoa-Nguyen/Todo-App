document.getElementById("addButton").addEventListener("click", addTask);

function editTask(taskItem, taskSpan) {
    const originalText = taskSpan.textContent.trim();

    taskSpan.contentEditable = true;
    taskSpan.focus();

    function saveEdit(event) {
        if (event.key === 'Enter' || event.keyCode === 13 || event.type === 'blur') {
            taskSpan.contentEditable = false;
            taskSpan.removeEventListener('keydown', saveEdit);
            taskSpan.removeEventListener('blur', saveEdit);

            const editedText = taskSpan.textContent.trim();
            if (editedText !== originalText) {
                // Do something with the edited text, for example, update it in the database or storage.
            }
        }
    }

    taskSpan.addEventListener('keydown', saveEdit);
    taskSpan.addEventListener('blur', saveEdit);
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === '') {
        return;  // Avoid adding empty tasks
    }

    const taskItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskInput.value.trim();
    taskItem.appendChild(taskSpan);

    // Create action button (combined)
    const actionButton = document.createElement('button');
    actionButton.className = 'action-btn';

    const doneOption = document.createElement('span');
    doneOption.className = 'done-option';  
    doneOption.textContent = 'Done';
    doneOption.onclick = function(event) {
        event.stopPropagation();
        taskSpan.classList.toggle('strikethrough');
    };

    const deleteOption = document.createElement('span');
    deleteOption.className = 'delete-option';  
    deleteOption.textContent = 'Delete';
    deleteOption.onclick = function(event) {
        event.stopPropagation();
        taskList.removeChild(taskItem);
    };

    taskSpan.onclick = function () {
        editTask(taskItem, taskSpan);
    };

    actionButton.appendChild(doneOption);
    actionButton.appendChild(deleteOption);
    taskItem.appendChild(actionButton);

    // Append task item to task list
    taskList.appendChild(taskItem);

    // Clear the task input
    taskInput.value = '';
}

document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addTask();
        event.preventDefault();  // Prevents the default action (form submission, if it was a form)
    }
});


