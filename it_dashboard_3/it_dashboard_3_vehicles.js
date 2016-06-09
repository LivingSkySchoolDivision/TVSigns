/**
 * Created by mark.strendin on 2016-06-08.
 */

function updateVehicleStatus(divid, JSONURL) {
    var CurrentEvents = new Array();

    !$('#' + divid).html("Loading..");

    // Read JSON
    // Find current events
    $.getJSON(JSONURL, function(data) {
        var eventsNow = 0;

        $.each(data.rightnow, function(j, ce) {
            eventsNow++;
            //!$('#' + divid).html(ce.title);
            !$('#' + divid).html("<span style='color: rgba(255,255,255,0.2);'>" + ce.title + "</span>");

            // This doesn't work on the TV for some reason
            if (!ce.title.startsWith("Deleted"))
            {
                //!$('#' + divid).html("nondeleted events found");
                //CurrentEvents[CurrentEvents.length] = new NewCalendarItem(ce.id, ce.title, ce.startdatefriendly, ce.starttime, ce.enddate, ce.endtime, ce.description);}
            }
        });

        if (eventsNow == 0) {
            !$('#' + divid).html("<span style='color: rgb(0, 200, 0);'>Available</span>");
        }
    });
}