export const characterCard = (character) => {
  const image = character.images.icon;

  // bestemmer farge basert på rarity
  let backgroundColor;

  switch (character.rarity.value.toLowerCase()) {
    case "uncommon":
      backgroundColor = "rgba(0, 128, 0, 0.5)";
      break;
    case "common":
      backgroundColor = "rgba(128, 128, 128, 0.5)";
      break;
    case "rare":
      backgroundColor = "rgba(0, 0, 255, 0.5)";
      break;
    case "epic":
      backgroundColor = "rgba(128, 0, 128, 0.5)";
      break;
    case "legendary":
      backgroundColor = "rgba(255, 165, 0, 0.5)";
      break;
    default:
      backgroundColor = "rgba(64, 224, 208, 0.5)";
  }

  //Karakter div
  const characterDiv = document.createElement("div");
  characterDiv.classList.add("character");
  characterDiv.style.backgroundColor = backgroundColor;
  characterDiv.style.position = "relative";
  characterDiv.style.borderRadius = "10px";
  characterDiv.style.cursor = "pointer";
  characterDiv.style.filter = "brightness(0.5)";
  characterDiv.addEventListener("mouseenter", () => {
    characterDiv.style.filter = "brightness(1)";
  });
  characterDiv.addEventListener("mouseleave", () => {
    characterDiv.style.filter = "brightness(0.5)";
  });

  //Karakter text
  const nameElement = document.createElement("p");
  nameElement.textContent = `${character.name}`;
  nameElement.style.fontSize = "36px";
  nameElement.style.position = "absolute";
  nameElement.style.bottom = "0";
  nameElement.style.margin = "20px";
  nameElement.style.zIndex = "1";

  //Karakterbilde
  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = character.name;
  imageElement.style.width = "300px";
  imageElement.style.height = "400px";
  imageElement.style.objectFit = "cover";
  imageElement.style.zIndex = "1";
  const currentPage = window.location.href;
  const pageName = currentPage.substring(currentPage.lastIndexOf("/") + 1);
  let icon = document.createElement("i");
  if (currentPage.includes("index.html")) {
    icon.classList.add("fa", "fa-heart", "heartIcon");
  } else {
    icon.classList.add("fa", "fa-solid", "fa-trash");
  }
  icon.style.fontSize = "36px";
  icon.style.opacity = "100%";
  icon.style.position = "absolute";
  icon.style.top = "0";
  icon.style.right = "0";
  icon.style.zIndex = "999";
  icon.style.margin = "20px";
  icon.style.color = checkIfFavorite(character) ? "#9f32ac" : "white";
  icon.addEventListener("mouseenter", () => {
    icon.style.filter = "brightness(1)";
  });
  icon.addEventListener("mouseleave", () => {
    icon.style.filter = "brightness(0.5)";
  });

  icon.addEventListener("click", async () => {
    
    if (!checkIfFavorite(character)) {
      await addFavouriteCrud(character);
      changeHeartColor(character);
      showNotification("Added to favourites!");
    } else {
      await deleteFavouriteCrud(character._id)
      //removeFavorite(character);
      await showFavorites();
      changeHeartColor(character);
      showNotification("Removed from favourites!");
    }
  });

  // Funkson for å endre farge på hjerteikonet
  const changeHeartColor = (data) => {
    console.log("changeHeartColor:", data);
    checkIfFavorite(data) ? (icon.style.color = "#9f32ac") : (icon.style.color = "white");
  };

  //Kalle funksjonen navigateToInfoPage ved klikk på karakter kortet
  imageElement.addEventListener("click", () => {
    navigateToInfoPage(character.id);
  });

  //Notifikasjon
  const notification = document.createElement("p");
  notification.classList.add("notification");
  notification.style.position = "absolute";
  notification.style.top = "0";
  notification.style.color = "white";
  notification.style.fontSize = "1.5em";
  notification.style.backgroundColor = "black";
  notification.style.display = "none";
  notification.style.width = "100%";
  notification.style.height = "100%";

  const showNotification = (message) => {
    notification.textContent = message;
    notification.style.display = "flex";
    notification.style.justifyContent = "center";
    notification.style.alignItems = "center";
    notification.style.transition = "0.3s";
    setTimeout(() => {
      notification.style.display = "none";
    }, 1000); // Skjuler meldingen etter 1 sekund
  };

  characterDiv.appendChild(nameElement);
  characterDiv.appendChild(imageElement);
  characterDiv.appendChild(icon);
  characterDiv.appendChild(notification);

  return characterDiv;
};

//funksjon som sender favoritt til localstorage og poster til crudcrud når man trykker på hjertet
const urlPost = "https://crudcrud.com/api/2f342e16b33a4addbdea72e80bf1ffb0/resource";
export const addFavouriteCrud = async (character) => {
  let favoriteList = JSON.parse(localStorage.getItem("favorittList")) || [];
  favoriteList.push(character);
  localStorage.setItem("favorittList", JSON.stringify(favoriteList));
  try {
    const response = await fetch(urlPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Added to CRUD API", responseData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

//Funksjon som sletter 
const urlDelete = "https://crudcrud.com/api/2f342e16b33a4addbdea72e80bf1ffb0/resource";
export const deleteFavouriteCrud = async (characterId) => {
  try {
    const response = await fetch (`${urlDelete}/${characterId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
};

//Navigerer til info.html med id til valgt karakter
const navigateToInfoPage = (id) => {
  window.location.href = `info.html?cosmeticID=${encodeURIComponent(id)}`;
};

// Funksjon for å sjekke om et element er i favoritter
const checkIfFavorite = (data) => {
  return data._id;
};

export const showFavorites = async () => {
  const favoriteListDiv = document.getElementById("favoriteList");
  const response = await fetch (`${urlDelete}`, {
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const favoriteList = await response.json();
  
  if (favoriteList.length === 0) {
    favoriteListDiv.textContent = "You haven't added any favorites yet.";
  } else {
    favoriteListDiv.innerHTML = "";
    favoriteList.forEach((character) => {
      const characterDiv = characterCard(character);
      favoriteListDiv.appendChild(characterDiv);
    });
  }
  return favoriteList
};
