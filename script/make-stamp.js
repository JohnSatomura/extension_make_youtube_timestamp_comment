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
            main_process();
            map[121] = false;
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if(map[121]){
            main_process();
            map[121] = false;
        }
    }
});

// zero fill input, fillspace
function zero_padding(num,length){
    return ('0000000000' + num).slice(-length);
}

function main_process(){
    chrome.storage.local.get(['Setting'], function (value) {
        if(value.Setting){
            chrome.storage.local.get(['Delay'], function (value) {
                write_comment_play_time(value.Delay);
            });
        }else{
            write_comment_play_time(0);
        }
    });
}

function write_comment_play_time(delay){
    currentTime = get_play_time(delay);
    console.log(currentTime);
    insertComment = comment_shaping(currentTime);
    input_comment(insertComment);
}

function get_play_time(delay){
    videoElement = document.getElementsByTagName("video");
    time = videoElement[0].currentTime; // get second display -> 2min : output -> 120sec
    time = Math.max(0, time - delay);
    return time;
}

function comment_shaping(time){
    hour = zero_padding(parseInt(Math.floor(time)/60/60), 2);
    min = zero_padding(parseInt(Math.floor(time)/60)%60, 2);
    sec = zero_padding(parseInt(Math.floor(time))%60, 2);

    document.getElementById("simplebox-placeholder").click(); //なければ都バス
    previousComment = document.getElementById("contenteditable-root").innerText;
    newLine =  (previousComment=="") ? "" : "\n";
    comment = (hour == "00") ? min + ":" + sec + " : " : hour  + ":"  + min + ":" + sec + " : ";
    comment = previousComment + newLine + comment;
    return comment;
}

function input_comment(comment){
    document.getElementById("contenteditable-root").innerHTML = comment;
    // save insert comment
    chrome.storage.local.set({"current_comment" : insertComment}, function () {});
}

function send_comment(){
    document.getElementById("submit-button").click();
}

//todo
//入力中のコメントにジャンプ機能がほしい -> 主コメに挿入?
// 送信関数を無効化する