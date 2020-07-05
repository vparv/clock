function moveHands() {
  with (new Date()) {
    h = 30 * ((getHours() % 12) + getMinutes() / 60); // 30 degrees hour
    m = 6 * getMinutes(); // 6 degrees every minute
    s = 6 * getSeconds(); // 6 degrees every second
    // setting the rotate CSS attribute to those degree values -->
    document.getElementById("seconds").style.cssText =
      "-webkit-transform:rotate(" + s + "deg);";
    document.getElementById("minutes").style.cssText =
      "-webkit-transform:rotate(" + m + "deg);";
    document.getElementById("hours").style.cssText =
      "-webkit-transform:rotate(" + h + "deg);";
     
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();
   
    setTimeout(moveHands, 1000); // calling the function every second
  
  }
}

document.body.onkeyup = function(e) {
  if (e.keyCode == 13)
  {
    newItem();
  }    
};

function newItem() {
  var item = document.getElementById("input").value;
  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("- " + item));
  ul.appendChild(li);
  document.getElementById("input").value = "";
}

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "f146799a557e8ab658304c1b30cc3cfd";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° F";
        location.innerHTML =
          data.name + " (" + latitude + "°, " + longitude + "°)";
        description.innerHTML = data.weather[0].main;
      });
  
    }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

moveHands();

window.onload = getWeather(); // making sure the function starts on load of webpage