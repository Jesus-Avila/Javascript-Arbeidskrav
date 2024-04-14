const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const nav = document.querySelector('nav');
const searchInput = document.getElementById("search-field");

darkModeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    setLightMode();
  } else {
    setDarkMode();
  }
});

function setDarkMode() {
  body.classList.remove('light-mode');
  body.classList.add('dark-mode');
  nav.classList.add('dark-mode');
  nav.classList.remove('light-mode');
  localStorage.setItem('mode', 'dark');
  searchInput.classList.remove('light-mode');
  searchInput.classList.add('dark-mode');
}

function setLightMode() {
  body.classList.remove('dark-mode');
  nav.classList.remove('dark-mode');
  body.classList.add('light-mode');
  nav.classList.add('light-mode'); 
  localStorage.setItem('mode', 'light');
  searchInput.classList.remove('dark-mode'); // Corrected from 'drak-mode'
  searchInput.classList.add('light-mode');
}

const currentMode = localStorage.getItem('mode');
if (currentMode === 'dark') {
  setDarkMode();
} else {
  setLightMode();
}
