var _tables = {};

function updatetopapps() {
    setInterval(topapps, 3000);
  }

  function updatecharttopapps() {
    setInterval(chartapps, 3000);
}
  

function topapps() {
    $.ajax({
        method: "POST",
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
            ChartLib.doughnut("topapps", data, {
                xvalues: "apps",
                yvalues: ["dataa"],
                yfmt: "n",
                legend: false,
                palette: "custom"
            });
            ChartLib.doughnut("topservers", data, {
                xvalues: "server",
                yvalues: ["datas"],
                yfmt: "n",
                legend: false,
                palette: "custom"
            });
        },
        error: function (a, b, c) {
            debugger;
        }
    });
};

function chartapps(){
    $.ajax({
        method: "POST",
        url:"/dash/main",
        cache: false,
        success: function (data) {
            ChartLib.palettes.custom = ["#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#C5AA0A",
            "#c45850",
            "#e8c3b9"];
            $("#data").html("");
            for (let i = 0; i < data.length; i++) {
                $("#data").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].apps+"&nbsp;</h5><h3>"+Math.round(data[i].dataa)+"%</h3>"+
                                "<br>");
            }
            $("#datas").html("");
            for (let i = 0; i < data.length; i++) {
                $("#datas").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].server+"&nbsp;</h5><h3>"+Math.round(data[i].datas)+"%</h3>"+
                                "<br>");
            }
            ChartLib.doughnut("chartapps", data, {
                xvalues: "apps",
                yvalues: ["dataa"],
                yfmt: "n",
                legend: false,
                palette: "custom"
            });
            ChartLib.bar("chartservers", data, {
                xvalues: "server",
                yvalues: ["datas"],
                yfmt: "p100",
                xrange: [0, 100],
                color: ChartLib.palettes.custom,
            });
        },
        error: function (a, b, c) {
            debugger;
        }
    });
};



function makeDash() {
    //TODO: implementarlo con todas la funciones
    $.ajax({
        method: "POST",
        url: "/api/dash/appdynamics/events", //TODO: Hacer solo post sin direccion
        cache: false,
        success: (data) => {
            makeTable("tableEvents", data);
        },
        error: (a, b, c) => {
            debugger;
        },
    });
}

function makeTable(id, data) {
    var table = _tables[id];
    if (table) {
        table.clear();
        table.rows.add(data);
        table.draw();
    }
}

function setupDash() {
  for (let id of ["tableEvents"]) {
      _tables[id] = $("#" + id).DataTable({
          dom: "t",
          columns: [
              { data: "Name" },
              { data: "Health"},
              { data: "ResponseTime"},
              { data: "CallsPerMin" },
              { data: "ErrorsPerMin"},
              { data: "ErrorPercent"},
              { data: "SlowPercent"},
              { data: "VerySlowPercent"}
          ]
      });
  }
}
function loopDash() {
    setupDash();
    setInterval(makeDash, 10000);
    makeDash();
}