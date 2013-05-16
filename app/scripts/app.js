/*global define */
define(['jquery'], function($) {
	'use strict';

	function triggerEvent(name) {

		var element = document.createElement("foo-data-element");
		element.setAttribute("id", "foobar");
		element.setAttribute("attribute1", "foobar");
		document.documentElement.appendChild(element);

		var evt = document.createEvent("Events");
		evt.initEvent(name, true, false);
		element.dispatchEvent(evt);

	}

	$('.btn.action-openAboutDialog').click(function(e) {
		console.log('$openAboutDialog');
		e.preventDefault();
		triggerEvent("openAboutDialog");
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