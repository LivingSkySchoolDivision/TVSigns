/**
 * Created by Mark on 6/7/2016.
 */
function NewCalendarItem(EventID, EventTitle, EventStartDate, EventStartTime, EventEndDate, EventEndTime, EventDescription)
{
    this.ID = EventID;
    this.Title = EventTitle;
    this.StartDate = EventStartDate;
    this.StartTime = EventStartTime;
    this.EndTime = EventEndTime;
    this.EndDate = EventEndDate;
    this.Description = EventDescription;
}


function updateCurrentRoomStatus(divid, roomJSONURL) {
    var CurrentEvents = new Array();

    var roomStatus = "EMPTY";

    // Read JSON
    // Find current events
    $.getJSON(roomJSONURL, function(data) {
        $.each(data.rightnow, function(j, ce) {
            if (!ce.title.startsWith("Deleted"))
            {
                CurrentEvents[CurrentEvents.length] = new NewCalendarItem(ce.id, ce.title, ce.startdatefriendly, ce.starttime, ce.enddate, ce.endtime, ce.description);
            }
        });

        for(var x = 0; x < CurrentEvents.length; x++) {
            var thisEvent = CurrentEvents[x];
            roomStatus = thisEvent.Title;
        }

        // Write the status to the div
        !$('#' + divid).html(roomStatus);
    });


}