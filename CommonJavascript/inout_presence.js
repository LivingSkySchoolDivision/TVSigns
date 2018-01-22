// Make this the same as the new dashboard code. It initializes a box, and then when it updates it checks for divs with that ID number to update stuff.

var inOutDivContainer = "#inout_container";
var inOutDivPrefix = "#inout_";
var logDiv = "#log";
var lastUpdatedDiv = "#inout_lastupdated";

function UpdateAllInOutPresence() {
	logThis("Updating...");
	try {
	var JSONURL = inOutJSONRoot;
	$.getJSON(JSONURL, function(data) {
        updateAllInOutPresenceWithData(data);
    });
	} catch(ex) {
		document.write("<B style='color: red; position: absolute; top: 0; left: 0;'>" + ex.message + "</b>");
	}
}

function logThis(str) {
	if ($(logDiv).length !== 0) {
		$(logDiv).append(str + "<BR>");
	}
}

function updateAllInOutPresenceWithData(data) {

	$.each(data.Statuses, function(i, trackedUser) {
		logThis(">>> Updating user " + trackedUser.Name + " (" + trackedUser.ID + ")");
    	var userDivName = inOutDivPrefix + trackedUser.ID;
		if ($(userDivName).length !== 0) {

			if ($(userDivName + "_name").length !== 0) {
				$(userDivName + "_name").html(trackedUser.Name);
			}

			if ($(userDivName + "_inorout").length !== 0) {
				$(userDivName + "_inorout").html(trackedUser.InOrOut);
			}

			if ($(userDivName + "_status").length !== 0) {
				$(userDivName + "_status").html(trackedUser.Status);
			}
		}
    });
}

function InitializeInOutPresenceForGroup(groupID) {
	var JSONURL = inOutJSONRoot + "?groupid=" + groupID;

	logThis("Loading group data from " + JSONURL);

	$.getJSON(JSONURL, function(data) {
		logThis("Got data");
        $.each(data.Statuses, function(i, trackedUser) {
        	logThis("> Initializing for " + trackedUser.Name);
        	var adjustedDivName = inOutDivPrefix + trackedUser.ID;
			if (!$(adjustedDivName).length !== 0) {
				addLargePresenceSection(inOutDivContainer, adjustedDivName);
			}
        });

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
	htmlCode += "<div class=\"presence_user_presence_inout\" id=\"" + removeFirstCharacter(adjustedDivName) + "_inorout\">...</div>";
	htmlCode += "<div class=\"presence_user_presence\" id=\"" + removeFirstCharacter(adjustedDivName) + "_status\">...</div>";
	htmlCode += "</div>";
	$(containerDivName).append(htmlCode);
}


function removeFirstCharacter(str) {
	return str.substr(1);
}