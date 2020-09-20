var processTimeArray = [];
var displayTimeArray= [];
// url Run on every change
window.addEventListener('yt-navigate-start', process);

if (document.body) process();
else document.addEventListener('DOMContentLoaded', process);

function process() {
    var title = $(document).attr('title');
    chrome.storage.local.get(['current_comment'], function (value) {
        chrome.storage.local.set({"previous_comment" : value.current_comment}, function () {});
      });
}

//control:17, q:81, , F7:118, F8:119, F9:120, F10:121
var map = {119:false, 120:false, 121: false};
$(document).keydown(function(e) {//swtch more better  ?
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if(map[120]){
            send_comment();
            map[120] = false;
        }else if(map[121]){
            write_comment_play_time();
            map[121] = false;
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if(map[121]){
            write_comment_play_time();
            map[121] = false;
        }
    }
});

// zero fill input, fillspace
function zero_padding(num,length){
    return ('0000000000' + num).slice(-length);
}

function write_comment_play_time(){
    var getCurrentTime = document.getElementsByTagName("video");
    var currentTime = getCurrentTime[0].currentTime;//get second display -> 2min : output -> 120sec
    var hour = zero_padding(parseInt(Math.floor(currentTime)/60/60), 2);
    var min = zero_padding(parseInt(Math.floor(currentTime)/60)%60, 2);
    var sec = zero_padding(parseInt(Math.floor(currentTime))%60, 2);
    document.getElementById("simplebox-placeholder").click(); //なければ都バス
    
    var previousComment = document.getElementById("contenteditable-root").innerText;
    var newLine =  (previousComment=="") ? "" : "\n";
    var insertComment = (hour == "00") ? min + ":" + sec + " : " : hour  + ":"  + min + ":" + sec + " : ";

    insertComment = previousComment + newLine + insertComment;
    // decide insert comment 
    document.getElementById("contenteditable-root").innerHTML = insertComment;
    
    // save insert comment
    chrome.storage.local.set({"current_comment" : insertComment}, function () {});
}

function send_comment(){
    document.getElementById("submit-button").click();
}


//todo
//入力中のコメントにジャンプ機能がほしい -> 主コメに挿入?
// option
// コメントする時間に-n秒する
// 送信関数を無効化する