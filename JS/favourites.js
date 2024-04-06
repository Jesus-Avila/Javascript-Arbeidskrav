// Hent favoritter fra LocalStorage og vis dem på siden
const showFavorites = () => {
  const favoriteListDiv = document.getElementById("favoriteList");
  favoriteListDiv.innerHTML = "";

  const favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];
  if (favoriteList.length === 0) {
    favoriteListDiv.textContent = "You haven't added any favorites yet.";
  } else {
    favoriteList.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.textContent = `Name: ${character.name}`;
      favoriteListDiv.appendChild(characterDiv);
    });
  }
};

showFavorites();