const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeElement = document.getElementById('time')
const board = document.getElementById('board')
const colors = ['red', 'green', 'yellow', 'purple', 'orange', 'fuchsia', 'aqua', 'black']

let time = 0
let score = 0

startBtn.addEventListener('click', e => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', e => {
    if(e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandonCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandonCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    }else {
        let current = --time
        if(current < 10) {
        current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeElement.innerHTML = `00:${value}`
}

function finishGame() {
    timeElement.parentNode.remove()
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandonCircle() {
    const color = getRandomColor()

    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = color

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}