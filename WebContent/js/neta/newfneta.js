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
/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 12.08.2017
*$*$ Reference   : RTS1843
*$*$ Transport   :
*$*$ Tag         : DNANEW+
*$*$ Purpose     : DNA 3.0 Enhancements
*$*$---------------------------------------------------------------------
*/

/* MAC25112016_CAPRES - Capex Reservation introduction */

jQuery.sap.require("sap.ui.model.json.JSONModel");

/* Leasing */
var jsonInventoryFNA = [];
var jsonInventoryFNAReg = [];
var jsonInventoryFNACou = [];
var FNASummaryArray = [];
var FNASummaryArrayReg = [];
var FNASummaryArrayCou = [];
var FNASummaryArrayF4 = []; // DNANEW +
var FNASummaryArrayBackup = [];
var proCatBuffer = [];
var FNAERPData = [];
var FNAERPDataConc = [];
var FNACRMData = [];
var FNACRMDataConc = [];
var FNACRMDataEqui = [];
var avUnits;
var navUnits;
var bUnits;
var savUnits;
var sumavUnits;
var sumnavUnits;
var sumbUnits;
var sumsavUnits;
var FRNAERPData = [];
var globalTableFNASummaryTPC = null;
var globalTableFRNASummaryTPC = null;
var globalSortIndex = 0;
var globalCategoryList = ["BOXES", "REEFERS", "TANKS", "SPECIALS"];
var FNASummaryArrayTotals = [];
var globalBookingLeaseRem = "L";
/* Container Sales */
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

var FONASummaryArray = [];
var jsonInventoryFONA = [];

var FPNASummaryArray = [];
var jsonInventoryFPNA = [];

//var fnetaService = "http://sapcgwci.seaco.com:8000/sap/opu/odoNaPage.getNap()ata/sap/ZNW_UI5_BWDASH_2_SRV/";
//var fnetaLink = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_UI5_BWDASH_2_SRV/ZPM_M04_YGES_ZPM_M04_Q0001UResults";
sap.ui.model.json.JSONModel.extend("newfneta", {
  createFNAPage: function() {
    var oCurrent = this;

    /* Filters */
    var onewfnetafilters = new newfnetafilters();
    var oPanelFilter = onewfnetafilters.createPanelFilter();

    /* Leasing Side */
    var onewfnetaLeasingTable = new newfnetaLeasingTable();
    var oTableFNASummary = onewfnetaLeasingTable.createLeasingTable();

    /* Container Sales Side */
    var onewfnetaContainerSalesTable = new newfnetaContainerSalesTable();
    var oTableFRNASummary = onewfnetaContainerSalesTable.createContainerSalesTable();

    /* Bookings and Redeliveries Side */
    var onewfnetaOutstandingTable = new newfnetaOutstandingTable();
    var oTableFONASummary = onewfnetaOutstandingTable.createOutstandingTable();

    /* Positioning Side */
    var onewfnetaPosnTable = new newfnetaPosnTable();
    var oTableFPNASummary = onewfnetaPosnTable.createPosnTable();

    /* MAC31082015 */

    var repFlex = new sap.m.FlexBox({
      items: [
        oPanelFilter,
        oTableFNASummary,
        oTableFRNASummary,
        oTableFONASummary,
        oTableFPNASummary
      ],
      direction: "Column"
    }).addStyleClass("marginTop10");

    return repFlex;
  },

  getFNASummary: function(filterString) {
    busyDialog.open();

    oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
    OData.request(
      {
        requestUri: fnetaLink + filterString,
        method: "GET",
        dataType: "json",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=utf-8",
          DataServiceVersion: "2.0",
          "X-CSRF-Token": "Fetch"
        }
      },
      function(data, response) {
        //busyDialog.open();
        if (data.results.length == 0) {
          sap.ui.commons.MessageBox.show(
            "No Result Found.",
            sap.ui.commons.MessageBox.Icon.WARNING,
            "Warning",
            [sap.ui.commons.MessageBox.Action.OK],
            sap.ui.commons.MessageBox.Action.OK
          );

          //var loadSecond = new utilreppage();
          //loadSecond.getUTSummary();
          busyDialog.close();
        } else {
          // Get CRM Data
          /*
					OData.request({
					      requestUri: fnetaLinkCRM,
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
							sap.ui.commons.MessageBox.show("No CRM Data Found.",
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);
							busyDialog.close();
						}
						else{
						FNACRMDataConc = [];
						for(var j=0;j<data.results.length;j++){
						var	splitValuesCRM = data.results[j].Crmdata.split("$");
						if(splitValuesCRM[23] == 'X'){
		    				FNACRMDataEqui.push({
		    					"Crmdata" : data.results[j].Crmdata,
							});
			    		}else{
		    				FNACRMDataConc.push({
		    					"Crmdata" : data.results[j].Crmdata,
							});
			    		}
						}
						}
						busyDialog.close();*/

          // Get ERP Data
          /*
						OData.request({
						      requestUri: fnetaLinkERP,
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
							FNAERPDataConc = data.results;
				    		busyDialog.close();
							}
						    },
							function(err){
						    	 busyDialog.close();
						    	 //errorfromServer(err);
						    	 //alert("Error in data read from SAP ERP System");
						    }); */

          /*},
						function(err){
					    	 busyDialog.close();
					    	 //alert("Error in data read from SAP CRM System");
					    });*/
          FNASummaryArrayF4 = []; // DNANEW +
          FNASummaryArray = [];
          jsonInventoryFNA = [];
          sumavUnits = 0;
          sumnavUnits = 0;
          sumbUnits = 0;
          sumsavUnits = 0;
          var entriesfound = 0;
          var splitDepot = [];

          for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].Leve == "CITY") {
              entriesfound = entriesfound + 1;
              FNASummaryArray.push({
                Mregion: data.results[i].Mregion.split("$")[0], // DNANEW +
                ZMregDesc: data.results[i].Mregion.split("$")[1], // DNANEW +
                Region: data.results[i].Region,
                isNormal:
                  data.results[i].Region == "AAA" ||
                  data.results[i].Region == "ZZZ"
                    ? false
                    : true,
                Country: data.results[i].Country,
                City:
                  data.results[i].Citycod == ""
                    ? ""
                    : data.results[i].Citycod + "-" + data.results[i].Country,
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass, // DNANEW +
                Matnr: data.results[i].Matnr,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Conc: data.results[i].Conc,
                Avlb: data.results[i].Avlb,
                Navlb: data.results[i].Navlb,
                Cavlb: data.results[i].Cavlb,
                Cauth: data.results[i].Cauth,
                Nacwa: data.results[i].Nacwa,
                Cbook: data.results[i].Cbook,
                Auth: data.results[i].Auth,
                Book: data.results[i].Book,
                Nbook: data.results[i].Nbook,
                Reser: data.results[i].Reser,
                Hold: data.results[i].Hold,
                Ttls: data.results[i].Ttls,
                West: data.results[i].West,
                Nwap: data.results[i].Nwap,
                Nattl: data.results[i].Nattl,
                Nadep: data.results[i].Nadep,
                Nanew: data.results[i].Nanew,

                Redel: data.results[i].Redel,
                Nredel: data.results[i].Nredel,
                Tdi: data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                Tci: data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                Odi: data.results[i].Odi,
                Oci: data.results[i].Oci,
                Por: data.results[i].Por,

                Rpr: data.results[i].Rpr,
                Trp: data.results[i].Trp,

                L90: data.results[i].L90,
                enableL90: data.results[i].L90 == 0 ? false : true,
                Pcr: data.results[i].Pcr,
                enablePcr: data.results[i].Pcr == 0 ? false : true,
                Notes: data.results[i].Notes,
                enableNotes: data.results[i].Notes == "" ? false : true,

                enabledRedel: data.results[i].Redel == 0 ? false : true,
                enabledNredel: data.results[i].Nredel == 0 ? false : true,
                enabledTdi: data.results[i].Tdi == 0 ? false : true,
                enabledTci: data.results[i].Tci == 0 ? false : true,
                enabledOdi: data.results[i].Odi == 0 ? false : true,
                enabledOci: data.results[i].Oci == 0 ? false : true,
                enabledPor: data.results[i].Por == 0 ? false : true,
                enabledRpr: data.results[i].Rpr == 0 ? false : true,
                enabledTrp: data.results[i].Trp == 0 ? false : true,

                enabledAvlb: data.results[i].Avlb == 0 ? false : true,
                enabledCavlb: data.results[i].Cavlb == 0 ? false : true,
                enabledCauth: data.results[i].Cauth == 0 ? false : true,
                enabledNacwa: data.results[i].Nacwa == 0 ? false : true,
                enabledCbook: data.results[i].Cbook == 0 ? false : true,
                enabledNavlb: data.results[i].Navlb == 0 ? false : true,
                enabledAuth: data.results[i].Auth == 0 ? false : true,
                enabledBook: data.results[i].Book == 0 ? false : true,
                enabledNbook: data.results[i].Nbook == 0 ? false : true,
                enabledReser: data.results[i].Reser == 0 ? false : true,
                enabledHold: data.results[i].Hold == 0 ? false : true,
                enabledTtls: data.results[i].Ttls == 0 ? false : true,
                enabledWest: data.results[i].West == 0 ? false : true,
                enabledNwap: data.results[i].Nwap == 0 ? false : true,
                enabledNadep: data.results[i].Nadep == 0 ? false : true,
                enabledNanew: data.results[i].Nanew == 0 ? false : true,
                enabledNattl: data.results[i].Nattl == 0 ? false : true,

                Nreser: data.results[i].Nreser,
                enabledNreser: data.results[i].Nreser == 0 ? false : true,

                AvlbFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Avlb,
                NavlbFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Navlb,
                CavlbFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cavlb,
                CauthFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cauth,
                CbookFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cbook,
                NacwaFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nacwa,
                AuthFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Auth,
                BookFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Book,
                NbookFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nbook,
                RedelFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Redel,
                NredelFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Redel,
                ReserFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Reser,
                NreserFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nreser,
                HoldFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Hold,
                TtlsFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Ttls,
                WestFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].West,
                NwapFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nwap,
                NattlFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nwap,
                NadepFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nadep,
                NanewFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Nanew,
                TdiFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Tdi,
                TciFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Tci,
                TrpFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Trp,
                RprFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Rpr,
                OdiFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Odi,
                OciFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Oci,
                PorFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Por,

                Fpurch: data.results[i].Fpurch,
                enabledFpurch: data.results[i].Fpurch == 0 ? false : true,
                FpurchFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Fpurch,

                Fequnr: data.results[i].Fequnr,
                enabledFequnr: data.results[i].Fequnr == 0 ? false : true,
                FequnrFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Fequnr
              });

              var selectedRadio = new sap.ui.getCore()
                .byId("idRadioButtonCol")
                .getSelectedItem()
                .getText();
              if (selectedRadio == "Country Level") {
                jsonInventoryFNA.push({
                  Area:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].Mregion.split("$")[1], // DNANEW +
                  Region:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].ZRegDesc,
                  Country:
                    data.results[i].ZCouDesc == "AAA"
                      ? ""
                      : data.results[i].ZCouDesc,
                  Category: data.results[i].Pcate,
                  "Sub Category": data.results[i].Pclass, // DNANEW +
                  "Unit Type": data.results[i].Matnr,

                  "Lease Port Rating": data.results[i].Por,
                  "Sale Port Rating": data.results[i].Rpr,
                  "Market CW Price": data.results[i].Trp,

                  "Outstanding RA": data.results[i].Redel,
                  WEST: data.results[i].West,
                  AWAP: data.results[i].Nwap,
                  AUTH: data.results[i].Auth,
                  HOLD: data.results[i].Hold,
                  "CW AVLB": data.results[i].Cavlb,
                  "CW AUTH": data.results[i].Cauth,
                  "CW BOOK": data.results[i].Cbook,
                  "CW Net AVLB": data.results[i].Nacwa,

                  "Depot AVLB": data.results[i].Avlb,
                  "Depot Booked": data.results[i].Book,
                  "Depot Reserved": data.results[i].Reser,
                  "Depot Net AVLB": data.results[i].Nadep,
                  "Depot Target":
                    data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                  "Depot Shortage/Surplus": data.results[i].Odi,
                  //			    				"Nredel": data.results[i].Nredel,

                  "Avg Leased Out 90 days": data.results[i].L90,
                  "Pickup Credit": data.results[i].Pcr,
                  Notes: data.results[i].Notes,

                  "Capex AVLB": data.results[i].Navlb,
                  "Capex Booked": data.results[i].Nbook,
                  "Capex Reserved": data.results[i].Nreser,
                  "Capex Net AVLB": data.results[i].Nanew,
                  "Capex Target":
                    data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                  "Capex Shortage/Surplus": data.results[i].Oci,

                  "Total Net AVLB": data.results[i].Nattl,
                  "Total Stock": data.results[i].Ttls
                });
              } else if (selectedRadio == "City Level") {
                jsonInventoryFNA.push({
                  Area:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].Mregion.split("$")[1], // DNANEW +
                  Region:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].ZRegDesc,
                  Country:
                    data.results[i].ZCouDesc == "AAA"
                      ? ""
                      : data.results[i].ZCouDesc,
                  City:
                    data.results[i].ZCityDesc == "AAA"
                      ? ""
                      : data.results[i].ZCityDesc,
                  Category: data.results[i].Pcate,
                  "Sub Category": data.results[i].Pclass, // DNANEW +
                  "Unit Type": data.results[i].Matnr,

                  "Lease Port Rating": data.results[i].Por,
                  "Sale Port Rating": data.results[i].Rpr,
                  "Market CW Price": data.results[i].Trp,

                  "Outstanding RA": data.results[i].Redel,
                  WEST: data.results[i].West,
                  AWAP: data.results[i].Nwap,
                  AUTH: data.results[i].Auth,
                  HOLD: data.results[i].Hold,
                  "CW AVLB": data.results[i].Cavlb,
                  "CW AUTH": data.results[i].Cauth,
                  "CW BOOK": data.results[i].Cbook,
                  "CW Net AVLB": data.results[i].Nacwa,

                  "Depot AVLB": data.results[i].Avlb,
                  "Depot Booked": data.results[i].Book,
                  "Depot Reserved": data.results[i].Reser,
                  "Depot Net AVLB": data.results[i].Nadep,
                  "Depot Target":
                    data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                  "Depot Shortage/Surplus": data.results[i].Odi,
                  //			    				"Nredel": data.results[i].Nredel,

                  "Avg Leased Out 90 days": data.results[i].L90,
                  "Pickup Credit": data.results[i].Pcr,
                  Notes: data.results[i].Notes,
                  "Future Production": data.results[i].Fpurch,
                  "In Production": data.results[i].Fequnr,
                  "Capex AVLB": data.results[i].Navlb,
                  "Capex Booked": data.results[i].Nbook,
                  "Capex Reserved": data.results[i].Nreser,
                  "Capex Net AVLB": data.results[i].Nanew,
                  "Capex Target":
                    data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                  "Capex Shortage/Surplus": data.results[i].Oci,

                  "Total Net AVLB": data.results[i].Nattl,
                  "Total Stock": data.results[i].Ttls
                });
              } else if (selectedRadio == "Region Level") {
                jsonInventoryFNA.push({
                  Area:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].Mregion.split("$")[1], // DNANEW +
                  Region:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].ZRegDesc,
                  Category: data.results[i].Pcate,
                  "Sub Category": data.results[i].Pclass, // DNANEW +
                  "Unit Type": data.results[i].Matnr,

                  "Lease Port Rating": data.results[i].Por,
                  "Sale Port Rating": data.results[i].Rpr,
                  "Market CW Price": data.results[i].Trp,

                  "Outstanding RA": data.results[i].Redel,
                  WEST: data.results[i].West,
                  AWAP: data.results[i].Nwap,
                  AUTH: data.results[i].Auth,
                  HOLD: data.results[i].Hold,
                  "CW AVLB": data.results[i].Cavlb,
                  "CW AUTH": data.results[i].Cauth,
                  "CW BOOK": data.results[i].Cbook,
                  "CW Net AVLB": data.results[i].Nacwa,

                  "Depot AVLB": data.results[i].Avlb,
                  "Depot Booked": data.results[i].Book,
                  "Depot Reserved": data.results[i].Reser,
                  "Depot Net AVLB": data.results[i].Nadep,
                  "Depot Target":
                    data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                  "Depot Shortage/Surplus": data.results[i].Odi,
                  //			    				"Nredel": data.results[i].Nredel,

                  "Avg Leased Out 90 days": data.results[i].L90,
                  "Pickup Credit": data.results[i].Pcr,
                  Notes: data.results[i].Notes,

                  "Capex AVLB": data.results[i].Navlb,
                  "Capex Booked": data.results[i].Nbook,
                  "Capex Reserved": data.results[i].Nreser,
                  "Capex Net AVLB": data.results[i].Nanew,
                  "Capex Target":
                    data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                  "Capex Shortage/Surplus": data.results[i].Oci,

                  "Total Net AVLB": data.results[i].Nattl,
                  "Total Stock": data.results[i].Ttls
                });
              }
            } else if (data.results[i].Leve == "COUN") {
              FNASummaryArrayCou.push({
                Mregion: data.results[i].Mregion.split("$")[0], // DNANEW +
                ZMregDesc: data.results[i].Mregion.split("$")[1], // DNANEW +
                Region: data.results[i].Region,
                Country: data.results[i].Country,
                City: data.results[i].Citycod,
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass, // DNANEW +
                Matnr: data.results[i].Matnr,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Conc: data.results[i].Conc,
                Avlb: data.results[i].Avlb,
                Navlb: data.results[i].Navlb,
                Auth: data.results[i].Auth,
                Book: data.results[i].Book,
                Nbook: data.results[i].Nbook,
                Reser: data.results[i].Reser,
                Hold: data.results[i].Hold,
                Ttls: data.results[i].Ttls,
                West: data.results[i].West,
                Nwap: data.results[i].Nwap,
                Nattl: data.results[i].Nattl,
                Nadep: data.results[i].Nadep,
                Nanew: data.results[i].Nanew,

                Redel: data.results[i].Redel,
                Nredel: data.results[i].Nredel,
                Tdi: data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                Tci: data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                Odi: data.results[i].Odi,
                Oci: data.results[i].Oci,
                Por: data.results[i].Por,

                enabledRedel: data.results[i].Redel == 0 ? false : true,
                enabledNredel: data.results[i].Nredel == 0 ? false : true,
                enabledTdi: data.results[i].Tdi == 0 ? false : true,
                enabledTci: data.results[i].Tci == 0 ? false : true,
                enabledOdi: data.results[i].Odi == 0 ? false : true,
                enabledOci: data.results[i].Oci == 0 ? false : true,
                enabledPor: data.results[i].Por == 0 ? false : true,

                enabledAvlb: data.results[i].Avlb == 0 ? false : true,
                enabledNavlb: data.results[i].Navlb == 0 ? false : true,
                enabledAuth: data.results[i].Auth == 0 ? false : true,
                enabledBook: data.results[i].Book == 0 ? false : true,
                enabledNbook: data.results[i].Nbook == 0 ? false : true,
                enabledReser: data.results[i].Reser == 0 ? false : true,
                enabledHold: data.results[i].Hold == 0 ? false : true,
                enabledTtls: data.results[i].Ttls == 0 ? false : true,
                enabledWest: data.results[i].West == 0 ? false : true,
                enabledNwap: data.results[i].Nwap == 0 ? false : true,
                enabledNadep: data.results[i].Nadep == 0 ? false : true,
                enabledNanew: data.results[i].Nanew == 0 ? false : true,
                enabledNattl: data.results[i].Nattl == 0 ? false : true,

                Nreser: data.results[i].Nreser,
                enabledNreser: data.results[i].Nreser == 0 ? false : true
              });

              jsonInventoryFNACou.push({
                Area: data.results[i].ZMregDesc, // DNANEW +
                Region: data.results[i].ZRegDesc,
                Country: data.results[i].ZCouDesc,
                City: data.results[i].ZCityDesc,
                Category: data.results[i].Pcate,
                "Sub Category": data.results[i].Pclass, // DNANEW +
                "Unit Type": data.results[i].Matnr,

                TIND: data.results[i].Redel,
                //				    				"Nredel": data.results[i].Nredel,
                "Depot Target":
                  data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                "Capex Target":
                  data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                "Depot Shortage/Surplus": data.results[i].Odi,
                "Capex Shortage/Surplus": data.results[i].Oci,
                "Port Rating": data.results[i].Por,

                "Depot AVLB": data.results[i].Avlb,
                "Capex AVLB": data.results[i].Navlb,
                APPD: data.results[i].Auth,
                "Depot Booked": data.results[i].Book,
                "Capex Booked": data.results[i].Nbook,
                "Depot Reserved": data.results[i].Reser,
                "Capex Reserved": data.results[i].Nreser,
                HOLD: data.results[i].Hold,
                "Total Stock": data.results[i].Ttls,
                WEST: data.results[i].West,
                AWAP: data.results[i].Nwap,
                "Total Net AVLB": data.results[i].Nattl,
                "Depot Net AVLB": data.results[i].Nadep,
                "Capex Net AVLB": data.results[i].Nanew
              });
            } else if (data.results[i].Leve == "REGI") {
              FNASummaryArrayReg.push({
                Mregion: data.results[i].Mregion.split("$")[0], // DNANEW +
                ZMregDesc: data.results[i].Mregion.split("$")[1], // DNANEW +
                Region: data.results[i].Region,
                Country: data.results[i].Country,
                City: data.results[i].Citycod,
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass, // DNANEW +
                Matnr: data.results[i].Matnr,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Conc: data.results[i].Conc,
                Avlb: data.results[i].Avlb,
                Navlb: data.results[i].Navlb,
                Auth: data.results[i].Auth,
                Book: data.results[i].Book,
                Nbook: data.results[i].Nbook,
                Reser: data.results[i].Reser,
                Hold: data.results[i].Hold,
                Ttls: data.results[i].Ttls,
                West: data.results[i].West,
                Nwap: data.results[i].Nwap,
                Nattl: data.results[i].Nattl,
                Nadep: data.results[i].Nadep,
                Nanew: data.results[i].Nanew,

                Redel: data.results[i].Redel,
                Nredel: data.results[i].Nredel,
                Tdi: data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                Tci: data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                Odi: data.results[i].Odi,
                Oci: data.results[i].Oci,
                Por: data.results[i].Por,

                enabledRedel: data.results[i].Redel == 0 ? false : true,
                enabledNredel: data.results[i].Nredel == 0 ? false : true,
                enabledTdi: data.results[i].Tdi == 0 ? false : true,
                enabledTci: data.results[i].Tci == 0 ? false : true,
                enabledOdi: data.results[i].Odi == 0 ? false : true,
                enabledOci: data.results[i].Oci == 0 ? false : true,
                enabledPor: data.results[i].Por == 0 ? false : true,

                enabledAvlb: data.results[i].Avlb == 0 ? false : true,
                enabledNavlb: data.results[i].Navlb == 0 ? false : true,
                enabledAuth: data.results[i].Auth == 0 ? false : true,
                enabledBook: data.results[i].Book == 0 ? false : true,
                enabledNbook: data.results[i].Nbook == 0 ? false : true,
                enabledReser: data.results[i].Reser == 0 ? false : true,
                enabledHold: data.results[i].Hold == 0 ? false : true,
                enabledTtls: data.results[i].Ttls == 0 ? false : true,
                enabledWest: data.results[i].West == 0 ? false : true,
                enabledNwap: data.results[i].Nwap == 0 ? false : true,
                enabledNadep: data.results[i].Nadep == 0 ? false : true,
                enabledNanew: data.results[i].Nanew == 0 ? false : true,
                enabledNattl: data.results[i].Nattl == 0 ? false : true,

                Nreser: data.results[i].Nreser,
                enabledNreser: data.results[i].Nreser == 0 ? false : true
              });

              jsonInventoryFNAReg.push({
                Mregion: data.results[i].ZMregDesc, // DNANEW +
                Region: data.results[i].ZRegDesc,
                Country: data.results[i].ZCouDesc,
                City: data.results[i].ZCityDesc,
                Category: data.results[i].Pcate,
                "Sub Category": data.results[i].Pclass, // DNANEW +
                "Unit Type": data.results[i].Matnr,

                TIND: data.results[i].Redel,
                //					    				"Nredel": data.results[i].Nredel,
                "Depot Target":
                  data.results[i].Tdi == 99999999 ? 0 : data.results[i].Tdi,
                "Capex Target":
                  data.results[i].Tci == 99999999 ? 0 : data.results[i].Tci,
                "Depot Shortage/Surplus": data.results[i].Odi,
                "Capex Shortage/Surplus": data.results[i].Oci,
                "Port Rating": data.results[i].Por,

                "Depot AVLB": data.results[i].Avlb,
                "Capex AVLB": data.results[i].Navlb,
                APPD: data.results[i].Auth,
                "Depot Booked": data.results[i].Book,
                "Capex Booked": data.results[i].Nbook,
                "Depot Reserved": data.results[i].Reser,
                "Capex Reserved": data.results[i].Nreser,
                HOLD: data.results[i].Hold,
                "Total Stock": data.results[i].Ttls,
                WEST: data.results[i].West,
                AWAP: data.results[i].Nwap,
                "Total Net AVLB": data.results[i].Nattl,
                "Depot Net AVLB": data.results[i].Nadep,
                "Capex Net AVLB": data.results[i].Nanew
              });
            } else if (data.results[i].Leve == "F4") {
              // DNANEW + added this F4 part
              if (data.results[i].Depot != "") {
                splitDepot = data.results[i].Depot.split("$");
              } else {
                splitDepot = [];
              }
              FNASummaryArrayF4.push({
                Mregion: data.results[i].Mregion.split("$")[0], // DNANEW +
                ZMregDesc: data.results[i].Mregion.split("$")[1], // DNANEW +
                Region: data.results[i].Region,
                Country: data.results[i].Country,
                City: data.results[i].Citycod,
                Depot: splitDepot[0], // DNANEW +
                Depotname: splitDepot[1], // DNANEW +
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass, // DNANEW +
                Matnr: data.results[i].Matnr,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Customer: data.results[i].Customer,
                Customername: data.results[i].Customername
              });
            } /*else if(data.results[i].Leve == 'ERP'){
				    				FNAERPDataConc.push({
				    					"Erpdata" : data.results[i].Erpdata,
									});
					    		}
			    				else if(data.results[i].Leve == 'CRM'){
				    				FNACRMDataConc.push({
				    					"Crmdata" : data.results[i].Crmdata,
									});
					    		}else if(data.results[i].Leve == 'CRME'){
				    				FNACRMDataEqui.push({
				    					"Crmdata" : data.results[i].Crmdata,
									});
					    		}*/
          }
          console.log("No. of entries returned : ", entriesfound);
          if (data.results[0].UpDate != "") {
            var updatedDate = data.results[0].UpDate.split(".");
            updatedDate =
              updatedDate[1] + "/" + updatedDate[0] + "/" + updatedDate[2];
            updatedDate = new Date(updatedDate);
            updatedDate =
              updatedDate.toString().substr(0, 3) +
              ", " +
              updatedDate.toString().substr(4, 11);

            var updatedTime = data.results[0].UpTime;
            updatedTime = updatedTime + " GMT"; //GMT+1

            var updatedTimeStamp = updatedDate + " " + updatedTime;
            updatedTimeStamp = new Date(updatedTimeStamp);
            //updatedTimeStamp = 'Dynamic Net-A Report as on ' + updatedTimeStamp.toString().substr(0,25);
            updatedTimeStamp = "Dynamic Net-A Report - Real Time Inventory";
            sap.ui
              .getCore()
              .byId("idPageMainTitle")
              .setText(updatedTimeStamp); //DNANEW+
          } else {
            var updateStringLFNA = "Dynamic Net-A Report ";
            //sap.ui.getCore().byId("idLFNAUpdate").setText(updateStringLFNA);	// DNANEW-
            sap.ui
              .getCore()
              .byId("idPageMainTitle")
              .setText(updateStringLFNA); // DNANEW+
          }

          FNASummaryArrayBackup = FNASummaryArray;
          if (
            sap.ui
              .getCore()
              .byId("idTableFNASummary")
              .getModel()
          )
            sap.ui
              .getCore()
              .byId("idTableFNASummary")
              .getModel()
              .destroyBindingContext();
          var oModelEDIFNASummary = new sap.ui.model.json.JSONModel();
          oModelEDIFNASummary.setData({ modelData: FNASummaryArray });
          sap.ui
            .getCore()
            .byId("idTableFNASummary")
            .setModel(oModelEDIFNASummary);
          sap.ui
            .getCore()
            .byId("idTableFNASummary")
            .bindRows("/modelData");

          globalTableFNASummaryTPC.refresh();

          var visiblerowcount = window.localStorage.getItem(
            "memTotalRowsField"
          );
          if (visiblerowcount) {
            visiblerowcount = parseInt(visiblerowcount);
          } else {
            visiblerowcount = 20;
          }
          if (FNASummaryArray.length < visiblerowcount) {
            sap.ui
              .getCore()
              .byId("idTableFNASummary")
              .setVisibleRowCount(visiblerowcount);
            //sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          } else {
            //sap.ui.getCore().byId("idTableFNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            sap.ui
              .getCore()
              .byId("idTableFNASummary")
              .setVisibleRowCount(visiblerowcount);
          }
          //sap.ui.getCore().byId("idPanelFilter").setExpanded(false);

          var tabData = sap.ui
            .getCore()
            .byId("idTableFNASummary")
            .getModel()
            .getData().modelData;
          var tabDataLength = tabData.length;
          var colId = "";
          for (var i = 0; i < tabDataLength; i++) {
            colId = "CAVLB-col14-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightred");
            $("#" + colId).addClass("lightred");

            colId = "CAUTH-col15-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightred");
            $("#" + colId).addClass("lightred");

            // colId = "CBOOK-col15-row" + i;
            // $("#"+colId).parent().parent().addClass("lightred");
            // $("#"+colId).addClass("lightred");
            //
            // colId = "NACWA-col16-row" + i;
            // $("#"+colId).parent().parent().addClass("strongred");
            // $("#"+colId).addClass("strongred");

            colId = "AVLB-col16-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightblue");
            $("#" + colId).addClass("lightblue");

            colId = "BOOK-col17-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightblue");
            $("#" + colId).addClass("lightblue");

            colId = "RESER-col18-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightblue");
            $("#" + colId).addClass("lightblue");

            colId = "NADEP-col19-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("strongblue");
            $("#" + colId).addClass("strongblue");

            colId = "DTAR-col20-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightblue");
            $("#" + colId).addClass("lightblue");

            colId = "DOPE-col21-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightblue");
            $("#" + colId).addClass("lightblue");

            colId = "FPURCH-col22-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightyellow");
            $("#" + colId).addClass("lightyellow");

            colId = "FEQUNR-col23-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightyellow");
            $("#" + colId).addClass("lightyellow");

            colId = "NAVLB-col24-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightorange");
            $("#" + colId).addClass("lightorange");

            colId = "NBOOK-col25-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightorange");
            $("#" + colId).addClass("lightorange");

            colId = "NRESER-col26-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightorange");
            $("#" + colId).addClass("lightorange");

            colId = "NANEW-col27-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("strongorange");
            $("#" + colId).addClass("strongorange");

            colId = "CTAR-col28-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightorange");
            $("#" + colId).addClass("lightorange");

            colId = "COPE-col29-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightorange");
            $("#" + colId).addClass("lightorange");
          }

          sap.ui
            .getCore()
            .byId("idTableFNASummary").onAfterRendering = function() {
            if (sap.ui.table.Table.prototype.onAfterRendering) {
              sap.ui.table.Table.prototype.onAfterRendering.apply(
                this,
                arguments
              );
            }

            var tabData = sap.ui
              .getCore()
              .byId("idTableFNASummary")
              .getModel()
              .getData().modelData;
            var tabDataLength = tabData.length;
            var colId = "";
            for (var i = 0; i < tabDataLength; i++) {
              colId = "CAVLB-col14-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightred");
              $("#" + colId).addClass("lightred");

              colId = "CAUTH-col15-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightred");
              $("#" + colId).addClass("lightred");

              // colId = "CBOOK-col15-row" + i;
              // $("#"+colId).parent().parent().addClass("lightred");
              // $("#"+colId).addClass("lightred");
              //
              // colId = "NACWA-col16-row" + i;
              // $("#"+colId).parent().parent().addClass("strongred");
              // $("#"+colId).addClass("strongred");

              colId = "AVLB-col16-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightblue");
              $("#" + colId).addClass("lightblue");

              colId = "BOOK-col17-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightblue");
              $("#" + colId).addClass("lightblue");

              colId = "RESER-col18-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightblue");
              $("#" + colId).addClass("lightblue");

              colId = "NADEP-col19-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("strongblue");
              $("#" + colId).addClass("strongblue");

              colId = "DTAR-col20-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightblue");
              $("#" + colId).addClass("lightblue");

              colId = "DOPE-col21-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightblue");
              $("#" + colId).addClass("lightblue");

              colId = "FPURCH-col22-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightyellow");
              $("#" + colId).addClass("lightyellow");

              colId = "FEQUNR-col23-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightyellow");
              $("#" + colId).addClass("lightyellow");

              colId = "NAVLB-col24-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightorange");
              $("#" + colId).addClass("lightorange");

              colId = "NBOOK-col25-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightorange");
              $("#" + colId).addClass("lightorange");

              colId = "NRESER-col26-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightorange");
              $("#" + colId).addClass("lightorange");

              colId = "NANEW-col27-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("strongorange");
              $("#" + colId).addClass("strongorange");

              colId = "CTAR-col28-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightorange");
              $("#" + colId).addClass("lightorange");

              colId = "COPE-col29-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightorange");
              $("#" + colId).addClass("lightorange");
            }
          };
        }
        var fnetaFilter = new newfnetaFilterOuts();
        fnetaFilter.setInitialFilter();

        var fnetaFilter = new newfnetaFilterOuts();

        var oMregionComboSelectedKeys = sap.ui
          .getCore()
          .byId("idMRegionCombo")
          .getSelectedKeys();
        oMregionComboSelectedKeys = $.grep(oMregionComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oMregionComboSelectedKeys.length != 0) {
          fnetaFilter.changeRegionCountryCityDepotFilter(
            oMregionComboSelectedKeys,
            2
          );
        }

        var oRegionComboSelectedKeys = sap.ui
          .getCore()
          .byId("idRegionCombo")
          .getSelectedKeys();
        oRegionComboSelectedKeys = $.grep(oRegionComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oRegionComboSelectedKeys.length != 0) {
          fnetaFilter.changeCountryCityDepotFilter(oRegionComboSelectedKeys, 2);
        }

        var oCountryComboSelectedKeys = sap.ui
          .getCore()
          .byId("idCountryCombo")
          .getSelectedKeys();
        oCountryComboSelectedKeys = $.grep(oCountryComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oCountryComboSelectedKeys.length != 0) {
          fnetaFilter.changeCityDepotFilter(oCountryComboSelectedKeys, 2);
        }

        var oCityComboSelectedKeys = sap.ui
          .getCore()
          .byId("idCityCombo")
          .getSelectedKeys();
        oCityComboSelectedKeys = $.grep(oCityComboSelectedKeys, function(n) {
          return n != "";
        });
        if (oCityComboSelectedKeys.length != 0) {
          fnetaFilter.changeDepotFilter(oCityComboSelectedKeys, 2);
        }

        var oProCatComboSelectedKeys = sap.ui
          .getCore()
          .byId("idProCatCombo")
          .getSelectedKeys();
        oProCatComboSelectedKeys = $.grep(oProCatComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oProCatComboSelectedKeys.length != 0) {
          fnetaFilter.changeProClassUnitTypeFilter(oProCatComboSelectedKeys, 2);
        }

        var oProClassComboSelectedKeys = sap.ui
          .getCore()
          .byId("idProClassCombo")
          .getSelectedKeys();
        oProClassComboSelectedKeys = $.grep(
          oProClassComboSelectedKeys,
          function(n) {
            return n != "";
          }
        );
        if (oProClassComboSelectedKeys.length != 0) {
          fnetaFilter.changeUnitTypeFilter(oProClassComboSelectedKeys, 2);
        }

        if (
          sap.ui
            .getCore()
            .byId("idRadioButtonCol")
            .getSelectedIndex() == 1
        ) {
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .setEnabled(true);
          sap.ui
            .getCore()
            .byId("ZCouDesc")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("ZCityDesc")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .setEnabled(false);
          sap.ui
            .getCore()
            .byId("Por")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .removeAllSelectedItems();
        } else if (
          sap.ui
            .getCore()
            .byId("idRadioButtonCol")
            .getSelectedIndex() == 2
        ) {
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .setEnabled(true);
          sap.ui
            .getCore()
            .byId("ZCouDesc")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("ZCityDesc")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .setEnabled(true);
          sap.ui
            .getCore()
            .byId("Por")
            .setVisible(true);
        } else if (
          sap.ui
            .getCore()
            .byId("idRadioButtonCol")
            .getSelectedIndex() == 0
        ) {
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .setEnabled(false);
          sap.ui
            .getCore()
            .byId("ZCouDesc")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("ZCityDesc")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .setEnabled(false);
          sap.ui
            .getCore()
            .byId("Por")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .removeAllSelectedItems();
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .removeAllSelectedItems();
        }

        var allorcapex = sap.ui
          .getCore()
          .byId("idRadioButtonCapex")
          .getSelectedIndex();
        if (allorcapex == 0) {
          sap.ui
            .getCore()
            .byId("Cavlb")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Cauth")
            .setVisible(true);
          //sap.ui.getCore().byId("Cbook").setVisible(true);
          //sap.ui.getCore().byId("Nacwa").setVisible(true);
          sap.ui
            .getCore()
            .byId("Avlb")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Book")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Reser")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nadep")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Tdi")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Odi")
            .setVisible(true);

          sap.ui
            .getCore()
            .byId("Fpurch")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Fequnr")
            .setVisible(true);

          sap.ui
            .getCore()
            .byId("Navlb")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nbook")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nreser")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nanew")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Tci")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Oci")
            .setVisible(true);
        } else if (allorcapex == 1) {
          sap.ui
            .getCore()
            .byId("Cavlb")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Cauth")
            .setVisible(true);
          //sap.ui.getCore().byId("Cbook").setVisible(true);
          //sap.ui.getCore().byId("Nacwa").setVisible(true);
          sap.ui
            .getCore()
            .byId("Avlb")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Book")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Reser")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nadep")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Tdi")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Odi")
            .setVisible(true);

          sap.ui
            .getCore()
            .byId("Fpurch")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Fequnr")
            .setVisible(false);

          sap.ui
            .getCore()
            .byId("Navlb")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Nbook")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Nreser")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Nanew")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Tci")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Oci")
            .setVisible(false);
        } else if (allorcapex == 2) {
          sap.ui
            .getCore()
            .byId("Cavlb")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Cauth")
            .setVisible(false);
          //sap.ui.getCore().byId("Cbook").setVisible(false);
          //sap.ui.getCore().byId("Nacwa").setVisible(false);
          sap.ui
            .getCore()
            .byId("Avlb")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Book")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Reser")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Nadep")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Tdi")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("Odi")
            .setVisible(false);

          sap.ui
            .getCore()
            .byId("Fpurch")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Fequnr")
            .setVisible(true);

          sap.ui
            .getCore()
            .byId("Navlb")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nbook")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nreser")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Nanew")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Tci")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("Oci")
            .setVisible(true);
        }

        busyDialog.close();
      },
      function(err) {
        busyDialog.close();
      }
    );
  },

  getFPNASummary: function(filterString) {
    // FPNASummaryArray = [];
    // FPNASummaryArray.push({
    // 	WorkOrder : "912963",
    // 	MoveType : "Depot",
    // 	Fleet : "Lease",
    // 	MatnrP : "SFW4",
    // 	Qty : "5",
    // 	IntQty : "Firm Deal",
    // 	Purpose : "",
    // 	Origin : "Mumbai",
    // 	Destination : "Savannah",
    // 	EtaDest : " 31.10.2019",
    // 	EstCost : "900",
    // 	EstTotCost : "4,500",
    // 	Remarks : "Schuyler Line"
    // });

    // jsonInventoryFPNA = [];
    // jsonInventoryFPNA.push({
    // 	WorkOrder : "912963",
    // 	MoveType : "Depot",
    // 	Fleet : "Lease",
    // 	MatnrP : "SFW4",
    // 	Qty : "5",
    // 	IntQty : "Firm Deal",
    // 	Purpose : "",
    // 	Origin : "Mumbai",
    // 	Destination : "Savannah",
    // 	EtaDest : " 31.10.2019",
    // 	EstCost : "900",
    // 	EstTotCost : "4,500",
    // 	Remarks : "Schuyler Line"
    // });

    // FPNASummaryArrayBackup = FPNASummaryArray;
    // oModelEDIFPNASummary = new sap.ui.model.json.JSONModel();
    // oModelEDIFPNASummary.setData({modelData: FPNASummaryArray});
    // 	sap.ui.getCore().byId("idTableFPNASummary").setModel(oModelEDIFPNASummary);
    // 	sap.ui.getCore().byId("idTableFPNASummary").bindRows("/modelData");
    // 	globalTableFPNASummaryTPC.refresh();

    // 	var visiblerowcount = window.localStorage.getItem("memTotalRowsField");
    // 	if(visiblerowcount){
    // 		visiblerowcount = parseInt(visiblerowcount);
    // 	}else{
    // 		visiblerowcount = 20;
    // 	}
    // 		if (FPNASummaryArray.length < visiblerowcount){
    // 			sap.ui.getCore().byId("idTableFPNASummary").setVisibleRowCount(visiblerowcount);
    // 			//sap.ui.getCore().byId("idTableFPNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    // 		}
    // 	else{
    // 		//sap.ui.getCore().byId("idTableFPNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    // 		sap.ui.getCore().byId("idTableFPNASummary").setVisibleRowCount(visiblerowcount);
    // 	}

    // 	sap.ui
    //               .getCore()
    //               .byId("idPanelFilter")
    // 			.setVisible(false);

    // 	return;

    busyDialog.open();
    var oCurrent = this;
    oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
    OData.request(
      {
        requestUri: fposnnetaLink,
        method: "GET",
        dataType: "json",
        username: "GW_ADMIN",
        password: "Seaco@123",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=utf-8",
          DataServiceVersion: "2.0",
          "X-CSRF-Token": "Fetch"
        }
      },
      function(data, response) {
        busyDialog.close();
        if (data.results.length == 0) {
					jQuery.sap.require("sap.ui.commons.MessageBox");
          sap.ui.commons.MessageBox.show(
            "No Result Found.",
            sap.ui.commons.MessageBox.Icon.WARNING,
            "Warning",
            [sap.ui.commons.MessageBox.Action.OK],
            sap.ui.commons.MessageBox.Action.OK
          );

          //var loadSecond = new utilreppage();
          //loadSecond.getUTSummary();
          busyDialog.close();
        } else {
          FPNASummaryArray = [];
          jsonInventoryFPNA = [];
					var vEtaDest = "";
					var sEtaDest = "";
          for (var i = 0; i < data.results.length; i++) {

						if (data.results[i].EtaDest != null) {
							vEtaDest = data.results[i].EtaDest.split("(");
							vEtaDest = vEtaDest[1].split(")");

							sEtaDest = dateFormat(
								new Date(Number(vEtaDest[0])),
								"yyyymmdd",
								"UTC"
							);

							vEtaDest = dateFormat(
								new Date(Number(vEtaDest[0])),
								"dd-mm-yyyy",
								"UTC"
							);
							
						}

            FPNASummaryArray.push({
              WorkOrder: String(parseInt(data.results[i].WorkOrder)),
              MoveType: data.results[i].MoveType,
              Fleet: data.results[i].Fleet,
              Matnr : data.results[i].Matnr,
              Qty: data.results[i].Qty,
              IntQty: parseInt(data.results[i].Qty),
              Purpose: data.results[i].Purpose,
              Origin: data.results[i].Origin,
              Destination: data.results[i].Destination,
							EtaDest: vEtaDest,
							sortEtaDest: sEtaDest,
              EstCost: thousandsep(data.results[i].EstCost),
							EstTotCost: thousandsep(data.results[i].EstTotCost),
							sortEstCost: parseFloat(data.results[i].EstCost),
              sortEstTotCost: parseFloat(data.results[i].EstTotCost),
              Remarks: data.results[i].Remarks
            });

            
            jsonInventoryFPNA.push({
              "Work Order" : parseInt(data.results[i].WorkOrder),
              "Move Type" : data.results[i].MoveType,
              "Fleet" : data.results[i].Fleet,
              "Unit Type" : data.results[i].Matnr,
              "Quantity" : data.results[i].Qty,
              "Purpose" : data.results[i].Purpose,
              "Origin" : data.results[i].Origin,
              "Destination" : data.results[i].Destination,
              "ETA Destination" : vEtaDest,
              "Est Door-Door Cost per Unit (USD)" : data.results[i].EstCost,
              "Est Total Door-Door Cost (USD)" : data.results[i].EstTotCost,
              "Remarks" : data.results[i].Remarks
						});
						
          }

          FPNASummaryArrayBackup = FPNASummaryArray;
          oModelEDIFPNASummary = new sap.ui.model.json.JSONModel();
          oModelEDIFPNASummary.setData({ modelData: FPNASummaryArray });
          sap.ui
            .getCore()
            .byId("idTableFPNASummary")
            .setModel(oModelEDIFPNASummary);
          sap.ui
            .getCore()
            .byId("idTableFPNASummary")
            .bindRows("/modelData");
          globalTableFPNASummaryTPC.refresh();

          var visiblerowcount = window.localStorage.getItem(
            "memTotalRowsField"
          );
          if (visiblerowcount) {
            visiblerowcount = parseInt(visiblerowcount);
          } else {
            visiblerowcount = 20;
          }
          if (FPNASummaryArray.length < visiblerowcount) {
            sap.ui
              .getCore()
              .byId("idTableFPNASummary")
              .setVisibleRowCount(visiblerowcount);
            //sap.ui.getCore().byId("idTableFPNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          } else {
            //sap.ui.getCore().byId("idTableFPNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            sap.ui
              .getCore()
              .byId("idTableFPNASummary")
              .setVisibleRowCount(visiblerowcount);
          }

          sap.ui
            .getCore()
            .byId("idPanelFilter")
            .setVisible(false);
        }
        busyDialog.close();
      },
      function(err) {
        busyDialog.close();
        //errorfromServer(err);
        //alert("Error in data read from BW Query");
      }
    );
  },

  getFONASummary: function(filterString) {
    busyDialog.open();
    var oCurrent = this;
    oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
    OData.request(
      {
        requestUri: foutnetaLink + filterString,
        method: "GET",
        dataType: "json",
        username: "GW_ADMIN",
        password: "Seaco@123",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=utf-8",
          DataServiceVersion: "2.0",
          "X-CSRF-Token": "Fetch"
        }
      },
      function(data, response) {
        //busyDialog.open();
        if (data.results.length == 0) {
          sap.ui.commons.MessageBox.show(
            "No Result Found.",
            sap.ui.commons.MessageBox.Icon.WARNING,
            "Warning",
            [sap.ui.commons.MessageBox.Action.OK],
            sap.ui.commons.MessageBox.Action.OK
          );

          //var loadSecond = new utilreppage();
          //loadSecond.getUTSummary();
          busyDialog.close();
        } else {
          var sexpirydate = "";
          var vexpirydate = "";
          var vexpiry = "";

          var sstartdate = "";
          var vstartdate = "";
          var vstart = "";

          var region = "";
          var statusdesc = "";
          FONASummaryArray = [];
          FNASummaryArrayF4 = []; // DNANEW +
          jsonInventoryFONA = [];
          var leasename = "";
          var releasename = "";
          var splitDepot = [];
          for (var i = 0; i < data.results.length; i++) {
            statusdesc = "";
            leasename = "";
            region = "";
            if (data.results[i].Leve == "MAIN") {
              switch (data.results[i].Status) {
                case "BOOK":
                  statusdesc = "Depot Booking";
                  break;
                case "RESER":
                  statusdesc = "Depot Reserv.";
                  break;
                case "CBOOK":
                  statusdesc = "CW Depot Booking";
                  break;
                case "CRESER":
                  statusdesc = "CW Depot Reserv.";
                  break;
                case "SBOOK":
                  statusdesc = "Sale Depot Booking";
                  break;
                case "QBOOK":
                  statusdesc = "Sale Depot Booking";
                  break;
                case "REDEL":
                  statusdesc = "Depot Redelivery";
                  break;
                case "SREDEL":
                  statusdesc = "Sale Depot Redelivery";
                  break;

                case "NBOOK":
                  statusdesc = "Capex Booking";
                  break;
                case "NRESER":
                  statusdesc = "Capex Reserv.";
                  break;
                case "CNBOOK":
                  statusdesc = "CW Capex Booking";
                  break;
                case "CNRESER":
                  statusdesc = "CW Capex Reserv.";
                  break;
                case "SNBOOK":
                  statusdesc = "Sale Capex Booking";
                  break;
                case "QNBOOK":
                  statusdesc = "Sale Capex Booking";
                  break;
                case "NREDEL":
                  statusdesc = "Capex Redelivery";
                  break;
                case "SNREDEL":
                  statusdesc = "Sale Capex Redelivery";
                  break;
              }

              switch (data.results[i].LeaseType) {
                case "ZMP":
                  leasename = "Positioning";
                  break;
                case "ZMX":
                  leasename = "Fixed Term";
                  break;
                case "ZMV":
                  leasename = "Variable";
                  break;
                case "ZMF":
                  leasename = "Finance";
                  break;
              }

              switch (data.results[i].Mregion) {
                case "AP":
                  region = "Asia Pacific";
                  break;
                case "AM":
                  region = "Americas";
                  break;
                case "EA":
                  region = "Europe-Africa";
                  break;
                case "OC":
                  region = "Oceania";
                  break;
              }

              if (data.results[i].StartDate != null) {
                vstartdate = data.results[i].StartDate.split("(");
                vstart = vstartdate[1].split(")");
                vstartdate = dateFormat(
                  new Date(Number(vstart[0])),
                  "dd-mm-yyyy",
                  "UTC"
                );
                sstartdate = dateFormat(
                  new Date(Number(vstart[0])),
                  "yyyymmdd",
                  "UTC"
                );
              }

              if (data.results[i].ExpiryDate != null) {
                vexpirydate = data.results[i].ExpiryDate.split("(");
                vexpiry = vexpirydate[1].split(")");
                vexpirydate = dateFormat(
                  new Date(Number(vexpiry[0])),
                  "dd-mm-yyyy",
                  "UTC"
                );
                sexpirydate = dateFormat(
                  new Date(Number(vexpiry[0])),
                  "yyyymmdd",
                  "UTC"
                );
              }

              FONASummaryArray.push({
                ReleaseAuth: data.results[i].ReleaseAuth,
                ReleaseType: data.results[i].ReleaseType,
                Status: statusdesc,

                Customer: data.results[i].Customer,
                Customername: data.results[i].Customername,
                Depot: data.results[i].Dcode,
                Depotname: data.results[i].Depot,
                LeaseNo: data.results[i].LeaseNo,
                LeaseType: leasename,

                StartDate: vstartdate,
                DateStartDate: sstartdate,

                ExpiryDate: vexpirydate,
                DateExpiryDate: sexpirydate,
                Creator: data.results[i].Creator,

                ExtRef: data.results[i].ExtRef,
                Comments: data.results[i].Comments,

                TotQty: data.results[i].TotQty,
                IntTotQty: parseInt(data.results[i].TotQty),

                PickedQty: data.results[i].PickedQty,
                IntPickedQty: parseInt(data.results[i].PickedQty),
                enabledPick:
                  parseInt(data.results[i].PickedQty) == 0 ? false : true,

                OutstandQty: data.results[i].OutstandQty,
                IntOutstandQty: parseInt(data.results[i].OutstandQty),

                Mregion: region,
                ZRegDescO: data.results[i].ZRegDesc,
                ZCouDescO: data.results[i].ZCouDesc,
                ZCityDescO: data.results[i].ZCityDesc,
                PcateO: data.results[i].Pcate,
                PclassO: data.results[i].Pclass,
                MatnrO: data.results[i].Matnr,
                UnitDescO: data.results[i].UnitDesc,

                Equipment: data.results[i].Equipment,
                Pendingpu: data.results[i].Pendingpu,
                Onhiredat: data.results[i].Onhiredat,
                Sapstatus: data.results[i].Sapstatus,
                Grade: data.results[i].SaleGrade

                //					    		City:data.results[i].City,
                //					    		Citycod:data.results[i].Citycod,
                //					    		Country:data.results[i].Country,
                //					    		DetLevel:data.results[i].DetLevel,
                //					    		Extra1:data.results[i].Extra1,
                //					    		Extra2:data.results[i].Extra2,
                //					    		Extra3:data.results[i].Extra3,
                //					    		Extra4:data.results[i].Extra4,
                //					    		GuidH:data.results[i].GuidH,
                //					    		Keys:data.results[i].Keys,
                //					    		UnitType:data.results[i].UnitType,
                //					    		UpDate:data.results[i].UpDate,
                //					    		UpTime:data.results[i].UpTime
              });

              jsonInventoryFONA.push({
                ReleaseAuth: data.results[i].ReleaseAuth,
                ReleaseType: data.results[i].ReleaseType,
                Status: data.results[i].Status,

                Customer: data.results[i].Customer,
                Customername: data.results[i].Customername,
                Dcode: data.results[i].Dcode,
                Depot: data.results[i].Depot,
                LeaseNo: data.results[i].LeaseNo,
                LeaseType: data.results[i].LeaseType,

                StartDate: data.results[i].StartDate,
                ExpiryDate: data.results[i].ExpiryDate,
                Creator: data.results[i].Creator,

                ExtRef: data.results[i].ExtRef,
                Comments: data.results[i].Comments,

                TotQty: data.results[i].TotQty,
                PickedQty: data.results[i].PickedQty,
                OutstandQty: data.results[i].OutstandQty,

                Mregion: region,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass,
                Matnr: data.results[i].Matnr,
                UnitDesc: data.results[i].UnitDesc,

                Equipment: data.results[i].Equipment,
                Pendingpu: data.results[i].Pendingpu,
                Onhiredat: data.results[i].Onhiredat,
                Sapstatus: data.results[i].Sapstatus,
                Grade: data.results[i].SaleGrade
              });
            } else if (data.results[i].Leve == "F4") {
              // DNANEW + added this F4 part
              switch (data.results[i].LeaseType) {
                case "ZMP":
                  leasename = "Positioning";
                  break;
                case "ZMX":
                  leasename = "Fixed Term";
                  break;
                case "ZMV":
                  leasename = "Variable";
                  break;
                case "ZMF":
                  leasename = "Finance";
                  break;
              }

              /*switch(data.results[i].ReleaseType){
			    						case "ZRP":
			    							releasename = "Positioning";
			    							break;
			    						case "ZRX":
			    							releasename = "Fixed Term";
			    							break;
			    						case "ZRV":
			    							releasename = "Variable";
			    							break;
			    						case "ZRF":
			    							releasename = "Finance";
			    							break;
			    						case "ZRA":
			    							releasename = "Redeliveries";
			    							break;
			    						};*/

              switch (data.results[i].Status) {
                case "BOOK":
                  releasename = "Depot Booking";
                  break;
                case "RESER":
                  releasename = "Depot Reserv.";
                  break;
                case "CBOOK":
                  releasename = "CW Depot Booking";
                  break;
                case "CRESER":
                  releasename = "CW Depot Reserv.";
                  break;
                case "SBOOK":
                  releasename = "Sale Depot Booking";
                  break;
                case "QBOOK":
                  releasename = "Sale Depot Booking";
                  break;
                case "REDEL":
                  releasename = "Depot Redelivery";
                  break;
                case "SREDEL":
                  releasename = "Sale Depot Redelivery";
                  break;

                case "NBOOK":
                  releasename = "Capex Booking";
                  break;
                case "NRESER":
                  releasename = "Capex Reserv.";
                  break;
                case "CNBOOK":
                  releasename = "CW Capex Booking";
                  break;
                case "CNRESER":
                  releasename = "CW Capex Reserv.";
                  break;
                case "SNBOOK":
                  releasename = "Sale Capex Booking";
                  break;
                case "QNBOOK":
                  releasename = "Sale Capex Booking";
                  break;
                case "NREDEL":
                  releasename = "Capex Redelivery";
                  break;
                case "SNREDEL":
                  releasename = "Sale Capex Redelivery";
                  break;
              }

              if (data.results[i].Depot != "") {
                splitDepot = data.results[i].Depot.split("$");
              } else {
                splitDepot = [];
              }

              FNASummaryArrayF4.push({
                Mregion: data.results[i].Mregion.split("$")[0], // DNANEW +
                ZMregDesc: data.results[i].Mregion.split("$")[1], // DNANEW +
                Region: data.results[i].Region,
                Country: data.results[i].Country,
                City: data.results[i].Citycod,
                Depot: splitDepot[0], // DNANEW +
                Depotname: splitDepot[1], // DNANEW +
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass, // DNANEW +
                Matnr: data.results[i].Matnr,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Customer: data.results[i].Customer,
                Customername: data.results[i].Customername,
                Leasetype: data.results[i].LeaseType,
                Leasename: leasename,
                Releasetype: data.results[i].ReleaseType,
                Releasename: releasename
              });
            }
          }

          if (data.results[0].UpDate != "") {
            var updatedDate = data.results[0].UpDate.split(".");
            updatedDate =
              updatedDate[1] + "/" + updatedDate[0] + "/" + updatedDate[2];
            updatedDate = new Date(updatedDate);
            updatedDate =
              updatedDate.toString().substr(0, 3) +
              ", " +
              updatedDate.toString().substr(4, 11);

            var updatedTime = data.results[0].UpTime;
            updatedTime = updatedTime + " GMT"; // GMT+1

            var updatedTimeStamp = updatedDate + " " + updatedTime;
            updatedTimeStamp = new Date(updatedTimeStamp);
            //updatedTimeStamp = 'Dynamic Net-A Report as on ' + updatedTimeStamp.toString().substr(0,25);
            updatedTimeStamp = "Dynamic Net-A Report - Real Time Inventory";
            sap.ui
              .getCore()
              .byId("idPageMainTitle")
              .setText(updatedTimeStamp); //DNANEW+
          } else {
            var updateStringLFRNA = "Dynamic Net-A Report ";
            //							sap.ui.getCore().byId("idLFRNAUpdate").setText(updateStringLFRNA);
            sap.ui
              .getCore()
              .byId("idPageMainTitle")
              .setText(updateStringLFNA); //DNANEW+
          }

          FONASummaryArrayBackup = FONASummaryArray;
          oModelEDIFONASummary = new sap.ui.model.json.JSONModel();
          oModelEDIFONASummary.setData({ modelData: FONASummaryArray });
          sap.ui
            .getCore()
            .byId("idTableFONASummary")
            .setModel(oModelEDIFONASummary);
          sap.ui
            .getCore()
            .byId("idTableFONASummary")
            .bindRows("/modelData");
          globalTableFONASummaryTPC.refresh();

          var visiblerowcount = window.localStorage.getItem(
            "memTotalRowsField"
          );
          if (visiblerowcount) {
            visiblerowcount = parseInt(visiblerowcount);
          } else {
            visiblerowcount = 20;
          }
          if (FONASummaryArray.length < visiblerowcount) {
            sap.ui
              .getCore()
              .byId("idTableFONASummary")
              .setVisibleRowCount(visiblerowcount);
            //sap.ui.getCore().byId("idTableFONASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          } else {
            //sap.ui.getCore().byId("idTableFONASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            sap.ui
              .getCore()
              .byId("idTableFONASummary")
              .setVisibleRowCount(visiblerowcount);
          }
          //sap.ui.getCore().byId("idPanelFilter").setExpanded(false);
          var outsprocess = sap.ui
            .getCore()
            .byId("idFONARadioButtonProcess")
            .getSelectedIndex();
          if (outsprocess == 0) {
            // Redelivery
            sap.ui
              .getCore()
              .byId("TotQty")
              .setVisible(false);
            sap.ui
              .getCore()
              .byId("PickedQty")
              .setVisible(false);
            sap.ui
              .getCore()
              .byId("OutstandQty")
              .setVisible(false);
            sap.ui
              .getCore()
              .byId("Sgrade")
              .setVisible(false);
            sap.ui
              .getCore()
              .byId("Equipment")
              .setVisible(true);
            sap.ui
              .getCore()
              .byId("Sapstatus")
              .setVisible(true);
            sap.ui
              .getCore()
              .byId("idReleasetypeCombo")
              .setVisible(false);
          } else if (outsprocess == 1) {
            sap.ui
              .getCore()
              .byId("TotQty")
              .setVisible(true);
            sap.ui
              .getCore()
              .byId("PickedQty")
              .setVisible(true);
            sap.ui
              .getCore()
              .byId("OutstandQty")
              .setVisible(true);
            sap.ui
              .getCore()
              .byId("Sgrade")
              .setVisible(true);
            sap.ui
              .getCore()
              .byId("Equipment")
              .setVisible(false);
            sap.ui
              .getCore()
              .byId("Sapstatus")
              .setVisible(false);
            sap.ui
              .getCore()
              .byId("idReleasetypeCombo")
              .setVisible(true);
          }

          /*if (FONASummaryArray.length < 50){
			            	sap.ui.getCore().byId("idTableFONASummary").setVisibleRowCount(FONASummaryArray.length);
			            	sap.ui.getCore().byId("idTableFONASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			            }
			  	    	else{
			  	    		sap.ui.getCore().byId("idTableFONASummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			  	    		sap.ui.getCore().byId("idTableFONASummary").setVisibleRowCount(50);
			  	    		var totalPages = (Math.ceil(FONASummaryArray.length/50));
			  	    		totalPages = "Total No. of Pages : " + totalPages;
			  	    		sap.ui.getCore().byId("idTotalPages").setText(totalPages);
			  	    	}*/
        }

        var fnetaFilter = new newfnetaFilterOuts();
        fnetaFilter.setInitialFilter();

        var fnetaFilter = new newfnetaFilterOuts();

        var oMregionComboSelectedKeys = sap.ui
          .getCore()
          .byId("idMRegionCombo")
          .getSelectedKeys();
        oMregionComboSelectedKeys = $.grep(oMregionComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oMregionComboSelectedKeys.length != 0) {
          fnetaFilter.changeRegionCountryCityDepotFilter(
            oMregionComboSelectedKeys,
            2
          );
        }

        var oRegionComboSelectedKeys = sap.ui
          .getCore()
          .byId("idRegionCombo")
          .getSelectedKeys();
        oRegionComboSelectedKeys = $.grep(oRegionComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oRegionComboSelectedKeys.length != 0) {
          fnetaFilter.changeCountryCityDepotFilter(oRegionComboSelectedKeys, 2);
        }

        var oCountryComboSelectedKeys = sap.ui
          .getCore()
          .byId("idCountryCombo")
          .getSelectedKeys();
        oCountryComboSelectedKeys = $.grep(oCountryComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oCountryComboSelectedKeys.length != 0) {
          fnetaFilter.changeCityDepotFilter(oCountryComboSelectedKeys, 2);
        }

        var oCityComboSelectedKeys = sap.ui
          .getCore()
          .byId("idCityCombo")
          .getSelectedKeys();
        oCityComboSelectedKeys = $.grep(oCityComboSelectedKeys, function(n) {
          return n != "";
        });
        if (oCityComboSelectedKeys.length != 0) {
          fnetaFilter.changeDepotFilter(oCityComboSelectedKeys, 2);
        }

        var oProCatComboSelectedKeys = sap.ui
          .getCore()
          .byId("idProCatCombo")
          .getSelectedKeys();
        oProCatComboSelectedKeys = $.grep(oProCatComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oProCatComboSelectedKeys.length != 0) {
          fnetaFilter.changeProClassUnitTypeFilter(oProCatComboSelectedKeys, 2);
        }

        var oProClassComboSelectedKeys = sap.ui
          .getCore()
          .byId("idProClassCombo")
          .getSelectedKeys();
        oProClassComboSelectedKeys = $.grep(
          oProClassComboSelectedKeys,
          function(n) {
            return n != "";
          }
        );
        if (oProClassComboSelectedKeys.length != 0) {
          fnetaFilter.changeUnitTypeFilter(oProClassComboSelectedKeys, 2);
        }

        busyDialog.close();
      },
      function(err) {
        //busyDialog.close();
        //errorfromServer(err);
        //alert("Error in data read from BW Query");
      }
    );
  },

  getFRNASummary: function(filterString) {
    busyDialog.open();
    var oCurrent = this;
    oModel = new sap.ui.model.odata.ODataModel(fnetaService, true);
    OData.request(
      {
        requestUri: fremnetaLink + filterString,
        method: "GET",
        dataType: "json",
        username: "GW_ADMIN",
        password: "Seaco@123",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=utf-8",
          DataServiceVersion: "2.0",
          "X-CSRF-Token": "Fetch"
        }
      },
      function(data, response) {
        //busyDialog.open();
        if (data.results.length == 0) {
          sap.ui.commons.MessageBox.show(
            "No Result Found.",
            sap.ui.commons.MessageBox.Icon.WARNING,
            "Warning",
            [sap.ui.commons.MessageBox.Action.OK],
            sap.ui.commons.MessageBox.Action.OK
          );

          //var loadSecond = new utilreppage();
          //loadSecond.getUTSummary();
          busyDialog.close();
        } else {
          // Get Remarketing ERP Data.
          /*OData.request({
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
							    }); */

          FRNASummaryArray = [];
          FNASummaryArrayF4 = []; // DNANEW +
          jsonInventoryFRNA = [];
          sumavUnits = 0;
          sumnavUnits = 0;
          sumbUnits = 0;
          sumsavUnits = 0;
          var splitDepot = [];

          for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].Leve == "CITY") {
              FRNASummaryArray.push({
                MregionR: data.results[i].Mregion,
                RegionR: data.results[i].Region,
                CountryR: data.results[i].Country,
                CityR: data.results[i].City,
                isNormal:
                  data.results[i].Region == "AAA" ||
                  data.results[i].Region == "ZZZ"
                    ? false
                    : true,
                ZRegDescR: data.results[i].ZRegDesc,
                ZCouDescR: data.results[i].ZCouDesc,
                ZCityDescR: data.results[i].ZCityDesc,
                PcateR: data.results[i].Pcate,
                PclassR: data.results[i].Pclass, // DNANEW +
                MaterialR: data.results[i].Matnr,
                Rpr: data.results[i].Rpr,

                Sold: data.results[i].Sold,
                SoldFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Sold,
                enabledSold: data.results[i].Sold == 0 ? false : true,

                Cwbook: data.results[i].Cwbook,
                CwbookFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cwbook,
                enabledCwbook: data.results[i].Cwbook == 0 ? false : true,

                Cwavlb2: data.results[i].Cwavlb2,
                Cwavlb2Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cwavlb2,
                enabledCwavlb2: data.results[i].Cwavlb2 == 0 ? false : true,

                Saleawap: data.results[i].Saleawap,
                SaleawapFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Saleawap,
                enabledSaleawap: data.results[i].Saleawap == 0 ? false : true,

                Cwauth2: data.results[i].Cwauth2,
                Cwauth2Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cwauth2,
                enabledCwauth2: data.results[i].Cwauth2 == 0 ? false : true,

                Iicl1: data.results[i].Iicl1,
                Iicl1Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Iicl1,
                enabledIicl1: data.results[i].Iicl1 == 0 ? false : true,

                Cwsale2: data.results[i].Cwsale2,
                Cwsale2Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cwsale2,
                enabledCwsale2: data.results[i].Cwsale2 == 0 ? false : true,

                Asis3: data.results[i].Asis3,
                Asis3Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Asis3,
                enabledAsis3: data.results[i].Asis3 == 0 ? false : true,

                Asis4: data.results[i].Asis4,
                Asis4Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Asis4,
                enabledAsis4: data.results[i].Asis4 == 0 ? false : true,

                Asis5: data.results[i].Asis5,
                Asis5Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Asis5,
                enabledAsis5: data.results[i].Asis5 == 0 ? false : true,

                Iicl6: data.results[i].Iicl6,
                Iicl6Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Iicl6,
                enabledIicl6: data.results[i].Iicl6 == 0 ? false : true,

                Wwt9: data.results[i].Wwt9,
                Wwt9Fil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Wwt9,
                enabledWwt9: data.results[i].Wwt9 == 0 ? false : true,

                Netavlb: data.results[i].Netavlb,
                NetavlbFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Netavlb,
                enabledNetavlb: data.results[i].Netavlb == 0 ? false : true,

                Sredel: data.results[i].Sredel,
                SredelFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Sredel,
                enabledSredel: data.results[i].Sredel == 0 ? false : true,

                Sbook: data.results[i].Sbook,
                SbookFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Sbook,
                enabledSbook: data.results[i].Sbook == 0 ? false : true,

                Qbook: data.results[i].Qbook,
                QbookFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Qbook,
                enabledQbook: data.results[i].Qbook == 0 ? false : true,

                TriR:
                  data.results[i].Tri == 99999999 ? "TBA" : data.results[i].Tri,
                TriRFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Tri,
                enabledTriR: data.results[i].Tri == 0 ? false : true,

                Cwshortsuprl: data.results[i].Cwshortsuprl,
                CwshortsuprlFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Cwshortsuprl,
                enabledCwshortsuprl:
                  data.results[i].Cwshortsuprl == 0 ? false : true,

                TrpR:
                  data.results[i].Trp == 99999999 ? "TBA" : data.results[i].Trp,
                TrpRFil:
                  data.results[i].Region == "AAA"
                    ? "999999"
                    : data.results[i].Trp,
                enabledTrpR: data.results[i].Trp == 0 ? false : true,

                Leve: data.results[i].Leve
              });

              var selectedRadio = new sap.ui.getCore()
                .byId("idRadioButtonCol")
                .getSelectedItem()
                .getText();
              if (selectedRadio == "Country Level") {
                jsonInventoryFRNA.push({
                  Area:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].Mregion.split("$")[1], // DNANEW +
                  Region:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].ZRegDesc,
                  Country:
                    data.results[i].ZCouDesc == "AAA"
                      ? ""
                      : data.results[i].ZCouDesc,

                  Category: data.results[i].Pcate,
                  "Sub Category": data.results[i].Pclass, // DNANEW +
                  "Unit Type": data.results[i].Matnr,

                  "Sale Port Rating": data.results[i].Rpr,
                  "CW OWM Booked": data.results[i].Cwbook,
                  "Outstanding RA": data.results[i].Sredel,
                  "CW Grade 2 AVLB": data.results[i].Cwavlb2,
                  "SALE AWAP": data.results[i].Saleawap,
                  "CW Grade 2 AUTH": data.results[i].Cwauth2,
                  "IICL Grade 1 NET": data.results[i].Iicl1,
                  "CW Sale Grade 2 NET": data.results[i].Cwsale2,
                  "As Is Grade 3 NET": data.results[i].Asis3,
                  "As Is Grade 4 NET": data.results[i].Asis4,
                  "As Is Grade 5 NET": data.results[i].Asis5,
                  "Trading IICL Grade 6 NET": data.results[i].Iicl6,
                  "WWT Grade 9 NET": data.results[i].Wwt9,
                  "Total NET AVLB": data.results[i].Netavlb,

                  "Sold w/o Serial No.": data.results[i].Qbook,
                  "Sold with Serial No.": data.results[i].Sold,
                  "Target CW Inventory":
                    data.results[i].Tri == 99999999
                      ? "TBA"
                      : data.results[i].Tri,
                  "Target Price":
                    data.results[i].Trp == 99999999
                      ? "TBA"
                      : data.results[i].Trp,
                  "CW Shortage/Surplus": data.results[i].Cwshortsuprl
                });
              } else if (selectedRadio == "City Level") {
                jsonInventoryFRNA.push({
                  Area:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].Mregion.split("$")[1], // DNANEW +
                  Region:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].ZRegDesc,
                  Country:
                    data.results[i].ZCouDesc == "AAA"
                      ? ""
                      : data.results[i].ZCouDesc,
                  City:
                    data.results[i].ZCityDesc == "AAA"
                      ? ""
                      : data.results[i].ZCityDesc,
                  Category: data.results[i].Pcate,
                  "Sub Category": data.results[i].Pclass, // DNANEW +
                  "Unit Type": data.results[i].Matnr,

                  "Sale Port Rating": data.results[i].Rpr,
                  "CW OWM Booked": data.results[i].Cwbook,
                  "Outstanding RA": data.results[i].Sredel,
                  "CW Grade 2 AVLB": data.results[i].Cwavlb2,
                  "SALE AWAP": data.results[i].Saleawap,
                  "CW Grade 2 AUTH": data.results[i].Cwauth2,
                  "IICL Grade 1 NET": data.results[i].Iicl1,
                  "CW Sale Grade 2 NET": data.results[i].Cwsale2,
                  "As Is Grade 3 NET": data.results[i].Asis3,
                  "As Is Grade 4 NET": data.results[i].Asis4,
                  "As Is Grade 5 NET": data.results[i].Asis5,
                  "Trading IICL Grade 6 NET": data.results[i].Iicl6,
                  "WWT Grade 9 NET": data.results[i].Wwt9,
                  "Total NET AVLB": data.results[i].Netavlb,

                  "Sold w/o Serial No.": data.results[i].Qbook,
                  "Sold with Serial No.": data.results[i].Sold,
                  "Target CW Inventory":
                    data.results[i].Tri == 99999999
                      ? "TBA"
                      : data.results[i].Tri,
                  "Target Price":
                    data.results[i].Trp == 99999999
                      ? "TBA"
                      : data.results[i].Trp,
                  "CW Shortage/Surplus": data.results[i].Cwshortsuprl
                });
              } else if (selectedRadio == "Region Level") {
                jsonInventoryFRNA.push({
                  Area:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].Mregion.split("$")[1], // DNANEW +
                  Region:
                    data.results[i].ZRegDesc == "AAA"
                      ? ""
                      : data.results[i].ZRegDesc,

                  Category: data.results[i].Pcate,
                  "Sub Category": data.results[i].Pclass, // DNANEW +
                  "Unit Type": data.results[i].Matnr,
                  "Sale Port Rating": data.results[i].Rpr,
                  "CW OWM Booked": data.results[i].Cwbook,
                  "Outstanding RA": data.results[i].Sredel,
                  "CW Grade 2 AVLB": data.results[i].Cwavlb2,
                  "SALE AWAP": data.results[i].Saleawap,
                  "CW Grade 2 AUTH": data.results[i].Cwauth2,
                  "IICL Grade 1 NET": data.results[i].Iicl1,
                  "CW Sale Grade 2 NET": data.results[i].Cwsale2,
                  "As Is Grade 3 NET": data.results[i].Asis3,
                  "As Is Grade 4 NET": data.results[i].Asis4,
                  "As Is Grade 5 NET": data.results[i].Asis5,
                  "Trading IICL Grade 6 NET": data.results[i].Iicl6,
                  "WWT Grade 9 NET": data.results[i].Wwt9,
                  "Total NET AVLB": data.results[i].Netavlb,
                  "Sold w/o Serial No.": data.results[i].Qbook,
                  "Sold with Serial No.": data.results[i].Sold,
                  "Target CW Inventory":
                    data.results[i].Tri == 99999999
                      ? "TBA"
                      : data.results[i].Tri,
                  "Target Price":
                    data.results[i].Trp == 99999999
                      ? "TBA"
                      : data.results[i].Trp,
                  "CW Shortage/Surplus": data.results[i].Cwshortsuprl
                });
              }
            } else if (data.results[i].Leve == "COUN") {
              FRNASummaryArrayCou.push({
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Pcate: data.results[i].Pcate,
                Material: data.results[i].Material,
                Rpr: data.results[i].Rpr,
                Iicl: data.results[i].Iicl,
                Cworthy: data.results[i].Cworthy,
                Asis: data.results[i].Asis,
                Undrep: data.results[i].Undrep,
                Sold: data.results[i].Sold,
                Sredel: data.results[i].Sredel,
                enabledSredel: data.results[i].Sredel == 0 ? false : true,
                Owmepm: data.results[i].Owmepm,
                West: data.results[i].West,
                Tri:
                  data.results[i].Tri == 99999999 ? "TBA" : data.results[i].Tri,
                Trp:
                  data.results[i].Trp == 99999999 ? "TBA" : data.results[i].Trp,
                Ocwinv: data.results[i].Ocwinv,
                Leve: data.results[i].Leve,
                enabledIicl: data.results[i].Iicl == 0 ? false : true,
                enabledCworthy: data.results[i].Cworthy == 0 ? false : true,
                enabledAsis: data.results[i].Asis == 0 ? false : true,
                enabledUndrep: data.results[i].Undrep == 0 ? false : true,
                enabledSold: data.results[i].Sold == 0 ? false : true,
                enabledOwmepm: data.results[i].Owmepm == 0 ? false : true,
                enabledWest: data.results[i].West == 0 ? false : true
              });

              jsonInventoryFRNA.push({
                Region: data.results[i].ZRegDesc,
                Country: data.results[i].ZCouDesc,
                City: data.results[i].ZCityDesc,
                Category: data.results[i].Pcate,
                "Unit Type": data.results[i].Material,
                "Remark. Port Rating": data.results[i].Rpr,
                "CIC/IICL": data.results[i].Iicl,
                CW: data.results[i].Cworthy,
                "As Is": data.results[i].Asis,
                "CW APPD": data.results[i].Undrep,
                "Turn In for Sale": data.results[i].Sredel,
                "Sold Pending PU": data.results[i].Sold,
                "REM AWAP": data.results[i].West,
                "Target CW Inventory":
                  data.results[i].Tri == 99999999 ? "TBA" : data.results[i].Tri,
                "Target Price":
                  data.results[i].Trp == 99999999 ? "TBA" : data.results[i].Trp,
                "CW Shortage/Surplus": data.results[i].Cwshortsuprl
              });
            } else if (data.results[i].Leve == "REGI") {
              FRNASummaryArrayReg.push({
                ZRegDescR: data.results[i].ZRegDesc,
                ZCouDescR: data.results[i].ZCouDesc,
                ZCityDescR: data.results[i].ZCityDesc,
                PcateR: data.results[i].Pcate,
                MaterialR: data.results[i].Material,
                RprR: data.results[i].Rpr,
                IiclR: data.results[i].Iicl,
                CworthyR: data.results[i].Cworthy,
                AsisR: data.results[i].Asis,
                UndrepR: data.results[i].Undrep,
                SoldR: data.results[i].Sold,
                SredelR: data.results[i].Sredel,
                enabledSredel: data.results[i].Sredel == 0 ? false : true,
                OwmepmR: data.results[i].Owmepm,
                WestR: data.results[i].West,
                TriR:
                  data.results[i].Tri == 99999999 ? "TBA" : data.results[i].Tri,
                TrpR:
                  data.results[i].Trp == 99999999 ? "TBA" : data.results[i].Trp,
                OcwinvR: data.results[i].Ocwinv,
                Leve: data.results[i].Leve,
                enabledIicl: data.results[i].Iicl == 0 ? false : true,
                enabledCworthy: data.results[i].Cworthy == 0 ? false : true,
                enabledAsis: data.results[i].Asis == 0 ? false : true,
                enabledUndrep: data.results[i].Undrep == 0 ? false : true,
                enabledSold: data.results[i].Sold == 0 ? false : true,
                enabledOwmepm: data.results[i].Owmepm == 0 ? false : true,
                enabledWest: data.results[i].West == 0 ? false : true
              });

              jsonInventoryFRNA.push({
                Region: data.results[i].ZRegDesc,
                Country: data.results[i].ZCouDesc,
                City: data.results[i].ZCityDesc,
                Category: data.results[i].Pcate,
                "Unit Type": data.results[i].Material,
                "Remark. Port Rating": data.results[i].Rpr,
                "CIC/IICL": data.results[i].Iicl,
                CW: data.results[i].Cworthy,
                "As Is": data.results[i].Asis,
                "CW APPD": data.results[i].Undrep,
                "Turn In for Sale": data.results[i].Sredel,
                "Sold Pending PU": data.results[i].Sold,
                "REM AWAP": data.results[i].West,
                "Target CW Inventory":
                  data.results[i].Tri == 99999999 ? "TBA" : data.results[i].Tri,
                "Target Price":
                  data.results[i].Trp == 99999999 ? "TBA" : data.results[i].Trp,
                "CW Shortage/Surplus": data.results[i].Cwshortsuprl
              });
            } else if (data.results[i].Leve == "F4") {
              // DNANEW + added this F4 part

              if (data.results[i].Depot != "") {
                splitDepot = data.results[i].Depot.split("$");
              } else {
                splitDepot = [];
              }

              FNASummaryArrayF4.push({
                Mregion: data.results[i].Mregion.split("$")[0], // DNANEW +
                ZMregDesc: data.results[i].Mregion.split("$")[1], // DNANEW +
                Region: data.results[i].Region,
                Country: data.results[i].Country,
                City: data.results[i].City,
                Depot: splitDepot[0], // DNANEW +
                Depotname: splitDepot[1], // DNANEW +
                Pcate: data.results[i].Pcate,
                Pclass: data.results[i].Pclass, // DNANEW +
                Matnr: data.results[i].Matnr,
                ZRegDesc: data.results[i].ZRegDesc,
                ZCouDesc: data.results[i].ZCouDesc,
                ZCityDesc: data.results[i].ZCityDesc,
                Customer: data.results[i].Customer,
                Customername: data.results[i].Customername
              });
            }
          }

          if (data.results[0].UpDate != "") {
            var updatedDate = data.results[0].UpDate.split(".");
            updatedDate =
              updatedDate[1] + "/" + updatedDate[0] + "/" + updatedDate[2];
            updatedDate = new Date(updatedDate);
            updatedDate =
              updatedDate.toString().substr(0, 3) +
              ", " +
              updatedDate.toString().substr(4, 11);

            var updatedTime = data.results[0].UpTime;
            updatedTime = updatedTime + " GMT"; //GMT+1

            var updatedTimeStamp = updatedDate + " " + updatedTime;
            updatedTimeStamp = new Date(updatedTimeStamp);
            //updatedTimeStamp = 'Dynamic Net-A Report as on ' + updatedTimeStamp.toString().substr(0,25);
            updatedTimeStamp = "Dynamic Net-A Report - Real Time Inventory";
            sap.ui
              .getCore()
              .byId("idPageMainTitle")
              .setText(updatedTimeStamp); //DNANEW+
          } else {
            var updateStringLFRNA = "Dynamic Net-A Report ";
            //								sap.ui.getCore().byId("idLFRNAUpdate").setText(updateStringLFRNA);
            updateStringLFRNA = "Dynamic Net-A Report - Real Time Inventory";
            sap.ui
              .getCore()
              .byId("idPageMainTitle")
              .setText(updateStringLFRNA); //DNANEW+
          }

          FRNASummaryArrayBackup = FRNASummaryArray;
          oModelEDIFRNASummary = new sap.ui.model.json.JSONModel();
          oModelEDIFRNASummary.setData({ modelData: FRNASummaryArray });
          sap.ui
            .getCore()
            .byId("idTableFRNASummary")
            .setModel(oModelEDIFRNASummary);
          sap.ui
            .getCore()
            .byId("idTableFRNASummary")
            .bindRows("/modelData");
          globalTableFRNASummaryTPC.refresh();

          var visiblerowcount = window.localStorage.getItem(
            "memTotalRowsField"
          );
          if (visiblerowcount) {
            visiblerowcount = parseInt(visiblerowcount);
          } else {
            visiblerowcount = 20;
          }
          if (FRNASummaryArray.length < visiblerowcount) {
            sap.ui
              .getCore()
              .byId("idTableFRNASummary")
              .setVisibleRowCount(visiblerowcount);
            //sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          } else {
            //sap.ui.getCore().byId("idTableFRNASummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            sap.ui
              .getCore()
              .byId("idTableFRNASummary")
              .setVisibleRowCount(visiblerowcount);
          }

          var tabData = sap.ui
            .getCore()
            .byId("idTableFRNASummary")
            .getModel()
            .getData().modelData;
          var tabDataLength = tabData.length;
          var colId = "";
          for (var i = 0; i < tabDataLength; i++) {
            colId = "IICL1-col11-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");

            colId = "CWSALE2-col12-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");

            colId = "ASIS3-col13-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");

            colId = "ASIS4-col14-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");

            colId = "ASIS5-col15-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");

            colId = "IICL6-col16-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");

            colId = "WWT9-col17-row" + i;
            $("#" + colId)
              .parent()
              .parent()
              .addClass("lightgreen");
            $("#" + colId).addClass("lightgreen");
          }

          //sap.ui.getCore().byId("idPanelFilter").setExpanded(false);
          sap.ui
            .getCore()
            .byId("idTableFRNASummary").onAfterRendering = function() {
            if (sap.ui.table.Table.prototype.onAfterRendering) {
              sap.ui.table.Table.prototype.onAfterRendering.apply(
                this,
                arguments
              );
            }

            var tabData = sap.ui
              .getCore()
              .byId("idTableFRNASummary")
              .getModel()
              .getData().modelData;
            var tabDataLength = tabData.length;
            var colId = "";
            for (var i = 0; i < tabDataLength; i++) {
              colId = "IICL1-col11-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");

              colId = "CWSALE2-col12-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");

              colId = "ASIS3-col13-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");

              colId = "ASIS4-col14-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");

              colId = "ASIS5-col15-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");

              colId = "IICL6-col16-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");

              colId = "WWT9-col17-row" + i;
              $("#" + colId)
                .parent()
                .parent()
                .addClass("lightgreen");
              $("#" + colId).addClass("lightgreen");
            }
          };

          //sap.ui.getCore().byId("idTableFRNASummary").setVisibleRowCount(FRNASummaryArrayBackup.length);
        }

        //					 var colorRows = function() {
        //				            var rowCount = oTableFRNASummary.getVisibleRowCount(); //number of visible rows
        //				            var rowStart = oTableFRNASummary.getFirstVisibleRow(); //starting Row index
        //				            var currentRowContext;
        //				            for (var i = 0; i < rowCount; i++) {
        //				              currentRowContext = oTableFRNASummary.getContextByIndex(rowStart + i); //content
        //				                // Remove Style class else it will overwrite
        //				              oTableFRNASummary.getRows()[i].$().removeClass("totalColor");
        //				                var cellValue = oModelEDIFRNASummary.getProperty("Material", currentRowContext); // Get Amount
        //				                // Set Row color conditionally
        //				                if (cellValue == " ") {
        //				                    oTable.getRows()[i].$().addClass("totalColor");
        //				                } else {
        //				                    oTable.getRows()[i].$().removeClass("totalColor");
        //				                }
        //				            }
        //				        };

        //busyDialog.close();

        var fnetaFilter = new newfnetaFilterOuts();
        fnetaFilter.setInitialFilter();

        var fnetaFilter = new newfnetaFilterOuts();

        var oMregionComboSelectedKeys = sap.ui
          .getCore()
          .byId("idMRegionCombo")
          .getSelectedKeys();
        oMregionComboSelectedKeys = $.grep(oMregionComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oMregionComboSelectedKeys.length != 0) {
          fnetaFilter.changeRegionCountryCityDepotFilter(
            oMregionComboSelectedKeys,
            2
          );
        }

        var oRegionComboSelectedKeys = sap.ui
          .getCore()
          .byId("idRegionCombo")
          .getSelectedKeys();
        oRegionComboSelectedKeys = $.grep(oRegionComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oRegionComboSelectedKeys.length != 0) {
          fnetaFilter.changeCountryCityDepotFilter(oRegionComboSelectedKeys, 2);
        }

        var oCountryComboSelectedKeys = sap.ui
          .getCore()
          .byId("idCountryCombo")
          .getSelectedKeys();
        oCountryComboSelectedKeys = $.grep(oCountryComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oCountryComboSelectedKeys.length != 0) {
          fnetaFilter.changeCityDepotFilter(oCountryComboSelectedKeys, 2);
        }

        var oCityComboSelectedKeys = sap.ui
          .getCore()
          .byId("idCityCombo")
          .getSelectedKeys();
        oCityComboSelectedKeys = $.grep(oCityComboSelectedKeys, function(n) {
          return n != "";
        });
        if (oCityComboSelectedKeys.length != 0) {
          fnetaFilter.changeDepotFilter(oCityComboSelectedKeys, 2);
        }

        var oProCatComboSelectedKeys = sap.ui
          .getCore()
          .byId("idProCatCombo")
          .getSelectedKeys();
        oProCatComboSelectedKeys = $.grep(oProCatComboSelectedKeys, function(
          n
        ) {
          return n != "";
        });
        if (oProCatComboSelectedKeys.length != 0) {
          fnetaFilter.changeProClassUnitTypeFilter(oProCatComboSelectedKeys, 2);
        }

        var oProClassComboSelectedKeys = sap.ui
          .getCore()
          .byId("idProClassCombo")
          .getSelectedKeys();
        oProClassComboSelectedKeys = $.grep(
          oProClassComboSelectedKeys,
          function(n) {
            return n != "";
          }
        );
        if (oProClassComboSelectedKeys.length != 0) {
          fnetaFilter.changeUnitTypeFilter(oProClassComboSelectedKeys, 2);
        }

        //var loadSecond = new utilreppage();
        //loadSecond.getUTSummary();

        if (
          sap.ui
            .getCore()
            .byId("idRadioButtonCol")
            .getSelectedIndex() == 1
        ) {
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .setEnabled(true);
          sap.ui
            .getCore()
            .byId("ZCouDescR")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("ZCityDescR")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .setEnabled(false);
          sap.ui
            .getCore()
            .byId("RprR")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .removeAllSelectedItems();
        } else if (
          sap.ui
            .getCore()
            .byId("idRadioButtonCol")
            .getSelectedIndex() == 2
        ) {
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .setEnabled(true);
          sap.ui
            .getCore()
            .byId("ZCouDescR")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("ZCityDescR")
            .setVisible(true);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .setEnabled(true);
          sap.ui
            .getCore()
            .byId("RprR")
            .setVisible(true);
        } else if (
          sap.ui
            .getCore()
            .byId("idRadioButtonCol")
            .getSelectedIndex() == 0
        ) {
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .setEnabled(false);
          sap.ui
            .getCore()
            .byId("ZCouDescR")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("ZCityDescR")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .setEnabled(false);
          sap.ui
            .getCore()
            .byId("RprR")
            .setVisible(false);
          sap.ui
            .getCore()
            .byId("idCityCombo")
            .removeAllSelectedItems();
          sap.ui
            .getCore()
            .byId("idCountryCombo")
            .removeAllSelectedItems();
        }

        busyDialog.close();
        //						 $(document).ready(function() {
        //						var oTableFRNASummary = sap.ui.getCore().byId("idTableFRNASummary");
        //				        oCurrent.colorRows(oTableFRNASummary, oModelEDIFRNASummary);
        ////						oTableFRNASummary._oVSb.attachScroll(function(oTableFRNASummary, oModelEDIFRNASummary) {
        ////							oCurrent.colorRows(oTableFRNASummary, oModelEDIFRNASummary);
        ////			            });
        //						 });
      },
      function(err) {
        //busyDialog.close();
        //errorfromServer(err);
        //alert("Error in data read from BW Query");
      }
    );
  },

  formFilterString: function(hierlevel, allorcapex, bookingorredel) {
    var filterString = "";

    /* DNANEW+ */

    var oMregionComboSelectedKeys = window.localStorage.getItem(
      "memMregionComboSelectedKeys"
    );
    if (oMregionComboSelectedKeys != null) {
      oMregionComboSelectedKeys = oMregionComboSelectedKeys.split(",");
      oMregionComboSelectedKeys = oMregionComboSelectedKeys.filter(function(
        entry
      ) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idMRegionCombo")
        .setSelectedKeys(oMregionComboSelectedKeys);
    } else {
      oMregionComboSelectedKeys = "";
    }
    filterString =
      filterString +
      "?$filter=Inmregion eq '" +
      oMregionComboSelectedKeys +
      "' and ";

    var oRegionComboSelectedKeys = window.localStorage.getItem(
      "memRegionComboSelectedKeys"
    );
    if (oRegionComboSelectedKeys != null) {
      oRegionComboSelectedKeys = oRegionComboSelectedKeys.split(",");
      oRegionComboSelectedKeys = oRegionComboSelectedKeys.filter(function(
        entry
      ) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idRegionCombo")
        .setSelectedKeys(oRegionComboSelectedKeys);
    } else {
      oRegionComboSelectedKeys = "";
    }
    filterString =
      filterString + "Inregion eq '" + oRegionComboSelectedKeys + "' and ";

    var oCountryComboSelectedKeys = window.localStorage.getItem(
      "memCountryComboSelectedKeys"
    );
    if (oCountryComboSelectedKeys != null) {
      oCountryComboSelectedKeys = oCountryComboSelectedKeys.split(",");
      oCountryComboSelectedKeys = oCountryComboSelectedKeys.filter(function(
        entry
      ) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idCountryCombo")
        .setSelectedKeys(oCountryComboSelectedKeys);
    } else {
      oCountryComboSelectedKeys = "";
    }
    filterString =
      filterString + "Incountry eq '" + oCountryComboSelectedKeys + "' and ";

    var oCityComboSelectedKeys = window.localStorage.getItem(
      "memCityComboSelectedKeys"
    );
    if (oCityComboSelectedKeys != null) {
      oCityComboSelectedKeys = oCityComboSelectedKeys.split(",");
      oCityComboSelectedKeys = oCityComboSelectedKeys.filter(function(entry) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idCityCombo")
        .setSelectedKeys(oCityComboSelectedKeys);
    } else {
      oCityComboSelectedKeys = "";
    }
    filterString =
      filterString + "Incity eq '" + oCityComboSelectedKeys + "' and ";

    var oDepotComboSelectedKeys = window.localStorage.getItem(
      "memDepotComboSelectedKeys"
    );
    if (oDepotComboSelectedKeys != null) {
      oDepotComboSelectedKeys = oDepotComboSelectedKeys.split(",");
      oDepotComboSelectedKeys = oDepotComboSelectedKeys.filter(function(entry) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idDepotCombo")
        .setSelectedKeys(oDepotComboSelectedKeys);
    } else {
      oDepotComboSelectedKeys = "";
    }
    filterString =
      filterString + "Indepot eq '" + oDepotComboSelectedKeys + "' and ";

    var oProCatComboSelectedKeys = window.localStorage.getItem(
      "memProCatComboSelectedKeys"
    );
    if (oProCatComboSelectedKeys != null) {
      oProCatComboSelectedKeys = oProCatComboSelectedKeys.split(",");
      oProCatComboSelectedKeys = oProCatComboSelectedKeys.filter(function(
        entry
      ) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idProCatCombo")
        .setSelectedKeys(oProCatComboSelectedKeys);
    } else {
      var leasingOrRemarketing = window.localStorage.getItem(
        "memLeasingOrRemarketing"
      );
      if (leasingOrRemarketing == "L") {
        oProCatComboSelectedKeys = "BOXES,REEFERS,TANKS,SPECIALS"; // Excluding SWAPBODIES
        oProCatComboSelectedKeys = oProCatComboSelectedKeys.split(",");
        oProCatComboSelectedKeys = oProCatComboSelectedKeys.filter(function(
          entry
        ) {
          return entry.trim() != "";
        });
        sap.ui
          .getCore()
          .byId("idProCatCombo")
          .setSelectedKeys(oProCatComboSelectedKeys);
      } else {
        oProCatComboSelectedKeys = "";
        oProCatComboSelectedKeys = oProCatComboSelectedKeys.split(",");
        oProCatComboSelectedKeys = oProCatComboSelectedKeys.filter(function(
          entry
        ) {
          return entry.trim() != "";
        });
        sap.ui
          .getCore()
          .byId("idProCatCombo")
          .setSelectedKeys(oProCatComboSelectedKeys);
      }
    }
    filterString =
      filterString + "Inpcate eq '" + oProCatComboSelectedKeys + "' and ";

    var oProClassComboSelectedKeys = window.localStorage.getItem(
      "memProClassComboSelectedKeys"
    );
    if (oProClassComboSelectedKeys != null) {
      oProClassComboSelectedKeys = oProClassComboSelectedKeys.split(",");
      oProClassComboSelectedKeys = oProClassComboSelectedKeys.filter(function(
        entry
      ) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idProClassCombo")
        .setSelectedKeys(oProClassComboSelectedKeys);
    } else {
      oProClassComboSelectedKeys = "";
    }
    filterString =
      filterString + "Inpclass eq '" + oProClassComboSelectedKeys + "' and ";

    var oUnitTypeComboSelectedKeys = window.localStorage.getItem(
      "memUnitTypeComboSelectedKeys"
    );
    if (oUnitTypeComboSelectedKeys != null) {
      oUnitTypeComboSelectedKeys = oUnitTypeComboSelectedKeys.split(",");
      oUnitTypeComboSelectedKeys = oUnitTypeComboSelectedKeys.filter(function(
        entry
      ) {
        return entry.trim() != "";
      });
      sap.ui
        .getCore()
        .byId("idUnitTypeCombo")
        .setSelectedKeys(oUnitTypeComboSelectedKeys);
    } else {
      oUnitTypeComboSelectedKeys = "";
    }
    filterString =
      filterString + "Inmatnr eq '" + oUnitTypeComboSelectedKeys + "' and ";

    if (
      sap.ui
        .getCore()
        .byId("idProcessSwitchMain")
        .getSelectedIndex() == 2
    ) {
      var oCustomerComboSelectedKeys = window.localStorage.getItem(
        "memCustomerComboSelectedKeys"
      );
      if (oCustomerComboSelectedKeys != null) {
        oCustomerComboSelectedKeys = oCustomerComboSelectedKeys.split(",");
        oCustomerComboSelectedKeys = oCustomerComboSelectedKeys.filter(function(
          entry
        ) {
          return entry.trim() != "";
        });
        sap.ui
          .getCore()
          .byId("idCustomerCombo")
          .setSelectedKeys(oCustomerComboSelectedKeys);
      } else {
        oCustomerComboSelectedKeys = "";
      }
      filterString =
        filterString +
        "Incustomer eq '" +
        oCustomerComboSelectedKeys +
        "' and ";

      var oLeasetypeComboSelectedKeys = window.localStorage.getItem(
        "memLeasetypeComboSelectedKeys"
      );
      if (oLeasetypeComboSelectedKeys != null) {
        oLeasetypeComboSelectedKeys = oLeasetypeComboSelectedKeys.split(",");
        oLeasetypeComboSelectedKeys = oLeasetypeComboSelectedKeys.filter(
          function(entry) {
            return entry.trim() != "";
          }
        );
        sap.ui
          .getCore()
          .byId("idLeasetypeCombo")
          .setSelectedKeys(oLeasetypeComboSelectedKeys);
      } else {
        oLeasetypeComboSelectedKeys = "";
      }
      filterString =
        filterString +
        "Inleasetype eq '" +
        oLeasetypeComboSelectedKeys +
        "' and ";

      var oReleasetypeComboSelectedKeys = window.localStorage.getItem(
        "memReleasetypeComboSelectedKeys"
      );
      if (oReleasetypeComboSelectedKeys != null) {
        oReleasetypeComboSelectedKeys = oReleasetypeComboSelectedKeys.split(
          ","
        );
        oReleasetypeComboSelectedKeys = oReleasetypeComboSelectedKeys.filter(
          function(entry) {
            return entry.trim() != "";
          }
        );
        sap.ui
          .getCore()
          .byId("idReleasetypeCombo")
          .setSelectedKeys(oReleasetypeComboSelectedKeys);
      } else {
        oReleasetypeComboSelectedKeys = "";
      }
      filterString =
        filterString +
        "Inreleasetype eq '" +
        oReleasetypeComboSelectedKeys +
        "' and ";

      /* Booking or Redelivery
       * 0. Redelivery
       * 1. Booking
       */

      var obookingorredel = null;
      if (bookingorredel != undefined) {
        obookingorredel = bookingorredel;
      } else {
        obookingorredel = window.localStorage.getItem("memBookingOrRedel");
        if (obookingorredel != null) {
          sap.ui
            .getCore()
            .byId("idFONARadioButtonProcess")
            .setSelectedIndex(parseInt(obookingorredel));
        } else {
          sap.ui
            .getCore()
            .byId("idFONARadioButtonProcess")
            .setSelectedIndex(0);
          obookingorredel = "0";
        }
      }
      filterString =
        filterString + "Inbookingorredel eq '" + obookingorredel + "' and ";
    }

    /* Age */
    var oSymbolAge = window.localStorage.getItem("memSymbolAge");
    if (oSymbolAge != null) {
      sap.ui
        .getCore()
        .byId("idSymbolAge")
        .setSelectedKey(oSymbolAge);
    } else {
    }
    filterString = filterString + "Insage eq '" + oSymbolAge + "' and ";

    var oInputAge = window.localStorage.getItem("memInputAge");
    if (oInputAge != null) {
      sap.ui
        .getCore()
        .byId("idInputAge")
        .setValue(oInputAge);
    } else {
      oInputAge = "";
    }
    filterString = filterString + "Inage eq '" + oInputAge + "' and ";

    var oInputAge2 = window.localStorage.getItem("memInputAge2");
    if (oInputAge2 != null) {
      sap.ui
        .getCore()
        .byId("idInputAge2")
        .setValue(oInputAge2);
    } else {
      oInputAge2 = "";
    }
    filterString = filterString + "Inage2 eq '" + oInputAge2 + "' and ";

    /* Port Rating */
    var oSymbolPor = window.localStorage.getItem("memSymbolPor");
    if (oSymbolPor != null) {
      sap.ui
        .getCore()
        .byId("idSymbolPor")
        .setSelectedKey(oSymbolPor);
    }
    filterString = filterString + "Inspor eq '" + oSymbolPor + "' and ";

    var oInputPor = window.localStorage.getItem("memInputPor");
    if (oInputPor != null) {
      sap.ui
        .getCore()
        .byId("idInputPor")
        .setValue(oInputPor);
    } else {
      oInputPor = "";
    }
    filterString = filterString + "Inpor eq '" + oInputPor + "' and ";

    var oInputPor2 = window.localStorage.getItem("memInputPor2");
    if (oInputPor2 != null) {
      sap.ui
        .getCore()
        .byId("idInputPor2")
        .setValue(oInputPor2);
    } else {
      oInputPor2 = "";
    }
    filterString = filterString + "Inpor2 eq '" + oInputPor2 + "' and ";

    /* Level
     * 0. Region Level
     * 1. Country Level
     * 2. City Level
     */

    var oHierLevel = null;
    if (hierlevel != undefined) {
      oHierLevel = hierlevel;
    } else {
      oHierLevel = window.localStorage.getItem("memHierLevel");
      if (oHierLevel != null) {
        sap.ui
          .getCore()
          .byId("idRadioButtonCol")
          .setSelectedIndex(parseInt(oHierLevel));
      } else {
        sap.ui
          .getCore()
          .byId("idRadioButtonCol")
          .setSelectedIndex(2);
        oHierLevel = "2";
      }
    }

    if (parseInt(oHierLevel) == 0) {
      sap.ui
        .getCore()
        .byId("idCountryCombo")
        .setEnabled(false);
      sap.ui
        .getCore()
        .byId("ZCouDesc")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("ZCityDesc")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCityCombo")
        .setEnabled(false);
      sap.ui
        .getCore()
        .byId("Por")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCityCombo")
        .removeAllSelectedItems();
      sap.ui
        .getCore()
        .byId("idCountryCombo")
        .removeAllSelectedItems();
    } else if (parseInt(oHierLevel) == 1) {
      sap.ui
        .getCore()
        .byId("idCountryCombo")
        .setEnabled(true);
      sap.ui
        .getCore()
        .byId("ZCouDesc")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("ZCityDesc")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCityCombo")
        .setEnabled(false);
      sap.ui
        .getCore()
        .byId("Por")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCityCombo")
        .removeAllSelectedItems();
    } else if (parseInt(oHierLevel) == 2) {
      sap.ui
        .getCore()
        .byId("idCountryCombo")
        .setEnabled(true);
      sap.ui
        .getCore()
        .byId("ZCouDesc")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("ZCityDesc")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idCityCombo")
        .setEnabled(true);
      sap.ui
        .getCore()
        .byId("Por")
        .setVisible(true);
    }

    filterString = filterString + "Inlevel eq '" + oHierLevel + "' and ";

    /* All or Capex
     * D. Depot
     * C. Capex
     * A. Both
     */

    var capexId = "L";
    var memCapex = "memAllOrCapex";
    var leasingorremarketing = window.localStorage.getItem(
      "memLeasingOrRemarketing"
    );
    if (leasingorremarketing == "L") {
      capexId = "idRadioButtonCapex";
      memCapex = "memAllOrCapexLeasing";
    } else if (leasingorremarketing == "R") {
      capexId = "idFRNARadioButtonCapex";
      memCapex = "memAllOrCapexContainerSales";
    } else if (leasingorremarketing == "O") {
      capexId = "idFONARadioButtonCapex";
      memCapex = "memAllOrCapexOustanding";
    } else if (leasingorremarketing == "P") {
      capexId = "idFPNARadioButtonCapex";
      memCapex = "memAllOrCapexPosn";
    }

    var oAllOrCapex = null;
    if (allorcapex != undefined) {
      oAllOrCapex = allorcapex;
    } else {
      oAllOrCapex = window.localStorage.getItem(memCapex);
      if (oAllOrCapex != null) {
        if (sap.ui.getCore().byId(capexId) != undefined)
          sap.ui
            .getCore()
            .byId(capexId)
            .setSelectedIndex(parseInt(oAllOrCapex));
      } else {
        if (sap.ui.getCore().byId(capexId) != undefined) {
          sap.ui
            .getCore()
            .byId(capexId)
            .setSelectedIndex(0);
          oAllOrCapex = "0";
        }
      }
    }
    filterString = filterString + "Inallorcapex eq '" + oAllOrCapex + "'";


    /* No Stock Inclusion */

    var memNoStock = window.localStorage.getItem("memNoStock");

    if(memNoStock == null){
      memNoStock = ""
    }

    if(memNoStock == "X"){
      sap.ui.getCore().byId("idCheckboxNoStock").setSelected(true);
    }else{
      sap.ui.getCore().byId("idCheckboxNoStock").setSelected(false);
    }

    if (leasingorremarketing == "R"){
      filterString = filterString + " and Innostock eq '" + memNoStock + "'";
    }

    console.log(filterString);
    return filterString;
    /* DNANEW+ */
  },

  setPersonalValues: function() {
    /* Set Visible Row Count */
    var valueTotalRowsField = window.localStorage.getItem("memTotalRowsField");
    if (valueTotalRowsField == null) {
      valueTotalRowsField = 25;
    }
    sap.ui
      .getCore()
      .byId("idTableNAULSummary")
      .setVisibleRowCount(parseInt(valueTotalRowsField));
    sap.ui
      .getCore()
      .byId("idTableFNASummary")
      .setVisibleRowCount(parseInt(valueTotalRowsField));
    sap.ui
      .getCore()
      .byId("idTableFRNASummary")
      .setVisibleRowCount(parseInt(valueTotalRowsField));
    sap.ui
      .getCore()
      .byId("idTableFONASummary")
      .setVisibleRowCount(parseInt(valueTotalRowsField));
    console.log("Visible Row Count : ", parseInt(valueTotalRowsField));

    /* Set Navigation Mode */
    var valuePaginator = window.localStorage.getItem("memPaginator");
    var textNavigation = "";
    var navigation = "";
    if (valuePaginator == null) {
      valuePaginator = "true";
      textNavigation = "Paginator";
    } else if (valuePaginator == "true") {
      textNavigation = "Paginator";
    } else {
      textNavigation = "Scrollbar";
    }

    if (valuePaginator == "true") {
      navigation = sap.ui.table.NavigationMode.Paginator;
    } else {
      navigation = sap.ui.table.NavigationMode.Scrollbar;
    }

    sap.ui
      .getCore()
      .byId("idTableNAULSummary")
      .setNavigationMode(navigation);
    sap.ui
      .getCore()
      .byId("idTableFNASummary")
      .setNavigationMode(navigation);
    sap.ui
      .getCore()
      .byId("idTableFRNASummary")
      .setNavigationMode(navigation);
    sap.ui
      .getCore()
      .byId("idTableFONASummary")
      .setNavigationMode(navigation);
    console.log("Navigation Mode : ", textNavigation);

    /* Set Total No. of Pages text */

    var leasingOrRemarketing = window.localStorage.getItem(
      "memLeasingOrRemarketing"
    );
    if (leasingOrRemarketing == null || leasingOrRemarketing == "L") {
      if (
        sap.ui
          .getCore()
          .byId("idTableFNASummary")
          .getNavigationMode() == "Paginator"
      ) {
        var totalPages = Math.ceil(
          FNASummaryArray.length / parseInt(valueTotalRowsField)
        );
        totalPages = "Pages : " + totalPages;
        sap.ui
          .getCore()
          .byId("idTotalPages")
          .setText(totalPages);
        sap.ui
          .getCore()
          .byId("idTotalPages")
          .setVisible(false);
      } else {
        sap.ui
          .getCore()
          .byId("idTotalPages")
          .setVisible(false);
        sap.ui
          .getCore()
          .byId("idTotalPages")
          .setText("");
        sap.ui
          .getCore()
          .byId("idTotalPages")
          .setVisible(false);
      }

      if (FNASummaryArray.length < parseInt(valueTotalRowsField)) {
        sap.ui
          .getCore()
          .byId("idTableFNASummary")
          .setVisibleRowCount(FNASummaryArray.length);
      } else {
        sap.ui
          .getCore()
          .byId("idTableFNASummary")
          .setVisibleRowCount(parseInt(valueTotalRowsField));
        var totalPages = Math.ceil(
          FNASummaryArray.length / parseInt(valueTotalRowsField)
        );
        totalPages = "Total No. of Pages : " + totalPages;
        sap.ui
          .getCore()
          .byId("idTotalPages")
          .setText(totalPages);
      }
    } else if (leasingOrRemarketing == "R") {
      if (
        sap.ui
          .getCore()
          .byId("idTableFRNASummary")
          .getNavigationMode() == "Paginator"
      ) {
        var totalPages = Math.ceil(
          FRNASummaryArray.length / parseInt(valueTotalRowsField)
        );
        totalPages = "Pages : " + totalPages;
        sap.ui
          .getCore()
          .byId("idFRNATotalPages")
          .setText(totalPages);
        sap.ui
          .getCore()
          .byId("idFRNATotalPages")
          .setVisible(false);
      } else {
        sap.ui
          .getCore()
          .byId("idFRNATotalPages")
          .setVisible(false);
        sap.ui
          .getCore()
          .byId("idFRNATotalPages")
          .setText("");
        sap.ui
          .getCore()
          .byId("idFRNATotalPages")
          .setVisible(false);
      }

      if (FRNASummaryArray.length < parseInt(valueTotalRowsField)) {
        sap.ui
          .getCore()
          .byId("idTableFRNASummary")
          .setVisibleRowCount(FRNASummaryArray.length);
      } else {
        sap.ui
          .getCore()
          .byId("idTableFRNASummary")
          .setVisibleRowCount(parseInt(valueTotalRowsField));
        var totalPages = Math.ceil(
          FRNASummaryArray.length / parseInt(valueTotalRowsField)
        );
        totalPages = "Total No. of Pages : " + totalPages;
        sap.ui
          .getCore()
          .byId("idFRNATotalPages")
          .setText(totalPages);
      }
    } else if (leasingOrRemarketing == "O") {
      if (
        sap.ui
          .getCore()
          .byId("idTableFONASummary")
          .getNavigationMode() == "Paginator"
      ) {
        var totalPages = Math.ceil(
          FONASummaryArray.length / parseInt(valueTotalRowsField)
        );
        totalPages = "Pages : " + totalPages;
        sap.ui
          .getCore()
          .byId("idFONATotalPages")
          .setText(totalPages);
        sap.ui
          .getCore()
          .byId("idFONATotalPages")
          .setVisible(false);
      } else {
        sap.ui
          .getCore()
          .byId("idFONATotalPages")
          .setVisible(false);
        sap.ui
          .getCore()
          .byId("idFONATotalPages")
          .setText("");
        sap.ui
          .getCore()
          .byId("idFONATotalPages")
          .setVisible(false);
      }

      if (FONASummaryArray.length < parseInt(valueTotalRowsField)) {
        sap.ui
          .getCore()
          .byId("idTableFONASummary")
          .setVisibleRowCount(FONASummaryArray.length);
      } else {
        sap.ui
          .getCore()
          .byId("idTableFONASummary")
          .setVisibleRowCount(parseInt(valueTotalRowsField));
        var totalPages = Math.ceil(
          FONASummaryArray.length / parseInt(valueTotalRowsField)
        );
        totalPages = "Total No. of Pages : " + totalPages;
        sap.ui
          .getCore()
          .byId("idFONATotalPages")
          .setText(totalPages);
      }
    }
  },

  setPersonalValuesFilter: function() {
    /* Main Region */

    var oMregionComboSelectedKeys = sap.ui
      .getCore()
      .byId("idMRegionCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memMregionComboSelectedKeys",
      $.grep(oMregionComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Region */

    var oRegionComboSelectedKeys = sap.ui
      .getCore()
      .byId("idRegionCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memRegionComboSelectedKeys",
      $.grep(oRegionComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Country */

    var oCountryComboSelectedKeys = sap.ui
      .getCore()
      .byId("idCountryCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memCountryComboSelectedKeys",
      $.grep(oCountryComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* City */

    var oCityComboSelectedKeys = sap.ui
      .getCore()
      .byId("idCityCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memCityComboSelectedKeys",
      $.grep(oCityComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Depot */

    var oDepotComboSelectedKeys = sap.ui
      .getCore()
      .byId("idDepotCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memDepotComboSelectedKeys",
      $.grep(oDepotComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Product Category */

    var oProCatComboSelectedKeys = sap.ui
      .getCore()
      .byId("idProCatCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memProCatComboSelectedKeys",
      $.grep(oProCatComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Product Class */

    var oProClassComboSelectedKeys = sap.ui
      .getCore()
      .byId("idProClassCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memProClassComboSelectedKeys",
      $.grep(oProClassComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Unit Type */

    var oUnitTypeComboSelectedKeys = sap.ui
      .getCore()
      .byId("idUnitTypeCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memUnitTypeComboSelectedKeys",
      $.grep(oUnitTypeComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Customer */

    var oCustomerComboSelectedKeys = sap.ui
      .getCore()
      .byId("idCustomerCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memCustomerComboSelectedKeys",
      $.grep(oCustomerComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Lease Type */

    var oLeasetypeComboSelectedKeys = sap.ui
      .getCore()
      .byId("idLeasetypeCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memLeasetypeComboSelectedKeys",
      $.grep(oLeasetypeComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Release Type */

    var oReleasetypeComboSelectedKeys = sap.ui
      .getCore()
      .byId("idReleasetypeCombo")
      .getSelectedKeys();
    window.localStorage.setItem(
      "memReleasetypeComboSelectedKeys",
      $.grep(oReleasetypeComboSelectedKeys, function(n) {
        return n != "";
      })
    );

    /* Age */

    var oSymbolAge = sap.ui
      .getCore()
      .byId("idSymbolAge")
      .getSelectedKey();
    window.localStorage.setItem("memSymbolAge", oSymbolAge);

    var oInputAge = sap.ui
      .getCore()
      .byId("idInputAge")
      .getValue();
    window.localStorage.setItem("memInputAge", oInputAge);

    var oInputAge2 = sap.ui
      .getCore()
      .byId("idInputAge2")
      .getValue();
    window.localStorage.setItem("memInputAge2", oInputAge2);

    /* Por */

    var oSymbolPor = sap.ui
      .getCore()
      .byId("idSymbolPor")
      .getSelectedKey();
    window.localStorage.setItem("memSymbolPor", oSymbolPor);

    var oInputPor = sap.ui
      .getCore()
      .byId("idInputPor")
      .getValue();
    window.localStorage.setItem("memInputPor", oInputPor);

    var oInputPor2 = sap.ui
      .getCore()
      .byId("idInputPor2")
      .getValue();
    window.localStorage.setItem("memInputPor2", oInputPor2);

    /* Level
     * 0. Region Level
     * 1. Country Level
     * 2. City Level
     */

    var oHierLevel = sap.ui
      .getCore()
      .byId("idRadioButtonCol")
      .getSelectedIndex();
    window.localStorage.setItem("memHierLevel", oHierLevel);

    /* All or Capex
     * 0. Both
     * 1. Depot
     * 2. Capex
     */

    var oAllOrCapexLeasing = sap.ui
      .getCore()
      .byId("idRadioButtonCapex")
      .getSelectedIndex();
    window.localStorage.setItem("memAllOrCapexLeasing", oAllOrCapexLeasing);

    var oAllOrCapexContainerSales = sap.ui
      .getCore()
      .byId("idFRNARadioButtonCapex")
      .getSelectedIndex();
    window.localStorage.setItem(
      "memAllOrCapexContainerSales",
      oAllOrCapexContainerSales
    );

    var oAllOrCapexOustanding = sap.ui
      .getCore()
      .byId("idFONARadioButtonCapex")
      .getSelectedIndex();
    window.localStorage.setItem(
      "memAllOrCapexOustanding",
      oAllOrCapexOustanding
    );

    var oAllOrCapexPosn = 0;
    window.localStorage.setItem("memAllOrCapexPosn", oAllOrCapexPosn);

    /* Booking or Redelivery */

    var obookingorredel = sap.ui
      .getCore()
      .byId("idFONARadioButtonProcess")
      .getSelectedIndex();
    window.localStorage.setItem("memBookingOrRedel", obookingorredel);

    /* No Stock */

    var oNoStock = sap.ui
    .getCore()
    .byId("idCheckboxNoStock")
    .getSelected();

    if(oNoStock){
      oNoStock = "X";
    }else{
      oNoStock = "";
    }
        
    window.localStorage.setItem("memNoStock", oNoStock);

  },

  navigToRegion: function(region) {
    var bus = sap.ui.getCore().getEventBus();
    bus.publish("nav", "to", {
      id: "naUnitType"
    });

    var oNAUT = new naUnitType();
    oNAUT.setDataRegion(region);
  },

  navigToCountry: function(country) {
    var bus = sap.ui.getCore().getEventBus();
    bus.publish("nav", "to", {
      id: "naUnitType"
    });

    var oNAUT = new naUnitType();
    oNAUT.setDataCountry(country);
  },

  navigToCity: function(city) {
    var bus = sap.ui.getCore().getEventBus();
    bus.publish("nav", "to", {
      id: "naUnitType"
    });

    var oNAUT = new naUnitType();
    oNAUT.setDataCity(city);
  },

  navigToUnitType: function(unitType) {
    var bus = sap.ui.getCore().getEventBus();
    bus.publish("nav", "to", {
      id: "naUnitType"
    });

    var oNAUT = new naUnitType();
    oNAUT.setDataUnitType(unitType);
  },

  colorRows: function(oTable, oModel) {
    var rowCount = oTable.getVisibleRowCount(); //number of visible rows
    var rowStart = oTable.getFirstVisibleRow(); //starting Row index
    var currentRowContext;

    for (var i = 0; i < rowCount; i++) {
      currentRowContext = oTable.getContextByIndex(rowStart + i); //content
      if (oModel != undefined) {
        var cellValue = oModel.getProperty("Matnr", currentRowContext); // Get Amount
        //var tableTag = "$('#idTableFNASummary-rows-row" + i + "')";
        if (cellValue == "") {
          //$("#idTableFNASummary-rows-row0").css("background-color", "red");
          oTable
            .getRows()
            [i].$()
            .addClass("totalColor");
        } else {
          //$("#idTableFNASummary-rows-row0").css("background-color", "");
          oTable
            .getRows()
            [i].$()
            .removeClass("totalColor");
        }
      }
    }
  },

  setVisibility: function(event) {
    var count = 0;

    if (event.mParameters.value == "") {
      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setFixedRowCount(1);
    } else {
      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setFixedRowCount(0);
    }
    //var column = event.mParameters.column.mProperties.filterProperty;
    var oTable = sap.ui.getCore().byId("idTableFNASummary");
    var data = oTable.getModel().getData().modelData;
    for (var i = 0; i < data.length; i++) {
      if (data[i].City == event.mParameters.value) count = count + 1;
    }

    if (count > 6 || count == 1)
      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setVisibleRowCount(6);
    else
      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setVisibleRowCount(count);
  },

  getFilterParameters: function() {
    var filter = {};
    filter.mregion = sap.ui
      .getCore()
      .byId("idMRegionCombo")
      .getSelectedKeys()
      .toString();
    filter.region = sap.ui
      .getCore()
      .byId("idRegionCombo")
      .getSelectedKeys()
      .toString();
    filter.country = sap.ui
      .getCore()
      .byId("idCountryCombo")
      .getSelectedKeys()
      .toString();
    filter.city = sap.ui
      .getCore()
      .byId("idCityCombo")
      .getSelectedKeys()
      .toString();
    filter.depot = sap.ui
      .getCore()
      .byId("idDepotCombo")
      .getSelectedKeys()
      .toString();

    filter.pcate = sap.ui
      .getCore()
      .byId("idProCatCombo")
      .getSelectedKeys()
      .toString();
    filter.pclass = sap.ui
      .getCore()
      .byId("idProClassCombo")
      .getSelectedKeys()
      .toString();
    filter.unittype = sap.ui
      .getCore()
      .byId("idUnitTypeCombo")
      .getSelectedKeys()
      .toString();

    /* Age */

    filter.oSymbolAge = sap.ui
      .getCore()
      .byId("idSymbolAge")
      .getSelectedKey();
    filter.oInputAge = sap.ui
      .getCore()
      .byId("idInputAge")
      .getValue();
    filter.oInputAge2 = sap.ui
      .getCore()
      .byId("idInputAge2")
      .getValue();

    /* Por */

    filter.oSymbolPor = sap.ui
      .getCore()
      .byId("idSymbolPor")
      .getSelectedKey();
    filter.oInputPor = sap.ui
      .getCore()
      .byId("idInputPor")
      .getValue();
    filter.oInputPor2 = sap.ui
      .getCore()
      .byId("idInputPor2")
      .getValue();

    var capexId = "L";
    var memCapex = "memAllOrCapex";
    var leasingorremarketing = window.localStorage.getItem(
      "memLeasingOrRemarketing"
    );
    if (leasingorremarketing == "L") {
      capexId = "idRadioButtonCapex";
      memCapex = "memAllOrCapexLeasing";
    } else if (leasingorremarketing == "R") {
      capexId = "idFRNARadioButtonCapex";
      memCapex = "memAllOrCapexContainerSales";
    } else if (leasingorremarketing == "O") {
      capexId = "idFONARadioButtonCapex";
      memCapex = "memAllOrCapexOustanding";
    }

    var oAllOrCapex = null;

    oAllOrCapex = window.localStorage.getItem(memCapex);
    if (oAllOrCapex != null) {
      sap.ui
        .getCore()
        .byId(capexId)
        .setSelectedIndex(parseInt(oAllOrCapex));
    } else {
      sap.ui
        .getCore()
        .byId(capexId)
        .setSelectedIndex(0);
      oAllOrCapex = "0";
    }

    filter.oAllOrCapex = oAllOrCapex;

    return filter;
  }
});

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function isTotals(value) {
  return globalCategoryList.indexOf(value) > -1;
}
