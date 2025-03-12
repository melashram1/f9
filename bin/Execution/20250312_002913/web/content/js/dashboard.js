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

    var data = {"OkPercent": 99.8291530352599, "KoPercent": 0.1708469647400945};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9947655398037077, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9820118756549074, 500, 1500, "/api/user/openBet"], "isController": false}, {"data": [0.9970982952484585, 500, 1500, "/api/user/withdraw-GET"], "isController": false}, {"data": [0.9954909819639278, 500, 1500, "/api/user/deposit-POST"], "isController": false}, {"data": [0.9904727006229388, 500, 1500, "/api/common/home"], "isController": false}, {"data": [0.9934992570579495, 500, 1500, "/api/common/game/market/group"], "isController": false}, {"data": [0.9993333333333333, 500, 1500, "Login User/api/auth-3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/transaction?trxType=deposit"], "isController": false}, {"data": [0.9919839679358717, 500, 1500, "/api/user/withdraw-POST"], "isController": false}, {"data": [0.9908809359944941, 500, 1500, "/api/common/game/market/status"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/deposit-GET"], "isController": false}, {"data": [1.0, 500, 1500, "/api/user/account"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 27510, 47, 0.1708469647400945, 44.438131588512924, 6, 3991, 17.0, 93.0, 99.0, 382.9600000000064, 30.55254460160637, 406.91490750872373, 20.054518333400893], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/user/openBet", 2863, 20, 0.6985679357317499, 104.32902549772949, 35, 3991, 66.0, 116.59999999999991, 230.39999999999918, 810.5600000000027, 9.880318047541483, 24.035109013935287, 11.713580185268906], "isController": false}, {"data": ["/api/user/withdraw-GET", 2757, 8, 0.29017047515415306, 17.650344577439196, 10, 258, 15.0, 20.0, 26.0, 77.42000000000007, 9.725725372607814, 14.710725978922301, 6.078578357879883], "isController": false}, {"data": ["/api/user/deposit-POST", 998, 0, 0.0, 57.51102204408819, 16, 3030, 37.0, 73.0, 93.09999999999991, 321.39999999999964, 3.387690260560225, 2.950926199566525, 4.464442936258469], "isController": false}, {"data": ["/api/common/home", 2729, 6, 0.21986075485525833, 36.23854891901805, 8, 3099, 13.0, 19.0, 42.0, 518.1999999999989, 9.71222765547038, 982.9197346854025, 3.40497043780651], "isController": false}, {"data": ["/api/common/game/market/group", 2692, 3, 0.11144130757800892, 26.972139673105573, 6, 2811, 9.0, 12.0, 16.0, 408.3500000000008, 9.647154949363188, 164.83811626824073, 3.5046305089483454], "isController": false}, {"data": ["Login User/api/auth-3", 3000, 0, 0.0, 100.02066666666661, 83, 1270, 93.0, 109.0, 135.0, 230.92999999999847, 3.3317933044281753, 6.977902045762736, 1.66469603529091], "isController": false}, {"data": ["/api/user/transaction?trxType=deposit", 2814, 0, 0.0, 18.592039800995018, 12, 280, 16.0, 21.0, 26.0, 90.54999999999973, 9.803272634795, 11.042409186256954, 5.935575228098534], "isController": false}, {"data": ["/api/user/withdraw-POST", 998, 6, 0.6012024048096193, 50.81863727454907, 9, 2472, 35.0, 74.0, 106.0, 353.2399999999998, 3.3914778075693164, 2.7832995311230957, 3.179510444596234], "isController": false}, {"data": ["/api/common/game/market/status", 2906, 4, 0.13764624913971094, 47.73296627666904, 12, 3320, 22.0, 33.0, 65.0, 576.5299999999966, 9.941398432502146, 46.501083064215415, 5.737662571883563], "isController": false}, {"data": ["/api/user/deposit-GET", 2779, 0, 0.0, 18.459157970492996, 11, 210, 15.0, 22.0, 32.0, 82.39999999999964, 9.738200447838079, 15.848656907367953, 6.076865318523957], "isController": false}, {"data": ["/api/user/account", 2974, 0, 0.0, 17.864828513786126, 9, 163, 15.0, 25.0, 29.0, 70.75, 9.995093195673945, 12.828859340236468, 7.193734067589549], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 13, 27.659574468085108, 0.04725554343874955], "isController": false}, {"data": ["403/Forbidden", 18, 38.297872340425535, 0.06543075245365322], "isController": false}, {"data": ["404/Not Found", 10, 21.27659574468085, 0.03635041802980734], "isController": false}, {"data": ["429/Too Many Requests", 6, 12.76595744680851, 0.021810250817884406], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 27510, 47, "403/Forbidden", 18, "502/Bad Gateway", 13, "404/Not Found", 10, "429/Too Many Requests", 6, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api/user/openBet", 2863, 20, "403/Forbidden", 18, "404/Not Found", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/user/withdraw-GET", 2757, 8, "404/Not Found", 8, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/common/home", 2729, 6, "502/Bad Gateway", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/common/game/market/group", 2692, 3, "502/Bad Gateway", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/user/withdraw-POST", 998, 6, "429/Too Many Requests", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/common/game/market/status", 2906, 4, "502/Bad Gateway", 4, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
