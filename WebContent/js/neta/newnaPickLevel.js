/******** NP *******/

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 25.03.2015-
*$*$ Reference   : RTS1097
*$*$ Transport   : CGWK900884
*$*$ Tag         : MAC25032015
*$*$ Purpose     : UI5: Utilization Report
*$*$---------------------------------------------------------------------

*/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var NAPLCRMData = [];
var jsonInventorynaPickLevel = [];
var NAPLSummaryArray = [];
var NAPLSummaryPickLevel = [];
var NAPLSummaryArrayBackup = [];
var oModelEDINAPLSummary;

sap.ui.model.json.JSONModel.extend("newnaPickLevel", {

	createnaPickLevel: function(){

		var oTableNAPLSummary = new sap.ui.table.Table("idTableNAPLSummary",
				{
	            columnHeaderHeight: 45,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            width:"95%",
	            //height: "35px",
	            enableColumnReordering: false,
	            //navigationMode: sap.ui.table.NavigationMode.Paginator,
	            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
	   		 	filter : [ function(oEvent) {
	   		 		//oCurrent.setVisibility(oEvent);
				}, this ],
				toolbar: new sap.ui.commons.Toolbar({
					visible : true,
					rightItems: [

						new sap.ui.commons.Button({
							visible : true,
							//text: "Excel",
							icon: "sap-icon://excel-attachment",
							press: function(oEvent) {
								var objUtil = new utility();
					        	objUtil.makeHTMLTable(jsonInventorynaPickLevel, "Pick Level Details","export");
					          }
							}),
							]
				})
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");


		oTableNAPLSummary.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Equipment"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Equipment"),
			//width : "120px",
			sortProperty: "Equipment",
			filterProperty: "Equipment",
			resizable:false
		}));

		oTableNAPLSummary.addColumn(new sap.ui.table.Column("idPickOHDate",{
			label : new sap.ui.commons.Label({text : "On Hire Date"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Ohdate"),
			//width : "80px",
			sortProperty: "Ohdatesort",
			filterProperty: "Ohdate",
			resizable:false
		}));

			oTableNAPLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Lease"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
				//width : "70px",
				sortProperty: "LeaseNo",
				filterProperty: "LeaseNo",
				resizable:false
			}));

			oTableNAPLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Booking Ref."}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ReleaseAuth"),
				//width : "70px",
				sortProperty: "ReleaseAuth",
				filterProperty: "ReleaseAuth",
				resizable:false
			}));


			oTableNAPLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Unit Description"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
				//width : "120px",
				sortProperty: "UnitDesc",
				filterProperty: "UnitDesc",
				resizable:false
			}));


			oTableNAPLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Expiry Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
				visible: false,
				//width : "70px",
				sortProperty: "ExpiryDateSort",
				filtCRMroperty: "ExpiryDate",
				resizable:false
			}));

    	var repNAPLFlex = new sap.m.FlexBox({
			items: [   oTableNAPLSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");

			return repNAPLFlex;

	},

	setDataPickLevel: function(keys){


		var splitValuesEqui = [];
		var requestedSel = "";



		NAPLCRMData = [];
		jsonInventorynaPickLevel = [];


		if(FNACRMDataReqDet.length == 0){
			for(var j=0;j<FNACRMDataEqui.length;j++){

				splitValuesEqui = [];
				splitValuesEqui = FNACRMDataEqui[j].Crmdata.split("$");
				if(splitValuesEqui[22] == keys){
				NAPLCRMData.push({
					"Equipment" : splitValuesEqui[24],
					"Ohdate" : splitValuesEqui[25],
					"UnitType" : splitValuesEqui[1],
					"LeaseNo" : splitValuesEqui[2],
					"ReleaseAuth" : splitValuesEqui[3],
					"UnitDesc" : splitValuesEqui[12]
				})	;

				jsonInventorynaPickLevel.push({
					"Equipment" : splitValuesEqui[24],
					"On Hire Date" : splitValuesEqui[25],
					"Unit Type" : splitValuesEqui[1],
					"Lease No" : splitValuesEqui[2],
					"Booking Ref" : splitValuesEqui[3],
					"Unit Description" : splitValuesEqui[12]
				});
			}
			}
			requestedSel = "Booking Ref : " + NAPLCRMData[0].ReleaseAuth;
			requestedSel = requestedSel + " || " + " Material Type : " + NAPLCRMData[0].UnitType;
			if(globalBookingLeaseRem == "R")
				requestedSel = requestedSel + " || " + " Grade : " + NAPLCRMData[0].LeaseNo;
			else
				requestedSel = requestedSel + " || " + " Lease No. : " + NAPLCRMData[0].LeaseNo;

			sap.ui.getCore().byId("naPICKLevel").setTitle(requestedSel);
		}
		else{
				for(var j=0;j<FNACRMDataReqDet.length;j++){

				if(FNACRMDataReqDet[j].Keys == keys){
				NAPLCRMData.push({
					"Equipment" : FNACRMDataReqDet[j].Equipment,
					"Ohdate" : FNACRMDataReqDet[j].Ohdate,
					"UnitType" : FNACRMDataReqDet[j].UnitType,
					"LeaseNo" : FNACRMDataReqDet[j].LeaseNo,
					"ReleaseAuth" : FNACRMDataReqDet[j].ReleaseAuth,
					"UnitDesc" : FNACRMDataReqDet[j].UnitDesc
				})	;

				jsonInventorynaPickLevel.push({
					"Equipment" : FNACRMDataReqDet[j].Equipment,
					"On Hire Date" : FNACRMDataReqDet[j].Ohdate,
					"Unit Type" : FNACRMDataReqDet[j].UnitType,
					"Lease No" : FNACRMDataReqDet[j].LeaseNo,
					"Booking Ref" : FNACRMDataReqDet[j].ReleaseAuth,
					"Unit Description" : FNACRMDataReqDet[j].UnitDesc
				});
			}
			}
			requestedSel = "Booking Ref : " + NAPLCRMData[0].ReleaseAuth;
			requestedSel = requestedSel + " || " + " Material Type : " + NAPLCRMData[0].UnitType;
			if(globalBookingLeaseRem == "R")
				requestedSel = requestedSel + " || " + " Grade : " + NAPLCRMData[0].LeaseNo;
			else
				requestedSel = requestedSel + " || " + " Lease No. : " + NAPLCRMData[0].LeaseNo;
				sap.ui.getCore().byId("naPICKLevel").setTitle(requestedSel);
			//FNACRMDataReqDet = [];
		}

		var oModelEDIPLASummary = new sap.ui.model.json.JSONModel();
		oModelEDIPLASummary.setData({modelData: NAPLCRMData});
    	sap.ui.getCore().byId("idTableNAPLSummary").setModel(oModelEDIPLASummary);
    	sap.ui.getCore().byId("idTableNAPLSummary").bindRows("/modelData");

    	var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
    	if(visiblerowcount){
    		visiblerowcount = parseInt(visiblerowcount);
    	}else{
    		visiblerowcount = 20;
    	}
        if (NAPLCRMData.length < visiblerowcount){
        	sap.ui.getCore().byId("idTableNAPLSummary").setVisibleRowCount(NAPLCRMData.length);
        	//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        }
    	else{
    		//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		sap.ui.getCore().byId("idTableNAPLSummary").setVisibleRowCount(visiblerowcount);
    	}
        /*var oTable = sap.ui.getCore().byId("idTableNABLSummary");          //Get Hold of table
        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
        oScrollBar.setScrollPosition(0);*/
        app.to("naPICKLevel");


	}
});
