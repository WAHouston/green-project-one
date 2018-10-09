//some javaScript for id connection

// for the search button whnen clicked 
//$("#add-input").on("click",function(event){
    //prevent refresh the page
    //event.preventDefault();
    /*I made a class in html called hide. it will hide the video and ranking at
     intial with the css display none . right now just to embed this code to show 
     the data and video when user hites search.
   //$(".hide").show()*/
    //remove the  inital introduction video with id  intro-video
    //$("#intro-video").remove()
//})

//variable declaration for the matching ids 
//in line 44 this one is for capture the user input in the search box 
//var userInput= $("#search-input").val().trim();

//in line 64 this id is in a div for show the results got from the marvael API in the HTML 
//var characterInfo=$("#data-display");

//in line 71 this id is in a div for show the videos got from the youtube API in HTML
//var characterVideo=$("#video-display");
// the table body in start in line 100 in html and I created several rows and put some data to show the rank
var hero = "Spider-Man"

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
        $("#data-display").append("<img src=" + response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension + " alt=" + hero + "></img>")
        $("#data-display").append(response.data.results[0].description)
        var series = response.data.results[0].series.items
        for (var i = 0; i < series.length; i++) {
            $("#data-display").append(series[i].name)
        }
    } else {
        $("#data-display").append("<p>Character not found.</p>")
    }
    
  });