var locationDivContainerName = "#sensorbox_container";
var divPrefix = "#location_";
var snmpGraphPrefix = "#SNMPGraph_";
var snmpLargeGraphPrefix = "#SNMPLargeGraph_";
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
var DetailedSNMPIDs = [];

function UpdateAllSensorValues() {
// Get the JSON data for this host
	// https://status.lskysd.ca/strendinmonitor/JSON/ByHost.aspx?hostid=5
	// The DIV IDs should all be set up to receive data

	//var JSONPath = strendinMonitorJSONRoot + "/JSON/ByHost.aspx?hostid=" + HostID;
	// https://status.lskysd.ca/strendinmonitor/JSON/allSensors.aspx

	var JSONPath = strendinMonitorJSONRoot + "/JSON/allSensors.aspx";
	console.log("Fetching " + JSONPath);
	$.getJSON(JSONPath, function(data) {
		console.log("Processing " + JSONPath);
		$.each(data.pinglatencysensors, function(derp, thisSensor) {
			// For each sensor returned, check to see if there is a div named with that IP
			// Ping Values
			var valudDIVID = pingValuePrefix + thisSensor.id
			if ($(valudDIVID).length !== 0) {

				if (thisSensor.health > 0) {
					var healthPercent = (thisSensor.health * 100) + "%";
					var healthColorClass = "sensorbox_ping_health_healthy";
					if (thisSensor.health < 1) {
						healthColorClass = "sensorbox_ping_health_queasy";
					}
					if (thisSensor.health <= 0) {
						healthColorClass = "sensorbox_ping_health_offline";
						healthPercent = thisSensor.hostname + " unreachable";
					}
					// A div with this ID exists, try to update it
					$(valudDIVID).html("ping: <b class='" + healthColorClass + "'>" + thisSensor.lastroundtrip + "ms</b>");
				} else {
					$(valudDIVID).html("<div class='sensorbox_ping_offline_box'>" + thisSensor.hostname + " unreachable</div>");
				}

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
				$(divID + "_lastseen").html("Last seen: " + thisSensor.lastsuccess);
			}

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
}

function UpdateAllSensorGraphs() {
	// For each graph we know about (from the initilization function storing them in a list):
	//  - Check to see if a graph with that ID exists
	//  - If one does, reload it's source

	for (var x = 0; x < KnownSNMPGraphIDs.length; x++) {
		var routerSNMPID = KnownSNMPGraphIDs[x];

		var graphMax = 0;
		for(var c = 0; c < SNMPMaxValues.length; c++) {
			if (SNMPMaxValues[c].id == routerSNMPID) {
				graphMax = SNMPMaxValues[c].max;
			}
		}

		if ($(snmpGraphPrefix + routerSNMPID).length !== 0) {
			$(snmpGraphPrefix + routerSNMPID).attr("src",strendinMonitorGraphRoot + "/Graphs/SNMPThroughput.aspx?sensorid=" + routerSNMPID + "&showworkday=true&height=40&width=346&hours=" + graphHoursToPull + "&graphstyle=filledline&maxvalue=" + graphMax + "&showhours=true&preventCache=" + timestamp);
		}

		if ($(snmpLargeGraphPrefix + routerSNMPID).length !== 0) {
			$(snmpLargeGraphPrefix + routerSNMPID).attr("src",strendinMonitorGraphRoot + "/Graphs/SNMPThroughput.aspx?sensorid=" + routerSNMPID + "&showworkday=true&height=80&width=400&hours=" + graphHoursToPull + "&graphstyle=bar&maxvalue=" + graphMax + "&showhours=true&preventCache=" + timestamp);
		}



	};

	for (var x = 0; x < KnownPingGraphIDs.length; x++) {
		var serverPingID = KnownPingGraphIDs[x];
		var divID = pingGraphPrefix + "" + serverPingID;
		if ($(divID).length !== 0) {
			$(divID).attr("src",strendinMonitorGraphRoot + "/Graphs/PingLatency.aspx?sensorid=" + serverPingID + "&showworkday=true&graphstyle=onoff&height=1&width=346&showhourlines=false&hours=" + graphHoursToPull + "");
		}
	}

}


function InitializeFacilitySensorBox(divName,locationName,SNMPGraphMax,HostID,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID,UTEC) {
	var adjustedDivName = divPrefix + divName;
	// Check if the div exists, or if we have to create it

	if (!($(adjustedDivName).length !== 0)) {
		// No div, create a new one
		AddFacilitySensorBox(adjustedDivName,locationName,SNMPGraphMax,HostID,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID,UTEC);
	}
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

function AddFacilitySensorBox(divName,locationName,SNMPGraphMax,HostID,routerSNMPID,serverPingID,TycoPingID,RoverPingID,MacMiniID,MacMini2ID,UTEC) {
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
		htmlCode += "         		<div class='sensorbox_snmp_offline_section_lastseen' id='" + removeFirstCharacter(snmpValuePrefix) + routerSNMPID + "_lastseen'></div>";
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
		htmlCode += "            	<div id='" + removeFirstCharacter(pingValuePrefix) + serverPingID + "' class='sensorbox_ping_value'>...</div>";
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
}

function removeFirstCharacter(str) {
	return str.substr(1);
}


function InitializeDetailedSNMPBox(divName,locationName,SNMPGraphMax,snmpsensorid) {
	var adjustedDivName = divPrefix + divName;
	// Check if the div exists, or if we have to create it

	if (!($(adjustedDivName).length !== 0)) {
		// No div, create a new one
		AddDetailedSNMPSensorBox(adjustedDivName,locationName,SNMPGraphMax,snmpsensorid);
	}
}

function AddDetailedSNMPSensorBox(divName,locationName,SNMPGraphMax,snmpsensorid) {
	var adjustedDivName=removeFirstCharacter(divName);
	var snmpGraphID = removeFirstCharacter(snmpLargeGraphPrefix) + snmpsensorid;

	if (snmpsensorid > 0) {
		// Check to see if we know about this ID already
		if (!ArrayContains(KnownSNMPGraphIDs,snmpsensorid)) {
			AddToArray(KnownSNMPGraphIDs,snmpsensorid);
		}

		if (!ArrayContains(DetailedSNMPIDs,snmpsensorid)) {
			AddToArray(DetailedSNMPIDs,snmpsensorid);
		}
	}

	SNMPMaxValues.push({ id: snmpsensorid, max: SNMPGraphMax });

	var htmlCode = '';
	htmlCode += "	<div class='detailed_sensorbox' id='"+adjustedDivName+"'>";
	htmlCode += "        <div class='sensorbox_name'>" + locationName + "</div>";

	htmlCode += "    <!-- SNMP -->";
	htmlCode += "    <div class='sensorbox_snmp_section' id='" + removeFirstCharacter(snmpSectionPrefix) + snmpsensorid + "'>";

	htmlCode += "        <!-- SNMP Offline section -->";
	htmlCode += "        <div class='sensorbox_snmp_section sensorbox_hidden' id='" + removeFirstCharacter(snmpSectionPrefix) + snmpsensorid + "_offline'>";
	htmlCode += "        	<div class='sensorbox_snmp_offline_section'>";
	htmlCode += "         		<div class='sensorbox_snmp_offline_section_title'>OFFLINE</div>";
	htmlCode += "         		<div class='sensorbox_snmp_offline_section_lastseen' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_lastseen'></div>";
	htmlCode += "         	</div>";
	htmlCode += "        </div>";

	htmlCode += "        <div class='sensorbox_snmp_online_section ' id='" + removeFirstCharacter(snmpSectionPrefix) + snmpsensorid + "_online'>";
	htmlCode += "            <table border=0 cellpadding=0 cellspacing=0 class='sensorbox_snmp_container_table_detailed'>";
	htmlCode += "            	<tr>";
	htmlCode += "            		<td align=center width=50 valign=middle><div class='sensorbox_snmp_title'>IN</div></td>";
	htmlCode += "            		<td width=225 valign=middle><div id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_in' class='sensorbox_snmp_value_detailed'>...</div></td>";
	htmlCode += "            		<td width=* rowspan=2 valign=bottom><img id='" + snmpGraphID + "' class='sensorbox_snmp_graph_detailed'></td>";
	htmlCode += "            	</tr>";
	htmlCode += "           	 <tr>";
	htmlCode += "            		<td align=center valign=middle><div class='sensorbox_snmp_title'>OUT</div></td>";
	htmlCode += "            		<td valign=middle><div id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_out' class='sensorbox_snmp_value_detailed'>...</div></td>";
	htmlCode += "            	</tr>";
	htmlCode += "            </table>";
	htmlCode += "        </div>";

	htmlCode += "    <!-- Last 24 hours -->";
	htmlCode += "    <div class='sensorbox_details_section'>";
	htmlCode += "    	<div class='sensorbox_details_title'>Last 24 hours</div>";
	htmlCode += "    	<table border=0 cellpadding=0 cellspacing=0 class='sensorbox_details_table'>";
	htmlCode += "    		<tr>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>MB in</div></td>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>MB out</div></td>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>Peak in</div></td>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>Peak out</div></td>";
	htmlCode += "    		</tr>";
	htmlCode += "    		<tr>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_mbin_day'>...</div></td>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_mbout_day'>...</div></td>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_peakin_day'>...</div></td>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_peakout_day'>...</div></td>";
	htmlCode += "    		</tr>";
	htmlCode += "    	</table>";
	htmlCode += "    </div>";

	htmlCode += "    <!-- Last month -->";
	htmlCode += "    <div class='sensorbox_details_section'>";
	htmlCode += "    	<div class='sensorbox_details_title'>Last 30 days</div>";
	htmlCode += "    	<table border=0 cellpadding=0 cellspacing=0 class='sensorbox_details_table'>";
	htmlCode += "    		<tr>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>Data in</div></td>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>Data out</div></td>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>Peak in</div></td>";
	htmlCode += "    			<td width='25%'><div class='sensorbox_details_snmp_title'>Peak out</div></td>";
	htmlCode += "    		</tr>";
	htmlCode += "    		<tr>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_mbin_month'>...</div></td>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_mbout_month'>...</div></td>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_peakin_month'>...</div></td>";
	htmlCode += "    			<td><div class='sensorbox_details_snmp_value' id='" + removeFirstCharacter(snmpValuePrefix) + snmpsensorid + "_peakout_month'>...</div></td>";
	htmlCode += "    		</tr>";
	htmlCode += "    	</table>";
	htmlCode += "    </div>";


	htmlCode += "    </div>";

	htmlCode += "    </div>";

	$(locationDivContainerName).append(htmlCode);
}

function UpdateDetailedSNMPValues() {
	// Get the JSON data for this host
	// https://status.lskysd.ca/strendinmonitor/JSON/bySNMPThroughputSensor.aspx?sensorid=
	// The DIV IDs should all be set up to receive data

	//var JSONPath = strendinMonitorJSONRoot + "/JSON/ByHost.aspx?hostid=" + HostID;
	// https://status.lskysd.ca/strendinmonitor/JSON/allSensors.aspx

	for (var x = 0; x < DetailedSNMPIDs.length; x++) {
		var sensorID = DetailedSNMPIDs[x];

		var JSONPath = strendinMonitorJSONRoot + "/JSON/bySNMPThroughputSensor.aspx?sensorid=" + sensorID;
		$.getJSON(JSONPath, function(thisSensor) {
			var divID = snmpValuePrefix + thisSensor.id

			// last day
			if ($(divID + "_mbin_day").length !== 0) { $(divID + "_mbin_day").html(mbToFriendlyString(thisSensor.mbinlastday)); }
			if ($(divID + "_mbout_day").length !== 0) { $(divID + "_mbout_day").html(mbToFriendlyString(thisSensor.mboutlastday)); }
			if ($(divID + "_peakin_day").length !== 0) { $(divID + "_peakin_day").html(bpsToFriendlyString(thisSensor.peakbpsinlastday)); }
			if ($(divID + "_peakout_day").length !== 0) { $(divID + "_peakout_day").html(bpsToFriendlyString(thisSensor.peakbpsoutlastday)); }

			// last month
			if ($(divID + "_mbin_month").length !== 0) { $(divID + "_mbin_month").html(mbToFriendlyString(thisSensor.mbinlastmonth)); }
			if ($(divID + "_mbout_month").length !== 0) { $(divID + "_mbout_month").html(mbToFriendlyString(thisSensor.mboutlastmonth)); }
			if ($(divID + "_peakin_month").length !== 0) { $(divID + "_peakin_month").html(bpsToFriendlyString(thisSensor.peakbpsinlastmonth)); }
			if ($(divID + "_peakout_month").length !== 0) { $(divID + "_peakout_month").html(bpsToFriendlyString(thisSensor.peakbpsoutlastmonth)); }

		});


	}

}

function bpsToFriendlyString(bitsPerSecond) {
	if (bitsPerSecond == 0) {
		return "Idle";
	}

	var sizes = [ "bps", "kbps", "mbps", "gbps" ];
	var len = bitsPerSecond;
	var order = 0;


	while (len >= 1000 && order + 1 < sizes.length)
	{
		order++;
		len = len / 1000;
	}

	return parseFloat(Math.round(len * 100) / 100).toFixed(1) + " " + sizes[order];


}

function mbToFriendlyString(megabytes) {
	if (megabytes == 0) {
		return "0 MB";
	}

	var sizes = [ "MB", "GB", "TB", "PB" ];
	var len = megabytes;
	var order = 0;


	while (len >= 1024 && order + 1 < sizes.length)
	{
		order++;
		len = len / 1024;
	}

	return parseFloat(Math.round(len * 100) / 100).toFixed(1) + " " + sizes[order];


}