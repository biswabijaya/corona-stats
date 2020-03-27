// $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=c3278a9dddcbf142a4c4f96117e94251", function(data){
//     console.log(data);

// });

// // var data = api.openweathermap.org/data/2.5/weather?q=mumbai&appid=c3278a9dddcbf142a4c4f96117e94251;

// $(document).ready(function(){
//     $('#cityname').on('submit', function(e){
//         e.preventDefault();
//         var city = $('#city').val();
//         console.log(city);
//         $.ajax({
//             url:"http://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=c3278a9dddcbf142a4c4f96117e94251",
//             type: "GET",
//             dataType: 'json',
//             success: function(data) {
//                 console.log(data);
//             }
//         });
//     });

  
//   });

$(document).ready(function(){
    $('#countryname').on('submit', function(e){
        e.preventDefault();
        var country = $('#country').val();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=" +country,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "fce61b9f8amshf1817269f8a2a63p1d2382jsn44ad90697b6d"
            }
        }
        
        $.ajax(settings).done(function (response) {
            var obj = JSON.parse(response);
            $('.country-details').css('display', 'inline')
            $('#countryid').append(obj.latest_stat_by_country[0].id);
            $('#con-name').append(obj.latest_stat_by_country[0].country_name);
            $('#total-cases').append(obj.latest_stat_by_country[0].total_cases);
            $('#active-cases').append(obj.latest_stat_by_country[0].active_cases);
            $('#total-deaths').append(obj.latest_stat_by_country[0].total_deaths);
            $('#total-recover').append(obj.latest_stat_by_country[0].total_recovered
                );



        });
        
    });

    var settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "fce61b9f8amshf1817269f8a2a63p1d2382jsn44ad90697b6d"
        }
    }
    
    $.ajax(settings2).done(function (response) {
        var obj2 = JSON.parse(response);
        $('#world-total-cases').append("Total cases: " + obj2.total_cases);
        $('#world-total-deaths').append("Total deaths: " + obj2.total_deaths);
        $('#world-total-recover').append("Total recovered: " + obj2.total_recovered);
        $('#date').append("Last updated: " +obj2.statistic_taken_at);



    });

  
  });