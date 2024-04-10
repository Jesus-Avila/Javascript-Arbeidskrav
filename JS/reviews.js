

/*/Funksjon som endrer på dataen 
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

document.getElementById("editBtn").addEventListener("click", () => {
  fetchDataPut();
});*/

