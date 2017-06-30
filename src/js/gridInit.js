function gridInit() {
	var ad = [];
	indicator.turnOff();
	$(".gridItem").each( function() {
		re = /style=\'.*\)\'/ig
		ig = /\(.*\)/ig
		//console.log(contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])][0]);
		if ($(this).data('key') !== "undefined") {
			ad = contentGlobal['portfolio'][$(this).data('type')][$(this).data('client')][$(this).data('key')].match(ig);
			ad = ad[0].replace(/\(/,"");
			ad = ad.replace(/lg/,"sm")
			ad = ad.replace(/lg/,"sm")
			ad = ad.replace(/png/,"jpg");
			ad = ad.replace(/\)/,"");
			manifestImage += '{"src": "' + ad + '", "id": "' + $(this).data('key') + '"},';
			//$(this).attr("style", "background: url("+ad);
			$(this).attr('onclick', "initFirstBlock('portfolio', '" + $(this).data('type') + "', '" + $(this).data('client') + "', '" + $(this).data('key') + "')");
		} else {
			ad = contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])][first(contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])])].match(ig);
			ad = ad[0].replace(/\(/,"");
			ad = ad.replace(/lg/,"sm")
			ad = ad.replace(/lg/,"sm")
			ad = ad.replace(/png/,"jpg");
			ad = ad.replace(/\)/,"");
			manifestImage += '{"src": "' + ad + '", "id": "' + $(this).data('key') + '"},';
			//$(this).attr("style", "background: url("+ad);
			$(this).attr('onclick', "initFirstBlock('portfolio', '" + $(this).data('type') + "', '" + first(contentGlobal['portfolio'][$(this).data('type')]) + "')");
		}
	});
    $('.navLR').hide();
    $('.navTB').hide();
    manifestImage = manifestImage.substring(0, manifestImage.length - 1);
    manifestImage += "]}";
    startLoadImage();
}

function first(obj) {
    for (var a in obj) return a;
}