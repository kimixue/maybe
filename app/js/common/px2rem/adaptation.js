!function () {
    function a() {
        if (parseInt(document.documentElement.clientWidth) > 720) {
            document.documentElement.style.fontSize = 720 / 750 * 10 / 8 * 1000 + "%";
        } else {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 * 10 / 8 * 1000 + "%";
        }
    }
    var b = null;
    window.addEventListener("resize", function () {
        clearTimeout(b);
        b = setTimeout(a, 300);
    }, !1);
    a();
}(window);