/**
 * Created by Mark on 6/14/2016.
 */
function updateCalendarStatus(divid, JSONURL) {
    var CurrentEvents = new Array();

    // Read JSON
    // Find current events
    $.getJSON(JSONURL, function(data) {
        var eventsNow = 0;

        $.each(data.rightnow, function(j, ce) {
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
            !$('#' + divid).html("<div class='meeting_room_available''>Available</div>");
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
            !$('#' + divid).html("<div class='meeting_room_available''>Available</div>");
        }
    });
}
