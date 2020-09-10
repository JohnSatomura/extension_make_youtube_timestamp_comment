console.log("kokosuki : Start");
var processTimeArray = [];
var displayTimeArray= [];
// url Run on every change
window.addEventListener('yt-navigate-start', process);

if (document.body) process();
// else document.addEventListener('DOMContentLoaded', process);
else document.addEventListener('Load', process);

function process() {
    console.log("kokosuki : reload");
    $("#stamp-button").remove();
    $("#menu-container").before("<div><button id=\"stamp-button\">❤</button></div>");
    

    // 前回と現在のタイトルとコメントを保存
    // 再読み込み時 or リロード時 に現在を前回に書き換える
    var title = $(document).attr('title');
    chrome.storage.local.get(['current_comment'], function (value) {
        console.log("再生時間 \n" + value.current_comment);
        chrome.storage.local.set({"previous_comment" : value.current_comment}, function () {});
      });

    // Is the position of the function correct?
    $('#stamp-button').on('click', function(){
        console.log("button Click");
        write_comment_play_time();
        //alert(location.href);
    });
}

//control:17, q:81, , F7:118, F8:119, F9:120, F10:121
var map = {119:false, 120:false, 121: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if(map[119]){//swtch more better  ?
            redisplay_comment();
            map[119] = false;
        }else if(map[120]){
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

function key_check(e){
    
}

// zero fill input, fillspace
function zero_padding(num,length){
    return ('0000000000' + num).slice(-length);
}

function write_comment_play_time(){
    //console.log("wasWrittenFlag Play :" + wasWrittenFlag.toString());
    var getCurrentTime = document.getElementsByTagName("video");
    var currentTime = getCurrentTime[0].currentTime;//get second display -> 2min : output -> 120sec
    var hour = zero_padding(parseInt(Math.floor(currentTime)/60/60), 2);
    var min = zero_padding(parseInt(Math.floor(currentTime)/60)%60, 2);
    var sec = zero_padding(parseInt(Math.floor(currentTime))%60, 2);
    document.getElementById("simplebox-placeholder").click(); //なければ都バス
    
    var previousComment = document.getElementById("contenteditable-root").innerText;
    var newLine =  (previousComment=="") ? "" : "\n";
    var insertComment = (hour == "00") ? min + ":" + sec + " : " : hour  + ":"  + min + ":" + sec + "";

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
//毎回 コメントを保存しいて
//入力中のコメントにジャンプ機能がほしい -> 主コメに挿入?
//popup に表示する、不要になれば削除ボタン
//入力中のコメントがほぞんできるようにしたい

