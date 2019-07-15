findElement();

function findElement() {
  $(function() {
    var dataHistoryArray = [];

    let tabBox = $('body').find('#tabbox');
    let tabList = tabBox.find('p').find('a');
    tabBox.find('div').each(function (monthIndex) {
      var monthName = '';
      if (monthIndex < tabList.length) {
        monthName = $(tabList[monthIndex]).text().trim();
        console.log(monthName);
      } else {
        // Skip this loop
        return true;
      }

      $(this).find('tbody').find('tr').each(function (trIndex) {
        if (shouldOutput($(this))) {
          var output = [formatMonth(monthName)];

          // xx日
          output.push(formatDay($(this).find('th').text()));

          // xxMB
          $(this).find('td').each(function (_) {
            output.push(formatData($(this).text()));
          });
          console.log(output);

          dataHistoryArray.push(output);
          output = [];
        }
      });
    });
  });

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
}
