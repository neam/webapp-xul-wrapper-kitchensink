var EXPORTED_SYMBOLS = ["Bridge"];

var Bridge = {
	init: function(window, App) {

		App.debug('Bridge.init()');

		window.document.addEventListener("DOMContentLoaded", function(e) {
			App.debug('DOMContentLoaded');
			if (e.target.location.hostname === 'localhost') {
				var doc = e.target;

				doc.addEventListener("testNotification", function(e) {
					App.debug('testNotification');
					App.nativeNotification('Native alert', 'Looks like this');
				}, false);

				doc.addEventListener("openAboutDialog", function(e) {
					App.debug('openAboutDialog');
					App.MainUI.openAboutDialog();
				}, false);

				doc.addEventListener("checkForUpdates", function(e) {
					App.debug('checkForUpdates');
					App.MainUI.checkForUpdates();
				}, false);

			}
		}, false);

	},
};
