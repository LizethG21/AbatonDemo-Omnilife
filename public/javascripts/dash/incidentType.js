function updateChartIncidentType() {
    setInterval(chartIncidentType, 4000);
}
  
var chartIncidentType1;

function chartIncidentType() {
    $.ajax({
        method: "POST",
        url: "/api/dash/incident/bytype",

        cache: false,
        success: function (data) {
         
            var dataset = [];
            var colors = [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9"
            ];
            var bordercolors = [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9"
            ];
            var ctx = document.getElementById("chartIncidentType");
            var context = ctx.getContext("2d");

            if (chartIncidentType1) {
                chartIncidentType1.data.datasets[0].data = data.map(function (o) {
                    return o.count;
                }),
                chartIncidentType1.update();
                var html = "";
            for (let o in data) {
                html +=
                    "<div style='background-color:" +
                    colors[o] +
                    "; margin: 0 5%;' class='bullet'></div>" +
                    "<h6>" +
                    data[o].label +
                    "</h6><h6>" +
                    data[o].count +
                    "</h6><br>";
            }

            $("#dataIncidentType").html(html);
            } else {
                Chart.pluginService.register({
                    beforeDraw: function (chart) {
                        if (chart.config.options.elements.center) {
                            //Get ctx from string
                            var ctx = chart.chart.ctx;
                            //hack to center different fonts
                            var x_fix = 0;
                            var y_fix = 2;
                            var x = chart.canvas.clientWidth / 2;
                            var y = chart.canvas.clientHeight / 2;
                            ctx.beginPath();
                            ctx.arc(x, y, 100, 0, 2 * Math.PI);
                            ctx.fillStyle = "#272C31";
                            ctx.fill();
                            ctx.lineWidth = 5;
                            ctx.strokeStyle = "#272C31";
                            ctx.stroke();
                            ctx.fillStyle = "blue";
    
                            //Get options from the center object in options
                            var centerConfig = chart.config.options.elements.center;
                            var fontStyle = centerConfig.fontStyle || "Arial";
                            var txt = centerConfig.text;
                            var color = centerConfig.color || "#000";
                            var maxFontSize = centerConfig.maxFontSize || 25;
                            var sidePadding = centerConfig.sidePadding || 20;
                            var sidePaddingCalculated =
                                (sidePadding / 100) * (chart.innerRadius * 2);
                            //Start with a base font of 30px
                            ctx.font = "30px " + fontStyle;
    
                            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                            var stringWidth = ctx.measureText(txt).width;
                            var elementWidth =
                                chart.innerRadius * 2 - sidePaddingCalculated;
    
                            // Find out how much the font can grow in width.
                            var widthRatio = elementWidth / stringWidth;
                            var newFontSize = Math.floor(30 * widthRatio);
                            var elementHeight = chart.innerRadius * 2;
    
                            // Pick a new font size so it will not be larger than the height of label.
                            var fontSizeToUse = Math.min(
                                newFontSize,
                                elementHeight,
                                maxFontSize
                            );
    
                            //Set font settings to draw it correctly.
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            var centerX =
                                (chart.chartArea.left + chart.chartArea.right) / 2;
                            var centerY =
                                (chart.chartArea.top + chart.chartArea.bottom) / 2;
                            ctx.font = fontSizeToUse + "px " + fontStyle;
                            ctx.fillStyle = color;
    
                            //Draw text in center
                            ctx.fillText(txt, centerX, centerY);
                        }
                    },
                });
                chartIncidentType1 = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: data.map(function (o) {
                            return o.label;
                        }),
                        datasets: [
                            {
                               
                                data: data.map(function (o) {
                                    return o.count;
                                }),

                                backgroundColor: colors,
                                borderColor:bordercolors,
                                weight: 3,
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            datalabels: {
                               // hide datalabels for all datasets
                               display: false
                            }
                        },
                        animation: {
                            duration: 3000,
                        },
                        elements: {
                            center: {
                                text:
                                    "Tipo",
                                color: "#FFF", // Default is #000000
                                fontStyle: "Arial", // Default is Arial
                                maxFontSize: 30, // Default is 25
                                sidePadding: 20, // Defualt is 20 (as a percentage)
                            },
                        },
                        cutoutPercentage: 80,
                        showTooltips: true,
                        showAllTooltips: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            enabled: true,
                        },
                       
                    },
                });
            }

            var html = "";
            for (let o in data) {
                html +=
                    "<div style='background-color:" +
                    colors[o] +
                    "; margin: 0 5%;' class='bullet'></div>" +
                    "<h6>" +
                    data[o].label +
                    "</h6><h6>" +
                    data[o].count +
                    "</h6><br>";
            }

            $("#dataIncidentType").html(html);
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}
