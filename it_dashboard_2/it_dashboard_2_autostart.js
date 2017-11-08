
/* ******************************************** */
/* * Document onLoad stuff                    * */
/* ******************************************** */

$(document).ready(function() {
    // Sensor data can come from here http://dashboard.lskysd.ca/strendinmonitor/JSON/allsensors.aspx

    // add all nodes
    updateSNMPSensorNodes(strendinMonitorJSONRoot + '/JSON/allsensors.aspx');

    // Does this have to be added and updated seperately as well? We'll find out
    updatePingSensorNodes(strendinMonitorJSONRoot + '/JSON/allsensors.aspx');

    // Update total traffic counter
    updateTotalTrafficToday(strendinMonitorJSONRoot + '/JSON/bySNMPThroughputSensor.aspx?sensorid=1', '/StrendinMonitor/JSON/bySNMPThroughputSensor.aspx?sensorid=2');
    updateTotalTrafficThisMonth(strendinMonitorJSONRoot + '/JSON/bySNMPThroughputSensor.aspx?sensorid=1', '/StrendinMonitor/JSON/bySNMPThroughputSensor.aspx?sensorid=2');

    // Update graph
    updateBandwidthGraph(strendinMonitorJSONRoot + '/JSON/ByHost.aspx?hostid=1');

    // Update communications errors
    updateConnectionWarnings();
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

// Reload the whole page every 45 minutes
setInterval(function() {
    location.reload();
}, 7800000);  // Reload the page every hour ish (not exactly an hour, so its different throughout the day)

// Update SNMP sensor nodes
setInterval(function() {
    updateSNMPSensorNodes(strendinMonitorJSONRoot + '/JSON/allsensors.aspx');
}, 60000);

// Update ping sensor nodes
setInterval(function() {
    updatePingSensorNodes(strendinMonitorJSONRoot + '/JSON/allsensors.aspx');
}, 20000);


// UPdate traffic counters
setInterval(function() {
    updateTotalTrafficToday(strendinMonitorJSONRoot + '/JSON/bySNMPThroughputSensor.aspx?sensorid=1', strendinMonitorJSONRoot + '/JSON/bySNMPThroughputSensor.aspx?sensorid=2');
    updateTotalTrafficThisMonth(strendinMonitorJSONRoot + '/JSON/bySNMPThroughputSensor.aspx?sensorid=1', strendinMonitorJSONRoot + '/JSON/bySNMPThroughputSensor.aspx?sensorid=2');
}, 60000);

// Update graph
setInterval(function() {
    updateBandwidthGraph(strendinMonitorJSONRoot + '/JSON/ByHost.aspx?hostid=1');
}, 60000);

// Check connectivity with internal sites and the internet
//setInterval(function() {
//    updateConnectionWarnings();
//}, 300000);
