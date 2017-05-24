/**
 * Created by BreakPoint on 19.05.17.
 */
function initFirstBlock(worktype, clientsL, contenttype) {

    $.each(contentGlobal[worktype][clientsL][contenttype], function(key, data) {
        vertical.push(data);
        console.log(data);
    });

    $.each(contentGlobal[worktype], function(key) {
        $.each(contentGlobal[worktype][key][contenttype], function(index, val) {
            if (key != clientsL) {
                vertical.push(val);
                console.log(val);
            }
        });
    });

    horizontal.push(contentGlobal[worktype][clientsL][contenttype][0]);
    console.log(contentGlobal[worktype][clientsL][contenttype][0]);

    $.each(contentGlobal, function(key) {
        if (key != worktype) {
            horizontal.push(contentGlobal[key][clientsL][contenttype][0]);
            console.log(contentGlobal[key][clientsL][contenttype][0]);
        }
    });

}

function changeType(next) {

    lenCurrent = horizontal.length;

    if (next) {
        if (currentType == lenCurrent - 1) {
            currentType = 0;
            $('.container').html(horizontal[currentType]);
        } else {
            currentType += 1;
            $('.container').html(horizontal[currentType]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    } else {
        if (currentType == 0) {
            currentType = lenCurrent - 1;
            $('.container').html(horizontal[currentType]);
        } else {
            currentType -= 1;
            $('.container').html(horizontal[currentType]);
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


}

function getContent(next) {
    
    lenCurrent = vertical.length;

    if (next) {
        if (currentImg == lenCurrent - 1) {
            currentImg = 0;
            $('.container').html(vertical[currentImg]);
        } else {
            currentImg += 1;
            $('.container').html(vertical[currentImg]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    } else {
        if (currentImg == 0) {
            currentImg = lenCurrent - 1;
            $('.container').html(vertical[currentImg]);
        } else {
            currentImg -= 1;
            $('.container').html(vertical[currentImg]);
        }
        //console.log(currentImg);
        //console.log(lenCurrent);
    }

    if (currentClient != $('.container').children().data('client')) {
        currentClient = $('.container').children().data('client');
        $.each(contentGlobal, function(key) {
            $.each(contentGlobal[key][currentClient]['block'], function(index, val) {
                horizontal.push(val);
                console.log(val);
            });
        });
    }

}