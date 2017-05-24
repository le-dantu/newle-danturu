/**
 * Created by BreakPoint on 19.05.17.
 */

function sendRecive(link) {
    var links = [];
    $.getJSON(link, function(data) {
        $.each(data, function(key, value) {
            $.each(data[key], function(key1, value1) {
                $.each(data[key][key1], function(key2, value2) {
                    $.each(data[key][key1][key2], function(key3, value3) {
                        links.push(value3);
                    });
                });
            });
function sendRecive (content, workType, clients, contentType) {

    $.getJSON(content, function(data) {
        contentGlobal = data;
        //console.log(contentGlobal);

        $.getJSON(workType, function(data) {
            workTypeGlobal = data;
            //console.log(workTypeGlobal);

            $.getJSON(clients, function(data) {
                clientsGlobal = data;
                //console.log(clientsGlobal);

                $.getJSON(contentType, function(data) {
                    contentTypeGlobal = data;
                    //console.log(contentTypeGlobal);
                })
                .done(function() {
                    console.log( "success" );
                    initFirstBlock('Design', 'WestCall', 'block');
                })
                .fail(function() {
                    console.log( "error" );
                });

            });

        });

     });

}