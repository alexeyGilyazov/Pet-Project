const item = document.querySelector('.item')
const placeHolders = document.querySelectorAll('.placeholder')

placeHolders.forEach(placeHolder => {
    placeHolder.addEventListener('dragover', dragOver)
    placeHolder.addEventListener('dragenter', dragEnter)
    placeHolder.addEventListener('dragleave', dragLeave)
    placeHolder.addEventListener('drop', dragDrop)
})

item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', dragEnd)

function dragStart(event) {
    event.target.classList.add('hold')
    setTimeout(() => {
        event.target.classList.add('hide'), 0
    })
}

function dragEnd(event) {
    event.target.className = 'item'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    event.target.classList.add('hovered')
}

function dragLeave(event) {
    event.target.classList.remove('hovered')
}

function dragDrop(event) {
    event.target.classList.remove('hovered')
    event.target.append(item)
}