var fs    = require("fs");
var parseString = require('xml2js').parseString;
var colors = require('colors');

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

var usage = "\n> node PrintMarkers.js /Directory/Filename.xml";
if (process.argv.length < 3) console.log("Please supply the filename of the xml read, for example:".bold + usage);
else if (process.argv.length > 3) console.log("Too many parameters, correct usage:".bold + usage);
else if (process.argv.length == 3) 
{
	console.log("Reading: ".green + process.argv[2]);
	fs.readFile(process.argv[2], function(err, data) {
		if (err) 
		{
			if (err.code == "ENOENT") console.log("Error: ".red + err.path +  " file could not be found or read.");
			else 
			{
				console.log("Unknown Error:".red);
				console.log(err);
			}
		}
		else
		{
			parser.parseString(data, function (err, result) {
	        console.log('Done');
		        result.xmeml.project[0].children.forEach(function(projectNode){
		        	console.log(projectNode);
		        	ParseProject(projectNode);
		        });
	    	});
		}
	});

}
console.log("\n");


function ParseProject(project) {
	//projects can have bins
	project.bin.forEach(function(bin){
		ParseBin(bin);
	});
};

function ParseBin(bin) {
	console.log("\n"+bin.name[0].bold.underline+"\n\n");
	bin.children.forEach(function(child){
		child.sequence.forEach(function(sequence){
			ParseSequence(sequence);
		});
	});
};

function ParseSequence(sequence) {
	sequence.marker.forEach(function(marker){
		PrepareMarker(marker);
	});
	sequence.marker.sort(dynamicSort("id"));
	sequence.marker.forEach(function(marker){
		ParseMarker(marker);
	});
}

function PrepareMarker(marker) {
	marker.id = parseInt(marker.in[0]);
}

function ParseMarker(marker) {
	console.log((" " + marker.in[0].toString() + " " ).inverse + " " + marker.name[0].bold);
	// var name = marker.name[0];
	// console.log(name.bold);
	console.log(marker.comment[0]);
	console.log("\n");
};

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}