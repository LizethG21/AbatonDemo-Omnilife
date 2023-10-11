function updateChartHistogramInventory(){
    setInterval(chartHistogramInventory, 2000);
}

var chartHistogramInventory1;
function chartHistogramInventory() {
  $.ajax({
    method: "POST",
    url: "/api/dash/inventory/radar",
    cache: false,
    success: function (data) {
      var ctx = document.getElementById("chartHistogramInventory");
      var context = ctx.getContext("2d");
      var color = Chart.helpers.color;
      // Label formatter function
      const formatter = (value, ctx) => {
        const otherDatasetIndex = ctx.datasetIndex === 0 ? 1 : 0;
        const total =
          ctx.chart.data.datasets[otherDatasetIndex].data[ctx.dataIndex] +
          value;

        return `${((value / total) * 100).toFixed(0)}%`;
      };
      if (chartHistogramInventory1) {
        chartHistogramInventory1.data.datasets[0].data = data.map(function (o) {
          return o.real;
        });
        chartHistogramInventory1.data.datasets[1].data = data.map(function (o) {
            return o.planing - o.real;
          });
        chartHistogramInventory1.update();
      } else {
        chartHistogramInventory1 = new Chart(ctx, {
          type: "horizontalBar",
          data: {
            labels: data.map(function (o) {
              return o.label;
            }),
            datasets: [
              {
                data: data.map(function (o) {
                  return o.real;
                }),
                label: "Asignado",
                backgroundColor: color("#3CB9EA").alpha(0.2).rgbString(),
                borderColor: "#3CB9EA",
                weight: 3,
                borderWidth: 1,
                datalabels: {
                  color: "white",
                  formatter: formatter,
                },
              },
              {
                data: data.map(function (o) {
                  return o.planing - o.real;
                }),
                label: "Total",
                backgroundColor: color("#DCBC05").alpha(0.2).rgbString(),
                borderColor: "#DCBC05",
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
            responsive: false,
            maintainAspectRatio: false,
            animation: {
              duration: 3000,
            },
            spanGaps: false,
            legend: {
              display: false,
            },
            tooltips: {
                display:false,
            },
            scales: {
              yAxes: [
                {
                  stacked: true,
                  scaleLabel: {
                    display: true,
                  },
                  ticks: {
                    fontColor: "#ffffff",
                    fontSize: 10,
                  },
                },
              ],
              xAxes: [
                {
                  stacked: true,
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    fontColor: "#ffffff",
                    fontSize: 10,
                    maxRotation: 0,
                    autoSkip: true,
                    autoSkipPadding: 8,
                  },
                },
              ],
            },
          },
        });
      }
    },
    error: function (a, b, c) {
      debugger;
    },
  });
}