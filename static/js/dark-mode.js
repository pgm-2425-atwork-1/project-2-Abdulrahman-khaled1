const html = document.documentElement;
const toggleMoon = document.getElementById("toggle-mode");
const toggleSun = document.getElementById("toggle-mode-sun");

//// om de status van dark mode in localStorage bij het laden van de pagina te controleren
if (localStorage.getItem("dark-mode") === "enabled") {
  //Als dark mode is ingeschakeld, voeg de klasse "dark-mode" toe aan de HTML-tag
  html.classList.add("dark-mode");
} else {
  // Als het niet is ingeschakeld, verwijder het"
  html.classList.remove("dark-mode");
}

// Functie om te schakelen tussen light mode en dark mode
function togglleMode() {
  html.classList.toggle("dark-mode");
  if (html.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
}
toggleMoon.addEventListener("click", togglleMode);
toggleSun.addEventListener("click", togglleMode);
