/**
 * Created by mark.strendin on 2016-06-14.
 */

var imageArray =  new Array();
var imageArrayIndex = 0;

function UpdatePhotoList(JSONURL, div) {
    $.getJSON(JSONURL, function(data) {
        // Figure out the size of the array
        var arraySize = data.TotalPhotos;
        imageArray = new Array(arraySize);

        var x = 0;
        $.each(data.Photos, function(j, photoPath) {
            imageArray[x] = photoPath;
            x++;
        });

        console.log("Preloading images");
        // Preload the images in the browser
        for (var x = 0; x < imageArray.length; x++) {
            console.log("> " + imageArray[x]);
            var imageObject = new Image();
            imageObject.src = imageArray[x];
        }
        console.log("Finished preloading images");

    });
}


var imageIndex = 0;
function NextGalleryImage() {
    // Cycles to the next image

    console.log("PHOTO GALLERY: Transitioning to " + imageArray[imageIndex]);

    !$("#photo_tile").fadeTo('slow', 0, function()
    {
        !$("#photo_tile").css("background-image", "url(" + imageArray[imageIndex] + ")");
    }).fadeTo('slow', 1);

    //alert(imageArray[imageIndex]);

    imageIndex++;
    if (imageIndex >=  imageArray.length) {
        imageIndex = 0;
    }
}