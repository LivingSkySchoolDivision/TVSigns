/**
 * Created by Mark on 6/7/2016.
 */

function updateCurrentRoomStatus(divid, roomJSONURL) {
    var CurrentEvents = new Array();

    !$('#' + divid).html("Loading..");

    // Read JSON
    // Find current events
    $.getJSON(roomJSONURL, function(data) {

        !$('#' + divid).html("Empty");

        $.each(data.rightnow, function(j, ce) {

            !$('#' + divid).html(ce.title);

            // This doesn't work on the TV for some reason
            if (!ce.title.startsWith("Deleted"))
            {
                //!$('#' + divid).html("nondeleted events found");
                //CurrentEvents[CurrentEvents.length] = new NewCalendarItem(ce.id, ce.title, ce.startdatefriendly, ce.starttime, ce.enddate, ce.endtime, ce.description);}
            }
        });
    });
}