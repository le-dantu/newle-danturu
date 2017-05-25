/**
 * Created by BreakPoint on 18.05.17.
 */
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
var locationurl = window.location.pathname.split("/");
locationurl = cleanArray(locationurl);
if (locationurl.length == 1) {
    locationurl[1] = locationurl[0];
    locationurl[2] = locationurl[0];
}
$(document).ready(function(){
    $('button.arrow').each(function(){
        if ( $(this).parent().hasClass('navLR')) {
            if ($(this).hasClass('left')) {
                $(this).attr('onclick', "clickArrow('left')");
            } else {
                $(this).attr('onclick', "clickArrow('right')");
            }
        } else if ( $(this).parent().hasClass('navTB')) {
            if ($(this).hasClass('left')) {
                $(this).attr('onclick', "clickArrow('top')");
            } else {
                $(this).attr('onclick', "clickArrow('bottom')");
            }
        }
    });

    initScrollHandler();
    sendRecive(contentGlobal); //, workTypeGlobal, clientsGlobal, contentTypeGlobal

});