/* ******************************************** */
/* * Some initial settings                    * */
/* ******************************************** */

// This file sets some initial settings and paths for other scripts. It should be called in the HTML page before other JS files.

// Path to StrendinMonitor, relative to this dashboard
// Keep in mind that JQuery won't allow ajax requests from other domains
var strendinMonitorJSONRoot = "/LSKYDashboardDataCollector/Proxy/JSON.aspx?SKIPCACHE=Yes&url=https://status.lskysd.ca/strendinmonitor";
var strendinMonitorGraphRoot = "https://status.lskysd.ca/strendinmonitor";


// Path to the LSKYDashboardDataCollector web application
// Keep in mind that JQuery won't allow ajax requests from other domains
var dashboardDataCollectorRoot = "/LSKYDashboardDataCollector";


var LyncJSONPath = "/DashboardPresence/JSON/";