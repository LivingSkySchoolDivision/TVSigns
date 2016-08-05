/* ******************************************** */
/* * Document onLoad stuff                    * */
/* ******************************************** */
$(document).ready(function(){
    updateWeather();
    updateDateAndTime()
    updateTicker();


});


/* ******************************************** */
/* * Interval stuff                           * */
/* ******************************************** */

/*
 1000     1 second
 10000     10 seconds
 60000     1 minute
 300000     5 minutes
 600000     10 minutes
 1800000     30 mins
 3600000     1 hour
 */

/* Update weather */
setInterval(function() {
    updateWeather();
}, 60000);

/* Update the date and time displays */
setInterval(function() {
    updateDateAndTime();
}, 500);

setInterval(function() {
    updateTicker();
}, 5000);

/* Refresh the page every hour ish */
setInterval(function() {
    location.reload();
}, 4500000);
