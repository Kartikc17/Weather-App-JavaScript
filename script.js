const stopbutton = document.getElementById("stop-button")

function showTime() {
    const currentTime = new Date()
    const time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
    document.getElementById("time").innerText = time;

}

let interval = setInterval(showTime, 1000);
 
stopbutton.addEventListener('click', () => {
    clearInterval(interval);
})


const button = document.getElementById("search-button")
const input = document.getElementById("city-input")
const cityName = document.getElementById("city-name")
const cityTime = document.getElementById("city-time")
const cityTemp = document.getElementById("city-temp")

async function getData(cityName) {
    const Promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=20c4c6c3065d4ecbbde44844250108&q=${cityName}&aqi=yes`
    );
    return await Promise.json()
}


button.addEventListener("click", async () => {
    const value = input.value;
    const result = await getData(value);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
    cityTime.innerText = result.location.localtime
    cityTemp.innerText = result.current.temp_c + " ºC"
})



const userbutton = document.getElementById("get-location-button")
const UcityName = document.getElementById("Ucity-name")
const UcityTime = document.getElementById("Ucity-time")
const UcityTemp = document.getElementById("Ucity-temp")

async function getUserData(lat, long) {
    const Promise1 = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=20c4c6c3065d4ecbbde44844250108&q=${lat},${long}&aqi=yes`
    );
    return await Promise1.json()
}

async function gotLocation(position) {
   const res = await getUserData(position.coords.latitude, position.coords.longitude)
   UcityName.innerText = `${res.location.name}, ${res.location.region} - ${res.location.country}`
    UcityTime.innerText = res.location.localtime
    UcityTemp.innerText = res.current.temp_c + " ºC"
}

function failedToGet() {
    console.log("There was some issue")
}

userbutton.addEventListener('click', async () => {
 navigator.geolocation.getCurrentPosition(gotLocation, failedToGet)
})

