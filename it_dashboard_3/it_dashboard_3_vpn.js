/**
 * Created by mark.strendin on 2016-06-09.
 */

function DisplayVPNAccounts(tableid, JSONUrl) {
    // https://dashboard.lskysd.ca/LSKYDashboardDataCollector/ActiveDirectory/VPNAccounts.aspx

    $.getJSON(JSONUrl, function(data) {
        $("#" + tableid).empty();
        $("#" + tableid).append("<tbody></tbody>");

        $.each(data.AllVPNUsers, function(categoryIndex, thisUser) {
            // Skip schools that we don't care about having on the dashboard
            if (
                (thisUser.sAMAccountName != "jason.caswell") &&
                (thisUser.sAMAccountName != "ryan.kobelsky") &&
                (thisUser.sAMAccountName != "mark.strendin") &&
                (thisUser.sAMAccountName != "mark.louko") &&
                (thisUser.sAMAccountName != "mike.strendin") &&
                (thisUser.sAMAccountName != "michael.safruik") &&
                (thisUser.sAMAccountName != "craig.wilkinson") &&
                (thisUser.sAMAccountName != "raeleen.grill") &&
                (thisUser.sAMAccountName != "kelsey.etcheverry") &&
                (thisUser.sAMAccountName != "mark.louko")
            )
            {
                var userName = thisUser.sAMAccountName;

                if (thisUser.Enabled == "TRUE") {
                    $('#' + tableid + ' > tbody:last').append("<tr><td align=\"left\" valign=\"top\" style=\"color: rgba(255,255,255, 1);\">"+userName+"</td><td valign=\"top\"><div style='font-size: 8pt; color: rgba(255,255,255, 1);'>" + thisUser.description + "</div></td></tr>");
                } else {
                    $('#' + tableid + ' > tbody:last').append("<tr><td align=\"left\" valign=\"top\" style=\"color: rgba(255,255,255,0.1);\">"+userName+"</td><td valign=\"top\"><div style='font-size: 8pt; color: rgba(255,255,255,0.3);'>" + thisUser.description + "</div></td></tr>");
                }
            }
        });

        //$('#leftside_table > tbody:last').append("<tr><td><b>Total Unresolved</b></td><td align=\"right\"><b class=\"total_count\">"+data.TotalUnresolved+"</b></td></tr>");

    });

}