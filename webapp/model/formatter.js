// jQuery.sap.declare("incture.com.Inventory.model.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([], function () {
	"use strict";
	return {
		f4ValueBind: function (val1, val2) {
			if (val1 && val2) {
				return val1 + " (" + val2 + ")";
			} else if (val1 && !val2) {
				return val1;
			} else if (!val1 && val2) {
				return val2;
			} else {
				return "";
			}
		},
		concatenateStrings: function (oVal1, oVal2) {
			if (oVal1 && oVal2) {
				return oVal1 + " (" + oVal2 + ") ";
			} else if (oVal1 && !oVal2) {
				return oVal1;
			} else if (!oVal1 && oVal2) {
				return oVal2;
			} else {
				return "";
			}
		},

		concatenateStringsStkLt: function (oVal1, oVal2) {
			if (oVal1 && oVal2) {
				return oVal1 + " " + oVal2;
			} else if (oVal1 && !oVal2) {
				return oVal1;
			} else if (!oVal1 && oVal2) {
				return oVal2;
			} else {
				return "";
			}
		},

		manufDate: function (d) {
			if (d === "00000000" || d === "" || d === " ") {
				return "";
			} else {
				if (d !== null && d !== "" && d.toString().split("(")[1] !== undefined) {
					// if(d === "00000000"){
					// return "31.12.9999";
					// }
					// else{
					var a = parseInt(d.toString().split("(")[1].split(")")[0]);
					var oDateFormat = sap.ui.core.format.DateFormat
						.getDateInstance({
							pattern: "dd.MM.yyyy"
						});
					a = new Date(a);
					return oDateFormat.format(a);
					// }
				} else {
					return "";
				}
			}
		},

		date: function (d) {
			if (d === "00000000" || d === "" || d === " ") {
				return "31.12.9999";
			} else {
				if (d !== null && d !== "" && d.toString().split("(")[1] !== undefined) {
					// if(d === "00000000"){
					// return "31.12.9999";
					// }
					// else{
					var a = parseInt(d.toString().split("(")[1].split(")")[0]);
					var oDateFormat = sap.ui.core.format.DateFormat
						.getDateInstance({
							pattern: "dd.MM.yyyy"
						});
					a = new Date(a);
					return oDateFormat.format(a);
					// }
				} else {
					return "";
				}
			}
		},
		convertToDateToDispFormat: function (val) {
			if (val === "" || val === "00000000" || val === " ") {
				val = "31.12.9999";
				return val;
			}
			else{
			var year = val.substring(0, 4);
			var month = val.substring(4, 6);
			var day = val.substring(6, 8);
			return day + "." + month + "." + year;
			}
		},
		convertToDateToDispFormatExp: function (val) {
			if (val === "" || val === "00000000" || val === " ") {
				val = "31.12.9999";
				return val;
			}
			else{
			var year = val.substring(0, 4);
			var month = val.substring(4, 6);
			var day = val.substring(6, 8);
			return day + "." + month + "." + year;
			}
		},
		convertToDateToDispFormatManuf: function (val) {
			if (val === "" || val === "00000000" || val === " ") {
				val = "";
			}
			else{
			var year = val.substring(0, 4);
			var month = val.substring(4, 6);
			var day = val.substring(6, 8);
			return day + "." + month + "." + year;
			}
		},
		shortQty: function (stk) {
			if (stk === "") {
				return "0.000";
			} else {
				return stk;
			}
		},
		dateTimeFormat: function (oDate) {
			if(oDate === ""){
				oDate = undefined;
			}
			else{
			oDate = new Date(oDate);
			if (oDate) {
				var oDateFormat = sap.ui.core.format.DateFormat
					.getTimeInstance({
						pattern: "dd.MM.yyyy HH:mm:ss"
					});
				// oDate = new Date(oDate);
				if (oDate.getDate().toString().length === 1) {
					var date = "0" + oDate.getDate();
				} else {
					var date = oDate.getDate();
				}
				if (oDate.getMonth().toString().length === 1 && oDate.getMonth() < 9) {
					var month = "0" + (oDate.getMonth() + 1);
				} else {
					var month = oDate.getMonth() + 1;
				}
				if (oDate.getHours().toString().length === 1) {
					var hrs = "0" + oDate.getHours();
				} else {
					var hrs = oDate.getHours();
				}
				if (oDate.getMinutes().toString().length === 1) {
					var min = "0" + oDate.getMinutes();
				} else {
					var min = oDate.getMinutes();
				}
				if (oDate.getSeconds().toString().length === 1) {
					var seconds = "0" + oDate.getSeconds();
				} else {
					var seconds = oDate.getSeconds();
				}
				var date = oDate.getFullYear() + "-" + month + "-" + date + "T" + hrs + ":" + min + ":" + seconds;

				// oDate.setHours(oDate.getHours() + 8);
				// return oDateFormat.format(oDate);
				return date;
			} else {
				return "";
			}
			}
		},
		rowDesign: function(plant, sloc, batch, serialNo){
			if(plant === "SUM" || sloc === "SUM" || batch === "SUM" || serialNo === "SUM"){
				return "Bold";
			}
			else{
				return "Standard";	
			}
		}
	};
});