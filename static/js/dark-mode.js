const html = document.documentElement;
  const toggleMoon = document.getElementById('toggle-mode');
  const toggleSun = document.getElementById('toggle-mode-sun');

  toggleMoon.addEventListener('click', () => {
    html.classList.toggle('dark-mode')
    if (html.classList.contains('dark-mode')) {
      toggleSun.style.display='block'
      toggleMoon.style.display='none'
    }

    else{
       toggleSun.style.display='none'
      toggleMoon.style.display='block'
    }
    })
  
    toggleSun.addEventListener('click', ()=>{
      html.classList.toggle('dark-mode')
      if (html.classList.contains('dark-mode')) {
        toggleSun.style.display='block'
        toggleMoon.style.display='none'
      }
  
      else{
         toggleSun.style.display='none'
        toggleMoon.style.display='block'
      }
      })
