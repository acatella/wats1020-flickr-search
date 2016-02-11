

$(document).ready(function () {
  //global variables for imageIndex and maxImageIndex so all buttons can update them
  var imageIndex = 0;
  var maxImageIndex = 15;

  //global variable for searchString
  var searchString = "";

  $('button.search').click(function(e) {
    //prevent default behavior
    e.preventDefault();
    //in case of multiple search terms, break string into array of separate words
    searchString = document.forms["searchForm"]["searchText"].value;
    searchString = searchString.split(" ");
    //join the string with delimeter matching the flickr api format, maybe '+'?
    if (searchString.length > 1) {
      searchString = searchString.join("+");
    }
    else {
      searchString = searchString.join("");
    }
    //set imageIndex and maxImageIndex to defaults
    imageIndex = 0;
    maxImageIndex = 15;
    searchImages(searchString,imageIndex,maxImageIndex);

  });

  function searchImages(srchStr,imgI,maxImgI) {    
    //replace html w/ loading icon
    var imageDiv = $('#images');
    imageDiv.html("<div class='loader-inner ball-grid-pulse'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>");
    //What is with the below URL???
    // $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=aee77ec71736bbd7eaa4e98b41142df0&tags=dogs&format=json&limit=16").done(function(data) {
    var newHTML = [];
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&format=json&limit=16&tags="+srchStr).done(function(data) {
      if (data.items.length == 0) {
        imageDiv.html("<p>Sorry, your search didn't return any results.</p>");
      }

      else {
        $.each(data.items, function(i,photo) {
          var newPhotoEl = "<a class='flex-item' href='"+photo.link+"'>";
          var thumb = photo.media.m;
          thumb = thumb.slice(0,thumb.length-6) + "_q.jpg";
          var newImg = "<img src='"+thumb+"'>";
          newPhotoEl += newImg+"</a>";
          newHTML.push(newPhotoEl);
        });

        newHTML = newHTML.join("");
        imageDiv.html(newHTML);
      }

  });

    //select and show next button
    //if imageIndex != 0, hide previous button
      //else select and show previous button

  };

  function nextImages() {
    //increments imageIndex and maxImageIndex
    //calls searchImages() with new parameters
  };

  function prevImages () {
    //decrements imageIndex and maxImageIndex
    //calls searchImages() with new parameters
  };

});
