function updateChartTopIncident() {
    setInterval(chartTopIncident, 2000);
  }

var chartTopIncident1;

function chartTopIncident() {
    $.ajax({
        method: "POST",
        url: "/api/dash/incident/bysource",
        cache: false,
        success: function (data) {
            var dataset = [];
            var colors = [
                "#3e95cd80",
                "#8e5ea280",
                "#3cba9f80",
                "#e8c3b980",
                "#c4585080",
                "#3e95cd80",
                "#8e5ea280",
                "#3cba9f80",
                "#e8c3b980",
                "#c4585080",
            ];
            var bordercolors = [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
            ];
            var ctx = document.getElementById("chartTopIncident");
            var context = ctx.getContext("2d");
            // Label formatter function
            const formatter = (value, ctx) => {
                // const otherDatasetIndex = ctx.datasetIndex === 0 ? 1 : 0;
                var total = 0
                ctx.chart.data.datasets[0].data.forEach (function(numero){
                    total += numero;
                });
                // const total =
                // ctx.chart.data.datasets[otherDatasetIndex].data[ctx.dataIndex] +
                // value;

                return `${((value / total) * 100).toFixed(0)}%`;
            };
            if (chartTopIncident1) {
                chartTopIncident1.data.datasets[0].data = data.map(function (o) {
                    return o.count;
                });
                chartTopIncident1.update();
            } else {
                chartTopIncident1 = new Chart(ctx, {
                    type: "horizontalBar",
                    data: {
                        labels: data.map(function (o) {
                            return o.label;
                        }),
                        datasets: [
                            {
                                labels: data.map(function (o) {
                                    return o.label;
                                }),
                                data: data.map(function (o) {
                                    return o.count;
                                }),

                                backgroundColor: colors,
                                borderColor:bordercolors,
                                weight: 3,
                                borderWidth: 1,
                                datalabels: {
                                    color: "white",
                                    formatter: formatter,
                                },
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            // Change options for ALL labels of THIS CHART
                            datalabels: {
                              color: "#ffffff",
                              align: "right",
                              font: {
                                weight: "bold",
                              },
                            },
                        },
                        animation: {
                            duration: 3000,
                        },
                        // elements: {
                        //     center: {
                        //         text:
                        //             "Top",
                        //         color: "#FFF", // Default is #000000
                        //         fontStyle: "Arial", // Default is Arial
                        //         maxFontSize: 30, // Default is 25
                        //         sidePadding: 20, // Defualt is 20 (as a percentage)
                        //     },
                        // },
                        // cutoutPercentage: 80,
                        showTooltips: true,
                        showAllTooltips: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            enabled: true,
                        },
                        scales: {
                            yAxes: [
                                {
                                    scaleLabel: {
                                        display: true
                                    },
                                    ticks: {
                                        fontColor: "#ffffff",
                                        fontSize: 10
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        fontColor: "#ffffff",
                                        fontSize: 10,
                                        maxRotation: 0,
                                        autoSkip: true,
                                        autoSkipPadding: 8
                                    }
                                }
                            ]
                        }
                    },
                });
            }

            // var html = "";
            // for (let o in data) {
            //     html +=
            //         "<div style='background-color:" +
            //         colors[o] +
            //         "; margin: 0 5%;' class='bullet'></div>" +
            //         "<h6>" +
            //         data[o].label +
            //         "</h6><h6>" +
            //         data[o].count +
            //         "</h6><br>";
            // }

            // $("#dataTopIncident").html(html);
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}
