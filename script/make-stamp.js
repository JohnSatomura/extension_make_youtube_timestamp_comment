console.log("kokosuki : Start");
var processTimeArray = [];
var displayTimeArray= [];
// url Run on every change
window.addEventListener('yt-navigate-start', process);

if (document.body) process();
else document.addEventListener('DOMContentLoaded', process);


function process() {
    console.log("kokosuki : process");
    $("#stamp-button").remove();
    $("#menu-container").before("<div><button id=\"stamp-button\">❤</button></div>");
    
    // Is the position of the function correct?
    $('#stamp-button').on('click', function(){
        console.log("button Click");
        write_comment_play_time();
        //alert(location.href);
    });
}

//control:17, q:81, F10:121, F7,F8,F9:120
var map = {119:false, 121: false};
$(document).keydown(function(e) {
    key_check(e);
}).keyup(function(e) {
    key_check(e);
});

function key_check(e){
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if(map[119]){//swtch more better  ?
            insert_uploader_comment();
            map[119] = false;
        }else if(map[121]){
            write_comment_play_time();
            map[121] = false;
        }
    }
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

    processTimeArray.push(Math.floor(currentTime));
    displayTimeArray.push(insertComment); 

    insertComment = previousComment + newLine + insertComment;
    // decide insert comment 
    document.getElementById("contenteditable-root").innerHTML = insertComment;
    
}

//入力中のコメントにジャンプ機能がほしい -> 主コメに挿入? 
//ジャンプは、主コメと一般コメントしか機能しない(たぶん)?
function insert_uploader_comment(){
    //$('div#description').append("<p>test</p>");
    for(let i=0;i<processTimeArray.length;i++){
        //ページの再読み込みがおこるため target に blank を指定して別タブで開くようにしています。
        $('div#description').append("<a target=\"_blank\" class=\"yt-simple-endpoint style-scope yt-formatted-string\" spellcheck=\"false\"  href=\""+location.pathname+location.search +"&t="+processTimeArray[i]+"s\"dir=\"auto\">"+displayTimeArray[i]+"</a>");
    }
    //<a>で location.href + &t=xxs
}
//todo
//毎回 コメントを保存しいて
//popup に表示する、不要になれば削除ボタン


