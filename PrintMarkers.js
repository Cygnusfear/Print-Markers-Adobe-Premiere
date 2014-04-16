var fs    = require("fs");
var parseString = require('xml2js').parseString;
var colors = require('colors');

// fs.readFile('/Volumes/Wash/Op Een Hand Te Tellen/Adobe Premiere Files/Project Files/Op Een Hand Te Tellen (Alex) 01.prproj', {encoding : "utf8"}, function (err, data) {
//   if (err) throw err;
//   var strings = data.match("<DVAMarker>.*</DVAMarker>");
//   for(var i = 0; i < strings.length; i++)
//   {
//   	strings[i] = strings[i].replace("<DVAMarker>","");
//   	strings[i] = strings[i].replace("</DVAMarker>","");
//   	var json = JSON.parse(strings[i]);
//   	console.log(json.DVAMarker.mName.bold);
//   	console.log(parseFloat(json.DVAMarker.mStartTime.ticks));

//   	console.log(json.DVAMarker.mComment);
//   	console.log("");
//   }
// });

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile('/Volumes/Wash/Public/Hand_te_tellen/Op1HandTeTellen.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log('Done');
        result.xmeml.project[0].children.forEach(function(projectNode){
        	console.log(projectNode);
        	ParseProject(projectNode);
        });
    });
});


function ParseProject(project) {
	//projects can have bins
	project.bin.forEach(function(bin){
		ParseBin(bin);
	});
};

function ParseBin(bin) {
	console.log("\n"+bin.name[0].bold);
	console.log("------------------------"+"\n\n");
	bin.children.forEach(function(child){
		child.sequence.forEach(function(sequence){
			ParseSequence(sequence);
		});
		// if (child.ToString() === "")
	});
};

function ParseSequence(sequence) {
	sequence.marker.forEach(function(marker){
		ParseMarker(marker);
	});
}

function ParseMarker(marker) {
	console.log((" " + marker.in[0].toString() + " " ).inverse);
	var name = marker.name[0];
	console.log(name.bold);
	console.log(marker.comment[0]);
	console.log("\n");
};




// Project
// 	Name
// 	Children
// 		Clip
// 			UUId
// 			name
// 			media
// 				video
// 					track
// 						clipitem
// 							name

// 		sequence
// 			name
// 			marker


