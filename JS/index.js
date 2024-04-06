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

    //Karakter div
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");
    characterDiv.style.backgroundColor = "#20263d";
    characterDiv.style.position = "relative";
    characterDiv.style.borderRadius = "10px";

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
    characterDiv.addEventListener("click", () => {
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
const searchInput = document.getElementById("search-input");

searchInput.style.color = "black";
searchInput.style.border = "1px solid #ccc";
searchInput.style.padding = "15px";

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCharacters = characterData.filter((character) =>
      character.name.toLowerCase().includes(searchTerm)
    );
    characterCard(filteredCharacters, filteredCharacters.length);
  }
});
