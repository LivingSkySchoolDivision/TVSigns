var tickerIndex = -1;
function updateTicker() {
    var JSONPath = dashboardDataCollectorRoot + "/FleetVision/NewestWorkOrders.aspx";

    $.getJSON(JSONPath, function(data) {

        var numTickets = data.Total - 1; // Zero indexed remember, so if there are 5 listed, use 4 here

        tickerIndex++;
        if (tickerIndex > numTickets) {
            tickerIndex = 0;
        }

        $('#ticker').fadeOut('500', function() {
            $('#ticker').html("<b class=\"total_count\">" + data.WorkOrders[tickerIndex].timesince + ":</b> " + data.WorkOrders[tickerIndex].number + ": " + data.WorkOrders[tickerIndex].workrequested + "").fadeIn('500');
        });
    });
}

var newTicketsToday = -1;
var closedTicketsToday = -1;
function updateTicketCounts() {
    var JSONPath = dashboardDataCollectorRoot + "/FleetVision/WorkOrderCounts.aspx"
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

function updateWorkOrderLists() {
    var JSONPath = dashboardDataCollectorRoot + "/FleetVision/NewestWorkOrders.aspx";

    $.getJSON(JSONPath, function(data) {
        $("#workOrders_HighPriority").empty();
        $("#workOrders_HighPriority").append("<tbody></tbody>");

        $("#workOrders_OtherPriority").empty();
        $("#workOrders_OtherPriority").append("<tbody></tbody>");

        $.each(data.WorkOrders, function(categoryIndex, workorder) {
            $("#workOrders_HighPriority > tbody:last").append("<tr><td align=\"left\"><div class='high_priority_wo_name'>"+workorder.number+"</div></td><td align=\"left\"><p>"+workorder.workrequested+"</p></td></tr>");
            if (workorder.priority == "Immediate - Today") {
                $('#workOrders_HighPriority > tbody:last').append("<tr><td align=\"left\">"+workorder.number+"</td><td align=\"left\">"+workorder.workrequested+"</td></tr>");
            } else {
                $("#workOrders_OtherPriority > tbody:last").append("<tr><td align=\"left\"><div class='other_priority_wo_name'>"+workorder.number+"</div></td><td align=\"left\"><p>"+workorder.workrequested+"</p></td></tr>");
            }
        });
    });
}

var pages = [];
var currentPage = 0;
pages[0] = "page1";
pages[1] = "page2";
pages[2] = "page3";

function cyclePages() {
    console.log("Fading out page: " + pages[currentPage] );
    $("#" + pages[currentPage]).fadeOut('500', function() {

        currentPage++;
        if (currentPage >= pages.length) {
            currentPage = 0;
        }

        $("#" + pages[currentPage]).fadeIn();


    });

    /*

    $('#ticker').fadeOut('500', function() {
        $('#ticker').html("<b class=\"total_count\">" + data.Tickets[tickerIndex].timesince + ":</b> " + data.Tickets[tickerIndex].title + " <i>(" + data.Tickets[tickerIndex].requested_by + " - " + data.Tickets[tickerIndex].location + ")</i>").fadeIn('500');
    });
    */

}

// Only show page 1
function initPages() {
     /*
     for (x = 1; x <= pages.length; x++) {
          console.log("Hiding " + pages[x])
           $("#" + pages[x]).fadeOut(1);
     }
     */
     $("#curtain_black").delay(1000).fadeOut(500);
}

function dim() {
     $("#curtain_dim").fadeIn(5000);
}

function undim() {
     $("#curtain_dim").fadeOut(5000);
}
