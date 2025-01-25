(function () {
  const songsTableBody = document.querySelector(".songs__body");
  let songsData = [];
  async function fetchSongs() {
    try {
      const response = await fetch(
        "https://www.pgm.gent/data/bestof2024/tijdloze.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const songs = await response.json();
      console.log("Fetched songs:", songs);
      songsData = songs;
      renderSongs(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      songsTableBody.innerHTML = `<tr><td colspan="4">Failed to load songs. Please try again later.</td></tr>`;
    }
  }

  // `renderSongs` genereert en toont songdata in de tabel.
  function renderSongs(songs) {
    let rows = "";
    songs.forEach((song) => {
      rows += `
        <tr class="songs__row">
          <td class="songs__cell songs__cell--place">${song.position2024}</td>
          <td class="songs__cell songs__cell--song">
            <div class="songs__title">${song.song_title}</div>
            <div class="songs__artist">${song.name}</div>
          </td>
          <td class="songs__cell songs__cell--album">${song.album_title}</td>
          <td class="songs__cell songs__cell--released">${song.release_year}</td>
        </tr>
      `;
    });
    songsTableBody.innerHTML = rows;
  }

  if (songsTableBody) {
    fetchSongs();
  }

  function filterTop100() {
    const top100Songs = songsData
      .filter((song) => song.position2024)
      .sort((a, b) => a.position2024 - b.position2024)
      .slice(0, 100);

    renderSongs(top100Songs);
  }

  const top100Button = document.getElementById("tab-top-100");
  top100Button.addEventListener("click", filterTop100);

  let currentPage = 1;
  const itemsPerPage = 20;
  function paginateSongs(songs, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return songs.slice(startIndex, endIndex);
  }
})();
