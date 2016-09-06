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