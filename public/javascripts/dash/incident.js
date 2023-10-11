function updateCharts() {
  setInterval(chartIncidentCategory, 3000);
}

var chartIncidentCategory1;
var chartIncidentSolver1;
var chartIncidentStatus1;
function chartIncidentCategory() {
  $.ajax({
    method: "POST",
    url: "/api/dash/incident/circles",
    cache: false,
    success: function (data) {
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
            ctx.arc(x, y, 50, 0, 2 * Math.PI);
            ctx.fillStyle = "#272C31";
            ctx.fill();
            ctx.lineWidth = 1;
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
            var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

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
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
          }
        },
      });
      colorsCat = [
        "#FF841F",
        "#E6377A",
        "#576FFA",
        "#420BE6",
        "#FF0115",
        "#41E600",
        "#75CCFA",
      ];

      var ctx = document.getElementById("chartIncidentCategory");
      var context = ctx.getContext("2d");
      if (chartIncidentCategory1) {
        chartIncidentCategory1.data.datasets[0].data = data.cat.map(function (
          o
        ) {
          return o.count;
        });
        chartIncidentCategory1.update();
        var htmlCat = "";
        for (let o in data.cat) {
          htmlCat +=
            "<div style='background-color:" +
            colorsCat[o] +
            "; margin: 0 5%;' class='bullet'></div>" +
            "<h6>" +
            data.cat[o].label +
            "</h6><h6 class='countInteger'>" +
            data.cat[o].count +
            "</h6><br>";
        }

        $("#datachartIncidentCategory").html(htmlCat);
      } else {
        chartIncidentCategory1 = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: data.cat.map(function (o) {
              return o.label;
            }),
            datasets: [
              {
                data: data.cat.map(function (o) {
                  return o.count;
                }),
                borderColor: "#272C31",
                backgroundColor: colorsCat,
                weight: 1,
                borderWidth: 5,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                // hide datalabels for all datasets
                display: false,
              },
            },
            animation: {
              duration: 3000,
            },
            elements: {
              center: {
                text: "Categoria",
                color: "#FFFFFF", // Default is #000000
                fontStyle: "Arial", // Default is Arial
                maxFontSize: 30, // Default is 25
                sidePadding: 20, // Defualt is 20 (as a percentage)
              },
            },
            cutoutPercentage: 60,
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
        var htmlCat = "";
        for (let o in data.cat) {
          htmlCat +=
            "<div style='background-color:" +
            colorsCat[o] +
            "; margin: 0 5%;' class='bullet'></div>" +
            "<h6>" +
            data.cat[o].label +
            "</h6><h6>" +
            data.cat[o].count +
            "</h6><br>";
        }

        $("#datachartIncidentCategory").html(htmlCat);
      }

      var ctx = document.getElementById("chartIncidentSolver");
      var context = ctx.getContext("2d");
      colorsInc = [
        "#FF841F",
        "#E6377A",
        "#576FFA",
        "#420BE6",
        "#FF0115",
        "#41E600",
        "#720A61",
        "#D1F9F8",
        "#F7E359",
        "#93FFA1",
      ];
      if (chartIncidentSolver1) {
        chartIncidentSolver1.data.datasets[0].data = data.res.map(function (o) {
          return o.count;
        });
        chartIncidentSolver1.update();
        var htmlInc = "";
        for (let i in data.res) {
          htmlInc +=
            "<div style='background-color:" +
            colorsInc[i] +
            "; margin: 0 5%;' class='bullet'></div>" +
            "<h6>" +
            data.res[i].label +
            "</h6><h6 class='countInteger'>" +
            data.res[i].count +
            "</h6><br>";
        }

        $("#datachartIncidentSolver").html(htmlInc);
      } else {
        chartIncidentSolver1 = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: data.res.map(function (o) {
              return o.label;
            }),
            datasets: [
              {
                data: data.res.map(function (o) {
                  return o.count;
                }),
                borderColor: "#272C31",
                backgroundColor: colorsInc,
                weight: 1,
                borderWidth: 5,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                // hide datalabels for all datasets
                display: false,
              },
            },
            animation: {
              duration: 3000,
            },
            elements: {
              center: {
                text: "Resolutores",
                color: "#FFFFFF", // Default is #000000
                fontStyle: "Arial", // Default is Arial
                maxFontSize: 30, // Default is 25
                sidePadding: 20, // Defualt is 20 (as a percentage)
              },
            },
            cutoutPercentage: 60,
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
        var htmlInc = "";
        for (let i in data.res) {
          htmlInc +=
            "<div style='background-color:" +
            colorsInc[i] +
            "; margin: 0 5%;' class='bullet'></div>" +
            "<h6>" +
            data.res[i].label +
            "</h6><h6 class='countInteger'>" +
            data.res[i].count +
            "</h6><br>";
        }
        $("#datachartIncidentSolver").html(htmlInc);
      }

      var ctx = document.getElementById("chartIncidentStatus");
      var context = ctx.getContext("2d");
      var colorsSta = ["#FF841F", "#E6377A", "#576FFA", "#420BE6"];

      if (chartIncidentStatus1) {
        chartIncidentStatus1.data.datasets[0].data = data.status.map(function (o) {
          return o.count;
        });
        chartIncidentStatus1.update();

        var htmlSta = "";
        for (let i in data.status) {
          htmlSta +=
            "<div style='background-color:" +
            colorsSta[i] +
            "; margin: 0 5%;' class='bullet'></div>" +
            "<h6>" +
            data.status[i].label +
            "</h6><h6 class='countInteger'>" +
            data.status[i].count +
            "</h6><br>";
        }
  
        $("#datachartIncidentStatus").html(htmlSta);
        
      } else {
        chartIncidentStatus1 = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: data.status.map(function (o) {
              return o.label;
            }),
            datasets: [
              {
                data: data.status.map(function (o) {
                  return o.count;
                }),
                borderColor: "#272C31",
                backgroundColor: colorsSta,
                weight: 1,
                borderWidth: 5,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                // hide datalabels for all datasets
                display: false,
              },
            },
            animation: {
              duration: 3000,
            },
            elements: {
              center: {
                text: "Estatus",
                color: "#FFFFFF", // Default is #000000
                fontStyle: "Arial", // Default is Arial
                maxFontSize: 30, // Default is 25
                sidePadding: 20, // Defualt is 20 (as a percentage)
              },
            },
            cutoutPercentage: 60,
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
  
        var htmlSta = "";
        for (let i in data.status) {
          htmlSta +=
            "<div style='background-color:" +
            colorsSta[i] +
            "; margin: 0 5%;' class='bullet'></div>" +
            "<h6>" +
            data.status[i].label +
            "</h6><h6 class='countInteger'>" +
            data.status[i].count +
            "</h6><br>";
        }
  
        $("#datachartIncidentStatus").html(htmlSta);
        
      }
    
    },
    error: function (a, b, c) {
      debugger;
    },
  });
}
