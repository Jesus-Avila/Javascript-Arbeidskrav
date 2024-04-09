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
