function updatevpn() {
  setInterval(vpn, 3000);
}
function updatevpn2() {
  setInterval(licencias, 3000);
  setInterval(vpnbar, 3000);
}

function vpn() {
  $.ajax({
    method: "POST",
    url: "/api/dash/vpn/radar",
    cache: false,
    success: function (data) {
      ChartLib.palettes.custom = ["#3CBA9F", "#3E95CD", "#C45850"];
      ChartLib.radar("chartvpn", data, {
        xvalues: "type",
        yvalues: ["planeed", "actual"],
        yfmt: "n",
        palette: "custom",
      });
    },
    error: function (a, b, c) {
      debugger;
    },
  });
}

function licencias() {
  $.ajax({
    method: "POST",
    url: "/api/dash/vpn/licencias",
    cache: false,
    success: function (data) {
      ChartLib.palettes.custom = ["#3CBA9F", "#3E95CD", "#C45850"];
      $("#data").html("");
      for (let i = 0; i < data.length; i++) {
        $("#data").append(
          "<div class='bullet' style='background-color:" +
            ChartLib.palettes.custom[i] +
            ";'>" +
            "</div>" +
            "<h5>" +
            data[i].type +
            "&nbsp;&nbsp;</h5><h3>" +
            Math.round(data[i].actual) +
            "</h3>" +
            "<br>"
        );
      }
      ChartLib.bar("chartlicencias", data, {
        xvalues: "type",
        yvalues: ["actual"],
        yfmt: "p100",
        yrange: [0, 100],
        color: ["#3CBA9F", "#3E95CD", "#C45850"],
      });
    },
    error: function (a, b, c) {
      debugger;
    },
  });
}

function vpnbar() {
  $.ajax({
    method: "POST",
    url: "/api/dash/vpn/radar",
    cache: false,
    success: function (data) {
      ChartLib.palettes.custom = [
        "#3e95cd",
        "#8e5ea2",
        "#7896D2",
        "#C5AA0A",
        "#c45850",
        "#e8c3b9",
        "#3cba9f",
      ];
      $("#datas").html("");
      for (let i = 0; i < data.length; i++) {
        $("#datas").append(
          "<div class='bullet' style='background-color:" +
            ChartLib.palettes.custom[i] +
            ";'>" +
            "</div>" +
            "<h5>" +
            data[i].type +
            "&nbsp;&nbsp;</h5><h3>" +
            Math.round(data[i].actual) +
            "</h3>" +
            "<br>"
        );
      }
      ChartLib.pie("chartvpn", data, {
        xvalues: "type",
        yvalues: ["actual"],
        yfmt: "n",
        legend: false,
        palette: "custom",
      });
    },
    error: function (a, b, c) {
      debugger;
    },
  });
}
