chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
});

window.onload = function() {
  // document.getElementById('download').onclick = downloadButton;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.getCurrent(function (currentTab) {
      chrome.tabs.executeScript({ file: 'jquery-3.4.1.min.js' }, function() {
        chrome.tabs.executeScript({ file: 'fetch_data_history.js' });
      });
    });
  });
};
