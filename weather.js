let geocodeAndGetWeather = function(address) {
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      $("#location").html(results[0].formatted_address);
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      $.ajax({
        type: 'GET',
        url: 'https://api.darksky.net/forecast/52dd0a0afe6b85172771658ff9fb4b3a/' + lat + ',' + lng + '?callback=?',
        dataType: 'jsonp',
        contentType: "application/json",
        success: triggerWeatherClicked
      });
    }
  });
}

window.onload = function() {
  document.getElementById("get-the-weather").addEventListener("click", function(event) {
    event.preventDefault();
    let locationName = document.getElementById("location-name").value;
    geocodeAndGetWeather(locationName);
  });
}


let triggerWeatherClicked = function(response) {
  console.log(response);

    $(".forecast").hide();

  for(let i=0; i<=5; i++) {
    document.getElementById("forecast" + i + "-icon").innerHTML = icon(response.daily.data[i]);
    document.getElementById("forecast" + i + "-temp").innerHTML = "H:" + Math.round(response.daily.data[i].temperatureHigh) + " | L: " + Math.round(response.daily.data[i].temperatureLow);
    document.getElementById("forecast" + i + "-text").innerHTML = response.daily.data[i].summary;

    $(".forecast").fadeIn(3500);


  }
}

let icon = function(dataPoint) {
  switch(dataPoint.icon) {
    case "clear-day":
    case "clear-night":
      return "<i class='fa fa-sun-o'></i>";
      break;
    case "rain":
      return "<i class='fa fa-tint'></i>";
      break;
    case "wind":
      return "<i class='fa fa-bars'></i>";
      break;
    case "snow":
    case "sleet":
      return "<i class='fa fa-snowflake-o></i>";
      break;
    case "cloudy":
    case "fog":
    case "partly-cloudy-day":
    case "partly-cloudy-night":
      return "<i class='fa fa-cloud'></i>";
      break;
  }
}
