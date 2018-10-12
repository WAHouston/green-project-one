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

$("#add-input").on("click", function(event){
    event.preventDefault()
    $("#slideshow").remove()//remove the slide show
    $(".hide").show()// show the data , video, and graph
    $("#data-display").empty()
    var hero = $("#Search-input").val().trim().toLowerCase()
    $("#Search-input").val("")
    var marvelURL = "https://cors-anywhere.herokuapp.com/https://gateway.marvel.com/v1/public/characters?name=" + hero + "&ts=1&apikey=" + marvelAPIkey + "&hash=" + marvelAPIhash
    
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
            $("<p>" + response.data.results[0].name + "</p>").attr("id", "heroName").appendTo("#data-display")
            $("<img src=" + response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension + " alt=" + hero + "></img>").addClass("img-fluid").attr("id", "thumbnail").appendTo("#data-display")
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
            $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>').appendTo("#video-display")
            //Use response.data.results[0].name for display NOT "hero"!
        } else {
            $("#data-display").append("<p>Character not found.</p>")
        }
        
      });
})

//Here is the javascript for the slides 
/*$("#slideshow > div:gt(0)").hide();
setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
}, 3000);*/
