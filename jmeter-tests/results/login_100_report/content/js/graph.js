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
        data: {"result": {"minY": 70.0, "minX": 0.0, "maxY": 1208.0, "series": [{"data": [[0.0, 70.0], [0.1, 70.0], [0.2, 70.0], [0.3, 71.0], [0.4, 71.0], [0.5, 71.0], [0.6, 71.0], [0.7, 72.0], [0.8, 72.0], [0.9, 73.0], [1.0, 73.0], [1.1, 74.0], [1.2, 74.0], [1.3, 75.0], [1.4, 75.0], [1.5, 76.0], [1.6, 77.0], [1.7, 78.0], [1.8, 84.0], [1.9, 84.0], [2.0, 85.0], [2.1, 91.0], [2.2, 91.0], [2.3, 91.0], [2.4, 96.0], [2.5, 97.0], [2.6, 99.0], [2.7, 104.0], [2.8, 105.0], [2.9, 106.0], [3.0, 109.0], [3.1, 118.0], [3.2, 120.0], [3.3, 121.0], [3.4, 125.0], [3.5, 126.0], [3.6, 128.0], [3.7, 128.0], [3.8, 128.0], [3.9, 129.0], [4.0, 129.0], [4.1, 129.0], [4.2, 131.0], [4.3, 131.0], [4.4, 132.0], [4.5, 133.0], [4.6, 134.0], [4.7, 139.0], [4.8, 144.0], [4.9, 145.0], [5.0, 146.0], [5.1, 156.0], [5.2, 157.0], [5.3, 159.0], [5.4, 164.0], [5.5, 165.0], [5.6, 168.0], [5.7, 170.0], [5.8, 170.0], [5.9, 170.0], [6.0, 177.0], [6.1, 179.0], [6.2, 181.0], [6.3, 182.0], [6.4, 184.0], [6.5, 184.0], [6.6, 188.0], [6.7, 189.0], [6.8, 190.0], [6.9, 190.0], [7.0, 193.0], [7.1, 193.0], [7.2, 194.0], [7.3, 199.0], [7.4, 199.0], [7.5, 201.0], [7.6, 201.0], [7.7, 202.0], [7.8, 204.0], [7.9, 204.0], [8.0, 205.0], [8.1, 207.0], [8.2, 207.0], [8.3, 209.0], [8.4, 211.0], [8.5, 211.0], [8.6, 211.0], [8.7, 211.0], [8.8, 212.0], [8.9, 212.0], [9.0, 212.0], [9.1, 212.0], [9.2, 212.0], [9.3, 213.0], [9.4, 213.0], [9.5, 214.0], [9.6, 225.0], [9.7, 225.0], [9.8, 225.0], [9.9, 226.0], [10.0, 230.0], [10.1, 230.0], [10.2, 230.0], [10.3, 231.0], [10.4, 231.0], [10.5, 231.0], [10.6, 232.0], [10.7, 233.0], [10.8, 234.0], [10.9, 234.0], [11.0, 234.0], [11.1, 237.0], [11.2, 239.0], [11.3, 240.0], [11.4, 241.0], [11.5, 242.0], [11.6, 244.0], [11.7, 251.0], [11.8, 251.0], [11.9, 251.0], [12.0, 252.0], [12.1, 252.0], [12.2, 252.0], [12.3, 253.0], [12.4, 253.0], [12.5, 254.0], [12.6, 255.0], [12.7, 255.0], [12.8, 256.0], [12.9, 256.0], [13.0, 256.0], [13.1, 256.0], [13.2, 257.0], [13.3, 257.0], [13.4, 258.0], [13.5, 258.0], [13.6, 261.0], [13.7, 265.0], [13.8, 266.0], [13.9, 267.0], [14.0, 267.0], [14.1, 268.0], [14.2, 269.0], [14.3, 271.0], [14.4, 271.0], [14.5, 272.0], [14.6, 275.0], [14.7, 276.0], [14.8, 282.0], [14.9, 282.0], [15.0, 285.0], [15.1, 291.0], [15.2, 293.0], [15.3, 294.0], [15.4, 294.0], [15.5, 296.0], [15.6, 297.0], [15.7, 297.0], [15.8, 297.0], [15.9, 300.0], [16.0, 301.0], [16.1, 304.0], [16.2, 304.0], [16.3, 306.0], [16.4, 308.0], [16.5, 308.0], [16.6, 309.0], [16.7, 312.0], [16.8, 315.0], [16.9, 315.0], [17.0, 317.0], [17.1, 319.0], [17.2, 321.0], [17.3, 323.0], [17.4, 324.0], [17.5, 325.0], [17.6, 326.0], [17.7, 327.0], [17.8, 328.0], [17.9, 328.0], [18.0, 329.0], [18.1, 331.0], [18.2, 332.0], [18.3, 333.0], [18.4, 333.0], [18.5, 334.0], [18.6, 335.0], [18.7, 336.0], [18.8, 336.0], [18.9, 336.0], [19.0, 337.0], [19.1, 338.0], [19.2, 339.0], [19.3, 341.0], [19.4, 343.0], [19.5, 347.0], [19.6, 351.0], [19.7, 357.0], [19.8, 358.0], [19.9, 358.0], [20.0, 359.0], [20.1, 359.0], [20.2, 360.0], [20.3, 361.0], [20.4, 362.0], [20.5, 364.0], [20.6, 365.0], [20.7, 368.0], [20.8, 375.0], [20.9, 376.0], [21.0, 377.0], [21.1, 377.0], [21.2, 379.0], [21.3, 380.0], [21.4, 382.0], [21.5, 382.0], [21.6, 383.0], [21.7, 383.0], [21.8, 383.0], [21.9, 383.0], [22.0, 385.0], [22.1, 385.0], [22.2, 386.0], [22.3, 387.0], [22.4, 388.0], [22.5, 388.0], [22.6, 390.0], [22.7, 391.0], [22.8, 391.0], [22.9, 391.0], [23.0, 392.0], [23.1, 392.0], [23.2, 392.0], [23.3, 393.0], [23.4, 393.0], [23.5, 393.0], [23.6, 394.0], [23.7, 394.0], [23.8, 394.0], [23.9, 395.0], [24.0, 395.0], [24.1, 395.0], [24.2, 397.0], [24.3, 397.0], [24.4, 398.0], [24.5, 401.0], [24.6, 403.0], [24.7, 404.0], [24.8, 412.0], [24.9, 412.0], [25.0, 414.0], [25.1, 416.0], [25.2, 417.0], [25.3, 418.0], [25.4, 419.0], [25.5, 420.0], [25.6, 420.0], [25.7, 421.0], [25.8, 422.0], [25.9, 423.0], [26.0, 427.0], [26.1, 430.0], [26.2, 431.0], [26.3, 431.0], [26.4, 436.0], [26.5, 439.0], [26.6, 440.0], [26.7, 442.0], [26.8, 442.0], [26.9, 442.0], [27.0, 448.0], [27.1, 449.0], [27.2, 449.0], [27.3, 450.0], [27.4, 451.0], [27.5, 453.0], [27.6, 454.0], [27.7, 455.0], [27.8, 455.0], [27.9, 455.0], [28.0, 455.0], [28.1, 457.0], [28.2, 457.0], [28.3, 457.0], [28.4, 458.0], [28.5, 458.0], [28.6, 459.0], [28.7, 460.0], [28.8, 460.0], [28.9, 461.0], [29.0, 461.0], [29.1, 462.0], [29.2, 464.0], [29.3, 465.0], [29.4, 465.0], [29.5, 466.0], [29.6, 467.0], [29.7, 467.0], [29.8, 469.0], [29.9, 470.0], [30.0, 470.0], [30.1, 473.0], [30.2, 476.0], [30.3, 477.0], [30.4, 478.0], [30.5, 478.0], [30.6, 479.0], [30.7, 480.0], [30.8, 482.0], [30.9, 483.0], [31.0, 486.0], [31.1, 487.0], [31.2, 488.0], [31.3, 492.0], [31.4, 497.0], [31.5, 500.0], [31.6, 501.0], [31.7, 501.0], [31.8, 502.0], [31.9, 504.0], [32.0, 504.0], [32.1, 504.0], [32.2, 504.0], [32.3, 505.0], [32.4, 506.0], [32.5, 506.0], [32.6, 507.0], [32.7, 507.0], [32.8, 507.0], [32.9, 508.0], [33.0, 509.0], [33.1, 510.0], [33.2, 510.0], [33.3, 510.0], [33.4, 510.0], [33.5, 511.0], [33.6, 511.0], [33.7, 513.0], [33.8, 513.0], [33.9, 514.0], [34.0, 514.0], [34.1, 514.0], [34.2, 515.0], [34.3, 515.0], [34.4, 515.0], [34.5, 515.0], [34.6, 515.0], [34.7, 517.0], [34.8, 518.0], [34.9, 518.0], [35.0, 520.0], [35.1, 521.0], [35.2, 522.0], [35.3, 523.0], [35.4, 525.0], [35.5, 526.0], [35.6, 528.0], [35.7, 528.0], [35.8, 534.0], [35.9, 539.0], [36.0, 540.0], [36.1, 542.0], [36.2, 545.0], [36.3, 546.0], [36.4, 547.0], [36.5, 549.0], [36.6, 549.0], [36.7, 550.0], [36.8, 554.0], [36.9, 555.0], [37.0, 558.0], [37.1, 559.0], [37.2, 560.0], [37.3, 566.0], [37.4, 566.0], [37.5, 569.0], [37.6, 569.0], [37.7, 569.0], [37.8, 574.0], [37.9, 575.0], [38.0, 575.0], [38.1, 576.0], [38.2, 576.0], [38.3, 576.0], [38.4, 576.0], [38.5, 578.0], [38.6, 580.0], [38.7, 580.0], [38.8, 581.0], [38.9, 582.0], [39.0, 582.0], [39.1, 582.0], [39.2, 582.0], [39.3, 583.0], [39.4, 584.0], [39.5, 585.0], [39.6, 586.0], [39.7, 587.0], [39.8, 587.0], [39.9, 587.0], [40.0, 587.0], [40.1, 587.0], [40.2, 587.0], [40.3, 587.0], [40.4, 588.0], [40.5, 589.0], [40.6, 589.0], [40.7, 589.0], [40.8, 589.0], [40.9, 589.0], [41.0, 590.0], [41.1, 590.0], [41.2, 591.0], [41.3, 592.0], [41.4, 592.0], [41.5, 594.0], [41.6, 595.0], [41.7, 598.0], [41.8, 598.0], [41.9, 598.0], [42.0, 600.0], [42.1, 600.0], [42.2, 600.0], [42.3, 601.0], [42.4, 601.0], [42.5, 601.0], [42.6, 602.0], [42.7, 603.0], [42.8, 608.0], [42.9, 609.0], [43.0, 610.0], [43.1, 611.0], [43.2, 612.0], [43.3, 617.0], [43.4, 620.0], [43.5, 620.0], [43.6, 622.0], [43.7, 622.0], [43.8, 622.0], [43.9, 623.0], [44.0, 625.0], [44.1, 625.0], [44.2, 626.0], [44.3, 627.0], [44.4, 628.0], [44.5, 629.0], [44.6, 629.0], [44.7, 630.0], [44.8, 631.0], [44.9, 631.0], [45.0, 631.0], [45.1, 632.0], [45.2, 633.0], [45.3, 634.0], [45.4, 634.0], [45.5, 635.0], [45.6, 635.0], [45.7, 635.0], [45.8, 635.0], [45.9, 636.0], [46.0, 636.0], [46.1, 636.0], [46.2, 637.0], [46.3, 638.0], [46.4, 638.0], [46.5, 638.0], [46.6, 638.0], [46.7, 638.0], [46.8, 640.0], [46.9, 640.0], [47.0, 641.0], [47.1, 641.0], [47.2, 643.0], [47.3, 645.0], [47.4, 645.0], [47.5, 646.0], [47.6, 646.0], [47.7, 646.0], [47.8, 646.0], [47.9, 648.0], [48.0, 648.0], [48.1, 649.0], [48.2, 649.0], [48.3, 650.0], [48.4, 650.0], [48.5, 650.0], [48.6, 650.0], [48.7, 651.0], [48.8, 651.0], [48.9, 652.0], [49.0, 656.0], [49.1, 656.0], [49.2, 657.0], [49.3, 659.0], [49.4, 662.0], [49.5, 664.0], [49.6, 668.0], [49.7, 671.0], [49.8, 675.0], [49.9, 676.0], [50.0, 677.0], [50.1, 678.0], [50.2, 683.0], [50.3, 683.0], [50.4, 686.0], [50.5, 686.0], [50.6, 686.0], [50.7, 692.0], [50.8, 694.0], [50.9, 696.0], [51.0, 697.0], [51.1, 697.0], [51.2, 697.0], [51.3, 698.0], [51.4, 698.0], [51.5, 699.0], [51.6, 699.0], [51.7, 699.0], [51.8, 699.0], [51.9, 699.0], [52.0, 700.0], [52.1, 701.0], [52.2, 701.0], [52.3, 701.0], [52.4, 703.0], [52.5, 704.0], [52.6, 704.0], [52.7, 705.0], [52.8, 708.0], [52.9, 708.0], [53.0, 710.0], [53.1, 711.0], [53.2, 711.0], [53.3, 713.0], [53.4, 716.0], [53.5, 717.0], [53.6, 722.0], [53.7, 723.0], [53.8, 724.0], [53.9, 728.0], [54.0, 731.0], [54.1, 737.0], [54.2, 738.0], [54.3, 740.0], [54.4, 740.0], [54.5, 742.0], [54.6, 749.0], [54.7, 751.0], [54.8, 751.0], [54.9, 752.0], [55.0, 754.0], [55.1, 754.0], [55.2, 754.0], [55.3, 759.0], [55.4, 759.0], [55.5, 760.0], [55.6, 764.0], [55.7, 766.0], [55.8, 775.0], [55.9, 775.0], [56.0, 777.0], [56.1, 782.0], [56.2, 783.0], [56.3, 785.0], [56.4, 789.0], [56.5, 790.0], [56.6, 790.0], [56.7, 799.0], [56.8, 799.0], [56.9, 801.0], [57.0, 802.0], [57.1, 804.0], [57.2, 807.0], [57.3, 808.0], [57.4, 809.0], [57.5, 809.0], [57.6, 811.0], [57.7, 814.0], [57.8, 814.0], [57.9, 818.0], [58.0, 820.0], [58.1, 821.0], [58.2, 822.0], [58.3, 823.0], [58.4, 829.0], [58.5, 829.0], [58.6, 831.0], [58.7, 832.0], [58.8, 833.0], [58.9, 835.0], [59.0, 840.0], [59.1, 841.0], [59.2, 842.0], [59.3, 843.0], [59.4, 843.0], [59.5, 846.0], [59.6, 846.0], [59.7, 847.0], [59.8, 848.0], [59.9, 850.0], [60.0, 850.0], [60.1, 850.0], [60.2, 851.0], [60.3, 852.0], [60.4, 853.0], [60.5, 854.0], [60.6, 854.0], [60.7, 854.0], [60.8, 856.0], [60.9, 857.0], [61.0, 857.0], [61.1, 857.0], [61.2, 858.0], [61.3, 858.0], [61.4, 859.0], [61.5, 859.0], [61.6, 860.0], [61.7, 860.0], [61.8, 861.0], [61.9, 861.0], [62.0, 861.0], [62.1, 861.0], [62.2, 862.0], [62.3, 862.0], [62.4, 862.0], [62.5, 863.0], [62.6, 863.0], [62.7, 864.0], [62.8, 865.0], [62.9, 866.0], [63.0, 868.0], [63.1, 868.0], [63.2, 870.0], [63.3, 870.0], [63.4, 871.0], [63.5, 871.0], [63.6, 871.0], [63.7, 872.0], [63.8, 873.0], [63.9, 873.0], [64.0, 875.0], [64.1, 876.0], [64.2, 876.0], [64.3, 876.0], [64.4, 877.0], [64.5, 878.0], [64.6, 878.0], [64.7, 878.0], [64.8, 879.0], [64.9, 879.0], [65.0, 880.0], [65.1, 881.0], [65.2, 881.0], [65.3, 881.0], [65.4, 881.0], [65.5, 882.0], [65.6, 882.0], [65.7, 885.0], [65.8, 885.0], [65.9, 885.0], [66.0, 886.0], [66.1, 887.0], [66.2, 888.0], [66.3, 891.0], [66.4, 893.0], [66.5, 893.0], [66.6, 895.0], [66.7, 895.0], [66.8, 895.0], [66.9, 896.0], [67.0, 898.0], [67.1, 898.0], [67.2, 899.0], [67.3, 904.0], [67.4, 904.0], [67.5, 904.0], [67.6, 905.0], [67.7, 906.0], [67.8, 907.0], [67.9, 909.0], [68.0, 910.0], [68.1, 911.0], [68.2, 912.0], [68.3, 913.0], [68.4, 914.0], [68.5, 915.0], [68.6, 916.0], [68.7, 916.0], [68.8, 916.0], [68.9, 916.0], [69.0, 916.0], [69.1, 917.0], [69.2, 917.0], [69.3, 918.0], [69.4, 918.0], [69.5, 918.0], [69.6, 919.0], [69.7, 920.0], [69.8, 920.0], [69.9, 920.0], [70.0, 920.0], [70.1, 921.0], [70.2, 921.0], [70.3, 922.0], [70.4, 922.0], [70.5, 922.0], [70.6, 922.0], [70.7, 923.0], [70.8, 923.0], [70.9, 923.0], [71.0, 923.0], [71.1, 924.0], [71.2, 925.0], [71.3, 925.0], [71.4, 925.0], [71.5, 926.0], [71.6, 927.0], [71.7, 927.0], [71.8, 927.0], [71.9, 927.0], [72.0, 927.0], [72.1, 928.0], [72.2, 929.0], [72.3, 930.0], [72.4, 930.0], [72.5, 931.0], [72.6, 931.0], [72.7, 933.0], [72.8, 933.0], [72.9, 933.0], [73.0, 933.0], [73.1, 933.0], [73.2, 934.0], [73.3, 934.0], [73.4, 934.0], [73.5, 934.0], [73.6, 935.0], [73.7, 935.0], [73.8, 935.0], [73.9, 936.0], [74.0, 936.0], [74.1, 937.0], [74.2, 937.0], [74.3, 938.0], [74.4, 939.0], [74.5, 939.0], [74.6, 940.0], [74.7, 940.0], [74.8, 941.0], [74.9, 942.0], [75.0, 943.0], [75.1, 943.0], [75.2, 943.0], [75.3, 943.0], [75.4, 943.0], [75.5, 943.0], [75.6, 943.0], [75.7, 944.0], [75.8, 944.0], [75.9, 945.0], [76.0, 946.0], [76.1, 947.0], [76.2, 947.0], [76.3, 948.0], [76.4, 948.0], [76.5, 949.0], [76.6, 950.0], [76.7, 950.0], [76.8, 950.0], [76.9, 951.0], [77.0, 952.0], [77.1, 953.0], [77.2, 954.0], [77.3, 954.0], [77.4, 954.0], [77.5, 954.0], [77.6, 954.0], [77.7, 955.0], [77.8, 955.0], [77.9, 955.0], [78.0, 956.0], [78.1, 957.0], [78.2, 958.0], [78.3, 959.0], [78.4, 960.0], [78.5, 961.0], [78.6, 961.0], [78.7, 962.0], [78.8, 962.0], [78.9, 962.0], [79.0, 962.0], [79.1, 963.0], [79.2, 963.0], [79.3, 965.0], [79.4, 966.0], [79.5, 966.0], [79.6, 966.0], [79.7, 967.0], [79.8, 967.0], [79.9, 969.0], [80.0, 969.0], [80.1, 969.0], [80.2, 970.0], [80.3, 971.0], [80.4, 971.0], [80.5, 971.0], [80.6, 972.0], [80.7, 972.0], [80.8, 972.0], [80.9, 974.0], [81.0, 975.0], [81.1, 977.0], [81.2, 977.0], [81.3, 978.0], [81.4, 978.0], [81.5, 979.0], [81.6, 981.0], [81.7, 981.0], [81.8, 982.0], [81.9, 982.0], [82.0, 982.0], [82.1, 987.0], [82.2, 987.0], [82.3, 989.0], [82.4, 993.0], [82.5, 994.0], [82.6, 995.0], [82.7, 996.0], [82.8, 996.0], [82.9, 996.0], [83.0, 997.0], [83.1, 997.0], [83.2, 998.0], [83.3, 999.0], [83.4, 999.0], [83.5, 1000.0], [83.6, 1000.0], [83.7, 1001.0], [83.8, 1001.0], [83.9, 1001.0], [84.0, 1004.0], [84.1, 1009.0], [84.2, 1011.0], [84.3, 1012.0], [84.4, 1012.0], [84.5, 1015.0], [84.6, 1016.0], [84.7, 1019.0], [84.8, 1022.0], [84.9, 1023.0], [85.0, 1023.0], [85.1, 1024.0], [85.2, 1025.0], [85.3, 1025.0], [85.4, 1028.0], [85.5, 1031.0], [85.6, 1032.0], [85.7, 1032.0], [85.8, 1033.0], [85.9, 1034.0], [86.0, 1036.0], [86.1, 1036.0], [86.2, 1039.0], [86.3, 1039.0], [86.4, 1039.0], [86.5, 1039.0], [86.6, 1041.0], [86.7, 1041.0], [86.8, 1041.0], [86.9, 1042.0], [87.0, 1042.0], [87.1, 1043.0], [87.2, 1043.0], [87.3, 1043.0], [87.4, 1043.0], [87.5, 1044.0], [87.6, 1045.0], [87.7, 1046.0], [87.8, 1047.0], [87.9, 1047.0], [88.0, 1047.0], [88.1, 1047.0], [88.2, 1048.0], [88.3, 1049.0], [88.4, 1049.0], [88.5, 1050.0], [88.6, 1050.0], [88.7, 1050.0], [88.8, 1050.0], [88.9, 1050.0], [89.0, 1051.0], [89.1, 1051.0], [89.2, 1051.0], [89.3, 1051.0], [89.4, 1055.0], [89.5, 1056.0], [89.6, 1056.0], [89.7, 1058.0], [89.8, 1058.0], [89.9, 1058.0], [90.0, 1060.0], [90.1, 1062.0], [90.2, 1063.0], [90.3, 1064.0], [90.4, 1066.0], [90.5, 1066.0], [90.6, 1068.0], [90.7, 1069.0], [90.8, 1071.0], [90.9, 1076.0], [91.0, 1076.0], [91.1, 1076.0], [91.2, 1078.0], [91.3, 1078.0], [91.4, 1078.0], [91.5, 1078.0], [91.6, 1078.0], [91.7, 1080.0], [91.8, 1080.0], [91.9, 1082.0], [92.0, 1085.0], [92.1, 1087.0], [92.2, 1088.0], [92.3, 1089.0], [92.4, 1093.0], [92.5, 1093.0], [92.6, 1094.0], [92.7, 1096.0], [92.8, 1103.0], [92.9, 1104.0], [93.0, 1104.0], [93.1, 1106.0], [93.2, 1108.0], [93.3, 1109.0], [93.4, 1109.0], [93.5, 1113.0], [93.6, 1113.0], [93.7, 1115.0], [93.8, 1126.0], [93.9, 1128.0], [94.0, 1132.0], [94.1, 1135.0], [94.2, 1137.0], [94.3, 1138.0], [94.4, 1139.0], [94.5, 1142.0], [94.6, 1148.0], [94.7, 1148.0], [94.8, 1149.0], [94.9, 1149.0], [95.0, 1152.0], [95.1, 1153.0], [95.2, 1153.0], [95.3, 1153.0], [95.4, 1154.0], [95.5, 1156.0], [95.6, 1156.0], [95.7, 1159.0], [95.8, 1159.0], [95.9, 1160.0], [96.0, 1165.0], [96.1, 1169.0], [96.2, 1169.0], [96.3, 1171.0], [96.4, 1172.0], [96.5, 1172.0], [96.6, 1174.0], [96.7, 1176.0], [96.8, 1177.0], [96.9, 1178.0], [97.0, 1179.0], [97.1, 1182.0], [97.2, 1182.0], [97.3, 1182.0], [97.4, 1184.0], [97.5, 1184.0], [97.6, 1184.0], [97.7, 1185.0], [97.8, 1185.0], [97.9, 1186.0], [98.0, 1189.0], [98.1, 1192.0], [98.2, 1192.0], [98.3, 1194.0], [98.4, 1194.0], [98.5, 1195.0], [98.6, 1195.0], [98.7, 1195.0], [98.8, 1197.0], [98.9, 1197.0], [99.0, 1197.0], [99.1, 1199.0], [99.2, 1199.0], [99.3, 1200.0], [99.4, 1201.0], [99.5, 1203.0], [99.6, 1204.0], [99.7, 1205.0], [99.8, 1208.0], [99.9, 1208.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 7.0, "minX": 0.0, "maxY": 162.0, "series": [{"data": [[0.0, 26.0], [600.0, 100.0], [700.0, 49.0], [200.0, 84.0], [800.0, 104.0], [900.0, 162.0], [1000.0, 94.0], [1100.0, 65.0], [300.0, 85.0], [1200.0, 7.0], [100.0, 49.0], [400.0, 70.0], [500.0, 105.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 315.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 685.0, "series": [{"data": [[0.0, 315.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 685.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 39.96999999999999, "minX": 1.763892E12, "maxY": 39.96999999999999, "series": [{"data": [[1.763892E12, 39.96999999999999]], "isOverall": false, "label": "Owner Login Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.763892E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 89.28571428571428, "minX": 1.0, "maxY": 1173.3125, "series": [{"data": [[2.0, 124.66666666666667], [3.0, 102.5], [4.0, 89.28571428571428], [5.0, 101.16666666666667], [6.0, 108.0], [7.0, 120.33333333333334], [8.0, 134.125], [9.0, 155.16666666666669], [10.0, 160.46666666666667], [11.0, 181.64285714285714], [12.0, 236.76923076923077], [13.0, 254.60000000000002], [14.0, 262.2], [15.0, 243.25], [16.0, 264.1], [17.0, 276.59999999999997], [18.0, 278.38461538461536], [19.0, 299.9333333333333], [20.0, 327.5], [21.0, 332.74999999999994], [22.0, 378.1333333333334], [23.0, 359.14285714285717], [24.0, 432.37500000000006], [25.0, 414.56250000000006], [26.0, 429.125], [27.0, 420.4285714285714], [28.0, 449.3636363636363], [29.0, 484.27272727272725], [30.0, 480.4761904761904], [31.0, 509.82352941176464], [32.0, 545.5714285714286], [33.0, 568.3636363636364], [34.0, 538.25], [35.0, 546.8125], [36.0, 556.7222222222223], [37.0, 606.5], [38.0, 640.9166666666667], [39.0, 649.4], [40.0, 645.5000000000001], [41.0, 668.0909090909091], [42.0, 685.1739130434783], [43.0, 677.8124999999999], [44.0, 747.0909090909091], [45.0, 785.5333333333333], [46.0, 763.9047619047618], [47.0, 779.3333333333334], [48.0, 825.2142857142856], [49.0, 843.3125], [50.0, 844.3571428571429], [51.0, 883.4210526315788], [52.0, 897.7619047619048], [53.0, 932.8461538461539], [54.0, 932.0], [55.0, 952.0344827586204], [56.0, 954.5555555555555], [57.0, 983.3703703703703], [58.0, 984.9583333333333], [59.0, 1009.6551724137931], [60.0, 980.625], [61.0, 1002.6896551724138], [62.0, 1041.5625], [63.0, 1066.6538461538462], [64.0, 1136.103448275862], [65.0, 1173.3125], [66.0, 1162.8947368421054], [67.0, 1142.5555555555557], [1.0, 184.0]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}, {"data": [[39.96999999999999, 675.6129999999994]], "isOverall": false, "label": "POST /api/owner/login-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 67.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 4083.3333333333335, "minX": 1.763892E12, "maxY": 9642.666666666666, "series": [{"data": [[1.763892E12, 9642.666666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.763892E12, 4083.3333333333335]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.763892E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 675.6129999999994, "minX": 1.763892E12, "maxY": 675.6129999999994, "series": [{"data": [[1.763892E12, 675.6129999999994]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.763892E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 675.570000000001, "minX": 1.763892E12, "maxY": 675.570000000001, "series": [{"data": [[1.763892E12, 675.570000000001]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.763892E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.12300000000000005, "minX": 1.763892E12, "maxY": 0.12300000000000005, "series": [{"data": [[1.763892E12, 0.12300000000000005]], "isOverall": false, "label": "POST /api/owner/login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.763892E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 70.0, "minX": 1.763892E12, "maxY": 1208.0, "series": [{"data": [[1.763892E12, 1208.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.763892E12, 70.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.763892E12, 1061.8]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.763892E12, 1197.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.763892E12, 677.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.763892E12, 1151.85]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.763892E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 105.0, "minX": 49.0, "maxY": 1015.0, "series": [{"data": [[64.0, 292.0], [49.0, 1015.0], [52.0, 850.0], [55.0, 105.0], [54.0, 434.5], [57.0, 211.0], [59.0, 937.0], [60.0, 516.0], [61.0, 943.0], [62.0, 533.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 64.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 105.0, "minX": 49.0, "maxY": 1015.0, "series": [{"data": [[64.0, 291.5], [49.0, 1015.0], [52.0, 850.0], [55.0, 105.0], [54.0, 434.5], [57.0, 211.0], [59.0, 937.0], [60.0, 516.0], [61.0, 943.0], [62.0, 533.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 64.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.763892E12, "maxY": 16.666666666666668, "series": [{"data": [[1.763892E12, 16.666666666666668]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.763892E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.763892E12, "maxY": 16.666666666666668, "series": [{"data": [[1.763892E12, 16.666666666666668]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.763892E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.763892E12, "maxY": 16.666666666666668, "series": [{"data": [[1.763892E12, 16.666666666666668]], "isOverall": false, "label": "POST /api/owner/login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.763892E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 16.666666666666668, "minX": 1.763892E12, "maxY": 16.666666666666668, "series": [{"data": [[1.763892E12, 16.666666666666668]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.763892E12, "title": "Total Transactions Per Second"}},
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

