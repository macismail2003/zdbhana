var FNASummaryArrayDepot = [];
sap.ui.model.json.JSONModel.extend("newnaDepotLevel", {

	createDepotPopup : function(){
		// Table
//    	var oTableFNASummaryDepotLevel = new sap.ui.table.Table("idTableFNASummaryDepotLevel",{
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

		    	var oTableFNASummaryDepotLevel = new sap.ui.table.Table({
		            columnHeaderHeight: 60,
		            selectionMode: sap.ui.table.SelectionMode.None,
		            width:"100%",
		            showNoData: true,
		            visibleRowCount: 10
		    	}).addStyleClass("fontStyle tblBorder");

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    	width: "110px",
		   		visible:true,
		   		label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
		   		template: new sap.ui.commons.TextView().bindProperty("text", "Depot").addStyleClass("wraptext"),
		   		resizable:false,
		   		//sortProperty: "ZRegDesc",
		          //filterProperty: "ZRegDesc",
		 		 }));


		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
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

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
			    	width: "200px",
			   		visible:true,
			   		label: new sap.ui.commons.Label({text: "Name"}).addStyleClass("wraptextcol"),
			   		template: new sap.ui.commons.TextView().bindProperty("text", "Name").addStyleClass("wraptext"),
			   		resizable:false,
			   		//sortProperty: "ZRegDesc",
			          //filterProperty: "ZRegDesc",
			 		 }));

		    	// Turn In Advised

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
				 label: new sap.ui.commons.Label({text: "Outst. RA", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
				 hAlign: sap.ui.core.HorizontalAlign.End,
				 template: new sap.m.Link({
			 			enabled: '{enabledTind}',
			 			visible: true,
						textAlign : sap.ui.core.TextAlign.End,
							press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("Region");
			   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
			   					var city = oEvent.getSource().getBindingContext().getProperty("City");
			   					city = city.substr(0,3);
			   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
			   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
			   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
			   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
			   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			   					/*var bus = sap.ui.getCore().getEventBus();
			   			  	  	bus.publish("nav", "to", {
			   			        id : "naTINLevel"
			   				  	});*/
			   					var oNALTIN = new newnaTINLevel();
			   					oNALTIN.getDataTINLevel(region, country, city, pcate, pclass, matnr, "REDEL", selectedRadio, "Turn In for Depot Stock", depot);
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
					 }));

		// AWaiting Estimate...

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		 		 label: new sap.ui.commons.Label({text: "WEST", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 		hAlign: sap.ui.core.HorizontalAlign.End,
		 		template: new sap.m.Link({
		 			enabled: '{enabledWest}',
		 			visible: true,
					textAlign : sap.ui.core.TextAlign.End,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//		   			  		var bus = sap.ui.getCore().getEventBus();
//		   			  	  	bus.publish("nav", "to", {
//		   			        id : "naUnitLevel"
//		   				  	});
		   			  	  	//app.to("naUnitLevel");
		   					var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AWAP", selectedRadio, "WEST", depot);
		   					}
		   					else{

		   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AWAP", selectedRadio, "WEST", depot);
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
				 }));

		    	// AWaiting Estimate...

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    	width: "70px",
		 		label: new sap.ui.commons.Label({text: "AWAP", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		 		hAlign: sap.ui.core.HorizontalAlign.End,
		 		template: new sap.m.Link({
		 			enabled: '{enabledNwap}',
		 			visible: true,
					textAlign : sap.ui.core.TextAlign.End,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");

		   					var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NWAP", selectedRadio, "AWAP", depot);
		   					}
		   					else{

		   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NWAP", selectedRadio, "AWAP", depot);
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
				 }));

		    	// Authorized

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "AUTH", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledAuth}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");

		   					var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AUTH", selectedRadio, "APPD", depot);
		   					}
		   					else{
		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AUTH", selectedRadio, "APPD", depot);
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
				 }));

		// HOLD...

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		    		label: new sap.ui.commons.Label({text: "HOLD", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
			  		hAlign: sap.ui.core.HorizontalAlign.End,
			  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledHold}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");

		   					var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "HOLD", selectedRadio, "Put On Hold", depot);
		   					}
		   					else{

		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "HOLD", selectedRadio, "Put On Hold", depot);
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
				 }));

		    	// CW Available

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		 width: "70px",

		    		 label: new sap.ui.commons.Label({text: "CW AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		    		 hAlign: sap.ui.core.HorizontalAlign.End,
		    		 template: new sap.m.Link({
		    			 enabled: '{enabledCavlb}',
		    			 visible: true,
		    			 styleClass: "lightblue",
		    			 textAlign : sap.ui.core.TextAlign.End,
		   				 press : function(oEvent) {
		   					var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");
		   			  	  	var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAVLB", selectedRadio, "Available", depot);
		   					}
		   					else{
		   	   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAVLB", selectedRadio, "Available", depot);
		   					}

		   				}
		   			}).bindProperty("text", "Cavlb",function(cellValue){
		   				if(cellValue == 0){
		   					cellValue = '';
		   				}
		    		return cellValue;
		   			}).addStyleClass("wraptext"),
		    		 resizable:false,
		    	}));

					// CW Available

					oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
						 width: "70px",

						 label: new sap.ui.commons.Label({text: "CW AUTH", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
						 hAlign: sap.ui.core.HorizontalAlign.End,
						 template: new sap.m.Link({
							 enabled: '{enabledCauth}',
							 visible: true,
							 styleClass: "lightblue",
							 textAlign : sap.ui.core.TextAlign.End,
							 press : function(oEvent) {
								var region = oEvent.getSource().getBindingContext().getProperty("Region");
								var country = oEvent.getSource().getBindingContext().getProperty("Country");
								var city = oEvent.getSource().getBindingContext().getProperty("City");
								city = city.substr(0,3);
								var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
								var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
								var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
								var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
								var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
					//					  		var bus = sap.ui.getCore().getEventBus();
					//					  	  	bus.publish("nav", "to", {
					//					        id : "naUnitLevel"
					//						  	});
									//app.to("naUnitLevel");
										var oNAUL = new newnaUnitLevel();
								if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
																	sap.ui.commons.MessageBox.Icon.WARNING,
																	"Please Wait...",
																	[sap.ui.commons.MessageBox.Action.OK],
																	sap.ui.commons.MessageBox.Action.OK);*/
									oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAUTH", selectedRadio, "CW AUTH", depot);
								}
								else{
										oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "CAUTH", selectedRadio, "CW AUTH", depot);
								}

							}
						}).bindProperty("text", "Cauth",function(cellValue){
							if(cellValue == 0){
								cellValue = '';
							}
						return cellValue;
						}).addStyleClass("wraptext"),
						 resizable:false,
					}));

		    	// Depot Available

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		 width: "70px",

		    		 label: new sap.ui.commons.Label({text: "Depot AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		    		 hAlign: sap.ui.core.HorizontalAlign.End,
		    		 template: new sap.m.Link({
		    			 enabled: '{enabledAvlb}',
		    			 visible: true,
		    			 styleClass: "lightblue",
		    			 textAlign : sap.ui.core.TextAlign.End,
		   				 press : function(oEvent) {
		   					var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");
		   			  	  	var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   						oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AVLB", selectedRadio, "Available", depot);
		   					}
		   					else{
		   	   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "AVLB", selectedRadio, "Available", depot);
		   					}

		   				}
		   			}).bindProperty("text", "Avlb",function(cellValue){
		   				if(cellValue == 0){
		   					cellValue = '';
		   				}
		    		return cellValue;
		   			}).addStyleClass("wraptext"),
		    		 resizable:false,
		    	}));

		    	// Depot Booked

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "Depot Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledBook}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naBookingLevel"
//						  	});
									globalBookingLeaseRem = "L";
					  	  	app.to("naBookingLevel");
		   					var oNABL = new newnaBookingLevel();
		   					if(FNACRMDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "BOOK", selectedRadio, "Booked", depot);
		   					}
		   					else{
		   					oNABL.setDataBookingLevel(region, country, city, pcate, pclass, matnr, "BOOK", selectedRadio, "Booked", depot);
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
		    	}));


		    	// 	Depot Reservations

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "Depot RSRV", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledReser}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naBookingLevel"
//						  	});
									globalBookingLeaseRem = "L";
					  	  	app.to("naBookingLevel");
		   					var oNABL = new newnaBookingLevel();
		   					if(FNACRMDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "RESER", selectedRadio, "Depot Reservations", depot);
		   					}
		   					else{
		   					oNABL.setDataBookingLevel(region, country, city, pcate, pclass, matnr, "RESER", selectedRadio, "Depot Reservations", depot);
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
				 }));

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		     		width: "80px",
		  		 label: new sap.ui.commons.Label({text: "Depot Net AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		 		 template: new sap.ui.commons.TextView({
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
		 		 }));

		    	// Available NEW

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "Capex AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledNavlb}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");

		   					var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
							oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NAVLB", selectedRadio, "Capex Available", depot);
		   					}
		   					else{
		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "NAVLB", selectedRadio, "Capex Available", depot);
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
				 }));

		    // Booked at factory level

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "Capex Booked", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledNbook}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naBookingLevel"
//						  	});
									globalBookingLeaseRem = "L";
					  	  	app.to("naBookingLevel");
		   					var oNABL = new newnaBookingLevel();
		   					if(FNACRMDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "NBOOK", selectedRadio, "Capex Booked", depot);
		   					}
		   					else{
		   					oNABL.setDataBookingLevel(region, country, city, pcate, pclass, matnr, "NBOOK", selectedRadio, "Capex Booked", depot);
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
				 }));

		    	/* MAC25112016_CAPRES+ */

		    	// Capex Reservations

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "Capex RSRV", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledNreser}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naBookingLevel"
//						  	});
									globalBookingLeaseRem = "L";
					  	  	app.to("naBookingLevel");
		   					var oNABL = new newnaBookingLevel();
		   					if(FNACRMDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNABL.getDataBookingLevel(region, country, city, pcate, pclass, matnr, "NRESER", selectedRadio, "Capex Reservations", depot);
		   					}
		   					else{
		   					oNABL.setDataBookingLevel(region, country, city, pcate, pclass, matnr, "NRESER", selectedRadio, "Capex Reservations", depot);
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
				 }));

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		     		width: "80px",
		  		 label: new sap.ui.commons.Label({text: "Capex Net AVLB", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		 		 template: new sap.ui.commons.TextView({
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
		 		 }));

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
				     		width: "80px",
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
				 		 }));

		    	// Total Stock

		    	oTableFNASummaryDepotLevel.addColumn(new sap.ui.table.Column({
		    		width: "70px",
		  		 label: new sap.ui.commons.Label({text: "Total Stock", textAlign : sap.ui.core.TextAlign.End}).addStyleClass("wraptextcol"),
		  		hAlign: sap.ui.core.HorizontalAlign.End,
		  		template: new sap.m.Link({
					textAlign : sap.ui.core.TextAlign.End,
					enabled: '{enabledTtls}',
					visible: true,
						press : function(oEvent) {
							var region = oEvent.getSource().getBindingContext().getProperty("Region");
		   					var country = oEvent.getSource().getBindingContext().getProperty("Country");
		   					var city = oEvent.getSource().getBindingContext().getProperty("City");
		   					city = city.substr(0,3);
		   					var depot = oEvent.getSource().getBindingContext().getProperty("Depot");
		   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
		   					var pclass = oEvent.getSource().getBindingContext().getProperty("Pclass");
		   					var matnr = oEvent.getSource().getBindingContext().getProperty("Matnr");
		   					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
//					  		var bus = sap.ui.getCore().getEventBus();
//					  	  	bus.publish("nav", "to", {
//					        id : "naUnitLevel"
//						  	});
					  	  	//app.to("naUnitLevel");

		   					var oNAUL = new newnaUnitLevel();
		   					if(FNAERPDataConc.length == 0){
								/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Please Wait...",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);*/
		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "TTLS", selectedRadio, "Total Stock", depot);
		   					}
		   					else{
		   					oNAUL.getDataUnitLevel(region, country, city, pcate, pclass, matnr, "TTLS", selectedRadio, "Total Stock", depot);
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
				 }));



		    	var depotcontact = [];
		    	FNASummaryArrayDepot = [];
		    	for(var i=0; i<data.results.length; i++){
		        if(data.results[i].Erpdata != ""){
		        	depotcontact = data.results[i].Erpdata.split('$');
		        }
		    	FNASummaryArrayDepot.push({
		    		"Mregion": data.results[i].Mregion.split('$')[0],	// DNANEW +
		    		"ZMregDesc": data.results[i].Mregion.split('$')[1],	// DNANEW +
		    		"Region": data.results[i].Region,
		    		"isNormal": (data.results[i].Region == "AAA" || data.results[i].Region == "ZZZ")?false:true,
    				"Country": data.results[i].Country,
    				"City": (data.results[i].Citycod == "")?"":(data.results[i].Citycod + "-" + data.results[i].Country),
    				"Depot": data.results[i].Depot,	// DNANEW +
    				"Name": data.results[i].UnitDesc,	// DNANEW +
		    		"Pcate": data.results[i].Pcate,
		    		"Pclass": data.results[i].Pclass,	// DNANEW +
    				"Matnr": data.results[i].Matnr,
    				"ZRegDesc":data.results[i].ZRegDesc,
    				"ZCouDesc":data.results[i].ZCouDesc,
    				"ZCityDesc":data.results[i].ZCityDesc,
    				"Conc":data.results[i].Conc,
    				"Avlb": data.results[i].Avlb,
    				"Navlb": data.results[i].Navlb,
    				"Cavlb": data.results[i].Cavlb,
    				"Auth": data.results[i].Auth,
						"Cauth": data.results[i].Cauth,
    				"Book": data.results[i].Book,
    				"Nbook": data.results[i].Nbook,
    				"Reser": data.results[i].Reser,
    				"Hold": data.results[i].Hold,
    				"Ttls": data.results[i].Ttls,
    				"West": data.results[i].West,
    				"Nwap": data.results[i].Nwap,
    				"Nattl": data.results[i].Nattl,
    				"Nadep": data.results[i].Nadep,
    				"Nanew": data.results[i].Nanew,

    				"Street": depotcontact[0],
    				"Postal": depotcontact[1],
    				"Depotcity": depotcontact[2],
    				"Phone": depotcontact[3],
    				"Fax": depotcontact[4],
    				"Email": depotcontact[5],
    				"Pcr": depotcontact[6],
    				"Notes": depotcontact[7],

    				"Redel": data.results[i].Redel,
    				"Nredel": data.results[i].Nredel,
    				"Tdi": (data.results[i].Tdi == 99999999)? 0: data.results[i].Tdi,
					"Tci": (data.results[i].Tci == 99999999)? 0: data.results[i].Tci,
    				"Odi": data.results[i].Odi,
    				"Oci": data.results[i].Oci,
    				"Por": data.results[i].Por,

    				"Rpr": data.results[i].Rpr,
    				"Trp": data.results[i].Trp,

    				"enabledRedel": (data.results[i].Redel == 0)? false: true,
		    		"enabledNredel": (data.results[i].Nredel == 0)? false: true,
    				"enabledTdi": (data.results[i].Tdi == 0)? false: true,
		    		"enabledTci": (data.results[i].Tci == 0)? false: true,
    				"enabledOdi": (data.results[i].Odi == 0)? false: true,
		    		"enabledOci": (data.results[i].Oci == 0)? false: true,
		    		"enabledPor": (data.results[i].Por == 0)? false: true,
		    		"enabledRpr": (data.results[i].Rpr == 0)? false: true,
		    		"enabledTrp": (data.results[i].Trp == 0)? false: true,


    				"enabledAvlb": (data.results[i].Avlb == 0)? false: true,
    				"enabledCavlb": (data.results[i].Cavlb == 0)? false: true,
    				"enabledNavlb": (data.results[i].Navlb == 0)? false: true,
    				"enabledAuth": (data.results[i].Auth == 0)? false: true,
						"enabledCauth": (data.results[i].Cauth == 0)? false: true,
					"enabledBook": (data.results[i].Book == 0)? false: true,
    				"enabledNbook": (data.results[i].Nbook == 0)? false: true,
    				"enabledReser": (data.results[i].Reser == 0)? false: true,
    				"enabledHold": (data.results[i].Hold == 0)? false: true,
		    		"enabledTtls": (data.results[i].Ttls == 0)? false: true,
    				"enabledWest": (data.results[i].West == 0)? false: true,
    				"enabledNwap": (data.results[i].Nwap == 0)? false: true,
    				"enabledNadep": (data.results[i].Nadep == 0)? false: true,
    				"enabledNanew": (data.results[i].Nanew == 0)? false: true,
    				"enabledNattl": (data.results[i].Nattl == 0)? false: true,

    						"Nreser": data.results[i].Nreser,
    						"enabledNreser": (data.results[i].Nreser == 0)? false: true,


    						"AvlbFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Avlb,
	   		    			"NavlbFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Navlb,
	   		    			"CavlbFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Cavlb,
	   		    			"AuthFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Auth,
	   		    			"BookFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Book,
	   		    			"NbookFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Nbook,
	   		    			"RedelFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Redel,
	   		    			"NredelFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Redel,
	   		    			"ReserFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Reser,
	   		    			"NreserFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Nreser,
	   		    			"HoldFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Hold,
	   		    			"TtlsFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Ttls,
	   		    			"WestFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].West,
	   		    			"NwapFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Nwap,
	   		    			"NattlFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Nwap,
	   		    			"NadepFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Nadep,
	   		    			"NanewFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Nanew,
	   		    			"TdiFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Tdi,
	   		    			"TciFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Tci,
	   		    			"TrpFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Trp,
	   				   		"RprFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Rpr,
	   		    			"OdiFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Odi,
	   		    			"OciFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Oci,
	   		    			"PorFil" : (data.results[i].Region == "AAA")?"999999":data.results[i].Por
	    			});
		    	}

		    	console.log("No. of depots found for ",citydesc, " is ",i);
		    	var oModelFNASummaryDepotLevel = new sap.ui.model.json.JSONModel();
		    	oModelFNASummaryDepotLevel.setData({modelData: FNASummaryArrayDepot});
	    		oTableFNASummaryDepotLevel.setModel(oModelFNASummaryDepotLevel);
	    		oTableFNASummaryDepotLevel.bindRows("/modelData");

	    		var FNASummaryArrayDepotLength = FNASummaryArrayDepot.length;
              	if(FNASummaryArrayDepotLength < 6){
              		oTableFNASummaryDepotLevel.setVisibleRowCount(FNASummaryArrayDepotLength);
              		oTableFNASummaryDepotLevel.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
              	}
              	else{
              		oTableFNASummaryDepotLevel.setVisibleRowCount(5);
              		oTableFNASummaryDepotLevel.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
              	}

		    	if(sap.ui.getCore().byId("idPopoverFNASummaryDepotLevel") != undefined)
		          	 sap.ui.getCore().byId("idPopoverFNASummaryDepotLevel").destroy();

		   		 var oPopoverFNASummaryDepotLevel = new sap.m.Popover("idPopoverFNASummaryDepotLevel",{
		   			   contentWidth : "95%",
		               title: citydesc + " | " + matnr,
		               modal: true,
		               //placement: sap.m.PlacementType.Top,
		               footer:  new sap.m.Bar({
		              	 					visible : true,
		              	 					contentMiddle: [
                                                new sap.m.Label({
                                                     	text: "Pickup Credit/Charge : " + FNASummaryArrayDepot[0].Pcr + " USD " + FNASummaryArrayDepot[0].Notes
                                                     })
                                                ],

		                                      contentRight: [
		                                                    new sap.m.Button({
		                                                                     text: "Close",
		                                                                     //type: sap.m.ButtonType.Reject,
		                                                                     icon: "sap-icon://close",
		                                                                     press: function () {
		                                                                  	   sap.ui.getCore().byId("idPopoverFNASummaryDepotLevel").close();
		                                                                     }
		                                                                     })
		                                                    ],
		                                      }),
		               content: new sap.m.VBox({
		                                       //width:"300px",
		                                       items:  [oTableFNASummaryDepotLevel]
		                                       }),

		               }).addStyleClass("sapUiPopupWithPadding");

		   		 oPopoverFNASummaryDepotLevel.openBy(icon);


			}
		    },
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP ERP System");
		    });
	}
});
