// Funksjon som sender favoritt til localstorage og poster til crudcrud når man trykker på hjertet
export const url = "https://crudcrud.com/api/3de91dcfb89a4d588274b226a6e52ac9/resource";
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
    return responseData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

// Funksjon som endrer
export const addCommentsCrud = async (character) => {
  try {
    const body = { ...character };
    delete body._id;
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

// Funksjon som sletter
export const deleteFavouriteCrud = async (characterId) => {
  try {
    const response = await fetch(`${url}/${characterId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const characterCard = (character, favoriteList = []) => {
  let favorite = getFavorite(character, favoriteList);
  const image = character.images.icon;

  // Bestemmer farge basert på rarity
  let backgroundColor;

  switch (character.rarity.value.toLowerCase()) {
    case "uncommon":
      backgroundColor = "rgba(0, 128, 0)";
      break;
    case "common":
      backgroundColor = "rgba(128, 128, 128)";
      break;
    case "rare":
      backgroundColor = "rgba(0, 0, 255)";
      break;
    case "epic":
      backgroundColor = "rgba(128, 0, 128)";
      break;
    case "legendary":
      backgroundColor = "rgba(255, 165, 0)";
      break;
    case "mythic":
      backgroundColor = "rgba(255, 223, 0)"; // Mythic: yellow with the same opacity
      break;
    case "exotic":
      backgroundColor = "rgba(64, 224, 208)"; // Exotic: turquoise with the same opacity
      break;
    default:
      backgroundColor = "rgba(0, 0, 0)"; // Default: black with the same opacity
  }

  // Karakter div
  const characterDiv = document.createElement("div");
  characterDiv.classList.add("character");
  characterDiv.style.cssText = `
    background-color: ${backgroundColor};
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    filter: brightness(0.5);
  `;

  characterDiv.addEventListener("mouseenter", () => {
    characterDiv.style.filter = "brightness(1)";
  });

  characterDiv.addEventListener("mouseleave", () => {
    characterDiv.style.filter = "brightness(0.5)";
  });

  // Karakter text
  const nameElement = document.createElement("p");
  nameElement.textContent = `${character.name}`;
  nameElement.style.cssText = `
    font-size: 36px;
    position: absolute;
    bottom: 0;
    margin: 60px 10px;
    z-index: 1;
  `;

  // Karakterbilde
  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = character.name;
  imageElement.style.cssText = `
    width: 300px;
    height: 400px;
    object-fit: cover;
    z-index: 1;
  `;

  const currentPage = window.location.href;
  const isFrontPage = currentPage.includes("index.html");

// Hjerteikon
  let icon = document.createElement("i");
  if (isFrontPage) {
    icon.style.cssText = `
      color: ${favorite ? "#9f32ac" : "white"};
      font-size: 36px;
      opacity: 100%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
      margin: 20px;
    `;
    icon.classList.add("fa", "fa-heart", "heartIcon");
  } else {
    icon.style.cssText = `
      color: white;
      font-size: 36px;
      opacity: 100%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
      margin: 20px;
    `;
    icon.classList.add("fa", "fa-solid", "fa-trash");
  }

  // Hjerteikon filter
  icon.addEventListener("mouseenter", () => {
    icon.style.filter = "brightness(1)";
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.filter = "brightness(0.5)";
  });

  icon.addEventListener("click", async () => {
    if (!favorite) {
      favorite = await addFavouriteCrud(character);
      changeHeartColor(true);
      showNotification("Added to favourites!");
    } else {
      await deleteFavouriteCrud(favorite._id);
      if (!isFrontPage) {
        await showFavorites();
      }
      changeHeartColor(false);
      showNotification("Removed from favourites!");
    }
  });

  // Funksjon for å endre farge på hjerteikonet
  const changeHeartColor = (favorite) => {
    icon.style.color = favorite ? "#9f32ac" : "white";
  };

  // Kalle funksjonen navigateToInfoPage ved klikk på karakter kortet
  imageElement.addEventListener("click", () => {
    navigateToInfoPage(character.id);
  });

  // Notifikasjon 
  const notification = document.createElement("p");
  notification.classList.add("notification");
  notification.style.cssText = `
    position: absolute;
    top: 0;
    color: white;
    font-size: 1.5em;
    background-color: black;
    display: none;
    width: 100%;
    height: 100%;
  `;

  // Notifikasjon melding
  const showNotification = (message) => {
    notification.textContent = message;
    notification.style.cssText = display = "flex";
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

  // Legger til kommentarfelt edit/delete knapp i characterCard i favoritt siden
  if (character._id) {
    const add = document.createElement("textarea");
    add.style.backgroundColor = "transparent";
    add.style.border = "none";
    add.style.outline = "none";
    add.style.resize = "none";
    add.placeholder = "Add a comment";

    // Lager en div kommentarfeltet blir lagt
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

// Navigerer til info.html med id til valgt karakter
const navigateToInfoPage = (id) => {
  window.location.href = `info.html?cosmeticID=${encodeURIComponent(id)}`;
};

// Funksjon for å sjekke om et element er i favoritter
const getFavorite = (data, favoriteList = []) => {
  if (data._id) {
    return data;
  }
  return favoriteList.find((item) => item.id === data.id);
};

export const showFavorites = async () => {
  const favoriteListDiv = document.getElementById("favoriteList");
  const response = await fetch(`${url}`, {});

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
  return favoriteList;
};
