/**
 * Created by BreakPoint on 19.05.17.
 */

var gateway = '../modules/content.json';
var links = [];
var lenCurrent = 0;
var currentImg = 0;

function isTouchDevice() {
    return 'ontouchstart'in document.documentElement;
}

var isTouch = isTouchDevice();