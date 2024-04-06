baseUrl = "https://api.disneyapi.dev/character";

var container = document.getElementById('container-name');

async function fetchData() {
    try {
        const response = await fetch(baseUrl + '?name=Mickey%20Mouse')
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('clean data', data);
            console.log('filtered data', data.data[1].name);
            console.log('filtered data', data.data[1].films);
            container.innerHTML = data.data[1].name;

        } 
            catch(error) {
            console.error('There was a problem with the fetch operation:', error);
        };
}

fetchData();

// var infoContainer = document.getElementById('info-container');

