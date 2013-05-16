var EXPORTED_SYMBOLS = ["Bridge"];

var Bridge = {
	init: function(window, App) {

		App.debug('Bridge.init()');

		window.document.addEventListener("DOMContentLoaded", function(e) {
			App.debug('DOMContentLoaded');
			if (e.target.location.hostname === 'localhost') {
				var doc = e.target;

				// Some simple listeners

				doc.addEventListener("testNotification", function(e) {
					App.debug('testNotification');
					App.nativeNotification('Native alert', 'Looks like this');
				}, false);

				doc.addEventListener("openAboutDialog", function(e) {
					App.debug('openAboutDialog');
					App.MainUI.openAboutDialog();
				}, false);

				doc.addEventListener("openExtensionsManager", function(e) {
					App.debug('openExtensionsManager');
					App.MainUI.openExtensionsManager();
				}, false);

				doc.addEventListener("checkForUpdates", function(e) {
					App.debug('checkForUpdates');
					App.MainUI.checkForUpdates();
				}, false);

				// A more advanced message handler derived from the sample code on https://developer.mozilla.org/en-US/docs/Code_snippets/Interaction_between_privileged_and_non-privileged_pages

				var messageHandler = {
					addListener: function(callback) { // analogue of chrome.runtime.onMessage.addListener
						var listener = doc.addEventListener("messageHandler-query", function(event) {
							var node = event.target;
							if (!node || node.nodeType !== 3) // Node.TEXT_NODE = 3
								return;

							var _doc = node.ownerDocument;
							callback(JSON.parse(node.nodeValue), _doc, function(response) {
								node.nodeValue = JSON.stringify(response);

								var event = _doc.createEvent("HTMLEvents");
								event.initEvent("messageHandler-response", true, false);
								return node.dispatchEvent(event);
							});
						}, false, true);
						return listener;
					},
					receiveMessage: function(request, sender, sendResponse) {

						if (request.foo) {
							sendResponse({bar: 2});
						}

						if (request.baz) {
							window.setTimeout(function() {
								sendResponse({quux: 4, msg: 'Had you waiting for 3 seconds...'});
							}, 3000);
							return null;
						}

						if (request.mozilla) {
							return App.nativeNotification("Mozilla?", "Replying with notification...");
						}

						return sendResponse(null);
					}
				};

				messageHandler.addListener(messageHandler.receiveMessage);

			}
		}, false);

	},
};
