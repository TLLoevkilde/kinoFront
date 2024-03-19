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
        editButton.addEventListener('click', function () { showModal(movie) })

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mb-4')
        deleteButton.textContent = 'Delete'

        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)
        row.appendChild(actionsCell)

        tableBody.appendChild(row)
    })
}


// Create Movie
document.getElementById('btnCreate').addEventListener('click', function () { showModal(null) });


function showModal(movie) {
    const modal = new bootstrap.Modal(document.getElementById('movieModal'))

    // Header
    document.getElementById('modalTitle').textContent = movie ? 'Edit movie' : 'Create movie'

    // Input fields
    document.getElementById('title').value = movie ? movie.title : ''
    document.getElementById('genre').value = movie ? movie.genre : ''
    document.getElementById('duration').value = movie ? movie.duration : ''
    document.getElementById('description').value = movie ? movie.description : ''
    document.getElementById('cast').value = movie ? movie.cast : ''
    document.getElementById('imageUrl').value = movie ? movie.imageUrl : ''

    // Footer
    document.getElementById('btnSubmit').textContent = movie ? 'Edit' : 'Create'

    modal.show()
}
