const addBtn = document.querySelector('#addBtn')
const input = document.querySelector('#input')
const list = document.querySelector('#list')
const deleteBTn = document.querySelector('.deleteBtn')

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const valueInput = input.value
    if (valueInput.trim()) {
        createElement2(valueInput)
        input.value = ''
    }
})

function createElement2(textContent) {
    const newEl = `<li>${textContent}<button class='deleteBtn'>Delete Me Please</button></li>`
    list.insertAdjacentHTML('beforeend', newEl)
}

list.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('deleteBtn')) {
        e.target.closest('li').remove()
    }
})







// function createElement(textinput) {
//     const newTask = document.createElement('li')
//     const btnDeleteTask = document.createElement('button')
//     btnDeleteTask.textContent = 'Delete me'
//     btnDeleteTask.style.marginLeft = '20px'
//     btnDeleteTask.setAttribute('id', 'btnDelete')
//     newTask.innerHTML = textinput
//     newTask.appendChild(btnDeleteTask)
//     list.appendChild(newTask)
// }