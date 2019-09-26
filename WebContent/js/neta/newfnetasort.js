
		/* Custom Sorter */

    		function compareString(value1, value2) {
				   //var total = sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").getModel().getData().modelData.length;
				   if(value1 < value2) return -1;
	               if(value1 == value2) return 0;
	               if(value1 > value2) return 1;
    		};

    		function compareInt(value1, value2) {
				   //var total = sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").getModel().getData().modelData.length;
				   if(parseFloat(value1) < parseFloat(value2)) return -1;
	               if(parseFloat(value1) == parseFloat(value2)) return 0;
	               if(parseFloat(value1) > parseFloat(value2)) return 1;
    		};


    		// Menu

    		var oItemAscendingMenu = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu = new sap.ui.commons.Menu();
    		oCustomMenu.addItem(oItemAscendingMenu);
    		oCustomMenu.addItem(oItemDescendingMenu);

    		// Menu1

    		var oItemAscendingMenu1 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu1 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu1 = new sap.ui.commons.Menu();
    		oCustomMenu1.addItem(oItemAscendingMenu1);
    		oCustomMenu1.addItem(oItemDescendingMenu1);

    		// Menu2

    		var oItemAscendingMenu2 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu2 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu2 = new sap.ui.commons.Menu();
    		oCustomMenu2.addItem(oItemAscendingMenu2);
    		oCustomMenu2.addItem(oItemDescendingMenu2);

    		// Menu3

    		var oItemAscendingMenu3 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu3 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu3 = new sap.ui.commons.Menu();
    		oCustomMenu3.addItem(oItemAscendingMenu3);
    		oCustomMenu3.addItem(oItemDescendingMenu3);

    		// Menu1

    		var oItemAscendingMenu4 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu4 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu4 = new sap.ui.commons.Menu();
    		oCustomMenu4.addItem(oItemAscendingMenu4);
    		oCustomMenu4.addItem(oItemDescendingMenu4);

    		// Menu5

    		var oItemAscendingMenu5 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu5 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu5 = new sap.ui.commons.Menu();
    		oCustomMenu5.addItem(oItemAscendingMenu5);
    		oCustomMenu5.addItem(oItemDescendingMenu5);

    		// Menu6

    		var oItemAscendingMenu6 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu6 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu6 = new sap.ui.commons.Menu();
    		oCustomMenu6.addItem(oItemAscendingMenu6);
    		oCustomMenu6.addItem(oItemDescendingMenu6);

    		// Menu1

    		var oItemAscendingMenu7 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu7 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu7 = new sap.ui.commons.Menu();
    		oCustomMenu7.addItem(oItemAscendingMenu7);
    		oCustomMenu7.addItem(oItemDescendingMenu7);

    		// Menu8

    		var oItemAscendingMenu8 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu8 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu8 = new sap.ui.commons.Menu();
    		oCustomMenu8.addItem(oItemAscendingMenu8);
    		oCustomMenu8.addItem(oItemDescendingMenu8);

    		// Menu9

    		var oItemAscendingMenu9 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu9 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu9 = new sap.ui.commons.Menu();
    		oCustomMenu9.addItem(oItemAscendingMenu9);
    		oCustomMenu9.addItem(oItemDescendingMenu9);

    		// Menu10

    		var oItemAscendingMenu10 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu10 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu10 = new sap.ui.commons.Menu();
    		oCustomMenu10.addItem(oItemAscendingMenu10);
    		oCustomMenu10.addItem(oItemDescendingMenu10);

    		// Menu11

    		var oItemAscendingMenu11 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu11 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu11 = new sap.ui.commons.Menu();
    		oCustomMenu11.addItem(oItemAscendingMenu11);
    		oCustomMenu11.addItem(oItemDescendingMenu11);

    		// Menu12

    		var oItemAscendingMenu12 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu12 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu12 = new sap.ui.commons.Menu();
    		oCustomMenu12.addItem(oItemAscendingMenu12);
    		oCustomMenu12.addItem(oItemDescendingMenu12);

    		// Menu13

    		var oItemAscendingMenu13 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu13 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu13 = new sap.ui.commons.Menu();
    		oCustomMenu13.addItem(oItemAscendingMenu13);
    		oCustomMenu13.addItem(oItemDescendingMenu13);

    		// Menu14

    		var oItemAscendingMenu14 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu14 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu14 = new sap.ui.commons.Menu();
    		oCustomMenu14.addItem(oItemAscendingMenu14);
    		oCustomMenu14.addItem(oItemDescendingMenu14);

    		// Menu15

    		var oItemAscendingMenu15 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu15 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu15 = new sap.ui.commons.Menu();
    		oCustomMenu15.addItem(oItemAscendingMenu15);
    		oCustomMenu15.addItem(oItemDescendingMenu15);

    		// Menu16

    		var oItemAscendingMenu16 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu16 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu16 = new sap.ui.commons.Menu();
    		oCustomMenu16.addItem(oItemAscendingMenu16);
    		oCustomMenu16.addItem(oItemDescendingMenu16);

    		// Menu17

    		var oItemAscendingMenu17 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu17 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu17 = new sap.ui.commons.Menu();
    		oCustomMenu17.addItem(oItemAscendingMenu17);
    		oCustomMenu17.addItem(oItemDescendingMenu17);

    		// Menu18

    		var oItemAscendingMenu18 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu18 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu18 = new sap.ui.commons.Menu();
    		oCustomMenu18.addItem(oItemAscendingMenu18);
    		oCustomMenu18.addItem(oItemDescendingMenu18);

    		// Menu19

    		var oItemAscendingMenu19 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu19 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu19 = new sap.ui.commons.Menu();
    		oCustomMenu19.addItem(oItemAscendingMenu19);
    		oCustomMenu19.addItem(oItemDescendingMenu19);

    		// Menu20

    		var oItemAscendingMenu20 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu20 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu20 = new sap.ui.commons.Menu();
    		oCustomMenu20.addItem(oItemAscendingMenu20);
    		oCustomMenu20.addItem(oItemDescendingMenu20);

    		// Menu21

    		var oItemAscendingMenu21 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu21 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu21 = new sap.ui.commons.Menu();
    		oCustomMenu21.addItem(oItemAscendingMenu21);
    		oCustomMenu21.addItem(oItemDescendingMenu21);

    		// Menu22

    		var oItemAscendingMenu22 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu22 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu22 = new sap.ui.commons.Menu();
    		oCustomMenu22.addItem(oItemAscendingMenu22);
    		oCustomMenu22.addItem(oItemDescendingMenu22);

    		// Menu23

    		var oItemAscendingMenu23 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu23 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu23 = new sap.ui.commons.Menu();
    		oCustomMenu23.addItem(oItemAscendingMenu23);
    		oCustomMenu23.addItem(oItemDescendingMenu23);


    		// Menu24

    		var oItemAscendingMenu24 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu24 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu24 = new sap.ui.commons.Menu();
    		oCustomMenu24.addItem(oItemAscendingMenu24);
    		oCustomMenu24.addItem(oItemDescendingMenu24);

    		// Menu25

    		var oItemAscendingMenu25 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu25 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu25 = new sap.ui.commons.Menu();
    		oCustomMenu25.addItem(oItemAscendingMenu25);
    		oCustomMenu25.addItem(oItemDescendingMenu25);


    		// Menu26

    		var oItemAscendingMenu26 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu26 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu26= new sap.ui.commons.Menu();
    		oCustomMenu26.addItem(oItemAscendingMenu26);
    		oCustomMenu26.addItem(oItemDescendingMenu26);

    		// Menu27

    		var oItemAscendingMenu27 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu27 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu27 = new sap.ui.commons.Menu();
    		oCustomMenu27.addItem(oItemAscendingMenu27);
    		oCustomMenu27.addItem(oItemDescendingMenu27);

    		// Menu46

    		var oItemAscendingMenu46 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu46 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu46 = new sap.ui.commons.Menu();
    		oCustomMenu46.addItem(oItemAscendingMenu46);
    		oCustomMenu46.addItem(oItemDescendingMenu46);


    		// Menu28

    		var oItemAscendingMenu28 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
   		    			FRNASummaryArray[i].ZRegDescR = "AAA";
   		    			FRNASummaryArray[i].ZCouDescR = "AAA";
   		    			FRNASummaryArray[i].ZCityDescR = "AAA";

   		    			FRNASummaryArray[i].SoldFil = "-999999";
   		    			FRNASummaryArray[i].CwbookFil = "-999999";
   		    			FRNASummaryArray[i].Cwavlb2Fil = "-999999";
   		    			FRNASummaryArray[i].SaleawapFil = "-999999";
   		    			FRNASummaryArray[i].Cwauth2Fil = "-999999";
   		    			FRNASummaryArray[i].Iicl1Fil = "-999999";
   		    			FRNASummaryArray[i].Cwsale2Fil = "-999999";
   		    			FRNASummaryArray[i].Asis3Fil = "-999999";
   		    			FRNASummaryArray[i].Asis4Fil = "-999999";
   		    			FRNASummaryArray[i].Asis5Fil = "-999999";
   		    			FRNASummaryArray[i].Iicl6Fil = "-999999";
   		    			FRNASummaryArray[i].Wwt9Fil = "-999999";
   		    			FRNASummaryArray[i].NetavlbFil = "-999999";
   		    			FRNASummaryArray[i].SredelFil = "-999999";
   		    			FRNASummaryArray[i].SbookFil = "-999999";
                FRNASummaryArray[i].QbookFil = "-999999";
                FRNASummaryArray[i].TriFil = "-999999";
                FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu28 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu28 = new sap.ui.commons.Menu();
    		oCustomMenu28.addItem(oItemAscendingMenu28);
    		oCustomMenu28.addItem(oItemDescendingMenu28);


    		// Menu29

    		var oItemAscendingMenu29 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
     		    			FRNASummaryArray[i].ZCouDescR = "AAA";
     		    			FRNASummaryArray[i].ZCityDescR = "AAA";

     		    			FRNASummaryArray[i].SoldFil = "-999999";
     		    			FRNASummaryArray[i].CwbookFil = "-999999";
     		    			FRNASummaryArray[i].Cwavlb2Fil = "-999999";
     		    			FRNASummaryArray[i].SaleawapFil = "-999999";
     		    			FRNASummaryArray[i].Cwauth2Fil = "-999999";
     		    			FRNASummaryArray[i].Iicl1Fil = "-999999";
     		    			FRNASummaryArray[i].Cwsale2Fil = "-999999";
     		    			FRNASummaryArray[i].Asis3Fil = "-999999";
     		    			FRNASummaryArray[i].Asis4Fil = "-999999";
     		    			FRNASummaryArray[i].Asis5Fil = "-999999";
     		    			FRNASummaryArray[i].Iicl6Fil = "-999999";
     		    			FRNASummaryArray[i].Wwt9Fil = "-999999";
     		    			FRNASummaryArray[i].NetavlbFil = "-999999";
     		    			FRNASummaryArray[i].SredelFil = "-999999";
     		    			FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu29 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu29 = new sap.ui.commons.Menu();
			oCustomMenu29.addItem(oItemAscendingMenu29);
			oCustomMenu29.addItem(oItemDescendingMenu29);


    		// Menu30

    		var oItemAscendingMenu30 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
     		    			FRNASummaryArray[i].ZCouDescR = "AAA";
     		    			FRNASummaryArray[i].ZCityDescR = "AAA";

     		    			FRNASummaryArray[i].SoldFil = "-999999";
     		    			FRNASummaryArray[i].CwbookFil = "-999999";
     		    			FRNASummaryArray[i].Cwavlb2Fil = "-999999";
     		    			FRNASummaryArray[i].SaleawapFil = "-999999";
     		    			FRNASummaryArray[i].Cwauth2Fil = "-999999";
     		    			FRNASummaryArray[i].Iicl1Fil = "-999999";
     		    			FRNASummaryArray[i].Cwsale2Fil = "-999999";
     		    			FRNASummaryArray[i].Asis3Fil = "-999999";
     		    			FRNASummaryArray[i].Asis4Fil = "-999999";
     		    			FRNASummaryArray[i].Asis5Fil = "-999999";
     		    			FRNASummaryArray[i].Iicl6Fil = "-999999";
     		    			FRNASummaryArray[i].Wwt9Fil = "-999999";
     		    			FRNASummaryArray[i].NetavlbFil = "-999999";
     		    			FRNASummaryArray[i].SredelFil = "-999999";
     		    			FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu30 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu30 = new sap.ui.commons.Menu();
    		oCustomMenu30.addItem(oItemAscendingMenu30);
    		oCustomMenu30.addItem(oItemDescendingMenu30);


    		// Menu31

    		var oItemAscendingMenu31 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu31 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu31 = new sap.ui.commons.Menu();
    		oCustomMenu31.addItem(oItemAscendingMenu31);
    		oCustomMenu31.addItem(oItemDescendingMenu31);

    		// Menu32

    		var oItemAscendingMenu32 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu32 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu32 = new sap.ui.commons.Menu();
    		oCustomMenu32.addItem(oItemAscendingMenu32);
    		oCustomMenu32.addItem(oItemDescendingMenu32);

    		// Menu33

    		var oItemAscendingMenu33 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu33 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu33 = new sap.ui.commons.Menu();
    		oCustomMenu33.addItem(oItemAscendingMenu33);
    		oCustomMenu33.addItem(oItemDescendingMenu33);

    		// Menu34

    		var oItemAscendingMenu34 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu34 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu34 = new sap.ui.commons.Menu();
    		oCustomMenu34.addItem(oItemAscendingMenu34);
    		oCustomMenu34.addItem(oItemDescendingMenu34);

    		// Menu35

    		var oItemAscendingMenu35 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu35 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu35 = new sap.ui.commons.Menu();
    		oCustomMenu35.addItem(oItemAscendingMenu35);
    		oCustomMenu35.addItem(oItemDescendingMenu35);

    		// Menu36

    		var oItemAscendingMenu36 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu36 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu36 = new sap.ui.commons.Menu();
    		oCustomMenu36.addItem(oItemAscendingMenu36);
    		oCustomMenu36.addItem(oItemDescendingMenu36);

    		// Menu37

    		var oItemAscendingMenu37 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu37 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu37 = new sap.ui.commons.Menu();
    		oCustomMenu37.addItem(oItemAscendingMenu37);
    		oCustomMenu37.addItem(oItemDescendingMenu37);

    		// Menu38

    		var oItemAscendingMenu38 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu38 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu38 = new sap.ui.commons.Menu();
    		oCustomMenu38.addItem(oItemAscendingMenu38);
    		oCustomMenu38.addItem(oItemDescendingMenu38);

    		// Menu39

    		var oItemAscendingMenu39 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu39 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu39 = new sap.ui.commons.Menu();
    		oCustomMenu39.addItem(oItemAscendingMenu39);
    		oCustomMenu39.addItem(oItemDescendingMenu39);

    		// Menu40

    		var oItemAscendingMenu40 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu40 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu40 = new sap.ui.commons.Menu();
    		oCustomMenu40.addItem(oItemAscendingMenu40);
    		oCustomMenu40.addItem(oItemDescendingMenu40);

    		// Menu41

    		var oItemAscendingMenu41 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu41 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu41 = new sap.ui.commons.Menu();
    		oCustomMenu41.addItem(oItemAscendingMenu41);
    		oCustomMenu41.addItem(oItemDescendingMenu41);

    		// Menu42

    		var oItemAscendingMenu42 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu42 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu42 = new sap.ui.commons.Menu();
    		oCustomMenu42.addItem(oItemAscendingMenu42);
    		oCustomMenu42.addItem(oItemDescendingMenu42);

    		// Menu43

    		var oItemAscendingMenu43 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu43 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu43 = new sap.ui.commons.Menu();
    		oCustomMenu43.addItem(oItemAscendingMenu43);
    		oCustomMenu43.addItem(oItemDescendingMenu43);

    		// Menu44

    		var oItemAscendingMenu44 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu44 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu44 = new sap.ui.commons.Menu();
    		oCustomMenu44.addItem(oItemAscendingMenu44);
    		oCustomMenu44.addItem(oItemDescendingMenu44);

    		// Menu45

    		var oItemAscendingMenu45 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu45 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu45 = new sap.ui.commons.Menu();
    		oCustomMenu45.addItem(oItemAscendingMenu45);
    		oCustomMenu45.addItem(oItemDescendingMenu45);

    		// Menu46

    		var oItemAscendingMenu46 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu46 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu46 = new sap.ui.commons.Menu();
    		oCustomMenu46.addItem(oItemAscendingMenu46);
    		oCustomMenu46.addItem(oItemDescendingMenu46);

    		// Menu47

    		var oItemAscendingMenu47 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FRNASummaryArray.length; i++){
   		    	 	  if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu47 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FRNASummaryArray.length; i++){
	   		    		  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu47 = new sap.ui.commons.Menu();
    		oCustomMenu47.addItem(oItemAscendingMenu47);
    		oCustomMenu47.addItem(oItemDescendingMenu47);


				// Menu48

    		var oItemAscendingMenu48 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu48 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu48 = new sap.ui.commons.Menu();
    		oCustomMenu48.addItem(oItemAscendingMenu48);
    		oCustomMenu48.addItem(oItemDescendingMenu48);


				// Menu49

    		var oItemAscendingMenu49 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu49 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu49 = new sap.ui.commons.Menu();
    		oCustomMenu49.addItem(oItemAscendingMenu49);
    		oCustomMenu49.addItem(oItemDescendingMenu49);

				// Menu50

				var oItemAscendingMenu50 = new sap.ui.commons.MenuItem({
					 text:"Sort ascending",
				 select:function(oEvent) {
					 var colId = oEvent.getSource().getParent().getParent().getId();
						for(var i=0; i<FNASummaryArray.length; i++){
								if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
								FNASummaryArray[i].ZRegDesc = "AAA";
								FNASummaryArray[i].ZCouDesc = "AAA";
								FNASummaryArray[i].ZCityDesc = "AAA";
								FNASummaryArray[i].ZCityDesc = "AAA";
								FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
								FNASummaryArray[i].NavlbFil = "-999999";
								FNASummaryArray[i].AuthFil = "-999999";
								FNASummaryArray[i].BookFil = "-999999";
								FNASummaryArray[i].NbookFil = "-999999";
								FNASummaryArray[i].RedelFil = "-999999";
								FNASummaryArray[i].NredelFil = "-999999";
								FNASummaryArray[i].ReserFil = "-999999";
								FNASummaryArray[i].NreserFil = "-999999";
								FNASummaryArray[i].HoldFil = "-999999";
								FNASummaryArray[i].TtlsFil = "-999999";
								FNASummaryArray[i].WestFil = "-999999";
								FNASummaryArray[i].NwapFil = "-999999";
								FNASummaryArray[i].NattlFil = "-999999";
								FNASummaryArray[i].NadepFil = "-999999";
								FNASummaryArray[i].NanewFil = "-999999";
								FNASummaryArray[i].TdiFil = "-999999";
								FNASummaryArray[i].TciFil = "-999999";
								FNASummaryArray[i].OdiFil = "-999999";
								FNASummaryArray[i].OciFil = "-999999";
								FNASummaryArray[i].PorFil = "-999999";
								FNASummaryArray[i].RprFil = "-999999";
								FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
								}
							}

								var oSorter = null;
							if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
							oSorter = new sap.ui.model.Sorter(colId, false);
							oSorter.fnCompare=compareString;
							}else{
							colId = colId + "Fil";
							oSorter = new sap.ui.model.Sorter(colId, false);
							oSorter.fnCompare=compareInt;
							}
								sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
				 }

				});

				var oItemDescendingMenu50 = new sap.ui.commons.MenuItem({
					 text:"Sort descending",
					 select:function(oEvent) {
							var colId = oEvent.getSource().getParent().getParent().getId();
							for(var i=0; i<FNASummaryArray.length; i++){
									if(FNASummaryArray[i].ZRegDesc == "AAA"){
									FNASummaryArray[i].ZRegDesc = "ZZZ";
									FNASummaryArray[i].ZCouDesc = "ZZZ";
									FNASummaryArray[i].ZCityDesc = "ZZZ";
									FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
									FNASummaryArray[i].NavlbFil = "999999";
									FNASummaryArray[i].AuthFil = "999999";
									FNASummaryArray[i].BookFil = "999999";
									FNASummaryArray[i].NbookFil = "999999";
									FNASummaryArray[i].RedelFil = "999999";
									FNASummaryArray[i].NredelFil = "999999";
									FNASummaryArray[i].ReserFil = "999999";
									FNASummaryArray[i].NreserFil = "999999";
									FNASummaryArray[i].HoldFil = "999999";
									FNASummaryArray[i].TtlsFil = "999999";
									FNASummaryArray[i].WestFil = "999999";
									FNASummaryArray[i].NwapFil = "999999";
									FNASummaryArray[i].NattlFil = "999999";
									FNASummaryArray[i].NadepFil = "999999";
									FNASummaryArray[i].NanewFil = "999999";
									FNASummaryArray[i].TdiFil = "999999";
									FNASummaryArray[i].TciFil = "999999";
									FNASummaryArray[i].OdiFil = "999999";
									FNASummaryArray[i].OciFil = "999999";
									FNASummaryArray[i].PorFil = "999999";
									FNASummaryArray[i].RprFil = "999999";
									FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
									}
								}

									var oSorter = null;
									if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
									oSorter = new sap.ui.model.Sorter(colId, true);
								oSorter.fnCompare=compareString;
								}else{
								colId = colId + "Fil";
								oSorter = new sap.ui.model.Sorter(colId, true);
								oSorter.fnCompare=compareInt;
								}
									sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
					 }

				});

			var oCustomMenu50 = new sap.ui.commons.Menu();
				oCustomMenu50.addItem(oItemAscendingMenu50);
				oCustomMenu50.addItem(oItemDescendingMenu50);

        // Menu51

        var oItemAscendingMenu51 = new sap.ui.commons.MenuItem({
           text:"Sort ascending",
         select:function(oEvent) {
           var colId = oEvent.getSource().getParent().getParent().getId();
            for(var i=0; i<FRNASummaryArray.length; i++){
                if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
                }
              }

                var oSorter = null;
              if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareString;
              }else{
              colId = colId + "Fil";
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareInt;
              }
                sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
         }

        });

        var oItemDescendingMenu51 = new sap.ui.commons.MenuItem({
           text:"Sort descending",
           select:function(oEvent) {
              var colId = oEvent.getSource().getParent().getParent().getId();
              for(var i=0; i<FRNASummaryArray.length; i++){
                  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
                  }
                }

                  var oSorter = null;
                  if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
                  oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareString;
                }else{
                colId = colId + "Fil";
                oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareInt;
                }
                  sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
           }

        });

        var oCustomMenu51 = new sap.ui.commons.Menu();
        oCustomMenu51.addItem(oItemAscendingMenu51);
        oCustomMenu51.addItem(oItemDescendingMenu51);

        // Menu52

        var oItemAscendingMenu52 = new sap.ui.commons.MenuItem({
           text:"Sort ascending",
         select:function(oEvent) {
           var colId = oEvent.getSource().getParent().getParent().getId();
            for(var i=0; i<FRNASummaryArray.length; i++){
                if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
                }
              }

                var oSorter = null;
              if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareString;
              }else{
              colId = colId + "Fil";
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareInt;
              }
                sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
         }

        });

        var oItemDescendingMenu52 = new sap.ui.commons.MenuItem({
           text:"Sort descending",
           select:function(oEvent) {
              var colId = oEvent.getSource().getParent().getParent().getId();
              for(var i=0; i<FRNASummaryArray.length; i++){
                  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
                  }
                }

                  var oSorter = null;
                  if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
                  oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareString;
                }else{
                colId = colId + "Fil";
                oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareInt;
                }
                  sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
           }

        });

        var oCustomMenu52 = new sap.ui.commons.Menu();
        oCustomMenu52.addItem(oItemAscendingMenu52);
        oCustomMenu52.addItem(oItemDescendingMenu52);

        // Menu53

        var oItemAscendingMenu53 = new sap.ui.commons.MenuItem({
           text:"Sort ascending",
         select:function(oEvent) {
           var colId = oEvent.getSource().getParent().getParent().getId();
            for(var i=0; i<FRNASummaryArray.length; i++){
                if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
                }
              }

                var oSorter = null;
              if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareString;
              }else{
              colId = colId + "Fil";
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareInt;
              }
                sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
         }

        });

        var oItemDescendingMenu53 = new sap.ui.commons.MenuItem({
           text:"Sort descending",
           select:function(oEvent) {
              var colId = oEvent.getSource().getParent().getParent().getId();
              for(var i=0; i<FRNASummaryArray.length; i++){
                  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
                  }
                }

                  var oSorter = null;
                  if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
                  oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareString;
                }else{
                colId = colId + "Fil";
                oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareInt;
                }
                  sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
           }

        });

        var oCustomMenu53 = new sap.ui.commons.Menu();
        oCustomMenu53.addItem(oItemAscendingMenu53);
        oCustomMenu53.addItem(oItemDescendingMenu53);

        // Menu54

        var oItemAscendingMenu54 = new sap.ui.commons.MenuItem({
           text:"Sort ascending",
         select:function(oEvent) {
           var colId = oEvent.getSource().getParent().getParent().getId();
            for(var i=0; i<FRNASummaryArray.length; i++){
                if(FRNASummaryArray[i].ZRegDescR == "ZZZ"){
                  FRNASummaryArray[i].ZRegDescR = "AAA";
                  FRNASummaryArray[i].ZCouDescR = "AAA";
                  FRNASummaryArray[i].ZCityDescR = "AAA";

                  FRNASummaryArray[i].SoldFil = "-999999";
                  FRNASummaryArray[i].CwbookFil = "-999999";
                  FRNASummaryArray[i].Cwavlb2Fil = "-999999";
                  FRNASummaryArray[i].SaleawapFil = "-999999";
                  FRNASummaryArray[i].Cwauth2Fil = "-999999";
                  FRNASummaryArray[i].Iicl1Fil = "-999999";
                  FRNASummaryArray[i].Cwsale2Fil = "-999999";
                  FRNASummaryArray[i].Asis3Fil = "-999999";
                  FRNASummaryArray[i].Asis4Fil = "-999999";
                  FRNASummaryArray[i].Asis5Fil = "-999999";
                  FRNASummaryArray[i].Iicl6Fil = "-999999";
                  FRNASummaryArray[i].Wwt9Fil = "-999999";
                  FRNASummaryArray[i].NetavlbFil = "-999999";
                  FRNASummaryArray[i].SredelFil = "-999999";
                  FRNASummaryArray[i].SbookFil = "-999999";
                  FRNASummaryArray[i].QbookFil = "-999999";
                  FRNASummaryArray[i].TriFil = "-999999";
                  FRNASummaryArray[i].CwshortsuprlFil = "-999999";
                  FRNASummaryArray[i].TrpFil = "-999999";
                }
              }

                var oSorter = null;
              if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareString;
              }else{
              colId = colId + "Fil";
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareInt;
              }
                sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
         }

        });

        var oItemDescendingMenu54 = new sap.ui.commons.MenuItem({
           text:"Sort descending",
           select:function(oEvent) {
              var colId = oEvent.getSource().getParent().getParent().getId();
              for(var i=0; i<FRNASummaryArray.length; i++){
                  if(FRNASummaryArray[i].ZRegDescR == "AAA"){
                    FRNASummaryArray[i].ZRegDescR = "ZZZ";
                    FRNASummaryArray[i].ZCouDescR = "ZZZ";
                    FRNASummaryArray[i].ZCityDescR = "ZZZ";

                    FRNASummaryArray[i].SoldFil = "999999";
                    FRNASummaryArray[i].CwbookFil = "999999";
                    FRNASummaryArray[i].Cwavlb2Fil = "999999";
                    FRNASummaryArray[i].SaleawapFil = "999999";
                    FRNASummaryArray[i].Cwauth2Fil = "999999";
                    FRNASummaryArray[i].Iicl1Fil = "999999";
                    FRNASummaryArray[i].Cwsale2Fil = "999999";
                    FRNASummaryArray[i].Asis3Fil = "999999";
                    FRNASummaryArray[i].Asis4Fil = "999999";
                    FRNASummaryArray[i].Asis5Fil = "999999";
                    FRNASummaryArray[i].Iicl6Fil = "999999";
                    FRNASummaryArray[i].Wwt9Fil = "999999";
                    FRNASummaryArray[i].NetavlbFil = "999999";
                    FRNASummaryArray[i].SredelFil = "999999";
                    FRNASummaryArray[i].SbookFil = "999999";
                    FRNASummaryArray[i].QbookFil = "999999";
                    FRNASummaryArray[i].TriFil = "999999";
                    FRNASummaryArray[i].CwshortsuprlFil = "999999";
                    FRNASummaryArray[i].TrpFil = "999999";
                  }
                }

                  var oSorter = null;
                  if (isInArray(colId, ["ZRegDescR", "ZCouDescR", "ZCityDescR", "PcateR", "MatnrR"])) {
                  oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareString;
                }else{
                colId = colId + "Fil";
                oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareInt;
                }
                  sap.ui.getCore().byId("idTableFRNASummary").getBinding("rows").sort(oSorter);
           }

        });

        var oCustomMenu54 = new sap.ui.commons.Menu();
        oCustomMenu54.addItem(oItemAscendingMenu54);
        oCustomMenu54.addItem(oItemDescendingMenu54);



        // Menu55

    		var oItemAscendingMenu55 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu55 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu55 = new sap.ui.commons.Menu();
    		oCustomMenu55.addItem(oItemAscendingMenu55);
    		oCustomMenu55.addItem(oItemDescendingMenu55);

        // Menu56

    		var oItemAscendingMenu56 = new sap.ui.commons.MenuItem({
   		     text:"Sort ascending",
		     select:function(oEvent) {
		    	 var colId = oEvent.getSource().getParent().getParent().getId();
		    	  for(var i=0; i<FNASummaryArray.length; i++){
   		    	 	  if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
   		    			FNASummaryArray[i].ZRegDesc = "AAA";
   		    			FNASummaryArray[i].ZCouDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].ZCityDesc = "AAA";
   		    			FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
   		    			FNASummaryArray[i].NavlbFil = "-999999";
   		    			FNASummaryArray[i].AuthFil = "-999999";
   		    			FNASummaryArray[i].BookFil = "-999999";
   		    			FNASummaryArray[i].NbookFil = "-999999";
   		    			FNASummaryArray[i].RedelFil = "-999999";
   		    			FNASummaryArray[i].NredelFil = "-999999";
   		    			FNASummaryArray[i].ReserFil = "-999999";
   		    			FNASummaryArray[i].NreserFil = "-999999";
   		    			FNASummaryArray[i].HoldFil = "-999999";
   		    			FNASummaryArray[i].TtlsFil = "-999999";
   		    			FNASummaryArray[i].WestFil = "-999999";
   		    			FNASummaryArray[i].NwapFil = "-999999";
   		    			FNASummaryArray[i].NattlFil = "-999999";
   		    			FNASummaryArray[i].NadepFil = "-999999";
   		    			FNASummaryArray[i].NanewFil = "-999999";
   		    			FNASummaryArray[i].TdiFil = "-999999";
   		    			FNASummaryArray[i].TciFil = "-999999";
   		    			FNASummaryArray[i].OdiFil = "-999999";
   		    			FNASummaryArray[i].OciFil = "-999999";
   		    			FNASummaryArray[i].PorFil = "-999999";
   		    			FNASummaryArray[i].RprFil = "-999999";
   		    			FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
   		    		  }
   		    	  }

   		          var oSorter = null;
	   		      if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		    	oSorter = new sap.ui.model.Sorter(colId, false);
	   		    	oSorter.fnCompare=compareString;
  		    	  }else{
  		    		colId = colId + "Fil";
  		    		oSorter = new sap.ui.model.Sorter(colId, false);
  		    		oSorter.fnCompare=compareInt;
  		    	  }
   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
		     }

    		});

    		var oItemDescendingMenu56 = new sap.ui.commons.MenuItem({
   		     text:"Sort descending",
   		     select:function(oEvent) {
   		    	  var colId = oEvent.getSource().getParent().getParent().getId();
   		    	  for(var i=0; i<FNASummaryArray.length; i++){
	   		    		  if(FNASummaryArray[i].ZRegDesc == "AAA"){
	   		    			FNASummaryArray[i].ZRegDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCouDesc = "ZZZ";
	   		    			FNASummaryArray[i].ZCityDesc = "ZZZ";
	   		    			FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
	   		    			FNASummaryArray[i].NavlbFil = "999999";
	   		    			FNASummaryArray[i].AuthFil = "999999";
	   		    			FNASummaryArray[i].BookFil = "999999";
	   		    			FNASummaryArray[i].NbookFil = "999999";
	   		    			FNASummaryArray[i].RedelFil = "999999";
	   		    			FNASummaryArray[i].NredelFil = "999999";
	   		    			FNASummaryArray[i].ReserFil = "999999";
	   		    			FNASummaryArray[i].NreserFil = "999999";
	   		    			FNASummaryArray[i].HoldFil = "999999";
	   		    			FNASummaryArray[i].TtlsFil = "999999";
	   		    			FNASummaryArray[i].WestFil = "999999";
	   		    			FNASummaryArray[i].NwapFil = "999999";
	   		    			FNASummaryArray[i].NattlFil = "999999";
	   		    			FNASummaryArray[i].NadepFil = "999999";
	   		    			FNASummaryArray[i].NanewFil = "999999";
	   		    			FNASummaryArray[i].TdiFil = "999999";
	   		    			FNASummaryArray[i].TciFil = "999999";
	   		    			FNASummaryArray[i].OdiFil = "999999";
	   		    			FNASummaryArray[i].OciFil = "999999";
	   		    			FNASummaryArray[i].PorFil = "999999";
	   		    			FNASummaryArray[i].RprFil = "999999";
	   		    			FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
	   		    		  }
	   		    	  }

	   		          var oSorter = null;
	   		          if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
	   		        	oSorter = new sap.ui.model.Sorter(colId, true);
		   		    	oSorter.fnCompare=compareString;
	  		    	  }else{
	  		    		colId = colId + "Fil";
	  		    		oSorter = new sap.ui.model.Sorter(colId, true);
	  		    		oSorter.fnCompare=compareInt;
	  		    	  }
	   		          sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
   		     }

    		});

			var oCustomMenu56 = new sap.ui.commons.Menu();
    		oCustomMenu56.addItem(oItemAscendingMenu56);
    		oCustomMenu56.addItem(oItemDescendingMenu56);

        // Menu57

        var oItemAscendingMenu57 = new sap.ui.commons.MenuItem({
           text:"Sort ascending",
         select:function(oEvent) {
           var colId = oEvent.getSource().getParent().getParent().getId();
            for(var i=0; i<FNASummaryArray.length; i++){
                if(FNASummaryArray[i].ZRegDesc == "ZZZ"){
                FNASummaryArray[i].ZRegDesc = "AAA";
                FNASummaryArray[i].ZCouDesc = "AAA";
                FNASummaryArray[i].ZCityDesc = "AAA";
                FNASummaryArray[i].ZCityDesc = "AAA";
                FNASummaryArray[i].AvlbFil = "-999999";
                FNASummaryArray[i].CavlbFil = "-999999";FNASummaryArray[i].CauthFil = "-999999";
                FNASummaryArray[i].NavlbFil = "-999999";
                FNASummaryArray[i].AuthFil = "-999999";
                FNASummaryArray[i].BookFil = "-999999";
                FNASummaryArray[i].NbookFil = "-999999";
                FNASummaryArray[i].RedelFil = "-999999";
                FNASummaryArray[i].NredelFil = "-999999";
                FNASummaryArray[i].ReserFil = "-999999";
                FNASummaryArray[i].NreserFil = "-999999";
                FNASummaryArray[i].HoldFil = "-999999";
                FNASummaryArray[i].TtlsFil = "-999999";
                FNASummaryArray[i].WestFil = "-999999";
                FNASummaryArray[i].NwapFil = "-999999";
                FNASummaryArray[i].NattlFil = "-999999";
                FNASummaryArray[i].NadepFil = "-999999";
                FNASummaryArray[i].NanewFil = "-999999";
                FNASummaryArray[i].TdiFil = "-999999";
                FNASummaryArray[i].TciFil = "-999999";
                FNASummaryArray[i].OdiFil = "-999999";
                FNASummaryArray[i].OciFil = "-999999";
                FNASummaryArray[i].PorFil = "-999999";
                FNASummaryArray[i].RprFil = "-999999";
                FNASummaryArray[i].TrpFil = "-999999";FNASummaryArray[i].FequnrFil = "-999999";FNASummaryArray[i].FpurchFil = "-999999";
                }
              }

                var oSorter = null;
              if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareString;
              }else{
              colId = colId + "Fil";
              oSorter = new sap.ui.model.Sorter(colId, false);
              oSorter.fnCompare=compareInt;
              }
                sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
         }

        });

        var oItemDescendingMenu57 = new sap.ui.commons.MenuItem({
           text:"Sort descending",
           select:function(oEvent) {
              var colId = oEvent.getSource().getParent().getParent().getId();
              for(var i=0; i<FNASummaryArray.length; i++){
                  if(FNASummaryArray[i].ZRegDesc == "AAA"){
                  FNASummaryArray[i].ZRegDesc = "ZZZ";
                  FNASummaryArray[i].ZCouDesc = "ZZZ";
                  FNASummaryArray[i].ZCityDesc = "ZZZ";
                  FNASummaryArray[i].AvlbFil = "999999";
                  FNASummaryArray[i].CavlbFil = "999999";FNASummaryArray[i].CauthFil = "999999";
                  FNASummaryArray[i].NavlbFil = "999999";
                  FNASummaryArray[i].AuthFil = "999999";
                  FNASummaryArray[i].BookFil = "999999";
                  FNASummaryArray[i].NbookFil = "999999";
                  FNASummaryArray[i].RedelFil = "999999";
                  FNASummaryArray[i].NredelFil = "999999";
                  FNASummaryArray[i].ReserFil = "999999";
                  FNASummaryArray[i].NreserFil = "999999";
                  FNASummaryArray[i].HoldFil = "999999";
                  FNASummaryArray[i].TtlsFil = "999999";
                  FNASummaryArray[i].WestFil = "999999";
                  FNASummaryArray[i].NwapFil = "999999";
                  FNASummaryArray[i].NattlFil = "999999";
                  FNASummaryArray[i].NadepFil = "999999";
                  FNASummaryArray[i].NanewFil = "999999";
                  FNASummaryArray[i].TdiFil = "999999";
                  FNASummaryArray[i].TciFil = "999999";
                  FNASummaryArray[i].OdiFil = "999999";
                  FNASummaryArray[i].OciFil = "999999";
                  FNASummaryArray[i].PorFil = "999999";
                  FNASummaryArray[i].RprFil = "999999";
                  FNASummaryArray[i].TrpFil = "999999";FNASummaryArray[i].FequnrFil = "999999";FNASummaryArray[i].FpurchFil = "999999";
                  }
                }

                  var oSorter = null;
                  if (isInArray(colId, ["ZRegDesc", "ZCouDesc", "ZCityDesc", "Pcate", "Matnr"])) {
                  oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareString;
                }else{
                colId = colId + "Fil";
                oSorter = new sap.ui.model.Sorter(colId, true);
                oSorter.fnCompare=compareInt;
                }
                  sap.ui.getCore().byId("idTableFNASummary").getBinding("rows").sort(oSorter);
           }

        });

        var oCustomMenu57 = new sap.ui.commons.Menu();
        oCustomMenu57.addItem(oItemAscendingMenu57);
        oCustomMenu57.addItem(oItemDescendingMenu57);
