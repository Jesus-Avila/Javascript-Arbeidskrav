
const baseURL = 'https://fortnite-api.com/v2/cosmetics/br/';
let data;

const namePlaceholder = document.querySelector('#cosmeticName');
const cosmeticImageContainer = document.querySelector('#cosmeticImageContainer');
const cosmeticDescription = document.querySelector('#cosmeticDescription');
const cosmeticRarity = document.querySelector('#cosmeticRarity');


async function fetchCosmetic(newCosmeticID) {
    try {
        const response = await fetch(baseURL + newCosmeticID);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('from fetchcosm', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }    
}

function displayCosmetic(data) {
    // Create and display of image
    const cosmeticImage = document.createElement('img');
    cosmeticImage.src = data.data.images.icon;
    cosmeticImage.style.width = '100%';
    cosmeticImage.style.overflow = 'hidden';
    cosmeticImageContainer.append(cosmeticImage);

    // Display name of cosmetic
    namePlaceholder.innerHTML = data.data.name;

    // Display rarity of cosmetic
    cosmeticRarity.innerHTML = data.data.rarity.displayValue;

    // Display description of cosmetic
    cosmeticDescription.innerHTML = data.data.description;
}


async function fetchAndDisplayCosmetic(newCosmeticID) {
    try {
        const data = await fetchCosmetic(newCosmeticID);
        displayCosmetic(data);
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
// backToHomeArrow.style.cursor = "pointer";

backToHomeArrow.addEventListener("click", () => {
    window.location.href = "index.html";
});

// Eventlistener og kaller på funksjonen addFavourite
const addFavouriteButton = document.querySelector('#addToFavoritesBtn');
addFavouriteButton.addEventListener('click', () => {
    addFavourite(data);
    alert("Added to favourites!");
})

// Funksjon for å legge til favoritt
const addFavourite = (data) => {
    let favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
    favoriteList.push(data);
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  };