/**
 * Created by BreakPoint on 19.05.17.
 */
function initFirstBlock(page, worktype, clients, keyword) {

    indicator.turnOff();
    page = page ? page : false;
    worktype = worktype ? worktype : false;
    clients = clients ? clients : false;
    keyword = keyword ? keyword : false;

    pageGlobal = page;
    
    vertical = [];

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
                //if ( debug == 1 || debug == "all" ) { if ( debug == 1 || debug == "all" ) { console.log(data) } };
            });
            $.each(contentGlobal[pageGlobal][worktype], function (key) {
                $.each(contentGlobal[pageGlobal][worktype][key], function (index, val) {
                    //if ( debug == 1 || debug == "all" ) { console.log(key) };
                    if (key != clients) {
                        vertical.push(val);
                        //if ( debug == 1 || debug == "all" ) { console.log(val) };
                    }
                });
            });
        } catch (err) {
            redirectNotFound(err);
            return false;
        }
        finally {
            if ( debug == 1 || debug == "all" ) { console.log ("finally try/catch, vertical.length = " + vertical.length) }
            if (vertical.length <= 1) {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is OFF" ); }
                indicator.turnOff();
                $('.navTB').hide();
            } else {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                indicator.turnOn();
                $('.navTB').show();
            }

            if (horizontal.length <= 1) {
                $('.navLR').hide();
            } else {
                $('.navLR').show();
            }

            currentImgV = vertical.length - 1;
            getContent(true, true);
        }

    } else if (page && !worktype && clients && !keyword) {

        try {

            $.each(contentGlobal[pageGlobal], function (key) {
                $.each(contentGlobal[pageGlobal][key][clients], function (index, val) {
                    if (contentGlobal[pageGlobal][key][clients] !== undefined) {
                        horizontal.push(val);
                        //if ( debug == 1 || debug == "all" ) { console.log(val) };
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
            redirectNotFound(err);
            return false;
        }
        finally {
            if ( debug == 1 || debug == "all" ) { console.log ("finally try/catch, vertical.length = " + vertical.length) }
            if (vertical.length <= 1) {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is OFF" ); }
                indicator.turnOff();
                $('.navTB').hide();
            } else {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                indicator.turnOn();
                $('.navTB').show();
            }

            if (horizontal.length <= 1) {
                $('.navLR').hide();
            } else {
                $('.navLR').show();
            }

            currentImgV = vertical.length - 1;
            getContent(true, true);
        }

    } else if (page && worktype && !clients && !keyword) {

        try {

            $.each(contentGlobal[pageGlobal][worktype], function (key) {
                $.each(contentGlobal[pageGlobal][worktype][key], function (index, val) {
                    //if ( debug == 1 || debug == "all" ) { console.log(key) };
                    if (val !== undefined) {
                        vertical.push(val);
                        //if ( debug == 1 || debug == "all" ) { console.log(val) };
                    }
                });
            });

        } catch (err) {
            redirectNotFound(err);
            return false;
        }
        finally {
            if ( debug == 1 || debug == "all" ) { console.log ("finally try/catch, vertical.length = " + vertical.length) }
            if (vertical.length <= 1) {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is OFF" ); }
                indicator.turnOff();
                $('.navTB').hide();
            } else {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                indicator.turnOn();
                $('.navTB').show();
            }

            if (horizontal.length <= 1) {
                $('.navLR').hide();
            } else {
                $('.navLR').show();
            }

            currentImgV = vertical.length - 1;
            getContent(true, true);
        }

    } else if (page && !worktype && !clients && !keyword) {

        if ( page == 'portfolio') {
            gridInit();
            return false;
        } else {
            try {

                $.each(contentGlobal[pageGlobal][pageGlobal], function (key, data) {
                    $.each(contentGlobal[pageGlobal][pageGlobal][key], function (index, val) {
                        vertical.push(val);
                        //if ( debug == 1 || debug == "all" ) { console.log(val) };
                    });
                });

            } catch (err) {
                redirectNotFound(err);
                return false;
            }
            finally {
                if ( debug == 1 || debug == "all" ) { console.log ("finally try/catch, vertical.length = " + vertical.length) }
                if (vertical.length <= 1) {
                    if ( debug == 1 || debug == "all" ) { console.log ( "indicator is OFF" ); }
                    indicator.turnOff();
                    $('.navTB').hide();
                } else {
                    if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                    indicator.turnOn();
                    $('.navTB').show();
                }

                if (horizontal.length <= 1) {
                    $('.navLR').hide();
                } else {
                    $('.navLR').show();
                }

                currentImgV = vertical.length - 1;
                getContent(true, true);
            }

        }

    } else if (page && worktype && clients && keyword) {

        try {
            if (contentGlobal[pageGlobal][worktype][clients][keyword] !== undefined) {
                if ( debug == 1 || debug == "all" ) { console.log("Верный ключ") };
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
                    //if ( debug == 1 || debug == "all" ) { console.log(val) };
                }
                if (vertical.length != 0 && val != vertical[0]) {
                    vertical.push(val);
                    //if ( debug == 1 || debug == "all" ) { console.log(val) };
                }
            });
            $.each(contentGlobal[pageGlobal][worktype], function (key) {
                $.each(contentGlobal[pageGlobal][worktype][key], function (index, val) {
                    if (key != clients) {
                        //if ( debug == 1 || debug == "all" ) { console.log(key) };
                        vertical.push(val);
                    }
                });
            });
        } catch (err) {
            redirectNotFound(err);
            return false;
        }
        finally {
            if ( debug == 1 || debug == "all" ) { console.log ("finally try/catch, vertical.length = " + vertical.length) }
            window.history.pushState(currentClient + " | " + currentType, currentClient + " | " + currentType, "/" + pageGlobal + "/" + clients + "/" + worktype + "/" + keyword);

            if (vertical.length <= 1) {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is OFF" ); }
                indicator.turnOff();
                $('.navTB').hide();
            } else {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                indicator.turnOn();
                $('.navTB').show();
            }

            if (horizontal.length <= 1) {
                $('.navLR').hide();
            } else {
                $('.navLR').show();
            }

            currentImgV = vertical.length - 1;
            getContent(true, true);
            return true;
        }

    } else {

        gridInit();
        return false;

    }

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
        //if ( debug == 1 || debug == "all" ) { console.log(currentImgH) };
        //if ( debug == 1 || debug == "all" ) { console.log(lenCurrent) };
    } else {
        if (currentImgH == 0) {
            currentImgH = lenCurrent - 1;
            animation('H');
        } else {
            currentImgH -= 1;
            animation('H');
        }
        //if ( debug == 1 || debug == "all" ) { console.log(currentImgH) };
        //if ( debug == 1 || debug == "all" ) { console.log(lenCurrent) };
    }

    setTimeout(function() {

        currentImgV = 0;

        if (currentType != $('.container').children().data('type')) {
            vertical = [];
            counterType = 0;
            currentType = $('.container').children().data('type');
            var index = [];
            $.each(contentGlobal[pageGlobal][currentType][currentClient], function (key) {
                index.push(key);
            });
            vertical.push(contentGlobal[pageGlobal][currentType][currentClient][index[counterType]]);
            $.each(contentGlobal[pageGlobal][currentType], function (key) {
                $.each(contentGlobal[pageGlobal][currentType][key], function (index, val) {
                    if (vertical[0] != val) {
                        vertical.push(val);
                    }
                    //if ( debug == 1 || debug == "all" ) { console.log(val) };
                });
            });
        } else {
            vertical = [];
            counterType += 1;
            var index = [];
            currentType = $('.container').children().data('type');
            $.each(contentGlobal[pageGlobal][currentType][currentClient], function (key) {
                index.push(key);
            });
            vertical.push(contentGlobal[pageGlobal][currentType][currentClient][index[counterType]]);
            $.each(contentGlobal[pageGlobal][currentType], function (key) {
                $.each(contentGlobal[pageGlobal][currentType][key], function (index, val) {
                    if (vertical[0] != val) {
                        vertical.push(val);
                    }
                    //if ( debug == 1 || debug == "all" ) { console.log(val) };
                });
            });
        }

        if (!linksFlag) {
            window.history.pushState(currentClient + " | " + currentType, currentClient + " | " + currentType, "/" + pageGlobal + "/" + currentClient + "/" + currentType);
        }

        document.title = currentClient + " | " + currentType;

        if (vertical.length <= 1) {
            indicator.turnOff();
            $('.navTB').hide();
        } else {
            if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
            indicator.turnOn();
            $('.navTB').show();
        }

        if (horizontal.length <= 1) {
            $('.navLR').hide();
        } else {
            $('.navLR').show();
        }

        if ( debug == 1 || debug == "all" ) { console.log(vertical) };
        if ( debug == 1 || debug == "all" ) { console.log(horizontal) };
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
        //if ( debug == 1 || debug == "all" ) { console.log(currentImgV) };
        //if ( debug == 1 || debug == "all" ) { console.log(lenCurrent) };
    } else {
        if (currentImgV == 0) {
            currentImgV = lenCurrent - 1;
            animation('V');
        } else {
            currentImgV -= 1;
            animation('V');
        }
        //if ( debug == 1 || debug == "all" ) { console.log(currentImgV) };
        //if ( debug == 1 || debug == "all" ) { console.log(lenCurrent) };
    }

    var animInterval = setInterval(function() {
        if (!loadInterval) {
            clearInterval(animInterval);
            currentImgH = 0;
            currentType = $('.container').children().data('type');

            if (currentClient != $('.container').children().data('client')) {
                horizontal = [];
                var index = [];
                counterClient = 0;
                currentClient = $('.container').children().data('client');
                $.each(contentGlobal[pageGlobal][currentType][currentClient], function (key) {
                    index.push(key);
                });
                horizontal.push(contentGlobal[pageGlobal][currentType][currentClient][index[counterClient]]);
                if ( debug == 1 || debug == "all" ) { console.log(pageGlobal) };
                if ( debug == 1 || debug == "all" ) { console.log(currentType) };
                if ( debug == 1 || debug == "all" ) { console.log(currentClient) };
                if ( debug == 1 || debug == "all" ) { console.log(counterClient) };
                $.each(contentGlobal[pageGlobal], function (key) {
                    if (contentGlobal[pageGlobal][key][currentClient] !== undefined) {
                        $.each(contentGlobal[pageGlobal][key][currentClient], function (index, val) {
                            if (horizontal[0] != val) {
                                horizontal.push(val);
                                //if ( debug == 1 || debug == "all" ) { console.log(contentGlobal[key][currentClient][0]) };
                            }
                        });
                    }
                });
            } else {
                counterClient += 1;
                horizontal = [];
                var index = [];
                counterClient = 0;
                currentClient = $('.container').children().data('client');
                $.each(contentGlobal[pageGlobal][currentType][currentClient], function (key) {
                    index.push(key);
                });
                horizontal.push(contentGlobal[pageGlobal][currentType][currentClient][index[counterClient]]);
                if ( debug == 1 || debug == "all" ) { console.log(pageGlobal) };
                if ( debug == 1 || debug == "all" ) { console.log(currentType) };
                if ( debug == 1 || debug == "all" ) { console.log(currentClient) };
                if ( debug == 1 || debug == "all" ) { console.log(counterClient) };
                $.each(contentGlobal[pageGlobal], function (key) {
                    if (contentGlobal[pageGlobal][key][currentClient] !== undefined) {
                        $.each(contentGlobal[pageGlobal][key][currentClient], function (index, val) {
                            if (horizontal[0] != val) {
                                horizontal.push(val);
                                //if ( debug == 1 || debug == "all" ) { console.log(contentGlobal[key][currentClient][0]) };
                            }
                        });
                    }
                });
            }

            if (linksFlag) {
                if (trueKey) {
                    document.title = currentClient + " | " + currentType;
                    trueKey = false;
                } else if (pageGlobal != currentType) {
                    document.title = currentType + " | " + currentClient;
                } else {
                    document.title = currentClient + " | " + currentType;
                }
            } else {
                if (pageGlobal != currentType) {
                    window.history.pushState(currentClient + " | " + currentType, currentClient + " | " + currentType, "/" + pageGlobal + "/" + currentClient + "/" + currentType);
                    document.title = currentClient + " | " + currentType;
                } else {
                    window.history.pushState(currentType + " | " + currentClient, currentType + " | " + currentClient, "/" + pageGlobal + "/" + currentClient);
                    document.title = currentType + " | " + currentClient;
                }
            }

            if (horizontal.length <= 1) {
                $('.navLR').hide();
            } else {
                $('.navLR').show();
            }

            if (vertical.length <= 1) {
                indicator.turnOff();
                $('.navTB').hide();
            } else {
                if ( debug == 1 || debug == "all" ) { console.log ( "indicator is ON" ); } 
                indicator.turnOn();
                $('.navTB').show();
            }

            if ( debug == 1 || debug == "all" ) { console.log(vertical) };
            if ( debug == 1 || debug == "all" ) { console.log(horizontal) };
        }
    }, 5);

}
