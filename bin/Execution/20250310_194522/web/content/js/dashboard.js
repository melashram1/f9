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

    var data = {"OkPercent": 98.8579926867871, "KoPercent": 1.1420073132129018};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9883002237624843, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.899902479799387, 500, 1500, "/api/user/openBet"], "isController": false}, {"data": [0.9946900114810563, 500, 1500, "/api/user/withdraw-GET"], "isController": false}, {"data": [0.99800796812749, 500, 1500, "/api/user/deposit-POST"], "isController": false}, {"data": [0.9997832056655586, 500, 1500, "/api/common/home"], "isController": false}, {"data": [0.9996358339402768, 500, 1500, "/api/common/game/market/group"], "isController": false}, {"data": [0.9983333333333333, 500, 1500, "Login User/api/auth-3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/account-0"], "isController": false}, {"data": [0.9967463573348423, 500, 1500, "/api/user/transaction?trxType=deposit"], "isController": false}, {"data": [0.9970059880239521, 500, 1500, "/api/user/withdraw-POST"], "isController": false}, {"data": [0.9967189728958631, 500, 1500, "/api/user/deposit-GET"], "isController": false}, {"data": [0.9967338429464906, 500, 1500, "/api/user/account"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 73292, 837, 1.1420073132129018, 23.718236642471346, 0, 2434, 16.0, 74.0, 89.0, 119.0, 81.51806995747918, 2439.810348568801, 41.94190331129621], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/user/openBet", 7178, 706, 9.83560880468097, 81.42867093898043, 8, 903, 69.0, 105.0, 148.0, 382.6300000000001, 24.484338278182744, 55.05601729347096, 25.72768358137171], "isController": false}, {"data": ["/api/user/withdraw-GET", 6968, 37, 0.5309988518943742, 19.472588978186003, 8, 183, 16.0, 24.0, 34.0, 89.30999999999949, 24.107723605364036, 36.332435530305915, 15.067327253352524], "isController": false}, {"data": ["/api/user/deposit-POST", 502, 1, 0.199203187250996, 78.55776892430275, 10, 404, 73.0, 97.69999999999999, 125.5499999999999, 189.84999999999985, 1.7037047092841726, 2.432583607102616, 2.248183079106879], "isController": false}, {"data": ["/api/common/home", 6919, 0, 0.0, 24.0687960687961, 12, 750, 17.0, 34.0, 47.0, 137.80000000000018, 24.043339866283027, 5837.0485446431985, 8.429256847651962], "isController": false}, {"data": ["/api/common/game/market/group", 6865, 0, 0.0, 14.702112163146412, 7, 573, 10.0, 15.0, 19.0, 156.7400000000016, 23.94823135421754, 1267.8281694232714, 8.69994342164934], "isController": false}, {"data": ["Login User/api/auth-3", 1500, 0, 0.0, 99.5119999999999, 83, 2434, 90.0, 110.90000000000009, 135.95000000000005, 219.99, 1.6683554130903615, 3.4883085041497557, 0.8329753175853558], "isController": false}, {"data": ["/api/user/account-0", 14390, 0, 0.0, 0.3311327310632382, 0, 70, 0.0, 1.0, 1.0, 2.0, 48.64559704948734, 137.96000278786767, 0.0], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 7069, 23, 0.3253642665157731, 20.323808176545473, 7, 252, 17.0, 25.0, 36.0, 92.0, 24.274995278240414, 27.081326809077797, 14.697751047372128], "isController": false}, {"data": ["/api/user/withdraw-POST", 501, 1, 0.1996007984031936, 70.05588822355296, 11, 558, 59.0, 88.40000000000003, 128.39999999999986, 353.82000000000016, 1.701656482767756, 2.25401885259613, 1.5953029525947715], "isController": false}, {"data": ["/api/user/deposit-GET", 7010, 23, 0.3281027104136947, 19.819258202567777, 8, 207, 16.0, 26.0, 36.0, 89.89000000000033, 24.16549746107149, 39.11943750258546, 15.07983679455535], "isController": false}, {"data": ["/api/user/account", 14390, 46, 0.31966643502432246, 16.646699096594975, 7, 502, 14.0, 21.0, 29.0, 78.0, 48.573839662447256, 199.9282535601266, 34.95988264767932], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["403/Forbidden", 681, 81.36200716845879, 0.9291600720406047], "isController": false}, {"data": ["401/Unauthorized", 138, 16.487455197132615, 0.18828794411395514], "isController": false}, {"data": ["404/Not Found", 17, 2.031063321385902, 0.023194891666211866], "isController": false}, {"data": ["429/Too Many Requests", 1, 0.11947431302270012, 0.0013644053921301096], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 73292, 837, "403/Forbidden", 681, "401/Unauthorized", 138, "404/Not Found", 17, "429/Too Many Requests", 1, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api/user/openBet", 7178, 706, "403/Forbidden", 681, "401/Unauthorized", 23, "404/Not Found", 2, "", "", "", ""], "isController": false}, {"data": ["/api/user/withdraw-GET", 6968, 37, "401/Unauthorized", 22, "404/Not Found", 15, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/deposit-POST", 502, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 7069, 23, "401/Unauthorized", 23, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/withdraw-POST", 501, 1, "429/Too Many Requests", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/deposit-GET", 7010, 23, "401/Unauthorized", 23, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/account", 14390, 46, "401/Unauthorized", 46, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
