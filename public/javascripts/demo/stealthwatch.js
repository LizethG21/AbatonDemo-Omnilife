var _tables = {};

function updatestealthwatch() {
    setInterval(chartstealthwatch, 3000);
}

function updatealarmas() {
    setInterval(alarmas, 3000);
}
function chartstealthwatch() {
    $.ajax({
        method: "POST",
        url: "/api/dash/stealthwatch/bar",
        cache: false,
        success: function (data) {
            ChartLib.hbar("Stealthwatchbar", data, {
                xvalues: "alert",
                yvalues: ["data"],
                color: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                ],
                yfmt: "s",
                xfmt: "p100",
                xrange: [0, 100],
            });
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}

function alarmas() {
    $.ajax({
        method: "POST",
        url: "/api/dash/stealthwatch/alarmas",
        cache: false,
        success: function (data) {
            ChartLib.hbar("chartalarmas", data, {
                xvalues: "alert",
                yvalues: ["data"],
                color: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                ],
                yfmt: "s",
                xfmt: "p100",
                xrange: [0, 100],
            });
        },
        error: function (a, b, c) {
            debugger;
        },
    });
}

function makeDash() {
    //TODO: implementarlo con todas la funciones
    $.ajax({
        method: "POST",
        url: "/api/dash/stealthwatch/events", //TODO: Hacer solo post sin direccion
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
              { data: "First_active" },
              { data: "Source"},
              { data: "Source_Host"},
              { data: "Target" },
              { data: "Host"},
              { data: "Concern"},
              { data: "Security"}
          ]
      });
  }
}
function loopDash() {
    setupDash();
    setInterval(makeDash, 10000);
    makeDash();
}
