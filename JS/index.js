import { characterCard, url } from "./helpers.js";
let characterData; // Definerer en global variabel for å lagre karakterdata
let favoriteList;

const fetchData = async () => {
  try {
    const [response, response2] = await Promise.all([
      fetch("https://fortnite-api.com/v2/cosmetics/br/"),
      fetch (`${url}`)])
    
    if (!response.ok || !response2.ok) {
      throw new Error("Network response was not ok");
    }
    favoriteList = await response2.json();
    const responseData = await response.json();
    characterData = responseData.data;
    //shuffleArray(characterData);
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
  for (let i = 0; i < Math.min(data.length, 150); i++) {
    const characterDiv = characterCard(data[i], favoriteList);
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
  .slice(0, 150);//søkefeltet tar hensyns til grensen på 150 
  characterCards(filteredCharacters, filteredCharacters.length);
console.log(searchInput)
});