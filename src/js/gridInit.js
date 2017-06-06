function gridInit() {
	indicator.turnOff();
	$(".gridItem").each( function() {
		re = /style=\'.*\)\'/ig
		ig = /\(.*\)/ig
		//console.log(contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])][0]);
		if ($(this).data('key')) {
			var ad = contentGlobal['portfolio'][$(this).data('type')][$(this).data('client')][$(this).data('key')].match(ig);
			ad = ad[0].replace(/\(/,"");
			ad = ad.replace(/lg/,"sm");
			ad = ad.replace(/lg/,"sm");
			ad = ad.replace(/png/,"jpg");
			$(this).attr("style", "background: url("+ad);
			$(this).attr('onclick', "window.location.href = '/portfolio/" + $(this).data('client') + "/" + $(this).data('type') + "/" + $(this).data('key') +"'");
		} else {
			var ad = contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])][0].match(ig);
			ad = ad[0].replace(/\(/,"");
			ad = ad.replace(/lg/,"sm");
			ad = ad.replace(/lg\.png/,"sm\.jpg");
			$(this).attr("style", "background: url("+ad);
			$(this).attr('onclick', "window.location.href = '/portfolio/" + first(contentGlobal['portfolio'][$(this).data('type')]) + "/" + $(this).data('type') + "/'");
		}
	});
    $('.navLR').hide();
    $('.navTB').hide();
}

function first(obj) {
    for (var a in obj) return a;
}