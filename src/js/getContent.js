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

    getContent(true);

    /*horizontal.push(contentGlobal[worktype][clientsL][contenttype][0]);
    console.log(contentGlobal[worktype][clientsL][contenttype][0]);

    $.each(contentGlobal, function(key) {
        if (key != worktype) {
            if (contentGlobal[key][clientsL] !== undefined) {
                horizontal.push(contentGlobal[key][clientsL][contenttype][0]);
                console.log(contentGlobal[key][clientsL][contenttype][0]);
            }
        }
    });*/

    currentClient = $('.container').children().data('client');
    currentType = $('.container').children().data('client');

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

    if (currentType != $('.container').children().data('type')) {
        currentType = $('.container').children().data('type');
        $.each(contentGlobal[currentType], function (key) {
            $.each(contentGlobal[currentType][key]['block'], function (index, val) {
                vertical.push(val);
                console.log(val);
            });
        });
    }

    currentImgV = 0;

}

function getContent(next) {
    
    lenCurrent = vertical.length;

    if (next) {
        if (currentImgV == lenCurrent - 1) {
            $('.container').html(vertical[currentImgV]);
            currentImgV = 0;
        } else {
            $('.container').html(vertical[currentImgV]);
            currentImgV += 1;
        }
        console.log(currentImgV);
        console.log(lenCurrent);
    } else {
        if (currentImgV == 0) {
            $('.container').html(vertical[currentImgV]);
            currentImgV = lenCurrent - 1;
        } else {
            $('.container').html(vertical[currentImgV]);
            currentImgV -= 1;
        }
        console.log(currentImgV);
        console.log(lenCurrent);
    }

    if (currentClient != $('.container').children().data('client')) {
        currentClient = $('.container').children().data('client');
        $.each(contentGlobal, function(key) {
            if (contentGlobal[key][currentClient] !== undefined) {
                horizontal.push(contentGlobal[key][currentClient]['block'][0]);
                console.log(contentGlobal[key][currentClient]['block'][0]);
            }
        });
    }

    currentImgH = 0;

}