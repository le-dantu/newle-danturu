var queue = new createjs.LoadQueue(true);
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
	if (event.item.type != 'manifest') {
		console.log(event.item.id + ' загружен за: ' + (event.timeStamp - time) +'мс!');
		time = 0;
	}
}

function handleComplete(event) {
	console.log('Все файлы загружены за: ' + (event.timeStamp - allTimes) + 'мс!');
	
	//var item = event.item; // A reference to the item that was passed in to the LoadQueue
	//var type = item.type;
	getDataFlag = true;
	 // Add any images to the page body.
	//if (type == createjs.LoadQueue.IMAGE) {
	//    document.body.appendChild(event.result);
	//}
}