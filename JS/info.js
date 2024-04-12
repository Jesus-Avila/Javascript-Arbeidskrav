import { addFavouriteCrud, deleteFavouriteCrud, getFavorite, url, getFavoritesList } from "./helpers.js";
const baseURL = "https://fortnite-api.com/v2/cosmetics/br/";
const urlCrud = url;
let data;
let newCosmeticID;
let favoriteList;
let favorite;

const namePlaceholder = document.querySelector("#cosmeticName");
const cosmeticImageContainer = document.querySelector("#cosmeticImageContainer");
const cosmeticDescription = document.querySelector("#cosmeticDescription");
const cosmeticRarity = document.querySelector("#cosmeticRarity");
const cosmeticInfoCard = document.querySelector("#cosmeticInfoCard");

// Fetcher data fra API
const fetchCosmetic = async (newCosmeticID) => {
  try {
    const response = await fetch(baseURL + newCosmeticID);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Cosmetic data fetched", data.data);
    return data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Display av data
function displayCosmetic(data) {
  // Create and display of image
  const cosmeticImage = document.createElement("img");
  cosmeticImage.src = data.images.icon;
  cosmeticImage.style.width = "100%";
  cosmeticImage.style.overflow = "hidden";
  cosmeticImageContainer.append(cosmeticImage);

  // Display name of cosmetic
  namePlaceholder.innerHTML = data.name;

  // Display rarity of cosmetic
  cosmeticRarity.innerHTML = data.rarity.displayValue;

  // Display description of cosmetic
  cosmeticDescription.innerHTML = data.description;

  // Change background color of cosmetic card based on rarity
  changeCardColor(data);
}

// Fetcher data og kaller på displayCosmetic
const fetchAndDisplayCosmetic = async (newCosmeticID) => {
  try {
    data = await fetchCosmetic(newCosmeticID);
    displayCosmetic(data);
    favoriteList = await getFavoritesList(urlCrud);
    favorite = await getFavorite(data, favoriteList);
    console.log("favorite:", favorite);
    changeButtonText(favorite);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Henter ut URL parameteren(ID'en til cosmetic) og kaller på fetchAndDisplayCosmetic
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  newCosmeticID = urlParams.get("cosmeticID");

  console.log("newCosmeticID:", newCosmeticID);
  fetchAndDisplayCosmetic(newCosmeticID);
});

// Tilbake pil på info-siden
const backToHomeArrow = document.querySelector("#chevronTextContainer");
backToHomeArrow.addEventListener("click", () => {
  window.history.back();
});

// Eventlistener og kaller på funksjonen addFavourite
const addFavouriteButton = document.querySelector("#addToFavoritesBtn");
addFavouriteButton.addEventListener("click", async () => {
  let favorites = await getFavoritesList(urlCrud);
  let newFavorite = await getFavorite(data, favorites);
  if (!newFavorite) {
    favorite = await addFavouriteCrud(data);
    changeButtonText(true);
    console.log("added to favorite from clicking button:", favorite);
  } else {
    await deleteFavouriteCrud(favorite._id);
    changeButtonText(false);
    console.log("removed from favorite from clicking button:", favorite);
  }
});

// Funksjon for å endre tekst på knapp basert på om favoritt er lagt til
const changeButtonText = (favorite) => {
  addFavouriteButton.innerHTML = favorite ? "Remove from favorites" : "Add to favorites";
};

// Endre bakgrunnsfarge basert på rarity
const changeCardColor = (data) => {
  switch (data.rarity.value.toLowerCase()) {
    case "uncommon":
      cosmeticInfoCard.style.backgroundColor = "rgba(0, 128, 0)";
      break;
    case "common":
      cosmeticInfoCard.style.backgroundColor = "rgba(128, 128, 128)";
      break;
    case "rare":
      cosmeticInfoCard.style.backgroundColor = "rgba(0, 0, 255)";
      break;
    case "epic":
      cosmeticInfoCard.style.backgroundColor = "rgba(128, 0, 128)";
      break;
    case "legendary":
      cosmeticInfoCard.style.backgroundColor = "rgba(255, 165, 0)";
      break;
    case "mythic":
      cosmeticInfoCard.style.backgroundColor = "rgba(255, 223, 0)"; // Mythic: yellow with the same opacity
      break;
    case "exotic":
      cosmeticInfoCard.style.backgroundColor = "rgba(64, 224, 208)"; // Exotic: turquoise with the same opacity
      break;
    default:
      cosmeticInfoCard.style.backgroundColor = "rgba(0, 0, 0)"; // Default: black with the same opacity
  }
};
