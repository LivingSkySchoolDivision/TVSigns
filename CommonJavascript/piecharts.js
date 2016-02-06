// Pie chart colors
/*
Default:        6CA870, 2966B8
Halloween:      EA8825, C46200
Christmas:      990021, 006d4c
*/

var pie_chart_color_1 = '#6CA870';
var pie_chart_color_2 = '#2966B8';

// Seasonal things
var show_pie_chart_overlay_image = true;
var pie_chart_overlay_image = ''; // Halloween: jackolantern.png

function updateTicketGraphs() {
    d = new Date();
    $('#ticketGraph_7').attr('src','/SysAidReports/Graphs/ticketsByHour.aspx?hours=168&interval=24&graphstyle=line&date=' + d.getTime());
    $('#ticketGraph_30').attr('src','/SysAidReports/Graphs/ticketsByHour.aspx?hours=720&interval=24&graphstyle=bar&date=' + d.getTime());
}

function drawTicketsPieChart(opened, closed, canvasid) {
    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 250;

    var totalTickets = opened + closed;
    var percentOpen = opened / totalTickets;

    var openArcSize = 360 * percentOpen;

    var color_open = pie_chart_color_1; /* 6CA870 */
    var color_closed = pie_chart_color_2; /* 2966B8 */
    var borderColor = "rgba(0,0,0,0)";
    var textColor = "rgba(0,0,0,1)";

    var centerX = (canvas.width / 2) + 0.5;
    var centerY = (canvas.height / 2) + 0.5;
    var chartRadius = (canvas.height / 2) * 0.95;

    context.lineWidth = 2;

    context.strokeStyle =  borderColor;

    /* Draw a background, in case the pie chart doesn't exist because the counts are zero */
    context.fillStyle = "rgba(255,255,255,0.25)";
    context.beginPath();
    context.arc(centerX, centerY, chartRadius, 0, 2 * Math.PI, false);context.textBaseline = "top";
    context.textAlign = "center";
    context.font = "bold 72pt Arial";
    context.fillText("?",centerX, centerY - 40);
    context.closePath();
    context.fill();

    /* Sorry, this is a bit hackie but I'm in a bad mood, and you're stuck with it */
    if ((closed > 0) && (opened == 0)) {
        /* This will draw a circle if either value is 1 and the other is zero */
        context.fillStyle = color_closed;
        context.beginPath();
        context.arc(centerX, centerY, chartRadius, 0, 2 * Math.PI, false);context.textBaseline = "top";
        context.closePath();
        context.fill();
    }

    if ((closed == 0) && (opened > 0)) {
        /* This will draw a circle if either value is 1 and the other is zero */
        context.fillStyle = color_open;
        context.beginPath();
        context.arc(centerX, centerY, chartRadius, 0, 2 * Math.PI, false);context.textBaseline = "top";
        context.closePath();
        context.fill();
    }

    /* Draw the pie slices */
    if ((closed > 0) && (opened > 0)) {
        var startArc = degreesToRadians(0 - (openArcSize / 2));
        var endArc = degreesToRadians(openArcSize / 2);

        context.fillStyle = color_open;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX,centerY, chartRadius, startArc, endArc, false);
        context.closePath();
        context.fill();
        context.stroke();

        context.strokeStyle = borderColor;
        context.fillStyle = color_closed;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX,centerY, chartRadius, endArc, startArc, false);
        context.closePath();
        context.fill();
        context.stroke();
    }

    /* Draw Legend */
    context.lineWidth = 1;
    context.beginPath();

    context.textBaseline = "top";
    context.textAlign = "center";
    context.font = "bold 12pt Droid Sans";

    context.fillStyle = color_closed;
    context.strokeStyle = "#000";
    context.fillRect(5 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.strokeRect(5 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.fillStyle = textColor;

    context.fillText("Closed",45 + 0.5,canvas.height - 20 + 0.5);

    context.fillStyle = color_open;
    context.fillRect(canvas.width - 85 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.strokeRect(canvas.width - 85 + 0.5, canvas.height - 23 + 0.5, 80, 20);
    context.fillStyle = textColor;
    context.fillText("Created",canvas.width - 42 - 0.5, canvas.height - 20 + 0.5);

    /* Boxes for numbers */
    context.fillStyle = "rgba(255,255,255,0.5)";
    context.fillRect(5 + 0.5, canvas.height - 70 + 0.5, 80, 40);
    context.strokeRect(5 + 0.5, canvas.height - 70 + 0.5, 80, 40);
    context.fillRect(canvas.width - 85 + 0.5, canvas.height - 70 + 0.5, 80, 40);
    context.strokeRect(canvas.width - 85 + 0.5, canvas.height - 70 + 0.5, 80, 40);

    context.textAlign = "center";
    context.font = "bold 16pt Droid Sans";
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillText(closed,5.5 + 40, canvas.height - 60);
    context.fillText(opened,canvas.width - 85 + 0.5 + 40, canvas.height - 60);

    context.fill();
    context.stroke();

    // Add cool seasonal pictures to the pie charts
    add_pie_image(context);
}

var newTicketsToday = -1;
var closedTicketsToday = -1;
function updateTicketCounts() {
    var JSONPath = "/LSKYDashboardDataCollector/SysAid/JSONTicketCounts.aspx";
    $.getJSON(JSONPath, function(data) {

        if (
            (newTicketsToday != data.Stats.ServiceRequests.Recent.Today.Created) ||
            (closedTicketsToday != data.Stats.ServiceRequests.Recent.Today.Closed)
            )
        {

            newTicketsToday = data.Stats.ServiceRequests.Recent.Today.Created;
            closedTicketsToday = data.Stats.ServiceRequests.Recent.Today.Closed;
            drawTicketsPieChart(data.Stats.ServiceRequests.Recent.Today.Created  ,data.Stats.ServiceRequests.Recent.Today.Closed ,"Chart_TicketsToday");
            drawTicketsPieChart(data.Stats.ServiceRequests.Recent.Last7Days.Created  ,data.Stats.ServiceRequests.Recent.Last7Days.Closed ,"Chart_TicketsLast7Days");
        }

        //drawTicketsPieChart(data.Stats.ServiceRequests.Recent.Last30Days.Created  ,data.Stats.ServiceRequests.Recent.Last30Days.Closed ,"Chart_TicketsLast30Days");

    });

}