const headerInput = document.getElementById('headerInput')
const headerBtn = document.getElementById('headerBtn')
const apiKey = import.meta.env.VITE_API_KEY
const movies = document.getElementById('movies')
const headerUl = document.getElementById('header__ul')
const genresSelect = document.getElementById('genresSelect')


//слушатель жанров
headerUl.addEventListener('click', function (event) {
    const li = event.target.closest('li.header__li')

    if (li) {
        const genreId = li.dataset.category
        searchByGenre(genreId)
    }
})

//слушатель по названию
headerBtn.addEventListener('click', event => {
    event.preventDefault()
    const valueInput = headerInput.value.trim()

    if (!valueInput) {
        alert('Please enter movie name')
        return
    }
    headerInput.value = ''
    searchMoviesByTitle(valueInput)
})
//слушатель опшинов
genresSelect.addEventListener('change', (event) => {
    event.preventDefault()
    const selectedValue = event.target.value
    if (selectedValue) {
        changeGenresOption(selectedValue)
    }
})


// поиск по названию
async function searchMoviesByTitle(query) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}`
    try {
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': `${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        const data = await response.json()
        if (data.films && data.films.length > 0) {
            renderMovies(data.films)
        } else {
            movies.innerHTML = '<p>Фильмы не найдены 😞</p>'
        }
    } catch (err) {
        console.error('Ошибка:', err)
        movies.innerHTML = '<p>Ошибка при загрузке фильмов</p>'
    }
}

// поиск по жанру 
async function searchByGenre(genreId) {
    try {
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${genreId}&page=1`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': `${apiKey}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.items && data.items.length > 0) {
            renderMovies(data.items)
        } else {
            movies.innerHTML = '<p>Фильмы не найдены 😞</p>'
        }
    } catch (err) {
        console.error('Ошибка:', err)
        movies.innerHTML = `<p>Ошибка при загрузке: ${err.message}</p>`
    }
}

//отрисовка фильмов
function renderMovies(filmsList) {
    movies.innerHTML = ''

    filmsList.forEach(film => {
        createNewMovie(film)
    })
}
// создание карточек фильма
function createNewMovie(data) {
    const movie = document.createElement('div')
    movie.classList.add('movie')

    const genresText = data.genres
        .map(item => item.genre)
        .join(', ')

    movie.innerHTML = ` 
         <div class="movie__card">
            <img src="${data.posterUrlPreview}" alt="${data.nameRu}" class="movie__poster">
            <div class="movie__info">
                <p class="movie__name">${data.nameRu || data.nameEn}</p>
                <p class="movie__genres">Жанр: ${genresText}</p>
                <p class="movie__year">Год ${data.year}</p>
                <p class="movie__description">${data.description || 'Описание недоступно'}</p>
                <p class="movie__rating">Рейтинг ⭐ ${data.ratingKinopoisk || 'N/A'}</p>
            </div>
        </div>`
    movies.appendChild(movie)
}
//получаем все жанры с сервера
async function getGenresOption() {
    const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/filters'

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': `${apiKey}`,
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        renderGenresOption(data)
        return data.genres
    } catch (err) {
        console.error('Ошибка при загрузке жанров:', err)
    }
}
//отрисовка опшинов
function renderGenresOption(data) {
    const genresSelect = document.getElementById('genresSelect')
    genresSelect.innerHTML = '<option value="">Выберите жанр</option>'
    data.genres.map(genre => {
        if (!genre) return
        const newOption = document.createElement('option')
        newOption.setAttribute('value', genre.id)
        newOption.textContent = genre.genre
        newOption.classList.add('genresOption')
        genresSelect.appendChild(newOption)
    })
}

//изменение опшинов 
async function changeGenresOption(value) {
    try {
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${value}&page=1`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': `${apiKey}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.items && data.items.length > 0) {
            renderMovies(data.items)
        } else {
            movies.innerHTML = '<p>Фильмы не найдены 😞</p>'
        }
    } catch (err) {
        console.error('Ошибка:', err)
        movies.innerHTML = `<p>Ошибка при загрузке: ${err.message}</p>`
    }
}

//получение опшинов при загрузске страницы
getGenresOption()
//первичное получение жанров 
document.addEventListener('DOMContentLoaded', async () => {
    const genresData = await getGenresOption()
    if (genresData) {
        renderGenresOption({ genres: genresData })
    }
})
