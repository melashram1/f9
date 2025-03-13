/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.80359870652886, "KoPercent": 0.19640129347114488};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9183149165790465, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9095, 500, 1500, "/api/auth"], "isController": false}, {"data": [0.8287429378531074, 500, 1500, "/api/user/openBet"], "isController": false}, {"data": [0.9415059927045336, 500, 1500, "/api/user/withdraw-GET"], "isController": false}, {"data": [0.9393442622950819, 500, 1500, "/api/user/deposit-POST"], "isController": false}, {"data": [0.921388667198723, 500, 1500, "/api/common/home"], "isController": false}, {"data": [0.9518658734451054, 500, 1500, "/api/common/game/market/group"], "isController": false}, {"data": [0.9529470034670628, 500, 1500, "/api/user/transaction?trxType=deposit"], "isController": false}, {"data": [0.9562146892655368, 500, 1500, "/api/user/withdraw-POST"], "isController": false}, {"data": [0.9503042596348884, 500, 1500, "/api/user/deposit-GET"], "isController": false}, {"data": [0.9147439789516292, 500, 1500, "api/protected/game/market/status/eventId"], "isController": false}, {"data": [0.897962962962963, 500, 1500, "/api/user/account"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 50407, 99, 0.19640129347114488, 1046.3826055904933, 7, 90632, 89.0, 4950.9000000000015, 16890.100000000013, 48024.96000000001, 55.828258909683754, 1761.9073298090639, 36.313684887843976], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/auth", 8000, 5, 0.0625, 938.7215000000032, 82, 90427, 93.0, 574.9000000000005, 2747.2499999999973, 23759.909999999996, 8.860397787558671, 18.568674641624597, 4.4262381056081885], "isController": false}, {"data": ["/api/user/openBet", 4248, 43, 1.012241054613936, 1851.1551318267404, 43, 90140, 198.0, 1532.2999999999997, 7537.0, 46017.020000000004, 14.064082954252001, 33.94756290742966, 17.155945669285472], "isController": false}, {"data": ["/api/user/withdraw-GET", 3838, 7, 0.18238665971860343, 660.7206878582599, 12, 52596, 24.0, 219.29999999999973, 1734.6499999999965, 18669.380000000237, 13.369980596458593, 20.243298544342494, 8.35623787278662], "isController": false}, {"data": ["/api/user/deposit-POST", 1830, 0, 0.0, 491.4939890710382, 16, 43605, 56.5, 352.9000000000001, 1440.249999999999, 13548.76, 6.084181129064433, 4.698107186938959, 8.020319045481749], "isController": false}, {"data": ["/api/common/home", 3759, 2, 0.05320563979781857, 1117.49215216813, 11, 85436, 46.0, 444.0, 2922.0, 32925.600000000006, 13.193177032149375, 1862.945286725221, 4.62288139543556], "isController": false}, {"data": ["/api/common/game/market/group", 3698, 3, 0.08112493239588967, 486.8826392644672, 7, 59714, 22.0, 236.0999999999999, 608.0999999999995, 14639.939999999977, 13.07577798757483, 318.6832970792538, 4.750184972048668], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 4038, 0, 0.0, 539.2379891035166, 13, 90203, 25.0, 209.0999999999999, 589.2499999999986, 17311.0, 13.862093114267863, 15.617812343373453, 8.39306419027937], "isController": false}, {"data": ["/api/user/withdraw-POST", 1770, 8, 0.4519774011299435, 300.37062146892663, 12, 29248, 62.0, 304.0, 531.4499999999998, 10188.36999999998, 6.924232466435076, 5.3264725485478674, 6.491467937282884], "isController": false}, {"data": ["/api/user/deposit-GET", 3944, 0, 0.0, 655.012931034483, 12, 59693, 23.0, 200.5, 603.5, 19435.40000000001, 13.633331144072923, 22.19580924246693, 8.507518165100194], "isController": false}, {"data": ["api/protected/game/market/status/eventId", 9882, 23, 0.2327464076097956, 1294.2246508803867, 28, 90632, 67.0, 530.0, 2939.250000000002, 35224.12, 31.4880844270679, 2919.9705392925935, 18.134679087882727], "isController": false}, {"data": ["/api/user/account", 5400, 8, 0.14814814814814814, 1824.6492592592558, 9, 61263, 22.0, 900.9000000000005, 12215.949999999986, 43572.81999999999, 17.767599794685513, 22.830719887003003, 12.768868615180113], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: javax.net.ssl.SSLProtocolException/Non HTTP response message: Received close_notify during handshake", 8, 8.080808080808081, 0.015870811593627868], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: b2c.future9.com:443 failed to respond", 9, 9.090909090909092, 0.017854663042831353], "isController": false}, {"data": ["502/Bad Gateway", 5, 5.05050505050505, 0.009919257246017419], "isController": false}, {"data": ["403/Forbidden", 40, 40.4040404040404, 0.07935405796813935], "isController": false}, {"data": ["404/Not Found", 7, 7.070707070707071, 0.013886960144424386], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Broken pipe (Write failed)", 9, 9.090909090909092, 0.017854663042831353], "isController": false}, {"data": ["429/Too Many Requests", 8, 8.080808080808081, 0.015870811593627868], "isController": false}, {"data": ["Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 5, 5.05050505050505, 0.009919257246017419], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: master.future9.com:443 failed to respond", 8, 8.080808080808081, 0.015870811593627868], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 50407, 99, "403/Forbidden", 40, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: b2c.future9.com:443 failed to respond", 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Broken pipe (Write failed)", 9, "Non HTTP response code: javax.net.ssl.SSLProtocolException/Non HTTP response message: Received close_notify during handshake", 8, "429/Too Many Requests", 8], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api/auth", 8000, 5, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 4, "Non HTTP response code: javax.net.ssl.SSLProtocolException/Non HTTP response message: Received close_notify during handshake", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/openBet", 4248, 43, "403/Forbidden", 40, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: b2c.future9.com:443 failed to respond", 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Broken pipe (Write failed)", 1, "", "", "", ""], "isController": false}, {"data": ["/api/user/withdraw-GET", 3838, 7, "404/Not Found", 7, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/common/home", 3759, 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: master.future9.com:443 failed to respond", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/common/game/market/group", 3698, 3, "502/Bad Gateway", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/user/withdraw-POST", 1770, 8, "429/Too Many Requests", 8, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["api/protected/game/market/status/eventId", 9882, 23, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Broken pipe (Write failed)", 8, "Non HTTP response code: javax.net.ssl.SSLProtocolException/Non HTTP response message: Received close_notify during handshake", 6, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: master.future9.com:443 failed to respond", 6, "502/Bad Gateway", 2, "Non HTTP response code: javax.net.ssl.SSLHandshakeException/Non HTTP response message: Remote host terminated the handshake", 1], "isController": false}, {"data": ["/api/user/account", 5400, 8, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: b2c.future9.com:443 failed to respond", 7, "Non HTTP response code: javax.net.ssl.SSLProtocolException/Non HTTP response message: Received close_notify during handshake", 1, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
