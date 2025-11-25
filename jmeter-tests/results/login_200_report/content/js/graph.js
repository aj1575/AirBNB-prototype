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
        data: {"result": {"minY": 71.0, "minX": 0.0, "maxY": 3476.0, "series": [{"data": [[0.0, 71.0], [0.1, 71.0], [0.2, 72.0], [0.3, 77.0], [0.4, 83.0], [0.5, 88.0], [0.6, 94.0], [0.7, 95.0], [0.8, 104.0], [0.9, 118.0], [1.0, 125.0], [1.1, 128.0], [1.2, 134.0], [1.3, 139.0], [1.4, 143.0], [1.5, 155.0], [1.6, 166.0], [1.7, 177.0], [1.8, 186.0], [1.9, 192.0], [2.0, 200.0], [2.1, 203.0], [2.2, 205.0], [2.3, 216.0], [2.4, 240.0], [2.5, 250.0], [2.6, 254.0], [2.7, 267.0], [2.8, 272.0], [2.9, 291.0], [3.0, 303.0], [3.1, 309.0], [3.2, 347.0], [3.3, 366.0], [3.4, 374.0], [3.5, 383.0], [3.6, 391.0], [3.7, 397.0], [3.8, 405.0], [3.9, 406.0], [4.0, 412.0], [4.1, 421.0], [4.2, 424.0], [4.3, 426.0], [4.4, 431.0], [4.5, 434.0], [4.6, 442.0], [4.7, 446.0], [4.8, 454.0], [4.9, 459.0], [5.0, 460.0], [5.1, 461.0], [5.2, 471.0], [5.3, 487.0], [5.4, 497.0], [5.5, 503.0], [5.6, 517.0], [5.7, 523.0], [5.8, 524.0], [5.9, 530.0], [6.0, 540.0], [6.1, 553.0], [6.2, 562.0], [6.3, 570.0], [6.4, 576.0], [6.5, 578.0], [6.6, 595.0], [6.7, 598.0], [6.8, 606.0], [6.9, 623.0], [7.0, 641.0], [7.1, 647.0], [7.2, 659.0], [7.3, 659.0], [7.4, 664.0], [7.5, 665.0], [7.6, 674.0], [7.7, 691.0], [7.8, 694.0], [7.9, 705.0], [8.0, 713.0], [8.1, 723.0], [8.2, 727.0], [8.3, 732.0], [8.4, 743.0], [8.5, 749.0], [8.6, 755.0], [8.7, 762.0], [8.8, 762.0], [8.9, 765.0], [9.0, 766.0], [9.1, 766.0], [9.2, 769.0], [9.3, 776.0], [9.4, 786.0], [9.5, 789.0], [9.6, 801.0], [9.7, 806.0], [9.8, 811.0], [9.9, 814.0], [10.0, 815.0], [10.1, 819.0], [10.2, 821.0], [10.3, 836.0], [10.4, 838.0], [10.5, 849.0], [10.6, 852.0], [10.7, 858.0], [10.8, 862.0], [10.9, 871.0], [11.0, 874.0], [11.1, 877.0], [11.2, 884.0], [11.3, 894.0], [11.4, 904.0], [11.5, 907.0], [11.6, 911.0], [11.7, 923.0], [11.8, 936.0], [11.9, 936.0], [12.0, 954.0], [12.1, 960.0], [12.2, 968.0], [12.3, 971.0], [12.4, 980.0], [12.5, 983.0], [12.6, 994.0], [12.7, 1000.0], [12.8, 1010.0], [12.9, 1019.0], [13.0, 1030.0], [13.1, 1034.0], [13.2, 1036.0], [13.3, 1043.0], [13.4, 1045.0], [13.5, 1054.0], [13.6, 1058.0], [13.7, 1063.0], [13.8, 1066.0], [13.9, 1079.0], [14.0, 1080.0], [14.1, 1090.0], [14.2, 1093.0], [14.3, 1094.0], [14.4, 1103.0], [14.5, 1107.0], [14.6, 1111.0], [14.7, 1118.0], [14.8, 1120.0], [14.9, 1130.0], [15.0, 1132.0], [15.1, 1136.0], [15.2, 1142.0], [15.3, 1146.0], [15.4, 1151.0], [15.5, 1161.0], [15.6, 1165.0], [15.7, 1168.0], [15.8, 1171.0], [15.9, 1175.0], [16.0, 1181.0], [16.1, 1181.0], [16.2, 1185.0], [16.3, 1187.0], [16.4, 1198.0], [16.5, 1202.0], [16.6, 1207.0], [16.7, 1209.0], [16.8, 1213.0], [16.9, 1217.0], [17.0, 1218.0], [17.1, 1221.0], [17.2, 1222.0], [17.3, 1223.0], [17.4, 1224.0], [17.5, 1228.0], [17.6, 1232.0], [17.7, 1238.0], [17.8, 1247.0], [17.9, 1255.0], [18.0, 1257.0], [18.1, 1260.0], [18.2, 1265.0], [18.3, 1269.0], [18.4, 1274.0], [18.5, 1280.0], [18.6, 1284.0], [18.7, 1287.0], [18.8, 1297.0], [18.9, 1307.0], [19.0, 1313.0], [19.1, 1318.0], [19.2, 1325.0], [19.3, 1328.0], [19.4, 1331.0], [19.5, 1335.0], [19.6, 1346.0], [19.7, 1347.0], [19.8, 1349.0], [19.9, 1366.0], [20.0, 1372.0], [20.1, 1377.0], [20.2, 1379.0], [20.3, 1381.0], [20.4, 1387.0], [20.5, 1389.0], [20.6, 1391.0], [20.7, 1394.0], [20.8, 1401.0], [20.9, 1409.0], [21.0, 1413.0], [21.1, 1419.0], [21.2, 1422.0], [21.3, 1424.0], [21.4, 1436.0], [21.5, 1444.0], [21.6, 1446.0], [21.7, 1450.0], [21.8, 1452.0], [21.9, 1465.0], [22.0, 1466.0], [22.1, 1469.0], [22.2, 1471.0], [22.3, 1475.0], [22.4, 1482.0], [22.5, 1487.0], [22.6, 1489.0], [22.7, 1494.0], [22.8, 1502.0], [22.9, 1504.0], [23.0, 1513.0], [23.1, 1518.0], [23.2, 1524.0], [23.3, 1527.0], [23.4, 1529.0], [23.5, 1533.0], [23.6, 1534.0], [23.7, 1540.0], [23.8, 1551.0], [23.9, 1554.0], [24.0, 1555.0], [24.1, 1561.0], [24.2, 1576.0], [24.3, 1580.0], [24.4, 1583.0], [24.5, 1584.0], [24.6, 1594.0], [24.7, 1596.0], [24.8, 1602.0], [24.9, 1604.0], [25.0, 1608.0], [25.1, 1610.0], [25.2, 1612.0], [25.3, 1616.0], [25.4, 1621.0], [25.5, 1625.0], [25.6, 1631.0], [25.7, 1634.0], [25.8, 1645.0], [25.9, 1650.0], [26.0, 1661.0], [26.1, 1668.0], [26.2, 1671.0], [26.3, 1672.0], [26.4, 1675.0], [26.5, 1678.0], [26.6, 1682.0], [26.7, 1690.0], [26.8, 1690.0], [26.9, 1692.0], [27.0, 1695.0], [27.1, 1698.0], [27.2, 1699.0], [27.3, 1707.0], [27.4, 1711.0], [27.5, 1716.0], [27.6, 1721.0], [27.7, 1724.0], [27.8, 1732.0], [27.9, 1734.0], [28.0, 1734.0], [28.1, 1736.0], [28.2, 1737.0], [28.3, 1741.0], [28.4, 1752.0], [28.5, 1756.0], [28.6, 1761.0], [28.7, 1761.0], [28.8, 1762.0], [28.9, 1774.0], [29.0, 1775.0], [29.1, 1778.0], [29.2, 1794.0], [29.3, 1795.0], [29.4, 1800.0], [29.5, 1804.0], [29.6, 1808.0], [29.7, 1809.0], [29.8, 1818.0], [29.9, 1819.0], [30.0, 1824.0], [30.1, 1832.0], [30.2, 1832.0], [30.3, 1833.0], [30.4, 1836.0], [30.5, 1838.0], [30.6, 1845.0], [30.7, 1845.0], [30.8, 1849.0], [30.9, 1860.0], [31.0, 1866.0], [31.1, 1873.0], [31.2, 1877.0], [31.3, 1879.0], [31.4, 1886.0], [31.5, 1890.0], [31.6, 1891.0], [31.7, 1893.0], [31.8, 1894.0], [31.9, 1896.0], [32.0, 1902.0], [32.1, 1903.0], [32.2, 1905.0], [32.3, 1908.0], [32.4, 1911.0], [32.5, 1911.0], [32.6, 1914.0], [32.7, 1919.0], [32.8, 1922.0], [32.9, 1927.0], [33.0, 1930.0], [33.1, 1932.0], [33.2, 1935.0], [33.3, 1937.0], [33.4, 1940.0], [33.5, 1941.0], [33.6, 1951.0], [33.7, 1963.0], [33.8, 1971.0], [33.9, 1981.0], [34.0, 1985.0], [34.1, 1995.0], [34.2, 1999.0], [34.3, 2001.0], [34.4, 2010.0], [34.5, 2013.0], [34.6, 2017.0], [34.7, 2018.0], [34.8, 2028.0], [34.9, 2036.0], [35.0, 2042.0], [35.1, 2047.0], [35.2, 2058.0], [35.3, 2064.0], [35.4, 2068.0], [35.5, 2070.0], [35.6, 2071.0], [35.7, 2076.0], [35.8, 2085.0], [35.9, 2092.0], [36.0, 2095.0], [36.1, 2096.0], [36.2, 2100.0], [36.3, 2103.0], [36.4, 2107.0], [36.5, 2117.0], [36.6, 2122.0], [36.7, 2126.0], [36.8, 2126.0], [36.9, 2129.0], [37.0, 2131.0], [37.1, 2133.0], [37.2, 2139.0], [37.3, 2145.0], [37.4, 2156.0], [37.5, 2157.0], [37.6, 2158.0], [37.7, 2159.0], [37.8, 2164.0], [37.9, 2166.0], [38.0, 2178.0], [38.1, 2181.0], [38.2, 2190.0], [38.3, 2199.0], [38.4, 2202.0], [38.5, 2204.0], [38.6, 2213.0], [38.7, 2219.0], [38.8, 2220.0], [38.9, 2226.0], [39.0, 2226.0], [39.1, 2228.0], [39.2, 2230.0], [39.3, 2230.0], [39.4, 2240.0], [39.5, 2244.0], [39.6, 2249.0], [39.7, 2250.0], [39.8, 2253.0], [39.9, 2253.0], [40.0, 2254.0], [40.1, 2257.0], [40.2, 2259.0], [40.3, 2264.0], [40.4, 2265.0], [40.5, 2277.0], [40.6, 2280.0], [40.7, 2284.0], [40.8, 2293.0], [40.9, 2295.0], [41.0, 2296.0], [41.1, 2298.0], [41.2, 2298.0], [41.3, 2299.0], [41.4, 2303.0], [41.5, 2305.0], [41.6, 2306.0], [41.7, 2306.0], [41.8, 2307.0], [41.9, 2308.0], [42.0, 2308.0], [42.1, 2313.0], [42.2, 2314.0], [42.3, 2314.0], [42.4, 2316.0], [42.5, 2316.0], [42.6, 2316.0], [42.7, 2318.0], [42.8, 2319.0], [42.9, 2320.0], [43.0, 2320.0], [43.1, 2321.0], [43.2, 2322.0], [43.3, 2323.0], [43.4, 2323.0], [43.5, 2324.0], [43.6, 2326.0], [43.7, 2329.0], [43.8, 2330.0], [43.9, 2330.0], [44.0, 2334.0], [44.1, 2337.0], [44.2, 2337.0], [44.3, 2340.0], [44.4, 2347.0], [44.5, 2347.0], [44.6, 2347.0], [44.7, 2348.0], [44.8, 2349.0], [44.9, 2354.0], [45.0, 2356.0], [45.1, 2357.0], [45.2, 2360.0], [45.3, 2371.0], [45.4, 2375.0], [45.5, 2378.0], [45.6, 2379.0], [45.7, 2381.0], [45.8, 2385.0], [45.9, 2391.0], [46.0, 2392.0], [46.1, 2396.0], [46.2, 2404.0], [46.3, 2420.0], [46.4, 2420.0], [46.5, 2421.0], [46.6, 2422.0], [46.7, 2423.0], [46.8, 2427.0], [46.9, 2431.0], [47.0, 2438.0], [47.1, 2440.0], [47.2, 2442.0], [47.3, 2444.0], [47.4, 2447.0], [47.5, 2450.0], [47.6, 2460.0], [47.7, 2460.0], [47.8, 2460.0], [47.9, 2463.0], [48.0, 2463.0], [48.1, 2466.0], [48.2, 2467.0], [48.3, 2469.0], [48.4, 2470.0], [48.5, 2472.0], [48.6, 2473.0], [48.7, 2474.0], [48.8, 2476.0], [48.9, 2478.0], [49.0, 2480.0], [49.1, 2481.0], [49.2, 2482.0], [49.3, 2485.0], [49.4, 2486.0], [49.5, 2487.0], [49.6, 2487.0], [49.7, 2488.0], [49.8, 2489.0], [49.9, 2489.0], [50.0, 2491.0], [50.1, 2492.0], [50.2, 2494.0], [50.3, 2497.0], [50.4, 2500.0], [50.5, 2503.0], [50.6, 2505.0], [50.7, 2508.0], [50.8, 2510.0], [50.9, 2511.0], [51.0, 2516.0], [51.1, 2518.0], [51.2, 2519.0], [51.3, 2520.0], [51.4, 2520.0], [51.5, 2523.0], [51.6, 2527.0], [51.7, 2528.0], [51.8, 2531.0], [51.9, 2533.0], [52.0, 2547.0], [52.1, 2565.0], [52.2, 2571.0], [52.3, 2573.0], [52.4, 2583.0], [52.5, 2586.0], [52.6, 2595.0], [52.7, 2602.0], [52.8, 2608.0], [52.9, 2625.0], [53.0, 2631.0], [53.1, 2634.0], [53.2, 2634.0], [53.3, 2635.0], [53.4, 2637.0], [53.5, 2640.0], [53.6, 2643.0], [53.7, 2647.0], [53.8, 2647.0], [53.9, 2660.0], [54.0, 2664.0], [54.1, 2670.0], [54.2, 2673.0], [54.3, 2683.0], [54.4, 2687.0], [54.5, 2689.0], [54.6, 2692.0], [54.7, 2693.0], [54.8, 2699.0], [54.9, 2701.0], [55.0, 2706.0], [55.1, 2716.0], [55.2, 2721.0], [55.3, 2726.0], [55.4, 2729.0], [55.5, 2732.0], [55.6, 2736.0], [55.7, 2742.0], [55.8, 2746.0], [55.9, 2749.0], [56.0, 2757.0], [56.1, 2759.0], [56.2, 2761.0], [56.3, 2770.0], [56.4, 2772.0], [56.5, 2780.0], [56.6, 2781.0], [56.7, 2783.0], [56.8, 2786.0], [56.9, 2788.0], [57.0, 2790.0], [57.1, 2794.0], [57.2, 2797.0], [57.3, 2802.0], [57.4, 2802.0], [57.5, 2812.0], [57.6, 2812.0], [57.7, 2813.0], [57.8, 2815.0], [57.9, 2818.0], [58.0, 2818.0], [58.1, 2820.0], [58.2, 2834.0], [58.3, 2836.0], [58.4, 2838.0], [58.5, 2839.0], [58.6, 2841.0], [58.7, 2843.0], [58.8, 2853.0], [58.9, 2856.0], [59.0, 2858.0], [59.1, 2859.0], [59.2, 2860.0], [59.3, 2861.0], [59.4, 2863.0], [59.5, 2865.0], [59.6, 2867.0], [59.7, 2868.0], [59.8, 2869.0], [59.9, 2869.0], [60.0, 2872.0], [60.1, 2877.0], [60.2, 2883.0], [60.3, 2887.0], [60.4, 2888.0], [60.5, 2891.0], [60.6, 2892.0], [60.7, 2896.0], [60.8, 2897.0], [60.9, 2898.0], [61.0, 2899.0], [61.1, 2900.0], [61.2, 2902.0], [61.3, 2903.0], [61.4, 2904.0], [61.5, 2905.0], [61.6, 2906.0], [61.7, 2910.0], [61.8, 2912.0], [61.9, 2916.0], [62.0, 2916.0], [62.1, 2918.0], [62.2, 2918.0], [62.3, 2920.0], [62.4, 2920.0], [62.5, 2921.0], [62.6, 2921.0], [62.7, 2922.0], [62.8, 2924.0], [62.9, 2925.0], [63.0, 2925.0], [63.1, 2926.0], [63.2, 2926.0], [63.3, 2927.0], [63.4, 2928.0], [63.5, 2928.0], [63.6, 2928.0], [63.7, 2929.0], [63.8, 2929.0], [63.9, 2930.0], [64.0, 2931.0], [64.1, 2931.0], [64.2, 2932.0], [64.3, 2932.0], [64.4, 2933.0], [64.5, 2933.0], [64.6, 2934.0], [64.7, 2934.0], [64.8, 2934.0], [64.9, 2935.0], [65.0, 2935.0], [65.1, 2935.0], [65.2, 2937.0], [65.3, 2937.0], [65.4, 2937.0], [65.5, 2938.0], [65.6, 2939.0], [65.7, 2940.0], [65.8, 2941.0], [65.9, 2941.0], [66.0, 2942.0], [66.1, 2942.0], [66.2, 2943.0], [66.3, 2944.0], [66.4, 2944.0], [66.5, 2945.0], [66.6, 2946.0], [66.7, 2946.0], [66.8, 2947.0], [66.9, 2949.0], [67.0, 2951.0], [67.1, 2952.0], [67.2, 2952.0], [67.3, 2952.0], [67.4, 2953.0], [67.5, 2954.0], [67.6, 2954.0], [67.7, 2954.0], [67.8, 2956.0], [67.9, 2957.0], [68.0, 2957.0], [68.1, 2960.0], [68.2, 2960.0], [68.3, 2961.0], [68.4, 2961.0], [68.5, 2962.0], [68.6, 2962.0], [68.7, 2962.0], [68.8, 2964.0], [68.9, 2964.0], [69.0, 2965.0], [69.1, 2966.0], [69.2, 2967.0], [69.3, 2968.0], [69.4, 2968.0], [69.5, 2969.0], [69.6, 2969.0], [69.7, 2970.0], [69.8, 2970.0], [69.9, 2972.0], [70.0, 2972.0], [70.1, 2973.0], [70.2, 2973.0], [70.3, 2974.0], [70.4, 2974.0], [70.5, 2975.0], [70.6, 2975.0], [70.7, 2976.0], [70.8, 2976.0], [70.9, 2977.0], [71.0, 2977.0], [71.1, 2978.0], [71.2, 2978.0], [71.3, 2979.0], [71.4, 2980.0], [71.5, 2980.0], [71.6, 2981.0], [71.7, 2983.0], [71.8, 2983.0], [71.9, 2983.0], [72.0, 2983.0], [72.1, 2985.0], [72.2, 2985.0], [72.3, 2986.0], [72.4, 2987.0], [72.5, 2987.0], [72.6, 2988.0], [72.7, 2988.0], [72.8, 2989.0], [72.9, 2989.0], [73.0, 2989.0], [73.1, 2989.0], [73.2, 2990.0], [73.3, 2991.0], [73.4, 2991.0], [73.5, 2991.0], [73.6, 2992.0], [73.7, 2992.0], [73.8, 2993.0], [73.9, 2993.0], [74.0, 2994.0], [74.1, 2995.0], [74.2, 2995.0], [74.3, 2996.0], [74.4, 2997.0], [74.5, 2997.0], [74.6, 2997.0], [74.7, 2997.0], [74.8, 2998.0], [74.9, 2999.0], [75.0, 2999.0], [75.1, 2999.0], [75.2, 2999.0], [75.3, 2999.0], [75.4, 3000.0], [75.5, 3000.0], [75.6, 3000.0], [75.7, 3001.0], [75.8, 3001.0], [75.9, 3001.0], [76.0, 3001.0], [76.1, 3002.0], [76.2, 3002.0], [76.3, 3002.0], [76.4, 3003.0], [76.5, 3003.0], [76.6, 3004.0], [76.7, 3005.0], [76.8, 3006.0], [76.9, 3008.0], [77.0, 3012.0], [77.1, 3013.0], [77.2, 3014.0], [77.3, 3015.0], [77.4, 3017.0], [77.5, 3017.0], [77.6, 3018.0], [77.7, 3019.0], [77.8, 3020.0], [77.9, 3021.0], [78.0, 3021.0], [78.1, 3022.0], [78.2, 3023.0], [78.3, 3024.0], [78.4, 3025.0], [78.5, 3025.0], [78.6, 3026.0], [78.7, 3026.0], [78.8, 3028.0], [78.9, 3030.0], [79.0, 3031.0], [79.1, 3032.0], [79.2, 3033.0], [79.3, 3034.0], [79.4, 3034.0], [79.5, 3035.0], [79.6, 3036.0], [79.7, 3036.0], [79.8, 3037.0], [79.9, 3038.0], [80.0, 3039.0], [80.1, 3040.0], [80.2, 3043.0], [80.3, 3047.0], [80.4, 3049.0], [80.5, 3050.0], [80.6, 3053.0], [80.7, 3062.0], [80.8, 3063.0], [80.9, 3067.0], [81.0, 3068.0], [81.1, 3073.0], [81.2, 3076.0], [81.3, 3081.0], [81.4, 3085.0], [81.5, 3086.0], [81.6, 3087.0], [81.7, 3091.0], [81.8, 3094.0], [81.9, 3097.0], [82.0, 3099.0], [82.1, 3103.0], [82.2, 3107.0], [82.3, 3113.0], [82.4, 3116.0], [82.5, 3122.0], [82.6, 3133.0], [82.7, 3137.0], [82.8, 3139.0], [82.9, 3141.0], [83.0, 3142.0], [83.1, 3142.0], [83.2, 3143.0], [83.3, 3143.0], [83.4, 3143.0], [83.5, 3143.0], [83.6, 3144.0], [83.7, 3146.0], [83.8, 3148.0], [83.9, 3148.0], [84.0, 3149.0], [84.1, 3150.0], [84.2, 3151.0], [84.3, 3153.0], [84.4, 3154.0], [84.5, 3154.0], [84.6, 3155.0], [84.7, 3155.0], [84.8, 3157.0], [84.9, 3158.0], [85.0, 3159.0], [85.1, 3159.0], [85.2, 3160.0], [85.3, 3160.0], [85.4, 3161.0], [85.5, 3162.0], [85.6, 3164.0], [85.7, 3164.0], [85.8, 3165.0], [85.9, 3166.0], [86.0, 3166.0], [86.1, 3167.0], [86.2, 3167.0], [86.3, 3168.0], [86.4, 3168.0], [86.5, 3169.0], [86.6, 3169.0], [86.7, 3170.0], [86.8, 3170.0], [86.9, 3172.0], [87.0, 3172.0], [87.1, 3173.0], [87.2, 3174.0], [87.3, 3175.0], [87.4, 3176.0], [87.5, 3177.0], [87.6, 3177.0], [87.7, 3177.0], [87.8, 3178.0], [87.9, 3178.0], [88.0, 3179.0], [88.1, 3180.0], [88.2, 3180.0], [88.3, 3181.0], [88.4, 3182.0], [88.5, 3182.0], [88.6, 3182.0], [88.7, 3182.0], [88.8, 3183.0], [88.9, 3184.0], [89.0, 3185.0], [89.1, 3185.0], [89.2, 3186.0], [89.3, 3186.0], [89.4, 3186.0], [89.5, 3186.0], [89.6, 3187.0], [89.7, 3187.0], [89.8, 3187.0], [89.9, 3188.0], [90.0, 3188.0], [90.1, 3188.0], [90.2, 3188.0], [90.3, 3189.0], [90.4, 3190.0], [90.5, 3190.0], [90.6, 3194.0], [90.7, 3194.0], [90.8, 3195.0], [90.9, 3195.0], [91.0, 3196.0], [91.1, 3197.0], [91.2, 3201.0], [91.3, 3203.0], [91.4, 3208.0], [91.5, 3218.0], [91.6, 3220.0], [91.7, 3227.0], [91.8, 3229.0], [91.9, 3234.0], [92.0, 3236.0], [92.1, 3241.0], [92.2, 3241.0], [92.3, 3256.0], [92.4, 3257.0], [92.5, 3261.0], [92.6, 3263.0], [92.7, 3265.0], [92.8, 3269.0], [92.9, 3272.0], [93.0, 3275.0], [93.1, 3277.0], [93.2, 3278.0], [93.3, 3282.0], [93.4, 3284.0], [93.5, 3286.0], [93.6, 3287.0], [93.7, 3289.0], [93.8, 3292.0], [93.9, 3295.0], [94.0, 3298.0], [94.1, 3301.0], [94.2, 3303.0], [94.3, 3303.0], [94.4, 3305.0], [94.5, 3307.0], [94.6, 3309.0], [94.7, 3310.0], [94.8, 3312.0], [94.9, 3312.0], [95.0, 3313.0], [95.1, 3314.0], [95.2, 3315.0], [95.3, 3316.0], [95.4, 3317.0], [95.5, 3321.0], [95.6, 3321.0], [95.7, 3324.0], [95.8, 3326.0], [95.9, 3328.0], [96.0, 3331.0], [96.1, 3333.0], [96.2, 3335.0], [96.3, 3336.0], [96.4, 3337.0], [96.5, 3344.0], [96.6, 3350.0], [96.7, 3352.0], [96.8, 3354.0], [96.9, 3355.0], [97.0, 3357.0], [97.1, 3359.0], [97.2, 3361.0], [97.3, 3363.0], [97.4, 3367.0], [97.5, 3370.0], [97.6, 3374.0], [97.7, 3378.0], [97.8, 3382.0], [97.9, 3386.0], [98.0, 3393.0], [98.1, 3397.0], [98.2, 3399.0], [98.3, 3404.0], [98.4, 3405.0], [98.5, 3406.0], [98.6, 3408.0], [98.7, 3410.0], [98.8, 3417.0], [98.9, 3418.0], [99.0, 3421.0], [99.1, 3424.0], [99.2, 3425.0], [99.3, 3426.0], [99.4, 3430.0], [99.5, 3443.0], [99.6, 3452.0], [99.7, 3459.0], [99.8, 3465.0], [99.9, 3472.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 14.0, "minX": 0.0, "maxY": 286.0, "series": [{"data": [[0.0, 14.0], [600.0, 23.0], [700.0, 34.0], [800.0, 34.0], [900.0, 27.0], [1000.0, 33.0], [1100.0, 42.0], [1200.0, 49.0], [1300.0, 38.0], [1400.0, 39.0], [1500.0, 40.0], [100.0, 25.0], [1600.0, 50.0], [1700.0, 43.0], [1800.0, 51.0], [1900.0, 46.0], [2000.0, 39.0], [2100.0, 43.0], [2200.0, 61.0], [2300.0, 97.0], [2400.0, 84.0], [2500.0, 46.0], [2600.0, 43.0], [2700.0, 48.0], [2800.0, 76.0], [2900.0, 286.0], [3000.0, 135.0], [3100.0, 181.0], [200.0, 20.0], [3200.0, 59.0], [3300.0, 83.0], [3400.0, 35.0], [300.0, 16.0], [400.0, 34.0], [500.0, 26.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 3400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 109.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1546.0, "series": [{"data": [[0.0, 109.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 345.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1546.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 83.37383177570096, "minX": 1.763892E12, "maxY": 141.67361524717103, "series": [{"data": [[1.763892E12, 141.67361524717103], [1.76389206E12, 83.37383177570096]], "isOverall": false, "label": "Owner Login Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76389206E12, "title": "Active Threads Over Time"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 71.25, "minX": 1.0, "maxY": 3307.933333333334, "series": [{"data": [[2.0, 850.0], [3.0, 348.3333333333333], [4.0, 477.5], [5.0, 71.25], [6.0, 403.4], [7.0, 364.0], [8.0, 292.5], [9.0, 271.0], [10.0, 337.0], [11.0, 341.25], [12.0, 407.6666666666667], [13.0, 318.2], [14.0, 336.6], [15.0, 463.3333333333333], [16.0, 457.3333333333333], [17.0, 360.8], [18.0, 379.4], [19.0, 442.0], [20.0, 439.0], [21.0, 533.6666666666667], [22.0, 441.0], [23.0, 706.0], [24.0, 497.0], [25.0, 732.5], [26.0, 542.0], [27.0, 531.4], [28.0, 635.3333333333334], [29.0, 646.0], [30.0, 558.8], [31.0, 572.0], [32.0, 676.0], [33.0, 579.6], [34.0, 661.6666666666666], [35.0, 594.8], [36.0, 455.0], [37.0, 754.8], [38.0, 461.0], [39.0, 725.1666666666666], [40.0, 685.0], [41.0, 692.75], [42.0, 522.5], [43.0, 778.6666666666666], [44.0, 692.6], [45.0, 752.25], [46.0, 697.8333333333334], [47.0, 705.5714285714286], [48.0, 845.0], [49.0, 783.8], [50.0, 940.0], [51.0, 845.25], [52.0, 1034.5], [53.0, 869.5], [54.0, 1116.7142857142858], [55.0, 1008.2], [56.0, 1016.4], [57.0, 741.3333333333334], [58.0, 1110.75], [59.0, 1130.3333333333333], [60.0, 953.75], [61.0, 1272.1666666666665], [62.0, 1035.5], [63.0, 1047.3333333333333], [64.0, 1181.8333333333333], [65.0, 936.3333333333333], [66.0, 1072.1666666666665], [67.0, 1274.142857142857], [68.0, 1225.3333333333335], [69.0, 1166.0], [70.0, 1253.3333333333333], [71.0, 1076.5], [72.0, 1364.6000000000001], [73.0, 1048.8333333333333], [74.0, 1316.1666666666665], [75.0, 1260.0], [76.0, 1539.25], [77.0, 1279.2], [78.0, 1320.142857142857], [79.0, 1213.0], [80.0, 1616.0], [81.0, 1188.2], [82.0, 1423.2499999999998], [83.0, 1218.0], [84.0, 1532.0], [85.0, 1455.5], [86.0, 1539.8999999999999], [87.0, 1360.8333333333335], [88.0, 1617.888888888889], [89.0, 1566.4285714285713], [90.0, 1508.75], [91.0, 1609.4], [92.0, 1312.0], [93.0, 1663.6666666666667], [94.0, 1760.4], [95.0, 1510.071428571429], [96.0, 1709.1666666666667], [97.0, 1547.142857142857], [98.0, 1837.0], [99.0, 1569.4285714285716], [100.0, 1501.3333333333333], [101.0, 1735.8000000000002], [102.0, 1526.6666666666667], [103.0, 1921.3999999999999], [104.0, 1687.625], [105.0, 1736.153846153846], [106.0, 1467.2], [107.0, 1939.625], [108.0, 1683.2857142857144], [109.0, 1841.9], [110.0, 1626.6666666666667], [111.0, 1884.625], [112.0, 1965.6000000000004], [113.0, 1924.8181818181818], [114.0, 1909.1], [115.0, 2020.2857142857142], [116.0, 2029.5714285714284], [117.0, 1904.3529411764703], [118.0, 2108.75], [119.0, 2110.125], [120.0, 1905.8749999999998], [121.0, 2015.9090909090908], [122.0, 2039.1666666666667], [123.0, 2047.1666666666665], [124.0, 2051.0], [125.0, 2004.3], [126.0, 2070.083333333333], [127.0, 2097.5], [128.0, 2224.1818181818185], [129.0, 2036.888888888889], [130.0, 2020.4166666666665], [131.0, 2195.0], [132.0, 2216.2000000000003], [133.0, 2175.7272727272725], [134.0, 2261.3333333333335], [135.0, 2432.714285714286], [136.0, 2184.875], [137.0, 2223.75], [138.0, 2283.714285714286], [139.0, 2441.5294117647063], [140.0, 2593.0], [141.0, 2463.2857142857138], [142.0, 2571.3125], [143.0, 2429.9], [144.0, 2791.4166666666665], [145.0, 2620.75], [146.0, 2634.6875], [147.0, 2288.285714285714], [148.0, 2685.0], [149.0, 2672.0499999999997], [150.0, 2643.7], [151.0, 2886.0909090909086], [152.0, 2656.3333333333335], [153.0, 3017.416666666667], [154.0, 3245.7058823529405], [155.0, 2888.1666666666665], [156.0, 3084.559999999999], [158.0, 2959.187500000001], [159.0, 2975.75], [157.0, 3258.4166666666665], [161.0, 3033.6111111111113], [162.0, 3247.0769230769233], [163.0, 3227.2727272727284], [164.0, 3163.3636363636365], [165.0, 2995.15], [166.0, 2881.416666666667], [167.0, 2831.8333333333326], [160.0, 3307.933333333334], [168.0, 2867.5], [169.0, 2902.074074074074], [170.0, 2957.142857142857], [171.0, 2733.818181818182], [172.0, 2891.6896551724135], [173.0, 2869.9756097560985], [174.0, 2918.772727272727], [175.0, 2783.4166666666665], [176.0, 2866.4814814814818], [177.0, 2926.4827586206893], [178.0, 2978.25], [179.0, 3083.3200000000006], [180.0, 3061.325], [181.0, 3030.576923076923], [182.0, 3156.4375000000005], [183.0, 3074.642857142857], [184.0, 3053.2424242424245], [185.0, 2985.5294117647063], [186.0, 2805.4861111111118], [187.0, 2639.3888888888887], [188.0, 2519.95], [1.0, 812.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}, {"data": [[132.31649999999985, 2267.776000000007]], "isOverall": false, "label": "POST /api/owner/login-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 188.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1310.75, "minX": 1.763892E12, "maxY": 16192.1, "series": [{"data": [[1.763892E12, 16192.1], [1.76389206E12, 3095.266666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.763892E12, 6855.916666666667], [1.76389206E12, 1310.75]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76389206E12, "title": "Bytes Throughput Over Time"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 1829.968847352025, "minX": 1.763892E12, "maxY": 2351.478260869571, "series": [{"data": [[1.763892E12, 2351.478260869571], [1.76389206E12, 1829.968847352025]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76389206E12, "title": "Response Time Over Time"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 1829.9532710280373, "minX": 1.763892E12, "maxY": 2351.444312090528, "series": [{"data": [[1.763892E12, 2351.444312090528], [1.76389206E12, 1829.9532710280373]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76389206E12, "title": "Latencies Over Time"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 0.0, "minX": 1.763892E12, "maxY": 0.13043478260869568, "series": [{"data": [[1.763892E12, 0.13043478260869568], [1.76389206E12, 0.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76389206E12, "title": "Connect Time Over Time"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 71.0, "minX": 1.763892E12, "maxY": 3476.0, "series": [{"data": [[1.763892E12, 3476.0], [1.76389206E12, 2349.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.763892E12, 71.0], [1.76389206E12, 812.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.763892E12, 3220.0], [1.76389206E12, 2308.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.763892E12, 3424.2], [1.76389206E12, 2338.56]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.763892E12, 2818.0], [1.76389206E12, 1903.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.763892E12, 3326.0], [1.76389206E12, 2321.9]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76389206E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
    data: {"result": {"minY": 134.0, "minX": 18.0, "maxY": 3351.5, "series": [{"data": [[34.0, 3078.5], [47.0, 134.0], [50.0, 3351.5], [52.0, 2000.5], [53.0, 3277.0], [54.0, 3151.5], [56.0, 1702.5], [59.0, 2969.0], [58.0, 2314.5], [61.0, 2073.0], [60.0, 2666.0], [62.0, 2138.5], [63.0, 2596.0], [64.0, 1486.0], [18.0, 928.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 64.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 134.0, "minX": 18.0, "maxY": 3351.5, "series": [{"data": [[34.0, 3078.5], [47.0, 134.0], [50.0, 3351.5], [52.0, 2000.5], [53.0, 3277.0], [54.0, 3151.5], [56.0, 1702.5], [59.0, 2969.0], [58.0, 2314.5], [61.0, 2073.0], [60.0, 2666.0], [62.0, 2138.5], [63.0, 2596.0], [64.0, 1486.0], [18.0, 928.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 64.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.283333333333333, "minX": 1.763892E12, "maxY": 30.05, "series": [{"data": [[1.763892E12, 30.05], [1.76389206E12, 3.283333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76389206E12, "title": "Hits Per Second"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 5.35, "minX": 1.763892E12, "maxY": 27.983333333333334, "series": [{"data": [[1.763892E12, 27.983333333333334], [1.76389206E12, 5.35]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76389206E12, "title": "Codes Per Second"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 5.35, "minX": 1.763892E12, "maxY": 27.983333333333334, "series": [{"data": [[1.763892E12, 27.983333333333334], [1.76389206E12, 5.35]], "isOverall": false, "label": "POST /api/owner/login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76389206E12, "title": "Transactions Per Second"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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
        data: {"result": {"minY": 5.35, "minX": 1.763892E12, "maxY": 27.983333333333334, "series": [{"data": [[1.763892E12, 27.983333333333334], [1.76389206E12, 5.35]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76389206E12, "title": "Total Transactions Per Second"}},
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
        fixTimeStamps(infos.data.result.series, -28800000);
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

