function doesElementExist(divID) {
    if($("#" + divID).length == 0) {
        return false;
    } else {
        return true;
    }
}


function updatePingSensorNodes(JSONPath) {

    // Add map pieces
    draw_region_map(strendinMonitorJSONRoot + "/JSON/allsensors.aspx", "region_map");
    draw_city_map(strendinMonitorJSONRoot + "/JSON/allsensors.aspx", "city_map");

}