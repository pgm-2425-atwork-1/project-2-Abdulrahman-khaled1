const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links')

menuIcon.addEventListener('click', ()=>{
    navLinks.classList.toggle('active')
});

// Sluit de navigatielijst als er buiten het menu-icoon of de lijst wordt geklikt
document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});
