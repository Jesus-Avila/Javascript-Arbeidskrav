
const baseURL = 'https://fortnite-api.com/v2/cosmetics/br/'
const cosmeticID = 'Backpack_BrakePedal'


const namePlaceholder = document.querySelector('#cosmeticName');
const cosmeticImageContainer = document.querySelector('#cosmeticImageContainer');
const cosmeticDescription = document.querySelector('#cosmeticDescription');
const cosmeticRarity = document.querySelector('#cosmeticRarity');


async function fetchCosmetic() {
    try {
        const response = await fetch(baseURL + cosmeticID);
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
}

async function fetchAndDisplayCosmetic() {
    try {
        const data = await fetchCosmetic();
        displayCosmetic(data);
    } catch (error) {
        console.error('Error:', error);
    }
}