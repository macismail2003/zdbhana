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
var NARELREMData = [];
var jsonInventorynaRemarkLevel = [];
var NARELSummaryArray = [];
var NARELSummaryRemarkLevel = [];
var NARELSummaryArrayBackup = [];
var globalTableNARLSummaryTPC = null;
var oModelEDINARELSummary;

sap.ui.model.json.JSONModel.extend("newnaRemarkLevel", {

	createnaRemarkLevel: function(){

		var oCurrent = this;


		 var oOperatorModel = new sap.ui.model.json.JSONModel({
	    	   "symbol":[
	    	     {
	    	       "text":"EQ",
	    	       "key":"EQ",
	    	     },
	    	     {
	    	    	 "text":"GT",
		    	       "key":"GT",
	    	     },
	    	     {
	    	    	 "text":"LT",
		    	       "key":"LT",
	    	     }
	    	   ]
	    	 });

	     var oSymbolCombo =   new sap.m.ComboBox(
			        {
			                  items : {
			                         path : "/symbol",
			                         template : new sap.ui.core.ListItem(
			                         {
			                               text : "{text}",
			                               key : "{key}"
			                         })
			                  }
			        }).setModel(oOperatorModel);


		var oTableNARELSummary = new sap.ui.table.Table("idTableNARELSummary",
				{
	            columnHeaderHeight: 45,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            width:"99%",
	            height: "35px",
	            fixedColumnCount: 1,
	            enableColumnReordering: false,
	            //navigationMode: sap.ui.table.NavigationMode.Paginator,
	            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
	            toolbar: new sap.ui.commons.Toolbar({
					visible : true,
					rightItems: [

						new sap.ui.commons.Button({
							visible : true,
							//text: "Excel",
							icon: "sap-icon://excel-attachment",
							press: function(oEvent) {
								var objUtil = new utility();
					        	objUtil.makeHTMLTable(jsonInventorynaRemarkLevel, "Container Sales Equipment Level Details","export");
					          }
							}),
							]
				}),
	   		 	filter : [ function(oEvent) {
	   		 		//oCurrent.setVisibility(oEvent);
				}, this ],
				}).addStyleClass("fontStyle xmarginTop15 tblBorder");

		var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

    	var oPersoServiceFNETANARL = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFNETANARL") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {

    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFNETANARL", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFNETANARL");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};

    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableNARLSummaryTPC = new sap.ui.table.TablePersoController("idTableNARLSummaryTPC", {
    			table: oTableNARELSummary,
    			persoService: oPersoServiceFNETANARL,
    			//hasGrouping: true
    		});
    		globalTableNARLSummaryTPC = oTableNARLSummaryTPC;

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Serial No."}).addStyleClass("wraptextcol"),
	      		 template: new sap.ui.commons.Link({
	      			 press : function(oEvent){
	      				//globalEquipmentType
	      				var onewnaSPECLevel = new newnaSPECLevel();
	      				onewnaSPECLevel.getFullSpec(globalEquipmentType, this.getText());
	      			 }
	      		}).bindProperty("text", "Equnr").addStyleClass("wraptext"),
				width : "120px",
				sortProperty: "Equnr",
				filterProperty: "Equnr",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
		    	width: "60px",
		   		visible:true,
		   		label: new sap.ui.commons.Label({text: "Cert."}).addStyleClass("wraptextcol"),
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
			        	   debugger;

			        	   var equnr = oEvent.getSource().getParent().getBindingContext().getProperty("Equnr");
			        	   var onaCERTLevel = new newnaCERTLevel();
			        	   if(globalIsTanks)
			        		   onaCERTLevel.getCertificatesFromSilverCims(equnr);
			        	   else
			        		   onaCERTLevel.getCertificatesFromSAP(equnr);

			           }
			       }),
		   		resizable:false
		 	}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "SAP Status"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Sapstatus").addStyleClass("wraptext"),
				width : "160px",
				sortProperty: "Sapstatus",
				filterProperty: "Sapstatus",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Depot"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Lifnr").addStyleClass("wraptext"),
				width : "50px",
				sortProperty: "Lifnr",
				filterProperty: "Lifnr",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Depot Name"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Pltxt").addStyleClass("wraptext"),
				width : "160px",
				sortProperty: "Pltxt",
				filterProperty: "Pltxt",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Type"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Matnr").addStyleClass("wraptext"),
				width : "70px",
				sortProperty: "Matnr",
				filterProperty: "Matnr",
				resizable:false,
				visible:false,
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Type"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Maktx").addStyleClass("wraptext"),
				width : "140px",
				sortProperty: "Maktx",
				filterProperty: "Maktx",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Sub Type"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "SubType").addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "SubType",
				filterProperty: "SubType",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Sale Class"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "SaleClass").addStyleClass("wraptext"),
				width : "160px",
				sortProperty: "SaleClass",
				filterProperty: "SaleClass",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Sale Grade"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Anlzu").addStyleClass("wraptext"),
				width : "60px",
				sortProperty: "Anlzu",
				filterProperty: "Anlzu",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Manuf. Year"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Baujj").addStyleClass("wraptext"),
				width : "70px",
				sortProperty: "Baujj",
				filterProperty: "Baujj",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Manuf. Month"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Baumm").addStyleClass("wraptext"),
				width : "70px",
				sortProperty: "Baumm",
				filterProperty: "Baumm",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Sale Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "SaleDt").addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "SaleDt",
				filterProperty: "SaleDt",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Gate In Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "GateinDt"),
				width : "100px",
				sortProperty: "GateinDt",
				filterProperty: "GateinDt",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "CFDS Date"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "CfdsDt", function(cellValue){
				var salecolor = "";
				var diffDays = "";
				var saledate = "";
				var saledatarray = [];
				var todayDate = new Date();
				var todayDateInt = "";

			    if(cellValue){
				// Sale Date
				saledate = cellValue;
				saledatarray = saledate.split('.');
				//saledate = saledatarray[2] + saledatarray[1] + saledatarray[0];
				saledate = saledatarray[1] + "/" + saledatarray[0] + "/" + saledatarray[2];
				if(saledate != "00/00/0000"){
				saledate = new Date(saledate);

				// Today's Date
				//todayDateInt = String(todayDate.getFullYear()) + String(todayDate.getMonth() + 1) + String(todayDate.getDate());
				//todayDateInt = parseInt(todayDateInt);

				// Difference in days
				//diffdate = todayDateInt - saledate;
				var timeDiff = Math.abs(saledate.getTime() - todayDate.getTime());
				diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				// Color
				salecolor = "";
				if(diffDays >= 0 &&  diffDays <= 60){
					salecolor = "salegreen";
				}else if(diffDays >= 61 &&  diffDays <= 120){
					salecolor = "saleyellow";
				}else if(diffDays >= 121 &&  diffDays <= 179){
					salecolor = "saleorange";
				}else if(diffDays >= 180 &&  diffDays <= 455){
					salecolor = "salelightred";
				}else if(diffDays >= 456){
					salecolor = "salered";
				}
				}else{
					salecolor = "";
				}
				 this.removeStyleClass("salegreen");
				 this.removeStyleClass("saleyellow");
				 this.removeStyleClass("saleorange");
				 this.removeStyleClass("salelightred");
				 this.removeStyleClass("salered");

				 this.addStyleClass(salecolor);
			    }
		         return cellValue;
				}
				).addStyleClass("wraptext"),
				width : "100px",
				sortProperty: "CfdsDt",
				filterProperty: "CfdsDt",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Repair Cost"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "RepCost"),
				width : "80px",
				sortProperty: "RepCost",
				filterProperty: "RepCost",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "Lessee Cost"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "LesseeCost").addStyleClass("wraptext"),
				width : "80px",
				visible : false,
				sortProperty: "LesseeCost",
				filterProperty: "LesseeCost",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "GES Cost"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "GesCost").addStyleClass("wraptext"),
				width : "80px",
				visible : false,
				sortProperty: "GesCost",
				filterProperty: "GesCost",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "CW Cost"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "CwCost").addStyleClass("wraptext"),
				width : "80px",
				sortProperty: "CwCost",
				filterProperty: "CwCost",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "NBV Before"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "NbvBefore").addStyleClass("wraptext"),
				width : "80px",
				sortProperty: "NbvBefore",
				filterProperty: "NbvBefore",
				resizable:false,
				visible:false,
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({text : "NBV (USD)"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "NbvAfter").addStyleClass("wraptext"),
				width : "80px",
				sortProperty: "NbvAfter",
				filterProperty: "NbvAfter",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column("idColRELReleaseAuth",{
				label : new sap.ui.commons.Label({text : "Booking Ref."}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "ReleaseAuth").addStyleClass("wraptext"),
				width : "80px",
				sortProperty: "ReleaseAuth",
				filterProperty: "ReleaseAuth",
				resizable:false
			}));

			oTableNARELSummary.addColumn(new sap.ui.table.Column("idColRELCustomer",{
				label : new sap.ui.commons.Label({text : "Customer"}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView().bindProperty("text", "Customername").addStyleClass("wraptext"),
				width : "180px",
				sortProperty: "Customername",
				filterProperty: "Customername",
				resizable:false
			}));

    	var repNARELFlex = new sap.m.FlexBox({
			items: [   oTableNARELSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");

			return repNARELFlex;

	},

	getDataRemarkLevel: function(region, country, city, pcate, pclass, matnr, colId, level, statText, depot){
		globalEquipmentType = pcate;

		if(pcate == "TANKS" || pcate == matnrtemp){
			globalIsTanks = true;
		}else{
			globalIsTanks = false;
		}

		if(level == 'Country Level'){
			city = '';
		}
		else if(level == 'Region Level'){
			city = '';
			country = '';
		}

		if(colId == "SOLD"){
			sap.ui.getCore().byId("idColRELReleaseAuth").setVisible(true);
			sap.ui.getCore().byId("idColRELCustomer").setVisible(true);
		}else{
			sap.ui.getCore().byId("idColRELReleaseAuth").setVisible(false);
			sap.ui.getCore().byId("idColRELCustomer").setVisible(false);
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
			matnr = filterParameters.unittype;

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

		var fremnetaLinkERPReq = fremnetaLinkERP + "?$filter=LvReq eq 'X' and Inmregion eq '" + mregion + "' and Inregion eq '" + region + "' and Incountry eq '" + country + "' and Incity eq '" + city + "' and Indepot eq '" + depot
		+ "' and Instatus eq '" + colId + "' and Inpcate eq '" + pcate +  "' and Inpclass eq '" + pclass + "' and Inmaterial eq '" + matnr
		+ "' and Inpor2 eq '" + oInputPor2 + "' and Inpor eq '" + oInputPor + "' and Inspor eq '" + oSymbolPor
		+ "' and Inage2 eq '" + oInputAge2 + "' and Inage eq '" + oInputAge + "' and Insage eq '" + oSymbolAge
		+ "' and Inallorcapex eq '" + oAllOrCapex
		+ "'";

		busyDialog.open();
		OData.request({
		      requestUri: fremnetaLinkERPReq,
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
				sap.ui.commons.MessageBox.show("Sorry, No data!",
                      sap.ui.commons.MessageBox.Icon.WARNING,
                      "Warning",
                      [sap.ui.commons.MessageBox.Action.OK],
                      sap.ui.commons.MessageBox.Action.OK);
				busyDialog.close();
			}
			else{
				busyDialog.close();
				var sclass = "";
				var status = null;
				var requestedSel = "";

				status = colId;

				switch(colId){
				case "ASIS":{
					colId = "Available � As Is";
					break;
				}
				case "IICL":{
					colId = "Available � IICL/CIC";
					break;
				}
				case "CWORTHY":{
					colId = "Available � Cargo worthy";
					break;
				}
				case "UNDREP":{
					colId = "Under Repair";
					break;
				}
				case "AWAP":{
					colId = "Awaiting Approval";
					break;
				}
				case "SOLD":{
					colId = "Sold Awaiting Pickup";
					break;
				}
				}

				if(pcate == matnr){

					requestedSel = "Category : " + pcate;
					requestedSel = requestedSel + " || " + " Status : " + colId;
					sap.ui.getCore().byId("naRemarkLevel").setTitle(requestedSel);

				}else{
					requestedSel = "Region : " + data.results[0].Tplnr1;
					requestedSel = requestedSel + " || " + " Country : " + data.results[0].Tplnr2;
					requestedSel = requestedSel + " || " + " City : " + data.results[0].Tplnr3;
					requestedSel = requestedSel + " || " + " Category : " + data.results[0].Pcate;
					requestedSel = requestedSel + " || " + " Material Type : " + data.results[0].Maktx;
					requestedSel = requestedSel + " || " + " Status : " + statText;
					sap.ui.getCore().byId("naRemarkLevel").setTitle(requestedSel);
				}

				NARELREMData = [];
				jsonInventorynaRemarkLevel = [];

				for(var j=0;j<data.results.length;j++){

					switch(data.results[j].SaleClass){
					case "1":{
						sclass = "For Sale";
						break;
					}
					case "2":{
						sclass = "Committed to sale";
						break;
					}
					case "3":{
						sclass = "Not classified";
						break;
					}
					}

					NARELREMData.push({
							"Equnr" : data.results[j].Equnr,
							"Pcate" : data.results[j].Pcate,
							"Tplnr1" : data.results[j].Tplnr1,
							"Tplnr2" : data.results[j].Tplnr2,
							"Tplnr3" : data.results[j].Tplnr3,
							"Lifnr" : data.results[j].Lifnr,
							"Pltxt" : data.results[j].Pltxt,
							"Matnr" : data.results[j].Matnr,
							"Maktx" : data.results[j].Maktx,
							"SubType" : data.results[j].SubType,
							"Pcate" : data.results[j].Pcate,
							"SaleClass" : sclass,
							"Anlzu" : data.results[j].Anlzu,
							"Afabe" : data.results[j].Afabe,
							"Baujj" : data.results[j].Baujj,
							"Baumm" : data.results[j].Baumm,
							"SaleDt": data.results[j].SaleDt,
							"AvlbDays" : data.results[j].AvlbDays,
							"GateinDt" : data.results[j].GateinDt,
							"CfdsDt" : data.results[j].CfdsDt,
							"RepCost" : data.results[j].RepCost,
							"LesseeCost" : data.results[j].LesseeCost,
							"GesCost" : data.results[j].GesCost,
							"CwCost" : data.results[j].CwCost,
							"NbvBefore" : data.results[j].NbvBefore,
							"NbvAfter" : data.results[j].NbvAfter,
							"ReleaseAuth" : data.results[j].ReleaseAuth,
							"Customername" : data.results[j].Customername,

							"Sapstatus" : data.results[j].Sapstatus
						});

					jsonInventorynaRemarkLevel.push({

						"Serial No." : data.results[j].Equnr,
						"SAP Status" : data.results[j].Sapstatus,
						"Category" : data.results[j].Pcate,
						"Region" : data.results[j].Tplnr1,
						"Country" : data.results[j].Tplnr2,
						"City" : data.results[j].Tplnr3,
						"Depot Code" : data.results[j].Lifnr,
						"Depot" : data.results[j].Pltxt,
						"Material" : data.results[j].Matnr,
						"Material Desc." : data.results[j].Maktx,
						"Sub Type" : data.results[j].SubType,
						"Category" : data.results[j].Pcate,
						"Sale Class" : sclass,
						"Sale Grade" : data.results[j].Anlzu,
						"Dep Area" : data.results[j].Afabe,
						"Manuf. Year" : data.results[j].Baujj,
						"Manuf. Month" : data.results[j].Baumm,
						"Sale Date": data.results[j].SaleDt,
						"Avlb Days" : data.results[j].AvlbDays,
						"Gatein Date" : data.results[j].GateinDt,
						"Cfds Date" : data.results[j].CfdsDt,
						"Repair Cost" : data.results[j].RepCost,
						"CW Cost" : data.results[j].CwCost,
						"NBV After" : data.results[j].NbvAfter,
						"Booking Ref." : data.results[j].ReleaseAuth,
						"Customer Name" : data.results[j].Customername,

					});
				}

				var oModelEDIRELASummary = new sap.ui.model.json.JSONModel();
				oModelEDIRELASummary.setData({modelData: NARELREMData});
		    	sap.ui.getCore().byId("idTableNARELSummary").setModel(oModelEDIRELASummary);
		    	sap.ui.getCore().byId("idTableNARELSummary").bindRows("/modelData");

		    	var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
	        	if(visiblerowcount){
	        		visiblerowcount = parseInt(visiblerowcount);
	        	}else{
	        		visiblerowcount = 20;
	        	}
	            if (NARELREMData.length < visiblerowcount){
	            	sap.ui.getCore().byId("idTableNARELSummary").setVisibleRowCount(visiblerowcount);
	            	//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	            }
	  	    	else{
	  	    		//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	    		sap.ui.getCore().byId("idTableNARELSummary").setVisibleRowCount(visiblerowcount);
	  	    	}
		        /*var oTable = sap.ui.getCore().byId("idTableFRNASummary");          //Get Hold of table
		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
		        oScrollBar.setScrollPosition(0);*/
		        app.to("naRemarkLevel");
			}
		    },
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP ERP System");
		    });

	},

//	setDataRemarkLevel: function(conValue, colId, level){
	setDataRemarkLevel: function(region, country, city, pcate, matnr, colId, level){

//		var region = null;
//		var country = null;
//		var city = null;
//		var pcate = null;
//		var matnr = null;
		var status = null;
		var sclass = "";
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
		case "ASIS":{
			colId = "Available � As Is";
			break;
		}
		case "IICL":{
			colId = "Available � IICL/CIC";
			break;
		}
		case "CWORTHY":{
			colId = "Available � Cargo worthy";
			break;
		}
		case "UNDREP":{
			colId = "Under Repair";
			break;
		}
		case "AWAP":{
			colId = "Awaiting Approval";
			break;
		}
		case "SOLD":{
			colId = "Sold. Awaiting Pickup";
			break;
		}
		}


		NARELREMData = [];
		jsonInventorynaRemarkLevel = [];

		if(pcate == matnr){

			requestedSel = "Category : " + pcate;
			requestedSel = requestedSel + " || " + " Status : " + colId;
			sap.ui.getCore().byId("idRequestedLineREM").setText(requestedSel);

			for(var j=0;j<FRNAERPData.length;j++){

				switch(data.results[j].SaleClass){
				case "1":{
					sclass = "For Sale";
					break;
				}
				case "2":{
					sclass = "Committed to sale";
					break;
				}
				case "3":{
					sclass = "Not classified";
					break;
				}
				}

				if(FRNAERPData[j].Pcate == pcate && FRNAERPData[j].Status == status){

				NARELREMData.push({
						"Equnr" : FRNAERPData[j].Equnr,
						"Pcate" : FRNAERPData[j].Pcate,
						"Tplnr1" : FRNAERPData[j].Tplnr1,
						"Tplnr2" : FRNAERPData[j].Tplnr2,
						"Tplnr3" : FRNAERPData[j].Tplnr3,
						"Lifnr" : FRNAERPData[j].Lifnr,
						"Pltxt" : FRNAERPData[j].Pltxt,
						"Matnr" : FRNAERPData[j].Matnr,
						"Maktx" : FRNAERPData[j].Maktx,
						"SubType" : FRNAERPData[j].SubType,
						"Pcate" : FRNAERPData[j].Pcate,
						"SaleClass" : sclass,
						"Anlzu" : FRNAERPData[j].Anlzu,
						"Afabe" : FRNAERPData[j].Afabe,
						"Baujj" : FRNAERPData[j].Baujj,
						"Baumm" : FRNAERPData[j].Baumm,
						"SaleDt": FRNAERPData[j].SaleDt,
						"AvlbDays" : FRNAERPData[j].AvlbDays,
						"GateinDt" : FRNAERPData[j].GateinDt,
						"CfdsDt" : FRNAERPData[j].CfdsDt,
						"RepCost" : FRNAERPData[j].RepCost,
						"LesseeCost" : FRNAERPData[j].LesseeCost,
						"GesCost" : FRNAERPData[j].GesCost,
						"CwCost" : FRNAERPData[j].CwCost,
						"NbvBefore" : FRNAERPData[j].NbvBefore,
						"NbvAfter" : FRNAERPData[j].NbvAfter
					});

				jsonInventorynaRemarkLevel.push({

					"Equipment" : FRNAERPData[j].Equnr,
					"Category" : FRNAERPData[j].Pcate,
					"Region" : FRNAERPData[j].Tplnr1,
					"Country" : FRNAERPData[j].Tplnr2,
					"City" : FRNAERPData[j].Tplnr3,
					"Depot Code" : FRNAERPData[j].Lifnr,
					"Depot" : FRNAERPData[j].Pltxt,
					"Type" : FRNAERPData[j].Matnr,
					"Type Description" : FRNAERPData[j].Maktx,
					"Sub Type" : FRNAERPData[j].SubType,
					"Category" : FRNAERPData[j].Pcate,
					"Sale Class" : sclass,
					"Sale Grade" : FRNAERPData[j].Anlzu,
					"Dep Area" : FRNAERPData[j].Afabe,
					"Manuf. Year" : FRNAERPData[j].Baujj,
					"Manuf. Month" : FRNAERPData[j].Baumm,
					"Sale Date": FRNAERPData[j].SaleDt,
					"Avlb Days" : FRNAERPData[j].AvlbDays,
					"Gatein Date" : FRNAERPData[j].GateinDt,
					"Cfds Date" : FRNAERPData[j].CfdsDt,
					"Repair Cost" : FRNAERPData[j].RepCost,
					"Lessee Cost" : FRNAERPData[j].LesseeCost,
					"Ges Cost" : FRNAERPData[j].GesCost,
					"CW Cost" : FRNAERPData[j].CwCost,
					"NBV Before" : FRNAERPData[j].NbvBefore,
					"NBV After" : FRNAERPData[j].NbvAfter
				});





				}
			}

		}
		else{



			if(level == "Region Level"){
				for(var j=0;j<FRNAERPData.length;j++){

					switch(FRNAERPData[j].SaleClass){
					case "1":{
						sclass = "For Sale";
						break;
					}
					case "2":{
						sclass = "Committed to sale";
						break;
					}
					case "3":{
						sclass = "Not classified";
						break;
					}
					}

					if((FRNAERPData[j].Tplnr1 == region) && (FRNAERPData[j].Pcate == pcate) && (FRNAERPData[j].Matnr == matnr) && (FRNAERPData[j].Status == status)){

						if(NARELREMData.length == 0){
								requestedSel = "Region : " + FRNAERPData[j].Tplnr1;
								requestedSel = requestedSel + " || " + " Country : " + FRNAERPData[j].Tplnr2;
								requestedSel = requestedSel + " || " + " City : " + FRNAERPData[j].Tplnr3;
								requestedSel = requestedSel + " || " + " Category : " + FRNAERPData[j].Pcate;
								requestedSel = requestedSel + " || " + " Material Type : " + FRNAERPData[j].Maktx;
								requestedSel = requestedSel + " || " + " Status : " + colId;
								sap.ui.getCore().byId("idRequestedLineREM").setText(requestedSel);
						}

						NARELREMData.push({
							"Equnr" : FRNAERPData[j].Equnr,
							"Pcate" : FRNAERPData[j].Pcate,
							"Tplnr1" : FRNAERPData[j].Tplnr1,
							"Tplnr2" : FRNAERPData[j].Tplnr2,
							"Tplnr3" : FRNAERPData[j].Tplnr3,
							"Lifnr" : FRNAERPData[j].Lifnr,
							"Pltxt" : FRNAERPData[j].Pltxt,
							"Matnr" : FRNAERPData[j].Matnr,
							"Maktx" : FRNAERPData[j].Maktx,
							"SubType" : FRNAERPData[j].SubType,
							"Pcate" : FRNAERPData[j].Pcate,
							"SaleClass" : sclass,
							"Anlzu" : FRNAERPData[j].Anlzu,
							"Afabe" : FRNAERPData[j].Afabe,
							"Baujj" : FRNAERPData[j].Baujj,
							"Baumm" : FRNAERPData[j].Baumm,
							"SaleDt": FRNAERPData[j].SaleDt,
							"AvlbDays" : FRNAERPData[j].AvlbDays,
							"GateinDt" : FRNAERPData[j].GateinDt,
							"CfdsDt" : FRNAERPData[j].CfdsDt,
							"RepCost" : FRNAERPData[j].RepCost,
							"LesseeCost" : FRNAERPData[j].LesseeCost,
							"GesCost" : FRNAERPData[j].GesCost,
							"CwCost" : FRNAERPData[j].CwCost,
							"NbvBefore" : FRNAERPData[j].NbvBefore,
							"NbvAfter" : FRNAERPData[j].NbvAfter
						});

					jsonInventorynaRemarkLevel.push({

						"Equipment" : FRNAERPData[j].Equnr,
						"Category" : FRNAERPData[j].Pcate,
						"Region" : FRNAERPData[j].Tplnr1,
						"Country" : FRNAERPData[j].Tplnr2,
						"City" : FRNAERPData[j].Tplnr3,
						"Depot Code" : FRNAERPData[j].Lifnr,
						"Depot" : FRNAERPData[j].Pltxt,
						"Type" : FRNAERPData[j].Matnr,
						"Type Description" : FRNAERPData[j].Maktx,
						"Sub Type" : FRNAERPData[j].SubType,
						"Category" : FRNAERPData[j].Pcate,
						"Sale Class" : sclass,
						"Sale Grade" : FRNAERPData[j].Anlzu,
						"Dep Area" : FRNAERPData[j].Afabe,
						"Manuf. Year" : FRNAERPData[j].Baujj,
						"Manuf. Month" : FRNAERPData[j].Baumm,
						"Sale Date": FRNAERPData[j].SaleDt,
						"Avlb Days" : FRNAERPData[j].AvlbDays,
						"Gatein Date" : FRNAERPData[j].GateinDt,
						"Cfds Date" : FRNAERPData[j].CfdsDt,
						"Repair Cost" : FRNAERPData[j].RepCost,
						"Lessee Cost" : FRNAERPData[j].LesseeCost,
						"Ges Cost" : FRNAERPData[j].GesCost,
						"CW Cost" : FRNAERPData[j].CwCost,
						"NBV Before" : FRNAERPData[j].NbvBefore,
						"NBV After" : FRNAERPData[j].NbvAfter
					});





					}
				}
			}else if(level == "Country Level"){
				for(var j=0;j<FRNAERPData.length;j++){

					switch(FRNAERPData[j].SaleClass){
					case "1":{
						sclass = "For Sale";
						break;
					}
					case "2":{
						sclass = "Committed to sale";
						break;
					}
					case "3":{
						sclass = "Not classified";
						break;
					}
					}

					if(FRNAERPData[j].Tplnr1 == region && FRNAERPData[j].Tplnr2 == country && FRNAERPData[j].Pcate == pcate &&
							FRNAERPData[j].Matnr == matnr && FRNAERPData[j].Status == status){

						if(NARELREMData.length == 0){
							requestedSel = "Region : " + FRNAERPData[j].Tplnr1;
							requestedSel = requestedSel + " || " + " Country : " + FRNAERPData[j].Tplnr2;
							requestedSel = requestedSel + " || " + " City : " + FRNAERPData[j].Tplnr3;
							requestedSel = requestedSel + " || " + " Category : " + FRNAERPData[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FRNAERPData[j].UnitDesc;
							requestedSel = requestedSel + " || " + " Status : " + colId;
							sap.ui.getCore().byId("idRequestedLineREM").setText(requestedSel);
						}


						NARELREMData.push({
							"Equnr" : FRNAERPData[j].Equnr,
							"Pcate" : FRNAERPData[j].Pcate,
							"Tplnr1" : FRNAERPData[j].Tplnr1,
							"Tplnr2" : FRNAERPData[j].Tplnr2,
							"Tplnr3" : FRNAERPData[j].Tplnr3,
							"Lifnr" : FRNAERPData[j].Lifnr,
							"Pltxt" : FRNAERPData[j].Pltxt,
							"Matnr" : FRNAERPData[j].Matnr,
							"Maktx" : FRNAERPData[j].Maktx,
							"SubType" : FRNAERPData[j].SubType,
							"Pcate" : FRNAERPData[j].Pcate,
							"SaleClass" : sclass,
							"Anlzu" : FRNAERPData[j].Anlzu,
							"Afabe" : FRNAERPData[j].Afabe,
							"Baujj" : FRNAERPData[j].Baujj,
							"Baumm" : FRNAERPData[j].Baumm,
							"SaleDt": FRNAERPData[j].SaleDt,
							"AvlbDays" : FRNAERPData[j].AvlbDays,
							"GateinDt" : FRNAERPData[j].GateinDt,
							"CfdsDt" : FRNAERPData[j].CfdsDt,
							"RepCost" : FRNAERPData[j].RepCost,
							"LesseeCost" : FRNAERPData[j].LesseeCost,
							"GesCost" : FRNAERPData[j].GesCost,
							"CwCost" : FRNAERPData[j].CwCost,
							"NbvBefore" : FRNAERPData[j].NbvBefore,
							"NbvAfter" : FRNAERPData[j].NbvAfter
						});

					jsonInventorynaRemarkLevel.push({

						"Equipment" : FRNAERPData[j].Equnr,
						"Category" : FRNAERPData[j].Pcate,
						"Region" : FRNAERPData[j].Tplnr1,
						"Country" : FRNAERPData[j].Tplnr2,
						"City" : FRNAERPData[j].Tplnr3,
						"Depot Code" : FRNAERPData[j].Lifnr,
						"Depot" : FRNAERPData[j].Pltxt,
						"Type" : FRNAERPData[j].Matnr,
						"Type Description" : FRNAERPData[j].Maktx,
						"Sub Type" : FRNAERPData[j].SubType,
						"Category" : FRNAERPData[j].Pcate,
						"Sale Class" : sclass,
						"Sale Grade" : FRNAERPData[j].Anlzu,
						"Dep Area" : FRNAERPData[j].Afabe,
						"Manuf. Year" : FRNAERPData[j].Baujj,
						"Manuf. Month" : FRNAERPData[j].Baumm,
						"Sale Date": FRNAERPData[j].SaleDt,
						"Avlb Days" : FRNAERPData[j].AvlbDays,
						"Gatein Date" : FRNAERPData[j].GateinDt,
						"Cfds Date" : FRNAERPData[j].CfdsDt,
						"Repair Cost" : FRNAERPData[j].RepCost,
						"Lessee Cost" : FRNAERPData[j].LesseeCost,
						"Ges Cost" : FRNAERPData[j].GesCost,
						"CW Cost" : FRNAERPData[j].CwCost,
						"NBV Before" : FRNAERPData[j].NbvBefore,
						"NBV After" : FRNAERPData[j].NbvAfter
					});

					}
				}
			}
			else{
				for(var j=0;j<FRNAERPData.length;j++){

					switch(FRNAERPData[j].SaleClass){
					case "1":{
						sclass = "For Sale";
						break;
					}
					case "2":{
						sclass = "Committed to sale";
						break;
					}
					case "3":{
						sclass = "Not classified";
						break;
					}
					}

					if(FRNAERPData[j].Tplnr1 == region && FRNAERPData[j].Tplnr2 == country && FRNAERPData[j].Tplnr3 == city && FRNAERPData[j].Pcate == pcate &&
							FRNAERPData[j].Matnr == matnr && FRNAERPData[j].Status == status){

						if(NARELREMData.length == 0){
							requestedSel = "Region : " + FRNAERPData[j].Tplnr1;
							requestedSel = requestedSel + " || " + " Country : " + FRNAERPData[j].Tplnr2;
							requestedSel = requestedSel + " || " + " City : " + FRNAERPData[j].Tplnr3;
							requestedSel = requestedSel + " || " + " Category : " + FRNAERPData[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FRNAERPData[j].Maktx;
							requestedSel = requestedSel + " || " + " Status : " + colId;
							sap.ui.getCore().byId("idRequestedLineREM").setText(requestedSel);
					}


						NARELREMData.push({
							"Equnr" : FRNAERPData[j].Equnr,
							"Pcate" : FRNAERPData[j].Pcate,
							"Tplnr1" : FRNAERPData[j].Tplnr1,
							"Tplnr2" : FRNAERPData[j].Tplnr2,
							"Tplnr3" : FRNAERPData[j].Tplnr3,
							"Lifnr" : FRNAERPData[j].Lifnr,
							"Pltxt" : FRNAERPData[j].Pltxt,
							"Matnr" : FRNAERPData[j].Matnr,
							"Maktx" : FRNAERPData[j].Maktx,
							"SubType" : FRNAERPData[j].SubType,
							"Pcate" : FRNAERPData[j].Pcate,
							"SaleClass" : sclass,
							"Anlzu" : FRNAERPData[j].Anlzu,
							"Afabe" : FRNAERPData[j].Afabe,
							"Baujj" : FRNAERPData[j].Baujj,
							"Baumm" : FRNAERPData[j].Baumm,
							"SaleDt": FRNAERPData[j].SaleDt,
							"AvlbDays" : FRNAERPData[j].AvlbDays,
							"GateinDt" : FRNAERPData[j].GateinDt,
							"CfdsDt" : FRNAERPData[j].CfdsDt,
							"RepCost" : FRNAERPData[j].RepCost,
							"LesseeCost" : FRNAERPData[j].LesseeCost,
							"GesCost" : FRNAERPData[j].GesCost,
							"CwCost" : FRNAERPData[j].CwCost,
							"NbvBefore" : FRNAERPData[j].NbvBefore,
							"NbvAfter" : FRNAERPData[j].NbvAfter
						});

					jsonInventorynaRemarkLevel.push({

						"Equipment" : FRNAERPData[j].Equnr,
						"Category" : FRNAERPData[j].Pcate,
						"Region" : FRNAERPData[j].Tplnr1,
						"Country" : FRNAERPData[j].Tplnr2,
						"City" : FRNAERPData[j].Tplnr3,
						"Depot Code" : FRNAERPData[j].Lifnr,
						"Depot" : FRNAERPData[j].Pltxt,
						"Type" : FRNAERPData[j].Matnr,
						"Type Description" : FRNAERPData[j].Maktx,
						"Sub Type" : FRNAERPData[j].SubType,
						"Category" : FRNAERPData[j].Pcate,
						"Sale Class" : sclass,
						"Sale Grade" : FRNAERPData[j].Anlzu,
						"Dep Area" : FRNAERPData[j].Afabe,
						"Manuf. Year" : FRNAERPData[j].Baujj,
						"Manuf. Month" : FRNAERPData[j].Baumm,
						"Sale Date": FRNAERPData[j].SaleDt,
						"Avlb Days" : FRNAERPData[j].AvlbDays,
						"Gatein Date" : FRNAERPData[j].GateinDt,
						"Cfds Date" : FRNAERPData[j].CfdsDt,
						"Repair Cost" : FRNAERPData[j].RepCost,
						"Lessee Cost" : FRNAERPData[j].LesseeCost,
						"Ges Cost" : FRNAERPData[j].GesCost,
						"CW Cost" : FRNAERPData[j].CwCost,
						"NBV Before" : FRNAERPData[j].NbvBefore,
						"NBV After" : FRNAERPData[j].NbvAfter
					});
				}
				}
			}

		}


	    var updateString = 'Container Sales Equipment Level Details';
	    sap.ui.getCore().byId("idLNARELUpdate").setText(updateString);

		var oModelEDIRELASummary = new sap.ui.model.json.JSONModel();
		oModelEDIRELASummary.setData({modelData: NARELREMData});
    	sap.ui.getCore().byId("idTableNARELSummary").setModel(oModelEDIRELASummary);
    	sap.ui.getCore().byId("idTableNARELSummary").bindRows("/modelData");

        if (NARELREMData.length < 25){
        	sap.ui.getCore().byId("idTableNARELSummary").setVisibleRowCount(NARELREMData.length);
        	sap.ui.getCore().byId("idTableNARELSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        }
    	else{
    		sap.ui.getCore().byId("idTableNARELSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		sap.ui.getCore().byId("idTableNARELSummary").setVisibleRowCount(25);
    	}



	}
});
