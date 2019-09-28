/**
 * Created by mark.strendin on 2016-06-08.
 */

function updateCalendarStatus_Vehicles(divid, JSONURL) {
    var CurrentEvents = new Array();

    // Read JSON
    // Find current events
    $.getJSON(JSONURL, function(data) {
        var eventsNow = 0;

        $.each(data.today, function(j, ce) {
            eventsNow++;
            //!$('#' + divid).html(ce.title);
            !$('#' + divid).html("<div class='vehicle_unavailable'>" + ce.title + "</div>");
            //!$('#' + divid).html("<div class='meeting_room_unavailable'>Booked</div>");
            // This doesn't work on the TV for some reason
            if (!ce.title.startsWith("Deleted"))
            {
                //!$('#' + divid).html("nondeleted events found");
                //CurrentEvents[CurrentEvents.length] = new NewCalendarItem(ce.id, ce.title, ce.startdatefriendly, ce.starttime, ce.enddate, ce.endtime, ce.description);}
            }
        });

        if (eventsNow == 0) {
            !$('#' + divid).html("<div class='vehicle_available'>Available</div>");
        }
    });
}

function updateCalendarStatus_MeetingRooms(divid, JSONURL) {
    var CurrentEvents = new Array();

    // Read JSON
    // Find current events
    $.getJSON(JSONURL, function(data) {
        var eventsNow = 0;

        $.each(data.rightnow, function(j, ce) {
            eventsNow++;
            //!$('#' + divid).html(ce.title);
            !$('#' + divid).html("<div class='meeting_room_unavailable'>" + ce.title + "</div>");
            //!$('#' + divid).html("<div class='meeting_room_unavailable'>Booked</div>");
            // This doesn't work on the TV for some reason
            if (!ce.title.startsWith("Deleted"))
            {
                //!$('#' + divid).html("nondeleted events found");
                //CurrentEvents[CurrentEvents.length] = new NewCalendarItem(ce.id, ce.title, ce.startdatefriendly, ce.starttime, ce.enddate, ce.endtime, ce.description);}
            }
        });

        if (eventsNow == 0) {
            !$('#' + divid).html("<div class='meeting_room_available'>Available</div>");
        }
    });
}

function updateCalendarStatus_Tomorrow(divid, JSONURL) {
    var CurrentEvents = new Array();

    // Read JSON
    // Find current events
    $.getJSON(JSONURL, function(data) {
        var eventsNow = 0;

        $.each(data.tomorrow, function(j, ce) {
            eventsNow++;
            //!$('#' + divid).html(ce.title);
            //!$('#' + divid).html("<div class='meeting_room_unavailable'>" + ce.title + "</div>");
            !$('#' + divid).html("<div class='meeting_room_unavailable'>Booked</div>");
            // This doesn't work on the TV for some reason
            if (!ce.title.startsWith("Deleted"))
            {
                //!$('#' + divid).html("nondeleted events found");
                //CurrentEvents[CurrentEvents.length] = new NewCalendarItem(ce.id, ce.title, ce.startdatefriendly, ce.starttime, ce.enddate, ce.endtime, ce.description);}
            }
        });

        if (eventsNow == 0) {
            !$('#' + divid).html("<div class='meeting_room_available'>Available</div>");
        }
    });
}
