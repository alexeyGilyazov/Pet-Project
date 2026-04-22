const addBtn = document.querySelector('#addBtn')
const input = document.querySelector('#input')
const list = document.querySelector('#list')
const deleteBTn = document.querySelector('.deleteBtn')
const noTask = document.querySelector('.noTask')

//загружаем задачи при открытии страницы
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//сохраняем задачи в локале
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text) {
    if (!text.trim()) {
        alert('please enter task')
        return
    }// проверка инпута на ввод
    const newTask = { id: Date.now(), text: text, completed: false }; // создаем новую задачку
    tasks.push(newTask) //пушим в в массив задачек
    saveTasks();//сохраняем
    renderTasks();//рисуем
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks(); // Перерисовываем список
}

// ✅ НОВАЯ ФУНКЦИЯ: отображение всех задач
function renderTasks() {
    list.innerHTML = ''; // Очищаем список

    if (tasks.length === 0) {
        list.innerHTML = '<li class="noTask">Задач нет</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `${task.text}<button class='deleteBtn' data-id='${task.id}'>Delete Me Please</button>`;
        list.appendChild(li);
    });

    noTask.classList.add('hide');
}

// слушатель на кнопку добавления 
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const valueInput = input.value;
    addTask(valueInput);
    input.value = '';
})

// Удаление задачи при клике
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        deleteTask(id);
    }
})
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
})



renderTasks();