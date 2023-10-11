function update() {
    $("#hour").html(moment().locale("es").format("hh:mm"));
    $("#hour-seconds").html(moment().locale("es").format("ss"));
    $("#hour-format").html(moment().locale("es").format("A"));
    $("#date").html(moment().locale("es").format("LL"));
}
update();
setInterval(update, 1000);
