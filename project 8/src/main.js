const placeHolders = document.querySelectorAll('.placeholder')
const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn')

placeHolders.forEach(placeHolder => {
    placeHolder.addEventListener('dragover', (event) => event.preventDefault())
    placeHolder.addEventListener('dragenter', (event) => event.target.classList.add('hovered'))
    placeHolder.addEventListener('dragleave', (event) => event.target.classList.remove('hovered'))
    placeHolder.addEventListener('drop', dragDrop)
})

function dragStart(event) {
    event.target.classList.add('hold')
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)
}

function dragDrop(event) {
    event.preventDefault()
    event.target.classList.remove('hovered')

    const draggedItem = document.querySelector('.hide')
    if (draggedItem) {
        event.target.append(draggedItem)
    }
}

function createItem(text) {
    if (!text.trim()) return

    const newItem = document.createElement('div')
    newItem.classList.add('item')
    newItem.setAttribute('draggable', 'true')
    newItem.textContent = text

    addListener(newItem)

    const place = document.querySelector('.placeholder')
    place.appendChild(newItem)
    input.value = ''
}

addBtn.addEventListener('click', e => {
    e.preventDefault()
    const inputValue = input.value
    createItem(inputValue)
})

function addListener(item) {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', (event) => event.target.classList.remove('hold', 'hide'))
}

const firstItem = document.querySelector('.item')
if (firstItem) {
    addListener(firstItem)
}