document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage if available
    loadTasks();
    
    // Add task when button is clicked
    addTaskBtn.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // Create new task item
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.addEventListener('change', toggleTask);
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        
        // Append elements to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        
        // Add task to the list
        taskList.appendChild(taskItem);
        
        // Clear input field
        taskInput.value = '';
        
        // Save tasks to localStorage
        saveTasks();
    }
    
    function toggleTask(e) {
        const taskItem = e.target.parentElement;
        const taskText = taskItem.querySelector('.task-text');
        taskText.classList.toggle('completed');
        
        // Save tasks to localStorage
        saveTasks();
    }
    
    function deleteTask(e) {
        const taskItem = e.target.parentElement;
        taskList.removeChild(taskItem);
        
        // Save tasks to localStorage
        saveTasks();
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const taskText = taskItem.querySelector('.task-text').textContent;
            const isCompleted = taskItem.querySelector('.task-text').classList.contains('completed');
            tasks.push({
                text: taskText,
                completed: isCompleted
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(task => {
                // Create new task item
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                
                // Create checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', toggleTask);
                
                // Create task text span
                const taskSpan = document.createElement('span');
                taskSpan.className = 'task-text';
                taskSpan.textContent = task.text;
                if (task.completed) {
                    taskSpan.classList.add('completed');
                }
                
                // Create delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', deleteTask);
                
                // Append elements to task item
                taskItem.appendChild(checkbox);
                taskItem.appendChild(taskSpan);
                taskItem.appendChild(deleteBtn);
                
                // Add task to the list
                taskList.appendChild(taskItem);
            });
        }
    }
});