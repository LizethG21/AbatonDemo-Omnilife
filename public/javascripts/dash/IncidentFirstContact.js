function updateIncidentFirstContact() {
  setInterval(IncidentFirstContact, 2000);
}

var chartIncidentFirstContact;

function IncidentFirstContact() {
  var ctx = document
    .getElementById("chartIncidentFirstContact")
    .getContext("2d");
  var color = Chart.helpers.color;
  $(".lightIn").css(
    "background-color",
    color("#DCBC05").alpha(0.3).rgbString()
  );
  $(".lightOut").css(
    "background-color",
    color("#3CB9EA").alpha(0.3).rgbString()
  );
  if (chartIncidentFirstContact) {
    chartIncidentFirstContact.data.datasets[0].data = [
      Math.floor(Math.random() * (1200 - 500)) + 500,
      Math.floor(Math.random() * (3500 - 2800)) + 2800
    ];
    
    chartIncidentFirstContact.options.elements.center.text =
    "" + (Math.floor(Math.random() * (40 - 15)) + 15) + "%";

    chartIncidentFirstContact.update();

  } else {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || "Arial";
          var txt = centerConfig.text;
          var color = centerConfig.color || "#000";
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
          var fontSizeToUse = 16;

          //Set font settings to draw it correctly.
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = chart.chartArea.top + chart.chartArea.bottom - 80;
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      },
    });
    chartIncidentFirstContact = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Resueltos en primer contacto", "Total de incidentes"],
        datasets: [
          {
            data: [Math.floor(Math.random() * (1200 - 500)) + 500,
              Math.floor(Math.random() * (3500 - 2800)) + 2800],
            backgroundColor: [
              color("#DCBC05").alpha(0.3).rgbString(),
              color("#3CB9EA").alpha(0.3).rgbString(),
            ],
            hoverBackgroundColor: ["#DCBC05", "#3CB9EA"],
            borderColor: ["#DCBC05", "#3CB9EA"],
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
        responsive: false,
        cutoutPercentage: 80,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        animation: {
          duration: 6000,
        },
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        elements: {
          center: {
            text: "10%",
            color: "#FFFFFF", // Default is #000000
            fontStyle: "Arial", // Default is Arial
            maxFontSize: 30, // Default is 25
            sidePadding: 20, // Defualt is 20 (as a percentage)
          },
        },
      },
    });
  }
}
