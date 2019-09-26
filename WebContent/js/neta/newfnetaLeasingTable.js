
jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("newfnetaLeasingTable", {

	createLeasingTable: function(){

		jQuery.sap.require("sap.ui.core.IconPool");
		// Table
    	var oTableFNASummary = new sap.ui.table.Table("idTableFNASummary",{
            columnHeaderHeight: 60,
//            firstVisibleRow : 5,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"99%",
            showNoData: true,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
            enableColumnReordering: false,
            //showColumnVisibilityMenu : true,
   		 	//visibleRowCount: 200,
   		 	//fixedRowCount: 1,
   		 	sort : [ function(oEvent) {
   		 		//oCurrent.setVisibility(oEvent);
   		 		debugger;
			}, this ],
			toolbar: new sap.ui.commons.Toolbar({
				items: [

					new sap.ui.commons.Button({
						icon: "sap-icon://action-settings",
						visible : true,
						press : function(oEvent){
							globalTableFNASummaryTPC.openDialog();
						}
					}),


					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoServiceFNETA.delPersData();
							globalTableFNASummaryTPC.refresh().done(function() {
								sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						visible:false,
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalTableFNASummaryTPC.savePersonalizations().done(function() {
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

					new sap.ui.commons.RadioButtonGroup("idRadioButtonCapex",{
				        columns : 3,
				        selectedIndex : 0,
				        select : function(oEvent) {
				        	var allorcapex = oEvent.getSource().getSelectedIndex();

				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, undefined);
							fneta.getFNASummary(filterString);
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

					new sap.ui.commons.Label("idTotalPages", {
						text : " ",
						visible : false,
						//width : "150px"
					}).addStyleClass("totalPages"),

					new sap.ui.commons.Button({
						text: "Refresh",
						icon: "sap-icon://refresh",
						press: function(oEvent) {
				        	var allorcapex = sap.ui.getCore().byId("idRadioButtonCapex").getSelectedIndex();
				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, undefined);
							fneta.getFNASummary(filterString);
				          }
						}),

					new sap.ui.commons.Button({
						//text: "Excel",
						icon: "sap-icon://excel-attachment",
						press: function(oEvent) {
							/*var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
				        	if(selectedRadio == "Country Level"){
				        		jsonInventoryFNA = jsonInventoryFNACou;
				        	}
				        	else if(selectedRadio == "City Level"){
				        		//this.alterPageOneCityLevel();
				        	}
				        	else if(selectedRadio == "Region Level"){
				        		jsonInventoryFNA = jsonInventoryFNAReg;
				        	}*/

							  var objUtil = new utility();
				        	  objUtil.makeHTMLTable(jsonInventoryFNA, "Net A Report","export");
				          }
						}),

						new sap.ui.commons.Button("idToolbarOptions",{
							text: "Options",
							visible : false,
							icon: "sap-icon://arrow-down",
							press: function(oEvent){


								if(sap.ui.getCore().byId("idTotalRowsWith") != undefined)
				                	 sap.ui.getCore().byId("idTotalRowsWith").destroy();

								if(sap.ui.getCore().byId("idRadioButtonPage") != undefined)
				                	 sap.ui.getCore().byId("idRadioButtonPage").destroy();

								if(sap.ui.getCore().byId("idTotalRowsField") != undefined)
				                	 sap.ui.getCore().byId("idTotalRowsField").destroy();

								if(sap.ui.getCore().byId("idTotalRows") != undefined)
				                	 sap.ui.getCore().byId("idTotalRows").destroy();

								if(sap.ui.getCore().byId("idFNETAOptionsPopup") != undefined)
				                	 sap.ui.getCore().byId("idFNETAOptionsPopup").destroy();


								var oTotalRows = new sap.ui.commons.Label("idTotalRows", {
									text : "Max. Rows per Page : ",
									visible : false,
									//width : "150px"
								}).addStyleClass("personalValuesPopupText");

								var lblSpaceTotalRows = new sap.ui.commons.Label( {text: " ",width : '20px'});

								var oTotalRowsField = new sap.m.Input("idTotalRowsField", {
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
									sap.ui.getCore().byId("idTotalRowsField").setValue(50);
								}else{
									sap.ui.getCore().byId("idTotalRowsField").setValue(valueTotalRowsField);
								}


								var lblSpaceTotalRowsBetween = new sap.ui.commons.Label( {text: " ",width : '20px'});

								var oTotalRowsWith = new sap.ui.commons.Label("idTotalRowsWith", {
									text : "with ",
									visible : false,
									//width : "150px"
								}).addStyleClass("personalValuesPopupText");

								var lblSpaceTotalRowsWith = new sap.ui.commons.Label( {text: " ",width : '20px'});

								var oRadioButtonPage = new sap.ui.commons.RadioButtonGroup({
									id : "idRadioButtonPage", // sap.ui.core.ID
									visible : true, // boolean
									columns : 2, // int
									editable : true, // boolean
									selectedIndex : 0, // int
									dependents : [], // sap.ui.core.Control, since 1.19
									items : [ new sap.ui.core.Item({
										id : "idPaginator", // sap.ui.core.ID
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
										id : "idScrollbar", // sap.ui.core.ID
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
										if(selected == 0){
											sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
											window.localStorage.setItem("memPaginator", true);
											var fneta = new newfneta();
								        	fneta.setPersonalValues();
										}
										else if(selected == 1){
											sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
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
									sap.ui.getCore().byId("idRadioButtonPage").setSelectedIndex(0);
								}else{
									sap.ui.getCore().byId("idRadioButtonPage").setSelectedIndex(1);
								}

								var lblSpaceTotalEndWith = new sap.ui.commons.Label( {text: " ",width : '250px'});

								var lblSpaceTotalBeforeSales = new sap.ui.commons.Label( {text: " ",width : '250px'});

								var totalPages = (Math.ceil(FNASummaryArray.length/50));
				  	    		totalPages = "Pages : " + totalPages;
				  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);

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

								 var oFNETAOptionsPopup = new sap.m.Popover("idFNETAOptionsPopup",{
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
				                                                                        	   sap.ui.getCore().byId("idFNETAOptionsPopup").close();
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

						/*new sap.ui.commons.Button("idToolbarFormulaHover",{
							icon: "sap-icon://fx",
							tooltip: "Total Stock = Depot AVLB + Capex AVLB + APPD + HOLD + WEST + AWAP<br/>Depot Net AVLB = Depot AVLB - Depot Booked - Depot RSRV<br/>Capex Net AVLB = Capex AVLB - Capex BOOKED - Capex RSRV<br/>Total Net AVLB = Depot Net AVLB + Capex Net AVLB",
						})*/
				]
			})
    	 }).addStyleClass("fontStyle tblBorder");


    		/* Customer Soter */

    	oTableFNASummary.addColumn(new sap.ui.table.Column("ZRegDesc",{
    		width: "110px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "Region"}).addStyleClass("wraptextcol"),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "ZRegDesc").bindProperty("helpId","Conc").bindProperty("visible","isNormal").addStyleClass("wraptext"),
   		 resizable:false,
   		//sortProperty: "ZRegDesc",
          //filterProperty: "ZRegDesc",
 		 }).setMenu(oCustomMenu1));


    	oTableFNASummary.addColumn(new sap.ui.table.Column("ZCouDesc",{
    	width: "110px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "Country"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCouDesc").bindProperty("helpId","Conc").bindProperty("visible","isNormal").addStyleClass("wraptext"),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCouDesc",
 		 }).setMenu(oCustomMenu2));


    	var aNames = sap.ui.core.IconPool.getIconNames();
    	oTableFNASummary.addColumn(new sap.ui.table.Column("ZCityDesc",{
    		width: "200px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "City"}).addStyleClass("wraptextcol"),
   		//template: new sap.ui.commons.TextView().bindProperty("text", "ZCityDesc").bindProperty("helpId","Conc").bindProperty("visible","isNormal").addStyleClass("wraptext"),
   		template: new sap.ui.layout.HorizontalLayout({
   		    content : [
   		      new sap.ui.commons.TextView({
   		        text: "{ZCityDesc}",
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
	   		        	var mregion = oEvent.getSource().getParent().getBindingContext().getProperty("Mregion");
	   		        	var region = oEvent.getSource().getParent().getBindingContext().getProperty("Region");
	   		        	var country = oEvent.getSource().getParent().getBindingContext().getProperty("Country");
	   		        	var city = oEvent.getSource().getParent().getBindingContext().getProperty("City");
	   		        	city = city.substr(0,3);
	   		        	var pcate = oEvent.getSource().getParent().getBindingContext().getProperty("Pcate");
	   		        	var pclass = oEvent.getSource().getParent().getBindingContext().getProperty("Pclass");
	   		        	var matnr = oEvent.getSource().getParent().getBindingContext().getProperty("Matnr");
	   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();

	   					var citydesc = oEvent.getSource().getParent().getBindingContext().getProperty("ZCityDesc");

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

	   					var oDepotLevel = new newnaDepotLevel();
	   					var filterString = "";
	   					filterString = filterString + fnetaLinkDEPOT + "?$filter=Inmregion eq '" + mregion + "' and ";
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

	   					oDepotLevel.getDepotLines(filterString, citydesc, matnr, selectedRadio, oEvent.getSource());
	   		       }
		       } ).addStyleClass("marginTop5")
   		    ]
   		  }),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCityDesc",
 		 }));	//.setMenu(oCustomMenu3)

    	/*oTableFNASummary.addColumn(new sap.ui.table.Column("Pcate",{
			 width: "80px",
    		visible:false,
    		 label: new sap.ui.commons.Label({text: "Category"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Pcate").bindProperty("helpId","Conc").addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Pcate",
    		//filterProperty: "Pcate",
  		 }).setMenu(oCustomMenu4));*/

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Matnr",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Matnr", function(cellValue) {
  		         if (isInArray(cellValue, proCatBuffer)) {
  		             this.addStyleClass('boldText');
  		         } else{
  		        	 this.removeStyleClass('boldText');
  		         }
  		         return cellValue;
  		     }).addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Conc",
    		//filterProperty: "Matnr",
  		 }).setMenu(oCustomMenu4));
    	/*
    	oTableFNASummary.addColumn(new sap.ui.table.Column("idColConcatenated",{
    		width: "80px",
   		visible:false,
   		 label: new sap.ui.commons.Label({text: "Concatenated"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Conc").addStyleClass("wraptext"),
   		resizable:false,
          //sortProperty: "Pcate",
          //filterProperty: "Pcate",
 		 }));

    	 	oTableFNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "New AVLB", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("NAVLB",{
			textAlign : sap.ui.core.TextAlign.End,
				press : function() {
					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			  		var bus = sap.ui.getCore().getEventBus();
			  	  	bus.publish("nav", "to", {
			        id : "naUnitLevel"
				  	});

				var conc_value = this.getTarget();
					var oNAUL = new newnaUnitLevel();
					oNAUL.getDataUnitLevel(conc_value, "AVLB NEW", selectedRadio, "Available & New");
				}
			}).bindProperty("text", "Navlb").bindProperty("target","Conc", function(cellValue) {

          return cellValue;
      }).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Navlb",
         //filterProperty: "Conc",
		 }));

		 *
		 */


    	// Lease Port Rating

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Por",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Lease Port Rating", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView({
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Por",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
	   }).setMenu(oCustomMenu5));

    	// Sale	Port Rating

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Rpr",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Sale Port Rating", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView({
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Rpr",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
	   }).setMenu(oCustomMenu26));


    	// 	Market CW Price

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Trp",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Market CW Price", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView({
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Trp",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
	   }).setMenu(oCustomMenu27));

    	// 	Avg Leased Out 90 Days

    	oTableFNASummary.addColumn(new sap.ui.table.Column("L90",{
    		width: "90px",
		 label: new sap.ui.commons.Label({text: "Avg Leased Out 90 Days", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView({
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "L90",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
	   }).setMenu(oCustomMenu46));

    	// Pickup credit and notes

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Pcr",{
    	width: "90px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "Pickup Credit/ Charge"}).addStyleClass("wraptextcol"),
   		//template: new sap.ui.commons.TextView().bindProperty("text", "ZCityDesc").bindProperty("helpId","Conc").bindProperty("visible","isNormal").addStyleClass("wraptext"),
   		template: new sap.ui.layout.HorizontalLayout({
   		    content : [
   		      new sap.ui.commons.TextView({
   		        textAlign: sap.ui.core.TextAlign.Left,
   		        visible: "{enablePcr}",
   		        text: "{Pcr}"
   		        /*template : new sap.ui.commons.TextView().bindProperty("text", "Pcr", function(cellValue) {
					var salecolor = "";

					if(cellValue){


					// Color
					salecolor = "";
					if(parseInt(cellValue) < 0){
						salecolor = "salelightred";
					}else{
						salecolor = "";
					}
					 this.addStyleClass(salecolor);
			    	}
	  		         return cellValue;
	   		      })*/
	   		      }).addStyleClass("wraptext"),
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
		           src : sap.ui.core.IconPool.getIconURI( "notes" ),
		           size : "10px",
		           color : "red",
		           activeColor : "red",
		           activeBackgroundColor : "white",
		           hoverColor : "green",
		           hoverBackgroundColor : "white",
		           width : "10px",
		           visible: "{enableNotes}",
		           press : function(oEvent){
		        	    jQuery.sap.require("sap.ui.commons.MessageBox");
	   		        	var notes = oEvent.getSource().getParent().getBindingContext().getProperty("Notes");
	   		        	sap.ui.commons.MessageBox.show(notes,
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Note",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	   		       }
		       } ).addStyleClass("marginTop5")
   		    ]
   		  }),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCityDesc",
 		 }).setMenu(oCustomMenu3));


    	// Turn In Advised

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Redel",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Outst. RA", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.m.Link("TIND",{
			 	visible: '{enabledTind}',
				textAlign : sap.ui.core.TextAlign.End,
					press : function(oEvent) {
						var region = oEvent.getSource().getBindingContext().getProperty("Region");
	   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
	   					var city = oEvent.getSource().getBindingContext().getProperty("City");
	   					city = city.substr(0,3);
	   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
	   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
	   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
	   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
	   					/*var bus = sap.ui.getCore().getEventBus();
	   			  	  	bus.publish("nav", "to", {
	   			        id : "naTINLevel"
	   				  	});*/
	   					var oNALTIN = new newnaTINLevel();
	   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "REDEL", selectedRadio, "Turn In for Depot Stock", "");
					}
				}).bindProperty("text", "Redel",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).addStyleClass("wraptext"),
	 		 resizable:false,
	         //sortProperty: "Redel",
	         //filterProperty: "Conc",
			 }).setMenu(oCustomMenu6));

// AWaiting Estimate...

    	oTableFNASummary.addColumn(new sap.ui.table.Column("West",{
    		width: "70px",
 		 label: new sap.ui.commons.Label({text: "WEST", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 		hAlign: sap.ui.core.HorizontalAlign.End,
 		template: new sap.m.Link("AWAP",{
 			visible: '{enabledWest}',
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//   			  		var bus = sap.ui.getCore().getEventBus();
//   			  	  	bus.publish("nav", "to", {
//   			        id : "naUnitLevel"
//   				  	});
   			  	  	//app.to("naUnitLevel");
   					var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AWAP", selectedRadio, "WEST", "");
   					}
   					else{

   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AWAP", selectedRadio, "WEST", "");
   					}
				}
			}).bindProperty("text", "West",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
		 }).setMenu(oCustomMenu7));

    	// AWaiting Estimate...

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Nwap",{
    	width: "70px",
 		label: new sap.ui.commons.Label({text: "AWAP", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 		hAlign: sap.ui.core.HorizontalAlign.End,
 		template: new sap.m.Link("NWAP",{
 			visible: '{enabledNwap}',
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");

   					var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NWAP", selectedRadio, "AWAP", "");
   					}
   					else{

   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NWAP", selectedRadio, "AWAP", "");
   					}
				}
			}).bindProperty("text", "Nwap",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
		 }).setMenu(oCustomMenu8));

    	// Authorized

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Auth",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "AUTH", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("AUTH",{
			textAlign : sap.ui.core.TextAlign.End,
			visible: '{enabledAuth}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");

   					var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AUTH", selectedRadio, "APPD", "");
   					}
   					else{
   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AUTH", selectedRadio, "APPD", "");
   					}
				}
			}).bindProperty("text", "Auth",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu9));

		  // HOLD...

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Hold",{
    		width: "70px",
    		label: new sap.ui.commons.Label({text: "HOLD", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
	  		hAlign: sap.ui.core.HorizontalAlign.End,
	  		template: new sap.m.Link("HOLD",{
				textAlign : sap.ui.core.TextAlign.End,
				visible: '{enabledHold}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");

   					var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "HOLD", selectedRadio, "Put On Hold", "");
   					}
   					else{

   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "HOLD", selectedRadio, "Put On Hold", "");
   					}
				}
			}).bindProperty("text", "Hold",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu10));

    	// CW Available

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Cavlb",{
    		 width: "70px",

    		 label: new sap.ui.commons.Label({text: "CW AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 hAlign: sap.ui.core.HorizontalAlign.End,
    		 template: new sap.m.Link("CAVLB",{
    			 //enabled: '{enabledCavlb}',
    			 styleClass: "lightblue",
    			 textAlign : sap.ui.core.TextAlign.End,
   				 press : function(oEvent) {
   					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");
   			  	  	var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAVLB", selectedRadio, "Available", "");
   					}
   					else{
   	   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAVLB", selectedRadio, "Available", "");
   					}

   				}
   			}).bindProperty("text", "Cavlb",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
    		 resizable:false,
    	}).setMenu(oCustomMenu11));

			// CW AUTH

			oTableFNASummary.addColumn(new sap.ui.table.Column("Cauth",{
				 width: "70px",

				 label: new sap.ui.commons.Label({text: "CW AUTH", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link("CAUTH",{
					 //enabled: '{enabledCavlb}',
					 styleClass: "lightblue",
					 textAlign : sap.ui.core.TextAlign.End,
					 press : function(oEvent) {
						var region = oEvent.getSource().getBindingContext().getProperty("Region");
						var country = oEvent.getSource().getBindingContext().getProperty("Country");
						var city = oEvent.getSource().getBindingContext().getProperty("City");
						city = city.substr(0,3);
						var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
						var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
						var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
						var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			//			  		var bus = sap.ui.getCore().getEventBus();
			//			  	  	bus.publish("nav", "to", {
			//			        id : "naUnitLevel"
			//				  	});
							//app.to("naUnitLevel");
								var oNAUL = new newnaUnitLevel();
						if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
															sap.ui.commons.MessageBox.Icon.WARNING,
															"Please Wait...",
															[sap.ui.commons.MessageBox.Action.OK],
															sap.ui.commons.MessageBox.Action.OK);*/
							oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAUTH", selectedRadio, "Authorized CW", "");
						}
						else{
								oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAUTH", selectedRadio, "Authorized CW", "");
						}

					}
				}).bindProperty("text", "Cauth",function(cellValue){
					if(cellValue == 0){
						cellValue = '';
					}
				return cellValue;
				}).addStyleClass("wraptext"),
				 resizable:false,
			}).setMenu(oCustomMenu57));

			// CW Available Booked

   //  	oTableFNASummary.addColumn(new sap.ui.table.Column("Cbook",{
   //  		 width: "70px",
	 //
   //  		 label: new sap.ui.commons.Label({text: "CW AVLB Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
   //  		 hAlign: sap.ui.core.HorizontalAlign.End,
   //  		 template: new sap.m.Link("CBOOK",{
   //  			 //enabled: '{enabledCavlb}',
   //  			 styleClass: "lightblue",
   //  			 textAlign : sap.ui.core.TextAlign.End,
   // 				 press : function(oEvent) {
		// 				 var region = oEvent.getSource().getBindingContext().getProperty("Region");
	 //    					var country = oEvent.getSource().getBindingContext().getProperty("Country");
	 //    					var city = oEvent.getSource().getBindingContext().getProperty("City");
	 //    					city = city.substr(0,3);
	 //    					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
	 //    					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
	 //    					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
	 //    					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
	 // //			  		var bus = sap.ui.getCore().getEventBus();
	 // //			  	  	bus.publish("nav", "to", {
	 // //			        id : "naBookingLevel"
	 // //				  	});
	 //    			        /*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
	 //    			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
	 //    			        oScrollBar.setScrollPosition(0);*/
	 // 							globalBookingLeaseRem = "L";
	 // 			  	  	app.to("naBookingLevel");
	 //    					var oNABL = new newnaBookingLevel();
	 //    					if(FNACRMDataConc.length == 0){
	 // 						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	 // 	                            sap.ui.commons.MessageBox.Icon.WARNING,
	 // 	                            "Please Wait...",
	 // 	                            [sap.ui.commons.MessageBox.Action.OK],
	 // 	                            sap.ui.commons.MessageBox.Action.OK);*/
	 //    					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "CBOOK", selectedRadio, "CW AVLB Booked", "");
	 //    					}
	 //    					else{
	 //    					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "CBOOK", selectedRadio, "CW AVLB Booked", "");
	 //    					}
	 //
   // 				}
   // 			}).bindProperty("text", "Cbook",function(cellValue){
   // 				if(cellValue == 0){
   // 					cellValue = '';
   // 				}
   //  		return cellValue;
   // 			}).addStyleClass("wraptext"),
   //  		 resizable:false,
   //  	}).setMenu(oCustomMenu49));

			// CW Net Available

			// oTableFNASummary.addColumn(new sap.ui.table.Column("Nacwa",{
			// 	width: "70px",
		 // label: new sap.ui.commons.Label({text: "CW Net AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 // hAlign: sap.ui.core.HorizontalAlign.End,
		 // template: new sap.ui.commons.TextView("NACWA",{
			//  textAlign : sap.ui.core.TextAlign.End,
			//  visible: true,
		 // }).bindProperty("text", "Nacwa",function(cellValue){
			// 			if(cellValue == 0){
			// 				cellValue = '';
			// 			}
			// 		return cellValue;
			// 		}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 // resizable:false,
			//  //sortProperty: "Conc",
			//  //filterProperty: "Conc",
		 // }).setMenu(oCustomMenu50));

    	// Depot Available

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Avlb",{
    		 width: "70px",

    		 label: new sap.ui.commons.Label({text: "Depot AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 hAlign: sap.ui.core.HorizontalAlign.End,
    		 template: new sap.m.Link("AVLB",{
    			 //enabled: '{enabledAvlb}',
    			 styleClass: "lightblue",
    			 textAlign : sap.ui.core.TextAlign.End,
   				 press : function(oEvent) {
   					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");
   			  	  	var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AVLB", selectedRadio, "Available", "");
   					}
   					else{
   	   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AVLB", selectedRadio, "Available", "");
   					}

   				}
   			}).bindProperty("text", "Avlb",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
    		 resizable:false,
    	}).setMenu(oCustomMenu12));

    	// Depot Booked

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Book",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "Depot Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("BOOK",{
			textAlign : sap.ui.core.TextAlign.End,
			//visible: '{enabledBook}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naBookingLevel"
//				  	});
   			        /*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
   			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
   			        oScrollBar.setScrollPosition(0);*/
							globalBookingLeaseRem = "L";
			  	  	app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					if(FNACRMDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "BOOK", selectedRadio, "Booked", "");
   					}
   					else{
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "BOOK", selectedRadio, "Booked", "");
   					}
				}
			}).bindProperty("text", "Book",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
    	}).setMenu(oCustomMenu13));


    	// 	Depot Reservations

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Reser",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "Depot RSRV", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("RESER",{
			textAlign : sap.ui.core.TextAlign.End,
			//visible: '{enabledReser}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naBookingLevel"
//				  	});
   			        /*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
   			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
   			        oScrollBar.setScrollPosition(0);*/
								globalBookingLeaseRem = "L";
			  	  	app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					if(FNACRMDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "RESER", selectedRadio, "Depot Reservations", "");
   					}
   					else{
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "RESER", selectedRadio, "Depot Reservations", "");
   					}
				}
			}).bindProperty("text", "Reser",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu14));


    	oTableFNASummary.addColumn(new sap.ui.table.Column("Nadep",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Depot Net AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView("NADEP",{
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Nadep",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
    	}).setMenu(oCustomMenu15));

    	// Depot Target

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Tdi",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Depot Target", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView("DTAR",{
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Tdi",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
    	}).setMenu(oCustomMenu16));

    	// Depot Open

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Odi",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Depot Shortg/ Surplus", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView("DOPE",{
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Odi",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
    	}).setMenu(oCustomMenu17));

			// Future Production...

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Fpurch",{
    		width: "70px",
    		label: new sap.ui.commons.Label({text: "Future Prod.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
	  		hAlign: sap.ui.core.HorizontalAlign.End,
	  		template: new sap.m.Link("FPURCH",{
				textAlign : sap.ui.core.TextAlign.End,
				//visible: '{enabledFpurch}',
				press : function(oEvent) {
						var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");

						var oNAPO = new newnaPOLevel();
 					  oNAPO.getDataPOLevel(region, country, city, pcate, pclass, matnr, "FPURCH", selectedRadio, "Future Production", "");

				}
			}).bindProperty("text", "Fpurch",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu10));

		 // In Production...

		 oTableFNASummary.addColumn(new sap.ui.table.Column("Fequnr",{
			 width: "70px",
			 label: new sap.ui.commons.Label({text: "In Prod.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
			 hAlign: sap.ui.core.HorizontalAlign.End,
			 template: new sap.m.Link("FEQUNR",{
			 textAlign : sap.ui.core.TextAlign.End,
			 //visible: '{enabledFequnr}',
			 press : function(oEvent) {
				 var region = oEvent.getSource().getBindingContext().getProperty("Region");
					 var country = oEvent.getSource().getBindingContext().getProperty("Country");
					 var city = oEvent.getSource().getBindingContext().getProperty("City");
					 city = city.substr(0,3);
					 var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
					 var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
					 var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
					 var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
						 //app.to("naUnitLevel");

					 var oNAPO = new newnaPOLevel();
					 oNAPO.getDataPOLevel(region, country, city, pcate, pclass, matnr, "FEQUNR", selectedRadio, "In Production", "");
			 }
		 }).bindProperty("text", "Fequnr",function(cellValue){
				 if(cellValue == 0){
					 cellValue = '';
				 }
			 return cellValue;
			 }).addStyleClass("wraptext"),
			resizable:false,
				//sortProperty: "Conc",
				//filterProperty: "Conc",
		}).setMenu(oCustomMenu10));

    	// Available NEW

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Navlb",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "Capex AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("NAVLB",{
			textAlign : sap.ui.core.TextAlign.End,
			//visible: '{enabledNavlb}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");

   					var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NAVLB", selectedRadio, "Capex Available", "");
   					}
   					else{
   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NAVLB", selectedRadio, "Capex Available", "");
   					}
				}
			}).bindProperty("text", "Navlb",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Navlb",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu18));

    // Booked at factory level

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Nbook",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "Capex Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("NBOOK",{
			textAlign : sap.ui.core.TextAlign.End,
			//visible: '{enabledNbook}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naBookingLevel"
//				  	});
   					/*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
   			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
   			        oScrollBar.setScrollPosition(0);*/
								globalBookingLeaseRem = "L";
			  	  	app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					if(FNACRMDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "NBOOK", selectedRadio, "Capex Booked", "");
   					}
   					else{
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "NBOOK", selectedRadio, "Capex Booked", "");
   					}
				}
			}).bindProperty("text", "Nbook",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu19));

    	/* MAC25112016_CAPRES+ */

    	// Capex Reservations

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Nreser",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "Capex RSRV", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("NRESER",{
			textAlign : sap.ui.core.TextAlign.End,
			//visible: '{enabledNreser}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naBookingLevel"
//				  	});
   					/*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
   			        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
   			        oScrollBar.setScrollPosition(0);*/
								globalBookingLeaseRem = "L";
			  	  	app.to("naBookingLevel");
   					var oNABL = new newnaBookingLevel();
   					if(FNACRMDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "NRESER", selectedRadio, "Capex Reservations", "");
   					}
   					else{
   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "NRESER", selectedRadio, "Capex Reservations", "");
   					}
				}
			}).bindProperty("text", "Nreser",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu20));

    	/* MAC25112016_CAPRES- */

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Nanew",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Capex Net AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView("NANEW",{
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Nanew",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
		 }).setMenu(oCustomMenu21));

    	// Capex Target

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Tci",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Capex Target", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView("CTAR",{
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Tci",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
		 }).setMenu(oCustomMenu22));

    	// Capex Open

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Oci",{
    		width: "70px",
		 label: new sap.ui.commons.Label({text: "Capex Shortg/ Surplus", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView("COPE",{
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Oci",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
		 resizable:false,
       //sortProperty: "Conc",
       //filterProperty: "Conc",
		 }).setMenu(oCustomMenu23));


    	oTableFNASummary.addColumn(new sap.ui.table.Column("Nattl",{
    	 width: "70px",
 		 label: new sap.ui.commons.Label({text: "Total Net AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 		 hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.ui.commons.TextView({
			 textAlign : sap.ui.core.TextAlign.End,
			 visible: true,
			 }).bindProperty("text", "Nattl",function(cellValue){
	   				if(cellValue == 0){
	   					cellValue = '';
	   				}
	    		return cellValue;
	   			}).bindProperty("helpId","Conc").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
		 }).setMenu(oCustomMenu24));

    	// Total Stock

    	oTableFNASummary.addColumn(new sap.ui.table.Column("Ttls",{
    		width: "70px",
  		 label: new sap.ui.commons.Label({text: "Total Stock", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("TTLS",{
			textAlign : sap.ui.core.TextAlign.End,
			enabled: '{enabledTtls}',
			visible: true,
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("Region");
   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
   					var city = oEvent.getSource().getBindingContext().getProperty("City");
   					city = city.substr(0,3);
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//			  		var bus = sap.ui.getCore().getEventBus();
//			  	  	bus.publish("nav", "to", {
//			        id : "naUnitLevel"
//				  	});
			  	  	//app.to("naUnitLevel");

   					var oNAUL = new newnaUnitLevel();
   					if(FNAERPDataConc.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "TTLS", selectedRadio, "Total Stock", "");
   					}
   					else{
   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "TTLS", selectedRadio, "Total Stock", "");
   					}
				}
			}).bindProperty("text", "Ttls",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }).setMenu(oCustomMenu25));


		//var fneta = new newfneta();
		//var filterString = fneta.formFilterString(undefined, undefined, undefined);
		//fneta.getFNASummary(filterString);

    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

    	var oPersoServiceFNETA = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFNETA") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {

    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFNETA", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFNETA");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};

    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableFNASummaryTPC = new sap.ui.table.TablePersoController("idTableFNASummaryTPC", {
    			table: oTableFNASummary,
    			persoService: oPersoServiceFNETA,
    			//hasGrouping: true
    		});
    		globalTableFNASummaryTPC = oTableFNASummaryTPC;

    	return oTableFNASummary;
	}

});
