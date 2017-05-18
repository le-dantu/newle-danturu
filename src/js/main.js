/**
 * Created by BreakPoint on 18.05.17.
 */

$(document).ready(function(){
    $('button .arrow').each(function(){
        if ( $(this).parent() == $('.navLR')) {
            if ($(this).hasClass('left')) {
                $(this).addAtr(onclick="clickArrow(left)")
            } else {
                $(this).addAtr(onclick="clickArrow(right)")
            }
        } else if ( $(this).parent() == $('.navTB')) {
            if ($(this).hasClass('left')) {
                $(this).addAtr(onclick="clickArrow(top)")
            } else {
                $(this).addAtr(onclick="clickArrow(bottom)")
            }
        }
    })
});