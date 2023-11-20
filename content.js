



function updateMyColumn() {
  // フィルター一覧の各行（クラスが "issuerow" の <tr> 要素）を選択

  var addClumnFlag = 1;
  var filterRows = document.querySelectorAll('tr.issuerow');
  if(document.querySelectorAll('td.mycolumn').length > 0 ) {
    addClumnFlag = 0;
  }


  // 各行に対してループ
  filterRows.forEach(function(row) {
  var memoElement;
  var keyId =row.getAttribute('data-issuekey'); 
    if ( addClumnFlag) {
    // 新しい要素を作成
    memoElement = document.createElement('td');
    memoElement.setAttribute('class', 'mycolumn');
    memoElement.setAttribute('mycolumn-key', keyId);
    } else {
    memoElement = row.lastChild;
    }
    
    // メモの内容を設定
    chrome.storage.local.get([keyId], function (value) {
      console.log(value);
      if(value[keyId]) {

      memoElement.textContent  = value[keyId];
      } else {
        memoElement.textContent =" empty";
      }

    });


    // console.log(row.getAttribute('data-issuekey'));
    
    // 新しい要素を既存のDOM要素に追加
    if(addClumnFlag) 
      row.appendChild(memoElement);
    });

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action == 'update') {
    updateMyColumn();
  }
 // addMemoColumn(request.memo)    
});






