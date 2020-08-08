//alert(location.href);//popup.js

let memo;

loadData();

//データの読み込み
function loadData(){
  chrome.storage.local.get(['chromememo'], function(obj){
    memo = obj.chromememo;

    //データがない場合の初期化
    if(!memo){
      memo = [ {text: "", lastUpdate: new Date()} ];
      chrome.storage.local.set({chromememo:memo}, function(){});
      return;
    }
    $('#commentArea').val(memo.text);
  });
}

//保存ボタンが押されたとき
$('#save').on('click', function(){
  memo = {
    text: $('#commentArea').val(),
    lastUpdate: new Date()
  };
  chrome.storage.local.set({chromememo: memo}, function(){
    alert('saved');
  });
});
$('#copy').on('click', function(){

    // 対象のタブのidを取得したい
    // chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
  
    //   // 取得したタブid(tabs[0].id)を利用してsendMessageする
    //   chrome.tabs.sendMessage(tabs[0].id, {message: '選択範囲ちょうだい'}, function(item){
    //     // textarea に追加
    //     console.log(item);
    //     if ( $('#commentArea').val().indexOf(item.title) != -1) {
    //         $('#commentArea').val($('#commentArea').val() + item.comment);
    //     }else{
    //         $('#commentArea').val($('#commentArea').val() + item.title + '\n');
    //         $('#commentArea').val($('#commentArea').val() + item.comment);
    //     }
    //   });
    // });

  });

$('#clear').on('click', function(){
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }else{
            alert("clear");
            $('#commentArea').val('');
        }
    });
});