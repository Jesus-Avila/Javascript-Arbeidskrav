//Funksjon som poster/sender data fra input-field review og reviewField til crudcrud API
const urlPost = "https://crudcrud.com/api/2f342e16b33a4addbdea72e80bf1ffb0/resource";
const fetchDataPost = async () => {
  try {
    const input = document.getElementById("review");
    const inputText = input.value;
    const inputField = document.getElementById("reviewField");
    const inputFieldValue = inputField.value;

    const postData = {
      input: inputText,
      inputField: inputFieldValue,
    };

    const response = await fetch(urlPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

//Funksjon som endrer på dataen 
const urlPut = "https://crudcrud.com/api/2f342e16b33a4addbdea72e80bf1ffb0/resource/<id>"; // Update the URL with the resource ID

const fetchDataPut = async () => {
  try {
    const input = document.getElementById("review");
    const inputText = input.value;
    const inputField = document.getElementById("reviewField");
    const inputFieldValue = inputField.value;

    const putData = {
      input: inputText,
      inputField: inputFieldValue,
    };

    const response = await fetch(`${urlPut}/${resourceId}`, {
      // Update the URL to include the resource ID
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

/*document.getElementById("editBtn").addEventListener("click", () => {
  fetchDataPut();
});*/

// Kall fetchDataPost-funksjonen for å sende POST-requesten og createList. PreventDefault for at siden ikke skal refreshe. 
document.getElementById("submitBtn").addEventListener("click", () => {
  event.preventDefault();
  fetchDataPost();
  createList();
});

//Lager inputfeltene på favorittisden og eventlistener for knappen som hener input.value. Kaller på funksjonen fetchDataPost
const createList = () => {
  const list = document.getElementById("list");
  const listItem = document.createElement("li");
  const listText = document.createElement("p");
  const input = document.getElementById("review");
  const inputField = document.getElementById("reviewField");
  listItem.innerHTML = input.value;
  listText.innerHTML = `${inputField.value} <button>Edit</button><button>Delete</>`;
  list.appendChild(listItem);
  listItem.appendChild(listText);
};
