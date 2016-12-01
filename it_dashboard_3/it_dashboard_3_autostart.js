/**
 * Created by Mark on 2/6/2016.
 */
$(document).ready(function(){
    UpdateGuestAccounts();

    updateCalendarStatus('room_board', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={72452b73-24d2-4291-b7db-4e9f65cc4d9e}');
    updateCalendarStatus('room_meeting', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={3811d3ab-5e47-4ce7-b1de-16a36905f589}');
    updateCalendarStatus('room_ss', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6fd797f6-2ddc-446c-bdc0-638bfbf28a2f}');
    updateCalendarStatus('room_smallmeeting', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={c401f760-485c-4c6f-b56b-3b39ecaaa8a7}');

    updateCalendarStatus('veh_gj', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={a7f20056-8740-4e88-bcdd-9ace9a4f06e3}');
    updateCalendarStatus('veh_bj', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={cfd6dc87-731d-45fc-acdd-27305907f971}');
    updateCalendarStatus('veh_sj', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={bb6a9eb7-cbbd-43db-93c9-eb816d307ff0}');
    updateCalendarStatus('veh_jeep', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6bf86bc7-9700-494b-a6f6-a27596d2b144}');

    // Tomorrow
    updateCalendarStatus_Tomorrow('room_board_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={72452b73-24d2-4291-b7db-4e9f65cc4d9e}');
    updateCalendarStatus_Tomorrow('room_meeting_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={3811d3ab-5e47-4ce7-b1de-16a36905f589}');
    updateCalendarStatus_Tomorrow('room_ss_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6fd797f6-2ddc-446c-bdc0-638bfbf28a2f}');
    updateCalendarStatus_Tomorrow('room_smallmeeting_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={c401f760-485c-4c6f-b56b-3b39ecaaa8a7}');

    updateCalendarStatus_Tomorrow('veh_gj_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={a7f20056-8740-4e88-bcdd-9ace9a4f06e3}');
    updateCalendarStatus_Tomorrow('veh_bj_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={cfd6dc87-731d-45fc-acdd-27305907f971}');
    updateCalendarStatus_Tomorrow('veh_sj_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={bb6a9eb7-cbbd-43db-93c9-eb816d307ff0}');
    updateCalendarStatus_Tomorrow('veh_jeep_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6bf86bc7-9700-494b-a6f6-a27596d2b144}');

    DisplayVPNAccounts('vpnusers', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/ActiveDirectory/VPNAccounts.aspx');
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
    UpdateGuestAccounts();
}, 60000);

setInterval(function() {
    DisplayVPNAccounts('vpnusers', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/ActiveDirectory/VPNAccounts.aspx')
}, 300000);

setInterval(function() {
    updateCalendarStatus('room_board', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={d492d463-8204-460c-99a2-81f7646fb65e}');
    updateCalendarStatus('room_meeting', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={3811d3ab-5e47-4ce7-b1de-16a36905f589}');
    updateCalendarStatus('room_ss', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6fd797f6-2ddc-446c-bdc0-638bfbf28a2f}');
    updateCalendarStatus('room_smallmeeting', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={c401f760-485c-4c6f-b56b-3b39ecaaa8a7}');

    // Tomorrow
    updateCalendarStatus_Tomorrow('room_board_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={d492d463-8204-460c-99a2-81f7646fb65e}');
    updateCalendarStatus_Tomorrow('room_meeting_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={3811d3ab-5e47-4ce7-b1de-16a36905f589}');
    updateCalendarStatus_Tomorrow('room_ss_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6fd797f6-2ddc-446c-bdc0-638bfbf28a2f}');
    updateCalendarStatus_Tomorrow('room_smallmeeting_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={c401f760-485c-4c6f-b56b-3b39ecaaa8a7}');
}, 60000);

setInterval(function() {
    updateCalendarStatus('veh_gj', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={a7f20056-8740-4e88-bcdd-9ace9a4f06e3}');
    updateCalendarStatus('veh_bj', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={cfd6dc87-731d-45fc-acdd-27305907f971}');
    updateCalendarStatus('veh_sj', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={bb6a9eb7-cbbd-43db-93c9-eb816d307ff0}');
    updateCalendarStatus('veh_jeep', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6bf86bc7-9700-494b-a6f6-a27596d2b144}');

    // Tomorrow
    updateCalendarStatus_Tomorrow('veh_gj_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={a7f20056-8740-4e88-bcdd-9ace9a4f06e3}');
    updateCalendarStatus_Tomorrow('veh_bj_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={cfd6dc87-731d-45fc-acdd-27305907f971}');
    updateCalendarStatus_Tomorrow('veh_sj_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={bb6a9eb7-cbbd-43db-93c9-eb816d307ff0}');
    updateCalendarStatus_Tomorrow('veh_jeep_tomorrow', '/LSKYDashboardDataCollector/Sharepoint2013/Calendar.aspx?url=https://portal.lskysd.ca/office&guid={6bf86bc7-9700-494b-a6f6-a27596d2b144}');

}, 60000);

setInterval(function() {
    location.reload();
}, (3600000*2));