function doesElementExist(divID) {
    if($("#" + divID).length == 0) {
        return false;
    } else {
        return true;
    }
}

function updateSNMPSensorNodes(JSONPath) {
    // Load JSON
    $.getJSON(JSONPath, function(data) {
        $.each(data.snmpthroughputsensors, function(sensorID, thisSensor) {
            var errorNotes = "";

            if (thisSensor.lastfailurereason.length > 0)
            {
                //errorNotes = thisSensor.lastfailurereason;
                if (thisSensor.lastsuccess == 'Never') {
                    errorNotes = "[OFFLINE] For over 24 hours";
                } else {
                    errorNotes = "[OFFLINE] Last seen " + thisSensor.lastsuccess;
                }
            } else {
                errorNotes = "[OFFLINE]";
            }

            //var errorNotes = "Last seen: " + thisSensor.lastsuccess;
            if (thisSensor.id == 1) {
                update_snmp_sensor_node("#sidebar_top_left",thisSensor.id, "Firewall Internet Port (Primary)", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, true, 200, 200);
            }

            if (thisSensor.id == 2) {
                update_snmp_sensor_node("#sidebar_top_right", thisSensor.id, "Firewall Internet Port (Secondary)", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, true, 200, 200);
            }

            // BCS 9
            // Bready  10
            // Cando   11
            // CKES    12
            // CKHS    13
            // Connaught   14
            // Hafford 15
            // HCES    16
            // Heritage    17
            // Kerobert    18
            // Lawrence    3
            // Leoville    19
            // Luseland    20

            if (thisSensor.id == 9) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Battleford Central", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 100, 100);
            }

            if (thisSensor.id == 10) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Bready", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 11) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Cando", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 12) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Cut Knife Elementary", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 13) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Cut Knife High", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 14) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Connaught", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 5) {
                update_snmp_sensor_node("#sidebar_top_middle", thisSensor.id, "Division Office", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 1000, 1000); /* actually 1000 */
            }

            if (thisSensor.id == 15) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Hafford", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 16) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Hartley Clark", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 17) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Heritage", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 18) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Kerrobert", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 100, 100);
            }

            if (thisSensor.id == 3) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Lawrence", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 19) {
                update_snmp_sensor_node("#sidebar_left", thisSensor.id, "Leoville", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }


            // Macklin 21
            // Major   22
            // Maymont 23
            // McKitrick   24
            // McLurg  25
            // Medstead    26
            // NBCHS   27
            // NCES    28
            // Phx Man 29
            // SHS 100
            // St Vital    10
            // UCHS    101
            // UPS 102

            if (thisSensor.id == 20) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Luseland", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 21) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Macklin", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 100, 100);
            }

            if (thisSensor.id == 23) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Maymont", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 24) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "McKitrick", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 100, 100);
            }

            if (thisSensor.id == 25) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "McLurg", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 26) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Medstead", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 27) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "NBCHS", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 80, 80); /* actually 200 */
            }

            if (thisSensor.id == 28) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Norman Carter", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 30) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Spiritwood High", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 100, 100);
            }

            if (thisSensor.id == 33) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "St. Vital", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

            if (thisSensor.id == 31) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Unity High", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 100, 100);
            }

            if (thisSensor.id == 32) {
                update_snmp_sensor_node("#sidebar_right", thisSensor.id, "Unity Public", thisSensor.health , thisSensor.bitspersecondin, thisSensor.bitspersecondout, thisSensor.mbpsin, thisSensor.mbpsout, errorNotes, false, 10, 10);
            }

        });
    });
}


function updatePingSensorNodes(JSONPath) {

    // Add map pieces
    draw_region_map(strendinMonitorRoot + "/JSON/allsensors.aspx", "region_map");
    draw_city_map(strendinMonitorRoot + "/JSON/allsensors.aspx", "city_map");

}

function updateBandwidthGraph(JSONPath) {
    //<img src="https://sldata.lskysd.ca/strendinmonitor/graphs/SNMPThroughput.aspx?sensorid=1&width=300&height=75">

    var bpsOutValue = 0;
    var graphID = 0;

    $.getJSON(JSONPath, function(data) {

        $.each(data.snmpthroughputsensors, function(sensorID, thisSensor) {
            if (thisSensor.bitspersecondout > bpsOutValue) {
                bpsOutValue = thisSensor.bitspersecondout;
                graphID = thisSensor.id;
            }

        });

        if (graphID > 0)
        {
            d = new Date();
            $('#bandwidth_graph').attr('src',strendinMonitorRoot + '/graphs/SNMPThroughput.aspx?sensorid=' + graphID + '&graphstyle=doublesided&width=450&height=70&date=' + d.getTime());
        }
    });
}

function updateTotalTrafficToday(JSONPath1, JSONPath2) {
    // Collect data from both sources
    var inTraffic = 0;
    var outTraffic = 0;

    // Add data together

    var inTrafficSource1 = 0;
    var inTrafficSource2 = 0;
    var outTrafficSource1 = 0;
    var outTrafficSource2 = 0;

    $.getJSON(JSONPath1, function(data) {
        inTrafficSource1 = parseFloat(data.mbintoday);
        outTrafficSource1 = parseFloat(data.mbouttoday);

        $.getJSON(JSONPath2, function(data) {
            inTrafficSource2 = parseFloat(data.mbintoday);
            outTrafficSource2 = parseFloat(data.mbouttoday);
        });

        inTraffic = inTrafficSource1 + inTrafficSource2;
        outTraffic = outTrafficSource1 + outTrafficSource2;

        inTrafficString = '';
        outTrafficString = '';

        if (inTraffic > 1024) {
            inTrafficString = (Math.round((inTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            inTrafficString = inTraffic + ' MB';
        }

        if (outTraffic > 1024) {
            outTrafficString = (Math.round((outTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            outTrafficString = outTraffic + ' MB';
        }

        // Swap them around because the SNMP data is reversed from what we expect
        $('#TOTAL_DATA_in').html(outTrafficString);
        $('#TOTAL_DATA_out').html(inTrafficString);
    });


}

function updateTotalTrafficThisMonth(JSONPath1, JSONPath2) {
    // Collect data from both sources
    var inTraffic = 0;
    var outTraffic = 0;

    // Add data together

    var inTrafficSource1 = 0;
    var inTrafficSource2 = 0;
    var outTrafficSource1 = 0;
    var outTrafficSource2 = 0;

    $.getJSON(JSONPath1, function(data) {
        inTrafficSource1 = parseFloat(data.mbinthismonth);
        outTrafficSource1 = parseFloat(data.mboutthismonth);

        $.getJSON(JSONPath2, function(data) {
            inTrafficSource2 = parseFloat(data.mbinthismonth);
            outTrafficSource2 = parseFloat(data.mboutthismonth);
        });

        inTraffic = inTrafficSource1 + inTrafficSource2;
        outTraffic = outTrafficSource1 + outTrafficSource2;

        inTrafficString = '';
        outTrafficString = '';

        if (inTraffic > 1024) {
            inTrafficString = (Math.round((inTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            inTrafficString = inTraffic + ' MB';
        }

        if (outTraffic > 1024) {
            outTrafficString = (Math.round((outTraffic / 1024) * 1000) / 1000) + ' GB';
        } else {
            outTrafficString = outTraffic + ' MB';
        }

        // Update the title of the box
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        //document.write("The current month is " + monthNames[d.getMonth()]);
        var d = new Date();
        $('#TOTAL_DATA_MONTH_title').html('Internet Traffic for ' + monthNames[d.getMonth()]);

        // Swap them around because the SNMP data is reversed from what we expect
        $('#TOTAL_DATA_MONTH_in').html(outTrafficString);
        $('#TOTAL_DATA_MONTH_out').html(inTrafficString);
    });


}

function updateConnectionWarnings() {
    var JSONPath = dashboardDataCollectorRoot + "/Internet/index.aspx";

    $.getJSON(JSONPath, function(data) {

        var outsideTotal = 3;           // How many are we testing outside
        var outsideFailedCount = 0;     // How many of those failed
        var insideTotal = 3;
        var insideFailedCount = 0;


        if (data.Google != 1)
        {
            outsideFailedCount++;
        }

        if (data.Microsoft != 1)
        {
            outsideFailedCount++;
        }

        if (data.Amazon != 1)
        {
            outsideFailedCount++;
        }

        if (data.LSKYWWW != 1)
        {
            insideFailedCount++;
        }

        if (data.LSKYPortal != 1)
        {
            insideFailedCount++;
        }

        if (data.LSKYHelpDesk != 1)
        {
            insideFailedCount++;
        }

        if (outsideFailedCount >= outsideTotal)
        {
            $('#comms_error_external').removeClass("hidden");
        } else {
            $('#comms_error_external').addClass("hidden");
        }

        if (insideFailedCount >= insideTotal)
        {
            $('#comms_error_internal').removeClass("hidden");
        } else {
            $('#comms_error_internal').addClass("hidden");
        }

    });
}



