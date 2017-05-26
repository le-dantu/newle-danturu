/**
 * Created by BreakPoint on 18.05.17.
 */
function clickArrow(direction) {
    switch(direction) {
        case 'left':
            //alert('click left');
            changeType(false);
            //window.history.pushState("object or string", "Title", "/next");
            break;

        case 'top':
            //alert('click top');
            getContent(false);
            break;

        case 'right':
            //alert('click right');
            changeType(true);
            break;

        case 'bottom':
            //alert('click bottom');
            getContent(true);
            break;
    }
}

function initScrollHandler() {
    var indicator = new WheelIndicator({
        callback: function(e){
            if (e.direction == 'down') {
                clickArrow('bottom');
            }
            else if (e.direction == 'up') {
                clickArrow('top');
            }
        },
        preventMouse: false
    });

}
