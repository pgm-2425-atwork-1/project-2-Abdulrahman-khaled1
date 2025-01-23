const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");
const closeIcon = document.getElementById("close-icon");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  if (navLinks.classList.contains("active")) {
    menuIcon.classList.add('hidden')
    closeIcon.classList.remove('hidden')
  }
  else{
    menuIcon.classList.remove('hidden')
    closeIcon.classList.add('hidden')
  }
  
});



// Sluit de navigatielijst als er buiten het menu-icoon of de lijst wordt geklikt
document.addEventListener("click", (event) => {
  if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
    navLinks.classList.remove("active");
   menuIcon.classList.remove("hidden");  
   closeIcon.classList.add("hidden");   
  }
});