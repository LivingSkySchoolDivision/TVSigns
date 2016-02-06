function addLyncWidget(ID, lyncTable)
{
    $('#lync_table_' + lyncTable + ' > tbody:last').append("<tr class=\"lyncTR\"><td valign=\"bottom\" width=\"200\" class=\"lyncTD\"><div id=\"lyncUsernameField_"+ID+"\" class=\"lyncUsername\"><div class=\"lync_updating\">-</div></div></td><td valign=\"bottom\" class=\"lyncTD\"><div class=\"lyncLocation\" id=\"lyncLocationField_"+ID+"\"><div class=\"lync_updating\">"+ID+" waiting for update...</div></div></td></tr>");
}

function updateLyncWidget(ID, DisplayName, Location, OutOfOffice, Availability) {
    //console.log("Updating lync widget for" + ID)

    // Update location and display name
    $('#lyncUsernameField_' + ID).html(DisplayName);

    if (Location.length > 0) {
        $('#lyncLocationField_' + ID).html(replaceEmotes(LimitCharacters(Location,55)));
    } else {
        $('#lyncLocationField_' + ID).html('&nbsp;');
    }

    // Update the status indicator
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Online");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Offline");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_DoNotDisturb");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_IdleOnline");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Away");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Busy");
    $('#lyncUsernameField_' + ID).addClass("lyncPresence_" + Availability);
}

function clearLyncTable() {
    $('#lync_table').empty();
    $('#lync_table').append("<tbody></tbody>");
}

// Set up a referencable table row for the specific user
function initializeLyncTable() {
    clearLyncTable();

    addLyncWidget("3",1);
    addLyncWidget("4",1);
    addLyncWidget("5",1);
    addLyncWidget("6",1);
    addLyncWidget("7",1);
    addLyncWidget("1",1);
    addLyncWidget("8",1);
    addLyncWidget("9",1);
    addLyncWidget("10",1);

    addLyncWidget("11",2);
    addLyncWidget("12",2);
}

function initializeLyncTable_StudentServices() {
}

function updateLyncWidgets()
{
    // Load the data into an array
    //var JSONPath = "http://dashboard.lskysd.ca/LSKYDashboardDataCollector/Proxy/JSON.aspx?skipcache=yes&url=http://localhost:8455/";
    var JSONPath = "/DashboardPresence/JSON/";

    $.getJSON(JSONPath, function(data) {
        //console.log("Got JSON data back")
        $.each(data, function(i, lyncuser) {
            //console.log("found lync user " + lyncuser.DisplayName)
            updateLyncWidget(lyncuser.ID, lyncuser.DisplayName, lyncuser.Location, "", lyncuser.Availability);
        });
    });
}