var xlabel = [];
var ylabel = [];
var indianstate = [];



var xlabel = ['Total cases', 'Active cases', 'Total deaths', 'Total recovered'];
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: xlabel ,
        datasets: [{
            label: 'Country',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ylabel
        }]
    },

    // Configuration options go here
    options: {}
});

$(document).ready(function(){
    $('#countryname').on('submit', function(e){
        e.preventDefault();
        var country = $('#country').val();
        var ylabel = [];

        // for(var i = 2; i >= 1; i++){
        //     date.push(ymd(i));

        // }


        //country data
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
            ylabel = [];
            $('.country-details').css('display', 'inline')
            $('#con-name').append(obj.latest_stat_by_country[0].country_name);
            $('#total-cases').append(obj.latest_stat_by_country[0].total_cases);
            $('#active-cases').append(obj.latest_stat_by_country[0].active_cases);
            $('#total-deaths').append(obj.latest_stat_by_country[0].total_deaths);
            $('#total-recover').append(obj.latest_stat_by_country[0].total_recovered);
            ylabel.push(parseInt(removeCommas(obj.latest_stat_by_country[0].total_cases)));
            ylabel.push(parseInt(removeCommas(obj.latest_stat_by_country[0].active_cases)));
            ylabel.push(parseInt(removeCommas(obj.latest_stat_by_country[0].total_deaths)));
            ylabel.push(parseInt(removeCommas(obj.latest_stat_by_country[0].total_recovered)));
            chart.data.datasets[0].label = obj.latest_stat_by_country[0].country_name;
            chart.data.datasets[0].data = ylabel;
            chart.update();
        });
            $('#countryid').empty();
            $('#con-name').empty();
            $('#total-cases').empty();
            $('#active-cases').empty();
            $('#total-deaths').empty();
            $('#total-recover').empty();

     //date wise data
    // for (let index = date.length; index >= 0; index--) {

    //     var settings3 = {
    //         "async": false,
    //         "crossDomain": true,
    //         "url": "https://coronavirus-monitor.p.rapidapi.com/coronavirus/history_by_country_and_date.php?country="+country+"&date="+date[index],
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    //             "x-rapidapi-key": "fce61b9f8amshf1817269f8a2a63p1d2382jsn44ad90697b6d"
    //         }
    //     }

    //     $.ajax(settings3).done(function (response) {
    //         var obj3 = JSON.parse(response);
    //         datewisecases.push(obj3.stat_by_country[0].total_cases)
    //     });

    // }
//     var ctx = document.getElementById('myChart').getContext('2d');
//     var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: date ,
//         datasets: [{
//             label: 'Total number of cases',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: datewisecases
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });


    });

    //world data
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

    var settings3 = {
        "async": true,
        "crossDomain": true,
        "url": "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
            "x-rapidapi-key": "fce61b9f8amshf1817269f8a2a63p1d2382jsn44ad90697b6d"
        }
    }

    $.ajax(settings3).done(function (response) {  
        
        for(p in response.state_wise){
            indianstate.push({
                name: response.state_wise[p].state,
                active: response.state_wise[p].active ,
                confirmed:response.state_wise[p].confirmed,
                deaths:response.state_wise[p].deaths,
                recovered:response.state_wise[p].recovered
            });
 
        }
        i=1;
        content = '';

        for (p in indianstate) { 
          }

          for (let index = 0; index < indianstate.length -1; index++) {
            content += '<tr><td>'+indianstate[index].name+'</td>'+'<td>'+indianstate[index].active+'</td>'+'<td>'+indianstate[index].confirmed+'</td>'+'<td>'+indianstate[index].deaths+'</td>'+'<td>'+indianstate[index].recovered+'</td></tr>';                    
              
          }
          
          
          $('#tbody').append(content);
            console.log(indianstate);
        

    }); 

  });

function ymd(i) {
    var date = new Date();

    var d = new Date(date),
        fromdate = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() - i),
        year = d.getFullYear();

    if (fromdate.length < 2)
        fromdate = '0' + fromdate;
    if (day.length < 2)
        day = '0' + day;

    return [year, fromdate, day].join('-');
  }

  function removeCommas(str) {
      return(str.replace(/,/g,''));
  }
