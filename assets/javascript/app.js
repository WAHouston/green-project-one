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

var rankings = function(){
    

}

$("#add-input").on("click", function(event){
    event.preventDefault()
    $("#slideshow").remove()//remove the slide show
    $(".hide").show()// show the data , video, and graph
    $("#data-display").empty()
    $("#video-display").empty()
    var hero = $("#Search-input").val().trim().toLowerCase()
    $("#Search-input").val("")
    var marvelURL = "https://cors-anywhere.herokuapp.com/https://gateway.marvel.com/v1/public/characters?name=" + hero + "&ts=1&apikey=" + marvelAPIkey + "&hash=" + marvelAPIhash
    queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=Variant%20Comics%20" + hero + "&key=" + youtubeAPIkey + "&order=relevance&safesearch=moderate&type=video" 
    
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
            $("<p>" + response.data.results[0].name + "</p>").attr("id", "heroName").appendTo("#data-display")
            $("<img src=" + response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension + " alt=" + hero + "></img>").addClass("img-fluid").attr("id", "thumbnail").appendTo("#data-display")
            $("<p>" + response.data.results[0].description + "</p>").attr("id", "description").appendTo("#data-display")
            $("<ul>").attr("id", "series").appendTo("#data-display")
            rankings()
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

database.ref().once("value", function(){
    $("tbody").empty()
    database.ref().orderByChild("searchNumber").on("value", function(snapshot){
        for (var key in snapshot.val()){
            $('tbody').append('<tr><td>' + snapshot.val()[key].hero + '</td><td>' + snapshot.val()[key].searchNumber + '</td></tr>')
        }
    })
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

