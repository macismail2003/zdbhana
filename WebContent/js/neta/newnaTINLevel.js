/******** NP *******/

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 25.03.2015
*$*$ Reference   : RTS1097
*$*$ Transport   : CGWK900884
*$*$ Tag         : MAC25032015
*$*$ Purpose     : UI5: Utilization Report
*$*$---------------------------------------------------------------------

*/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var NATLTINData = [];
var jsonInventorynaTINLevel = [];
var NATLSummaryArray = [];
var NATLSummaryTINLevel = [];
var NATLSummaryArrayBackup = [];
var oModelEDINATLSummary;
var FNATINDataReqConc = [];
var FNATINDataReq = [];
var FNATINDataReqDet = [];

sap.ui.model.json.JSONModel.extend("newnaTINLevel", {

	createnaTINLevel: function(){

		var oTableNATLSummary = new sap.ui.table.Table("idTableNATLSummary",
				{
	            columnHeaderHeight: 45,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            width:"99%",
	            height: "35px",
	            fixedColumnCount: 1,
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
					        	objUtil.makeHTMLTable(jsonInventorynaTINLevel, "Turn In Stock Details","export");
					          }
							}),
							]
				})
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Equipment"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Equipment").addStyleClass("wraptext"),
				width : "130px",
				sortProperty: "Equipment",
				filterProperty: "Equipment",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "SAP Status"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Saps").addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "Saps",
				filterProperty: "Saps",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Depot Comment"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Comment").addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "Comment",
				filterProperty: "Comment",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Unit Description"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "UnitDesc").addStyleClass("wraptext"),
				width : "160px",
				sortProperty: "UnitDesc",
				filterProperty: "UnitDesc",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Location"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Location").addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "Location",
				filterProperty: "Location",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Constr. Year"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ManufY").addStyleClass("wraptext"),
				width : "60px",
				sortProperty: "ManufY",
				filterProperty: "ManufY",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Constr. Month"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ManufM").addStyleClass("wraptext"),
				width : "50px",
				sortProperty: "ManufM",
				filterProperty: "ManufM",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Lease"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Lease").addStyleClass("wraptext"),
				width : "70px",
				sortProperty: "Lease",
				filterProperty: "Lease",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Redelivery Ref."}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Redel").addStyleClass("wraptext"),
				width : "90px",
				sortProperty: "Redel",
				filterProperty: "Redel",
				resizable:false
			}));

			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Customer"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Customer").addStyleClass("wraptext"),
				width : "160px",
				sortProperty: "Customer",
				filterProperty: "Customer",
				resizable:false
			}));


			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Expiry Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Expiry").addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "Expiry",
				filterProperty: "Expiry",
				resizable:false
			}));



			oTableNATLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Depot"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Depot").addStyleClass("wraptext"),
				width : "160px",
				sortProperty: "Depot",
				filterProperty: "Depot",
				resizable:false
			}));


    	var repNATLFlex = new sap.m.FlexBox({
			items: [   oTableNATLSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");

			return repNATLFlex;

	},

	getDataTINLevel: function(region, country, city, pcate, pclass, matnr, colId, level, statText, depot){
		var matnrtemp = matnr;
		if(pcate == matnrtemp){
			matnrtemp = '';
		}

		if(level == "Country Level")
		 {
			city = "";
		 }else if(level == "Region Level")
		 {
				city = "";
				country = "";
		}

		var ofneta = new newfneta();
		var filterParameters = ofneta.getFilterParameters();
		var mregion = "";
		var matnrtemp = matnr;
		if(pcate == matnrtemp){ // For total lines, read region, country, city, depot, pcate, pclass, matnr from filter drop downs

			mregion = filterParameters.mregion;
			region = filterParameters.region;
			country = filterParameters.country;
			city = filterParameters.city;
			//depot = filterParameters.depot;

			//pcate = filterParameters.pcate;
			pclass = filterParameters.pclass;
			matnrtemp = filterParameters.unittype;

		}

		if(depot == ""){	// If not depot level, check any value from depot filter
			depot = filterParameters.depot;
		}

		oSymbolAge = filterParameters.oSymbolAge;
		oInputAge = filterParameters.oInputAge;
		oInputAge2 = filterParameters.oInputAge2;

		oSymbolPor = filterParameters.oSymbolPor;
		oInputPor = filterParameters.oInputPor;
		oInputPor2 = filterParameters.oInputPor2;

		oAllOrCapex = filterParameters.oAllOrCapex;

		var fnetaLinkTINFull = fnetaLinkTIN + "?$filter=LvReq eq 'X' and Mregion eq '" + mregion + "' and Region eq '" + region + "' and Country eq '" + country + "' and City eq '" + city + "' and Depot eq '" + depot
		+ "' and Status eq '" + colId + "' and Pcate eq '" + pcate + "' and Pclass eq '" + pclass + "' and Material eq '" + matnrtemp + "' and Inallorcapex eq '" + oAllOrCapex + "'";
		busyDialog.open();
		OData.request({
		      requestUri: fnetaLinkTINFull,
		      method: "GET",
		      dataType: 'json',
		      username: "GW_ADMIN",
		      password: "Seaco@123",
		      headers:
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0",
		          "X-CSRF-Token":"Fetch"
		      }
		    },
		    function (data, response){
			if(data.results.length == 0){
	      		$('#idHdrContnt').html('Dynamic Net-A 2.0');
	              var viewId = "UTILREP1";
	              var bus = sap.ui.getCore().getEventBus();
	              bus.publish("nav", "to", {
	                           id : viewId
	              });
//				sap.ui.commons.MessageBox.show("Loading data from SAP...",
//                      sap.ui.commons.MessageBox.Icon.WARNING,
//                      "Warning",
//                      [sap.ui.commons.MessageBox.Action.OK],
//                      sap.ui.commons.MessageBox.Action.OK);
				busyDialog.close();
			}
			else{
				FNATINDataReq = [];
				jsonInventorynaTINLevel = [];
				FNATINDataReqDet = [];
				FNATINDataReqConc = [];

				FNATINDataReqConc = data.results;
				for(var j=0;j<FNATINDataReqConc.length;j++){
					splitValues = [];
					splitValues = FNATINDataReqConc[j].Crmdata.split("$");
					FNATINDataReqDet.push({
						"Equipment" : splitValues[24],
						"Saps" : splitValues[28],
						"ManufY" : splitValues[26],
						"ManufM" : splitValues[27],
						"Location" : splitValues[11],
						"UnitDesc" : splitValues[12],
						"Lease" : splitValues[2],
						"Redel" : splitValues[3],
						"Customer" : splitValues[21] + ' - ' + splitValues[30],
						"Expiry" : splitValues[20],
						"Depot" : splitValues[0] + ' - ' + splitValues[15],
						"Comment" : splitValues[29]
					});

					jsonInventorynaTINLevel.push({
						"Equipment" : splitValues[24],
						"Construct Year" : splitValues[26],
						"Construct Month" : splitValues[27],
						"SAP Status" : splitValues[28],
						"Location" : splitValues[11],
						"Unit Desc." : splitValues[12],
						"Lease" : splitValues[2],
						"Redelivery Ref." : splitValues[3],
						"Customer" : splitValues[21] + ' - ' + splitValues[30],
						"Expiry Date" : splitValues[20],
						"Depot" : splitValues[0] + ' - ' + splitValues[15],
						"Depot Comment" : splitValues[29]
					});
				}
				var requestedSel = "";
				if(pcate == matnr){

					requestedSel = "Category : " + pcate;
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
				}else if(level == "City Level"){
					requestedSel = "Region : " + splitValues[9];
					requestedSel = requestedSel + " || " + " Country : " + splitValues[10];
					requestedSel = requestedSel + " || " + " City : " + splitValues[11];
					requestedSel = requestedSel + " || " + " Category : " + splitValues[7];
					requestedSel = requestedSel + " || " + " Material Type : " + splitValues[8];
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
				}else if(level == "Country Level"){
					requestedSel = "Region : " + splitValues[9];
					requestedSel = requestedSel + " || " + " Country : " + splitValues[10];
					//requestedSel = requestedSel + " || " + " City : " + splitValues[11];
					requestedSel = requestedSel + " || " + " Category : " + splitValues[7];
					requestedSel = requestedSel + " || " + " Material Type : " + splitValues[8];
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
				}else if(level == "Region Level"){
					requestedSel = "Region : " + splitValues[9];
					//requestedSel = requestedSel + " || " + " Country : " + splitValues[10];
					//requestedSel = requestedSel + " || " + " City : " + splitValues[11];
					requestedSel = requestedSel + " || " + " Category : " + splitValues[7];
					requestedSel = requestedSel + " || " + " Material Type : " + splitValues[8];
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
				}
					var updateString = 'Turn In Stock Details';
				    //sap.ui.getCore().byId("idLNATLUpdate").setText(updateString);
				    //sap.ui.getCore().byId("naTINLevel").setTitle(updateString);
					var oModelEDIBLASummary = new sap.ui.model.json.JSONModel();
					oModelEDIBLASummary.setData({modelData: FNATINDataReqDet});
			    	sap.ui.getCore().byId("idTableNATLSummary").setModel(oModelEDIBLASummary);
			    	sap.ui.getCore().byId("idTableNATLSummary").bindRows("/modelData");

			    	var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
		        	if(visiblerowcount){
		        		visiblerowcount = parseInt(visiblerowcount);
		        	}else{
		        		visiblerowcount = 20;
		        	}
		            if (FNATINDataReqDet.length < visiblerowcount){
		            	sap.ui.getCore().byId("idTableNATLSummary").setVisibleRowCount(visiblerowcount);
		            	//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		            }
		  	    	else{
		  	    		//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		  	    		sap.ui.getCore().byId("idTableNATLSummary").setVisibleRowCount(visiblerowcount);
		  	    	}
		        /*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
		        oScrollBar.setScrollPosition(0);*/
			    app.to("naTINLevel");
				busyDialog.close();
			}
		    },
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP CRM System");
		    });
	},


//	setDataTINLevel: function(conValue, colId, level){
	setDataTINLevel: function(region, country, city, pcate, matnr, colId, level, statText){


		var splitValues = [];
		if(FNACRMData.length == 0){
			for(var j=0;j<FNACRMDataConc.length;j++){
				splitValues = [];
				splitValues = FNACRMDataConc[j].Crmdata.split("$");
				FNACRMData.push({
					"Region" : splitValues[4],
					"Country" : splitValues[5],
					"Citycod" : splitValues[6],
					"Pcate" : splitValues[7],
					"Matnr" : splitValues[8],
					"ZRegDesc" : splitValues[9],
					"ZCouDesc" : splitValues[10],
					"ZCityDesc" : splitValues[11],
					"Dcode" : splitValues[0],
					"UnitType" : splitValues[1],
					"LeaseNo" : splitValues[2],
					"ReleaseAuth" : splitValues[3],
					"UnitDesc" : splitValues[12],
					"City" : splitValues[13],
					"Location" : splitValues[14],
					"Depot" : splitValues[15],
					"TotQty" : parseInt($.trim(splitValues[16])),
					"PickedQty" : Number(splitValues[17]),
					"OutstandQty" : splitValues[18],
					"Status" : splitValues[19],
					"ExpiryDate" : splitValues[20],
					"Customer" : splitValues[21],
					"Keys" : splitValues[22],
				})	;

			}
		}

//		var region = null;
//		var country = null;
//		var city = null;
//		var pcate = null;
//		var matnr = null;
		var status = null;
		var requestedSel = "";
//		var splitValues = conValue.split("$");

//		if(splitValues[0] != "")
//		region = splitValues[0];
//		if(splitValues[1] != "")
//		country = splitValues[1];
//		if(splitValues[2] != "")
//		city = splitValues[2];
//		if(splitValues[3] != "")
//		pcate = splitValues[3];
//		if(splitValues[4] != "")
//		matnr =	splitValues[4];
//		if(splitValues[5] != "")
		status = colId;

		switch(colId){
		case "BOOK":{
			colId = "Depot TIN";
			break;
		}
		case "NBOOK":{
			colId = "Capex TIN";
			break;
		}
		case "RESER":{
			colId = "Reservations";
			break;
		}
		}


		NATLCRMData = [];
		jsonInventorynaTINLevel = [];

		if(pcate == matnr){

			requestedSel = "Category : " + pcate;
			requestedSel = requestedSel + " || " + " Status : " + colId;
			sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);

			for(var j=0;j<FNACRMData.length;j++){


				if(FNACRMData[j].Pcate == pcate && FNACRMData[j].Status == status){

				NATLCRMData.push({


						"Region" : FNACRMData[j].Region,
						"Country" : FNACRMData[j].Country,
						"Citycod" : FNACRMData[j].Citycod,
						"Pcate" : FNACRMData[j].Pcate,
						"Matnr" : FNACRMData[j].Matnr,
						"ZRegDesc" : FNACRMData[j].ZRegDesc,
						"ZCouDesc" : FNACRMData[j].ZCouDesc,
						"ZCityDesc" : FNACRMData[j].ZCityDesc,
						"Dcode" : FNACRMData[j].Dcode,
						"UnitType" : FNACRMData[j].UnitType,
						"LeaseNo" : FNACRMData[j].LeaseNo,
						"ReleaseAuth" : FNACRMData[j].ReleaseAuth,
						"UnitDesc" : FNACRMData[j].UnitDesc,
						"City" : FNACRMData[j].City,
						"Location" : FNACRMData[j].Location,
						"Depot" : FNACRMData[j].Depot,
						"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
						"PickedQty" : Number(FNACRMData[j].PickedQty),
						"eNATLedPick": (FNACRMData[j].PickedQty == 0)? false: true,
						"OutstandQty" : FNACRMData[j].OutstandQty,
						"Status" : FNACRMData[j].Status,
						"ExpiryDate" : FNACRMData[j].ExpiryDate,
						"Customer" : FNACRMData[j].Customer,
						"Extra1" : FNACRMData[j].Extra1,
						"Extra2" : FNACRMData[j].Extra2,
						"Extra3" : FNACRMData[j].Extra3,
						"Extra4" : FNACRMData[j].Extra4,
						"Keys" : FNACRMData[j].Keys,
					});

				jsonInventorynaTINLevel.push({


					"Prod. Category" : FNACRMData[j].Pcate,
					"Unit Type" : FNACRMData[j].Matnr,
					"Region" : FNACRMData[j].ZRegDesc,
					"Country" : FNACRMData[j].ZCouDesc,
					"City" : FNACRMData[j].ZCityDesc,
					"Lease No." : FNACRMData[j].LeaseNo,
					"TIN No." : FNACRMData[j].ReleaseAuth,
					"Unit Type Description" : FNACRMData[j].UnitDesc,
					"Depot" : FNACRMData[j].Depot,
					"Total Qty" : FNACRMData[j].TotQty,
					"Picked Qty" : FNACRMData[j].PickedQty,
					"Outstanding Qty" : FNACRMData[j].OutstandQty,
					"Expiry Date" : FNACRMData[j].ExpiryDate,
					"Customer" : FNACRMData[j].Customer,
				});





				}
			}

		}
		else{



			if(level == "Region Level"){
				for(var j=0;j<FNACRMData.length;j++){


					if((FNACRMData[j].Region == region) && (FNACRMData[j].Pcate == pcate) && (FNACRMData[j].Matnr == matnr) && (FNACRMData[j].Status == status)){

						if(NATLCRMData.length == 0){
								requestedSel = "Region : " + FNACRMData[j].ZRegDesc;
								requestedSel = requestedSel + " || " + " Country : " + FNACRMData[j].ZCouDesc;
								requestedSel = requestedSel + " || " + " City : " + FNACRMData[j].ZCityDesc;
								requestedSel = requestedSel + " || " + " Category : " + FNACRMData[j].Pcate;
								requestedSel = requestedSel + " || " + " Material Type : " + FNACRMData[j].UnitDesc;
								requestedSel = requestedSel + " || " + " Status : " + colId;
								sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
						}

						NATLCRMData.push({


							"Region" : FNACRMData[j].Region,
							"Country" : FNACRMData[j].Country,
							"Citycod" : FNACRMData[j].Citycod,
							"Pcate" : FNACRMData[j].Pcate,
							"Matnr" : FNACRMData[j].Matnr,
							"ZRegDesc" : FNACRMData[j].ZRegDesc,
							"ZCouDesc" : FNACRMData[j].ZCouDesc,
							"ZCityDesc" : FNACRMData[j].ZCityDesc,
							"Dcode" : FNACRMData[j].Dcode,
							"UnitType" : FNACRMData[j].UnitType,
							"LeaseNo" : FNACRMData[j].LeaseNo,
							"ReleaseAuth" : FNACRMData[j].ReleaseAuth,
							"UnitDesc" : FNACRMData[j].UnitDesc,
							"City" : FNACRMData[j].City,
							"Location" : FNACRMData[j].Location,
							"Depot" : FNACRMData[j].Depot,
							"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
							"PickedQty" : Number(FNACRMData[j].PickedQty),
							"eNATLedPick": (FNACRMData[j].PickedQty == 0)? false: true,
							"OutstandQty" : FNACRMData[j].OutstandQty,
							"Status" : FNACRMData[j].Status,
							"ExpiryDate" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Extra1" : FNACRMData[j].Extra1,
							"Extra2" : FNACRMData[j].Extra2,
							"Extra3" : FNACRMData[j].Extra3,
							"Extra4" : FNACRMData[j].Extra4,
							"Keys" : FNACRMData[j].Keys,
						});

					jsonInventorynaTINLevel.push({


						"Prod. Category" : FNACRMData[j].Pcate,
						"Unit Type" : FNACRMData[j].Matnr,
						"Region" : FNACRMData[j].ZRegDesc,
						"Country" : FNACRMData[j].ZCouDesc,
						"City" : FNACRMData[j].ZCityDesc,
						"Lease No." : FNACRMData[j].LeaseNo,
						"TIN No." : FNACRMData[j].ReleaseAuth,
						"Unit Type Description" : FNACRMData[j].UnitDesc,
						"Depot" : FNACRMData[j].Depot,
						"Total Qty" : FNACRMData[j].TotQty,
						"Picked Qty" : FNACRMData[j].PickedQty,
						"Outstanding Qty" : FNACRMData[j].OutstandQty,
						"Expiry Date" : FNACRMData[j].ExpiryDate,
						"Customer" : FNACRMData[j].Customer,
					});





					}
				}
			}else if(level == "Country Level"){
				for(var j=0;j<FNACRMData.length;j++){
					if(FNACRMData[j].Region == region && FNACRMData[j].Country == country && FNACRMData[j].Pcate == pcate &&
							FNACRMData[j].Matnr == matnr && FNACRMData[j].Status == status){

						if(NATLCRMData.length == 0){
							requestedSel = "Region : " + FNACRMData[j].ZRegDesc;
							requestedSel = requestedSel + " || " + " Country : " + FNACRMData[j].ZCouDesc;
							requestedSel = requestedSel + " || " + " City : " + FNACRMData[j].ZCityDesc;
							requestedSel = requestedSel + " || " + " Category : " + FNACRMData[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FNACRMData[j].UnitDesc;
							requestedSel = requestedSel + " || " + " Status : " + colId;
							sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
						}


						NATLCRMData.push({


							"Region" : FNACRMData[j].Region,
							"Country" : FNACRMData[j].Country,
							"Citycod" : FNACRMData[j].Citycod,
							"Pcate" : FNACRMData[j].Pcate,
							"Matnr" : FNACRMData[j].Matnr,
							"ZRegDesc" : FNACRMData[j].ZRegDesc,
							"ZCouDesc" : FNACRMData[j].ZCouDesc,
							"ZCityDesc" : FNACRMData[j].ZCityDesc,
							"Dcode" : FNACRMData[j].Dcode,
							"UnitType" : FNACRMData[j].UnitType,
							"LeaseNo" : FNACRMData[j].LeaseNo,
							"ReleaseAuth" : FNACRMData[j].ReleaseAuth,
							"UnitDesc" : FNACRMData[j].UnitDesc,
							"City" : FNACRMData[j].City,
							"Location" : FNACRMData[j].Location,
							"Depot" : FNACRMData[j].Depot,
							"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
							"PickedQty" : Number(FNACRMData[j].PickedQty),
							"eNATLedPick": (FNACRMData[j].PickedQty == 0)? false: true,
							"OutstandQty" : FNACRMData[j].OutstandQty,
							"Status" : FNACRMData[j].Status,
							"ExpiryDate" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Extra1" : FNACRMData[j].Extra1,
							"Extra2" : FNACRMData[j].Extra2,
							"Extra3" : FNACRMData[j].Extra3,
							"Extra4" : FNACRMData[j].Extra4,
							"Keys" : FNACRMData[j].Keys,
						});

						jsonInventorynaTINLevel.push({


							"Prod. Category" : FNACRMData[j].Pcate,
							"Unit Type" : FNACRMData[j].Matnr,
							"Region" : FNACRMData[j].ZRegDesc,
							"Country" : FNACRMData[j].ZCouDesc,
							"City" : FNACRMData[j].ZCityDesc,
							"Lease No." : FNACRMData[j].LeaseNo,
							"TIN No." : FNACRMData[j].ReleaseAuth,
							"Unit Type Description" : FNACRMData[j].UnitDesc,
							"Depot" : FNACRMData[j].Depot,
							"Total Qty" : FNACRMData[j].TotQty,
							"Picked Qty" : FNACRMData[j].PickedQty,
							"Outstanding Qty" : FNACRMData[j].OutstandQty,
							"Expiry Date" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
					});

					}
				}
			}
			else{
				for(var j=0;j<FNACRMData.length;j++){
					if(FNACRMData[j].Region == region && FNACRMData[j].Country == country && FNACRMData[j].Citycod == city && FNACRMData[j].Pcate == pcate &&
							FNACRMData[j].Matnr == matnr && FNACRMData[j].Status == status){

						if(NATLCRMData.length == 0){
							requestedSel = "Region : " + FNACRMData[j].ZRegDesc;
							requestedSel = requestedSel + " || " + " Country : " + FNACRMData[j].ZCouDesc;
							requestedSel = requestedSel + " || " + " City : " + FNACRMData[j].ZCityDesc;
							requestedSel = requestedSel + " || " + " Category : " + FNACRMData[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FNACRMData[j].UnitDesc;
							requestedSel = requestedSel + " || " + " Status : " + colId;
							sap.ui.getCore().byId("idRequestedLineCRM").setText(requestedSel);
					}


							NATLCRMData.push({


							"Region" : FNACRMData[j].Region,
							"Country" : FNACRMData[j].Country,
							"Citycod" : FNACRMData[j].Citycod,
							"Pcate" : FNACRMData[j].Pcate,
							"Matnr" : FNACRMData[j].Matnr,
							"ZRegDesc" : FNACRMData[j].ZRegDesc,
							"ZCouDesc" : FNACRMData[j].ZCouDesc,
							"ZCityDesc" : FNACRMData[j].ZCityDesc,
							"Dcode" : FNACRMData[j].Dcode,
							"UnitType" : FNACRMData[j].UnitType,
							"LeaseNo" : FNACRMData[j].LeaseNo,
							"ReleaseAuth" : FNACRMData[j].ReleaseAuth,
							"UnitDesc" : FNACRMData[j].UnitDesc,
							"City" : FNACRMData[j].City,
							"Location" : FNACRMData[j].Location,
							"Depot" : FNACRMData[j].Depot,
							"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
							"PickedQty" : Number(FNACRMData[j].PickedQty),
							"eNATLedPick": (FNACRMData[j].PickedQty == 0)? false: true,
							"OutstandQty" : FNACRMData[j].OutstandQty,
							"Status" : FNACRMData[j].Status,
							"ExpiryDate" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Extra1" : FNACRMData[j].Extra1,
							"Extra2" : FNACRMData[j].Extra2,
							"Extra3" : FNACRMData[j].Extra3,
							"Extra4" : FNACRMData[j].Extra4,
							"Keys" : FNACRMData[j].Keys,
						});

						jsonInventorynaTINLevel.push({


							"Prod. Category" : FNACRMData[j].Pcate,
							"Unit Type" : FNACRMData[j].Matnr,
							"Region" : FNACRMData[j].ZRegDesc,
							"Country" : FNACRMData[j].ZCouDesc,
							"City" : FNACRMData[j].ZCityDesc,
							"Lease No." : FNACRMData[j].LeaseNo,
							"TIN No." : FNACRMData[j].ReleaseAuth,
							"Unit Type Description" : FNACRMData[j].UnitDesc,
							"Depot" : FNACRMData[j].Depot,
							"Total Qty" : FNACRMData[j].TotQty,
							"Picked Qty" : FNACRMData[j].PickedQty,
							"Outstanding Qty" : FNACRMData[j].OutstandQty,
							"Expiry Date" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
					});
				}
				}
			}

		}


	    var updateString = 'Turn In Stock Details';
	    //sap.ui.getCore().byId("idLNATLUpdate").setText(updateString);
	    sap.ui.getCore().byId("naTINLevel").setTitle(requestedSel);
		var oModelEDIBLASummary = new sap.ui.model.json.JSONModel();
		oModelEDIBLASummary.setData({modelData: NATLCRMData});
    	sap.ui.getCore().byId("idTableNATLSummary").setModel(oModelEDIBLASummary);
    	sap.ui.getCore().byId("idTableNATLSummary").bindRows("/modelData");

        if (NATLCRMData.length < 25){
        	sap.ui.getCore().byId("idTableNATLSummary").setVisibleRowCount(NATLCRMData.length);
        	sap.ui.getCore().byId("idTableNATLSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        }
    	else{
    		sap.ui.getCore().byId("idTableNATLSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		sap.ui.getCore().byId("idTableNATLSummary").setVisibleRowCount(25);
    	}



	}
});
