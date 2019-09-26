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
var jsonInventoryFRNA = [];
var jsonInventoryFRNAReg = [];
var jsonInventoryFRNACou = [];
var FRNASummaryArray = [];
var FRNASummaryArrayReg = [];
var FRNASummaryArrayCou = [];
var FRNASummaryArrayBackup = [];
var proCatBuffer = [];
var FRNAERPData = [];
var FRNAERPDataConc = [];
var FRNACRMData = [];
var FRNACRMDataConc = [];
var FRNACRMDataEqui = [];
var oModelEDIFRNASummary;
var avUnits;
var navUnits;
var bUnits;
var savUnits;
var sumavUnits;
var sumnavUnits;
var sumbUnits;
var sumsavUnits;
//var fremnetaService = "http://sapcgwci.seaco.com:8000/sap/opu/odoNaPage.getNap()ata/sap/ZNW_UI5_BWDASH_2_SRV/";
//var fremnetaLink = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_UI5_BWDASH_2_SRV/ZPM_M04_YGES_ZPM_M04_Q0001UResults";
sap.ui.model.json.JSONModel.extend("newfremneta", {
	
	createFRNAPage: function(){
		var oCurrent = this;
		var oLUpdate = new sap.ui.commons.Label("idLFRNAUpdate", {
			text : "Dynamic Net-A Report",
			//width : "150px"
		}).addStyleClass("marginTop10 fontTitle"); 
		
		var oRefreshfremneta = new sap.m.Button("idRefreshfremneta",{
			  width : '120px',
	          text : "Refresh",
	          tooltip: "Click me to refresh Neta",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getFRNASummary();
	          }
		}).addStyleClass("submitBtn");
		
		
		
		var oExportfremneta = new sap.m.Image("idExportfremneta",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
			press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryFRNA, "Net A Report","export");
	          }
		}).addStyleClass("excelBtn marginTop10 floatRight");
		
		var ofremNetaFormula = new sap.m.Image("idfremNetaFormula",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/formula.png",
			tooltip: "CW Shortage/Surplus = Target CW Inv. - CIC/IICL - CW - CW APPD",
		}).addStyleClass("excelBtn marginTop10 floatRight");
		
		/*var btnfremnetaExport = new sap.m.Button("idExportfremneta", {
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: excelImage,
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryFRNA, "Net A Report","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft"); //marginLeft355*/
		
		if(isMobile.any()){
			oExportfremneta.setVisible(false);
			ofremNetaFormula.setVisible(false);
		}
		
		var lblSpace1 = new sap.ui.commons.Label( {text: " ",width : '50px'});
		var lblSpace2 = new sap.ui.commons.Label( {text: " ",width : '50px'});
		var lblSpace3 = new sap.ui.commons.Label( {text: " ",width : '5px'});
		
		
//    	var obtnFRNAViewAll = new sap.m.Button("idbtnFRNAViewAll",{
//            text : "View All",
//            //width : "61px",
//            //icon: "images/view_all.png",
//            type:sap.m.ButtonType.Unstyled,
//            visible:false,
//            press:function(){
//						/*this.setVisible(false);
//						var FRNATbl = sap.ui.getCore().byId("idTableFRNASummary");
//						
//						if(FRNASummaryArray.length < 100){
//							FRNATbl.setVisibleRowCount(FRNASummaryArray.length);
//							FRNATbl.setNavigationMode(sap.ui.table.NavigationMode.None);
//					   }else{
//						   FRNATbl.setVisibleRowCount(100);
//						   FRNATbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
//					   }*/
//            	
//          		var bus = sap.ui.getCore().getEventBus();
//          	  	bus.publish("nav", "to", {
//                id : "napage"
//        	  	});
//          	  	
//        		/*var oNaPage = new napage();
//        		if(FRNASummaryArray.length != 0)
//        			{
//        		oNaPage.getNap(FRNASummaryArray, jsonInventoryFRNA);
//        			}
//        		else if(FRNASummaryArrayBackup.length != 0)
//        			{
//            	oNaPage.getNap(FRNASummaryArrayBackup, jsonInventoryFRNA);
//        			}*/          	  	
//    			var oNaPage = new napage();
//    			oNaPage.getNapNew();
//            }
//         }).addStyleClass("toolbarBtn marginTop10");
    	
    	
		var oLevelfremneta = new sap.ui.commons.RadioButtonGroup("idLevelfremneta",{
	        columns : 3,
	        selectedIndex : 2,
	        select : function(oEvent) {
	        	if(oLevelfremneta.getSelectedItem().getText() == "Country Level"){
	        		sap.ui.getCore().byId("idfremnetaCountryCombo").setEnabled(true);
	        		sap.ui.getCore().byId("idfremnetaColCountry").setVisible(true);
	        		sap.ui.getCore().byId("idfremnetaColCity").setVisible(false);
	        		sap.ui.getCore().byId("idfremnetaColRpr").setVisible(false);
	        		sap.ui.getCore().byId("idfremnetaCityCombo").setEnabled(false); 
	        		sap.ui.getCore().byId("idfremnetaCityCombo").removeAllSelectedItems();
	        	}
	        	else if(oLevelfremneta.getSelectedItem().getText() == "City Level"){
	        		sap.ui.getCore().byId("idfremnetaCountryCombo").setEnabled(true);
	        		sap.ui.getCore().byId("idfremnetaColCountry").setVisible(true);
	        		sap.ui.getCore().byId("idfremnetaColCity").setVisible(true);
	        		sap.ui.getCore().byId("idfremnetaColRpr").setVisible(true);
	        		sap.ui.getCore().byId("idfremnetaCityCombo").setEnabled(true);
	        	}
	        	else if(oLevelfremneta.getSelectedItem().getText() == "Region Level"){
	        		sap.ui.getCore().byId("idfremnetaCountryCombo").setEnabled(false);
	        		sap.ui.getCore().byId("idfremnetaColCountry").setVisible(false);
	        		sap.ui.getCore().byId("idfremnetaColCity").setVisible(false);
	        		sap.ui.getCore().byId("idfremnetaCityCombo").setEnabled(false);	
	        		sap.ui.getCore().byId("idfremnetaColRpr").setVisible(false);
	        		sap.ui.getCore().byId("idfremnetaCityCombo").removeAllSelectedItems();
	        		sap.ui.getCore().byId("idfremnetaCountryCombo").removeAllSelectedItems();
	        	}
	        	
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.alterPageOne();
				
	        }
	    }).addStyleClass("marginTop20");
	
	
	
		var oItem = new sap.ui.core.Item({
		        text : "Region Level", key : "REGION"});
		oLevelfremneta.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Country Level", key : "Country"});
		oLevelfremneta.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "City Level", key : "CITY"});
		oLevelfremneta.addItem(oItem); 
		

		
		var buttonfremnetaFlex = new sap.m.FlexBox({
			items: [
                       oLUpdate,
                       lblSpace1,
                       oLevelfremneta,
                       lblSpace2,
                       oExportfremneta,
                       lblSpace3,
                       ofremNetaFormula
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		
		var oTotalRowsfremneta = new sap.ui.commons.Label("idTotalRowsfremneta", {
			text : "Max. Rows per Page : ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom10"); 
		
		var lblSpaceTotalRows = new sap.ui.commons.Label( {text: " ",width : '20px'});
		
		var oTotalRowsFieldfremneta = new sap.ui.commons.TextField("idTotalRowsFieldfremneta", {
			//value : "50",
			maxLength : 3,
			change : function(oEvent){
				var totalLines = sap.ui.getCore().byId("idTableFRNASummary").getModel().getData().modelData.length;
				var newValue = oEvent.mParameters.newValue;
				var isnum = /^\d+$/.test(newValue);
				if(isnum){
				if(newValue < totalLines){
				newValue = Number(newValue);
				sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(newValue);
				if(sap.ui.getCore().byId("idTableFRNASummary").getNavigationMode() == "Paginator"){
  	    		var totalPages = (Math.ceil(totalLines/newValue));
  	    		totalPages = "Total No. of Pages : " + totalPages;
  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				else{
					sap.ui.getCore().byId("idTotalPagesfremneta").setText("");
				}
				}
				}
				else{
					sap.ui.getCore().byId("idTotalPagesfremneta").setText("50");
					sap.ui.commons.MessageBox.show("Please enter only number",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
				}
							
			},
			width : "45px",
		}).addStyleClass("marginTop10 marginBottom10");
		
		var lblSpaceTotalRowsBetween = new sap.ui.commons.Label( {text: " ",width : '20px'});
		
		var oTotalRowsWithfremneta = new sap.ui.commons.Label("idTotalRowsWithfremneta", {
			text : "with ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom10"); 
		
		var lblSpaceTotalRowsWith = new sap.ui.commons.Label( {text: " ",width : '20px'});
		
		var oPagefremneta = new sap.ui.commons.RadioButtonGroup({
			id : "idPagefremneta", // sap.ui.core.ID
			visible : true, // boolean
			columns : 2, // int
			editable : true, // boolean
			selectedIndex : 0, // int
			dependents : [], // sap.ui.core.Control, since 1.19
			items : [ new sap.ui.core.Item({
				id : "idfremnetaPaginator", // sap.ui.core.ID
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
				id : "idfremnetaScrollbar", // sap.ui.core.ID
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
					var totalLines = sap.ui.getCore().byId("idTableFRNASummary").getModel().getData().modelData.length;
					var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
					requestedLines = Number(requestedLines);
					sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	    		var totalPages = (Math.ceil(totalLines/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				else if(selected == 1){
					sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
					sap.ui.getCore().byId("idTotalPagesfremneta").setText("");
				}
			}, this ]
		}).addStyleClass("marginTop10 marginBottom10");
		
		var lblSpaceTotalEndWith = new sap.ui.commons.Label( {text: " ",width : '250px'});
		
		var lblSpaceTotalBeforeSales = new sap.ui.commons.Label( {text: " ",width : '250px'});
		
		var oTotalPagesfremneta = new sap.ui.commons.Label("idTotalPagesfremneta", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom10"); 
		
		
		
		
		
		var oProcessSwitchfremneta = new sap.ui.commons.RadioButtonGroup({
			id : "idProcessSwitchfremneta", // sap.ui.core.ID
			visible : false,	// DNANEW changed from true to false
			columns : 2, // int
			editable : true, // boolean
			selectedIndex : 1, // int
			dependents : [], // sap.ui.core.Control, since 1.19
			items : [ 
			new sap.ui.core.Item({
				id : "idfremnetaLease", // sap.ui.core.ID
				text : "Leasing Fleet", // string
				enabled : true, // boolean
				textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
				key : undefined, // string
				tooltip : undefined, // sap.ui.core.TooltipBase
				customData : [], // sap.ui.core.CustomData
				dependents : []
			// sap.ui.core.Control, since 1.19
			}),
			new sap.ui.core.Item({
				id : "idfremnetaRemarketing", // sap.ui.core.ID
				text : "Container Sales Fleet", // string
				enabled : true, // boolean
				textDirection : sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
				key : undefined, // string
				tooltip : undefined, // sap.ui.core.TooltipBase
				customData : [], // sap.ui.core.CustomData
				dependents : []
			// sap.ui.core.Control, since 1.19
			})
			], // sap.ui.core.Item
			ariaDescribedBy : [], // sap.ui.core.Control
			ariaLabelledBy : [], // sap.ui.core.Control
			select : [ function(oEvent) {
				var selected = oEvent.mParameters.selectedIndex;
				if(selected == 0){
					if(dashItemL == ""){
						dashItemL = new newfneta().createFNAPage();
					}
						var formElement = sap.ui.getCore().byId('firstRows');
						formElement.removeField(dashItemR);						
						formElement.insertField(dashItemL,0);
						sap.ui.getCore().byId('idProcessSwitch').setSelectedIndex(0); 
						sap.ui.getCore().byId('idProcessSwitchfremneta').setSelectedIndex(0);
				}
				else if(selected == 1){
					if(dashItemR == ""){
						dashItemR = new newfremneta().createFRNAPage();
					}
						var formElement = sap.ui.getCore().byId('firstRows');
						formElement.removeField(dashItemL);						
						formElement.insertField(dashItemR,0);
						sap.ui.getCore().byId('idProcessSwitch').setSelectedIndex(1);
						sap.ui.getCore().byId('idProcessSwitchfremneta').setSelectedIndex(1);
				}
			}, this ]
		}).addStyleClass("marginTop10 marginBottom10");
		
		
		
		var buttonTotalRows = new sap.m.FlexBox({
			items: [
			        	oTotalRowsfremneta,
			        	lblSpaceTotalRows,
			        	oTotalRowsFieldfremneta,
			        	lblSpaceTotalRowsBetween,
			        	oTotalRowsWithfremneta,
			        	lblSpaceTotalRowsWith,
			        	oPagefremneta,
			        	lblSpaceTotalEndWith, 
			        	oTotalPagesfremneta,
			        	lblSpaceTotalBeforeSales,
			        	oProcessSwitchfremneta
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		
		// Table
    	var oTableFRNASummary = new sap.ui.table.Table("idTableFRNASummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None, 
            width:"98%",
            showNoData: true,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            enableColumnReordering: true,
   		 	//visibleRowCount: 200,
   		 	//fixedRowCount: 1,
   		 	filter : [ function(oEvent) {
   		 		//oCurrent.setVisibility(oEvent);
			}, this ],
    	 }).addStyleClass("fontStyle tblBorder");
    	
    	    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idfremnetaColRegion",{
    		width: "110px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "Region"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZRegDesc").addStyleClass("wraptext"),
   		resizable:false,
//          sortProperty: "Pcate",
          //filterProperty: "ZRegDesc",
 		 }));
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idfremnetaColCountry",{
    		width: "110px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "Country"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCouDesc").addStyleClass("wraptext"),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCouDesc",
 		 }));
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idfremnetaColCity",{
    		width: "110px",
   		visible:true,
   		 label: new sap.ui.commons.Label({text: "City"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZCityDesc").addStyleClass("wraptext"),
   		resizable:false,
          //sortProperty: "Pcate",
   		//filterProperty: "ZCityDesc",
 		 }));
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idfremnetaColCategory",{
			 width: "80px",
    		visible:false,
    		 label: new sap.ui.commons.Label({text: "Category"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Pcate").addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Pcate",
    		//filterProperty: "Pcate",
  		 }));
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idfremnetaColUnitType",{
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "Unit Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Material", function(cellValue) {
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
  		 }));
    	
//    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idColConcatenated",{
//    		width: "80px",
//   		visible:false,
//   		 label: new sap.ui.commons.Label({text: "Concatenated"}),
//   		template: new sap.ui.commons.TextView().bindProperty("text", "Conc").addStyleClass("wraptext"),
//   		resizable:false,
//          //sortProperty: "Pcate",
//          //filterProperty: "Pcate",
// 		 }));
    	
    	
    	
    	/*
    	 * 
    	 * 
    	 * 
    	 * 
    	 *     	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "New AVLB", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("NAVLB",{
			textAlign : sap.ui.core.TextAlign.End,
				press : function() {
					var selectedRadio = new sap.ui.getCore().byId("idRadioButtonCol").getSelectedItem().getText();
			  		var bus = sap.ui.getCore().getEventBus();
			  	  	bus.publish("nav", "to", {
			        id : "naRemarkLevel"
				  	});
			  	  	
				var conc_value = this.getTarget();
					var oNAUL = new newnaRemarkLevel();
					oNAUL.setDataRemarkLevel(conc_value, "AVLB NEW", selectedRadio, "Available & New");	
				}
			}).bindProperty("text", "Newavlb").bindProperty("target","Conc", function(cellValue) {
				
          return cellValue;  
      }).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Newavlb",
         //filterProperty: "Conc",
		 }));
		 
		 *
		 */
    	
    	// Remarketing Port Rating.
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column("idfremnetaColRpr",{
    	width: "80px",
 		label: new sap.ui.commons.Label({text: "Sale Port Rating", textAlign : sap.ui.core.TextAlign.End}),
 		hAlign: sap.ui.core.HorizontalAlign.End,
 		template: new sap.ui.commons.TextView().bindProperty("text", "Rpr").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
		 }));
    	
    	// Turn In for Sale Stock 
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "Outst. RA", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("SREDEL",{
			textAlign : sap.ui.core.TextAlign.End,
			enabled: '{enabledSredel}',
			visible: '{enabledSredel}',
				press : function(oEvent) {					
					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   					var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naTINLevel"
   				  	});
   					var oNALTIN = new newnaTINLevel();
   					oNALTIN.getDataTINLevel(region, country, city, pcate, matnr, "SREDEL", selectedRadio, "Turn In for Sale Stock");
				}
			}).bindProperty("text", "Sredel").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	
    	// REM AWAP
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "REM AWAP", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("WEST",{
			textAlign : sap.ui.core.TextAlign.End,
			enabled: '{enabledWest}',
			visible: '{enabledWest}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   					var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naRemarkLevel"
   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNARL.getDataRemarkLevel(region, country, city, pcate, matnr, "AWAP", selectedRadio, "REM AWAP");
   					}
   					else{
   					oNARL.setDataRemarkLevel(region, country, city, pcate, matnr, "AWAP", selectedRadio, "REM AWAP");	
   					}
				}
				
			}).bindProperty("text", "West").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	
    	// CW APPD 
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "CW APPD", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("UNDREP",{
			textAlign : sap.ui.core.TextAlign.End,
			enabled: '{enabledUndrep}',
			visible: '{enabledUndrep}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   					var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naRemarkLevel"
   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNARL.getDataRemarkLevel(region, country, city, pcate, matnr, "UNDREP", selectedRadio, "CW APPD");
   					}
   					else{
   					oNARL.setDataRemarkLevel(region, country, city, pcate, matnr, "UNDREP", selectedRadio, "CW APPD");	
   					}
   					
				}
			}).bindProperty("text", "Undrep").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	
    	// As IS
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "As Is", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.m.Link("ASIS",{
			 enabled: '{enabledAsis}',
			 visible: true,
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
   					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   			  		var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naRemarkLevel"
   				  	});
   			  	  	
   					var oNAUL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataRemarkLevel(region, country, city, pcate, matnr, "ASIS", selectedRadio, "As Is");
   					}
   					else{
	   					oNAUL.setDataRemarkLevel(region, country, city, pcate, matnr, "ASIS", selectedRadio, "As Is");	
   					}
				}
			}).bindProperty("text", "Asis",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;  
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	
    	// Cargoworthy
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "CW", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
		 template: new sap.m.Link("CWORTHY",{
			 enabled: '{enabledCworthy}',
			 visible: true,
			textAlign : sap.ui.core.TextAlign.End,
				press : function(oEvent) {
   					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   			  		var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naRemarkLevel"
   				  	});
   			  	  	
   					var oNAUL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataRemarkLevel(region, country, city, pcate, matnr, "CWORTHY", selectedRadio, "CW");
   					}
   					else{

	   					oNAUL.setDataRemarkLevel(region, country, city, pcate, matnr, "CWORTHY", selectedRadio, "CW");
   					}
				}
			}).bindProperty("text", "Cworthy",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;  
   			}).addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Newavlb",
         //filterProperty: "Conc",
		 }));
    	
    	// CIS/IICL 
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
    		 label: new sap.ui.commons.Label({text: "CIC/IICL", textAlign : sap.ui.core.TextAlign.End}),
    		 hAlign: sap.ui.core.HorizontalAlign.End,
    		 template: new sap.m.Link("IICL",{
    			 enabled: '{enabledIicl}',
    			 visible: true,
    			textAlign : sap.ui.core.TextAlign.End,
   				press : function(oEvent) {
   					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   			  		var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naRemarkLevel"
   				  	});
   			  	  	
   					var oNAUL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   						oNAUL.getDataRemarkLevel(region, country, city, pcate, matnr, "IICL", selectedRadio, "Available - IICL/CIC");
   					}
   					else{
   	   					oNAUL.setDataRemarkLevel(region, country, city, pcate, matnr, "IICL", selectedRadio, "Available - IICL/CIC");	
   					}
   				}
   			}).bindProperty("text", "Iicl",function(cellValue){
   				if(cellValue == 0){
   					cellValue = '';
   				}
    		return cellValue;  
   			}).addStyleClass("wraptext"),
    		 resizable:false,
    	 }));
    	
    	
    	
    	// Booked at factory level
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "Sold Pending PU", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.m.Link("SOLD",{
			textAlign : sap.ui.core.TextAlign.End,
			enabled: '{enabledSold}',
			visible: '{enabledSold}',
				press : function(oEvent) {
					var region = oEvent.getSource().getBindingContext().getProperty("ZRegDesc");
   					var country = oEvent.getSource().getBindingContext().getProperty("ZCouDesc");
   					var city = oEvent.getSource().getBindingContext().getProperty("ZCityDesc");
   					var pcate = oEvent.getSource().getBindingContext().getProperty("Pcate");
   					var matnr = oEvent.getSource().getBindingContext().getProperty("Material");
   					var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
   					var bus = sap.ui.getCore().getEventBus();
   			  	  	bus.publish("nav", "to", {
   			        id : "naRemarkLevel"
   				  	});
   					var oNARL = new newnaRemarkLevel();
   					if(FRNAERPData.length == 0){
						/*sap.ui.commons.MessageBox.show("Loading data from SAP...",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Please Wait...",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);*/
   					oNARL.getDataRemarkLevel(region, country, city, pcate, matnr, "SOLD", selectedRadio, "Sold");
   					}
   					else{
   					oNARL.setDataRemarkLevel(region, country, city, pcate, matnr, "SOLD", selectedRadio, "Sold");	
   					}
   					
				}
			}).bindProperty("text", "Sold").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	
    	
    	// Target CW Inv.
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "90px",
  		 label: new sap.ui.commons.Label({text: "Target CW Inv.", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.ui.commons.TextView().bindProperty("text", "Tri").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	
    	// Open CW Inventory
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
 		 label: new sap.ui.commons.Label({text: "CW Shortage /Surplus", textAlign : sap.ui.core.TextAlign.End}),
 		hAlign: sap.ui.core.HorizontalAlign.End,
 		template: new sap.ui.commons.TextView().bindProperty("text", "Ocwinv").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Conc",
        //filterProperty: "Conc",
		 }));
    	
    	// Market CW Price
    	
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
  		 label: new sap.ui.commons.Label({text: "Market CW Price", textAlign : sap.ui.core.TextAlign.End}),
  		hAlign: sap.ui.core.HorizontalAlign.End,
  		template: new sap.ui.commons.TextView().bindProperty("text", "Trp").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Conc",
         //filterProperty: "Conc",
		 }));
    	

    	

    	
    	/*
    	oTableFRNASummary.addColumn(new sap.ui.table.Column({
   		 width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Net AVLB", textAlign : sap.ui.core.TextAlign.End}),
    		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Netavlb",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               groupingSeparator: ","
           })}
  		 ),
  		 //resizable:false,
           sortProperty: "Netavlb",
           //filterProperty: "Name",
  		 }));
    	*/		 
			 
		/*var oUTLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUTLayout");
   	 
		  // Online Form Starts
		     var oUTForm = new sap.ui.layout.form.Form("idUTForm",{
		             layout: oUTLayout,
		             formContainers: [		                     
		                     new sap.ui.layout.form.FormContainer("idUTFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement("idUTElem1",{
														fields: [oLUpdate]		
													}),
													new sap.ui.layout.form.FormElement("idUTElem2",{
															fields: [buttonFlex]		
														}),
													new sap.ui.layout.form.FormElement("idUTElem3",{
														fields: [oTableFRNASummary]
													}),
													]
		                     })                    
		             ]
		     });	
				
			return oUTForm; */
    	/* MAC31082015 */
    	
    	var ofremnetaToolbar = new sap.m.Toolbar("idfremnetaToolbar",{
    		width:"98%",
    		//height: "90px",
    	}).addStyleClass("marginTop10");
    	ofremnetaToolbar.setDesign(sap.m.ToolbarDesign.Solid);
    	
    	//oToolbar1.addItem(new sap.ui.commons.ToolbarSeparator());
    	
    	var oItemTemplate = new sap.ui.core.Item({  
    		  key : "{key}",  
    		  text : "{text}"  
    		});  
    	
    	var ofremnetaRegionCombo = new sap.m.MultiComboBox({
			id : "idfremnetaRegionCombo", // sap.ui.core.ID
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
				var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.changeCountryCityFilter(control.mProperties.selectedKeys);
				//fremnetaFilter.alterPageOne(control.mProperties.selectedKeys, "ZRegDesc");
				fremnetaFilter.alterPageOne();
				busyDialog.close();
			}, this ],
			selectionFinish : [ function(oEvent) {
				var control = oEvent.getSource();
			}, this ]
    	}).addStyleClass("locationCombo");
    	
    	ofremnetaToolbar.insertContent(ofremnetaRegionCombo, 0);
    	
    	var ofremnetaCountryCombo = new sap.m.MultiComboBox({
			id : "idfremnetaCountryCombo", // sap.ui.core.ID
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
				var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.changeCityFilter(control.mProperties.selectedKeys);
				//fremnetaFilter.alterPageOne(control.mProperties.selectedKeys, "Country");
				fremnetaFilter.alterPageOne();
				busyDialog.close();
			}, this ],
			selectionFinish : [ function(oEvent) {
				var control = oEvent.getSource();
			}, this ]
    	}).addStyleClass("locationCombo");
    	
    	ofremnetaToolbar.insertContent(ofremnetaCountryCombo, 1);
    	
    	var ofremnetaCityCombo = new sap.m.MultiComboBox({
			id : "idfremnetaCityCombo", // sap.ui.core.ID
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
				var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				var control = oEvent.getSource();
			}, this ],
			selectionFinish : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fremnetaFilter = new newfremnetaFilterOuts();
				//fremnetaFilter.alterPageOne(control.mProperties.selectedKeys, "City");
				fremnetaFilter.alterPageOne();
				busyDialog.close();
			}, this ]
    	}).addStyleClass("locationCombo");
    	
    	ofremnetaToolbar.insertContent(ofremnetaCityCombo, 2);
    	
    	ofremnetaToolbar.insertContent(new sap.m.ToolbarSeparator().addStyleClass("toolbarSep"), 4);
    	
    	var ofremnetaProCatCombo = new sap.m.MultiComboBox({
			id : "idfremnetaProCatCombo", // sap.ui.core.ID
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
				var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.changeUnitTypeFilter(control.mProperties.selectedKeys);
				fremnetaFilter.alterPageOne();
				busyDialog.close();
			}, this ],
			selectionFinish : [ function(oEvent) {
				var control = oEvent.getSource();
			}, this ]
    	}).addStyleClass("unitCombo");
    	
    	ofremnetaToolbar.insertContent(ofremnetaProCatCombo, 4);
    	
    	var ofremnetaUnitTypeCombo = new sap.m.MultiComboBox({
			id : "idfremnetaUnitTypeCombo", // sap.ui.core.ID
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
				var control = oEvent.getSource();
			}, this ],
			selectionChange : [ function(oEvent) {
				busyDialog.open();
				var control = oEvent.getSource();
				busyDialog.close();
			}, this ],
			selectionFinish : [ function(oEvent) {
				var control = oEvent.getSource();
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.alterPageOne();
			}, this ]
    	}).addStyleClass("unitCombo");
    	
    	ofremnetaToolbar.insertContent(ofremnetaUnitTypeCombo, 5);
    	
    	var ofremnetaresetFilter = new sap.m.Button("idfremnetaResetFilter",{
            text : "",
            //width : "20px",
            //height : "20px",
            tooltip: "This will reset all the filters and the table data",
            icon: "images/resetfilter.png",
            type:sap.m.ButtonType.Reject,
            press:function(){
            	
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.resetEverything();

        		
            }
         });
    	
    	ofremnetaToolbar.insertContent(ofremnetaresetFilter, 6);
    	
    	/* MAC31082015 */
    	
		var repFlex = new sap.m.FlexBox({
			items: [
                       buttonfremnetaFlex,
                       buttonTotalRows,
                       //oFilterText1,
                       //oFilterText2,
                       //oFilterText3,
                       //oFilterText4,
                       ofremnetaToolbar,
                       oTableFRNASummary,
                       //obtnFRNAViewAll
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");
		
		oCurrent.getFRNASummary();
		
		return repFlex;
		
	},
	
	getFRNASummary: function(){
	busyDialog.open();
		var oCurrent = this;
		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
		OData.request({ 
		      requestUri: fremnetaLink,
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
		    //busyDialog.open();
			if(data.results.length == 0){
		    		sap.ui.commons.MessageBox.show("No Result Found.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    		
					//var loadSecond = new utilreppage();
					//loadSecond.getUTSummary();
		    		busyDialog.close();
		    	}
				else{
					
					// Get Remarketing Data.
					OData.request({ 
					      requestUri: fremnetaLinkERP,
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
					    //busyDialog.open();
						if(data.results.length == 0){
							sap.ui.commons.MessageBox.show("No ERP Data Found.",
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);
							busyDialog.close();
						}
						else{
						FRNAERPData = data.results;
			   			busyDialog.close();
						}
					    },
						function(err){
				    	 busyDialog.close();
				    	 //errorfromServer(err);
				    	 //alert("Error in data read remark. data from SAP ERP System");
					    }); 
					
					FRNASummaryArray = [];
					jsonInventoryFRNA = [];
					sumavUnits = 0;
	    			sumnavUnits = 0;
	    			sumbUnits = 0;
	    			sumsavUnits = 0;
				    
		    		for(var i=0; i<data.results.length; i++){
		    			
		    			if(data.results[i].Leve == 'CITY'){
				    	FRNASummaryArray.push({
		    				"ZRegDesc":data.results[i].ZRegDesc,
		    				"ZCouDesc":data.results[i].ZCouDesc,
		    				"ZCityDesc":data.results[i].ZCityDesc,
				    		"Pcate": data.results[i].Pcate,
		    				"Material": data.results[i].Material,
		    				"Rpr": data.results[i].Rpr,
		    				"Iicl": data.results[i].Iicl,
		    				"Cworthy": data.results[i].Cworthy,
		    				"Asis": data.results[i].Asis,
		    				"Undrep": data.results[i].Undrep,
		    				"Sold": data.results[i].Sold,
		    				"Sredel": data.results[i].Sredel,
		    				"enabledSredel": (data.results[i].Sredel == 0)? false: true,
		    				"Owmepm": data.results[i].Owmepm,
		    				"West": data.results[i].West,
		    				"Tri": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
		    				"Trp": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
		    				"Ocwinv": data.results[i].Ocwinv,
		    				"Leve": data.results[i].Leve,
		    				"enabledIicl": (data.results[i].Iicl == 0)? false: true,
		    				"enabledCworthy": (data.results[i].Cworthy == 0)? false: true,
		    				"enabledAsis": (data.results[i].Asis == 0)? false: true,
    						"enabledUndrep": (data.results[i].Undrep == 0)? false: true,
		    				"enabledSold": (data.results[i].Sold == 0)? false: true,
		    				"enabledOwmepm": (data.results[i].Owmepm == 0)? false: true,
		    				"enabledWest": (data.results[i].West == 0)? false: true
			    			});	
					    	
					    	jsonInventoryFRNA.push({
			    				"Region":data.results[i].ZRegDesc,
			    				"Country":data.results[i].ZCouDesc,
			    				"City":data.results[i].ZCityDesc,
			    				"Category": data.results[i].Pcate,
			    				"Unit Type": data.results[i].Material,
			    				"Remark. Port Rating": data.results[i].Rpr,
			    				"CIC/IICL": data.results[i].Iicl,
			    				"CW": data.results[i].Cworthy,
			    				"As Is": data.results[i].Asis,
			    				"CW APPD": data.results[i].Undrep,
			    				"Turn In for Sale": data.results[i].Sredel,
			    				"Sold Pending PU": data.results[i].Sold,
			    				"REM AWAP": data.results[i].West,
			    				"Target CW Inventory": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
			    				"Target Price": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
			    				"CW Shortage/Surplus": data.results[i].Ocwinv,
			    			});	
		    			}else if(data.results[i].Leve == 'COUN'){
		    				FRNASummaryArrayCou.push({
			    				"ZRegDesc":data.results[i].ZRegDesc,
			    				"ZCouDesc":data.results[i].ZCouDesc,
			    				"ZCityDesc":data.results[i].ZCityDesc,
					    		"Pcate": data.results[i].Pcate,
			    				"Material": data.results[i].Material,
			    				"Rpr": data.results[i].Rpr,
			    				"Iicl": data.results[i].Iicl,
			    				"Cworthy": data.results[i].Cworthy,
			    				"Asis": data.results[i].Asis,
			    				"Undrep": data.results[i].Undrep,
			    				"Sold": data.results[i].Sold,
			    				"Sredel": data.results[i].Sredel,
			    				"enabledSredel": (data.results[i].Sredel == 0)? false: true,
			    				"Owmepm": data.results[i].Owmepm,
			    				"West": data.results[i].West,
			    				"Tri": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
					    		"Trp": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
			    				"Ocwinv": data.results[i].Ocwinv,
			    				"Leve": data.results[i].Leve,
			    				"enabledIicl": (data.results[i].Iicl == 0)? false: true,
			    				"enabledCworthy": (data.results[i].Cworthy == 0)? false: true,
			    				"enabledAsis": (data.results[i].Asis == 0)? false: true,
	    						"enabledUndrep": (data.results[i].Undrep == 0)? false: true,
			    				"enabledSold": (data.results[i].Sold == 0)? false: true,
			    				"enabledOwmepm": (data.results[i].Owmepm == 0)? false: true,
			    				"enabledWest": (data.results[i].West == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":data.results[i].ZRegDesc,
				    				"Country":data.results[i].ZCouDesc,
				    				"City":data.results[i].ZCityDesc,
				    				"Category": data.results[i].Pcate,
				    				"Unit Type": data.results[i].Material,
				    				"Remark. Port Rating": data.results[i].Rpr,
				    				"CIC/IICL": data.results[i].Iicl,
				    				"CW": data.results[i].Cworthy,
				    				"As Is": data.results[i].Asis,
				    				"CW APPD": data.results[i].Undrep,
				    				"Turn In for Sale": data.results[i].Sredel,
				    				"Sold Pending PU": data.results[i].Sold,
				    				"REM AWAP": data.results[i].West,
				    				"Target CW Inventory": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
				    				"Target Price": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
				    				"CW Shortage/Surplus": data.results[i].Ocwinv,
				    			});	
			    			}else if(data.results[i].Leve == 'REGI'){
			    				FRNASummaryArrayReg.push({
				    				"ZRegDesc":data.results[i].ZRegDesc,
				    				"ZCouDesc":data.results[i].ZCouDesc,
				    				"ZCityDesc":data.results[i].ZCityDesc,
						    		"Pcate": data.results[i].Pcate,
				    				"Material": data.results[i].Material,
				    				"Rpr": data.results[i].Rpr,
				    				"Iicl": data.results[i].Iicl,
				    				"Cworthy": data.results[i].Cworthy,
				    				"Asis": data.results[i].Asis,
				    				"Undrep": data.results[i].Undrep,
				    				"Sold": data.results[i].Sold,
				    				"Sredel": data.results[i].Sredel,
				    				"enabledSredel": (data.results[i].Sredel == 0)? false: true,
				    				"Owmepm": data.results[i].Owmepm,
				    				"West": data.results[i].West,
				    				"Tri": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
						    		"Trp": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
				    				"Ocwinv": data.results[i].Ocwinv,
				    				"Leve": data.results[i].Leve,
				    				"enabledIicl": (data.results[i].Iicl == 0)? false: true,
				    				"enabledCworthy": (data.results[i].Cworthy == 0)? false: true,
				    				"enabledAsis": (data.results[i].Asis == 0)? false: true,
		    						"enabledUndrep": (data.results[i].Undrep == 0)? false: true,
				    				"enabledSold": (data.results[i].Sold == 0)? false: true,
				    				"enabledOwmepm": (data.results[i].Owmepm == 0)? false: true,
				    				"enabledWest": (data.results[i].West == 0)? false: true
					    			});	
							    	
							    	jsonInventoryFRNA.push({
					    				"Region":data.results[i].ZRegDesc,
					    				"Country":data.results[i].ZCouDesc,
					    				"City":data.results[i].ZCityDesc,
					    				"Category": data.results[i].Pcate,
					    				"Unit Type": data.results[i].Material,
					    				"Remark. Port Rating": data.results[i].Rpr,
					    				"CIC/IICL": data.results[i].Iicl,
					    				"CW": data.results[i].Cworthy,
					    				"As Is": data.results[i].Asis,
					    				"CW APPD": data.results[i].Undrep,
					    				"Turn In for Sale": data.results[i].Sredel,
					    				"Sold Pending PU": data.results[i].Sold,
					    				"REM AWAP": data.results[i].West,
					    				"Target CW Inventory": (data.results[i].Tri == 99999999)? 'TBA': data.results[i].Tri,
					    				"Target Price": (data.results[i].Trp == 99999999)? 'TBA': data.results[i].Trp,
					    				"CW Shortage/Surplus": data.results[i].Ocwinv,
					    			});	
				    			}
		    		}
		    		
					if(data.results[0].UpDate != ""){
						var updateStringLFNA = 'Dynamic Net-A Report as on ' + data.results[0].UpDate + " " + data.results[0].UpTime + ' GMT';
						sap.ui.getCore().byId("idLFRNAUpdate").setText(updateStringLFNA);
						}
						else{
						var updateStringLFRNA = 'Dynamic Net-A Report ';	
						sap.ui.getCore().byId("idLFRNAUpdate").setText(updateStringLFRNA);
						}
					
		    		
			    	
			    	FRNASummaryArrayBackup = FRNASummaryArray;
		    		oModelEDIFRNASummary = new sap.ui.model.json.JSONModel();
		    		oModelEDIFRNASummary.setData({modelData: FRNASummaryArray});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelEDIFRNASummary);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
              
		            if (FRNASummaryArray.length < 50){
		            	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(FRNASummaryArray.length);
		            	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		            }
		  	    	else{
		  	    		sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  	    		sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(50);
		  	    		var totalPages = (Math.ceil(FRNASummaryArray.length/50));
		  	    		totalPages = "Total No. of Pages : " + totalPages;
		  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
		  	    	}
		            
		            sap.ui.getCore().byId("idTableFRNASummary").onAfterRendering = function() {
					    
					    if (sap.ui.table.Table.prototype.onAfterRendering) {
					    	sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
					    }
					    
					    var tabData = sap.ui.getCore().byId("idTableFRNASummary").getModel().getData().modelData;  
					    var tabDataLength = tabData.length;  
					    var colId = "";  
					    for(var i =0; i<tabDataLength; i++){  
					    colId = "ASIS-col9-row" + i; 
					    $("#"+colId).parent().parent().addClass("lightgreen");
					    $("#"+colId).addClass("lightgreen");
					    
					    colId = "CWORTHY-col10-row" + i; 
					    $("#"+colId).parent().parent().addClass("lightgreen");
					    $("#"+colId).addClass("lightgreen");
					    
					    colId = "IICL-col11-row" + i; 
					    $("#"+colId).parent().parent().addClass("lightgreen");
					    $("#"+colId).addClass("lightgreen");
					    
					    }  
					  };
		        	
		        	//sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(FRNASummaryArrayBackup.length);
		        	}
					
			
//			 var colorRows = function() {  
//		            var rowCount = oTableFRNASummary.getVisibleRowCount(); //number of visible rows  
//		            var rowStart = oTableFRNASummary.getFirstVisibleRow(); //starting Row index  
//		            var currentRowContext;  
//		            for (var i = 0; i < rowCount; i++) {  
//		              currentRowContext = oTableFRNASummary.getContextByIndex(rowStart + i); //content  
//		                // Remove Style class else it will overwrite  
//		              oTableFRNASummary.getRows()[i].$().removeClass("totalColor");  
//		                var cellValue = oModelEDIFRNASummary.getProperty("Material", currentRowContext); // Get Amount  
//		                // Set Row color conditionally  
//		                if (cellValue == " ") {  
//		                    oTable.getRows()[i].$().addClass("totalColor");  
//		                } else {  
//		                    oTable.getRows()[i].$().removeClass("totalColor");  
//		                }  
//		            }  
//		        };
				
				//busyDialog.close();
				
				var fremnetaFilter = new newfremnetaFilterOuts();
				fremnetaFilter.setInitialFilter();
				//var loadSecond = new utilreppage();
				//loadSecond.getUTSummary();
		    	busyDialog.close();
//				 $(document).ready(function() {  
//				var oTableFRNASummary = sap.ui.getCore().byId("idTableFRNASummary");
//		        oCurrent.colorRows(oTableFRNASummary, oModelEDIFRNASummary);
////				oTableFRNASummary._oVSb.attachScroll(function(oTableFRNASummary, oModelEDIFRNASummary) {  
////					oCurrent.colorRows(oTableFRNASummary, oModelEDIFRNASummary);  
////	            });
//				 });
				
				
	              
			},
			function(err){
		    	 //busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from BW Query");
		    });
		
	},
	
	navigToRegion : function(region){
		
  		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "naUnitType"
	  	});
  	  	
		var oNAUT = new naUnitType();
		oNAUT.setDataRegion(region);		
	},
	
	navigToCountry : function(country){
		
  		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "naUnitType"
	  	});
  	  	
		var oNAUT = new naUnitType();
		oNAUT.setDataCountry(country);		
	},
	
	navigToCity : function(city){
		
  		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "naUnitType"
	  	});
  	  	
		var oNAUT = new naUnitType();
		oNAUT.setDataCity(city);		
	},
	
	navigToUnitType : function(unitType){
		
  		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "naUnitType"
	  	});
  	  	
		var oNAUT = new naUnitType();
		oNAUT.setDataUnitType(unitType);		
	},
	
	colorRows : function(oTable, oModel){
        var rowCount = oTable.getVisibleRowCount(); //number of visible rows  
        var rowStart = oTable.getFirstVisibleRow(); //starting Row index  
        var currentRowContext;
        
        for (var i = 0; i < rowCount; i++) {  
          currentRowContext = oTable.getContextByIndex(rowStart + i); //content   
          	if(oModel != undefined){
            var cellValue = oModel.getProperty("Material", currentRowContext); // Get Amount  
        	var tableTag = "$('#idTableFRNASummary-rows-row" + i + "')";
            if (cellValue == "") {
            	//$("#idTableFRNASummary-rows-row0").css("background-color", "red");
            	oTable.getRows()[i].$().addClass("totalColor"); 
            }
            else{
            	//$("#idTableFRNASummary-rows-row0").css("background-color", "");
            	oTable.getRows()[i].$().removeClass("totalColor"); 
            }
          	}
        } 
	},
	
	setVisibility : function(event){
		var count = 0;
		
		if(event.mParameters.value == ""){
			sap.ui.getCore().byId("idTableFRNASummary").setFixedRowCount(1);
		}
		else{
			sap.ui.getCore().byId("idTableFRNASummary").setFixedRowCount(0);
		}
		var column = event.mParameters.column.mProperties.filterProperty;
		var oTable = sap.ui.getCore().byId("idTableFRNASummary");
		var data = oTable.getModel().getData().modelData;
		for(var i=0; i<data.length; i++){
		if(data[i].City == event.mParameters.value)
			count = count + 1;
		}
		
		if(count > 6 || count == 1)
		sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(6);
		else
		sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(count);
		}		
});

function isInArrayFREM(value, array) {
	  return array.indexOf(value) > -1;
	}