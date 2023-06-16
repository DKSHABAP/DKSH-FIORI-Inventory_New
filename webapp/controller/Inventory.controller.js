sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"../model/formatter",
	"sap/m/Token",
	"sap/ui/export/Spreadsheet"
], function (Controller, JSONModel, MessageBox, Fragment, MessageToast, formatter, Token, Spreadsheet) {
	"use strict";

	return Controller.extend("incture.com.ConnectClient_Inventory.controller.Inventory", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf incture.com.ConnectClient_Inventory.view.Inventory
		 */

		_doAjax: function (sUrl, sMethod, oData, bAbort, synVal) {
			if (bAbort && this.PrevAjax) {
				this.PrevAjax.abort();
			}
			if (oData) {
				oData = JSON.stringify(oData);
			}
			var xhr = $.ajax({
				url: sUrl,
				async: synVal, //++changing to synchronous/Jaya
				method: sMethod,
				headers: {
					'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
					'Content-Type': 'application/json'
				},
				data: oData || ""
			});
			if (bAbort) {
				this.PrevAjax = xhr;
			}
			return xhr;

		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		onAfterRendering: function () {
			this.resourceBundle = this.getView().getModel("i18n").getResourceBundle();

		},

		onInit: function () {
			var that = this;
			this.getView().setModel(new JSONModel(), "SeacrhParaModel");
			var PersonalizationModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(PersonalizationModel, "PersonalizationModel");
			var tabPersonalizationModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(tabPersonalizationModel, "tabPersonalizationModel");
			this._getUser();
			this.selectedBatchStkLot = [];
			// ga('send', 'pageview', "/InventoryTest");
			// this.postingDate = [];
			// this.salesOrgFromSelectedItems = [];
			this.SlocLevel = "";
			this.selectedSalesOrg = [];
			this.plantToSelectedItems = [];
			this.selectedObjects = [];
			this.selectedVendorMatFrom = [];
			this.selectedVendorMatTo = [];
			this.selectedMatFromItems = [];
			this.selectedMatToItems = [];
			this.SLocToSelectedItems = [];
			this.SLocFromSelectedItems = [];
			this.plantFromSelectedItems = [];
			this.MatGrpFromSelectedItems = [];
			this.MatGrpToSelectedItems = [];
			this.MatGrp4FromSelectedItems = [];
			this.MatGrp4ToSelectedItems = [];
			this.selectedMatDocItems = [];
			this.selectedBatch = [];
			this.selectedVendorMat = [];
			this.selectedMovType = [];
			this.selectedMovType = [];
			this.salesOrgToSelectedItems = [];
			this.salesOrgFromSelectedItems = [];
			this.plantToSelectedItems = [];
			this.getView().getModel("PersonalizationModel").setProperty("/selectVarVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/nameVarVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/enableCheckBox", false);
			this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.getView().getModel("PersonalizationModel").refresh();
			var baseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(baseModel, "baseModel");
			this.getView().getModel("baseModel").setProperty("/rowDesignATP", "Standard");
			this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
			this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
			this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
			this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelAllMaterial", true);
			this.getView().getModel("baseModel").setProperty("/batchLevel", false);
			this.getView().getModel("baseModel").setProperty("/blocked", false);
			//modify by XRAINERH on 30Aug2022 2:25PM
			//begin - STRY0017819.
			//this.getView().getModel("baseModel").setProperty("/sLocLevel", false);
			this.getView().getModel("baseModel").setProperty("/sLocLevel", true);
			//end - STRY0017819
			this.getView().getModel("baseModel").setProperty("/serialNo", false);
			this.getView().getModel("baseModel").setProperty("/excludeFda", false);
			this.getView().getModel("baseModel").setProperty("/salesUnit", false);
			this.getView().getModel("baseModel").setProperty("/baseUnit", true);
			this.getView().getModel("baseModel").setProperty("/unrestricted", false);
			this.getView().getModel("baseModel").setProperty("/QI", false);
			this.getView().getModel("baseModel").setProperty("/rawMaterial", false);
			this.getView().getModel("baseModel").setProperty("/IncBufferStockStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowSalesUqtyStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowAllStocksStkLotVal", true);
			this.getView().getModel("baseModel").setProperty("/onlyQIStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/onlyUnrestStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/showStock", false);
			this.getView().getModel("baseModel").setProperty("/showQTY", false);
			this.getView().getModel("baseModel").setProperty("/salesMat", false);
			this.getView().getModel("baseModel").setProperty("/invoiceTableLength", "");
			this.allMaterials = "allMaterials eq " + "'X'";
			this.byEndingPeriod = "byEndingPeriod eq " + "'X'";
			this.onlyShowAllStk = "allStock eq " + "'X'";
			this.getView().getModel("baseModel").setProperty("/EndingStckSelVenConsMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelchngeOwnStkMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelEndPrd", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelByAsDte", false);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/openVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
			this.getView().getModel("baseModel").refresh();
			that.salesOrgDataAccess = "No Access";
			that.SLOCDataAccess = "No Access";
			that.distrChannelDataAccess = "No Access";
			that.divisionDataAccess = "No Access";
			that.materialGroupDataAccess = "No Access";
			that.materialGroup4DataAccess = "No Access";
			that.plantDataAccess = "No Access";
			that.materialDataAccess = "No Access";
			// this.getView().getModel("baseModel").setProperty("/EndingStckAllMat", true);

		},

		// [+] START Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
		
		_setDefaultMatGrp: function () {
			var that = this;
			var oComponent = this.getOwnerComponent();
			var oModel = oComponent.getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
			var filters = [];
			var lang = "";
			var lang = "";
			if (sap.ushell) {
				if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
					lang = "2";
				} else {
					lang = "EN";
				}
			} else {
				lang = "EN";
			}
			lang = lang.toUpperCase();

			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
					new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, that.materialGroupDataAccess)
				],
				and: true
			});
			var oMultiInputold = that.byId(that._getId("MatGrpFrom"));
			oMultiInputold.destroyTokens();

			filters.push(oFilter);
			oModel.read("/ZSearchHelp_MaterialGroupSet", {
				async: false,
				filters: filters,
				success: function (oRetrievedResult, oResponse) {
					var DefMatGrpModel = new sap.ui.model.json.JSONModel({
						"results": oRetrievedResult.results
					});
					var oMultiInput = that.byId(that._getId("MatGrpFrom"));
					if (oRetrievedResult.results.length === 1) {
						// for (var i = 0; i < oRetrievedResult.results.length; i++) {
						that.MatGrpFromSelectedItems.push(oRetrievedResult.results[0].materialGroup);
						oMultiInput.addToken(new sap.m.Token({
							// text: oRetrievedResult.results[i].materialGroup
							text: oRetrievedResult.results[0].materialGroup
						}));
						that.MatGrp = "materialGroup eq" + "" + oRetrievedResult.results[0].materialGroup;
						//that.MatGrpFromSelectedItems = oRetrievedResult.results[i].materialGroup;
					}
				},
				error: function (oError) {
					/* do nothing */
				}
			});
		},

		_setDefaultPlant: function (tabName) {
			var that = this;
			var oComponent = this.getOwnerComponent();
			var oModel = oComponent.getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
			//console.log(oModel.getMetadata());
			var filters = [];
			var lang = "";
			var lang = "";
			if (sap.ushell) {
				if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
					lang = "2";
				} else {
					lang = "EN";
				}
			} else {
				lang = "EN";
			}
			lang = lang.toUpperCase();

			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
					new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, that.plantDataAccess)
				],
				and: true
			});
			filters.push(oFilter);
			oModel.read("/ZSearchHelp_PlantSet", {
				async: false,
				filters: filters,
				success: function (oRetrievedResult, oResponse) {
					var DefPlantModel = new sap.ui.model.json.JSONModel({
						"results": oRetrievedResult.results
					});
					var oMultiInput = that.byId(that._getId("PlantFrom"));
					oMultiInput.destroyTokens();
					if (oRetrievedResult.results.length === 1) {
						// for (var i = 0; i < oRetrievedResult.results.length; i++) {
						that.plantFromSelectedItems.push(oRetrievedResult.results[0].plant);
						oMultiInput.addToken(new sap.m.Token({
							// text: oRetrievedResult.results[i].plant
							text: oRetrievedResult.results[0].plant
						}));
						that.plant = "plant eq" + "" + oRetrievedResult.results[0].plant;
						//that.plantFromSelectedItems = oRetrievedResult.results[i].plant;
					}
				},
				error: function (oError) {
					/* do nothing */
				}
			});
			// }
		},

		_setDefaultSalesOrg: function () {
			var that = this;
			var oComponent = this.getOwnerComponent();
			var oModel = oComponent.getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
			//console.log(oModel.getMetadata());
			var filters = [];
			var lang = "";
			var lang = "";
			if (sap.ushell) {
				if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
					lang = "2";
				} else {
					lang = "EN";
				}
			} else {
				lang = "EN";
			}
			lang = lang.toUpperCase();

			var oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, lang),
					new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.EQ, that.salesOrgDataAccess)
				],
				and: true
			});
			filters.push(oFilter);
			oModel.read("/ZSearchHelp_SalesOrgSet", {
				async: false,
				filters: filters,
				success: function (oRetrievedResult, oResponse) {
					var DefSalesOrgModel = new sap.ui.model.json.JSONModel({
						"results": oRetrievedResult.results
					});
					var oMultiInput = that.byId(that._getId("SalesOrgFrom"));
					oMultiInput.destroyTokens();
					//oMultiInput.removeAllTokens();
					if (oRetrievedResult.results.length === 1) {
						// for (var i = 0; i < oRetrievedResult.results.length; i++) {
						that.salesOrgFromSelectedItems.push(oRetrievedResult.results[0].Salesorg);
						oMultiInput.addToken(new sap.m.Token({
							// text: oRetrievedResult.results[i].Salesorg
							text: oRetrievedResult.results[0].Salesorg
						}));
						that.SalesOrg = "Salesorg eq" + "" + oRetrievedResult.results[0].Salesorg;
						//that.SalesOrgFromSelectedItems = oRetrievedResult.results[i].Salesorg;
					}
				},
				error: function (oError) {
					/* do something */
				}
			});
		},
		// [+] END Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ

		// _getUser: function () {
		// 	var url = "/services/userapi/attributes";
		// 	var busyDialog = new sap.m.BusyDialog();
		// 	busyDialog.open();
		// 	this._doAjax(url, "GET", "", true).then(success => {
		// 		busyDialog.close();
		// 		var oUserModel = new sap.ui.model.json.JSONModel();
		// 		this.getView().setModel(oUserModel, "oUserModel");
		// 		this.getView().getModel("oUserModel").setProperty("/userID", success.name);
		// 		this.getView().getModel("oUserModel").setProperty("/email", success.email);
		// 		this._getUserDetail(success.name);
		// 		// this.getView().getModel("PersonalizationModel").setProperty("/variants", success.variantName);
		// 	}, fail => {
		// 		busyDialog.close();
		// 		MessageBox.error(fail.responseText);
		// 	});
		// },

		_getUser: function () {
			var url = "/services/userapi/attributes";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this._doAjax(url, "GET", "", true, true).then(success => {
				busyDialog.close();
				var oUserModel = new sap.ui.model.json.JSONModel();
				this.getView().setModel(oUserModel, "oUserModel");
				this.getView().getModel("oUserModel").setProperty("/userID", success.name);
				this.getView().getModel("oUserModel").setProperty("/email", success.email);
				this._getUserDetail(success.name);
				// this.getView().getModel("PersonalizationModel").setProperty("/variants", success.variantName);
			}, fail => {
				busyDialog.close();
				MessageBox.error(fail.responseText);
			});
		},

		_getUserDetail: function (userId) {
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oModel, "oModel");
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			oModel.loadData("/DKSHJavaService/userDetails/findAllRightsForUserInDomain/" + userId + "&cc", null, true);
			oModel.attachRequestCompleted(function (data) {
				busyDialog.close();
				if (!data.getParameters().errorobject) {
					var custAttribute = data.getSource().getData();
					if (custAttribute.message)
						that.allAccess = false;
					// var custAttribute = data.getSource().getData();
					if (custAttribute.ATR01 !== null) {
						that.salesOrgDataAccess = custAttribute.ATR01;

					}
					if (custAttribute.ATR02 !== null) {
						that.distrChannelDataAccess = custAttribute.ATR02;
						// that._distChannelList();
					}
					if (custAttribute.ATR03 !== null) {
						that.divisionDataAccess = custAttribute.ATR03;
					}
					if (custAttribute.ATR04 !== null) {
						that.materialGroupDataAccess = custAttribute.ATR04;
					}
					if (custAttribute.ATR05 !== null) {
						that.materialGroup4DataAccess = custAttribute.ATR05;
					}
					if (custAttribute.ATR10 !== null) {
						that.SLOCDataAccess = custAttribute.ATR10;
					}
					if (custAttribute.ATR09 !== null) {
						that.plantDataAccess = custAttribute.ATR09;
					}
					if (custAttribute.ATR07 !== null) {
						that.materialDataAccess = custAttribute.ATR07;
					}
				}
				// else {

				// 	sap.m.MessageBox.error(data.getParameters().errorobject.responseText);
				// }
			});
			oModel.attachRequestFailed(function (oEvent) {
				busyDialog.close();
				// if (oEvent.status == 409)
				that.allAccess = false;
				// else
				// sap.m.MessageBox.error(oEvent.getParameters().responseText);
			});

			// oLoggedInUserDetailModel.attachRequestCompleted(function (oEvent) {
			// data access control

			// },

		},

		handleBack: function () {
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			oCrossAppNavigator.toExternal({
				target: {
					semanticObject: "",
					action: ""
				}
			});
		},

		onPressDetailEndStk: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("endingStckTableModel").getObject();
				var oButton = oEvent.getSource();

				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_Inventory.Fragments.EndingStockPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var endingStckPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(endingStckPopoverModel, "endingStckPopoverModel");
						this._oPopover.getModel("endingStckPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var endingStckPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					// var  = new sap.ui.model.json.JSONModel();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					this._oPopover.setModel(endingStckPopoverModel, "endingStckPopoverModel");
					this._oPopover.getModel("endingStckPopoverModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressDetailExpStk: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("expiryStckTableModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_Inventory.Fragments.ExpiryStockPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var expiryStckPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(expiryStckPopoverModel, "expiryStckPopoverModel");
						this._oPopover.getModel("expiryStckPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var expiryStckPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					// var  = new sap.ui.model.json.JSONModel();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					this._oPopover.setModel(expiryStckPopoverModel, "expiryStckPopoverModel");
					this._oPopover.getModel("expiryStckPopoverModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressDetailMatMov: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("mavMovTableModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_Inventory.Fragments.MatMovPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var matMovPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(matMovPopoverModel, "matMovPopoverModel");
						this._oPopover.getModel("matMovPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var matMovPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					// var  = new sap.ui.model.json.JSONModel();
					this._oPopover.setModel(matMovPopoverModel, "matMovPopoverModel");
					this._oPopover.getModel("matMovPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		onPressDetailATP: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("ATPOverviewTableModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_Inventory.Fragments.ATPPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var ATPPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(ATPPopoverModel, "ATPPopoverModel");
						this._oPopover.getModel("ATPPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						// this._oPopover.bindElement("/ATPOverviewTableModel/oEvent.getSource().getBindingContext("ATPOverviewTableModel").getPath()");
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}

				}
			}
		},

		onTabSelection: function (oEvent) {
			this.selectedTab = oEvent.getParameters().selectedKey;
			if (this.selectedTab !== "KeySelCust") {
				this.clearTabData();
				this._getPersonalizationDetails(this.selectedTab);
			}
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
			this.getView().getModel("baseModel").refresh();
		},

		onPressCollapse: function (oEvent) {
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
			this.getView().getModel("baseModel").setProperty("/openVisiblity", true);
			this.getView().getModel("baseModel").refresh();
		},

		onPressOpen: function (oEvent) {
			this.getView().getModel("baseModel").setProperty("/SearchVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/CollapseVisiblity", true);
			this.getView().getModel("baseModel").setProperty("/openVisiblity", false);
			this.getView().getModel("baseModel").refresh();
		},

		onReportSelection: function (oEvent) {
			try {
				this.selectedTab = oEvent.getSource().getSelectedKey();
				this.getView().byId("ID_TAB_BAR_PROV_APP").setSelectedKey(oEvent.getSource().getSelectedKey());
				if (this.selectedTab !== "KeySelCust") {
					this.clearTabData();
					this._getPersonalizationDetails(this.selectedTab);
				}
			} catch (e) {
				MessageBox.error("Error report selection");
				console.log(e);
				return;
			}
		},

		onVariantEdit: function () {

			var PersonalizationModel = this.FilterPersonalization.getModel("FilterPersonalization");
			if (PersonalizationModel.getData().results.personalizationData.currentVariant === "Default") {
				MessageToast.show("Cannot edit default variant");
				return;
			}
			PersonalizationModel.setProperty("/results/action", "Edit");
			PersonalizationModel.setProperty("/results/okPersBtnVisible", false);
			// this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", false);
			PersonalizationModel.setProperty("/results/enableCheckBox", true);
			PersonalizationModel.setProperty("/results/savePersBtnVisible", true);
			PersonalizationModel.setProperty("/results/deletePersBtnVisible", true);
			PersonalizationModel.setProperty("/results/selectVarVisible", true);
			PersonalizationModel.setProperty("/results/nameVarVisible", false);
			PersonalizationModel.refresh();
			this.onSelectvarian();
			MessageToast.show("Select a variant to edit");
		},

		onVariantCreate: function () {

			var PersonalizationModel = this.FilterPersonalization.getModel("FilterPersonalization");
			PersonalizationModel.setProperty("/results/action", "Create");
			PersonalizationModel.setProperty("/results/selectVarVisible", false);
			PersonalizationModel.setProperty("/results/nameVarVisible", true);
			PersonalizationModel.setProperty("/results/enableCheckBox", true);
			PersonalizationModel.setProperty("/results/okPersBtnVisible", false);
			// this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", false);
			PersonalizationModel.setProperty("/results/savePersBtnVisible", true);
			PersonalizationModel.setProperty("/results/newVariantName", "");
			var fieldData = PersonalizationModel.getData().results.personalizationData.userPersonaDto;
			for (var i = 0; i < fieldData.length; i++) {
				fieldData[i].status = false;
			}
			PersonalizationModel.setProperty("/results/personalizationData/userPersonaDto", fieldData);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
		},

		onChangeOnlyQIStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyQI = "onlyStockInspection eq " + "'X'";
			} else {
				this.onlyQI = undefined;
			}
		},
		onChangeShowAllStocksStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyShowAllStk = "allStock eq " + "'X'";
			} else {
				this.onlyShowAllStk = undefined;
			}
		},

		handleChangeExpDateFrom: function (oEvent) {
			if (oEvent.getParameters().valid) {
				var date = this.getView().getModel("baseModel").getData().expDateFrom;
				if (date === NaN || date === "") {
					date = "";
				}
				var d = this.formatter.dateTimeFormat(date);

				// var d = new Date(date).getFullYear().toString() + new Date(date).getMonth().toString() + new Date(date).getDate().toString();
				// this.expiryDate = "( expiredDate ge datetime" + "'" + d + "'";
				this.expiryDateFrom = d;
			} else {
				this.getView().getModel("baseModel").getData().expDateFrom = null;
			}
		},

		handleChangeExpDateTo: function (oEvent) {
			if (!this.expiryDateFrom) {
				MessageToast.show("Add Expiry Date from");
				return;
			} else {
				if (oEvent.getParameters().valid) {
					/* this.getView().getModel("baseModel").getData().postingDateValueStateTo = "None";*/
					var date = this.getView().getModel("baseModel").getData().expDateTo;
					if (date === NaN || date === "") {
						date = "";
					}

					var d = this.formatter.dateTimeFormat(date);
					// var d = new Date(date).getFullYear().toString() + new Date(date).getMonth().toString() + new Date(date).getDate().toString();
					// this.expiryDate = this.expiryDate + " and " + "expiredDate le datetime" + "'" + d + "' )";
					this.expiryDateTo = d;
				} else {
					this.getView().getModel("baseModel").getData().expDateTo = null;
				}
			}
		},

		onChangeShowSalesUqtyStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyShowSalesUQ = "salesUnitQty eq " + "'X'";
			} else {
				this.onlyShowSalesUQ = undefined;
			}
		},
		onChangeIncBufferStockStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyChBufferStk = "bufferStock eq " + "'X'";
			} else {
				this.onlyChBufferStk = undefined;
			}
		},

		onChangeBatchLevelStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.BatchNum = "batchNum  eq " + "'X'";
			} else {
				this.BatchNum = undefined;
			}
		},

		onSelRawMat: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.RawMat = "rawMaterial  eq " + "'X'";
			} else {
				this.RawMat = undefined;
			}
		},

		onSelShowQty: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.showQty = "onOrderQty  eq " + "'X'";
			} else {
				this.showQty = undefined;
			}
		},

		onIncSalesMat: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.SalesMat = "salesMaterial  eq " + "'X'";
			} else {
				this.SalesMat = undefined;
			}
		},
		onShowZeroStk: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.ZeroStk = "zeroStock  eq " + "'X'";
			} else {
				this.ZeroStk = undefined;
			}
		},

		onChangeOnlyQIStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyQI = "onlyStockInspection eq " + "'X'";
			} else {
				this.onlyQI = undefined;
			}
		},

		///

		onChangeShowAllStocksStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyShowAllStk = "allStock eq " + "'X'";
			} else {
				this.onlyShowAllStk = undefined;
			}
		},

		onChangeShowSalesUqtyStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyShowSalesUQ = "salesUnitQty eq " + "'X'";
			} else {
				this.onlyShowSalesUQ = undefined;
			}
		},
		onChangeIncBufferStockStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyChBufferStk = "bufferStock eq " + "'X'";
			} else {
				this.onlyChBufferStk = undefined;
			}
		},

		onChangeBatchLevelStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.BatchNum = "batchNum  eq " + "'X'";
			} else {
				this.BatchNum = undefined;
			}
		},

		onSelRawMat: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.RawMat = "rawMaterial  eq " + "'X'";
			} else {
				this.RawMat = undefined;
			}
		},

		onSelShowQty: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.showQty = "onOrderQty  eq " + "'X'";
			} else {
				this.showQty = undefined;
			}
		},

		onIncSalesMat: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.SalesMat = "salesMaterial  eq " + "'X'";
			} else {
				this.SalesMat = undefined;
			}
		},
		onShowZeroStk: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.ZeroStk = "zeroStock  eq " + "'X'";
			} else {
				this.ZeroStk = undefined;
			}
		},

		onChangeCheckbox: function (oEvent) {
			var personalizationData = this.FilterPersonalization.getModel("FilterPersonalization").getData().results.personalizationData.userPersonaDto;
			var path = parseInt(oEvent.getSource().getBindingContext("FilterPersonalization").getPath().split("/")[3]);
			if (oEvent.getSource().getSelected() === true) {
				for (var j = 0; j < personalizationData.length; j++) {
					if (j === path) {
						personalizationData[j].status = "true";
					}
					if (this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Create") {
						personalizationData[j].id = "";
					}
					this.selectedObjects = personalizationData;
				}
			} else {
				for (var i = 0; i < personalizationData.length; i++) {
					if (i === path) {
						personalizationData[i].status = "false";
					}
				}
				this.selectedObjects = personalizationData;
			}
		},

		onSelectvarian: function (oEvent) {
			// if(this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Edit" && that.getView().getModel("PersonalizationModel").getProperty("/personalizationData/currentVariant") === "Default"){
			// 	MessageToast.show("Cannot edit default variant");
			// 	return;
			// }
			var screen = "Web";
			if (sap.ui.Device.system.phone === true) {
				screen = "Phone";
			}
			var that = this;
			var pID = this.getView().getModel("oUserModel").getData().userID;
			this.selectedTab = this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey();
			if (oEvent) {
				var varinatName = oEvent.getSource().getSelectedKey();
			} else {
				var varinatName = that.getView().getModel("PersonalizationModel").getProperty("/personalizationData/currentVariant");
			}
			var url = "/DKSHJavaService/variant/getvariantLists/" + pID + "/" + this.selectedTab + "/" + varinatName + "/" + screen;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this._doAjax(url, "GET").then(success => {
				busyDialog.close();
				var success = success.userPersonaDto;
				if (this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/action") === "Edit") {
					that.getView().getModel("PersonalizationModel").setProperty("/personalizationData/userPersonaDto", success);
					that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/personalizationData/userPersonaDto",
						success);
					that.FilterPersonalization.getModel("FilterPersonalization").refresh();
					that.getView().getModel("PersonalizationModel").refresh();
					if (that.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/personalizationData/currentVariant") ===
						"Default") {
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/action", "");
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/savePersBtnVisible", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/deletePersBtnVisible", false);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
						that.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
						MessageToast.show("Cannot edit default variant");
						that.FilterPersonalization.getModel("FilterPersonalization").refresh();
					}
				} else {
					// that.tabFrag.getModel("tabPersonalizationModel").setProperty("/personalizationData/userPersonaDto", success);

					that.getView().getModel("PersonalizationModel").setProperty("/personalizationData/userPersonaDto", success);
					that.FilterPersonalization.getModel("FilterPersonalization").setProperty("results/personalizationData/userPersonaDto",
						success);
					that.FilterPersonalization.getModel("FilterPersonalization").refresh();
					that.getView().getModel("PersonalizationModel").refresh();
					// that.tabFrag.getModel("tabPersonalizationModel").refresh();
					// that.FilterPersonalization.close();
				}
			}, fail => {
				busyDialog.close();
				MessageBox.error(fail.responseText);
				// that.onPersonlizationClose();
			});
		},

		onPersonlizationClose: function () {
			var that = this;
			var PersonalizationModel = this.getView().getModel("PersonalizationModel");
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.FilterPersonalization", this);
				this.getView().addDependent(this.FilterPersonalization);
			}
			var FilterPersonalization = new sap.ui.model.json.JSONModel({
				"results": this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(FilterPersonalization, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.selectedObjects = [];
			this.getView().getModel("PersonalizationModel").refresh();
			this.FilterPersonalization.close();
			that._getPersonalizationDetails(this.selectedTab);
		},

		onVariantOK: function () {
			var that = this;
			var PersonalizationModel = this.getView().getModel("PersonalizationModel");
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.FilterPersonalization", this);
				this.getView().addDependent(this.FilterPersonalization);
			}
			var FilterPersonalization = new sap.ui.model.json.JSONModel({
				"results": this.getView().getModel("PersonalizationModel").getData()
			});
			this.FilterPersonalization.setModel(FilterPersonalization, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.selectedObjects = [];
			this.getView().getModel("PersonalizationModel").refresh();
			this.FilterPersonalization.close();
		},

		// valueHelpRequestSalesOrg: function (oEvent) {
		// 	this.salesOrgPlaceholder = oEvent.getSource().getPlaceholder();
		// 	var that = this;
		// 	if (that.salesOrgDataAccess === "No Access") {
		// 		MessageToast.show("NO DATA ACCESS!");
		// 	} else {
		// 		// var that = this;
		// 		if (!that.salesOrg) {
		// 			that.salesOrg = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.SalesOrg", that);
		// 			that.getView().addDependent(that.salesOrg);
		// 			var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
		// 			// var filters = [];

		// 			// var oFilter = new sap.ui.model.Filter({
		// 			// 	filters: [

		// 			// 		new sap.ui.model.Filter("SalesOrg", sap.ui.model.FilterOperator.EQ, "'" + that.salesOrgDataAccess+ "'")
		// 			// 	],
		// 			// 	and: true
		// 			// });
		// 			// filters.push(oFilter);
		// 			var busyDialog = new sap.m.BusyDialog();
		// 			busyDialog.open();
		// 			oDataModel.read("/ZSearchHelp_SalesOrgSet", {
		// 				async: false,
		// 				// filters: filters,
		// 				success: function (oData, oResponse) {
		// 					busyDialog.close();
		// 					var salesOrgModel = new sap.ui.model.json.JSONModel({
		// 						"results": oData.results
		// 					});
		// 					if (oData.results.length === 1) {
		// 						var oMultiInput = this.byId(this._getId("SalesOrgFrom"));
		// 						oMultiInput.addToken(new Token({
		// 							text: oData.results[0].salesOrg
		// 						}));
		// 						this.SalesOrg = "salesOrg eq" + " " + oData.results[0].salesOrg;
		// 					}
		// 					that.salesOrg.setModel(salesOrgModel, "salesOrgModel");
		// 					that.salesOrg.open();
		// 				},
		// 				error: function (error) {
		// 					busyDialog.close();
		// 					var errorMsg = "";
		// 					if (error.statusCode === 504) {
		// 						errorMsg = "Request timed-out. Please try again!";
		// 						that.errorMsg(errorMsg);
		// 					} else {
		// 						errorMsg = JSON.parse(error.responseText);
		// 						errorMsg = errorMsg.error.message.value;
		// 						that.errorMsg(errorMsg);
		// 					}
		// 				}
		// 			});
		// 		} else {
		// 			that.salesOrg.open();
		// 		}
		// 	}
		// },

		valueHelpRequestPlant: function (oEvent) {
			var that = this;
			this.plantPlaceholder = oEvent.getSource().getPlaceholder();
			if (that.plantDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				var that = this;
				if (!that.plantFrag) {
					that.plantFrag = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.plant", that);
					that.getView().addDependent(that.plantFrag);
					var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var filters = [];
					var lang = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							lang = "2";
						} else {
							lang = "EN";
						}
					} else {
						lang = "EN";
					}
					lang = lang.toUpperCase();
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
							new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, this.plantDataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZSearchHelp_PlantSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var plantModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							// if (oData.results.length === 1) {
							// 	var oMultiInput = that.byId(that._getId("PlantFrom"));
							// 	oMultiInput.addToken(new Token({
							// 		text: oData.results[0].plant
							// 	}));
							// 	this.plant = "plant eq" + " " + oData.results[0].plant;
							// 	this.plantFromSelectedItems = oData.results[0].plant;
							// }
							that.plantFrag.setModel(plantModel, "plantModel");
							that.plantFrag.open();
						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.plantFrag.open();
				}
			}
		},

		valueHelpRequestMaterialGrp4: function (oEvent) {
			this.matGrp4Placeholder = oEvent.getSource().getPlaceholder();
			var that = this;
			if (that.materialGroup4DataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				// var that = this;
				if (!that.materialGroup4) {
					that.materialGroup4 = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.materialGroup4", that);
					that.getView().addDependent(that.materialGroup4);
					var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var filters = [];
					var lang = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							lang = "2";
						} else {
							lang = "EN";
						}
					} else {
						lang = "EN";
					}
					lang = lang.toUpperCase();
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
							new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.EQ, that.materialGroup4DataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZSearchHelp_MaterialGroup4Set", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var materialGrp4Model = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							// if (oData.results.length === 1) {
							// 	var oMultiInput = that.byId(that._getId("MatGrp4From"));
							// 	oMultiInput.addToken(new Token({
							// 		text: oData.results[0].materialGroup4
							// 	}));
							// 	this.MatGrp4 = "materialGroup4 eq" + " " + oData.results[0].materialGroup4;
							// 	this.MatGrp4FromSelectedItems = oData.results[0].materialGroup4;
							// }

							that.materialGroup4.setModel(materialGrp4Model, "materialGrp4Model");
							that.materialGroup4.open();

						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.materialGroup4.open();
				}
			}
		},

		valueHelpRequestMaterialGrp: function (oEvent) {
			this.matGrpPlaceholder = oEvent.getSource().getPlaceholder();
			var that = this;
			if (that.materialGroupDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				// var that = this;
				if (!that.MaterialGroup) {
					that.MaterialGroup = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.MaterialGroup", that);
					that.getView().addDependent(that.MaterialGroup);
					var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var filters = [];
					var lang = "";
					var lang = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							lang = "2";
						} else {
							lang = "EN";
						}
					} else {
						lang = "EN";
					}
					lang = lang.toUpperCase();

					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
							new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.EQ, that.materialGroupDataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZSearchHelp_MaterialGroupSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var MaterialGroupModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							that.MaterialGroup.setModel(MaterialGroupModel, "MaterialGroupModel");
							that.MaterialGroup.open();
						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.MaterialGroup.open();
					that.MatGrpFromSelectedItems;
				}
			}
		},

		valueHelpRequestStoLoc: function (oEvent) {
			var allPlant = "";
			var plant;
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV/ZSearchHelp_SlocSet?$filter=";
			// =plant eq ('CN05@CN21')&$format=json";
			// if (this.plantFromSelectedItems.length > 0) {
			// 	for (var i = 0; i < this.plantFromSelectedItems.length; i++) {
			// 		if (allPlant.length === 0) {
			// 			allPlant = this.plantFromSelectedItems[i];
			// 		} else {
			// 			allPlant = allPlant + "@" + this.plantFromSelectedItems[i];
			// 		}
			// 	}
			// 	for (var j = 0; j < this.plantToSelectedItems.length; j++) {
			// 		if (allPlant.length === 0) {
			// 			allPlant = this.plantToSelectedItems[i];
			// 		} else {
			// 			allPlant = allPlant + "@" + this.plantToSelectedItems[i];
			// 		}
			// 	}
			// } else {
			// 	allPlant = this.plantDataAccess;
			// }
			// var plant = this.
			if (this.plantFromSelectedItems.length === 0) {
				url = url + "plant eq (" + "'" + this.plantDataAccess + "'" + ")";
				// SLoc = "storageLocation eq " + "'" + " " + "'";
			} else if (this.plantFromSelectedItems.length === 1) { /*range logic*/
				if (this.plantToSelectedItems.length === 1) {
					plant = "( plant ge " + "'" + this.plantFromSelectedItems[0] + "'" + " and " + "plant le " + "'" + this.plantToSelectedItems[
							0] +
						"' )";
				} else {
					plant = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 97) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				for (var i = 0; i < this.plantFromSelectedItems.length; i++) {
					if (plant === undefined) {
						plant = "(plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
					} else {
						if (i === this.plantFromSelectedItems.length - 1) {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "')";
						} else {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 97) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			}

			var that = this;
			if (that.SLOCDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				this.SLocPlaceholder = oEvent.getSource().getPlaceholder();

				// if (!that.StorageLocation) {
				that.StorageLocation = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.StorageLocation", that);
				that.getView().addDependent(that.StorageLocation);
				var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
				var filters = [];
				var lang = "";
				if (sap.ushell) {
					if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
						lang = "2";
					} else {
						lang = "EN";
					}
				} else {
					lang = "EN";
				}
				lang = lang.toUpperCase();
				// var oFilter = new sap.ui.model.Filter({
				// 	filters: [
				// 		new sap.ui.model.Filter("language", sap.ui.model.FilterOperator.EQ, lang),
				// 		new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator.EQ, that.SLOCDataAccess),
				// 		new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.EQ, plant),
				// 	],
				// 	and: true
				// });
				// filters.push(oFilter);
				url = url + " and " + "storageLocation eq " + "'" + that.SLOCDataAccess + "'" + " and " + "language eq " + "'" + lang + "'" +
					"&$format=json";
				var busyDialog = new sap.m.BusyDialog();
				busyDialog.open();
				$.ajax({
					url: url,
					method: "GET",
					async: true,
					success: function (result, xhr, data) {
						busyDialog.close();
						var stoLocModel = new sap.ui.model.json.JSONModel({
							"results": result.d.results
						});
						// 			// if (oData.results.length === 1) {
						// 			// 	var oMultiInput = that.byId(that._getId("SLocFrom"));
						// 			// 	oMultiInput.addToken(new Token({
						// 			// 		text: oData.results[0].storageLocation
						// 			// 	}));
						// 			// 	this.Sloc = "storageLocation eq" + " " + oData.results[0].storageLocation;
						// 			// 	this.SLocFromSelectedItems = oData.results[0].storageLocation;
						// 			// }
						that.StorageLocation.setModel(stoLocModel, "stoLocModel");
						that.StorageLocation.open();
					},
					error: function (result, xhr, data) {
						busyDialog.close();
						var errorMsg = "";
						if (result.status === 504) {
							errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
							that.errorMsg(errorMsg);
						} else {
							errorMsg = result.responseJSON.error.message.value;
							// errorMsg = errorMsg.error.message.value;
							that.errorMsg(errorMsg);
						}
					}
				});
				// 	oDataModel.read("/ZSearchHelp_SlocSet", {
				// 		async: false,
				// 		// filters: filters,
				// 		url : url,
				// 		method: "GET",
				// 		success: function (oData, oResponse) {
				// 			busyDialog.close();
				// 			var stoLocModel = new sap.ui.model.json.JSONModel({
				// 				"results": oData.results
				// 			});
				// 			// if (oData.results.length === 1) {
				// 			// 	var oMultiInput = that.byId(that._getId("SLocFrom"));
				// 			// 	oMultiInput.addToken(new Token({
				// 			// 		text: oData.results[0].storageLocation
				// 			// 	}));
				// 			// 	this.Sloc = "storageLocation eq" + " " + oData.results[0].storageLocation;
				// 			// 	this.SLocFromSelectedItems = oData.results[0].storageLocation;
				// 			// }
				// 			that.StorageLocation.setModel(stoLocModel, "stoLocModel");
				// 			that.StorageLocation.open();
				// 		},
				// 		error: function (error) {
				// 			busyDialog.close();
				// 			var errorMsg = "";
				// 			if (error.statusCode === 504) {
				// 				errorMsg = "Request timed-out. Please try again!";
				// 				that.errorMsg(errorMsg);
				// 			} else {
				// 				errorMsg = JSON.parse(error.responseText);
				// 				errorMsg = errorMsg.error.message.value;
				// 				that.errorMsg(errorMsg);
				// 			}
				// 		}
				// 	});
				// } else {
				// 	that.StorageLocation.open();
				// }
			}
		},

		onVariantSave: function (oEvent) {
			if (this.selectedObjects.length === 0) {
				MessageToast.show("Save only after edit");
				return;
			}
			var that = this;
			var selected = oEvent.getSource();
			var PersonalizationModel = this.FilterPersonalization.getModel("FilterPersonalization");
			if (PersonalizationModel.getProperty("/results/action") === "Create") {
				if (PersonalizationModel.getData().results.newVariantName !== undefined && PersonalizationModel.getData().results.newVariantName !==
					"") {
					for (var j = 0; j < PersonalizationModel.getData().results.personalizationData.variantName.length; j++) {
						if (PersonalizationModel.getData().results.personalizationData.variantName[j].name === PersonalizationModel.getData().results.newVariantName) {
							this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/varinatNameValueState", "Error");
							MessageBox.error("New variant name cannot be same as the existing variant");
							return;
						}
					}

					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/varinatNameValueState", "None");
					var VariantName = PersonalizationModel.getData().results.newVariantName;
					for (var i = 0; i < this.selectedObjects.length; i++) {
						this.selectedObjects[i].variantId = VariantName;
					}

				} else {
					this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/varinatNameValueState", "Error");
					sap.m.MessageBox.error("Enter a Variant Name");
					return;
				}
			}

			var pID = this.getView().getModel("oUserModel").getData().userID;
			var tab = this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey();
			var varinatName;
			var payload = {
				"varaiantObject": this.selectedObjects,
				"userId": pID,
				"applicationId": tab,
				"varaintId": this.selectedObjects[0].variantId
			};
			var url = "/DKSHJavaService/variant/UpdateVariant";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this._doAjax(url, "PUT", payload).then(success => {
				busyDialog.close();
				this.selectedObjects = [];
				PersonalizationModel.setProperty("/results/selectVarVisible", true);
				PersonalizationModel.setProperty("/results/nameVarVisible", false);
				PersonalizationModel.setProperty("/results/enableCheckBox", false);
				PersonalizationModel.setProperty("/results/savePersBtnVisible", false);
				PersonalizationModel.setProperty("/results/okPersBtnVisible", true);
				// this.getView().getModel("PersonalizationModel").setProperty("/", true);
				that.FilterPersonalization.getModel("FilterPersonalization").refresh();

				that.FilterPersonalization.close();
				// var message = oNewEvent.getSource().getData().message;
				sap.m.MessageBox.success("Created Successfully!", {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (sAction) {

						if (sAction === MessageBox.Action.OK) {

							that._getPersonalizationDetails(tab);
						}
					}
				});
				// this.EndingStock.getModel("PersonalizationModel").setProperty("/fields", success.userPersonaDto);
				// this.getView().getModel("PersonalizationModel").setProperty("/fields", success.userPersonaDto);
				// this.getView().getModel("PersonalizationModel").setProperty("/variants", success.variantName);
				// this.EndingStock.getModel("PersonalizationModel").setProperty("/variants", success.variantName);
				// this.EndingStock.getModel("PersonalizationModel").refresh();
				// // this.getView().getModel("baseModel").setProperty("/enableCheckBox", false);
				// this.getView().getModel("PersonalizationModel").refresh();
			}, fail => {
				busyDialog.close();
				MessageBox.error(fail.responseText);
				that.FilterPersonalization.close();
			});
		},

		onVariantDelete: function () {
			var that = this;
			var pID = this.getView().getModel("oUserModel").getData().userID;
			// var tab = this.getView().byId("ID_TAB_BAR_PROV_APP").getSelectedKey();
			var data = this.FilterPersonalization.getModel("FilterPersonalization").getProperty("/results/personalizationData/userPersonaDto");
			var varinatName;
			var payload = {
				"varaiantObject": data,
				"userId": pID,
				"applicationId": this.selectedTab,
				"varaintId": this.FilterPersonalization.getModel("FilterPersonalization").getProperty(
					"/results/personalizationData/userPersonaDto")[0].variantId
			};
			var url = "/DKSHJavaService/variant/deleteVariant";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this._doAjax(url, "DELETE", payload).then(success => {
				busyDialog.close();
				that.FilterPersonalization.close();
				// var message = oNewEvent.getSource().getData().message;
				sap.m.MessageBox.success(success.name, {
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.OK) {
							that._getPersonalizationDetails(that.selectedTab);
						}
					}
				});
				// this.getView().getModel("baseModel").setProperty("/enableCheckBox", false);
				// this.getView().getModel("PersonalizationModel").refresh();
			}, fail => {
				that._getPersonalizationDetails(that.selectedTab);
				that.FilterPersonalization.close();
				busyDialog.close();
				MessageBox.error(fail.responseText);
			});
		},

		_getPersonalizationDetails: function (tabName) {
			var that = this;
			var screen = "Web";
			if (sap.ui.Device.system.phone === true) {
				screen = "Phone";
			}
			var url = "/DKSHJavaService/variant/getVariant";
			var payload = {
				"userId": this.getView().getModel("oUserModel").getData().userID,
				"appId": tabName,
				"runType": screen,
				"emailId": this.getView().getModel("oUserModel").getData().email
			};
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this._doAjax(url, "POST", payload, true, false).then(success => {
				busyDialog.close();
				if (success.userPersonaDto !== null) {
					that.getView().getModel("PersonalizationModel").setProperty("/personalizationData", success);
					that.getView().getModel("tabPersonalizationModel").setProperty("/personalizationData", success);
					// this.tabFrag.setModel(that.getView().getModel("tabPersonalizationModel"), "tabPersonalizationModel");
					// this.tabFrag.getModel("tabPersonalizationModel").refresh();
					that.getView().getModel("tabPersonalizationModel").refresh(); // that.EndingStock.getModel("PersonalizationModel").setProperty("/fields", success.userPersonaDto);
					that.getView().getModel("PersonalizationModel").refresh();
					that.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
					that.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
					that.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
					that.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
					that.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
					that.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
					that.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");

					that.getView().getModel("PersonalizationModel").refresh();
				}
			}, fail => {
				busyDialog.close();
				MessageBox.error(fail.responseText);
			});
			// [+] START Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
			this._setDefaultMatGrp();
			if (tabName != "keyATPOverviewEnquiry") {
				this._setDefaultPlant(tabName);
			}
			if (tabName === "keyATPOverviewEnquiry" || tabName === "keyStkLotView") {
				this._setDefaultSalesOrg();
			}
			// [+] END Modification: STRY0014745:MY Enhancements Defaulting mandatory fields -	JAYAMALARJ
		},

		onPressPersonalization: function (oEvent) {
			var that = this;
			var PersonalizationModel = this.getView().getModel("PersonalizationModel");
			if (!this.FilterPersonalization) {
				this.FilterPersonalization = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.FilterPersonalization", this);
				this.getView().addDependent(this.FilterPersonalization);
			}
			var FilterPersonalization = new sap.ui.model.json.JSONModel({
				"results": this.getView().getModel("PersonalizationModel").getData()
			});
			debugger;
			//modify by XRAINERH 29Dec2022 09:12AM
			//begin - STRY0019045
			try {
				if ( FilterPersonalization.oData.results.personalizationData.userPersonaDto !== undefined ){
					for (var i = 0; i < FilterPersonalization.oData.results.personalizationData.userPersonaDto.length; i++){
						if (FilterPersonalization.oData.results.personalizationData.userPersonaDto[i].enabledKey.trim() == "QI Stock" ){
							FilterPersonalization.oData.results.personalizationData.userPersonaDto[i].enabledKey = "Quality Inspection Stock";
						}
					}
				}
			} catch (e) {
			}
			//end - STRY0019045
			this.FilterPersonalization.setModel(FilterPersonalization, "FilterPersonalization");
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/enableCheckBox", false);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/selectVarVisible", true);
			this.FilterPersonalization.getModel("FilterPersonalization").setProperty("/results/nameVarVisible", false);
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.getModel("FilterPersonalization").refresh();
			this.FilterPersonalization.open();
		},
		// this.byId("EndStckPlantId");

		onConfirmChangePlant: function (oEvent) {
			// to logic
			this.getView().getModel("baseModel").getData().EndingStckplantValueState = "None";
			this.getView().getModel("baseModel").refresh();
			oEvent.getSource().getBinding("items").filter([]);

			if (this.plantPlaceholder === "To") {
				if (this.plantFromSelectedItems.length === 0) {
					MessageToast.show("Add plant from");
					return;
				}
				this.plantToSelectedItems = [];
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("PlantTo"));
					oMultiInput.destroyTokens();
					if (oEvent.getParameters().selectedContexts.length > 1) {
						MessageToast.show("Can select only one item");
					}
					// if (parseInt(this.plantFromSelectedItems[0]) < parseInt(oEvent.getParameters().selectedContexts[0].getObject().plant)) {
					this.plantToSelectedItems.push(oEvent.getParameters().selectedContexts[0].getObject().plant);
					oMultiInput.addToken(new Token({
						text: this.plantToSelectedItems[0]
					}));
					// } else {
					// 	MessageToast.show("Select a value greater than 'From'");
					// }
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
			//from logic and other
			else {
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("PlantFrom"));
					//first push
					if (this.plantFromSelectedItems.length === 0) {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
							// this.getView().getModel("baseModel").getData().EndingStckplant.push(oEvent.getParameters().selectedContexts[i].getObject().plant);
							this.plantFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().plant);
							oMultiInput.addToken(new Token({
								text: oEvent.getParameters().selectedContexts[i].getObject().plant
							}));
							// return new Token({text: oEvent.getParameters().selectedContexts[i].getObject().plant});
						}
					} else {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
							for (var j = 0; j < this.plantFromSelectedItems.length; j++) {
								if (this.plantFromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject().plant) ===
									false) {
									this.plantFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().plant);
									oMultiInput.addToken(new Token({
										text: oEvent.getParameters().selectedContexts[i].getObject().plant
									}));
								} else {
									// MessageToast.show("Cannot add the same item");
								}
							}
						}
					}
					if (this.plantFromSelectedItems.length === 1) {
						this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
						this.getView().getModel("baseModel").refresh();
					} else {
						this.getView().getModel("baseModel").setProperty("/enablePlantTo", false);
						this.getView().getModel("baseModel").refresh();
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
		},

		onDeleteEndStckPlant: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("PlantTo"));
				oMultiInput.destroyTokens();
				this.plantToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("PlantFrom"));
					oMultiInput.destroyTokens();
					this.plant = undefined;
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.plantFromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.plantFromSelectedItems[i]) {
							this.plantFromSelectedItems.splice(i, 1);
						}
					}
					if (this.plantFromSelectedItems.length > 0) {
						for (var j = 0; j < this.plantFromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.plantFromSelectedItems[j]
							}));
							if (this.plantFromSelectedItems.length <= 1) {
								// this.plant = "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
								this.getView().getModel("baseModel").refresh();
							} else {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
								this.getView().getModel("baseModel").refresh();
								// this.plant = this.plant + " " + "or" + " " + "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
							}
						}
					}
				} else {
					this.plantFromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}
		},

		onConfirmChangeSalesOrg: function (oEvent) {
			this.getView().getModel("baseModel").getData().SalesOrgValueState = "None";
			oEvent.getSource().getBinding("items").filter([]);
			// to logic
			if (this.salesOrgPlaceholder === "To") {
				if (this.salesOrgFromSelectedItems.length === 0) {
					MessageToast.show("Add sales org from");
					return;
				}
				this.salesOrgToSelectedItems = [];

				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("SalesOrgTo"));
					oMultiInput.destroyTokens();
					if (oEvent.getParameters().selectedContexts.length > 1) {
						MessageToast.show("Can select only one item");
					}
					if (parseInt(this.salesOrgFromSelectedItems[0]) < parseInt(oEvent.getParameters().selectedContexts[0].getObject().Salesorg)) {
						this.salesOrgToSelectedItems.push(oEvent.getParameters().selectedContexts[0].getObject().Salesorg);
						oMultiInput.addToken(new Token({
							text: this.salesOrgToSelectedItems[0]
						}));
					} else {
						MessageToast.show("Select value greater than 'From' ");
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
			//from logic and other
			else {

				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("SalesOrgFrom"));
					//first push
					if (this.salesOrgFromSelectedItems.length === 0) {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
							// this.getView().getModel("baseModel").getData().EndingStckplant.push(oEvent.getParameters().selectedContexts[i].getObject().plant);
							this.salesOrgFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().Salesorg);
							oMultiInput.addToken(new Token({
								text: oEvent.getParameters().selectedContexts[i].getObject().Salesorg
							}));
							// return new Token({text: oEvent.getParameters().selectedContexts[i].getObject().Salesorg});
						}
					} else {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
							for (var j = 0; j < this.salesOrgFromSelectedItems.length; j++) {
								if (this.salesOrgFromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject().Salesorg) ===
									false) {
									this.salesOrgFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().Salesorg);
									oMultiInput.addToken(new Token({
										text: oEvent.getParameters().selectedContexts[i].getObject().Salesorg
									}));
								} else {
									// MessageToast.show("Cannot add the same item");
								}
							}
						}
					}
					if (this.salesOrgFromSelectedItems.length <= 1) {
						this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
						this.getView().getModel("baseModel").refresh();
					} else {
						this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", false);
						this.getView().getModel("baseModel").refresh();
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
		},

		onDeleteSalesOrg: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				this.salesOrgToSelectedItems = [];
				var oMultiInput = this.byId(this._getId("SalesOrgTo"));
				oMultiInput.destroyTokens();
				this.salesOrgToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("SalesOrgFrom"));
					oMultiInput.destroyTokens();
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.salesOrgFromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.salesOrgFromSelectedItems[i]) {
							this.salesOrgFromSelectedItems.splice(i, 1);
						}
					}
					if (this.salesOrgFromSelectedItems.length > 0) {
						for (var j = 0; j < this.salesOrgFromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.salesOrgFromSelectedItems[j]
							}));
							if (this.salesOrgFromSelectedItems.length <= 1) {
								// this.plant = "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
								this.getView().getModel("baseModel").refresh();
							} else {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
								this.getView().getModel("baseModel").refresh();
								// this.plant = this.plant + " " + "or" + " " + "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
							}
						}
					}
				} else {
					this.salesOrgFromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}
		},

		onConfirmChangeStoLoc: function (oEvent) {
			this.getView().getModel("baseModel").getData().EndingStckSLocValueState = "None";
			oEvent.getSource().getBinding("items").filter([]);
			// to logic
			if (this.SLocPlaceholder === "To") {
				if (this.SLocFromSelectedItems.length === 0) {
					MessageToast.show("Add SLoc from");
					return;
				}
				this.SLocToSelectedItems = [];
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("SLocTo"));
					oMultiInput.destroyTokens();
					if (oEvent.getParameters().selectedContexts.length > 1) {
						MessageToast.show("Can select only one item");
					}
					if (parseInt(this.SLocFromSelectedItems[0]) < parseInt(oEvent.getParameters().selectedContexts[0].getObject().storageLocation)) {
						this.SLocToSelectedItems.push(oEvent.getParameters().selectedContexts[0].getObject().storageLocation);
						oMultiInput.addToken(new Token({
							text: this.SLocToSelectedItems[0]
						}));
					} else {
						MessageToast.show("Select value greater than 'From' ");
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
			//from logic and other
			else {
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("SLocFrom"));
					//first push
					if (this.SLocFromSelectedItems.length === 0) {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
							this.SLocFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().storageLocation);
							oMultiInput.addToken(new Token({
								text: oEvent.getParameters().selectedContexts[i].getObject().storageLocation
							}));
						}
					} else {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
							for (var j = 0; j < this.SLocFromSelectedItems.length; j++) {
								if (this.SLocFromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject().storageLocation) ===
									false) {
									this.SLocFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().storageLocation);
									oMultiInput.addToken(new Token({
										text: oEvent.getParameters().selectedContexts[i].getObject().storageLocation
									}));
								} else {
									// MessageToast.show("Cannot add same item");
								}
							}
						}
					}
					if (this.SLocFromSelectedItems.length <= 1) {
						this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
						this.getView().getModel("baseModel").refresh();
					} else {
						this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
						this.getView().getModel("baseModel").refresh();
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
		},

		onDeleteStoLoc: function (oEvent) {
			if (oEvent.getSource().getPlaceholder() === "To") {
				var oMultiInput = this.byId(this._getId("SLocTo"));
				oMultiInput.destroyTokens();
				this.SLocToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("SLocFrom"));
					oMultiInput.destroyTokens();
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.SLocFromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.SLocFromSelectedItems[i]) {
							this.SLocFromSelectedItems.splice(i, 1);
						}
					}
					if (this.SLocFromSelectedItems.length > 0) {
						for (var j = 0; j < this.SLocFromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.SLocFromSelectedItems[j]
							}));
							if (this.SLocFromSelectedItems.length <= 1) {
								// this.plant = "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
								this.getView().getModel("baseModel").refresh();
							} else {
								this.getView().getModel("baseModel").setProperty("/enableSLocTo", false);
								this.getView().getModel("baseModel").refresh();
								// this.plant = this.plant + " " + "or" + " " + "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
							}
						}
					}
				} else {
					this.SLocFromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}

		},

		onConfirmChangeMatGrp: function (oEvent) {
			this.getView().getModel("baseModel").getData().matGrpValueState = "None";
			oEvent.getSource().getBinding("items").filter([]);
			// to logic
			if (this.matGrpPlaceholder === "To") {
				if (this.MatGrpFromSelectedItems.length === 0) {
					MessageToast.show("Add Mat Grp from");
					return;
				}
				this.MatGrpToSelectedItems = [];
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("MatGrpTo"));
					oMultiInput.destroyTokens();
					if (oEvent.getParameters().selectedContexts.length > 1) {
						MessageToast.show("Can select only one item");
					}
					if (parseInt(this.MatGrpFromSelectedItems[0]) < parseInt(oEvent.getParameters().selectedContexts[0].getObject().materialGroup)) {
						this.MatGrpToSelectedItems.push(oEvent.getParameters().selectedContexts[0].getObject().materialGroup);
						oMultiInput.addToken(new Token({
							text: this.MatGrpToSelectedItems[0]
						}));
					} else {
						MessageToast.show("Select value greater than 'From' ");
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
			//from logic and other
			else {
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("MatGrpFrom"));
					//first push
					if (this.MatGrpFromSelectedItems.length === 0) {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
							this.MatGrpFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().materialGroup);
							oMultiInput.addToken(new Token({
								text: oEvent.getParameters().selectedContexts[i].getObject().materialGroup
							}));
						}
					} else {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
							for (var j = 0; j < this.MatGrpFromSelectedItems.length; j++) {
								if (this.MatGrpFromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject()
										.materialGroup) === false) {
									this.MatGrpFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject()
										.materialGroup);
									oMultiInput.addToken(new Token({
										text: oEvent.getParameters().selectedContexts[i].getObject().materialGroup
									}));
								} else {
									// MessageToast.show("Cannot add same item");
								}
							}
						}
					}
					if (this.MatGrpFromSelectedItems.length <= 1) {
						this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
						this.getView().getModel("baseModel").refresh();
					} else {
						this.getView().getModel("baseModel").setProperty("/enablematGrpTo", false);
						this.getView().getModel("baseModel").refresh();
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
		},

		onDeleteMatGrp: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("MatGrpTo"));
				oMultiInput.destroyTokens();
				this.MatGrpToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("MatGrpFrom"));
					oMultiInput.destroyTokens();
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.MatGrpFromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.MatGrpFromSelectedItems[i]) {
							this.MatGrpFromSelectedItems.splice(i, 1);
						}
					}
					if (this.MatGrpFromSelectedItems.length > 0) {
						for (var j = 0; j < this.MatGrpFromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.MatGrpFromSelectedItems[j]
							}));
						}
						if (this.MatGrpFromSelectedItems.length <= 1) {
							this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
							this.getView().getModel("baseModel").refresh();
						} else {
							this.getView().getModel("baseModel").setProperty("/enablematGrpTo", false);
							this.getView().getModel("baseModel").refresh();
						}
					}
				} else {
					this.MatGrpFromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}
		},

		onConfirmChangeMatGrp4: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
			// to logic
			if (this.matGrp4Placeholder === "To") {
				if (this.MatGrp4FromSelectedItems.length === 0) {
					MessageToast.show("Add Mat Grp4 from");
					return;
				}
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("MatGrp4To"));
					oMultiInput.destroyTokens();
					if (oEvent.getParameters().selectedContexts.length > 1) {
						MessageToast.show("Can select only one item");
					}
					// if (parseInt(this.MatGrp4FromSelectedItems[0]) < parseInt(oEvent.getParameters().selectedContexts[0].getObject().materialGroup4)) {
					this.MatGrp4ToSelectedItems.push(oEvent.getParameters().selectedContexts[0].getObject().materialGroup4);
					oMultiInput.addToken(new Token({
						text: this.MatGrp4ToSelectedItems[0]
					}));
					// }
					// else{
					// 	MessageToast.show("Select value greater than 'From'");
					// }
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
			//from logic and other
			else {
				if (oEvent.getParameters().selectedContexts.length > 0) {
					var oMultiInput = this.byId(this._getId("MatGrp4From"));
					//first push
					if (this.MatGrp4FromSelectedItems.length === 0) {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
							this.MatGrp4FromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().materialGroup4);
							oMultiInput.addToken(new Token({
								text: oEvent.getParameters().selectedContexts[i].getObject().materialGroup4
							}));
						}
					} else {
						for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
							for (var j = 0; j < this.MatGrp4FromSelectedItems.length; j++) {
								if (this.MatGrp4FromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject()
										.materialGroup4) === false) {
									this.MatGrp4FromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject()
										.materialGroup4);
									oMultiInput.addToken(new Token({
										text: oEvent.getParameters().selectedContexts[i].getObject().materialGroup4
									}));
								} else {
									// MessageToast.show("Cannot add same item");
								}
							}
						}
					}
					if (this.MatGrp4FromSelectedItems.length === 1) {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
						this.getView().getModel("baseModel").refresh();
					} else {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
						this.getView().getModel("baseModel").refresh();
					}
				} else {
					MessageBox.error("Select atleast one item");
				}
			}
		},

		onDeleteMatGrp4: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("MatGrp4To"));
				oMultiInput.destroyTokens();
				this.MatGrp4ToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("MatGrp4From"));
					oMultiInput.destroyTokens();
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.MatGrp4FromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.MatGrp4FromSelectedItems[i]) {
							this.MatGrp4FromSelectedItems.splice(i, 1);
						}
					}
					if (this.MatGrp4FromSelectedItems.length > 0) {
						for (var j = 0; j < this.MatGrp4FromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.MatGrp4FromSelectedItems[j]
							}));
						}
						if (this.MatGrp4FromSelectedItems.length === 1) {
							this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
							this.getView().getModel("baseModel").refresh();
						} else {
							this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
							this.getView().getModel("baseModel").refresh();
						}
					}
				} else {
					this.MatGrp4FromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
					if (this.MatGrp4FromSelectedItems.length === 1) {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
						this.getView().getModel("baseModel").refresh();
					} else {
						this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
						this.getView().getModel("baseModel").refresh();
					}
				}
			}
		},

		onCancelValueHelp: function (oEvent) {
			oEvent.getSource().getBinding("items").filter([]);
		},

		// onConfirmChangeMovType: function (oEvent) {
		// 	oEvent.getSource().getBinding("items").filter([]);
		// 	// to logic
		// 	if (this.matGrp4Placeholder === "To") {
		// 		// this.matGrp4Placeholder = [];
		// 		if (oEvent.getParameters().selectedContexts.length > 0) {
		// 			var oMultiInput = this.byId(this._getId("MatMovVenMatFromId"));
		// 			oMultiInput.destroyTokens();
		// 			if (oEvent.getParameters().selectedContexts.length > 1) {
		// 				MessageToast.show("Can select only one item");
		// 			}
		// 			this.matGrp4Placeholder.push(oEvent.getParameters().selectedContexts[0].getObject().materialGroup4);
		// 			oMultiInput.addToken(new Token({
		// 				text: this.matGrp4Placeholder[0]
		// 			}));
		// 		} else {
		// 			MessageBox.error("Select atleast one item");
		// 		}
		// 	}
		// 	//from logic and other
		// 	else {
		// 		if (oEvent.getParameters().selectedContexts.length > 0) {
		// 			var oMultiInput = this.byId(this._getId("MatGrp4From"));
		// 			//first push
		// 			if (this.MatGrp4FromSelectedItems.length === 0) {
		// 				for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
		// 					this.MatGrp4FromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().materialGroup4);
		// 					oMultiInput.addToken(new Token({
		// 						text: oEvent.getParameters().selectedContexts[i].getObject().materialGroup4
		// 					}));
		// 				}
		// 			} else {
		// 				for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
		// 					for (var j = 0; j < this.MatGrp4FromSelectedItems.length; j++) {
		// 						if (this.MatGrp4FromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject()
		// 								.materialGroup4) === false) {
		// 							this.MatGrp4FromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject()
		// 								.materialGroup4);
		// 							oMultiInput.addToken(new Token({
		// 								text: oEvent.getParameters().selectedContexts[i].getObject().materialGroup4
		// 							}));
		// 						} else {
		// 							// MessageToast.show("Cannot add same item");
		// 						}
		// 					}
		// 				}
		// 			}
		// 			if (this.MatGrp4FromSelectedItems.length === 1) {
		// 				this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
		// 				this.getView().getModel("baseModel").refresh();
		// 			} else {
		// 				this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
		// 				this.getView().getModel("baseModel").refresh();
		// 			}
		// 		} else {
		// 			MessageBox.error("Select atleast one item");
		// 		}
		// 	}
		// },

		// onDeleteMovType: function (oEvent) {
		// 	var placeHolder = oEvent.getSource().getPlaceholder();
		// 	if (placeHolder === "To") {
		// 		var oMultiInput = this.byId(this._getId("matmov"));
		// 		oMultiInput.destroyTokens();
		// 		this.selectedMovType.splice(0, 1);
		// 	} else {
		// 		if(oEvent.getParameters().type === "removed"){
		// 		var oMultiInput = this.byId(this._getId("matmov"));
		// 		oMultiInput.destroyTokens();
		// 		var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
		// 		for (var i = this.selectedMovType.length; i >= 0; i--) {
		// 			if (delToken === this.selectedMovType[i]) {
		// 				this.selectedMovType.splice(i, 1);
		// 			}
		// 		}
		// 		if (this.selectedMovType.length > 0) {
		// 			for (var j = 0; j < this.selectedMovType.length; j++) {
		// 				oMultiInput.addToken(new Token({
		// 					text: this.selectedMovType[j]
		// 				}));
		// 			}
		// 			if (this.selectedMovType.length === 1) {
		// 				this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
		// 				this.getView().getModel("baseModel").refresh();
		// 			} else {
		// 				this.getView().getModel("baseModel").setProperty("/enablematGrp4To", false);
		// 				this.getView().getModel("baseModel").refresh();
		// 			}
		// 		}
		// 	}
		// 	}else{

		// 	}
		// },

		onMaterialFromChange: function (oEvent) {

			// to logic
			if (oEvent.getSource().getPlaceholder() === "To") {
				this.selectedMatToItems = [];
				var oMultiInput = this.byId(this._getId("MaterialTo"));
				oMultiInput.destroyTokens();
				// if (this.selectedMatToItems.length === 0) {
				if (parseInt(this.selectedMatFromItems[0]) < parseInt(oEvent.getParameters().value)) {
					this.selectedMatToItems.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: this.selectedMatToItems[0]
					}));
				} else {
					MessageToast.show("Select a value greater than 'From'");
				}
				// }

				oEvent.getSource().setValue("");
			}
			//from logic and other
			else {
				var oMultiInput = this.byId(this._getId("MaterialFrom"));
				if (this.selectedMatFromItems.length === 0) {
					this.selectedMatFromItems.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: oEvent.getParameters().value
					}));
				} else {
					if (this.selectedMatFromItems.includes(oEvent.getParameters().value) === false) {
						this.selectedMatFromItems.push(oEvent.getParameters().value);
						oMultiInput.addToken(new Token({
							text: oEvent.getParameters().value
						}));
					}
				}
				if (this.selectedMatFromItems.length === 1) {
					this.getView().getModel("baseModel").setProperty("/enablematTo", true);
					this.getView().getModel("baseModel").refresh();
				} else {
					this.getView().getModel("baseModel").setProperty("/enablematTo", false);
					this.getView().getModel("baseModel").refresh();
				}
				oEvent.getSource().setValue("");
			}

		},

		onMaterialFromDelete: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("MaterialTo"));
				oMultiInput.destroyTokens();
				this.selectedMatToItems.splice(0, 1);
			} else {
				var oMultiInput = this.byId(this._getId("MaterialFrom"));
				oMultiInput.destroyTokens();
				var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
				for (var i = this.selectedMatFromItems.length; i >= 0; i--) {
					if (delToken === this.selectedMatFromItems[i]) {
						this.selectedMatFromItems.splice(i, 1);
					}
				}
				if (this.selectedMatFromItems.length > 0) {
					for (var j = 0; j < this.selectedMatFromItems.length; j++) {
						oMultiInput.addToken(new Token({
							text: this.selectedMatFromItems[j]
						}));
						if (this.selectedMatFromItems.length === 1) {
							this.getView().getModel("baseModel").setProperty("/enablematTo", true);
							this.getView().getModel("baseModel").refresh();
						} else {
							this.getView().getModel("baseModel").setProperty("/enablematTo", false);
							this.getView().getModel("baseModel").refresh();
						}
					}
				}
			}
		},

		onChangePostingDateFrom: function (oEvent) {
			if (oEvent.getParameters().valid) {
				this.getView().getModel("baseModel").getData().postingDateValueStateFrom = "None";
				// SearchPara.matGrpValueState = "Error";
				var date = this.getView().getModel("baseModel").getData().postingDateFrom;
				if (date === NaN || date === "") {
					date = "";
				}
				var d = this.formatter.dateTimeFormat(date);
				// var d = new Date(date).getFullYear().toString() + new Date(date).getMonth().toString() + new Date(date).getDate().toString();
				// this.postingDate = "(postingDate ge datetime" + "'" + d + "'";
				this.postingDateFrom = d;
			} else {
				// this.getView().getModel("baseModel").getData().postingDateValueStateFrom = "Error";
				this.getView().getModel("baseModel").getData().postingDateFrom = null;
			}
		},

		oncheckSelect: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.serialNo = "serialNo eq " + "'" + "X" + "'";
			} else {
				this.serialNo = undefined;
			}
		},

		onChangePostingDateTo: function (oEvent) {
			if (!this.postingDateFrom) {
				MessageToast.show("Add Posting Date from");
				return;
			} else {
				if (oEvent.getParameters().valid) {
					this.getView().getModel("baseModel").getData().postingDateValueStateTo = "None";
					var date = this.getView().getModel("baseModel").getData().postingDateTo;
					if (date === NaN || date === "") {
						date = "";
					}
					var d = this.formatter.dateTimeFormat(date);
					// var d = new Date(date).getFullYear().toString() + new Date(date).getMonth().toString() + new Date(date).getDate().toString();
					// this.postingDate = this.postingDate + " and " + "postingDate le datetime" + "'" + d + "')";
					this.postingDateTo = d;
				} else {
					// this.getView().getModel("baseModel").getData().postingDateValueStateTo = "Error";
					this.getView().getModel("baseModel").getData().postingDateTo = null;
				}
			}
		},

		onChangeMonth: function (oEvent) {
			if (oEvent.getParameters().valid) {
				var date = this.getView().getModel("baseModel").getData().month;
				// if(date.length === 1)
				// {\
				if (date === NaN) {
					date = "";
				}
				if (date.getMonth().toString().length === 1 && date.getMonth() < 9) {
					var spMonth = date.getFullYear().toString() + "0" + (date.getMonth() + 1);
				} else {
					var spMonth = date.getFullYear().toString() + (date.getMonth() + 1);
				}
				// }
				// else{
				// 	var spMonth = date.getFullYear()+date.getMonth();
				// }
				this.spMonth = "spMonth eq" + "'" + spMonth + "'";
			} else {
				this.getView().getModel("baseModel").getData().month = null;
			}
		},

		onExptStkLot: function () {
			var data = this.getView().getModel("stockLotModel").getData().results;
			this.JSONToCSVConvertor1(data, "Stock And Lot Control List", true);
		},

		////

		// JSONToCSVConvertor1: function (JSONData, ReportTitle, ShowLabel) {
		// 	var arr = [];
		// 	var arrData = JSONData;
		// 	var CSV = '';
		// 	var that = this;
		// 	// Set Report title in first row or line

		// 	CSV += ReportTitle + '\r\n';

		// 	if (ShowLabel) {

		// 		var row = "";

		// 		row = row.slice(0, -1);

		// 		CSV += row + '\r\n';

		// 	}

		// 	for (var i = 0; i < arrData.length; i++) {
		// 		var row1 = '"' + "Material Num" + '","' + "Material Desc" + '","' + "Vendor Mat Num" + '","' +
		// 			"Sales UOM" + '","' + "On Hand" + '","' + "UNR" + '","' + "QI Stock" + '","' +
		// 			"LTP/Price" + '","' + "On Order" + '","' + "Available" + '","' + "Block Stock" + '","' + "Principal" + '","' + "Material Group4" +
		// 			'",';
		// 		CSV += row1 + '\r\n';
		// 		var row = "";
		// 		row += '"' + arrData[i].materialNum + '","' + arrData[i].materialDesc + '","' + arrData[i].vendorMatNum + '","' +
		// 			arrData[i].salesUOM + '","' + parseFloat(arrData[i].onHandQty) + '","' + parseFloat(arrData[i].unrestrictedStock) + '","' +
		// 			parseFloat(arrData[i].stockInspection) + '","' + parseFloat(arrData[i].ltp) + '","' + parseFloat(arrData[i].onOrderQty) + '","' +
		// 			parseFloat(arrData[i].availQty) + '","' + arrData[i].blockedStock + '","' + arrData[i].principalMatGroup + '","' + arrData[i].materialGroup4 +
		// 			'","';
		// 		row = row.slice(0, (row.length - 1));

		// 		CSV += row + '\r\n';
		// 		var row2 = '"' + "Batch Num" + '","' + "Recv. Date" + '","' + "Manuf. Date" + '","' + "Exp. Date" + '","' +
		// 			"QTY" + '","' + "SLoc" + '","' + "Reserved By" + '","' + "Unrest" + '","' +
		// 			"Blocked" + '","' + "QI" + '","' + "Serial No" + '",';
		// 		CSV += row2 + '\r\n';

		// 		for (var j = 0; j < arrData[i].OutputToBatchOutput.results.length; j++) {

		// 			var createdOn = that.formatter.convertToDateToDispFormat(arrData[i].OutputToBatchOutput.results[j].createdOn);
		// 			var manufDate = that.formatter.convertToDateToDispFormatManuf(arrData[i].OutputToBatchOutput.results[j].manufDate);
		// 			var shelfLifeDate = that.formatter.convertToDateToDispFormatExp(arrData[i].OutputToBatchOutput.results[j].shelfLifeDate);
		// 			if (manufDate === undefined) {
		// 				manufDate = "";
		// 			}
		// 			var row3 = "";
		// 			row3 += '"' + arrData[i].OutputToBatchOutput.results[j].batchNum + '","' + /*arrData[i].OutputToBatchOutput.results[j].createdOn*/
		// 				createdOn + '","' +
		// 				/*arrData[i].OutputToBatchOutput.results[j].manufDate*/
		// 				manufDate + '","' + /*arrData[i].OutputToBatchOutput.results[j].shelfLifeDate*/ shelfLifeDate + '","' +
		// 				parseFloat(arrData[i].OutputToBatchOutput.results[j].qtyUnrestrictedStock) + '","' + arrData[i].OutputToBatchOutput.results[j].storageLocation +
		// 				'","' +
		// 				arrData[i].OutputToBatchOutput.results[j].reservedby + '","' + parseFloat(arrData[i].OutputToBatchOutput.results[j].batchQty) +
		// 				'","' +
		// 				parseFloat(arrData[i].OutputToBatchOutput.results[j].blockStock) + '","' + parseFloat(arrData[i].OutputToBatchOutput.results[j].stockInspection) +
		// 				'","' + arrData[i].OutputToBatchOutput.results[j].serialNum + '","';

		// 			row3 = row3.slice(0, (row3.length - 1));

		// 			CSV += row3 + '\r\n';

		// 		}

		// 		CSV += '\r\n';
		// 	}

		// 	// for (var i = 0; i < arrData.length; i++) {
		// 	// 	var row1 = '"' + "Material Num" +  "Material Desc" +  "Vendor Mat Num" + 
		// 	// 		"Sales UOM" +  "On Hand" +  "UNR" +  "QI Stock" + 
		// 	// 		"LTP/Price" +  "On Order" +  "Available" +  "Block Stock" +  "Principal" +  "Material Group4" +
		// 	// 		'",';
		// 	// 	CSV += row1 + '\r\n';
		// 	// 	var row = "";
		// 	// 	row += '"' + arrData[i].materialNum +  arrData[i].materialDesc +  arrData[i].vendorMatNum + 
		// 	// 		arrData[i].salesUOM +  arrData[i].onHandQty +  arrData[i].unrestrictedStock + 
		// 	// 		arrData[i].stockInspection +  arrData[i].ltp +  arrData[i].onOrderQty + 
		// 	// 		arrData[i].availQty +  arrData[i].blockedStock +  arrData[i].principalMatGroup +  arrData[i].materialGroup4 +
		// 	// 		'","';
		// 	// 	row = row.slice(0, (row.length - 1));

		// 	// 	CSV += row + '\r\n';
		// 	// 	var row2 = '"' + "Batch Num" +  "Recv. Date" +  "Manuf. Date" +  "Exp. Date" + 
		// 	// 		"QTY" +  "SLoc" +  "Reserved By" +  "Unrest" + 
		// 	// 		"Blocked" +  "QI" +  "Serial No" + '",';
		// 	// 	CSV += row2 + '\r\n';

		// 	// 	for (var j = 0; j < arrData[i].OutputToBatchOutput.results.length; j++) {

		// 	// 		var createdOn = that.formatter.convertToDateToDispFormat(arrData[i].OutputToBatchOutput.results[j].createdOn);
		// 	// 		var manufDate = that.formatter.convertToDateToDispFormatManuf(arrData[i].OutputToBatchOutput.results[j].manufDate);
		// 	// 		var shelfLifeDate = that.formatter.convertToDateToDispFormatExp(arrData[i].OutputToBatchOutput.results[j].shelfLifeDate);
		// 	// 		if (manufDate === undefined) {
		// 	// 			manufDate = "";
		// 	// 		}
		// 	// 		var row3 = "";
		// 	// 		row3 += '"' + arrData[i].OutputToBatchOutput.results[j].batchNum +  /*arrData[i].OutputToBatchOutput.results[j].createdOn*/
		// 	// 			createdOn + 
		// 	// 			/*arrData[i].OutputToBatchOutput.results[j].manufDate*/
		// 	// 			manufDate +  /*arrData[i].OutputToBatchOutput.results[j].shelfLifeDate*/ shelfLifeDate + 
		// 	// 			arrData[i].OutputToBatchOutput.results[j].qtyUnrestrictedStock +  arrData[i].OutputToBatchOutput.results[j].storageLocation +

		// 	// 			arrData[i].OutputToBatchOutput.results[j].reservedby +  arrData[i].OutputToBatchOutput.results[j].batchQty +

		// 	// 			arrData[i].OutputToBatchOutput.results[j].blockStock +  arrData[i].OutputToBatchOutput.results[j].stockInspection +
		// 	// 			 arrData[i].OutputToBatchOutput.results[j].serialNum + '","';

		// 	// 		row3 = row3.slice(0, (row3.length - 1));

		// 	// 		CSV += row3 + '\r\n';

		// 	// 	}

		// 	// 	CSV += '\r\n';
		// 	// }
		// 	if (CSV === "") {

		// 		sap.m.MessageToast.show("Invaild data");

		// 		return;

		// 	}

		// 	// Generate a file name

		// 	var fileName = "";

		// 	fileName += ReportTitle.replace(/ /g, "_");

		// 	// Initialize file format you want csv or xls

		// 	var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

		// 	var link = document.createElement("a");

		// 	link.href = uri;

		// 	link.style = "visibility:hidden";

		// 	link.download = fileName + ".csv";

		// 	// this part will append the anchor tag and remove it after automatic

		// 	// click

		// 	document.body.appendChild(link);

		// 	link.click();

		// 	document.body.removeChild(link);

		// },

		JSONToCSVConvertor1: function (JSONData, ReportTitle, ShowLabel) {
			var arr = [];
			var arrData = JSONData;
			var CSV = '';
			var that = this;
			// Set Report title in first row or line

			CSV += ReportTitle + '\r\n';

			if (ShowLabel) {

				var row = "";

				row = row.slice(0, -1);

				CSV += row + '\r\n';

			}
			var defaultVariant = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			// var cols = [];

			for (var i = 0; i < arrData.length; i++) {
				var row1 = "";
				var row = "";
				for (var k = 0; k < defaultVariant.length; k++) {
					if (defaultVariant[k].status === true) {
						if (defaultVariant[k].enabledKey === "Material") {
							row1 = row1 + '"' + "Material Num" + '","' + "Material Desc" + '","';
						} else if (defaultVariant[k].enabledKey === "Vendor Mat.") {
							row1 = row1 + "Vendor Mat Num" + '","';
						} else if (defaultVariant[k].enabledKey === "LTP / Price") {
							row1 = row1 + "LTP/Price" + '","';
						} else if (defaultVariant[k].enabledKey === "On Hand") {
							row1 = row1 + "On Hand" + '","';
						} else if (defaultVariant[k].enabledKey === "On Order") {
							row1 = row1 + "On Order" + '","';
						} else if (defaultVariant[k].enabledKey === "Available") {
							row1 = row1 + "Available" + '","';
						} else if (defaultVariant[k].enabledKey === "UNR") {
							row1 = row1 + "UNR" + '","' + "Sales UOM" + '","';
							arrData[i].salesUOM + '","';
						} else if (defaultVariant[k].enabledKey === "Block Stock") {
							row1 = row1 + "Block Stock" + '","';
						} else if (defaultVariant[k].enabledKey === "QI Stock") {
							row1 = row1 + "QI Stock" + '","';
						} else if (defaultVariant[k].enabledKey === "Principal") {
							row1 = row1 + "Principal" + '","';
						} else if (defaultVariant[k].enabledKey === "Material Group4") {
							row1 = row1 + "Material Group4" + '","';
						}
						if (k === defaultVariant.length - 1) {

						}
					}

				}
				row1 = row1.slice(0, row1.length - 3);
				row1 = row1 + '",';
				CSV += row1 + '\r\n';
				var row = "";
				for (var k = 0; k < defaultVariant.length; k++) {
					if (defaultVariant[k].status === true) {
						if (defaultVariant[k].enabledKey === "Material") {
							row = row + '"' + arrData[i].materialNum + '","' + arrData[i].materialDesc + '","';
						} else if (defaultVariant[k].enabledKey === "Vendor Mat.") {
							row = row + arrData[i].vendorMatNum + '","';
						} else if (defaultVariant[k].enabledKey === "LTP / Price") {
							row = row + parseFloat(arrData[i].ltp) + '","';
						} else if (defaultVariant[k].enabledKey === "On Hand") {
							row = row + parseFloat(arrData[i].onHandQty) + '","';
						} else if (defaultVariant[k].enabledKey === "On Order") {
							row = row + parseFloat(arrData[i].onOrderQty) + '","';
						} else if (defaultVariant[k].enabledKey === "Available") {
							row = row + parseFloat(arrData[i].availQty) + '","';
						} else if (defaultVariant[k].enabledKey === "UNR") {
							row = row + parseFloat(arrData[i].unrestrictedStock) + '","' +
								arrData[i].salesUOM + '","';
						} else if (defaultVariant[k].enabledKey === "Block Stock") {
							row = row + arrData[i].blockedStock + '","';
						} else if (defaultVariant[k].enabledKey === "QI Stock") {
							row = row + parseFloat(arrData[i].stockInspection) + '","';
						} else if (defaultVariant[k].enabledKey === "Principal") {
							row = row + arrData[i].principalMatGroup + '","';
						} else if (defaultVariant[k].enabledKey === "Material Group4") {
							row = row + arrData[i].materialGroup4 + '","';
						}
						if (k === defaultVariant.length - 1) {

						}
					}

				}
				row = row.slice(0, (row.length - 1));
				CSV += row + '\r\n';
				// CSV += row1 + '\r\n';
				// row = row.slice(0, (row.length - 1));
				// CSV += row + '\r\n';
				var row2 = "";
				for (var k = 0; k < defaultVariant.length; k++) {
					if (defaultVariant[k].status === true) {
						if (defaultVariant[k].enabledKey === "Batch – Batch") {
							row2 = row2 + '"' + "Batch Num" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – Recv. Date") {
							row2 = row2 + "Recv. Date" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – Manu. Date") {
							row2 = row2 + "Manuf. Date" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – Exp. Date") {
							row2 = row2 + "Exp. Date" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – QTY") {
							row2 = row2 + "QTY" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – SLOC") {
							row2 = row2 + "Storage Location" + '","';
						} else if (defaultVariant[k].enabledKey === "SLOC Desc") {
							row2 = row2 + "Storage Location Desc." + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – Reserved By") {
							row2 = row2 + "Reserved By" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch –Unrest") {
							row2 = row2 + "Unrest" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – Blocked") {
							row2 = row2 + "Blocked" + '","';
						} else if (defaultVariant[k].enabledKey === "Batch – QI") {
							row2 = row2 + "QI" + '","';
						} else if (defaultVariant[k].enabledKey === "Serial No.") {
							row2 = row2 + "Serial No" + '","';
						}
					}
				}
				row2 = row2.slice(0, row2.length - 3);
				row2 = row2 + '",';
				CSV += row2 + '\r\n';
				for (var j = 0; j < arrData[i].OutputToBatchOutput.results.length; j++) {
					var createdOn = that.formatter.convertToDateToDispFormat(arrData[i].OutputToBatchOutput.results[j].createdOn);
					var manufDate = that.formatter.convertToDateToDispFormatManuf(arrData[i].OutputToBatchOutput.results[j].manufDate);
					var shelfLifeDate = that.formatter.convertToDateToDispFormatExp(arrData[i].OutputToBatchOutput.results[j].shelfLifeDate);
					if (manufDate === undefined) {
						manufDate = "";
					}
					var row3 = "";
					for (var k = 0; k < defaultVariant.length; k++) {
						if (defaultVariant[k].status === true) {
							if (defaultVariant[k].enabledKey === "Batch – Batch") {
								row3 = row3 + '"' + arrData[i].OutputToBatchOutput.results[j].batchNum + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – Recv. Date") {
								row3 = row3 + createdOn + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – Manu. Date") {
								row3 = row3 + manufDate + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – Exp. Date") {
								row3 = row3 + shelfLifeDate + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – QTY") {
								row3 = row3 + parseFloat(arrData[i].OutputToBatchOutput.results[j].qtyUnrestrictedStock) + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – SLOC") {
								row3 = row3 + arrData[i].OutputToBatchOutput.results[j].storageLocation + '","';
							} else if (defaultVariant[k].enabledKey === "SLOC Desc") {
								row3 = row3 + arrData[i].OutputToBatchOutput.results[j].storelocdesc + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – Reserved By") {
								row3 = row3 + arrData[i].OutputToBatchOutput.results[j].reservedby + '","';
							} else if (defaultVariant[k].enabledKey === "Batch –Unrest") {
								row3 = row3 + parseFloat(arrData[i].OutputToBatchOutput.results[j].batchQty) + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – Blocked") {
								row3 = row3 + parseFloat(arrData[i].OutputToBatchOutput.results[j].blockStock) + '","';
							} else if (defaultVariant[k].enabledKey === "Batch – QI") {
								row3 = row3 + parseFloat(arrData[i].OutputToBatchOutput.results[j].stockInspection) + '","';
							} else if (defaultVariant[k].enabledKey === "Serial No.") {
								row3 = row3 + arrData[i].OutputToBatchOutput.results[j].serialNum + '","';
							}
							if (k === defaultVariant.length - 1) {

							}
						}
					}
					row3 = row3.slice(0, (row3.length - 1));
					CSV += row3 + '\r\n';

				}
				CSV += '\r\n';
			}
			// }
			if (CSV === "") {

				sap.m.MessageToast.show("Invaild data");

				return;

			}

			// Generate a file name

			var fileName = "";

			fileName += ReportTitle.replace(/ /g, "_");

			// Initialize file format you want csv or xls

			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

			var link = document.createElement("a");

			link.href = uri;

			link.style = "visibility:hidden";

			link.download = fileName + ".csv";

			// this part will append the anchor tag and remove it after automatic

			// click

			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);

		},

		onChangeMatDoc: function (oEvent) {
			var oMultiInput = this.byId(this._getId("MatDoc"));
			if (this.selectedMatDocItems.length === 0) {
				this.selectedMatDocItems.push(oEvent.getParameters().value);
				oMultiInput.addToken(new Token({
					text: oEvent.getParameters().value
				}));
			} else {
				if (this.selectedMatDocItems.includes(oEvent.getParameters().value) === false) {
					this.selectedMatDocItems.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: oEvent.getParameters().value
					}));
				}
			}
			oEvent.getSource().setValue("");
		},

		onDeleteMatDoc: function (oEvent) {
			var oMultiInput = this.byId(this._getId("MatDoc"));
			oMultiInput.destroyTokens();
			var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
			if (oEvent.getParameters().type === "removed") {
				for (var i = this.selectedMatDocItems.length; i >= 0; i--) {
					if (delToken === this.selectedMatDocItems[i]) {
						this.selectedMatDocItems.splice(i, 1);
					}
				}
				if (this.selectedMatDocItems.length > 0) {
					for (var j = 0; j < this.selectedMatDocItems.length; j++) {
						oMultiInput.addToken(new Token({
							text: this.selectedMatDocItems[j]
						}));
					}
				}
			} else {
				this.selectedMatDocItems.push(oEvent.getParameters().addedTokens[0].getText());
			}
		},

		onChangeBatch: function (oEvent) {
			var oMultiInput = this.byId(this._getId("BatchFrom"));
			if (this.selectedBatch.length === 0) {
				this.selectedBatch.push(oEvent.getParameters().value);
				oMultiInput.addToken(new Token({
					text: oEvent.getParameters().value
				}));
			} else {
				if (this.selectedBatch.includes(oEvent.getParameters().value) === false) {
					this.selectedBatch.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: oEvent.getParameters().value
					}));
				}
			}
			oEvent.getSource().setValue("");
		},

		onDeleteBatch: function (oEvent) {
			var oMultiInput = this.byId(this._getId("MaterialFrom"));
			oMultiInput.destroyTokens();
			var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
			if (oEvent.getParameters().type === "removed") {
				for (var i = this.selectedBatch.length; i >= 0; i--) {
					if (delToken === this.selectedBatch[i]) {
						this.selectedBatch.splice(i, 1);
					}
				}
				if (this.selectedBatch.length > 0) {
					for (var j = 0; j < this.selectedBatch.length; j++) {
						oMultiInput.addToken(new Token({
							text: this.selectedBatch[j]
						}));
					}
				}
			} else {
				this.selectedBatch.push(oEvent.getParameters().addedTokens[0].getText());
			}
		},

		onChangeVenMatFrom: function (oEvent) {
			// to logic
			if (oEvent.getSource().getPlaceholder() === "To") {
				if (this.selectedVendorMatFrom.length === 0) {
					MessageToast.show("Add vendor mat from");
					return;
				}
				this.selectedVendorMatTo = [];
				var oMultiInput = this.byId(this._getId("VendorMatTo"));
				oMultiInput.destroyTokens();
				// if (this.selectedMatToItems.length === 0) {
				if (parseInt(this.selectedVendorMatFrom[0]) < parseInt(oEvent.getParameters().value)) {
					this.selectedVendorMatTo.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: this.selectedVendorMatTo[0]
					}));
				} else {
					MessageToast.show("Select a value greater than 'From'");
				}
				// }

				oEvent.getSource().setValue("");
			}
			//from logic and other
			else {
				var oMultiInput = this.byId(this._getId("VendorMatFrom"));
				if (this.selectedVendorMatFrom.length === 0) {
					this.selectedVendorMatFrom.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: oEvent.getParameters().value
					}));
				} else {
					if (this.selectedVendorMatFrom.includes(oEvent.getParameters().value) === false) {
						this.selectedVendorMatFrom.push(oEvent.getParameters().value);
						oMultiInput.addToken(new Token({
							text: oEvent.getParameters().value
						}));
					}
				}
				if (this.selectedVendorMatFrom.length === 1) {
					this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
					this.getView().getModel("baseModel").refresh();
				} else {
					this.getView().getModel("baseModel").setProperty("/enableVendorMat", false);
					this.getView().getModel("baseModel").refresh();
				}
				oEvent.getSource().setValue("");
			}
		},

		onDeleteVenMat: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("VendorMatTo"));
				oMultiInput.destroyTokens();
				this.selectedVendorMatTo.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("VendorMatFrom"));
					oMultiInput.destroyTokens();
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.selectedVendorMatFrom.length; i >= 0; i--) {
						if (delToken === this.selectedVendorMatFrom[i]) {
							this.selectedVendorMatFrom.splice(i, 1);
						}
					}
					if (this.selectedVendorMatFrom.length > 0) {
						for (var j = 0; j < this.selectedVendorMatFrom.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.selectedVendorMatFrom[j]
							}));
							if (this.selectedVendorMatFrom.length === 1) {
								this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
								this.getView().getModel("baseModel").refresh();
							} else {
								this.getView().getModel("baseModel").setProperty("/enableVendorMat", false);
								this.getView().getModel("baseModel").refresh();
							}
						}
					}
				} else {
					this.selectedVendorMatFrom.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}
		},

		onChangeMatMov: function (oEvent) {
			var oMultiInput = this.byId(this._getId("matMov"));
			if (this.selectedMovType === undefined || this.selectedMovType.length === 0) {
				this.selectedMovType = [];
				this.selectedMovType.push(oEvent.getParameters().value);
				oMultiInput.addToken(new Token({
					text: oEvent.getParameters().value
				}));
			} else {
				if (this.selectedMovType.includes(oEvent.getParameters().value) === false) {
					this.selectedMovType.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: oEvent.getParameters().value
					}));
				}
			}
			oEvent.getSource().setValue("");
		},

		onDeleteMatMov: function (oEvent) {
			var oMultiInput = this.byId(this._getId("matMov"));
			oMultiInput.destroyTokens();
			var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
			if (oEvent.getParameters().type === "removed") {
				for (var i = this.selectedMovType.length; i >= 0; i--) {
					if (delToken === this.selectedMovType[i]) {
						this.selectedMovType.splice(i, 1);
					}
				}
				if (this.selectedMovType.length > 0) {
					for (var j = 0; j < this.selectedMovType.length; j++) {
						oMultiInput.addToken(new Token({
							text: this.selectedMovType[j]
						}));
					}
				}
			} else {
				this.selectedMovType.push(oEvent.getParameters().addedTokens[0].getText());
			}
		},

		onChangeVenConsMat: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.venConsMaterial = "venConsMaterial eq " + "'X'";
				this.ownStkMaterial = undefined;
				this.allMaterials = undefined;
				// this.byEndingPeriod = undefined;
				// this.getView().getModel("baseModel").setProperty("/month", "");
				// this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", "");
			} else {
				this.venConsMaterial = undefined;
			}
		},

		onChangeOwnStkMat: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.ownStkMaterial = "ownStkMaterial eq " + "'X'";
				// this.byAsAtDate = undefined;
				this.venConsMaterial = undefined;
				this.allMaterials = undefined;
				// this.byEndingPeriod = undefined;
				// this.getView().getModel("baseModel").setProperty("/month", "");
				// this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", "");
			} else {
				this.ownStkMaterial = undefined;
			}
		},

		onChangeAllMat: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.allMaterials = "allMaterials eq " + "'X'";
				// this.byEndingPeriod = undefined;
				// this.byAsAtDate = undefined;
				this.ownStkMaterial = undefined;
				this.venConsMaterial = undefined;
				// this.getView().getModel("baseModel").setProperty("/month", "");
				// this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", "");
			} else {
				this.allMaterials = undefined;
			}
		},

		onChangeEndingPer: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.byEndingPeriod = "byEndingPeriod eq " + "'X'";
				// this.allMaterials = undefined;
				this.byAsAtDate = undefined;
				// this.ownStkMaterial = undefined;
				// this.venConsMaterial = undefined;
				// this.getView().getModel("baseModel").setProperty("/month", "");
				this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", null);
			} else {
				this.byEndingPeriod = undefined;
			}
		},

		onChangeAsDate: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.byAsAtDate = "byAsAtDate eq " + "'X'";
				this.byEndingPeriod = undefined;
				// this.allMaterials = undefined;
				// this.ownStkMaterial = undefined;
				// this.venConsMaterial = undefined;
				this.getView().getModel("baseModel").setProperty("/month", null);
				// this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", null);
			} else {
				this.byAsAtDate = undefined;
			}
		},

		onChangeExcFDAStck: function (oEvent) {
			var flag = oEvent.getSource().getSelected();
			if (flag === true) {
				this.exFdaStock = "exFdaStock eq " + "'X'";
			} else {
				this.exFdaStock = undefined;
			}
		},

		onChangeFromDate: function (oEvent) {
			if (oEvent.getParameters().valid) {
				var date = this.getView().getModel("baseModel").getData().endingStockDateFrom;
				if (date === NaN || date === "") {
					date = "";
				}
				var d = this.formatter.dateTimeFormat(date);
				// var d = new Date(date).getFullYear().toString() + new Date(date).getMonth().toString() + new Date(date).getDate().toString();
				// this.expiryDate = "expiredDate ge datetime" + "'" + d + "'";

				if (date) {
					this.endingStckDateFrom = "currentDate eq datetime" + "'" + d + "'";
				}
			} else {
				this.getView().getModel("baseModel").getData().endingStockDateFrom = null;
			}
		},

		onChangeToDate: function (oEvent) {
			if (!this.endingStckDateFrom) {
				MessageToast.show("Add from date");
				return;
			}
			var date = oEvent.getParameters().value;
			if (date === NaN) {
				date = "";
			}
			this.endingStckDateTo = "currentDate eq" + "'" + date + "'";
		},

		onChangeSalesUnit: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.salesUnit = "salesUnit eq " + "'X'";
				this.baseUnit = undefined;
			} else {
				this.salesUnit = undefined;
			}
		},

		onChangeBaseUnit: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.baseUnit = "baseUnit eq " + "'X'";
				this.salesUnit = undefined;
			} else {
				this.baseUnit = undefined;
			}
		},

		onChangeUnrestricted: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.Unrestricted = "unrestricted eq " + "'X'";
			} else {
				this.Unrestricted = undefined;
			}
		},

		onChangeInspection: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.inspection = "qtyInspection eq " + "'X'";
			} else {
				this.inspection = undefined;
			}
		},

		onChangeBlocked: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.blocked = "block eq " + "'X'";
			} else {
				this.blocked = undefined;
			}
		},

		onChangeBatchLevel: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.BatchLevel = "batchLevel eq " + "'X'";
			} else {
				this.SlocLevel = undefined;
			}
		},

		onChangeSLocLevel: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.SlocLevel = "storageLocLevel eq " + "'X'";
			} else {
				this.BatchLevel = undefined;
			}
		},

		_getId: function (field, prevSelectedTab) {
			if (prevSelectedTab !== undefined) {
				var tab = prevSelectedTab;
			} else {
				var tab = this.selectedTab;
			}
			if (tab === "keyATPOverviewEnquiry") {
				if (field === "SalesOrgTo") {
					return "ATPSalesOrgFromID";
				}
				if (field === "SLocFrom") {
					return "ATPSLocFromId";
				}
				if (field === "SLocTo") {
					return "ATPSLocToId";
				}
				if (field === "SalesOrgFrom") {
					return "ATPSalesOrgFromID";
				}
				if (field === "MatGrpFrom") {
					return "ATPMatGrpFromId";
				}
				if (field === "MatGrpTo") {
					return "ATPMatGrpToId";
				}
				if (field === "MatGrp4From") {
					return "ATPMatGrp4FromId";
				}
				if (field === "MatGrp4To") {
					return "ATPMatGrp4ToId";
				}
				if (field === "MaterialFrom") {
					return "ATPMatFromId";
				}
				if (field === "MaterialTo") {
					return "ATPMatToId";
				}
				if (field === "VendorMatFrom") {
					return "ATPVenMatFromId";
				}
				if (field === "VendorMatTo") {
					return "ATPVenMatToId";
				}
			}
			if (tab === "keyEndingStockView") {
				if (field === "PlantFrom") {
					return "EndStckPlantFromId";
				}

				if (field === "SLocFrom") {
					return "EndStckSLocFromId";
				}
				if (field === "SLocTo") {
					return "EndStckSLocToId";
				}
				if (field === "MatGrpFrom") {
					return "EndStckMatGrpFromId";
				}
				if (field === "MatGrpTo") {
					return "EndStckMatGrpToId";
				}
				if (field === "MatGrp4From") {
					return "EndStckMatGrp4FromId";
				}
				if (field === "MatGrp4To") {
					return "EndStckMatGrp4ToId";
				}
				if (field === "MaterialFrom") {
					return "EndStckMatFromId";
				}
				if (field === "MaterialTo") {
					return "EndStckMatToId";
				}
				if (field === "VendorMatFrom") {
					return "EndStckVenMatFromId";
				}
				if (field === "VendorMatTo") {
					return "EndStckVenMatToId";
				}
			}
			if (tab === "keyExpiryStockView") {
				if (field === "PlantFrom") {
					return "ExpStckPlantFromId";
				}
				if (field === "SLocFrom") {
					return "ExpStckSLocFromId";
				}
				if (field === "SLocTo") {
					return "ExpStckSLocToId";
				}
				if (field === "MatGrpFrom") {
					return "ExpStckMatGrpFromId";
				}
				if (field === "MatGrpTo") {
					return "ExpStckMatGrpToId";
				}
				if (field === "MatGrp4From") {
					return "ExpStckMatGrp4FromId";
				}
				if (field === "MatGrp4To") {
					return "ExpStckMatGrp4ToId";
				}
				if (field === "MaterialFrom") {
					return "ExpStckMatFromId";
				}
				if (field === "MaterialTo") {
					return "ExpStckMatToId";
				}
				if (field === "VendorMatFrom") {
					return "ExpStckVenMatFromId";
				}
				if (field === "VendorMatTo") {
					return "ExpStckVenMatToId";
				}
			}

			if (tab === "keyMat.Movement") {
				if (field === "PlantFrom") {
					return "MatMovPlantFromId";
				}
				if (field === "SLocFrom") {
					return "MatMovSLocFromId";
				}
				if (field === "MatGrpFrom") {
					return "MatMovMatGrpFromId";
				}
				if (field === "MatGrp4From") {
					return "MatMovMatGrp4FromId";
				}
				if (field === "MaterialFrom") {
					return "MatMovMatFromId";
				}
				if (field === "BatchFrom") {
					return "MatMovBatchFromId";
				}
				if (field === "VendorMatFrom") {
					return "MatMovVenMatFromId";
				}
				if (field === "VendorMatTo") {
					return "MatMovVenMatToId";
				}
				if (field === "MatDoc") {
					return "MatMovMatDocFromId";
				}
				if (field === "matMov") {
					return "matMov";
				}

			}
			if (tab === "keyStkLotView") {
				if (field === "PlantFrom") {
					return "StockLotPlantFromId";
				}
				if (field === "PlantTo") {
					return "StockLotPlantToId";
				}
				if (field === "SLocTo") {
					return "StockLotSlocToId";
				}
				if (field === "SLocFrom") {
					return "StockLotSlocFromId";
				}
				if (field === "MatGrpFrom") {
					return "StockLotMatGrpFromId";
				}
				if (field === "MatGrpTo") {
					return "StockLotMatGrpToId";
				}
				if (field === "BatchFrom") {
					return "stockLotBatchFromId";
				}

				if (field === "SalesOrgFrom") {
					return "StkLotSalesOrgFromID";
				}
				if (field === "SalesOrgTo") {
					return "StkLotSalesOrgToID";
				}
				if (field === "MatGrp4From") {
					return "StkLotMatGrp4FromId";
				}
				if (field === "MatGrp4To") {
					return "StkLotMatGrp4ToId";
				}
				if (field === "MaterialFrom") {
					return "StkLotMatFromId";
				}
				if (field === "MaterialTo") {
					return "StkLotMatToId";
				}
				if (field === "VendorMatFrom") {
					return "StkLotVenMatFromId";
				}
				if (field === "VendorMatTo") {
					return "StkLotVenMatToId";
				}
			}
		},

		onLiveChangeMatGrp: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialGroupDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onLiveChangeMatGrp4: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialGroup4Desc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onLiveChangePlant: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("plantName", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onLiveChangeSalesOrg: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("SalesorgDesc", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		onLiveChangeStoLoc: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("storagelocationDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		clearTabData: function () {
			var oMultiInput = this.byId(this._getId("PlantFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("SLocFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("SLocTo"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MaterialFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MaterialTo"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MatGrp4From"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MatGrp4To"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MatGrpFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MatGrpTo"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("SalesOrgFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("BatchFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("VendorMatFrom"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("VendorMatTo"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("MatDoc"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			var oMultiInput = this.byId(this._getId("matMov"));
			if (oMultiInput !== undefined) {
				oMultiInput.destroyTokens();
			}
			this.expiryDateFrom = undefined;
			this.expiryDateTo = undefined;

			this.selectedMovType = undefined;
			this.expiryDate = undefined;
			this.Unrestricted = undefined;
			this.BatchNum = undefined;
			this.RawMat = undefined;
			this.showQty = undefined;
			this.SalesMat = undefined;
			this.ZeroStk = undefined;
			this.onlyChBufferStk = undefined;
			this.onlyShowSalesUQ = undefined;
			this.onlyQI = undefined;
			this.onlyShowAllStk = undefined;
			this.serialNo = undefined;
			this.serialNo = undefined;
			this.BatchLevel = undefined;
			this.SlocLevel = undefined;
			this.Unrestricted = undefined;
			this.inspection = undefined;
			this.blocked = undefined;
			this.salesUnit = undefined;
			this.baseUnit = undefined;
			this.exFdaStock = undefined;
			this.endingStckDateFrom = undefined;
			this.spMonth = undefined;
			this.venConsMaterial = undefined;
			this.ownStkMaterial = undefined;
			this.allMaterials = undefined;
			this.byEndingPeriod = undefined;
			this.postingDateFrom = undefined;
			this.postingDateTo = undefined;
			this.spMonth = undefined;
			this.selectedObjects = [];
			this.selectedMatFromItems = [];
			this.selectedMatToItems = [];
			this.SLocToSelectedItems = [];
			this.SLocFromSelectedItems = [];
			this.plantFromSelectedItems = [];
			this.MatGrpFromSelectedItems = [];
			this.MatGrpToSelectedItems = [];
			this.MatGrp4FromSelectedItems = [];
			this.MatGrp4ToSelectedItems = [];
			this.selectedMatDocItems = [];
			this.selectedBatch = [];
			this.selectedVendorMat = [];
			this.selectedSalesOrg = [];
			this.selectedBatchStkLot = [];
			this.salesOrgFromSelectedItems = [];
			this.selectedSalesOrg = [];
			this.plantToSelectedItems = [];
			this.selectedVendorMatFrom = [];
			this.selectedVendorMatTo = [];
			this.selectedVendorMatFrom = [];
			this.selectedVendorMatTo = [];
			if (this._oPopover) {
				this._oPopover = undefined;
			}

			if (this.getView().getModel("endingStckTableModel")) {
				this.getView().getModel("endingStckTableModel").setData("");
				if (this.getView().getModel("endingStckPopoverModel")) {
					this.getView().getModel("endingStckPopoverModel").setData("");
					this.getView().getModel("endingStckPopoverModel").refresh();
				}
				this.getView().getModel("endingStckTableModel").refresh();
			}
			if (this.getView().getModel("expiryStckTableModel")) {
				this.getView().getModel("expiryStckTableModel").setData("");
				if (this.getView().getModel("expiryStckPopoverModel")) {
					this.getView().getModel("expiryStckPopoverModel").setData("");
					this.getView().getModel("expiryStckPopoverModel").refresh();
					this._oPopover = undefined;
				}
				this.getView().getModel("expiryStckTableModel").refresh();
			}
			if (this.getView().getModel("mavMovTableModel")) {
				this.getView().getModel("mavMovTableModel").setData("");
				if (this.getView().getModel("matMovPopoverModel")) {
					this.getView().getModel("matMovPopoverModel").setData("");
					this.getView().getModel("matMovPopoverModel").refresh();
					this._oPopover = undefined;
				}
				this.getView().getModel("mavMovTableModel").refresh();
			}
			if (this.getView().getModel("ATPOverviewTableModel")) {
				this.getView().getModel("ATPOverviewTableModel").setData("");
				if (this.getView().getModel("ATPPopoverModel")) {
					this.getView().getModel("ATPPopoverModel").setData("");
					this.getView().getModel("ATPPopoverModel").refresh();
					this._oPopover = undefined;
				}
				this.getView().getModel("ATPOverviewTableModel").refresh();
			}
			if (this.getView().getModel("stockLotModel")) {
				this.getView().getModel("stockLotModel").setData("");
				if (this.getView().getModel("StkLotPopoverModel")) {
					this.getView().getModel("StkLotPopoverModel").setData("");
					this.getView().getModel("StkLotPopoverModel").refresh();
					this._oPopover = undefined;
				}
				this.getView().getModel("stockLotModel").refresh();
			}
			this.getView().getModel("endingStckTableModel");
			this.getView().getModel("PersonalizationModel").setProperty("/selectVarVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/nameVarVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/enableCheckBox", false);
			this.getView().getModel("PersonalizationModel").setProperty("/okPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/savePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/cancelPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/deletePersBtnVisible", false);
			this.getView().getModel("PersonalizationModel").setProperty("/createPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/editPersBtnVisible", true);
			this.getView().getModel("PersonalizationModel").setProperty("/varinatNameValueState", "None");
			this.getView().getModel("baseModel").setProperty("/SalesOrgValueState", "None");
			this.getView().getModel("baseModel").setProperty("/matGrpValueState", "None");
			this.getView().getModel("baseModel").setProperty("/EndingStckplantValueState", "None");
			this.getView().getModel("baseModel").setProperty("/EndingStckSLocValueState", "None");
			this.getView().getModel("baseModel").setProperty("/postingDateValueStateFrom", "None");
			this.getView().getModel("baseModel").setProperty("/blocked", false);
			this.getView().getModel("PersonalizationModel").refresh();
			this.getView().getModel("baseModel").setProperty("/plantTo", "");
			this.getView().getModel("baseModel").setProperty("/plantFrom", "");
			this.getView().getModel("baseModel").setProperty("/salesOrgFrom", "");
			this.getView().getModel("baseModel").setProperty("/salesOrgTo", "");
			this.getView().getModel("baseModel").setProperty("/matTo", "");
			this.getView().getModel("baseModel").setProperty("/matFrom", "");
			this.getView().getModel("baseModel").setProperty("/matGrpTo", "");
			this.getView().getModel("baseModel").setProperty("/matGrpFrom", "");
			this.getView().getModel("baseModel").setProperty("/matGrp4To", "");
			this.getView().getModel("baseModel").setProperty("/matGrp4From", "");
			this.getView().getModel("baseModel").setProperty("/vendMatTo", "");
			this.getView().getModel("baseModel").setProperty("/vendMatFrom", "");
			this.getView().getModel("baseModel").setProperty("/SLocTo", "");
			this.getView().getModel("baseModel").setProperty("/SLocFrom", "");
			this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
			this.getView().getModel("baseModel").setProperty("/postingDateFrom", null);
			this.getView().getModel("baseModel").setProperty("/postingDateTo", null);
			this.getView().getModel("baseModel").setProperty("/endingStockDateFrom", null);
			this.getView().getModel("baseModel").setProperty("/movementTypeFrom", "");
			this.getView().getModel("baseModel").setProperty("/matDocFrom", "");
			this.getView().getModel("baseModel").setProperty("/expDateFrom", null);
			this.getView().getModel("baseModel").setProperty("/expDateTo", null);
			this.getView().getModel("baseModel").setProperty("/month", null);
			this.getView().getModel("baseModel").setProperty("/vendMatFrom", "");
			this.getView().getModel("baseModel").setProperty("/vendMatTo", "");
			this.getView().getModel("baseModel").setProperty("/enablematTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrpTo", true);
			this.getView().getModel("baseModel").setProperty("/enablematGrp4To", true);
			this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
			this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
			this.getView().getModel("baseModel").setProperty("/enableVendorMat", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelAllMaterial", true);
			this.getView().getModel("baseModel").setProperty("/batchLevel", false);
			//modify by XRAINERH on 30Aug2022 2:25PM
			//begin - STRY0017819
			//this.getView().getModel("baseModel").setProperty("/sLocLevel", false);
			this.getView().getModel("baseModel").setProperty("/sLocLevel", true);
			//end - STRY0017819
			this.getView().getModel("baseModel").setProperty("/serialNo", false);
			this.getView().getModel("baseModel").setProperty("/excludeFda", false);
			this.getView().getModel("baseModel").setProperty("/salesUnit", false);
			this.getView().getModel("baseModel").setProperty("/baseUnit", true);
			this.getView().getModel("baseModel").setProperty("/unrestricted", false);
			this.getView().getModel("baseModel").setProperty("/QI", false);
			this.getView().getModel("baseModel").setProperty("/rawMaterial", false);
			this.getView().getModel("baseModel").setProperty("/IncBufferStockStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowSalesUqtyStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/ShowAllStocksStkLotVal", true);
			this.getView().getModel("baseModel").setProperty("/onlyQIStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/onlyUnrestStkLotVal", false);
			this.getView().getModel("baseModel").setProperty("/showStock", false);
			this.getView().getModel("baseModel").setProperty("/showQTY", false);
			this.getView().getModel("baseModel").setProperty("/salesMat", false);
			// this.getView().getModel("baseModel").setProperty("/salesMat", false);
			this.allMaterials = "allMaterials eq " + "'X'";
			this.byEndingPeriod = "byEndingPeriod eq " + "'X'";
			this.onlyShowAllStk = "allStock eq " + "'X'";
			this.getView().getModel("baseModel").setProperty("/EndingStckSelVenConsMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelchngeOwnStkMat", false);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelEndPrd", true);
			this.getView().getModel("baseModel").setProperty("/EndingStckSelByAsDte", false);
			this.getView().getModel("baseModel").refresh();
		},

		createColumnConfigEndingStock: function () {
			return [{
				label: 'Material',
				property: 'materialNum'
			}, {
				label: 'Material Description',
				property: 'materialDesc'

			}, {
				label: 'Quantity',
				property: 'bigQuantity',
			}, {
				label: 'Unit',
				property: 'saleUnit'
			}, {
				label: 'Storage Location',
				property: 'storageLocation'
			}, {
				// [+] START Modification: STRY0014744:MY Enhancements SLOC Description -	JAYAMALARJ
				label: 'Storage Loc Desc',
				property: 'storageLocationDesc'
					// [+] END Modification: STRY0014744:MY Enhancements SLOC Description -	JAYAMALARJ
			}, {
				label: 'Old Code',
				property: 'oldCode'
			}, {
				label: 'Vendor Material',
				property: 'vendorMaterial'
			}, {
				label: 'Real Batch',
				property: 'realBatch'
			}, {
				label: 'Expiry Date',
				property: 'expireDateReport'
			}, {
				label: 'Manufacture Date',
				property: 'manufDateReport'
			}, {
				label: 'Per Pack',
				property: 'perPack'
			}, {
				label: 'Value',
				property: 'value'
			}, {
				label: 'Serial Number',
				property: 'serialNum'
			}];
		},

		createColumnConfigATPOverview: function () {
			return [{
				label: 'Material',
				property: 'materialNum'
			}, {
				label: 'Material Description',
				property: 'materialDesc'

			}, {
				label: 'Plant',
				property: 'plant',
			}, {
				label: 'Storage Location',
				property: 'storageLocation'
			}, {
				label: 'Batch',
				property: 'batchNumber'
			}, {
				label: 'Exp. Date',
				property: 'expiredDateReport'
			}, {
				label: 'Stock Qty',
				property: 'stockQty'
			}, {
				label: 'Req. Qty',
				property: 'requiredQty'
			}, {
				label: 'Confirm Qty',
				property: 'confirmQty'
			}, {
				label: 'ATP Qty',
				property: 'atpQty'
			}, {
				label: 'Short Qty',
				property: 'shortQtyReport'
			}, {
				label: 'Unit',
				property: 'baseUnit'
			}, {
				label: 'LTP/Price',
				property: 'ltpPrice'
			}, {
				label: 'Serial No',
				property: 'serialNum'
			}];
		},

		createColumnConfigExpiryStock: function () {
			return [{
				label: 'Material',
				property: 'materialNum'
			}, {
				label: 'Material Description',
				property: 'materialDesc'

			}, {
				label: 'Material Group',
				property: 'materialGroup',
			}, {
				label: 'Material Group Description',
				property: 'matGroupDesc'
			}, {
				label: 'Batch',
				property: 'batch'
			}, {
				label: 'Expiry Date',
				property: 'shelflLifeDateReport'
			}, {
				label: 'Manufacture Date',
				property: 'manufDateReport'
			}, {
				label: 'Material Group4',
				property: 'materialGroup4'
			}, {
				label: 'Material Group4 Description',
				property: 'matGroup4Desc'
			}, {
				label: 'Vendor Material',
				property: 'prodInsMemo'
			}, {
				label: 'Long Batch',
				property: 'batch'
			}, {
				label: 'RSL Days',
				property: 'rslDays'
			}, {
				label: 'Storage Location',
				property: 'storageLocation'
			}, {
				label: 'Unit',
				property: 'baseUOM'
			}, {
				label: 'Value',
				property: 'rate'
			}, {
				label: 'Expired',
				property: 'expired'
			}, {
				label: '3 Months',
				property: 'expired3'
			}, {
				label: '6 Months',
				property: 'expired6'
			}, {
				label: '9 Months',
				property: 'expired9'
			}, {
				label: '12 Months',
				property: 'expired12'
			}, {
				label: '15 Months',
				property: 'expired15'
			}, {
				label: '18 Months',
				property: 'expired18'
			}, {
				label: 'Serial No',
				property: 'serialNum'
			}];
		},

		createColumnConfigMatMov: function () {
			return [{
				label: 'Material',
				property: 'materialNum'
			}, {
				label: 'Material Description',
				property: 'materialDesc'

			}, {
				label: 'Material Document',
				property: 'materialDocument',
			}, {
				label: 'Material Vendor',
				property: 'vendorMaterial',
			}, {
				label: 'Storage Location',
				property: 'storageLocation'
			}, {
				label: 'Batch',
				property: 'batchNumber'
			}, {
				label: 'Exp. Date',
				property: 'shelflLifeDateReport'
			}, {
				label: 'Posting Date',
				property: 'postingDateReport'
			}, {
				label: 'Quantity',
				property: 'quantity'
			}, {
				label: 'Sales Quantity',
				property: 'bigQuantity'
			}, {
				label: 'Material Group',
				property: 'materialGroup'
			}, {
				label: 'Material Group Description',
				property: 'materialGroupDesc'
			}, {
				label: 'Material Group4',
				property: 'materialGroup4'
			}, {
				label: 'Base Unit',
				property: 'baseUnit'
			}, {
				label: 'Sale Unit',
				property: 'saleUnit'
			}, {
				label: 'GR/GI Storage Location',
				property: 'receivingStorageLocation'
			}, {
				label: 'Per Pack',
				property: 'packSize'
			}, {
				label: 'Spc. IND',
				property: 'splStockIndicator'
			}, {
				label: 'Movement',
				property: 'movementType'
			}, {
				label: 'Movement Description',
				property: 'textStockType'
			}, {
				label: 'DO Number',
				property: 'referenceDocNum'
			}, {
				label: 'Header Note',
				property: 'headerNote'
			}, {
				label: 'Serial No',
				property: 'serialNum'
			}];
		},

		// onExportATPoverview: function () {
		// 	var arr = [];
		// 	var data = this.getView().getModel("ATPOverviewTableModel").getData().results;
		// 	for (var i = 0; i < data.length; i++) {
		// 		data[i].expiredDateReport = formatter.convertToDateToDispFormat(data[i].expiredDate);
		// 		data[i].shortQtyReport = formatter.shortQty(data[i].shortQty);
		// 		if (data[i].shortQtyReport !== "SUM") {
		// 			data[i].shortQtyReport = parseFloat(data[i].shortQtyReport);
		// 		}
		// 		if (data[i].requiredQty !== "SUM") {
		// 			data[i].requiredQty = parseFloat(data[i].requiredQty);
		// 		}
		// 		if (data[i].confirmQty !== "SUM") {
		// 			data[i].confirmQty = parseFloat(data[i].confirmQty);
		// 		}
		// 		if (data[i].atpQty !== "SUM") {
		// 			data[i].atpQty = parseFloat(data[i].atpQty);
		// 		}
		// 		if (data[i].ltpPrice !== "SUM") {
		// 			data[i].ltpPrice = parseFloat(data[i].ltpPrice);
		// 		}
		// 		if (data[i].stockQty !== "SUM") {
		// 			data[i].stockQty = parseFloat(data[i].stockQty);
		// 		}

		// 		// this.getView
		// 		// if (result[i].storageLocation === "SUM" || result[i].batchNumber === "SUM") {
		// 		// 	result[i].atpQty = "SUM";
		// 		// 	result[i].shortQty = "SUM";
		// 		// }
		// 	}
		// 	var defaultVariant = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
		// 	var cols = [];
		// 	for (var i = 0; i < defaultVariant.length; i++) {
		// 		if (defaultVariant[i].status === true) {
		// 			if (defaultVariant[i].enabledKey === "Material") {
		// 				var key = {
		// 					label: 'Material',
		// 					property: 'materialNum'
		// 				};
		// 				cols.push(key);
		// 				var key = {
		// 					label: 'Material Description',
		// 					property: 'materialDesc'
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Plant") {
		// 				var key = {
		// 					label: 'Plant',
		// 					property: 'plant',
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Serial No.") {
		// 				var key = {
		// 					label: 'Serial No',
		// 					property: 'serialNum'
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "SLOC") {
		// 				var key = {
		// 					label: 'Storage Location',
		// 					property: 'storageLocation'
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Batch") {
		// 				var key = {
		// 					label: 'Batch',
		// 					property: 'batchNumber'
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Exp. Date") {
		// 				var key = {
		// 					label: 'Exp. Date',
		// 					property: 'expiredDateReport'
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Req. Qty") {
		// 				var key = {
		// 					label: 'Req. Qty',
		// 					property: 'requiredQty',
		// 					type: sap.ui.export.EdmType.Number,
		// 					scale: 3
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Confirm Qty") {
		// 				var key = {
		// 					label: 'Confirm Qty',
		// 					property: 'confirmQty',
		// 					type: sap.ui.export.EdmType.Number,
		// 					scale: 3
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "ATP Qty") {
		// 				var key = {
		// 					label: 'ATP Qty',
		// 					property: 'atpQty',
		// 					type: sap.ui.export.EdmType.Number,
		// 					scale: 3
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Short Qty") {
		// 				var key = {
		// 					label: 'Short Qty',
		// 					property: 'shortQtyReport',
		// 					type: sap.ui.export.EdmType.Number,
		// 					scale: 3
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Unit") {
		// 				var key = {
		// 					label: 'Unit',
		// 					property: 'baseUnit'
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "LTP/Price") {
		// 				var key = {
		// 					label: 'LTP/Price',
		// 					property: 'ltpPrice',
		// 					type: sap.ui.export.EdmType.Number,
		// 					scale: 3
		// 				};
		// 				cols.push(key);
		// 			} else if (defaultVariant[i].enabledKey === "Stock Qty") {
		// 				var key = {
		// 					label: 'Stock Qty',
		// 					property: 'stockQty',
		// 					type: sap.ui.export.EdmType.Number,
		// 					scale: 3
		// 				};
		// 				cols.push(key);
		// 			}

		// 		}
		// 	}
		// 	this._onExport(data, cols);
		// },

		onExportATPoverview: function (JSONData, ReportTitle, ShowLabel) {
			var JSONData = this.getView().getModel("ATPOverviewTableModel").getData().results;
			var ReportTitle = "ATP Overview";
			var ShowLabel = true;
			var arr = [];
			var arrData = JSONData;
			var CSV = '';
			var that = this;
			// Set Report title in first row or line

			CSV += ReportTitle + '\r\n';

			if (ShowLabel) {

				var row = "";

				row = row.slice(0, -1);

				CSV += row + '\r\n';

			}
			var defaultVariant = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			// var cols = [];

			var row1 = "";
			var row = "";
			for (var k = 0; k < defaultVariant.length; k++) {
				if (defaultVariant[k].status === true) {
					if (defaultVariant[k].enabledKey === "Material") {
						row1 = row1 + '"' + "Material Num" + '","' + "Material Desc" + '","';
					} else if (defaultVariant[k].enabledKey === "Plant") {
						row1 = row1 + "Plant" + '","';
					} else if (defaultVariant[k].enabledKey === "Plant Desc") {
						row1 = row1 + "Plant Desc" + '","';
					} else if (defaultVariant[k].enabledKey === "Serial No.") {
						row1 = row1 + "Serial No." + '","';
					} else if (defaultVariant[k].enabledKey === "SLOC") {
						row1 = row1 + "Storage Location" + '","';
					} else if (defaultVariant[k].enabledKey === "SLOC Desc") {
						row1 = row1 + "Storage Location Desc" + '","';
					} else if (defaultVariant[k].enabledKey === "Batch") {
						row1 = row1 + "Batch" + '","';
					} else if (defaultVariant[k].enabledKey === "Exp. Date") {
						row1 = row1 + "Expiry Date" + '","';
						// arrData[i].salesUOM + '","';
					} else if (defaultVariant[k].enabledKey === "Req. Qty") {
						row1 = row1 + "Req. Qty" + '","';
					} else if (defaultVariant[k].enabledKey === "Confirm Qty") {
						row1 = row1 + "Confirm Qty" + '","';
					} else if (defaultVariant[k].enabledKey === "ATP Qty") {
						row1 = row1 + "ATP Qty" + '","';
					} else if (defaultVariant[k].enabledKey === "Short Qty") {
						row1 = row1 + "Short Qty" + '","';
					} else if (defaultVariant[k].enabledKey === "Unit") {
						row1 = row1 + "Unit" + '","';
					} else if (defaultVariant[k].enabledKey === "LTP/Price") {
						row1 = row1 + "LTP/Price" + '","';
					} else if (defaultVariant[k].enabledKey === "Stock Qty") {
						row1 = row1 + "Stock Qty" + '","';
					}
					if (k === defaultVariant.length - 1) {

					}
				}

			}
			row1 = row1.slice(0, row1.length - 3);
			row1 = row1 + '",';
			CSV += row1 + '\r\n';
			for (var i = 0; i < arrData.length; i++) {
				var row = "";
				for (var k = 0; k < defaultVariant.length; k++) {

					if (defaultVariant[k].status === true) {
						if (defaultVariant[k].enabledKey === "Material") {
							row = row + '"' + arrData[i].materialNum + '","' + arrData[i].materialDesc + '","';
						} else if (defaultVariant[k].enabledKey === "Plant") {
							row = row + arrData[i].plant + '","';
						} else if (defaultVariant[k].enabledKey === "Plant Desc") {
							row = row + arrData[i].Plantdesc + '","';
						} else if (defaultVariant[k].enabledKey === "Serial No.") {
							row = row + arrData[i].serialNum + '","';
						} else if (defaultVariant[k].enabledKey === "SLOC") {
							row = row + arrData[i].storageLocation + '","';
						} else if (defaultVariant[k].enabledKey === "SLOC Desc") {
							row = row + arrData[i].storagelocationDesc + '","';
						} else if (defaultVariant[k].enabledKey === "Batch") {
							row = row + arrData[i].batchNumber + '","';
						} else if (defaultVariant[k].enabledKey === "Exp. Date") {
							row = row + formatter.convertToDateToDispFormat(arrData[i].expiredDate) + '","';
						} else if (defaultVariant[k].enabledKey === "Req. Qty") {
							if (arrData[i].requiredQty !== "SUM") {
								row = row + parseFloat(arrData[i].requiredQty) + '","';
							} else {
								row = row + arrData[i].requiredQty + '","';
							}
						} else if (defaultVariant[k].enabledKey === "Confirm Qty") {
							if (arrData[i].confirmQty !== "SUM") {
								row = row + parseFloat(arrData[i].confirmQty) + '","';
							} else {
								row = row + arrData[i].confirmQty + '","';
							}
						} else if (defaultVariant[k].enabledKey === "ATP Qty") {
							if (arrData[i].atpQty !== "SUM") {
								row = row + parseFloat(arrData[i].atpQty) + '","';
							} else {
								row = row + arrData[i].atpQty + '","';
							}
						} else if (defaultVariant[k].enabledKey === "Short Qty") {
							var shortQtyReport = formatter.shortQty(arrData[i].shortQty);
							if (shortQtyReport !== "SUM") {
								row = row + parseFloat(shortQtyReport) + '","';
							} else {
								row = row + shortQtyReport + '","';
							}
						} else if (defaultVariant[k].enabledKey === "Unit") {
							row = row + arrData[i].baseUnit + '","';
						} else if (defaultVariant[k].enabledKey === "LTP/Price") {
							row = row + arrData[i].ltpPrice + '","';
						} else if (defaultVariant[k].enabledKey === "Stock Qty") {
							row = row + parseFloat(arrData[i].stockQty) + '","';
						}
						if (k === defaultVariant.length - 1) {

						}
					}

				}
				row = row.slice(0, (row.length - 1));
				CSV += row + '\r\n';
			}
			CSV += '\r\n';
			// }
			if (CSV === "") {

				sap.m.MessageToast.show("Invaild data");

				return;

			}

			// Generate a file name

			var fileName = "";

			fileName += ReportTitle.replace(/ /g, "_");

			// Initialize file format you want csv or xls

			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

			var link = document.createElement("a");

			link.href = uri;

			link.style = "visibility:hidden";

			link.download = fileName + ".csv";

			// this part will append the anchor tag and remove it after automatic

			// click

			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);

		},

		onExportEndingStock: function () {

			var arr = [];
			var data = this.getView().getModel("endingStckTableModel").getData().results;
			for (var i = 0; i < data.length; i++) {
				data[i].expireDateReport = formatter.date(data[i].expireDate);
				data[i].manufDateReport = formatter.manufDate(data[i].manufDate);
				data[i].bigQuantity = parseFloat(data[i].bigQuantity);
				data[i].value = parseFloat(data[i].value);
				data[i].perPack = parseFloat(data[i].perPack);
			}
			var defaultVariant = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var cols = [];
			for (var i = 0; i < defaultVariant.length; i++) {
				if (defaultVariant[i].status === true) {
					if (defaultVariant[i].enabledKey === "Material") {
						var key = {
							label: 'Material',
							property: 'materialNum'
						};
						cols.push(key);
						var key = {
							label: 'Material Description',
							property: 'materialDesc'

						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Old Mat No.") {
						var key = {
							label: 'Old Code',
							property: 'oldCode'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Vendor Mat.") {
						var key = {
							label: 'Vendor Material',
							property: 'vendorMaterial'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "SLOC") {
						var key = {
							label: 'Storage Location',
							property: 'storageLocation'
						};
						cols.push(key);
						// [+] START Modification: STRY0014744:MY Enhancements SLOC Description -	JAYAMALARJ
					} else if (defaultVariant[i].enabledKey === "SLOC Desc") {
						var key = {
							label: 'Storage Location Desc',
							property: 'storageLocationDesc'
						};
						cols.push(key);
						// [+] END Modification: STRY0014744:MY Enhancements SLOC Description -	JAYAMALARJ
					} else if (defaultVariant[i].enabledKey === "Real Batch") {
						var key = {
							label: 'Real Batch',
							property: 'realBatch'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Exp. Date") {
						var key = {
							label: 'Expiry Date',
							property: 'expireDateReport'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Manu. Date") {
						var key = {
							label: 'Manufacture Date',
							property: 'manufDateReport'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Per Pack") {
						var key = {
							label: 'Per Pack',
							property: 'perPack',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Sales Qty") {
						var key = {
							label: 'Quantity',
							property: 'bigQuantity',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Value (LTP * QTY)") {
						var key = {
							label: 'Value',
							property: 'value',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Serial No.") {
						var key = {
							label: 'Serial Number',
							property: 'serialNum'
						};
						cols.push(key);
					}
				}
			}
			this._onExport(data, cols);
		},

		onExportExpiryStock: function () {
			var arr = [];
			var data = this.getView().getModel("expiryStckTableModel").getData().results;
			for (var i = 0; i < data.length; i++) {
				data[i].shelflLifeDateReport = formatter.date(data[i].shelflLifeDate);
				data[i].manufDateReport = formatter.manufDate(data[i].manufDate);
				data[i].rate = parseFloat(data[i].rate);
				data[i].expired = parseFloat(data[i].expired);
				data[i].expired3 = parseFloat(data[i].expired3);
				data[i].expired6 = parseFloat(data[i].expired6);
				data[i].expired9 = parseFloat(data[i].expired9);
				data[i].expired12 = parseFloat(data[i].expired12);
				data[i].expired15 = parseFloat(data[i].expired15);
				data[i].expired18 = parseFloat(data[i].expired18);
			}
			var defaultVariant = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var cols = [];
			for (var i = 0; i < defaultVariant.length; i++) {
				if (defaultVariant[i].status === true) {
					if (defaultVariant[i].enabledKey === "Material Group") {
						var key = {
							label: 'Material Group',
							property: 'materialGroup',
						};
						cols.push(key);
						var key = {
							label: 'Material Group Description',
							property: 'matGroupDesc'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Material Group 4") {
						var key = {
							label: 'Material Group4',
							property: 'materialGroup4'
						};
						cols.push(key);
						var key = {
							label: 'Material Group4 Description',
							property: 'matGroup4Desc'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Material") {
						var key = {
							label: 'Material',
							property: 'materialNum'
						};
						cols.push(key);
						var key = {
							label: 'Material Description',
							property: 'materialDesc'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Vendor Mat.") {
						var key = {
							label: 'Vendor Material',
							property: 'prodInsMemo'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Batch") {
						var key = {
							label: 'Batch',
							property: 'batch'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Long Batch") {
						var key = {
							label: 'Long Batch',
							property: 'batch'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "LTP / Price") {
						var key = {
							label: 'Value',
							property: 'rate',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "RSL Days") {
						var key = {
							label: 'RSL Days',
							property: 'rslDays'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Exp. Date") {
						var key = {
							label: 'Expiry Date',
							property: 'shelflLifeDateReport'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Manu. Date") {
						var key = {
							label: 'Manufacture Date',
							property: 'manufDateReport'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Unit") {
						var key = {
							label: 'Unit',
							property: 'baseUOM'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "SLOC") {
						var key = {
							label: 'Storage Location',
							property: 'storageLocation'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "SLOC Desc") {
						var key = {
							label: 'Storage Location Desc',
							property: 'storageLocationdesc'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Expired") {
						var key = {
							label: 'Expired',
							property: 'expired',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "3 Months") {
						var key = {
							label: '3 Months',
							property: 'expired3',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "6 Months") {
						var key = {
							label: '6 Months',
							property: 'expired6',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "9 Months") {
						var key = {
							label: '9 Months',
							property: 'expired9',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "12 Months") {
						var key = {
							label: '12 Months',
							property: 'expired12',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "15 Months") {
						var key = {
							label: '15 Months',
							property: 'expired15',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "18 Months") {
						var key = {
							label: '18 Months',
							property: 'expired18',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Serial no.") {
						var key = {
							label: 'Serial No',
							property: 'serialNum'
						};
						cols.push(key);
					}
				}
			}
			this._onExport(data, cols);
		},

		onExportMatMov: function () {
			var arr = [];
			var data = this.getView().getModel("mavMovTableModel").getData().results;
			for (var i = 0; i < data.length; i++) {
				data[i].shelflLifeDateReport = formatter.date(data[i].shelflLifeDate);
				data[i].postingDateReport = formatter.date(data[i].postingDate);
				data[i].quantity = parseFloat(data[i].quantity);
				data[i].bigQuantity = parseFloat(data[i].bigQuantity);
				data[i].packSize = parseFloat(data[i].packSize);
			}
			var defaultVariant = this.getView().getModel("PersonalizationModel").getProperty("/personalizationData/userPersonaDto");
			var cols = [];
			for (var i = 0; i < defaultVariant.length; i++) {
				if (defaultVariant[i].status === true) {

					if (defaultVariant[i].enabledKey === "Mat. Doc.") {
						var key = {
							label: 'Material Document',
							property: 'materialDocument',
						};
						cols.push(key);

					} else if (defaultVariant[i].enabledKey === "Material") {
						var key = {
							label: 'Material',
							property: 'materialNum'
						};
						cols.push(key);
						var key = {
							label: 'Material Description',
							property: 'materialDesc'

						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Date") {
						var key = {
							label: 'Date',
							property: 'postingDateReport'
						};
						cols.push(key);

					} else if (defaultVariant[i].enabledKey === "Vendor Mat.") {
						var key = {
							label: 'Vendor Material',
							property: 'vendorMaterial',
						};
						cols.push(key);

					} else if (defaultVariant[i].enabledKey === "Material Group") {
						var key = {
							label: 'Material Group',
							property: 'materialGroup'
						};
						cols.push(key);
						var key = {
							label: 'Material Group Description',
							property: 'materialGroupDesc'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Material Group4") {
						var key = {
							label: 'Material Group4',
							property: 'materialGroup4'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Exp. Date") {
						var key = {
							label: 'Exp. Date',
							property: 'shelflLifeDateReport'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Real Batch") {
						var key = {
							label: 'Batch',
							property: 'batchNumber'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "SLOC") {
						var key = {
							label: 'Storage Location',
							property: 'storageLocation'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "SLOC Desc") {
						var key = {
							label: 'Storage Location Desc',
							property: 'Storelocdesc'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "GR/GI SLOC") {
						var key = {
							label: 'GR/GI Storage Location',
							property: 'receivingStorageLocation'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Per Pack") {
						var key = {
							label: 'Per Pack',
							property: 'packSize',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Qty") {
						var key = {
							label: 'Quantity',
							property: 'quantity',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Sales Qty") {
						var key = {
							label: 'Sales Quantity',
							property: 'bigQuantity',
							type: sap.ui.export.EdmType.Number,
							scale: 3
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Spc. IND") {
						var key = {
							label: 'Spc. IND',
							property: 'splStockIndicator'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Movement") {
						var key = {
							label: 'Movement',
							property: 'movementType'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "DO Number") {
						var key = {
							label: 'DO Number',
							property: 'referenceDocNum'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Header Note") {
						var key = {
							label: 'Header Note',
							property: 'headerNote'
						};
						cols.push(key);
					} else if (defaultVariant[i].enabledKey === "Serial No.") {
						var key = {
							label: 'Serial No',
							property: 'serialNum'
						};
						cols.push(key);
					}
				}
			}
			this._onExport(data, cols);
		},

		_onExport: function (arr, aCols) {
			var aCols, oSettings, oSheet;
			aCols = aCols;
			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: arr,
				showProgress: false
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function () {
					MessageToast.show("spreadsheet Export Finished");
				})
				.finally(function () {
					oSheet.destroy();
				});
		},

		ATPOverviewSearch: function () {
			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				return;
			}
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/ATP_OverviewSet?$filter=";
			var salesOrg;
			var SLoc;
			var matGrp;
			var matGrp4;
			var mat;
			var vendorMat;
			var SearchPara = this.getView().getModel("baseModel").getData();
			// sales Org
			if (this.salesOrgFromSelectedItems.length === 0) {
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.SalesOrgValueState = "Error";
				return;
				// if (that.salesOrgFromSelectedItems !== undefined && that.salesOrgFromSelectedItems !== "") {
				// 	salesOrg = "salesOrg eq " + "'" + that.salesOrgDataAccess + "'";
				// 	if (url.length === 76) {
				// 		url = url + salesOrg;
				// 	} else {
				// 		url = url + " " + "and" + " " + salesOrg;
				// 	}
				// } else {
				// 	MessageBox.error("Enter all the mandatory fields");
				// 	SearchPara.SalesOrgValueState = "Error";
				// 	return;
				// }
			} else if (this.salesOrgFromSelectedItems.length === 1) { /*range logic*/
				SearchPara.SalesOrgValueState = "None";
				salesOrg = "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[0] + "'"; /*single from value logic*/
				if (url.length === 93) {
					url = url + salesOrg;
				} else {
					url = url + " " + "and" + " " + salesOrg;
				}

			} else if (this.salesOrgFromSelectedItems.length > 1) {
				SearchPara.SalesOrgValueState = "None";
				for (var i = 0; i < this.salesOrgFromSelectedItems.length; i++) {
					if (salesOrg === undefined) {
						salesOrg = "(salesOrg eq " + "'" + this.salesOrgFromSelectedItems[i] + "'";
					} else {
						if (i === this.salesOrgFromSelectedItems.length - 1) {
							salesOrg = salesOrg + " " + "or" + " " + "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[i] + "')";
						} else {
							salesOrg = salesOrg + " " + "or" + " " + "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[i] + "'";
						}
						/*multiple from logic*/
					}
				}
				if (url.length === 93) {
					url = url + salesOrg;
				} else {
					url = url + " " + "and" + " " + salesOrg;
				}
			}
			// storage location
			if (this.SLocFromSelectedItems.length === 0) {
				if (that.SLOCDataAccess !== undefined && that.SLOCDataAccess !== "") {
					SLoc = "storageLocation eq " + "'" + that.SLOCDataAccess + "'";
					// if (url.length === 76) {
					// 	url = url + this.salesOrg;
					// } else {
					// 	url = url + " " + "and" + " " + this.salesOrg;
					// }
				}
				// SLoc = "storageLocation eq " + "'" + " " + "'";
			} else if (this.SLocFromSelectedItems.length === 1) { /*range logic*/
				if (this.SLocToSelectedItems.length === 1) {
					SLoc = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
							0] +
						"' )";
				} else {
					SLoc = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 93) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var i = 0; i < this.SLocFromSelectedItems.length; i++) {
					if (SLoc === undefined) {
						SLoc = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
					} else {
						if (i === this.SLocFromSelectedItems.length - 1) {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "')";
						} else {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 93) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			}

			// Vendormat
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) { /*range logic*/
				if (this.selectedVendorMatTo.length === 1) {
					vendorMat = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
							0] +
						"' )";
				} else {
					vendorMat = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"; /*single from value logic*/
				}
				if (url.length === 93) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var i = 0; i < this.selectedVendorMatFrom.length; i++) {
					if (vendorMat === undefined) {
						vendorMat = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'";
					} else {
						if (i === this.selectedVendorMatFrom.length - 1) {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "')";
						} else {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 93) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			}

			// matetrial group
			if (this.MatGrpFromSelectedItems.length === 0) {
				// if (that.materialGroupDataAccess === "" || that.materialGroupDataAccess === undefined) {
				// 	MessageBox.error("Enter all the mandatory fields");
				// 	SearchPara.matGrpValueState = "Error";
				// 	return;

				// } else {
				// 	matGrp = "materialGroup eq " + "('" + that.materialGroupDataAccess + "')";
				// 	if (url.length === 76) {
				// 		url = url + matGrp;
				// 	} else {
				// 		url = url + " " + "and" + " " + matGrp;
				// 	}
				// }
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.matGrpValueState = "Error";
				return;
			} else if (this.MatGrpFromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrpToSelectedItems.length === 1) {
					matGrp = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 93) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrpFromSelectedItems.length; i++) {
					if (matGrp === undefined) {
						matGrp = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrpFromSelectedItems.length - 1) {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "')";
						} else {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 93) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			}
			//material group 4
			if (this.MatGrp4FromSelectedItems.length === 0) {
				// matGrp4 = "materialGroup4 eq " + "('" + that.materialGroup4DataAccess + "')";
				if (that.materialGroup4DataAccess !== undefined && that.materialGroup4DataAccess !== "") {
					matGrp4 = "materialGroup4 eq " + "('" + that.materialGroup4DataAccess + "')";
					if (url.length === 93) {
						url = url + matGrp4;
					} else {
						url = url + " " + "and" + " " + matGrp4;
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrp4ToSelectedItems.length === 1) {
					matGrp4 = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp4 = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 93) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrp4FromSelectedItems.length; i++) {
					if (matGrp4 === undefined) {
						matGrp4 = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrp4FromSelectedItems.length - 1) {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "')";
						} else {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 93) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			}
			// material

			// else if (this.selectedMatFromItems.length > 1) {
			// 	for (var i = 0; i < this.selectedMatFromItems.length; i++) {
			// 		if (mat === undefined) {
			// 			mat = "(materialNum eq " + "'" + this.selectedMatFromItems[i] + "'";
			// 		} else {
			// 			if (i === this.selectedMatFromItems.length - 1) {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "')";
			// 			} else {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "'"; /*multiple from logic*/
			// 			}
			// 		}
			// 	}
			// 	if (url.length === 93) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// }
			if (this.selectedMatFromItems.length === 0) {

				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMatFromItems.length === 1) { /*range logic*/
				if (this.selectedMatToItems.length === 1) {
					mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
							0] +
						"' )";
				} else {
					mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 93) {
					url = url + mat;
				} else {
					url = url + " " + "and" + " " + mat;
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var i = 0; i < this.selectedMatFromItems.length; i++) {
					if (mat === undefined) {
						mat = "materialNum eq " + "('" + this.selectedMatFromItems[i];
					} else {
						if (i === this.selectedMatFromItems.length - 1) {
							mat = mat + "@" + this.selectedMatFromItems[i] + "')";
						} else {
							mat = mat + "@" + this.selectedMatFromItems[i];
						}
					}
				}
				// if (url.length === 93) {
				url = url + " " + "and" + " " + mat;
				// } else {
				// 	url = url + " " + "and" + " " + mat;
				// }
			}

			//debugger;
			// sloc checkbox
			if (SearchPara.sLocLevel) {
				if (url.length === 93) {
					url = url + this.SlocLevel;
				} else {
					url = url + " " + "and" + " " + "storageLocLevel eq " + "'X'";
				}
			}
			// if (this.SlocLevel !== "" && this.SlocLevel !== undefined) {
			// 	if (url.length === 93) {
			// 		url = url + this.SlocLevel;
			// 	} else {
			// 		url = url + " " + "and" + " " + this.SlocLevel;
			// 	}
			// }
			if (this.BatchLevel !== "" && this.BatchLevel !== undefined) {
				if (url.length === 93) {
					url = url + this.BatchLevel;
				} else {
					url = url + " " + "and" + " " + this.BatchLevel;
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (url.length === 93) {
					url = url + this.serialNo;
				} else {
					url = url + " " + "and" + " " + this.serialNo;
				}
			}

			var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			//+ " " + "and" + " " + SLoc + " " + "and" + " " + mat ++ " " + "and" + " " + matGrp4
			// url = url + salesOrg + " " +
			// 	"and" + " " + matGrp + "&$format=json";
			if (that.materialDataAccess !== "*") {
				url = url + " " + "and matNumEx eq " + "('" + that.materialDataAccess + "')" + "&$format=json";
			} else {
				url = url + "&$format=json";
			}
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			$.ajax({
				url: url,
				method: "GET",
				async: true,
				success: function (result, xhr, data) {
					busyDialog.close();
					var result = result.d.results;
					for (var i = 0; i < result.length; i++) {
						if (result[i].storageLocation === "SUM" || result[i].batchNumber === "SUM") {
							result[i].atpQty = "SUM";
							result[i].shortQty = "SUM";
						}
					}
					var ATPOverviewTableModel = new sap.ui.model.json.JSONModel({
						"results": result
					});
					ATPOverviewTableModel.setSizeLimit(ATPOverviewTableModel.getData().results.length);
					that.getView().setModel(ATPOverviewTableModel, "ATPOverviewTableModel");
					var length = "ATP Overview" + "(" + result.length + ")";
					that.getView().getModel("ATPOverviewTableModel").setProperty("/dataLength", length);
					that.getView().getModel("ATPOverviewTableModel").refresh();
					that.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					that.getView().getModel("baseModel").refresh();
				},
				error: function (result, xhr, data) {
					busyDialog.close();
					var ATPOverviewTableModel = new sap.ui.model.json.JSONModel({
						"results": ""
					});
					that.getView().setModel(ATPOverviewTableModel, "ATPOverviewTableModel");
					that.getView().getModel("ATPOverviewTableModel").setProperty("/dataLength", "");
					that.getView().getModel("ATPOverviewTableModel").refresh();
					var errorMsg = "";
					if (result.status === 504) {
						errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = result.responseJSON.error.message.value;
						// errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		onSearchATP: function (oEvent) {
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}

			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("atpQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("batchNumber", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expiredDate", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("plant", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("stockQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("requiredQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("confirmQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("shortQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("baseUnit", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("ltpPrice", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = this.getView().byId("ATPOverviewTableID").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		errorMsg: function (errorMsg) {
			sap.m.MessageBox.show(
				errorMsg, {
					styleClass: 'sapUiSizeCompact',
					icon: sap.m.MessageBox.Icon.ERROR,
					title: "Error",
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function (oAction) {}
				}
			);
		},

		endingStockSearch: function () {
			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				return;
			}
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/EndingStockSet?$filter=";
			var plant;
			var SLoc;
			var matGrp;
			var matGrp4;
			var mat;
			var vendorMat;
			var SearchPara = this.getView().getModel("baseModel").getData();
			// Plant
			if (this.plantFromSelectedItems.length === 0) {
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.EndingStckplantValueState = "Error";
				return;
			} else if (this.plantFromSelectedItems.length === 1) { /*range logic*/
				SearchPara.EndingStckplantValueState = "None";
				// if (this.plantToSelectedItems.length === 1) {
				// 	plant = "plant ge " + "'" + this.plantFromSelectedItems[0] + "'" + " and " + "plant le " + "'" + this.plantToSelectedItems[0] +
				// 		"'";
				// }
				// else {
				plant = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'";
				if (url.length === 92) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				} /*single from value logic*/
				// }
			} else if (this.plantFromSelectedItems.length > 1) {
				SearchPara.EndingStckplantValueState = "None";
				for (var i = 0; i < this.plantFromSelectedItems.length; i++) {
					if (plant === undefined) {
						plant = "( plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
					} else {
						if (i === this.plantFromSelectedItems.length - 1) {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "')";
						} else {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
						}
						/*multiple from logic*/
					}
				}
				if (url.length === 92) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			}
			//storage location
			if (this.SLocFromSelectedItems.length === 0) {
				// SLoc = "storageLocation eq " + "'" + " " + "'";
			} else if (this.SLocFromSelectedItems.length === 1) { /*range logic*/
				if (this.SLocToSelectedItems.length === 1) {
					SLoc = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
							0] +
						"' )";
				} else {
					SLoc = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var i = 0; i < this.SLocFromSelectedItems.length; i++) {
					if (SLoc === undefined) {
						SLoc = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
					} else {
						if (i === this.SLocFromSelectedItems.length - 1) {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "')";
						} else {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			}
			// matetrial group
			if (this.MatGrpFromSelectedItems.length === 0) {
				// if (that.materialGroupDataAccess === "" || that.materialGroupDataAccess === undefined) {
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.matGrpValueState = "Error";
				return;
				// } else {
				// 	matGrp = "materialGroup eq " + "('" + that.materialGroupDataAccess + "')";
				// 	if (url.length === 92) {
				// 		url = url + matGrp;
				// 	} else {
				// 		url = url + " " + "and" + " " + matGrp;
				// 	}
				// }
			} else if (this.MatGrpFromSelectedItems.length === 1) {
				SearchPara.matGrpValueState = "None"; /*range logic*/
				if (this.MatGrpToSelectedItems.length === 1) {
					matGrp = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrpFromSelectedItems.length; i++) {
					if (matGrp === undefined) {
						matGrp = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrpFromSelectedItems.length - 1) {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "')";
						} else {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 92) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			}
			//material group 4
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (that.materialGroup4DataAccess !== undefined) {
					matGrp4 = "materialGroup4 eq " + "('" + that.materialGroup4DataAccess + "')";
					if (url.length === 92) {
						url = url + matGrp4;
					} else {
						url = url + " " + "and" + " " + matGrp4;
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrp4ToSelectedItems.length === 1) {
					matGrp4 = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp4 = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrp4FromSelectedItems.length; i++) {
					if (matGrp4 === undefined) {
						matGrp4 = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrp4FromSelectedItems.length - 1) {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "')";
						} else {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			}
			// material
			// if (this.selectedMatFromItems.length === 0) {
			// 	// mat = "materialNum eq " + "'" + " " + "'";
			// } else if (this.selectedMatFromItems.length === 1) { /*range logic*/
			// 	if (this.selectedMatToItems.length === 1) {
			// 		mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
			// 				0] +
			// 			"' )";
			// 	} else {
			// 		mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
			// 	}
			// 	if (url.length === 92) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// } else if (this.selectedMatFromItems.length > 1) {
			// 	for (var i = 0; i < this.selectedMatFromItems.length; i++) {
			// 		if (mat === undefined) {
			// 			mat = "(materialNum eq " + "'" + this.selectedMatFromItems[i] + "'";
			// 		} else {
			// 			if (i === this.selectedMatFromItems.length - 1) {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "')";
			// 			} else {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "'"; /*multiple from logic*/
			// 			}
			// 		}
			// 	}
			// 	if (url.length === 92) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// }

			if (this.selectedMatFromItems.length === 0) {

				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMatFromItems.length === 1) { /*range logic*/
				if (this.selectedMatToItems.length === 1) {
					mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
							0] +
						"' )";
				} else {
					mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + mat;
				} else {
					url = url + " " + "and" + " " + mat;
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var i = 0; i < this.selectedMatFromItems.length; i++) {
					if (mat === undefined) {
						mat = "materialNum eq " + "('" + this.selectedMatFromItems[i];
					} else {
						if (i === this.selectedMatFromItems.length - 1) {
							mat = mat + "@" + this.selectedMatFromItems[i] + "')";
						} else {
							mat = mat + "@" + this.selectedMatFromItems[i];
						}
					}
				}
				// if (url.length === 93) {
				url = url + " " + "and" + " " + mat;
				// } else {
				// 	url = url + " " + "and" + " " + mat;
				// }
			}

			// Vendormat
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) { /*range logic*/
				if (this.selectedVendorMatTo.length === 1) {
					vendorMat = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
							0] +
						"' )";
				} else {
					vendorMat = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var i = 0; i < this.selectedVendorMatFrom.length; i++) {
					if (vendorMat === undefined) {
						vendorMat = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'";
					} else {
						if (i === this.selectedVendorMatFrom.length - 1) {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "')";
						} else {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			}

			// month
			if (this.byEndingPeriod !== "" && this.byEndingPeriod !== undefined) {
				if (this.spMonth !== "" && this.spMonth !== undefined) {
					// this.endingStckDateFrom = "currentDate eq " + "'" + " " + "'";

					if (url.length === 92) {
						url = url + this.spMonth;
					} else {
						url = url + " " + "and" + " " + this.spMonth;
					}
					if (url.length === 92) {
						url = url + this.byEndingPeriod;
					} else {
						url = url + " " + "and" + " " + this.byEndingPeriod;
					}
				} else {
					MessageBox.error("Enter Month");
					return;
				}

			}

			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (url.length === 92) {
					url = url + this.serialNo;
				} else {
					url = url + " " + "and" + " " + this.serialNo;
				}
			}

			if (this.byAsAtDate !== "" && this.byAsAtDate !== undefined) {
				if (this.endingStckDateFrom !== "" && this.endingStckDateFrom !== undefined) {
					// this.endingStckDateFrom = "currentDate eq " + "'" + " " + "'";

					if (url.length === 92) {
						url = url + this.endingStckDateFrom;
					} else {
						url = url + " " + "and" + " " + this.endingStckDateFrom;
					}
					if (url.length === 92) {
						url = url + this.byAsAtDate;
					} else {
						url = url + " " + "and" + " " + this.byAsAtDate;
					}
				} else {
					MessageBox.error("Enter Date");
					return;
				}

			}
			//date

			if (this.exFdaStock !== "" && this.exFdaStock !== undefined) {
				if (url.length === 92) {
					url = url + this.exFdaStock;
				} else {
					url = url + " " + "and" + " " + this.exFdaStock;
				}
			}

			if (this.allMaterials !== "" && this.allMaterials !== undefined) {
				if (url.length === 92) {
					url = url + this.allMaterials;
				} else {
					url = url + " " + "and" + " " + this.allMaterials;
				}
			}
			if (this.ownStkMaterial !== "" && this.ownStkMaterial !== undefined) {
				if (url.length === 92) {
					url = url + this.ownStkMaterial;
				} else {
					url = url + " " + "and" + " " + this.ownStkMaterial;
				}
			}
			if (this.venConsMaterial !== "" && this.venConsMaterial !== undefined) {
				if (url.length === 92) {
					url = url + this.venConsMaterial;
				} else {
					url = url + " " + "and" + " " + this.venConsMaterial;
				}
			}

			var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			if (that.materialDataAccess !== "*") {
				url = url + " " + "and matNumEx eq " + "('" + that.materialDataAccess + "')" + "&$format=json";
			} else {
				url = url + "&$format=json";
			}
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			$.ajax({
				url: url,
				method: "GET",
				async: true,
				success: function (result, xhr, data) {
					busyDialog.close();
					var endingStckTableModel = new sap.ui.model.json.JSONModel({
						"results": result.d.results
					});
					endingStckTableModel.setSizeLimit(endingStckTableModel.getData().results.length);
					that.getView().setModel(endingStckTableModel, "endingStckTableModel");
					var length = "Ending Stock" + "(" + result.d.results.length + ")";
					that.getView().getModel("endingStckTableModel").setProperty("/dataLength", length);
					that.getView().getModel("endingStckTableModel").refresh();
					that.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					that.getView().getModel("baseModel").refresh();
				},
				error: function (result, xhr, data) {
					var endingStckTableModel = new sap.ui.model.json.JSONModel({
						"results": ""
					});
					that.getView().setModel(endingStckTableModel, "endingStckTableModel");
					that.getView().getModel("endingStckTableModel").setProperty("/dataLength", "");
					that.getView().getModel("endingStckTableModel").refresh();
					busyDialog.close();
					var errorMsg = "";
					if (result.status === 504) {
						errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = result.responseJSON.error.message.value;
						// errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		onSearchEndingStock: function (oEvent) {
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator.Contains, value),
				// [+] START Modification: STRY0014744:MY Enhancements SLOC Description -	JAYAMALARJ
				new sap.ui.model.Filter("storageLocationDesc", sap.ui.model.FilterOperator.Contains, value),
				// [+] END Modification: STRY0014744:MY Enhancements SLOC Description -	JAYAMALARJ
				new sap.ui.model.Filter("bigQuantity", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("saleUnit", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("vendorMatNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("realBatch", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("oldCode", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expireDate", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("manufDate", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("perPack", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("value", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = this.getView().byId("endingStockTableId").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		expiryStockSearch: function () {

			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				return;
			}
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/ExpiryStockSet?$filter=";
			var plant;
			var SLoc;
			var matGrp;
			var matGrp4;
			var mat;
			var vendorMat;
			var SearchPara = this.getView().getModel("baseModel").getData();
			// Plant
			if (this.plantFromSelectedItems.length === 0) {
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.EndingStckplantValueState = "Error";
				return;
			} else if (this.plantFromSelectedItems.length === 1) { /*range logic*/
				SearchPara.EndingStckplantValueState = "None";
				plant = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'";
				if (url.length === 92) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				} /*single from value logic*/
			} else if (this.plantFromSelectedItems.length > 1) {
				SearchPara.EndingStckplantValueState = "None";
				for (var i = 0; i < this.plantFromSelectedItems.length; i++) {
					if (plant === undefined) {
						plant = "(plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
					} else {
						if (i === this.plantFromSelectedItems.length - 1) {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "')";
						} else {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			}
			//storage location
			if (this.SLocFromSelectedItems.length === 0) {
				// SLoc = "storageLocation eq " + "'" + " " + "'";
			} else if (this.SLocFromSelectedItems.length === 1) { /*range logic*/
				if (this.SLocToSelectedItems.length === 1) {
					SLoc = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
							0] +
						"' )";
				} else {

					SLoc = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"; /*single from value logic*/

				}
				if (url.length === 92) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var i = 0; i < this.SLocFromSelectedItems.length; i++) {
					if (SLoc === undefined) {
						SLoc = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
					} else {
						if (i === this.SLocFromSelectedItems.length - 1) {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "')";
						} else {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			}
			// matetrial group
			if (this.MatGrpFromSelectedItems.length === 0) {
				// if (that.materialGroupDataAccess === "" || that.materialGroupDataAccess === undefined) {
				MessageBox.error("Material Group is mandatory");
				// SearchPara.matGrpValueState = "Error";
				return;
				// } else {
				// 	matGrp = "materialGroup eq " + "('" + that.materialGroupDataAccess + "')";
				// 	if (url.length === 92) {
				// 		url = url + matGrp;
				// 	} else {
				// 		url = url + " " + "and" + " " + matGrp;
				// 	}
				// }
			} else if (this.MatGrpFromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrpToSelectedItems.length === 1) {
					matGrp = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrpFromSelectedItems.length; i++) {
					if (matGrp === undefined) {
						matGrp = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrpFromSelectedItems.length - 1) {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "')";
						} else {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 92) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			}
			//material group 4
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (that.materialGroup4DataAccess !== undefined && that.materialGroup4DataAccess !== "") {
					matGrp4 = "materialGroup4 eq " + "('" + that.materialGroup4DataAccess + "')";
					if (url.length === 92) {
						url = url + matGrp4;
					} else {
						url = url + " " + "and" + " " + matGrp4;
					}
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrp4ToSelectedItems.length === 1) {
					matGrp4 = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp4 = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrp4FromSelectedItems.length; i++) {
					if (matGrp4 === undefined) {
						matGrp4 = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrp4FromSelectedItems.length - 1) {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "')";
						} else {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			}
			// material
			// if (this.selectedMatFromItems.length === 0) {
			// 	// mat = "materialNum eq " + "'" + " " + "'";
			// } else if (this.selectedMatFromItems.length === 1) { /*range logic*/
			// 	if (this.selectedMatToItems.length === 1) {
			// 		mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
			// 				0] +
			// 			"' )";
			// 	} else {
			// 		mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
			// 	}
			// 	if (url.length === 92) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// } else if (this.selectedMatFromItems.length > 1) {
			// 	for (var i = 0; i < this.selectedMatFromItems.length; i++) {
			// 		if (mat === undefined) {
			// 			mat = "(materialNum eq " + "'" + this.selectedMatFromItems[i] + "'";
			// 		} else {
			// 			if (i === this.selectedMatFromItems.length - 1) {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "')";
			// 			} else {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "'"; /*multiple from logic*/
			// 			}
			// 		}
			// 	}
			// 	if (url.length === 92) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// }

			if (this.selectedMatFromItems.length === 0) {

				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMatFromItems.length === 1) { /*range logic*/
				if (this.selectedMatToItems.length === 1) {
					mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
							0] +
						"' )";
				} else {
					mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + mat;
				} else {
					url = url + " " + "and" + " " + mat;
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var i = 0; i < this.selectedMatFromItems.length; i++) {
					if (mat === undefined) {
						mat = "materialNum eq " + "('" + this.selectedMatFromItems[i];
					} else {
						if (i === this.selectedMatFromItems.length - 1) {
							mat = mat + "@" + this.selectedMatFromItems[i] + "')";
						} else {
							mat = mat + "@" + this.selectedMatFromItems[i];
						}
					}
				}
				// if (url.length === 93) {
				url = url + " " + "and" + " " + mat;
				// } else {
				// 	url = url + " " + "and" + " " + mat;
				// }
			}

			// Vendormat
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) { /*range logic*/
				if (this.selectedVendorMatTo.length === 1) {
					vendorMat = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
							0] +
						"' )";
				} else {
					vendorMat = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"; /*single from value logic*/
				}
				if (url.length === 92) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var i = 0; i < this.selectedVendorMatFrom.length; i++) {
					if (vendorMat === undefined) {
						vendorMat = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'";
					} else {
						if (i === this.selectedVendorMatFrom.length - 1) {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "')";
						} else {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 92) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			}
			if (this.exFdaStock !== "" && this.exFdaStock !== undefined) {
				if (url.length === 92) {
					url = url + this.exFdaStock;
				} else {
					url = url + " " + "and" + " " + this.exFdaStock; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (url.length === 92) {
					url = url + this.serialNo;
				} else {
					url = url + " " + "and" + " " + this.serialNo;
				}
			}
			if (this.salesUnit !== "" && this.salesUnit !== undefined) {
				if (url.length === 92) {
					url = url + this.salesUnit;
				} else {
					url = url + " " + "and" + " " + this.salesUnit; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			if (this.baseUnit !== "" && this.baseUnit !== undefined) {
				if (url.length === 92) {
					url = url + this.baseUnit;
				} else {
					url = url + " " + "and" + " " + this.baseUnit; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			if (this.Unrestricted !== "" && this.Unrestricted !== undefined) {
				if (url.length === 92) {
					url = url + this.Unrestricted;
				} else {
					url = url + " " + "and" + " " + this.Unrestricted; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			if (this.inspection !== "" && this.inspection !== undefined) {
				if (url.length === 92) {
					url = url + this.inspection;
				} else {
					url = url + " " + "and" + " " + this.inspection; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			if (this.blocked !== "" && this.blocked !== undefined) {
				if (url.length === 92) {
					url = url + this.blocked;
				} else {
					url = url + " " + "and" + " " + this.blocked; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			if (that.materialDataAccess !== "*") {
				url = url + " " + "and matNumEx eq " + "('" + that.materialDataAccess + "')" + "&$format=json";
			} else {
				url = url + "&$format=json";
			}
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			$.ajax({
				url: url,
				method: "GET",
				async: true,
				success: function (result, xhr, data) {
					busyDialog.close();
					var expiryStckTableModel = new sap.ui.model.json.JSONModel({
						"results": result.d.results
					});
					expiryStckTableModel.setSizeLimit(expiryStckTableModel.getData().results.length);
					that.getView().setModel(expiryStckTableModel, "expiryStckTableModel");
					var length = "Expiry Stock" + "(" + result.d.results.length + ")";
					that.getView().getModel("expiryStckTableModel").setProperty("/dataLength", length);
					that.getView().getModel("expiryStckTableModel").refresh();
					that.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					that.getView().getModel("baseModel").refresh();
				},
				error: function (result, xhr, data) {

					busyDialog.close();
					var expiryStckTableModel = new sap.ui.model.json.JSONModel({
						"results": ""
					});
					that.getView().setModel(expiryStckTableModel, "expiryStckTableModel");
					that.getView().getModel("expiryStckTableModel").setProperty("/dataLength", "");
					that.getView().getModel("expiryStckTableModel").refresh();
					var errorMsg = "";
					if (result.status === 504) {
						errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = result.responseJSON.error.message.value;
						// errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		onSearchExpiryStock: function (oEvent) {
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("rslDays", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("storageLocation", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired6", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("matGroupDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("matGroup4Desc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("vendorMat", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("batch", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("unit", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired3", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired9", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired12", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired15", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("expired18", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = this.getView().byId("expiryStockTableId").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		matMovSearch: function () {

			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				return;
			}
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/MaterialMovementSet?$filter=";
			var plant;
			var SLoc;
			var matGrp;
			var matGrp4;
			var mat;
			var vendorMat;
			var batch;
			var matDoc;
			var movType;
			var SearchPara = this.getView().getModel("baseModel").getData();
			// Plant
			if (this.plantFromSelectedItems.length === 0) {
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.EndingStckplantValueState = "Error";
				return;
			} else if (this.plantFromSelectedItems.length === 1) { /*range logic*/
				SearchPara.EndingStckplantValueState = "None";
				plant = "plant eq " + "'" + this.plantFromSelectedItems[0] + "'";
				if (url.length === 97) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				} /*single from value logic*/
			} else if (this.plantFromSelectedItems.length > 1) {
				SearchPara.EndingStckplantValueState = "None";
				for (var i = 0; i < this.plantFromSelectedItems.length; i++) {
					if (plant === undefined) {
						plant = "(plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
					} else {
						if (i === this.plantFromSelectedItems.length - 1) {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "')";
						} else {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 97) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			}
			//storage location
			if (this.SLocFromSelectedItems.length === 0) {
				// MessageBox.error("Enter all the mandatory fields");
				// SearchPara.EndingStckSLocValueState = "Error";
				// return;
				// SLoc = "storageLocation eq " + "'" + " " + "'";
			} else if (this.SLocFromSelectedItems.length === 1) { /*range logic*/
				SearchPara.EndingStckSLocValueState = "None";
				if (this.SLocToSelectedItems.length === 1) {
					SLoc = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
							0] +
						"' )";
				} else {
					SLoc = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 97) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				SearchPara.EndingStckSLocValueState = "None";
				for (var i = 0; i < this.SLocFromSelectedItems.length; i++) {
					if (SLoc === undefined) {
						SLoc = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
					} else {
						if (i === this.SLocFromSelectedItems.length - 1) {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "')";
						} else {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 97) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			}
			// matetrial group
			if (this.MatGrpFromSelectedItems.length === 0) {
				// if (that.materialGroupDataAccess === "" && that.materialGroupDataAccess === undefined) {
				MessageBox.error("Enter all the mandatory fields");
				// SearchPara.matGrpValueState = "Error";
				return;
				// } else {
				// 	matGrp = "materialGroup eq " + "('" + that.materialGroupDataAccess + "')";
				// 	if (url.length === 97) {
				// 		url = url + matGrp;
				// 	} else {
				// 		url = url + " " + "and" + " " + matGrp;
				// 	}
				// }
			} else if (this.MatGrpFromSelectedItems.length === 1) { /*range logic*/
				SearchPara.matGrpValueState = "None";
				if (this.MatGrpToSelectedItems.length === 1) {
					matGrp = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 97) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				SearchPara.matGrpValueState = "None";
				for (var i = 0; i < this.MatGrpFromSelectedItems.length; i++) {
					if (matGrp === undefined) {
						matGrp = "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrpFromSelectedItems.length - 1) {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "')";
						} else {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 97) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			}
			//material group 4
			if (this.MatGrp4FromSelectedItems.length === 0) {
				if (that.materialGroup4DataAccess !== undefined && that.materialGroup4DataAccess !== "") {
					matGrp4 = "materialGroup4 eq " + "('" + that.materialGroup4DataAccess + "')";
					if (url.length === 97) {
						url = url + matGrp4;
					} else {
						url = url + " " + "and" + " " + matGrp4;
					}
				}

			} else if (this.MatGrp4FromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrp4ToSelectedItems.length === 1) {
					matGrp4 = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp4 = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 97) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrp4FromSelectedItems.length; i++) {
					if (matGrp4 === undefined) {
						matGrp4 = "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrp4FromSelectedItems.length - 1) {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "')";
						} else {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 97) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			}
			// material

			// if (this.selectedMatFromItems.length === 0) {
			// 	// mat = "materialNum eq " + "'" + " " + "'";
			// } else if (this.selectedMatFromItems.length === 1) { /*range logic*/
			// 	if (this.selectedMatToItems.length === 1) {
			// 		mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
			// 				0] +
			// 			"' )";
			// 	} else {
			// 		mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
			// 	}
			// 	if (url.length === 97) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// } else if (this.selectedMatFromItems.length > 1) {
			// 	for (var i = 0; i < this.selectedMatFromItems.length; i++) {
			// 		if (mat === undefined) {
			// 			mat = "(materialNum eq " + "'" + this.selectedMatFromItems[i] + "'";
			// 		} else {
			// 			if (i === this.selectedMatFromItems.length - 1) {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "')";
			// 			} else {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "'"; /*multiple from logic*/
			// 			}
			// 		}
			// 	}
			// 	if (url.length === 97) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// }

			if (this.selectedMatFromItems.length === 0) {

				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMatFromItems.length === 1) { /*range logic*/
				if (this.selectedMatToItems.length === 1) {
					mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
							0] +
						"' )";
				} else {
					mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 97) {
					url = url + mat;
				} else {
					url = url + " " + "and" + " " + mat;
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var i = 0; i < this.selectedMatFromItems.length; i++) {
					if (mat === undefined) {
						mat = "materialNum eq " + "('" + this.selectedMatFromItems[i];
					} else {
						if (i === this.selectedMatFromItems.length - 1) {
							mat = mat + "@" + this.selectedMatFromItems[i] + "')";
						} else {
							mat = mat + "@" + this.selectedMatFromItems[i];
						}
					}
				}
				// if (url.length === 93) {
				url = url + " " + "and" + " " + mat;
				// } else {
				// 	url = url + " " + "and" + " " + mat;
				// }
			}

			if (this.postingDateFrom !== undefined && this.postingDateFrom !== "") {
				if (this.postingDateTo === undefined || this.postingDateTo === "") {
					if (url.length === 97) {
						url = url + "postingDate eq datetime" + "'" + this.postingDateFrom + "'";
					} else {
						url = url + " " + "and" + " " + "postingDate eq datetime" + "'" + this.postingDateFrom + "'";
					}
				} else {
					if (url.length === 97) {
						url = url + "( postingDate ge datetime" + "'" + this.postingDateFrom + "'" + " and " + "postingDate le datetime" + "'" + this.postingDateTo +
							"' )";
					} else {
						url = url + " " + "and" + " " + "( postingDate ge datetime" + "'" + this.postingDateFrom + "'" + " and " +
							"postingDate le datetime" + "'" + this.postingDateTo + "' )";
					}
				}
			} else {
				MessageBox.error("Enter all mandatory fields");
				return;
			}

			// 	if (url.length === 97) {
			// 		url = url + this.postingDate;
			// 	} else {
			// 		url = url + " " + "and" + " " + this.postingDate;
			// 	}
			// } else {
			// 	MessageBox.error("Enter all mandatory fields");
			// 	SearchPara.postingDateValueStateFrom = "Error";
			// 	return;
			// }
			//vendor mat
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) { /*range logic*/
				if (this.selectedVendorMatTo.length === 1) {
					vendorMat = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
							0] +
						"' )";
				} else {
					vendorMat = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"; /*single from value logic*/
				}
				if (url.length === 97) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var i = 0; i < this.selectedVendorMatFrom.length; i++) {
					if (vendorMat === undefined) {
						vendorMat = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'";
					} else {
						if (i === this.selectedVendorMatFrom.length - 1) {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "')";
						} else {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 97) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			}

			//movement type
			this.selectedMovType
			if (this.selectedMovType === undefined || this.selectedMovType.length === 0) {
				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMovType.length === 1) { /*range logic*/

				movType = "movementType eq " + "'" + this.selectedMovType[0] + "'"; /*single from value logic*/

				if (url.length === 97) {
					url = url + movType;
				} else {
					url = url + " " + "and" + " " + movType;
				}
			} else if (this.selectedMovType.length > 1) {
				for (var i = 0; i < this.selectedMovType.length; i++) {
					if (movType === undefined) {
						movType = "(movementType eq " + "'" + this.selectedMovType[i] + "'";
					} else {
						if (i === this.selectedMovType.length - 1) {
							movType = movType + " " + "or" + " " + "movementType eq " + "'" + this.selectedMovType[i] + "')";
						} else {
							movType = movType + " " + "or" + " " + "movementType eq " + "'" + this.selectedMovType[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 97) {
					url = url + movType;
				} else {
					url = url + " " + "and" + " " + movType;
				}
			}

			// batch
			if (this.selectedBatch.length === 0) {
				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedBatch.length === 1) { /*range logic*/

				batch = "batchNumber eq " + "'" + this.selectedBatch[0] + "'"; /*single from value logic*/

				if (url.length === 97) {
					url = url + batch;
				} else {
					url = url + " " + "and" + " " + batch;
				}
			} else if (this.selectedBatch.length > 1) {
				for (var i = 0; i < this.selectedBatch.length; i++) {
					if (batch === undefined) {
						batch = "(batchNumber eq " + "'" + this.selectedBatch[i] + "'";
					} else {
						if (i === this.selectedBatch.length - 1) {
							batch = batch + " " + "or" + " " + "batchNumber eq " + "'" + this.selectedBatch[i] + "')";
						} else {
							batch = batch + " " + "or" + " " + "batchNumber eq " + "'" + this.selectedBatch[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 97) {
					url = url + batch;
				} else {
					url = url + " " + "and" + " " + batch;
				}
			}
			// matdoc
			if (this.selectedMatDocItems.length === 0) {
				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMatDocItems.length === 1) { /*range logic*/

				matDoc = "materialDocument eq " + "'" + this.selectedMatDocItems[0] + "'"; /*single from value logic*/

				if (url.length === 97) {
					url = url + matDoc;
				} else {
					url = url + " " + "and" + " " + matDoc;
				}
			} else if (this.selectedMatDocItems.length > 1) {
				for (var i = 0; i < this.selectedMatDocItems.length; i++) {
					if (matDoc === undefined) {
						matDoc = "(materialDocument eq " + "'" + this.selectedMatDocItems[i] + "'";
					} else {
						if (i === this.selectedMatDocItems.length - 1) {
							matDoc = matDoc + " " + "or" + " " + "materialDocument eq " + "'" + this.selectedMatDocItems[i] + "')";
						} else {
							matDoc = matDoc + " " + "or" + " " + "materialDocument eq " + "'" + this.selectedMatDocItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 97) {
					url = url + matDoc;
				} else {
					url = url + " " + "and" + " " + matDoc;
				}
			}
			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (url.length === 97) {
					url = url + this.serialNo;
				} else {
					url = url + " " + "and" + " " + this.serialNo;
				}
			}
			var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			if (that.materialDataAccess !== "*") {
				url = url + " " + "and matNumEx eq " + "('" + that.materialDataAccess + "')" + "&$format=json";
			} else {
				url = url + "&$format=json";
			}
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			$.ajax({
				url: url,
				method: "GET",
				async: true,
				success: function (result, xhr, data) {
					busyDialog.close();
					var mavMovTableModel = new sap.ui.model.json.JSONModel({
						"results": result.d.results
					});
					mavMovTableModel.setSizeLimit(mavMovTableModel.getData().results.length);
					that.getView().setModel(mavMovTableModel, "mavMovTableModel");
					var length = "Material Movement" + "(" + result.d.results.length + ")";
					that.getView().getModel("mavMovTableModel").setProperty("/dataLength", length);
					that.getView().getModel("mavMovTableModel").refresh();
					that.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					that.getView().getModel("baseModel").refresh();
				},
				error: function (result, xhr, data) {
					// MessageToast.show("Unable to fetch Data");
					busyDialog.close();
					var mavMovTableModel = new sap.ui.model.json.JSONModel({
						"results": ""
					});
					that.getView().setModel(mavMovTableModel, "mavMovTableModel");
					that.getView().getModel("mavMovTableModel").setProperty("/dataLength", "");
					that.getView().getModel("mavMovTableModel").refresh();
					var errorMsg = "";
					if (result.status === 504) {
						errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = result.responseJSON.error.message.value;
						// errorMsg = errorMsg.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});
		},

		onSearchMatMov: function (oEvent) {
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialDocument", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("batchNumber", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("quantity", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("saleUnit", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("movementType", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("textStockType", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("headerNote", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("splStockIndicator", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("bigQuantity", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("baseUnit", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroupDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup4Desc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("vendorMaterial", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("serialNo", sap.ui.model.FilterOperator.Contains, value)
				// new sap.ui.model.Filter("expired15", sap.ui.model.FilterOperator.Contains, value),
				// new sap.ui.model.Filter("expired18", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = this.getView().byId("matMovTableId").getBinding("items");
			// var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		popOver: function (oEvent) {
			var oButton = oEvent.getSource();

			// create popover
			if (!this._oPopover) {
				Fragment.load({
					name: "incture.com.ConnectClient_Inventory.Fragments.popoverTable",
					controller: this
				}).then(function (pPopover) {
					this._oPopover = pPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.bindElement("");
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}

				}.bind(this));
			} else {
				if (sap.ui.Device.system.phone === true) {
					this._oPopover.setPlacement("Bottom");
					this._oPopover.openBy(oButton);
				} else {
					this._oPopover.openBy(oButton);
				}
			}
		},

		onExit: function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},

		closePopover: function () {
			this._oPopover.close();
		},
		navigateStkLot: function (oEvent) {
			if (sap.ui.Device.system.phone === true) {
				var results = oEvent.getSource().getBindingContext("stockLotModel").getObject();
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						name: "incture.com.ConnectClient_Inventory.Fragments.StockLotPopover",
						controller: this
					}).then(function (pPopover) {
						this._oPopover = pPopover;
						this.getView().addDependent(this._oPopover);
						var StkLotPopoverModel = new sap.ui.model.json.JSONModel({
							"results": results
						});
						// var  = new sap.ui.model.json.JSONModel();
						this._oPopover.setModel(StkLotPopoverModel, "StkLotPopoverModel");
						this._oPopover.getModel("StkLotPopoverModel").refresh();
						this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
						this._oPopover.getModel("PersonalizationModel").refresh();
						if (sap.ui.Device.system.phone === true) {
							this._oPopover.setPlacement("Bottom");
							this._oPopover.openBy(oButton);
						} else {
							this._oPopover.openBy(oButton);
						}

					}.bind(this));
				} else {
					var StkLotPopoverModel = new sap.ui.model.json.JSONModel({
						"results": results
					});
					// var  = new sap.ui.model.json.JSONModel();
					this._oPopover.setModel(StkLotPopoverModel, "StkLotPopoverModel");
					this._oPopover.getModel("StkLotPopoverModel").refresh();
					this._oPopover.setModel(this.getView().getModel("PersonalizationModel"), "PersonalizationModel");
					this._oPopover.getModel("PersonalizationModel").refresh();
					if (sap.ui.Device.system.phone === true) {
						this._oPopover.setPlacement("Bottom");
						this._oPopover.openBy(oButton);
					} else {
						this._oPopover.openBy(oButton);
					}
				}
			}
		},

		/////

		onChangeBatchStkLot: function (oEvent) {
			var oMultiInput = this.byId(this._getId("BatchFrom"));
			if (this.selectedBatchStkLot.length === 0) {
				this.selectedBatchStkLot.push(oEvent.getParameters().value);
				oMultiInput.addToken(new Token({
					text: oEvent.getParameters().value
				}));
			} else {
				if (this.selectedBatchStkLot.includes(oEvent.getParameters().value) === false) {
					this.selectedBatchStkLot.push(oEvent.getParameters().value);
					oMultiInput.addToken(new Token({
						text: oEvent.getParameters().value
					}));
				}
			}
			oEvent.getSource().setValue("");
		},

		/////

		onDeleteBatchStkLot: function (oEvent) {
			var oMultiInput = this.byId(this._getId("BatchFrom"));
			oMultiInput.destroyTokens();
			var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
			if (oEvent.getParameters().type === "removed") {
				for (var i = this.selectedBatchStkLot.length; i >= 0; i--) {
					if (delToken === this.selectedBatchStkLot[i]) {
						this.selectedBatchStkLot.splice(i, 1);
					}
				}
				if (this.selectedBatchStkLot.length > 0) {
					for (var j = 0; j < this.selectedBatchStkLot.length; j++) {
						oMultiInput.addToken(new Token({
							text: this.selectedBatchStkLot[j]
						}));
					}
				}
			} else {
				this.selectedBatchStkLot.push(oEvent.getParameters().addedTokens[0].getText());
			}
		},

		///

		onChangeOnlyUnrestStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.onlyUnrestricted = "onlyUnrestricted eq " + "'X'";
			} else {
				this.onlyUnrestricted = undefined;
			}
		},
		///

		onChangeBatchLevelStkLot: function (oEvent) {
			var flag = oEvent.getParameters().selected;
			if (flag === true) {
				this.BatchNum = "batchNum  eq " + "'X'";
			} else {
				this.BatchNum = undefined;
			}
		},

		////
		createColumnConfigStkLot: function () {
			return [{
				label: 'Material',
				property: 'materialNum'
			}, {
				label: 'Material Description',
				property: 'materialDesc'

			}, {
				label: 'Vendor Mat',
				property: 'vendorMatNum'

			}, {
				label: 'Sales UOM',
				property: 'salesUOM'

			}, {
				label: 'On Hand',
				property: 'onHandQty',
			}, {
				label: 'Unrest. Stock',
				property: 'unrestrictedStock'
			}, {
				label: 'Inspec Stock',
				property: 'stockInspection'
			}, {
				label: 'LTP',
				property: 'ltp'
			}, {
				label: 'On Order',
				property: 'onOrderQty'
			}, {
				label: 'Available',
				property: 'availQty'
			}, {
				label: 'Blocked Stock',
				property: 'blockedStock'
			}, {
				label: 'Principal',
				property: 'principalMatGroup'
			}, {
				label: 'Material Group4',
				property: 'materialGroup4'
			}, {
				label: 'Batch Num',
				property: 'batchNum'
			}, {
				label: 'Created On',
				property: 'createdOn'
			}, {
				label: 'Manu. Date',
				property: 'manufDate'
			}, {
				label: 'Shelf life Exp',
				property: 'shelfLifeDate'
			}, {
				label: 'Batch Quantity',
				property: 'batchQty'
			}, {
				label: 'SLoc',
				property: 'storageLocation'
			}, {
				label: 'Reserved By',
				property: 'reservedby'
			}, {
				label: 'Valuated Unrestricted-Use Stock',
				property: 'qtyUnrestrictedStock'
			}, {
				label: 'Block Stock',
				property: 'blockStock'
			}, {
				label: 'Stock In Quality Inspection',
				property: 'stockInspection'
			}];
		},

		/////
		onExportStockLot: function () {
			var arr = [];
			var data = this.getView().getModel("stockLotModel").getData().results;
			for (var i = 0; i < data.length; i++) {
				data[i].shelfLifeDate = formatter.date(data[i].shelfLifeDate);
				data[i].manufDate = formatter.date(data[i].manufDate);
				data[i].createdOn = formatter.date(data[i].createdOn);
			}
			this._onExport(data, this.createColumnConfigStkLot());
		},
		////
		filterSTkLot: function (oEvent) {
			var that = this;
			if (oEvent.getParameters().newValue === undefined) {
				var value = oEvent.getParameters().query;
			} else {
				var value = oEvent.getParameters().newValue;
			}
			var filters = [];
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("materialNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("vendorMatNum", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("onHandQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("unrestrictedStock", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("ltp", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("onOrderQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("availQty", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("blockedStock", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("principalMatGroup", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("materialGroup4", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("serialNum", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = this.getView().byId("idOutputRes").getBinding("items");
			oBinding.filter(filters);

		},

		//////
		valueHelpRequestSalesOrg: function (oEvent) {
			this.salesOrgPlaceholder = oEvent.getSource().getPlaceholder();
			var that = this;
			if (that.salesOrgDataAccess === "No Access") {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
			} else {
				// var that = this;
				if (!that.salesOrg) {
					that.salesOrg = sap.ui.xmlfragment("incture.com.ConnectClient_Inventory.Fragments.SalesOrg", that);
					that.getView().addDependent(that.salesOrg);
					var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_HDRLOOKUP_SRV");
					var filters = [];
					var lang = "";
					if (sap.ushell) {
						if (sap.ui.getCore().getConfiguration().getLanguage() === "th") {
							lang = "2";
						} else {
							lang = "EN";
						}
					} else {
						lang = "EN";
					}
					lang = lang.toUpperCase();
					var oFilter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, lang),
							new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.EQ, that.salesOrgDataAccess)
						],
						and: true
					});
					filters.push(oFilter);
					var busyDialog = new sap.m.BusyDialog();
					busyDialog.open();
					oDataModel.read("/ZSearchHelp_SalesOrgSet", {
						async: false,
						filters: filters,
						success: function (oData, oResponse) {
							busyDialog.close();
							var salesOrgModel = new sap.ui.model.json.JSONModel({
								"results": oData.results
							});
							// if (oData.results.length === 1) {
							// 	var oMultiInput = that.byId(that._getId("SalesOrgFrom"));
							// 	oMultiInput.addToken(new Token({
							// 		text: oData.results[0].Salesorg
							// 	}));
							// 	// this.SalesOrg = "salesOrg eq" + " " + oData.results[0].Salesorg;
							// 	this.salesOrgFromSelectedItems = oData.results[0].Salesorg;

							// }
							that.salesOrg.setModel(salesOrgModel, "salesOrgModel");
							that.salesOrg.open();
						},
						error: function (error) {
							busyDialog.close();
							var errorMsg = "";
							if (error.statusCode === 504) {
								errorMsg = "Request timed-out. Please try again!";
								that.errorMsg(errorMsg);
							} else {
								errorMsg = JSON.parse(error.responseText);
								errorMsg = errorMsg.error.message.value;
								that.errorMsg(errorMsg);
							}
						}
					});
				} else {
					that.salesOrg.open();
				}
			}
		},

		////

		onDeleteStockLotPlant: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("PlantTo"));
				oMultiInput.destroyTokens();
				this.plantToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("PlantFrom"));
					oMultiInput.destroyTokens();
					this.plant = undefined;
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.plantFromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.plantFromSelectedItems[i]) {
							this.plantFromSelectedItems.splice(i, 1);
						}
					}
					if (this.plantFromSelectedItems.length > 0) {
						for (var j = 0; j < this.plantFromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.plantFromSelectedItems[j]
							}));
							if (this.plantFromSelectedItems.length === 1) {
								// this.plant = "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
								this.getView().getModel("baseModel").refresh();
							} else {
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", false);
								this.getView().getModel("baseModel").refresh();
								// this.plant = this.plant + " " + "or" + " " + "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
							}
						}
					}
				} else {
					this.plantFromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}
		},

		////

		// onConfirmChangeSalesOrg: function (oEvent) {
		// 	// to logic
		// 	if (this.salesOrgPlaceholder === "To") {
		// 		this.salesOrgToSelectedItems = [];
		// 		if (oEvent.getParameters().selectedContexts.length > 0) {
		// 			var oMultiInput = this.byId(this._getId("SalesOrgTo"));
		// 			oMultiInput.destroyTokens();
		// 			if (oEvent.getParameters().selectedContexts.length > 1) {
		// 				MessageToast.show("Can select only one item");
		// 			}
		// 			this.salesOrgToSelectedItems.push(oEvent.getParameters().selectedContexts[0].getObject().Salesorg);
		// 			oMultiInput.addToken(new Token({
		// 				text: this.salesOrgToSelectedItems[0]
		// 			}));
		// 		} else {
		// 			MessageBox.error("Select atleast one item");
		// 		}
		// 	}
		// 	//from logic and other
		// 	else {

		// 		if (oEvent.getParameters().selectedContexts.length > 0) {
		// 			var oMultiInput = this.byId(this._getId("SalesOrgFrom"));
		// 			//first push
		// 			if (this.salesOrgFromSelectedItems.length === 0) {
		// 				for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) {
		// 					// this.getView().getModel("baseModel").getData().EndingStckplant.push(oEvent.getParameters().selectedContexts[i].getObject().plant);
		// 					this.salesOrgFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().Salesorg);
		// 					oMultiInput.addToken(new Token({
		// 						text: oEvent.getParameters().selectedContexts[i].getObject().Salesorg
		// 					}));
		// 					// return new Token({text: oEvent.getParameters().selectedContexts[i].getObject().Salesorg});
		// 				}
		// 			} else {
		// 				for (var i = 0; i < oEvent.getParameters().selectedContexts.length; i++) { /*check for duplicates*/
		// 					for (var j = 0; j < this.salesOrgFromSelectedItems.length; j++) {
		// 						if (this.salesOrgFromSelectedItems.includes(oEvent.getParameters().selectedContexts[i].getObject().Salesorg) ===
		// 							false) {
		// 							this.salesOrgFromSelectedItems.push(oEvent.getParameters().selectedContexts[i].getObject().Salesorg);
		// 							oMultiInput.addToken(new Token({
		// 								text: oEvent.getParameters().selectedContexts[i].getObject().Salesorg
		// 							}));
		// 						} else {
		// 							MessageToast.show("Cannot add the same item");
		// 						}
		// 					}
		// 				}
		// 			}
		// 			if (this.salesOrgFromSelectedItems.length === 1) {
		// 				this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
		// 				this.getView().getModel("baseModel").refresh();
		// 			} else {
		// 				this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", false);
		// 				this.getView().getModel("baseModel").refresh();
		// 			}
		// 		} else {
		// 			MessageBox.error("Select atleast one item");
		// 		}
		// 	}
		// },

		/////

		// onDeleteSalesOrg: function (oEvent) {
		// 	var placeHolder = oEvent.getSource().getPlaceholder();
		// 	if (placeHolder === "To") {
		// 		var oMultiInput = this.byId(this._getId("SalesOrgTo"));
		// 		oMultiInput.destroyTokens();
		// 		this.salesOrgToSelectedItems.splice(0, 1);
		// 	} else {
		// 		var oMultiInput = this.byId(this._getId("SalesOrgFrom"));
		// 		oMultiInput.destroyTokens();
		// 		this.SalesOrg = undefined;
		// 		var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
		// 		for (var i = this.salesOrgFromSelectedItems.length; i >= 0; i--) {
		// 			if (delToken === this.salesOrgFromSelectedItems[i]) {
		// 				this.salesOrgFromSelectedItems.splice(i, 1);
		// 			}
		// 		}
		// 		if (this.salesOrgFromSelectedItems.length > 0) {
		// 			for (var j = 0; j < this.salesOrgFromSelectedItems.length; j++) {
		// 				oMultiInput.addToken(new Token({
		// 					text: this.salesOrgFromSelectedItems[j]
		// 				}));
		// 				if (this.salesOrgFromSelectedItems.length === 1) {
		// 					// this.plant = "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
		// 					this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", true);
		// 					this.getView().getModel("baseModel").refresh();
		// 				} else {
		// 					this.getView().getModel("baseModel").setProperty("/enableSalesOrgTo", false);
		// 					this.getView().getModel("baseModel").refresh();
		// 					// this.plant = this.plant + " " + "or" + " " + "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
		// 				}
		// 			}
		// 		} else {
		// 			// this.getView().getModel("baseModel").setProperty("/enableSLocTo", true);
		// 			// this.getView().getModel("baseModel").refresh();
		// 		}
		// 	}
		// },

		////

		onLiveChangesalesOrg: function (oEvent) {
			var value = oEvent.getParameters().value;
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("SalesorgDesc", sap.ui.model.FilterOperator.Contains, value),
				new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.Contains, value)
			]);
			filters.push(oFilter);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},

		/////

		StockLotSearch: function () {
			var that = this;
			if (that.allAccess === false) {
				MessageToast.show(this.resourceBundle.getText("NoDataAccess"));
				return;
			}
			var url = "/DKSHODataService/sap/opu/odata/sap/ZDKSH_CC_INVENTORY_ENQUIRIES_SRV/StockLot_InputSet?$filter=";
			var salesOrg;
			var plant;
			var SLoc;
			var matGrp;
			var matGrp4;
			var mat;
			var batch;
			var SearchPara = this.getView().getModel("baseModel").getData();
			var vendorMat;
			//plant
			if (this.plantFromSelectedItems.length === 0) {
				/* plant  = "plant  eq " + "'" + " " + "'";*/
				MessageBox.error("Fill all mandatory fields");
				// SearchPara.StockLotplantValueState = "Error";
				return;
			} else if (this.plantFromSelectedItems.length === 1) { /*range logic*/
				if (this.plantToSelectedItems.length === 1) {
					plant = "( plant  ge " + "'" + this.plantFromSelectedItems[0] + "'" + " and " + "plant  le " + "'" + this.plantToSelectedItems[
							0] +
						"' )";
				} else {
					plant = "plant  eq " + "'" + this.plantFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			} else if (this.plantFromSelectedItems.length > 1) {
				for (var i = 0; i < this.plantFromSelectedItems.length; i++) {
					if (plant === undefined) {
						plant = "(plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
					} else {
						if (i === this.plantFromSelectedItems.length - 1) {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "')";
						} else {
							plant = plant + " " + "or" + " " + "plant eq " + "'" + this.plantFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
					// if (plant === undefined) {
					// 	plant = "plant  eq " + "'" + this.plantFromSelectedItems[i] + "'";
					// } else {
					// 	plant = plant + " " + "or" + " " + "plant  eq " + "'" + this.plantFromSelectedItems[i] + "'"; /*multiple from logic*/
					// }
				}
				if (url.length === 95) {
					url = url + plant;
				} else {
					url = url + " " + "and" + " " + plant;
				}
			}

			//salesOrg
			if (this.salesOrgFromSelectedItems.length === 0) {
				/* salesOrg   = "salesOrg   eq " + "'" + " " + "'";*/
				MessageBox.error("Fill all mandatory fields");
				// SearchPara.SalesOrgValueState = "Error";
				return;
			} else if (this.salesOrgFromSelectedItems.length === 1) { /*range logic*/
				if (this.salesOrgToSelectedItems.length === 1) {
					salesOrg = "( salesOrg   ge " + "'" + this.salesOrgFromSelectedItems[0] + "'" + " and " + "salesOrg   le " + "'" + this.salesOrgToSelectedItems[
							0] +
						"' )";
				} else {
					salesOrg = "salesOrg   eq " + "'" + this.salesOrgFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + salesOrg;
				} else {
					url = url + " " + "and" + " " + salesOrg;
				}
			} else if (this.salesOrgFromSelectedItems.length > 1) {
				for (var i = 0; i < this.salesOrgFromSelectedItems.length; i++) {
					// if (salesOrg === undefined) {
					// 	salesOrg = "salesOrg  eq " + "'" + this.salesOrgFromSelectedItems[i] + "'";
					// } else {
					// 	salesOrg = salesOrg + " " + "or" + " " + "salesOrg  eq " + "'" + this.salesOrgFromSelectedItems[i] + "'"; /*multiple from logic*/
					// }
					if (salesOrg === undefined) {
						salesOrg = "(salesOrg eq " + "'" + this.salesOrgFromSelectedItems[i] + "'";
					} else {
						if (i === this.salesOrgFromSelectedItems.length - 1) {
							salesOrg = salesOrg + " " + "or" + " " + "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[i] + "')";
						} else {
							salesOrg = salesOrg + " " + "or" + " " + "salesOrg eq " + "'" + this.salesOrgFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 95) {
					url = url + salesOrg;
				} else {
					url = url + " " + "and" + " " + salesOrg;
				}
			}

			//storage location
			if (this.SLocFromSelectedItems.length === 0) {
				SLoc = "storageLocation eq " + "'" + this.SLOCDataAccess + "'";
				if (url.length === 95) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			} else if (this.SLocFromSelectedItems.length === 1) { /*range logic*/
				if (this.SLocToSelectedItems.length === 1) {
					SLoc = "( storageLocation ge " + "'" + this.SLocFromSelectedItems[0] + "'" + " and " + "storageLocation le " + "'" + this.SLocToSelectedItems[
							0] +
						"' )";
				} else {
					SLoc = "storageLocation eq " + "'" + this.SLocFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			} else if (this.SLocFromSelectedItems.length > 1) {
				for (var i = 0; i < this.SLocFromSelectedItems.length; i++) {
					// if (SLoc === undefined) {
					// 	SLoc = "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
					// } else {
					// 	SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'"; /*multiple from logic*/
					// }
					if (SLoc === undefined) {
						SLoc = "(storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
					} else {
						if (i === this.SLocFromSelectedItems.length - 1) {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "')";
						} else {
							SLoc = SLoc + " " + "or" + " " + "storageLocation eq " + "'" + this.SLocFromSelectedItems[i] + "'";
						} /*multiple from logic*/
					}
				}
				if (url.length === 95) {
					url = url + SLoc;
				} else {
					url = url + " " + "and" + " " + SLoc;
				}
			}
			// matetrial group
			if (this.MatGrpFromSelectedItems.length === 0) {
				// matGrp = "materialGroup eq " + "'" + this.materialGroupDataAccess + "'";
				// if (that.materialGroupDataAccess === "" || that.materialGroupDataAccess === undefined) {
				MessageBox.error("Enter all mandatory fields");
				// SearchPara.matGrpValueState = "Error";
				return;

				// } 
				// else {
				// matGrp = "materialGroup eq " + "('" + that.materialGroupDataAccess + "')";
				// }
				// if (url.length === 95) {
				// 	url = url + matGrp;
				// } else {
				// 	url = url + " " + "and" + " " + matGrp;
				// }
			} else if (this.MatGrpFromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrpToSelectedItems.length === 1) {
					matGrp = "( materialGroup ge " + "'" + this.MatGrpFromSelectedItems[0] + "'" + " and " + "materialGroup le " + "'" + this.MatGrpToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp = "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			} else if (this.MatGrpFromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrpFromSelectedItems.length; i++) {
					if (matGrp === undefined) {
						matGrp = " " + "(materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrpFromSelectedItems.length - 1) {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "')";
						} else {
							matGrp = matGrp + " " + "or" + " " + "materialGroup eq " + "'" + this.MatGrpFromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 95) {
					url = url + matGrp;
				} else {
					url = url + " " + "and" + " " + matGrp;
				}
			}
			//material group 4
			if (this.MatGrp4FromSelectedItems.length === 0) {
				matGrp4 = "materialGroup4 eq " + "('" + that.materialGroup4DataAccess + "')";
				if (url.length === 95) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			} else if (this.MatGrp4FromSelectedItems.length === 1) { /*range logic*/
				if (this.MatGrp4ToSelectedItems.length === 1) {
					matGrp4 = "( materialGroup4 ge " + "'" + this.MatGrp4FromSelectedItems[0] + "'" + " and " + "materialGroup4 le " + "'" + this.MatGrp4ToSelectedItems[
							0] +
						"' )";
				} else {
					matGrp4 = "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			} else if (this.MatGrp4FromSelectedItems.length > 1) {
				for (var i = 0; i < this.MatGrp4FromSelectedItems.length; i++) {
					if (matGrp4 === undefined) {
						matGrp4 = " " + "(materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'";
					} else {
						if (i === this.MatGrp4FromSelectedItems.length - 1) {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "')";
						} else {
							matGrp4 = matGrp4 + " " + "or" + " " + "materialGroup4 eq " + "'" + this.MatGrp4FromSelectedItems[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 95) {
					url = url + matGrp4;
				} else {
					url = url + " " + "and" + " " + matGrp4;
				}
			}

			// material

			// if (this.selectedMatFromItems.length === 0) {
			// 	// mat = "materialNum eq " + "'" + " " + "'";
			// 	// if (url.length === 95) {
			// 	// 	url = url + mat;
			// 	// } else {
			// 	// 	url = url + " " + "and" + " " + mat;
			// 	// }
			// } else if (this.selectedMatFromItems.length === 1) { /*range logic*/
			// 	if (this.selectedMatToItems.length === 1) {
			// 		mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
			// 				0] +
			// 			"' )";
			// 	} else {
			// 		mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
			// 	}
			// 	if (url.length === 95) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// } else if (this.selectedMatFromItems.length > 1) {
			// 	for (var i = 0; i < this.selectedMatFromItems.length; i++) {
			// 		if (mat === undefined) {
			// 			mat = " " + "(materialNum eq " + "'" + this.selectedMatFromItems[i] + "'";
			// 		} else {
			// 			if (i === this.selectedMatFromItems.length - 1) {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "')";
			// 			} else {
			// 				mat = mat + " " + "or" + " " + "materialNum eq " + "'" + this.selectedMatFromItems[i] + "'"; /*multiple from logic*/
			// 			}
			// 		}
			// 	}
			// 	if (url.length === 95) {
			// 		url = url + mat;
			// 	} else {
			// 		url = url + " " + "and" + " " + mat;
			// 	}
			// }

			if (this.selectedMatFromItems.length === 0) {

				// mat = "materialNum eq " + "'" + " " + "'";
			} else if (this.selectedMatFromItems.length === 1) { /*range logic*/
				if (this.selectedMatToItems.length === 1) {
					mat = "( materialNum ge " + "'" + this.selectedMatFromItems[0] + "'" + " and " + "materialNum le " + "'" + this.selectedMatToItems[
							0] +
						"' )";
				} else {
					mat = "materialNum eq " + "'" + this.selectedMatFromItems[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + mat;
				} else {
					url = url + " " + "and" + " " + mat;
				}
			} else if (this.selectedMatFromItems.length > 1) {
				for (var i = 0; i < this.selectedMatFromItems.length; i++) {
					if (mat === undefined) {
						mat = "materialNum eq " + "('" + this.selectedMatFromItems[i];
					} else {
						if (i === this.selectedMatFromItems.length - 1) {
							mat = mat + "@" + this.selectedMatFromItems[i] + "')";
						} else {
							mat = mat + "@" + this.selectedMatFromItems[i];
						}
					}
				}
				// if (url.length === 93) {
				url = url + " " + "and" + " " + mat;
				// } else {
				// 	url = url + " " + "and" + " " + mat;
				// }
			}

			// Vendormat
			if (this.selectedVendorMatFrom.length === 0) {} else if (this.selectedVendorMatFrom.length === 1) { /*range logic*/
				if (this.selectedVendorMatTo.length === 1) {
					vendorMat = "( vendorMaterial ge " + "'" + this.selectedVendorMatFrom[0] + "'" + " and " + "vendorMaterial le " + "'" + this.selectedVendorMatTo[
							0] +
						"' )";
				} else {
					vendorMat = "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[0] + "'"; /*single from value logic*/
				}
				if (url.length === 95) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			} else if (this.selectedVendorMatFrom.length > 1) {
				for (var i = 0; i < this.selectedVendorMatFrom.length; i++) {
					if (vendorMat === undefined) {
						vendorMat = "(vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'";
					} else {
						if (i === this.selectedVendorMatFrom.length - 1) {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "')";
						} else {
							vendorMat = vendorMat + " " + "or" + " " + "vendorMaterial eq " + "'" + this.selectedVendorMatFrom[i] + "'"; /*multiple from logic*/
						}
					}
				}
				if (url.length === 95) {
					url = url + vendorMat;
				} else {
					url = url + " " + "and" + " " + vendorMat;
				}
			}

			//Batch 
			if (this.BatchNum !== "" && this.BatchNum !== undefined) {
				if (url.length === 95) {
					url = url + this.BatchNum;
				} else {
					url = url + " " + "and" + " " + this.BatchNum;
				}
			}
			if (this.RawMat !== "" && this.RawMat !== undefined) {
				if (url.length === 95) {
					url = url + this.RawMat;
				} else {
					url = url + " " + "and" + " " + this.RawMat;
				}
			}

			if (this.showQty !== "" && this.showQty !== undefined) {
				if (url.length === 95) {
					url = url + this.showQty;
				} else {
					url = url + " " + "and" + " " + this.showQty;
				}
			}

			if (this.SalesMat !== "" && this.SalesMat !== undefined) {
				if (url.length === 95) {
					url = url + this.SalesMat;
				} else {
					url = url + " " + "and" + " " + this.SalesMat;
				}
			}
			if (this.ZeroStk !== "" && this.ZeroStk !== undefined) {
				if (url.length === 95) {
					url = url + this.ZeroStk;
				} else {
					url = url + " " + "and" + " " + this.ZeroStk;
				}
			}
			//onlyUnrestricted 
			if (this.onlyUnrestricted !== "" && this.onlyUnrestricted !== undefined) {
				if (url.length === 95) {
					url = url + this.onlyUnrestricted;
				} else {
					url = url + " " + "and" + " " + this.onlyUnrestricted; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}

			///  

			if (this.onlyChBufferStk !== "" && this.onlyChBufferStk !== undefined) {
				if (url.length === 95) {
					url = url + this.onlyChBufferStk;
				} else {
					url = url + " " + "and" + " " + this.onlyChBufferStk; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}

			if (this.onlyShowSalesUQ !== "" && this.onlyShowSalesUQ !== undefined) {
				if (url.length === 95) {
					url = url + this.onlyShowSalesUQ;
				} else {
					url = url + " " + "and" + " " + this.onlyShowSalesUQ; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}
			if (this.onlyQI !== "" && this.onlyQI !== undefined) {
				if (url.length === 95) {
					url = url + this.onlyQI;
				} else {
					url = url + " " + "and" + " " + this.onlyQI; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}

			if (this.onlyShowAllStk !== "" && this.onlyShowAllStk !== undefined) {
				if (url.length === 95) {
					url = url + this.onlyShowAllStk;
				} else {
					url = url + " " + "and" + " " + this.onlyShowAllStk; // this.exFdaStock = "exFdaStock eq " + "'" + " " + "'";
				}
			}

			if (this.serialNo !== "" && this.serialNo !== undefined) {
				if (url.length === 95) {
					url = url + this.serialNo;
				} else {
					url = url + " " + "and" + " " + this.serialNo;
				}
			}

			if (this.expiryDateFrom !== undefined && this.expiryDateFrom !== "") {
				if (this.expiryDateTo === undefined || this.expiryDateTo === "") {
					if (url.length === 95) {
						url = url + "expiredDate eq datetime" + "'" + this.expiryDateFrom + "'";
					} else {
						url = url + " " + "and" + " " + "expiredDate eq datetime" + "'" + this.expiryDateFrom + "'";
					}
				} else {
					if (url.length === 95) {
						url = url + "( expiredDate ge datetime" + "'" + this.expiryDateFrom + "'" + " and " + "expiredDate le datetime" + "'" + this.expiryDateTo +
							"' )";
					} else {
						url = url + " " + "and" + " " + "( expiredDate ge datetime" + "'" + this.expiryDateFrom + "'" + " and " +
							"expiredDate le datetime" + "'" + this.expiryDateTo + "' )";
					}
				}
			}

			var oDataModel = this.getView().getModel("ZDKSH_CC_INVENTORY_ENQUIRIES_SRV");
			if (that.materialDataAccess !== "*") {
				url = url + " " + "and matNumEx eq " + "('" + that.materialDataAccess + "')" + "&$expand=InputToOutput/OutputToBatchOutput" +
					"&$format=json";
			} else {
				url = url + "&$expand=InputToOutput/OutputToBatchOutput" + "&$format=json";
			}
			// url = url + "&$expand=InputToOutput/OutputToBatchOutput" + "&$format=json";
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			$.ajax({
				url: url,
				method: "GET",
				async: true,
				success: function (result, xhr, data) {
					busyDialog.close();
					var stockLotModel = new sap.ui.model.json.JSONModel({
						"results": result.d.results[0].InputToOutput.results
					});
					stockLotModel.setSizeLimit(1000);
					that.getView().setModel(stockLotModel, "stockLotModel");
					var length = "Stock and Lot Control List" + "(" + result.d.results[0].InputToOutput.results.length + ")";
					for (var i = 0; i < result.d.results[0].InputToOutput.results.length; i++) {
						if (result.d.results[0].InputToOutput.results[i].OutputToBatchOutput.results.length > 10) {
							that.getView().getModel("baseModel").setProperty("/invoiceTableLength", "60vh");
						} else {
							that.getView().getModel("baseModel").setProperty("/invoiceTableLength", "");
						}
					}

					that.getView().getModel("stockLotModel").setProperty("/dataLength", length);
					that.getView().getModel("stockLotModel").refresh();
					that.getView().getModel("baseModel").setProperty("/SearchVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/CollapseVisiblity", false);
					that.getView().getModel("baseModel").setProperty("/openVisiblity", true);
					that.getView().getModel("baseModel").refresh();
				},
				error: function (result, xhr, data) {
					busyDialog.close();
					var stockLotModel = new sap.ui.model.json.JSONModel({
						"results": ""
					});
					that.getView().setModel(stockLotModel, "stockLotModel");
					that.getView().getModel("stockLotModel").setProperty("/dataLength", "");
					that.getView().getModel("stockLotModel").refresh();
					var errorMsg = "";
					if (result.status === 504) {
						errorMsg = "Request timed-out. Please try again using different search filters or add more search filters.";
						that.errorMsg(errorMsg);
					} else {
						errorMsg = result.responseJSON.error.message.value;
						that.errorMsg(errorMsg);
					}
				}
			});

		},
		onDeleteStockLotPlant: function (oEvent) {
			var placeHolder = oEvent.getSource().getPlaceholder();
			if (placeHolder === "To") {
				var oMultiInput = this.byId(this._getId("PlantTo"));
				oMultiInput.destroyTokens();
				this.plantToSelectedItems.splice(0, 1);
			} else {
				if (oEvent.getParameters().type === "removed") {
					var oMultiInput = this.byId(this._getId("PlantFrom"));
					oMultiInput.destroyTokens();
					this.plant = undefined;
					var delToken = oEvent.getParameters().removedTokens[0].mProperties.text;
					for (var i = this.plantFromSelectedItems.length; i >= 0; i--) {
						if (delToken === this.plantFromSelectedItems[i]) {
							this.plantFromSelectedItems.splice(i, 1);
						}
					}
					if (this.plantFromSelectedItems.length > 0) {
						for (var j = 0; j < this.plantFromSelectedItems.length; j++) {
							oMultiInput.addToken(new Token({
								text: this.plantFromSelectedItems[j]
							}));
							if (this.plantFromSelectedItems.length === 1) {
								// this.plant = "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", true);
								this.getView().getModel("baseModel").refresh();
							} else {
								this.getView().getModel("baseModel").setProperty("/enablePlantTo", false);
								this.getView().getModel("baseModel").refresh();
								// this.plant = this.plant + " " + "or" + " " + "plant eq" + " " + "'" + this.plantFromSelectedItems[j] + "'";
							}
						}
					}

				} else {
					this.plantFromSelectedItems.push(oEvent.getParameters().addedTokens[0].getText());
				}
			}
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf incture.com.ConnectClient_Inventory.view.Inventory
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf incture.com.ConnectClient_Inventory.view.Inventory
		 */
		onAfterRendering: function () {
			this.resourceBundle = this.getView().getModel("i18n").getResourceBundle();
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf incture.com.ConnectClient_Inventory.view.Inventory
		 */
		//	onExit: function() {
		//
		//	}

	});

});