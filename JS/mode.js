const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const nav = document.querySelector('nav');

darkModeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    nav.classList.remove('dark-mode');
    body.classList.add('light-mode');
    nav.classList.add('light-mode'); 
    localStorage.setItem('mode', 'light');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    nav.classList.add('dark-mode');
    nav.classList.remove('light-mode');
    localStorage.setItem('mode', 'dark');
  }
});


const currentMode = localStorage.getItem('mode');

if (currentMode === 'dark') {
  body.classList.add('dark-mode');
} else {
  body.classList.remove('dark-mode');
}