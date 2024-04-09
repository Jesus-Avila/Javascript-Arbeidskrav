import { characterCard } from "./helpers.js";
let characterData; // Definerer en global variabel for å lagre karakterdata

const fetchData = () => {
  fetch("https://fortnite-api.com/v2/cosmetics/br/new")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      characterData = responseData.data.items;
      shuffleArray(characterData)
      characterCards(characterData);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

// random skins fra array
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


  for (let i = 0; i < data.length; i++) {
    const characterDiv = characterCard(data[i]);
    characterListDiv.appendChild(characterDiv);
  }
};

// Søkefunksjon
const searchField = document.getElementById("search-field");
searchField.style.color = "black";
searchField.style.border = "1px solid #ccc";
searchField.style.padding = "15px";

searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchInput = searchField.value.toLowerCase();
    const filteredCharacters = characterData.filter((character) => character.name.toLowerCase().includes(searchInput));
    characterCards(filteredCharacters, filteredCharacters.length);
  }
});
