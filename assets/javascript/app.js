//some javaScript for id connection
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBllgVRpgVUZNsKzeut0B9HWx0BCjvAvew",
    authDomain: "green-project-one.firebaseapp.com",
    databaseURL: "https://green-project-one.firebaseio.com",
    projectId: "green-project-one",
    storageBucket: "green-project-one.appspot.com",
    messagingSenderId: "14534397184"
  };
  firebase.initializeApp(config);

  var database = firebase.database()
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

var queryURL

var video = function(){

    var ytsettings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "8a23a9ae-9f3f-4dbd-b2b4-94a85af2f577"
        }
    }
        
    $.ajax(ytsettings).done(function (response) {
        console.log(response);

        var youtubeID = response.items[0].id.videoId

        $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>').appendTo("#video-display")
    })


}


$("#add-input").on("click", function(event){
    event.preventDefault()
    $("#data-display").empty()
    var hero = $("#Search-input").val().trim()
    
    $("#Search-input").val("")
    var marvelURL = "https://cors-anywhere.herokuapp.com/https://gateway.marvel.com/v1/public/characters?name=" + hero + "&ts=1&apikey=" + marvelAPIkey + "&hash=" + marvelAPIhash
    queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + hero + "&key=" + youtubeAPIkey + "&order=relevance&safesearch=moderate&type=video" 
    
    var msettings = {
        "async": true,
        "crossDomain": true,
        "url": marvelURL,
        "method": "GET",
        "headers": {
          "Cache-Control": "no-cache",
          "Postman-Token": "eacbc1d0-a627-4da7-98c6-f528bd54bb87"
        }
      }
      
      $.ajax(msettings).done(function (response) {
        console.log(response);
        if (response.data.count === 1) {
            video()
            $("#data-display").append(response.data.results[0].name)
            $("#data-display").append("<img src=" + response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension + " alt=" + hero + "></img>")
            $("#data-display").append(response.data.results[0].description)
            var series = response.data.results[0].series.items
            for (var i = 0; i < series.length; i++) {
                $("<li>" + series[i].name + "</li>").appendTo("#series")
            }
            database.ref().once("value", function(snapshot){
                for (var key in snapshot.val()){
                    if (snapshot.val()[key].hero === hero){
                        database.ref(key).update({
                            searchNumber: (snapshot.val()[key].searchNumber + 1)
                        })
                        return
                    }
                }
                database.ref().push({
                    hero: hero,
                    searchNumber: 1
                })
            })    
        } else {
            $("#data-display").append("<p>Character not found.</p>")
        }
        
      });
})
