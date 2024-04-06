baseUrl = "https://api.disneyapi.dev/character";

var container = document.getElementById('container-name');

const info = async function fetchData() {
    try {
        const response = await fetch(baseUrl + '/4703')
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('clean data', data);
            console.log('id of character', data.data[1]._id);
            container.innerHTML = data.data[1].name;

            // Create a new <pre> element
            const pre = document.createElement('pre');
            // Sets its content
            pre.innerText = JSON.stringify(data, null, 2);
            // Appends it to the container
            container.appendChild(pre);
            
            return data;
        } 
            catch(error) {
            console.error('There was a problem with the fetch operation:', error);
        };
}
fetchData();





// var infoContainer = document.getElementById('info-container');

