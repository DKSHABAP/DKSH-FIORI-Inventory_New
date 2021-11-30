/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"incture/com/ConnectClient_Inventory/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});