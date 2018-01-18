/**
 * Created by Mark on 2/6/2016.
 */
$(document).ready(function(){
    InitializeAllLocationBoxes();
    UpdateAllSensorGraphs();
    UpdateAllSensorValues();
    UpdateDetailedSNMPValues();
});

/*
 1000     1 second
 10000     10 seconds
 60000     1 minute
 300000     5 minutes
 600000     10 minutes
 1800000     30 mins
 3600000     1 hour
 */

/*
setInterval(function() {
    DisplayVPNAccounts('vpnusers', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/ActiveDirectory/VPNAccounts.aspx')
}, 300000);
*/

setInterval(function() {
    location.reload();
}, (5400000));

// Every 5 minutes, updadate the graphs
setInterval(function() {
    UpdateAllSensorGraphs();
}, (10000));

// Every 4 minutes, update the values
setInterval(function() {
    UpdateAllSensorValues();
}, (30000));


function InitializeAllLocationBoxes() {
    //try {
        // IDs are from https://status.lskysd.ca/strendinmonitor/
        // InitializeFacilitySensorBox(divName,locationName,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID)
        //                    Unique Div ID     Title                   SNMPGraphMax   HostID  RouterSNMPID    ServerPingID    Tyco    Rover   MacMini1    MacMini2    UTEC
        InitializeFacilitySensorBox("BCS",            "Battleford Central",   100,            6,      9,              8,              37,     0,      94,         95);
        InitializeFacilitySensorBox("Bready",         "Bready",               100,            7,      10,             48,             61,     96);
        InitializeFacilitySensorBox("CKES",           "Cut Knife Elementary", 25,            9,      12,             11,             57,     0,      97,         98);
        InitializeFacilitySensorBox("CKHS",           "Cut Knife High",       25,            0,     13,             12,             41,     71,     99);
        InitializeFacilitySensorBox("Cando",          "Cando",                25,            8,      11,             10,             42,     62,     100);
        InitializeFacilitySensorBox("Connaught",      "Connaught",            100,            11,     14,             13,             44,     63,     101,        102);
        InitializeFacilitySensorBox("DivisionOffice", "Division Office",      300,            5,      5,              6,              40,     0,      92,         93);
        InitializeFacilitySensorBox("Hafford",        "Hafford",              25,            12,     15,             14,             45,     64,     103);
        InitializeFacilitySensorBox("HCES",           "Hartley Clark",        10,            13,     16,             15,             56,     65,     104);
        InitializeFacilitySensorBox("Heritage",       "Heritage",             10,            14,     17,             16,             0,      66,     105);
        InitializeFacilitySensorBox("Kerrobert",      "Kerrobert",            100,            15,     18,             17,             38,     0,      106);
        InitializeFacilitySensorBox("Lawrence",       "Lawrence",             100,            3,      3,              3,              34,     67,      107);
        InitializeFacilitySensorBox("Leoville",       "Leoville",             25,            17,     19,             18,             49,     79,     108);
        InitializeFacilitySensorBox("Luseland",       "Luseland",             25,            18,     20,             19,             35,     69,     109);
        InitializeFacilitySensorBox("Macklin",        "Macklin",              100,            19,     21,             20,             36,     0,      110);
        InitializeFacilitySensorBox("Maymont",        "Maymont",              25,            21,     23,             21,             46,     74,     111);
        InitializeFacilitySensorBox("McKitrick",      "McKitrick",            100,            22,     24,             22,             47,     0,      112,        113);
        InitializeFacilitySensorBox("McLurg",         "McLurg",               25,            23,     25,             23,             50,     72,     114);
        InitializeFacilitySensorBox("Medstead",       "Medstead",             25,            24,     26,             24,             51,     75,     115);
        InitializeFacilitySensorBox("NBCHS",          "NBCHS",                1000,            25,     27,             25,             53,     60,     116);
        InitializeFacilitySensorBox("NCES",           "NCES",                 10,            26,     28,             26,             52,     76,     124);
        InitializeFacilitySensorBox("SHS",            "Spiritwood High",      100,            28,     30,             28,             54,     0,      117);
        InitializeFacilitySensorBox("StVital",        "St. Vital",            100,            16,     33,             31,             43,     77,     118);
        InitializeFacilitySensorBox("UCHS",           "Unity High",           100,            29,     31,             29,             39,     0,      119,        0,          81);
        InitializeFacilitySensorBox("UPS",            "Unity Public",         25,            30,     32,             30,             55,     73,     120,        121);
    //}
    /*catch (e) {
        document.write(e.message);
    }//*/
}
