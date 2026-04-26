const item = document.querySelector('.item')
const placeHolders = document.querySelectorAll('.placeholder')
const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn')


placeHolders.forEach(placeHolder => {
    placeHolder.addEventListener('dragover', (event) => event.preventDefault())
    placeHolder.addEventListener('dragenter', (event) => event.target.classList.add('hovered'))
    placeHolder.addEventListener('dragleave', (event) => event.target.classList.remove('hovered'))
    placeHolder.addEventListener('drop', dragDrop)
})

item.addEventListener('dragstart', dragStart)
item.addEventListener('dragend', (event) => event.target.className = 'item')

function dragStart(event) {
    event.target.classList.add('hold')
    setTimeout(() => {
        event.target.classList.add('hide'), 0
    })
}

function dragDrop(event) {
    event.target.classList.remove('hovered')
    event.target.append(item)
}
