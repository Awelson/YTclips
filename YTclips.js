// 1. Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// 2. This function will be called by the API once it's loaded.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 3. This function will be called when the player is ready.
function onPlayerReady(event) {
    // Get all elements with the class 'clickable-segment'
    var clickableElements = document.querySelectorAll('.clickable-segment');

    // Add a click event listener to each clickable element
    clickableElements.forEach(function(element) {
        element.addEventListener('click', function() {
            // Get the start and end times from the data attributes
            var startTime = this.getAttribute('data-start-time');
            var endTime = this.getAttribute('data-end-time');

            // Check if the times are valid numbers before playing
            if (!isNaN(startTime) && !isNaN(endTime)) {
                playSegment(parseFloat(startTime), parseFloat(endTime));
            }
        });
    });
}

// 4. A variable to hold the interval for checking the video time.
var timeInterval;

// 5. Function to play a specific segment
function playSegment(startTime, endTime) {
    clearInterval(timeInterval);

    if (player && typeof player.seekTo === 'function') {
        player.seekTo(startTime, true);
        player.playVideo();

        timeInterval = setInterval(function () {
            if (player.getCurrentTime() >= endTime) {
                player.pauseVideo();
                clearInterval(timeInterval);
            }
        }, 100);
    }
}