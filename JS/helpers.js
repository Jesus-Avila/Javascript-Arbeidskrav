//funksjon som sender favoritt til localstorage og poster til crudcrud når man trykker på hjertet
const url = "https://crudcrud.com/api/2f342e16b33a4addbdea72e80bf1ffb0/resource";
export const addFavouriteCrud = async (character) => {
  let favoriteList = JSON.parse(localStorage.getItem("favorittList")) || [];
  favoriteList.push(character);
  localStorage.setItem("favorittList", JSON.stringify(favoriteList));
  try {
    const response = await fetch(url, {
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

//funksjon som endrer
export const addCommentsCrud = async (character) => {
  try {
    const body = {...character}
    delete body._id
    const response = await fetch(`${url}/${character._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
 
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
 
    const responseData = await response.json();
    console.log("Updated on CRUD API", responseData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

//Funksjon som sletter
export const deleteFavouriteCrud = async (characterId) => {
  try {
    const response = await fetch (`${url}/${characterId}`, {
      method: "DELETE",
    });
 
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
};


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
    case "mythic":
        backgroundColor = "rgba(255, 223, 0, 0.5)";  // Mythic: yellow with the same opacity
        break;
    case "exotic":
        backgroundColor = "rgba(64, 224, 208, 0.5)";  // Exotic: turquoise with the same opacity
        break;
    default:
        backgroundColor = "rgba(0, 0, 0, 0.5)";  // Default: black with the same opacity
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
  nameElement.style.margin = "60px 10px";
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
      changeHeartColor(true);
      showNotification("Added to favourites!");
    } else {
      await deleteFavouriteCrud(character._id)
      //removeFavorite(character);
      await showFavorites();
      changeHeartColor(false);
      showNotification("Removed from favourites!");
    }
  });
 
  // Funkson for å endre farge på hjerteikonet
  const changeHeartColor = (isFavorite) => {
    icon.style.color = isFavorite ? "#9f32ac" : "white";
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
 
//legger til kommentarfelt edit/delete knapp i characterCard i favoritt siden
if (character._id) {
  const add = document.createElement("textarea");
  add.style.backgroundColor = "transparent";
  add.style.border = "none";
  add.style.outline = "none";
  add.style.resize = "none";
  add.placeholder = "Add a comment";

  //lager en div kommentarfeltet blir lagt
  const commentDiv = document.createElement("div");
  commentDiv.style.cssText = `
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  if (character.comments) {
    add.value = character.comments;
  }

  // Oppdaterer visning av clearButton basert på om textarea har innhold eller ikke
  const updateClearButtonVisibility = () => {
    clearButton.style.display = add.value ? "block" : "none";
  };

  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear";
  clearButton.style.cssText = `
    background-color: #808080;
    color: white; 
    border: 1px solid #707070;
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 12px; 
    cursor: pointer; 
    margin: 5px; 
    display: none; 
  `;
  clearButton.addEventListener("click", async () => {
    await addCommentsCrud({ ...character, comments: "" });
    add.value = ""; // Tømmer textarea
    updateClearButtonVisibility(); // Oppdaterer visningen av clearButton
  });

  // Implementerer en debounce-funksjon for å lagre kommentarer automatisk etter brukerinput
  let debounceTimer;
  const debounceSave = (callback, delay = 1000) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
  };

  add.addEventListener("input", () => {
    debounceSave(async () => {
      await addCommentsCrud({ ...character, comments: add.value });
      updateClearButtonVisibility(); // Oppdaterer clearButton basert på ny tekst
    });
    updateClearButtonVisibility(); // Umiddelbar visuell feedback
  });

  // Initial visningslogikk for clearButton
  updateClearButtonVisibility();

  commentDiv.appendChild(add);
  commentDiv.appendChild(clearButton);
  characterDiv.appendChild(commentDiv);
}

  return characterDiv;
};
 

 
//Navigerer til info.html med id til valgt karakter
const navigateToInfoPage = (id) => {
  window.location.href = `info.html?cosmeticID=${encodeURIComponent(id)}`;
};
 
// Funksjon for å sjekke om et element er i favoritter
const checkIfFavorite = (data) => {//må sjekkes opp
  return data._id;
};
 
export const showFavorites = async () => {
  const favoriteListDiv = document.getElementById("favoriteList");
  const response = await fetch (`${url}`, {
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