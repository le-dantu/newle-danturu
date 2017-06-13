function gridInit() {
	indicator.turnOff();
	$(".gridItem").each( function() {
		re = /style=\'.*\)\'/ig
		ig = /\(.*\)/ig
		//console.log(contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])][0]);
		if ($(this).data('key') !== "undefined") {

			var ad = contentGlobal['portfolio'][$(this).data('type')][$(this).data('client')][$(this).data('key')].match(ig);
			ad = ad[0].replace(/\(/,"").replace(/lg/,"sm").replace(/lg/,"sm").replace(/png/,"jpg");
			$(this).attr("style", "background: url("+ad);
			$(this).attr('onclick', "initFirstBlock('portfolio', '" + $(this).data('type') + "', '" + $(this).data('client') + "', '" + $(this).data('key') + "')");
		} else {

			var ad = contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])][first(contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])])].match(ig);
			ad = ad[0].replace(/\(/,"").replace(/lg/,"sm").replace(/lg/,"sm").replace(/png/,"jpg");
			$(this).attr("style", "background: url("+ad);
			$(this).attr('onclick', "initFirstBlock('portfolio', '" + $(this).data('type') + "', '" + first(contentGlobal['portfolio'][$(this).data('type')]) + "')");
		}
	});
    $('.navLR').hide();
    $('.navTB').hide();
}

function first(obj) {
    for (var a in obj) return a;
}