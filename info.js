
const baseURL = 'https://fortnite-api.com/v2/cosmetics/br/'
const cosmeticID = 'Backpack_BrakePedal'


const namePlaceholder = document.querySelector('#cosmeticName');
const cosmeticImageContainer = document.querySelector('#cosmeticImageContainer');
const cosmeticDescription = document.querySelector('#cosmeticDescription');
const coseticRarity = document.querySelector('#cosmeticRarity');


async function fetchCosmetic() {
    try {
        const response = await fetch(baseURL + cosmeticID);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);


        namePlaceholder.innerHTML = data.data.name;

        coseticRarity.innerHTML = data.data.rarity.displayValue;

        cosmeticDescription.innerHTML = data.data.description;

        const cosmeticImage = document.createElement('img');
        cosmeticImage.src = data.data.images.icon;
        cosmeticImage.style.width = '100%';
        cosmeticImage.style.overflow = 'hidden';
        cosmeticImageContainer.append(cosmeticImage);


        return data;
    } catch (error) {
        console.error('Error:', error);
    }    
    console.log(data.data.name);
    
}


fetchCosmetic();
