var EXPORTED_SYMBOLS = ["Bridge"];

var Bridge = {
	init: function(window, App, MainUI) {

		App.debug('Bridge.init()');

		window.content.document.addEventListener("openAboutDialog", function(e) {
			App.debug('openAboutDialog');
			MainUI.openAboutDialog();
		}, false);

		window.content.document.addEventListener("checkForUpdates", function(e) {
			App.debug('checkForUpdates');
			MainUI.checkForUpdates();
		}, false);

	},
};
