function degreesToRadiansRotated(degrees) {
    return (((degrees - 90) * Math.PI)/180);
}

function degreesToRadians(degrees) {

    // Rotated for christmas season
    //return degreesToRadiansRotated(degrees)

    return (((degrees) * Math.PI)/180);
}

function drawLargeGauge(value, peak, peakdate, maxvalue, label, canvasid)
{
    // bar size = 240 (for this example)
    // 50 value -> 50% -> filledBarInDegrees was 120

    var canvas = document.getElementById(canvasid);
    var context = canvas.getContext('2d');

    var chartRadius = (canvas.height / 2) * 0.9;

    var originX = chartRadius;
    var originY = chartRadius;

    var barSize = 118; /* number of degrees in the bar will be this time 2 */
    var barThickness = 25;

    var percentFilled = value / maxvalue;
    if (percentFilled > 1) {
        percentFilled = 1;
    }

    var filledBarInDegrees = (barSize * 2) * percentFilled;
    //alert(filledBarInDegrees);

    var color_background = "rgba(255,255,255,0.25)"; /* 6CA870 */
    var color_peak = "rgba(255, 255, 255, 0.25)";

    var color_fill = "rgba(255,255,255, 1)"; /* 2966B8 */
    var color_maxed = "rgba(255, 0, 0, 0.8)";
    var color_warning = "rgba(255, 127, 80, 1)";
    var color_good = "rgba(255,255,255, 1)";    

    /* Draw the background */
    var emptyBarStartDegrees = 360-barSize; // 360 represents the very top
    var emptyBarEndDegrees = barSize;
    var emptyBarStartRadians = degreesToRadiansRotated(emptyBarStartDegrees);
    var emptyBarEndRadians = degreesToRadiansRotated(emptyBarEndDegrees);

    context.fillStyle = color_background;
    context.beginPath();
    context.arc(originX, originY, chartRadius,emptyBarStartRadians, emptyBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness, emptyBarEndRadians, emptyBarStartRadians, true);
    context.closePath();
    context.fill();

    /* Draw the filled area */
    var filledBarStartDegrees = 360-barSize;
    var filledBarEndDegrees = 360-barSize + filledBarInDegrees;
    var filledBarStartRadians = degreesToRadiansRotated(filledBarStartDegrees);
    var filledBarEndRadians = degreesToRadiansRotated(filledBarEndDegrees);

    context.fillStyle = color_good;
    var value_warning = maxvalue * 0.75;
    var value_max = maxvalue * 0.95;    
    if (value >= value_warning)
    {
        context.fillStyle = color_warning;
    }
    if (value >= value_max)
    {
        context.fillStyle = color_maxed;
    }

    context.beginPath();
    context.arc(originX, originY, chartRadius, filledBarStartRadians, filledBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness, filledBarEndRadians, filledBarStartRadians, true);
    context.closePath();
    context.fill();


    // Draw peak
    var peakBarThickness = 3;
    var peakBarStartDegrees = (360 - barSize);
    var peakBarPercent = (peak / maxvalue);
    if (peakBarPercent > 1) {
        peakBarPercent = 1;
    }
    var peakBarEndDegrees = (360 - barSize) + ((barSize*2) * peakBarPercent);
    var peakBarStartRadians = degreesToRadiansRotated(peakBarStartDegrees);
    var peakBarEndRadians = degreesToRadiansRotated(peakBarEndDegrees);
    var peakBarHeight = 5;

    context.fillStyle = color_peak;
    context.beginPath();
    context.arc(originX, originY, chartRadius - barThickness - 2, peakBarStartRadians, peakBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness - peakBarHeight - 2, peakBarEndRadians, peakBarStartRadians , true);
    context.closePath();
    context.fill();

    /* Draw the text value */
    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 72pt 'Droid Sans'";
    context.fillStyle = color_fill;
    context.fillText(value,originX, originY);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 28pt 'Droid Sans'";
    context.fillStyle = color_fill;
    context.fillText("mbps",originX, originY + 55);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 12pt 'Droid Sans'";
    context.fillStyle = color_fill;
    context.fillText(label,originX, originY + 85);
    context.closePath();
    context.fill();

    /* Draw the peak text value */
    context.beginPath();
    context.textBaseline = "left";
    context.textAlign = "left";
    context.font = "bold 8pt 'Droid Sans'";
    context.fillStyle = color_peak;
    context.fillText(label + ' peak (12hr): ',0, canvas.height - 48);
    context.fillText(Math.round(peak) + ' mbps',130, canvas.height- 48);
    context.fillText(peakdate,15, canvas.height - 36);
    context.closePath();
    context.fill();

}

function drawSmallGauge(value, peak, peakdate, maxvalue, label, canvasid)
{
    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');


    var chartRadius = (canvas.height / 2) * 0.34;

    var originX = canvas.width - chartRadius;
    var originY = canvas.height - chartRadius;

    var barSize = 120; /* number of degrees in the bar will be this * 2 */
    var barThickness = 10;

    var percentFilled = value / maxvalue;
    if (percentFilled > 1) {
        percentFilled = 1;
    }

    var openArcSize = (barSize * 2) * percentFilled;

    var color_background = "rgba(255,255,255,0.25)"; /* 6CA870 */
    var color_fill = "rgba(255,255,255,1)"; /* 2966B8 */
    var color_peak = "rgba(255, 255, 255, 0.25)";

    var color_maxed = "rgba(255, 0, 0, 0.8)";
    var color_warning = "rgba(255, 127, 80, 0.8)";
    var color_good = "rgba(255, 127, 80, 0.8)";    

    /* Draw the background */
    context.fillStyle = color_background;
    context.beginPath();
    context.arc(originX, originY, chartRadius, degreesToRadiansRotated(360-barSize), degreesToRadiansRotated(barSize), false);
    context.arc(originX, originY, chartRadius - barThickness, degreesToRadiansRotated(barSize), degreesToRadiansRotated(360 - barSize), true);
    context.closePath();
    context.fill();

    /* Draw the filled area */    
    var value_warning = maxvalue * 0.75;
    var value_max = maxvalue * 0.95;
    context.fillStyle = color_fill;
    if (value >= value_warning)
    {
        context.fillStyle = color_warning;
    }
    if (value >= value_max)
    {
        context.fillStyle = color_maxed;
    }
    context.beginPath();
    context.arc(originX, originY, chartRadius, degreesToRadiansRotated(360-barSize), degreesToRadiansRotated(360-barSize + openArcSize), false);
    context.arc(originX, originY, chartRadius - barThickness, degreesToRadiansRotated(360-barSize + openArcSize), degreesToRadiansRotated(360 - barSize), true);
    context.closePath();
    context.fill();

    var peakBarThickness = 3;
    var peakBarStartDegrees = (360 - barSize);
    var peakBarPercent = (peak / maxvalue);
    if (peakBarPercent > 1) {
        peakBarPercent = 1;
    }
    var peakBarEndDegrees = (360 - barSize) + ((barSize*2) * peakBarPercent);
    var peakBarStartRadians = degreesToRadiansRotated(peakBarStartDegrees);
    var peakBarEndRadians = degreesToRadiansRotated(peakBarEndDegrees);
    var peakBarHeight = 3;

    context.fillStyle = color_peak;
    context.beginPath();
    context.arc(originX, originY, chartRadius - barThickness - 1, peakBarStartRadians, peakBarEndRadians, false);
    context.arc(originX, originY, chartRadius - barThickness - peakBarHeight - 1, peakBarEndRadians, peakBarStartRadians , true);
    context.closePath();
    context.fill();

    /* Draw the text value */
    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 32pt 'Droid Sans'";
    context.fillStyle = color_fill;
    context.fillText(value,originX, originY);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 12pt 'Droid Sans'";
    context.fillStyle = color_fill;
    context.fillText("mbps",originX, originY + 25);
    context.closePath();
    context.fill();

    context.beginPath();
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = "bold 8pt 'Droid Sans'";
    context.fillStyle = color_fill;
    context.fillText(label,originX, originY + 40);
    context.closePath();
    context.fill();

    /* Draw the peak text value */
    context.beginPath();
    context.textBaseline = "left";
    context.textAlign = "left";
    context.font = "bold 8pt 'Droid Sans'";
    context.fillStyle = color_peak;
    context.fillText(label + ' peak (12hr): ',0 , canvas.height - 24);
    context.fillText(Math.round(peak) + ' mbps',130, canvas.height- 24);
    context.fillText(peakdate,15, canvas.height - 12);
    context.closePath();
    context.fill();
}

function drawBandwidthGauge(value_large, peak_large, peakdate_large, maxvalue_large, label_large, value_small, peak_small, peakdate_small, maxvalue_small, label_small, canvasid) {
    canvas = document.getElementById(canvasid);
    context = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 275;

    // Clear the canvas
    // I think setting the width and height ends up clearing the canvas

    // Draw the "Main" gauge
    drawLargeGauge(value_large, peak_large, peakdate_large, maxvalue_large, label_large, canvasid);

    // Draw the "Small" gauge
    drawSmallGauge(value_small, peak_small, peakdate_small, maxvalue_small, label_small, canvasid);
}

function updateBandwidthGauge() {
    var JSONPath = strendinMonitorJSONRoot + "/JSON/ByHost.aspx?hostid=1";
    // Internet traffic currently comes in via two sensors
    // Figure out which one has the higher value, and display that one

    var bpsInValue = 0;
    var bpsInString = "";

    var bpsOutValue = 0;
    var bpsOutString = "";

    var peakbpsin = 0;
    var peakbpsout = 0;

    var peakdate_in = '';
    var peakdate_out = '';

    $.getJSON(JSONPath, function(data) {
        $.each(data.snmpthroughputsensors, function(sensorID, thisSensor) {
            if (thisSensor.bitspersecondin > bpsInValue) {
                bpsOutValue = thisSensor.bitspersecondout;
                bpsOutString = thisSensor.humanfriendlybpsout;
                bpsInValue = thisSensor.bitspersecondin;
                bpsInString = thisSensor.humanfriendlybpsin;
                peakbpsin = thisSensor.peakmbpsinlasttwelvehours;
                peakbpsout = thisSensor.peakmbpsoutlasttwelvehours;
                peakdate_in = thisSensor.peakindatelasttwelvehours;
                peakdate_out = thisSensor.peakoutdatelasttwelvehours;
            }
        });

        // Traffic on the ports is reveresed from what we expect, which is why "in" goes to "out"
        /*
        $('#internet_traffic_in').html(bpsOutString);
        $('#internet_traffic_out').html(bpsInString);
        */

        var mbpsInValue = 0;
        var mbpsOutValue = 0;

        if (bpsInValue > 0)
        {
            mbpsInValue = Math.round(bpsInValue / 1000 / 1000);
        } else {
            mbpsInValue = "<1";
        }

        if (bpsOutValue > 0)
        {
            mbpsOutValue = Math.round(bpsOutValue / 1000 / 1000);
        } else {
            mbpsOutValue = "<1";
        }

        if (bpsOutValue / 1000 / 1000 < 1)
        {
            mbpsOutValue = '<1';
        }

        if (bpsInValue / 1000 / 1000 < 1)
        {
            mbpsInValue = '<1';
        }

        drawBandwidthGauge(mbpsOutValue, peakbpsout, peakdate_out, "1000", "Inbound", mbpsInValue, peakbpsin, peakdate_in, "1000", "Outbound", "bandwidth_meter");
        //drawBandwidthGauge("999", "100", "Traffic In", "999", "100", "Traffic Out", "bandwidth_meter");

    });

    // Convert the bits per second into megabits per second

}