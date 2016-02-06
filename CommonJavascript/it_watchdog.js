function getWatchdogTemp() {
    var XMLPath_DO = "/LSKYDashboardDataCollector/Proxy/XML.aspx?SKIPCACHE=yes&url=http://10.177.54.129/data.xml";
    var XMLPath_NBCHS = "/LSKYDashboardDataCollector/Proxy/XML.aspx?SKIPCACHE=yes&url=http://10.177.200.129/data.xml";
    // Warning temperatures
    var warnHigh = 28;
    var warnLow = 5;
    var critHigh = 30;
    var critLow = 2;

    // DO Watchdog
    //temp_do_swi , temp_do_vmw

    $.get(XMLPath_DO, function(xmlroot){
        $(xmlroot).find('device').each(function() {
            var $device = $(this);
            var deviceID = $device.attr("id");
            var deviceName = $device.attr("name");
            var currentTemp = -999;
            var currentHumid = -999;

            $device.find('field').each(function() {
                if ($(this).attr("key") == "Temp") {
                    currentTemp = ($(this).attr("value"));
                }

                if ($(this).attr("key") == "Humidity") {
                    currentHumid = ($(this).attr("value"));
                }
            });

            // Fill in values for the two sensors we care about
            if (deviceID == '9F0004A3F25158C3') {
                $('#wd_do_swi_title').html(deviceName);
                if (currentTemp != -999) {
                    $('#wd_do_swi_temp').html(currentTemp + ' &deg;C');

                    // Threshold warnings
                    if (currentTemp >= critHigh) {
                        $('#wd_do_swi_temp').addClass("critical");
                    } else if (currentTemp >= warnHigh) {
                        $('#wd_do_swi_temp').addClass("warning");
                    } else if (currentTemp <= critLow) {
                        $('#wd_do_swi_temp').addClass("critical");
                    } else if (currentTemp <= warnLow) {
                        $('#wd_do_swi_temp').addClass("warning");
                    } else {
                        $('#wd_do_swi_temp').removeClass("warning");
                        $('#wd_do_swi_temp').removeClass("critical");
                    }
                }

                if (currentHumid != -999)
                {
                    $('#wd_do_swi_humid').html(currentHumid + ' %')
                }
            }

            if (deviceID == 'CC0000056A877228') {
                $('#wd_do_vmw_title').html(deviceName);
                if (currentTemp != -999) {
                    $('#wd_do_vmw_temp').html(currentTemp + ' &deg;C');

                    if (currentTemp >= critHigh) {
                        $('#wd_do_vmw_temp').addClass("critical");
                    } else if (currentTemp >= warnHigh) {
                        $('#wd_do_vmw_temp').addClass("warning");
                    } else if (currentTemp <= critLow) {
                        $('#wd_do_vmw_temp').addClass("critical");
                    } else if (currentTemp <= warnLow) {
                        $('#wd_do_vmw_temp').addClass("warning");
                    } else {
                        $('#wd_do_vmw_temp').removeClass("warning");
                        $('#wd_do_vmw_temp').removeClass("critical");
                    }
                }
            }
        });
    });



    // NBCHS Watchdog
    //
    
    $.get(XMLPath_NBCHS, function(xmlroot){
        $(xmlroot).find('device').each(function() {
            var $device = $(this);
            var deviceID = $device.attr("id");
            var deviceName = $device.attr("name");
            var currentTemp = -999;
            var currentHumid = -999;

            $device.find('field').each(function() {
                if ($(this).attr("key") == "Temp") {
                    currentTemp = ($(this).attr("value"));
                }

                if ($(this).attr("key") == "Humidity") {
                    currentHumid = ($(this).attr("value"));
                }
            });

            // Fill in values for the two sensors we care about
            if (deviceID == 'ED0004A3F25F36C3') {
                $('#wd_dc_swi_title').html(deviceName);
                if (currentTemp != -999) {
                    $('#wd_dc_swi_temp').html(currentTemp + ' &deg;C');

                    // Threshold warnings
                    if (currentTemp >= critHigh) {
                        $('#wd_dc_swi_temp').addClass("critical");
                    } else if (currentTemp >= warnHigh) {
                        $('#wd_dc_swi_temp').addClass("warning");
                    } else if (currentTemp <= critLow) {
                        $('#wd_dc_swi_temp').addClass("critical");
                    } else if (currentTemp <= warnLow) {
                        $('#wd_dc_swi_temp').addClass("warning");
                    } else {
                        $('#wd_dc_swi_temp').removeClass("warning");
                        $('#wd_dc_swi_temp').removeClass("critical");
                    }
                }

                if (currentHumid != -999)
                {
                    $('#wd_dc_swi_humid').html(currentHumid + ' %')
                }
            }

            if (deviceID == '350000043FA0EC28') {
                $('#wd_dc_vmw_title').html(deviceName);
                if (currentTemp != -999) {
                    $('#wd_dc_vmw_temp').html(currentTemp + ' &deg;C');

                    if (currentTemp >= critHigh) {
                        $('#wd_dc_vmw_temp').addClass("critical");
                    } else if (currentTemp >= warnHigh) {
                        $('#wd_dc_vmw_temp').addClass("warning");
                    } else if (currentTemp <= critLow) {
                        $('#wd_dc_vmw_temp').addClass("critical");
                    } else if (currentTemp <= warnLow) {
                        $('#wd_dc_vmw_temp').addClass("warning");
                    } else {
                        $('#wd_dc_vmw_temp').removeClass("warning");
                        $('#wd_dc_vmw_temp').removeClass("critical");
                    }
                }
            }
        });
    });

    //*/

    // Temporary telephone room watchdog (actually NBCHS's but moved)
    //
    /*
    $.get(XMLPath_NBCHS, function(xmlroot){
        $(xmlroot).find('device').each(function() {
            var $device = $(this);
            var deviceID = $device.attr("id");
            var deviceName = $device.attr("name");
            var currentTemp = -999;
            var currentHumid = -999;

            $device.find('field').each(function() {
                if ($(this).attr("key") == "Temp") {
                    currentTemp = ($(this).attr("value"));
                }

                if ($(this).attr("key") == "Humidity") {
                    currentHumid = ($(this).attr("value"));
                }
            });

            // Fill in values for the two sensors we care about
            if (deviceID == 'ED0004A3F25F36C3') {
                $('#wd_dc_swi_title').html(deviceName);
                if (currentTemp != -999) {
                    $('#wd_dc_swi_temp').html(currentTemp + ' &deg;C');

                    // Threshold warnings
                    if (currentTemp >= critHigh) {
                        $('#wd_dc_swi_temp').addClass("critical");
                    } else if (currentTemp >= warnHigh) {
                        $('#wd_dc_swi_temp').addClass("warning");
                    } else if (currentTemp <= critLow) {
                        $('#wd_dc_swi_temp').addClass("critical");
                    } else if (currentTemp <= warnLow) {
                        $('#wd_dc_swi_temp').addClass("warning");
                    } else {
                        $('#wd_dc_swi_temp').removeClass("warning");
                        $('#wd_dc_swi_temp').removeClass("critical");
                    }
                }

                if (currentHumid != -999)
                {
                    $('#wd_dc_swi_humid').html(currentHumid + ' %')
                }
            }

            

            
        });
    });*/




}