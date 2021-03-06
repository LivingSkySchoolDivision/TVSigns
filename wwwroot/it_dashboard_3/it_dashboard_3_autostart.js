/**
 * Created by Mark on 2/6/2016.
 */
$(document).ready(function(){
    InitializeAllLocationBoxes();
    UpdateAllSensorGraphs();
    UpdateAllSensorValues();
    UpdateDetailedSNMPValues();
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

/*
setInterval(function() {
    DisplayVPNAccounts('vpnusers', 'https://dashboard.lskysd.ca/LSKYDashboardDataCollector/ActiveDirectory/VPNAccounts.aspx')
}, 300000);
*/

setInterval(function() {
    location.reload();
}, (5400000));

// Every 5 minutes, updadate the graphs
setInterval(function() {
    UpdateAllSensorGraphs();
}, (300000));

// Every 4 minutes, update the values
setInterval(function() {
    UpdateAllSensorValues();
}, (300000));



function InitializeAllLocationBoxes() {
    // IDs are from https://status.lskysd.ca/strendinmonitor/
    // InitializeFacilitySensorBox(divName,locationName,swapinandout,SNMPGraphMax,routerSNMPID,serverPingID, buttonPingIDs) {
/*
,
        { name:'IDRAC', id:00 },
        { name:'ESXI', id:00 },
        { name:'SCCM', id:00 }
*/
    InitializeFacilitySensorBox("BCS","Battleford Central",false,100,9,8,[
        { name:'TYCO', id:37 },
        { name:'MACMINI', id:94 },
        { name:'IDRAC', id:139 },
        { name:'ESXI', id:140 },
        { name:'SCCM', id:141 }
        ]);


    InitializeFacilitySensorBox("Bready","Bready",false,100,10,9,[
        { name:'TYCO', id:48 },
        { name:'MACMINI', id:96 },
        { name:'IDRAC', id:142 },
        { name:'ESXI', id:143 },
        { name:'SCCM', id:144 }
        ]);


    InitializeFacilitySensorBox("CKCS","Cut Knife",false,100,13,12,[
        { name:'TYCO', id:41 },
        { name:'MACMINI', id:99 },
        { name:'IDRAC', id:149 },
        { name:'ESXI', id:150 },
        { name:'SCCM', id:151 }
        ]);

    InitializeFacilitySensorBox("Cando","Cando",false,50,11,10,[
        { name:'TYCO', id:42 },
        { name:'ROVER', id:62 },
        { name:'MACMINI', id:100 },
        { name:'IDRAC', id:152 },
        { name:'ESXI', id:153 },
        { name:'SCCM', id:154 }
        ]);

    InitializeFacilitySensorBox("Connaught","Connaught",false,100,14,13,[
        { name:'TYCO', id:44 },
        { name:'MACMINI', id:101 },
        { name:'IDRAC', id:157 },
        { name:'ESXI', id:158 },
        { name:'SCCM', id:159 }
        ]);

    InitializeFacilitySensorBox("DivisionOffice","Division Office",false,1000,5,6,[
        { name:'TYCO', id:40 },
        { name:'MACMINI', id:92 },
        { name:'DEPLOY', id:155 },
        { name:'SCCM', id:156 }
        ]);

    InitializeFacilitySensorBox("Hafford","Hafford",false,100,15,14,[
        { name:'TYCO', id:45 },
        { name:'MACMINI', id:103 },
        { name:'IDRAC', id:160 },
        { name:'ESXI', id:161 },
        { name:'SCCM', id:162 },
        ]);

    InitializeFacilitySensorBox("HCES","Hartley Clark",false,50,16,15,[
        { name:'TYCO', id:56 },
        { name:'ROVER', id:65 },
        { name:'MACMINI', id:104 },
        { name:'IDRAC', id:163 },
        { name:'ESXI', id:164 },
        { name:'SCCM', id:165 }
        ]);

    InitializeFacilitySensorBox("Heritage","Heritage",false,100,17,16,[
        { name:'ROVER', id:66 },
        { name:'MACMINI', id:105 },
        { name:'IDRAC', id:166 },
        { name:'ESXI', id:167 },
        { name:'SCCM', id:168 }
        ]);

    InitializeFacilitySensorBox("Kerrobert","Kerrobert",false,100,18,17,[
        { name:'TYCO', id:38 },
        { name:'MACMINI', id:106 },
        { name:'IDRAC', id:169 },
        { name:'ESXI', id:170 },
        { name:'SCCM', id:171 }
        ]);

    InitializeFacilitySensorBox("Lawrence","Lawrence",false,100,3,3,[
        { name:'TYCO', id:34 },
        { name:'MACMINI', id:107 },
        { name:'IDRAC', id:172 },
        { name:'ESXI', id:173 },
        { name:'SCCM', id:174 }
        ]);

    InitializeFacilitySensorBox("Leoville","Leoville",false,50,19,18,[
        { name:'TYCO', id:49 },
        { name:'ROVER', id:79 },
        { name:'MACMINI', id:108 },
        { name:'IDRAC', id:175 },
        { name:'ESXI', id:176 },
        { name:'SCCM', id:177 }
        ]);

    InitializeFacilitySensorBox("Luseland","Luseland",false,100,20,19,[
        { name:'TYCO', id:35 },
        { name:'MACMINI', id:109 },
        { name:'IDRAC', id:178 },
        { name:'ESXI', id:179 },
        { name:'SCCM', id:180 }
        ]);

    InitializeFacilitySensorBox("Macklin","Macklin",false,100,21,20,[
        { name:'TYCO', id:36 },
        { name:'MACMINI', id:110 },
        { name:'IDRAC', id:181 },
        { name:'ESXI', id:182 },
        { name:'SCCM', id:183 }
        ]);

    InitializeFacilitySensorBox("Maymont","Maymont",false,100,23,21,[
        { name:'TYCO', id:46 },
        { name:'MACMINI', id:111 },
        { name:'IDRAC', id:184 },
        { name:'ESXI', id:185 },
        { name:'SCCM', id:186 }
        ]);

    InitializeFacilitySensorBox("McKitrick","McKitrick",false,100,24,22,[
        { name:'TYCO', id:47 },
        { name:'MACMINI', id:112 },
        { name:'IDRAC', id:187 },
        { name:'ESXI', id:188 },
        { name:'SCCM', id:189 }
        ]);

    InitializeFacilitySensorBox("McLurg","McLurg",false,100,25,23,[
        { name:'TYCO', id:50 },
        { name:'MACMINI', id:114 },
        { name:'IDRAC', id:190 },
        { name:'ESXI', id:191 },
        { name:'SCCM', id:192 }
        ]);

    InitializeFacilitySensorBox("Medstead","Medstead",false,100,26,24,[
        { name:'TYCO', id:51 },
        { name:'MACMINI', id:115 },
        { name:'IDRAC', id:193 },
        { name:'ESXI', id:194 },
        { name:'SCCM', id:195 }
        ]);

    InitializeFacilitySensorBox("NBCHS","NBCHS",false,1000,27,25,[
        { name:'TYCO', id:53 },
        { name:'ROVER', id:60 },
        { name:'MACMINI', id:116 },
        { name:'IDRAC', id:196 },
        { name:'ESXI', id:197 },
        { name:'SCCM', id:198 }
        ]);

    InitializeFacilitySensorBox("NCES","NCES",false,50,28,26,[
        { name:'TYCO', id:52 },
        { name:'ROVER', id:76 },
        { name:'MACMINI', id:124 },
        { name:'IDRAC', id:199 },
        { name:'ESXI', id:200 },
        { name:'SCCM', id:201 }
        ]);

    InitializeFacilitySensorBox("SHS","Spiritwood High",false,100,30,28,[
        { name:'TYCO', id:54 },
        { name:'MACMINI', id:117 },
        { name:'IDRAC', id:202 },
        { name:'ESXI', id:203 },
        { name:'SCCM', id:204 }
        ]);

    InitializeFacilitySensorBox("StVital","St.Vital",false,100,33,31,[
        { name:'TYCO', id:43 },
        { name:'MACMINI', id:118 },
        { name:'IDRAC', id:205 },
        { name:'ESXI', id:206 },
        { name:'SCCM', id:207 }
        ]);

    InitializeFacilitySensorBox("UCHS","Unity High",false,100,31,29,[
        { name:'TYCO', id:39 },
        { name:'MACMINI', id:119 },
        { name:'IDRAC', id:208 },
        { name:'ESXI', id:209 },
        { name:'SCCM', id:210 }
        ]);

    InitializeFacilitySensorBox("UPS","Unity Public",false,100,32,30,[
        { name:'TYCO', id:55 },
        { name:'MACMINI', id:121 },
        { name:'IDRAC', id:211 },
        { name:'ESXI', id:212 },
        { name:'SCCM', id:213 }
        ]);
}
