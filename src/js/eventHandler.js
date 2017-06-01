/**
 * Created by BreakPoint on 18.05.17.
 */
function clickArrow(direction) {
    switch(direction) {
        case 'left':
            //alert('click left');
            changeType(false);
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
    indicator = new WheelIndicator({
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

function redirectNotFound() {
    $.ajax({
        url: '/index.php',
        type: 'POST',
        data: {data : 'error', url : window.location.pathname},
        success: function(data) {
            console.log('Страница не существует');
            window.location.href = data;
        }
    });
}

function backState() {
    if (document.referrer) {
        window.location.href = document.referrer;
    } else {
        window.location.href = '/';
    }
}