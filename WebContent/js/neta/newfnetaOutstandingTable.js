var FNAPICKDataReqDet = [];

jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("newfnetaOutstandingTable", {
	
	createOutstandingTable: function(){
		
		// Table
    	var oTableFONASummary = new sap.ui.table.Table("idTableFONASummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None, 
            width:"99%",
            fixedColumnCount: 1,
            showNoData: true,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
            enableColumnReordering: false,
   		 	//visibleRowCount: 200,
   		 	//fixedRowCount: 1,
   		 	filter : [ function(oEvent) {
   		 		//oCurrent.setVisibility(oEvent);
			}, this ],
			toolbar: new sap.ui.commons.Toolbar({
				items: [
					
					new sap.ui.commons.Button({
						icon: "sap-icon://action-settings",
						visible : true,
						press : function(oEvent){
							globalTableFONASummaryTPC.openDialog();
						}
					}),


					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoServiceFONETA.delPersData();
							globalTableFONASummaryTPC.refresh().done(function() {
								sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
							
							var outsprocess = sap.ui.getCore().byId("idFONARadioButtonProcess").getSelectedIndex();
							if(outsprocess == 0){ // Redelivery 
								sap.ui.getCore().byId("TotQty").setVisible(false);
								sap.ui.getCore().byId("PickedQty").setVisible(false);
								sap.ui.getCore().byId("OutstandQty").setVisible(false);
								sap.ui.getCore().byId("Sgrade").setVisible(false);
								sap.ui.getCore().byId("Equipment").setVisible(true);
								sap.ui.getCore().byId("Sapstatus").setVisible(true);
								sap.ui.getCore().byId("idReleasetypeCombo").setVisible(false);
							}else if(outsprocess == 1){
								sap.ui.getCore().byId("TotQty").setVisible(true);
								sap.ui.getCore().byId("PickedQty").setVisible(true);
								sap.ui.getCore().byId("OutstandQty").setVisible(true);
								sap.ui.getCore().byId("Sgrade").setVisible(true);
								sap.ui.getCore().byId("Equipment").setVisible(false);
								sap.ui.getCore().byId("Sapstatus").setVisible(false);
								sap.ui.getCore().byId("idReleasetypeCombo").setVisible(true);
							}
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						visible:false,
						icon: "sap-icon://save",
						press: function(oEvent) {
							globalTableFONASummaryTPC.savePersonalizations().done(function() {
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
					
					new sap.ui.commons.RadioButtonGroup("idFONARadioButtonCapex",{
				        columns : 3,
				        selectedIndex : 0,
				        select : function(oEvent) {
				        	var allorcapex = oEvent.getSource().getSelectedIndex();
				        	var bookingorredel = sap.ui.getCore().byId("idFONARadioButtonProcess").getSelectedIndex();
				        	
				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, bookingorredel);
							fneta.getFONASummary(filterString);
							
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
					
					new sap.ui.commons.RadioButtonGroup("idFONARadioButtonProcess",{
				        columns : 2,
				        selectedIndex : 0,
				        select : function(oEvent) {
				        	
							/* Get Visible Row Count */
			            	var visiblerowcount = sap.ui.getCore().byId("idTableFONASummary").getVisibleRowCount();
			            	if(visiblerowcount){
			            		visiblerowcount = parseInt(visiblerowcount);
			            	}else{
			            		visiblerowcount = 20;
			            	}
			            	window.localStorage.setItem("memTotalRowsField", visiblerowcount);
			            	
				        	var bookingorredel = oEvent.getSource().getSelectedIndex();
				        	var allorcapex = sap.ui.getCore().byId("idFONARadioButtonCapex").getSelectedIndex();
				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, bookingorredel);
							fneta.getFONASummary(filterString);	
							
							if(bookingorredel == 0){
								sap.ui.getCore().byId("IdColLabelReleaseAuth").setText("Redelivery Ref.");
							}else{
								sap.ui.getCore().byId("IdColLabelReleaseAuth").setText("Release Ref.");
							}
				        }
				    }).addStyleClass("radioBookRedel").addItem(new sap.ui.core.Item({
				        text : "Redelivery", key : "REDEL"})).addItem(new sap.ui.core.Item({
					        text : "Booking", key : "BOOK"})),
						        
						        
					new sap.ui.commons.Label("idFONATotalPages", {
						text : " ",
						visible : false,
						//width : "150px"
					}).addStyleClass("totalPages"),
							
					new sap.ui.commons.Button({
						text: "Refresh",
						icon: "sap-icon://refresh",
						press: function(oEvent) {
							var bookingorredel = sap.ui.getCore().byId("idFONARadioButtonProcess").getSelectedIndex();
				        	var allorcapex = sap.ui.getCore().byId("idFONARadioButtonCapex").getSelectedIndex();
				        	var fneta = new newfneta();
				        	fneta.setPersonalValuesFilter();
				        	var filterString = fneta.formFilterString(undefined, allorcapex, bookingorredel);
							fneta.getFONASummary(filterString);	
				          }
						}),
					
					new sap.ui.commons.Button({
						//text: "Excel",
						icon: "sap-icon://excel-attachment",
						visible : false,
						press: function(oEvent) {
							var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
				        	if(selectedRadio == "Country Level"){
				        		jsonInventoryFONA = jsonInventoryFONACou;
				        	}
				        	else if(selectedRadio == "City Level"){
				        		//this.alterPageOneCityLevel();
				        	}
				        	else if(selectedRadio == "Region Level"){
				        		jsonInventoryFONA = jsonInventoryFONAReg;
				        	}
				        	
						  var objUtil = new utility();
			        	  objUtil.makeHTMLTable(jsonInventoryFONA, "Net A Report","export");
				          }
						}),
						
						new sap.ui.commons.Button("idFONAToolbarOptions",{
							text: "Options",
							visible : false,
							icon: "sap-icon://arrow-down",
							press: function(oEvent){
								

								if(sap.ui.getCore().byId("idFONATotalRowsWith") != undefined)
				                	 sap.ui.getCore().byId("idFONATotalRowsWith").destroy();
				                 
								if(sap.ui.getCore().byId("idFONARadioButtonPage") != undefined)
				                	 sap.ui.getCore().byId("idFONARadioButtonPage").destroy();
								
								if(sap.ui.getCore().byId("idFONATotalRowsField") != undefined)
				                	 sap.ui.getCore().byId("idFONATotalRowsField").destroy();
								
								if(sap.ui.getCore().byId("idFONATotalRows") != undefined)
				                	 sap.ui.getCore().byId("idFONATotalRows").destroy();
								
								if(sap.ui.getCore().byId("idFONAFNETAOptionsPopup") != undefined)
				                	 sap.ui.getCore().byId("idFONAFNETAOptionsPopup").destroy();
								
								
								var oTotalRows = new sap.ui.commons.Label("idFONATotalRows", {
									text : "Max. Rows per Page : ",
									visible : false,
									//width : "150px"
								}).addStyleClass("personalValuesPopupText"); 
								
								var lblSpaceTotalRows = new sap.ui.commons.Label( {text: " ",width : '20px'});
								
								var oTotalRowsField = new sap.m.Input("idFONATotalRowsField", {
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
									sap.ui.getCore().byId("idFONATotalRowsField").setValue(50);
								}else{
									sap.ui.getCore().byId("idFONATotalRowsField").setValue(valueTotalRowsField);
								}
								
								
								var lblSpaceTotalRowsBetween = new sap.ui.commons.Label( {text: " ",width : '20px'});
								
								var oTotalRowsWith = new sap.ui.commons.Label("idFONATotalRowsWith", {
									text : "with ",
									visible : false,
									//width : "150px"
								}).addStyleClass("personalValuesPopupText"); 
								
								var lblSpaceTotalRowsWith = new sap.ui.commons.Label( {text: " ",width : '20px'});
								
								var oRadioButtonPage = new sap.ui.commons.RadioButtonGroup({
									id : "idFONARadioButtonPage", // sap.ui.core.ID
									visible : true, // boolean
									columns : 2, // int
									editable : true, // boolean
									selectedIndex : 0, // int
									dependents : [], // sap.ui.core.Control, since 1.19
									items : [ new sap.ui.core.Item({
										id : "idFONAPaginator", // sap.ui.core.ID
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
										id : "idFONAScrollbar", // sap.ui.core.ID
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
											sap.ui.getCore().byId("idTableFONASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
											window.localStorage.setItem("memPaginator", true);
											var fneta = new newfneta();
								        	fneta.setPersonalValues();							  	    		
										}
										else if(selected == 1){
											sap.ui.getCore().byId("idTableFONASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
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
									sap.ui.getCore().byId("idFONARadioButtonPage").setSelectedIndex(0);
								}else{
									sap.ui.getCore().byId("idFONARadioButtonPage").setSelectedIndex(1);
								}
								
								var lblSpaceTotalEndWith = new sap.ui.commons.Label( {text: " ",width : '250px'});
								
								var lblSpaceTotalBeforeSales = new sap.ui.commons.Label( {text: " ",width : '250px'});
								
								var totalPages = (Math.ceil(FNASummaryArray.length/50));
				  	    		totalPages = "Pages : " + totalPages;
				  	    		sap.ui.getCore().byId("idFONATotalPages").setText(totalPages);
				  	    		
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
								
								 var oFNETAOptionsPopup = new sap.m.Popover("idFONAFNETAOptionsPopup",{
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
				                                                                        	   sap.ui.getCore().byId("idFONAFNETAOptionsPopup").close();
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
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("ReleaseAuth",{
    		width: "100px",
    		 label: new sap.ui.commons.Label("IdColLabelReleaseAuth", {text: "Release Ref."}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseAuth").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "ReleaseAuth",
    		 filterProperty: "ReleaseAuth",
    	}));
    	    	
    	
    	/*oTableFONASummary.addColumn(new sap.ui.table.Column("ReleaseType",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Order Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseType").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "ReleaseType",
    		filterProperty: "ReleaseType",
    	}));*/
    	
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("MatnrO",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "MatnrO").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "MatnrO",
    		filterProperty: "MatnrO",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("UnitDescO",{
    		width: "200px",
    		 label: new sap.ui.commons.Label({text: "Unit Type Desc"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitDescO").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "UnitDescO",
    		filterProperty: "UnitDescO",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Depot",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Depot").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Depot",
    		filterProperty: "Depot",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Depotname",{
    		width: "200px",
    		 label: new sap.ui.commons.Label({text: "Depot Name"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Depotname").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Depotname",
    		filterProperty: "Depotname",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("TotQty",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Total Qty"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "TotQty").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "IntTotQty",
    		filterProperty: "TotQty",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("PickedQty",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Picked Qty"}).addStyleClass("wraptextcol"),
    		 //template: new sap.ui.commons.TextView().bindProperty("text", "PickedQty").addStyleClass("wraptext"),
				template: new sap.m.Link({
	    			enabled: "{enabledPick}",
	    			textAlign : sap.ui.core.TextAlign.End,
	   				press : function(oEvent) {
	   					var release = oEvent.getSource().getBindingContext().getProperty("ReleaseAuth");
	   					var type = oEvent.getSource().getBindingContext().getProperty("ReleaseType");
	   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
	   					var matnr = oEvent.getSource().getBindingContext().getProperty("MatnrO");
	   			  		/*var bus = sap.ui.getCore().getEventBus();
	   			  	  	bus.publish("nav", "to", {
	   			        id : "naPickLevel"
	   				  	});*/
	   			  	  	
	   					var onewfnetaOutstandingTable = new newfnetaOutstandingTable();
	   					onewfnetaOutstandingTable.getDataPickEquipments(release, type, depot, matnr);	
	   				}
	   			}).bindProperty("text", "PickedQty").addStyleClass("wraptext"),
	         resizable:false,
	         sortProperty: "IntPickedQty",
	    	 filterProperty: "PickedQty",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("OutstandQty",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Remain. Qty"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQty").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "IntOutstandQty",
    		filterProperty: "OutstandQty",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("ZRegDescO",{
    		width: "130px",
   		 label: new sap.ui.commons.Label({text: "Region"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Mregion").bindProperty("visible", "isNormal").addStyleClass("wraptext"),
   		resizable:false,
        sortProperty: "Mregion",
		filterProperty: "Mregion",
 		 }));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("ZCouDescO",{
    		width: "130px",
   		 label: new sap.ui.commons.Label({text: "Country"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCouDescO").bindProperty("visible", "isNormal").addStyleClass("wraptext"),
   		resizable:false,
        sortProperty: "ZCouDescO",
		filterProperty: "ZCouDescO",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("ZCityDescO",{
    		width: "130px",
   		 label: new sap.ui.commons.Label({text: "City"}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCityDescO").bindProperty("visible", "isNormal").addStyleClass("wraptext"),
   		resizable:false,
        sortProperty: "ZCityDescO",
		filterProperty: "ZCityDescO",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("PcateO",{
			 width: "80px",
    		 label: new sap.ui.commons.Label({text: "Category"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "PcateO").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "PcateO",
    		filterProperty: "PcateO",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("PclassO",{
			 width: "80px",
   		 label: new sap.ui.commons.Label({text: "Sub Category"}).addStyleClass("wraptextcol"),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "PclassO").addStyleClass("wraptext"),
   		resizable:false,
        sortProperty: "PclassO",
		filterProperty: "PclassO",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Status",{
    		width: "180px",
    		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Status").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Status",
    		filterProperty: "Status",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Customer",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Customer").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Customer",
    		filterProperty: "Customer",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Customername",{
    		width: "200px",
    		 label: new sap.ui.commons.Label({text: "Customer Name."}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Customername").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Customername",
    		filterProperty: "Customername",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("LeaseNo",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Lease No."}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "LeaseNo",
    		filterProperty: "LeaseNo",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("LeaseType",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Lease Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "LeaseType").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "LeaseType",
    		filterProperty: "LeaseType",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("StartDate",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Start Date"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "StartDate").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "DateStartDate",
    		filterProperty: "StartDate",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("ExpiryDate",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Expiry Date"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "DateExpiryDate",
    		filterProperty: "ExpiryDate",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Creator",{
    		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Creator"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Creator").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Creator",
    		filterProperty: "Creator",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("ExtRef",{
    		width: "150px",
    		 label: new sap.ui.commons.Label({text: "External Ref"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ExtRef").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "ExtRef",
    		filterProperty: "ExtRef",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Comments",{
    		width: "150px",
    		 label: new sap.ui.commons.Label({text: "Comments"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Comments").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Comments",
    		filterProperty: "Comments",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Equipment",{
    		width: "150px",
    		 label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Equipment").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Equipment",
    		filterProperty: "Equipment",
    	})); 
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Sapstatus",{
    		width: "150px",
    		 label: new sap.ui.commons.Label({text: "SAP Status"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Sapstatus").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Sapstatus",
    		filterProperty: "Sapstatus",
    	}));
    	
    	oTableFONASummary.addColumn(new sap.ui.table.Column("Sgrade",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Grade"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Grade").addStyleClass("wraptext"),
    		resizable:false,
            sortProperty: "Grade",
    		filterProperty: "Grade",
    	}));
    	
    	
    	
    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};
		
    	var oPersoServiceFONETA = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFONETA") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {
    			
    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFONETA", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFONETA");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};
    		
    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableFONASummaryTPC = new sap.ui.table.TablePersoController("idTableFONASummaryTPC", {
    			table: oTableFONASummary,
    			persoService: oPersoServiceFONETA,
    			//hasGrouping: true
    		});
    		globalTableFONASummaryTPC = oTableFONASummaryTPC;
    		
    	return oTableFONASummary;
	},
	
	getDataPickEquipments : function(release, type, depot, matnr){
		
		var fnetaLinkPICKEqui = fnetaLinkPICK + "?$filter=ReleaseAuth eq '" + release + 
		"' and ReleaseType eq '" + type + 
		"' and Indepot eq '" + depot + 
		"' and Inmatnr eq '" + matnr + 
		"'";
		
		busyDialog.open();
		OData.request({ 
		      requestUri: fnetaLinkPICKEqui,
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
				sap.ui.commons.MessageBox.alert("No data!");
			}else{
				var Ohdatesort = "";
				var Ohdate = "";
				FNAPICKDataReqDet = [];
				jsonInventorynaPickLevel = [];
				for(var j=0;j<data.results.length;j++){
					if(data.results[j].Equipment != ""){
					Ohdatesort = "";	
					Ohdate = "";
					if(data.results[j].Onhiredat != null){
						Ohdate = data.results[j].Onhiredat.split("(");
						Ohdate = Ohdate[1].split(")");
						Ohdate = dateFormat(new Date(Number(Ohdate[0])), 'dd-mm-yyyy',"UTC");
						Ohdatesort = dateFormat(new Date(Number(Ohdate[0])), 'yyyymmdd',"UTC");
					}
						
					FNAPICKDataReqDet.push({
						"Equipment" : data.results[j].Equipment,
						"Ohdate" : Ohdate,
						"Ohdatesort" : Ohdatesort,
						"UnitType" : data.results[j].UnitType,
						"LeaseNo" : data.results[j].LeaseNo,
						"ReleaseAuth" : data.results[j].ReleaseAuth,
						"UnitDesc" : data.results[j].UnitDesc
					})	;
					
					jsonInventorynaPickLevel.push({
						"Equipment" : data.results[j].Equipment,
						"On Hire Date" : Ohdate,
						"Unit Type" : data.results[j].UnitType,
						"Lease No" : data.results[j].LeaseNo,
						"Booking Ref" : data.results[j].ReleaseAuth,
						"Unit Description" : data.results[j].UnitDesc
					});
					}
				}

				requestedSel = "Booking Ref : " + FNAPICKDataReqDet[0].ReleaseAuth;
				requestedSel = requestedSel + " || " + " Lease No. : " + FNAPICKDataReqDet[0].LeaseNo;
				sap.ui.getCore().byId("naPICKLevel").setTitle(requestedSel); 
				
				var oModelEDIPLASummary = new sap.ui.model.json.JSONModel();
				oModelEDIPLASummary.setData({modelData: FNAPICKDataReqDet});
		    	sap.ui.getCore().byId("idTableNAPLSummary").setModel(oModelEDIPLASummary);
		    	sap.ui.getCore().byId("idTableNAPLSummary").bindRows("/modelData");
		    	
		        if (FNAPICKDataReqDet.length < 25){
		        	sap.ui.getCore().byId("idTableNAPLSummary").setVisibleRowCount(FNAPICKDataReqDet.length);
		        	sap.ui.getCore().byId("idTableNAPLSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        }
		    	else{
		    		sap.ui.getCore().byId("idTableNAPLSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		    		sap.ui.getCore().byId("idTableNAPLSummary").setVisibleRowCount(25);
		    	}
		        /*var oTable = sap.ui.getCore().byId("idTableFONASummary");          //Get Hold of table
		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
		        oScrollBar.setScrollPosition(0);*/
		        app.to("naPICKLevel");  
		        busyDialog.close();
		        
			}
		    },
		    function(err){
		    	 sap.ui.commons.MessageBox.alert("No data!");
		    	 busyDialog.close();
		    });
	}

});
