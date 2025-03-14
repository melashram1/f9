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

    var data = {"OkPercent": 86.2534549709189, "KoPercent": 13.746545029081105};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8093555525409933, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.994125, 500, 1500, "/api/auth"], "isController": false}, {"data": [0.7430235540369485, 500, 1500, "api/protected/game/market/status/ids"], "isController": false}, {"data": [0.751610528253267, 500, 1500, "/api/user/openBet"], "isController": false}, {"data": [0.8722100101454177, 500, 1500, "/api/user/withdraw-GET"], "isController": false}, {"data": [0.9467159060933791, 500, 1500, "/api/user/deposit-POST"], "isController": false}, {"data": [0.9358809401269514, 500, 1500, "/api/common/home"], "isController": false}, {"data": [0.939481017067224, 500, 1500, "/api/common/game/market/group"], "isController": false}, {"data": [0.8744866108099227, 500, 1500, "/api/user/transaction?trxType=deposit"], "isController": false}, {"data": [0.8755936675461742, 500, 1500, "/api/user/withdraw-POST"], "isController": false}, {"data": [0.8756357875427333, 500, 1500, "/api/user/deposit-GET"], "isController": false}, {"data": [0.7699203187250996, 500, 1500, "api/protected/game/market/status/eventId"], "isController": false}, {"data": [0.8753394894079305, 500, 1500, "/api/user/account"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 235892, 32427, 13.746545029081105, 225.58962576094126, 3, 9228, 86.0, 168.90000000000146, 506.9500000000007, 1408.9400000000096, 260.3253570352582, 9023.7158895502, 248.90485561122802], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/auth", 12000, 0, 0.0, 131.0259166666669, 81, 1772, 95.0, 220.0, 305.0, 522.9899999999998, 13.242942890912362, 27.77336430170238, 6.618805182377395], "isController": false}, {"data": ["api/protected/game/market/status/ids", 120871, 24839, 20.550007859618933, 249.48193528637447, 3, 8815, 72.0, 485.0, 784.0, 1963.9900000000016, 393.0304094479996, 12333.344215570494, 491.2880118099995], "isController": false}, {"data": ["/api/user/openBet", 10866, 11, 0.10123320449107308, 599.5085588072866, 15, 9228, 455.0, 1161.0, 1532.2499999999982, 2499.3199999999997, 36.9285355011487, 90.70421120524122, 43.780509861713405], "isController": false}, {"data": ["/api/user/withdraw-GET", 11828, 1481, 12.52113628677714, 56.22294555292524, 8, 2681, 34.0, 105.0, 157.0, 356.41999999999825, 41.265023461894046, 56.775977887819, 25.79063966368378], "isController": false}, {"data": ["/api/user/deposit-POST", 3791, 0, 0.0, 217.9359008177267, 17, 4174, 137.0, 496.0, 728.3999999999996, 1385.5999999999985, 12.673377216002352, 12.657674177450684, 16.70508829116675], "isController": false}, {"data": ["/api/common/home", 11658, 6, 0.0514668039114771, 246.87931034482807, 11, 8062, 148.0, 556.0, 815.0, 1504.0999999999985, 40.9807540205642, 9130.47700945821, 14.367276067756393], "isController": false}, {"data": ["/api/common/game/market/group", 11484, 2, 0.017415534656913968, 230.68469174503866, 7, 7662, 133.0, 535.0, 795.0, 1490.0, 40.825903331769126, 1767.8393950114562, 14.831285194744252], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 12174, 1488, 12.222769837358305, 59.24733037621169, 10, 2405, 36.0, 107.0, 152.0, 369.5, 41.75856592564135, 43.43434172224928, 25.28350671279066], "isController": false}, {"data": ["/api/user/withdraw-POST", 3790, 33, 0.8707124010554089, 330.81609498680734, 11, 4602, 205.0, 818.9000000000001, 1179.699999999999, 1957.9900000000016, 12.68602261392316, 11.87285685400865, 11.893146200552962], "isController": false}, {"data": ["/api/user/deposit-GET", 11993, 1461, 12.18210622863337, 55.608771783540305, 8, 2372, 33.0, 101.0, 146.0, 371.1799999999985, 41.46713367471484, 61.23892740463908, 25.876463298967558], "isController": false}, {"data": ["api/protected/game/market/status/eventId", 12550, 1532, 12.207171314741036, 373.6287649402387, 9, 9015, 249.0, 788.8999999999996, 1192.0, 2120.4699999999993, 42.3588656599545, 3942.851577530225, 24.447353129915147], "isController": false}, {"data": ["/api/user/account", 12887, 1574, 12.213858927601459, 48.38651354077734, 10, 2000, 29.0, 85.0, 127.0, 317.119999999999, 42.73189688903037, 50.20556391609302, 30.755281257046274], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 51, 0.15727634378758443, 0.021620063418852694], "isController": false}, {"data": ["401/Unauthorized", 32298, 99.60218336571376, 13.691858986315772], "isController": false}, {"data": ["404/Not Found", 45, 0.13877324451845685, 0.019076526546046496], "isController": false}, {"data": ["429/Too Many Requests", 33, 0.10176704598020168, 0.013989452800434097], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 235892, 32427, "401/Unauthorized", 32298, "502/Bad Gateway", 51, "404/Not Found", 45, "429/Too Many Requests", 33, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["api/protected/game/market/status/ids", 120871, 24839, "401/Unauthorized", 24800, "502/Bad Gateway", 39, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/openBet", 10866, 11, "404/Not Found", 10, "401/Unauthorized", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/withdraw-GET", 11828, 1481, "401/Unauthorized", 1446, "404/Not Found", 35, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/common/home", 11658, 6, "502/Bad Gateway", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/common/game/market/group", 11484, 2, "502/Bad Gateway", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 12174, 1488, "401/Unauthorized", 1488, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/withdraw-POST", 3790, 33, "429/Too Many Requests", 33, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/deposit-GET", 11993, 1461, "401/Unauthorized", 1461, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["api/protected/game/market/status/eventId", 12550, 1532, "401/Unauthorized", 1528, "502/Bad Gateway", 4, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/account", 12887, 1574, "401/Unauthorized", 1574, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
