function createNavbar() {
    // Find den ønskede div ved hjælp af dens id
    const navbarDiv = document.getElementById('navbar');

    // Opret et nyt navbar-element
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-lg navbar-light bg-light';

    // Indholdet af din navbar (som før)
    navbar.innerHTML = `
        <a class="navbar-brand" href="index.html">Kino</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    `;

    // Indsæt navbar-elementet i den ønskede div
    navbarDiv.appendChild(navbar);
}

// Kald funktionen for at oprette og indsætte navbar'en
createNavbar();
