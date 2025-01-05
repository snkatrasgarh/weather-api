// JavaScript
let weather = {
    "apikey": "c83a00a0e97d817f5c832504db83af6e",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apikey)
            .then(response => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").setAttribute("src",
            "http://openweathermap.org/img/wn/" + icon + ".png");
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "m/s";
        document.querySelector(".weather").classList.remove("loading");
        this.fetchBackgroundImage(name);
    },
    fetchBackgroundImage: function (city) {
        const unsplashAccessKey = "JBJRvFEkWG8CauVP5V67UkrnUa_a1VBNeL4RCCcVHaI"; // Replace with your Unsplash access key
        fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashAccessKey}`)
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.urls.regular;
                document.body.style.backgroundImage = `url('${imageUrl}')`;
            })
            .catch(() => {
                // Fallback to a default background if there's an error
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape')";
            });
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

// Fetch initial weather for a default city
weather.fetchWeather("Kolkata");