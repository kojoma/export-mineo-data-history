var canDownload = false;
var dataHistories = [];

function downloadDataHistory() {
  if (canDownload) {
    chrome.downloads.download({
      url: csvUrl(),
      filename: filename()
    }, function(id) {});
  }
}

function csvUrl() {
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  let csvData = dataHistories.map(function(history){ return history.join(',') }).join('\r\n');
  let blob = new Blob([bom, csvData], { type: 'text/csv' });
  return window.webkitURL.createObjectURL(blob);
}

function filename() {
  let now = new Date();
  return 'mineo-data-history-' + now.getTime() + '.csv';
}

function showReadyDownloadNotice() {
  document.getElementById('notice').innerText = 'Ready to download!';
}

function showCanNotDownloadNotice() {
  document.getElementById('notice').innerText = 'mineo data not found...';
}

function hideDownloadButton() {
  document.getElementById('download').hidden = true;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.data_history.length !== 0) {
    canDownload = true;
    dataHistories = message.data_history;
    showReadyDownloadNotice();
  } else {
    canDownload = false;
    showCanNotDownloadNotice();
    hideDownloadButton();
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
