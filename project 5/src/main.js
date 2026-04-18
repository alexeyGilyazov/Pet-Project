const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
let score = 0
let time = 0


startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up')
        startGame(0)
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let currunt = --time
        if (currunt < 10) {
            currunt = `0${currunt}`
        }
        setTime(currunt)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove()
    board.innerHTML = `<h1 class='primary'><span">SCORE:${score}</span></h1>`
}

function createRandomCircle() {

    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect(0)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const randomColorCircle = Math.floor(Math.random() * colors.length)
    console.log(randomColorCircle);
    circle.classList.add('circle')
    circle.style.background = `${colors[randomColorCircle]}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.appendChild(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}