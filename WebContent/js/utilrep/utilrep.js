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
var jsonInventory = [];
var UTSummaryArray = [];
var UTClassArray = [];
sap.ui.model.json.JSONModel.extend("utilreppage", {
	
	createUTPage: function(){
		
		var oCurrent = this;
		var oLUpdate = new sap.ui.commons.Label("idLUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 

		
		var btnRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getUTSummary();
	          }
		}).addStyleClass("submitBtn");
		
		/*var btnNaExport = new sap.m.Button("idExportUti",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventory, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnNaExport = new sap.m.Image("idExportUti",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventory, "UTE Summary","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		
		
		if(isMobile.any()){
			btnNaExport.setVisible(false);
		}
		
		var buttonNaFlex = new sap.m.FlexBox({
			items: [
                       btnRefresh,
                       btnNaExport
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		// Table
    	var oTableUTSummary = new sap.ui.table.Table("idTableUTSummary",{
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,  
            width: "30%",
            height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	 //Table Columns
    	/*oTableUTSummary.addColumn(new sap.ui.table.Column({
			 width: "45%",
      		 label: new sap.ui.commons.Label({text: "Category"}),
      		template: new sap.ui.commons.Link({
				press : function() {
					oCurrent.navigToClass(this.getHelpId());
				}
			}).bindProperty("text", "Eqcat").bindProperty("helpId","Eqcat").addStyleClass("wraptext"),
    		 resizable:false,
             //sortProperty: "Eqcat",
             //filterProperty: "Depot",
    		 }));
    	*/
    	oTableUTSummary.addColumn(new sap.ui.table.Column({
			 width: "45%",
     		 label: new sap.ui.commons.Label({text: "Category"}),
     		 template: new sap.m.Link({
				press : function() {
					oCurrent.navigToClass(this.getText());
				}
			}).bindProperty("text", "Eqcat").addStyleClass("wraptext"),
   		 resizable:false,
            //sortProperty: "Eqcat",
            //filterProperty: "Depot",
   		 }));
	
    	oTableUTSummary.addColumn(new sap.ui.table.Column({
    		 width: "25%",
      		 label: new sap.ui.commons.Label({text: "On Lease", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Noles",
   			 type: new sap.ui.model.type.Integer({
                groupingEnabled: true,
                groupingSeparator: ","
            })}
   		 ),
    		 resizable:false,
             //sortProperty: "Name",
             //filterProperty: "Name",
    		 }));
    	
    	oTableUTSummary.addColumn(new sap.ui.table.Column({
    		 width: "25%",
     		 label: new sap.ui.commons.Label({text: "Total", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Notot",
   			 type: new sap.ui.model.type.Integer({
                groupingEnabled: true,
                groupingSeparator: ","
            })}
   		 ),
   		 resizable:false,
            //sortProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableUTSummary.addColumn(new sap.ui.table.Column({
   		 width: "30%",
    		 label: new sap.ui.commons.Label({text: "Utilization %", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "Utiliz"),
  		 resizable:false,
           //sortProperty: "Name",
           //filterProperty: "Name",
  		 }));
			 
			 
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
														fields: [oTableUTSummary]
													}),
													]
		                     })                    
		             ]
		     });	
				
			return oUTForm; */
		var oUTEFilterText = new sap.ui.commons.Label("idUTEFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repFlex = new sap.m.FlexBox({
			items: [   oLUpdate,
                       buttonNaFlex,
                       oUTEFilterText,
                       oTableUTSummary
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");
		
		//oCurrent.getUTSummary();
		return repFlex;
			 
	},
	
	getUTSummary: function(){
	//busyDialog.open();
	
		oModel = new sap.ui.model.odata.ODataModel(serviceUTE, true);
		var urlUT = serviceUTE + "/ZUTIL_SUMS?$filter=Reqtype eq 'F'";
		
		OData.request({ 
		      requestUri: urlUT,
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
		    sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n12% Completed');
			if(data.results.length == 0){
		    		 //busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No Result Found. Check data in SAP.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    		
					var loadThird = new topbookcustpage();
					loadThird.getTBCSummary();
		    		
		    	}
		    	else{
				
					UTSummaryArray = [];
					jsonInventory = [];
		    		for(var i=0; i<data.results.length; i++){
		    			
		    			var vUpdateDate = data.results[i].Zdate.split("(");
					    var vUpdateDates = vUpdateDate[1].split(")");
					    //var vformattedUpdatedDate = new Date(Number(vUpdateDates[0]));
					    var updatedDate = dateFormat(new Date(Number(vUpdateDates[0])), 'dd-mm-yyyy',"UTC");
					    
					    var updateString = 'UTE Report as on ' + updatedDate + ' 02:00:00 GMT';
					    
					    sap.ui.getCore().byId("idLUpdate").setText(updateString);
					    
					    	UTSummaryArray.push({
				    				"Eqcat": data.results[i].Eqcat,
				    				//"Matnr": data.results[i].Matnr,
				    				"Noles": data.results[i].Noles,
				    				"Notot": data.results[i].Notot,
				    				"Utiliz": data.results[i].Utiliz
				    			});	
					    	
					    	jsonInventory.push({
			    				"Equipment Category": data.results[i].Eqcat,
			    				//"Matnr": data.results[i].Matnr,
			    				"On Lease": data.results[i].Noles,
			    				"Total": data.results[i].Notot,
			    				"Utilization %": data.results[i].Utiliz
			    			});	
					    	
		    		}
		    		
		    		var oModelEDIUTSummary = new sap.ui.model.json.JSONModel();
		    		oModelEDIUTSummary.setData({modelData: UTSummaryArray});
		        	sap.ui.getCore().byId("idTableUTSummary").setModel(oModelEDIUTSummary);
		        	sap.ui.getCore().byId("idTableUTSummary").bindRows("/modelData");
		        	
		        	sap.ui.getCore().byId("idTableUTSummary").setVisibleRowCount(UTSummaryArray.length);	
		        	
					var loadThird = new topbookcustpage();
					loadThird.getTBCSummary();
					
					}
			//busyDialog.close();
			},
			function(err){
				 sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n12% Completed');
		    	 //busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP");
		    });
		
	},
	
	navigToClass : function(eqclass){
		
  		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "utilclass"
	  	});
  	  	
		var oUTC = new utilclasspage();
		oUTC.getUTC(eqclass);
		

		
	}
		
});