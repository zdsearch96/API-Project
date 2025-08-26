document.addEventListener('DOMContentLoaded', () => {

const singleDogButton = document.getElementById('single-dog-button');
const singleDogContainer = document.getElementById('single-dog-container');

const singleCatButton = document.getElementById('single-cat-button');
const singleCatContainer = document.getElementById('single-cat-container');

const weatherContainer = document.getElementById('weather');

const exchangeRateContainer = document.getElementById('exchange-rate');

const moviesContainer = document.getElementById('movies');

const githubUserContainer = document.getElementById('github-user');

const randomJokeButton = document.getElementById('random-joke-button');
const randomJokeContainer = document.getElementById('random-joke');

const holidaysContainer = document.getElementById('holidays');

async function getSingleDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    singleDogContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = data.message;
    singleDogContainer.appendChild(img);
    }

async function getSingleCatImage() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    singleCatContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = data[0].url;
    singleCatContainer.appendChild(img);
}

async function getWeather() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1');
    const data = await response.json();
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <h3>Current Weather In London, England</h3> 
        <p>Temperature: ${(data.current.temperature_2m)} °F</p>
        <p>Humidity: ${data.current.relative_humidity_2m} %</p>
        <p>Apparent Temperature: ${(data.current.apparent_temperature)} °F</p>
        <p>Wind Speed: ${data.current.wind_speed_10m} mph</p>
        <p>Precipitation: ${data.current.precipitation} inches</p>
    `;
}
getWeather();

async function getExchangeRate() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/c1c2a2559712a0946d84b9fe/latest/USD`);
    const data = await response.json();
    const exchangeRateContainer = document.getElementById('exchange-rate');
    exchangeRateContainer.innerHTML = `
        <h3>Exchange Rate (USD to EUR)</h3>
        <p>1 USD = ${data.conversion_rates.EUR} EUR</p>
    `;
}
getExchangeRate();

async function getMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=71eb7dd0443b97a21a34fe09dbfbd1e8`);
    const data = await response.json();
    moviesContainer.innerHTML = `
        <h3>Trending Movies</h3>
        <p>${data.results.map(movie => `${movie.title} (${movie.release_date})`).join(', ')}</p>
    `; 
}
getMovies();

async function getGitHubUser() {
    const response = await fetch(`https://api.github.com/users/zdsearch96`);
    const data = await response.json();
    githubUserContainer.innerHTML = `
        <h3>${data.login}</h3>
        <p>ID: ${data.id}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
    `;
}
getGitHubUser();

async function getRandomJoke() {
    const response = await fetch(`https://v2.jokeapi.dev/joke/Programming`);
    const data = await response.json();
    randomJokeContainer.innerHTML = `
        <h3>${data.joke}</h3>
    `;
}

async function getPublicHolidays() {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/2025/CH`);
    const data = await response.json();
    holidaysContainer.innerHTML = `
        <h3>Public Holidays in Switzerland (2025)</h3>
        <ul>
            ${data.map(holiday => `<li>${holiday.date}: ${holiday.localName}</li>`).join('')}
        </ul>
    `;
}
getPublicHolidays();

singleDogButton.addEventListener('click', getSingleDogImage);
singleCatButton.addEventListener('click', getSingleCatImage);
randomJokeButton.addEventListener('click', getRandomJoke);
})