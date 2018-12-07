$(document).ready(function () {
 

    $("#porkDish").click(function(){
      $("#query-field").val("Porchetta").change();
      $("#pac-input").val("Italy").change();
  });

    $("#beefDish").click(function(){
      $("#query-field").val("Galbi").change();
      $("#pac-input").val("Korea").change();
    });

    $("#chickenDish").click(function(){
      $("#query-field").val("Dapanji").change();
      $("#pac-input").val("Xinjiang, China").change();
    });

    $("#seafoodDish").click(function(){
      $("#query-field").val("Namasu").change();
      $("#pac-input").val("Japan").change();
    });

    $("#submit-button").click(function(){
      var query = document.getElementById("query-field").value;
      var wiki_api = 'https://en.wikipedia.org/w/api.php';
  
      var api = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=10&gsrsearch=";
      var wikilink = 'http://en.wikipedia.org/?curid=';
  
      var link = api + query;
      var html = "";
  
      
  
      $.ajax({
          url: link,
          type: "get",
          dataType: "JSONP",
          success: function (data) {
              console.log(data);
              var results = data.query.pages;
              var pgs = Object.keys(results);
              
              pgs.forEach(function (page) {
                  var title = results[page].title;
                  var text = results[page].extract;
                  var pagelink = wikilink + results[page].pageid;
                  
  
                  html += '<a href="' + pagelink + '" target="_blank">' + '<div class="item">' + title + '<br>' + '<p class="description-text" >' + text + '</p>' + '</div></a>  <br> ';
              });
  
              $('#display').html(html);
          }
      });
  });

});
