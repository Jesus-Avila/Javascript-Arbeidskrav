const fetchData = () => {
  fetch("https://fortnite-api.com/v2/cosmetics/br/new")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      const data = responseData.data.items;
      characterCard(data, 10);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

fetchData();

const characterCard = (data, numberOfCharacters) => {
  const characterListDiv = document.getElementById("characterContainer");
  characterListDiv.innerHTML = ""; // Clear previous content

  for (let i = 0; i < numberOfCharacters; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const character = data[randomIndex];

    const image = character.images.icon;

    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");

    const nameElement = document.createElement("p");
    nameElement.textContent = `${character.name}`;
    nameElement.style.fontSize = "40px";

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = character.name;

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart", "heartIcon");
    heartIcon.style.fontSize = "36px";
    heartIcon.style.opacity = "50%";
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
