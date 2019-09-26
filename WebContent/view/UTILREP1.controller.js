sap.ui.controller("view.UTILREP1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.systemmonitor
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.systemmonitor
*/
//	onBeforeRendering: function() {
//		 busyDialog.open();
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.systemmonitor
*/
	onAfterRendering: function() {
// //		var oTable = sap.ui.getCore().byId("idTableFNASummary");
// //        var oModel = oTable.getModel();
// //		 var abc = new fneta().colorRows(oTable, oModel);
// 		$('#idFormulaHover').jBox('Tooltip', {
// 			position: {
// 				x: 'right',
// 				y: 'center'
// 			},
// 			outside: 'x' // Horizontal Tooltips need to change their outside position
// 		});
		
// 		$('#idfremNetaFormula').jBox('Tooltip', {
// 			position: {
// 				x: 'right',
// 				y: 'center'
// 			},
// 			outside: 'x' // Horizontal Tooltips need to change their outside position
// 		});
		
// 		$('#idResetFilter').jBox('Tooltip');
		
// 		$('#idToolbarFormulaHover').jBox('Tooltip', {
// 			position: {
// 				x: 'right',
// 				y: 'center'
// 			},
// 			outside: 'x' // Horizontal Tooltips need to change their outside position
// 		});
		
// 		$('#idButtonDownloadDNA').jBox('Tooltip', {
// 			position: {
// 				x: 'right',
// 				y: 'center'
// 			},
// 			outside: 'x' // Horizontal Tooltips need to change their outside position
// 		});
			  
		
	},
	
	openUserGuide : function(oEvent){

		var primageReadURL =  fnetaService + "/primageSet(Type='" + "PR" + "')/$value";
		
        if(sap.ui.getCore().byId("idFNETAUserGuidePopover") != undefined)
          	 sap.ui.getCore().byId("idFNETAUserGuidePopover").destroy();
        
		var oFNETAUserGuidePopover = new sap.m.Popover("idFNETAUserGuidePopover",{
            title: "User Guide",
            modal: false,
            placement: sap.m.PlacementType.Right,
            content: /*new sap.m.VBox({
                                    //width:"300px",
                                    items:  [ new sap.m.Image({
		                                        width: "80%",
		                                        src: primageReadURL
		                                     })]
                                    }),*/
            		new sap.ui.layout.form.Form({
		             layout: new sap.ui.layout.form.ResponsiveGridLayout({columnsL: 2}),
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer({
		                    	 title : "Port Rating Description",
	                             formElements: [
	                                            	new sap.ui.layout.form.FormElement({
													    fields: [new sap.m.Image({
							                                        width: "100%",
							                                        src: primageReadURL
							                                     })
													    ]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer({
		                    	 title : "User Guide",
	                             formElements: [
                           	            new sap.ui.layout.form.FormElement({
											    fields: [new sap.m.Image({
					                                        width: "150px",
					                                        height: "140px",
					                                        src: "images/userguideicon.png",
					                                        press : function(){
					                                        var userguideReadURL =  fnetaService + "/userguideSet(Dtype='" + "UG" + "')";
				                                        	busyDialog.open();
				                                    		OData.request({ 
				                                    		      requestUri: userguideReadURL,
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
				                                    		    	if(data.Prstring){
				                                    		    	var ext = 'pdf';
//					                                    		    	var ext = data.FileExt.toLowerCase();
				                                    		    	//get file content
				                                    		    	var byteCharacters = atob(data.Prstring);
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
					                                     })
											    ]
											})
	                          ]
		                     })
		             ]
		     })

            }).addStyleClass("sapUiPopupWithPadding");
		 	
		 oFNETAUserGuidePopover.openBy(oEvent.getSource());
		 
	},
	
	openFeedBackForm : function(oEvent){
		
        
        /* Subject */
		 
        if(sap.ui.getCore().byId("idFNETAFeedbackValueSubject") != undefined)
       	 sap.ui.getCore().byId("idFNETAFeedbackValueSubject").destroy();
        
        if(sap.ui.getCore().byId("idFNETAFeedbackLabelSubject") != undefined)
       	 sap.ui.getCore().byId("idFNETAFeedbackLabelSubject").destroy();
        
        var oFNETAFeedbackValueSubject = new sap.m.Input("idFNETAFeedbackValueSubject",{
        																 placeholder : "Subject",
												                         value : "",
												                         maxLength : 100,
												                         //type : sap.m.InputType.Email,
												                         width : "275px",
												                         }).addStyleClass("selectionLabels1");
        
        var oFNETAFeedbackLabelSubject = new sap.m.Label("idFNETAFeedbackLabelSubject",{
            text : "Subject : ",
            labelFor: oFNETAFeedbackValueSubject,
            width : "180px"
            }).addStyleClass("selectionLabels");
        
        var oFNETAFeedbackFlexSubject = new sap.m.FlexBox({
                                                       items: [oFNETAFeedbackLabelSubject,
                                                               oFNETAFeedbackValueSubject
                                                               ],
                                                       direction: "Row"
                                                       });
        
        
        /* Body */
		 
        if(sap.ui.getCore().byId("idFNETAFeedbackValueBody") != undefined)
       	 sap.ui.getCore().byId("idFNETAFeedbackValueBody").destroy();
        
        if(sap.ui.getCore().byId("idFNETAFeedbackLabelBody") != undefined)
       	 sap.ui.getCore().byId("idFNETAFeedbackLabelBody").destroy();
        
        var oFNETAFeedbackValueBody = new sap.m.TextArea("idFNETAFeedbackValueBody",{
					    					placeholder : "Enter your feedback(max. 1000 char.)",
					    					maxLength : 1000,
					    					height : "150px",
					    					width : "600px",
					    					enabled : true
					    					}).addStyleClass("feedbackPanel");
        
        var oFNETAFeedbackLabelBody = new sap.m.Label("idFNETAFeedbackLabelBody",{
            text : "Feedback : ",
            labelFor: oFNETAFeedbackValueBody,
            width : "180px"
            }).addStyleClass("selectionLabels");
        
        var oFNETAFeedbackFlexBody = new sap.m.FlexBox({
                                                       items: [oFNETAFeedbackLabelBody,
                                                               oFNETAFeedbackValueBody
                                                               ],
                                                       direction: "Row"
                                                       });
        
        
        var oFNETAFeedbackFlexFinal = new sap.m.FlexBox({
            items: [
                    	oFNETAFeedbackFlexSubject,
                    	oFNETAFeedbackFlexBody
                    ],
            direction: "Column"
            });
        
        if(sap.ui.getCore().byId("idFNETAFeedbackPopover") != undefined)
       	 sap.ui.getCore().byId("idFNETAFeedbackPopover").destroy();
        
        if(sap.ui.getCore().byId("idFNETAFeedbackAtt1") != undefined)
         	 sap.ui.getCore().byId("idFNETAFeedbackAtt1").destroy();
        
        if(sap.ui.getCore().byId("idFNETAFeedbackAtt2") != undefined)
         	 sap.ui.getCore().byId("idFNETAFeedbackAtt2").destroy();
        
        if(sap.ui.getCore().byId("idFNETAFeedbackAtt3") != undefined)
          	 sap.ui.getCore().byId("idFNETAFeedbackAtt3").destroy();
        
		 var oFNETAFeedbackPopover = new sap.m.Popover("idFNETAFeedbackPopover",{
            title: "Feedback Form",
            modal: true,
            placement: sap.m.PlacementType.Right,
            footer:  new sap.m.Bar({
            	contentLeft : [
            	               
							new sap.ui.unified.FileUploader("idFNETAFeedbackAtt1",{
							  	name : "uploadfileData",
									uploadUrl : "UploadServlet",
									//width: "200px",
									//value : "",
									icon : "sap-icon://attachment",
									buttonOnly : true,
									buttonText : "Attachm. 1",
									sameFilenameAllowed : false,
									additionalData : "abc=123&test=456",
									//layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12", linebreak: false, margin: true}),
									change : function(oEvent) {
										var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
										
										jQuery.sap.require("sap.ui.commons.MessageBox");
										if($.inArray(ext, ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'jpg', 'png', 'csv', 'zip', 'txt']) == -1) {	// MAC13092017_8 added txt
											oEvent.oSource.setValue('');
											oEvent.oSource.oFilePath.setValue('');
											
											sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
											this.setIcon("sap-icon://attachment");
											this.setButtonText("Attachm. 1");
											return false;
										}
							
										var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
										if(chkSpclChar.length > 1){
											oEvent.oSource.setValue('');
											oEvent.oSource.oFilePath.setValue('');
											sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
											this.setIcon("sap-icon://attachment");
											this.setButtonText("Attachm. 1");
											return false;
										}
							
										chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
										if(chkSpclChar.length > 2){
											oEvent.oSource.setValue('');
											oEvent.oSource.oFilePath.setValue('');
											sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
											this.setIcon("sap-icon://attachment");
											this.setButtonText("Attachm. 1");
											return false;
										}
										this.setIcon("sap-icon://message-success");
										this.setButtonText(ext);
									}
							 		}),
							 		
							 		new sap.ui.unified.FileUploader("idFNETAFeedbackAtt2",{
									  	name : "uploadfileData",
											uploadUrl : "UploadServlet",
											//width: "200px",
											//value : "",
											icon : "sap-icon://attachment",
											buttonOnly : true,
											buttonText : "Attachm. 2",
											sameFilenameAllowed : false,
											additionalData : "abc=123&test=456",
											//layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12", linebreak: false, margin: true}),
											change : function(oEvent) {
												var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
												
												jQuery.sap.require("sap.ui.commons.MessageBox");
												if($.inArray(ext, ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'jpg', 'png', 'csv', 'zip', 'txt']) == -1) {	// MAC13092017_8 added txt
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													
													sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
													this.setIcon("sap-icon://attachment");
													this.setButtonText("Attachm. 2");
													return false;
												}
									
												var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
												if(chkSpclChar.length > 1){
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
													this.setIcon("sap-icon://attachment");
													this.setButtonText("Attachm. 2");
													return false;
												}
									
												chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
												if(chkSpclChar.length > 2){
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
													this.setIcon("sap-icon://attachment");
													this.setButtonText("Attachm. 2");
													return false;
												}
												this.setIcon("sap-icon://message-success");
												this.setButtonText(ext);
											}
									 		}),
									 		
									 		new sap.ui.unified.FileUploader("idFNETAFeedbackAtt3",{
											  	name : "uploadfileData",
													uploadUrl : "UploadServlet",
													//width: "200px",
													//value : "",
													icon : "sap-icon://attachment",
													buttonOnly : true,
													buttonText : "Attachm. 3",
													sameFilenameAllowed : false,
													additionalData : "abc=123&test=456",
													//layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12", linebreak: false, margin: true}),
													change : function(oEvent) {
														var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
														
														jQuery.sap.require("sap.ui.commons.MessageBox");
														if($.inArray(ext, ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'jpg', 'png', 'csv', 'zip', 'txt']) == -1) {	// MAC13092017_8 added txt
															oEvent.oSource.setValue('');
															oEvent.oSource.oFilePath.setValue('');
															
															sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
															this.setIcon("sap-icon://attachment");
															this.setButtonText("Attachm. 3");
															return false;
														}
											
														var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
														if(chkSpclChar.length > 1){
															oEvent.oSource.setValue('');
															oEvent.oSource.oFilePath.setValue('');
															sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
															this.setIcon("sap-icon://attachment");
															this.setButtonText("Attachm. 3");
															return false;
														}
											
														chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
														if(chkSpclChar.length > 2){
															oEvent.oSource.setValue('');
															oEvent.oSource.oFilePath.setValue('');
															sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
															this.setIcon("sap-icon://attachment");
															this.setButtonText("Attachm. 3");
															return false;
														}
														this.setIcon("sap-icon://message-success");
														this.setButtonText(ext);
													}
											 		})
							   
							
							
							
							],
            	
                                   contentRight: [
                                                 new sap.m.Button({
                                                                  text: "Send",
                                                                  icon: "sap-icon://email",
                                                                  type:sap.m.ButtonType.Accept,
                                                                  press: function (oEvent) {
                                                            	    var ofeedback = new feedbackpage();
                                                            	  	var oFNETAFeedbackValueBody = sap.ui.getCore().byId("idFNETAFeedbackValueBody").getValue();
                          					    					if (!oFNETAFeedbackValueBody.replace(/\s/g, '').length) {					    					    
                          					    						sap.m.MessageToast.show('Please provide your feedback!');
                          					    					}else{
                          					    						ofeedback.saveFb();
                          					    					}
                                                                  }
                                                                  }).addStyleClass("footerBtn"),
                                                                  
                                                                  new sap.m.Button({
                                                                      text: "Close",
                                                                      icon: "sap-icon://decline",
                                                                      type:sap.m.ButtonType.Reject,
                                                                      press: function () {
                                                          				jQuery.sap.require("sap.ui.commons.MessageBox");
                                                        				sap.ui.commons.MessageBox.show("Draft feedback will be discarded!",	// MAC13092017_1 + it will go one page back
                                                        			        	sap.ui.commons.MessageBox.Icon.WARNING,
                                                        			        	"Close?",
                                                        			        	[sap.ui.commons.MessageBox.Action.OK, sap.ui.commons.MessageBox.Action.CANCEL],
                                                        			        	function popupClose(response){
                                                        							if(response == "OK")
                                                        								sap.ui.getCore().byId("idFNETAFeedbackPopover").close();         
                                                        						},sap.ui.commons.MessageBox.Action.OK);
                                                                      }
                                                                    }).addStyleClass("footerBtn")
                                                 ],
                                   }),
            content: new sap.m.VBox({
                                    //width:"300px",
                                    items:  [oFNETAFeedbackFlexFinal]
                                    }),

            }).addStyleClass("sapUiPopupWithPadding");
		 	
		 oFNETAFeedbackPopover.openBy(oEvent.getSource());
		 
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.systemmonitor
*/
//	onExit: function() {
//	busyDialog.close();
//	}

});