	(function (w, d, s, l, i) {
		w[l] = w[l] || [];
		w[l].push({
			'gtm.start': new Date().getTime(),
			event: 'gtm.js'
		});
		var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s),
			dl = l != 'dataLayer' ? '&l=' + l : '';
		j.async = true;
		j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-WG969CM');
	sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"incture/com/ConnectClient_Inventory/model/models"
	], function (UIComponent, Device, models) {
		"use strict";

		return UIComponent.extend("incture.com.ConnectClient_Inventory.Component", {

			metadata: {
				manifest: "json",
				config: {
					fullWidth: true
				}
			},

			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init: function () {
				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);

				// enable routing
				this.getRouter().initialize();

				// set the device model
				this.setModel(models.createDeviceModel(), "device");
				var sAppID = "GTM-WG969CM";
				if (sAppID) {
					// ga('create', sAppID, 'auto');
					// ga('send', 'pageview', {
					// 	'page': location.pathname + this.cleanHash(location.hash),
					// 	'title': "Inventory"
					// });
					// ga('send', 'pageview', location.hash);
					// $(window).hashchange(function () {
					// 	ga('send', 'pageview', {
					// 		'page': location.pathname + this.cleanHash(location.hash),
					// 		'title': "Inventory"
					// 	});
					// 	ga('send', 'pageview', location.hash);
					// }.bind(this));
				}
			},

			cleanHash: function (sHash) {
				//Remove Guids and numbers from the hash to provide clean data
				// TODO:Remove everything between single quotes
				return sHash.replace(/((\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1})|(\d)/g,
					"");
			}
		});
	});