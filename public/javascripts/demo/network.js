function makeDash() {
    $.ajax({
      method: "POST",
      url: "/dash/network",
      cache: false,
        success: data => {
            for (let o of data.stats) {
                o.bytesIn = -o.bytesIn;
            }
            ChartLib.line("dashic_traf_line", data.stats, {
                xvalues: "date",
                yvalues: ["bytesIn", "bytesOut"],
                fill: ["#FF7E00", "#80ff80"],
                color: "transparent",
                yfmt: "ah6"
            });

        },
        error: (a, b, c) => {
            debugger;
        }
    });
  }

  function devices() {
    $.ajax({
      method: "POST",
      url: "/dash/networkDevices",
      cache: false,
        success: data => {
            $("#chartdatastoreNameNdata").html("");
            for (let i = 0; i < data.length; i++) {
                $("#chartdatastoreNameNdata").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h3>"+data[i].redes+"&nbsp;</h3><h4>"+parseFloat(data[i].dataredes).toFixed(2)+" MBps</h4>"+
                                "<br>");
            }
            ChartLib.doughnut("chartdatastoreNameN", data, {
                xvalues: "redes",
                yvalues: ["dataredes"],
                yfmt: "n",
                legend: false,
                palette: "custom"
            });

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
  