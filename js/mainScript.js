

$(document).ready(function () {
  //global variables for imageIndex and maxImageIndex so all buttons can update them
  //global variable for searchString

  $(searchButton).click(function() {
    //Click event on search button
    //prevent default behavior
    //in case of multiple search terms, break string into array of separate words
    //join the string with delimeter matching the flickr api format, maybe '+'?
    //set imageIndex and maxImageIndex to defaults
    //call the searchImages() function with search parameter, imageIndex of 0, and maxImageIndex of 16
  });

  function searchImages(searchString,imageIndex,maxImageIndex) {
    //replace html w/ loading icon
    //make call for JSON data
      //in 'success' field, create for loop starting at imageIndex and ending at maxImageIndex - show 16 photos at a time
      //declare variable for full html
      //declare variable for unique image ID
      //build html for each photos
        //consist of:
          //opening a tag
            //class of flex-item
            //href to full size photo modal window (full size photo url to start)
          //img tag with href of 240x240 thumbnail
          //closing a tag
      //add photo html to full html
    //replace html with full html of photos
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
