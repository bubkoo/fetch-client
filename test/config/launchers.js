var launchers = {};
var browsers  = [{
  browserName: 'Chrome',
  versions: [53, 52, 51, 50, 49]
}, {
  browserName: 'Firefox',
  versions: [48, 47, 46]
}, {
  launcher: 'Edge',
  browserName: 'MicrosoftEdge',
  versions: [13]
}, {
  launcher: 'InternetExplorer',
  browserName: 'Internet Explorer',
  versions: [11, 10, 9, 8, 7, 6]
}, {
  browserName: 'Safari',
  versions: [9, 8]
}, {
  launcher: 'IOS',
  browserName: 'iPhone',
  versions: ['9.0', '8.1']
}, {
  browserName: 'Android',
  versions: ['5.0', '4.4', '4.3']
}];


browsers.forEach(function (item) {

  var launcher    = item.launcher;
  var browserName = item.browserName;

  if (item.versions && item.versions.length) {
    item.versions.forEach(function (version) {

      var key = (launcher || browserName) + '_' + ('' + version).replace(/\./g, '_');

      launchers[key] = {
        name: browserName + ' ' + version,
        base: 'SauceLabs',
        version: version,
        browserName: browserName
      };
    });
  }
});


module.exports = launchers;
