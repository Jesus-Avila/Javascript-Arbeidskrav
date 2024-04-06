const fetchData = () => {
    fetch("https://api.disneyapi.dev/character")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        const data = responseData.data;
        characterCard(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  
  const characterCard = (data) => {
    const characterListDiv = document.getElementById("characterContainer");
    data.forEach((character) => {
      const name = character.name;
      const image = character.imageUrl;
  
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");
  
      const nameElement = document.createElement("p");
      nameElement.textContent = `Name: ${name}`;
  
      const imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.alt = name;
  
      characterDiv.appendChild(nameElement);
      characterDiv.appendChild(imageElement);
  
      characterListDiv.appendChild(characterDiv);
    });
  };
  
  fetchData();