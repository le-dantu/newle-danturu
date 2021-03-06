/**
 * Created by BreakPoint on 31.05.17.
 */

function getClassAnim() {
    var tmp = $('.container').children().attr('class');
    tmp = tmp.split(" ");
    console.log(tmp[1]);
    return tmp[1];
}

function animation(direction) {
    var classAnimHeader = "header";
    var classAnimSubheader = "subheader";
    var verticalCurrentHTML = horizontal[currentImgH];
    var horizontalCurrentHTML = vertical[currentImgV];

    allDuration = 0;
    animDuration = 0;

    indicator.turnOff();
    $('.navTB').hide();
    $('.navLR').hide();

    if (!globalLinksFlag) {

        classAnim = getClassAnim();

        $("." + classAnim + "_show_end").addClass(classAnim + '_hide_start');
        $("." + classAnim + "_show_end").removeClass(classAnim + "_show_start");
        $("." + classAnim + "_hide_start").removeClass(classAnim + "_show_end");
        animDuration = Number($("." + classAnim + "_hide_start").css('transition-duration').replace(/s/g, '')) * 1000;
        $("." + classAnim + "_hide_start").addClass(classAnim + "_hide_end");

    }

    loadInterval = setInterval(function() {
        console.log('Ждем загрузки json');
        if (getDataFlag) {
            clearInterval(loadInterval);
            setTimeout(function(){
                console.log('Вроде отработала анимация');
                getDataFlag = false;
                if (direction == 'H') {

                    if (globalLinksFlag) {
                        loadOneImage(getSrcPath(horizontalCurrentHTML), verticalCurrentHTML);
                        console.log('Призываю к загрузке');
                    } else {
                        $('.container').html(horizontalCurrentHTML);
                    }

                    $(".header").html($(".header").data('client'));
                    $(".subheader").html($(".subheader").data('type'));
                } else if (direction == 'V') {

                    if (globalLinksFlag) {
                        loadOneImage(getSrcPath(verticalCurrentHTML), verticalCurrentHTML);
                        console.log('Призываю к загрузке');
                    } else {
                        $('.container').html(verticalCurrentHTML);
                    }

                    $(".header").html($(".header").data('client'));
                    $(".subheader").html($(".subheader").data('type'));
                }

                loadInterval = setInterval(function() {
                    if (getDataFlag) {
                        clearInterval(loadInterval);
                        loadInterval = false;
                        classAnim = getClassAnim();

                        $("." + classAnim + "").addClass(classAnim + '_show_start');
                        animDuration = Number($("." + classAnim + "_show_start").css('transition-duration').replace(/s/g, '')) * 1000;

                        $("." + classAnimHeader + "").addClass(classAnimHeader + '_show_start');
                        $("." + classAnimSubheader + "").addClass(classAnimSubheader + '_show_start');
                        animDuration = Number($("." + classAnimHeader + "_show_start").css('transition-duration').replace(/s/g, '')) * 1000 > Number($("." + classAnimSubheader + "_show_start").css('transition-duration').replace(/s/g, '')) * 1000 ? Number($("." + classAnimHeader + "_show_start").css('transition-duration').replace(/s/g, '')) * 1000 : Number($("." + classAnimSubheader + "_show_start").css('transition-duration').replace(/s/g, '')) * 1000;
                        $("." + classAnimHeader + "_show_start").addClass(classAnimHeader + "_show_end");
                        $("." + classAnimSubheader + "_show_start").addClass(classAnimSubheader + "_show_end");


                        animDuration -= 200;

                        setTimeout(function(){
                            $("." + classAnim + "_show_start").addClass(classAnim + "_show_end");
                        }, 700);

                        setTimeout(function(){
                            $("." + classAnimHeader + "_show_end").addClass(classAnimHeader + '_hide_start');
                            $("." + classAnimHeader + "_show_end").removeClass(classAnimHeader + "_show_start");
                            $("." + classAnimHeader + "_hide_start").removeClass(classAnimHeader + "_show_end");
                            $("." + classAnimSubheader + "_show_end").addClass(classAnimSubheader + '_hide_start');
                            $("." + classAnimSubheader + "_show_end").removeClass(classAnimSubheader + "_show_start");
                            $("." + classAnimSubheader + "_hide_start").removeClass(classAnimSubheader + "_show_end");
                            animDuration = Number($("." + classAnimHeader + "_hide_start").css('transition-duration').replace(/s/g, '')) * 1000 > Number($("." + classAnimSubheader + "_hide_start").css('transition-duration').replace(/s/g, '')) * 1000 ? Number($("." + classAnimHeader + "_hide_start").css('transition-duration').replace(/s/g, '')) * 1000 : Number($("." + classAnimSubheader + "_hide_start").css('transition-duration').replace(/s/g, '')) * 1000;
                            $("." + classAnimHeader + "_hide_start").addClass(classAnimHeader + "_hide_end");
                            $("." + classAnimSubheader + "_hide_start").addClass(classAnimSubheader + "_hide_end");
                            setTimeout(function() {
                                $("." + classAnimHeader).addClass('hideText');
                                $("." + classAnimSubheader).addClass('hideText');
                            }, animDuration);
                        }, animDuration);
                    }
                }, 5);
            }, animDuration);
        }
    }, 5);

}

function toggleMenu() {
    $('.menuWrap').toggleClass('close');
    $('.menuWrap').toggleClass('open');
    $('.burger').toggleClass('open');
    if ($('.burger').hasClass('open')) {
        $('.menuWrap').css('z-index', '3000');
        indicator.turnOff();
    } else {
        setTimeout(function() {
            $('.menuWrap').css('z-index', '0');
            if ( debug == 1 || debug == "all" ) { console.log ("finally try/catch, vertical.length = " + vertical.length) }
            if (vertical.length <= 1) {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is OFF" ); }
                indicator.turnOff();
                $('.navTB').hide();
            } else {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                indicator.turnOn();
                $('.navTB').show();
            }

            if (horizontal.length <= 1) {
                $('.navLR').hide();
            } else {
                $('.navLR').show();
            }
        }, 1050);
    }
}
