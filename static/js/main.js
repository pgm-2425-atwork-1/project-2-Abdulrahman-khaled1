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

    let sliderContent = ""; //buiten (forloop) om niet meerdere keren binnen for lop te schrijven
    let galleryContent = "";
    // Verdeel de spellen in de slider en de sectie "Honorable Mentions" op basis van de eigenschap "honorable_mentions".
    // Er worden dynamisch HTML-elementen aangemaakt en toegevoegd aan de juiste container (slider voor gewone spellen en "game-gallery" voor eervolle vermeldingen).
    for (const game of games) {
      if (!game.honorable_mentions) {
        sliderContent += `
          <div class="slider__image">
            <img src="${game.image}" alt="${game.title}">
            <span class="image-title">${game.title}</span>
          </div>
        `;
      } else {
        galleryContent += `
          <div class="game-gallery__item">
            <img class="game-gallery__image" src="${game.image}" alt="${game.title}">
            <span class="game-gallery__title">${game.title}</span>
          </div>
        `;
      }
    }

    if (gamesContainer) {
      gamesContainer.innerHTML = sliderContent;
    }

    if (gameGalleryContainer) {
      gameGalleryContainer.innerHTML = galleryContent;
    }

    // Het eerste item in de slider selecteren en als "actiev" instellen
    const firstImage = gamesContainer.querySelector(".slider__image");
    if (firstImage) {
      firstImage.classList.add("active");
    } else {
      console.error("No images found in games container");
    }
    initializeSlider();
  } catch (error) {
    console.error("Error fetching games data:", error);
  }
}
if (gamesContainer) {
  fetchGames();
}

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
function initializeSlider() {
  const images = document.querySelectorAll(".slider__image");
  let currentIndex = 0;

  function updateSlider() {
    images.forEach((image, index) => {
      image.classList.toggle("active", index === currentIndex);
    });

    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display =
      currentIndex === images.length - 1 ? "none" : "block";
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  updateSlider();
}
