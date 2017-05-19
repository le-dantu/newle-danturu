/**
 * Created by BreakPoint on 19.05.17.
 */

function sendRecive(link) {
    var links = [];
    $.getJSON(link, function(data) {
        $.each(data.type.company, function(key, value) {
            links.push(value);
        });
    });

    return links;
}