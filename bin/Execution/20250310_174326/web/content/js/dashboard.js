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

    var data = {"OkPercent": 74.55621301775147, "KoPercent": 25.443786982248522};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.742603550295858, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/api/user/openBet?deleted=false"], "isController": false}, {"data": [0.0, 500, 1500, "/api/user/openBet"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/withdraw-GET"], "isController": false}, {"data": [0.1, 500, 1500, "/api/user/deposit-POST"], "isController": false}, {"data": [1.0, 500, 1500, "/api/common/home"], "isController": false}, {"data": [1.0, 500, 1500, "/api/common/game/market/group"], "isController": false}, {"data": [0.95, 500, 1500, "Login User/api/auth-3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/account-0"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/transaction?trxType=deposit"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/withdraw-POST"], "isController": false}, {"data": [0.1, 500, 1500, "/api/user/deposit-GET"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/account"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 169, 43, 25.443786982248522, 36.834319526627226, 0, 666, 17.0, 91.0, 123.0, 341.90000000000526, 8.521581282775312, 155.4687303032977, 4.90664550978217], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/user/openBet?deleted=false", 10, 10, 100.0, 12.1, 11, 14, 12.0, 13.9, 14.0, 14.0, 1.6347882949158083, 0.5268360716037274, 0.9706555501062613], "isController": false}, {"data": ["/api/user/openBet", 15, 15, 100.0, 54.00000000000001, 32, 175, 35.0, 173.2, 175.0, 175.0, 1.155001155001155, 0.42071819415569417, 1.2035021800646801], "isController": false}, {"data": ["/api/user/withdraw-GET", 10, 0, 0.0, 16.299999999999997, 14, 19, 16.0, 19.0, 19.0, 19.0, 1.6390755613833796, 2.4608542656941483, 1.0148182674971316], "isController": false}, {"data": ["/api/user/deposit-POST", 10, 9, 90.0, 57.3, 39, 121, 52.0, 114.60000000000002, 121.0, 121.0, 1.582528881152081, 0.5579032481405286, 2.091905364772907], "isController": false}, {"data": ["/api/common/home", 10, 0, 0.0, 61.9, 39, 91, 58.5, 90.5, 91.0, 91.0, 1.6268098259313486, 355.5103734545307, 0.5608045591345372], "isController": false}, {"data": ["/api/common/game/market/group", 10, 0, 0.0, 19.900000000000002, 13, 30, 19.0, 29.8, 30.0, 30.0, 1.6531658125309967, 99.83571664737973, 0.5908776244007273], "isController": false}, {"data": ["Login User/api/auth-3", 10, 0, 0.0, 171.4, 101, 666, 108.5, 617.3000000000002, 666.0, 666.0, 1.1303266644060133, 2.347193964055612, 0.5619622117667006], "isController": false}, {"data": ["/api/user/account-0", 32, 0, 0.0, 1.6562499999999998, 0, 14, 0.0, 7.4999999999999964, 12.699999999999996, 14.0, 1.9819150253932862, 5.469076609531772, 0.0], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 10, 0, 0.0, 16.400000000000002, 15, 19, 16.0, 18.8, 19.0, 19.0, 1.6118633139909735, 1.7854849190038686, 0.9664883542875564], "isController": false}, {"data": ["/api/user/withdraw-POST", 10, 0, 0.0, 53.4, 19, 77, 53.5, 75.5, 77.0, 77.0, 1.6061676839061998, 2.0281004055573404, 1.4963710648891744], "isController": false}, {"data": ["/api/user/deposit-GET", 10, 9, 90.0, 13.2, 12, 17, 12.5, 16.9, 17.0, 17.0, 1.6350555918901242, 0.8028378433616743, 1.0107326070961413], "isController": false}, {"data": ["/api/user/account", 32, 0, 0.0, 35.71874999999999, 13, 203, 18.0, 108.29999999999993, 194.54999999999998, 203.0, 1.9592236576256656, 7.905355051888815, 1.398625482152697], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 15, 34.883720930232556, 8.875739644970414], "isController": false}, {"data": ["Value in json path '$..message' expected to match regexp 'Ok', but it did not match: '[]'", 10, 23.25581395348837, 5.9171597633136095], "isController": false}, {"data": ["403/Forbidden", 9, 20.930232558139537, 5.325443786982248], "isController": false}, {"data": ["404/Not Found", 9, 20.930232558139537, 5.325443786982248], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 169, 43, "400/Bad Request", 15, "Value in json path '$..message' expected to match regexp 'Ok', but it did not match: '[]'", 10, "403/Forbidden", 9, "404/Not Found", 9, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api/user/openBet?deleted=false", 10, 10, "Value in json path '$..message' expected to match regexp 'Ok', but it did not match: '[]'", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/openBet", 15, 15, "400/Bad Request", 15, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/user/deposit-POST", 10, 9, "403/Forbidden", 9, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/user/deposit-GET", 10, 9, "404/Not Found", 9, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
