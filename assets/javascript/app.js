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

$("#add-input").on("click", function(event){
    event.preventDefault()
    $("#data-display").empty()
    var hero = $("#Search-input").val().trim().toLowerCase()
    $("#Search-input").val("")
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
            $("<p>" + response.data.results[0].name + "</p>").attr("id", "heroName").appendTo("#data-display")
            $("<img src=" + response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension + " alt=" + hero + "></img>").attr("id", "thumbnail").appendTo("#data-display")
            $("<p>" + response.data.results[0].description + "</p>").attr("id", "description").appendTo("#data-display")
            $("<ul>").attr("id", "series").appendTo("#data-display")
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
            //Use response.data.results[0].name for display NOT "hero"!
        } else {
            $("#data-display").append("<p>Character not found.</p>")
        }
        
      });
})
