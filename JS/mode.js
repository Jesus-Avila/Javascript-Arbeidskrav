const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    localStorage.setItem('mode', 'light');
  } else {
    body.classList.add('dark-mode');
    localStorage.setItem('mode', 'dark');
  }
});


const currentMode = localStorage.getItem('mode');

if (currentMode === 'dark') {
  body.classList.add('dark-mode');
} else {
  body.classList.remove('dark-mode');
}