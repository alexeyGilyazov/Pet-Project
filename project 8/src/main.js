const placeHolders = document.querySelectorAll('.placeholder')
const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn')

placeHolders.forEach(placeHolder => {
    placeHolder.addEventListener('dragover', (event) => event.preventDefault())
    placeHolder.addEventListener('dragenter', (event) => {
        if (event.target === placeHolder) {
            event.target.classList.add('hovered')
        }
    })
    placeHolder.addEventListener('dragleave', dragLeave)
    placeHolder.addEventListener('drop', dragDrop)
})

function dragStart(event) {
    // event.target.classList.add('hold')
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)
}
function dragEnd(event) {
    event.target.classList.remove('hold', 'hide')
}

function dragDrop(event) {
    event.preventDefault()

    const parent = event.target.closest('.placeholder')
    if (parent) {
        parent.classList.remove('hovered')
    }

    const draggedItem = document.querySelector('.hide')
    if (!draggedItem) return

    const oldResultText = draggedItem.querySelector('.result-time')
    if (oldResultText) {
        oldResultText.remove()
    }

    if (parent) {
        parent.append(draggedItem)
    }

    if (parent && parent.getAttribute('id') === 'done') {
        const createdTime = parseInt(draggedItem.getAttribute('date-create'))
        const resultTime = Math.floor((Date.now() - createdTime) / 1000)

        const resultText = document.createElement('p')
        resultText.classList.add('result-time')
        resultText.innerHTML = `${resultTime}c`

        draggedItem.append(resultText)
    }
}

function createItem(text) {
    if (!text.trim()) return

    const newItem = document.createElement('div')
    newItem.classList.add('item')
    newItem.setAttribute('draggable', 'true')
    newItem.textContent = text
    newItem.setAttribute('date-create', Date.now())

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
    item.addEventListener('dragend', dragEnd)
}

const firstItem = document.querySelector('.item')
if (firstItem) {
    if (!firstItem.getAttribute('date-create')) {
        firstItem.setAttribute('date-create', Date.now())
    }
    addListener(firstItem)
}

function dragLeave(event) {
    if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('hovered')
    }
}
