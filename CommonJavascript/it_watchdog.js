const wd_warning_temperature_high = 28;
const wd_warning_temperature_low = 5;
const wd_critical_temperature_high = 30;
const wd_critical_temperature_low = 2;

function putTemperatureInBox(currentTemp, container) {
    $(container).html(currentTemp + ' &deg;C');

    // Threshold warnings
    if (currentTemp >= wd_critical_temperature_high) {
        $(container).addClass("critical");
    } else if (currentTemp >= wd_warning_temperature_high) {
        $(container).addClass("warning");
    } else if (currentTemp <= wd_critical_temperature_low) {
        $(container).addClass("critical");
    } else if (currentTemp <= wd_warning_temperature_low) {
        $(container).addClass("warning");
    } else {
        $(container).removeClass("warning");
        $(container).removeClass("critical");
    }
}

function putHumidityInBox(currentHumidity, container) {
    $(container).html(currentHumidity + ' %')
}

function getWatchdogTemp() {
    var JSONPath_DO = dashboardDataCollectorRoot + "/Proxy/JSON.aspx?SKIPCACHE=yes&url=http://10.177.54.129/api";
    var JSONPath_NBCHS = dashboardDataCollectorRoot + "/Proxy/JSON.aspx?SKIPCACHE=yes&url=http://10.177.200.129/api";

    // Device IDs:
    // 9F0004A3F25158C3 - DO server room Watchdog 100
    // CC0000056A877228 - DO server room temperature probe
    // ED0004A3F25F36C3 - NBCHS server room Watchdog 100
    // 350000043FA0EC28 - Remote temperature probe at NBCHS

    // Warning temperatures


    // DO
    $.getJSON(JSONPath_DO, function(data) {
        $.each(data.data.dev, function(sensorID, thisSensor) {
            if (sensorID == '9F0004A3F25158C3') {
                $('#wd_do_swi_title').html(thisSensor.label);
                $.each(thisSensor.entity, function(entity, thisEntity) {
                    $.each(thisEntity.measurement, function(measurement, thisMeasurement) {
                        if (thisMeasurement.type == "temperature") {
                            putTemperatureInBox(thisMeasurement.value, '#wd_do_swi_temp');
                        }

                        if (thisMeasurement.type == "humidity") {
                            putHumidityInBox(thisMeasurement.value, '#wd_do_swi_humid')

                        }
                    });
                });
            }

            if (sensorID == 'CC0000056A877228') {
                $('#wd_do_vmw_title').html(thisSensor.label);
                $.each(thisSensor.entity, function(entity, thisEntity) {
                    $.each(thisEntity.measurement, function(measurement, thisMeasurement) {
                        if (thisMeasurement.type == "temperature") {
                            putTemperatureInBox(thisMeasurement.value, '#wd_do_vmw_temp');
                        }
                    });
                });
            }
        });
    });

    // NBCHS
    $.getJSON(JSONPath_NBCHS, function(data) {
        $.each(data.data.dev, function(sensorID, thisSensor) {
            if (sensorID == 'ED0004A3F25F36C3') {
                $('#wd_dc_swi_title').html(thisSensor.label);
                $.each(thisSensor.entity, function(entity, thisEntity) {
                    $.each(thisEntity.measurement, function(measurement, thisMeasurement) {
                        if (thisMeasurement.type == "temperature") {
                            putTemperatureInBox(thisMeasurement.value, '#wd_dc_swi_temp');
                        }

                        if (thisMeasurement.type == "humidity") {
                            putHumidityInBox(thisMeasurement.value, '#wd_dc_swi_humid')

                        }
                    });
                });
            }

            if (sensorID == '350000043FA0EC28') {
                $('#wd_dc_vmw_title').html(thisSensor.label);
                $.each(thisSensor.entity, function(entity, thisEntity) {
                    $.each(thisEntity.measurement, function(measurement, thisMeasurement) {
                        if (thisMeasurement.type == "temperature") {
                            putTemperatureInBox(thisMeasurement.value, '#wd_dc_vmw_temp');
                        }
                    });
                });
            }
        });
    });
}