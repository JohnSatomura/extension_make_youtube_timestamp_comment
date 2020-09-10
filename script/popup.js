document.getElementById("display").onclick = function() {
    chrome.storage.local.get(['current_title'], function (value) { 
        chrome.storage.local.get(['current_comment'], function (value) {
            var insert_text = document.getElementById("main_textarea");
            insert_text.textContent = "再生時間 \n" + value.current_comment;
        });
    });
};
