// === Fetch Albums =====
const albumsContainer = document.getElementById("albums");
async function fetchAlbums() {
  try {
    const response = await fetch(
      "https://www.pgm.gent/data/bestof2024/albums.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const albums = await response.json();

    albumsContainer.innerHTML = "";

    for (const album of albums) {
      const albumElement = `
                  <li class="album">
                      <img src="${album.image}" alt="${album.title}">
                      <h2 class="album__title">${album.title}</h2>
                      <p class="album__month">${album.release_date}</p>
                      <p class="album__artist">${album.artist}</p>
                      <div class="album__genres">
                          ${album.genre
                            .map(
                              (genre) => `<p class="album__genre">${genre}</p>`
                            )
                            .join("")}
                      </div>
                  </li>
              `;
      albumsContainer.innerHTML += albumElement;
    }
  } catch (error) {
    console.error("Error fetching albums data:", error);
    albumsContainer.innerHTML =
      "<p>Failed to load albums. Please try again later.</p>";
  }
}

if (albumsContainer) {
  fetchAlbums();
}

// === Fetch Movies =====
const moviesList = document.getElementById("movies");
async function fetchMovies() {
  try {
    const response = await fetch(
      "https://www.pgm.gent/data/bestof2024/movies.json"
    );
    if (!response.ok) {
      throw new Error(`Error! ${response.status}`);
    }
    const movies = await response.json();

    moviesList.innerHTML = "";

    for (const card of movies) {
      const moviesElement = `
                <li class="card">
                <img src="${card.image}" alt="">
                <div class="card__info">
                    <h2 class="card__title">${card.title}</h2>
                    <p class="card__description">
                        ${card.short_description}
                    </p>
                    <p class="card__description">
                        ${card.review}
                    </p>
                    <div class="card__links">
                        <a href="${card.trailer_link}" class="card__link"> Trailer </a>
                        <a href="${card.imdb_link}" class="card__link"> IMDB </a>
                    </div>
                </div>
            </li>
              `;
      moviesList.innerHTML += moviesElement;
    }
  } catch (error) {
    console.error("Error fetching albums data:", error);
  }
}

if (moviesList) {
  fetchMovies();
}

// === Fetch Series =====

const seriesList = document.getElementById("series");
async function fetchSeries() {
  try {
    const response = await fetch(
      "https://www.pgm.gent/data/bestof2024/series.json"
    );
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const series = await response.json();
    seriesList.innerHTML = "";

    for (const card of series) {
      const seriesElement = `
    <li class="card">
                <img src="${card.image}" alt="">
                <div class="card__info">
                    <h2 class="card__title"> ${card.title}</h2>
                    <p class="card__description">${card.short_description}</p>

                        <p class="card__description">
                            ${card.review}
                        </p> 
                    <div class="card__links">
                        <a href="${card.trailer_link}" class="card__link"> Trailer </a>
                        <a href="${card.imdb_link}" class="card__link"> IMDB </a>
                    </div>
                </div>
            </li>
      
    `;
      seriesList.innerHTML += seriesElement;
    }
  } catch (error) {
    console.error("Error fetching series data:", error);
  }
}

if (seriesList) {
  fetchSeries();
}

// ====Fetch Games ===
const gamesContainer = document.getElementById("games");
const gameGalleryContainer = document.querySelector(".game-gallery");
async function fetchGames() {
  try {
    const response = await fetch(
      "https://www.pgm.gent/data/bestof2024/games.json"
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const games = await response.json();
    console.log("Games data:", games);

    if (gamesContainer) {
      gamesContainer.innerHTML = "";
    }
    if (gameGalleryContainer) {
      gameGalleryContainer.innerHTML = "";
    }

    for (const game of games) {
      if (!game.honorable_mentions) {
        const sliderElement = `
          <div class="slider__image">
            <img src="${game.image}" alt="${game.title}">
            <span class="image-title">${game.title}</span>
          </div>
        `;
        if (gamesContainer) {
          gamesContainer.innerHTML += sliderElement;
        }
      } else {
        const galleryElement = `
          <div class="game-gallery__item">
            <img class="game-gallery__image" src="${game.image}" alt="${game.title}">
            <span class="game-gallery__title">${game.title}</span>
          </div>
        `;
        if (gameGalleryContainer) {
          gameGalleryContainer.innerHTML += galleryElement;
        }
      }
    }

    const firstImage = gamesContainer.querySelector(".slider__image");
    if (firstImage) {
      firstImage.classList.add("active");
    } else {
      console.error("No images found in games container");
    }
  } catch (error) {
    console.error("Error fetching games data:", error);
  }
}
if (gamesContainer) {
  fetchGames();
}
