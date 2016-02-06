// Yellow

// Turn level 1 warning at this level
const warningThresholdLevel1 = 50; //50

// Turn level 2 warning at this level
const warningThresholdLevel2 = 150;



/* Translates a latency number into a color */
function translate_border_color(latency, health)
{
    var healthyColor = "#007700";
    var warningLevel1Color = "#E9AB17";
    var warningLevel2Color = "#F87217";
    var offlineColor = "#FF0000";
    var maintenanceColor = "#000077";
    var unknownColor = "#404040";

    var latencyValue = parseInt(latency);
    var healthValue = parseFloat(health);

    // Latency of 0-250 is good (green)
    // Latency of over 250 is concerning (orange)
    // Latency of below zero (-1) is offline (red)

    if (latencyValue == -2)
    {
        return maintenanceColor;
    } else if (latencyValue == -1) {
        return offlineColor;
    } else if (healthValue < 0.1) {
        return offlineColor
    } else if (latencyValue > warningThresholdLevel2) {
        return warningLevel2Color;
    } else if (latencyValue > warningThresholdLevel1) {
        return warningLevel1Color;
    } else if (latencyValue >= 0) {
        return healthyColor
    } else {
        return unknownColor;
    }
}

/* Translates a latency number into a color */
function translate_background_color(latency, health)
{
    var healthyColor = "#229922";
    var warningLevel1Color = "#FFDB58";
    var warningLevel2Color = "#F29D50";
    var offlineColor = "#FF9999";
    var maintenanceColor = "#444499";
    var unknownColor = "#707070";

    var latencyValue = parseInt(latency);
    var healthValue = parseFloat(health);
    // Latency of 0-250 is good (green)
    // Latency of over 250 is concerning (orange)
    // Latency of below zero (-1) is offline (red)

    if (latencyValue == -2)
    {
        return maintenanceColor;
    } else if (latencyValue == -1) {
        return offlineColor;
    } else if (healthValue < 0.1) {
        return offlineColor
    } else if (latencyValue > warningThresholdLevel2) {
        return warningLevel2Color;
    } else if (latencyValue > warningThresholdLevel1) {
        return warningLevel1Color;
    } else if (latencyValue >= 0) {
        return healthyColor
    } else {
        return unknownColor;
    }
}

/* Translates a latency number into a color */
function translate_text_color(latency, health)
{
    var healthyColor = "#000000";
    var queasyColor = "#FF0000";
    var warningLevel1Color = "#000000";
    var warningLevel2Color = "#000000";
    var offlineColor = "#000000";
    var maintenanceColor = "#000000";
    var unknownColor = "#000000";

    var latencyValue = parseInt(latency);
    var healthValue = parseFloat(health);

    // Latency of 0-250 is good (green)
    // Latency of over 250 is concerning (orange)
    // Latency of below zero (-1) is offline (red)

    if (latencyValue == -2)
    {
        return maintenanceColor;
    } else if (latencyValue == -1) {
        return offlineColor;
    } else if (healthValue < 1) {
        return queasyColor
    } else if (healthValue < 0.1) {
        return offlineColor;
    } else if (latencyValue > warningThresholdLevel2) {
        return warningLevel2Color;
    } else if (latencyValue > warningThresholdLevel1) {
        return warningLevel1Color;
    } else if (latencyValue >= 0) {
        return healthyColor
    } else {
        return unknownColor;
    }
}

function addTitle(canvasid, x, y, title) 
{
    var canvas = document.getElementById(canvasid);
    var context = canvas.getContext("2d");

    var adjustedX = x + 0.5;
    var adjustedY = y + 0.5;
    var titleBoxHeight = 20;
    var titleBoxWidth = 130;

    var borderColor = '#151B54';
    var bgColor = '#2B3856';
    var textColor = "#FFFFFF";

    // Draw a box
    context.beginPath();
    context.rect(adjustedX,adjustedY,titleBoxWidth,titleBoxHeight);
    context.fillStyle = bgColor;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = borderColor;
    context.stroke();

    // Draw text
    context.textBaseline = "middle";
    context.font = "bold 12px 'Droid Sans'";
    context.fillStyle = textColor;
    // Draw the title

    context.textAlign = "center";
    context.fillText(title,adjustedX + (titleBoxWidth / 2), adjustedY + (titleBoxHeight / 2));

}

function addPingNode(canvasid, x, y, title, latency, health, displayPin, pinOnBottom, pinOnRight, hideLatency)
{
	var adjustedX = x + 0.5;
	var adjustedY = y + 0.5;

	var canvas = document.getElementById(canvasid);
    var context = canvas.getContext("2d");
    context.font = "bold 12px 'Droid Sans'";    

    // I'll have to set the canvas size, because it royally buggers up otherwise
    if (canvas.width != 610)
        canvas.width = 610;

    if (canvas.height != 900)
        canvas.height = 900;

    // Determine colors
    var borderColor = '#151B54';
    var bgColor = '#2B3856';
    var dataBorderColor = translate_border_color(latency, health);
    var dataBgColor = translate_background_color(latency, health);
    var textColor = "#FFFFFF";

    

    // Determine data text
    var dataText = latency + ' ms';

/*
    if (health < 1) {
        dataText = dataText + '*';
    }
*/
    if (health == 0) {
        dataText = "offline";
    }

    if (latency == -1)
    {
    	dataText = "offline";
    }

    if (latency == -2)
    {
    	dataText = "zombies";
    }

    if (hideLatency == true) 
    {
        dataText = "";
    }

    // pin radius
    var r = 5;

    // text padding 
    var textPadding = 1;

    // Draw a pin, if specified (do this last because pin should be on top)
    if (displayPin == true) {
		context.beginPath();
	    context.arc(x,y,r,0,Math.PI*2,false);
	    context.closePath();
	    context.fillStyle = dataBgColor;
	    context.fill();

	    context.beginPath();
	    context.arc(x,y,r,0,Math.PI*2,false);
	    context.closePath();
        context.lineWidth = 2;
        context.strokeStyle = dataBorderColor;  
	    context.stroke();
    }

    // Draw a box to display data in
    // This box will display both latency and the title
    var titleBoxHeight = 20;
    var titleBoxWidth = 130;
    var latencyBoxWidth = 55;

    var titleBoxX = adjustedX;
    if (pinOnRight == true) {
    	titleBoxX -= titleBoxWidth;
    }

    var titleBoxY = adjustedY;
    if (pinOnBottom == true) {
    	titleBoxY -= titleBoxHeight;
    }

    // Draw the main box
    context.beginPath();
    context.rect(titleBoxX,titleBoxY,titleBoxWidth,titleBoxHeight);
    context.fillStyle = bgColor;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = borderColor;
    context.stroke();

    // Draw the data box
	context.beginPath();
    context.rect(titleBoxX + titleBoxWidth - latencyBoxWidth,titleBoxY,latencyBoxWidth,titleBoxHeight);
    context.fillStyle = dataBgColor;
    context.fill();
    context.strokeStyle = dataBorderColor;
    context.lineWidth = 1;
    context.stroke();

    // Draw text
    context.textBaseline = "middle";
	context.fillStyle = textColor;
    // Draw the title

    context.textAlign = "left";
    context.fillText(title, titleBoxX + textPadding + r, titleBoxY + (titleBoxHeight / 2) + textPadding);
    //context.fill();

    context.font = "bold 10px 'Droid Sans'";   
    // Draw the data
    context.fillStyle = translate_text_color(latency, health);
    context.textAlign = "center";
    context.fillText(dataText,titleBoxX + titleBoxWidth - (latencyBoxWidth / 2), titleBoxY + (titleBoxHeight / 2) + textPadding);
}

function addAlarmNode(canvasid, sensorid, x, y, latency, health, pinOnBottom, pinOnRight)
{

}