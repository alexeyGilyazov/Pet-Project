const addBtn = document.querySelector('#addBtn')
const input = document.querySelector('#input')
const list = document.querySelector('#list')
const noTask = document.querySelector('.noTask')

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text) {
    if (!text.trim()) {
        alert('please enter task')
        return
    }
    const newTask = { id: Date.now(), text: text, completed: false, completedDate: null };
    tasks.push(newTask)
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    list.innerHTML = ' ';

    if (tasks.length === 0) {
        list.innerHTML = '<li class="noTask">Задач нет</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';

        if (task.completed) {
            li.classList.add('line-through');
        }

        const dateCreated = new Date(task.id).toLocaleString('ru-RU');

        let completedDateHTML = '';
        if (task.completed && task.completedDate) {
            completedDateHTML = `<span class='time-done'>Done - ${task.completedDate}</span>`;
        } else {
            completedDateHTML = `<span class='time-done'></span>`;
        }

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="date-created ${task.completed ? '' : 'hide'}">Create - ${dateCreated}</span>
            ${completedDateHTML}
            <button class='throughBtn' data-id='${task.id}'>Done</button>
            <button class='deleteBtn' data-id='${task.id}'>Delete</button>
        `;

        // ✅ События наведения
        li.addEventListener('mouseenter', () => {
            const dateSpan = li.querySelector('.date-created');
            // Если задача НЕ выполнена - показываем дату
            if (!task.completed) {
                dateSpan.classList.remove('hide');
            }
        });

        li.addEventListener('mouseleave', () => {
            const dateSpan = li.querySelector('.date-created');
            // Если задача НЕ выполнена - скрываем дату
            if (!task.completed) {
                dateSpan.classList.add('hide');
            }
            // Если выполнена - дата остаётся видна (класс hide не добавляется)
        });

        list.appendChild(li);
    });

    noTask.classList.add('hide');
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const valueInput = input.value;
    addTask(valueInput);
    input.value = '';
})

list.addEventListener('click', (e) => {

    if (e.target.classList.contains('deleteBtn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        deleteTask(id);
    }

    if (e.target.classList.contains('throughBtn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        throughTask(id);
    }
})

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
})

function throughTask(id) {
    const task = tasks.find(t => t.id == id);

    if (task) {
        task.completed = !task.completed;

        if (task.completed) {
            task.completedDate = new Date().toLocaleString('ru-RU');
        } else {
            task.completedDate = null;
        }

        saveTasks();
        renderTasks();
    }
}

renderTasks();