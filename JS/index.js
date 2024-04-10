import { characterCard } from "./helpers.js";
let characterData; // Definerer en global variabel for å lagre karakterdata

const fetchData = async () => {
  try {
    const response = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    characterData = responseData.data.items;
    shuffleArray(characterData);
    characterCards(characterData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
searchField.style.color = "white";
searchField.style.padding = "5px";
searchField.style.fontSize = "1.4rem"
searchField.style.width = "200px"

searchField.addEventListener("input", (event) => {
  const searchInput = event.target.value.toLowerCase();
  const filteredCharacters = characterData.filter((character) => character.name.toLowerCase().includes(searchInput));
  characterCards(filteredCharacters, filteredCharacters.length);
console.log(searchInput)
});
