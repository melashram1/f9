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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 77.0, "minX": 0.0, "maxY": 599.0, "series": [{"data": [[0.0, 77.0], [0.1, 77.0], [0.2, 77.0], [0.3, 78.0], [0.4, 78.0], [0.5, 78.0], [0.6, 78.0], [0.7, 79.0], [0.8, 79.0], [0.9, 79.0], [1.0, 79.0], [1.1, 79.0], [1.2, 79.0], [1.3, 79.0], [1.4, 79.0], [1.5, 79.0], [1.6, 79.0], [1.7, 79.0], [1.8, 79.0], [1.9, 79.0], [2.0, 79.0], [2.1, 79.0], [2.2, 79.0], [2.3, 79.0], [2.4, 79.0], [2.5, 79.0], [2.6, 79.0], [2.7, 80.0], [2.8, 80.0], [2.9, 80.0], [3.0, 80.0], [3.1, 80.0], [3.2, 80.0], [3.3, 80.0], [3.4, 80.0], [3.5, 80.0], [3.6, 80.0], [3.7, 80.0], [3.8, 80.0], [3.9, 80.0], [4.0, 80.0], [4.1, 80.0], [4.2, 80.0], [4.3, 80.0], [4.4, 80.0], [4.5, 80.0], [4.6, 80.0], [4.7, 80.0], [4.8, 80.0], [4.9, 80.0], [5.0, 80.0], [5.1, 80.0], [5.2, 80.0], [5.3, 80.0], [5.4, 80.0], [5.5, 80.0], [5.6, 80.0], [5.7, 80.0], [5.8, 80.0], [5.9, 80.0], [6.0, 80.0], [6.1, 80.0], [6.2, 80.0], [6.3, 80.0], [6.4, 80.0], [6.5, 80.0], [6.6, 80.0], [6.7, 80.0], [6.8, 80.0], [6.9, 80.0], [7.0, 80.0], [7.1, 81.0], [7.2, 81.0], [7.3, 81.0], [7.4, 81.0], [7.5, 81.0], [7.6, 81.0], [7.7, 81.0], [7.8, 81.0], [7.9, 81.0], [8.0, 81.0], [8.1, 81.0], [8.2, 81.0], [8.3, 81.0], [8.4, 81.0], [8.5, 81.0], [8.6, 81.0], [8.7, 81.0], [8.8, 81.0], [8.9, 81.0], [9.0, 81.0], [9.1, 81.0], [9.2, 81.0], [9.3, 81.0], [9.4, 81.0], [9.5, 81.0], [9.6, 81.0], [9.7, 81.0], [9.8, 81.0], [9.9, 81.0], [10.0, 81.0], [10.1, 81.0], [10.2, 81.0], [10.3, 81.0], [10.4, 81.0], [10.5, 81.0], [10.6, 81.0], [10.7, 81.0], [10.8, 81.0], [10.9, 81.0], [11.0, 81.0], [11.1, 81.0], [11.2, 81.0], [11.3, 81.0], [11.4, 81.0], [11.5, 81.0], [11.6, 81.0], [11.7, 81.0], [11.8, 81.0], [11.9, 81.0], [12.0, 81.0], [12.1, 81.0], [12.2, 81.0], [12.3, 81.0], [12.4, 81.0], [12.5, 81.0], [12.6, 81.0], [12.7, 81.0], [12.8, 81.0], [12.9, 81.0], [13.0, 81.0], [13.1, 81.0], [13.2, 81.0], [13.3, 81.0], [13.4, 81.0], [13.5, 81.0], [13.6, 81.0], [13.7, 82.0], [13.8, 82.0], [13.9, 82.0], [14.0, 82.0], [14.1, 82.0], [14.2, 82.0], [14.3, 82.0], [14.4, 82.0], [14.5, 82.0], [14.6, 82.0], [14.7, 82.0], [14.8, 82.0], [14.9, 82.0], [15.0, 82.0], [15.1, 82.0], [15.2, 82.0], [15.3, 82.0], [15.4, 82.0], [15.5, 82.0], [15.6, 82.0], [15.7, 82.0], [15.8, 82.0], [15.9, 82.0], [16.0, 82.0], [16.1, 82.0], [16.2, 82.0], [16.3, 82.0], [16.4, 82.0], [16.5, 82.0], [16.6, 82.0], [16.7, 82.0], [16.8, 82.0], [16.9, 82.0], [17.0, 82.0], [17.1, 82.0], [17.2, 82.0], [17.3, 82.0], [17.4, 82.0], [17.5, 82.0], [17.6, 82.0], [17.7, 82.0], [17.8, 82.0], [17.9, 82.0], [18.0, 82.0], [18.1, 82.0], [18.2, 82.0], [18.3, 82.0], [18.4, 82.0], [18.5, 82.0], [18.6, 82.0], [18.7, 82.0], [18.8, 82.0], [18.9, 82.0], [19.0, 82.0], [19.1, 82.0], [19.2, 82.0], [19.3, 82.0], [19.4, 82.0], [19.5, 82.0], [19.6, 82.0], [19.7, 82.0], [19.8, 82.0], [19.9, 82.0], [20.0, 82.0], [20.1, 82.0], [20.2, 82.0], [20.3, 82.0], [20.4, 82.0], [20.5, 82.0], [20.6, 82.0], [20.7, 82.0], [20.8, 82.0], [20.9, 82.0], [21.0, 82.0], [21.1, 82.0], [21.2, 82.0], [21.3, 82.0], [21.4, 82.0], [21.5, 82.0], [21.6, 82.0], [21.7, 82.0], [21.8, 82.0], [21.9, 82.0], [22.0, 82.0], [22.1, 82.0], [22.2, 82.0], [22.3, 82.0], [22.4, 82.0], [22.5, 82.0], [22.6, 82.0], [22.7, 82.0], [22.8, 82.0], [22.9, 82.0], [23.0, 82.0], [23.1, 82.0], [23.2, 82.0], [23.3, 82.0], [23.4, 82.0], [23.5, 82.0], [23.6, 83.0], [23.7, 83.0], [23.8, 83.0], [23.9, 83.0], [24.0, 83.0], [24.1, 83.0], [24.2, 83.0], [24.3, 83.0], [24.4, 83.0], [24.5, 83.0], [24.6, 83.0], [24.7, 83.0], [24.8, 83.0], [24.9, 83.0], [25.0, 83.0], [25.1, 83.0], [25.2, 83.0], [25.3, 83.0], [25.4, 83.0], [25.5, 83.0], [25.6, 83.0], [25.7, 83.0], [25.8, 83.0], [25.9, 83.0], [26.0, 83.0], [26.1, 83.0], [26.2, 83.0], [26.3, 83.0], [26.4, 83.0], [26.5, 83.0], [26.6, 83.0], [26.7, 83.0], [26.8, 83.0], [26.9, 83.0], [27.0, 83.0], [27.1, 83.0], [27.2, 83.0], [27.3, 83.0], [27.4, 83.0], [27.5, 83.0], [27.6, 83.0], [27.7, 83.0], [27.8, 83.0], [27.9, 83.0], [28.0, 83.0], [28.1, 83.0], [28.2, 83.0], [28.3, 83.0], [28.4, 83.0], [28.5, 83.0], [28.6, 83.0], [28.7, 83.0], [28.8, 83.0], [28.9, 83.0], [29.0, 83.0], [29.1, 83.0], [29.2, 83.0], [29.3, 83.0], [29.4, 83.0], [29.5, 83.0], [29.6, 83.0], [29.7, 83.0], [29.8, 83.0], [29.9, 83.0], [30.0, 83.0], [30.1, 83.0], [30.2, 83.0], [30.3, 83.0], [30.4, 83.0], [30.5, 83.0], [30.6, 83.0], [30.7, 83.0], [30.8, 83.0], [30.9, 83.0], [31.0, 83.0], [31.1, 83.0], [31.2, 83.0], [31.3, 83.0], [31.4, 83.0], [31.5, 83.0], [31.6, 83.0], [31.7, 83.0], [31.8, 83.0], [31.9, 83.0], [32.0, 83.0], [32.1, 83.0], [32.2, 83.0], [32.3, 83.0], [32.4, 83.0], [32.5, 83.0], [32.6, 83.0], [32.7, 83.0], [32.8, 83.0], [32.9, 83.0], [33.0, 83.0], [33.1, 83.0], [33.2, 83.0], [33.3, 83.0], [33.4, 83.0], [33.5, 83.0], [33.6, 83.0], [33.7, 83.0], [33.8, 83.0], [33.9, 83.0], [34.0, 83.0], [34.1, 83.0], [34.2, 83.0], [34.3, 83.0], [34.4, 83.0], [34.5, 83.0], [34.6, 83.0], [34.7, 83.0], [34.8, 83.0], [34.9, 83.0], [35.0, 83.0], [35.1, 83.0], [35.2, 83.0], [35.3, 83.0], [35.4, 83.0], [35.5, 83.0], [35.6, 83.0], [35.7, 84.0], [35.8, 84.0], [35.9, 84.0], [36.0, 84.0], [36.1, 84.0], [36.2, 84.0], [36.3, 84.0], [36.4, 84.0], [36.5, 84.0], [36.6, 84.0], [36.7, 84.0], [36.8, 84.0], [36.9, 84.0], [37.0, 84.0], [37.1, 84.0], [37.2, 84.0], [37.3, 84.0], [37.4, 84.0], [37.5, 84.0], [37.6, 84.0], [37.7, 84.0], [37.8, 84.0], [37.9, 84.0], [38.0, 84.0], [38.1, 84.0], [38.2, 84.0], [38.3, 84.0], [38.4, 84.0], [38.5, 84.0], [38.6, 84.0], [38.7, 84.0], [38.8, 84.0], [38.9, 84.0], [39.0, 84.0], [39.1, 84.0], [39.2, 84.0], [39.3, 84.0], [39.4, 84.0], [39.5, 84.0], [39.6, 84.0], [39.7, 84.0], [39.8, 84.0], [39.9, 84.0], [40.0, 84.0], [40.1, 84.0], [40.2, 84.0], [40.3, 84.0], [40.4, 84.0], [40.5, 84.0], [40.6, 84.0], [40.7, 84.0], [40.8, 84.0], [40.9, 84.0], [41.0, 84.0], [41.1, 84.0], [41.2, 84.0], [41.3, 84.0], [41.4, 84.0], [41.5, 84.0], [41.6, 84.0], [41.7, 84.0], [41.8, 84.0], [41.9, 84.0], [42.0, 84.0], [42.1, 84.0], [42.2, 84.0], [42.3, 84.0], [42.4, 84.0], [42.5, 84.0], [42.6, 84.0], [42.7, 84.0], [42.8, 84.0], [42.9, 84.0], [43.0, 84.0], [43.1, 84.0], [43.2, 84.0], [43.3, 84.0], [43.4, 84.0], [43.5, 84.0], [43.6, 84.0], [43.7, 84.0], [43.8, 84.0], [43.9, 84.0], [44.0, 84.0], [44.1, 84.0], [44.2, 84.0], [44.3, 84.0], [44.4, 85.0], [44.5, 85.0], [44.6, 85.0], [44.7, 85.0], [44.8, 85.0], [44.9, 85.0], [45.0, 85.0], [45.1, 85.0], [45.2, 85.0], [45.3, 85.0], [45.4, 85.0], [45.5, 85.0], [45.6, 85.0], [45.7, 85.0], [45.8, 85.0], [45.9, 85.0], [46.0, 85.0], [46.1, 85.0], [46.2, 85.0], [46.3, 85.0], [46.4, 85.0], [46.5, 85.0], [46.6, 85.0], [46.7, 85.0], [46.8, 85.0], [46.9, 85.0], [47.0, 85.0], [47.1, 85.0], [47.2, 85.0], [47.3, 85.0], [47.4, 85.0], [47.5, 85.0], [47.6, 85.0], [47.7, 85.0], [47.8, 85.0], [47.9, 85.0], [48.0, 85.0], [48.1, 85.0], [48.2, 85.0], [48.3, 85.0], [48.4, 85.0], [48.5, 85.0], [48.6, 85.0], [48.7, 85.0], [48.8, 85.0], [48.9, 85.0], [49.0, 85.0], [49.1, 85.0], [49.2, 85.0], [49.3, 85.0], [49.4, 85.0], [49.5, 85.0], [49.6, 85.0], [49.7, 85.0], [49.8, 85.0], [49.9, 85.0], [50.0, 85.0], [50.1, 85.0], [50.2, 85.0], [50.3, 85.0], [50.4, 85.0], [50.5, 85.0], [50.6, 85.0], [50.7, 85.0], [50.8, 85.0], [50.9, 85.0], [51.0, 85.0], [51.1, 85.0], [51.2, 85.0], [51.3, 85.0], [51.4, 85.0], [51.5, 85.0], [51.6, 85.0], [51.7, 85.0], [51.8, 85.0], [51.9, 85.0], [52.0, 85.0], [52.1, 85.0], [52.2, 85.0], [52.3, 85.0], [52.4, 85.0], [52.5, 85.0], [52.6, 86.0], [52.7, 86.0], [52.8, 86.0], [52.9, 86.0], [53.0, 86.0], [53.1, 86.0], [53.2, 86.0], [53.3, 86.0], [53.4, 86.0], [53.5, 86.0], [53.6, 86.0], [53.7, 86.0], [53.8, 86.0], [53.9, 86.0], [54.0, 86.0], [54.1, 86.0], [54.2, 86.0], [54.3, 86.0], [54.4, 86.0], [54.5, 86.0], [54.6, 86.0], [54.7, 86.0], [54.8, 86.0], [54.9, 86.0], [55.0, 86.0], [55.1, 86.0], [55.2, 86.0], [55.3, 86.0], [55.4, 86.0], [55.5, 86.0], [55.6, 86.0], [55.7, 86.0], [55.8, 86.0], [55.9, 86.0], [56.0, 86.0], [56.1, 86.0], [56.2, 86.0], [56.3, 86.0], [56.4, 86.0], [56.5, 86.0], [56.6, 86.0], [56.7, 86.0], [56.8, 86.0], [56.9, 86.0], [57.0, 86.0], [57.1, 86.0], [57.2, 86.0], [57.3, 86.0], [57.4, 86.0], [57.5, 86.0], [57.6, 86.0], [57.7, 86.0], [57.8, 86.0], [57.9, 86.0], [58.0, 86.0], [58.1, 86.0], [58.2, 86.0], [58.3, 86.0], [58.4, 86.0], [58.5, 86.0], [58.6, 86.0], [58.7, 86.0], [58.8, 86.0], [58.9, 86.0], [59.0, 86.0], [59.1, 86.0], [59.2, 87.0], [59.3, 87.0], [59.4, 87.0], [59.5, 87.0], [59.6, 87.0], [59.7, 87.0], [59.8, 87.0], [59.9, 87.0], [60.0, 87.0], [60.1, 87.0], [60.2, 87.0], [60.3, 87.0], [60.4, 87.0], [60.5, 87.0], [60.6, 87.0], [60.7, 87.0], [60.8, 87.0], [60.9, 87.0], [61.0, 87.0], [61.1, 87.0], [61.2, 87.0], [61.3, 87.0], [61.4, 87.0], [61.5, 87.0], [61.6, 87.0], [61.7, 87.0], [61.8, 87.0], [61.9, 87.0], [62.0, 87.0], [62.1, 87.0], [62.2, 87.0], [62.3, 87.0], [62.4, 87.0], [62.5, 87.0], [62.6, 87.0], [62.7, 87.0], [62.8, 87.0], [62.9, 87.0], [63.0, 87.0], [63.1, 87.0], [63.2, 87.0], [63.3, 87.0], [63.4, 87.0], [63.5, 87.0], [63.6, 87.0], [63.7, 87.0], [63.8, 87.0], [63.9, 87.0], [64.0, 87.0], [64.1, 87.0], [64.2, 87.0], [64.3, 87.0], [64.4, 87.0], [64.5, 87.0], [64.6, 87.0], [64.7, 87.0], [64.8, 87.0], [64.9, 87.0], [65.0, 87.0], [65.1, 87.0], [65.2, 87.0], [65.3, 87.0], [65.4, 87.0], [65.5, 87.0], [65.6, 87.0], [65.7, 87.0], [65.8, 88.0], [65.9, 88.0], [66.0, 88.0], [66.1, 88.0], [66.2, 88.0], [66.3, 88.0], [66.4, 88.0], [66.5, 88.0], [66.6, 88.0], [66.7, 88.0], [66.8, 88.0], [66.9, 88.0], [67.0, 88.0], [67.1, 88.0], [67.2, 88.0], [67.3, 88.0], [67.4, 88.0], [67.5, 88.0], [67.6, 88.0], [67.7, 88.0], [67.8, 88.0], [67.9, 88.0], [68.0, 88.0], [68.1, 88.0], [68.2, 88.0], [68.3, 88.0], [68.4, 88.0], [68.5, 89.0], [68.6, 89.0], [68.7, 89.0], [68.8, 89.0], [68.9, 89.0], [69.0, 89.0], [69.1, 89.0], [69.2, 89.0], [69.3, 89.0], [69.4, 89.0], [69.5, 89.0], [69.6, 89.0], [69.7, 89.0], [69.8, 89.0], [69.9, 89.0], [70.0, 89.0], [70.1, 89.0], [70.2, 89.0], [70.3, 89.0], [70.4, 89.0], [70.5, 89.0], [70.6, 89.0], [70.7, 89.0], [70.8, 90.0], [70.9, 90.0], [71.0, 90.0], [71.1, 90.0], [71.2, 90.0], [71.3, 90.0], [71.4, 90.0], [71.5, 90.0], [71.6, 90.0], [71.7, 90.0], [71.8, 90.0], [71.9, 90.0], [72.0, 90.0], [72.1, 90.0], [72.2, 90.0], [72.3, 90.0], [72.4, 90.0], [72.5, 90.0], [72.6, 90.0], [72.7, 90.0], [72.8, 90.0], [72.9, 90.0], [73.0, 90.0], [73.1, 90.0], [73.2, 90.0], [73.3, 90.0], [73.4, 90.0], [73.5, 90.0], [73.6, 90.0], [73.7, 90.0], [73.8, 90.0], [73.9, 91.0], [74.0, 91.0], [74.1, 91.0], [74.2, 91.0], [74.3, 91.0], [74.4, 91.0], [74.5, 91.0], [74.6, 91.0], [74.7, 91.0], [74.8, 91.0], [74.9, 91.0], [75.0, 91.0], [75.1, 91.0], [75.2, 91.0], [75.3, 91.0], [75.4, 91.0], [75.5, 91.0], [75.6, 91.0], [75.7, 92.0], [75.8, 92.0], [75.9, 92.0], [76.0, 92.0], [76.1, 92.0], [76.2, 92.0], [76.3, 92.0], [76.4, 92.0], [76.5, 92.0], [76.6, 92.0], [76.7, 92.0], [76.8, 93.0], [76.9, 93.0], [77.0, 93.0], [77.1, 93.0], [77.2, 93.0], [77.3, 93.0], [77.4, 94.0], [77.5, 94.0], [77.6, 94.0], [77.7, 94.0], [77.8, 94.0], [77.9, 94.0], [78.0, 95.0], [78.1, 95.0], [78.2, 95.0], [78.3, 95.0], [78.4, 96.0], [78.5, 96.0], [78.6, 96.0], [78.7, 96.0], [78.8, 96.0], [78.9, 96.0], [79.0, 97.0], [79.1, 97.0], [79.2, 97.0], [79.3, 97.0], [79.4, 98.0], [79.5, 98.0], [79.6, 98.0], [79.7, 98.0], [79.8, 100.0], [79.9, 100.0], [80.0, 100.0], [80.1, 100.0], [80.2, 100.0], [80.3, 101.0], [80.4, 101.0], [80.5, 101.0], [80.6, 101.0], [80.7, 101.0], [80.8, 101.0], [80.9, 101.0], [81.0, 101.0], [81.1, 102.0], [81.2, 102.0], [81.3, 103.0], [81.4, 103.0], [81.5, 105.0], [81.6, 105.0], [81.7, 106.0], [81.8, 106.0], [81.9, 106.0], [82.0, 106.0], [82.1, 106.0], [82.2, 106.0], [82.3, 106.0], [82.4, 106.0], [82.5, 106.0], [82.6, 106.0], [82.7, 107.0], [82.8, 107.0], [82.9, 107.0], [83.0, 107.0], [83.1, 107.0], [83.2, 107.0], [83.3, 107.0], [83.4, 107.0], [83.5, 107.0], [83.6, 108.0], [83.7, 108.0], [83.8, 108.0], [83.9, 108.0], [84.0, 108.0], [84.1, 108.0], [84.2, 109.0], [84.3, 109.0], [84.4, 109.0], [84.5, 109.0], [84.6, 109.0], [84.7, 109.0], [84.8, 110.0], [84.9, 110.0], [85.0, 110.0], [85.1, 110.0], [85.2, 110.0], [85.3, 110.0], [85.4, 110.0], [85.5, 110.0], [85.6, 111.0], [85.7, 111.0], [85.8, 111.0], [85.9, 111.0], [86.0, 114.0], [86.1, 114.0], [86.2, 114.0], [86.3, 114.0], [86.4, 115.0], [86.5, 115.0], [86.6, 115.0], [86.7, 115.0], [86.8, 115.0], [86.9, 116.0], [87.0, 116.0], [87.1, 117.0], [87.2, 117.0], [87.3, 117.0], [87.4, 117.0], [87.5, 117.0], [87.6, 117.0], [87.7, 118.0], [87.8, 118.0], [87.9, 118.0], [88.0, 118.0], [88.1, 118.0], [88.2, 118.0], [88.3, 118.0], [88.4, 118.0], [88.5, 120.0], [88.6, 120.0], [88.7, 120.0], [88.8, 120.0], [88.9, 121.0], [89.0, 121.0], [89.1, 122.0], [89.2, 122.0], [89.3, 122.0], [89.4, 122.0], [89.5, 123.0], [89.6, 123.0], [89.7, 124.0], [89.8, 124.0], [89.9, 124.0], [90.0, 124.0], [90.1, 124.0], [90.2, 124.0], [90.3, 124.0], [90.4, 126.0], [90.5, 126.0], [90.6, 126.0], [90.7, 126.0], [90.8, 126.0], [90.9, 126.0], [91.0, 128.0], [91.1, 128.0], [91.2, 128.0], [91.3, 128.0], [91.4, 129.0], [91.5, 129.0], [91.6, 130.0], [91.7, 130.0], [91.8, 130.0], [91.9, 130.0], [92.0, 130.0], [92.1, 130.0], [92.2, 132.0], [92.3, 132.0], [92.4, 136.0], [92.5, 136.0], [92.6, 137.0], [92.7, 137.0], [92.8, 137.0], [92.9, 137.0], [93.0, 140.0], [93.1, 140.0], [93.2, 142.0], [93.3, 142.0], [93.4, 142.0], [93.5, 142.0], [93.6, 142.0], [93.7, 142.0], [93.8, 142.0], [93.9, 143.0], [94.0, 143.0], [94.1, 143.0], [94.2, 143.0], [94.3, 144.0], [94.4, 144.0], [94.5, 144.0], [94.6, 144.0], [94.7, 145.0], [94.8, 145.0], [94.9, 146.0], [95.0, 146.0], [95.1, 153.0], [95.2, 153.0], [95.3, 153.0], [95.4, 153.0], [95.5, 156.0], [95.6, 156.0], [95.7, 164.0], [95.8, 164.0], [95.9, 167.0], [96.0, 167.0], [96.1, 174.0], [96.2, 174.0], [96.3, 176.0], [96.4, 176.0], [96.5, 181.0], [96.6, 181.0], [96.7, 181.0], [96.8, 182.0], [96.9, 182.0], [97.0, 185.0], [97.1, 185.0], [97.2, 190.0], [97.3, 190.0], [97.4, 191.0], [97.5, 191.0], [97.6, 193.0], [97.7, 193.0], [97.8, 194.0], [97.9, 194.0], [98.0, 196.0], [98.1, 196.0], [98.2, 197.0], [98.3, 197.0], [98.4, 199.0], [98.5, 199.0], [98.6, 211.0], [98.7, 211.0], [98.8, 220.0], [98.9, 220.0], [99.0, 224.0], [99.1, 224.0], [99.2, 227.0], [99.3, 227.0], [99.4, 228.0], [99.5, 228.0], [99.6, 251.0], [99.7, 251.0], [99.8, 599.0], [99.9, 599.0]], "isOverall": false, "label": "Login User/api/auth-3", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 387.0, "series": [{"data": [[0.0, 387.0], [100.0, 91.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "Login User/api/auth-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 484.0, "series": [{"data": [[0.0, 484.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 9.613095238095232, "minX": 1.74162168E12, "maxY": 9.697986577181208, "series": [{"data": [[1.74162168E12, 9.613095238095232], [1.74162174E12, 9.697986577181208]], "isOverall": false, "label": "10.0.36.159-Login", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74162174E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 87.7, "minX": 1.0, "maxY": 348.0, "series": [{"data": [[1.0, 348.0], [2.0, 129.0], [4.0, 91.4], [8.0, 98.33333333333333], [9.0, 87.7], [5.0, 90.2], [10.0, 94.954233409611], [3.0, 112.5], [6.0, 93.8], [7.0, 97.37499999999999]], "isOverall": false, "label": "Login User/api/auth-3", "isController": false}, {"data": [[9.639175257731948, 96.06597938144328]], "isOverall": false, "label": "Login User/api/auth-3-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1206.9, "minX": 1.74162168E12, "maxY": 11943.216666666667, "series": [{"data": [[1.74162168E12, 11943.216666666667], [1.74162174E12, 5299.433333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74162168E12, 2719.8], [1.74162174E12, 1206.9]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74162174E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 95.38255033557047, "minX": 1.74162168E12, "maxY": 96.3690476190476, "series": [{"data": [[1.74162168E12, 96.3690476190476], [1.74162174E12, 95.38255033557047]], "isOverall": false, "label": "Login User/api/auth-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74162174E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 95.32885906040269, "minX": 1.74162168E12, "maxY": 96.30654761904756, "series": [{"data": [[1.74162168E12, 96.30654761904756], [1.74162174E12, 95.32885906040269]], "isOverall": false, "label": "Login User/api/auth-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74162174E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.74162168E12, "maxY": 2.3095238095238075, "series": [{"data": [[1.74162168E12, 2.3095238095238075], [1.74162174E12, 0.0]], "isOverall": false, "label": "Login User/api/auth-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74162174E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 77.0, "minX": 1.74162168E12, "maxY": 599.0, "series": [{"data": [[1.74162168E12, 599.0], [1.74162174E12, 227.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74162168E12, 123.30000000000001], [1.74162174E12, 126.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74162168E12, 221.70999999999992], [1.74162174E12, 225.5]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74162168E12, 153.44999999999993], [1.74162174E12, 144.5]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74162168E12, 78.0], [1.74162174E12, 77.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74162168E12, 85.0], [1.74162174E12, 86.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74162174E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 85.0, "minX": 1.0, "maxY": 377.5, "series": [{"data": [[1.0, 125.0], [2.0, 377.5], [8.0, 85.0], [9.0, 85.0], [5.0, 88.0], [10.0, 85.0], [6.0, 88.0], [7.0, 85.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 85.0, "minX": 1.0, "maxY": 377.5, "series": [{"data": [[1.0, 125.0], [2.0, 377.5], [8.0, 85.0], [9.0, 85.0], [5.0, 88.0], [10.0, 85.0], [6.0, 88.0], [7.0, 85.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 2.433333333333333, "minX": 1.74162168E12, "maxY": 5.65, "series": [{"data": [[1.74162168E12, 5.65], [1.74162174E12, 2.433333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74162174E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 2.4833333333333334, "minX": 1.74162168E12, "maxY": 5.6, "series": [{"data": [[1.74162168E12, 5.6], [1.74162174E12, 2.4833333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74162174E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 2.4833333333333334, "minX": 1.74162168E12, "maxY": 5.6, "series": [{"data": [[1.74162168E12, 5.6], [1.74162174E12, 2.4833333333333334]], "isOverall": false, "label": "Login User/api/auth-3-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74162174E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 2.4833333333333334, "minX": 1.74162168E12, "maxY": 5.6, "series": [{"data": [[1.74162168E12, 5.6], [1.74162174E12, 2.4833333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74162174E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

