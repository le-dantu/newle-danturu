/**
 * Created by BreakPoint on 19.05.17.
 */
function initFirstBlock(page, worktype, clients, keyword) {

    pageGlobal = page;

    if (!(page || worktype || clients || keyword)) {
        gridInit();
        return false;
    } else if (page && worktype && clients && !keyword) {

        try {
            if (contentGlobal[pageGlobal][worktype][clients] === undefined) {
                redirectNotFound();
                return false;
            }

            $.each(contentGlobal[pageGlobal][worktype][clients], function (index, val) {
                vertical.push(val);
                //console.log(data);
            });
            $.each(contentGlobal[pageGlobal][worktype], function (key) {
                $.each(contentGlobal[pageGlobal][worktype][key], function (index, val) {
                    //console.log(key);
                    if (key != clients) {
                        vertical.push(val);
                        //console.log(val);
                    }
                });
            });
        } catch (err) {
            redirectNotFound();
            return false;
        }

    } else if (page && !worktype && clients && !keyword) {

        try {

            $.each(contentGlobal[pageGlobal], function (key) {
                $.each(contentGlobal[pageGlobal][key][clients], function (index, val) {
                    if (contentGlobal[pageGlobal][key][clients] !== undefined) {
                        horizontal.push(val);
                        //console.log(val);
                    }
                });
            });

            if (horizontal.length == 0){
                redirectNotFound();
                return false;
            }

            currentImgH = horizontal.length - 1;
            currentClient = clients;
            changeType(true, true);
            return false;

        } catch (err) {
            console.log(err);
            redirectNotFound();
            return false;
        }

    } else if (page && !worktype && !clients && !keyword) {

        if ( page == 'portfolio') {
            gridInit();
            return false;
        } else {
            try {

                $.each(contentGlobal[pageGlobal][pageGlobal][pageGlobal], function (index, val) {
                    vertical.push(val);
                    //console.log(val);
                });

            } catch (err) {
                redirectNotFound();
                return false;
            }

        }

    } else if (page && worktype && clients && keyword) {

        try {
            if (contentGlobal[pageGlobal][worktype][clients][keyword] !== undefined) {
                console.log("Верный ключ");
                trueKey = true;
                vertical.push(contentGlobal[pageGlobal][worktype][clients][keyword]);
            } else {
                trueKey = false;
            }
            if (contentGlobal[pageGlobal][worktype] === undefined) {
                redirectNotFound();
                return false;
            }
            $.each(contentGlobal[pageGlobal][worktype][clients], function (index, val) {
                if (vertical.length == 0) {
                    vertical.push(val);
                    //console.log(val);
                }
                if (vertical.length != 0 && val != vertical[0]) {
                    vertical.push(val);
                    //console.log(val);
                }
            });
            $.each(contentGlobal[pageGlobal][worktype], function (key) {
                $.each(contentGlobal[pageGlobal][worktype][key], function (index, val) {
                    if (key != clients) {
                        //console.log(key);
                        vertical.push(val);
                    }
                });
            });
        } catch (err) {
            redirectNotFound();
            return false;
        }

    } else {

        gridInit();
        return false;

    }

    currentImgV = vertical.length - 1;
    getContent(true, true);

}

function changeType(next, linksFlag) {
    linksFlag = linksFlag ? linksFlag : false;
    globalLinksFlag = linksFlag;

    lenCurrent = horizontal.length;

    if (next) {
        if (currentImgH == lenCurrent - 1) {
            currentImgH = 0;
            animation('H');
        } else {
            currentImgH += 1;
            animation('H');
        }
        console.log(currentImgH);
        console.log(lenCurrent);
    } else {
        if (currentImgH == 0) {
            currentImgH = lenCurrent - 1;
            animation('H');
        } else {
            currentImgH -= 1;
            animation('H');
        }
        console.log(currentImgH);
        console.log(lenCurrent);
    }

    setTimeout(function() {

        currentImgV = 0;

        if (currentType != $('.container').children().data('type')) {
            vertical = [];
            currentType = $('.container').children().data('type');
            vertical.push(contentGlobal[pageGlobal][currentType][currentClient][counterType]);
            $.each(contentGlobal[pageGlobal][currentType], function (key) {
                $.each(contentGlobal[pageGlobal][currentType][key], function (index, val) {
                    if (vertical[0] != val) {
                        vertical.push(val);
                    }
                    //console.log(val);
                });
            });
            counterType = 0;
        } else {
            counterType += 1;
        }

        if (!linksFlag) {
            window.history.pushState(currentClient + " | " + currentType, currentClient + " | " + currentType, "/" + pageGlobal + "/" + currentClient + "/" + currentType);
        }

        document.title = currentClient + " | " + currentType;

        if (vertical.length == 1) {
            $('.navTB').hide();
        } else {
            $('.navTB').show();
        }

        if (horizontal.length == 1) {
            $('.navLR').hide();
        } else {
            $('.navLR').show();
        }
    }, animDuration + 30);

}

function getContent(next, linksFlag) {
    linksFlag = linksFlag ? linksFlag : false;
    globalLinksFlag = linksFlag;

    lenCurrent = vertical.length;

    if (next) {
        if (currentImgV == lenCurrent - 1) {
            currentImgV = 0;
            animation('V');
        } else {
            currentImgV += 1;
            animation('V');
        }
        //console.log(currentImgV);
        //console.log(lenCurrent);
    } else {
        if (currentImgV == 0) {
            currentImgV = lenCurrent - 1;
            animation('V');
        } else {
            currentImgV -= 1;
            animation('V');
        }
        //console.log(currentImgV);
        //console.log(lenCurrent);
    }

    setTimeout(function() {

        currentImgH = 0;
        currentType = $('.container').children().data('type');


        if (currentClient != $('.container').children().data('client')) {
            horizontal = [];
            currentClient = $('.container').children().data('client');
            horizontal.push(contentGlobal[pageGlobal][currentType][currentClient][counterClient]);
            $.each(contentGlobal[pageGlobal], function (key) {
                if (contentGlobal[pageGlobal][key][currentClient] !== undefined) {
                    $.each(contentGlobal[pageGlobal][key][currentClient], function (index, val) {
                        if (horizontal[0] != val) {
                            horizontal.push(val);
                            //console.log(contentGlobal[key][currentClient][0]);
                        }
                    });
                }
            });
            counterClient = 0;
        } else {
            counterClient += 1;
        }

        if (linksFlag) {
            if (trueKey) {
                document.title = currentClient + " | " + currentType;
                trueKey = false;
            } else if (pageGlobal != currentType) {
                document.title = currentClient + " | " + currentType;
            } else {
                document.title = currentType;
            }
        } else {
            if (pageGlobal != currentType) {
                window.history.pushState(currentClient + " | " + currentType, currentClient + " | " + currentType, "/" + pageGlobal + "/" + currentClient + "/" + currentType);
                document.title = currentClient + " | " + currentType;
            } else {
                window.history.pushState(currentType, currentType, "/" + pageGlobal);
                document.title = currentType;
            }
        }

        if (horizontal.length == 1) {
            $('.navLR').hide();
        } else {
            $('.navLR').show();
        }

        if (vertical.length == 1) {
            $('.navTB').hide();
        } else {
            $('.navTB').show();
        }
    }, animDuration + 30);

}