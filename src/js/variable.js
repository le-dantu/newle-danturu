/**
 * Created by BreakPoint on 19.05.17.
 */

var contentGlobal = '/content.json';
//var clientsGlobal = '/clients.json';
//var workTypeGlobal = '/worktype.json';
//var contentTypeGlobal = '/contenttype.json';
var horizontal = [];
var vertical = [];

var lenCurrent = 0;
var currentImgH= 0;
var currentImgV= 0;
var currentType = 0;
var currentClient = 0;

function isTouchDevice() {
    return 'ontouchstart'in document.documentElement;
}

var isTouch = isTouchDevice();