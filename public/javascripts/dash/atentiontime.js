function updateChartAtnTimeTimeline(id) {
    setInterval(chartAtnTimeTimeline, 3000);
}

var chartLineResolve;
function chartAtnTimeTimeline() {
    $.ajax({
        method: "POST",
        url: "/api/dash/atntime/timeline2",
        cache: false,
        success: function (data) {
            var ctx = document.getElementById("chartLineResolve");
            var context = ctx.getContext("2d");

            var gradient1 = context.createLinearGradient(0, 0, 0, 450);
            gradient1.addColorStop(0, "rgba(255, 187, 0, .4)");
            gradient1.addColorStop(0.5, "rgba(238, 255, 50, .9");

            var gradient2 = context.createLinearGradient(0, 0, 0, 450);
            gradient2.addColorStop(0, "rgba(5, 171, 224, .4)");
            gradient2.addColorStop(0.5, "rgba(135, 224, 253, .9)");

            var gradient3 = context.createLinearGradient(0, 0, 0, 450);
            gradient3.addColorStop(0, "rgb(39,44,77 ,1)");
            gradient3.addColorStop(0.9, "rgba(117, 182, 214, .5)");

            if (chartLineResolve) {
                chartLineResolve.data.datasets[0].data = data.map(function (o) {
                    return o.avg;
                });
                chartLineResolve.update();
            } else {
                chartLineResolve = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: data.map(function (o) {
                            return o.date;
                        }),
                        datasets: [
                            {
                                data: data.map(function (o) {
                                    return o.avg;
                                }),
                                borderColor: gradient1,
                                pointRadius: 0,
                                lineTension: 0,
                                lineWeight: 1,
                                fill: "none",
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        plugins: {
                            datalabels: {
                               // hide datalabels for all datasets
                               display: false
                            }
                        },
                        animation: {
                            duration: 3000
                        },
                        responsive: false,
                        chartArea: {
                            backgroundColor: "transparent"
                        },
                        legend: {
                            display: false
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
                                        callback: function (value) {
                                            return moment(value).format("HH:mm");
                                        },
                                        maxRotation: 0,
                                        autoSkip: true,
                                        autoSkipPadding: 8
                                    }
                                }
                            ]
                        }
                    }
                });
            }
        
        },
        error: function (a, b, c) {
            debugger;
        }
    });
}
