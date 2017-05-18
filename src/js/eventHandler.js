/**
 * Created by BreakPoint on 18.05.17.
 */

function clickArrow(direction) {
    switch(direction) {
        case 'left':
            //alert('click left');
            $('.image.first').toggleClass('hide');
            break;

        case 'top':
            //alert('click top');
            $('.image.first').toggleClass('hide');
            break;

        case 'right':
            //alert('click right');
            $('.image.first').toggleClass('hide');
            break;

        case 'bottom':
            //alert('click bottom');
            $('.image.first').toggleClass('hide');
            break;
    }
}

function onWheel(e) {
    e = e || window.event;
    // wheelDelta не дает возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 100) {
        clickArrow(bottom);
    }
    else if (delta < 100) {
        clickArrow(top);
    }

    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

function initScrollHandler() {
    if (document.body.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            document.body.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            document.body.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            document.body.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        document.body.attachEvent("onmousewheel", onWheel);
    }

}
