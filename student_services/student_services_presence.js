function updateStudentServicesPresence() {
	var JSONURL = "https://dashboard.lskysd.ca/inout/JSON/?groupid=2";
	var DIVNAME = "#presence_content";

	// Get the JSON
	// For each user found, add a user presence section for that user

	var sectionContent = "";


	$.getJSON(JSONURL, function(data) {

        $.each(data, function(i, trackedUser) {
			console.log("adding tracked user: " + trackedUser.Name);
        	sectionContent += addPresenceSection(trackedUser);
        });
		$(DIVNAME).html(sectionContent);
    });


}


function addPresenceSection(trackedUser) {
	var returnMe = "";

	returnMe += "<div class=\"presence_user\">";
	returnMe += "<div class=\"presence_user_name\">" + trackedUser.Name + "</div>";
	returnMe += "<div class=\"presence_user_presence_inout\">" + trackedUser.InOrOut + "</div>";
	returnMe += "<div class=\"presence_user_presence\">" + trackedUser.Status + "</div>";
	returnMe += "</div>";

	return returnMe;
}