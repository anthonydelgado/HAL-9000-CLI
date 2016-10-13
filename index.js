// Here we include the weather-js so we can use it in our Node application.
var weather = require('weather-js');
var geocoder = require('geocoder');
var colors = require('colors');


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
        weatherLookup();
        break;
    case 'geo':
        geoLookup();
        break;
    case 'break':
        console.log('You want me to break things!');
        break;
    default:
        console.log('Im sorry Dave, Im afraid I cant do that');
}



// Create an application that takes in a series of numbers then sorts them.
// Feel encouraged to use Stack or Google to find the "sort" code. 
// ============================================================================================

function search() {




}

function spotifyLookup() {
    
}

function movieLookup() {

}


function weatherLookup() {

// Then we use the package to search for the weather at a location
    weather.find({search: process.argv[3], degreeType: "F"}, function(err, result){

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

function geoLookup() {

    // Geocoding
    geocoder.geocode(q, function ( err, data ) {

        // If there is an error log it.
        if(err) {
            console.log(err);
        }

        // do something with data
        if(data) {
            console.log(colors.red(JSON.stringify(data, null, 2)));
        }
    });


    let Afplay = require('afplay');

// Instantiate a new player
    let player = new Afplay;

// Play a sound, handle result within a Promise
    player.play('./assets/sounds/grunt.mp3')
        .then(() => {
            console.log('Audio done playing');
        })
        .catch(error => {
            console.log('Error playing file');
        });

}