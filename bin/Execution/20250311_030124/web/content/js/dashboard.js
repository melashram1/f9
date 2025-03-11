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

    var data = {"OkPercent": 99.92740998838559, "KoPercent": 0.07259001161440186};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9983235816185655, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9937282229965156, 500, 1500, "/api/user/openBet"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/withdraw-GET"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/deposit-POST"], "isController": false}, {"data": [0.9902439024390244, 500, 1500, "Open bet"], "isController": true}, {"data": [1.0, 500, 1500, "/api/common/home"], "isController": false}, {"data": [1.0, 500, 1500, "/api/common/game/market/group"], "isController": false}, {"data": [0.9996666666666667, 500, 1500, "Login User/api/auth-3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/transaction?trxType=deposit"], "isController": false}, {"data": [0.9959839357429718, 500, 1500, "/api/user/withdraw-POST"], "isController": false}, {"data": [1.0, 500, 1500, "/api/common/game/market/status"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/deposit-GET"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/account"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13776, 10, 0.07259001161440186, 34.288327526132456, 7, 837, 17.0, 87.0, 91.0, 235.45999999999913, 15.321119589479409, 300.5852295839353, 10.0557087585261], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/user/openBet", 1435, 8, 0.5574912891986062, 83.90522648083616, 35, 668, 64.0, 106.0, 221.60000000000014, 446.2800000000002, 4.9650199638781825, 12.164890210563556, 5.886263902488392], "isController": false}, {"data": ["/api/user/withdraw-GET", 1381, 0, 0.0, 15.72266473569878, 12, 87, 15.0, 18.0, 20.0, 40.08000000000038, 4.896381783048804, 7.409202487634952, 3.0602386144055025], "isController": false}, {"data": ["/api/user/deposit-POST", 498, 0, 0.0, 20.636546184738943, 17, 108, 19.0, 23.0, 26.0, 46.02999999999997, 1.6973241582396907, 0.638154102463165, 2.235706146920788], "isController": false}, {"data": ["Open bet", 1435, 8, 0.5574912891986062, 114.7365853658537, 56, 725, 87.0, 167.0, 336.20000000000005, 496.5600000000004, 4.961741000577429, 43.414855573573796, 8.746037603556893], "isController": true}, {"data": ["/api/common/home", 1365, 0, 0.0, 24.40439560439559, 11, 495, 14.0, 20.40000000000009, 50.0, 320.6999999999996, 4.881852028025049, 744.6254747455803, 1.7115086699814381], "isController": false}, {"data": ["/api/common/game/market/group", 1346, 0, 0.0, 15.527488855869256, 7, 472, 9.0, 12.0, 17.0, 281.8299999999997, 4.846573191896933, 137.00088634047717, 1.7606691673688077], "isController": false}, {"data": ["Login User/api/auth-3", 1500, 0, 0.0, 92.03799999999988, 82, 837, 88.0, 95.0, 107.95000000000005, 173.98000000000002, 1.6682403734189253, 3.488417693816167, 0.8329178806590884], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 1416, 0, 0.0, 16.7683615819209, 13, 117, 15.0, 19.0, 21.0, 53.0, 4.944582957950093, 5.528363913972637, 2.9937904628213454], "isController": false}, {"data": ["/api/user/withdraw-POST", 498, 2, 0.40160642570281124, 21.47991967871487, 11, 169, 19.0, 24.0, 30.049999999999955, 88.13999999999987, 1.6997863320795419, 0.6441163297670814, 1.5935496863245704], "isController": false}, {"data": ["/api/common/game/market/status", 1451, 0, 0.0, 30.786354238456227, 14, 486, 22.0, 31.0, 43.0, 315.96000000000004, 4.984832504818213, 31.403471180256144, 2.8769882913550426], "isController": false}, {"data": ["/api/user/deposit-GET", 1400, 0, 0.0, 16.13571428571429, 12, 117, 15.0, 18.0, 19.0, 55.0, 4.929074143837425, 7.999633592652511, 3.0758577909297995], "isController": false}, {"data": ["/api/user/account", 1486, 0, 0.0, 17.490578734858733, 10, 90, 16.0, 23.0, 27.0, 47.12999999999988, 5.015813652059149, 6.434547545171014, 3.6100143179371034], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["403/Forbidden", 8, 80.0, 0.05807200929152149], "isController": false}, {"data": ["429/Too Many Requests", 2, 20.0, 0.014518002322880372], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13776, 10, "403/Forbidden", 8, "429/Too Many Requests", 2, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api/user/openBet", 1435, 8, "403/Forbidden", 8, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/user/withdraw-POST", 498, 2, "429/Too Many Requests", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
