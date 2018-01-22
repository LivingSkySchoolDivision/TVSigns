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
            //console.log("> " + imageArray[x]);
            var imageObject = new Image();
            imageObject.src = imageArray[x];
        }
        console.log("Finished preloading images");
        NextGalleryImage();
    });

    // Adjust the "tomorrow" field names to indicate the actual day
    var date = new Date();
    var dayOfWeek = date.getDay() + 1;
    if (dayOfWeek >= 7) {
        dayOfWeek = 0;
    }

    var dayName = "";
    if (dayOfWeek == 0) {
        dayName = "Monday"; // The JSON is automatically adjusted to skip weekends
    }
    if (dayOfWeek == 1) {
        dayName =  "Monday";
    }
    if (dayOfWeek == 2) {
        dayName =  "Tuesday";
    }
    if (dayOfWeek == 3) {
        dayName =  "Wednesday";
    }
    if (dayOfWeek == 4) {
        dayName =  "Thursday";
    }
    if (dayOfWeek == 5) {
        dayName =  "Friday";
    }
    if (dayOfWeek == 6) {
        dayName =  "Monday"; // The JSON is automatically adjusted to skip weekends
    }

    !$("#tomorrow_name").html(dayName);
    !$("#tomorrow_name_2").html(dayName);
}


var imageIndex = 0;
function NextGalleryImage() {
    // Cycles to the next image

    //console.log("PHOTO GALLERY: Transitioning to " + imageArray[imageIndex]);

    !$("#photo_tile").css("background-image", "url(" + imageArray[imageIndex] + ")");

    //alert(imageArray[imageIndex]);

    imageIndex++;
    if (imageIndex >=  imageArray.length) {
        imageIndex = 0;
    }
}