/**
 * Created by BreakPoint on 19.05.17.
 */

function sendRecive(link) {
    var links = [];
    $.getJSON(link, function(data) {
        /*$.each(data[key], function(key1, value1) {
            $.each(data[key][key1], function(key2, value2) {
                $.each(data[key][key1][key2], function(key3, value3) {
                    links.push(value3);
                });
            });
        });*/
     });

    return links;
}