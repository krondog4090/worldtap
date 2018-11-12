export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function abbreviateNumber(x) {
  var newValue = x;
  if (x >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + x).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0 ? x / Math.pow(1000, suffixNum) : x).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}
