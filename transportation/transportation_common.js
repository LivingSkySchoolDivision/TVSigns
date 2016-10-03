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

var workOrderTables = [];
workOrderTables[0] = "workOrders_1";
workOrderTables[1] = "workOrders_2";

workOrderTables[2] = "workOrders_3";
workOrderTables[3] = "workOrders_4";

workOrderTables[4] = "workOrders_5";
workOrderTables[5] = "workOrders_6";

var pagesUsed = 1;
var maxWorkOrdersPerColumn = 6;

function updateWorkOrderLists() {
    var JSONPath = dashboardDataCollectorRoot + "/FleetVision/NewestWorkOrders.aspx";

    var displayedWorkOrders = 0;
    var currentWorkOrderColumn = 0;

    $.getJSON(JSONPath, function(data) {

        for (x = 0; x <= workOrderTables.length; x++) {
            $("#" + workOrderTables[x]).empty();
            $("#" + workOrderTables[x]).append("<tbody></tbody>");
        }

        $.each(data.WorkOrders, function(categoryIndex, workorder) {
            if (currentWorkOrderColumn < workOrderTables.length) {

                var wo_content_font_size_style = "wo_content_font_normal";

                if (workorder.workrequested.length > 64) {
                    wo_content_font_size_style = "wo_content_font_small";
                }

                $("#" + workOrderTables[currentWorkOrderColumn] + " > tbody:last").append("<tr><td align=\"left\" style='vertical-align: top;'><div class='wo_ID'>" + workorder.vehicle + "</div><div class='wo_Priority'>" + workorder.priority + "</div></td><td align=\"left\" style='vertical-align: top;'><div class='wo_Content " + wo_content_font_size_style + "'>" + workorder.workrequested + "</div></td></tr>");

            }

            displayedWorkOrders++;
            if (displayedWorkOrders >= maxWorkOrdersPerColumn) {
                displayedWorkOrders = 0;
                currentWorkOrderColumn++;
            }
        });

        // How many pages did we use up
        pagesUsed = (currentWorkOrderColumn + 1) / 2;
    });
}

var pages = [];
var currentPage = 0;
pages[0] = "workorders_page_1";
pages[1] = "workorders_page_2";
pages[2] = "workorders_page_3";
pages[3] = "inspections_page";
//pages[4] = "text_page";

function cyclePages() {
    console.log("Fading out page: " + pages[currentPage] );
    $("#" + pages[currentPage]).fadeOut('500', function() {

        currentPage++;

        // Skip blank work order pages
        if (currentPage == 1) {
            if (pagesUsed < 2) {
                currentPage++;
            }
        }

        if (currentPage == 2) {
            if (pagesUsed < 3) {
                currentPage++;
            }
        }


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


function updateSGIInspections() {
    var JSONPath = dashboardDataCollectorRoot + "/Versatrans/UpcomingBusInspections.aspx";


    $.getJSON(JSONPath, function(data) {
        var font_style = "sgi_medium_text";
        if ((data.TotalThisMonth + data.TotalOverdue) < 15) {
            font_style = "sgi_big_text";
        }

        $("#month_name").html(" in " + data.MonthName)

        $("#sgi_insepections_list").html("")

        $.each(data.Overdue, function(index, cert) {
            $("#sgi_insepections_list").append("<div class='sgi_inspection_overdue " + font_style + "'>" + cert.Vehicle + "</div>");
        });

        $.each(data.ThisMonth, function(index, cert) {
            $("#sgi_insepections_list").append("<div class='sgi_inspection_normal " + font_style + "'>" + cert.Vehicle + "</div>");
        });
    });

}