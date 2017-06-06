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

    allDuration = 0;
    animDuration = 0;

    if (!globalLinksFlag) {

        classAnim = getClassAnim();

        $("." + classAnim + "_show_end").addClass(classAnim + '_hide_start');
        $("." + classAnim + "_show_end").removeClass(classAnim + "_show_start");
        $("." + classAnim + "_hide_start").removeClass(classAnim + "_show_end");
        animDuration = Number($("." + classAnim + "_hide_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000;
        $("." + classAnim + "_hide_start").addClass(classAnim + "_hide_end");

    }

    setTimeout(function(){

        if (direction == 'H') {
            $('.container').html(horizontal[currentImgH]);
            $(".header").html($(".header").data('client'));
            $(".subheader").html($(".subheader").data('type'));
        } else if (direction == 'V') {
            $('.container').html(vertical[currentImgV]);
            $(".header").html($(".header").data('client'));
            $(".subheader").html($(".subheader").data('type'));
        }

        classAnim = getClassAnim();

        $("." + classAnim + "").addClass(classAnim + '_show_start');
        animDuration = Number($("." + classAnim + "_show_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000;

        $("." + classAnimHeader + "").addClass(classAnimHeader + '_show_start');
        $("." + classAnimSubheader + "").addClass(classAnimSubheader + '_show_start');
        animDuration = Number($("." + classAnimHeader + "_show_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000 > Number($("." + classAnimSubheader + "_show_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000 ? Number($("." + classAnimHeader + "_show_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000 : Number($("." + classAnimSubheader + "_show_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000;
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
            animDuration = Number($("." + classAnimHeader + "_hide_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000 > Number($("." + classAnimSubheader + "_hide_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000 ? Number($("." + classAnimHeader + "_hide_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000 : Number($("." + classAnimSubheader + "_hide_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000;
            $("." + classAnimHeader + "_hide_start").addClass(classAnimHeader + "_hide_end");
            $("." + classAnimSubheader + "_hide_start").addClass(classAnimSubheader + "_hide_end");
            setTimeout(function() {
                $("." + classAnimHeader).addClass('hideText');
                $("." + classAnimSubheader).addClass('hideText');
            }, animDuration);
        }, animDuration);
    }, animDuration);

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
            indicator.turnOn();
        }, 1050);
    }
}