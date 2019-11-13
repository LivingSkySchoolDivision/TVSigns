// Make this the same as the new dashboard code. It initializes a box, and then when it updates it checks for divs with that ID number to update stuff.

var inOutDivContainer = "#inout_container";
var inOutDivPrefix = "#inout_";
var logDiv = "#log";
var lastUpdatedDiv = "#inout_lastupdated";

function UpdateAllInOutPresence() {
	logThis("Updating...");
	try {
		var JSONURL = inOutJSONRoot + "/People";
		$.getJSON(JSONURL, function(data) {
	        updateAllInOutPresenceWithData(data);
	    });
	} catch(ex) {
		console.log(ex);
	}
}

function logThis(str) {
	if ($(logDiv).length !== 0) {
		$(logDiv).append(str + "<BR>");
	}
	console.log(str);
}

function updateAllInOutPresenceWithData(data) {
	$.each(data, function(i, person) {
    	var userDivName = inOutDivPrefix + person.ID;
		if ($(userDivName).length !== 0) {
			if ($(userDivName + "_name").length !== 0) {

				console.log("updating data for " + person.ID);
				// Update user's name
				$(userDivName + "_name").html(person.DisplayName);

				// Clear previous styles
				$(userDivName).removeClass("presence_user_busy");
				$(userDivName).removeClass("presence_user_in");
				$(userDivName).removeClass("presence_user_out");
				$(userDivName).removeClass("presence_user_unknown");
				$(userDivName + "_inorout").text("?");
				$(userDivName + "_status").html('&nbsp;');

				// Update the user's status, if there is one
				if (person.HasStatus == true) {
					$(userDivName + "_status").html(person.CurrentStatus.Content + '&nbsp;');

					// Color styles
					switch(person.CurrentStatus.StatusType) {
						case 0:
							$(userDivName).addClass("presence_user_unknown");
							$(userDivName + "_inorout").text("??");
							break;
						case 1:
							$(userDivName).addClass("presence_user_in");
							$(userDivName + "_inorout").text("IN");
							break;
						case 2:
							$(userDivName).addClass("presence_user_out");
							$(userDivName + "_inorout").text("OUT");
							break;
						case 3:
							$(userDivName + "_inorout").text("BUSY");
							$(userDivName).addClass("presence_user_busy");
							break;
						default:
							$(userDivName).addClass("presence_user_unknown");
							$(userDivName + "_inorout").text("??");
							break;
					}
				} else {
					$(userDivName).addClass("presence_user_unknown");
				}





			}

		}
    });
}

function InitializeInOutPresenceForGroup(groupID) {
	var JSONURL = inOutJSONRoot + "/GroupMembers/" + groupID;

	logThis("Loading group data from " + JSONURL);

	$.getJSON(JSONURL, function(data) {
        $.each(data, function(index, person) {
        	var adjustedDivName = inOutDivPrefix + person.ID;
			if (!$(adjustedDivName).length !== 0) {
				addLargePresenceSection(inOutDivContainer, adjustedDivName);
			}
        });
        console.log("Done initializing presence divs");
        updateAllInOutPresenceWithData(data);
    });
}

function InitializeInOutPresenceForUser(userID) {
	var adjustedDivName = inOutDivPrefix + userID;
	if (!($(adjustedDivName).length !== 0)) {
		addLargePresenceSection(inOutDivContainer, adjustedDivName);
	}
}


function addLargePresenceSection(containerDivName, adjustedDivName, user) {
	var htmlCode = "";
	htmlCode += "<div class=\"presence_user\" id=\"" + removeFirstCharacter(adjustedDivName) + "\">";
	htmlCode += "<div class=\"presence_user_name\" id=\"" + removeFirstCharacter(adjustedDivName) + "_name\">" + removeFirstCharacter(adjustedDivName) + "</div>";
	htmlCode += "<div class=\"presence_user_presence_inout_container\">";
	htmlCode += "<div class=\"presence_user_presence_inout\" id=\"" + removeFirstCharacter(adjustedDivName) + "_inorout\">...</div>";
	htmlCode += "</div>";
	htmlCode += "<div class=\"presence_user_presence\" id=\"" + removeFirstCharacter(adjustedDivName) + "_status\">...</div>";
	htmlCode += "</div>";
	$(containerDivName).append(htmlCode);
}


function removeFirstCharacter(str) {
	return str.substr(1);
}