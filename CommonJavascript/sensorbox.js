var locationDivContainerName = "#sensorbox_container";
var divPrefix = "#location_";
var snmpGraphPrefix = "#SNMPGraph_";
var pingGraphPrefix = "#PingGraph_";
var snmpValuePrefix = "#SNMPValue_";
var pingValuePrefix = "#PingValue_";
var pingStatusPrefix = "#PingStatus_";
var snmpSectionPrefix = "#SNMPSection_";
var timestamp = (new Date()).getTime();
var graphHoursToPull = 8;

var KnownSNMPGraphIDs = [];
var KnownPingGraphIDs = [];
var SNMPMaxValues = [];

function UpdateAllSensorValues() {
// Get the JSON data for this host
	// https://status.lskysd.ca/strendinmonitor/JSON/ByHost.aspx?hostid=5
	// The DIV IDs should all be set up to receive data

	//var JSONPath = strendinMonitorJSONRoot + "/JSON/ByHost.aspx?hostid=" + HostID;
	// https://status.lskysd.ca/strendinmonitor/JSON/allSensors.aspx

	//try {
		var JSONPath = strendinMonitorJSONRoot + "/JSON/allSensors.aspx";
		console.log("Fetching " + JSONPath);
		$.getJSON(JSONPath, function(data) {
			console.log("Processing " + JSONPath);
			$.each(data.pinglatencysensors, function(derp, thisSensor) {
				// For each sensor returned, check to see if there is a div named with that IP
				// Ping Values
				var valudDIVID = pingValuePrefix + thisSensor.id
				if ($(valudDIVID).length !== 0) {

					// A div with this ID exists, try to update it
					$(valudDIVID).html(thisSensor.lastroundtrip + "ms");
				}

				var statusDIVID = pingStatusPrefix + thisSensor.id
				// Ping Statuses
				if ($(statusDIVID).length !== 0) {
					// For statuses, we just need to apply a CSS class appropriate to it's health

					// Potential health values:
					//   1			Healthy
					// 0.0 - 0.9	Queasy
					//   0			Offline
					//  -1			Problem

					$(statusDIVID).removeClass("sensorbox_health_online");
					$(statusDIVID).removeClass("sensorbox_health_offline");
					$(statusDIVID).removeClass("sensorbox_health_queasy");
					$(statusDIVID).removeClass("sensorbox_health_error");

					if (thisSensor.health == 1) {
						$(statusDIVID).addClass("sensorbox_health_online");
					} else if (thisSensor.health == 0) {
						$(statusDIVID).addClass("sensorbox_health_offline");
					} else if (thisSensor.health == -1) {
						$(statusDIVID).addClass("sensorbox_health_error");
					} else if (thisSensor.health < 1) {
						$(statusDIVID).addClass("sensorbox_health_queasy");
					}

				}

			});

			$.each(data.snmpthroughputsensors, function(derp, thisSensor) {
				// SNMP Values

				// in
				var divID = snmpValuePrefix + thisSensor.id
				if ($(divID + "_in").length !== 0) {
					$(divID + "_in").html(thisSensor.humanfriendlybpsin);
				}

				// out
				if ($(divID + "_out").length !== 0) {
					$(divID + "_out").html(thisSensor.humanfriendlybpsout);
				}

				// Last seen
				if ($(divID + "_lastseen").length !== 0) {
					$(divID + "_lastseen").html(thisSensor.lastsuccess);
				}


				/*
				// peak in
				if ($(divID + "_peakin").length !== 0) {
					$(divID + "_peakin").html(thisSensor.peakmbpsinlastday);
				}

				// peak out
				if ($(divID + "_peakout").length !== 0) {
					$(divID + "_peakout").html(thisSensor.peakmbpsoutlastday);
				}

				// MB IN
				if ($(divID + "_mbin").length !== 0) {
					$(divID + "_mbin").html(thisSensor.mbinlastday);
				}

				// MB Out
				if ($(divID + "_mbout").length !== 0) {
					$(divID + "_mbout").html(thisSensor.mboutlastday);
				}
				*/

				// Check to see if we need to indicate that this sensor is offline or not
				if (thisSensor.health <= 0) {
					$(divID + "_offline").addClass("sensorbox_hidden");
					$(divID + "_online").removeClass("sensorbox_hidden");
				} else {
					$(divID + "_offline").removeClass("sensorbox_hidden");
					$(divID + "_online").addClass("sensorbox_hidden");
				}
			});
		});
	//}
	/*catch (e) {
		document.write(e.message);
	}//*/
}

function UpdateAllSensorGraphs() {
	//try {
		// For each graph we know about (from the initilization function storing them in a list):
		//  - Check to see if a graph with that ID exists
		//  - If one does, reload it's source

		for (var x = 0; x < KnownSNMPGraphIDs.length; x++) {
			var routerSNMPID = KnownSNMPGraphIDs[x];

			var graphMax = 0;
			for(var c = 0; c < SNMPMaxValues.length; c++) {
				if (SNMPMaxValues[c].id == routerSNMPID) {
					console.log("found that max for " + routerSNMPID + " is " + SNMPMaxValues[c].max);
					graphMax = SNMPMaxValues[c].max;
				}
			}

			var divID = snmpGraphPrefix + routerSNMPID;
			if ($(divID).length !== 0) {
				$(divID).attr("src",strendinMonitorGraphRoot + "/Graphs/SNMPThroughput.aspx?sensorid=" + routerSNMPID + "&showworkday=true&height=40&width=3460&hours=" + graphHoursToPull + "&graphstyle=filledline&maxvalue=" + graphMax + "&showhours=true&preventCache=" + timestamp);
			}
		};

		for (var x = 0; x < KnownPingGraphIDs.length; x++) {
			var serverPingID = KnownPingGraphIDs[x];
			var divID = pingGraphPrefix + "" + serverPingID;
			if ($(divID).length !== 0) {
				$(divID).attr("src",strendinMonitorGraphRoot + "/Graphs/PingLatency.aspx?sensorid=" + serverPingID + "&showworkday=true&graphstyle=onoff&height=1&width=346&showhourlines=false&showworkday=true&hours=" + graphHoursToPull + "");
			}
		};
	//}
	/*catch (e) {
		document.write(e.message);
	}//*/
}


function InitializeLocationBox(divName,locationName,SNMPGraphMax,HostID,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID,UTEC) {

	//try {
		var adjustedDivName = divPrefix + divName;
		// Check if the div exists, or if we have to create it

		//console.log("Updating " + adjustedDivName);

		if (!($(adjustedDivName).length !== 0)) {
			// No div, create a new one
			AddLocationBox(adjustedDivName,locationName,SNMPGraphMax,HostID,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID,UTEC);
		}
	//}
	/*catch (e) {
		document.write(e.message);
	}//*/
}

/*
var snmpGraphPrefix = "#SNMPGraph_";
var pingGraphPrefix = "#PingGraph_";
var snmpValuePrefix = "#SNMPValue_";
var pingValuePrefix = "#PingValue_";
var pingStatusPrefix = "#PingStatus_";
*/

function ArrayContains(haystack,needle) {
	for (var x = 0; x < KnownSNMPGraphIDs.length; x++) {
		if (haystack[x] == needle) {
			return true;
		}
	}
	return false;
}


function AddToArray(existingarray,newitem) {
	existingarray.push(newitem);
}

function AddLocationBox(divName,locationName,SNMPGraphMax,HostID,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID,UTEC) {
	//try {
		var adjustedDivName=removeFirstCharacter(divName);

		var snmpGraphID = removeFirstCharacter(snmpGraphPrefix) + routerSNMPID;
		var pingGraphID = removeFirstCharacter(pingGraphPrefix) + serverPingID;

		if (routerSNMPID > 0) {
			// Check to see if we know about this ID already
			if (!ArrayContains(KnownSNMPGraphIDs,routerSNMPID)) {
				AddToArray(KnownSNMPGraphIDs,routerSNMPID);
			}
		}

		if (serverPingID > 0) {
			if (!ArrayContains(KnownPingGraphIDs,serverPingID)) {
				AddToArray(KnownPingGraphIDs,serverPingID);
			}
		}

		SNMPMaxValues.push({ id: routerSNMPID, max: SNMPGraphMax });

		var htmlCode = '';
		htmlCode += "	<div class='sensorbox' id='"+adjustedDivName+"'>";
		htmlCode += "        <div class='sensorbox_name'>" + locationName + "</div>";

		if (routerSNMPID > 0) {
			htmlCode += "    <!-- SNMP -->";
			htmlCode += "    <div class='sensorbox_snmp_section' id='" + removeFirstCharacter(snmpSectionPrefix) + routerSNMPID + "'>";


			htmlCode += "        <!-- SNMP Offline section -->";
			htmlCode += "        <div class='sensorbox_snmp_section sensorbox_hidden' id='" + removeFirstCharacter(snmpSectionPrefix) + routerSNMPID + "_offline'>";
			htmlCode += "        	<div class='sensorbox_snmp_offline_section'>";
			htmlCode += "         		<div class='sensorbox_snmp_offline_section_title'>OFFLINE</div>";
			htmlCode += "         		<div class='sensorbox_snmp_offline_section_lastseen' id='" + removeFirstCharacter(snmpSectionPrefix) + routerSNMPID + "_lastseen'></div>";
			htmlCode += "         	</div>";
			htmlCode += "        </div>";

			htmlCode += "        <div class='sensorbox_snmp_online_section ' id='" + removeFirstCharacter(snmpSectionPrefix) + routerSNMPID + "_online'>";
			htmlCode += "            <table border=0 cellpadding=0 cellspacing=0 class='sensorbox_snmp_container_table'>";
			htmlCode += "            	<tr>";
			htmlCode += "            		<td><div class='sensorbox_snmp_title'>IN</div></td>";
			htmlCode += "            		<td><div class='sensorbox_snmp_title'>OUT</div></td>";
			htmlCode += "            	</tr>";
			htmlCode += "           	 <tr>";
			htmlCode += "            		<td><div id='" + removeFirstCharacter(snmpValuePrefix) + routerSNMPID + "_in' class='snmp_value'>...</div></td>";
			htmlCode += "            		<td><div id='" + removeFirstCharacter(snmpValuePrefix) + routerSNMPID + "_out' class='snmp_value'>...</div></td>";
			htmlCode += "            	</tr>";
			htmlCode += "            </table>";
			htmlCode += "        </div>";
			htmlCode += "            <img id='" + snmpGraphID + "' class='sensorbox_snmp_graph'>";
			htmlCode += "    </div>";

		}


		if (serverPingID > 0) {
			htmlCode += "        <!-- Ping -->";
			htmlCode += "        <div id='" + adjustedDivName + "_ping_section' class='sensorbox_ping_section'>";
			htmlCode += "            <img class='sensorbox_ping_graph' id='" + pingGraphID + "'>";
			htmlCode += "            <div class='sensorbox_ping_title'>";
			htmlCode += "            	ping: <div id='" + removeFirstCharacter(pingValuePrefix) + serverPingID + "' class='sensorbox_ping_value'>...</div>";
			/*
			if (routerSNMPID > 0) {
				htmlCode += "            	24 hr Traffic in: <div id='" + removeFirstCharacter(snmpValuePrefix) + routerSNMPID + "_mbin' class='sensorbox_ping_value'>...</div>";
				htmlCode += "            	24 hr Traffic out: <div id='" + removeFirstCharacter(snmpValuePrefix) + routerSNMPID + "_mbout' class='sensorbox_ping_value'>...</div>";
			}*/
			htmlCode += "          	 </div>";
			htmlCode += "        </div>";
		}
		htmlCode += "        <!-- Other stuff -->";
		htmlCode += "        <div class='sensorbox_misc_section'>";
		if (TycoPingID > 0) {
			htmlCode += "            <div id='" + removeFirstCharacter(pingStatusPrefix) + TycoPingID + "' class='sensorbox_up_or_down_button'>TYCO</div>";
		}
		if (RoverPingID > 0) {
			htmlCode += "            <div id='" + removeFirstCharacter(pingStatusPrefix) + RoverPingID + "' class='sensorbox_up_or_down_button'>ROVER</div>";
		}
		if (MacMiniID > 0) {
			htmlCode += "            <div id='" + removeFirstCharacter(pingStatusPrefix) + MacMiniID + "' class='sensorbox_up_or_down_button'>MACMINI</div>";
		}
		if (MacMini2ID > 0) {
			htmlCode += "            <div id='" + removeFirstCharacter(pingStatusPrefix) + MacMini2ID + "' class='sensorbox_up_or_down_button'>MACMINI2</div>";
		}
		if (UTEC > 0) {
			htmlCode += "            <div id='" + removeFirstCharacter(pingStatusPrefix) + UTEC + "' class='sensorbox_up_or_down_button'>UTEC</div>";
		}
		htmlCode += "        </div>";
		htmlCode += "    </div>";

		$(locationDivContainerName).append(htmlCode);
	//}
	/*catch (e) {
		document.write(e.message);
	}//*/
}

function removeFirstCharacter(str) {
	//try {
		return str.substr(1);
	/*}
	catch (e) {
		document.write(e.message);
	}//*/
}