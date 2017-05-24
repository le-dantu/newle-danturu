/**
 * Created by BreakPoint on 19.05.17.
 */

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