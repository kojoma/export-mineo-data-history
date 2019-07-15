findElement();

function findElement() {
  $(function() {
    let tabBox = $('body').find('#tabbox');
    let tabList = tabBox.find('p').find('a');
    tabBox.find('div').each(function (monthIndex) {
      if (monthIndex < tabList.length) {
        console.log($(tabList[monthIndex]).text().trim());
      } else {
        // Skip this loop
        return true;
      }

      $(this).find('tbody').find('tr').each(function (trIndex) {
        if (shouldOutput($(this))) {
          var output = '';

          // xx日
          output = $(this).find('th').text().trim();

          // xxMB
          $(this).find('td').each(function (_) {
            output = buildOutputString(output, $(this).text());
          });
          console.log(output);
          output = '';
        }
      });
    });
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

function buildOutputString(nowString, additionalString) {
  var newString = '';

  if (nowString.length === 0) {
    newString = nowString + additionalString.trim();
  } else {
    newString = nowString + ', ' + additionalString.trim();
  }

  return newString;
}
