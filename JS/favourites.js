import {showFavorites } from "./helpers.js";
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

const searchField = document.getElementById("review"); 
searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const inputText = searchField.value; 
    addSuggestion(inputText);
    searchField.value = ""; 
  }
});