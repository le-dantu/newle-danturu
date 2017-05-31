function gridInit() {
	indicator.turnOff();
	$(".gridItem").each( function() {
		re = /style=\'.*\)\'/ig
		ig = /\(.*\)/ig
		//console.log(contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])][0]);
		var ad = contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])][0].match(ig);
		console.log(contentGlobal['portfolio'][$(this).data('type')][first(contentGlobal['portfolio'][$(this).data('type')])][0]);
		ad = ad[0].replace(/\(/,"");
		$(this).attr("style", "background: url(http://le-dantu\.ru"+ad);
	});
    $('.navLR').hide();
    $('.navTB').hide();
}

function first(obj) {
    for (var a in obj) return a;
}