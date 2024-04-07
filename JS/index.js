let characterData; // Definerer en global variabel for å lagre karakterdata

const fetchData = () => {
  fetch("https://fortnite-api.com/v2/cosmetics/br/new")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      characterData = responseData.data.items;
      characterCard(characterData, 10);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

fetchData();

const characterCard = (data, numberOfCharacters) => {
  const characterListDiv = document.getElementById("characterContainer");
  characterListDiv.innerHTML = "";

  for (let i = 0; i < numberOfCharacters; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const character = data[randomIndex];
    const image = character.images.icon;

        // bestemmer farge basert på rarity
        let backgroundColor;

        switch (character.rarity.value.toLowerCase()) {
          case "uncommon":
            backgroundColor = "green";
            break;
          case "common":
            backgroundColor = "grey";
            break;
          case "rare":
            backgroundColor = "blue";
            break;
          case "epic":
            backgroundColor = "purple";
            break;
          case "legendary":
            backgroundColor = "orange";
            break;
          case "mythic":
            backgroundColor = "yellow";
            break;
          case "exotic":
            backgroundColor = "turquoise";
            break;
          default:
            backgroundColor = "#20263d"; // Default color
        }
    
    //Karakter div
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");
    characterDiv.style.backgroundColor = backgroundColor;
    characterDiv.style.position = "relative";
    characterDiv.style.borderRadius = "10px";
    characterDiv.style.cursor = "pointer";

    //Karakter text
    const nameElement = document.createElement("p");
    nameElement.textContent = `${character.name}`;
    nameElement.style.fontSize = "36px";
    nameElement.style.position = "absolute";
    nameElement.style.bottom = "0";
    nameElement.style.margin = "20px";

    //Karakterbilde
    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = character.name;
    imageElement.style.width = "300px";
    imageElement.style.height = "400px";
    imageElement.style.objectFit = "cover";

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart", "heartIcon");
    heartIcon.style.fontSize = "36px";
    heartIcon.style.opacity = "100%";
    heartIcon.style.position = "absolute";
    heartIcon.style.top = "0";
    heartIcon.style.right = "0";
    heartIcon.style.zIndex = "999";
    heartIcon.style.margin = "20px";

    //Eventlistener og kaller på funksjonen addFavourite
    heartIcon.addEventListener("click", () => {
      addFavourite(character);
      alert("Added to favourites!");
    });

    //Kalle funksjonen navigateToInfoPage ved klikk på karakter kortet
    imageElement.addEventListener("click", () => {
      navigateToInfoPage(character.id);
    });

    characterDiv.appendChild(nameElement);
    characterDiv.appendChild(imageElement);
    characterDiv.appendChild(heartIcon);
    characterListDiv.appendChild(characterDiv);
  }
};

//Sender valgte element til localstorage, må hentes ned igjen i favourites.js
const addFavourite = (character) => {
  let favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  favoriteList.push(character);
  localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
};

//Navigerer til info.html med id til valgt karakter
const navigateToInfoPage = (id) => {
  window.location.href = `info.html?cosmeticID=${encodeURIComponent(id)}`;
};

// Søkefunksjon
const searchField = document.getElementById("search-field");

searchField.style.color = "black";
searchField.style.border = "1px solid #ccc";
searchField.style.padding = "15px";

searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchInput = searchField.value.toLowerCase();
    const filteredCharacters = characterData.filter((character) =>
      character.name.toLowerCase().includes(searchInput)
    );
    characterCard(filteredCharacters, filteredCharacters.length);
  }
});
