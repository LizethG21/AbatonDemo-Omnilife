function updatew2Line(id) {
  setInterval(function () {
    w2(id);
  }, 3000);
}

var w2Line = [];

function w2(id) {
  var ctx = document.getElementById(id);

  if (w2Line[id]) {
    w2Line[id].data.datasets[0].data = new Array(10).fill().map(function () {
      return Math.random();
    });
    w2Line[id].update();
  } else {
    w2Line[id] = new Chart(ctx, {
      type: "line",
      data: {
        labels: new Array(10).fill(""),
        datasets: [
          {
            data: new Array(10).fill().map(function () {
              return Math.random();
            }),
            fill: false,
            borderColor: "#8671E2",
            borderWidth: 1.5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: false,
        legend: false,
        scales: {
          yAxes: [
            {
              display: false,
            },
          ],
          xAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  }
}
