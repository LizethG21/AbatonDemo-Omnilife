jQuery(function () {
  $(".countInteger").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now).toLocaleString("en-US"));
          },
        }
      );
  });
  $(".countDecimal").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.round(now * 10) / 10);
          },
        }
      );
  });
  $(".countIntegerP").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text().slice(0, -1),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now).toLocaleString("en-US") + "%");
          },
        }
      );
  });

  $(".countDecimalP").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text().slice(0, -1),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.round(now * 10) / 10 + "%");
          },
        }
      );
  });

  $(".countDecimalPDelta").each(function () {
    var delta = $(this).text().slice(0, 1);
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text().slice(1, -1),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(
              "" + delta + (Math.round(now * 10) / 10).toFixed(2) + "%"
            );
          },
        }
      );
  });

  $(".countIntegerMin").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text().slice(0, -3),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now).toLocaleString("en-US") + " min");
          },
        }
      );
  });
});

function mainData() {
  $.ajax({
    method: "POST",
    url: "/dash/main",
    cache: false,
    success: function (data) {
        //   console.log(data); 
            for (let o of Object.keys(data)){
                // console.log(data);
                if (o === "incidentsDay") {
                    fillDataMetricPercent("incidentsDay0",data.incidentsDay);
                }
                if (o === "sla") {
                    fillDataMetricPercent("sla0",data.sla);
                }
                if (o === "incidents") {
                    fillDataMetricPercent("closed0",[data.incidents.closed[0]]);
                    fillDataMetricPercent("closed1",[data.incidents.closed[1]]);
                    fillDataMetricPercent("closed2",[data.incidents.closed[2]]);
                }
                if (o === "incidentsSite") {
                    fillDataMetric("incidentsSite0",data.incidentsSite)
                }
                if (o === "calls") {
                    fillDataMetric("calls0",[data.calls[0]]);
                    fillDataMetric("calls1",[data.calls[1]]);
                    fillDataMetric("calls2",[data.calls[2]]);
                    fillDataMetric("calls3",[data.calls[3]]);
                }
                if (o === "incidentsDocumented") {
                    fillDataMetric("incidentsDocumented0",[data.incidentsDocumented[0]]);
                    fillDataMetric("incidentsDocumented1",[data.incidentsDocumented[1]]);
                }
                if (o === "incidentsReassigned") {
                    fillDataMetric("incidentsReassigned0",[data.incidentsReassigned[0]]);
                    fillDataMetric("incidentsReassigned1",[data.incidentsReassigned[1]]);
                }
                if (o === "agents") {
                    fillDataMetric("agents0",[data.agents[0]]);
                    fillDataMetric("agents1",[data.agents[1]]);
                    fillDataMetric("agents2",[data.agents[1]]);
                }
            }
  
    },
    error: function (a, b, c) {
      debugger;
    },
  });
};

function update() {
  setInterval(mainData, 2000);
};

function fillDataMetricPercent(canal,data){
    var delta = "";
      var delta2 = "";
      for (let o of data) {
        $("#"+canal+" td.metric").text((o.metric * 100).toFixed(1) + "%");
        $("#"+canal+" td.bad").text(Math.round(o.bad));
        $("#"+canal+" td.good").text(Math.round(o.good));
        if (o.gooddelta > 0) {
          delta = "▲";
        } else {
          delta = "▼";
        }
        if (o.baddelta > 0) {
          delta2 = "▲";
        } else {
          delta2 = "▼";
        }
        $("#"+canal+" td.neutral:first-child").text(
          delta + Math.abs(o.gooddelta * 100).toFixed(2) + "%"
        );
        $("#"+canal+" td.neutral:last-child").text(
          delta2 + Math.abs(o.baddelta * 100).toFixed(2) + "%"
        );
      }
};

function fillDataMetric(canal,data){
    var delta = "";
      for (let o of data) {
        if(o.min){
            $("#"+canal+" td.countIntegerMin").text(o.metric + " min");
        }
        else{
            $("#"+canal+" td.countInteger").text((Math.round(o.metric)));
        }
        if (o.delta > 0) {
          delta = "▲";
        } else {
          delta = "▼";
        }
        $("#"+canal+" td.neutral.countDecimalPDelta").text(
          delta + Math.abs(o.delta * 100).toFixed(2) + "%"
        );
      }
};


function makeDash() {
  $.ajax({
    method: "POST",
    url: "/dash/model",
    cache: false,
      success: data => {
        ChartLib.palettes.custom = ["#E71E24",
        "#00CC3F",
        "#AAAAAA"];
          ChartLib.line("chartTransTotalwebex", data.model, {
              xvalues: "date",
              yvalues: ["count_min", "count_max", "count_avg", "count"],
              palette: "model",
              fill: ["#292929", "#353B3E", null, null],
              width: [null, null, 0.5, 2],
              yfmt: "h6",
              xfmt: "dHM"
          });
          ChartLib.line("chartTransTotalteams", data.model, {
              xvalues: "date",
              yvalues: ["count_min", "count_max", "count_avg", "count"],
              palette: "model",
              fill: ["#292929", "#353B3E", null, null],
              width: [null, null, 0.5, 2],
              yfmt: "h6",
              xfmt: "dHM"
          });
          ChartLib.line("chartTransTotalgoogle", data.model, {
              xvalues: "date",
              yvalues: ["count_min", "count_max", "count_avg", "count"],
              palette: "model",
              fill: ["#292929", "#353B3E", null, null],
              width: [null, null, 0.5, 2],
              yfmt: "h6",
              xfmt: "dHM"
          });
          ChartLib.line("chartTransTotalvpnline", data.model, {
              xvalues: "date",
              yvalues: ["count_min", "count_max", "count_avg", "count"],
              palette: "model",
              fill: ["#292929", "#353B3E", null, null],
              width: [null, null, 0.5, 2],
              yfmt: "h6",
              xfmt: "dHM"
          });
          ChartLib.line("vpn", data.model, {
            xvalues: "date",
            yvalues: ["count"],
            palette: "custom",
            fill: ["#292929", "#353B3E", null, null],
            width: [null, null, 0.5, 2],
            yfmt: "h6",
            xfmt: "dHM"
        });
          ChartLib.pie("trunk", data.troncalesPie, {
            xvalues: "label",
            yvalues: ["count"],
            yfmt: "n",
            palette: "custom"
        });
        ChartLib.hbar("voiceBar", data.voiceMail, {
          xvalues: "alert",
          yvalues: ["data"],
          color: [
              "#00CC3F",
              "#00CC3F",
              "#00CC3F",
          ],
          yfmt: "s",
          xfmt: "p100",
          xrange: [0, 100],
      });

          for(let i of data.troncales)
          {
            $("#"+i.id).removeClass().addClass(i.status);
          }
      },
      error: (a, b, c) => {
          debugger;
      }
  });
}

function loopDash() {
  setInterval(makeDash, 10000);
  makeDash();
}
