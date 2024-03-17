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
    const columnDiv = createColumnDiv();
    const cardDiv = createCardDiv(movie);
    const image = createImage(movie.imageUrl);
    const cardBodyDiv = createCardBodyDiv(movie);
    const titleElement = createTitleElement(movie.title);
    const genreElement = createGenreElement(movie.genre);
    const durationElement = createDurationElement(movie.duration);
    const buttonDiv = createButtonDiv(movie);

    appendElements(columnDiv, cardDiv, image, cardBodyDiv, titleElement, genreElement, durationElement, buttonDiv);
}

function createColumnDiv() {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('col-8', 'col-lg-4', 'col-xl-3');
    return columnDiv;
}

function createCardDiv(movie) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.width = '200px';
    cardDiv.style.margin = '10px';
    return cardDiv;
}

function createImage(imageUrl) {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('card-img-top');
    image.alt = '...';
    image.style.width = '100%';
    image.style.height = '275px';
    return image;
}

function createCardBodyDiv(movie) {
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    cardBodyDiv.style.height = '150px';
    return cardBodyDiv;
}

function createTitleElement(title) {
    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = title;
    return titleElement;
}

function createGenreElement(genre) {
    const genreElement = document.createElement('h6');
    genreElement.classList.add('card-subtitle', 'mb-2');
    genreElement.textContent = genre;
    return genreElement;
}

function createDurationElement(duration) {
    const durationElement = document.createElement('h6');
    durationElement.classList.add('card-subtitle', 'text-muted', 'mb-2');
    durationElement.textContent = duration;
    return durationElement;
}

function createButtonDiv(movie) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('d-flex', 'justify-content-evenly', 'mb-3');
    const btnTicket = createButton('Ticket');
    const btnInfo = createButton('Info');
    btnInfo.addEventListener('click', function () {
        createAndShowModal(movie);
    });
    buttonDiv.appendChild(btnTicket);
    buttonDiv.appendChild(btnInfo);
    return buttonDiv;
}

function createButton(text) {
    const button = document.createElement('a');
    button.href = '#';
    button.classList.add('btn', 'btn-outline-dark');
    button.textContent = text;
    return button;
}

function appendElements(columnDiv, cardDiv, image, cardBodyDiv, titleElement, genreElement, durationElement, buttonDiv) {
    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(genreElement);
    cardBodyDiv.appendChild(durationElement);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(buttonDiv);
    columnDiv.appendChild(cardDiv);
    const cardsDiv = document.getElementById('cards');
    cardsDiv.appendChild(columnDiv);
}

function createAndShowModal(movie) {
    const modal = createModal(movie);
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

function createModal(movie) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'infoModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="infoModalLabel">${movie.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${movie.imageUrl}" class="img-fluid" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div>
                                <p>${movie.description}</p>
                            </div>
                            <div>
                                <h6>Duration</h6>
                                <p>${movie.duration}</p>
                                <h6>Genre</h6>
                                <p>${movie.genre}</p>
                                <h6>Cast</h6>
                                <p>${movie.cast}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    return modal;
}







