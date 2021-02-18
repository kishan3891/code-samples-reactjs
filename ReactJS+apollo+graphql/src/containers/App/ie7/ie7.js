/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function () {
    function addIcon(el, entity) {
        var html = el.innerHTML;
        el.innerHTML =
            "<span style=\"font-family: 'icomoon'\">" +
            entity +
            "</span>" +
            html;
    }

    var icons = {
            "icon-notification": "&#xe910;",
            "icon-positive": "&#xe90d;",
            "icon-negative": "&#xe90e;",
            "icon-Angle-Down": "&#xe900;",
            "icon-Angle-Left": "&#xe901;",
            "icon-Angle-Right": "&#xe902;",
            "icon-Angle-Up": "&#xe903;",
            "icon-Dashboard": "&#xe904;",
            "icon-Dashboard1x": "&#xe905;",
            "icon-Dashboard2x": "&#xe906;",
            "icon-Dashboard3x": "&#xe907;",
            "icon-Eye": "&#xe908;",
            "icon-Eye-Slash": "&#xe909;",
            "icon-Rectangle2x": "&#xe90a;",
            "icon-Schedule": "&#xe90b;",
            "icon-User": "&#xe90c;",
            "icon-school": "&#xe90f;",
            "0": 0,
        },
        els = document.getElementsByTagName("*"),
        i,
        c,
        el;
    for (i = 0; ; i += 1) {
        el = els[i];
        if (!el) {
            break;
        }
        c = el.className;
        c = c.match(/icon-[^\s'"]+/);
        if (c && icons[c[0]]) {
            addIcon(el, icons[c[0]]);
        }
    }
})();
