var canDownload = false;
var dataHistories = [];
let headerLine = [['月', '日', 'データ通信量（概算）高速', 'データ通信量（概算）低速', 'パケットギフトOUT', 'パケットギフトIN', 'フリータンク・チップOUT', 'フリータンク・チップIN']];

function downloadDataHistory() {
  if (canDownload) {
    let shouldInsertHeader = $('body').find('#insert_header').is(":checked");
    chrome.downloads.download({
      url: csvUrl(shouldInsertHeader),
      filename: filename()
    }, function(id) {});
  }
}

function csvUrl(shouldInsertHeader) {
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

  let outputData = shouldInsertHeader ? headerLine.concat(dataHistories) : dataHistories;
  let csv = outputData.map(function(history){ return history.join(',') }).join('\r\n');

  let blob = new Blob([bom, csv], { type: 'text/csv' });
  return window.webkitURL.createObjectURL(blob);
}

function filename() {
  let now = new Date();
  return 'mineo-data-history-' + now.getTime() + '.csv';
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.data_history.length !== 0) {
    canDownload = true;
    dataHistories = message.data_history;

    document.getElementById('notice').innerText = 'Ready to download!';
    document.getElementById('insert_header').disabled = false;
  } else {
    canDownload = false;

    document.getElementById('notice').innerText = 'mineo data not found...';
    document.getElementById('insert_header').disabled = true;
    document.getElementById('download').hidden = true;
  }
});

window.onload = function() {
  document.getElementById('download').onclick = downloadDataHistory;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.getCurrent(function (currentTab) {
      chrome.tabs.executeScript({ file: 'jquery-3.4.1.min.js' }, function() {
        chrome.tabs.executeScript({ file: 'fetch_data_history.js' });
      });
    });
  });
};
