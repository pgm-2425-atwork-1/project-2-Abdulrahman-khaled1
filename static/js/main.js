const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Sluit de navigatielijst als er buiten het menu-icoon of de lijst wordt geklikt
document.addEventListener("click", (event) => {
  if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
    navLinks.classList.remove("active");
  }
});



// === Fetch Albums =====
const albumsContainer = document.getElementById('albums');
async function fetchAlbums() {
  try {
      const response = await fetch('https://www.pgm.gent/data/bestof2024/albums.json');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const albums = await response.json();

          
          albumsContainer.innerHTML = '';

          for (const album of albums) {
              const albumElement = `
                  <li class="album">
                      <img src="${album.image}" alt="${album.title}">
                      <h2 class="album__title">${album.title}</h2>
                      <p class="album__month">${album.release_date}</p>
                      <p class="album__artist">${album.artist}</p>
                      <div class="album__genres">
                          ${album.genre.map(genre => `<p class="album__genre">${genre}</p>`).join('')}
                      </div>
                  </li>
              `;
              albumsContainer.innerHTML += albumElement;
          }
     
  } catch (error) {
      console.error('Error fetching albums data:', error);
      albumsContainer.innerHTML = '<p>Failed to load albums. Please try again later.</p>';
  }
}

if (albumsContainer) {
  fetchAlbums();
}
