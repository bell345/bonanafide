// Quick and dirty fix for the <base> href attribute modifying hash links to point to the root directory
// instead of a specified portion of the page.
function fixHashLinks() {
    var links = $("a[href^='#']"); // all links that start with a "#" symbol (relative anchor links)
    links.attr("href", function (i, curr) { return location.pathname + curr; }); // put the current path in front of the URL to make it absolute
}

$(function () {
    var ns = "assets/js/tblib/";
    Require([ns+"base.js", ns+"util.js", ns+"loader.js", ns+"net.js", ns+"ui.js"], function () {
        loader.addTask(executeHTMLIncludes("assets/data/app-includes.json"));
        loader.start();

        $(document).on("pageload", function () {
            fixHashLinks();
            $(".nav-open").click(function () {
                $("header").toggleClass("open");
            });
            $(".form-submit").click(function (event) {
                var form = this;
                while (form.nodeName.toLowerCase() != "form" && form != document.body) { form = form.parentNode; }
                var url = form.action + "?";

                var inputs = $(form).find("input");
                for (var i=0;i<inputs.length;i++) {
                    var curr = inputs[i];
                    if (!isNull(curr.name) && !isNull(curr.value)) {
                        if (curr.type == "text")
                            url += encodeURIComponent(curr.name) + "=" + encodeURIComponent(curr.value) + "&";
                    }
                }
                if (url.endsWith("&")) url = url.substring(0, url.length-1);
                window.location.replace(url);

                event.preventDefault();
                return false;
            });
            if (!isNull(localStorage.getItem("logged-in")) && localStorage.getItem("logged-in") != false) {
                var user = localStorage.getItem("logged-in");
                $(".nav-login").hide();
                $(".nav-register").hide();
                $(".nav-logout").show();
                $(".nav-user").show();
                //$(".nav-user").css("background-image", "url('assets/img/pics/"+user+"_80x80.png')");
                $(".nav-user a").attr("href", "profiles/"+user);
                $(".nav-user a").text(user);
            }
            /*$(document).scroll(function (e) {
                var headers = $(".section-header");
                var currFixed = headers.toArray().indexOf($(".section-header.fixed")[0]);
                for (var i=0,ind=-1;i<headers.length;i++) {
                    var curr = headers[i];
                    if ($(curr).offset().top < window.scrollY) ind = i;
                }
                if (ind != -1 && currFixed != ind) {
                    $(".section-header.fixed").toggleClass("fixed", false);
                    $(headers[ind]).toggleClass("fixed", true);
                }
            });*/
        });
    });
});
