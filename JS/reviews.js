const url = "https://crudcrud.com/api/2f342e16b33a4addbdea72e80bf1ffb0/resource";

const fetchData = async () => {
  try {
    const input = document.getElementById("review");
    const inputText = input.value;
    const inputField = document.getElementById("reviewField");
    const inputFieldValue = inputField.value;

    const postData = {
      input: inputText,
      inputField: inputFieldValue,
    };

    const response = await fetch(url, {
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

// Kall fetchData-funksjonen for å sende POST-requesten
document.getElementById("submitBtn").addEventListener("click", () => {
  event.preventDefault();
  fetchData();
  createList();
});

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
