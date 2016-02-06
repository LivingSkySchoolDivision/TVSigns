

function UpdateTicketsPerSchool() {
    var JSONPath = "/lskydashboarddatacollector/Jira/TicketsByFacility.aspx"

   $.getJSON(JSONPath, function(data) {
        $('#leftside_table').empty();
        $('#leftside_table').append("<tbody></tbody>");
        
        $.each(data.Facilities, function(categoryIndex, thisSchool) {
            if (
                (thisSchool.Facility != "Lakeview Colony") &&
                (thisSchool.Facility != "Hillsvale Colony") &&
                (thisSchool.Facility != "Scott Colony") &&
                (thisSchool.Facility != "Meadow Lake Christian Academy")
                ) 
            {
                var facilityCount = thisSchool.Unresolved;
                if (thisSchool.Unresolved == 0) {
                    facilityCount = "<span style=\"color: rgba(255,255,255,0.1);\">0</span>";
                }

                var facilityName = thisSchool.Facility;
                if (thisSchool.Unresolved == 0) {
                    facilityName = "<span style=\"color: rgba(255,255,255,0.2);\">" + thisSchool.Facility + "</span>";
                }

                $('#leftside_table > tbody:last').append("<tr><td align=\"left\">"+facilityName+"</td><td align=\"left\">"+facilityCount+"</td></tr>");
            }
        });

        //$('#leftside_table > tbody:last').append("<tr><td><b>Total Unresolved</b></td><td align=\"right\"><b class=\"total_count\">"+data.TotalUnresolved+"</b></td></tr>");

    });
}


function updateWirelessCount(JSONPath) {
    var JSONPath = "/LSKYDashboardDataCollector/CiscoWireless/WirelessClients.aspx"

    $.getJSON(JSONPath, function(data) {
        var wifiClients = data["Wireless"]["Authenticated"];

        //wifiClients = 9000;

        $('#wireless_client_count').html(wifiClients);


        $('#wireless_client_last_updated').html("Last updated: " + data["Wireless"]["LastChecked"]);
    });
}

function updateBandwidthUsers(JSONPath) {
    var maxEntries = 7;
    $.getJSON(JSONPath, function(data) {
        /* Clear the existing table rows */
        $('#bandwidth_users_table').empty();
        $('#bandwidth_users_table').append("<tbody></tbody>");

        var numEntries = 0;
        $.each(data.TopBandwidthUsers, function(NotUsed, thisEntry) {
            numEntries++;
            if (numEntries <= maxEntries) {
                $('#bandwidth_users_table > tbody:last').append("<tr><td style=\"text-align: left; border-bottom: 1px dashed rgba(255,255,255,0.1); font-size: 14pt;\">"+thisEntry.Name+"</td><td style=\"text-align: right; border-bottom: 1px dashed rgba(255,255,255,0.1); font-size: 12pt;\">"+thisEntry.Bytes+" kbps</td></tr>");
            }
        });
    });
}

var tickerIndex = -1;
function updateTicker() {
    var JSONPath = "/lskydashboarddatacollector/Jira/NewestTickets.aspx"

    $.getJSON(JSONPath, function(data) {

        var numTickets = data.Total - 1; // Zero indexed remember, so if there are 5 listed, use 4 here

        tickerIndex++;
        if (tickerIndex > numTickets) {
            tickerIndex = 0;
        }


        $('#ticker').fadeOut('500', function() {
            $('#ticker').html("<b class=\"total_count\">" + data.Tickets[tickerIndex].timesince + ":</b> " + data.Tickets[tickerIndex].title + " <i>(" + data.Tickets[tickerIndex].requested_by + " - " + data.Tickets[tickerIndex].location + ")</i>").fadeIn('500');
        });
    });
}