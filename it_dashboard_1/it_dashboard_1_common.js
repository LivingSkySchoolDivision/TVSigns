function UpdateTicketsPerSchool() {
    var JSONPath = dashboardDataCollectorRoot + "/Jira/TicketsByFacility.aspx";

   $.getJSON(JSONPath, function(data) {
        $("#leftside_table").empty();
        $("#leftside_table").append("<tbody></tbody>");

        $.each(data.Facilities, function(categoryIndex, thisSchool) {
            // Skip schools that we don't care about having on the dashboard
            if (
                (thisSchool.Facility != "Phoenix") &&
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
    var JSONPath = dashboardDataCollectorRoot + "/CiscoWireless/WirelessClients.aspx";

    $.getJSON(JSONPath, function(data) {
        var wifiClients = data["Wireless"]["Authenticated"];

        //wifiClients = 9000;

        $('#wireless_client_count').html(wifiClients);


        $('#wireless_client_last_updated').html("Last updated: " + data["Wireless"]["LastChecked"]);
    });
}

var tickerIndex = -1;
function updateTicker() {
    var JSONPath = dashboardDataCollectorRoot + "/Jira/NewestTickets.aspx";

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

var newTicketsToday = -1;
var closedTicketsToday = -1;
function updateTicketCounts() {
    var JSONPath = dashboardDataCollectorRoot + "/Jira/TicketCounts.aspx"
    $.getJSON(JSONPath, function(data) {

        if (
            (newTicketsToday != data.Stats.ServiceRequests.Recent.Today.Created) ||
            (closedTicketsToday != data.Stats.ServiceRequests.Recent.Today.Closed)
        )
        {
            newTicketsToday = data.Stats.ServiceRequests.Recent.Today.Created;
            closedTicketsToday = data.Stats.ServiceRequests.Recent.Today.Closed
            drawTicketsPieChart(data.Stats.ServiceRequests.Recent.Today.Created  ,data.Stats.ServiceRequests.Recent.Today.Closed ,"Chart_TicketsToday");
            drawTicketsPieChart(data.Stats.ServiceRequests.Recent.Last7Days.Created  ,data.Stats.ServiceRequests.Recent.Last7Days.Closed ,"Chart_TicketsLast7Days");
        }
    });
}