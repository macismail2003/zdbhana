/******** NP *******/	

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 25.03.2015
*$*$ Reference   : RTS1097
*$*$ TranspOBK   : CGWK900884
*$*$ Tag         : MAC25032015
*$*$ Purpose     : UI5: Utilization RepOBK
*$*$---------------------------------------------------------------------

*/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var jsonInventoryOBK = [];
var OBKArray = [];
var OBKArrayBackup = [];
sap.ui.model.json.JSONModel.extend("outstandingBookings", {
	
	createOBKPage: function(){
		var oCurrent = this;
	    
		var oOBKUpdate = new sap.ui.commons.Label("idOBKUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    
		var btnOBKRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getOBKSummary();
	          }
		}).addStyleClass("submitBtn");
		
		btnOBKRefresh.setTooltip("TBD Welcome");
		
		/*var btnOBKExport = new sap.m.Button("idExportOBK",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryOBK, "Outstanding Bookings","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnOBKExport = new sap.m.Image("idExportTOBK",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryOBK, "Outstanding Bookings","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		if(isMobile.any()){
			btnOBKExport.setVisible(false);
		}
		
		var OBKViewAll = new sap.m.Button("idOBKViewAll",{
            text : "View All",
            //icon: "images/view_all.png",
            //width : "61px",
            type:sap.m.ButtonType.Unstyled,
            visible:true,
            press:function(){
            	var bus = sap.ui.getCore().getEventBus();
          	  	bus.publish("nav", "to", {
                id : "obkall"
        	  	});
            }
         }).addStyleClass("toolbarBtn marginLeft marginTop10");
		
		var buttonOBKFlex = new sap.m.FlexBox({
			items: [
                       btnOBKRefresh,
                       btnOBKExport,
                       OBKViewAll
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		
		if (!!sap.ui.Device.browser.webkit  
				  && !document.width) {  
				  jQuery.sap.require("sap.ui.core.ScrollBar");  
				  var fnOrg = sap.ui.core.ScrollBar.prototype.onAfterRendering;  
				  sap.ui.core.ScrollBar.prototype.onAfterRendering = function() {  
				  document.width = window.outerWidth;  
				  fnOrg.apply(this, arguments);  
				  document.width = undefined;  
				  };  
				  }  
		
		// Table
    	var oTableOBKSummary = new sap.ui.table.Table("idTableOBKSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            visibleRowCount: 10,
            width:"95%",
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            //height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	 //Table Columns
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "110px",
    		 label: new sap.ui.commons.Label({text: "Booking Number"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "DocNumber"),
    		resizable:false,
          // sOBKFullProperty: "A5ZDEPOCIT",
          // filterProperty: "A5ZDEPOCIT",
  		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "BP Number"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Bpartner").bindProperty("helpId","Bpartner").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		label: new sap.ui.commons.Label({text: "Customer"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));

    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",  
   		 label: new sap.ui.commons.Label({text: "Lease No."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "DocNum").bindProperty("helpId","DocNum").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "75px",
   		 label: new sap.ui.commons.Label({text: "Depot"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZcrmDepi").bindProperty("helpId","ZcrmDepi").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		 label: new sap.ui.commons.Label({text: "Depot Name"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Depot").bindProperty("helpId","Depot").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "City"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Zcity").bindProperty("helpId","Zcity").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Country"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Country").bindProperty("helpId","Country").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Region"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZplanGrp").bindProperty("helpId","ZplanGrp").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "50px",
   		 label: new sap.ui.commons.Label({text: "UTC"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "MaterialZflprodl1").bindProperty("helpId","MaterialZflprodl1").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Mat. No."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Material").bindProperty("helpId","Material").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		 label: new sap.ui.commons.Label({text: "Description"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Mattype").bindProperty("helpId","Mattype").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Start Date"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "HcDatefrm").bindProperty("helpId","HcDatefrm").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "End Date"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "HcDateto").bindProperty("helpId","HcDateto").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "125px",
   		 label: new sap.ui.commons.Label({text: "Creator"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Createdby").bindProperty("helpId","Createdby").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "125px",
   		 label: new sap.ui.commons.Label({text: "Status"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Zusstath").bindProperty("helpId","Zusstath").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "50px",
   		 label: new sap.ui.commons.Label({text: "New Cont."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Zcrmnewu").bindProperty("helpId","Zcrmnewu").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Comments"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZcomDepo").bindProperty("helpId","ZcomDepo").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Ext. Refer"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Crmextrefo").bindProperty("helpId","Crmextrefo").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	
    	
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Quantity", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Quantity").bindProperty("helpId","Quantity").addStyleClass("wraptext"),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Gated Out", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Gatedout").bindProperty("helpId","Gatedout").addStyleClass("wraptext"),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 label: new sap.ui.commons.Label({text: "Oustanding Bookings", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Oreturns").bindProperty("helpId","Oreturns").addStyleClass("wraptext"),
    		 resizable:false,
             //sOBKFullProperty: "Name",
             //filterProperty: "Name",
    		 }));
    	
    	
    	
    	
    	
    	
    	/*
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Quantity", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Quantity",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               //groupingSeparator: ","
           })}
  		 ),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Gated Out", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Gatedout",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               //groupingSeparator: ","
           })}
  		 ),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 label: new sap.ui.commons.Label({text: "Oustanding Bookings", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Oreturns",
   			 type: new sap.ui.model.type.Integer({
                groupingEnabled: false,
                //groupingSeparator: ","
            })}
   		 ),
    		 resizable:false,
             //sOBKFullProperty: "Name",
             //filterProperty: "Name",
    		 }));
    	*/
		var oOBKFilterText = new sap.ui.commons.Label("idOBKFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repOBKFlex = new sap.m.FlexBox("idRepOBKFlex", {
			items: [   
			           oOBKUpdate,
                       buttonOBKFlex,
                       oOBKFilterText,
                       oTableOBKSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		//oCurrent.getOBKSummary();
		return repOBKFlex;
	
			 
	},
	
	getOBKSummary: function(){
	//busyDialog.open();
	
	oModel = new sap.ui.model.odata.ODataModel(netAOBK, true);

	OData.request({ 
	      requestUri: netAOBKService,
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
	    sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n90% Completed');
	    //busyDialog.open();
		if(data.results.length == 0){
			if(OBKArrayBackup.length == 0){
	    		 //busyDialog.close();
	    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Bookings",
                        sap.ui.commons.MessageBox.Icon.WARNING,
                        "Warning",
                        [sap.ui.commons.MessageBox.Action.OK],
                        sap.ui.commons.MessageBox.Action.OK);
	    				sap.ui.getCore().byId("idRepOBKFlex").destroy();
	    				
	    				var loadSeventh = new outstandingReturns();
	    				loadSeventh.getORTSummary();
	    				
	    	}
			else{
	    		var oModelOBKBackup = new sap.ui.model.json.JSONModel();
	    		oModelOBKBackup.setData({modelData: OBKArrayBackup});
	        	sap.ui.getCore().byId("idTableOBKSummary").setModel(oModelOBKBackup);
	        	sap.ui.getCore().byId("idTableOBKSummary").bindRows("/modelData");
	        	sap.ui.getCore().byId("idTableOBKSummary").setVisibleRowCount(10);
	        	
				var loadSeventh = new outstandingReturns();
				loadSeventh.getORTSummary();
			}
			}
	    	else{
			
				OBKArray = [];
				jsonInventoryOBK = [];
    			
	    		for(var i=0; i<data.results.length; i++){

	    			if (i == 0){   	
	    				Timest = data.results[i].Timest;
		    		    var updateStringOBK = 'Outstanding Bookings as on ' + Timest + ' GMT';
		    		    sap.ui.getCore().byId("idOBKUpdate").setText(updateStringOBK);
		    			}
				    
	    			
	    			OBKArray.push({
	    				"DocNumber" :data.results[i].DocNumber ,
	    				"Bpartner" :data.results[i].Bpartner ,
	    				"Customer" :data.results[i].Customer ,
	    				"DocNum" :data.results[i].DocNum ,
	    				"ZcrmDepi" :data.results[i].ZcrmDepi ,
	    				"Depot" :data.results[i].Depot ,
	    				"Zcity" :data.results[i].Zcity ,
	    				"Country" :data.results[i].Country ,
	    				"ZplanGrp" :data.results[i].ZplanGrp ,
	    				"MaterialZflprodl1" :data.results[i].MaterialZflprodl1 ,
	    				"Material" :data.results[i].Material ,
	    				"Mattype" :data.results[i].Mattype ,
	    				"HcDatefrm" :data.results[i].HcDatefrm ,
	    				"HcDateto" :data.results[i].HcDateto ,
	    				"Createdby" :data.results[i].createdby ,
	    				"Zusstath" :data.results[i].Zusstath ,
	    				"Zcrmnewu" :data.results[i].Zcrmnewu ,
	    				"ZcomDepo" :data.results[i].ZcomDepo ,
	    				"Crmextrefo" :data.results[i].crmextrefo ,
	    				"Quantity" :data.results[i].Quantity ,
	    				"Gatedout" :data.results[i].Gatedout ,
	    				"Oreturns" :data.results[i].Oreturns
		    			});	
				    	
				    	jsonInventoryOBK.push({
		    				"Booking Number" :data.results[i].DocNumber ,
		    				"BP Number" :data.results[i].Bpartner ,
		    				"Customer" :data.results[i].Customer ,
		    				"Lease Number" :data.results[i].DocNum ,
		    				"Depot" :data.results[i].ZcrmDepi ,
		    				"Depot Name" :data.results[i].Depot ,
		    				"City" :data.results[i].Zcity ,
		    				"Country" :data.results[i].Country ,
		    				"Region" :data.results[i].ZplanGrp ,
		    				"UTC" :data.results[i].MaterialZflprodl1 ,
		    				"Mat. No." :data.results[i].Material ,
		    				"Description" :data.results[i].Mattype ,
		    				"Start Date" :data.results[i].HcDatefrm ,
		    				"End Date" :data.results[i].HcDateto ,
		    				"Creator" :data.results[i].Createdby ,
		    				"Status" :data.results[i].Zusstath ,
		    				"New Cont." :data.results[i].Zcrmnewu ,
		    				"Comments" :data.results[i].ZcomDepo ,
		    				"Ext. Refer" :data.results[i].Crmextrefo ,
		    				"Quantity" :data.results[i].Quantity ,
		    				"Gated Out" :data.results[i].Gatedout ,
		    				"Outstanding Bookings" :data.results[i].Oreturns
		    			});	
				    	
	    		}
		    	
		    	OBKArrayBackup = OBKArray;
	    		var oModelOBK123 = new sap.ui.model.json.JSONModel();
	    		oModelOBK123.setData({modelData: OBKArray});
	        	sap.ui.getCore().byId("idTableOBKSummary").setModel(oModelOBK123);
	        	sap.ui.getCore().byId("idTableOBKSummary").bindRows("/modelData");
	        	sap.ui.getCore().byId("idTableOBKSummary").setVisibleRowCount(10);
	        	
				var loadSeventh = new outstandingReturns();
				loadSeventh.getORTSummary();
				
	        	}
				
	    	
		//busyDialog.close();
		},
		function(err){
	    	 //busyDialog.close();
	    	 //errorfromServer(err);
	    	 //alert("Error in data read from BW Query");
			sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n90% Completed');
	    });
	
		
	}
		
});