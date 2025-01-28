document.addEventListener('DOMContentLoaded', function() {
    const showAllTasksButton = document.querySelector('.show-btn');
    const taskContainer = document.querySelector('.task-container');
    const searchButton = document.querySelector('.search-btn');
    const searchArea = document.querySelector('.search-area');

    showAllTasksButton.addEventListener('click', function() {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(data => {
                taskContainer.style.display = 'block';
                data.forEach(task => {
                    const taskContainerDiv = document.createElement('div');
                    taskContainerDiv.classList.add('task-container');
                    const taskTitle = document.createElement('h1');
                    taskTitle.textContent = `Title: ${task.title}`;
                    const userId = document.createElement('h3');
                    userId.textContent = `User ID: ${task.userId}`;
                    const status = document.createElement('h3');
                    status.textContent = `Status: ${task.completed ? 'Completed' : 'Not Completed'}`;
                    taskContainerDiv.appendChild(taskTitle);
                    taskContainerDiv.appendChild(userId);
                    taskContainerDiv.appendChild(status);
                    taskContainerDiv.style.backgroundColor = task.completed ? '#2ddf2d' : '#df2d2d';
                    taskContainer.appendChild(taskContainerDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });

    searchButton.addEventListener('click', function() {
        const searchValue = searchArea.value;
        searchArea.value = '';
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(data => {
                const foundTasks = data.filter(task => task.userId === parseInt(searchValue));
                if (foundTasks.length > 0) {
                    displayTasks(foundTasks);
                } else {
                    alert('User ID not found');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    searchArea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    function displayTasks(tasks) {
        taskContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskContainerDiv = document.createElement('div');
            taskContainerDiv.classList.add('task-container');
            const taskTitle = document.createElement('h1');
            taskTitle.textContent = `Title: ${task.title}`;
            const userId = document.createElement('h3');
            userId.textContent = `User ID: ${task.userId}`;
            const status = document.createElement('h3');
            status.textContent = `Status: ${task.completed ? 'Completed' : 'Not Completed'}`;
            taskContainerDiv.appendChild(taskTitle);
            taskContainerDiv.appendChild(userId);
            taskContainerDiv.appendChild(status);
            taskContainerDiv.style.backgroundColor = task.completed ? '#2ddf2d' : '#df2d2d';
            taskContainer.appendChild(taskContainerDiv);
        });
    }
});
