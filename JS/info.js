
const baseURL = 'https://fortnite-api.com/v2/cosmetics/br/';
let data;

const namePlaceholder = document.querySelector('#cosmeticName');
const cosmeticImageContainer = document.querySelector('#cosmeticImageContainer');
const cosmeticDescription = document.querySelector('#cosmeticDescription');
const cosmeticRarity = document.querySelector('#cosmeticRarity');
const cosmeticInfoCard = document.querySelector('#cosmeticInfoCard');

// Fetcher data fra API
async function fetchCosmetic(newCosmeticID) {
    try {
        const response = await fetch(baseURL + newCosmeticID);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('from fetchcosm', data);
        console.log('from fetcdsfdshcosm', data.data);
        return data.data;
    } catch (error) {
        console.error('Error:', error);
    }    
}

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
async function fetchAndDisplayCosmetic(newCosmeticID) {
    try {
        data = await fetchCosmetic(newCosmeticID);
        displayCosmetic(data);
        changeButtonText();
    } catch (error) {
        console.error('Error:', error);
    }
}

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
    window.location.href = "index.html";
});

// Endre bakgrunnsfarge basert på rarity
function changeCardColor (data) {
    switch (data.rarity.value.toLowerCase()) {
      case "uncommon":
        cosmeticInfoCard.style.backgroundColor = "green";
        break;
      case "common":
        cosmeticInfoCard.style.backgroundColor = "grey";
        break;
      case "rare":
        cosmeticInfoCard.style.backgroundColor = "blue";
        break;
      case "epic":
        cosmeticInfoCard.style.backgroundColor = "purple";
        break;
      case "legendary":
        cosmeticInfoCard.style.backgroundColor = "orange";
        break;
      case "mythic":
        cosmeticInfoCard.style.backgroundColor = "yellow";
        break;
      case "exotic":
        cosmeticInfoCard.style.backgroundColor = "turquoise";
        break;
      default:
        cosmeticInfoCard.style.backgroundColor = "#20263d"; // Default color
    }
}

// Eventlistener og kaller på funksjonen addFavourite
const addFavouriteButton = document.querySelector('#addToFavoritesBtn');
addFavouriteButton.addEventListener('click', () => {
    if(!checkIfFavorite(data)) {
        addFavourite(data);
        changeButtonText();
        alert("Added to favourites!");
    } else {
        removeFavorite(data);
        changeButtonText();
        alert("Removed from favourites!");
}})

// Funksjon for å legge til favoritt
const addFavourite = (data) => {
    let favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
    favoriteList.push(data);
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  };

  // Funksjon for slette favoritt
    const removeFavorite = (data) => {
        let favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
        favoriteList = favoriteList.filter((favorite) => favorite.id !== data.id);
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    };

  // Funksjon for å sjekke om favoritt er lagt til
    const checkIfFavorite = (data) => {
        let favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
        console.log('favoriteList:', favoriteList);
        let isFavorite = favoriteList.some((favorite) => favorite.id === data.id);
        console.log('isFavorite:', isFavorite);
        return isFavorite;
    };

// Funksjon for å endre tekst på knapp basert på om favoritt er lagt til
function changeButtonText() {
    checkIfFavorite(data) ? addFavouriteButton.innerHTML = "Remove from favourites" : addFavouriteButton.innerHTML = "Add to favourites";
}