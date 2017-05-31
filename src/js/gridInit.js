function gridInit() {
	indicator.turnOff();
	$(".gridItem").each( function() {
		re = /style=\'.*\)\'/ig
		ig = /\(.*\)/ig
		//console.log(contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])][0]);
		var ad = contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])][0].match(ig);
		ad = ad[0].replace(/\(/,"");
		ad = ad.replace(/lg/,"sm");
		ad = ad.replace(/lg\.png/,"sm\.jpg");
		$(this).attr("style", "background: url(http://le-dantu\.ru"+ad);
		$(this).attr('onclick', "window.location.href = '/portfolio/" + first(contentGlobal['portfolio'][$(this).data('type')]) + "/" + $(this).data('type') + "/'");
	});
    $('.navLR').hide();
    $('.navTB').hide();
}

function first(obj) {
    for (var a in obj) return a;
}