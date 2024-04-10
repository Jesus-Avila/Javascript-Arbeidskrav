import { addFavouriteCrud } from "./helpers.js";
const baseURL = 'https://fortnite-api.com/v2/cosmetics/br/';
let data;

const namePlaceholder = document.querySelector('#cosmeticName');
const cosmeticImageContainer = document.querySelector('#cosmeticImageContainer');
const cosmeticDescription = document.querySelector('#cosmeticDescription');
const cosmeticRarity = document.querySelector('#cosmeticRarity');
const cosmeticInfoCard = document.querySelector('#cosmeticInfoCard');

// Fetcher data fra API
const fetchCosmetic = async (newCosmeticID) => {
    try {
        const response = await fetch(baseURL + newCosmeticID);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Cosmetic data fetched', data.data);
        return data.data;
    } catch (error) {
        console.error('Error:', error);
    }    
};


// Display av data
function displayCosmetic(data) {
    // Create and display of image
    const cosmeticImage = document.createElement('img');
    cosmeticImage.src = data.images.icon;
    cosmeticImage.style.width = '100%';
    cosmeticImage.style.overflow = 'hidden';
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
        changeButtonText();
    } catch (error) {
        console.error('Error:', error);
    }
};


// Henter ut URL parameteren(ID'en til cosmetic) og kaller på fetchAndDisplayCosmetic
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newCosmeticID = urlParams.get('cosmeticID');

    console.log('newCosmeticID:', newCosmeticID);
    fetchAndDisplayCosmetic(newCosmeticID);
})

// Tilbake pil på info-siden
const backToHomeArrow = document.querySelector("#chevronTextContainer");
    backToHomeArrow.addEventListener("click", () => {
        if (history.length > 1) {
            window.history.back();
        } else
        window.location.href = "index.html";
    });

    // Tilbake til index.html eller favourites.html ved bruk av tilbakeknapp i nettleser eller på siden
window.addEventListener("popstate", () => {
    if (window.history.state && window.history.state.page) {
        window.location.href = 'favourites.html';
    } else if (window.history.state && window.history.state.page === 'index') {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'index.html';
    }
})

// Endre bakgrunnsfarge basert på rarity
const changeCardColor = (data) => {
    switch (data.rarity.value.toLowerCase()) {
      case "uncommon":
        cosmeticInfoCard.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
        break;
      case "common":
        cosmeticInfoCard.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
        break;
      case "rare":
        cosmeticInfoCard.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
        break;
      case "epic":
        cosmeticInfoCard.style.backgroundColor = "rgba(128, 0, 128, 0.5)";
        break;
      case "legendary":
        cosmeticInfoCard.style.backgroundColor = "rgba(255, 165, 0, 0.5)";
        break;
      default:
        cosmeticInfoCard.style.backgroundColor = "rgba(64, 224, 208, 0.5)"; // Default color
    }
};


// Eventlistener og kaller på funksjonen addFavourite
const addFavouriteButton = document.querySelector('#addToFavoritesBtn');
addFavouriteButton.addEventListener('click', () => {
    if(!checkIfFavorite(data)) {
        addFavouriteCrud(data)
        changeButtonText();
        alert("Added to favourites!");
    } else {
        removeFavorite(data);
        changeButtonText();
        alert("Removed from favourites!");
}})

// Funksjon for slette favoritt
const removeFavorite = (data) => {
 //kommer snart en kode
};

// Funksjon for å sjekke om favoritt er lagt til
const checkIfFavorite = (data) => {
    //kommer snart en kode
    return false;
};

// Funksjon for å endre tekst på knapp basert på om favoritt er lagt til
const changeButtonText = () => {
    checkIfFavorite(data) ? addFavouriteButton.innerHTML = "Remove from favourites" : addFavouriteButton.innerHTML = "Add to favourites";
};
