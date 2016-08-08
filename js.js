$('#weatherRadar').onerror = function () {
  console.log("as;dfhasdiufasdf");
}

$(document).ready(function() {

  var currentWeather;
  var weatherHTML;
  var radarActive = false;

  $('#weatherRadar').attr('src', 'http://api.wunderground.com/api/e78d2ccf0a39822b/animatedradar/q/44.1451,-73.4182.gif?rainsnow=true&newmaps=1&noclutter=1&num=15&timelabel=1&timelabel.x=40&timelabel.y=40&width='+$('#weatherRadar').width()+'&height='+$('#weatherRadar').height()+'&delay=25&smooth=1>')

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
  weatherHTML = htmlstring;
  $('#weather').html(htmlstring);
  today = new Date();
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'api-key': "17b0b5541c312e95c8374c7489af610f:10:73191170",
    'begin_date': ""+today.getUTCFullYear()+(today.getMonth()<10?"0"+today.getMonth():today.getMonth())+(today.getDate()<10?"0"+today.getDate():today.getDate()),
    'sort': "newest"
  });
  $.ajax({
    url: url,
    method: 'GET',
    async:false,
    dataType: 'jsonp',
  }).done(function(result) {
    htmlstring = "<table style='color:white;font-size:2.2vh'>";
    for (var i = 0; i < Math.min(result.response.docs.length,4); i++) {
      htmlstring+="<tr><td>"+result.response.docs[i].headline.main+": "+result.response.docs[i].snippet+"</td></tr>";
    }
    htmlstring+= "</table>";
    news1 = htmlstring;
    htmlstring = "<table style='color:white;font-size:2.2vh'>";
    for (var i = Math.min(result.response.docs.length,4); i < Math.min(result.response.docs.length,8); i++) {
      htmlstring+="<tr><td>"+result.response.docs[i].headline.main+": "+result.response.docs[i].snippet+"</td></tr>";
    }
    htmlstring+= "</table>";
    news2 = htmlstring;
  }).fail(function(err) {
    throw err;
  });
  var myDate = new Date();
  if (myDate.getDay() == 0) {
    $('#title').append("Happy Sunday, ");
  } else if (myDate.getHours() < 12) {
      $('#title').append("Good Morning, ");
  } else if (myDate.getHours() >= 12 && myDate.getHours() <= 17) {
      $('#title').append("Good Afternoon, ");
  } else if (myDate.getHours() > 17 && myDate.getHours() <= 24) {
      $('#title').append("Good Evening, ");
  } else /* the hour is not between 0 and 24, so something is wrong */ {
      $('#title').append("Hello, ");
  }
  $('#title').append("Camp Dudley!");
  $('#title').addClass('animated fadeIn');

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
    $('#time').addClass('animated fadeIn');
    $('#date').addClass('animated fadeIn');

    if(time.indexOf("4:20")!=-1)
      document.getElementById('time').style.color='green';
    else
      document.getElementById('time').style.color='white';

    if(now.getMinutes()%10 == 0 && now.getSeconds() == 0) {
      location.reload();
    } else if(now.getSeconds()%10==0) {
      if(radarActive) {
        setTimeout(function(){
          $('#weatherRadar').attr('class', 'animated fadeOut');
          $('#weatherRadar').hide();
          $('#weather').attr('class', 'animated fadeIn');
        }, 1000);
        $('#news').attr('class', 'animated fadeOut');
        $('#news').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('#news').html(news1);
          $('#news').attr('class', 'animated fadeIn');
        });
        radarActive = false;
      } else {
        $('#weather').attr('class', 'animated fadeOut');
        $('#weather').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('#weatherRadar').attr('class', 'animated fadeIn');
        });
        $('#news').attr('class', 'animated fadeOut');
        $('#news').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('#news').html(news2);
          $('#news').attr('class', 'animated fadeIn');
        });
        radarActive = true;
      }
    }
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
  }
  setTimeout(function () {
    updateClock();
  },1000);

  document.getElementById('background').style.backgroundImage='url(http://jonathandamico.me/dudleydisplay/images/'+(new String(parseInt(Math.random()*8)+1))+'.jpg)';
});
