/*global define */
define(['jquery'], function($) {
	'use strict';

	var messageHandler = {
		sendMessage: function(data, callback) { // analogue of chrome.runtime.sendMessage
			var request = document.createTextNode(JSON.stringify(data));

			request.addEventListener("messageHandler-response", function(event) {
				request.parentNode.removeChild(request);
				if (callback) {
					var response = JSON.parse(request.nodeValue);
					callback(response);
				}
			}, false);

			document.head.appendChild(request);

			var event = document.createEvent("HTMLEvents");

			event.initEvent("messageHandler-query", true, false);
			request.dispatchEvent(event);

		},
		sampleCallback: function(response) {
			return alert("response: " + (response ? response.toSource() : response));
		}
	};

	function triggerEvent(name) {

		var element = document.createElement("foo-data-element");
		element.setAttribute("id", "foobar");
		element.setAttribute("attribute1", "foobar");
		document.documentElement.appendChild(element);

		var evt = document.createEvent("Events");
		evt.initEvent(name, true, false);
		element.dispatchEvent(evt);

	}

	$('.btn.action-testNotification').click(function(e) {
		console.log('@testNotification');
		e.preventDefault();
		triggerEvent("testNotification");
	});

	$('.btn.action-testSendMessage1').click(function(e) {
		console.log('@testSendMessage1');
		e.preventDefault();
		messageHandler.sendMessage({foo: 1}, messageHandler.sampleCallback);
	});

	$('.btn.action-testSendMessage2').click(function(e) {
		console.log('@testSendMessage2');
		e.preventDefault();
		messageHandler.sendMessage({baz: 3}, messageHandler.sampleCallback);
	});

	$('.btn.action-testSendMessage3').click(function(e) {
		console.log('@testSendMessage3');
		e.preventDefault();
		messageHandler.sendMessage({mozilla: 3}, messageHandler.sampleCallback);
	});

	$('.btn.action-testSendMessage4').click(function(e) {
		console.log('@testSendMessage4');
		e.preventDefault();
		messageHandler.sendMessage({firefox: 4}, messageHandler.sampleCallback);
	});

	$('.btn.action-openAboutDialog').click(function(e) {
		console.log('$openAboutDialog');
		e.preventDefault();
		triggerEvent("openAboutDialog");
	});

	$('.btn.action-openExtensionsManager').click(function(e) {
		console.log('@openExtensionsManager');
		e.preventDefault();
		triggerEvent("openExtensionsManager");
	});

	$('.btn.action-checkForUpdates').click(function(e) {
		console.log('@checkForUpdates');
		e.preventDefault();
		triggerEvent("checkForUpdates");
	});


	$('.btn.action-reloadPage').click(function(e) {
		console.log('@reloadPage');
		e.preventDefault();
		location.reload();
	});

    return '\'Allo \'Allo!';
});