function updatewidgetLine(id) {
setInterval(function () {
    widget(id);
  }, 3000);
}

function update() {
    setInterval(function () {
        cpu();
        circle();
      }, 3000);
    }
function widget(id,color) {
  $.ajax({
      method: "POST",
      url:"/api/dash/vmware/line",
      cache: false,
      success: function (data) {

          ChartLib.line(id, data, {
              xvalues: "date",
              yvalues: id,
              color: color,
              yfmt: "n",
              display: false
          });
      },
      error: function (a, b, c) {
          debugger;
      }
  });
}

function cpu() {
    $.ajax({
        method: "POST",
        url:"/api/dash/vmware/esx",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"];
            ChartLib.line("chartcpu", data, {
              xvalues: "date",
              yvalues: ["cpu","totalcpu"],
              palette: "custom",
              yfmt: "p100",
              display: true
  
            });
            ChartLib.line("chartram", data, {
                xvalues: "date",
                yvalues: ["ram","totalram"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                yrange: "1",
                fill: ["#3e95cd"]

            });
            ChartLib.line("chartdisk", data, {
                xvalues: "date",
                yvalues: ["disco","totaldisco"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                yrange: "1"

            });
            ChartLib.line("chartcpuvm", data, {
                xvalues: "date",
                yvalues: ["cpuV","totalcpuV"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                yrange: "1",
                fill: ["#3e95cd50"]

            });
            ChartLib.line("chartramvm", data, {
                xvalues: "date",
                yvalues: ["ramV","totalramV"],
                palette: "custom",
                yfmt: "p100",
                display: true,
                yrange: "1"

            });
        },
        error: function (a, b, c) {
            debugger;
        }
    });
  }

  function circle() {
    $.ajax({
        method: "POST",
        url:"/api/dash/vmware/circle",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"];
            $("#chartdatastoreTypesdata").html("");
            for (let i = 0; i < data.length; i++) {
                $("#chartdatastoreTypesdata").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].type+"&nbsp;</h5><h3>"+Math.round(data[i].datatype)+"%</h3>"+
                                "<br>");
            }
            ChartLib.bar("chartdatastoreTypes", data, {
                xvalues: "type",
                yvalues: ["datatype"],
                yfmt: "p100",
                xrange: [0, 100],
                color: ["#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9"],
            });
            $("#chartdatastoreNamedata").html("");
            for (let i = 0; i < data.length; i++) {
                $("#chartdatastoreNamedata").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].used+"&nbsp;</h5><h3>"+Math.round(data[i].dataused)+"%</h3>"+
                                "<br>");
            }
            ChartLib.hbar("chartdatastoreName", data, {
                xvalues: "used",
                yvalues: ["dataused"],
                yfmt: "s",
                xfmt: "p100",
                xrange: [0, 100],
                color: ["#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9"],
            });
            $("#chartdatastoreNameNdata").html("");
            for (let i = 0; i < data.length; i++) {
                $("#chartdatastoreNameNdata").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].redes+"&nbsp;</h5><h3>"+Math.round(data[i].dataredes)+"%</h3>"+
                                "<br>");
            }
            ChartLib.doughnut("chartdatastoreNameN", data, {
                xvalues: "redes",
                yvalues: ["dataredes"],
                yfmt: "n",
                legend: false,
                palette: "custom"
            });
            $("#chartdatastoreOSdata").html("");
            for (let i = 0; i < data.length; i++) {
                $("#chartdatastoreOSdata").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].so+"&nbsp;</h5><h3>"+Math.round(data[i].dataso)+"%</h3>"+
                                "<br>");
            }
            ChartLib.pie("chartdatastoreOS", data, {
                xvalues: "so",
                yvalues: ["dataso"],
                yfmt: "n",
                legend: false,
                palette: "custom"
            });
        },
        error: function (a, b, c) {
            debugger;
        }
    });
  }