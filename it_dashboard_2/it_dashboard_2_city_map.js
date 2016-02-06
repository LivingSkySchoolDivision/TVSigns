function draw_city_map(JSONPath, canvasid) {
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
    imgObj.src = './lsky_city_map.png';
    context.drawImage(imgObj,0,0);
    */


    $.getJSON(JSONPath, function(data) {
        $.each(data.pinglatencysensors, function(sensorID, thisSensor) { 
            // (canvasid, x, y, title, latency, displayPin, pinOnBottom, pinOnRight, customWidth)

            // Ping latency to school servers

            // Specify where the nodes should be
            if (thisSensor.id == 25) {                
                // NBCHS 404 179
                addPingNode(canvasid, 404,179,"NBCHS",thisSensor.lastsuccessfulroundtrip,  thisSensor.health, true,false, false);
            }

            if (thisSensor.id == 9) {            
                // Bready 195 170
                addPingNode(canvasid, 195,170,"Bready", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true, false, true);
            }
            
            
            if (thisSensor.id == 3) {            
                // Lawrence 337 147
                addPingNode(canvasid, 337,147,"Lawrence", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true,false, false);
            }

            
            if (thisSensor.id == 31) {            
                // St Vital 204 727
                addPingNode(canvasid, 204,727,"St Vital", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true,false, true); // This one should be on the left side of the pin
            }
            
            
            if (thisSensor.id == 16) {            
                // Heritage 283 773
                addPingNode(canvasid, 283,773,"Heritage", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true,false, false);
            }
            
            
            if (thisSensor.id == 8) {            
                // Battleford Central 232 727
                addPingNode(canvasid, 232,720,"BCS", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true, true, false);
            }
            
            
            if (thisSensor.id == 13) {            
                // Connaught 389 330
                addPingNode(canvasid, 389,330,"Connaught", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true,false, true);
            }
            
            
            if (thisSensor.id == 22) {            
                // McKitrick 325 214
                addPingNode(canvasid, 325,214,"McKitrick", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true,false, true);
            }
            

            if (thisSensor.id == 6) {            
                // Division Office 434 401
                addPingNode(canvasid, 434,401,"Office", thisSensor.lastsuccessfulroundtrip , thisSensor.health,  true, false, true);
            }




            // Ping latency to alarms
            if (thisSensor.id == 40) {  // Alarm - Division Office
                addAlarmNode(canvasid, thisSensor.id, 434, 401, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, true);
            }

            if (thisSensor.id == 34) {  // Alarm - Lawrence
                addAlarmNode(canvasid, thisSensor.id, 337, 147, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }

            if (thisSensor.id == 48) {  // Alarm - Bready
                addAlarmNode(canvasid, thisSensor.id, 195,170, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }
            
            if (thisSensor.id == 37) {  // Alarm - BCS
                addAlarmNode(canvasid, thisSensor.id, 232,720, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }
            
            if (thisSensor.id == 44) {  // Alarm - Connaught
                addAlarmNode(canvasid, thisSensor.id, 389,330, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }
            
            if (thisSensor.id == 47) {  // Alarm - McKitrick
                addAlarmNode(canvasid, thisSensor.id, 325,214, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }
            
            if (thisSensor.id == 53) {  // Alarm - NBCHS
                addAlarmNode(canvasid, thisSensor.id, 404,179, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }            
            
            if (thisSensor.id == 43) {  // Alarm - STVital
                addAlarmNode(canvasid, thisSensor.id, 204,727, thisSensor.lastsuccessfulroundtrip , thisSensor.health, false, false);
            }
            



        }); 

        //addPingNode(canvasid, 20, 20, "Testing", 123 , 0,  false, false, false);
    });
}