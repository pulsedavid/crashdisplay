$(document).ready(function() {

  var currentWeather;


  htmlstring = "";
  $.ajax({
    url: 'http://api.wunderground.com/api/cec98b78b65111a9/forecast/q/zmw:12993.1.99999.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      htmlstring = '<table id=weathertable>';
      for (var i = 0; i < Math.min(data.forecast.txt_forecast.forecastday.length,4); i++) {
        htmlstring += '<tr><td>'+data.forecast.txt_forecast.forecastday[i].title+'</td>';
        htmlstring += '<td>'+data.forecast.txt_forecast.forecastday[i].fcttext+'</td>';
        htmlstring += '<td>Precip: '+data.forecast.txt_forecast.forecastday[i].pop+'%</td></tr>';
      }

    }
  });
  $.ajax({
    url: 'http://api.wunderground.com/api/cec98b78b65111a9/conditions/q/zmw:12993.1.99999.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      htmlstring += '<tr><th colspan=3>Right Now: '+data.current_observation.weather+'. Feels like '+data.current_observation.feelslike_string+', Wind: '+data.current_observation.wind_string+' '+data.current_observation.wind_dir+' at '+data.current_observation.wind_mph+' MPH</th></tr>';
    }
  });
  htmlstring += '</table>';
  $('#weather').html(htmlstring);

  var myDate = new Date();

  if (myDate.getHours() < 12) {
      $('#title').append("Good Morning, ");
  } else if (myDate.getHours() >= 12 && myDate.getHours() <= 17) {
      $('#title').append("Good Afternoon, ");
  } else if (myDate.getHours() > 17 && myDate.getHours() <= 24) {
      $('#title').append("Good Evening, ");
  } else /* the hour is not between 0 and 24, so something is wrong */ {
      $('#title').append("Hello, ");
  }
  $('#title').append("Camp Dudley!");

  function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // you get the idea
        weeks = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        time = ((now.getHours()%12==0)?12:now.getHours()%12) + ':' + (now.getMinutes()<10?0:'') + now.getMinutes() + ':' + (now.getSeconds()<10?0:'') + now.getSeconds(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [weeks[now.getDay()]+',', months[now.getMonth()], now.getDate()].join(' ');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = time;
    document.getElementById('date').innerHTML = date;

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
  }
  updateClock(); // initial call
});
