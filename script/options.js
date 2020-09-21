$(function(){
    chrome.storage.local.get(['Setting'], function (value) {
        if(value.Setting){
            chrome.storage.local.get(['Delay'], function (value) {
                document.getElementById('delay').value = value.Delay;
            });
        }else{
            document.getElementById('delay').value = 0;
        }
    });       

    $("#save").click(function () {
        var delaytime = document.getElementById('delay').value;
        chrome.storage.local.set({"Delay" : delaytime}, function () {});
        chrome.storage.local.set({"Setting" : true}, function () {});
        alert("変更を保存しました。");
    });
    
  });