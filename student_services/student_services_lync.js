
function onlyAlpha(input) {
    return input.replace(/[^A-Za-z]/g, "");
}

var lyncUserCount = 0;
var lyncColumnCount = 1;
function addLyncWidget(ID)
{
//    console.log("Adding lync widget for: " + sipURI);
    lyncUserCount++;
    if (lyncUserCount > 11) {
        lyncColumnCount++;
        lyncUserCount=0;
    }
    //$('#lync_table_' + lyncColumnCount + ' > tbody:last').append("<tr class=\"lyncTR\"><td class=\"lyncTD\" width=\"25\"><div id=\"lyncPresenceIndicatorField_"+onlyAlpha(sipURI)+"\" class=\"lyncPresence\"></div></td><td width=\"275\" class=\"lyncTD\"><div id=\"lyncUsernameField_"+onlyAlpha(sipURI)+"\" class=\"lyncUsername\"><div class=\"lync_updating\">-</div></div></td><td class=\"lyncTD\"><div id=\"lyncLocationField_"+onlyAlpha(sipURI)+"\"><div class=\"lync_updating\">"+sipURI+" waiting for update...</div></div></td></tr>");
    $('#lync_table_' + lyncColumnCount + ' > tbody:last').append("<tr class=\"lyncTR\"><td valign=\"bottom\" width=\"250\" class=\"lyncTD\"><div id=\"lyncUsernameField_"+ID+"\" class=\"lyncUsername\"><div class=\"lync_updating\">-</div></div></td><td class=\"lyncTD\" valign=\"bottom\" ><div class=\"lyncLocation\" id=\"lyncLocationField_"+ID+"\"><div class=\"lync_updating\">"+ID+" waiting for update...</div></div></td></tr>");


}

function updateLyncWidget(ID, DisplayName, Location, OutOfOffice, Availability) {

    if (Location.length > 0) {
        $('#lyncLocationField_' + ID).html(LimitCharacters(Location,30));
    } else {
        $('#lyncLocationField_' + ID).html('&nbsp;');
    }

    // Update location and display name
    $('#lyncUsernameField_' + ID).html(DisplayName);

    // Update the status indicator
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Online");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Offline");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_DoNotDisturb");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_IdleOnline");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Away");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_Busy");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_BeRightBack");
    $('#lyncUsernameField_' + ID).removeClass("lyncPresence_IdleBusy");
    $('#lyncUsernameField_' + ID).addClass("lyncPresence_" + Availability);
    //$('#lyncUsernameField_' + ID).html(Availability);

    // Dim the location
    $('#lyncLocationField_' + ID).removeClass("lyncLocation_Offline");
    $('#lyncLocationField_' + ID).addClass("lyncLocation_" + Availability);

    // Set smaller font sizes if required
    $('#lyncLocationField_' + ID).removeClass("lyncLocation_SmallFont");
    if (Location.length > 10) {
        $('#lyncLocationField_' + ID).addClass("lyncLocation_SmallFont");
    }
}

function clearLyncTable() {
    $('#lync_table').empty();
    $('#lync_table').append("<tbody></tbody>");
}

// Set up a referencable table row for the specific user
function initializeLyncTable() {
    clearLyncTable();


    //addLyncWidget("13"); // sip:angela.okanee@lskysd.ca
    addLyncWidget("14"); // sip:angela.yeaman@lskysd.ca
    addLyncWidget("15"); // sip:bernice.chasse@lskysd.ca
    addLyncWidget("16"); // sip:cathy.richardson@lskysd.ca
    addLyncWidget("35"); // sip:chelsea.seymour@lskysd.ca
    addLyncWidget("17"); // sip:derek.hoiseth@lskysd.ca
    addLyncWidget("19"); // sip:doug.drover@lskysd.ca    
    addLyncWidget("22"); // sip:jennifer.harder@lskysd.ca
    addLyncWidget("37"); // Jennifer Heggstrom
    //addLyncWidget("23"); // sip:leah.hildebrand@lskysd.ca        
    addLyncWidget("36"); // Jennifer Simonson    
    addLyncWidget("25"); // sip:leanne.sargent@lskysd.ca
    //addLyncWidget("26"); // sip:lindsay.zubiak@lskysd.ca"
    addLyncWidget("34"); // sip:kate.carlisle@lskysd.ca
    addLyncWidget("29"); // sip:nancy.schultz@lskysd.ca
    addLyncWidget("30"); // sip:noelle.bidwell@lskysd.ca
    addLyncWidget("31"); // sip:nyna.barclay@lskysd.ca
    addLyncWidget("20"); // sip:shari.dueck@lskysd.ca
    addLyncWidget("32"); // sip:sherry.bockus@lskysd.ca
    addLyncWidget("33"); // sip:sherron.burns@lskysd.ca

    


    //addLyncWidget("sip:harvey.birdman@lskysd.ca");
    //addLyncWidget("sip:mark.strendin@lskysd.ca");
}

function initializeLyncTable_StudentServices() {
}

function updateLyncWidgets()
{
    // Load the data into an array
    $.getJSON(LyncJSONPath, function(data) {
        $.each(data, function(i, lyncuser) {
            updateLyncWidget(lyncuser.ID, lyncuser.DisplayName, lyncuser.Location, "", lyncuser.Availability);
        });
    });
}