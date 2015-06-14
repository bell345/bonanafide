$(function () {
var incManifest = "assets/data/includes.json";
var ns = "assets/js/tblib/";
Require([ns+"base.js", ns+"util.js", ns+"loader.js", ns+"net.js", ns+"ui.js"], function () {
    loader.addTask(executeHTMLIncludes(incManifest), null, "HTMLIncludes");

    loader.start();
    $(document).on("pageload", function () {
        function updateScroll() {
            if (window.scrollY > 0) $("header").toggleClass("top", false);
            else $("header").toggleClass("top", true);
        }
        $(document).scroll(updateScroll);
        updateScroll();
    });
});
});
