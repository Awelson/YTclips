// 1. Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// 2. This function will be called by the API once it's loaded.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {});
}

// 3. A variable to hold the interval for checking the video time.
var timeInterval;

// 4. Function to play a specific segment
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