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
var NAULERPData = [];
var jsonInventorynaUnitLevel = [];
var NAULSummaryArray = [];
var NAULSummaryUnitLevel = [];
var NAULSummaryArrayBackup = [];
var oModelEDINAULSummary;
var ttlsArray = ["AVLB", "AVLB NEW", "AUTH", "HOLD", "WEST", "REPA", "NWAP"];
var awapArray = ["WEST", "REPA"];
var nwapArray = ["NWAP"];
var avlbNArray = ["AVLB NEW"];
var avlbArray = ["AVLB"];
var holdArray = ["HOLD"];
var authArray = ["AUTH"];
var FNASummaryArrayReq = [];
var FNAERPDataReq = [];
var buffStatus = [];
var globalTableNAULSummaryTPC = null;
var globalEquipmentType = "";
var globalIsTanks = false;

sap.ui.model.json.JSONModel.extend("newnaUnitLevel", {

	createnaUnitLevel: function(){

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

							var omemDaysStatusValue = window.localStorage.getItem("memDaysStatusValue");
							if(omemDaysStatusValue != null){

							}else{
								omemDaysStatusValue = 0;
							}
							window.localStorage.setItem("memDaysStatusValue", omemDaysStatusValue);

							var omemDaysDepotValue = window.localStorage.getItem("memDaysDepotValue");
							if(omemDaysDepotValue != null){

							}else{
								omemDaysDepotValue = 0;
							}
							window.localStorage.setItem("memDaysDepotValue", omemDaysDepotValue);


			// Table
    	var oTableNAULSummary = new sap.ui.table.Table("idTableNAULSummary",{
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

				items: [

					new sap.ui.commons.Button({
						text: "Reset",
						visible : false,
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							oPersoServiceFNETANAUL.delPersData();
							globalTableNAULSummaryTPC.refresh().done(function() {
								sap.ui.getCore().byId("idTableNAULSummary").setEnableGrouping(false);
								sap.ui.getCore().byId("idTableNAULSummary").setEnableGrouping(true);
								//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
							});

							/* Clear filters and sorting */

							var oTableNAULSummary = sap.ui.getCore().byId("idTableNAULSummary");
							var iColCounter = 0;
							oTableNAULSummary.clearSelection();
							var iTotalCols = oTableNAULSummary.getColumns().length;
							var oListBinding = oTableNAULSummary.getBinding();
							if (oListBinding) {
							oListBinding.aSorters = null;
							oListBinding.aFilters = null;
							}
							oTableNAULSummary.getModel().refresh(true);
							for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
								oTableNAULSummary.getColumns()[iColCounter].setSorted(false);
								oTableNAULSummary.getColumns()[iColCounter].setFilterValue("");
								oTableNAULSummary.getColumns()[iColCounter].setFiltered(false);
							}

						}
					}),
					new sap.ui.commons.Button({
						text: "Layout",
						visible : false,
						//icon: "sap-icon://reset",
						press: function(oEvent) {
							globalTableNAULSummaryTPC.openDialog();
						}
					}),
					new sap.ui.commons.Button({
						text: "Save",
						icon: "sap-icon://save",
						visible : false,
						press: function(oEvent) {
							globalTableNAULSummaryTPC.savePersonalizations().done(function() {
								sap.ui.commons.MessageBox.alert("Layout saved!", "INFORMATION", "Save");
							});
						}
					})
					// new sap.ui.commons.Button({
					// 	text: "Clear Grouping",
					// 	icon: "sap-icon://decline",
					// 	press: function(oEvent) {
					// 		//delta5
					// 		var oBundleLocal = window.localStorage.getItem("oSDASHM2TableEquipmentLevelPersonal") || "{}";
		    	// 			if(oBundleLocal != null && oBundleLocal != "{}"){
		    	// 			oBundleLocal = JSON.parse(oBundleLocal);
		    	// 			for(var i=0; i<oBundleLocal.aColumns.length; i++){
		    	// 				if(oBundleLocal.aColumns[i].grouped == true){
		    	// 					oBundleLocal.aColumns[i].grouped = false;
		    	// 				}
		    	// 			}
		    	// 			var sJSON = JSON.stringify(oBundleLocal, null, 4);
		    	// 			window.localStorage.setItem("oSDASHM2TableEquipmentLevelPersonal", sJSON);
		    	// 			}
					// 		//delta5
					// 		globalSDASHM2TableEquipmentLevelTPC.refresh().done(function() {
					// 			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(false);
					// 			sap.ui.getCore().byId("idSDASHM2TableEquipmentLevel").setEnableGrouping(true);
					// 			//sap.ui.commons.MessageBox.alert("Reset done!", "INFORMATION", "Refresh");
					//
					// 		});
					// 	}
					// })
				],

				rightItems: [

					// new sap.m.Input({
					// 	width : "50px",
					// 	value: omemDaysStatusValue,
					// 	placeholder: "Days in Status",
					// 	change : function(oEvent){
					// 		debugger;
					// 		var newValue = oEvent.getParameter("newValue");
					// 		window.localStorage.setItem("memDaysStatusValue", newValue);
					// 	}
					// }),
					//
					// new sap.m.Input({
					// 	width : "50px",
					// 	value: omemDaysDepotValue,
					// 	placeholder: "Days in Depot",
					// 	change : function(oEvent){
					// 		debugger;
					// 		var newValue = oEvent.getParameter("newValue");
					// 		window.localStorage.setItem("memDaysDepotValue", newValue);
					// 	}
					// }),

					new sap.ui.commons.Button({
						visible : true,
						//text: "Excel",
						icon: "sap-icon://excel-attachment",
						press: function(oEvent) {
							var objUtil = new utility();
				        	objUtil.makeHTMLTable(jsonInventorynaUnitLevel, "Leasing Equipment Level Details","export");
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

    	var oPersoServiceFNETANAUL = {

    			getPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				var sJSON = window.localStorage.getItem("memLayoutFNETANAUL") || "{}";
    				printPersoData(sJSON);
    				var oBundle = JSON.parse(sJSON);
    				oDeferred.resolve(oBundle);
    				return oDeferred.promise();
    			},

    			setPersData: function(oBundle) {

    				var oDeferred = jQuery.Deferred();
    				var sJSON = JSON.stringify(oBundle, null, 4);
    				window.localStorage.setItem("memLayoutFNETANAUL", sJSON);
    				printPersoData(sJSON);
    				oDeferred.resolve();
    				return oDeferred.promise();
    			},

    			delPersData: function() {
    				var oDeferred = jQuery.Deferred();
    				window.localStorage.removeItem("memLayoutFNETANAUL");
    				printPersoData("");
    				oDeferred.resolve();
    				return oDeferred.promise();
    			}

    		};

    		jQuery.sap.require("sap.ui.table.TablePersoController");
    		var oTableNAULSummaryTPC = new sap.ui.table.TablePersoController("idTableNAULSummaryTPC", {
    			table: oTableNAULSummary,
    			persoService: oPersoServiceFNETANAUL,
    			//hasGrouping: true
    		});
    		globalTableNAULSummaryTPC = oTableNAULSummaryTPC;

    	// Table Columns
    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
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
                  var binding = oTableNAULSummary.getBinding("rows");
                  binding.filter(aFilters, "Application");
                }
              })
            ],
    		 resizable:true,
//             sortProperty: "Equipment",
//             filterProperty: "Equipment",
    		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idLeaseColCertificates",{
	    	width: "100px",
	   		visible:true,
	   		label: new sap.ui.commons.Label({text: "Certificates"}).addStyleClass("wraptextcol"),
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

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
			 width: "100px",
      		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "SAP Status"
	              }).addStyleClass("wraptextcol"),
           new sap.ui.commons.TextField({
             placeholder: "SAP Status",
             width: "90px",
             liveChange: function(oEvent) {
               // add filter for search
               var aFilters = [];
               var sQuery = oEvent.getParameter("liveValue");
               if (sQuery && sQuery.length > 0) {
                 var filter = new sap.ui.model.Filter("Saps", sap.ui.model.FilterOperator.Contains, sQuery);
                 aFilters.push(filter);
               }
               var binding = oTableNAULSummary.getBinding("rows");
               binding.filter(aFilters, "Application");
             }
           })
         ],
      		 template: new sap.ui.commons.TextView().bindProperty("text", "Saps"),
    		 resizable:true,
             //sortProperty: "Country",
             //filterProperty: "Country",
    		 }));

				 oTableNAULSummary.addColumn(new sap.ui.table.Column({
	 			 width: "100px",
	       		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
	 			 multiLabels: [new sap.ui.commons.Label({
	 	                text: "Sub Type"
	 	              }).addStyleClass("wraptextcol"),
	            new sap.ui.commons.TextField({
	              placeholder: "Sub Type",
	              width: "90px",
	              liveChange: function(oEvent) {
	                // add filter for search
	                var aFilters = [];
	                var sQuery = oEvent.getParameter("liveValue");
	                if (sQuery && sQuery.length > 0) {
	                  var filter = new sap.ui.model.Filter("Subtype", sap.ui.model.FilterOperator.Contains, sQuery);
	                  aFilters.push(filter);
	                }
	                var binding = oTableNAULSummary.getBinding("rows");
	                binding.filter(aFilters, "Application");
	              }
	            })
	          ],
	       		 template: new sap.ui.commons.TextView().bindProperty("text", "Subtype"),
	     		 resizable:true,
	              //sortProperty: "Country",
	              //filterProperty: "Country",
	     		 }));

				 oTableNAULSummary.addColumn(new sap.ui.table.Column({
				  width: "100px",
				 		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
				  multiLabels: [new sap.ui.commons.Label({
				 						text: "Grade"
				 					}).addStyleClass("wraptextcol"),
				 		 new sap.ui.commons.TextField({
				 			 placeholder: "Grade",
				 			 width: "90px",
				 			 liveChange: function(oEvent) {
				 				 // add filter for search
				 				 var aFilters = [];
				 				 var sQuery = oEvent.getParameter("liveValue");
				 				 if (sQuery && sQuery.length > 0) {
				 					 var filter = new sap.ui.model.Filter("Grade", sap.ui.model.FilterOperator.Contains, sQuery);
				 					 aFilters.push(filter);
				 				 }
				 				 var binding = oTableNAULSummary.getBinding("rows");
				 				 binding.filter(aFilters, "Application");
				 			 }
				 		 })
				 	 ],
				 		 template: new sap.ui.commons.TextView().bindProperty("text", "Grade"),
				 	 resizable:true,
				 			 //sortProperty: "Country",
				 			 //filterProperty: "Country",
				 	 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idEquiUnittype",{
			 width: "100px",
     		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
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
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
        ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Matnr"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));

			 oTableNAULSummary.addColumn(new sap.ui.table.Column("idEquiUnittypeDesc",{
 			 width: "280px",
      		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
 			 multiLabels: [new sap.ui.commons.Label({
 	                text: "Unit Type Desc."
 	              }).addStyleClass("wraptextcol"),
           new sap.ui.commons.TextField({
             placeholder: "Unit Type Desc",
             width: "270px",
             liveChange: function(oEvent) {
               // add filter for search
               var aFilters = [];
               var sQuery = oEvent.getParameter("liveValue");
               if (sQuery && sQuery.length > 0) {
                 var filter = new sap.ui.model.Filter("Maktx", sap.ui.model.FilterOperator.Contains, sQuery);
                 aFilters.push(filter);
               }
               var binding = oTableNAULSummary.getBinding("rows");
               binding.filter(aFilters, "Application");
             }
           })
         ],
      		 template: new sap.ui.commons.TextView().bindProperty("text", "Maktx"),
    		 	 resizable:true,
             //sortProperty: "Country",
             //filterProperty: "Country",
    		 }));


    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
			 width: "100px",
    		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Booked?"
	              }).addStyleClass("wraptextcol"),
         new sap.ui.commons.TextField({
           placeholder: "Booked?",
           width: "90px",
           liveChange: function(oEvent) {
             // add filter for search
             var aFilters = [];
             var sQuery = oEvent.getParameter("liveValue");
             if (sQuery && sQuery.length > 0) {
               var filter = new sap.ui.model.Filter("Booked", sap.ui.model.FilterOperator.Contains, sQuery);
               aFilters.push(filter);
             }
             var binding = oTableNAULSummary.getBinding("rows");
             binding.filter(aFilters, "Application");
           }
         })
       ],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Booked"),
  		 resizable:true,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
			 width: "100px",
     		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Booking Ref."
	              }).addStyleClass("wraptextcol"),
          new sap.ui.commons.TextField({
            placeholder: "Booking Ref.",
            width: "90px",
            liveChange: function(oEvent) {
              // add filter for search
              var aFilters = [];
              var sQuery = oEvent.getParameter("liveValue");
              if (sQuery && sQuery.length > 0) {
                var filter = new sap.ui.model.Filter("Booking", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);
              }
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
        ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Booking"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));


    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idAwapCustomer",{
			 width: "100px",
    		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Customer"
	              }).addStyleClass("wraptextcol"),
         new sap.ui.commons.TextField({
           placeholder: "Customer",
           width: "90px",
           liveChange: function(oEvent) {
             // add filter for search
             var aFilters = [];
             var sQuery = oEvent.getParameter("liveValue");
             if (sQuery && sQuery.length > 0) {
               var filter = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, sQuery);
               aFilters.push(filter);
             }
             var binding = oTableNAULSummary.getBinding("rows");
             binding.filter(aFilters, "Application");
           }
         })
       ],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Customer"),
  		 resizable:true,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idAwapCustomerName",{
			 width: "250px",
     		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Last Cust. Name"
	              }).addStyleClass("wraptextcol"),
          new sap.ui.commons.TextField({
            placeholder: "Last Cust. Name",
            width: "90px",
            liveChange: function(oEvent) {
              // add filter for search
              var aFilters = [];
              var sQuery = oEvent.getParameter("liveValue");
              if (sQuery && sQuery.length > 0) {
                var filter = new sap.ui.model.Filter("Customername", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);
              }
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
        ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Customername"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));

    	/*oTableNAULSummary.addColumn(new sap.ui.table.Column("idAwapDnjs",{
			 width: "120px",
    		 //label: new sap.ui.commons.Label({text: "SAP Status"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Lease No."
	              }).addStyleClass("wraptextcol"),
         new sap.ui.commons.TextField({
           placeholder: "Lease No.",
           width: "90px",
           liveChange: function(oEvent) {
             // add filter for search
             var aFilters = [];
             var sQuery = oEvent.getParameter("liveValue");
             if (sQuery && sQuery.length > 0) {
               var filter = new sap.ui.model.Filter("Dnjs", sap.ui.model.FilterOperator.Contains, sQuery);
               aFilters.push(filter);
             }
             var binding = oTableNAULSummary.getBinding("rows");
             binding.filter(aFilters, "Application");
           }
         })
       ],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Dnjs"),
  		 resizable:true,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));*/

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
     		 //label: new sap.ui.commons.Label({text: "Depot"}),
			 multiLabels: [new sap.ui.commons.Label({
	                text: "Depot Name"
	              }).addStyleClass("wraptextcol"),
        new sap.ui.commons.TextField({
          placeholder: "Depot Name",
          width: "90px",
          liveChange: function(oEvent) {
            // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getParameter("liveValue");
            if (sQuery && sQuery.length > 0) {
              var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
              aFilters.push(filter);
            }
            var binding = oTableNAULSummary.getBinding("rows");
            binding.filter(aFilters, "Application");
          }
        })
      ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Name").addStyleClass("wraptext"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
     		 //label: new sap.ui.commons.Label({text: "Depot Code"}),
    		multiLabels: [new sap.ui.commons.Label({
                text: "Depot"
              	}).addStyleClass("wraptextcol"),
			    new sap.ui.commons.TextField({
			      placeholder: "Depot",
			      width: "70px",
			      liveChange: function(oEvent) {
			        // add filter for search
			        var aFilters = [];
			        var sQuery = oEvent.getParameter("liveValue");
			        if (sQuery && sQuery.length > 0) {
			          var filter = new sap.ui.model.Filter("Floc", sap.ui.model.FilterOperator.Contains, sQuery);
			          aFilters.push(filter);
			        }
			        var binding = oTableNAULSummary.getBinding("rows");
			        binding.filter(aFilters, "Application");
			      }
			    })
			  ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Floc").addStyleClass("wraptext"),
     		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
    		}));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Manuf. Date"}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "manDate").addStyleClass("wraptext"),
     		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 //label: new sap.ui.commons.Label({text: "Age(Years)"}),
    		multiLabels: [new sap.ui.commons.Label({
                text: "Age(Years)"
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
	                var filter = new sap.ui.model.Filter("Age", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableNAULSummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
              })
        ],
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Age").addStyleClass("wraptext"),
   		 resizable:true,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));


    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "220px",
    		 label: new sap.ui.commons.Label({text: "Manuf. Partner"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Mapar").addStyleClass("wraptext"),
  		 resizable:true,
  		 visible: false,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Manuf. No."}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Manserno").addStyleClass("wraptext"),
   		 resizable:true,
   		visible: false,
            //sortProperty: "Country",
            //filterProperty: "Country",
   		 }));

   	oTableNAULSummary.addColumn(new sap.ui.table.Column({
   		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Manufacturer"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Manufacturer").addStyleClass("wraptext"),
  		 resizable:true,
  		visible: false,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

   	oTableNAULSummary.addColumn(new sap.ui.table.Column({
   		width: "100px",
    		 label: new sap.ui.commons.Label({text: "Model Number"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Manmodel").addStyleClass("wraptext"),
  		 resizable:true,
  		visible: false,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

   	oTableNAULSummary.addColumn(new sap.ui.table.Column({
   		width: "80px",
    		 //label: new sap.ui.commons.Label(text: "Days in Status"),
   		multiLabels: [new sap.ui.commons.Label({
            text: "Days in Status"
          }).addStyleClass("wraptextcol"),
          new sap.m.HBox({
        	  items : [
          new sap.ui.commons.TextField({
            placeholder: "=2 or <2 or >2",
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
                var filter = new sap.ui.model.Filter("Ndays", filterOperator, sQuery);
                aFilters.push(filter);
              }
              }
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
          ]
          })
   		],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Ndays").addStyleClass("wraptext"),
    		 resizable:true,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

   	oTableNAULSummary.addColumn(new sap.ui.table.Column({
		 width: "100px",
 		 //label: new sap.ui.commons.Label({text: "Last Gate In"}),
		 multiLabels: [new sap.ui.commons.Label({
	            text: "Last Gate In"
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
	                var filter = new sap.ui.model.Filter("Dgatinfil", filterOperator, sQuery);
	                aFilters.push(filter);
	              }
	              }
	              var binding = oTableNAULSummary.getBinding("rows");
	              binding.filter(aFilters, "Application");
	            }
	          })
	          ]
	          })
	   		],
 		 template: new sap.ui.commons.TextView().bindProperty("text", "Dgatin").addStyleClass("wraptext"),
		 resizable:true,
        //sortProperty: "Country",
        //filterProperty: "Country",
		 }));

   	oTableNAULSummary.addColumn(new sap.ui.table.Column({
   		width: "80px",
    		 //label: new sap.ui.commons.Label(text: "Days in Status"),
   		multiLabels: [new sap.ui.commons.Label({
            text: "IN Days"
          }).addStyleClass("wraptextcol"),
          new sap.m.HBox({
        	  items : [
          new sap.ui.commons.TextField({
            placeholder: "=2 or <2 or >2",
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
                var filter = new sap.ui.model.Filter("NdaysGate", filterOperator, sQuery);
                aFilters.push(filter);
              }
              }
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
          ]
          })
   		],
    		 template: new sap.ui.commons.TextView().bindProperty("text", "NdaysGate").addStyleClass("wraptext"),
    		 resizable:true,
           //sortProperty: "Country",
           //filterProperty: "Country",
  		 }));

	oTableNAULSummary.addColumn(new sap.ui.table.Column("idDclean",{
		width: "100px",
		 //label: new sap.ui.commons.Label({text: "Last Cleaning"}),
		multiLabels: [new sap.ui.commons.Label({
            text: "Last Cleaning"
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
                var filter = new sap.ui.model.Filter("Dcleanfil", filterOperator, sQuery);
                aFilters.push(filter);
              }
              }
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
          ]
          })
   		],
		 template: new sap.ui.commons.TextView().bindProperty("text", "Dclean").addStyleClass("wraptext"),
		 resizable:true,
       //sortProperty: "Country",
       //filterProperty: "Country",
		 }));

	oTableNAULSummary.addColumn(new sap.ui.table.Column("idLcgdesc",{
		width: "220px",
		 label: new sap.ui.commons.Label({text: "Cargo Descr."}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView().bindProperty("text", "Lcgdesc").addStyleClass("wraptext"),
		 resizable:true,
       //sortProperty: "Country",
       //filterProperty: "Country",
		 }));

	oTableNAULSummary.addColumn(new sap.ui.table.Column("idUnno",{
		width: "120px",
		 label: new sap.ui.commons.Label({text: "UN No."}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView().bindProperty("text", "Unno").addStyleClass("wraptext"),
		 resizable:true,
       //sortProperty: "Country",
       //filterProperty: "Country",
		 }));

	oTableNAULSummary.addColumn(new sap.ui.table.Column("idNexttesttype",{
		width: "80px",
 		 //label: new sap.ui.commons.Label({text: "Depot Code"}),
		multiLabels: [new sap.ui.commons.Label({
            text: "Next Test Type"
          	}).addStyleClass("wraptextcol"),
		    new sap.ui.commons.TextField({
		      placeholder: "Next Test Type",
		      width: "80px",
		      liveChange: function(oEvent) {
		        // add filter for search
		        var aFilters = [];
		        var sQuery = oEvent.getParameter("liveValue");
		        if (sQuery && sQuery.length > 0) {
		          var filter = new sap.ui.model.Filter("Nexttesttype", sap.ui.model.FilterOperator.Contains, sQuery);
		          aFilters.push(filter);
		        }
		        var binding = oTableNAULSummary.getBinding("rows");
		        binding.filter(aFilters, "Application");
		      }
		    })
		  ],
 		 template: new sap.ui.commons.TextView().bindProperty("text", "Nexttesttype").addStyleClass("wraptext"),
 		 resizable:true,
        //sortProperty: "Country",
        //filterProperty: "Country",
		}));

	oTableNAULSummary.addColumn(new sap.ui.table.Column("idNexttestdate",{
		width: "100px",
		 //label: new sap.ui.commons.Label({text: "Last Cleaning"}),
		multiLabels: [new sap.ui.commons.Label({
            text: "Next test on"
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
                var filter = new sap.ui.model.Filter("Nexttestdatefil", filterOperator, sQuery);
                aFilters.push(filter);
              }
              }
              var binding = oTableNAULSummary.getBinding("rows");
              binding.filter(aFilters, "Application");
            }
          })
          ]
          })
   		],
		 template: new sap.ui.commons.TextView().bindProperty("text", "Nexttestdate").addStyleClass("wraptext"),
		 resizable:true,
       //sortProperty: "Country",
       //filterProperty: "Country",
		 }));

    oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
  		 //label: new sap.ui.commons.Label({text: "Tare Wight", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		multiLabels: [new sap.ui.commons.Label({
                text: "Tare Weight",
                textAlign : sap.ui.core.TextAlign.End
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
              new sap.ui.commons.TextField({
                placeholder: ">1333",
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
                		sQuery = parseFloat(sQuery);
                	}else{
                		sQuery = sQuery.substr(1);
                		sQuery = parseFloat(sQuery);
                	}
                    var filter = new sap.ui.model.Filter("TrWeightfil", filterOperator, sQuery);
                    aFilters.push(filter);
                  }
                  }
                  var binding = oTableNAULSummary.getBinding("rows");
                  binding.filter(aFilters, "Application");
                }
              })
              ]
              })
       		],
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "TrWeight").addStyleClass("wraptext"),
  		 resizable:true,
         //sortProperty: "Newavlb",
         //filterProperty: "Material",
		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 //label: new sap.ui.commons.Label({text: "Max. Gross Weight", textAlign : sap.ui.core.TextAlign.End}),
    		multiLabels: [new sap.ui.commons.Label({
                text: "Max. Gross Weight",
                textAlign : sap.ui.core.TextAlign.End
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
              new sap.ui.commons.TextField({
                placeholder: ">1333",
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
                		sQuery = parseFloat(sQuery);
                	}else{
                		sQuery = sQuery.substr(1);
                		sQuery = parseFloat(sQuery);
                	}
                    var filter = new sap.ui.model.Filter("GrWeightfil", filterOperator, sQuery);
                    aFilters.push(filter);
                  }
                  }
                  var binding = oTableNAULSummary.getBinding("rows");
                  binding.filter(aFilters, "Application");
                }
              })
              ]
              })
       		],
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "GrWeight").addStyleClass("wraptext"),
      		 resizable:true,
             //sortProperty: "Newavlb",
             //filterProperty: "Material",
    		 }));

				 oTableNAULSummary.addColumn(new sap.ui.table.Column({
				 	width: "80px",
				 	 //label: new sap.ui.commons.Label({text: "Depot Code"}),
				 	multiLabels: [new sap.ui.commons.Label({
				 					text: "Currency"
				 					}).addStyleClass("wraptextcol"),
				 			new sap.ui.commons.TextField({
				 				placeholder: "Currency",
				 				width: "80px",
				 				liveChange: function(oEvent) {
				 					// add filter for search
				 					var aFilters = [];
				 					var sQuery = oEvent.getParameter("liveValue");
				 					if (sQuery && sQuery.length > 0) {
				 						var filter = new sap.ui.model.Filter("Currency", sap.ui.model.FilterOperator.Contains, sQuery);
				 						aFilters.push(filter);
				 					}
				 					var binding = oTableNAULSummary.getBinding("rows");
				 					binding.filter(aFilters, "Application");
				 				}
				 			})
				 		],
				 	 template: new sap.ui.commons.TextView().bindProperty("text", "Currency").addStyleClass("wraptext"),
				 	 resizable:true,
				 			//sortProperty: "Country",
				 			//filterProperty: "Country",
				 	}));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idWocost",{
    		 width: "100px",
    		 //visible: "{isRepair}",
      		 //label: new sap.ui.commons.Label({text: "Estimate Amt.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 multiLabels: [new sap.ui.commons.Label({
                 text: "Estimate Amt.",
                 textAlign : sap.ui.core.TextAlign.End
               }).addStyleClass("wraptextcol"),
               new sap.m.HBox({
             	  items : [
               new sap.ui.commons.TextField({
                 placeholder: ">654",
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
                 		sQuery = parseFloat(sQuery);
                 	}else{
                 		sQuery = sQuery.substr(1);
                 		sQuery = parseFloat(sQuery);
                 	}
                     var filter = new sap.ui.model.Filter("Wocostfil", filterOperator, sQuery);
                     aFilters.push(filter);
                   }
                   }
                   var binding = oTableNAULSummary.getBinding("rows");
                   binding.filter(aFilters, "Application");
                 }
               })
               ]
               })
        		],
     		 template: new sap.ui.commons.Link({
     				 textAlign : sap.ui.core.TextAlign.End,
      			 press : function(oEvent){
      				 var index = oEvent.getSource().getParent().getIndex();
     				   var rowContext = oEvent.getSource().getParent().getParent().getContextByIndex(index);
     				   var serialnos = rowContext.getProperty('Equnr');
							 var orders = rowContext.getProperty('Worder');
     				   // oCurrent.downloadDNJS(serialno);

	 	        	// var isSelectedOne = sap.ui.getCore().byId("idTableNAULSummary").getSelectedIndices().length;
	 		      	// if(isSelectedOne == 0){
	 		      	// 	sap.ui.commons.MessageBox.alert("Please select a unit");
	 		      	// }else{
	 		      		// var arraySelLines = sap.ui.getCore().byId("idTableNAULSummary").getSelectedIndices();
	 		      		// for(var i=0; i<oSDASHMJsonEquipmentLevel.length; i++){
	 		      		// 	if(arraySelLines.indexOf(i) != -1){
	 	      			// 		var oDetData = sap.ui.getCore().byId("idTableNAULSummary").getContextByIndex(i);
	 	      			// 		if(oDetData != undefined){
	 	      			// 		var realPath = oDetData.getPath().split('/')[2];
	 		      		// 		if(orders == ''){
	 		      		// 			orders = oSDASHMJsonEquipmentLevel[realPath].estimateno;
	 							// 			serialnos = oSDASHMJsonEquipmentLevel[realPath].serialno;
	 		      		// 		}else{
	 		      		// 			orders = orders + '$' + oSDASHMJsonEquipmentLevel[realPath].estimateno;
	 							// 			serialnos = serialnos + '_' + oSDASHMJsonEquipmentLevel[realPath].serialno;
	 		      		// 		}
	 	      			// 		}
	 		      		// 	}
	 		      		// }
	 		      	   if(orders == ""){
	 		      		 	sap.ui.commons.MessageBox.alert("No outstanding estimate.");
	 		      	   }else{

	 							 if(sap.ui.getCore().byId("idNETAPDFDOWNLOADDownload") != undefined)
	 										 sap.ui.getCore().byId("idNETAPDFDOWNLOADDownload").destroy();

	 							 if(sap.ui.getCore().byId("idNETAPDFDOWNLOADCheckBoxDownloadPDF") != undefined)
	 										sap.ui.getCore().byId("idNETAPDFDOWNLOADCheckBoxDownloadPDF").destroy();

	 								if(sap.ui.getCore().byId("idNETAPDFDOWNLOADCheckBoxDownloadPictures") != undefined)
	 										 sap.ui.getCore().byId("idNETAPDFDOWNLOADCheckBoxDownloadPictures").destroy();

	 								 var oNETAPDFDOWNLOADDownload = new sap.m.Popover("idNETAPDFDOWNLOADDownload",{
	 												 //title: "Download",
	 												 //modal: true,
	 												 showHeader:false,
	 												 placement: sap.m.PlacementType.Bottom,
	 												 content: new sap.m.VBox({
	 																								 //width:"300px",
	 																								 items:  [

	 																									 new sap.ui.commons.CheckBox("idNETAPDFDOWNLOADCheckBoxDownloadPDF",{
	 															 		                	 text : "Estimate",
	 															 		          			   checked : true
	 																								 }).addStyleClass("pdfexcelcheckboxes1"),

	 																								 new sap.ui.commons.CheckBox("idNETAPDFDOWNLOADCheckBoxDownloadPictures",{
	 														 		                	 text : "Pictures",
	 														 		          			   checked : false
	 																							 	}).addStyleClass("pdfexcelcheckboxes1"),

	 																								new sap.ui.commons.Button({
	  																					          text: "Download",
	  																					          visible:true,
	  																					          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	  																					          press:function(oEvent){

			 																										if(sap.ui.getCore().byId("idNETAPDFDOWNLOADCheckBoxDownloadPDF").getChecked())
			 																											oCurrent.getPdfFromSap(orders,serialnos, "P");	// PDF
			 																										if(sap.ui.getCore().byId("idNETAPDFDOWNLOADCheckBoxDownloadPictures").getChecked())
			 																												oCurrent.getPdfFromSap(orders,serialnos, "Z"); // ZIP of PICS

	  																					          }}).addStyleClass("marginTop10")

	 																								 ]
	 																								 }),

	 												 }).addStyleClass("sapUiPopupWithPadding");

	 								 			 oNETAPDFDOWNLOADDownload.openBy(oEvent.getSource());
	 		      	   }

	 		      	//}

      			 }
      		 }).bindProperty("text", "Wocost"),
      		 resizable:true,//downloadDNJS
             //sortProperty: "Newavlb",
             //filterProperty: "Material",
    		 }));

				 oTableNAULSummary.addColumn(new sap.ui.table.Column({
				 	width: "100px",
				 		 //label: new sap.ui.commons.Label({text: "Max. Gross Weight", textAlign : sap.ui.core.TextAlign.End}),
				 	multiLabels: [new sap.ui.commons.Label({
				 					text: "Estimate Amt. USD",
				 					textAlign : sap.ui.core.TextAlign.End
				 				}).addStyleClass("wraptextcol"),
				 				new sap.m.HBox({
				 					items : [
				 				new sap.ui.commons.TextField({
				 					placeholder: ">1333",
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
				 							sQuery = parseFloat(sQuery);
				 						}else{
				 							sQuery = sQuery.substr(1);
				 							sQuery = parseFloat(sQuery);
				 						}
				 							var filter = new sap.ui.model.Filter("WocostUSDfil", filterOperator, sQuery);
				 							aFilters.push(filter);
				 						}
				 						}
				 						var binding = oTableNAULSummary.getBinding("rows");
				 						binding.filter(aFilters, "Application");
				 					}
				 				})
				 				]
				 				})
				 		],
				 		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "WocostUSD").addStyleClass("wraptext"),
				 		 resizable:true,
				 			 //sortProperty: "Newavlb",
				 			 //filterProperty: "Material",
				 	 }));

					 oTableNAULSummary.addColumn(new sap.ui.table.Column({
					  width: "100px",
					 		//label: new sap.ui.commons.Label({text: "Max. Gross Weight", textAlign : sap.ui.core.TextAlign.End}),
					  multiLabels: [new sap.ui.commons.Label({
					 				 text: "Lessee Cost",
					 				 textAlign : sap.ui.core.TextAlign.End
					 			 }).addStyleClass("wraptextcol"),
					 			 new sap.m.HBox({
					 				 items : [
					 			 new sap.ui.commons.TextField({
					 				 placeholder: ">1333",
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
					 						 sQuery = parseFloat(sQuery);
					 					 }else{
					 						 sQuery = sQuery.substr(1);
					 						 sQuery = parseFloat(sQuery);
					 					 }
					 						 var filter = new sap.ui.model.Filter("Lesseecostfil", filterOperator, sQuery);
					 						 aFilters.push(filter);
					 					 }
					 					 }
					 					 var binding = oTableNAULSummary.getBinding("rows");
					 					 binding.filter(aFilters, "Application");
					 				 }
					 			 })
					 			 ]
					 			 })
					 	 ],
					 		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Lesseecost").addStyleClass("wraptext"),
					 		resizable:true,
					 			//sortProperty: "Newavlb",
					 			//filterProperty: "Material",
					 	}));

					 oTableNAULSummary.addColumn(new sap.ui.table.Column({
					 	width: "100px",
					 		 //label: new sap.ui.commons.Label({text: "Max. Gross Weight", textAlign : sap.ui.core.TextAlign.End}),
					 	multiLabels: [new sap.ui.commons.Label({
					 					text: "Lessee Cost USD",
					 					textAlign : sap.ui.core.TextAlign.End
					 				}).addStyleClass("wraptextcol"),
					 				new sap.m.HBox({
					 					items : [
					 				new sap.ui.commons.TextField({
					 					placeholder: ">1333",
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
					 							sQuery = parseFloat(sQuery);
					 						}else{
					 							sQuery = sQuery.substr(1);
					 							sQuery = parseFloat(sQuery);
					 						}
					 							var filter = new sap.ui.model.Filter("LesseecostUSDfil", filterOperator, sQuery);
					 							aFilters.push(filter);
					 						}
					 						}
					 						var binding = oTableNAULSummary.getBinding("rows");
					 						binding.filter(aFilters, "Application");
					 					}
					 				})
					 				]
					 				})
					 		],
					 		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "LesseecostUSD").addStyleClass("wraptext"),
					 		 resizable:true,
					 			 //sortProperty: "Newavlb",
					 			 //filterProperty: "Material",
					 	 }));

						 oTableNAULSummary.addColumn(new sap.ui.table.Column({
						  width: "100px",
						 	 //label: new sap.ui.commons.Label({text: "Max. Gross Weight", textAlign : sap.ui.core.TextAlign.End}),
						  multiLabels: [new sap.ui.commons.Label({
						 				text: "Rep. AUTH Amt.",
						 				textAlign : sap.ui.core.TextAlign.End
						 			}).addStyleClass("wraptextcol"),
						 			new sap.m.HBox({
						 				items : [
						 			new sap.ui.commons.TextField({
						 				placeholder: ">1333",
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
						 						sQuery = parseFloat(sQuery);
						 					}else{
						 						sQuery = sQuery.substr(1);
						 						sQuery = parseFloat(sQuery);
						 					}
						 						var filter = new sap.ui.model.Filter("Authcostfil", filterOperator, sQuery);
						 						aFilters.push(filter);
						 					}
						 					}
						 					var binding = oTableNAULSummary.getBinding("rows");
						 					binding.filter(aFilters, "Application");
						 				}
						 			})
						 			]
						 			})
						 	],
						 	 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Authcost").addStyleClass("wraptext"),
						 	 resizable:true,
						 		 //sortProperty: "Newavlb",
						 		 //filterProperty: "Material",
						  }));

						 oTableNAULSummary.addColumn(new sap.ui.table.Column({
						  width: "100px",
						 		//label: new sap.ui.commons.Label({text: "Max. Gross Weight", textAlign : sap.ui.core.TextAlign.End}),
						  multiLabels: [new sap.ui.commons.Label({
						 				 text: "Rep. AUTH Amt. USD",
						 				 textAlign : sap.ui.core.TextAlign.End
						 			 }).addStyleClass("wraptextcol"),
						 			 new sap.m.HBox({
						 				 items : [
						 			 new sap.ui.commons.TextField({
						 				 placeholder: ">1333",
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
						 						 sQuery = parseFloat(sQuery);
						 					 }else{
						 						 sQuery = sQuery.substr(1);
						 						 sQuery = parseFloat(sQuery);
						 					 }
						 						 var filter = new sap.ui.model.Filter("AuthcostUSDfil", filterOperator, sQuery);
						 						 aFilters.push(filter);
						 					 }
						 					 }
						 					 var binding = oTableNAULSummary.getBinding("rows");
						 					 binding.filter(aFilters, "Application");
						 				 }
						 			 })
						 			 ]
						 			 })
						 	 ],
						 		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "AuthcostUSD").addStyleClass("wraptext"),
						 		resizable:true,
						 			//sortProperty: "Newavlb",
						 			//filterProperty: "Material",
						 	}));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		 width: "75px",
    		 visible: false,
      		 //label: new sap.ui.commons.Label({text: "Work Order", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 multiLabels: [new sap.ui.commons.Label({
	                text: "Work Order"
	              }).addStyleClass("wraptextcol"),
		     new sap.ui.commons.TextField({
		       placeholder: "Work Order",
		       width: "80px",
		       liveChange: function(oEvent) {
		         // add filter for search
		         var aFilters = [];
		         var sQuery = oEvent.getParameter("liveValue");
		         if (sQuery && sQuery.length > 0) {
		           var filter = new sap.ui.model.Filter("Worder", sap.ui.model.FilterOperator.Contains, sQuery);
		           aFilters.push(filter);
		         }
		         var binding = oTableNAULSummary.getBinding("rows");
		         binding.filter(aFilters, "Application");
		       }
		     })
		   ],
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Worder").addStyleClass("wraptext"),
      		 resizable:true,
             //sortProperty: "Newavlb",
             //filterProperty: "Material",
    		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idWocrdate",{
    		 width: "100px",
    		 //visible: "{isRepairAwap}",
      		 //label: new sap.ui.commons.Label({text: "Estimate Date", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 multiLabels: [new sap.ui.commons.Label({
                 text: "Estimate Date",
                 textAlign : sap.ui.core.TextAlign.End
               }).addStyleClass("wraptextcol"),
               new sap.m.HBox({
             	  items : [
               new sap.ui.commons.TextField({
                 placeholder: ">20171231",
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
                     var filter = new sap.ui.model.Filter("Wocrdatefil", filterOperator, sQuery);
                     aFilters.push(filter);
                   }
                   }
                   var binding = oTableNAULSummary.getBinding("rows");
                   binding.filter(aFilters, "Application");
                 }
               })
               ]
               })
        		],
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Wocrdate").addStyleClass("wraptext"),
      		 resizable:true,
             //sortProperty: "Newavlb",
             //filterProperty: "Material",
    		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column("idWochdate",{
    		 width: "100px",
    		 //visible: "{isRepairAppd}",
      		 //label: new sap.ui.commons.Label({text: "Approved Date", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		 multiLabels: [new sap.ui.commons.Label({
                 text: "Approved Date",
                 textAlign : sap.ui.core.TextAlign.End
               }).addStyleClass("wraptextcol"),
               new sap.m.HBox({
             	  items : [
               new sap.ui.commons.TextField({
                 placeholder: ">20171231",
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
                     var filter = new sap.ui.model.Filter("Wochdatefil", filterOperator, sQuery);
                     aFilters.push(filter);
                   }
                   }
                   var binding = oTableNAULSummary.getBinding("rows");
                   binding.filter(aFilters, "Application");
                 }
               })
               ]
               })
        	],
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Wochdate").addStyleClass("wraptext"),
      		 resizable:true,
             //sortProperty: "Newavlb",
             //filterProperty: "Material",
    		 }));

    	oTableNAULSummary.addColumn(new sap.ui.table.Column({
    		width: "75px",
      		 //label: new sap.ui.commons.Label({text: "NBV (USD)", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
    		multiLabels: [new sap.ui.commons.Label({
                text: "NBV (USD)",
                textAlign : sap.ui.core.TextAlign.End
              }).addStyleClass("wraptextcol"),
              new sap.m.HBox({
            	  items : [
              new sap.ui.commons.TextField({
                placeholder: ">154",
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
                		sQuery = parseFloat(sQuery);
                	}else{
                		sQuery = sQuery.substr(1);
                		sQuery = parseFloat(sQuery);
                	}
                    var filter = new sap.ui.model.Filter("Nbvfil", filterOperator, sQuery);
                    aFilters.push(filter);
                  }
                  }
                  var binding = oTableNAULSummary.getBinding("rows");
                  binding.filter(aFilters, "Application");
                }
              })
              ]
              })
       	],
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Nbv").addStyleClass("wraptext"),
      		 resizable:true,
             //sortProperty: "Newavlb",
             //filterProperty: "Material",
    		 }));

    	var repNAULFlex = new sap.m.FlexBox({
			items: [   oTableNAULSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("xmarginTop10");

			return repNAULFlex;

	},

	/* DOWNLOADPDF - Get PDF from SAP */

	getPdfFromSap : function(sorder, serialnos, filetype){

		// if(filetype == "Z"){
    //   if(jsonSDASHM3Documents.length == 0 && jsonSDASHM3Pictures.length == 0){
    //       return;
    //   }
    // }

		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		busyDialog.open();

		var sRead = "/pdfSet(Sorder='" + sorder + "',IvDownload='" + filetype + "',Serialnos='" + serialnos + "')" + "/$value" ;

	       oModel.read( sRead, null, null, true, function(oData, oResponse){
	    	  busyDialog.close();
              var pdfURL = oResponse.requestUri;
              window.open(pdfURL);
	        },function(error){
	        	busyDialog.close();
	            alert("Read failed");
	        });

	},

	getDataUnitLevel: function(region, country, city, pcate, pclass, matnr, colId, level, statText, depot){
		globalEquipmentType = pcate;
		if(level == 'Country Level'){
			city = '';
		}
		else if(level == 'Region Level'){
			city = '';
			country = '';
		}
		var isRepair = false, isRepairAwap = false, isRepairAppd = false;
		// if(colId == "NWAP"){
		// 	sap.ui.getCore().byId("idLeaseColCertificates").setVisible(true);
		// 	sap.ui.getCore().byId("idWocost").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomer").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomerName").setVisible(true);
		// 	//sap.ui.getCore().byId("idAwapDnjs").setVisible(true);
		// 	sap.ui.getCore().byId("idWocrdate").setVisible(true);
		// 	sap.ui.getCore().byId("idWochdate").setVisible(false);
		// 	isRepair = true;
		// 	isRepairAwap = true;
		// }else if(colId == "AUTH" || colId == "HOLD"){
		// 	sap.ui.getCore().byId("idLeaseColCertificates").setVisible(true);
		// 	sap.ui.getCore().byId("idWocost").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomer").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomerName").setVisible(true);
		// 	//sap.ui.getCore().byId("idAwapDnjs").setVisible(false);
		// 	sap.ui.getCore().byId("idWocrdate").setVisible(false);
		// 	sap.ui.getCore().byId("idWochdate").setVisible(true);
		// 	isRepair = true;
		// 	isRepairAppd = true;
		// }else if(colId == "TTLS"){
		// 	sap.ui.getCore().byId("idLeaseColCertificates").setVisible(true);
		// 	sap.ui.getCore().byId("idLeaseColCertificates").setVisible(false);
		// 	sap.ui.getCore().byId("idAwapCustomer").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomerName").setVisible(true);
		// 	//sap.ui.getCore().byId("idAwapDnjs").setVisible(true);
		// 	sap.ui.getCore().byId("idWocost").setVisible(true);
		// 	sap.ui.getCore().byId("idWocrdate").setVisible(true);
		// 	sap.ui.getCore().byId("idWochdate").setVisible(true);
		// 	isRepair = true;
		// 	isRepairAppd = true;
		// 	isRepairAwap = true;
		// }else{
		// 	sap.ui.getCore().byId("idLeaseColCertificates").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomer").setVisible(true);
		// 	sap.ui.getCore().byId("idAwapCustomerName").setVisible(true);
		// 	//sap.ui.getCore().byId("idAwapDnjs").setVisible(false);
		// 	sap.ui.getCore().byId("idWocost").setVisible(false);
		// 	sap.ui.getCore().byId("idWocrdate").setVisible(false);
		// 	sap.ui.getCore().byId("idWochdate").setVisible(false);
		// 	isRepair = false;
		// 	isRepairAppd = false;
		// 	isRepairAwap = false;
		// }

		if(colId == "WEST"){
			sap.ui.getCore().byId("idAwapCustomer").setVisible(true);
			sap.ui.getCore().byId("idAwapCustomerName").setVisible(true);
			//sap.ui.getCore().byId("idAwapDnjs").setVisible(false);
		}else{
			sap.ui.getCore().byId("idAwapCustomer").setVisible(true);
			sap.ui.getCore().byId("idAwapCustomerName").setVisible(true);
			//sap.ui.getCore().byId("idAwapDnjs").setVisible(true);
		}

		if(pcate == "TANKS" || pcate == matnrtemp){
			globalIsTanks = true;
			sap.ui.getCore().byId("idDclean").setVisible(true);
			sap.ui.getCore().byId("idLcgdesc").setVisible(true);
			sap.ui.getCore().byId("idNexttesttype").setVisible(true);
			sap.ui.getCore().byId("idNexttestdate").setVisible(true);
			sap.ui.getCore().byId("idUnno").setVisible(true);
		}else{
			globalIsTanks = false;
			sap.ui.getCore().byId("idDclean").setVisible(false);
			sap.ui.getCore().byId("idLcgdesc").setVisible(false);
			sap.ui.getCore().byId("idNexttesttype").setVisible(false);
			sap.ui.getCore().byId("idNexttestdate").setVisible(false);
			sap.ui.getCore().byId("idUnno").setVisible(false);
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
			sap.ui.getCore().byId("idEquiUnittype").setVisible(true);
			sap.ui.getCore().byId("idEquiUnittypeDesc").setVisible(true);
		}else{
			sap.ui.getCore().byId("idEquiUnittype").setVisible(false);
			sap.ui.getCore().byId("idEquiUnittypeDesc").setVisible(false);
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

		var fnetaLinkERPReq = fnetaLinkERP + "?$filter=LvReq eq 'X' and Inmregion eq '" + mregion + "' and Inregion eq '" + region + "' and Incountry eq '" + country + "' and Incity eq '" + city + "' and Indepot eq '" + depot
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

				var customer = "";
				var dnjs = "";
				var splitValuesReq = [];
				var fLoc = null;
				var manDate = null;
				var statDate = "";
				FNASummaryArrayReq = data.results;
				FNAERPDataReq = [];
				jsonInventorynaUnitLevel = [];
				for(var j=0;j<FNASummaryArrayReq.length;j++){

					splitValuesReq = FNASummaryArrayReq[j].Erpdata.split("$");
					var requestedSel = "";
					if(pcate == matnrtemp){
						requestedSel = "Category : " + pcate;
						requestedSel = requestedSel + " || " + " Status : " + statText;
						sap.ui.getCore().byId("naUnitLevel").setTitle(requestedSel);
					}else{

						if(level == 'Country Level'){
							splitValuesReq[11] = '';
						}
						else if(level == 'Region Level'){
							splitValuesReq[11] = '';
							splitValuesReq[10] = '';
						}

						requestedSel = "Region : " + splitValuesReq[9];
						requestedSel = requestedSel + " || " + " Country : " + splitValuesReq[10];
						requestedSel = requestedSel + " || " + " City : " + splitValuesReq[11];
						requestedSel = requestedSel + " || " + " Category : " + splitValuesReq[4];
						requestedSel = requestedSel + " || " + " Material Type : " + splitValuesReq[5];
						requestedSel = requestedSel + " || " + " Status : " + statText;
						sap.ui.getCore().byId("naUnitLevel").setTitle(requestedSel);
					}

					manDate = splitValuesReq[15] + "-" + splitValuesReq[14];
					if(splitValuesReq[8] != ""){
						fLoc = splitValuesReq[8];
						fLoc = fLoc.substr(fLoc.length - 4);
					}

					statDate = "";

					if(splitValuesReq[27] != ""){
						statDate = splitValuesReq[27];
					}
					else if(splitValuesReq[28] != ""){
						statDate = splitValuesReq[28];
					}
					else if(splitValuesReq[29] != ""){
						statDate = splitValuesReq[29];
					}
					else if(splitValuesReq[30] != ""){
						statDate = splitValuesReq[30];
					}
					else if(splitValuesReq[31] != ""){
						statDate = splitValuesReq[31];
					}

					if(statDate != ""){
						  //var vSendDate = statDate.split("(");
						  //var vDate = vSendDate[1].split(")");
						  //var vActualSendDate = new Date(Number(vDate[0])); //dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy');
						  var splitDate = statDate.split(".");
						  var day = splitDate[0];
						  var month = splitDate[1];
						  var year = splitDate[2];
						  var vSndDate = new Date(year, month-1, day);
						  var vToday = new Date();
						  var timeDiff = Math.abs(vToday.getTime() - vSndDate.getTime());
						  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					}

					if(splitValuesReq[41] != ""){
						customer = splitValuesReq[41].split('#')[0];
						//dnjs = splitValuesReq[41].split('#')[1];
					}else{
						customer = "";
						//dnjs = "";
					}

					if(splitValuesReq[23] != ""){
						  var splitDateGate = splitValuesReq[23].split(".");
						  var dayGate = splitDateGate[0];
						  var monthGate = splitDateGate[1];
						  var yearGate = splitDateGate[2];
						  var vSndDateGate = new Date(yearGate, monthGate-1, dayGate);
						  var vTodayGate = new Date();
						  var timeDiffGate = Math.abs(vTodayGate.getTime() - vSndDateGate.getTime());
						  var diffDaysGate = Math.ceil(timeDiffGate / (1000 * 3600 * 24));
					}

					FNAERPDataReq.push({
						"Equnr" : splitValuesReq[0],
						"Region" : splitValuesReq[1],
						"Country" : splitValuesReq[2],
						"City" : splitValuesReq[3],
						"Pcate" : splitValuesReq[4],
						"Matnr" : splitValuesReq[5],
						"Maktx" : splitValuesReq[47],
						"Sernr" : splitValuesReq[6],
						"Objnr" : splitValuesReq[7],
						"Floc" : fLoc,
						"ZRegDesc" : splitValuesReq[9],
						"ZCouDesc" : splitValuesReq[10],
						"ZCityDesc" : splitValuesReq[11],
						"Name" : splitValuesReq[12],
						"Status" : splitValuesReq[13],
						"manDate" : manDate,
						"Mapar" : splitValuesReq[16],
						"Manufacturer" : splitValuesReq[17],
						"Manmodel" : splitValuesReq[18],
						"Manserno" : splitValuesReq[19],
						"Age" : splitValuesReq[20],
						"Lcgdesc" : splitValuesReq[21],
						"Dclean" : splitValuesReq[22],
						"Dgatin" : splitValuesReq[23],
						"Dcleanfil" : (splitValuesReq[22] != "")?splitValuesReq[22].substr(6,4) + splitValuesReq[22].substr(3,2) + splitValuesReq[22].substr(0,2):"",
						"Dgatinfil" : (splitValuesReq[23] != "")?splitValuesReq[23].substr(6,4) + splitValuesReq[23].substr(3,2) + splitValuesReq[23].substr(0,2):"",
						"GrWeight" : splitValuesReq[24],
						"TrWeight" : splitValuesReq[25],
						"GrWeightfil" : (splitValuesReq[24] != "")?splitValuesReq[24].split(',').join(''):"",
						"TrWeightfil" : (splitValuesReq[25] != "")?splitValuesReq[24].split(',').join(''):"",
					    "Nbvfil" : (splitValuesReq[32] != "")?splitValuesReq[32].split(',').join(''):"",
						"Plangroup" : splitValuesReq[26],
						"Dawap" : splitValuesReq[27],
						"Dhold" : splitValuesReq[28],
						"Dauth" : splitValuesReq[29],
						"Davlb" : splitValuesReq[30],
						"Davlb" : splitValuesReq[31],
						"Nbv" : splitValuesReq[32],
						"Saps" : splitValuesReq[40],
						"Subtype" : splitValuesReq[56],
						"Customer" : customer,
						"Dnjs" : dnjs,
						"Customername" : splitValuesReq[42],
						"Booked" : (splitValuesReq[43] == "")?"":"Yes",
						"Booking" : (splitValuesReq[43] == "")?"":String(parseInt(splitValuesReq[43])),
						"Ndays" : diffDays,
						"NdaysGate" : diffDaysGate,
						"Currency" : splitValuesReq[39],
						"Wocost" : splitValuesReq[38],
						"Worder" : splitValuesReq[35],
						"Wocrdate" : splitValuesReq[36],
						"Wochdate" : splitValuesReq[37],

						"Nexttesttype" : splitValuesReq[45],
						"Nexttestdate" : splitValuesReq[44],
						"Nexttestdatefil" : (splitValuesReq[44] != "")?splitValuesReq[44].substr(6,4) + splitValuesReq[44].substr(3,2) + splitValuesReq[44].substr(0,2):"",
						"Unno" : splitValuesReq[46],

						"WocostUSD" : splitValuesReq[49],
						"Lesseecost" : splitValuesReq[50],
						"LesseecostUSD" : splitValuesReq[51],
						"Authcost" : splitValuesReq[52],
						"AuthcostUSD" : splitValuesReq[53],
						"EstimType" : splitValuesReq[54],
						"Grade" : splitValuesReq[55],

						"isRepair" : isRepair,
						"isRepairAwap" : isRepairAwap,
						"isRepairAppd" : isRepairAppd,
						"isTank" : (splitValuesReq[4] == "TANKS")? true: false,
						"Wocostfil" : (splitValuesReq[38] != "")?splitValuesReq[38].split(',').join(''):"",

						"WocostUSDfil" : (splitValuesReq[49] != "")?splitValuesReq[49].split(',').join(''):"",
						"Lesseecostfil" : (splitValuesReq[50] != "")?splitValuesReq[50].split(',').join(''):"",
						"LesseecostUSDfil" : (splitValuesReq[51] != "")?splitValuesReq[51].split(',').join(''):"",
						"Authcostfil" : (splitValuesReq[52] != "")?splitValuesReq[52].split(',').join(''):"",
						"AuthcostUSDfil" : (splitValuesReq[53] != "")?splitValuesReq[53].split(',').join(''):"",

						"Wocrdatefil" : (splitValuesReq[36] != "")?splitValuesReq[36].substr(6,4) + splitValuesReq[36].substr(3,2) + splitValuesReq[36].substr(0,2):"",
						"Wochdatefil" : (splitValuesReq[37] != "")?splitValuesReq[37].substr(6,4) + splitValuesReq[37].substr(3,2) + splitValuesReq[37].substr(0,2):"",
					});

					jsonInventorynaUnitLevel.push({
						"Equipment" : splitValuesReq[0],
						"Sub Type" : splitValuesReq[56],
						"Category" : splitValuesReq[4],
						"Unit Type" : splitValuesReq[5],
						"Unit Type Desc" : splitValuesReq[47],
						"Region" : splitValuesReq[9],
						"Country" : splitValuesReq[10],
						"City" : splitValuesReq[11],
						"Depot Code" : fLoc,
						"Depot" : splitValuesReq[12],
						"Status" : splitValuesReq[13],
						"Manuf. Date" : manDate,
						"Manuf. Part Num" : splitValuesReq[16],
						"Manufacturer" : splitValuesReq[17],
						"Man Model" : splitValuesReq[18],
						"Man Serial No" : splitValuesReq[19],
						"Age" : splitValuesReq[20],
						"Last Cargo Desc" : splitValuesReq[21],
						"Last Cleaning Date" : splitValuesReq[22],
						"Last Gate In Date" : splitValuesReq[23],
						"Max. Gross Weight" : splitValuesReq[24],
						"Tare Weight" : splitValuesReq[25],
						"NBV(USD)" : splitValuesReq[32],
						"SAP Status" : splitValuesReq[40],
						"Customer" : customer,
						"Customername" : splitValuesReq[42],
						"Lease" : splitValuesReq[48],
						"Booked?" : (splitValuesReq[43] == "")?"":"Yes",
						"Booking Ref." : (splitValuesReq[43] == "")?"":String(parseInt(splitValuesReq[43])),
						"No. of Days in Status" : diffDays,
						"IN Days" : diffDaysGate,


						"Next Test Type" : splitValuesReq[45],
						"Next Test Date" : splitValuesReq[44],
						"UN No." : splitValuesReq[46],

						"Estimate No." : splitValuesReq[35],
						"Estimate Date" : (colId == "NWAP")? splitValuesReq[36]: '',
						"Approved Date" : (colId == "APPD" || colId == "HOLD")? splitValuesReq[37]: '',
						"Currency" : splitValuesReq[39],
						"Estimate Amt." : splitValuesReq[38],
						"Estimate Amt. USD" : splitValuesReq[49],
						"Lessee Cost" : splitValuesReq[50],
						"Lessee Cost USD" : splitValuesReq[51],
						"Rep. Auth Amt." : splitValuesReq[52],
						"Rep. Auth Amt. USD" : splitValuesReq[53],
						"Estimate Type" : splitValuesReq[54]
						//"Lease" : splitValuesReq[55]

					})	;

				}

			    var updateString = 'Equipment Level Details';
			    //sap.ui.getCore().byId("idLNAULUpdate").setText(updateString);

	    		var oModelEDIFLASummaryReq = new sap.ui.model.json.JSONModel();
	    		oModelEDIFLASummaryReq.setData({modelData: FNAERPDataReq});
	        	sap.ui.getCore().byId("idTableNAULSummary").setModel(oModelEDIFLASummaryReq);
	        	sap.ui.getCore().byId("idTableNAULSummary").bindRows("/modelData");

	            /*if (FNAERPDataReq.length < 25){
	            	sap.ui.getCore().byId("idTableNAULSummary").setVisibleRowCount(FNAERPDataReq.length);
	            	sap.ui.getCore().byId("idTableNAULSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	            }
	  	    	else{
	  	    		sap.ui.getCore().byId("idTableNAULSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	    		sap.ui.getCore().byId("idTableNAULSummary").setVisibleRowCount(25);
	  	    	}*/

	        	var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
	        	if(visiblerowcount){
	        		visiblerowcount = parseInt(visiblerowcount);
	        	}else{
	        		visiblerowcount = 20;
	        	}
	            if (FNAERPDataReq.length < visiblerowcount){
	            	sap.ui.getCore().byId("idTableNAULSummary").setVisibleRowCount(visiblerowcount);
	            	//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	            }
	        	else{
	        		//sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        		sap.ui.getCore().byId("idTableNAULSummary").setVisibleRowCount(visiblerowcount);
	        	}
	        	/*var oTable = sap.ui.getCore().byId("idTableFNASummary");          //Get Hold of table
		        var oScrollBar = oTable._oHSb;               //Get Hold of Horizontal Scroll Bar
		        oScrollBar.setScrollPosition(0);*/
	        	app.to("naUnitLevel");
				busyDialog.close();
			}
		    },
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP ERP System");
		    });
	},

	downloadDNJS : function(serial){

    	busyDialog.open();
    	debugger;
    	//oModel = new sap.ui.model.odata.ODataModel(fnetaLinkERP, true);
		var urlToCallDNDownload = fnetaLinkDNDownload + "(Serialno='" + serial + "')";
		OData.request({
		      requestUri: urlToCallDNDownload,
		      method: "GET",
		      dataType: 'json',
		      headers:
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0",
		          "X-CSRF-Token":"Fetch"
		      }
		    },
		    function (data, response){
		    	busyDialog.close();
		    	//get ext
		    	if(data.Content){
		    	var ext = 'pdf';
//		    	var ext = data.FileExt.toLowerCase();
		    	//get file content
		    	var byteCharacters = atob(data.Content);
				var byteNumbers = new Array(byteCharacters.length);
				for (var i = 0; i < byteCharacters.length; i++) {
				   byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				var byteArray = new Uint8Array(byteNumbers);
		    	var crnFileMimeType = jQuery.grep(fileTypeJson, function(element, index){
					return element.fileextension == ext;
				});
					contentType = crnFileMimeType[0].mimetype;
					var blob = new Blob([byteArray], {type: contentType});
					//var blobUrl = URL.createObjectURL(blob);
					//window.open(blobUrl);
					if ((navigator.appName == 'Microsoft Internet Explorer') ||
			                 (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
				         	 {
								 window.navigator.msSaveOrOpenBlob(blob, title+'.'+ext);
				         	 }else{
				         		var blobUrl = URL.createObjectURL(blob);
								window.open(blobUrl);
				         	 }
		    	}else{
					sap.ui.commons.MessageBox.show("No document found",
                            sap.ui.commons.MessageBox.Icon.ERROR,
                            "Error",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    	}

		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while Mail Contents : "+ window.JSON.stringify(err.response));
		    });
    }

});

function isInArray(value, array) {
	  return array.indexOf(value) > -1;
	}
