// Here we include the weather-js so we can use it in our Node application.
var weather = require('weather-js');
var geocoder = require('geocoder');
var colors = require('colors');
var say = require('say');
// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var command = process.argv[2];
var q = "";
for(var i = 3; i < process.argv.length; i++) {
    q += process.argv[i]+" ";
}
console.log(q);


switch(command) {
    case 'search':
        search();
        break;
    case 'weather':
        say.speak( 'Looking up the weather in ' + q + ' from the Microsoft Weather API.');
        weatherLookup(q);
        break;
    case 'geo':
        geoLookup(q);
        break;
    case 'break':
        console.log('You want me to break things!');
        break;
    case 'spotify':
        console.log('You want to listen to spotify!');
        say.speak( 'Playing ' + q + ' songs from spotify.');
        spotifyLookup(q);
        break;
    case 'play':
        console.log('You want to listen to spotify!');

        spotifyLookup(q);

        break;
    default:
        say.speak('I am sorry Dave, Im afraid I cant do that');
}



// Create an application that takes in a series of numbers then sorts them.
// Feel encouraged to use Stack or Google to find the "sort" code. 
// ============================================================================================

function search() {




}

function spotifyLookup(term) {

    var spotify = require('spotify');

    spotify.search({ type: 'track', query: term }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(data);
        console.log(data.tracks.items[0].preview_url);
        downloadMP3(data.tracks.items[0].preview_url);
        // Do something with 'data'
    });
}

function movieLookup() {

}


function weatherLookup(term) {

// Then we use the package to search for the weather at a location
    weather.find({search: term, degreeType: "F"}, function(err, result){

        // If there is an error log it.
        if(err) {
            console.log(err);
        }

        // If there is no error... then print out the weather data.
        // We Use JSON.stringify to print the data in string format.
        // We use the JSON.stringify argument of "2" to make the format pretty.
        // See link here: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        console.log(JSON.stringify(result, null, 2));
        // console.log('The current temperature is ' + result.current.temperature);


    });
}

function geoLookup(term) {

    // Geocoding
    geocoder.geocode(term, function ( err, data ) {

        // If there is an error log it.
        if(err) {
            console.log(err);
        }

        // do something with data
        if(data) {
            console.log(colors.red(JSON.stringify(data, null, 2)));
        }
    });

}

function downloadMP3(file_url) {

// App variables
//     var file_url = 'http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg';
    var DOWNLOAD_DIR = './downloads/';

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
    var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
    var child = exec(mkdir, function(err, stdout, stderr) {
        if (err) throw err;
        else download_file_httpget(file_url);
    });

// Function to download file using HTTP.get
    var download_file_httpget = function(file_url) {
        var options = {
            host: url.parse(file_url).host,
            port: 80,
            path: url.parse(file_url).pathname
        };

        var file_name = url.parse(file_url).pathname.split('/').pop();
        var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

        http.get(options, function(res) {
            res.on('data', function(data) {
                file.write(data);
            }).on('end', function() {
                file.end();
                console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
                playMP3(DOWNLOAD_DIR + '' + file_name)
            });
        });
    };
}

function playMP3(file) {


    say.speak( 'Playing popular ' + q + ' songs from spotify.','Alex',1, function (err) {
        if (err) {
            return console.error(err);
        }

        let Afplay = require('afplay');

// Instantiate a new player
        let player = new Afplay;

// Play a sound, handle result within a Promise
        player.play(file)
            .then(() => {
                console.log('Audio done playing');
            })
            .catch(error => {
                console.log('Error playing file');
                console.log(error);

            });

    });

}