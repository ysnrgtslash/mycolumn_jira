
function updateMyColumn() {

  var addClumnFlag = 1;
  var filterRows = document.querySelectorAll('tr.issuerow');
  if(document.querySelectorAll('td.mycolumn').length > 0 ) {
    addClumnFlag = 0;
  }


  // loop for each line 
  filterRows.forEach(function(row) {
  var memoElement;
  var keyId =row.getAttribute('data-issuekey'); 
    if ( addClumnFlag) {
    // creat new element
    memoElement = document.createElement('td');
    memoElement.setAttribute('class', 'mycolumn');
    memoElement.setAttribute('mycolumn-key', keyId);
    } else {
    memoElement = row.lastChild;
    }
    
    // get memo from storage
    chrome.storage.local.get([keyId], function (value) {
      // console.log(value);
      if(value[keyId]) {

      memoElement.textContent  = value[keyId];
      } else {
        memoElement.textContent =" ---- ";
      }

    });

    
    // add new element to DOM
    if(addClumnFlag) 
      row.appendChild(memoElement);
    });

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action == 'update') {
    updateMyColumn();
  }

});






