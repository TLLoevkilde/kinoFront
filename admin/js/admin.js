import { fetchAnyUrl } from "../../js/module.js"

let movies = []
fetchMovies()
async function fetchMovies() {
    movies = await fetchAnyUrl("http://localhost:8080/movies")
    refreshTable()
}

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
        editButton.addEventListener('click', function () { createAndShowModal(movie) })

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mb-4')
        deleteButton.textContent = 'Delete'

        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)
        row.appendChild(actionsCell)

        tableBody.appendChild(row)
    })
}


// For at oprette en ny filmmodal
document.getElementById('btnCreate').addEventListener('click', function () {
    createAndShowModal(null)
});


function createAndShowModal(movie) {
    const modal = createModal(movie);
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

function createModal(movie) {
    const modal = document.createElement('div')
    modal.classList.add('modal', 'fade')
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('aria-labelledby', 'infoModalLabel')
    modal.setAttribute('aria-hidden', 'true')
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="infoModalLabel">${movie ? 'Edit Movie' : 'Create Movie'}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="movieForm">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" value="${movie ? movie.title : ''}">
                        </div>
                        <div class="mb-3">
                            <label for="genre" class="form-label">Genre</label>
                            <input type="text" class="form-control" id="genre" value="${movie ? movie.genre : ''}">
                        </div>
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration</label>
                            <input type="text" class="form-control" id="duration" value="${movie ? movie.duration : ''}">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" rows="3">${movie ? movie.description : ''}</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="cast" class="form-label">Cast</label>
                            <input type="text" class="form-control" id="cast" value="${movie ? movie.cast : ''}">
                        </div>
                        <div class="mb-3">
                            <label for="imageUrl" class="form-label">Image URL</label>
                            <input type="text" class="form-control" id="imageUrl" value="${movie ? movie.imageUrl : ''}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success">${movie ? 'Save Changes' : 'Create'}</button>
                </div>
            </div>
        </div>
    `
    return modal;
}
