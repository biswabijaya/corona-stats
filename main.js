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

var xlabel = [];
var ylabel = [];

function getchart(ylabel){
    var xlabel = ['Total cases', 'Active cases', 'Total deaths', 'Total recovered'];

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: xlabel ,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ylabel
        }]
    },

    // Configuration options go here
    options: {}
});


};


$(document).ready(function(){
    $('#countryname').on('submit', function(e){
        e.preventDefault();
        var country = $('#country').val();
        var ylabel = [];

        // for(var i = 2; i >= 1; i++){
        //     date.push(ymd(i));

        // }
        console.log('hello');

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
            $('.country-details').css('display', 'inline')
            $('#countryid').append(obj.latest_stat_by_country[0].id);
            $('#con-name').append(obj.latest_stat_by_country[0].country_name);
            $('#total-cases').append(obj.latest_stat_by_country[0].total_cases);
            $('#active-cases').append(obj.latest_stat_by_country[0].active_cases);
            $('#total-deaths').append(obj.latest_stat_by_country[0].total_deaths);
            $('#total-recover').append(obj.latest_stat_by_country[0].total_recovered);
            ylabel.push(obj.latest_stat_by_country[0].total_cases);
            ylabel.push(obj.latest_stat_by_country[0].active_cases);
            ylabel.push(obj.latest_stat_by_country[0].total_deaths);
            ylabel.push(obj.latest_stat_by_country[0].total_recovered);

        });
            $('#countryid').empty();
            $('#con-name').empty();
            $('#total-cases').empty();
            $('#active-cases').empty();
            $('#total-deaths').empty();
            $('#total-recover').empty();

            getchart(ylabel);

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

    

  
  });

// const inputField = document.querySelector('.chosen-value');
// const dropdown = document.querySelector('.value-list');
// const dropdownArray = [... document.querySelectorAll('li')];
// console.log(typeof dropdownArray)
// dropdown.classList.add('open');
// inputField.focus(); // Demo purposes only
// let valueArray = [];
// dropdownArray.forEach(item => {
//   valueArray.push(item.textContent);
// });

// const closeDropdown = () => {
//   dropdown.classList.remove('open');
// }

// inputField.addEventListener('input', () => {
//   dropdown.classList.add('open');
//   let inputValue = inputField.value.toLowerCase();
//   let valueSubstring;
//   if (inputValue.length > 0) {
//     for (let j = 0; j < valueArray.length; j++) {
//       if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
//         dropdownArray[j].classList.add('closed');
//       } else {
//         dropdownArray[j].classList.remove('closed');
//       }
//     }
//   } else {
//     for (let i = 0; i < dropdownArray.length; i++) {
//       dropdownArray[i].classList.remove('closed');
//     }
//   }
// });

// dropdownArray.forEach(item => {
//   item.addEventListener('click', (evt) => {
//     inputField.value = item.textContent;
//     dropdownArray.forEach(dropdown => {
//       dropdown.classList.add('closed');
//     });
//   });
// })

// inputField.addEventListener('focus', () => {
//    inputField.placeholder = 'Type to filter';
//    dropdown.classList.add('open');
//    dropdownArray.forEach(dropdown => {
//      dropdown.classList.remove('closed');
//    });
// });

// inputField.addEventListener('blur', () => {
//    inputField.placeholder = 'Select country';
//   dropdown.classList.remove('open');
// });

// document.addEventListener('click', (evt) => {
//   const isDropdown = dropdown.contains(evt.target);
//   const isInput = inputField.contains(evt.target);
//   if (!isDropdown && !isInput) {
//     dropdown.classList.remove('open');
//   }
// });



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
