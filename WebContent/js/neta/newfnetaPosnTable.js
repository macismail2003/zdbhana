jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("newfnetaPosnTable", {
	
	createPosnTable: function(){
		
		// Table
    	var oTableFPNASummary = new sap.ui.table.Table("idTableFPNASummary",{
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
							globalTableFPNASummaryTPC.openDialog();
						}
					}),


					new sap.ui.commons.Button({
						text: "Reset",
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoServiceFPNETA.delPersData();
							globalTableFPNASummaryTPC.refresh().done(function() {
								sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});
							
							var outsprocess = sap.ui.getCore().byId("idFPNARadioButtonProcess").getSelectedIndex();
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
							globalTableFPNASummaryTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					})
				],
				rightItems: [						        
						        
					new sap.ui.commons.Label("idFPNATotalPages", {
						text : " ",
						visible : false,
						//width : "150px"
					}).addStyleClass("totalPages"),
							
					new sap.ui.commons.Button({
						text: "Refresh",
						icon: "sap-icon://refresh",
						press: function(oEvent) {
							//var bookingorredel = sap.ui.getCore().byId("idFPNARadioButtonProcess").getSelectedIndex();
				        	//var allorcapex = 0;
				        	var fneta = new newfneta();
				        	//fneta.setPersonalValuesFilter();
				        	//var filterString = fneta.formFilterString(undefined, allorcapex, bookingorredel);
							fneta.getFPNASummary();	
				          }
						}),
					
					new sap.ui.commons.Button({
						//text: "Excel",
						icon: "sap-icon://excel-attachment",
						visible : true,
						press: function(oEvent) {				        	
						  var objUtil = new utility();
			        	  objUtil.makeHTMLTable(jsonInventoryFPNA, "Confirmed EPM","export");
				          }
						})
				]
			})
    	 }).addStyleClass("fontStyle tblBorder");
    	
    	oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Work Order No."
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Work Order No.",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("WorkOrder", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "WorkOrder").addStyleClass("wraptext"),
    		 resizable:false,
            //  sortProperty: "WorkOrder",
    		//  filterProperty: "WorkOrder"
		}));
		
		oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Move Type"
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Move Type",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("MoveType", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "MoveType").addStyleClass("wraptext")
    	}));
    	
    	oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Fleet"
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Fleet",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Fleet", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Fleet").addStyleClass("wraptext"),
    		 resizable:false
		}));
		
    	oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Unit Type"
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Unit Type",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Matnr").addStyleClass("wraptext"),
    		resizable:false
    	}));
		
		oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
			multiLabels: [new sap.ui.commons.Label({
                text: "Quantity"
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
	          new sap.ui.commons.TextField({
	            placeholder: "=2 or <2 or >2",
	            width: "100px",
	            liveChange: function(oEvent) {
	              var aFilters = [];
	              var sQuery = oEvent.getParameter("liveValue");

	              if (sQuery && sQuery.length > 1) {

		              if ((isInArray(sQuery.substr(0,1), ["<", ">", "="])) && !sQuery.match(/[a-zA-Z]/i)) {

		              var filterOperator = "EQ";
		              var isNumberOnly = false;

	            	var symbol = sQuery.substr(0,1);
	            	switch(symbol){
	            		case ">":
	            			filterOperator = sap.ui.model.FilterOperator.GT;
	            			break;
	            		case "<":
	            			filterOperator = sap.ui.model.FilterOperator.LT;
	            			break;
	            		case "=":
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	            			break;
	            		default:
	            			isNumberOnly = true;
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	        				break;
	            	}
	            	if(isNumberOnly == true){
	            		sQuery = parseInt(sQuery);
	            	}else{
	            		sQuery = sQuery.substr(1);
	            		sQuery = parseInt(sQuery);
	            	}
	                var filter = new sap.ui.model.Filter("Qty", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableFPNASummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
              })
        ],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Qty").addStyleClass("wraptext"),
    		resizable:false
    	}));
    	
    	oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "120px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Purpose"
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Purpose",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Purpose", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Purpose").addStyleClass("wraptext"),
    		resizable:false
    	}));
    	
    	oTableFPNASummary.addColumn(new sap.ui.table.Column({
			width: "120px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Origin"
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Origin",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Origin", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Origin").addStyleClass("wraptext"),
    		resizable:false
    	}));
		
		oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "120px",
			multiLabels: [new sap.ui.commons.Label({
				text: "Destination"
		}).addStyleClass("wraptextcol"),
			new sap.ui.commons.TextField({
				placeholder: "Destination",
				width: "90px",
				liveChange: function(oEvent) {
				// add filter for search
				var aFilters = [];
				var sQuery = oEvent.getParameter("liveValue");
				if (sQuery && sQuery.length > 0) {
					var filter = new sap.ui.model.Filter("Destination", sap.ui.model.FilterOperator.Contains, sQuery);
					aFilters.push(filter);
				}
				var binding = oTableFPNASummary.getBinding("rows");
				binding.filter(aFilters, "Application");
				}
			})
			],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Destination").addStyleClass("wraptext"),
    		resizable:false
		}));

		oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "120px",
			multiLabels: [new sap.ui.commons.Label({
                text: "ETA Destination"
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
	          new sap.ui.commons.TextField({
	            placeholder: "=20171231",
	            width: "100px",
	            liveChange: function(oEvent) {
	              var aFilters = [];
	              var sQuery = oEvent.getParameter("liveValue");

	              if (sQuery && sQuery.length > 1) {

		              if ((isInArray(sQuery.substr(0,1), ["<", ">", "="])) && !sQuery.match(/[a-zA-Z]/i)) {

		              var filterOperator = "EQ";
		              var isNumberOnly = false;

	            	var symbol = sQuery.substr(0,1);
	            	switch(symbol){
	            		case ">":
	            			filterOperator = sap.ui.model.FilterOperator.GT;
	            			break;
	            		case "<":
	            			filterOperator = sap.ui.model.FilterOperator.LT;
	            			break;
	            		case "=":
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	            			break;
	            		default:
	            			isNumberOnly = true;
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	        				break;
	            	}
	            	if(isNumberOnly == true){
	            		sQuery = parseInt(sQuery);
	            	}else{
	            		sQuery = sQuery.substr(1);
	            		sQuery = parseInt(sQuery);
	            	}
	                var filter = new sap.ui.model.Filter("sortEtaDest", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableFPNASummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
              })
        ],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "EtaDest").addStyleClass("wraptext"),
    		resizable:false
		}));

		oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "120px",
			 //label: new sap.ui.commons.Label({text: "Est Door-Door Cost per Unit (USD)"}).addStyleClass("wraptextcol"),
			 multiLabels: [new sap.ui.commons.Label({
                text: "Est Door-Door Cost per Unit (USD)"
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
	          new sap.ui.commons.TextField({
	            placeholder: "=1000",
	            width: "100px",
	            liveChange: function(oEvent) {
	              var aFilters = [];
	              var sQuery = oEvent.getParameter("liveValue");

	              if (sQuery && sQuery.length > 1) {

		              if ((isInArray(sQuery.substr(0,1), ["<", ">", "="])) && !sQuery.match(/[a-zA-Z]/i)) {

		              var filterOperator = "EQ";
		              var isNumberOnly = false;

	            	var symbol = sQuery.substr(0,1);
	            	switch(symbol){
	            		case ">":
	            			filterOperator = sap.ui.model.FilterOperator.GT;
	            			break;
	            		case "<":
	            			filterOperator = sap.ui.model.FilterOperator.LT;
	            			break;
	            		case "=":
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	            			break;
	            		default:
	            			isNumberOnly = true;
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	        				break;
	            	}
	            	if(isNumberOnly == true){
	            		sQuery = parseInt(sQuery);
	            	}else{
	            		sQuery = sQuery.substr(1);
	            		sQuery = parseInt(sQuery);
	            	}
	                var filter = new sap.ui.model.Filter("sortEstCost", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableFPNASummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
              })
		],
		
    		 template: new sap.ui.commons.TextView().bindProperty("text", "EstCost").addStyleClass("wraptext"),
    		resizable:false
		}));
		
    	oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "120px",
			 //label: new sap.ui.commons.Label({text: "Est Total Door-Door Cost (USD)"}).addStyleClass("wraptextcol"),
			 multiLabels: [new sap.ui.commons.Label({
                text: "Est Total Door-Door Cost (USD)"
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
	          new sap.ui.commons.TextField({
	            placeholder: "=1000",
	            width: "100px",
	            liveChange: function(oEvent) {
	              var aFilters = [];
	              var sQuery = oEvent.getParameter("liveValue");

	              if (sQuery && sQuery.length > 1) {

		              if ((isInArray(sQuery.substr(0,1), ["<", ">", "="])) && !sQuery.match(/[a-zA-Z]/i)) {

		              var filterOperator = "EQ";
		              var isNumberOnly = false;

	            	var symbol = sQuery.substr(0,1);
	            	switch(symbol){
	            		case ">":
	            			filterOperator = sap.ui.model.FilterOperator.GT;
	            			break;
	            		case "<":
	            			filterOperator = sap.ui.model.FilterOperator.LT;
	            			break;
	            		case "=":
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	            			break;
	            		default:
	            			isNumberOnly = true;
	            			filterOperator = sap.ui.model.FilterOperator.EQ;
	        				break;
	            	}
	            	if(isNumberOnly == true){
	            		sQuery = parseInt(sQuery);
	            	}else{
	            		sQuery = sQuery.substr(1);
	            		sQuery = parseInt(sQuery);
	            	}
	                var filter = new sap.ui.model.Filter("sortEstTotCost", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableFPNASummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
              })
		],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "EstTotCost").addStyleClass("wraptext"),
    		resizable:false
		}));

		oTableFPNASummary.addColumn(new sap.ui.table.Column({
    		width: "220px",
    		 label: new sap.ui.commons.Label({text: "Remarks"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Remarks").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "Remarks",
    		 filterProperty: "Remarks"
		}));
    	
    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};
		
    	var oPersoServiceFPNETA = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFPNETA") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {
    			
    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFPNETA", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFPNETA");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};
    		
    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableFPNASummaryTPC = new sap.ui.table.TablePersoController("idTableFPNASummaryTPC", {
    			table: oTableFPNASummary,
    			persoService: oPersoServiceFPNETA,
    			//hasGrouping: true
    		});
    		globalTableFPNASummaryTPC = oTableFPNASummaryTPC;
    		
    	return oTableFPNASummary;
	}

});
