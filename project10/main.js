const headerInput = document.getElementById('headerInput')
const headerBtn = document.getElementById('headerBtn')
const apiKey = import.meta.env.VITE_API_KEY
const movies = document.getElementById('movies')
const headerUl = document.getElementById('header__ul')


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

function renderMovies(filmsList) {
    movies.innerHTML = ''

    filmsList.forEach(film => {
        createNewMovie(film)
    })
}


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


