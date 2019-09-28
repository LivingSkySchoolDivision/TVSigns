
/* ******************************************** */
/* * Document onLoad stuff                    * */
/* ******************************************** */

$(document).ready(function() {
    // Sensor data can come from here http://dashboard.lskysd.ca/strendinmonitor/JSON/allsensors.aspx

    // Does this have to be added and updated seperately as well? We'll find out
    updatePingSensorNodes(strendinMonitorJSONRoot + '/JSON/allsensors.aspx');

    // New stuff
    InitializeAllLocationBoxes();
    UpdateAllSensorGraphs();
    UpdateAllSensorValues();
    UpdateDetailedSNMPValues();

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

// Every 5 minutes, updadate the graphs
setInterval(function() {
    UpdateAllSensorGraphs();
}, (10000));

// Every 4 minutes, update the values
setInterval(function() {
    UpdateAllSensorValues();
}, (30000));

// Every 15 minutes, update the detailed values
setInterval(function() {
    UpdateDetailedSNMPValues();
}, (600000));


// Reload the whole page every 45 minutes
setInterval(function() {
    location.reload();
}, 7800000);  // Reload the page every hour ish (not exactly an hour, so its different throughout the day)


// Update ping sensor nodes
setInterval(function() {
    updatePingSensorNodes(strendinMonitorJSONRoot + '/JSON/allsensors.aspx');
}, 20000);

function InitializeAllLocationBoxes() {
    // Main firewall boxes
    InitializeDetailedSNMPBox("CORE1","Core Switch - Port 15",1000,1, true);
    InitializeDetailedSNMPBox("CORE2","Core Switch - Port 16",1000,2, true);

    // Internal server boxes
    /*
        82  FIM
        83  FIM STAFF
        84  GOOGLESYNC
        86  PAPERCUT
        87  BACKUPS
        88  WEB-EXTERNAL
        138 WEB-INTERNAL
        90  RADIUS
        122 SYSLOG
        123 SIS
        127 VCENTER
        128 CLEVR
        129 CONFLUENCE
        233 VPN2
        133 NSCNET
        134 NSEXT1
        135 NSEXT2
        136 NTP
        137 XIBO
        145 SCCM2012-DO
        234 ADFS2019-1
        235 ADFS2019-2
        236 ADSYNC
        238 L4U
        239 Jenkins
        240 ChangeMyPassword
        241 WebPortal
        242 Sync
    */
    InitializeButtonBox("InternalSites","",[82,83,84,86,87,88,138,90,122,123, 127, 128, 129, 233, 133, 134, 135, 136, 137, 145,234,235,236, 238, 239, 240, 241, 242 ],false);

    // External server boxes
    InitializeButtonBox("ExternalSites","",[91],true);
}