function updateChartInventoryRadar() {
  setInterval(chartInventoryRadar, 4000);
}

var chartRadarInventory;

function chartInventoryRadar() {
  $.ajax({
    method: "POST",
    url: "/api/dash/inventory/radar",
    cache: false,
    success: function (data) {
      var ctx = document.getElementById("chartRadarInventory");
      var color = Chart.helpers.color;
      // Label formatter function
      const formatter = (value, ctx) => {
        const otherDatasetIndex = ctx.datasetIndex === 0 ? 1 : 0;
        const total =
          ctx.chart.data.datasets[otherDatasetIndex].data[ctx.dataIndex] +
          value;

        return `${((value / total) * 100).toFixed(0)}%`;
      };
      if (chartRadarInventory) {
        chartRadarInventory.data.datasets[0].data = data.map(function (o) {
          return o.planing;
        });
        chartRadarInventory.data.datasets[1].data = data.map(function (o) {
          return o.real;
        });
        chartRadarInventory.update();
      } else {
        chartRadarInventory = new Chart(ctx, {
          type: "radar",
          data: {
            labels: data.map(function (o) {
              return o.label;
            }),
            datasets: [
              {
                backgroundColor: color("#3CB9EA").alpha(0.2).rgbString(),
                borderColor: "#3CB9EA",
                pointBackgroundColor: "#3CB9EA",
                data: data.map(function (o) {
                  return o.planing;
                }),
                datalabels: {
                  color: "white",
                  formatter: formatter,
                },
              },
              {
                backgroundColor: color("#DCBC05").alpha(0.2).rgbString(),
                borderColor: "#DCBC05",
                pointBackgroundColor: "#DCBC05",
                data: data.map(function (o) {
                  return o.real;
                }),
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
                align: "center",
                font: {
                  weight: "bold",
                },
              },
            },
            animation: {
              duration: 6000,
            },
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
            scale: {
              pointLabels: {
                fontColor: "#ffffff",
              },
              ticks: {
                beginAtZero: true,
                display: false,
              },
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
