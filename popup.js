
document.addEventListener('DOMContentLoaded', function() {


  var keySelect = document.getElementById('keyid');
  var saveMemoButton = document.getElementById('saveMemo');
  var updateButton = document.getElementById('update');
  var memoText = document.getElementById('memoText');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action:'getKeys'}, function(response){
        console.log(response.keys)
        response.keys.forEach(function(arrayKey){
          var option = document.createElement("option");
          option.text = arrayKey;
          keySelect.appendChild(option);
        });
    });
  });




  updateButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action:'update',  memo:'msg from pop'}, function(){
    //      alert(response)
      //    $("#text").text(response);
      });
  });
  });
 

  saveMemoButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var memo = memoText.value;
      var keyId = keyid.value;
      // console.log(keyId);

      // ローカルストレージにメモを保存
      chrome.storage.local.set({[keyId]: memo}, function() {
        console.log('Memo saved');

      });

      chrome.storage.local.get(null, function(data) {
        console.log('Local Storage Data:', data);
      });



    });
  });
});