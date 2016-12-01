/**
 * Created by Mark on 2/6/2016.
 */

function DaysUntil (year, month, day) {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var secondDate = new Date(year,month,day);
    var firstDate = new Date();
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

function UpdateGuestAccounts() {
    var JSONPath = dashboardDataCollectorRoot + "/Proxy/XML.aspx?url=https://guests.lskysd.ca/JSON/";

    $.getJSON(JSONPath, function(data) {

        var activeGuestAccounts = data.TotalActive;

        $('#guest_accounts_active').html(activeGuestAccounts);

    });
}