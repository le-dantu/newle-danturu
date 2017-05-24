/**
 * Created by BreakPoint on 19.05.17.
 */
function initFirstBlock(worktype, clientsL, contenttype) {

    $.each(contentGlobal[worktype][clientsL][contenttype], function(index, val) {
        vertical.push(val);
        //console.log(data);
    });

    $.each(contentGlobal[worktype], function(key) {
        $.each(contentGlobal[worktype][key][contenttype], function(index, val) {
            //console.log(key);
            if (key != clientsL) {
                vertical.push(val);
                //console.log(val);
            }
        });
    });

    currentImgV = vertical.length - 1;
    getContent(true);

    currentClient = $('.container').children().data('client');


}

function changeType(next) {

    lenCurrent = horizontal.length;

    if (next) {
        if (currentImgH == lenCurrent - 1) {
            currentImgH = 0;
            $('.container').html(horizontal[currentImgH]);
        } else {
            currentImgH += 1;
            $('.container').html(horizontal[currentImgH]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    } else {
        if (currentImgH == 0) {
            currentImgH = lenCurrent - 1;
            $('.container').html(horizontal[currentImgH]);
        } else {
            currentImgH -= 1;
            $('.container').html(horizontal[currentImgH]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    }

    currentImgV = 0;
    vertical = [];

    if (currentType != $('.container').children().data('type')) {
        currentType = $('.container').children().data('type');
        $.each(contentGlobal[currentType], function (key) {
            $.each(contentGlobal[currentType][key]['block'], function (index, val) {
                vertical.push(val);
                //console.log(val);
            });
        });
    }

    if (vertical.length == 1) {
        $('.navTB').hide();
    } else {
        $('.navTB').show();
    }

}

function getContent(next) {
    
    lenCurrent = vertical.length;

    if (next) {
        if (currentImgV == lenCurrent - 1) {
            currentImgV = 0;
            $('.container').html(vertical[currentImgV]);
        } else {
            currentImgV += 1;
            $('.container').html(vertical[currentImgV]);
        }
        console.log(currentImgV);
        console.log(lenCurrent);
    } else {
        if (currentImgV == 0) {
            currentImgV = lenCurrent - 1;
            $('.container').html(vertical[currentImgV]);
        } else {
            currentImgV -= 1;
            $('.container').html(vertical[currentImgV]);
        }
        console.log(currentImgV);
        console.log(lenCurrent);
    }

    currentImgH = 0;
    currentType = $('.container').children().data('type');


    if (currentClient != $('.container').children().data('client')) {
        horizontal = [];
        currentClient = $('.container').children().data('client');
        horizontal.push(contentGlobal[currentType][currentClient]['block'][counterClient]);
        $.each(contentGlobal, function(key) {
            if (contentGlobal[key][currentClient] !== undefined) {
                $.each(contentGlobal[key][currentClient]['block'], function(index, val) {
                    if (horizontal[0] != val) {
                        horizontal.push(val);
                        //console.log(contentGlobal[key][currentClient]['block'][0]);
                    }
                });
            }
        });
        counterClient = 0;
    } else {
        counterClient += 1;
    }

    if (horizontal.length == 1) {
        $('.navLR').hide();
    } else {
        $('.navLR').show();
    }

}