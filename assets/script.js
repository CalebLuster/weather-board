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
    let c
    let e  
    let API = "42cb9855fdf16bb6fae9c33abb5ae0c3";
    let DefNotAPI = "42cb9855fdf16bb8fae9c33abb5ae0c3";
    let tempature = document.getElementById("temp");
    let UVIndex = document.getElementById("UV");
    let wind = document.getElementById("Wind");
    let humidity = document.getElementById("Humidity");
    
    function cityWeather (cityName) {
        let URL = "https://openweathermap.org/" + cityName + "&appid=" + DefNotAPI;
        axios.get(URL)
            .then(function (response) {
                weatherNow.classList.remove ("d-none");
                let date = new Date(response.data.dt * 1000);
                let day = date.getDate();
                let months = date.getMonth() + 1;
                let year = date.getFullYear();
                let nwImg = response.data.weather[0].icon;

                cityName.innerHTML = response.data.name + " (" + months + "/" + day + "/" + year + ") ";


                tempature.innerHTML = "Temp: " + k2f(response.data.main.temp);
                wind.innerHTML = "wind MPH: " + response.data.wind.speed + " MPH ";
                humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                todayImage.setAttribute("src", "https://openweathermap.org/img/wn" + weatherPic + "@2x.png");
                todayImage.setAttribute("alt", response.data.weather[0].description);
                let longitude = response.data.coord.lon;
                let latitude = response.data.coord.lat;
                let UVURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + DefNotAPI + "&cnt=1";
                axios.get(UVURL)
                    .then(function (response) {
                        let UVindex = document.createElement("span");
                        
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
                        UVIndex.append(UVindex)
                    });
            })







    }








































}