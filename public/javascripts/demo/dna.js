function updatechartdna() {
    setInterval(chartdna, 3000);
  }
  
  function chartdna() {
    $.ajax({
      method: "POST",
      url: "/api/dash/dna/health",
      cache: false,
      success: function (data) {
        ChartLib.palettes.custom = ["#3cba9f",
        "#e8c3b9",
        "#c45850"];
        ChartLib.doughnut("chartdna", data, {
            xvalues: "label",
            yvalues: ["count"],
            yfmt: "n",
            legend: false,
            palette: "custom"
         });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }

  function updatecharthealth() {
    setInterval(charthealth, 2000);
    setInterval(chartdevices, 3000);
    setInterval(chartlicenses, 3000);
    setInterval(chartservers, 3000);
  }
  
  function charthealth() {
    $.ajax({
      method: "POST",
      url: "/api/dash/dna/line",
      cache: false,
      success: function (data) {

        var ctx = document.getElementById("charthealth");
        var context = ctx.getContext("2d");

        var gradient1 = context.createLinearGradient(0, 0, 0, 450);
        gradient1.addColorStop(0, "rgba(255, 187, 0, .4)");
        gradient1.addColorStop(0.5, "rgba(238, 255, 50, .9");

        var gradient2 = context.createLinearGradient(0, 0, 0, 450);
        gradient2.addColorStop(0, "rgba(5, 171, 224, .4)");
        gradient2.addColorStop(0.5, "rgba(135, 224, 253, .9)");

        var gradient3 = context.createLinearGradient(0, 0, 0, 450);
        gradient3.addColorStop(0, "rgb(41,204,95 ,0.8)");
        gradient3.addColorStop(0.9, "rgba(196, 88, 80, .5)");

        ChartLib.palettes.custom =[gradient1,gradient2,gradient3];
        ChartLib.palettes.custom2 =[gradient2,gradient3,gradient1];
        ChartLib.palettes.custom3 =[gradient3,gradient2,gradient1];
        $("#health").html("");
        $("#health").append(((data[23].health)) + " %");
        ChartLib.line("charthealth", data, {
          xvalues: "date",
          yvalues: ["health"],
          yfmt: "p100",
          palette: "custom2",
          display:true,
          fill: [gradient2],
          yrange: [0, 100]
      });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }

  function chartdevices() {
    $.ajax({
      method: "POST",
      url: "/api/dash/dna/devices",
      cache: false,
      success: function (data) {
        ChartLib.palettes.custom = ["#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#C5AA0A",
            "#c45850",
            "#e8c3b9"];
            $("#datadevices").html("");
            for (let i = 0; i < data.length; i++) {
                $("#datadevices").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].label+"&nbsp;</h5><h3>"+Math.round(data[i].count)+"</h3>"+
                                "<br>");
            }
        ChartLib.hbar("chartdevices", data, {
          xvalues: "label",
          yvalues: ["count"],
          yfmt: "s",
          xrange: [0, 100],
          color: ChartLib.palettes.custom,
      });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }

  function chartservers() {
    $.ajax({
      method: "POST",
      url: "/api/dash/dna/sites",
      cache: false,
      success: function (data) {
        ChartLib.palettes.custom = ["#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#C5AA0A",
            "#c45850",
            "#e8c3b9"];
            $("#dataservers").html("");
            for (let i = 0; i < data.length; i++) {
                $("#dataservers").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].label+"&nbsp;</h5><h3>"+Math.round(data[i].count)+"</h3>"+
                                "<br>");
            }
        ChartLib.bar("chartservers", data, {
          xvalues: "label",
          yvalues: ["count"],
          yfmt: "n",
          yrange: [0, 100],
          color: ChartLib.palettes.custom,
      });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }

  function chartlicenses() {
    $.ajax({
      method: "POST",
      url: "/api/dash/dna/licenses",
      cache: false,
      success: function (data) {
        ChartLib.palettes.custom = ["#e8c3b9",
            "#c45850",
            "#3cba9f",
            "#C5AA0A"];
            $("#datalicenses").html("");
            for (let i = 0; i < data.length; i++) {
                $("#datalicenses").append("<div class='bullet' style='background-color:"+ChartLib.palettes.custom[i]+";'>"+  
                                    "</div>"+
                                    "<h5>"+data[i].label+"&nbsp;</h5><h3>"+Math.round(data[i].count)+"</h3>"+
                                "<br>");
            }
        ChartLib.pie("chartlicenses", data, {
          xvalues: "label",
            yvalues: ["count"],
            yfmt: "n",
            legend: false,
            palette: "custom"
      });
      },
      error: function (a, b, c) {
        debugger;
      },
    });
  }