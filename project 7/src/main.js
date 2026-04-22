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

// отображение всех задач
function renderTasks() {
    list.innerHTML = ''; // Очищаем список

    if (tasks.length === 0) {
        list.innerHTML = '<li class="noTask">Задач нет</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        const dateCreated = new Date(task.id).toLocaleString('ru-RU');
        li.innerHTML = `${task.text} Create-${dateCreated}<button class='deleteBtn' data-id='${task.id}'>Done</button><span class='time-done'></span>`;
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
        // deleteTask(id);
        throughTask(e.target)
    }
})
//слушаем нажатие энтер 
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
})
// зачеркивание выполненных задач и изменение флага 
function throughTask(el) {
    const parentLi = el.closest('.task')
    parentLi.classList.add('line-through')
    let spanDone = document.querySelector('.time-done')
    spanDone.innerHTML = new Date().toLocaleString('ru-RU')
    // parentLi.innerHTML += ` Done ${new Date().toLocaleString('ru-RU')}`
    let debug = el.getAttribute('data-id')
    let correctTask = tasks.find(t => t.id == debug)
    correctTask.completed = !correctTask.completed
    console.log(tasks);
}


renderTasks();