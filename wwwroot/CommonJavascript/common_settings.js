/* ******************************************** */
/* * Some initial settings                    * */
/* ******************************************** */

// This file sets some initial settings and paths for other scripts. It should be called in the HTML page before other JS files.

var proxyPath = "/LSKYDashboardDataCollector/Proxy/JSON.aspx?SKIPCACHE=Yes&url=";

// Path to StrendinMonitor, relative to this dashboard
// Keep in mind that JQuery won't allow ajax requests from other domains
var strendinMonitorJSONRoot = proxyPath + "https://strendinmonitor.lskysd.ca";
var strendinMonitorGraphRoot = "https://strendinmonitor.lskysd.ca";


var inOutJSONRoot = "https://inoutapi.lskysd.ca/api";
var sharepointJSONPath = "/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?calurl=";

// Path to the LSKYDashboardDataCollector web application
// Keep in mind that JQuery won't allow ajax requests from other domains
var dashboardDataCollectorRoot = "/LSKYDashboardDataCollector";