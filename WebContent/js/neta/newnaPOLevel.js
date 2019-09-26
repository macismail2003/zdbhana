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

var FNAPOSummaryArrayReq = [];
var FNAPODataReq = [];
var jsonInventorynaPOLevel = [];
var NAPOERPData = [];
var NAPOSummaryUnitLevel = [];
var oModelEDINAPOSummary;
var FNAPOSummaryEQUNR = [];

sap.ui.model.json.JSONModel.extend("newnaPOLevel", {

	createnaPOLevel: function(){

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

			// Table
    	var oTableNAPOSummary = new sap.ui.table.Table("idTableNAPOSummary",{
            //columnHeaderHeight: 45,
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
			        	objUtil.makeHTMLTable(jsonInventorynaPOLevel, "Future/In Production Details","export");
				    }
						}),
						]
			})
    	 }).addStyleClass("fontStyle xmarginTop15 tblBorder");

    	var printPersoData = function(sJSON) {
			//jQuery("#perso-data").html(sJSON
    		//console.log(sJSON);
			/*	.replace(/\n/g, "<br>")
				.replace(/\s/g, "&nbsp;")
				.replace(/(true)/g, "<span style=\"color:green\">$1</span>")
				.replace(/(false)/g, "<span style=\"color:red\">$1</span>"));*/
		};

    	var oPersoServiceFNETANAPO = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFNETANAPO") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {

    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFNETANAPO", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFNETANAPO");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};

    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableNAPOSummaryTPC = new sap.ui.table.TablePersoController("idTableNAPOSummaryTPC", {
    			table: oTableNAPOSummary,
    			persoService: oPersoServiceFNETANAPO,
    			//hasGrouping: true
    		});
    		globalTableNAPOSummaryTPC = oTableNAPOSummaryTPC;

    	// Table Columns

    	/*oTableNAPOSummary.addColumn(new sap.ui.table.Column({
			 width: "100px",
      		 //label: new sap.ui.commons.Label({text: "Equipment"}),
      		 template: new sap.ui.commons.Link({
      			 press : function(oEvent){
      				//globalEquipmentType
      				var onewnaSPECLevel = new newnaSPECLevel();
      				onewnaSPECLevel.getFullSpec(globalEquipmentType, this.getText());
      			 }
      		 }).bindProperty("text", "Equnr"),
	      		multiLabels: [new sap.ui.commons.Label({
	                text: "Serial No."
	              }).addStyleClass("wraptextcol"),
              new sap.ui.commons.TextField({
                placeholder: "Serial No.",
                width: "90px",
                liveChange: function(oEvent) {
                  // add filter for search
                  var aFilters = [];
                  var sQuery = oEvent.getParameter("liveValue");
                  if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Equnr", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                  }
                  var binding = oTableNAPOSummary.getBinding("rows");
                  binding.filter(aFilters, "Application");
                }
              })
            ],
    		 resizable:true,
//             sortProperty: "Equipment",
//             filterProperty: "Equipment",
}));*/

    	oTableNAPOSummary.addColumn(new sap.ui.table.Column({
			 width: "120px",
      		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Purchase Order"
	              }).addStyleClass("wraptextcol"),
           new sap.ui.commons.TextField({
             placeholder: "Purchase Order",
             width: "90px",
             liveChange: function(oEvent) {
               // add filter for search
               var aFilters = [];
               var sQuery = oEvent.getParameter("liveValue");
               if (sQuery && sQuery.length > 0) {
                 var filter = new sap.ui.model.Filter("Purch", sap.ui.model.FilterOperator.Contains, sQuery);
                 aFilters.push(filter);
               }
               var binding = oTableNAPOSummary.getBinding("rows");
               binding.filter(aFilters, "Application");
             }
           })
         ],
      		 template: new sap.ui.commons.TextView().bindProperty("text", "Purch"),
    		 resizable:true,
             //sortProperty: "Country",
             //filterProperty: "Country",
    		 }));

				 oTableNAPOSummary.addColumn(new sap.ui.table.Column({
					visible : false,
				  width: "90px",
				 		//label: new sap.ui.commons.Label({text: "SAP Status"}),
				  multiLabels: [new sap.ui.commons.Label({
				 					 text: "Item"
				 				 }).addStyleClass("wraptextcol"),
				 		new sap.ui.commons.TextField({
				 			placeholder: "Item",
				 			width: "70px",
				 			liveChange: function(oEvent) {
				 				// add filter for search
				 				var aFilters = [];
				 				var sQuery = oEvent.getParameter("liveValue");
				 				if (sQuery && sQuery.length > 0) {
				 					var filter = new sap.ui.model.Filter("Item", sap.ui.model.FilterOperator.Contains, sQuery);
				 					aFilters.push(filter);
				 				}
				 				var binding = oTableNAPOSummary.getBinding("rows");
				 				binding.filter(aFilters, "Application");
				 			}
				 		})
				 	],
				 		template: new sap.ui.commons.TextView().bindProperty("text", "Item"),
				 		resizable:true,
				 			//sortProperty: "Country",
				 			//filterProperty: "Country",
				 	}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column({
					width: "80px",
						//label: new sap.ui.commons.Label({text: "SAP Status"}),
					multiLabels: [new sap.ui.commons.Label({
									 text: "Item"
								 }).addStyleClass("wraptextcol"),
						new sap.ui.commons.TextField({
							placeholder: "Item",
							width: "60px",
							liveChange: function(oEvent) {
								// add filter for search
								var aFilters = [];
								var sQuery = oEvent.getParameter("liveValue");
								if (sQuery && sQuery.length > 0) {
									var filter = new sap.ui.model.Filter("Item", sap.ui.model.FilterOperator.Contains, sQuery);
									aFilters.push(filter);
								}
								var binding = oTableNAPOSummary.getBinding("rows");
								binding.filter(aFilters, "Application");
							}
						})
					],
						template: new sap.ui.commons.TextView().bindProperty("text", "Item"),
						resizable:true,
							//sortProperty: "Country",
							//filterProperty: "Country",
					}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column({
					width: "80px",
						//label: new sap.ui.commons.Label({text: "SAP Status"}),
					multiLabels: [new sap.ui.commons.Label({
									 text: "Factory Code"
								 }).addStyleClass("wraptextcol"),
						new sap.ui.commons.TextField({
							placeholder: "Factory Code",
							width: "60px",
							liveChange: function(oEvent) {
								// add filter for search
								var aFilters = [];
								var sQuery = oEvent.getParameter("liveValue");
								if (sQuery && sQuery.length > 0) {
									var filter = new sap.ui.model.Filter("Lgort", sap.ui.model.FilterOperator.Contains, sQuery);
									aFilters.push(filter);
								}
								var binding = oTableNAPOSummary.getBinding("rows");
								binding.filter(aFilters, "Application");
							}
						})
					],
						template: new sap.ui.commons.TextView().bindProperty("text", "Lgort"),
						resizable:true,
							//sortProperty: "Country",
							//filterProperty: "Country",
					}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column({
					width: "240px",
						//label: new sap.ui.commons.Label({text: "SAP Status"}),
					multiLabels: [new sap.ui.commons.Label({
									 text: "Factory Name"
								 }).addStyleClass("wraptextcol"),
						new sap.ui.commons.TextField({
							placeholder: "Factory Name",
							width: "220px",
							liveChange: function(oEvent) {
								// add filter for search
								var aFilters = [];
								var sQuery = oEvent.getParameter("liveValue");
								if (sQuery && sQuery.length > 0) {
									var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
									aFilters.push(filter);
								}
								var binding = oTableNAPOSummary.getBinding("rows");
								binding.filter(aFilters, "Application");
							}
						})
					],
						template: new sap.ui.commons.TextView().bindProperty("text", "Name"),
						resizable:true,
							//sortProperty: "Country",
							//filterProperty: "Country",
					}));

				 	oTableNAPOSummary.addColumn(new sap.ui.table.Column({
				  width: "120px",
				 		//label: new sap.ui.commons.Label({text: "SAP Status"}),
				  multiLabels: [new sap.ui.commons.Label({
				 					 text: "Unit Type"
				 				 }).addStyleClass("wraptextcol"),
				 		new sap.ui.commons.TextField({
				 			placeholder: "Unit Type",
				 			width: "100px",
				 			liveChange: function(oEvent) {
				 				// add filter for search
				 				var aFilters = [];
				 				var sQuery = oEvent.getParameter("liveValue");
				 				if (sQuery && sQuery.length > 0) {
				 					var filter = new sap.ui.model.Filter("UnitType", sap.ui.model.FilterOperator.Contains, sQuery);
				 					aFilters.push(filter);
				 				}
				 				var binding = oTableNAPOSummary.getBinding("rows");
				 				binding.filter(aFilters, "Application");
				 			}
				 		})
				 	],
				 		template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
				 		resizable:true,
				 			//sortProperty: "Country",
				 			//filterProperty: "Country",
				 	}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column({
 		 		 width: "100px",
 		  		 //label: new sap.ui.commons.Label({text: "Last Gate In"}),
 		 		 multiLabels: [new sap.ui.commons.Label({
 		 	            text: "Created Date"
 		 	          }).addStyleClass("wraptextcol"),
 		 	          new sap.m.HBox({
 		 	        	  items : [
 		 	          new sap.ui.commons.TextField({
 		 	            placeholder: "=20171231",
 		 	            width: "80px",
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
 		 	                var filter = new sap.ui.model.Filter("DocDatefil", filterOperator, sQuery);
 		 	                aFilters.push(filter);
 		 	              }
 		 	              }
 		 	              var binding = oTableNAPOSummary.getBinding("rows");
 		 	              binding.filter(aFilters, "Application");
 		 	            }
 		 	          })
 		 	          ]
 		 	          })
 		 	   		],
 		  		 template: new sap.ui.commons.TextView().bindProperty("text", "DocDate").addStyleClass("wraptext"),
 		 		 resizable:true,
 		         //sortProperty: "Country",
 		         //filterProperty: "Country",
 		 		 }));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryEQUNR",{
					width: "120px",
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
								var binding = oTableNAPOSummary.getBinding("rows");
								binding.filter(aFilters, "Application");
							}
						})
					],
						template: new sap.ui.commons.TextView().bindProperty("text", "Equnr"),
						resizable:true,
							//sortProperty: "Country",
							//filterProperty: "Country",
					}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryNETPR",{
						width: "100px",
						 //label: new sap.ui.commons.Label({text: "Age(Years)"}),
						multiLabels: [new sap.ui.commons.Label({
										text: "Net Price"
									}).addStyleClass("wraptextcol"),
									new sap.m.HBox({
										items : [
								new sap.ui.commons.TextField({
									placeholder: "=2 or <2 or >2",
									width: "90px",
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
											var filter = new sap.ui.model.Filter("Netpr", filterOperator, sQuery);
											aFilters.push(filter);
										}
										}
										var binding = oTableNAPOSummary.getBinding("rows");
										binding.filter(aFilters, "Application");
									}
								})
								]
									})
						],
						 template: new sap.ui.commons.TextView().bindProperty("text", "formattedNetpr").addStyleClass("wraptext"),
					 resizable:true,
								//sortProperty: "Country",
								//filterProperty: "Country",
					 }));

					 oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryNETWR",{
					 	width: "100px",
					 	 //label: new sap.ui.commons.Label({text: "Age(Years)"}),
					 	multiLabels: [new sap.ui.commons.Label({
					 					text: "Total Price"
					 				}).addStyleClass("wraptextcol"),
					 				new sap.m.HBox({
					 					items : [
					 			new sap.ui.commons.TextField({
					 				placeholder: "=2 or <2 or >2",
					 				width: "90px",
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
					 						var filter = new sap.ui.model.Filter("Netwr", filterOperator, sQuery);
					 						aFilters.push(filter);
					 					}
					 					}
					 					var binding = oTableNAPOSummary.getBinding("rows");
					 					binding.filter(aFilters, "Application");
					 				}
					 			})
					 			]
					 				})
					 	],
					 	 template: new sap.ui.commons.TextView().bindProperty("text", "formattedNetwr").addStyleClass("wraptext"),
					  resizable:true,
					 			//sortProperty: "Country",
					 			//filterProperty: "Country",
					  }));

						oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryCURR",{
						width: "100px",
							//label: new sap.ui.commons.Label({text: "SAP Status"}),
							multiLabels: [new sap.ui.commons.Label({
										 text: "Curr."
							}).addStyleClass("wraptextcol"),
							new sap.ui.commons.TextField({
								placeholder: "Curr.",
								width: "100px",
								liveChange: function(oEvent) {
									// add filter for search
									var aFilters = [];
									var sQuery = oEvent.getParameter("liveValue");
									if (sQuery && sQuery.length > 0) {
										var filter = new sap.ui.model.Filter("Curr", sap.ui.model.FilterOperator.Contains, sQuery);
										aFilters.push(filter);
									}
									var binding = oTableNAPOSummary.getBinding("rows");
									binding.filter(aFilters, "Application");
								}
							})
						],
							template: new sap.ui.commons.TextView().bindProperty("text", "Curr"),
							resizable:true,
								//sortProperty: "Country",
								//filterProperty: "Country",
						}));

    	oTableNAPOSummary.addColumn(new sap.ui.table.Column({
			 width: "100px",
     		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 		multiLabels: [new sap.ui.commons.Label({
	                text: "Comp. Code"
	        }).addStyleClass("wraptextcol"),
          new sap.ui.commons.TextField({
            placeholder: "Comp. Code",
            width: "90px",
            liveChange: function(oEvent) {
              // add filter for search
              var aFilters = [];
              var sQuery = oEvent.getParameter("liveValue");
              if (sQuery && sQuery.length > 0) {
                var filter = new sap.ui.model.Filter("CompCode", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);
              }
              var binding = oTableNAPOSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
        ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "CompCode"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));

			 oTableNAPOSummary.addColumn(new sap.ui.table.Column({
 			 width: "120px",
      		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
 			 multiLabels: [new sap.ui.commons.Label({
 	                text: "Created By"
 	              }).addStyleClass("wraptextcol"),
           new sap.ui.commons.TextField({
             placeholder: "Created By",
             width: "100px",
             liveChange: function(oEvent) {
               // add filter for search
               var aFilters = [];
               var sQuery = oEvent.getParameter("liveValue");
               if (sQuery && sQuery.length > 0) {
                 var filter = new sap.ui.model.Filter("CreatedBy", sap.ui.model.FilterOperator.Contains, sQuery);
                 aFilters.push(filter);
               }
               var binding = oTableNAPOSummary.getBinding("rows");
               binding.filter(aFilters, "Application");
             }
           })
         ],
      		 template: new sap.ui.commons.TextView().bindProperty("text", "CreatedBy"),
    		 	 resizable:true,
             //sortProperty: "Country",
             //filterProperty: "Country",
    		 }));


				 oTableNAPOSummary.addColumn(new sap.ui.table.Column({
	 			width: "120px",
	 					//label: new sap.ui.commons.Label({text: "SAP Status"}),
	 			multiLabels: [new sap.ui.commons.Label({
	 								 text: "Vendor"
	 							 }).addStyleClass("wraptextcol"),
	 					new sap.ui.commons.TextField({
	 						placeholder: "Vendor",
	 						width: "100px",
	 						liveChange: function(oEvent) {
	 							// add filter for search
	 							var aFilters = [];
	 							var sQuery = oEvent.getParameter("liveValue");
	 							if (sQuery && sQuery.length > 0) {
	 								var filter = new sap.ui.model.Filter("Vendor", sap.ui.model.FilterOperator.Contains, sQuery);
	 								aFilters.push(filter);
	 							}
	 							var binding = oTableNAPOSummary.getBinding("rows");
	 							binding.filter(aFilters, "Application");
	 						}
	 					})
	 				],
	 					template: new sap.ui.commons.TextView().bindProperty("text", "Vendor"),
	 					resizable:true,
	 						//sortProperty: "Country",
	 						//filterProperty: "Country",
	 				}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column({
					width: "220px",
						//label: new sap.ui.commons.Label({text: "SAP Status"}),
					multiLabels: [new sap.ui.commons.Label({
									 text: "Unit Type Description"
								 }).addStyleClass("wraptextcol"),
						new sap.ui.commons.TextField({
							placeholder: "Description",
							width: "200px",
							liveChange: function(oEvent) {
								// add filter for search
								var aFilters = [];
								var sQuery = oEvent.getParameter("liveValue");
								if (sQuery && sQuery.length > 0) {
									var filter = new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sQuery);
									aFilters.push(filter);
								}
								var binding = oTableNAPOSummary.getBinding("rows");
								binding.filter(aFilters, "Application");
							}
						})
					],
						template: new sap.ui.commons.TextView().bindProperty("text", "Description"),
						resizable:true,
							//sortProperty: "Country",
							//filterProperty: "Country",
					}));

					oTableNAPOSummary.addColumn(new sap.ui.table.Column({
					width: "150px",
						//label: new sap.ui.commons.Label({text: "SAP Status"}),
					multiLabels: [new sap.ui.commons.Label({
									 text: "Range"
								 }).addStyleClass("wraptextcol"),
						new sap.ui.commons.TextField({
							placeholder: "Range",
							width: "130px",
							liveChange: function(oEvent) {
								// add filter for search
								var aFilters = [];
								var sQuery = oEvent.getParameter("liveValue");
								if (sQuery && sQuery.length > 0) {
									var filter = new sap.ui.model.Filter("Range", sap.ui.model.FilterOperator.Contains, sQuery);
									aFilters.push(filter);
								}
								var binding = oTableNAPOSummary.getBinding("rows");
								binding.filter(aFilters, "Application");
							}
						})
					],
						template: new sap.ui.commons.TextView().bindProperty("text", "Range"),
						resizable:true,
							//sortProperty: "Country",
							//filterProperty: "Country",
					}));

    	oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryTOTQTY",{
    		width: "100px",
     		 //label: new sap.ui.commons.Label({text: "Age(Years)"}),
    		multiLabels: [new sap.ui.commons.Label({
                text: "Total Qty"
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
	          new sap.ui.commons.TextField({
	            placeholder: "=2 or <2 or >2",
	            width: "90px",
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
	                var filter = new sap.ui.model.Filter("TotQty", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableNAPOSummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
              })
        ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "TotQty").addStyleClass("wraptext"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));


			 oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryREMQTY",{
     		width: "100px",
      		 //label: new sap.ui.commons.Label({text: "Age(Years)"}),
     		multiLabels: [new sap.ui.commons.Label({
                 text: "Rem. Qty"
               }).addStyleClass("wraptextcol"),
               new sap.m.HBox({
             	  items : [
 	          new sap.ui.commons.TextField({
 	            placeholder: "=2 or <2 or >2",
 	            width: "90px",
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
 	                var filter = new sap.ui.model.Filter("RemQty", filterOperator, sQuery);
 	                aFilters.push(filter);
 	              }
 	              }
 	              var binding = oTableNAPOSummary.getBinding("rows");
 	              binding.filter(aFilters, "Application");
 	            }
 	          })
 	          ]
               })
         ],
      		 template: new sap.ui.commons.TextView().bindProperty("text", "RemQty").addStyleClass("wraptext"),
    		 resizable:true,
             //sortProperty: "Country",
             //filterProperty: "Country",
    		 }));

				 oTableNAPOSummary.addColumn(new sap.ui.table.Column("idTableNAPOSummaryCRTQTY",{
	     				width: "100px",
	      		 //label: new sap.ui.commons.Label({text: "Age(Years)"}),
	     					multiLabels: [new sap.ui.commons.Label({
	                 text: "Created Qty"
	               }).addStyleClass("wraptextcol"),
	               new sap.m.HBox({
	             	  items : [
						 	          new sap.ui.commons.TextField({
						 	            placeholder: "=2 or <2 or >2",
						 	            width: "90px",
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
						 	                var filter = new sap.ui.model.Filter("CrtQty", filterOperator, sQuery);
						 	                aFilters.push(filter);
						 	              }
						 	              }
						 	              var binding = oTableNAPOSummary.getBinding("rows");
						 	              binding.filter(aFilters, "Application");
						 	            }
						 	          })
	 	          ]
	               })
	         ],
	      		 template: new sap.m.Link({
							  textAlign : sap.ui.core.TextAlign.End,
				 				enabled: '{enabledCrtQty}',
				 				press : function(oEvent) {
									debugger;
		 						  var region = oEvent.getSource().getBindingContext().getProperty("Region");
		    					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		    					var city = oEvent.getSource().getBindingContext().getProperty("City");
		    					city = city.substr(0,3);
		    					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		    					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		    					var matnr = oEvent.getSource().getBindingContext().getProperty("UnitType");
									var ponumber = oEvent.getSource().getBindingContext().getProperty("Purch");
									var poitem = oEvent.getSource().getBindingContext().getProperty("Item");
									var matnr = oEvent.getSource().getBindingContext().getProperty("UnitType");

									FNAPOSummaryEQUNR = oCurrent.getEQUNRFromPO(ponumber, poitem, matnr);

									var onewnaPOEQUNRLevel = new newnaPOEQUNRLevel();
									onewnaPOEQUNRLevel.setContentPOEQUNRTable(FNAPOSummaryEQUNR, ponumber, poitem, matnr);
				 				}
						 }).bindProperty("text", "CrtQty").addStyleClass("wraptext"),
	    		 resizable:true,
	             //sortProperty: "Country",
	             //filterProperty: "Country",
	    		 }));



    	var repNAPOFlex = new sap.m.FlexBox({
			items: [   oTableNAPOSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("xmarginTop10");

			return repNAPOFlex;

	},

	getEQUNRFromPO : function(ponumber, poitem, matnr){
			FNAPOSummaryEQUNR = [];
			for(var x=0; x<FNAPOSummaryArrayReq.length;x++){
				if(FNAPOSummaryArrayReq[x].Equnrlevel == "X"
								&& FNAPOSummaryArrayReq[x].Ebeln == ponumber
									//&& parseInt(FNAPOSummaryArrayReq[x].Ebelp) == poitem
										&& FNAPOSummaryArrayReq[x].Matnr == matnr)

					FNAPOSummaryEQUNR.push({
						"Equnr" : FNAPOSummaryArrayReq[x].Equnr,
						"Fullstatus" : FNAPOSummaryArrayReq[x].Fullstatus
					});

			}
			return FNAPOSummaryEQUNR;
	},

	getDataPOLevel : function(region, country, city, pcate, pclass, matnr, colId, level, statText, depot){

		if(colId == "FPURCH"){
			sap.ui.getCore().byId("idTableNAPOSummaryEQUNR").setVisible(false);
			sap.ui.getCore().byId("idTableNAPOSummaryTOTQTY").setVisible(true);
			sap.ui.getCore().byId("idTableNAPOSummaryCRTQTY").setVisible(true);
			sap.ui.getCore().byId("idTableNAPOSummaryREMQTY").setVisible(true);
		}else{
			sap.ui.getCore().byId("idTableNAPOSummaryEQUNR").setVisible(true);
			sap.ui.getCore().byId("idTableNAPOSummaryTOTQTY").setVisible(false);
			sap.ui.getCore().byId("idTableNAPOSummaryCRTQTY").setVisible(false);
			sap.ui.getCore().byId("idTableNAPOSummaryREMQTY").setVisible(false);
		}

		globalEquipmentType = pcate;
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
			matnr = filterParameters.unittype;

		}else{

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

		var fnetaLinkERPReq = fnetaLinkPO + "?$filter=LvReq eq 'X' and Inmregion eq '" + mregion + "' and Inregion eq '" + region + "' and Incountry eq '" + country + "' and Incity eq '" + city + "' and Indepot eq '" + depot
								+ "' and Instatus eq '" + colId + "' and Inpcate eq '" + pcate + "' and Inpclass eq '" + pclass + "' and Inmaterial eq '" + matnr
								+ "' and Inpor2 eq '" + oInputPor2 + "' and Inpor eq '" + oInputPor + "' and Inspor eq '" + oSymbolPor
								+ "' and Inage2 eq '" + oInputAge2 + "' and Inage eq '" + oInputAge + "' and Insage eq '" + oSymbolAge
								+ "' and Inallorcapex eq '" + oAllOrCapex
								+ "'";
			busyDialog.open();
			OData.request({
					requestUri: fnetaLinkERPReq,
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
				sap.ui.commons.MessageBox.show("No data found!",
											sap.ui.commons.MessageBox.Icon.WARNING,
											"Warning",
											[sap.ui.commons.MessageBox.Action.OK],
											sap.ui.commons.MessageBox.Action.OK);
				busyDialog.close();
			}
			else{

				var requestedSel = "";

				sap.ui.getCore().byId("idTableNAPOSummaryNETPR").setVisible(false);
				sap.ui.getCore().byId("idTableNAPOSummaryNETWR").setVisible(false);
				sap.ui.getCore().byId("idTableNAPOSummaryCURR").setVisible(false);

				var crtDate = null;
				var isValid = false;
				FNAPOSummaryArrayReq = data.results;
				FNAPODataReq = [];
				jsonInventorynaPOLevel = [];
				for(var j=0;j<FNAPOSummaryArrayReq.length;j++){

					if(j == 0){

						if(FNAPOSummaryArrayReq[j].Vgabe == "X"){
							sap.ui.getCore().byId("idTableNAPOSummaryNETPR").setVisible(true);
							sap.ui.getCore().byId("idTableNAPOSummaryNETWR").setVisible(true);
							sap.ui.getCore().byId("idTableNAPOSummaryCURR").setVisible(true);
						}

						if(pcate == matnrtemp){
							requestedSel = "Category : " + pcate;
							requestedSel = requestedSel + " || " + " Status : " + statText;
							sap.ui.getCore().byId("naPOLevel").setTitle(requestedSel);
						}else{

							// if(level == 'Country Level'){
							// 	splitValuesReq[11] = '';
							// }
							// else if(level == 'Region Level'){
							// 	splitValuesReq[11] = '';
							// 	splitValuesReq[10] = '';
							// }

							requestedSel = "Region : " + FNAPOSummaryArrayReq[j].ZRegDesc;
							requestedSel = requestedSel + " || " + " Country : " + FNAPOSummaryArrayReq[j].ZCouDesc;
							requestedSel = requestedSel + " || " + " City : " + FNAPOSummaryArrayReq[j].ZCityDesc;
							requestedSel = requestedSel + " || " + " Category : " + FNAPOSummaryArrayReq[j].Pcate;
							requestedSel = requestedSel + " || " + " Material Type : " + FNAPOSummaryArrayReq[j].Matnr;
							requestedSel = requestedSel + " || " + " Status : " + statText;
							sap.ui.getCore().byId("naPOLevel").setTitle(requestedSel);
						}
					}
					var datenw = FNAPOSummaryArrayReq[j].Bedat.split('(')[1].split(')')[0];
					var dateForSort = new Date(Number(datenw));
					crtDate =   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");


					/*Purch	Ebeln
						DocDate	Bedat
						CreatedBy	Ernam
						Vendor	Lifnr
						Item	Ebelp
						UnitType	Matnr
						Description	Maktx
						Range	Zzunp01	Zzunf01	Zzunt01
						TotQty	TotQty
						RemQty	RemQty
						CrtQty	CrtQty
						*/
								isValid = false;
								if(colId == "FPURCH" && FNAPOSummaryArrayReq[j].Equnrlevel == ""){
									isValid = true;
								}else if(colId == "FEQUNR" && FNAPOSummaryArrayReq[j].Equnrlevel == "X"){
									isValid = true;
								}

								if(isValid){
								FNAPODataReq.push({
									"Mregion" : FNAPOSummaryArrayReq[j].Mregion,
									"Region" : FNAPOSummaryArrayReq[j].Region,
									"Country" : FNAPOSummaryArrayReq[j].Country,
									"City" : FNAPOSummaryArrayReq[j].City,

									"ZRegDesc" : FNAPOSummaryArrayReq[j].ZRegDesc,
									"ZCouDesc" : FNAPOSummaryArrayReq[j].ZCouDesc,
									"ZCityDesc" : FNAPOSummaryArrayReq[j].ZCityDesc,

									"Pcate" : FNAPOSummaryArrayReq[j].Pcate,
									"Pclass" : FNAPOSummaryArrayReq[j].Pclass,

									"Purch" : FNAPOSummaryArrayReq[j].Ebeln,
									"Equnr" : FNAPOSummaryArrayReq[j].Equnr,
									"CompCode" : FNAPOSummaryArrayReq[j].Bukrs,
									"DocDate" : crtDate,
									"DocDatefil" : (crtDate != "")?crtDate.substr(6,4) + crtDate.substr(3,2) + crtDate.substr(0,2):"",
									"CreatedBy" : FNAPOSummaryArrayReq[j].Ernam,
									"Vendor" : parseInt(FNAPOSummaryArrayReq[j].Lifnr),
									"Item" : parseInt(FNAPOSummaryArrayReq[j].Ebelp),

									"Netwr" : FNAPOSummaryArrayReq[j].Netwr,
									"Netpr" : FNAPOSummaryArrayReq[j].Netpr,
									"formattedNetwr" : thousandsep(FNAPOSummaryArrayReq[j].Netwr),
									"formattedNetpr" : thousandsep(FNAPOSummaryArrayReq[j].Netpr),
									"Curr" : FNAPOSummaryArrayReq[j].Waers,

									"UnitType" : FNAPOSummaryArrayReq[j].Matnr,
									"Description" : FNAPOSummaryArrayReq[j].Maktx,

									"Lgort" : FNAPOSummaryArrayReq[j].Lgort,
									"Name" : FNAPOSummaryArrayReq[j].Name,

									"Range" : FNAPOSummaryArrayReq[j].Zzunp01 + " " + FNAPOSummaryArrayReq[j].Zzunf01 + " - " + FNAPOSummaryArrayReq[j].Zzunt01,
									"TotQty" : FNAPOSummaryArrayReq[j].TotQty,
									"RemQty" : FNAPOSummaryArrayReq[j].RemQty,
									"CrtQty" : FNAPOSummaryArrayReq[j].CrtQty,
									"enabledCrtQty" : (FNAPOSummaryArrayReq[j].CrtQty == 0)?false:true

								});
								if(FNAPOSummaryArrayReq[0].Vgabe == "X"){
											if(colId == "FPURCH"){
												jsonInventorynaPOLevel.push({
													"Purch. Order" : FNAPOSummaryArrayReq[j].Ebeln,
													"Item" : parseInt(FNAPOSummaryArrayReq[j].Ebelp),
													"Unit Type" : FNAPOSummaryArrayReq[j].Matnr,
													"Description" : FNAPOSummaryArrayReq[j].Maktx,

													"Factory Code" : FNAPOSummaryArrayReq[j].Lgort,
													"Factory Name" : FNAPOSummaryArrayReq[j].Name,

													//"Equipment" : FNAPOSummaryArrayReq[j].Equnr,
													"Comp. Code" : FNAPOSummaryArrayReq[j].Bukrs,
													"Doc Date" : crtDate,
													"Created By" : FNAPOSummaryArrayReq[j].Ernam,
													"Vendor" : parseInt(FNAPOSummaryArrayReq[j].Lifnr),

													"Price" : FNAPOSummaryArrayReq[j].Netwr,
													"Net Price" : FNAPOSummaryArrayReq[j].Netpr,
													"Curr." : FNAPOSummaryArrayReq[j].Waers,

													"Range" : FNAPOSummaryArrayReq[j].Zzunp01 + " " + FNAPOSummaryArrayReq[j].Zzunf01 + " - " + FNAPOSummaryArrayReq[j].Zzunt01,
													"Total Qty" : FNAPOSummaryArrayReq[j].TotQty,
													"Rem. Qty" : FNAPOSummaryArrayReq[j].RemQty,
													"Created Qty" : FNAPOSummaryArrayReq[j].CrtQty
												});
											}else if(colId == "FEQUNR"){
												jsonInventorynaPOLevel.push({
													"Purch. Order" : FNAPOSummaryArrayReq[j].Ebeln,
													"Item" : parseInt(FNAPOSummaryArrayReq[j].Ebelp),
													"Unit Type" : FNAPOSummaryArrayReq[j].Matnr,
													"Description" : FNAPOSummaryArrayReq[j].Maktx,

													"Factory Code" : FNAPOSummaryArrayReq[j].Lgort,
													"Factory Name" : FNAPOSummaryArrayReq[j].Name,

													"Equipment" : FNAPOSummaryArrayReq[j].Equnr,
													"Comp. Code" : FNAPOSummaryArrayReq[j].Bukrs,
													"Doc Date" : crtDate,
													"Created By" : FNAPOSummaryArrayReq[j].Ernam,
													"Vendor" : parseInt(FNAPOSummaryArrayReq[j].Lifnr),

													"Price" : FNAPOSummaryArrayReq[j].Netwr,
													"Net Price" : FNAPOSummaryArrayReq[j].Netpr,
													"Curr." : FNAPOSummaryArrayReq[j].Waers,

													"Range" : FNAPOSummaryArrayReq[j].Zzunp01 + " " + FNAPOSummaryArrayReq[j].Zzunf01 + " - " + FNAPOSummaryArrayReq[j].Zzunt01,
													// "Total Qty" : FNAPOSummaryArrayReq[j].TotQty,
													// "Rem. Qty" : FNAPOSummaryArrayReq[j].RemQty,
													// "Created Qty" : FNAPOSummaryArrayReq[j].CrtQty
												});
											}
               }else{
								 if(colId == "FPURCH"){
								 	jsonInventorynaPOLevel.push({
								 		"Purch. Order" : FNAPOSummaryArrayReq[j].Ebeln,
								 		"Item" : parseInt(FNAPOSummaryArrayReq[j].Ebelp),
								 		"Unit Type" : FNAPOSummaryArrayReq[j].Matnr,
										"Description" : FNAPOSummaryArrayReq[j].Maktx,

										"Factory Code" : FNAPOSummaryArrayReq[j].Lgort,
										"Factory Name" : FNAPOSummaryArrayReq[j].Name,

								 		//"Equipment" : FNAPOSummaryArrayReq[j].Equnr,
								 		"Comp. Code" : FNAPOSummaryArrayReq[j].Bukrs,
								 		"Doc Date" : crtDate,
								 		"Created By" : FNAPOSummaryArrayReq[j].Ernam,
								 		"Vendor" : parseInt(FNAPOSummaryArrayReq[j].Lifnr),

								 		"Range" : FNAPOSummaryArrayReq[j].Zzunp01 + " " + FNAPOSummaryArrayReq[j].Zzunf01 + " - " + FNAPOSummaryArrayReq[j].Zzunt01,
								 		"Total Qty" : FNAPOSummaryArrayReq[j].TotQty,
								 		"Rem. Qty" : FNAPOSummaryArrayReq[j].RemQty,
								 		"Created Qty" : FNAPOSummaryArrayReq[j].CrtQty
								 	});
								 }else if(colId == "FEQUNR"){
								 	jsonInventorynaPOLevel.push({
								 		"Purch. Order" : FNAPOSummaryArrayReq[j].Ebeln,
								 		"Item" : parseInt(FNAPOSummaryArrayReq[j].Ebelp),
								 		"Unit Type" : FNAPOSummaryArrayReq[j].Matnr,
										"Description" : FNAPOSummaryArrayReq[j].Maktx,

										"Factory Code" : FNAPOSummaryArrayReq[j].Lgort,
										"Factory Name" : FNAPOSummaryArrayReq[j].Name,

								 		"Equipment" : FNAPOSummaryArrayReq[j].Equnr,
								 		"Comp. Code" : FNAPOSummaryArrayReq[j].Bukrs,
								 		"Doc Date" : crtDate,
								 		"Created By" : FNAPOSummaryArrayReq[j].Ernam,
								 		"Vendor" : parseInt(FNAPOSummaryArrayReq[j].Lifnr),
								 		"Range" : FNAPOSummaryArrayReq[j].Zzunp01 + " " + FNAPOSummaryArrayReq[j].Zzunf01 + " - " + FNAPOSummaryArrayReq[j].Zzunt01,
								 		// "Total Qty" : FNAPOSummaryArrayReq[j].TotQty,
								 		// "Rem. Qty" : FNAPOSummaryArrayReq[j].RemQty,
								 		// "Created Qty" : FNAPOSummaryArrayReq[j].CrtQty
								 	});
								 }
							 }


						}
					}
						var updateString = 'PO Details';

						var oModelPODetails = new sap.ui.model.json.JSONModel();
						oModelPODetails.setData({modelData: FNAPODataReq});
						sap.ui.getCore().byId("idTableNAPOSummary").setModel(oModelPODetails);
						sap.ui.getCore().byId("idTableNAPOSummary").bindRows("/modelData");

						var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
						if(visiblerowcount){
							visiblerowcount = parseInt(visiblerowcount);
						}else{
							visiblerowcount = 20;
						}
							if (FNAPODataReq.length < visiblerowcount){
								sap.ui.getCore().byId("idTableNAPOSummary").setVisibleRowCount(visiblerowcount);
								//sap.ui.getCore().byId("idTableNAPOSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
							}
						else{
							//sap.ui.getCore().byId("idTableNAPOSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
							sap.ui.getCore().byId("idTableNAPOSummary").setVisibleRowCount(visiblerowcount);
						}
						/*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
						var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
						oScrollBar.setScrollPosition(0);*/
						app.to("naPOLevel");
						busyDialog.close();
			}
				},
			function(err){
					 busyDialog.close();
					 //errorfromServer(err);
					 //alert("Error in data read from SAP ERP System");
				});
	}

});

function isInArray(value, array) {
	  return array.indexOf(value) > -1;
}

function thousandsep(value){
    value = parseFloat(value);
    value = Globalize.format(value, 'n2', 'en');
    return value;
}
