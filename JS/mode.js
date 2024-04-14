const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const nav = document.querySelector('nav');
const searchInput = document.getElementById("search-field");
const favoriteText = document.getElementById("favoriteText");
const favouriteList = document.getElementById("favoriteList");

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
  favoriteText.classList.remove('light-mode');
  favoriteText.classList.add('dark-mode');
  favouriteList.classList.remove('light-mode');
  favouriteList.classList.add('dark-mode');
}

function setLightMode() {
  body.classList.remove('dark-mode');
  nav.classList.remove('dark-mode');
  body.classList.add('light-mode');
  nav.classList.add('light-mode'); 
  localStorage.setItem('mode', 'light');
  searchInput.classList.remove('dark-mode');
  searchInput.classList.add('light-mode');
  favoriteText.classList.remove('dark-mode');
  favoriteText.classList.add('light-mode');
  favouriteList.classList.remove('dark-mode');
  favouriteList.classList.add('light-mode');
}

const currentMode = localStorage.getItem('mode');
if (currentMode === 'dark') {
  setDarkMode();
} else {
  setLightMode();
}
