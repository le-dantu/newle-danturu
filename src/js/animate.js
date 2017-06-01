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
    var classAnim = "";
    animDuration = -50;

    console.log('start animate');

    if (!globalLinksFlag) {

        classAnim = getClassAnim();

        $("." + classAnim + "_show_end").addClass(classAnim + '_hide_start');
        $("." + classAnim + "_show_end").removeClass(classAnim + "_show_start");
        $("." + classAnim + "_hide_start").removeClass(classAnim + "_show_end");
        animDuration = Number($("." + classAnim + "_hide_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000;
        $("." + classAnim + "_hide_start").addClass(classAnim + "_hide_end");

        console.log('Переход не по ссылке');
    }

    animDuration += 50;

    setTimeout(function(){
        if (direction == 'H') {
            $('.container').html(horizontal[currentImgH]);
            console.log(direction);
        } else if (direction == 'V') {
            $('.container').html(vertical[currentImgV]);
            console.log(direction);
        }

        classAnim = getClassAnim();

        console.log('Класс текущего слайда: ' + classAnim);

        $("." + classAnim + "").addClass(classAnim + '_show_start');
        animDuration = Number($("." + classAnim + "_show_start").css('transition').split(" ")[1].replace(/s/g, '')) * 1000;
        $("." + classAnim + "_show_start").addClass(classAnim + "_show_end");
        //setTimeout(function(){

        //}, animDuration + 50);
    }, animDuration);

    console.log('Задержка была: ' + animDuration);
}