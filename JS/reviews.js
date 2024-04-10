const url = "https://crudapi.co.uk/api/v1/probe";
const token = "WACSi_XkRx3SKxyb9MJN88P9ALPwqzRD4zwzeI-M7z9_xmgS8Q";

const options = {
  method: `GET`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const fetchData = async() => {
await fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // eller response.text() avhengig av responsen
  })
  .then((data) => {
    console.log("Response data:", data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
}

fetchData()