function service(){
        "use strict";
    
        var duration = 1500,
            transition = 200,
            percent = 98,
            width = 160,
            height = 160,
            arcWidth = 180,
            arcHeight = 180;
    
        var dataset = {
                lower: calcPercent(0),
                upper: calcPercent(Math.abs(percent)),
            },
            radius = Math.min(width, height) / 2,
            arcRadius = Math.min(arcWidth, arcHeight) / 2,
            pie = d3.layout.pie().sort(null),
            format = d3.format(".0%");
    
        var arc = d3.svg
            .arc()
            .innerRadius(radius * 0.85)
            .outerRadius(radius);
    
        var roundArc = d3.svg
            .arc()
            .innerRadius(arcRadius * 0.98)
            .outerRadius(arcRadius);
    
        var svg = d3
            .select(".serviceLevel")
            .append("svg")
            .attr("width", arcWidth)
            .attr("height", arcHeight)
    
            .append("g")
            .attr(
                "transform",
                "translate(" + arcWidth / 2 + "," + arcHeight / 2 + ")"
            );
    
        /*Gradiente*/
        var colors = ["#2979A9", "#97DCD4"];
    
        var grad = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "grad")
            .attr("x1", "100%")
            .attr("x2", "50%")
            .attr("y1", "0%")
            .attr("y2", "100%");
    
        grad.selectAll("stop")
            .data(colors)
            .enter()
            .append("stop")
            .style("stop-color", function (d) {
                return d;
            })
            .attr("offset", function (d, i) {
                return 100 * (i / (colors.length - 1)) + "%";
            });
    
        /*Fin gradiente*/
    
        var aroundPath = d3
            .select("svg")
            .append("g")
            .attr(
                "transform",
                "translate(" + arcWidth / 2 + "," + arcHeight / 2 + ")"
            )
            .selectAll("path")
            .data(pie(dataset.lower))
            .enter()
            .append("path")
            .attr("fill", "#ffffff")
            .attr("d", roundArc)
            .each(function (d) {
                this._current = d;
            });
    
        var path = svg
            .selectAll("path")
            .data(pie(dataset.lower))
            .enter()
            .append("path")
            .attr("class", function (d, i) {
                return "color" + i;
            })
            .attr("d", arc)
            .each(function (d) {
                this._current = d;
            });
    
        var text = svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".4em")
            .attr("dx", ".3em")
            .attr("class", "inside")
            .attr("font-size", "34px")
            .attr("fill", "#202124");
    
        svg.append("text")
            .attr("dy", ".1em")
            .attr("dx", "-1.5em")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("class", "icon")
            .attr("fill", "#2979A9")
            .attr("font-family", "FontAwesome")
            .attr("font-size", "28px")
            .attr("font-color", "#2979A9")
            .text(function (d) {
                if (Math.sign(percent) > 0) {
                    return "\uf0D8";
                } else {
                    return "\uf0D7";
                }
            });
    
        var progress = 0;
    
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
    
            path = path.data(pie(dataset.upper));
            path.transition()
                .duration(duration)
                .attrTween("d", function (a) {
                    var i = d3.interpolate(this._current, a);
                    var i2 = d3.interpolate(progress, Math.abs(percent));
                    this._current = i(0);
                    return function (t) {
                        text.text(format(i2(t) / 100));
                        return arc(i(t));
                    };
                });
            d3.selectAll(".color0").style("fill", "url(#grad)");
        }, 200);
    
        function calcPercent(percent) {
            return [percent, 100 - percent];
        }
    

}