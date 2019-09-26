jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("newnaPOEQUNRLevel", {

	createPOEQUNRTable : function(){

	var oContainer = this;

	/* SAP - Other product types Certificates */

	var oPOEQUNRTableEQUNR = new sap.ui.table.Table("idPOEQUNRTableEQUNR",{
		visibleRowCount: 25,
		columnHeaderVisible : true,
		//title: "Document Type",
    firstVisibleRow: 3,
    selectionMode: sap.ui.table.SelectionMode.None,
    width: "15%"
	 }).addStyleClass("font13 tblBorder");

	// Equipment
	oPOEQUNRTableEQUNR.addColumn(new sap.ui.table.Column("idTableNAPOEQUNRSummaryEQUNR",{
	//width: "120px",
		//label: new sap.ui.commons.Label({text: "SAP Status"}),
	multiLabels: [new sap.ui.commons.Label({
					 text: "Equipment No."
				 }).addStyleClass("wraptextcol"),
		new sap.ui.commons.TextField({
			placeholder: "Equipment No.",
			width: "100px",
			liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Equnr", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oPOEQUNRTableEQUNR.getBinding("rows");
				binding.filter(aFilters, "Application");
			}
		})
	],
		template: new sap.ui.commons.TextView().bindProperty("text", "Equnr"),
		resizable:true,
			//sortProperty: "Country",
			//filterProperty: "Country",
	}));

	// Status
	oPOEQUNRTableEQUNR.addColumn(new sap.ui.table.Column("idTableNAPOEQUNRSummarySTATUS",{
	//width: "120px",
		//label: new sap.ui.commons.Label({text: "SAP Status"}),
	multiLabels: [new sap.ui.commons.Label({
					 text: "Status"
				 }).addStyleClass("wraptextcol"),
		new sap.ui.commons.TextField({
			placeholder: "Status",
			width: "100px",
			liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Fullstatus", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oPOEQUNRTableEQUNR.getBinding("rows");
				binding.filter(aFilters, "Application");
			}
		})
	],
		template: new sap.ui.commons.TextView().bindProperty("text", "Fullstatus"),
		resizable:true,
			//sortProperty: "Country",
			//filterProperty: "Country",
	}));


	// Flex Box
	var oPOEQUNRFlexEQUNR = new sap.m.FlexBox({
		  items: [
		          oPOEQUNRTableEQUNR
   		  ],
   		  direction: "Column"
   	});

	return oPOEQUNRFlexEQUNR;

	},

	setContentPOEQUNRTable : function(FNAPOSummaryEQUNR, ponumber, poitem, matnr){

		var oModelPOEQUNRUnits = new sap.ui.model.json.JSONModel();
		oModelPOEQUNRUnits.setData({modelData: FNAPOSummaryEQUNR});
		sap.ui.getCore().byId("idPOEQUNRTableEQUNR").setModel(oModelPOEQUNRUnits);
		sap.ui.getCore().byId("idPOEQUNRTableEQUNR").bindRows("/modelData");

		if(FNAPOSummaryEQUNR.length < 21){
			sap.ui.getCore().byId("idPOEQUNRTableEQUNR").setVisibleRowCount(FNAPOSummaryEQUNR.length);
		}
		else{
			sap.ui.getCore().byId("idPOEQUNRTableEQUNR").setVisibleRowCount(20);
		}


		sap.ui.getCore().byId("naPOEQUNRLevel").setTitle("In Production Units for PO : " + ponumber + " Unit Type : " + matnr);
		app.to("naPOEQUNRLevel");

	}

});

function isInArray(value, array) {
	  return array.indexOf(value) > -1;
	}
