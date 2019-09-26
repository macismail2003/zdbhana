
sap.ui.model.json.JSONModel.extend("feedbackpage", {
	
	/* Save Feedback */
	
	saveFb : function(){
		
		var fbsubject = sap.ui.getCore().byId("idFNETAFeedbackValueSubject").getValue();
		var fbtext = sap.ui.getCore().byId("idFNETAFeedbackValueBody").getValue();
		fbtext = escapeUrl(fbtext);
		fbtext = encodeURIComponent(fbtext);
		
		/* Attachments */
		
		// attachment 1
		var attachment1 = sap.ui.getCore().byId("idFNETAFeedbackAtt1").getValue();


		// attachment 2
		var attachment2 = sap.ui.getCore().byId("idFNETAFeedbackAtt2").getValue();


		// attachment 3
		var attachment3 = sap.ui.getCore().byId("idFNETAFeedbackAtt3").getValue();
		
		var inputString = "?$filter=Fbsubject eq '" + fbsubject +
		 "' and Fbtext eq '" + fbtext +
		 "' and Fbfile1 eq '" + attachment1 +
		 "' and Fbfile2 eq '" + attachment2 +
		 "' and Fbfile3 eq '" + attachment3 +
		 "'";
		
		var urlFinal = fnetaFb + inputString;
		var oCurrent = this;
		console.log(urlFinal);

		busyDialog.open();

		oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
		OData.request({
		requestUri: urlFinal,
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
			//busyDialog.close();
			if(data.results[0].Result == "S"){
				/* Files upload */
				var filenum = 1;
				oCurrent.filesUpload(filenum);
			}else{
				console.log("feedback submission failure");
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert("Cannot submit feedback now!");
			}
		},function(err){
			console.log("feedback submission failure");
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert("Cannot submit feedback now!");
			busyDialog.close();
		});

	},
	
	/* Files Upload */

	filesUpload : function(filenum){
		
		if(filenum == 4){
			busyDialog.close();
			sap.ui.getCore().byId("idFNETAFeedbackPopover").close();
			sap.m.MessageToast.show('feedback submitted!');
			console.log("feedback submitted!");
			
		}else{
		var oCurrent = this;
		var oFReader = new FileReader();
		
		var serviceUrlRCNDoc = "";
		var HomeUrlHash = window.location.href.replace(window.location.hash,'');
		var urlSplitHome = HomeUrlHash.split('/');
		if(urlSplitHome[2] == "newseaweb.seacoglobal.com" || urlSplitHome[2] == "seaweb.seacoglobal.com"){
			 serviceUrlRCNDoc = "https://" + urlSplitHome[2] + "/sap/opu/odata/sap/ZUTIL_ERP_SRV";
		}
		else{
			 serviceUrlRCNDoc = "http://" + urlSplitHome[2] + "/sap/opu/odata/sap/ZUTIL_ERP_SRV";
		}
		
		var oFileMultiple = sap.ui.getCore().byId("idFNETAFeedbackAtt" + filenum);
		oFileMultiple.destroyParameters();
		oFileMultiple.setAdditionalData('');
		oFileMultiple.removeAllHeaderParameters();
		
		if(oFileMultiple.oFileUpload.files[0] != undefined && oFileMultiple.oFileUpload.files[0] != null){
			oFReader.readAsDataURL(oFileMultiple.oFileUpload.files[0]);
			
			oModel = new sap.ui.model.odata.ODataModel(serviceUrlRCNDoc, true);
			oFileMultiple.removeAllHeaderParameters();
			oFileMultiple.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
					{
						name : "slug",
						value : oFileMultiple.getValue()
					}));
			
			oFileMultiple.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
					{
						name : "x-csrf-token",
						value : oModel.getSecurityToken()
					}));
			
			oFileMultiple.setSendXHR(true);
			//oFileMultiple.setMultiple(false);
			oFileMultiple.setUseMultipart(false);
			//oFileMultiple.setMimeType("application/xlsx");
			
			var attachmentId = "idFNETAFeedbackAtt" + filenum;
			var fileName = sap.ui.getCore().byId(attachmentId).getValue();
			
			filenum = filenum + 1;
			var sRead = fnetaFbFiles + "(Filename='" + fileName + "')" + "/Attachments" ;
			oFileMultiple.setUploadUrl(sRead);
			oFileMultiple.upload();
			
			oFileMultiple.attachUploadComplete(function(oControllerEvent) {
	            var statuscode = oControllerEvent.getParameter("status");
	            console.log('File number ', (filenum - 1), ' upload status : ', statuscode);
	            //if(statuscode == '201'){
	            	oCurrent.filesUpload(filenum);
	            //}
	        });
			
		}else{
			filenum = filenum + 1;
			oCurrent.filesUpload(filenum);
		}
		}
	},
	
});

function escapeUrl(url) {
	url = url.replace(/'/g, "");
    //url = escape(url);
    return url;
}
