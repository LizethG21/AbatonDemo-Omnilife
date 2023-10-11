function updateChartIncidentSeverity() {
    setInterval(chartIncidentSeverity, 3000);
  }
  
  function chartIncidentSeverity() {
    $.ajax({
      method: "POST",
      url: "/api/dash/ciscoprime/accesspoints",
      cache: false,
      success: function (data) {
        ChartLib.palettes.custom = ["#3CBA9F",
        "#3E95CD",
        "#C45850"];
        ChartLib.pie("chartIncidentSeverity", data, {
            xvalues: "label",
            yvalues: ["count"],
            yfmt: "n",
            type:"pie",
            legend: false,
            palette: "custom"
         });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }
  
  function updatechartaccesspoint() {
    setInterval(chartaccesspoint, 3000);
  }
  
  function chartaccesspoint() {
    $.ajax({
      method: "POST",
      url: "/api/dash/ciscoprime/accesspoints",
      cache: false,
      success: function (data) {
        ChartLib.palettes.custom = ["#3CBA9F",
        "#3E95CD",
        "#C45850"];
        $("#data").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].label+"&nbsp;</h5><h3>"+Math.round(data[i].count)+"</h3>"+
                                "<br>");
            }
        ChartLib.doughnut("chartaccesspoint", data, {
            xvalues: "label",
            yvalues: ["count"],
            yfmt: "n",
            type:"pie",
            legend: false,
            palette: "custom"
         });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }