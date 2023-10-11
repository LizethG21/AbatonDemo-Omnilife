function updateChartAtnTimeTimeline() {
    setInterval(chartAtnTimeTimeline, 3000);
}

var chartLineResolve;
function chartAtnTimeTimeline() {
    $.ajax({
        method: "POST",
        url: "/api/dash/atntime/timeline",
        cache: false,
        success: function (data) {
            var ctx = document.getElementById("chartLineResolve");
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
            $("#jitter").html("");
            $("#jitter").append(((data[23].jitter)/10) + " ms");
            $("#latency").html("");
            $("#latency").append(((data[23].latency)/10) + " ms");
            $("#loss").html("");
            $("#loss").append(((data[23].loss)/10) + " %");
            ChartLib.line("chartLineResolve", data, {
                xvalues: "date",
                yvalues: ["jitter"],
                yfmt: "p100",
                palette: "custom",
                display:true
            });
            ChartLib.line("chartLineResolve2", data, {
                xvalues: "date",
                yvalues: ["latency"],
                yfmt: "p100",
                palette: "custom2",
                display:true,
                fill: [gradient2]
            });
            ChartLib.line("chartloss", data, {
                xvalues: "date",
                yvalues: ["loss"],
                yfmt: "p100",
                palette: "custom3",
                display:true
            });

        },
        error: function (a, b, c) {
            debugger;
        }
    });
}
