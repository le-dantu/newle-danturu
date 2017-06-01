/**
 * Created by BreakPoint on 31.05.17.
 */

function getClassAnim() {
    var tmp = $('.container').children().attr('class');
    tmp = tmp.split(" ");
    //console.log(tmp[tmp.length - 1]);
    return tmp[tmp.length - 1];
}

function animate(classAnim, option) {
    if (option == 'show') {
        if (classAnim == 'default') {
            //$('.default').css('width', '100%');
            $('.default').css('opacity', '1');
            //console.log('Радость');
        } else {
            //console.log('Печаль');
        }
    } else if (option == 'hide') {
        if (!globalLinksFlag) {
            if (classAnim == 'default') {
                //$('.default').css('width', '100%');
                $('.default').css('opacity', '0');
                //console.log('Hide work');
            } else {
                //console.log('Hide not work');
            }
        }
    } else {
        javascript:void(0);
    }
}