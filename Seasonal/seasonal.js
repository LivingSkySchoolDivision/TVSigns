//var pie_chart_overlay_image = '/dashboard_common/seasonal_customizations/Halloween/jackolantern.png'; // Halloween: jackolantern.png
var pie_chart_overlay_image = ''; // Halloween: jackolantern.png

function add_pie_image(context) {
    // Add a cool graphic overtop of the pie chart
    // Image should be the same size as the canvas

    if (pie_chart_overlay_image.length > 0) {
        base_image = new Image();
        base_image.src = pie_chart_overlay_image;
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0);
        };

    }
    // Leave this line here */
}


// Check the date, and if there is a special occasion, apply the stylesheet for it
var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth() + 1; // this is zero indexed for some reason? add 1  to it to make it match up with reality.
var currentYear = currentDate.getFullYear();

console.log("Current year is: " + currentYear);
console.log("Current month is: " + currentMonth);
console.log("Current day is: " + currentDay);

// Valentines
if (currentMonth == 2) {
    if ((currentDay >= 7) && (currentDay <= 14)) {
        console.log("Loading valentines day stylesheets");
        LoadCSSFile("../Seasonal/Valentines/seasonal.css");
    }
}

// Easter (2016): March 27
// Easter is always the first sunday after the first full moon on or after the vernal equinox
// Easter (2017): April 16
// Easter (2018): April 1
// Easter (2019): April 21
// Easter (2020): April 12
// Easter (2021): April 4
if (
    ((currentYear == 2016) && (currentMonth == 3) && (currentDay >= 22) && (currentDay <= 27)) ||
    ((currentYear == 2017) && (currentMonth == 4) && (currentDay >= 11) && (currentDay <= 16)) ||
    ((currentYear == 2018) && (currentMonth == 3) && (currentDay >= 26) && (currentDay <= 31)) ||
    ((currentYear == 2018) && (currentMonth == 4) && (currentDay >= 1) && (currentDay <= 1)) ||
    ((currentYear == 2019) && (currentMonth == 4) && (currentDay >= 16) && (currentDay <= 21)) ||
    ((currentYear == 2020) && (currentMonth == 4) && (currentDay >= 6) && (currentDay <= 12)) ||
    ((currentYear == 2021) && (currentMonth == 3) && (currentDay >= 26) && (currentDay <= 31)) ||
    ((currentYear == 2021) && (currentMonth == 4) && (currentDay >= 1) && (currentDay <= 4))
    ) {
    console.log("Loading Easter stylesheets");
    LoadCSSFile("../Seasonal/Easter/seasonal.css");
}

// Halloween
if (currentMonth == 10) {
    if ((currentDay >= 10) && (currentDay <= 31)) {
        console.log("Loading Halloween stylesheets");
        LoadCSSFile("../Seasonal/Halloween/seasonal.css");

        var pie_chart_color_1 = '#EA8825';
        var pie_chart_color_2 = '#C46200';
    }
}

// Remembrance Day
if (currentMonth == 11) {
    if ((currentDay >= 10) && (currentDay <= 11)) {
        console.log("Loading Remembrance day stylesheets");
        LoadCSSFile("../Seasonal/Nov11/seasonal.css");
    }
}

// Spring/Vernal equinox
if (currentMonth == 3) {
    if ((currentDay >= 20) && (currentDay <= 20)) {
        console.log("Loading vernal equinox stylesheets");
        LoadCSSFile("../Seasonal/SpringEquinox/seasonal.css");
    }
}

// Summer Solstice
if (currentMonth == 6) {
    if ((currentDay >= 21) && (currentDay <= 21)) {
        console.log("Loading summer solstice stylesheets");
        LoadCSSFile("../Seasonal/SummerSolstice/seasonal.css");
    }
}

// Autumnal Equinox
if (currentMonth == 9) {
    if ((currentDay >= 22) && (currentDay <= 23)) {
        console.log("Loading autumnal equinox stylesheets");
        LoadCSSFile("../Seasonal/AutumnalEquinox/seasonal.css");
    }
}

// XMas
// Winter solstice
if (currentMonth == 12) {

    // Solstice overrides xmas
    if ((currentDay >= 1) && (currentDay <= 25)) {
        console.log("Loading Xmas stylesheets");
        LoadCSSFile("../Seasonal/Xmas/seasonal.css");

        var pie_chart_color_1 = '#007200';
        var pie_chart_color_2 = '#8E020E';
        pie_chart_overlay_image = '../Seasonal/xmas/sphere.png';

    }

    if ((currentDay == 21)) {
        console.log("Loading winter solstice stylesheets");
        LoadCSSFile("../Seasonal/WinterSolstice/seasonal.css");
    }
}


// Pi Day
if (currentMonth == 3) {
    if (currentDay == 14) {
        console.log("Loading Pi day stylesheets");
        LoadCSSFile("../Seasonal/PiDay/seasonal.css");
    }
}

// St Patrick's Day
if (currentMonth == 3) {
    if ((currentDay >= 16) && (currentDay <= 17)) {
        console.log("Loading st patrick's day stylesheets");
        LoadCSSFile("../Seasonal/StPatricks/seasonal.css");
    }
}



// Pink shirt day
if (currentMonth == 2) {
    if (currentDay ==24) {
        console.log("Loading Pink shirt day stylesheets");
        LoadCSSFile("../Seasonal/PinkShirtDay/seasonal.css");
    }
}



