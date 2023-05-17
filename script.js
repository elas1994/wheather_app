

const apiKey = '7d5997b5129bfa5ece44383f8f9622b1'

const formElement = document.querySelector(".input-form")
const cityInput = document.querySelector("#city-input")
const weatherData = document.querySelector('.weather-data')

formElement.addEventListener('submit' , (event) =>{
  event.preventDefault() 
  const cityValue = cityInput.value;

  getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
  
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
    
    if(!response.ok){
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const iconValue = data.weather[0].icon

    const feelsLike = Math.round(data.main.feels_like)
    const humidity = data.main.humidity
    const windSpeed = data.wind.speed

    
    weatherData.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue}.png" alt="weather icon">`

    weatherData.querySelector('.temperature').innerHTML = `${temperature}°C`

    weatherData.querySelector('.description').innerHTML = `${description}`

    const details = [
      `Feels like: ${feelsLike}°C` ,
      `Humidity: ${humidity}%` ,
      `Wind speed: ${windSpeed}m/s` ,
    ]

    weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join('')


  } catch (error) {
    weatherData.querySelector('.icon').innerHTML = ""
    weatherData.querySelector('.temperature').textContent = ""
    weatherData.querySelector('.description').textContent = "An Error happened, pleas try again."

    weatherData.querySelector(".details").innerHTML = ""
  }
}