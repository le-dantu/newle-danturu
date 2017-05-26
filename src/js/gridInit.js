function gridInit() {
	$(".gridItem").each( function() {
		re = /style=\'.*\)\'/ig
		ig = /\(.*\)/ig
		console.log(contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])]["block"][0]);
		var ad = contentGlobal[$(this).data('type')][first(contentGlobal[$(this).data('type')])]["block"][0].match(ig);
		ad = ad[0].replace(/\(/,"");
		$(this).attr("style", "background: url(http://le-dantu\.ru"+ad);
	});
}
function first(obj) {
    for (var a in obj) return a;
}