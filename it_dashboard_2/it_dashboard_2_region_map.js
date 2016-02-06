function draw_region_map(JSONPath, canvasid) {
	// Load JSON data
    canvas = document.getElementById(canvasid);
    if (canvas.width != 610)
        canvas.width = 610;

    if (canvas.height != 900)
        canvas.height = 900;
    
    context = canvas.getContext('2d');
	
	// Insert the backgroudn image
	/* This doesn't appear to work 
    var imgObj = new Image();
    imgObj.src = './lsky_region_map.png';
    context.drawImage(imgObj,0,0);
    */

    $.getJSON(JSONPath, function(data) {
        $.each(data.pinglatencysensors, function(sensorID, thisSensor) { 

            // (canvasid, x, y, title, latency, displayPin, pinOnBottom, pinOnRight, customWidth)

            // Specify where the nodes should be
            if (thisSensor.id == 23) { 
                // McLurg 281 512    
                addPingNode(canvasid, 281,508,"McLurg",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, false);
            }


            if (thisSensor.id == 26) { 
                // Norman Carter 281 487    
                addPingNode(canvasid, 281,483,"NCES",thisSensor.lastsuccessfulroundtrip, thisSensor.health, false, true, false);
            }


            if (thisSensor.id == 29) { 
                // UCHS 190 498    
                addPingNode(canvasid, 190,498,"UCHS",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, true);
            }


            if (thisSensor.id == 30) { 
                // UPS 190 473    
                addPingNode(canvasid, 190,473,"UPS",thisSensor.lastsuccessfulroundtrip, thisSensor.health, false, true, true);
            }


            if (thisSensor.id == 12) { 
                // CKHS 226 401    
                addPingNode(canvasid, 226,401,"CKHS",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, true);
            }


            if (thisSensor.id == 11) { 
                // CKES 226 376    
                addPingNode(canvasid, 226,376,"CKES",thisSensor.lastsuccessfulroundtrip, thisSensor.health, false, true, true);
            }


            if (thisSensor.id == 17) { 
                // Kerrobert 185 666    
                addPingNode(canvasid, 186,666,"Kerrobert",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, false);
            }


            if (thisSensor.id == 19) { 
                // Luseland 140 612    
                addPingNode(canvasid, 140,612,"Luseland",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, false);
            }

/*
            if (thisSensor.id == 2) { 
                // Major 92 676    
                addPingNode(canvasid, 92,676,"Major",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, false, false);
            }

*/
            if (thisSensor.id == 20) { 
                // Macklin 36 521    
                addPingNode(canvasid, 36,521,"Macklin",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, false, false);
            }


            if (thisSensor.id == 24) { 
                // Medstead 418, 229    
                addPingNode(canvasid, 418,229,"Medstead",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, false, true);
            }


            if (thisSensor.id == 28) { 
                // SHS 529, 212    
                addPingNode(canvasid, 529,212,"SHS",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, true);
            }


            if (thisSensor.id == 15) { 
                // HCES    
                addPingNode(canvasid, 529,187,"HCES",thisSensor.lastsuccessfulroundtrip, thisSensor.health, false, true, true);
            }


            if (thisSensor.id == 14) { 
                // Hafford 551 419        
                addPingNode(canvasid, 551,419,"Hafford",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, true); // Needs to be on left side of the pin
            }


            if (thisSensor.id == 21) { 
                // Maymont 481 470        
                addPingNode(canvasid, 481,470,"Maymont",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, false); // Needs to be on left side of the pin
            }


            if (thisSensor.id == 10) { 
                // Cando 378 527    
                addPingNode(canvasid, 378,527,"Cando",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, false, false);
            }


            if (thisSensor.id == 18) { 
                // Leoville (525, 125)    
                addPingNode(canvasid, 525,125,"Leoville",thisSensor.lastsuccessfulroundtrip, thisSensor.health, true, true, true);
            }       

            // Alarms
            if (thisSensor.id == 49) {  // Alarm - Leoville
                // Division Office 434 401
                addAlarmNode(canvasid, thisSensor.id, 525,125, thisSensor.lastsuccessfulroundtrip , thisSensor.health, true, true);
            }      

        });
            // Place a legend
            /*
            var legendX = 90;
            var legendY = 50;
            addTitle(canvasid, legendX, legendY, 'Ping Latency (ms)');
            addPingNode(canvasid, legendX, legendY + 30, '0-' + warningThresholdLevel1, 1, 11, false, false, false, true);
            addPingNode(canvasid, legendX, legendY + 60, warningThresholdLevel1 + '-' + warningThresholdLevel2, warningThresholdLevel1+1, 1, false, false, false, true);
            addPingNode(canvasid, legendX, legendY + 90, warningThresholdLevel2 + '+', warningThresholdLevel2+1, 1, false, false, false, true);
            addPingNode(canvasid, legendX, legendY + 120, 'Offline', -1, 1, false, false, false, true);   
            */
    });

}
