import { characterCard } from "./helpers.js";

// Hent favoritter fra LocalStorage og vis dem på siden
const showFavorites = () => {
  const favoriteListDiv = document.getElementById("favoriteList");
  favoriteListDiv.innerHTML = "";

  const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  if (favoriteList.length === 0) {
    favoriteListDiv.textContent = "You haven't added any favorites yet.";
  } else {
    favoriteList.forEach((character) => {
      const characterDiv = characterCard(character);
      favoriteListDiv.appendChild(characterDiv);
    });
  }
};
showFavorites();

//funksjon som tømmer listen
const clearFavorites = () => {
  localStorage.removeItem("favoriteList");
  showFavorites();
};

//knapp som kaller på funksjonen
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearFavorites);


//Funksjon som oppretter listitems
const addSuggestion = (text) => {
  const list = document.getElementById("list");
  const listItem = document.createElement("li");
  listItem.textContent = text;
  list.appendChild(listItem);
};

const searchField = document.getElementById("searchField"); 
searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const inputText = searchField.value; 
    addSuggestion(inputText);
    searchField.value = ""; 
  }
});