function add_snmp_sensor_node(sidebar, idnum, title, health, inbits, outbits, megainbits, megaoutbits, notes, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut) {
    // Create a node, then update it
    var htmlcode = '';
    htmlcode += '';
    htmlcode += '<div class="sensor_node" id="SNMP_NODE_' + idnum + '">';
    htmlcode += '<div class="sensor_node_title" id="SNMP_NODE_' + idnum + '_title"></div>';
    htmlcode += '<table border=0 cellpadding=0 cellspacing=2 class="sensor_node_table">';

    htmlcode += '<tr id="SNMP_NODE_SNMPDATA_TITLES_' + idnum + '">';
    htmlcode += '<td class="sensor_node_info" width="50">inbound</td>';
    htmlcode += '<td class="sensor_node_info" width="50">outbound</td>';
    htmlcode += '</tr>';

    htmlcode += '<tr id="SNMP_NODE_SNMPDATA_DATA_' + idnum + '">';
    htmlcode += '<td class="sensor_node_data" width="112" id="SNMP_NODE_' + idnum + '_inbits"></td>';
    htmlcode += '<td class="sensor_node_data" width="112" id="SNMP_NODE_' + idnum + '_outbits"></td>';
    htmlcode += '</tr>';
    htmlcode += '<tr id="SNMP_NODE_ERRORDATA_' + idnum + '" class="hidden">';
    htmlcode += '<td colspan="4" class="sensor_node_data_error" width="112"><div style="display: inline; text-align: center;" id="SNMP_NODE_' + idnum + '_error"></div></td>';
    htmlcode += '</tr>';
    htmlcode += '</table>';
    htmlcode += '</div>';
    $(sidebar).append(htmlcode);
    update_snmp_sensor_node(sidebar, idnum, title, health, inbits, outbits, megainbits, megaoutbits, notes, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut);

}

function update_snmp_sensor_node(sidebar, id, title, health, inbits, outbits, megain, megaout, err, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut) {

    if (doesElementExist('SNMP_NODE_' + id) == true) {
        // If the sensor DIV exists, upate it (otherwise create it, below)

        var displayTitle = title;

        if ((trafficPeakIn > connectionLimitIn) || (trafficPeakOut > connectionLimitOut)) {
            displayTitle += ' <small style="font-size: 6pt; color: rgba(255,255,255,0.2);">M</small>';
        }

        // Indicate if the in/out values are reversed (but make it super hard to notice unless you're looking for it)
        if (rev == true) {
            displayTitle += ' <small style="font-size: 6pt; color: rgba(255,255,255,0.2);">R</small>';
        }


        var displayStringIn = "";
        var displayStringOut = "";
        var isError = false;

        //

        if (health < 1) {
            if (health == 0) {
                $('#SNMP_NODE_' + id).addClass("offline_node");
                $('#SNMP_NODE_' + id + '_title').addClass("offline_node_title");
                $('#SNMP_NODE_' + id).removeClass("warning_node");
                $('#SNMP_NODE_' + id + '_title').removeClass("warning_node_title");
                isError = true;
            } else {
                $('#SNMP_NODE_' + id).addClass("warning_node");
                $('#SNMP_NODE_' + id + '_title').addClass("warning_node_title");
                $('#SNMP_NODE_' + id).removeClass("offline_node");
                $('#SNMP_NODE_' + id + '_title').removeClass("offline_node_title");
            }
        } else {
            $('#SNMP_NODE_' + id).removeClass("offline_node");
            $('#SNMP_NODE_' + id + '_title').removeClass("offline_node_title");
            $('#SNMP_NODE_' + id).removeClass("warning_node");
            $('#SNMP_NODE_' + id + '_title').removeClass("warning_node_title");
        }

        // Color the node for maintenance if required
        if ((inbits == -2) || (outbits == -2)) {
            $('#SNMP_NODE_' + id).addClass("maintenance_node");
        } else {
            $('#SNMP_NODE_' + id).removeClass("maintenance_node");
        }

        // Color the node if both connections are idle
        if ((megaout == 0) && (megain == 0))
        {
            $('#SNMP_NODE_' + id).addClass("idle_node");
        } else {
            $('#SNMP_NODE_' + id).removeClass("idle_node");
        }

        // Color the data fields if connections are >= peak
        if (megain >= (connectionLimitIn * 0.9))
        {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_outbits').addClass("data_peak");
            } else {
                $('#SNMP_NODE_' + id + '_inbits').addClass("data_peak");
            }

        } else {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_outbits').removeClass("data_peak");
            } else {
                $('#SNMP_NODE_' + id + '_inbits').removeClass("data_peak");
            }
        }

        if (megaout >= (connectionLimitOut * 0.9))
        {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_inbits').addClass("data_peak");
            } else {
                $('#SNMP_NODE_' + id + '_outbits').addClass("data_peak");
            }
        } else {
            if (rev == true)
            {
                $('#SNMP_NODE_' + id + '_inbits').removeClass("data_peak");
            } else {
                $('#SNMP_NODE_' + id + '_outbits').removeClass("data_peak");

            }
        }

        displayStringOut = parseFloat(megaout).toFixed(2) + ' mbps';
        displayStringIn = parseFloat(megain).toFixed(2) + ' mbps';

        if (megain == 0) {
            displayStringIn = "idle";
        }

        if (megaout == 0) {
            displayStringOut = "idle";
        }

        if (inbits == 0) {
            displayStringIn = 'idle';
        }

        if (outbits == 0) {
            displayStringOut = 'idle';
        }


        if (rev == true) {
            var temp = displayStringIn;
            displayStringIn = displayStringOut;
            displayStringOut = temp;
        }

        if (isError) {
            $('#SNMP_NODE_SNMPDATA_TITLES_' + id).addClass("hidden");
            $('#SNMP_NODE_SNMPDATA_DATA_' + id).addClass("hidden");
            $('#SNMP_NODE_ERRORDATA_' + id).removeClass("hidden");
        } else {
            $('#SNMP_NODE_ERRORDATA_' + id).addClass("hidden");
            $('#SNMP_NODE_SNMPDATA_TITLES_' + id).removeClass("hidden");
            $('#SNMP_NODE_SNMPDATA_DATA_' + id).removeClass("hidden");
        }

        $('#SNMP_NODE_' + id + '_inbits').html(displayStringIn);
        $('#SNMP_NODE_' + id + '_outbits').html(displayStringOut);
        $('#SNMP_NODE_' + id + '_title').html(displayTitle);
        $('#SNMP_NODE_' + id + '_error').html(err);
        $('#SNMP_NODE_' + id + '').css("background-image", "url(" + strendinMonitorRoot + "/Graphs/SNMPThroughput.aspx?sensorid=" + id + "&height=40&width=340&hours=6&semitrans=true&graphstyle=doublesided&maxvalue=" + connectionLimitIn + ")");


    } else {
        // If the sensor DIV doesn't exist, create it
        add_snmp_sensor_node(sidebar, id, title, health, inbits, outbits, megain, megaout, err, rev, connectionLimitIn, connectionLimitOut, trafficPeakIn, trafficPeakOut)
    }
}