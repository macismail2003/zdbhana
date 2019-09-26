sap.ui.jsview("view.UTILREP1", {
  /** Specifies the Controller belonging to this View.
   * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
   * @memberOf view.systemmonitor
   */
  getControllerName: function() {
    return "view.UTILREP1";
  },

  /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
   * Since the Controller is given to this method, its event handlers can be attached right away.
   * @memberOf view.systemmonitor
   */
  createContent: function(oController) {
    /* Tank Cert Level */
    var onaCERTLevel = new newnaCERTLevel();
    var vCERTTable = onaCERTLevel.createCERTTable();

    var oPageCERTLevel = new sap.m.Page("naCERTLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "Certificates",
      content: [vCERTTable]
    });
    app.addPage(oPageCERTLevel);

    /* SPEC Box Level */
    var onaSPECLevel = new newnaSPECLevel();
    var vEqiupCatForm = onaSPECLevel.createEqiupCatBoxes();
    onaSPECLevel.createEqiupCatBoxesFormView();

    var oPageSPECBLevel = new sap.m.Page("naSPECBLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "",
      content: [vEqiupCatForm]
    });
    app.addPage(oPageSPECBLevel);

    /* SPEC Reefer Level */
    var onaSPECLevel = new newnaSPECLevel();
    var vEqiupCatForm = onaSPECLevel.createEqiupCatReefers();
    onaSPECLevel.createEqiupCatReefersFormView();

    var oPageSPECRLevel = new sap.m.Page("naSPECRLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "",
      content: [vEqiupCatForm]
    });
    app.addPage(oPageSPECRLevel);

    /* SPEC Tanks Level */
    var onaSPECLevel = new newnaSPECLevel();
    var vEqiupCatForm = onaSPECLevel.createEqiupCatTanks();
    onaSPECLevel.createEqiupCatTanksFormView();

    var oPageSPECBLevel = new sap.m.Page("naSPECTLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "",
      content: [vEqiupCatForm]
    });
    app.addPage(oPageSPECBLevel);

    /* PICK Level */
    var onaPickLevel = new newnaPickLevel();
    var oPagePickLevel = new sap.m.Page("naPICKLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "Picked Up Equipment Level Details",
      content: [onaPickLevel.createnaPickLevel(oController)]
    });
    app.addPage(oPagePickLevel);

    /* TIN Level */
    var onaTINLevel = new newnaTINLevel();
    var oPageTINLevel = new sap.m.Page("naTINLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "Redelivery Level Details",
      content: [onaTINLevel.createnaTINLevel(oController)]
    });
    app.addPage(oPageTINLevel);

    /* Booking Level */
    var onaBookingLevel = new newnaBookingLevel();
    var oPageBookingLevel = new sap.m.Page("naBookingLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "Booking Level Details",
      content: [onaBookingLevel.createnaBookingLevel(oController)]
    });
    app.addPage(oPageBookingLevel);

    /* Unit Level */
    var onaUnitLevel = new newnaUnitLevel();
    var oPageUnitLevel = new sap.m.Page("naUnitLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "Equipment Level Details",
      content: [onaUnitLevel.createnaUnitLevel(oController)]
    });
    app.addPage(oPageUnitLevel);

    /* PO Level */
    var onaPOLevel = new newnaPOLevel();
    var oPagePOLevel = new sap.m.Page("naPOLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "PO Level Details",
      content: [onaPOLevel.createnaPOLevel(oController)]
    });
    app.addPage(oPagePOLevel);

    /* PO EQUNR Level */
    var onaPOEQUNRLevel = new newnaPOEQUNRLevel();
    var vPOEQUNRTable = onaPOEQUNRLevel.createPOEQUNRTable();

    var oPagePOEQUNRLevel = new sap.m.Page("naPOEQUNRLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "In Production Units for PO",
      content: [vPOEQUNRTable]
    });
    app.addPage(oPagePOEQUNRLevel);

    /* Remark Level */
    var onaRemarkLevel = new newnaRemarkLevel();
    var oPageRemarkLevel = new sap.m.Page("naRemarkLevel", {
      enableScrolling: true,
      navButtonTap: function() {
        app.back();
      },
      showNavButton: true,
      title: "Equipment Level Details",
      content: [onaRemarkLevel.createnaRemarkLevel(oController)]
    });
    app.addPage(oPageRemarkLevel);

    var fnetaContent = null;
    fnetaContent = new newfneta().createFNAPage();
    //	https://seaweb.seacoglobal.com/sap/opu/odata/sap/ZUTIL_ERP_SRV/downloadSet('hi')/$value

    /*


	        */
    jQuery.sap.require("sap.ui.core.IconPool");
    var oPageMainBar = new sap.m.Bar("idPageMainBar", {
      contentLeft: [
        new sap.ui.layout.HorizontalLayout({
          content: [
            new sap.ui.commons.Image({
              src: "./images/seacologo.png",
              height: "45px",
              width: "85px"
            }),

            new sap.ui.commons.Label({
              width: "5px"
            }),

            new sap.m.Button({
              icon: "sap-icon://comment",
              height: "45px",
              width: "45px",
              type: sap.m.ButtonType.Reject,
              press: function(oEvent) {
                oController.openFeedBackForm(oEvent);
              }
            }),

            new sap.ui.commons.Label({
              width: "5px"
            }),

            new sap.m.Button({
              icon: "sap-icon://learning-assistant",
              height: "45px",
              width: "45px",
              type: sap.m.ButtonType.Accept,
              press: function(oEvent) {
                oController.openUserGuide(oEvent);
              }
            })
          ]
        })
      ],

      contentMiddle: [
        new sap.m.Label("idPageMainTitle", {
          //text : "{i18n>titleMainView}",
          textAlign: "Left",
          design: "Bold"
        }).addStyleClass("fontTitle")
      ],

      contentRight: [
        new sap.ui.commons.RadioButtonGroup({
          id: "idProcessSwitchMain", // sap.ui.core.ID
          visible: true,
          columns: 4, // int
          editable: true, // boolean
          selectedIndex: 0, // int
          dependents: [], // sap.ui.core.Control, since 1.19
          items: [
            new sap.ui.core.Item({
              id: "idLeaseMain", // sap.ui.core.ID
              text: "Leasing", // string
              enabled: true, // boolean
              textDirection: sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
              key: undefined, // string
              tooltip: undefined, // sap.ui.core.TooltipBase
              customData: [], // sap.ui.core.CustomData
              dependents: []
              // sap.ui.core.Control, since 1.19
            }),
            new sap.ui.core.Item({
              id: "idRemarketingMain", // sap.ui.core.ID
              text: "Container Sales", // string
              enabled: true, // boolean
              textDirection: sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
              key: undefined, // string
              tooltip: undefined, // sap.ui.core.TooltipBase
              customData: [], // sap.ui.core.CustomData
              dependents: []
              // sap.ui.core.Control, since 1.19
            }),
            new sap.ui.core.Item({
              id: "idOutsMain", // sap.ui.core.ID
              text: "Bookings & Redeliveries", // string
              enabled: true, // boolean
              textDirection: sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
              key: undefined, // string
              tooltip: undefined, // sap.ui.core.TooltipBase
              customData: [], // sap.ui.core.CustomData
              dependents: []
              // sap.ui.core.Control, since 1.19
            }),
            new sap.ui.core.Item({
              id: "idPosnMain", // sap.ui.core.ID
              text: "Confirmed EPM", // string
              enabled: true, // boolean
              textDirection: sap.ui.core.TextDirection.Inherit, // sap.ui.core.TextDirection
              key: undefined, // string
              tooltip: undefined, // sap.ui.core.TooltipBase
              customData: [], // sap.ui.core.CustomData
              dependents: []
              // sap.ui.core.Control, since 1.19
            })
          ], // sap.ui.core.Item
          ariaDescribedBy: [], // sap.ui.core.Control
          ariaLabelledBy: [], // sap.ui.core.Control
          select: [
            function(oEvent) {
              var selected = oEvent.mParameters.selectedIndex;
              if (selected == 0) {
                //										if(dashItemL == ""){
                //											dashItemL = new newfneta().createFNAPage();
                //										}
                window.localStorage.setItem("memLeasingOrRemarketing", "L");
                //this.page.removeAllContent();
                //this.page.insertContent(dashItemL, 0);

                sap.ui
                  .getCore()
                  .byId("idTableFNASummary")
                  .setVisible(true);
                sap.ui
                  .getCore()
                  .byId("idTableFRNASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFONASummary")
                  .setVisible(false);

                sap.ui
                  .getCore()
                  .byId("idTableFPNASummary")
                  .setVisible(false);

				  sap.ui
                  .getCore()
                  .byId("idPanelFilter")
				  .setVisible(true);
				  
                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setText("Download Leasing Data");
                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setTooltip("Download equipment level leasing side data");

                //sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
                sap.ui
                  .getCore()
                  .byId("idCustomerCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idCustomerComboOptions")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idLeasetypeCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idReleasetypeCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idRadioButtonCol")
                  .setVisible(true);
                // Set Leasing Content

                var fneta = new newfneta();
                var filterString = fneta.formFilterString(
                  undefined,
                  undefined,
                  undefined
                );
                fneta.getFNASummary(filterString);

                // Select Leasing Radiobutton
                sap.ui
                  .getCore()
                  .byId("idProcessSwitchMain")
                  .setSelectedIndex(0);
              } else if (selected == 1) {
                //										if(dashItemR == ""){
                //											dashItemR = new newfremneta().createFRNAPage();
                //										}
                window.localStorage.setItem("memLeasingOrRemarketing", "R");
                //this.page.removeAllContent();
                //this.page.insertContent(dashItemL, 0);

                sap.ui
                  .getCore()
                  .byId("idTableFNASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFRNASummary")
                  .setVisible(true);
                sap.ui
                  .getCore()
                  .byId("idTableFONASummary")
                  .setVisible(false);

                sap.ui
                  .getCore()
                  .byId("idTableFPNASummary")
                  .setVisible(false);

				  sap.ui
                  .getCore()
                  .byId("idPanelFilter")
				  .setVisible(true);

                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setText("Download Container Sales Data");
                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setTooltip(
                    "Download equipment level container sales side data"
                  );

                //sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
                sap.ui
                  .getCore()
                  .byId("idCustomerCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idCustomerComboOptions")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idLeasetypeCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idReleasetypeCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idRadioButtonCol")
                  .setVisible(true);
                // Set Container Sales Content

                var fneta = new newfneta();
                var filterString = fneta.formFilterString(
                  undefined,
                  undefined,
                  undefined
                );
                fneta.getFRNASummary(filterString);

                // Select Container Sales Radiobutton
                sap.ui
                  .getCore()
                  .byId("idProcessSwitchMain")
                  .setSelectedIndex(1);
              } else if (selected == 2) {
                //										if(dashItemR == ""){
                //										dashItemR = new newfremneta().createFRNAPage();
                //									}
                window.localStorage.setItem("memLeasingOrRemarketing", "O");
                //this.page.removeAllContent();
                //this.page.insertContent(dashItemL, 0);

                sap.ui
                  .getCore()
                  .byId("idTableFNASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFRNASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFONASummary")
                  .setVisible(true);

                sap.ui
                  .getCore()
                  .byId("idTableFPNASummary")
                  .setVisible(false);

				  sap.ui
                  .getCore()
                  .byId("idPanelFilter")
				  .setVisible(true);

                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setText("Download Bookings/Redeliveries Data");
                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setTooltip(
                    "Download bookings/redeliveries data with equipment details"
                  );

                //sap.ui.getCore().byId("idDepotCombo").setWidth("40%");
                sap.ui
                  .getCore()
                  .byId("idCustomerCombo")
                  .setVisible(true);
                sap.ui
                  .getCore()
                  .byId("idCustomerComboOptions")
                  .setVisible(true);
                sap.ui
                  .getCore()
                  .byId("idLeasetypeCombo")
                  .setVisible(true);
                sap.ui
                  .getCore()
                  .byId("idReleasetypeCombo")
                  .setVisible(true);
                sap.ui
                  .getCore()
                  .byId("idRadioButtonCol")
                  .setVisible(false);
                // Set Container Sales Content

                var fneta = new newfneta();
                var filterString = fneta.formFilterString(
                  undefined,
                  undefined,
                  undefined
                );
                fneta.getFONASummary(filterString);
                // Select Container Sales Radiobutton
                sap.ui
                  .getCore()
                  .byId("idProcessSwitchMain")
                  .setSelectedIndex(2);
              } else if (selected == 3) {
                window.localStorage.setItem("memLeasingOrRemarketing", "P");
                //this.page.removeAllContent();
                //this.page.insertContent(dashItemL, 0);

                sap.ui
                  .getCore()
                  .byId("idTableFNASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFRNASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFONASummary")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idTableFPNASummary")
				  .setVisible(true);
				
				  sap.ui
                  .getCore()
                  .byId("idPanelFilter")
				  .setVisible(false);

				  

                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setText("Download Confirmed EPM Data");
                sap.ui
                  .getCore()
                  .byId("idButtonDownloadDNA")
                  .setTooltip("Download Confirmed EPM Data");

                //sap.ui.getCore().byId("idDepotCombo").setWidth("40%");
                sap.ui
                  .getCore()
                  .byId("idCustomerCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idCustomerComboOptions")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idLeasetypeCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idReleasetypeCombo")
                  .setVisible(false);
                sap.ui
                  .getCore()
                  .byId("idRadioButtonCol")
                  .setVisible(false);
                // Set Container Sales Content

                var fneta = new newfneta();
                var filterString = fneta.formFilterString(
                  undefined,
                  undefined,
                  undefined
                );
                fneta.getFPNASummary(filterString);
                // Select Container Sales Radiobutton
                sap.ui
                  .getCore()
                  .byId("idProcessSwitchMain")
                  .setSelectedIndex(3);
              }
            },
            this
          ]
        }).addStyleClass("processSwitch")
      ]
    });

    var leasingOrRemarketing = window.localStorage.getItem(
      "memLeasingOrRemarketing"
    );
    if (leasingOrRemarketing == null || leasingOrRemarketing == "L") {
      window.localStorage.setItem("memLeasingOrRemarketing", "L");

      // Select Leasing Radiobutton
      sap.ui
        .getCore()
        .byId("idProcessSwitchMain")
        .setSelectedIndex(0);
      //this.page.removeAllContent();
      //this.page.insertContent(dashItemL, 0);

      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idTableFRNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFONASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFPNASummary")
        .setVisible(false);

      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setText("Download Leasing Data");
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setTooltip("Download equipment level leasing side data");

      //sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
      sap.ui
        .getCore()
        .byId("idCustomerCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCustomerComboOptions")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idLeasetypeCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idReleasetypeCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idRadioButtonCol")
        .setVisible(true);
      // Set Leasing Content

      var fneta = new newfneta();
      var filterString = fneta.formFilterString(
        undefined,
        undefined,
        undefined
      );
      fneta.getFNASummary(filterString);
    } else if (leasingOrRemarketing == "R") {
      window.localStorage.setItem("memLeasingOrRemarketing", "R");

      // Select Container Sales Radiobutton
      sap.ui
        .getCore()
        .byId("idProcessSwitchMain")
        .setSelectedIndex(1);
      //this.page.removeAllContent();
      //this.page.insertContent(dashItemL, 0);

      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFRNASummary")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idTableFONASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFPNASummary")
        .setVisible(false);

      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setText("Download Container Sales Data");
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setTooltip("Download equipment level container sales side data");

      //sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
      sap.ui
        .getCore()
        .byId("idCustomerCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCustomerComboOptions")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idLeasetypeCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idReleasetypeCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idRadioButtonCol")
        .setVisible(true);

      // Set Container Sales Content

      var fneta = new newfneta();
      var filterString = fneta.formFilterString(
        undefined,
        undefined,
        undefined
      );
      fneta.getFRNASummary(filterString);
    } else if (leasingOrRemarketing == "O") {
      window.localStorage.setItem("memLeasingOrRemarketing", "O");

      // Select Container Sales Radiobutton
      sap.ui
        .getCore()
        .byId("idProcessSwitchMain")
        .setSelectedIndex(2);
      //this.page.removeAllContent();
      //this.page.insertContent(dashItemL, 0);

      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFRNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFONASummary")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idTableFPNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setText("Download Bookings/Redeliveries Data");
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setTooltip(
          "Download bookings/redeliveries data with equipment details"
        );

      //sap.ui.getCore().byId("idDepotCombo").setWidth("90%");
      sap.ui
        .getCore()
        .byId("idCustomerCombo")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idCustomerComboOptions")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idLeasetypeCombo")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idReleasetypeCombo")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idRadioButtonCol")
        .setVisible(false);

      // Set Container Sales Content

      var fneta = new newfneta();
      var filterString = fneta.formFilterString(
        undefined,
        undefined,
        undefined
      );
      fneta.getFONASummary(filterString);
    } else if (leasingOrRemarketing == "P") {
      window.localStorage.setItem("memLeasingOrRemarketing", "P");

      // Select Container Sales Radiobutton
      sap.ui
        .getCore()
        .byId("idProcessSwitchMain")
        .setSelectedIndex(3);
      //this.page.removeAllContent();
      //this.page.insertContent(dashItemL, 0);

      sap.ui
        .getCore()
        .byId("idTableFNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFRNASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFONASummary")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idTableFPNASummary")
        .setVisible(true);
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setText("Download Confirmed EPM Data");
      sap.ui
        .getCore()
        .byId("idButtonDownloadDNA")
        .setTooltip("Download Confirmed EPM Data");

      //sap.ui.getCore().byId("idDepotCombo").setWidth("40%");
      sap.ui
        .getCore()
        .byId("idCustomerCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idCustomerComboOptions")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idLeasetypeCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idReleasetypeCombo")
        .setVisible(false);
      sap.ui
        .getCore()
        .byId("idRadioButtonCol")
        .setVisible(false);

      // Set Positioning Content

      var fneta = new newfneta();
      var filterString = fneta.formFilterString(
        undefined,
        undefined,
        undefined
      );
      fneta.getFPNASummary(filterString);
    }

    this.page = new sap.m.Page("UtilRepPage", {
      //title: "{i18n>page2Title}",
      showNavButton: false, // page 2 should display a back button
      //enableScrolling: false,
      //navButtonPress: [ oController.navButtonPress, oController ],
      icon: "",
      content: [fnetaContent]
    });
    this.page.setCustomHeader(oPageMainBar);
    this.page.setShowHeader(true);
    this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
    //this.page.setHeight("25%");
    app.addPage(this.page);

    return this.page;
  }
});
