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

function getSrcPath(innerElement) {
    var match = /(url.\S+.png)/.exec(innerElement);
    match = match[0];
    console.log(match);
    return match.substr(4);
}

locationUrl = window.location.pathname.toLowerCase().split("/");
locationUrl = cleanArray(locationUrl);

if (locationUrl.length == 1) {
    locPage = locationUrl[0];
    locCompany = false;
    locType = locationUrl[0] != 'portfolio' ? locationUrl[0] : false;
    locKeyword = false;
} else if (locationUrl.length == 2) {
    locPage = locationUrl[0];
    locCompany = locationUrl[0] != 'portfolio' ? locationUrl[1] : locationUrl[1];
    locType = locationUrl[0] != 'portfolio' ? locationUrl[0] : false;
    locKeyword = false;
} else if (locationUrl.length == 3) {
    locPage = locationUrl[0];
    locCompany = locationUrl[0] != 'portfolio' ? locationUrl[1] : locationUrl[1];
    locType = locationUrl[0] != 'portfolio' ? locationUrl[0] : locationUrl[2];
    locKeyword = locationUrl[0] != 'portfolio' ? locationUrl[2] : false;
} else if (locationUrl.length == 4) {
    locPage = locationUrl[0];
    locCompany = locationUrl[1];
    locType = locationUrl[2];
    locKeyword = locationUrl[3];
} else {
    locPage = false;
    locCompany = false;
    locType = false;
    locKeyword = false;
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

    $('.burger').on('click', function() {
        toggleMenu();
    });

    initScrollHandler();
    var dataInterval = setInterval(function() {
        if (getDataFlag) {
            clearInterval(dataInterval);
            sendRecive(contentGlobal); //, workTypeGlobal, clientsGlobal, contentTypeGlobal
        }
    }, 10);
});

window.onload = function() {
    window.setTimeout(
        function()
        {
            window.addEventListener(
                "popstate",
                function(e) {
                    backState();
                    e.preventDefault();
                },
                false
            );
        },
    1);
};