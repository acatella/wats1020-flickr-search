

$(document).ready(function () {
  var imageIndex = 0;
  var maxImageIndex = 15;
  var startIndex = 1;
  var searchString = "";

  $('button.search').click(function(e) {
    e.preventDefault();
    searchString = document.forms["searchForm"]["searchText"].value;
    searchString = searchString.split(" ");
    if (searchString == "") {
      $('#images').html("<p>You didn't enter any keywords...</p>");
      return;
    }
    if (searchString.length > 1) {
      searchString = searchString.join("+");
    }
    else {
      searchString = searchString.join("");
    }
    searchImages(searchString);

  });

  function searchImages(srchStr) {
    var imageDiv = $('#images');
    //initiate the load screen
    imageDiv.html("<div class='loader-inner ball-grid-pulse'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>");
    var newHTML = [];
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&format=json&limit=100&tags="+srchStr).done(function(data) {

      if (data.items.length == 0) {
        imageDiv.html("<p>Sorry, your search didn't return any results.</p>");
      }

      else {
        imageDiv.html("");
        $.each(data.items, function(i,photo) {
            var newDiv = $('<div>').attr({
              'class' : 'col-xs-12 col-sm-4 grid-item',
            });

            var imgSrc = photo.media.m.slice(0,photo.media.m.length-6)+"_c.jpg";
            var newPhoto = $('<img>').attr({
              'data-toggle': "modal",
              'data-target': "#infoModal",
              'data-imgsrc': imgSrc,
              'src': imgSrc
            });

            newPhoto.appendTo(newDiv);
            newDiv.appendTo(imageDiv);

        });

        var $grid = $('.grid').masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-item'
        });
      };
    });
  };

  $('#infoModal').on('show.bs.modal', function(e) {
    var button = $(e.relatedTarget);
    var fullImg = button.data('imgsrc');
    var imgEl = $('<img>').attr('src',fullImg);
    var modalBody = $('.modal-body').empty();
    imgEl.appendTo(modalBody);
  });
});
