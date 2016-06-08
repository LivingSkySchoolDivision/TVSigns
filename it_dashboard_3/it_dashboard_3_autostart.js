/**
 * Created by Mark on 2/6/2016.
 */
$(document).ready(function(){
    updateCurrentRoomStatus('room_board', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/officecalendars&guid={d492d463-8204-460c-99a2-81f7646fb65e}');
    updateCurrentRoomStatus('room_meeting', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/officecalendars&guid={5e88108d-3c75-4186-8a44-51d64a75d78d}');
    updateCurrentRoomStatus('room_ss', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/officecalendars&guid={0c6fab6f-8e0f-47db-9d3b-9cd2896be6d8}');
    updateCurrentRoomStatus('room_smallmeeting', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/officecalendars&guid={4F8BEC25-C9C5-4F4B-816E-3A6B68DEF37D}');
});

/*
 1000     1 second
 10000     10 seconds
 60000     1 minute
 300000     5 minutes
 600000     10 minutes
 1800000     30 mins
 3600000     1 hour
 */


setInterval(function() {

}, 600000);