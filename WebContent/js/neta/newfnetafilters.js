jQuery.sap.require("sap.ui.model.json.JSONModel");
var oPopoverFavorites = null;
sap.ui.model.json.JSONModel.extend("newfnetafilters", {

	createPanelFilter : function(){

		var oToolbarLocation = new sap.m.Toolbar("idNETAToolbarLocation",{
    		width:"99%",
    		//height: "90px",
    	}); //.addStyleClass("marginTop10")
    	oToolbarLocation.setDesign(sap.m.ToolbarDesign.Solid);

    	//oToolbarLocation.addItem(new sap.ui.commons.ToolbarSeparator());

    	var oItemTemplate = new sap.ui.core.Item({
    		  key : "{key}",
    		  text : "{text}"
    		});

    	var oMRegionCombo = new sap.m.MultiComboBox({
			id : "idMRegionCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Main Region...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeRegionCountryCityDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oMregionComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memMregionComboSelectedKeys", oMregionComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");

    	oToolbarLocation.insertContent(oMRegionCombo, 0);

    	var oRegionCombo = new sap.m.MultiComboBox({
			id : "idRegionCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Region...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeCountryCityDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oRegionComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memRegionComboSelectedKeys", oRegionComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");

    	oToolbarLocation.insertContent(oRegionCombo, 1);

    	var oCountryCombo = new sap.m.MultiComboBox({
			id : "idCountryCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Country...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeCityDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(control.mProperties.selectedKeys, "Country");
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oCountryComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memCountryComboSelectedKeys", oCountryComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");

    	oToolbarLocation.insertContent(oCountryCombo, 2);

    	var oCityCombo = new sap.m.MultiComboBox({
			id : "idCityCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "City...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeDepotFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(control.mProperties.selectedKeys, "City");
				//fnetaFilter.alterPageOne();	// DNANEW-
				busyDialog.close();
				/*DNANEW+
				var oCityComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memCityComboSelectedKeys", oCityComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo");

    	oToolbarLocation.insertContent(oCityCombo, 3);



    	//oToolbarLocation.insertContent(new sap.m.ToolbarSeparator().addStyleClass("toolbarSep"), 5);

    	var oToolbarUnitType = new sap.m.Toolbar("idNETAToolbarUnitType",{
    		width:"99%",
    		//height: "90px",
    	}); //.addStyleClass("marginTop10")
    	oToolbarUnitType.setDesign(sap.m.ToolbarDesign.Solid);

    	var oProCatCombo = new sap.m.MultiComboBox({
			id : "idProCatCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Product Category...", // string
			//editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			  items : {
				    path : "/items",
				    template : oItemTemplate
				  },
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeProClassUnitTypeFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(); /*DNANEW+*/
				busyDialog.close();
				/*DNANEW+
				var oProCatComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memProCatComboSelectedKeys", oProCatComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("unitCombo");

    	oToolbarUnitType.insertContent(oProCatCombo, 0);

    	var oProClassCombo = new sap.m.MultiComboBox({
			id : "idProClassCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Sub Category...", // string
			//editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			  items : {
				    path : "/items",
				    template : oItemTemplate
				  },
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {

			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				//if(control.mProperties.selectedKeys.length != 0)
					fnetaFilter.changeUnitTypeFilter(control.mProperties.selectedKeys, 1);
				//fnetaFilter.alterPageOne(); /*DNANEW+*/
				busyDialog.close();
				/*DNANEW+
				var oProClassComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memProClassComboSelectedKeys", oProClassComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("unitCombo");

    	oToolbarUnitType.insertContent(oProClassCombo, 1);

    	var oUnitTypeCombo = new sap.m.MultiComboBox({
			id : "idUnitTypeCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Unit Type...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("unitCombo");

    	oToolbarUnitType.insertContent(oUnitTypeCombo, 2);

    	var oLeasetypeCombo = new sap.m.MultiComboBox({
			id : "idLeasetypeCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			enabled : true, // boolean
			placeholder : "Lease Type...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("customerCombo");

    	oToolbarUnitType.insertContent(oLeasetypeCombo, 3);

    	var oReleasetypeCombo = new sap.m.MultiComboBox({
			id : "idReleasetypeCombo", // sap.ui.core.ID
			width : "20%", // sap.ui.core.CSSSize
			//height: "90px",
			visible : false,
			enabled : true, // boolean
			placeholder : "Release Type...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("customerCombo");

    	oToolbarUnitType.insertContent(oReleasetypeCombo, 4);

    	/* Other Filters */

    	var oOperatorModel = new sap.ui.model.json.JSONModel({
	    	   "symbol":[
	    	     {
	    	       "text":"=",
	    	       "key":"EQ",
	    	     },
	    	     {
	    	    	 "text":">",
		    	       "key":"GT",
	    	     },
	    	     {
	    	    	 "text":"<",
		    	       "key":"LT",
	    	     },
	    	     {
	    	    	 "text":"BT",
		    	       "key":"BT",
	    	     }
	    	   ]
	    	 });

    	var oToolbarOthers = new sap.m.Toolbar("idNETAToolbarOthers",{
    		width:"99%",
    		//height: "90px",
    	}); //.addStyleClass("marginTop10")
    	oToolbarUnitType.setDesign(sap.m.ToolbarDesign.Solid);

    	var oSymbolAge =   new sap.m.ComboBox("idSymbolAge",
		        {
		        		  width : "90px",
		                  items : {
		                         path : "/symbol",
		                         template : new sap.ui.core.ListItem(
		                         {
		                               text : "{text}",
		                               key : "{key}"
		                         })
		                  },
		                  selectionChange : function(oEvent){
		                	  var sel = oEvent.getParameter("selectedItem").getProperty("key");
	                        	 if(sel == "BT"){
	                        		 sap.ui.getCore().byId("idInputAge2").setValue("");
	                        		 sap.ui.getCore().byId("idInputAge2").setVisible(true);
	                        	 }else{
	                        		 sap.ui.getCore().byId("idInputAge2").setValue("");
	                        		 sap.ui.getCore().byId("idInputAge2").setVisible(false);
	                        	 }
		                  }
		        }).setModel(oOperatorModel).setSelectedKey("EQ");
    	oToolbarOthers.insertContent(oSymbolAge, 1);

    	var oInputAge = new sap.m.Input("idInputAge", {
    		placeholder : "Age",
			maxLength : 3,
			type : sap.m.InputType.Number,
			width : "100px"
		});//.addStyleClass("marginTop10 marginBottom10");
    	oToolbarOthers.insertContent(oInputAge, 2);

    	var oInputAge2 = new sap.m.Input("idInputAge2", {
    		placeholder : "Age",
    		visible : false,
			maxLength : 3,
			type : sap.m.InputType.Number,
			width : "100px"
		});//.addStyleClass("marginTop10 marginBottom10");
    	oToolbarOthers.insertContent(oInputAge2, 3);

    	oToolbarOthers.insertContent(new sap.m.ToolbarSeparator().addStyleClass("toolbarSep"), 4);

    	var oSymbolPor = new sap.m.ComboBox("idSymbolPor",
		        {
		        		  width : "90px",
		                  items : {
		                         path : "/symbol",
		                         template : new sap.ui.core.ListItem(
		                         {
		                               text : "{text}",
		                               key : "{key}"
		                         }),
		                  },
		                         selectionChange : function(oEvent){
		                        	 var sel = oEvent.getParameter("selectedItem").getProperty("key");
		                        	 if(sel == "BT"){
		                        		 sap.ui.getCore().byId("idInputPor2").setValue("");
		                        		 sap.ui.getCore().byId("idInputPor2").setVisible(true);
		                        	 }else{
		                        		 sap.ui.getCore().byId("idInputPor2").setValue("");
		                        		 sap.ui.getCore().byId("idInputPor2").setVisible(false);
		                        	 }
				                  }
		        }).setModel(oOperatorModel).setSelectedKey("EQ");
    	oToolbarOthers.insertContent(oSymbolPor, 5);

    	var oInputPor = new sap.m.Input("idInputPor", {
			maxLength : 3,
			placeholder : "P. Rating",
			type : sap.m.InputType.Number,
			width : "100px"
		});
    	oToolbarOthers.insertContent(oInputPor, 6);

    	var oInputPor2 = new sap.m.Input("idInputPor2", {
    		visible : false,
			maxLength : 3,
			placeholder : "P. Rating",
			type : sap.m.InputType.Number,
			width : "100px"
		});
    	oToolbarOthers.insertContent(oInputPor2, 7);

    	var applyFilter = new sap.m.Button("idApplyFilter",{
            text : "",
            //width : "20px",
            //height : "20px",
            tooltip: "Apply Filter",
            icon: "sap-icon://filter",
            type:sap.m.ButtonType.Accept,
            press:function(){

				var leasingOrRemarketing = window.localStorage.getItem("memLeasingOrRemarketing");
				if(leasingOrRemarketing == null || leasingOrRemarketing == "L"){


	            	/* Get Visible Row Count */
	            	var visiblerowcount = sap.ui.getCore().byId("idTableFNASummary").getVisibleRowCount();
	            	if(visiblerowcount){
	            		visiblerowcount = parseInt(visiblerowcount);
	            	}else{
	            		visiblerowcount = 20;
	            	}
	            	window.localStorage.setItem("memTotalRowsField", visiblerowcount);

					window.localStorage.setItem("memLeasingOrRemarketing", "L");
					//this.page.removeAllContent();
					//this.page.insertContent(dashItemL, 0);

					sap.ui.getCore().byId("idTableFNASummary").setVisible(true);
					sap.ui.getCore().byId("idTableFRNASummary").setVisible(false);
					sap.ui.getCore().byId("idTableFONASummary").setVisible(false);

					//sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
					sap.ui.getCore().byId("idCustomerCombo").setVisible(false);
					sap.ui.getCore().byId("idCustomerComboOptions").setVisible(false);
					sap.ui.getCore().byId("idLeasetypeCombo").setVisible(false);
					sap.ui.getCore().byId("idReleasetypeCombo").setVisible(false);
					sap.ui.getCore().byId("idRadioButtonCol").setVisible(true);

					// Set Leasing Content

					var fneta = new newfneta();
					fneta.setPersonalValuesFilter();
					var filterString = fneta.formFilterString(undefined, undefined, undefined);
					fneta.getFNASummary(filterString);

					// Select Leasing Radiobutton
					sap.ui.getCore().byId('idProcessSwitchMain').setSelectedIndex(0);
				}else if(leasingOrRemarketing == "R"){

					/* Get Visible Row Count */
	            	var visiblerowcount = sap.ui.getCore().byId("idTableFRNASummary").getVisibleRowCount();
	            	if(visiblerowcount){
	            		visiblerowcount = parseInt(visiblerowcount);
	            	}else{
	            		visiblerowcount = 20;
	            	}
	            	window.localStorage.setItem("memTotalRowsField", visiblerowcount);

					window.localStorage.setItem("memLeasingOrRemarketing", "R");
					//this.page.removeAllContent();
					//this.page.insertContent(dashItemL, 0);

					sap.ui.getCore().byId("idTableFNASummary").setVisible(false);
					sap.ui.getCore().byId("idTableFRNASummary").setVisible(true);
					sap.ui.getCore().byId("idTableFONASummary").setVisible(false);

					//sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
					sap.ui.getCore().byId("idCustomerCombo").setVisible(false);
					sap.ui.getCore().byId("idCustomerComboOptions").setVisible(false);
					sap.ui.getCore().byId("idLeasetypeCombo").setVisible(false);
					sap.ui.getCore().byId("idReleasetypeCombo").setVisible(false);
					sap.ui.getCore().byId("idRadioButtonCol").setVisible(true);

					// Set Container Sales Content

					var fneta = new newfneta();
					fneta.setPersonalValuesFilter();
					var filterString = fneta.formFilterString(undefined, undefined, undefined);
					fneta.getFRNASummary(filterString);

					// Select Container Sales Radiobutton
					sap.ui.getCore().byId('idProcessSwitchMain').setSelectedIndex(1);

				}else if(leasingOrRemarketing == "O"){

					/* Get Visible Row Count */
	            	var visiblerowcount = sap.ui.getCore().byId("idTableFONASummary").getVisibleRowCount();
	            	if(visiblerowcount){
	            		visiblerowcount = parseInt(visiblerowcount);
	            	}else{
	            		visiblerowcount = 20;
	            	}
	            	window.localStorage.setItem("memTotalRowsField", visiblerowcount);

					window.localStorage.setItem("memLeasingOrRemarketing", "O");
					//this.page.removeAllContent();
					//this.page.insertContent(dashItemL, 0);

					sap.ui.getCore().byId("idTableFNASummary").setVisible(false);
					sap.ui.getCore().byId("idTableFRNASummary").setVisible(false);
					sap.ui.getCore().byId("idTableFONASummary").setVisible(true);
					sap.ui.getCore().byId("idButtonDownloadDNA").setText("Download Bookings/Redeliveries Data");
					sap.ui.getCore().byId("idButtonDownloadDNA").setTooltip("Download bookings/redeliveries data with equipment details");

					//sap.ui.getCore().byId("idDepotCombo").setWidth("40%");
					sap.ui.getCore().byId("idCustomerCombo").setVisible(true);
					sap.ui.getCore().byId("idCustomerComboOptions").setVisible(true);
					sap.ui.getCore().byId("idLeasetypeCombo").setVisible(true);
					sap.ui.getCore().byId("idReleasetypeCombo").setVisible(true);
					sap.ui.getCore().byId("idRadioButtonCol").setVisible(false);

					// Set Container Sales Content

					var fneta = new newfneta();
					fneta.setPersonalValuesFilter();
					var filterString = fneta.formFilterString(undefined, undefined, undefined);
					fneta.getFONASummary(filterString);

					// Select Outstanding Radiobutton
					sap.ui.getCore().byId('idProcessSwitchMain').setSelectedIndex(2);

				}
            }
         });

    	oToolbarOthers.insertContent(applyFilter, 8);

    	var resetFilter = new sap.m.Button("idResetFilter",{
            text : "",
            //width : "20px",
            //height : "20px",
            tooltip: "This will reset all the filters",
            icon: "sap-icon://clear-filter",
            type:sap.m.ButtonType.Reject,
            press:function(){

				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.resetEverything();

				var fneta = new newfneta();
				fneta.setPersonalValuesFilter();

            }
         });

    	oToolbarOthers.insertContent(resetFilter, 9);

    	var oRadioButtonCol = new sap.ui.commons.RadioButtonGroup("idRadioButtonCol",{
	        columns : 3,
	        selectedIndex : 2,
	        select : function(oEvent) {
				/*var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();*/

	        	var oHierLevel = oEvent.getSource().getSelectedIndex();
	        	var fneta = new newfneta();
				fneta.setPersonalValuesFilter();
	        	var filterString = fneta.formFilterString(oHierLevel, undefined, undefined);

	        	var leasingOrRemarketing = window.localStorage.getItem("memLeasingOrRemarketing");
				if(leasingOrRemarketing == null || leasingOrRemarketing == "L"){
					fneta.getFNASummary(filterString);
				}else if(leasingOrRemarketing == "R"){
					fneta.getFRNASummary(filterString);
				}else if(leasingOrRemarketing == "O"){
					fneta.getFONASummary(filterString);
				}
	        }
	    }).addItem(new sap.ui.core.Item({
	        text : "Region Level", key : "REGION"})).addItem(new sap.ui.core.Item({
		        text : "Country Level", key : "COUNTRY"})).addItem(new sap.ui.core.Item({
			        text : "City Level", key : "CITY"}));

    	oToolbarOthers.insertContent(oRadioButtonCol, 10);
			
			var oCheckboxNoStock = new sap.m.CheckBox("idCheckboxNoStock",{
				enabled : true,
				text : "Show NO STOCK also",
    		select : function(evt){
					var oCheckboxNoStock = "";
					if(evt.getParameter("selected") == true){
						oCheckboxNoStock = "X";
					}else{
						oCheckboxNoStock = "";
					}
					/*var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();*/

						var oHierLevel = sap.ui.getCore().byId("idRadioButtonCol").getSelectedIndex();
						var fneta = new newfneta();
						fneta.setPersonalValuesFilter();
						var filterString = fneta.formFilterString(oHierLevel, undefined, undefined);

						var leasingOrRemarketing = window.localStorage.getItem("memLeasingOrRemarketing");
						if(leasingOrRemarketing == null || leasingOrRemarketing == "L"){
							fneta.getFNASummary(filterString);
						}else if(leasingOrRemarketing == "R"){
							fneta.getFRNASummary(filterString);

						}else if(leasingOrRemarketing == "O"){
							fneta.getFONASummary(filterString);
						}
      }
		}).addStyleClass("noStockCheckBox");

			oToolbarOthers.insertContent(oCheckboxNoStock, 11);

    	var oToolbarDepotCustomer = new sap.m.Toolbar("idNETAToolbarDepotCustomer",{
    		width:"99%",
    		height: "130px",
    	}); //.addStyleClass("marginTop10")
    	oToolbarDepotCustomer.setDesign(sap.m.ToolbarDesign.Solid);

    	var oDepotCombo = new sap.m.MultiComboBox({
			id : "idDepotCombo", // sap.ui.core.ID
			//width : "40%", // sap.ui.core.CSSSize
			height: "120px",
			enabled : true, // boolean
			placeholder : "Depot...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionFinish : [ function(oEvent) {
				//var control = oEvent.getSource();
				//var fnetaFilter = new newfnetaFilterOuts();
				//fnetaFilter.alterPageOne(control.mProperties.selectedKeys, "City");
				//fnetaFilter.alterPageOne();	// DNANEW-
				/*DNANEW+
				var oCityComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memCityComboSelectedKeys", oCityComboSelectedKeys);
				DNANEW+*/
			}, this ]
    	}).addStyleClass("locationCombo depotCustomerCombo");

    	var oDepotComboF4 = new sap.m.Image("idDepotComboF4",{
    		enabled : true,
            src: "images/f4_help.png",
            press : function(oEvent){
            	var of4helper = new f4helper();
            	of4helper.getF4Helper("depot", oEvent.getSource());
            }
		}).addStyleClass("f4image");

    	var oDepotComboSelectAll = new sap.m.CheckBox("idDepotComboSelectAll",{
    		enabled : true,
    		select : function(evt){
            		if(evt.getParameter("selected") == true){
            		var oDepotCombo = sap.ui.getCore().byId("idDepotCombo");
            		oDepotCombo.setSelectedItems(oDepotCombo.getItems());

            		var message = String(oDepotCombo.getItems().length) + " depots selected";
            		sap.m.MessageToast.show(message);
            		}else{
            		var oDepotCombo = sap.ui.getCore().byId("idDepotCombo");
            		oDepotCombo.setSelectedItems([]);
            		sap.m.MessageToast.show("cleared depot filter");
            	}
            }
		}).addStyleClass("selectAllCheckBox");

    	var oDepotComboOptions = new sap.m.VBox("idDepotComboOptions",{
            //width:"300px",
            items:  [oDepotComboF4, oDepotComboSelectAll],
            justifyContent : sap.m.FlexJustifyContent.Center
            });

    	var oDepotComboFull = new sap.m.HBox("idDepotComboFull",{
            width:"50%",
            items:  [oDepotCombo, new sap.m.Label({width : "15px"}), oDepotComboOptions]
            });

    	oToolbarDepotCustomer.insertContent(oDepotCombo, 0);
    	oToolbarDepotCustomer.insertContent(oDepotComboOptions, 1);

    	var oCustomerCombo = new sap.m.MultiComboBox({
			id : "idCustomerCombo", // sap.ui.core.ID
			//width : "40%", // sap.ui.core.CSSSize
			height: "120px",
			enabled : true, // boolean
			placeholder : "Customer...", // string
			editable : true, // boolean, since 1.12.0
			textAlign : sap.ui.core.TextAlign.Left, // sap.ui.core.TextAlign, since 1.26.0
			textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection, since 1.28.0
			items : {
				    path : "/items",
				    template : oItemTemplate
				  	},
			change : [ function(oEvent) {
				//var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				/*DNANEW-*/
				/*busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();*/
				/*DNANEW-*/
				/*DNANEW+
				var oUnitTypeComboSelectedKeys = oEvent.getSource().getSelectedKeys();
				window.localStorage.setItem("memUnitTypeComboSelectedKeys", oUnitTypeComboSelectedKeys);
				DNANEW+*/
			}, this ],
			selectionFinish : [ function(oEvent) {
				/*DNANEW-*/
				/*
				var control = oEvent.getSource();
				var fnetaFilter = new newfnetaFilterOuts();
				fnetaFilter.alterPageOne();
				*/
				/*DNANEW-*/
			}, this ]
    	}).addStyleClass("customerCombo depotCustomerCombo");

    	var oCustomerComboF4 = new sap.m.Image("idCustomerComboF4",{
            src: "images/f4_help.png",
            press : function(oEvent){
            	var of4helper = new f4helper();
            	of4helper.getF4Helper("customer", oEvent.getSource());
            }
		}).addStyleClass("f4image");

    	var oCustomerComboSelectAll = new sap.m.CheckBox("idCustomerComboSelectAll",{
    		enabled : true,
    		select : function(evt){
            		if(evt.getParameter("selected") == true){
            		var oCustomerCombo = sap.ui.getCore().byId("idCustomerCombo");
            		oCustomerCombo.setSelectedItems(oCustomerCombo.getItems());

            		var message = String(oCustomerCombo.getItems().length) + " customers selected";
            		sap.m.MessageToast.show(message);
            		}else{
            		var oCustomerCombo = sap.ui.getCore().byId("idCustomerCombo");
            		oCustomerCombo.setSelectedItems([]);
            		sap.m.MessageToast.show("cleared customer filter");
            	}
            }
		}).addStyleClass("selectAllCheckBox");

    	var oCustomerComboOptions = new sap.m.VBox("idCustomerComboOptions",{
            //width:"300px",
            items:  [oCustomerComboF4, oCustomerComboSelectAll]
            });

    	var oCustomerComboFull = new sap.m.HBox("idCustomerComboFull",{
    		width:"50%",
            items:  [oCustomerCombo, new sap.m.Label({width : "15px"}), oCustomerComboOptions]
            });

    	oToolbarDepotCustomer.insertContent(oCustomerCombo, 2);
    	oToolbarDepotCustomer.insertContent(oCustomerComboOptions, 3);

    	var oFlexToolbars = new sap.m.FlexBox({
			items: [
                       oToolbarLocation,
                       oToolbarDepotCustomer,
                       oToolbarUnitType,
                       oToolbarOthers
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");

    	/* Panel for the filter */

		var oCurrent = this;
		var oPanelFilter = new sap.m.Panel("idPanelFilter",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			//headerText : "Filters", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oFlexToolbars], // sap.ui.core.Control
			headerToolbar : [


								new sap.m.Toolbar({
			      				content: [
			      				            new sap.m.Label({text : "Filters"}),
							                new sap.m.ToolbarSpacer(),

															new sap.ui.commons.Button({
																	text: "Add Favorite",
																	icon: "sap-icon://favorite",
																	press: function(oEvent) {

																		if(sap.ui.getCore().byId("idPopoverFilterAddFavorite") != undefined)
					 			 		                	 sap.ui.getCore().byId("idPopoverFilterAddFavorite").destroy();

																	 if(sap.ui.getCore().byId("idLabelFilterAddFavorite") != undefined)
					 			 		                	 sap.ui.getCore().byId("idLabelFilterAddFavorite").destroy();

																	 if(sap.ui.getCore().byId("idInputFilterAddFavorite") != undefined)
 				 			 		                	 sap.ui.getCore().byId("idInputFilterAddFavorite").destroy();

																		var oPopoverFilterAddFavorite = new sap.m.Popover("idPopoverFilterAddFavorite",{
																					title: "Save Filter",
																					  //width:"1300px",
																						modal: false,
																						placement: sap.m.PlacementType.Left,
																						content: new sap.m.HBox({
																																		items:  [

																																	new sap.m.Label("idLabelFilterAddFavorite",{
																															            text : "Filter Name : ",
																															            //labelFor: oSDASHM2InputCWApproveAmount,
																															            width : "140px"
																																				}).addStyleClass("selectionLabels"),

																																		new sap.m.Input("idInputFilterAddFavorite",{
																																				value : "",
																																				width : "220px"
																																			}).addStyleClass("selectionLabels1"),

																																		new sap.m.Label({
																																            width : "20px"
																																					}),

																																			new sap.m.Button({
																																					icon: "sap-icon://save",
																																					height : "45px",
																																					width : "45px",
																																					type:sap.m.ButtonType.Accept,
																																					press:function(oEvent){
																																						jQuery.sap.require("sap.ui.commons.MessageBox");
																																						var oInputFilterAddFavorite = sap.ui.getCore().byId("idInputFilterAddFavorite").getValue();
																																						if (!oInputFilterAddFavorite.replace(/\s/g, '').length) {
																																							sap.ui.commons.MessageBox.alert("Enter a name for filter before saving!");
																																						}else{
																																							oCurrent.saveFilters(oInputFilterAddFavorite, "");
																																						}
																																					}
																																				})

																																	/*new sap.m.Label({
																															            width : "20px"
																																				}),

																																	new sap.m.Button({
																																			icon: "sap-icon://delete",
																																			height : "45px",
																																			width : "45px",
																																			type:sap.m.ButtonType.Reject,
																																			press:function(oEvent){
																																				jQuery.sap.require("sap.ui.commons.MessageBox");
																																				var oInputFilterAddFavorite = sap.ui.getCore().byId("idInputFilterAddFavorite").getValue();
																																				if (!oInputFilterAddFavorite.replace(/\s/g, '').length) {
																																					sap.ui.commons.MessageBox.alert("Enter a name for filter before saving!");
																																				}else{
																																					oCurrent.saveFilters(oInputFilterAddFavorite, "X");
																																				}
																																			}
																																		})*/


																																	// 	var oFlexFilterAddFavorite = new sap.m.FlexBox({
																																	//          items: [
																																	//                 oLabelFilterAddFavorite,
																																	//                 new sap.m.Label({width : "15px"}),
																																	//                 oInputFilterAddFavorite
																																	//        ],
																																	//        direction : "Row",
																																	//        visible: false
																																	// });

																																]
																														}),

																						}).addStyleClass("sapUiPopupWithPadding");
																						oPopoverFilterAddFavorite.openBy(oEvent.getSource());
																	}
																}).addStyleClass("dnadownload"),

															new sap.ui.commons.Button({
																	text: "Favorites",
																	icon: "sap-icon://favorite-list",
																	press: function(oEvent) {
																		oCurrent.setContentFavorites(oEvent.getSource());
																	}
																}).addStyleClass("dnadownload"),

							                new sap.ui.commons.Button("idButtonDownloadDNA",{
							                  text: "Download",
							                  styled : false,
					     		   			  tooltip : "Download equipment level leasing side data",
					     		   			  text : "Download Leasing Data",
					     		   			press : function(){



					     		   				/* Main Region */

					     		   				var oMregionComboSelectedKeys = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys();
					     		   			oMregionComboSelectedKeys = oMregionComboSelectedKeys.join("$");

					     		   				/* Region */

					     		   				var oRegionComboSelectedKeys = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys();
					     		   			oRegionComboSelectedKeys = oRegionComboSelectedKeys.join("$");

					     		   				/* Country */

					     		   				var oCountryComboSelectedKeys = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys();
					     		   			oCountryComboSelectedKeys = oCountryComboSelectedKeys.join("$");

					     		   				/* City */

					     		   				var oCityComboSelectedKeys = sap.ui.getCore().byId("idCityCombo").getSelectedKeys();
					     		   			oCityComboSelectedKeys = oCityComboSelectedKeys.join("$");

					     		   				/* Depot */

					     		   				var oDepotComboSelectedKeys = sap.ui.getCore().byId("idDepotCombo").getSelectedKeys();
					     		   			oDepotComboSelectedKeys = oDepotComboSelectedKeys.join("$");

					     		   				/* Product Category */

					     		   				var oProCatComboSelectedKeys = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys();
					     		   			oProCatComboSelectedKeys = oProCatComboSelectedKeys.join("$");

					     		   				/* Product Class */

					     		   				var oProClassComboSelectedKeys = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys();
					     		   			oProClassComboSelectedKeys = oProClassComboSelectedKeys.join("$");

					     		   				/* Unit Type */

					     		   				var oUnitTypeComboSelectedKeys = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys();
					     		   			oUnitTypeComboSelectedKeys = oUnitTypeComboSelectedKeys.join("$");

					     		   				/* Age */

					     		   				var oSymbolAge = sap.ui.getCore().byId("idSymbolAge").getSelectedKey();

					     		   				var oInputAge = sap.ui.getCore().byId("idInputAge").getValue();

					     		   				var oInputAge2 = sap.ui.getCore().byId("idInputAge2").getValue();

					     		   				/* Por */

					     		   				var oSymbolPor = sap.ui.getCore().byId("idSymbolPor").getSelectedKey();

					     		   				var oInputPor = sap.ui.getCore().byId("idInputPor").getValue();

					     		   				var oInputPor2 = sap.ui.getCore().byId("idInputPor2").getValue();

					     		   				/* Level
					     		   				 * 0. Region Level
					     		   				 * 1. Country Level
					     		   				 * 2. City Level
					     		   				*/

					     		   				var oHierLevel = sap.ui.getCore().byId("idRadioButtonCol").getSelectedIndex();

					     		   				/* All or Capex
					     		   				 * 0. Both
					     		   				 * 1. Depot
					     		   				 * 2. Capex
					     		   				*/

					     		   				var oAllOrCapex = sap.ui.getCore().byId("idRadioButtonCapex").getSelectedIndex();

					     		   				if(sap.ui.getCore().byId('idProcessSwitchMain').getSelectedIndex() == 2){

					     		   				/* Customer */

						     		   			var oCustomerComboSelectedKeys = sap.ui.getCore().byId("idCustomerCombo").getSelectedKeys();
						     		   			oCustomerComboSelectedKeys = oCustomerComboSelectedKeys.join("$");

						     		   			/* Lease Type */

						     		   			var oLeasetypeComboSelectedKeys = sap.ui.getCore().byId("idLeasetypeCombo").getSelectedKeys();
						     		   			oLeasetypeComboSelectedKeys = oLeasetypeComboSelectedKeys.join("$");

						     		   			/* Release Type */

						     		   			var oReleasetypeComboSelectedKeys = sap.ui.getCore().byId("idReleasetypeCombo").getSelectedKeys();
						     		   			oReleasetypeComboSelectedKeys = oReleasetypeComboSelectedKeys.join("$");

						     		   			/* Booking or Redelivery
						     		   			 * 0. Redelivery
						     		   			 * 1. Booking
						     		   			*/

						     		   			var obookingorredel = 0;
						     		   			obookingorredel = sap.ui.getCore().byId("idFONARadioButtonProcess").getSelectedIndex(0);

					     		   				}

						     		   			oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
						     		   			busyDialog.open();

						     		   			var erpfilename = "";
						     		   			var crmfilename = "";
						     		   			var selectedPart = sap.ui.getCore().byId("idProcessSwitchMain").getSelectedIndex();
						     		   			switch(selectedPart){
						     		   			case 0:
						     		   				erpfilename = "DNA_ERP_DATA.xls";
						     		   				crmfilename = "DNA_CRM_DATA.xls";
						     		   				break;
						     		   			case 1:
						     		   				erpfilename = "DNA_REM_ERP_DATA.xls";
						     		   				crmfilename = "DNA_REM_CRM_DATA.xls";
						     		   				break;
						     		   			default:
						     		   				break;
						     		   			};

						     		   		if(selectedPart != 2){
						     		   		   /* ERP Data */
						     		   		   var sRead =  "/downloadSet(Inmregion='" + oMregionComboSelectedKeys + "'," +
						     		   		   			   	"Inregion='" + oRegionComboSelectedKeys + "'," +
						     		   		   				"Incountry='" + oCountryComboSelectedKeys + "'," +
						     		   		   				"Incity='" + oCityComboSelectedKeys + "'," +
						     		   						"Indepot='" + oDepotComboSelectedKeys + "'," +
						     		   						"Inpcate='" + oProCatComboSelectedKeys + "'," +
						     		   						"Inpclass='" + oProClassComboSelectedKeys + "'," +
						     		  						"Inmatnr='" + oUnitTypeComboSelectedKeys + "'," +
												     		"Insage='" + oSymbolAge + "'," +
												     		"Inage='" + oInputAge + "'," +
												     		"Inage2='" + oInputAge2 + "'," +
												     		"Inspor='" + oSymbolPor + "'," +
												     		"Inpor='" + oInputPor + "'," +
												     		"Inpor2='" + oInputPor2 + "'," +
												     		"Inallorcapex='" + oAllOrCapex + "'," +

												     		"Incustomer='" + "" + "'," +
												     		"Inleasetype='" + "" + "'," +
												     		"Inreleasetype='" + "" + "'," +
												     		"Inbookingorredel='" + "" + "'," +


						     		   		   			    "Filename='" + erpfilename + "')" +
						     		   		   			    "/$value" ;

					     		   		       oModel.read( sRead, null, null, true, function(oData, oResponse){
					     		   		    	  busyDialog.close();
					     		   	              var pdfURL = oResponse.requestUri;
					     		   	              window.open(pdfURL);
					     		   		        },function(error){
					     		   		        	busyDialog.close();
					     		   		        	jQuery.sap.require("sap.ui.commons.MessageBox");
					     		   							sap.ui.commons.MessageBox.alert("Download failed!");
					     		   		        });

					     		   		       /* CRM Data */


						     		   		   var sRead =  "/downloadSet(Inmregion='" + oMregionComboSelectedKeys + "'," +
									   		   			   	"Inregion='" + oRegionComboSelectedKeys + "'," +
									   		   				"Incountry='" + oCountryComboSelectedKeys + "'," +
									   		   				"Incity='" + oCityComboSelectedKeys + "'," +
									   						"Indepot='" + oDepotComboSelectedKeys + "'," +
									   						"Inpcate='" + oProCatComboSelectedKeys + "'," +
									   						"Inpclass='" + oProClassComboSelectedKeys + "'," +
									  						"Inmatnr='" + oUnitTypeComboSelectedKeys + "'," +
												     		"Insage='" + oSymbolAge + "'," +
												     		"Inage='" + oInputAge + "'," +
												     		"Inage2='" + oInputAge2 + "'," +
												     		"Inspor='" + oSymbolPor + "'," +
												     		"Inpor='" + oInputPor + "'," +
												     		"Inpor2='" + oInputPor2 + "'," +
												     		"Inallorcapex='" + oAllOrCapex + "'," +

												     		"Incustomer='" + "" + "'," +
												     		"Inleasetype='" + "" + "'," +
												     		"Inreleasetype='" + "" + "'," +
												     		"Inbookingorredel='" + "" + "'," +

									   		   			    "Filename='" + crmfilename + "')" +
									   		   			    "/$value" ;

					     		   		       oModel.read( sRead, null, null, true, function(oData, oResponse){
					     		   		    	  busyDialog.close();
					     		   	              var pdfURL = oResponse.requestUri;
					     		   	              window.open(pdfURL);
					     		   		        },function(error){
					     		   		        	busyDialog.close();
					     		   		        	jQuery.sap.require("sap.ui.commons.MessageBox");
					     		   					sap.ui.commons.MessageBox.alert("Download failed!");
					     		   		        });
					     		   			  }else{
					     		   				crmfilename = "DNA_OUT_CRM_DATA.xls";

					     		   				/* CRM Data */


							     		   		   var sRead =  "/downloadSet(Inmregion='" + oMregionComboSelectedKeys + "'," +
										   		   			   	"Inregion='" + oRegionComboSelectedKeys + "'," +
										   		   				"Incountry='" + oCountryComboSelectedKeys + "'," +
										   		   				"Incity='" + oCityComboSelectedKeys + "'," +
										   						"Indepot='" + oDepotComboSelectedKeys + "'," +
										   						"Inpcate='" + oProCatComboSelectedKeys + "'," +
										   						"Inpclass='" + oProClassComboSelectedKeys + "'," +
										  						"Inmatnr='" + oUnitTypeComboSelectedKeys + "'," +
													     		"Insage='" + oSymbolAge + "'," +
													     		"Inage='" + oInputAge + "'," +
													     		"Inage2='" + oInputAge2 + "'," +
													     		"Inspor='" + oSymbolPor + "'," +
													     		"Inpor='" + oInputPor + "'," +
													     		"Inpor2='" + oInputPor2 + "'," +
													     		"Inallorcapex='" + oAllOrCapex + "'," +

													     		"Incustomer='" + oCustomerComboSelectedKeys + "'," +
													     		"Inleasetype='" + oLeasetypeComboSelectedKeys + "'," +
													     		"Inreleasetype='" + oReleasetypeComboSelectedKeys + "'," +
													     		"Inbookingorredel='" + obookingorredel + "'," +


										   		   			    "Filename='" + crmfilename + "')" +
										   		   			    "/$value" ;

						     		   		       oModel.read( sRead, null, null, true, function(oData, oResponse){
						     		   		    	  busyDialog.close();
						     		   	              var pdfURL = oResponse.requestUri;
						     		   	              window.open(pdfURL);
						     		   		        },function(error){
						     		   		        	busyDialog.close();
						     		   		        	jQuery.sap.require("sap.ui.commons.MessageBox");
						     		   					sap.ui.commons.MessageBox.alert("Download failed!");
						     		   		        });

					     		   			  }
					     		   		       }
							                }).addStyleClass("dnadownload")
						                  ]
			            		})
			                 ]
		});

		return oPanelFilter;
	},

	saveFilters : function(fname, deletes){

		var oCurrent = this;

		jQuery.sap.require("sap.ui.commons.MessageBox");

		var mregionValues = sap.ui.getCore().byId("idMRegionCombo").getSelectedKeys().toString();
		var regionValues = sap.ui.getCore().byId("idRegionCombo").getSelectedKeys().toString();
		var countryValues = sap.ui.getCore().byId("idCountryCombo").getSelectedKeys().toString();
		var cityValues = sap.ui.getCore().byId("idCityCombo").getSelectedKeys().toString();
		var depotValues = sap.ui.getCore().byId("idDepotCombo").getSelectedKeys().toString();
		var customerValues = sap.ui.getCore().byId("idCustomerCombo").getSelectedKeys().toString();

		var leasetypeValues = sap.ui.getCore().byId("idLeasetypeCombo").getSelectedKeys().toString();
		var releasetypeValues = sap.ui.getCore().byId("idReleasetypeCombo").getSelectedKeys().toString();

		var proCatValues = sap.ui.getCore().byId("idProCatCombo").getSelectedKeys().toString();
		var proClassValues = sap.ui.getCore().byId("idProClassCombo").getSelectedKeys().toString();
		var unitTypeValues = sap.ui.getCore().byId("idUnitTypeCombo").getSelectedKeys().toString();

		var symbolage = sap.ui.getCore().byId("idSymbolAge").getSelectedKey();
		var inputAge = sap.ui.getCore().byId("idInputAge").getValue();
		var inputAge2 = sap.ui.getCore().byId("idInputAge2").getValue();

		var symbolpor = sap.ui.getCore().byId("idSymbolPor").getSelectedKey();
		var inputPor = sap.ui.getCore().byId("idInputPor").getValue();
		var inputPor2 = sap.ui.getCore().byId("idInputPor2").getValue();

		busyDialog.open();

		var filterString = "?$filter=Fname eq '" + fname +
						 "' and Delete eq '" + deletes +
						 "' and Mregion eq '" + mregionValues +
						 "' and Region eq '" + regionValues +
						 "' and Country eq '" + countryValues +
						 "' and City eq '" + cityValues +
						 "' and Depot eq '" + depotValues +
						 "' and Customer eq '" + customerValues +

						 "' and Lease eq '" + leasetypeValues +
						 "' and Releases eq '" + releasetypeValues +

						 "' and ProCat eq '" + proCatValues +
						 "' and ProClass eq '" + proClassValues +
						 "' and UnitType eq '" + unitTypeValues +

						 "' and Ages eq '" + symbolage +
						 "' and Age1 eq '" + inputAge +
						 "' and Age2 eq '" + inputAge2 +

						 "' and Pors eq '" + symbolpor +
						 "' and Por1 eq '" + inputPor +
						 "' and Por2 eq '" + inputPor2 +

						 "'";
	  console.log(fnetaLinkSaveFilter + filterString);
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
		OData.request({
		      requestUri: fnetaLinkSaveFilter + filterString,
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
							if(data.results.length == 0){
				    		sap.ui.commons.MessageBox.show("Sorry, there is an error!",
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);
						  }
							else{
								if(data.results[0].Results == 'E'){
									sap.ui.commons.MessageBox.show("Sorry, there is an error!",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Warning",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);
								}else if(data.results[0].Results == 'N'){
									sap.ui.commons.MessageBox.show("Filter does not exist",
			                            sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Warning",
			                            [sap.ui.commons.MessageBox.Action.OK],
			                            sap.ui.commons.MessageBox.Action.OK);
								}else if(data.results[0].Results == 'S'){
									//sap.ui.getCore().byId("idPopoverFilterAddFavorite").close();
									var successmessage = "";
									if(deletes == "X"){
										successmessage = "Filter deleted!";
										oCurrent.setValuesFavorites(undefined);
									}else{
										successmessage = "Filter saved!";
									}

									sap.ui.commons.MessageBox.show(successmessage,
													sap.ui.commons.MessageBox.Icon.SUCCESS,
													"Saved",
													[sap.ui.commons.MessageBox.Action.OK],
													sap.ui.commons.MessageBox.Action.OK);
								}
							}
				busyDialog.close();
		},
		function(err){
				 busyDialog.close();
			});


	},

	setContentFavorites : function(favButton){

		var oCurrent = this;
		if(sap.ui.getCore().byId("idFavoritesTable") != undefined)
		  sap.ui.getCore().byId("idFavoritesTable").destroy();

		var oFavoritesTable = new sap.ui.table.Table("idFavoritesTable",{
		  width : "320px",
		  //title : "Favorties",
		  visibleRowCount: 5,
		  columnHeaderVisible : true,
		  selectionMode : sap.ui.table.SelectionMode.None
		}).addStyleClass("sapUiSizeCompact tblBorder");

		// Favorites Column

		 oFavoritesTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Favorites", textAlign: "Left"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.Link({
		       textAlign: "Left",
					 press : function(oEvent){
						 var favorites = oEvent.getSource().getBindingContext().getProperty("Fname").trim();
						 oCurrent.getValueFilter(favorites);
					 }
		     }).bindProperty("text", "Fname").addStyleClass("borderStyle"),
		       resizable:false,
		       width:"220px"
		     }));

				 // Delete Column

				 oFavoritesTable.addColumn(new sap.ui.table.Column({
				     label: new sap.ui.commons.Label({text: "Delete", textAlign: "Left"}).addStyleClass("wraptextcol"),
						 width : "80px",
				     template: new sap.m.Button({
								 icon: "sap-icon://delete",
								 height : "45px",
								 width : "45px",
								 type:sap.m.ButtonType.Reject,
								 press:function(oEvent){
									 jQuery.sap.require("sap.ui.commons.MessageBox");
									 var favorites = oEvent.getSource().getBindingContext().getProperty("Fname").trim();
									 if (!favorites.replace(/\s/g, '').length) {
										 sap.ui.commons.MessageBox.alert("No name for the filter");
									 }else{
										 oCurrent.saveFilters(favorites, "X");
									 }
								 }
								 }).addStyleClass("borderStyle"),
				       resizable:false,
				       width:"80px"
				     }));

				oCurrent.setValuesFavorites(favButton);

		    return oFavoritesTable;

	},

	setValuesFavorites : function(favButton){

		//var filterString = "?$filter=Fname eq '" + fname + "'";
		var filterString = "";
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);

		busyDialog.open();
		console.log(fnetaLinkGetFilter + filterString);
		OData.request({
		    requestUri: fnetaLinkGetFilter + filterString,
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

					var oJsonFilters = data.results;

			    if(oJsonFilters.length == 0){
			      console.log("No filters found; but returned nothing");
						var oFavoritesTable = sap.ui.getCore().byId("idFavoritesTable");
						oFavoritesTable.setVisibleRowCount(0);
		      	//oFavoritesTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    }else{
			      console.log("Get Filters success");
			      var oFavoritesModel = new sap.ui.model.json.JSONModel();
			      oFavoritesModel.setData({modelData: oJsonFilters});

			      var oFavoritesTable = sap.ui.getCore().byId("idFavoritesTable");
			      oFavoritesTable.setModel(oFavoritesModel);
			      oFavoritesTable.bindRows("/modelData");

						var oJsonFiltersLength = oJsonFilters.length;
		      	if(oJsonFilters < 11){
		      		oFavoritesTable.setVisibleRowCount(10);
		      		//oFavoritesTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		      	}
		      	else{
		      		oFavoritesTable.setVisibleRowCount(oJsonFiltersLength);
		      		//oFavoritesTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		      	}
			    }
					busyDialog.close();

					if(favButton){
					/* Set Content - Favorites Popover */

					oPopoverFavorites = new sap.m.Popover({
									title: "Favorites",
									//width:"1500px",
									modal: false,
									placement: sap.m.PlacementType.Left,
									content: new sap.m.VBox({
																					//width:"300px",
																					items:  [oFavoritesTable]
																					}),

									}).addStyleClass("sapUiPopupWithPadding");


					oPopoverFavorites.openBy(favButton);
				}
		    },
		    function(error){
		      console.log("Get filters failed");
		      busyDialog.close();
		    });
	},

	getValueFilter : function(fname){
		var filterString = "?$filter=Fname eq '" + fname + "'";
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);

		busyDialog.open();
		console.log(fnetaLinkGetFilter + filterString);
		OData.request({
		    requestUri: fnetaLinkGetFilter + filterString,
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

					var oJsonFilterValues = data.results;

			    if(oJsonFilterValues.length == 0){
			      console.log("No values found for filters");
			    }else{
			      console.log("Get values for Filter success");

						var fnetaFilter = new newfnetaFilterOuts();
						var selectedKeysC = [];

						selectedKeysC = data.results[0].Mregion.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idMRegionCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeRegionCountryCityDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].Region.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idRegionCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeCountryCityDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].Country.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idCountryCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeCityDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].City.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idCityCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeDepotFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].Depot.split(',');
						sap.ui.getCore().byId("idDepotCombo").setSelectedKeys(selectedKeysC);

						sap.ui.getCore().byId("idLeasetypeCombo").setSelectedKeys(data.results[0].Lease.split(','));
						sap.ui.getCore().byId("idReleasetypeCombo").setSelectedKeys(data.results[0].Releases.split(','));

						selectedKeysC = data.results[0].ProCat.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idProCatCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeProClassUnitTypeFilter(selectedKeysC, 1);

						selectedKeysC = data.results[0].ProClass.split(',');
						selectedKeysC = $.grep(selectedKeysC,function(n){ return n != "";});
						sap.ui.getCore().byId("idProClassCombo").setSelectedKeys(selectedKeysC);
						if(selectedKeysC.length > 0)
							fnetaFilter.changeUnitTypeFilter(selectedKeysC, 1);

						sap.ui.getCore().byId("idUnitTypeCombo").setSelectedKeys(data.results[0].UnitType.split(','));

						sap.ui.getCore().byId("idSymbolAge").setSelectedKey(data.results[0].Ages);
						sap.ui.getCore().byId("idInputAge").setValue(parseInt(data.results[0].Age1));
						sap.ui.getCore().byId("idInputAge2").setValue(parseInt(data.results[0].Age2));

						sap.ui.getCore().byId("idSymbolPor").setSelectedKey(data.results[0].Pors);
						sap.ui.getCore().byId("idInputPor").setValue(parseInt(data.results[0].Por1));
						sap.ui.getCore().byId("idInputPor2").setValue(parseInt(data.results[0].Por2));

						/* Fire press for apply filter button */

						sap.ui.getCore().byId("idApplyFilter").firePress();
						oPopoverFavorites.close();
			    }
					//busyDialog.close();
		    },
		    function(error){
		      console.log("Get values for filter failed");
		      busyDialog.close();
		    });
	},


});
