import { fetchAnyUrl } from "./module.js";

let movies = []
fetchMovies()
async function fetchMovies() {
    movies = await fetchAnyUrl("http://localhost:8080/movies");
    refreshCards();
}


function refreshCards() {
    clearCards();
    movies.forEach(createCard);
}

function clearCards() {
    document.getElementById('cards').innerHTML = ''
}

function createCard(movie) {
    // Opret en kolonne-div
    const columnDiv = document.createElement('div')
    columnDiv.classList.add('col-8', 'col-lg-4', 'col-xl-3')

    // Opret et card-element
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.style.width = '200px'
    cardDiv.style.height = '500px'
    cardDiv.style.margin = '10px'

    // Opret et billed-element
    const image = document.createElement('img')
    image.src = movie.imageUrl
    image.classList.add('card-img-top');
    image.alt = '...';
    image.style.width = '100%'

    // Opret en card-body
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Opret en titel
    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = movie.title;

    // Opret genre
    const genreElement = document.createElement('h6')
    genreElement.classList.add('card-subtitle', 'mb-2')
    genreElement.textContent = movie.genre

    // Opret duration
    const durationElement = document.createElement('h6')
    durationElement.classList.add('card-subtitle', 'text-muted', 'mb-2')
    durationElement.textContent = movie.duration

    // Opret en knap
    const button = document.createElement('a');
    button.href = '#';
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Ticket';

    // Tilføj til card-body
    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(genreElement)
    cardBodyDiv.appendChild(durationElement)

    // Tilføj til card-div
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(button)

    // Tilføj card-div til kolonne-div
    columnDiv.appendChild(cardDiv);

    const cardsDiv = document.getElementById('cards');
    cardsDiv.appendChild(columnDiv);
}





