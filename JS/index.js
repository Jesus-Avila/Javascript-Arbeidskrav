import { characterCard } from "./helpers.js";
let characterData; // Definerer en global variabel for å lagre karakterdata

const fetchData = async () => {
  try {
    const response = await fetch("https://fortnite-api.com/v2/cosmetics/br/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    characterData = responseData.data;
    shuffleArray(characterData);
    characterCards(characterData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// random cosmetics fra array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetchData();

const characterCards = (data) => {
  const characterListDiv = document.getElementById("characterContainer");
  characterListDiv.innerHTML = "";

//Henter ut 50 elementer fra api om gangen
  for (let i = 0; i < Math.min(data.length, 50); i++) {
    const characterDiv = characterCard(data[i]);
    characterListDiv.appendChild(characterDiv);
  }
};

// Søkefunksjon
const searchField = document.getElementById("search-field");
searchField.style.color = "white";
searchField.style.padding = "5px";
searchField.style.fontSize = "1.4rem"
searchField.style.width = "200px"

searchField.addEventListener("input", (event) => {
  const searchInput = event.target.value.toLowerCase();
  const filteredCharacters = characterData
  .filter((character) => character.name.toLowerCase().includes(searchInput))
  .slice(0, 50);
  characterCards(filteredCharacters, filteredCharacters.length);
console.log(searchInput)
});


//test
// Footer-styling
// const socialIcon = document.querySelector('.icons');

// // //  Legger til en mouseenter event listener for ikonet
// socialIcon.addEventListener('mouseenter', () => {
//   socialIcon.querySelector('img').style.filter = 'brightness(70%)';
// })
// // // Legger til en mouseleave event listener for ikonet
// socialIcon.addEventListener('mouseleave', () => {
//   socialIcon.querySelector('img').style.filter = 'brightness(100%)';
// });ialIcon.style.transform = 'scale(1)';
