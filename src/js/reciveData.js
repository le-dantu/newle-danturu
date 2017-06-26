/**
 * Created by BreakPoint on 19.05.17.
 */

function sendRecive (content) { //, workType, clients, contentType
var funName = getFnName(arguments.callee);
if ( debug == 1 || debug == "all" ) { console.log( funName + ' start' ) };
    $.getJSON(content, function(data) {
        contentGlobal = data;
        //console.log(contentGlobal);

        /*$.getJSON(workType, function(data) {
            workTypeGlobal = data;
            //console.log(workTypeGlobal);

            $.getJSON(clients, function(data) {
                clientsGlobal = data;
                //console.log(clientsGlobal);

                $.getJSON(contentType, function(data) {
                    contentTypeGlobal = data;
                    //console.log(contentTypeGlobal);
                })


            });


        });
*/
     })
    .done(function() {
        if ( debug == 1 || debug == "all" ) { console.log( funName + ":done, success" ) };

        setTimeout(function() {
            preLoad(false);
        }, 750);

        initFirstBlock(locPage, locType, locCompany, locKeyword);
        //initFirstBlock('vacancies', 'vacancies', 'vacancies');
        //initFirstBlock('contacts', 'contacts', 'contacts');
    })
    .fail(function() {
        if ( debug == 1 || debug == "all" ) { console.log( funName + ":done, error" ) };
    });
}