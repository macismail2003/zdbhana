

jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("newfnetaContainerSalesTable", {

	createContainerSalesTable: function(){

		// Table
    	var oTableFRNASummary = new sap.ui.table.Table("idTableFRNASummary",{
    		columnHeaderHeight: 60,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"99%",
            showNoData: true,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
            enableColumnReordering: false,
   		 	//visibleRowCount: 200,
   		 			fixedColumnCount: 4,
   		 	filter : [ function(oEvent) {
   		 		//oCurrent.setVisibility(oEvent);
			}, this ],
			toolbar: new sap.ui.commons.Toolbar({
				items: [

					new sap.ui.commons.Button({
						icon: "sap-icon://action-settings",
						visible : true,
						press : function(oEvent){
							globalTableFRNASummaryTPC.openDialog();
						}
					}),


					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoServiceFRNETA.delPersData();
							globalTableFRNASummaryTPC.refresh().done(function() {
								sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						visible:false,
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalTableFRNASummaryTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					}),
					new sap.ui.commons.CheckBox({
						text: "Show Totals",
						visible: false,
						selected: function(oEvent) {

						}
					}),

					new sap.ui.commons.RadioButtonGroup("idFRNARadioButtonCapex",{
				        columns : 3,
				        selectedIndex : 0,
				        select : function(oEvent) {
				        	var allorcapex = oEvent.getSource().getSelectedIndex();

				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, undefined);
							fneta.getFRNASummary(filterString);

				        }
				    }).addItem(new sap.ui.core.Item({
				        text : "Both", key : "BOTH"})).addItem(new sap.ui.core.Item({
					        text : "Depot", key : "DEPOT"})).addItem(new sap.ui.core.Item({
						        text : "Capex", key : "CAPEX"}))
				],
				rightItems: [
					/*new sap.ui.commons.ToggleButton({
						text: "AutoSave",
						icon: "sap-icon://save",
						pressed: true,
						press: function(oEvent) {
							oTPC.setAutoSave(this.getPressed());
						}
					})*/

					new sap.ui.commons.Label("idFRNATotalPages", {
						text : " ",
						visible : false,
						//width : "150px"
					}).addStyleClass("totalPages"),

					new sap.ui.commons.Button({
						text: "Refresh",
						icon: "sap-icon://refresh",
						press: function(oEvent) {
				        	var allorcapex = sap.ui.getCore().byId("idFRNARadioButtonCapex").getSelectedIndex();
				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, undefined);
							fneta.getFRNASummary(filterString);
				          }
						}),

					new sap.ui.commons.Button({
						//text: "Excel",
						icon: "sap-icon://excel-attachment",
						press: function(oEvent) {
							/*var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
				        	if(selectedRadio == "Country Level"){
				        		jsonInventoryFRNA = jsonInventoryFRNACou;
				        	}
				        	else if(selectedRadio == "City Level"){
				        		//this.alterPageOneCityLevel();
				        	}
				        	else if(selectedRadio == "Region Level"){
				        		jsonInventoryRFNA = jsonInventoryFRNAReg;
				        	}*/

							  var objUtil = new utility();
				        	  objUtil.makeHTMLTable(jsonInventoryFRNA, "Net A Report","export");
				          }
						}),

						new sap.ui.commons.Button("idFRNAToolbarOptions",{
							text: "Options",
							visible : false,
							icon: "sap-icon://arrow-down",
							press: function(oEvent){


								if(sap.ui.getCore().byId("idFRNATotalRowsWith") != undefined)
				                	 sap.ui.getCore().byId("idFRNATotalRowsWith").destroy();

								if(sap.ui.getCore().byId("idFRNARadioButtonPage") != undefined)
				                	 sap.ui.getCore().byId("idFRNARadioButtonPage").destroy();

								if(sap.ui.getCore().byId("idFRNATotalRowsField") != undefined)
				                	 sap.ui.getCore().byId("idFRNATotalRowsField").destroy();

								if(sap.ui.getCore().byId("idFRNATotalRows") != undefined)
				                	 sap.ui.getCore().byId("idFRNATotalRows").destroy();

								if(sap.ui.getCore().byId("idFRNAFNETAOptionsPopup") != undefined)
				                	 sap.ui.getCore().byId("idFRNAFNETAOptionsPopup").destroy();


								var oTotalRows = new sap.ui.commons.Label("idFRNATotalRows", {
									text : "Max. Rows per Page : ",
									visible : false,
									//width : "150px"
								}).addStyleClass("personalValuesPopupText");

								var lblSpaceTotalRows = new sap.ui.commons.Label( {text: " ",width : '20px'});

								var oTotalRowsField = new sap.m.Input("idFRNATotalRowsField", {
									//value : "50",
									visible : false,
									maxLength : 3,
									type : sap.m.InputType.Number,
									change : function(oEvent){
										var newValue = oEvent.mParameters.newValue;
										newValue = Number(newValue);
										window.localStorage.setItem("memTotalRowsField", newValue);
										var fneta = new newfneta();
							        	fneta.setPersonalValues();
									},
									width : "45px",
								}).addStyleClass("personalValuesPopupInput");

								var valueTotalRowsField = window.localStorage.getItem("memTotalRowsField");
								if(valueTotalRowsField == null){
									sap.ui.getCore().byId("idFRNATotalRowsField").setValue(50);
								}else{
									sap.ui.getCore().byId("idFRNATotalRowsField").setValue(valueTotalRowsField);
								}


								var lblSpaceTotalRowsBetween = new sap.ui.commons.Label( {text: " ",width : '20px'});

								var oTotalRowsWith = new sap.ui.commons.Label("idFRNATotalRowsWith", {
									text : "with ",
									visible : false,
									//width : "150px"
								}).addStyleClass("personalValuesPopupText");

								var lblSpaceTotalRowsWith = new sap.ui.commons.Label( {text: " ",width : '20px'});

								var oRadioButtonPage = new sap.ui.commons.RadioButtonGroup({
									id : "idFRNARadioButtonPage", // sap.ui.core.ID
									visible : true, // boolean
									columns : 2, // int
									editable : true, // boolean
									selectedIndex : 0, // int
									dependents : [], // sap.ui.core.Control, since 1.19
									items : [ new sap.ui.core.Item({
										id : "idFRNAPaginator", // sap.ui.core.ID
										text : "Paginator", // string
										enabled : true, // boolean
										textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
										key : undefined, // string
										tooltip : undefined, // sap.ui.core.TooltipBase
										customData : [], // sap.ui.core.CustomData
										dependents : []
									// sap.ui.core.Control, since 1.19
									}),
									new sap.ui.core.Item({
										id : "idFRNAScrollbar", // sap.ui.core.ID
										text : "Scrollbar", // string
										enabled : true, // boolean
										textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
										key : undefined, // string
										tooltip : undefined, // sap.ui.core.TooltipBase
										customData : [], // sap.ui.core.CustomData
										dependents : []
									// sap.ui.core.Control, since 1.19
									})], // sap.ui.core.Item
									ariaDescribedBy : [], // sap.ui.core.Control
									ariaLabelledBy : [], // sap.ui.core.Control
									select : [ function(oEvent) {
										var selected = oEvent.mParameters.selectedIndex;
										var selected = oEvent.mParameters.selectedIndex;
										if(selected == 0){
											sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
											window.localStorage.setItem("memPaginator", true);
											var fneta = new newfneta();
								        	fneta.setPersonalValues();
										}
										else if(selected == 1){
											sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
											window.localStorage.setItem("memPaginator", false);
											var fneta = new newfneta();
								        	fneta.setPersonalValues();
										}
									}, this ]
								}).addStyleClass("personalValuesPopupRadio");

								/* Set Navigation Mode */
								var valuePaginator = window.localStorage.getItem("memPaginator");
								var textNavigation = "";
								if(valuePaginator == null){
									valuePaginator = "true";
									textNavigation = "Paginator";
								}else if(valuePaginator == "true"){
									textNavigation = "Paginator";
								}else{
									textNavigation = "Scrollbar";
								}

								if(valuePaginator == "true"){
									sap.ui.getCore().byId("idFRNARadioButtonPage").setSelectedIndex(0);
								}else{
									sap.ui.getCore().byId("idFRNARadioButtonPage").setSelectedIndex(1);
								}

								var lblSpaceTotalEndWith = new sap.ui.commons.Label( {text: " ",width : '250px'});

								var lblSpaceTotalBeforeSales = new sap.ui.commons.Label( {text: " ",width : '250px'});

								var totalPages = (Math.ceil(FNASummaryArray.length/50));
				  	    		totalPages = "Pages : " + totalPages;
				  	    		sap.ui.getCore().byId("idFRNATotalPages").setText(totalPages);

								var buttonTotalRows = new sap.m.FlexBox({
									items: [
									        	oTotalRows,
									        	lblSpaceTotalRows,
									        	oTotalRowsField,
									        	lblSpaceTotalRowsBetween,
									        	oTotalRowsWith,
									        	lblSpaceTotalRowsWith,
									        	oRadioButtonPage,
									        	//lblSpaceTotalEndWith,
									        	//oTotalPages,
									        	//lblSpaceTotalBeforeSales,
									        	//oProcessSwitch
						                     ],
						                     direction: "Row"
						                   }).addStyleClass("marginTop10");

								 var oFNETAOptionsPopup = new sap.m.Popover("idFRNAFNETAOptionsPopup",{
				                     title: "Options",
				                     modal: true,
				                     placement: sap.m.PlacementType.Left,
				                     footer:  new sap.m.Bar({

				                                            contentRight: [
				                                                          new sap.m.Button({
				                                                                           text: "Close",
				                                                                           //type: sap.m.ButtonType.Reject,
				                                                                           icon: "sap-icon://close",
				                                                                           press: function () {
				                                                                        	   var fneta = new newfneta();
				                                   								        	   fneta.setPersonalValues();
				                                                                        	   sap.ui.getCore().byId("idFRNAFNETAOptionsPopup").close();
				                                                                           }
				                                                                           })
				                                                          ],
				                                            }),
				                     content: new sap.m.VBox({
				                                             //width:"300px",
				                                             items:  [buttonTotalRows]
				                                             }),

				                     }).addStyleClass("sapUiPopupWithPadding");

								 oFNETAOptionsPopup.openBy(oEvent.getSource());

							}
						})
				]
			})
    	 }).addStyleClass("fontStyle tblBorder");


    	oTableFRNASummary.addColumn(new sap.ui.table.Column("ZRegDescR",{
    		width: "110px",
   		 label: new sap.ui.commons.Label({text: "Region"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZRegDescR").bindProperty("visible", "isNormal").addStyleClass("wraptext"),
   		resizable:false,
//          sortProperty: "Pcate",
          //filterProperty: "ZRegDesc",
 		 }).setMenu(oCustomMenu28));

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("ZCouDescR",{
    		width: "110px",
   		 label: new sap.ui.commons.Label({text: "Country"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCouDescR").bindProperty("visible", "isNormal").addStyleClass("wraptext"),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCouDesc",
    	}).setMenu(oCustomMenu29));

    	var aNames = sap.ui.core.IconPool.getIconNames();
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("ZCityDescR",{
    		width: "200px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "City"}).addStyleClass("wraptextcol"),
   		//template: new sap.ui.commons.TextView().bindProperty("text", "ZCityDesc").bindProperty("helpId","Conc").bindProperty("visible","isNormal").addStyleClass("wraptext"),
   		template: new sap.ui.layout.HorizontalLayout({
   		    content : [
   		      new sap.ui.commons.TextView({
   		        text: "{ZCityDescR}",
   		        textAlign: sap.ui.core.TextAlign.Left,
   		        visible: "{isNormal}"
   		      }),
   		      new sap.ui.commons.Label({text: "", width: "10px", visible: "{isNormal}"}),
   		      /*new sap.ui.commons.Button({
   		    	icon: "sap-icon://drill-down",
   		    	width: "20px",
   		        visible: "{isNormal}",
   		        press : function(oEvent){
   		        	debugger;
   		        },
   		      })*/
			   new sap.ui.core.Icon( {
		           src : sap.ui.core.IconPool.getIconURI( aNames[0] ),
		           size : "10px",
		           color : "red",
		           activeColor : "red",
		           activeBackgroundColor : "white",
		           hoverColor : "green",
		           hoverBackgroundColor : "white",
		           width : "10px",
		           visible: "{isNormal}",
		           press : function(oEvent){
	   		        	var mregion = ""; //oEvent.getSource().getParent().getBindingContext().getProperty("MregionR");
	   		        	var region = oEvent.getSource().getParent().getBindingContext().getProperty("RegionR");
	   		        	var country = oEvent.getSource().getParent().getBindingContext().getProperty("CountryR");
	   		        	var city = oEvent.getSource().getParent().getBindingContext().getProperty("CityR");
	   		        	city = city.substr(0,3);
	   		        	var pcate = oEvent.getSource().getParent().getBindingContext().getProperty("PcateR");
	   		        	var pclass = oEvent.getSource().getParent().getBindingContext().getProperty("PclassR");
	   		        	var matnr = oEvent.getSource().getParent().getBindingContext().getProperty("MaterialR");
	   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();

	   					var citydesc = oEvent.getSource().getParent().getBindingContext().getProperty("ZCityDescR");

	   					var ofneta = new newfneta();
	   					var filterParameters = ofneta.getFilterParameters();
	   					var depot = "";
	   					depot = filterParameters.depot;

	   					var oSymbolAge = filterParameters.oSymbolAge;
	   					var oInputAge = filterParameters.oInputAge;
	   					var oInputAge2 = filterParameters.oInputAge2;

	   					var oSymbolPor = filterParameters.oSymbolPor;
	   					var oInputPor = filterParameters.oInputPor;
	   					var oInputPor2 = filterParameters.oInputPor2;

	   					var oAllOrCapex = filterParameters.oAllOrCapex;

	   					var oRNADepotLevel = new newrnaDepotLevel();
	   					var filterString = "";
	   					filterString = filterString + fnetaLinkREMDEPOT + "?$filter=Inmregion eq '" + mregion + "' and ";
	   					filterString = filterString + "Inregion eq '" + region + "' and ";
	   					filterString = filterString + "Incountry eq '" + country + "' and ";
	   					filterString = filterString + "Incity eq '" + city + "' and ";
	   					filterString = filterString + "Indepot eq '" + depot + "' and ";
	   					filterString = filterString + "Inpclass eq '" + pclass + "' and ";
	   					filterString = filterString + "Inpcate eq '" + pcate + "' and ";
	   					filterString = filterString + "Inmatnr eq '" + matnr + "' and ";
	   					filterString = filterString + "Inpor2 eq '" + oInputPor2 + "' and Inpor eq '" + oInputPor + "' and Inspor eq '" + oSymbolPor
	   					+ "' and Inage2 eq '" + oInputAge2 + "' and Inage eq '" + oInputAge + "' and Insage eq '" + oSymbolAge
	   					+ "' and Inallorcapex eq '" + oAllOrCapex + "'";


	   					oRNADepotLevel.getDepotLines(filterString, citydesc, matnr, selectedRadio, oEvent.getSource());
	   		       }
		       } ).addStyleClass("marginTop5")
   		    ]
   		  }),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCityDesc",
 		 }));	//.setMenu(oCustomMenu30)

    	/*oTableFRNASummary.addColumn(new sap.ui.table.Column("ZCityDescR",{
    		width: "110px",
   		 label: new sap.ui.commons.Label({text: "City"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCityDescR").bindProperty("visible", "isNormal").addStyleClass("wraptext"),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCityDesc",
    	}).setMenu(oCustomMenu30));*/

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("PcateR",{
			 width: "80px",
    		visible:false,
    		 label: new sap.ui.commons.Label({text: "Category"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "PcateR").addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Pcate",
    		//filterProperty: "Pcate",
    	}).setMenu(oCustomMenu31));

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("MaterialR",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "MaterialR", function(cellValue) {
  		         if (isInArrayFREM(cellValue, proCatBuffer)) {
  		             this.addStyleClass('boldText');
  		         } else{
  		        	 this.removeStyleClass('boldText');
  		         }
  		         return cellValue;
  		     }).addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Conc",
    		//filterProperty: "Material",
    	}).setMenu(oCustomMenu32));

    	// Remarketing Port Rating.

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("RprR",{
    	width: "80px",
 		label: new sap.ui.commons.Label({text: "Sale Port Rating", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 		hAlign: sap.ui.core.HorizontalAlign.End,
 		template: new sap.ui.commons.TextView().bindProperty("text", "Rpr").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
    	}).setMenu(oCustomMenu33));

    	// Turn In for Sale Stock

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Sredel",{
    		width: "80px",
    		visible : false,
  		 label: new sap.ui.commons.Label({text: "Outst. RA", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("SREDEL",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledSredel}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
   					/*var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naTINLevel"
   				  	});*/
   					var oNALTIN = new newnaTINLevel();
   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "SREDEL", selectedRadio, "Turn In for Sale Stock", "");
				}
			}).bindProperty("text", "Sredel").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu34));

    	// CW OWM Booking

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Cwbook",{
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "CW OWM Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("CWBOOK",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledCwbook}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
   					/*var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naTINLevel"
   				  	});*/
   					/*var oTable = sap.ui.getCore().byId("idTableFRNASummary");          //Get Hold of table
   			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
   			        oScrollBar.setScrollPosition(0);*/
					  globalBookingLeaseRem = "R";
   					app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "CBOOK", selectedRadio, "CW OWM Booking", "");
				}
			}).bindProperty("text", "Cwbook").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu34));

    	// SALE CFDS

    	/*oTableFRNASummary.addColumn(new sap.ui.table.Column("SbookR",{
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "SALE CFDS", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("SBOOK",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledSbook}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
						globalBookingLeaseRem = "R";
   					app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "SBOOK", selectedRadio, "SALE CFDS", "");
				}
			}).bindProperty("text", "SbookR").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu34)); */

    	// CW Avlb 2

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Cwavlb2",{
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "CW \n Grade 2 AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("CWAVLB2",{
			textAlign : sap.ui.core.TextAlign.End,
			  visible: '{enabledCwavlb2}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//   					var bus = sap.ui.getCore().getEventBus();
//   			  	  	bus.publish("nav", "to", {
//   			        id : "naRemarkLevel"
//   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWAVLB2", selectedRadio, "CW Grade 2 AVLB", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWAVLB2", selectedRadio, "CW Grade 2 AVLB", "");
   					}
				}

			}).bindProperty("text", "Cwavlb2").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu51));

			// SALE AWAP

			oTableFRNASummary.addColumn(new sap.ui.table.Column("Saleawap",{
				width: "80px",
			 label: new sap.ui.commons.Label({text: "SALE AWAP", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
			hAlign: sap.ui.core.HorizontalAlign.End,
			template: new sap.m.Link("SALEAWAP",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledSaleawap}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
						var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
						var city = oEvent.getSource().getBindingContext().getProperty("CityR");
						city = city.substr(0,3);
						var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
						var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
						var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
						var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			//   					var bus = sap.ui.getCore().getEventBus();
			//   			  	  	bus.publish("nav", "to", {
			//   			        id : "naRemarkLevel"
			//   				  	});
						var oNARL = new newnaRemarkLevel();
						if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
															sap.ui.commons.MessageBox.Icon.WARNING,
															"Please Wait...",
															[sap.ui.commons.MessageBox.Action.OK],
															sap.ui.commons.MessageBox.Action.OK);*/
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "SALEAWAP", selectedRadio, "SALE AWAP", "");
						}
						else{
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "SALEAWAP", selectedRadio, "SALE AWAP", "");
						}
				}

			}).bindProperty("text", "Saleawap").addStyleClass("wraptext"),
			 resizable:false,
				 //sortProperty: "Conc",
				 //filterProperty: "Conc",
			}).setMenu(oCustomMenu35));

    	// CW Grade 2 AUTH

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Cwauth2",{
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "CW \n Grade 2 AUTH", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("CWAUTH2",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledCwauth2}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//   					var bus = sap.ui.getCore().getEventBus();
//   			  	  	bus.publish("nav", "to", {
//   			        id : "naRemarkLevel"
//   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWAUTH2", selectedRadio, "CW Grade 2 AUTH", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWAUTH2", selectedRadio, "CW Grade 2 AUTH", "");
   					}

				}
			}).bindProperty("text", "Cwauth2").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu36));

    	// IICL Grade 1 NET

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Iicl1",{
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "IICL \n Grade 1 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		//template: new sap.ui.commons.TextView("ASIS2",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledAsis2}'}).bindProperty("text", "Asis2R").addStyleClass("wraptext"),
		template: new sap.m.Link("IICL1",{
			    //visible: '{enabledIicl1}',
				textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "IICL1", selectedRadio, "IICL Grade 1 NET", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "IICL1", selectedRadio, "IICL Grade 1 NET", "");
   					}
				}
			}).bindProperty("text", "Iicl1",function(cellValue){
   				if(cellValue == 0){
   					//cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu37));

    	// CW Sale Grade 2 NET

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Cwsale2",{
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "CW Sale\nGrade 2 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		//template: new sap.ui.commons.TextView("ASIS3",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledAsis3}'}).bindProperty("text", "Asis3R").addStyleClass("wraptext"),
  		template: new sap.m.Link("CWSALE2",{
			    //visible: '{enabledAsis3}',
				textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
  					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
  					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
  					city = city.substr(0,3);
  					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
  					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
  					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
  					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
  					var oNARL = new newnaRemarkLevel();
  					if(FRNAERPData.length == 0){
  						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWSALE2", selectedRadio, "CW Sale Grade 2 NET", "");
  					}
  					else{
  						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWSALE2", selectedRadio, "CW Sale Grade 2 NET", "");
  					}
				}
			}).bindProperty("text", "Cwsale2",function(cellValue){
   				if(cellValue == 0){
   					//cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu45));

    	// As Is Grade 3 NET

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Asis3",{
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "As Is Grade 3 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		//template: new sap.ui.commons.TextView("CWORTHY",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledCworthy}'}).bindProperty("text", "CworthyR").addStyleClass("wraptext"),
		template: new sap.m.Link("ASIS3",{
			//visible: '{enabledCworthy}',
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS3", selectedRadio, "As Is Grade 3 NET", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS3", selectedRadio, "As Is Grade 3 NET", "");
   					}
				}
			}).bindProperty("text", "Asis3",function(cellValue){
   				if(cellValue == 0){
   					//cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Newavlb",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu38));

			// As Is Grade 4 NET

			oTableFRNASummary.addColumn(new sap.ui.table.Column("Asis4",{
			width: "80px",
			label: new sap.ui.commons.Label({text: "As Is Grade 4 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
			hAlign: sap.ui.core.HorizontalAlign.End,
			//template: new sap.ui.commons.TextView("CWORTHY",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledCworthy}'}).bindProperty("text", "CworthyR").addStyleClass("wraptext"),
			template: new sap.m.Link("ASIS4",{
			//visible: '{enabledCworthy}',
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
						var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
						var city = oEvent.getSource().getBindingContext().getProperty("CityR");
						city = city.substr(0,3);
						var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
						var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
						var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
						var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
						var oNARL = new newnaRemarkLevel();
						if(FRNAERPData.length == 0){
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS4", selectedRadio, "As Is Grade 4 NET", "");
						}
						else{
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS4", selectedRadio, "As Is Grade 4 NET", "");
						}
				}
			}).bindProperty("text", "Asis4",function(cellValue){
					if(cellValue == 0){
						//cellValue = '';
					}
				return cellValue;
				}).addStyleClass("wraptext"),
			 resizable:false,
				 //sortProperty: "Newavlb",
				 //filterProperty: "Conc",
			}).setMenu(oCustomMenu52));

			// As Is Grade 5 NET

			oTableFRNASummary.addColumn(new sap.ui.table.Column("Asis5",{
			width: "80px",
			label: new sap.ui.commons.Label({text: "As Is Grade 5 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
			hAlign: sap.ui.core.HorizontalAlign.End,
			//template: new sap.ui.commons.TextView("CWORTHY",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledCworthy}'}).bindProperty("text", "CworthyR").addStyleClass("wraptext"),
			template: new sap.m.Link("ASIS5",{
			//visible: '{enabledCworthy}',
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
						var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
						var city = oEvent.getSource().getBindingContext().getProperty("CityR");
						city = city.substr(0,3);
						var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
						var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
						var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
						var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
						var oNARL = new newnaRemarkLevel();
						if(FRNAERPData.length == 0){
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS5", selectedRadio, "As Is Grade 5 NET", "");
						}
						else{
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS5", selectedRadio, "As Is Grade 5 NET", "");
						}
				}
			}).bindProperty("text", "Asis5",function(cellValue){
					if(cellValue == 0){
						//cellValue = '';
					}
				return cellValue;
				}).addStyleClass("wraptext"),
			 resizable:false,
				 //sortProperty: "Newavlb",
				 //filterProperty: "Conc",
			}).setMenu(oCustomMenu53));

    	// Trading IICL Grade 6 NET

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Iicl6",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Trading IICL Grade 6 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 hAlign: sap.ui.core.HorizontalAlign.End,
    		 //template: new sap.ui.commons.TextView("IICL",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledIicl}'}).bindProperty("text", "IiclR").addStyleClass("wraptext"),
    		 template: new sap.m.Link("IICL6",{
    			//visible: '{enabledIicl6}',
    			textAlign : sap.ui.core.TextAlign.End,
   				press : function(oEvent) {
   					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "IICL6", selectedRadio, "Trading IICL Grade 6 NET", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "IICL6", selectedRadio, "Trading IICL Grade 6 NET", "");
   					}
   				}
   			}).bindProperty("text", "Iicl6",function(cellValue){
   				if(cellValue == 0){
   					//cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
    		 resizable:false,
    	}).setMenu(oCustomMenu39));

			// WWT Grade 9 NET

			oTableFRNASummary.addColumn(new sap.ui.table.Column("Wwt9",{
				width: "80px",
				 label: new sap.ui.commons.Label({text: "WWT Grade 9 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 //template: new sap.ui.commons.TextView("IICL",{textAlign : sap.ui.core.TextAlign.End, visible: '{enabledIicl}'}).bindProperty("text", "IiclR").addStyleClass("wraptext"),
				 template: new sap.m.Link("WWT9",{
					//visible: '{enabledIicl}',
					textAlign : sap.ui.core.TextAlign.End,
					press : function(oEvent) {
						var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
						var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
						var city = oEvent.getSource().getBindingContext().getProperty("CityR");
						city = city.substr(0,3);
						var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
						var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
						var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
						var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
						var oNARL = new newnaRemarkLevel();
						if(FRNAERPData.length == 0){
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "WWT9", selectedRadio, "WWT Grade 9 NET", "");
						}
						else{
							oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "WWT9", selectedRadio, "WWT Grade 9 NET", "");
						}
					}
				}).bindProperty("text", "Wwt9",function(cellValue){
					if(cellValue == 0){
						//cellValue = '';
					}
				return cellValue;
				}).addStyleClass("wraptext"),
				 resizable:false,
			}).setMenu(oCustomMenu54));

    	// Total Net AVLB

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Netavlb",{
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "Total\nNET AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("NETAVLB",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledNetavlb}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//   					var bus = sap.ui.getCore().getEventBus();
//   			  	  	bus.publish("nav", "to", {
//   			        id : "naRemarkLevel"
//   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "NETAVLB", selectedRadio, "Total NET AVLB", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "NETAVLB", selectedRadio, "Total NET AVLB", "");
   					}

				}
			}).bindProperty("text", "Netavlb").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu44));

    	// Sold without Serial No.

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Qbook", {
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "Sold w/o Serial No.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("QBOOK",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledQbook}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
   					/*var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naTINLevel"
   				  	});*/
   					/*var oTable = sap.ui.getCore().byId("idTableFRNASummary");          //Get Hold of table
   			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
   			        oScrollBar.setScrollPosition(0);*/
						globalBookingLeaseRem = "R";
   					app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "QBOOK", selectedRadio, "Sold w/o Serial No.", "");
				}
			}).bindProperty("text", "Qbook").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu40));

    	// Sold with Serial No.

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Sold", {
    	width: "80px",
  		label: new sap.ui.commons.Label({text: "Sold with Serial No.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("SOLD",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledSold}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//   					var bus = sap.ui.getCore().getEventBus();
//   			  	  	bus.publish("nav", "to", {
//   			        id : "naRemarkLevel"
//   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "SOLD", selectedRadio, "Sold with Serial No.", "");
   					}
   					else{
   						oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "SOLD", selectedRadio, "Sold with Serial No.", "");
   					}

				}
			}).bindProperty("text", "Sold").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu46));


    	// Target CW Inv.

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("TriR",{
    		width: "90px",
  		 label: new sap.ui.commons.Label({text: "Target CW Inv.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.ui.commons.TextView().bindProperty("text", "TriR").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu41));

    	// Open CW Inventory

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Cwshortsuprl", {
    		width: "80px",
 		 label: new sap.ui.commons.Label({text: "CW Shortage /Surplus", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 		hAlign: sap.ui.core.HorizontalAlign.End,
 		template: new sap.ui.commons.TextView().bindProperty("text", "Cwshortsuprl").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
    	}).setMenu(oCustomMenu42));

    	// Market CW Price

    	oTableFRNASummary.addColumn(new sap.ui.table.Column("Trpr", {
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "Market CW Price", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.ui.commons.TextView().bindProperty("text", "TrpR").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu43));

    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

    	var oPersoServiceFRNETA = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFRNETA") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {

    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFRNETA", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFRNETA");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};

    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableFRNASummaryTPC = new sap.ui.table.TablePersoController("idTableFRNASummaryTPC", {
    			table: oTableFRNASummary,
    			persoService: oPersoServiceFRNETA,
    			//hasGrouping: true
    		});
    		globalTableFRNASummaryTPC = oTableFRNASummaryTPC;

    	return oTableFRNASummary;
	}

});
