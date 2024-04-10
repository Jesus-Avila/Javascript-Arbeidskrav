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
