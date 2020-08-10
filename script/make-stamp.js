console.log("kokosuki : Start");
var wasWrittenFlag = false;
console.log("wasWrittenFlag:" + wasWrittenFlag.toString());

window.addEventListener('yt-navigate-start', process);

if (document.body) process();
else document.addEventListener('DOMContentLoaded', process);

function process() {
    console.log("kokosuki : process");
    $("#stamp-button").remove();
    $("#menu-container").before("<div><button id=\"stamp-button\">❤</button></div>");
    
    console.log("kokosuki : make element");
    
}

//17 : control 81 : q 121 F10 F7,8,9あたりは空いてそう
var map = {17: false, 81: false, 121: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        //swtch more better  ?
        if (map[17] && map[81]) {
            write_comment_play_time();
        }else if(map[121]){
            write_comment_play_time();
        }
    }
}).keyup(function(e) {
    map[17] = false;
    map[81] = false;
    map[121] = false;
});

function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}

function write_comment_play_time(){
    //console.log("wasWrittenFlag Play :" + wasWrittenFlag.toString());
    var getCurrentTime = document.getElementsByTagName("video");
    var currentTime = getCurrentTime[0].currentTime;//get second display -> 2min : output -> 120sec
    
    var hour = zeroPadding(parseInt(Math.floor(currentTime)/60/60), 2);
    var min = zeroPadding(parseInt(Math.floor(currentTime)/60)%60, 2);
    var sec = zeroPadding(parseInt(Math.floor(currentTime))%60, 2);
    document.getElementById("simplebox-placeholder").click(); //なければ都バス
    var newLine = (!wasWrittenFlag) ? "" : "\n";

    var previousComment = document.getElementById("contenteditable-root").innerText;
    if(hour == "00"){
        document.getElementById("contenteditable-root").innerHTML = previousComment + newLine + min + ":" + sec + " : ";
    }else{
        document.getElementById("contenteditable-root").innerHTML = previousComment + newLine + hour  + ":"  + min + ":" + sec + " : ";
    }

    wasWrittenFlag = true;
}

$('#stamp-button').on('click', function(){
    write_comment_play_time();
    //alert(location.href);
});

// // popup との通信用
// // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// //     let selection;
  
// //     getComment = document.getElementById("contenteditable-root").innerText;
// //     title = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0].innerText;
// //     var SendData = { "title" : title, "comment" : getComment};
// //     sendResponse(SendData);
// //   });