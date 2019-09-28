/* ******************************************** */
/* * Document onLoad stuff                    * */
/* ******************************************** */
$(document).ready(function(){
    getWatchdogTemp();
    updateWeather();
    updateBandwidthGauge();
    updateTicker();
    updateWirelessCount();
    updateTicketCounts();
    UpdateTicketsPerSchool();
    UpdateGuestAccounts();
    InitializeInOut();
    InitializeWeather();
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


setInterval(function() {
    UpdateAllInOutPresence();
}, 25000);

setInterval(function() {
    UpdateGuestAccounts();
}, 60000);

setInterval(function() {
    updateTicker();
}, 10000);

setInterval(function() {
    updateBandwidthGauge();
}, 600000);

/* Update ticket graphs */
setInterval(function() {
    updateTicketCounts();
}, 10000);

/* Update weather */
setInterval(function() {
    updateWeather();
}, 300000);

/* Update wireless count */
setInterval(function() {
    updateWirelessCount();
}, 300000);

/* Update left sidebar  */
setInterval(function() {
    UpdateTicketsPerSchool();
}, 60000);


setInterval(function() {
    getWatchdogTemp();
}, 600000);

/* Update the date and time displays */
setInterval(function() {
    updateDateAndTime();
}, 500);

/* Refresh the page every hour ish */
setInterval(function() {
    location.reload();
}, 4500000);

function InitializeInOut() {
    InitializeInOutPresenceForGroup(5);
}

function InitializeWeather() {
    console.log("Initializing weather");
    $("#weather_container").html(insertWeatherWidgetHTML());
}