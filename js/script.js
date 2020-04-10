var searchParams = new URLSearchParams(location.search);

/************ Start hard coded settings ******************/

// How long a non matching card is displayed once clicked.
var nonMatchingCardTime = searchParams.get('nonMatchingCardTime') || 1000;

// Shuffle card images: How many different images are available to shuffle
// from?
var imagesAvailable = searchParams.get('imagesAvailable') || 15;

/************ End hard coded settings ******************/

var dataDirectory = searchParams.get('data') || 'fruits';

var script = document.createElement('script');
script.src = 'data/' + dataDirectory + '/script.js';
script.async = false;
document.body.appendChild(script);

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'data/' + dataDirectory + '/style.css';
document.head.appendChild(link);

var itemCount = 1, itemLoaded = 0;

function load() {
    if (++itemLoaded < itemCount) {
        return;
    }

    var grid = searchParams.get('grid') || '5x6';
    handleSettingsSubmission(grid);
}

function loadSound(array) {
    itemCount += array.length;
    createjs.Sound.on('fileload', load);

    array.forEach(function(path, index) {
        createjs.Sound.registerSound('data/' + dataDirectory + '/' + path, 'sound-' + (index + 1));
    });
}

window.addEventListener('load', load);
