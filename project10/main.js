const headerInput = document.getElementById('headerInput')
const headerBtn = document.getElementById('headerBtn')
const apiKey = import.meta.env.VITE_API_KEY
const movies = document.getElementById('movies')
const headerList = document.getElementById('header__list')
const headerUl = document.getElementById('header__ul')


headerBtn.addEventListener('click', event => {
    event.preventDefault()
    const valueInput = headerInput.value.trim()

    if (!valueInput) {
        alert('Please enter movie name')
        return
    }

    headerInput.value = ''
    searchMovies(valueInput)
})

async function searchMovies(query) {
    try {
        const response = await fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}`,
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
    console.log(data);
    movies.appendChild(movie)
}


