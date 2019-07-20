var allHistory = {};
fetchDataHistory();
console.log(allHistory);

function fetchDataHistory() {
  let tabBox = $('body').find('#tabbox');
  let tabList = tabBox.find('p').find('a');
  tabBox.find('div').each(function (monthIndex) {
    var monthName = '';
    if (monthIndex < tabList.length) {
      monthName = $(tabList[monthIndex]).text().trim();
    } else {
      // Skip this loop
      return true;
    }

    var historyByMonth = [];

    $(this).find('tbody').find('tr').each(function () {
      if (shouldOutput($(this))) {
        var historyByDay = [];

        // xx日
        historyByDay.push(formatDay($(this).find('th').text()));

        // xxMB
        $(this).find('td').each(function (_) {
          historyByDay.push(formatData($(this).text()));
        });

        historyByMonth.push(historyByDay);
      }
    });

    allHistory[formatMonth(monthName)] = historyByMonth;
  });
}

function shouldOutput(trElement) {
  if (trElement.find('th').length === 1) {
    let daysDataElement = trElement.find('td').not('.bk_color_sum, .bk_color_ave');
    return daysDataElement.length !== 0;
  } else {
    return false;
  }
}

function formatMonth(monthString) {
  return monthString.replace('月', '').trim();
}

function formatDay(dayString) {
  return dayString.replace('日', '').trim();
}

function formatData(dataString) {
  return dataString.replace('MB', '').replace(',', '').trim();
}
