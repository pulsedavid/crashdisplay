$(document).ready(function() {

  var currentWeather;


  htmlstring = "";
  $.ajax({
    url: 'http://api.wunderground.com/api/cec98b78b65111a9/forecast/q/44.1451,-73.4182.json',
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
    url: 'http://api.wunderground.com/api/cec98b78b65111a9/conditions/q/44.1451,-73.4182.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      htmlstring += '<tr><th colspan=3>Right Now: '+data.current_observation.weather+'. Temp: '+data.current_observation.temperature_string+', Feels like '+data.current_observation.feelslike_string+', Wind: '+data.current_observation.wind_string+'</th></tr>';
    }
  });
  htmlstring += '</table>';
  $('#weather').html(htmlstring);

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'api-key': "17b0b5541c312e95c8374c7489af610f:10:73191170"
  });
  $.ajax({
    url: url,
    method: 'GET',
    async:false,
  }).done(function(result) {
    htmlstring = "<table style='color:white;font-size:2.2vh'>";
    for (var i = 0; i < Math.min(result.response.docs.length,4); i++) {
      htmlstring+="<tr><td>"+result.response.docs[i].headline.main+": "+result.response.docs[i].snippet+"</td></tr>";
    }
    htmlstring+= "</table>";
    $('#news').html(htmlstring);
  }).fail(function(err) {
    throw err;
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

    if(now.getMinutes()%10 == 0 && now.getSeconds() == 0) {
      location.reload();
    }
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
  }
  setTimeout(function () {
    updateClock();
  },1000);

  document.getElementById('background').style.backgroundImage='url(http://jonathandamico.me/dudleydisplay/images/'+(new String(parseInt(Math.random()*8)+1))+'.jpg)';
});
