$(document).ready(function() {

  var currentWeather;

  $.ajax({
    url: 'http://api.wunderground.com/api/e78d2ccf0a39822b/conditions/q/CA/Studio_City.json',
    dataType: 'json',
    success: function(data) {
      currentWeather=data.current_observation.temp_f + String.fromCharCode(parseInt('00B0', 16)) + 'F';
    }
  });
  $.ajax({
    url: 'http://api.wunderground.com/api/cec98b78b65111a9/forecast/q/zmw:12993.1.99999.json',
    dataType: 'json',
    success: function(data) {
      htmlstring = '<table>';
      for (var i = 0; i < data.forecast.txt_forecast.forecastday.length; i++) {
        htmlstring += '<tr><td>'+data.forecast.txt_forecast.forecastday[i].title+'</td>';
        htmlstring += '<td>'+data.forecast.txt_forecast.forecastday[i].fcttext+'</td>';
        htmlstring += '<td>'+data.forecast.txt_forecast.forecastday[i].pop+'% precip</td></tr>';
      }
      htmlstring += '</table>';
    }
  });

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
