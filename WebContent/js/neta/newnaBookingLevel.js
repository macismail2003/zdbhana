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
var NABLCRMData = [];
var jsonInventorynaBookingLevel = [];
var NABLSummaryArray = [];
var NABLSummaryBookingLevel = [];
var NABLSummaryArrayBackup = [];
var oModelEDINABLSummary;
var FNACRMDataReqConc = [];
var FNACRMDataReq = [];
var FNACRMDataReqDet = [];

sap.ui.model.json.JSONModel.extend("newnaBookingLevel", {

	createnaBookingLevel: function(){

		var oTableNABLSummary = new sap.ui.table.Table("idTableNABLSummary",
				{
	            columnHeaderHeight: 45,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            width:"99%",
	            height: "35px",
	            //fixedColumnCount: 1,
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
					        	  objUtil.makeHTMLTable(jsonInventorynaBookingLevel, "Booking Level Details","export");
					          }
							}),
							]
				})
    	 }).addStyleClass("fontStyle xmarginTop15 tblBorder");

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Booking Ref."}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ReleaseAuth"),
				width : "70px",
				sortProperty: "ReleaseAuth",
				filterProperty: "ReleaseAuth",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column("idBookCommUnits",{
		    	width: "80px",
		   		visible:true,
		   		label: new sap.ui.commons.Label({text: "Units"}).addStyleClass("wraptextcol"),
		   		template: new sap.ui.core.Icon({
			           src : sap.ui.core.IconPool.getIconURI("activity-items"),
			           size : "18px",
			           color : "red",
			           activeColor : "red",
			           activeBackgroundColor : "white",
			           hoverColor : "green",
			           hoverBackgroundColor : "white",
			           width : "18px",
			           visible: true,
			           press : function(oEvent){
			        	   var booking = oEvent.getSource().getParent().getBindingContext().getProperty("ReleaseAuth");
			        	   var matnr = oEvent.getSource().getParent().getBindingContext().getProperty("Matnr");
			        	   var openBy = oEvent.getSource();
			        	   var fnetaLinkBookedUnitsReq = fnetaLinkBookedUnits +
			       					"?$filter=Booking eq '" + booking + "' and Matnr eq '" + matnr + "'";

			        	   	busyDialog.open();
			       			OData.request({
			       		      requestUri: fnetaLinkBookedUnitsReq,
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
			       				jQuery.sap.require("sap.ui.commons.MessageBox");
			    				sap.ui.commons.MessageBox.show("No units committed",
			                          sap.ui.commons.MessageBox.Icon.WARNING,
			                          "Warning",
			                          [sap.ui.commons.MessageBox.Action.OK],
			                          sap.ui.commons.MessageBox.Action.OK);
			       				busyDialog.close();
			       			}
			       			else{

			       				/* Table to show committed units */

			       				var oTableFNASummaryUnitsBooked = new sap.ui.table.Table({
			    		            //columnHeaderHeight: 60,
			    		            selectionMode: sap.ui.table.SelectionMode.None,
			    		            width:"100%",
			    		            showNoData: true,
			    		            visibleRowCount: 10,
			    		            navigationMode: sap.ui.table.NavigationMode.Paginator
			    		    	}).addStyleClass("fontStyle tblBorder");

			       				/* Column - SERNR */

			       				oTableFNASummaryUnitsBooked.addColumn(new sap.ui.table.Column({
			       			    	width: "110px",
			       			   		visible:true,
			       			   		label: new sap.ui.commons.Label({text: "Serial No"}).addStyleClass("wraptextcol"),
			       			   		template: new sap.ui.commons.TextView().bindProperty("text", "Sernr").addStyleClass("wraptext"),
			       			   		resizable:false,
			       			    }));

			       				/*Data binding */

			       				console.log("No. of units committed for ",booking, " is ",data.results.length);
			    		    	var oModelFNASummaryUnitsBooked = new sap.ui.model.json.JSONModel();
			    		    	oModelFNASummaryUnitsBooked.setData({modelData: data.results});
			    		    	oTableFNASummaryUnitsBooked.setModel(oModelFNASummaryUnitsBooked);
			    		    	oTableFNASummaryUnitsBooked.bindRows("/modelData");

			                  	if(data.results.length < 11){
			                  		oTableFNASummaryUnitsBooked.setVisibleRowCount(data.results.length);
			                  		//oTableFNASummaryUnitsBooked.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			                  	}
			                  	else{
			                  		oTableFNASummaryUnitsBooked.setVisibleRowCount(10);
			                  		//oTableFNASummaryUnitsBooked.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			                  	}

			                  	if(sap.ui.getCore().byId("idPopoverFNASummaryUnitsBooked") != undefined)
			   		          	 sap.ui.getCore().byId("idPopoverFNASummaryUnitsBooked").destroy();

			   		   		 var oPopoverFNASummaryUnitsBooked = new sap.m.Popover("idPopoverFNASummaryUnitsBooked",{
			   		   			   contentWidth : "200px",
			   		               title: booking + " (" + data.results.length + ")",
			   		               modal: true,
			   		               placement: sap.m.PlacementType.Right,
			   		               footer:  new sap.m.Bar({
			   		              	 					visible : true,
			   		                                      contentRight: [
			   		                                                    new sap.m.Button({
			   		                                                                     text: "Close",
			   		                                                                     //type: sap.m.ButtonType.Reject,
			   		                                                                     icon: "sap-icon://close",
			   		                                                                     press: function () {
			   		                                                                  	   sap.ui.getCore().byId("idPopoverFNASummaryUnitsBooked").close();
			   		                                                                     }
			   		                                                                     })
			   		                                                    ],
			   		                                      }),
			   		               content: new sap.m.VBox({
			   		                                       //width:"300px",
			   		                                       items:  [oTableFNASummaryUnitsBooked]
			   		                                       }),

			   		               }).addStyleClass("sapUiPopupWithPadding");

			   		   		 	oPopoverFNASummaryUnitsBooked.openBy(openBy);
			       				busyDialog.close();
			       			}
			       		    },
				       		 function(err){
				   		    	 busyDialog.close();
				   		    });
			           }
			       }),
		   		resizable:false
		 	}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column("idBookLease",{
				label : new sap.ui.commons.Label({text : "Lease"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
				width : "70px",
				sortProperty: "LeaseNo",
				filterProperty: "LeaseNo",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Customer"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Customer"),
				width : "160px",
				sortProperty: "Customer",
				filterProperty: "Customer",
				resizable:true
			}));


			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Unit Type"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Matnr"),
				width : "100px",
				sortProperty: "Matnr",
				filterProperty: "Matnr",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Location"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Location"),
				width : "100px",
				sortProperty: "Location",
				filterProperty: "Location",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Depot"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Depot"),
				width : "200px",
				sortProperty: "Depot",
				filterProperty: "Depot",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Depot Comment"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Comment"),
				width : "160px",
				sortProperty: "Comment",
				filterProperty: "Comment",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Ext. Reference"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Extref"),
				width : "160px",
				sortProperty: "Extref",
				filterProperty: "Extref",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Remaining", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "OutstandQty"),
				width : "90px",
				sortProperty: "OutstandQty",
				filterProperty: "OutstandQty",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column("idPicked",{
				label : new sap.ui.commons.Label({text : "Picked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				hAlign: sap.ui.core.HorizontalAlign.End,
				//template : new sap.ui.commons.TextView().bindProperty("text", "PickedQty"),
				template: new sap.m.Link("PICK",{
	    			enabled: "{enabledPick}",
	    			textAlign : sap.ui.core.TextAlign.End,
	   				press : function(oEvent) {
	   					var keys = oEvent.getSource().getBindingContext().getProperty("Keys");
	   			  		/*var bus = sap.ui.getCore().getEventBus();
	   			  	  	bus.publish("nav", "to", {
	   			        id : "naPickLevel"
	   				  	});*/

	   					var oNAPL = new newnaPickLevel();
	   					oNAPL.setDataPickLevel(keys);
	   				}
	   			}).bindProperty("text", "PickedQty").addStyleClass("wraptext"),
	   			width : "100px",
				sortProperty: "PickedQty",
				filterProperty: "PickedQty",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Total", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "TotQty"),
				width : "100px",
				sortProperty: "TotQty",
				filterProperty: "TotQty",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Start Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "StartDate"),
				width : "100px",
				sortProperty: "StartDate",
				filterProperty: "StartDate",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Expiry Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
				width : "100px",
				sortProperty: "ExpiryDate",
				filterProperty: "ExpiryDate",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Creator"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Creator"),
				width : "100px",
				sortProperty: "Creator",
				filterProperty: "Creator",
				resizable:true
			}));

//			var oBtnTblQtyPkd = new sap.ui.commons.Link({
//				////width : "50px",
//				enabled: '{enabledPickedQty}',
//	            press : function(vTblhdr) {
//	            	new CustDashOutRelReport().getOnlineCDORelRptDtl(this.getHelpId());
//				}}).bindProperty("helpId","Keys").bindProperty("text","PickedQty");

			oTableNABLSummary.addColumn(new sap.ui.table.Column("idBookHeaderstatus",{
				label : new sap.ui.commons.Label({text : "Status"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Headerstatus"),
				width : "180px",
				sortProperty: "Headerstatus",
				filterProperty: "Headerstatus",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column("idBookSaleGrade",{
				label : new sap.ui.commons.Label({text : "Grade"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Grade"),
				width : "70px",
				sortProperty: "Grade",
				filterProperty: "Grade",
				resizable:true
			}));

			oTableNABLSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Status"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Status"),
				width : "80px",
				visible:false,
				sortProperty: "Status",
				filterProperty: "Status",
				resizable:true
			}));

    	var repNABLFlex = new sap.m.FlexBox({
			items: [
                       oTableNABLSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("xmarginTop10");

			return repNABLFlex;

	},

	getDataBookingLevel: function(region, country, city, pcate, pclass, matnr, colId, level, statText, depot){

		if(statText == "Sold w/o Serial No."){
			sap.ui.getCore().byId("idBookLease").setVisible(false);
			sap.ui.getCore().byId("idBookHeaderstatus").setVisible(true);
			sap.ui.getCore().byId("idBookSaleGrade").setVisible(true);
			sap.ui.getCore().byId("idBookCommUnits").setVisible(false);
		}else{
			sap.ui.getCore().byId("idBookLease").setVisible(true);
			sap.ui.getCore().byId("idBookHeaderstatus").setVisible(false);
			sap.ui.getCore().byId("idBookSaleGrade").setVisible(false);
			sap.ui.getCore().byId("idBookCommUnits").setVisible(true);
		}

		if(level == 'Country Level'){
			city = '';
		}
		else if(level == 'Region Level'){
			city = '';
			country = '';
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

		var fnetaLinkCRMReq = fnetaLinkCRM + /*"?$filter=LvReq eq 'X' and Region eq '" + region + "' and Country eq '" + country + "' and City eq '" + city
		+ "' and Status eq '" + colId + "' and Pcate eq '" + pcate + "' and Material eq '" + matnrtemp + "'";*/
		"?$filter=LvReq eq '" + "X" + "' and Inmregion eq '" + mregion + "' and Inregion eq '" + region + "' and Incountry eq '" + country + "' and Incity eq '" + city + "' and Indepot eq '" + depot
		+ "' and Instatus eq '" + colId + "' and Inpcate eq '" + pcate + "' and Inpclass eq '" + pclass + "' and Inmaterial eq '" + matnrtemp
		+ "' and Inpor2 eq '" + oInputPor2 + "' and Inpor eq '" + oInputPor + "' and Inspor eq '" + oSymbolPor
		+ "' and Inage2 eq '" + oInputAge2 + "' and Inage eq '" + oInputAge + "' and Insage eq '" + oSymbolAge
		+ "' and Inallorcapex eq '" + oAllOrCapex
		+ "'";


		busyDialog.open();
		OData.request({
		      requestUri: fnetaLinkCRMReq,
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
				busyDialog.close();
			}
			else{
				FNACRMDataReq = [];
				FNACRMDataReqDet = [];
				FNACRMDataReqConc = [];
				jsonInventorynaBookingLevel = [];

				FNACRMDataReqConc = data.results;
				for(var j=0;j<FNACRMDataReqConc.length;j++){
					splitValues = [];
					splitValues = FNACRMDataReqConc[j].Crmdata.split("$");
					if(splitValues[23] != 'X'){
					FNACRMDataReq.push({
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
						"Depot" : splitValues[0] + " - " + splitValues[15],
						"TotQty" : parseInt($.trim(splitValues[16])),
						"PickedQty" : Number(splitValues[17]),
						"enabledPick": (Number(splitValues[17]) == 0)? false: true,
						"OutstandQty" : splitValues[18],
						"Status" : splitValues[19],
						"ExpiryDate" : splitValues[20],
						"Customer" : splitValues[21],
						"Keys" : splitValues[22],
						"Extref" : splitValues[26],
						"Comment" : splitValues[27],
						"StartDate" : splitValues[28],
						"Creator" : splitValues[29],
						"Headerstatus" : splitValues[30],
						"Grade" : splitValues[31]
					});

					jsonInventorynaBookingLevel.push({


						"Prod. Category" : splitValues[7],
						"Unit Type" : splitValues[8],
						"Region" : splitValues[9],
						"Country" : splitValues[10],
						"City" : splitValues[11],
						"Lease No." : splitValues[2],
						"Booking No." : splitValues[3],
						"Unit Type Description" : splitValues[12],
						"Depot" : splitValues[0] + " - " + splitValues[15],
						"Total Qty" : parseInt($.trim(splitValues[16])),
						"Picked Qty" : Number(splitValues[17]),
						"Outstanding Qty" : splitValues[18],
						"Expiry Date" : splitValues[20],
						"Customer" : splitValues[21],
						"External Reference" : splitValues[26],
						"Depot Comment" : splitValues[27],
						"StartDate" : splitValues[28],
						"Creator" : splitValues[29],
						"Header Status" : splitValues[30],
						"Grade" : splitValues[31]
					});
					}else{
					FNACRMDataReqDet.push({

						"Dcode" : splitValues[0],
						"UnitType" : splitValues[1],
						"LeaseNo" : splitValues[2],
						"ReleaseAuth" : splitValues[3],

						"Region" : splitValues[4],
						"Country" : splitValues[5],
						"Citycod" : splitValues[6],
						"Pcate" : splitValues[7],
						"Matnr" : splitValues[8],
						"ZRegDesc" : splitValues[9],
						"ZCouDesc" : splitValues[10],
						"ZCityDesc" : splitValues[11],
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
						"Equipment" : splitValues[24],
						"Ohdate" : splitValues[25],
						"Extref" : splitValues[26],
						"Comment" : splitValues[27],
						"Grade" : splitValues[31]

					});
					}

				}
				var requestedSel = "";
				if(pcate == matnr){

					requestedSel = "Category : " + pcate;
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naBookingLevel").setTitle(requestedSel);
				}else{
					requestedSel = "Region : " + splitValues[9];
					requestedSel = requestedSel + " || " + " Country : " + splitValues[10];
					requestedSel = requestedSel + " || " + " City : " + splitValues[11];
					requestedSel = requestedSel + " || " + " Category : " + splitValues[7];
					requestedSel = requestedSel + " || " + " Material Type : " + splitValues[8];
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naBookingLevel").setTitle(requestedSel);
				}

					var oModelEDIBLASummary = new sap.ui.model.json.JSONModel();
					oModelEDIBLASummary.setData({modelData: FNACRMDataReq});
			    	sap.ui.getCore().byId("idTableNABLSummary").setModel(oModelEDIBLASummary);
			    	sap.ui.getCore().byId("idTableNABLSummary").bindRows("/modelData");

			    	var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
		        	if(visiblerowcount){
		        		visiblerowcount = parseInt(visiblerowcount);
		        	}else{
		        		visiblerowcount = 20;
		        	}
		            if (FNACRMDataReq.length < visiblerowcount){
		            	sap.ui.getCore().byId("idTableNABLSummary").setVisibleRowCount(visiblerowcount);
		            	//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		            }
		  	    	else{
		  	    		//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		  	    		sap.ui.getCore().byId("idTableNABLSummary").setVisibleRowCount(visiblerowcount);
		  	    	}


				busyDialog.close();
			}
		    },
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP CRM System");
		    });
	},


//	setDataBookingLevel: function(conValue, colId, level){
	setDataBookingLevel: function(region, country, city, pcate, pclass, matnr, colId, level, statText){


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
					"Extref" : splitValues[26],
					"Comment" : splitValues[27],
					"StartDate" : splitValues[28],
					"Creator" : splitValues[29]
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
			colId = "Depot Booking";
			break;
		}
		case "NBOOK":{
			colId = "Capex Booking";
			break;
		}
		case "RESER":{
			colId = "Depot Reservations";
			break;
		}
		case "NRESER":{
			colId = "Capex Reservations";
			break;
		}
		}


		NABLCRMData = [];
		jsonInventorynaBookingLevel = [];

		if(pcate == matnr){

			requestedSel = "Category : " + pcate;
			requestedSel = requestedSel + " || " + " Status : " + colId;
			sap.ui.getCore().byId("naBookingLevel").setTitle(requestedSel);

			for(var j=0;j<FNACRMData.length;j++){


				if(FNACRMData[j].Pcate == pcate && FNACRMData[j].Status == status){

				NABLCRMData.push({


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
						"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
						"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
						"PickedQty" : Number(FNACRMData[j].PickedQty),
						"enabledPick": (FNACRMData[j].PickedQty == "0")? false: true,
						"OutstandQty" : FNACRMData[j].OutstandQty,
						"Status" : FNACRMData[j].Status,
						"ExpiryDate" : FNACRMData[j].ExpiryDate,
						"Customer" : FNACRMData[j].Customer,
						"Extra1" : FNACRMData[j].Extra1,
						"Extra2" : FNACRMData[j].Extra2,
						"Extra3" : FNACRMData[j].Extra3,
						"Extra4" : FNACRMData[j].Extra4,
						"Keys" : FNACRMData[j].Keys,
						"Comment" : FNACRMData[j].Comment,
						"Extref" : FNACRMData[j].Extref,
						"StartDate" : FNACRMData[j].StartDate,
						"Creator" : FNACRMData[j].Creator
					});

				jsonInventorynaBookingLevel.push({


					"Prod. Category" : FNACRMData[j].Pcate,
					"Unit Type" : FNACRMData[j].Matnr,
					"Region" : FNACRMData[j].ZRegDesc,
					"Country" : FNACRMData[j].ZCouDesc,
					"City" : FNACRMData[j].ZCityDesc,
					"Lease No." : FNACRMData[j].LeaseNo,
					"Booking No." : FNACRMData[j].ReleaseAuth,
					"Unit Type Description" : FNACRMData[j].UnitDesc,
					"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
					"Total Qty" : FNACRMData[j].TotQty,
					"Picked Qty" : FNACRMData[j].PickedQty,
					"Outstanding Qty" : FNACRMData[j].OutstandQty,
					"Start Date" : FNACRMData[j].StartDate,
					"Creator" : FNACRMData[j].Creator,
					"Expiry Date" : FNACRMData[j].ExpiryDate,
					"Customer" : FNACRMData[j].Customer,
					"Depot Comment" : FNACRMData[j].Comment,
					"External Reference" : FNACRMData[j].Extref,
				});





				}
			}

		}
		else{



			if(level == "Region Level"){
				for(var j=0;j<FNACRMData.length;j++){


					if((FNACRMData[j].Region == region) && (FNACRMData[j].Pcate == pcate) && (FNACRMData[j].Matnr == matnr) && (FNACRMData[j].Status == status)){

						if(NABLCRMData.length == 0){
								requestedSel = "Region : " + FNACRMData[j].ZRegDesc;
								requestedSel = requestedSel + " || " + " Country : " + FNACRMData[j].ZCouDesc;
								requestedSel = requestedSel + " || " + " City : " + FNACRMData[j].ZCityDesc;
								requestedSel = requestedSel + " || " + " Category : " + FNACRMData[j].Pcate;
								requestedSel = requestedSel + " || " + " Material Type : " + FNACRMData[j].UnitDesc;
								requestedSel = requestedSel + " || " + " Status : " + colId;
								sap.ui.getCore().byId("naBookingLevel").setTitle(requestedSel);
						}

						NABLCRMData.push({


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
							"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
							"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
							"PickedQty" : Number(FNACRMData[j].PickedQty),
							"enabledPick": (FNACRMData[j].PickedQty == "0")? false: true,
							"OutstandQty" : FNACRMData[j].OutstandQty,
							"Status" : FNACRMData[j].Status,
							"ExpiryDate" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Extra1" : FNACRMData[j].Extra1,
							"Extra2" : FNACRMData[j].Extra2,
							"Extra3" : FNACRMData[j].Extra3,
							"Extra4" : FNACRMData[j].Extra4,
							"Keys" : FNACRMData[j].Keys,
							"Comment" : FNACRMData[j].Comment,
							"Extref" : FNACRMData[j].Extref,
							"StartDate" : FNACRMData[j].StartDate,
							"Creator" : FNACRMData[j].Creator
						});

					jsonInventorynaBookingLevel.push({


						"Prod. Category" : FNACRMData[j].Pcate,
						"Unit Type" : FNACRMData[j].Matnr,
						"Region" : FNACRMData[j].ZRegDesc,
						"Country" : FNACRMData[j].ZCouDesc,
						"City" : FNACRMData[j].ZCityDesc,
						"Lease No." : FNACRMData[j].LeaseNo,
						"Booking No." : FNACRMData[j].ReleaseAuth,
						"Unit Type Description" : FNACRMData[j].UnitDesc,
						"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
						"Total Qty" : FNACRMData[j].TotQty,
						"Picked Qty" : FNACRMData[j].PickedQty,
						"Outstanding Qty" : FNACRMData[j].OutstandQty,
						"Start Date" : FNACRMData[j].StartDate,
						"Creator" : FNACRMData[j].Creator,
						"Expiry Date" : FNACRMData[j].ExpiryDate,
						"Customer" : FNACRMData[j].Customer,
						"Depot Comment" : FNACRMData[j].Comment,
						"External Reference" : FNACRMData[j].Extref,
					});





					}
				}
			}else if(level == "Country Level"){
				for(var j=0;j<FNACRMData.length;j++){
					if(FNACRMData[j].Region == region && FNACRMData[j].Country == country && FNACRMData[j].Pcate == pcate &&
							FNACRMData[j].Matnr == matnr && FNACRMData[j].Status == status){

						if(NABLCRMData.length == 0){
							requestedSel = "Region : " + FNACRMData[j].ZRegDesc;
							requestedSel = requestedSel + " || " + " Country : " + FNACRMData[j].ZCouDesc;
							requestedSel = requestedSel + " || " + " City : " + FNACRMData[j].ZCityDesc;
							requestedSel = requestedSel + " || " + " Category : " + FNACRMData[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FNACRMData[j].UnitDesc;
							requestedSel = requestedSel + " || " + " Status : " + colId;
							sap.ui.getCore().byId("naBookingLevel").setTitle(requestedSel);
						}


						NABLCRMData.push({


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
							"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
							"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
							"PickedQty" : Number(FNACRMData[j].PickedQty),
							"enabledPick": (FNACRMData[j].PickedQty == "0")? false: true,
							"OutstandQty" : FNACRMData[j].OutstandQty,
							"Status" : FNACRMData[j].Status,
							"ExpiryDate" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Extra1" : FNACRMData[j].Extra1,
							"Extra2" : FNACRMData[j].Extra2,
							"Extra3" : FNACRMData[j].Extra3,
							"Extra4" : FNACRMData[j].Extra4,
							"Keys" : FNACRMData[j].Keys,
							"Comment" : FNACRMData[j].Comment,
							"Extref" : FNACRMData[j].Extref,
							"StartDate" : FNACRMData[j].StartDate,
							"Creator" : FNACRMData[j].Creator
						});

						jsonInventorynaBookingLevel.push({


							"Prod. Category" : FNACRMData[j].Pcate,
							"Unit Type" : FNACRMData[j].Matnr,
							"Region" : FNACRMData[j].ZRegDesc,
							"Country" : FNACRMData[j].ZCouDesc,
							"City" : FNACRMData[j].ZCityDesc,
							"Lease No." : FNACRMData[j].LeaseNo,
							"Booking No." : FNACRMData[j].ReleaseAuth,
							"Unit Type Description" : FNACRMData[j].UnitDesc,
							"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
							"Total Qty" : FNACRMData[j].TotQty,
							"Picked Qty" : FNACRMData[j].PickedQty,
							"Outstanding Qty" : FNACRMData[j].OutstandQty,
							"Start Date" : FNACRMData[j].StartDate,
							"Creator" : FNACRMData[j].Creator,
							"Expiry Date" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Depot Comment" : FNACRMData[j].Comment,
							"External Reference" : FNACRMData[j].Extref,
					});

					}
				}
			}
			else{
				for(var j=0;j<FNACRMData.length;j++){
					if(FNACRMData[j].Region == region && FNACRMData[j].Country == country && FNACRMData[j].Citycod == city && FNACRMData[j].Pcate == pcate &&
							FNACRMData[j].Matnr == matnr && FNACRMData[j].Status == status){

						if(NABLCRMData.length == 0){
							requestedSel = "Region : " + FNACRMData[j].ZRegDesc;
							requestedSel = requestedSel + " || " + " Country : " + FNACRMData[j].ZCouDesc;
							requestedSel = requestedSel + " || " + " City : " + FNACRMData[j].ZCityDesc;
							requestedSel = requestedSel + " || " + " Category : " + FNACRMData[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FNACRMData[j].UnitDesc;
							requestedSel = requestedSel + " || " + " Status : " + colId;
							sap.ui.getCore().byId("naBookingLevel").setTitle(requestedSel);
					}


							NABLCRMData.push({


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
							"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
							"TotQty" : parseInt($.trim(FNACRMData[j].TotQty)),
							"PickedQty" : Number(FNACRMData[j].PickedQty),
							"enabledPick": (FNACRMData[j].PickedQty == "0")? false: true,
							"OutstandQty" : FNACRMData[j].OutstandQty,
							"Status" : FNACRMData[j].Status,
							"ExpiryDate" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Extra1" : FNACRMData[j].Extra1,
							"Extra2" : FNACRMData[j].Extra2,
							"Extra3" : FNACRMData[j].Extra3,
							"Extra4" : FNACRMData[j].Extra4,
							"Keys" : FNACRMData[j].Keys,
							"Comment" : FNACRMData[j].Comment,
							"Extref" : FNACRMData[j].Extref,
							"StartDate" : FNACRMData[j].StartDate,
							"Creator" : FNACRMData[j].Creator
						});

						jsonInventorynaBookingLevel.push({


							"Prod. Category" : FNACRMData[j].Pcate,
							"Unit Type" : FNACRMData[j].Matnr,
							"Region" : FNACRMData[j].ZRegDesc,
							"Country" : FNACRMData[j].ZCouDesc,
							"City" : FNACRMData[j].ZCityDesc,
							"Lease No." : FNACRMData[j].LeaseNo,
							"Booking No." : FNACRMData[j].ReleaseAuth,
							"Unit Type Description" : FNACRMData[j].UnitDesc,
							"Depot" : FNACRMData[j].Dcode + " - " + FNACRMData[j].Depot,
							"Total Qty" : FNACRMData[j].TotQty,
							"Picked Qty" : FNACRMData[j].PickedQty,
							"Outstanding Qty" : FNACRMData[j].OutstandQty,
							"Start Date" : FNACRMData[j].StartDate,
							"Creator" : FNACRMData[j].Creator,
							"Expiry Date" : FNACRMData[j].ExpiryDate,
							"Customer" : FNACRMData[j].Customer,
							"Depot Comment" : FNACRMData[j].Comment,
							"External Reference" : FNACRMData[j].Extref,
					});
				}
				}
			}

		}

		var oModelEDIBLASummary = new sap.ui.model.json.JSONModel();
		oModelEDIBLASummary.setData({modelData: NABLCRMData});
    	sap.ui.getCore().byId("idTableNABLSummary").setModel(oModelEDIBLASummary);
    	sap.ui.getCore().byId("idTableNABLSummary").bindRows("/modelData");

        if (NABLCRMData.length < 25){
        	sap.ui.getCore().byId("idTableNABLSummary").setVisibleRowCount(NABLCRMData.length);
        	sap.ui.getCore().byId("idTableNABLSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        }
    	else{
    		sap.ui.getCore().byId("idTableNABLSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		sap.ui.getCore().byId("idTableNABLSummary").setVisibleRowCount(25);
    	}



	}
});
