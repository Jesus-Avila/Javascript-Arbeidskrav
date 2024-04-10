import { deleteFavouriteCrud } from "./helpers.js";
import {showFavorites } from "./helpers.js";
let favoriteList = await showFavorites();

//funksjon som tømmer listen
const clearFavorites = async () => {
  const promises = favoriteList.map(async (character) => {
    await deleteFavouriteCrud(character._id)
  });
  await Promise.all(promises)
  favoriteList = await showFavorites();
};

//knapp som kaller på funksjonen
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearFavorites);
