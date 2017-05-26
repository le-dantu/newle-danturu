/**
 * Created by BreakPoint on 19.05.17.
 */

var contentGlobal = '/content.json';
//var clientsGlobal = '/clients.json';
//var workTypeGlobal = '/worktype.json';
//var contentTypeGlobal = '/contenttype.json';
var horizontal = [];
var vertical = [];
var pageGlobal = 0;
var lenCurrent = 0;
var currentImgH= 0;
var currentImgV= 0;
var currentType = 0;
var currentClient = 0;
var counterClient = 0;
var counterType = 0;
var locationUrl = false;
var locPage = false;
var locCompany = false;
var locType = false;
var locKeyword = false;

function isTouchDevice() {
    return 'ontouchstart'in document.documentElement;
}

var isTouch = isTouchDevice();