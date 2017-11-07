$(document).ready(function() {

var searchTerm = "Assassins Creed Origins";

    console.log(searchTerm);




  var getRequest = function(searchTerm) {

    var searchParams = {
      
      part: 'snippet',

      key: 'AIzaSyD7beeskMiAH3aGuOyURD06SuubXkNHmx8',

      maxResults: 10,

      q: searchTerm
    }

    url='https://www.googleapis.com/youtube/v3/search'

    $.getJSON(url, searchParams, function(data) {

      var resultsArray = data.items;
      console.log(resultsArray);

      showResults(resultsArray);
    })
  }

      getRequest(searchTerm);


  var showResults = function(results) {
    var html = ""

    $.each(results, function (key, item) {

        console.log(key);
        console.log(item);
        var imgs = item.snippet.thumbnails.high.url;
        var title = item.snippet.title;
        var videoId = item.id.videoId;
        var channelId = item.snippet.channelId;
        var channelName = item.snippet.channelTitle;
        var videoURL = "https://www.youtube.com/watch?v=" + videoId
        
        html = '<a href="https://www.youtube.com/watch?v=' + videoId + '"><img src="' + imgs + '" title="' + title + '"class=img-responsive yTSlide' + '"></a>';
        
        $('#search-results').append(html);

    })
  }

})
 
