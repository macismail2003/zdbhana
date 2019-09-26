jQuery.sap.require("sap.ui.model.json.JSONModel");

var FRNASummaryArrayFiltered = [];  
var FRNASummaryArrayFinal = []; 


var proCatBuffer = [];
var unitTypeFilterDataR = {  
		  items:[]  
		};

var proCatFilterDataR = {  
		  items:[]  
		};

var regionFilterDataR = {  
		  items:[]  
		};

var countryFilterDataR = {  
		  items:[]  
		};

var cityFilterDataR = {  
		  items:[]  
		};

var unitTypeFilterGData = {  
		  items:[]  
		};

var proCatFilterGData = {  
		  items:[]  
		};

var regionFilterGData = {  
		  items:[]  
		};

var countryFilterGData = {  
		  items:[]  
		};

var cityFilterGData = {  
		  items:[]  
		};

var sumIicl;
var sumCworthy;
var sumAsis;
var sumUndrep;
var sumWest;
var sumSredel;
var sumSold;
var sumTri;
var sumTrp;
var aveTrp;
var sumOcwinv;
var count;

var numIicl;
var numCworthy;
var numAsis;
var numUndrep;
var numWest;
var numSredel;
var numSold;
var numTri;
var numTrp;
var numOcwinv;


sap.ui.model.json.JSONModel.extend("newfremnetaFilterOuts", {
	
	setInitialFilter : function(){
		
		/*Set Values for the filter MAC31082015*/
		
		// For Product Category... 
		
		proCatFilterDataR.items = [];  
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if(FRNASummaryArray[j].Pcate != ''){
    			proCatFilterDataR.items.push({
    			"text":FRNASummaryArray[j].Pcate,
    			"key":FRNASummaryArray[j].Pcate
    		});
    		}
    	}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=proCatFilterDataR.items.length; i < len; i++ )
    	    arr[proCatFilterDataR.items[i]['text']] = proCatFilterDataR.items[i];

    	proCatFilterDataR.items = [];
    	for ( var key in arr )
    		proCatFilterDataR.items.push(arr[key]);
    	proCatFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	proCatFilterGData.items = proCatFilterDataR.items;
    	
    	
    	var proCatModel = new sap.ui.model.json.JSONModel(proCatFilterDataR);
    	proCatModel.setSizeLimit(proCatFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaProCatCombo").setModel(proCatModel);
    	
    	for ( var k=0; k<proCatFilterDataR.items.length; k++ )
    		proCatBuffer.push(proCatFilterDataR.items[k].key);
    	

		// For Unit Type 
		
		unitTypeFilterDataR.items = [];  
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if((FRNASummaryArray[j].Material != '') && !(isInArrayFREM1(FRNASummaryArray[j].Material, proCatBuffer))){
    		unitTypeFilterDataR.items.push({
    			"text":FRNASummaryArray[j].Material,
    			"key":FRNASummaryArray[j].Material
    		});
    		}
    	}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=unitTypeFilterDataR.items.length; i < len; i++ )
    	    arr[unitTypeFilterDataR.items[i]['text']] = unitTypeFilterDataR.items[i];

    	unitTypeFilterDataR.items = [];
    	for ( var key in arr )
    		unitTypeFilterDataR.items.push(arr[key]);
    	unitTypeFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	unitTypeFilterGData.items = unitTypeFilterDataR.items;
    	
    	
    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterDataR);
    	unitTypeModel.setSizeLimit(unitTypeFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaUnitTypeCombo").setModel(unitTypeModel);
    	
//    	for ( var k=0; k<proCatFilterDataR.items.length; k++ )
//    		proCatBuffer.push(proCatFilterDataR.items[k].key);
//    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterDataR);
//    	unitTypeModel.setSizeLimit(unitTypeFilterDataR.items.length);
//    	sap.ui.getCore().byId("idfremnetaUnitTypeCombo").setModel(unitTypeModel);
    	
		
    	// For Region... 
		
		regionFilterDataR.items = [];  
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if(FRNASummaryArray[j].ZRegDesc != ''){
    			regionFilterDataR.items.push({
    			"text":FRNASummaryArray[j].ZRegDesc,
    			"key":FRNASummaryArray[j].ZRegDesc
    		});
    		}
    	}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=regionFilterDataR.items.length; i < len; i++ )
    	    arr[regionFilterDataR.items[i]['text']] = regionFilterDataR.items[i];

    	regionFilterDataR.items = [];
    	for ( var key in arr )
    		regionFilterDataR.items.push(arr[key]);
    	
    	regionFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	regionFilterGData.items = regionFilterDataR.items;
    	
    	
    	var regionModel = new sap.ui.model.json.JSONModel(regionFilterDataR);
    	regionModel.setSizeLimit(regionFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaRegionCombo").setModel(regionModel);
    	
    	//for ( var k=0; k<regionFilterDataR.items.length; k++ )
    		//regionBuffer.push(regionFilterDataR.items[k].key);
    	
    	// For Country... 
		
		countryFilterDataR.items = [];  
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if(FRNASummaryArray[j].ZCouDesc != ''){
    			countryFilterDataR.items.push({
    			"text":FRNASummaryArray[j].ZCouDesc,
    			"key":FRNASummaryArray[j].ZCouDesc
    		});
    		}
    	}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=countryFilterDataR.items.length; i < len; i++ )
    	    arr[countryFilterDataR.items[i]['text']] = countryFilterDataR.items[i];

    	countryFilterDataR.items = [];
    	for ( var key in arr )
    		countryFilterDataR.items.push(arr[key]);
    	
    	countryFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	countryFilterGData.items = countryFilterDataR.items;
    	
    	
    	var countryModel = new sap.ui.model.json.JSONModel(countryFilterDataR);
    	countryModel.setSizeLimit(countryFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaCountryCombo").setModel(countryModel);
    	
    	//for ( var k=0; k<countryFilterDataR.items.length; k++ )
    		//countryBuffer.push(countryFilterDataR.items[k].key);
    	
    	// For City... 
		
		cityFilterDataR.items = [];  
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if(FRNASummaryArray[j].ZCityDesc != ''){
    			cityFilterDataR.items.push({
    			"text":FRNASummaryArray[j].ZCityDesc,
    			"key":FRNASummaryArray[j].ZCityDesc
    		});
    		}
    	}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=cityFilterDataR.items.length; i < len; i++ )
    	    arr[cityFilterDataR.items[i]['text']] = cityFilterDataR.items[i];

    	cityFilterDataR.items = [];
    	for ( var key in arr )
    		cityFilterDataR.items.push(arr[key]);
    	cityFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	cityFilterGData.items = cityFilterDataR.items;
    	
    	
    	var cityModel = new sap.ui.model.json.JSONModel(cityFilterDataR);
    	cityModel.setSizeLimit(cityFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaCityCombo").setModel(cityModel);
    	
    	//for ( var k=0; k<cityFilterDataR.items.length; k++ )
    		//cityBuffer.push(cityFilterDataR.items[k].key);
    	
		/*Set Values for the filter MAC31082015*/ 
    	
	},
	
	/* Whenever there is a change in Product Category filter, change the entries in Unit Type filter accordingly*/
	changeUnitTypeFilter : function(proCatFilterDataR){
		unitTypeFilterDataR.items = [];
		if(proCatFilterDataR.length != 0){
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		if((isInArrayFREM1(FRNASummaryArray[j].Pcate, proCatFilterDataR)) && !(isInArrayFREM1(FRNASummaryArray[j].Material, proCatBuffer))){
	    		unitTypeFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].Material,
	    			"key":FRNASummaryArray[j].Material
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		unitTypeFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].Material,
	    			"key":FRNASummaryArray[j].Material
	    		});
	    		}
		}

    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=unitTypeFilterDataR.items.length; i < len; i++ )
    	    arr[unitTypeFilterDataR.items[i]['text']] = unitTypeFilterDataR.items[i];

    	unitTypeFilterDataR.items = [];
    	for ( var key in arr )
    		unitTypeFilterDataR.items.push(arr[key]);
    	unitTypeFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	
    	var unitTypeModel = new sap.ui.model.json.JSONModel(unitTypeFilterDataR);
    	unitTypeModel.setSizeLimit(unitTypeFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaUnitTypeCombo").setModel(unitTypeModel);
    	
    	sap.ui.getCore().byId("idfremnetaUnitTypeCombo").getModel().updateBindings();
	},
	
	/* Whenever there is a change in Region filter, change the entries in Country and City filters accordingly*/
	changeCountryCityFilter : function(regionFilterDataR){
		
		// Arranging items in country filter...
		countryFilterDataR.items = [];
		if(regionFilterDataR.length != 0){
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		if((isInArrayFREM1(FRNASummaryArray[j].ZRegDesc, regionFilterDataR))){
	    		countryFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].ZCouDesc,
	    			"key":FRNASummaryArray[j].ZCouDesc
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		if(FRNASummaryArray[j].ZCouDesc != ''){
	    		countryFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].ZCouDesc,
	    			"key":FRNASummaryArray[j].ZCouDesc
	    		});
	    		}
	    	}
		}

    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=countryFilterDataR.items.length; i < len; i++ )
    	    arr[countryFilterDataR.items[i]['text']] = countryFilterDataR.items[i];

    	countryFilterDataR.items = [];
    	for ( var key in arr )
    		countryFilterDataR.items.push(arr[key]);
    	countryFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	
    	var countryModel = new sap.ui.model.json.JSONModel(countryFilterDataR);
    	countryModel.setSizeLimit(countryFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaCountryCombo").setModel(countryModel);
    	
    	sap.ui.getCore().byId("idfremnetaCountryCombo").getModel().updateBindings();
    	
    	
    	// Arranging items in city filter...
		cityFilterDataR.items = [];
		if(regionFilterDataR.length != 0){
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if((isInArrayFREM1(FRNASummaryArray[j].ZRegDesc, regionFilterDataR))){
    		cityFilterDataR.items.push({
    			"text":FRNASummaryArray[j].ZCityDesc,
    			"key":FRNASummaryArray[j].ZCityDesc
    		});
    		}
    	}
		}
		else{
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		if(FRNASummaryArray[j].ZCouDesc != ''){
	    		cityFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].ZCityDesc,
	    			"key":FRNASummaryArray[j].ZCityDesc
	    		});
	    	}
	    	}
		}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=cityFilterDataR.items.length; i < len; i++ )
    	    arr[cityFilterDataR.items[i]['text']] = cityFilterDataR.items[i];

    	cityFilterDataR.items = [];
    	for ( var key in arr )
    		cityFilterDataR.items.push(arr[key]);
    	cityFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	
    	var cityModel = new sap.ui.model.json.JSONModel(cityFilterDataR);
    	cityModel.setSizeLimit(unitTypeFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaCityCombo").setModel(cityModel);
    	
    	sap.ui.getCore().byId("idfremnetaCityCombo").getModel().updateBindings();
    	
	},
	
	/* Whenever there is a change in Country filter, change the entries in City filter accordingly*/
	changeCityFilter : function(countryFilterDataR){
		var regionFilterDataR = sap.ui.getCore().byId("idfremnetaRegionCombo").getSelectedKeys();
    	// Arranging items in city filter...
		cityFilterDataR.items = [];
		if(countryFilterDataR.length != 0){
    	for(var j=0;j<FRNASummaryArray.length;j++){
    		if((isInArrayFREM1(FRNASummaryArray[j].ZCouDesc, countryFilterDataR))){
    		cityFilterDataR.items.push({
    			"text":FRNASummaryArray[j].ZCityDesc,
    			"key":FRNASummaryArray[j].ZCityDesc
    		});
    		}
    	}
		}
		else if(regionFilterDataR.length != 0){
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		if((isInArrayFREM1(FRNASummaryArray[j].ZRegDesc, regionFilterDataR))){
	    		cityFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].ZCityDesc,
	    			"key":FRNASummaryArray[j].ZCityDesc
	    		});
	    		}
	    	}
		}
		else{
	    	for(var j=0;j<FRNASummaryArray.length;j++){
	    		if(FRNASummaryArray[j].ZRegDesc != ''){
	    		cityFilterDataR.items.push({
	    			"text":FRNASummaryArray[j].ZCityDesc,
	    			"key":FRNASummaryArray[j].ZCityDesc
	    		});
	    		}
	    	}
		}
    	
    		// Remove Duplicates
    	
    	var arr = {};

    	for ( var i=0, len=cityFilterDataR.items.length; i < len; i++ )
    	    arr[cityFilterDataR.items[i]['text']] = cityFilterDataR.items[i];

    	cityFilterDataR.items = [];
    	for ( var key in arr )
    		cityFilterDataR.items.push(arr[key]);
    	cityFilterDataR.items.sort(sort_by('text', false, function(a){return a.toUpperCase()}));
    	
    	var cityModel = new sap.ui.model.json.JSONModel(cityFilterDataR);
    	cityModel.setSizeLimit(cityFilterDataR.items.length);
    	sap.ui.getCore().byId("idfremnetaCityCombo").setModel(cityModel);
    	
    	sap.ui.getCore().byId("idfremnetaCityCombo").getModel().updateBindings();
    	
		},
		
		
		alterPageOne : function(){
			
			/* On the select event of the combo boxes,  check which level (Region, Country or City) is selected and move accordingly*/
			
			var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta").getSelectedItem().getText();
        	if(selectedRadio == "Country Level"){
        		this.alterPageOneCountryLevel();
        	}
        	else if(selectedRadio == "City Level"){
        		this.alterPageOneCityLevel();
        	}
        	else if(selectedRadio == "Region Level"){
        		this.alterPageOneRegionLevel();
        	}
        	
        	var actualRows = sap.ui.getCore().byId("idTableFRNASummary").getModel().getData().modelData.length;
        	var requestedRows = Number(sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue());
        	
        	if(actualRows < requestedRows){
        		sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(actualRows);
        	}
		},
		
		
		/* if the region level is selected ... */
		alterPageOneRegionLevel : function(){
			var regionValues = sap.ui.getCore().byId("idfremnetaRegionCombo").getSelectedKeys();
			var unitTypeValues = sap.ui.getCore().byId("idfremnetaUnitTypeCombo").getSelectedKeys();
			var regionLength = regionValues.length;
			var unitTypeLength = unitTypeValues.length;
			var proCatValues = sap.ui.getCore().byId("idfremnetaProCatCombo").getSelectedKeys();			
			var proCatLength = proCatValues.length;
			var totalLength = FRNASummaryArrayReg.length;
//			var localSummaryArray = [];
			jsonInventoryFRNAReg = [];
			FRNASummaryArrayRegFiltered = [];
			FRNASummaryArrayRegFinal = [];
			
			sumIicl = 0;
			sumCworthy = 0;
			sumAsis = 0;
			sumUndrep = 0;
			sumWest = 0;
			sumSold = 0;
			sumSredel = 0;
			sumTri = 0;
			sumTrp = 0;
			sumOcwinv = 0;
			count = 0;
			aveTrp = 0;
			
			numIicl = 0;
			numCworthy = 0;
			numAsis = 0;
			numUndrep = 0;
			numWest = 0;
			numSold = 0;
			numTri = 0;
			numTrp = 0;
			numOcwinv = 0;
			
			
			for(var j=0;j<FRNASummaryArrayReg.length;j++){
				if(FRNASummaryArrayReg[j].ZRegDesc != ""){
				count = count + 1;	
				numIicl = Number(FRNASummaryArrayReg[j].Iicl); 
				numCworthy = Number(FRNASummaryArrayReg[j].Cworthy);
				numAsis = Number(FRNASummaryArrayReg[j].Asis);
				numUndrep = Number(FRNASummaryArrayReg[j].Undrep);
				numWest = Number(FRNASummaryArrayReg[j].West);
				numSold = Number(FRNASummaryArrayReg[j].Sold);
				numSredel = Number(FRNASummaryArrayReg[j].Sredel);
				numTri = Number(FRNASummaryArrayReg[j].Tri);
				numOcwinv = Number(FRNASummaryArrayReg[j].Ocwinv);
				numTrp = Number(FRNASummaryArrayReg[j].Trp);
				
				
				
				sumIicl = numIicl + sumIicl;
				sumCworthy = numCworthy + sumCworthy;
				sumAsis = numAsis + sumAsis;
				sumUndrep = numUndrep + sumUndrep;
				sumWest = numWest + sumWest;
				sumSredel = numSredel + sumSredel;
				sumSold = numSold + sumSold;
				if(numTri != 'TBA')
				sumTri = numTri + sumTri;
				if(numTrp != 'TBA')
				sumTrp = numTrp + sumTrp;
				sumOcwinv = numOcwinv + sumOcwinv;
				
				if(j != (totalLength - 1)){
				if(FRNASummaryArrayReg[j+1].ZRegDesc != FRNASummaryArrayReg[j].ZRegDesc || FRNASummaryArrayReg[j+1].Material != FRNASummaryArrayReg[j].Material){
				if(sumTrp != 0)
				aveTrp = parseInt(sumTrp/count);	
    			FRNASummaryArrayRegFiltered.push({
		    		"Pcate": FRNASummaryArrayReg[j].Pcate,
    				"Material": FRNASummaryArrayReg[j].Material,
    				"ZRegDesc":FRNASummaryArrayReg[j].ZRegDesc,
    				"ZCouDesc":FRNASummaryArrayReg[j].ZCouDesc,
    				"ZCityDesc":FRNASummaryArrayReg[j].ZCityDesc,
    				"Iicl": sumIicl,
    				"Cworthy": sumCworthy,
    				"Asis": sumAsis,
    				"Undrep": sumUndrep,
    				"West": sumWest,
    				"Sold": sumSold,
    				"Sredel": sumSredel,
    				"enabledSredel": (sumSredel == 0)? false: true,
    				"Tri": sumTri,
    				"Ocwinv": sumOcwinv,
    				"Trp": aveTrp,
    				"enabledIicl": (sumIicl == 0)? false: true,
    				"enabledCworthy": (sumCworthy == 0)? false: true,
    				"enabledAsis": (sumAsis == 0)? false: true,
					"enabledUndrep": (sumUndrep == 0)? false: true,
    				"enabledWest": (sumWest == 0)? false: true,
    				"enabledSold": (sumSold == 0)? false: true
	    			});	
			    	
			    	jsonInventoryFRNAReg.push({
	    				"Region":FRNASummaryArrayReg[j].ZRegDesc,
	    				"Country":FRNASummaryArrayReg[j].ZCouDesc,
	    				"City":FRNASummaryArrayReg[j].ZCityDesc,
			    		"Prod. Category": FRNASummaryArrayReg[j].Pcate,
	    				"Type": FRNASummaryArrayReg[j].Material,
	    				"CIC/IICL": sumIicl,
	    				"CW": sumCworthy,
	    				"As Is": sumAsis,
	    				"CW APPD": sumUndrep,
	    				"REM AWAP": sumWest,
	    				"Sold Pending PU": sumSold,
	    				"Turn In for Sale Stock": sumSredel,
	    				"Target CW Inventory": sumTri,
	    				"CW Shortage/Surplus": sumOcwinv,
	    				"Target Price": aveTrp,
	    			});	
			    	
					sumIicl = 0;
					sumCworthy = 0;
					sumAsis = 0;
					sumUndrep = 0;
					sumWest = 0;
					sumSold = 0;
					sumSredel = 0;
					sumTri = 0;
					sumTrp = 0;
					sumOcwinv = 0;
					aveTrp = 0;
					count = 0;
				}
				}
				else{
					if(sumTrp != 0)
						aveTrp = parseInt(sumTrp/count);
					FRNASummaryArrayRegFiltered.push({
			    		"Pcate": FRNASummaryArrayReg[j].Pcate,
	    				"Material": FRNASummaryArrayReg[j].Material,
	    				"ZRegDesc":FRNASummaryArrayReg[j].ZRegDesc,
	    				"ZCouDesc":FRNASummaryArrayReg[j].ZCouDesc,
	    				"ZCityDesc":FRNASummaryArrayReg[j].ZCityDesc,
	    				"Iicl": sumIicl,
	    				"Cworthy": sumCworthy,
	    				"Asis": sumAsis,
	    				"Undrep": sumUndrep,
	    				"West": sumWest,
	    				"Sold": sumSold,
	    				"Sredel": sumSredel,
	    				"enabledSredel": (sumSredel == 0)? false: true,
	    				"Tri": sumTri,
	    				"Ocwinv": sumOcwinv,
	    				"Trp": aveTrp,
	    				"enabledIicl": (sumIicl == 0)? false: true,
	    				"enabledCworthy": (sumCworthy == 0)? false: true,
	    				"enabledAsis": (sumAsis == 0)? false: true,
						"enabledUndrep": (sumUndrep == 0)? false: true,
	    				"enabledWest": (sumWest == 0)? false: true,
	    				"enabledSold": (sumSold == 0)? false: true
		    			});	
				    	
				    	jsonInventoryFRNAReg.push({
		    				"Region":FRNASummaryArrayReg[j].ZRegDesc,
		    				"Country":FRNASummaryArrayReg[j].ZCouDesc,
		    				"City":FRNASummaryArrayReg[j].ZCityDesc,
				    		"Prod. Category": FRNASummaryArrayReg[j].Pcate,
		    				"Type": FRNASummaryArrayReg[j].Material,
		    				"CIC/IICL": sumIicl,
		    				"CW": sumCworthy,
		    				"As Is": sumAsis,
		    				"CW APPD": sumUndrep,
		    				"REM AWAP": sumWest,
		    				"Sold Pending PU": sumSold,
		    				"Turn In for Sale Stock": sumSredel,
		    				"Target CW Inventory": sumTri,
		    				"CW Shortage/Surplus": sumOcwinv,
		    				"Target Price": aveTrp,
		    			});	
				    	
						sumIicl = 0;
						sumCworthy = 0;
						sumAsis = 0;
						sumUndrep = 0;
						sumWest = 0;
						sumSold = 0;
						sumSredel = 0;
						sumTri = 0;
						sumTrp = 0;
						sumOcwinv = 0;
						aveTrp = 0;
						count = 0;
				}
				}
	    		}
			
			
			
			
			/* Check for any filters ... */
			if(unitTypeLength != 0){
			 if(regionLength != 0){
					
					jsonInventoryFRNAReg = [];
					FRNASummaryArrayRegFinal = [];
					for(var j=0;j<FRNASummaryArrayRegFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayRegFiltered[j].ZRegDesc, regionValues)) && (isInArrayFREM1(FRNASummaryArrayRegFiltered[j].Material, unitTypeValues))){
			    			
							FRNASummaryArrayRegFinal.push({
					    		"Pcate": FRNASummaryArrayRegFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayRegFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayRegFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayRegFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayRegFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayRegFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayRegFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayRegFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayRegFiltered[j].Undrep,
			    				"West": FRNASummaryArrayRegFiltered[j].West,
			    				"Sold": FRNASummaryArrayRegFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayRegFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayRegFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayRegFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayRegFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayRegFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayRegFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayRegFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayRegFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayRegFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayRegFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayRegFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNAReg.push({
			    				"Region":FRNASummaryArrayRegFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayRegFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayRegFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayRegFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayRegFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayRegFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayRegFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayRegFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayRegFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayRegFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayRegFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayRegFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayRegFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayRegFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayRegFiltered[j].Trp,
			    			});	
						    	
						    	
						}
			    		}
					}
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayRegFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		        	
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
		        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
		        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
		        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayRegFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
		            /*if (FRNASummaryArrayRegFinal.length < 50){
		            	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(FRNASummaryArrayRegFinal.length);
		            	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		            	sap.ui.getCore().byId("idTotalPagesfremneta").setText("");
		            }
		  	    	else{
		  	    		sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  	    		var totalLines = sap.ui.getCore().byId("idTableFRNASummary").getModel().getData().modelData.length;
		  	    		var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
		  	    		if(requestedLines < totalLines){
		  					newValue = Number(newValue);
		  					sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(newValue);
		  					var totalPages = (Math.ceil(totalLines/newValue));
		  	  	    		totalPages = "Total No. of Pages : " + totalPages;
		  	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
		  	    		}
		  	    	}*/
			 	}
				
			
			else if(proCatLength != 0){
				if(regionLength != 0){
									
									jsonInventoryFRNAReg = [];
									FRNASummaryArrayRegFinal = [];
									for(var j=0;j<FRNASummaryArrayRegFiltered.length;j++){
										if((isInArrayFREM1(FRNASummaryArrayRegFiltered[j].ZRegDesc, regionValues)) && (isInArrayFREM1(FRNASummaryArrayRegFiltered[j].Pcate, proCatValues))){
							    			
											FRNASummaryArrayRegFinal.push({
									    		"Pcate": FRNASummaryArrayRegFiltered[j].Pcate,
							    				"Material": FRNASummaryArrayRegFiltered[j].Material,
							    				"ZRegDesc":FRNASummaryArrayRegFiltered[j].ZRegDesc,
							    				"ZCouDesc":FRNASummaryArrayRegFiltered[j].ZCouDesc,
							    				"ZCityDesc":FRNASummaryArrayRegFiltered[j].ZCityDesc,
							    				"Iicl": FRNASummaryArrayRegFiltered[j].Iicl,
							    				"Cworthy": FRNASummaryArrayRegFiltered[j].Cworthy,
							    				"Asis": FRNASummaryArrayRegFiltered[j].Asis,
							    				"Undrep": FRNASummaryArrayRegFiltered[j].Undrep,
							    				"West": FRNASummaryArrayRegFiltered[j].West,
							    				"Sold": FRNASummaryArrayRegFiltered[j].Sold,
							    				"Sredel": FRNASummaryArrayRegFiltered[j].Sredel,
							    				"enabledSredel": (FRNASummaryArrayRegFiltered[j].Sredel == 0)? false: true,
							    				"Tri": FRNASummaryArrayRegFiltered[j].Tri,
							    				"Ocwinv": FRNASummaryArrayRegFiltered[j].Ocwinv,
							    				"Trp": FRNASummaryArrayRegFiltered[j].Trp,
							    				"enabledIicl": (FRNASummaryArrayRegFiltered[j].Iicl == 0)? false: true,
							    				"enabledCworthy": (FRNASummaryArrayRegFiltered[j].Cworthy == 0)? false: true,
							    				"enabledAsis": (FRNASummaryArrayRegFiltered[j].Asis == 0)? false: true,
												"enabledUndrep": (FRNASummaryArrayRegFiltered[j].Undrep == 0)? false: true,
							    				"enabledWest": (FRNASummaryArrayRegFiltered[j].West == 0)? false: true,
							    				"enabledSold": (FRNASummaryArrayRegFiltered[j].Sold == 0)? false: true
								    			});	
										    	
									    	jsonInventoryFRNAReg.push({
							    				"Region":FRNASummaryArrayRegFiltered[j].ZRegDesc,
							    				"Country":FRNASummaryArrayRegFiltered[j].ZCouDesc,
							    				"City":FRNASummaryArrayRegFiltered[j].ZCityDesc,
									    		"Prod. Category": FRNASummaryArrayRegFiltered[j].Pcate,
							    				"Type": FRNASummaryArrayRegFiltered[j].Material,
							    				"CIC/IICL": FRNASummaryArrayRegFiltered[j].Iicl,
							    				"CW": FRNASummaryArrayRegFiltered[j].Cworthy,
							    				"As Is": FRNASummaryArrayRegFiltered[j].Asis,
							    				"CW APPD": FRNASummaryArrayRegFiltered[j].Undrep,
							    				"REM AWAP": FRNASummaryArrayRegFiltered[j].West,
							    				"Sold Pending PU": FRNASummaryArrayRegFiltered[j].Sold,
							    				"Turn In for Sale Stock": FRNASummaryArrayRegFiltered[j].Sredel,
							    				"Target CW Inventory": FRNASummaryArrayRegFiltered[j].Tri,
							    				"CW Shortage/Surplus": FRNASummaryArrayRegFiltered[j].Ocwinv,
							    				"Target Price": FRNASummaryArrayRegFiltered[j].Trp,
							    			});	
										    	
										    	
							    		}
							    		}
									
						    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
						    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayRegFinal});
						        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
						        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
						      
						        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
							        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
							        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
							        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
						        	requestedLines = Number(requestedLines);
						        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
						        	if(pagingMode == 1){
						        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
						        	}
						        	else{
						        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						        	}
						        	
					  	    		var totalPages = (Math.ceil(FRNASummaryArrayRegFinal.length/requestedLines));
					  	    		totalPages = "Total No. of Pages : " + totalPages;
					  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
								}

				}
			
				
			else{
				
				
				
				
				if(regionLength != 0){
					
					jsonInventoryFRNAReg = [];
					FRNASummaryArrayRegFinal = [];
					for(var j=0;j<FRNASummaryArrayRegFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayRegFiltered[j].ZRegDesc, regionValues))){
			    			
							FRNASummaryArrayRegFinal.push({
					    		"Pcate": FRNASummaryArrayRegFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayRegFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayRegFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayRegFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayRegFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayRegFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayRegFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayRegFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayRegFiltered[j].Undrep,
			    				"West": FRNASummaryArrayRegFiltered[j].West,
			    				"Sold": FRNASummaryArrayRegFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayRegFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayRegFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayRegFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayRegFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayRegFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayRegFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayRegFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayRegFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayRegFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayRegFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayRegFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNAReg.push({
			    				"Region":FRNASummaryArrayRegFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayRegFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayRegFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayRegFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayRegFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayRegFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayRegFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayRegFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayRegFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayRegFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayRegFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayRegFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayRegFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayRegFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayRegFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayRegFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayRegFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				
				else{
					var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayRegFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		            
		            
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayRegFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				
			}
			 
		},
		
		
		
		
		
		
		
		
		
		/* if the country level is selected ... */
		alterPageOneCountryLevel : function(){
			var regionValues = sap.ui.getCore().byId("idfremnetaRegionCombo").getSelectedKeys();
			var countryValues = sap.ui.getCore().byId("idfremnetaCountryCombo").getSelectedKeys();
			var proCatValues = sap.ui.getCore().byId("idfremnetaProCatCombo").getSelectedKeys();
			var unitTypeValues = sap.ui.getCore().byId("idfremnetaUnitTypeCombo").getSelectedKeys();
			
			var proCatLength = proCatValues.length;
			var unitTypeLength = unitTypeValues.length;
			var regionLength = regionValues.length;
			var countryLength = countryValues.length;
			var totalLength = FRNASummaryArray.length;
			
			
			
			
			
			
			
			
			jsonInventoryFRNACou = [];
			FRNASummaryArrayCouFiltered = [];
			FRNASummaryArrayCouFinal = [];
			
			sumIicl = 0;
			sumCworthy = 0;
			sumAsis = 0;
			sumUndrep = 0;
			sumWest = 0;
			sumSredel = 0;
			sumTri = 0;
			sumTrp = 0;
			sumOcwinv = 0;
			aveTrp = 0;
			count = 0;
			
			numIicl = 0;
			numCworthy = 0;
			numAsis = 0;
			numUndrep = 0;
			numWest = 0;
			numSredel = 0;
			numTri = 0;
			numTrp = 0;
			numOcwinv = 0;
			
			for(var j=0;j<FRNASummaryArrayCou.length;j++){
				if(FRNASummaryArrayCou[j].ZRegDesc != ""){
				count = count + 1;	
				numIicl =  (FRNASummaryArrayCou[j].Iicl); 
				numCworthy =  (FRNASummaryArrayCou[j].Cworthy);
				numAsis =  (FRNASummaryArrayCou[j].Asis);
				numUndrep =  (FRNASummaryArrayCou[j].Undrep);
				numWest =  (FRNASummaryArrayCou[j].West);
				numSredel =  (FRNASummaryArrayCou[j].Sredel);
				numTri =  (FRNASummaryArrayCou[j].Tri);
				numOcwinv =  (FRNASummaryArrayCou[j].Ocwinv);
				numTrp =  (FRNASummaryArrayCou[j].Trp);
				
				
				
				sumIicl = numIicl + sumIicl;
				sumCworthy = numCworthy + sumCworthy;
				sumAsis = numAsis + sumAsis;
				sumUndrep = numUndrep + sumUndrep;
				sumWest = numWest + sumWest;
				sumSredel = numSredel + sumSredel;
				if(numTri != 'TBA')
					sumTri = numTri + sumTri;
				if(numTrp != 'TBA')
					sumTrp = numTrp + sumTrp;
				sumOcwinv = numOcwinv + sumOcwinv;
				
				if(j != (totalLength - 1)){
				if(FRNASummaryArrayCou[j+1].ZCouDesc != FRNASummaryArrayCou[j].ZCouDesc || FRNASummaryArrayCou[j+1].Material != FRNASummaryArrayCou[j].Material){
					if(sumTrp != 0)
						aveTrp = parseInt(sumTrp/count);	
					FRNASummaryArrayCouFiltered.push({
			    		"Pcate": FRNASummaryArrayCou[j].Pcate,
	    				"Material": FRNASummaryArrayCou[j].Material,
	    				"ZRegDesc":FRNASummaryArrayCou[j].ZRegDesc,
	    				"ZCouDesc":FRNASummaryArrayCou[j].ZCouDesc,
	    				"ZCityDesc":FRNASummaryArrayCou[j].ZCityDesc,
	    				"Iicl": sumIicl,
	    				"Cworthy": sumCworthy,
	    				"Asis": sumAsis,
	    				"Undrep": sumUndrep,
	    				"West": sumWest,
	    				"Sold": sumSold,
	    				"Sredel": sumSredel,
	    				"enabledSredel": (sumSredel == 0)? false: true,
	    				"Tri": sumTri,
	    				"Ocwinv": sumOcwinv,
	    				"Trp": aveTrp,
	    				"enabledIicl": (sumIicl == 0)? false: true,
	    				"enabledCworthy": (sumCworthy == 0)? false: true,
	    				"enabledAsis": (sumAsis == 0)? false: true,
						"enabledUndrep": (sumUndrep == 0)? false: true,
	    				"enabledWest": (sumWest == 0)? false: true,
	    				"enabledSold": (sumSold == 0)? false: true
		    			});	
				    	
				    	jsonInventoryFRNACou.push({
		    				"Region":FRNASummaryArrayCou[j].ZRegDesc,
		    				"Country":FRNASummaryArrayCou[j].ZCouDesc,
		    				"City":FRNASummaryArrayCou[j].ZCityDesc,
				    		"Prod. Category": FRNASummaryArrayCou[j].Pcate,
		    				"Type": FRNASummaryArrayCou[j].Material,
		    				"CIC/IICL": sumIicl,
		    				"CW": sumCworthy,
		    				"As Is": sumAsis,
		    				"CW APPD": sumUndrep,
		    				"REM AWAP": sumWest,
		    				"Sold Pending PU": sumSold,
		    				"Turn In for Sale Stock": sumSredel,
		    				"Target CW Inventory": sumTri,
		    				"CW Shortage/Surplus": sumOcwinv,
		    				"Target Price": aveTrp,
		    			});	
			    	
					sumIicl = 0;
					sumCworthy = 0;
					sumAsis = 0;
					sumUndrep = 0;
					sumWest = 0;
					sumSredel = 0;
					sumTri = 0;
					sumTrp = 0;
					sumOcwinv = 0;
					aveTrp = 0;
					count = 0;
				}
				}
				else{
					if(sumTrp != 0)
						aveTrp = parseInt(sumTrp/count);	
					FRNASummaryArrayCouFiltered.push({
			    		"Pcate": FRNASummaryArrayCou[j].Pcate,
	    				"Material": FRNASummaryArrayCou[j].Material,
	    				"ZRegDesc":FRNASummaryArrayCou[j].ZRegDesc,
	    				"ZCouDesc":FRNASummaryArrayCou[j].ZCouDesc,
	    				"ZCityDesc":FRNASummaryArrayCou[j].ZCityDesc,
	    				"Iicl": sumIicl,
	    				"Cworthy": sumCworthy,
	    				"Asis": sumAsis,
	    				"Undrep": sumUndrep,
	    				"West": sumWest,
	    				"Sold": sumSold,
	    				"Sredel": sumSredel,
	    				"enabledSredel": (sumSredel == 0)? false: true,
	    				"Tri": sumTri,
	    				"Ocwinv": sumOcwinv,
	    				"Trp": aveTrp.toFixed(2),
	    				"enabledIicl": (sumIicl == 0)? false: true,
	    				"enabledCworthy": (sumCworthy == 0)? false: true,
	    				"enabledAsis": (sumAsis == 0)? false: true,
						"enabledUndrep": (sumUndrep == 0)? false: true,
	    				"enabledWest": (sumWest == 0)? false: true,
	    				"enabledSold": (sumSold == 0)? false: true
		    			});	
				    	
				    	jsonInventoryFRNACou.push({
		    				"Region":FRNASummaryArrayCou[j].ZRegDesc,
		    				"Country":FRNASummaryArrayCou[j].ZCouDesc,
		    				"City":FRNASummaryArrayCou[j].ZCityDesc,
				    		"Prod. Category": FRNASummaryArrayCou[j].Pcate,
		    				"Type": FRNASummaryArrayCou[j].Material,
		    				"CIC/IICL": sumIicl,
		    				"CW": sumCworthy,
		    				"As Is": sumAsis,
		    				"CW APPD": sumUndrep,
		    				"REM AWAP": sumWest,
		    				"Sold Pending PU": sumSold,
		    				"Turn In for Sale Stock": sumSredel,
		    				"Target CW Inventory": sumTri,
		    				"CW Shortage/Surplus": sumOcwinv,
		    				"Target Price": aveTrp.toFixed(2),
		    			});	
			    	
					sumIicl = 0;
					sumCworthy = 0;
					sumAsis = 0;
					sumUndrep = 0;
					sumWest = 0;
					sumSredel = 0;
					sumTri = 0;
					sumTrp = 0;
					sumOcwinv = 0;
					aveTrp = 0;
					count = 0;
				}
				}
	    		}
			
			
			
			
			
			/* At first point, check if the city filter has got any values. If yes, happily set that data in the table*/
			
			if(unitTypeLength != 0){
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				if(countryLength != 0){
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayCouFiltered[j].ZCouDesc, countryValues)) && (isInArrayFREM1(FRNASummaryArrayCouFiltered[j].Material, unitTypeValues))){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayCouFiltered[j].ZRegDesc, regionValues)) && (isInArrayFREM1(FRNASummaryArrayCouFiltered[j].Material, unitTypeValues))){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
						}
			    		
					}
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if(isInArrayFREM1(FRNASummaryArrayCouFiltered[j].Material, unitTypeValues)){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
		            
				}
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			else if(proCatLength != 0){
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				if(countryLength != 0){
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayCouFiltered[j].ZCouDesc, countryValues)) && (isInArrayFREM1(FRNASummaryArrayCouFiltered[j].Pcate, proCatValues))){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayCouFiltered[j].ZRegDesc, regionValues)) && (isInArrayFREM1(FRNASummaryArrayCouFiltered[j].Pcate, proCatValues))){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if(isInArrayFREM1(FRNASummaryArrayCouFiltered[j].Pcate, proCatValues)){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
		            
				}
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			else{
				if(countryLength != 0){
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
						if((isInArrayFREM1(FRNASummaryArrayCouFiltered[j].ZCouDesc, countryValues))){
			    			
							FRNASummaryArrayCouFinal.push({
					    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Material": FRNASummaryArrayCouFiltered[j].Material,
			    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
			    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
			    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"West": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
			    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
			    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
				    			});	
						    	
					    	jsonInventoryFRNACou.push({
			    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
			    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
			    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
					    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
			    				"Type": FRNASummaryArrayCouFiltered[j].Material,
			    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
			    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
			    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
			    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
			    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
			    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
			    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
			    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
			    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
			    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
			    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){
					
					jsonInventoryFRNACou = [];
					FRNASummaryArrayCouFinal = [];
					for(var j=0;j<FRNASummaryArrayCouFiltered.length;j++){
					if((isInArrayFREM1(FRNASummaryArrayCouFiltered[j].ZRegDesc, regionValues))){
			    			
						FRNASummaryArrayCouFinal.push({
				    		"Pcate": FRNASummaryArrayCouFiltered[j].Pcate,
		    				"Material": FRNASummaryArrayCouFiltered[j].Material,
		    				"ZRegDesc":FRNASummaryArrayCouFiltered[j].ZRegDesc,
		    				"ZCouDesc":FRNASummaryArrayCouFiltered[j].ZCouDesc,
		    				"ZCityDesc":FRNASummaryArrayCouFiltered[j].ZCityDesc,
		    				"Iicl": FRNASummaryArrayCouFiltered[j].Iicl,
		    				"Cworthy": FRNASummaryArrayCouFiltered[j].Cworthy,
		    				"Asis": FRNASummaryArrayCouFiltered[j].Asis,
		    				"Undrep": FRNASummaryArrayCouFiltered[j].Undrep,
		    				"West": FRNASummaryArrayCouFiltered[j].West,
		    				"Sold": FRNASummaryArrayCouFiltered[j].Sold,
		    				"Sredel": FRNASummaryArrayCouFiltered[j].Sredel,
		    				"enabledSredel": (FRNASummaryArrayCouFiltered[j].Sredel == 0)? false: true,
		    				"Tri": FRNASummaryArrayCouFiltered[j].Tri,
		    				"Ocwinv": FRNASummaryArrayCouFiltered[j].Ocwinv,
		    				"Trp": FRNASummaryArrayCouFiltered[j].Trp,
		    				"enabledIicl": (FRNASummaryArrayCouFiltered[j].Iicl == 0)? false: true,
		    				"enabledCworthy": (FRNASummaryArrayCouFiltered[j].Cworthy == 0)? false: true,
		    				"enabledAsis": (FRNASummaryArrayCouFiltered[j].Asis == 0)? false: true,
							"enabledUndrep": (FRNASummaryArrayCouFiltered[j].Undrep == 0)? false: true,
		    				"enabledWest": (FRNASummaryArrayCouFiltered[j].West == 0)? false: true,
		    				"enabledSold": (FRNASummaryArrayCouFiltered[j].Sold == 0)? false: true
			    			});	
					    	
				    	jsonInventoryFRNACou.push({
		    				"Region":FRNASummaryArrayCouFiltered[j].ZRegDesc,
		    				"Country":FRNASummaryArrayCouFiltered[j].ZCouDesc,
		    				"City":FRNASummaryArrayCouFiltered[j].ZCityDesc,
				    		"Prod. Category": FRNASummaryArrayCouFiltered[j].Pcate,
		    				"Type": FRNASummaryArrayCouFiltered[j].Material,
		    				"CIC/IICL": FRNASummaryArrayCouFiltered[j].Iicl,
		    				"CW": FRNASummaryArrayCouFiltered[j].Cworthy,
		    				"As Is": FRNASummaryArrayCouFiltered[j].Asis,
		    				"CW APPD": FRNASummaryArrayCouFiltered[j].Undrep,
		    				"REM AWAP": FRNASummaryArrayCouFiltered[j].West,
		    				"Sold Pending PU": FRNASummaryArrayCouFiltered[j].Sold,
		    				"Turn In for Sale Stock": FRNASummaryArrayCouFiltered[j].Sredel,
		    				"Target CW Inventory": FRNASummaryArrayCouFiltered[j].Tri,
		    				"CW Shortage/Surplus": FRNASummaryArrayCouFiltered[j].Ocwinv,
		    				"Target Price": FRNASummaryArrayCouFiltered[j].Trp,
		    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFinal});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFinal.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{
					var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayCouFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayCouFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				}
			 
		},
		
		/*If the city level is selected - this is set by default as well */
		alterPageOneCityLevel : function(){	
			
			var regionValues = sap.ui.getCore().byId("idfremnetaRegionCombo").getSelectedKeys();
			var countryValues = sap.ui.getCore().byId("idfremnetaCountryCombo").getSelectedKeys();
			var cityValues = sap.ui.getCore().byId("idfremnetaCityCombo").getSelectedKeys();
			var proCatValues = sap.ui.getCore().byId("idfremnetaProCatCombo").getSelectedKeys();
			var unitTypeValues = sap.ui.getCore().byId("idfremnetaUnitTypeCombo").getSelectedKeys();
			
			var proCatLength = proCatValues.length;
			var unitTypeLength = unitTypeValues.length;
			var regionLength = regionValues.length;
			var countryLength = countryValues.length;
			var cityLength = cityValues.length;
			
			/* At first point, check if the city filter has got any values. If yes, happily set that data in the table*/
			
			if(unitTypeLength != 0){
				if(cityLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
							if((isInArrayFREM1(FRNASummaryArray[j].ZCityDesc, cityValues)) && (isInArrayFREM1(FRNASummaryArray[j].Material, unitTypeValues))){		    			
								FRNASummaryArrayFiltered.push({
						    		"Pcate": FRNASummaryArray[j].Pcate,
				    				"Material": FRNASummaryArray[j].Material,
				    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
				    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
				    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
				    				"Iicl": FRNASummaryArray[j].Iicl,
				    				"Cworthy": FRNASummaryArray[j].Cworthy,
				    				"Asis": FRNASummaryArray[j].Asis,
				    				"Undrep": FRNASummaryArray[j].Undrep,
				    				"West": FRNASummaryArray[j].West,
				    				"Sold": FRNASummaryArray[j].Sold,
				    				"Sredel": FRNASummaryArray[j].Sredel,
				    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
				    				"Tri": FRNASummaryArray[j].Tri,
				    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
				    				"Trp": FRNASummaryArray[j].Trp,
				    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
				    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
				    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
									"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
				    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
				    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
					    			});	
							    	
							    	jsonInventoryFRNA.push({
					    				"Region":FRNASummaryArray[j].ZRegDesc,
					    				"Country":FRNASummaryArray[j].ZCouDesc,
					    				"City":FRNASummaryArray[j].ZCityDesc,
							    		"Prod. Category": FRNASummaryArray[j].Pcate,
					    				"Type": FRNASummaryArray[j].Material,
					    				"CIC/IICL": FRNASummaryArray[j].Iicl,
					    				"CW": FRNASummaryArray[j].Cworthy,
					    				"As Is": FRNASummaryArray[j].Asis,
					    				"CW APPD": FRNASummaryArray[j].Undrep,
					    				"REM AWAP": FRNASummaryArray[j].West,
					    				"Sold Pending PU": FRNASummaryArray[j].Sold,
					    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
					    				"Target CW Inventory": FRNASummaryArray[j].Tri,
					    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
					    				"Target Price": FRNASummaryArray[j].Trp,
					    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				else if(countryLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if((isInArrayFREM1(FRNASummaryArray[j].ZCouDesc, countryValues)) && (isInArrayFREM1(FRNASummaryArray[j].Material, unitTypeValues))){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					if(regionValues.length == 0){
						FRNASummaryArrayFiltered = FRNASummaryArray;
					}
					else{
					for(var j=0;j<FRNASummaryArray.length;j++){
						if((isInArrayFREM1(FRNASummaryArray[j].ZRegDesc, regionValues)) && (isInArrayFREM1(FRNASummaryArray[j].Material, unitTypeValues))){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
						}
			    		}
					}
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
	  	    		
				}
				/*If no filters in the location combination, set the original data*/
				else{
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if(isInArrayFREM1(FRNASummaryArray[j].Material, unitTypeValues)){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
		            
				}
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			else if(proCatLength != 0){
				if(cityLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
							//if(((isInArrayFREM1(FRNASummaryArray[j].ZCityDesc, cityValues)) && (isInArrayFREM1(FRNASummaryArray[j].Pcate, proCatValues))) || (FRNASummaryArray[j].ZCityDesc == '' && (isInArrayFREM1(FRNASummaryArray[j].Material, proCatValues)))){
							if((isInArrayFREM1(FRNASummaryArray[j].ZCityDesc, cityValues)) && (isInArrayFREM1(FRNASummaryArray[j].Pcate, proCatValues))){
								FRNASummaryArrayFiltered.push({
						    		"Pcate": FRNASummaryArray[j].Pcate,
				    				"Material": FRNASummaryArray[j].Material,
				    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
				    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
				    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
				    				"Iicl": FRNASummaryArray[j].Iicl,
				    				"Cworthy": FRNASummaryArray[j].Cworthy,
				    				"Asis": FRNASummaryArray[j].Asis,
				    				"Undrep": FRNASummaryArray[j].Undrep,
				    				"West": FRNASummaryArray[j].West,
				    				"Sold": FRNASummaryArray[j].Sold,
				    				"Sredel": FRNASummaryArray[j].Sredel,
				    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
				    				"Tri": FRNASummaryArray[j].Tri,
				    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
				    				"Trp": FRNASummaryArray[j].Trp,
				    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
				    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
				    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
									"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
				    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
				    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
					    			});	
							    	
							    	jsonInventoryFRNA.push({
					    				"Region":FRNASummaryArray[j].ZRegDesc,
					    				"Country":FRNASummaryArray[j].ZCouDesc,
					    				"City":FRNASummaryArray[j].ZCityDesc,
							    		"Prod. Category": FRNASummaryArray[j].Pcate,
					    				"Type": FRNASummaryArray[j].Material,
					    				"CIC/IICL": FRNASummaryArray[j].Iicl,
					    				"CW": FRNASummaryArray[j].Cworthy,
					    				"As Is": FRNASummaryArray[j].Asis,
					    				"CW APPD": FRNASummaryArray[j].Undrep,
					    				"REM AWAP": FRNASummaryArray[j].West,
					    				"Sold Pending PU": FRNASummaryArray[j].Sold,
					    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
					    				"Target CW Inventory": FRNASummaryArray[j].Tri,
					    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
					    				"Target Price": FRNASummaryArray[j].Trp,
					    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				else if(countryLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if((isInArrayFREM1(FRNASummaryArray[j].ZCouDesc, countryValues)) && (isInArrayFREM1(FRNASummaryArray[j].Pcate, proCatValues))){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if(regionValues.length == 0){
							FRNASummaryArrayFiltered = FRNASummaryArray;
						}
						if((isInArrayFREM1(FRNASummaryArray[j].ZRegDesc, regionValues)) && (isInArrayFREM1(FRNASummaryArray[j].Pcate, proCatValues))){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if(isInArrayFREM1(FRNASummaryArray[j].Pcate, proCatValues)){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
		            
				}
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			else{
				if(cityLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
							if((isInArrayFREM1(FRNASummaryArray[j].ZCityDesc, cityValues))){		    			
								FRNASummaryArrayFiltered.push({
						    		"Pcate": FRNASummaryArray[j].Pcate,
				    				"Material": FRNASummaryArray[j].Material,
				    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
				    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
				    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
				    				"Iicl": FRNASummaryArray[j].Iicl,
				    				"Cworthy": FRNASummaryArray[j].Cworthy,
				    				"Asis": FRNASummaryArray[j].Asis,
				    				"Undrep": FRNASummaryArray[j].Undrep,
				    				"West": FRNASummaryArray[j].West,
				    				"Sold": FRNASummaryArray[j].Sold,
				    				"Sredel": FRNASummaryArray[j].Sredel,
				    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
				    				"Tri": FRNASummaryArray[j].Tri,
				    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
				    				"Trp": FRNASummaryArray[j].Trp,
				    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
				    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
				    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
									"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
				    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
				    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
					    			});	
							    	
							    	jsonInventoryFRNA.push({
					    				"Region":FRNASummaryArray[j].ZRegDesc,
					    				"Country":FRNASummaryArray[j].ZCouDesc,
					    				"City":FRNASummaryArray[j].ZCityDesc,
							    		"Prod. Category": FRNASummaryArray[j].Pcate,
					    				"Type": FRNASummaryArray[j].Material,
					    				"CIC/IICL": FRNASummaryArray[j].Iicl,
					    				"CW": FRNASummaryArray[j].Cworthy,
					    				"As Is": FRNASummaryArray[j].Asis,
					    				"CW APPD": FRNASummaryArray[j].Undrep,
					    				"REM AWAP": FRNASummaryArray[j].West,
					    				"Sold Pending PU": FRNASummaryArray[j].Sold,
					    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
					    				"Target CW Inventory": FRNASummaryArray[j].Tri,
					    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
					    				"Target Price": FRNASummaryArray[j].Trp,
					    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/* If no, At second point, check if the country filter has got any values. If yes, happily set that data in the table*/
				else if(countryLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if((isInArrayFREM1(FRNASummaryArray[j].ZCouDesc, countryValues))){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/* If no, At third point, check if the Region filter has got any values. If yes, happily set that data in the table*/
				else if(regionLength != 0){
					
					jsonInventoryFRNA = [];
					FRNASummaryArrayFiltered = [];
					for(var j=0;j<FRNASummaryArray.length;j++){
						if(regionValues.length == 0){
							FRNASummaryArrayFiltered = FRNASummaryArray;
						}
						else if((isInArrayFREM1(FRNASummaryArray[j].ZRegDesc, regionValues))){
			    			
							FRNASummaryArrayFiltered.push({
					    		"Pcate": FRNASummaryArray[j].Pcate,
			    				"Material": FRNASummaryArray[j].Material,
			    				"ZRegDesc":FRNASummaryArray[j].ZRegDesc,
			    				"ZCouDesc":FRNASummaryArray[j].ZCouDesc,
			    				"ZCityDesc":FRNASummaryArray[j].ZCityDesc,
			    				"Iicl": FRNASummaryArray[j].Iicl,
			    				"Cworthy": FRNASummaryArray[j].Cworthy,
			    				"Asis": FRNASummaryArray[j].Asis,
			    				"Undrep": FRNASummaryArray[j].Undrep,
			    				"West": FRNASummaryArray[j].West,
			    				"Sold": FRNASummaryArray[j].Sold,
			    				"Sredel": FRNASummaryArray[j].Sredel,
			    				"enabledSredel": (FRNASummaryArray[j].Sredel == 0)? false: true,
			    				"Tri": FRNASummaryArray[j].Tri,
			    				"Ocwinv": FRNASummaryArray[j].Ocwinv,
			    				"Trp": FRNASummaryArray[j].Trp,
			    				"enabledIicl": (FRNASummaryArray[j].Iicl == 0)? false: true,
			    				"enabledCworthy": (FRNASummaryArray[j].Cworthy == 0)? false: true,
			    				"enabledAsis": (FRNASummaryArray[j].Asis == 0)? false: true,
								"enabledUndrep": (FRNASummaryArray[j].Undrep == 0)? false: true,
			    				"enabledWest": (FRNASummaryArray[j].West == 0)? false: true,
			    				"enabledSold": (FRNASummaryArray[j].Sold == 0)? false: true
				    			});	
						    	
						    	jsonInventoryFRNA.push({
				    				"Region":FRNASummaryArray[j].ZRegDesc,
				    				"Country":FRNASummaryArray[j].ZCouDesc,
				    				"City":FRNASummaryArray[j].ZCityDesc,
						    		"Prod. Category": FRNASummaryArray[j].Pcate,
				    				"Type": FRNASummaryArray[j].Material,
				    				"CIC/IICL": FRNASummaryArray[j].Iicl,
				    				"CW": FRNASummaryArray[j].Cworthy,
				    				"As Is": FRNASummaryArray[j].Asis,
				    				"CW APPD": FRNASummaryArray[j].Undrep,
				    				"REM AWAP": FRNASummaryArray[j].West,
				    				"Sold Pending PU": FRNASummaryArray[j].Sold,
				    				"Turn In for Sale stock": FRNASummaryArray[j].Sredel,
				    				"Target CW Inventory": FRNASummaryArray[j].Tri,
				    				"CW Shortage/Surplus": FRNASummaryArray[j].Ocwinv,
				    				"Target Price": FRNASummaryArray[j].Trp,
				    			});	
						    	
						    	
			    		}
			    		}
					
		    		var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArrayFiltered});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArrayFiltered.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				/*If no filters in the location combination, set the original data*/
				else{
					var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
		    		oModelFilteredPageOne.setData({modelData: FRNASummaryArray});
		        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
		        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
		      
		        	if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
			        	var requestedLines = sap.ui.getCore().byId("idTotalRowsFieldfremneta").getValue();
			        	if(sap.ui.getCore().byId("idPagefremneta") != undefined)
			        	var pagingMode = sap.ui.getCore().byId("idPagefremneta").getSelectedIndex();
		        	requestedLines = Number(requestedLines);
		        	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(requestedLines);
		        	if(pagingMode == 1){
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
	  	    		var totalPages = (Math.ceil(FRNASummaryArray.length/requestedLines));
	  	    		totalPages = "Total No. of Pages : " + totalPages;
	  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
				}
				}
		},
		
		resetEverything : function(){
			
			/* Select "City Level" radio button */
        	var selectedRadio = new sap.ui.getCore().byId("idLevelfremneta");
        	selectedRadio.setSelectedIndex(2);
        	
        	/* Reset Region Combo */
    		sap.ui.getCore().byId("idfremnetaRegionCombo").setEnabled(true);
    		sap.ui.getCore().byId("idfremnetaRegionCombo").removeAllSelectedItems();
        	var regionGModel = new sap.ui.model.json.JSONModel(regionFilterGData);
        	regionGModel.setSizeLimit(regionFilterGData.items.length);
        	sap.ui.getCore().byId("idfremnetaRegionCombo").setModel(regionGModel);
        	
        	/* Reset Country Combo */
    		sap.ui.getCore().byId("idfremnetaCountryCombo").setEnabled(true);
    		sap.ui.getCore().byId("idfremnetaCountryCombo").removeAllSelectedItems();
        	var countryGModel = new sap.ui.model.json.JSONModel(countryFilterGData);
        	countryGModel.setSizeLimit(countryFilterGData.items.length);
        	sap.ui.getCore().byId("idfremnetaCountryCombo").setModel(countryGModel);
        	
        	/* Reset City Combo */
    		sap.ui.getCore().byId("idfremnetaCityCombo").setEnabled(true);
    		sap.ui.getCore().byId("idfremnetaCityCombo").removeAllSelectedItems();
        	var cityGModel = new sap.ui.model.json.JSONModel(cityFilterGData);
        	cityGModel.setSizeLimit(cityFilterGData.items.length);
        	sap.ui.getCore().byId("idfremnetaCityCombo").setModel(cityGModel);
    		
        	/* Reset Product Category Combo */
    		sap.ui.getCore().byId("idfremnetaProCatCombo").setEnabled(true);
    		sap.ui.getCore().byId("idfremnetaProCatCombo").removeAllSelectedItems();
        	var proCatFilterGModel = new sap.ui.model.json.JSONModel(proCatFilterGData);
        	proCatFilterGModel.setSizeLimit(proCatFilterGData.items.length);
        	sap.ui.getCore().byId("idfremnetaProCatCombo").setModel(proCatFilterGModel);
        	
        	/* Reset Unit Type Combo */
    		sap.ui.getCore().byId("idfremnetaUnitTypeCombo").setEnabled(true);
    		sap.ui.getCore().byId("idfremnetaUnitTypeCombo").removeAllSelectedItems();
        	var unitTypeFilterGModel = new sap.ui.model.json.JSONModel(unitTypeFilterGData);
        	unitTypeFilterGModel.setSizeLimit(unitTypeFilterGData.items.length);
        	sap.ui.getCore().byId("idfremnetaUnitTypeCombo").setModel(unitTypeFilterGModel);
        	
        	
        	/* Make Country and City visible */
    		sap.ui.getCore().byId("idfremnetaColCountry").setVisible(true);
    		sap.ui.getCore().byId("idfremnetaColCity").setVisible(true);
    		
    		
    		/* Reset Data ... */
    		
			var oModelFilteredPageOne = new sap.ui.model.json.JSONModel();
    		oModelFilteredPageOne.setData({modelData: FRNASummaryArray});
        	sap.ui.getCore().byId("idTableFRNASummary").setModel(oModelFilteredPageOne);
        	sap.ui.getCore().byId("idTableFRNASummary").bindRows("/modelData");
      
            if (FRNASummaryArray.length < 50){
            	sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(FRNASummaryArray.length);
            	sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            	sap.ui.getCore().byId("idTotalPagesfremneta").setText("");
            }
  	    	else{
  	    		sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
  	    		sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(50);
  	    		if(sap.ui.getCore().byId("idPagefremneta") != undefined)
  	    			sap.ui.getCore().byId("idPagefremneta").setSelectedIndex(0);
  	    		var totalPages = (Math.ceil(FRNASummaryArray.length/50));
  	    		totalPages = "Total No. of Pages : " + totalPages;
  	    		sap.ui.getCore().byId("idTotalPagesfremneta").setText(totalPages);
  	    		
  	    		if(sap.ui.getCore().byId("idTotalRowsFieldfremneta") != undefined)
  	    		sap.ui.getCore().byId("idTotalRowsFieldfremneta").setValue(50);
  	    	}
            
		}
	
	
});

function isInArrayFREM1(value, array) {
	  return array.indexOf(value) > -1;
	}

function sort_by(field, reverse, primer){

	   var key = primer ? 
	       function(x) {return primer(x[field])} : 
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     } 
	}

