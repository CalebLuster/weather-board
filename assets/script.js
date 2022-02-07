function loadPage () {
    let forecastTitle = document.getElementById("forecast-title");
    let searchedCites = document.getElementById("searchedcities");
    let weatherNow = document.getElementById("weather-now");
    let cityButton = document.getElementById("cityBtn");
    let cityName = document.getElementById("cityname");
    let City = document.getElementById("city");
    let todayImage = document.getElementById("todayImg");
    let clearButton = document.getElementById("clearBtn");
    let citiesList = JSON.parse(localStorage.getItem("cities")) || [];
    const DefNotAPI = "1eafbc79bda58d65db48fb142ec8ed92"; 
    let tempature = document.getElementById("temp");
    let UVIndex = document.getElementById("UV");
    let wind = document.getElementById("Wind");
    let humidity = document.getElementById("Humidity");
    
    function cityWeather(City) {
        let URL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&appid=" + DefNotAPI;
        
        axios.get(URL)
            .then(function (response) {
                // console.log(response.data)
                weatherNow.classList.remove("d-none");
                let date = new Date(response.data.dt * 1000);
                let day = date.getDate();
                let months = date.getMonth() + 1;
                let year = date.getFullYear();
                let nwImg = response.data.weather[0].icon;
                

                cityName.innerHTML = response.data.name + " (" + months + "/" + day + "/" + year + ") ";


                tempature.innerHTML = "Temp: " + math(response.data.main.temp);
                wind.innerHTML = "wind MPH: " + response.data.wind.speed + " MPH ";
                humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                todayImage.setAttribute("src", "https://openweathermap.org/img/wn/" + nwImg + "@2x.png");
                todayImage.setAttribute("alt", response.data.weather[0].description);
                let longitude 
                let latitude 
                let UVURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + DefNotAPI + "&cnt=1";
                axios.get(UVURL)
                    .then(function (response) {
                        let UVindex = document.createElement("span");
                        
                         longitude = response.data.coord.longitude;
                         latitude = response.data.coord.lat;

                        if (response.data[0].value < 4 ) {
                            UVindex.setAttribute("class", "badge-sucess badge");
                        }
                        else if (response.data[0].value < 8 ) {
                            UVindex.setAttribute("class", "badge-warning badge");
                        }
                        else {
                            UVindex.setAttribute("class", "badge-danger badge");
                        }
                        UVindex.innerHTML = response.data[0].value;
                        UVIndex.innerHTML = "UV Index is: ";
                        UVIndex.append(UVindex);
                    });
                    let cityTitle = response.data.id;
                     longitude = response.data.coord.lon;
                    latitude = response.data.coord.lat;
                    let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + DefNotAPI + "&cnt=1";
                    axios.get(forecastURL)
                        .then(function (response) {
                        forecastTitle.classList.remove("d-none");
                        let futureWeather = document.querySelectorAll(".forecast");
                        for (i = 0; i < futureWeather.length; i++) {
                            futureWeather[i].innerHTML = "";
                            let futureUV = i * 8 + 4;
                            
                            let futureConstant = new Date(response.data.list[futureUV].dt * 1000);
                            let futureYear = forecastConstant.getFullYear();
                            let futureMonth = forecastConstant.getMonth(); + 1;
                            let futureDay = forecastConstant.getDate();
                            
                            let futureConsistent = document.createElement("p");
                                futureConsistent.setAttribute("class", "forecast-date mt-3 mb-0");
                                futureConsistent.innerHTML = futureMonth + "/" + futureDay + "/" + futureYear;
                                futureConstant[i].append(futureConsistent);
                            let futureWeatherVar = document.createElement("img");
                                futureWeatherVar.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[futureUV].weather[0].icon + "@2x.png");
                                futureWeatherVar.setAttribute("alt",);
                                futureWeather[i].append(futureWeatherVar);
                            let futureTempature = document.createElement("p");
                                futureTempature.innerHTML = "Tempature is: " + math(response.data.list[futureUV].main.temp) + " &#176F";
                                futureWeather[i].append(futureTempature);
                            let futureHumidity = document.createElement("p");
                                futureHumidity.innerHTML = "Humidity is: " + response.data.list[futureUV].main.humidity + "%";
                                futureWeather[i].append(futureHumidity);
                        }

                     })
                
            });

    }
    function math(C) {
        return Math.floor((C - 273.15) * 1.8 + 32);
    }
    clearButton.addEventListener("click", function () {
        citiesList = [];
        localStorage.clear();
        Loop();
    })
    cityButton.addEventListener("click", function () {
        let history = City.value
        cityWeather(history);
        citiesList.push(history);
        localStorage.setItem("search", JSON.stringify(citiesList));
        Loop();
    })
    function Loop () {
        searchedCites.innerHTML = "";
        for (let i = 0; i < citiesList.length; i++) {
            let citiesListVar = document.createElement("input");
                citiesListVar.setAttribute("type", "text");            
                citiesListVar.setAttribute("readonly", true);
                citiesListVar.setAttribute("class", "form-control bg-white d-block");
                citiesListVar.setAttribute("value", citiesList[i]);
                citiesListVar.setAttribute("click", function () {
                    cityWeather(citiesListVar.value);
                })
                searchedCites.append(citiesListVar);            
            }
    }

    Loop();
    if (citiesList.length > 0) {
        cityWeather(citiesList[citiesList.length - 1]);
    }


}
loadPage();