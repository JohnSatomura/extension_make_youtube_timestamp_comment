console.log("kokosuki : Start");

// url 変更毎に実行
window.addEventListener('yt-navigate-start', process);

if (document.body) process();
else document.addEventListener('DOMContentLoaded', process);


function process() {
    console.log("kokosuki : process");
    $("#stamp-button").remove();
    $("#menu-container").before("<div><button id=\"stamp-button\">❤</button></div>");
    
    $('#stamp-button').on('click', function(){
        console.log("button Click");
        write_comment_play_time();
        //alert(location.href);
    });
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
    
    var previousComment = document.getElementById("contenteditable-root").innerText;
    var newLine =  (previousComment=="") ? "" : "\n";
    // decide insert comment 
    var insertComment = (hour == "00") ? previousComment + newLine + min + ":" + sec + " : " : previousComment + newLine + hour  + ":"  + min + ":" + sec + " : ";
    document.getElementById("contenteditable-root").innerHTML = insertComment;
    
    //毎回 コメントを保存しいて
    //popup に表示する、不要になれば削除ボタン
}



// // popup との通信用
// // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// //     let selection;
  
// //     getComment = document.getElementById("contenteditable-root").innerText;
// //     title = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0].innerText;
// //     var SendData = { "title" : title, "comment" : getComment};
// //     sendResponse(SendData);
// //   });