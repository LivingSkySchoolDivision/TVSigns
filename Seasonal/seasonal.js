//var pie_chart_overlay_image = '/dashboard_common/seasonal_customizations/Halloween/jackolantern.png'; // Halloween: jackolantern.png
var pie_chart_overlay_image = '/dashboard_common/sphere.png'; // Halloween: jackolantern.png

function add_pie_image(context) {
    // Add a cool graphic overtop of the pie chart
    // Image should be the same size as the canvas
    /*
    base_image = new Image();
    base_image.src = pie_chart_overlay_image;
    base_image.onload = function(){
      context.drawImage(base_image, 0, 0);
    };

    // Leave this line here */
}


// Check the date, and if there is a special occasion, apply the stylesheet for it
var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getYear();

// Valentines
if (currentMonth == 2) {
    if ((currentDay >= 1) && (currentDay <= 14)) {
        console.log("Loading valentines day stylesheets");
        LoadCSSFile("../Seasonal/Valentines/seasonal.css");
    }
}