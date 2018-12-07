// $(document).ready(function () {
 

//         $("#porkDish").click(function(){
//           $("#query-field").val("Porchetta").change();
//           $("#pac-input").val("Italy").change();
//       });

//         $("#beefDish").click(function(){
//           $("#query-field").val("Galbi").change();
//           $("#pac-input").val("Korea").change();
//         });

//         $("#chickenDish").click(function(){
//           $("#query-field").val("Dapanji").change();
//           $("#pac-input").val("Xinjiang, China").change();
//         });

//         $("#seafoodDish").click(function(){
//           $("#query-field").val("Namasu").change();
//           $("#pac-input").val("Japan").change();
//         });

//         $("#submit-button").click(function(){
//           var query = document.getElementById("query-field").value;
//           var wiki_api = 'https://en.wikipedia.org/w/api.php';
      
//           var api = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=10&gsrsearch=";
//           var wikilink = 'http://en.wikipedia.org/?curid=';
      
//           var link = api + query;
//           var html = "";
      
          
      
//           $.ajax({
//               url: link,
//               type: "get",
//               dataType: "JSONP",
//               success: function (data) {
//                   console.log(data);
//                   var results = data.query.pages;
//                   var pgs = Object.keys(results);
                  
//                   pgs.forEach(function (page) {
//                       var title = results[page].title;
//                       var text = results[page].extract;
//                       var pagelink = wikilink + results[page].pageid;
                      
      
//                       html += '<a href="' + pagelink + '" target="_blank">' + '<div class="item">' + title + '<br>' + '<p class="description-text" >' + text + '</p>' + '</div></a>  <br> ';
//                   });
      
//                   $('#display').html(html);
//               }
//           });
//       });
 
// });



function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}