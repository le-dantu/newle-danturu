var queue = new createjs.LoadQueue(true);
var imageLoad = new createjs.LoadQueue(true);
var time = 0;
var allTimes = 0;
queue.on("progress", handleProgress, this);
queue.on("fileload", handleFileLoad, this);
queue.on("complete", handleComplete, this);
queue.loadManifest({src:"/js/startLoadStack.json", type:"manifest"});
//queue.loadFile({id:"image", src:"filePath/file.jpg"});

function handleProgress(event) {
	if (time == 0) {
		time = event.timeStamp;
	}
	if (allTimes == 0) {
		allTimes = event.timeStamp;
	}
}

function handleFileLoad(event) {
	//console.log(event);
	//if (event.item.type == 'css') {
		//$('<link type="text/css" rel="stylesheet" href="' + event.item.src + '">').insertAfter("body");
	//} else 
	if (event.item.type != 'manifest') {
		//console.log(event.timeStamp);
		console.log(event.item.id + ' загружен за: ' + (event.timeStamp - time) +'мс!');
		time = event.timeStamp;
	}
}

function handleComplete(event) {
	console.log('Все файлы загружены за: ' + (event.timeStamp - allTimes) + 'мс!');
	getDataFlag = true;
	//var item = event.item; // A reference to the item that was passed in to the LoadQueue
	//var type = item.type;
	// Add any images to the page body.
	//if (type == createjs.LoadQueue.IMAGE) {
	//    document.body.appendChild(event.result);
	//}
}

function loadOneImage(pathImage, element) {
	console.log(pathImage);
	imageLoad.on("fileload", handleOneImage, this, false, element);
	imageLoad.loadFile(pathImage);
}

function startLoadImage() {
	imageLoad.on("fileload", handleImageLoad, this);
	imageLoad.on("complete", handleGridLoad, this);
	imageLoad.loadManifest(JSON.parse(manifestImage));
}

function handleImageLoad(event) {
	//console.log(event);
	$(".gridItem[data-key="+event.item.id+"]").attr("style", "background: url("+event.item.src+")");
	console.log(event.item.id + ' загружен за: ' + (event.timeStamp - time) +'мс!');
	time = event.timeStamp;
	//$(element).attr("style", "background: url("+event);
	//$(element).attr('onclick', "initFirstBlock('portfolio', '" + $(element).data('type') + "', '" + $(element).data('client') + "', '" + $(element).data('key') + "')");
}

function handleGridLoad(event) {
	//console.log(event);
	preLoad(false);
	//$(element).attr("style", "background: url("+event);
	//$(element).attr('onclick', "initFirstBlock('portfolio', '" + $(element).data('type') + "', '" + $(element).data('client') + "', '" + $(element).data('key') + "')");
}

function handleOneImage(event, element) {
	//console.log(event);
	console.log('Слайд загружен за!');
	$('.container').html(element);
	getDataFlag = true;
	//$(element).attr("style", "background: url("+event);
	//$(element).attr('onclick', "initFirstBlock('portfolio', '" + $(element).data('type') + "', '" + $(element).data('client') + "', '" + $(element).data('key') + "')");
}