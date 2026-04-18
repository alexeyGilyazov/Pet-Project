const apiKey = '1bf29cf8f4ced8222e420a427bfccf48'
const card = document.querySelector('.card')
const searchBox = document.querySelector('.card__input')
const searchBtn = document.getElementById('searchBtn')
const temp = document.querySelector('.card__title--temp')
const cityName = document.querySelector('.card__title--city')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const icon = document.querySelector('.card__weather-icon')
const date = document.getElementById('date')


const showDate = () => {
    const now = new Date()
    const day = now.getDate()
    const monthName = now.toLocaleString('en', { month: 'long' })
    date.innerHTML = `${day} ${monthName}`
}

async function getWeather(city) {
    if (!city) return
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        if (!response.ok) throw Error('city not found')
        const result = await response.json()


        console.log(result);

        card.classList.add('active')
        card.style.height = '530px'

        const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
        icon.src = iconUrl

        cityName.innerHTML = result.name
        humidity.innerHTML = `${result.main.humidity} %`
        wind.innerHTML = `${result.wind.speed} m/s`
        temp.innerHTML = `${Math.round(result.main.temp)}°`
        searchBox.value = ''

    } catch (err) {
        alert(err)
    }
}

document.addEventListener('click', (e) => {
    if (card.classList.contains('active') && !card.contains(e.target)) {
        card.classList.remove('active')
        card.style.height = '230px'
    }
})


searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value)
})



showDate()

