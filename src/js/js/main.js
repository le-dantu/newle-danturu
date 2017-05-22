/**
 * Created by BreakPoint on 18.05.17.
 */

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

});