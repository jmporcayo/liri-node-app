// hiding keys
require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
var Twitter = require('twitter');
let fs = require("fs");
let request = require('request');

// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:

// Add the code required to import the keys.js file and store it in a variable.
// You should then be able to access your keys information like so
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
// TWITTER------------------------------------------------------------

function getTweets(twitterHandle) {

    if (!twitterHandle) {
        twitterHandle = 'joeybad08220406';
    }

    var params = {
        screen_name: twitterHandle
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets[0]);

            for (let i = 0; i < tweets.length; i++) {
                console.log("Date: " + tweets[i].created_at)
                console.log();

                console.log("Tweet: " + tweets[i].text);
                console.log()
                console.log("=========================================");
                console.log("=========================================");


            }
        }
    });
}
// OMDB------------------------------------------------------------
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

function searchMovie(movie) {

    if (!movie) {
        movie = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

            let movieData = JSON.parse(body);

            console.log(movieData);

            console.log("Title: " + movieData.Title)
            console.log("Year: " + movieData.Year);
            console.log('Rating: ' + movieData.Rated);
            console.log("Rotten Tomatos: " + movieData.Ratings[1].Value);
            console.log("Country " + movieData.Country);
            console.log("Plot: " + movieData.Plot);
            console.log('Language: ' + movieData.Language);
            console.log("Actors: " + movieData.Actors);
        }
    });
}


// SPOTIFY-----------------------------------------------------------------
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

// let Spotify = require('node-spotify-api');
function searchSong(song) {
    if (!song) {
        song = "The sign";
    }
    spotify.search({
            type: 'track',
            query: song
        },

        function (err, response) {
            console.log('Artist: ' + response.Artist)
            console.log(response);
        })

}
searchSong('We will rock you')
 
function getSearchString(array) {
    // let searchString = array.slice(3).join(" ");
    // console.log(array.slice(3).join(" "));
    return array.slice(3).join(" ");
}
//User Command---------------------------------------------------- 
// LIRI COMMANDS-------------------------------------------------------

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says
function getUserCommand(userCommand, userSearch) {


    switch (userCommand) {
        case "my-tweets":
            getTweets(userSearch);
            break;

        case "spotify-this-song":
            searchSong(userSearch);
            break;

        case "movie-this":
            searchMovie(userSearch);
            break;

        case "do-what-it-says":
            doWhat();
            break;

        default:
            console.log("please enter a valid user command");
            break;

    }

}

function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // console.log(data);

        let commandArray = data.split(",");

        getUserCommand(commandArray[0], commandArray[1]);

        // console.log(commandArray);
    })

}

// getUserCommand(process.argv[2], process.argv.slice(3).join(" "));
getUserCommand(process.argv[2], getSearchString(process.argv));