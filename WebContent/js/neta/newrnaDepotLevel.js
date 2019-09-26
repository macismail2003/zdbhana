var FRNASummaryArrayDepot = [];
sap.ui.model.json.JSONModel.extend("newrnaDepotLevel", {

	createDepotPopup : function(){
		// Table
//    	var oTableFRNASummaryDepotLevel = new sap.ui.table.Table("idTableFRNASummaryDepotLevel",{
//            columnHeaderHeight: 60,
//            selectionMode: sap.ui.table.SelectionMode.None,
//            width:"99%",
//            showNoData: true,
//            visibleRowCount: 10,
//            navigationMode: sap.ui.table.NavigationMode.Paginator
//    	}).addStyleClass("fontStyle tblBorder");
	},

	getDepotLines : function(filterString, citydesc, matnr, selectedRadio, icon){

		busyDialog.open();
		OData.request({
		      requestUri: filterString,
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
		    	busyDialog.close();
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

		    	var oTableFRNASummaryDepotLevel = new sap.ui.table.Table({
		            columnHeaderHeight: 60,
		            selectionMode: sap.ui.table.SelectionMode.None,
		            width:"100%",
		            showNoData: true,
		            visibleRowCount: 10,
		    	}).addStyleClass("fontStyle tblBorder");

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    	width: "110px",
		   		visible:true,
		   		label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
		   		template: new sap.ui.commons.TextView().bindProperty("text", "Depot").addStyleClass("wraptext"),
		   		resizable:false,
		   		//sortProperty: "ZRegDesc",
		          //filterProperty: "ZRegDesc",
		 		 }));


		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
			    	width: "110px",
			   		visible:true,
			   		label: new sap.ui.commons.Label({text: "Address"}).addStyleClass("wraptextcol"),
			   		template: new sap.ui.core.Icon( {
				           src : sap.ui.core.IconPool.getIconURI("address-book"),
				           size : "18px",
				           color : "red",
				           activeColor : "red",
				           activeBackgroundColor : "white",
				           hoverColor : "green",
				           hoverBackgroundColor : "white",
				           width : "18px",
				           visible: true,
				           press : function(oEvent){
			   		        	var street = oEvent.getSource().getParent().getBindingContext().getProperty("Street");
			   		        	var postal = oEvent.getSource().getParent().getBindingContext().getProperty("Postal");
			   		        	var depotcity = oEvent.getSource().getParent().getBindingContext().getProperty("Depotcity");
			   		        	var phone = oEvent.getSource().getParent().getBindingContext().getProperty("Phone");
			   		        	var fax = oEvent.getSource().getParent().getBindingContext().getProperty("Fax");
			   		        	var email = oEvent.getSource().getParent().getBindingContext().getProperty("Email");
			   		        	var depotname = oEvent.getSource().getParent().getBindingContext().getProperty("Name");

			   		        	/* DepotName */

			                    var oDepotTableStatusMonitorDepotContactValueDepotName = new sap.m.Label({
			                                                                  text : depotname,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelDepotName = new sap.m.Label({
			                        text : "Name : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValueDepotName,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexDepotName = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelDepotName,
			                                                                           oDepotTableStatusMonitorDepotContactValueDepotName
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });

			   		        	/* Address */

			                    var oDepotTableStatusMonitorDepotContactValueAddress = new sap.m.Label({
			                                                                  text : street,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
			                        text : "Address : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValueAddress,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelAddress,
			                                                                           oDepotTableStatusMonitorDepotContactValueAddress
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });

			                    /* City */

			                    var oDepotTableStatusMonitorDepotContactValueCity = new sap.m.Label({
			                                                                  text : depotcity,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelCity = new sap.m.Label({
			                        text : "City : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValueAddress,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexCity = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelCity,
			                                                                           oDepotTableStatusMonitorDepotContactValueCity
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });

			                    /* Postal Code */

			                    var oDepotTableStatusMonitorDepotContactValuePostal = new sap.m.Label({
			                                                                  text : postal,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
			                        text : "Postal Code : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValuePostal,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelPostal,
			                                                                           oDepotTableStatusMonitorDepotContactValuePostal
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });

			                    /* Fax */

			                    var oDepotTableStatusMonitorDepotContactValueFax = new sap.m.Label({
			                                                                  text : fax,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelFax = new sap.m.Label({
			                        text : "Fax : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValueFax,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelFax,
			                                                                           oDepotTableStatusMonitorDepotContactValueFax
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });

			                    /* Phone */

			                    var oDepotTableStatusMonitorDepotContactValuePhone = new sap.m.Label({
			                                                                  text : phone,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
			                        text : "Phone : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValuePhone,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelPhone,
			                                                                           oDepotTableStatusMonitorDepotContactValuePhone
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });

			                    /* Mail ID */

			                    var oDepotTableStatusMonitorDepotContactValueMailid = new sap.m.Label({
			                                                                  text : email,
			                                                                  }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
			                        text : "Mail : ",
			                        labelFor: oDepotTableStatusMonitorDepotContactValueMailid,
			                        width : "100px"
			                        }).addStyleClass("selectionLabels");

			                    var oDepotTableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
			                                                                   items: [oDepotTableStatusMonitorDepotContactLabelMailid,
			                                                                           oDepotTableStatusMonitorDepotContactValueMailid
			                                                                           ],
			                                                                   direction: "Row"
			                                                                   });



			                    var oDepotTableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
			                        items: [//oDepotTableStatusMonitorDepotContactFlexDepotName,
			                                //oDepotTableStatusMonitorDepotContactFlexLocation,
			                                oDepotTableStatusMonitorDepotContactFlexDepotName,
			                                oDepotTableStatusMonitorDepotContactFlexAddress,
			                                oDepotTableStatusMonitorDepotContactFlexCity,
			                                //oDepotTableStatusMonitorDepotContactFlexRegion,
			                                oDepotTableStatusMonitorDepotContactFlexPostal,
			                                oDepotTableStatusMonitorDepotContactFlexFax,
			                                oDepotTableStatusMonitorDepotContactFlexPhone,
			                                oDepotTableStatusMonitorDepotContactFlexMailid
			                                ],
			                        direction: "Column"
			                        });

			                    if(sap.ui.getCore().byId("idDepotTableStatusMonitorDepotContact") != undefined)
			                   	 sap.ui.getCore().byId("idDepotTableStatusMonitorDepotContact").destroy();

			   				 var oDepotTableStatusMonitorDepotContact = new sap.m.Popover("idDepotTableStatusMonitorDepotContact",{
			                        title: "Depot Contact",
			                        contentWidth: "500px",
			                        modal: true,
			                        placement: sap.m.PlacementType.Right,
			                        footer:  new sap.m.Bar({
			                                               contentRight: [
			                                                             new sap.m.Button({
			                                                                              text: "Close",
			                                                                              //type: sap.m.ButtonType.Reject,
			                                                                              icon: "sap-icon://close",
			                                                                              press: function () {
			                                                                           	   sap.ui.getCore().byId("idDepotTableStatusMonitorDepotContact").close();
			                                                                              }
			                                                                              })
			                                                             ],
			                                               }),
			                        content: new sap.m.VBox({
			                                                //width:"300px",
			                                                items:  [oDepotTableStatusMonitorDepotContactFlex]
			                                                }),

			                        }).addStyleClass("sapUiPopupWithPadding");
			   				oDepotTableStatusMonitorDepotContact.openBy(oEvent.getSource());

			   		       }
				       } ),
			   		resizable:false,
			   		//sortProperty: "ZRegDesc",
			          //filterProperty: "ZRegDesc",
			 		 }));

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
			    	width: "200px",
			   		visible:true,
			   		label: new sap.ui.commons.Label({text: "Name"}).addStyleClass("wraptextcol"),
			   		template: new sap.ui.commons.TextView().bindProperty("text", "Name").addStyleClass("wraptext"),
			   		resizable:false,
			   		//sortProperty: "ZRegDesc",
			          //filterProperty: "ZRegDesc",
			 		 }));

		    	// Turn In Advised

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "Outst. RA", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						visible: '{enabledSredel}',
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNALTIN = new newnaTINLevel();
			   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "SREDEL", selectedRadio, "Turn In for Sale Stock", depot);
							}
						}).bindProperty("text", "Sredel",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));

		    	// CW OWM Booking

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "CW OWM Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						visible: '{enabledCwbook}',
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNALTIN = new newnaTINLevel();
			   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "CBOOK", selectedRadio, "CW OWM Booked", depot);
							}
						}).bindProperty("text", "Cwbook",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));

		    	// SALE CFDS

		    	/*oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "SALE CFDS", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						enabled: '{enabledSbook}',
						visible: '{enabledSbook}',
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("ZRegDescR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDescR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDescR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();

			   					var oNALTIN = new newnaTINLevel();
			   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "SBOOK", selectedRadio, "SALE CFDS", depot);
							}
						}).bindProperty("text", "SbookR",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));*/

					 // CW Grade 2 AVLB

					 oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
						 width: "85px",
					label: new sap.ui.commons.Label({text: "CW \n Grade 2 AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
					hAlign: sap.ui.core.HorizontalAlign.End,
					template: new sap.m.Link({
						 textAlign : sap.ui.core.TextAlign.End,
						 visible: '{enabledCwavlb2}',
							 press : function(oEvent) {
								 var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
									 var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
									 var city = oEvent.getSource().getBindingContext().getProperty("CityR");
									 var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
									 var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
									 var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
									 var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
									 var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
									 /*var bus = sap.ui.getCore().getEventBus();
											 bus.publish("nav", "to", {
											 id : "naTINLevel"
										 });*/
									 var oNARL = new newnaRemarkLevel();
									 oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWAVLB2", selectedRadio, "CW Grade 2 AVLB", depot);
							 }
						 }).bindProperty("text", "Cwavlb2",function(cellValue){
								 if(cellValue == 0){
									 cellValue = '';
								 }
							 return cellValue;
							 }).addStyleClass("wraptext"),
						resizable:false,
								//sortProperty: "Redel",
								//filterProperty: "Conc",
						}));


		    	// SALE AWAP

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "SALE AWAP", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						visible: '{enabledSaleawap}',
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNARL = new newnaRemarkLevel();
			   					oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "SALEAWAP", selectedRadio, "SALE AWAP", depot);
							}
						}).bindProperty("text", "Saleawap",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));


		    	// CW Grade 2 AUTH

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "CW \n Grade 2 AUTH", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						visible: '{enabledCwauth2}',
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNARL = new newnaRemarkLevel();
			   					oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWAUTH2", selectedRadio, "CW Grade 2 AUTH", depot);
							}
						}).bindProperty("text", "Cwauth2",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));

					 // IICL Grade 1 NET

					 oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
					 	width: "85px",
					 label: new sap.ui.commons.Label({text: "IICL \n Grade 1 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
					 hAlign: sap.ui.core.HorizontalAlign.End,
					 template: new sap.m.Link({
					 	textAlign : sap.ui.core.TextAlign.End,
					 	  //visible: '{enabledIicl1}',
					 		press : function(oEvent) {
					 			var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
					 				var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
					 				var city = oEvent.getSource().getBindingContext().getProperty("CityR");
					 				var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
					 				var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
					 				var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
					 				var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
					 				var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
					 				/*var bus = sap.ui.getCore().getEventBus();
					 						bus.publish("nav", "to", {
					 						id : "naTINLevel"
					 					});*/
					 				var oNARL = new newnaRemarkLevel();
					 				oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "IICL1", selectedRadio, "IICL Grade 1 NET", depot);
					 		}
					 	}).bindProperty("text", "Iicl1",function(cellValue){
					 			if(cellValue == 0){
					 				cellValue = '';
					 			}
					 		return cellValue;
					 		}).addStyleClass("wraptext"),
					  resizable:false,
					 		 //sortProperty: "Redel",
					 		 //filterProperty: "Conc",
					  }));

						// CW Sale Grade 2 NET

						oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
						 width: "85px",
						label: new sap.ui.commons.Label({text: "CW Sale\nGrade 2 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
						hAlign: sap.ui.core.HorizontalAlign.End,
						template: new sap.m.Link({
						 textAlign : sap.ui.core.TextAlign.End,
						 //visible: '{enabledCwsale2}',
							 press : function(oEvent) {
								 var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
									 var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
									 var city = oEvent.getSource().getBindingContext().getProperty("CityR");
									 var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
									 var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
									 var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
									 var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
									 var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
									 /*var bus = sap.ui.getCore().getEventBus();
											 bus.publish("nav", "to", {
											 id : "naTINLevel"
										 });*/
									 var oNARL = new newnaRemarkLevel();
									 oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "CWSALE2", selectedRadio, "CW Sale Grade 2 NET", depot);
							 }
						 }).bindProperty("text", "Cwsale2",function(cellValue){
								 if(cellValue == 0){
									 cellValue = '';
								 }
							 return cellValue;
							 }).addStyleClass("wraptext"),
						 resizable:false,
								//sortProperty: "Redel",
								//filterProperty: "Conc",
						 }));

		    	// As Is Grade 3 NET

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "As Is Grade 3 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						//visible: '{enabledAsis3}',
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNARL = new newnaRemarkLevel();
			   					oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS3", selectedRadio, "As Is Grade 3 NET", depot);
							}
						}).bindProperty("text", "Asis3",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));

					 // As Is Grade 4 NET

 		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
 		    		width: "85px",
 				 label: new sap.ui.commons.Label({text: "As Is Grade 4 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 				 hAlign: sap.ui.core.HorizontalAlign.End,
 				 template: new sap.m.Link({
 						textAlign : sap.ui.core.TextAlign.End,
 						//visible: '{enabledAsis4}',
 							press : function(oEvent) {
 								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
 			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
 			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
 			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
 			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
 			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
 			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
 			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
 			   					/*var bus = sap.ui.getCore().getEventBus();
 			   			  	  	bus.publish("nav", "to", {
 			   			        id : "naTINLevel"
 			   				  	});*/
 			   					var oNARL = new newnaRemarkLevel();
 			   					oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS4", selectedRadio, "As Is Grade 4 NET", depot);
 							}
 						}).bindProperty("text", "Asis4",function(cellValue){
 			   				if(cellValue == 0){
 			   					cellValue = '';
 			   				}
 			    		return cellValue;
 			   			}).addStyleClass("wraptext"),
 			 		 resizable:false,
 			         //sortProperty: "Redel",
 			         //filterProperty: "Conc",
 					 }));

					 // As Is Grade 5 NET

					 oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
					  width: "85px",
					 label: new sap.ui.commons.Label({text: "As Is Grade 5 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
					 hAlign: sap.ui.core.HorizontalAlign.End,
					 template: new sap.m.Link({
					  textAlign : sap.ui.core.TextAlign.End,
					  //visible: '{enabledAsis5}',
					 	 press : function(oEvent) {
					 		 var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
					 			 var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
					 			 var city = oEvent.getSource().getBindingContext().getProperty("CityR");
					 			 var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
					 			 var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
					 			 var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
					 			 var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
					 			 var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
					 			 /*var bus = sap.ui.getCore().getEventBus();
					 					 bus.publish("nav", "to", {
					 					 id : "naTINLevel"
					 				 });*/
					 			 var oNARL = new newnaRemarkLevel();
					 			 oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "ASIS5", selectedRadio, "As Is Grade 5 NET", depot);
					 	 }
					 }).bindProperty("text", "Asis5",function(cellValue){
					 		 if(cellValue == 0){
					 			 cellValue = '';
					 		 }
					 	 return cellValue;
					 	 }).addStyleClass("wraptext"),
					 resizable:false,
					 		//sortProperty: "Redel",
					 		//filterProperty: "Conc",
					 }));

					 // Trading IICL Grade 6 NET

 					oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
 					 width: "85px",
 					label: new sap.ui.commons.Label({text: "Trading IICL Grade 6 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
 					hAlign: sap.ui.core.HorizontalAlign.End,
 					template: new sap.m.Link({
 					 textAlign : sap.ui.core.TextAlign.End,
 					 //visible: '{enabledIicl6}',
 						press : function(oEvent) {
 							var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
 								var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
 								var city = oEvent.getSource().getBindingContext().getProperty("CityR");
 								var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
 								var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
 								var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
 								var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
 								var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
 								/*var bus = sap.ui.getCore().getEventBus();
 										bus.publish("nav", "to", {
 										id : "naTINLevel"
 									});*/
 								var oNARL = new newnaRemarkLevel();
 								oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "IICL6", selectedRadio, "Trading IICL Grade 6 NET", depot);
 						}
 					}).bindProperty("text", "Iicl6",function(cellValue){
 							if(cellValue == 0){
 								cellValue = '';
 							}
 						return cellValue;
 						}).addStyleClass("wraptext"),
 					resizable:false,
 						 //sortProperty: "Redel",
 						 //filterProperty: "Conc",
 					}));

					// WWT Grade 9 NET

					oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
					width: "85px",
					label: new sap.ui.commons.Label({text: "WWT Grade 9 NET", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
					hAlign: sap.ui.core.HorizontalAlign.End,
					template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					//visible: '{enabledWwt9}',
					 press : function(oEvent) {
						 var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
							 var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
							 var city = oEvent.getSource().getBindingContext().getProperty("CityR");
							 var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
							 var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
							 var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
							 var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
							 var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
							 /*var bus = sap.ui.getCore().getEventBus();
									 bus.publish("nav", "to", {
									 id : "naTINLevel"
								 });*/
							 var oNARL = new newnaRemarkLevel();
							 oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "WWT9", selectedRadio, "WWT Grade 9 NET", depot);
					 }
				 }).bindProperty("text", "Wwt9",function(cellValue){
						 if(cellValue == 0){
							 cellValue = '';
						 }
					 return cellValue;
					 }).addStyleClass("wraptext"),
					resizable:false,
						//sortProperty: "Redel",
						//filterProperty: "Conc",
					}));

		    	// Total Net AVLB

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    	width: "80px",
		  		label: new sap.ui.commons.Label({text: "Total\nNET AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					  visible: '{enabledNetavlb}',
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
		   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
		   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//		   					var bus = sap.ui.getCore().getEventBus();
//		   			  	  	bus.publish("nav", "to", {
//		   			        id : "naRemarkLevel"
//		   				  	});
		   					var oNARL = new newnaRemarkLevel();
		   					oNARL.getDataRemarkLevel(region, country, city, pcate, pclass, matnr, "NETAVLB", selectedRadio, "Total NET AVLB", "");

						}
					}).bindProperty("text", "Netavlb").addStyleClass("wraptext"),
		  		 resizable:false,
		         //sortProperty: "Conc",
		         //filterProperty: "Conc",
		    	}));

		    	// Sold without Serial No.

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    	width: "80px",
		  		label: new sap.ui.commons.Label({text: "Sold w/o Serial No.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					visible: '{enabledQbook}',
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
		   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
		   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
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
		   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "QBOOK", selectedRadio, "Sold w/o Serial No.", depot);
						}
					}).bindProperty("text", "Qbook").addStyleClass("wraptext"),
		  		 resizable:false,
		         //sortProperty: "Conc",
		         //filterProperty: "Conc",
		    	}));

		    	// Sold with Serial No.

		    	oTableFRNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "85px",
				 label: new sap.ui.commons.Label({text: "Sold with Serial No.", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
						textAlign : sap.ui.core.TextAlign.End,
						enabled: '{enabledSold}',
						visible: true,
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("RegionR");
			   					var country = oEvent.getSource().getBindingContext().getProperty("CountryR");
			   					var city = oEvent.getSource().getBindingContext().getProperty("CityR");
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("PcateR");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("PclassR");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("MaterialR");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNALTIN = new newnaTINLevel();
			   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "SOLD", selectedRadio, "Sold with Serial No.", depot);
							}
						}).bindProperty("text", "Sold",function(cellValue){
			   				if(cellValue == 0){
			   					cellValue = '';
			   				}
			    		return cellValue;
			   			}).addStyleClass("wraptext"),
			 		 resizable:false,
			         //sortProperty: "Redel",
			         //filterProperty: "Conc",
					 }));



		    	var depotcontact = [];
		    	FRNASummaryArrayDepot = [];
		    	for(var i=0; i<data.results.length; i++){
		        if(data.results[i].Erpdata != ""){
		        	depotcontact = data.results[i].Erpdata.split('$');
		        }
		    	FRNASummaryArrayDepot.push({

    				"Depot": data.results[i].Depot,	// DNANEW +
    				"Name": data.results[i].UnitDesc,	// DNANEW +
    				"Street": depotcontact[0],
    				"Postal": depotcontact[1],
    				"Depotcity": depotcontact[2],
    				"Phone": depotcontact[3],
    				"Fax": depotcontact[4],
    				"Email": depotcontact[5],
    				"Pcr": depotcontact[6],
    				"Notes": depotcontact[7],

    				"MregionR":data.results[i].Mregion,
		    		"RegionR":data.results[i].Region,
    				"CountryR":data.results[i].Country,
    				"CityR":data.results[i].City,
		    		"isNormal": (data.results[i].Region == "AAA" || data.results[i].Region == "ZZZ")?false:true,
    				"ZRegDescR":data.results[i].ZRegDesc,
    				"ZCouDescR":data.results[i].ZCouDesc,
    				"ZCityDescR":data.results[i].ZCityDesc,
		    		"PcateR": data.results[i].Pcate,
		    		"PclassR": data.results[i].Pclass,	// DNANEW +
    				"MaterialR": data.results[i].Matnr,
    				"Rpr": data.results[i].Rpr,

						"Sold": data.results[i].Sold,
						"SoldFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Sold,
						"enabledSold": (data.results[i].Sold == 0)? false: true,

						"Cwbook": data.results[i].Cwbook,
						"CwbookFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cwbook,
						"enabledCwbook": (data.results[i].Cwbook == 0)? false: true,

						"Cwavlb2": data.results[i].Cwavlb2,
						"Cwavlb2Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cwavlb2,
						"enabledCwavlb2": (data.results[i].Cwavlb2 == 0)? false: true,

						"Saleawap": data.results[i].Saleawap,
						"SaleawapFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Saleawap,
						"enabledSaleawap": (data.results[i].Saleawap == 0)? false: true,

						"Cwauth2": data.results[i].Cwauth2,
						"Cwauth2Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cwauth2,
						"enabledCwauth2": (data.results[i].Cwauth2 == 0)? false: true,

						"Iicl1": data.results[i].Iicl1,
						"Iicl1Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Iicl1,
						"enabledIicl1": (data.results[i].Iicl1 == 0)? false: true,

						"Cwsale2": data.results[i].Cwsale2,
						"Cwsale2Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cwsale2,
						"enabledCwsale2": (data.results[i].Cwsale2 == 0)? false: true,

						"Asis3": data.results[i].Asis3,
						"Asis3Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Asis3,
						"enabledAsis3": (data.results[i].Asis3 == 0)? false: true,

						"Asis4": data.results[i].Asis4,
						"Asis4Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Asis4,
						"enabledAsis4": (data.results[i].Asis4 == 0)? false: true,

						"Asis5": data.results[i].Asis5,
						"Asis5Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Asis5,
						"enabledAsis5": (data.results[i].Asis5 == 0)? false: true,

						"Iicl6": data.results[i].Iicl6,
						"Iicl6Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Iicl6,
						"enabledIicl6": (data.results[i].Iicl6 == 0)? false: true,

						"Wwt9": data.results[i].Wwt9,
						"Wwt9Fil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Wwt9,
						"enabledWwt9": (data.results[i].Wwt9 == 0)? false: true,

						"Netavlb": data.results[i].Netavlb,
						"NetavlbFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Netavlb,
						"enabledNetavlb": (data.results[i].Netavlb == 0)? false: true,

						"Sredel": data.results[i].Sredel,
						"SredelFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Sredel,
						"enabledSredel": (data.results[i].Sredel == 0)? false: true,

						"Sbook": data.results[i].Sbook,
						"SbookFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Sbook,
						"enabledSbook": (data.results[i].Sbook == 0)? false: true,

						"Qbook": data.results[i].Qbook,
						"QbookFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Qbook,
						"enabledQbook": (data.results[i].Qbook == 0)? false: true,

						"TriR": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
						"TriRFil": (data.results[i].Region == "AAA")?"999999":data.results[i].Tri,
						"enabledTriR": (data.results[i].Tri == 0)? false: true,

						"Cwshortsuprl": data.results[i].Cwshortsuprl,
						"CwshortsuprlFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cwshortsuprl,
						"enabledCwshortsuprl": (data.results[i].Cwshortsuprl == 0)? false: true,

						"TrpR": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
						"TrpRFil": (data.results[i].Region == "AAA")?"999999":data.results[i].Trp,
						"enabledTrpR": (data.results[i].Trp == 0)? false: true,

						"Leve": data.results[i].Leve

    			// 	"IiclR": (data.results[i].Iicl == 0)? "": data.results[i].Iicl,
    			// 	"CworthyR": (data.results[i].Cworthy == 0)? "": data.results[i].Cworthy,
    			// 	"AsisR": (data.results[i].Asis == 0)? "": data.results[i].Asis,
    			// 	"enabledAsis": (data.results[i].Asis == 0)? false: true,
    			// 	"Asis2R": (data.results[i].Asis2 == 0)? "": data.results[i].Asis2,
    			// 	"enabledAsis2": (data.results[i].Asis2 == 0)? false: true,
    			// 	"Asis3R": (data.results[i].Asis3 == 0)? "": data.results[i].Asis3,
    			// 	"enabledAsis3": (data.results[i].Asis3 == 0)? false: true,
					//
					//
    			// 	"UndrepR": data.results[i].Undrep,
					//
    			// 	"SoldR": data.results[i].Sold,
    			// 	"Sold1R": data.results[i].Sold1,
    			// 	"Sold2R": data.results[i].Sold2,
    			// 	"Sold3R": data.results[i].Sold3,
    			// 	"Sold4R": data.results[i].Sold4,
    			// 	"Sold5R": data.results[i].Sold5,
    			// 	"Sold6R": data.results[i].Sold6,
					//
    			// 	"SredelR": data.results[i].Sredel,
    			// 	"enabledSredel": (data.results[i].Sredel == 0)? false: true,
					//
					// "CwbookR": data.results[i].Cwbook,
    			// 	"enabledCwbook": (data.results[i].Cwbook == 0)? false: true,
					//
					// "SbookR": data.results[i].Sbook,
    			// 	"enabledSbook": (data.results[i].Sbook == 0)? false: true,
					//
					// "QbookR": data.results[i].Qbook,
    			// 	"enabledQbook": (data.results[i].Qbook == 0)? false: true,
					//
    			// 	"OwmepmR": data.results[i].Owmepm,
    			// 	"WestR": data.results[i].West,
    			// 	"OcwinvR": data.results[i].Ocwinv,
    			// 	"TriR": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
		    	// 	"TrpR": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
					//
    			// 	"IiclRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Iicl,
	    		// 	"CworthyRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cworthy,
	    		// 	"Asis2RFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Asis2,
	    		// 	"Asis3RFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Asis3,
	    		// 	"UndrepRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Undrep,
	    		// 	"SoldRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Sold,
	    		// 	"SredelRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Sredel,
	    		// 	"OwmepmRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Owmepm,
	    		// 	"WestRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].West,
	    		// 	"OcwinvRFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Ocwinv,
	    		// 	"TriRFil": (data.results[i].Region == "AAA")?"999999":data.results[i].Tri,
				  //   "TrpRFil": (data.results[i].Region == "AAA")?"999999":data.results[i].Trp,
					//
				  //   "SbookRFil": (data.results[i].Region == "AAA")?"999999":data.results[i].Sbook,
			   	// 	"QbookRFil": (data.results[i].Region == "AAA")?"999999":data.results[i].Qbook,
					//
					//
					//
    			// 	"Leve": data.results[i].Leve,
    			// 	"enabledIicl": (data.results[i].Iicl == 0)? false: true,
    			// 	"enabledCworthy": (data.results[i].Cworthy == 0)? false: true,
					//
					//   "enabledUndrep": (data.results[i].Undrep == 0)? false: true,
    			// 	"enabledSold": (data.results[i].Sold == 0)? false: true,
    			// 	"enabledOwmepm": (data.results[i].Owmepm == 0)? false: true,
    			// 	"enabledWest": (data.results[i].West == 0)? false: true
	    			});
		    	}

		    	console.log("No. of depots found for ",citydesc, " is ",i);
		    	var oModelFRNASummaryDepotLevel = new sap.ui.model.json.JSONModel();
		    	oModelFRNASummaryDepotLevel.setData({modelData: FRNASummaryArrayDepot});
	    		oTableFRNASummaryDepotLevel.setModel(oModelFRNASummaryDepotLevel);
	    		oTableFRNASummaryDepotLevel.bindRows("/modelData");

	    		var FRNASummaryArrayDepotLength = FRNASummaryArrayDepot.length;
              	if(FRNASummaryArrayDepotLength < 6){
              		oTableFRNASummaryDepotLevel.setVisibleRowCount(FRNASummaryArrayDepotLength);
              		oTableFRNASummaryDepotLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
              	}
              	else{
              		oTableFRNASummaryDepotLevel.setVisibleRowCount(5);
              		oTableFRNASummaryDepotLevel.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
              	}

		    	if(sap.ui.getCore().byId("idPopoverFRNASummaryDepotLevel") != undefined)
		          	 sap.ui.getCore().byId("idPopoverFRNASummaryDepotLevel").destroy();

		   		 var oPopoverFRNASummaryDepotLevel = new sap.m.Popover("idPopoverFRNASummaryDepotLevel",{
		   			   contentWidth : "95%",
		               title: citydesc + " | " + matnr,
		               modal: true,
		               //placement: sap.m.PlacementType.Top,
		               footer:  new sap.m.Bar({
		              	 					visible : true,
		              	 					contentMiddle: [
                                                new sap.m.Label({
                                                     	text: "Pickup Credit/Charge : " + FRNASummaryArrayDepot[0].Pcr + " USD " + FRNASummaryArrayDepot[0].Notes
                                                     })
                                                ],

		                                      contentRight: [
		                                                    new sap.m.Button({
		                                                                     text: "Close",
		                                                                     //type: sap.m.ButtonType.Reject,
		                                                                     icon: "sap-icon://close",
		                                                                     press: function () {
		                                                                  	   sap.ui.getCore().byId("idPopoverFRNASummaryDepotLevel").close();
		                                                                     }
		                                                                     })
		                                                    ],
		                                      }),
		               content: new sap.m.VBox({
		                                       //width:"300px",
		                                       items:  [oTableFRNASummaryDepotLevel]
		                                       }),

		               }).addStyleClass("sapUiPopupWithPadding");

		   		 oPopoverFRNASummaryDepotLevel.openBy(icon);


			}
		    },
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP ERP System");
		    });
	}
});
