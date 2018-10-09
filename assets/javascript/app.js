//some javaScript for id connection



//in line 64 this id is in a div for show the results got from the marvael API in the HTML 
//var characterInfo=$("#data-display");

//in line 71 this id is in a div for show the videos got from the youtube API in HTML
//var characterVideo=$("#video-display");
// the table body in start in line 100 in html and I created several rows and put some data to show the rank
// for the search button whnen clicked 
$("#add-input").on("click",function(event){
    //prevent refresh the page
    event.preventDefault();
   $(".hide").show()
    //remove the  inital introduction video with id  intro-video
    $("#intro-video").remove()
//capture the user input,store it as a variable
var hero = $("#search-input").val();

var marvelURL = "https://cors-anywhere.herokuapp.com/https://gateway.marvel.com/v1/public/characters?name=" + hero + "&ts=1&apikey=" + marvelAPIkey + "&hash=" + marvelAPIhash

var settings = {
    "async": true,
    "crossDomain": true,
    "url": marvelURL,
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache",
      "Postman-Token": "eacbc1d0-a627-4da7-98c6-f528bd54bb87"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response.data.count === 1) {
        $("#data-display").append(response.data.results[0].name)
        $("#data-display").append("<img src=" + response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension + " alt=hulk></img>")
        $("#data-display").append(response.data.results[0].description)
        var series = response.data.results[0].series.items
        for (var i = 0; i < series.length; i++) {
            $("#data-display").append(series[i].name)
        }
    } else {
        $("#data-display").append("<p>Character not found.</p>")
    }
    
  });
})