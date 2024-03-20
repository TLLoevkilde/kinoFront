import { fetchAnyUrl, postFormDataAsJson, restDelete } from "../../js/module.js"

const urlMovies = "http://localhost:8080/movies"

// GET
let movies = []
fetchMovies()
async function fetchMovies() {
    movies = await fetchAnyUrl(urlMovies)
    refreshTable()
}

// Table
function refreshTable() {
    clearTableBody()
    createTableBody()
}

function clearTableBody() {
    document.getElementById('tableBody').innerHTML = ''
}

function createTableBody() {
    const tableBody = document.getElementById('tableBody')

    movies.forEach(movie => {
        const row = document.createElement('tr')

        const imageUrlCell = document.createElement('td')
        const image = document.createElement('img')
        image.src = movie.imageUrl
        image.alt = movie.title
        image.style.maxWidth = '90px'
        imageUrlCell.appendChild(image)
        row.appendChild(imageUrlCell)

        const titleCell = document.createElement('td')
        titleCell.textContent = movie.title
        row.appendChild(titleCell)

        const genreCell = document.createElement('td')
        genreCell.textContent = movie.genre
        row.appendChild(genreCell)

        const durationCell = document.createElement('td')
        durationCell.textContent = movie.duration
        row.appendChild(durationCell)

        const descriptionCell = document.createElement('td')
        descriptionCell.textContent = movie.description
        row.appendChild(descriptionCell)

        const castCell = document.createElement('td')
        castCell.textContent = movie.cast
        row.appendChild(castCell)

        const actionsCell = document.createElement('td')
        actionsCell.classList.add('d-grid', 'gap-2')

        const editButton = document.createElement('button')
        editButton.classList.add('btn', 'btn-outline-success', 'btn-sm', 'mb-3', 'mt-4')
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', function () { showMovieModal(movie) })

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mb-4')
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', function () { deleteMovie(movie) })

        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)
        row.appendChild(actionsCell)

        tableBody.appendChild(row)
    })
}


// POST

function showMovieModal(movie) {
    const modal = new bootstrap.Modal(document.getElementById('movieModal'))

    // Header
    document.getElementById('modalTitle').textContent = movie ? 'Edit movie' : 'Create movie'

    // Set movieId value
    if (movie) { document.getElementById('movieId').value = movie.movieId; }

    // Input fields
    document.getElementById('title').value = movie ? movie.title : ''
    document.getElementById('genre').value = movie ? movie.genre : ''
    document.getElementById('duration').value = movie ? movie.duration : ''
    document.getElementById('description').value = movie ? movie.description : ''
    document.getElementById('cast').value = movie ? movie.cast : ''
    document.getElementById('imageUrl').value = movie ? movie.imageUrl : ''

    // Footer
    document.getElementById('btnSubmit').textContent = movie ? 'Save' : 'Create'

    modal.show()
}

document.getElementById('btnCreate').addEventListener('click', function () {
    showMovieModal(null) // Create button is handled here. Edit button is handled in createTable()
});

document.addEventListener('DOMContentLoaded', createFormEventListener)

let movieForm;
function createFormEventListener() {
    movieForm = document.getElementById("movieForm");
    movieForm.addEventListener("submit", handleMovieForm);
}

async function handleMovieForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson(formData, urlMovies);
        alert('Successfully saved')
        fetchMovies()
    } catch (error) {
        alert(error.message);
    }
}

// DELETE
async function deleteMovie(movie) {
    try {
        const confirmed = confirm(`Are you sure you want to delete '${movie.title}'`);
        if (confirmed) {
            const url = urlMovies + "/" + movie.movieId;
            const resp = await restDelete(url);
            alert(`'${movie.title}' was successfully deleted`);
            fetchMovies();
        }
    } catch (error) {
        alert(error.message);
    }
}