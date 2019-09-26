var FullSpecTitle = "";
var  aEquipCatBoxes = [
                       {desc: "Manufacturer", value: ""},
                       {desc: "ISO Code", value: ""},
                       {desc: "CSC", value: ""},
                       {desc: "TIR", value: ""},
                       {desc: "Internal Length", value: ""},
                       {desc: "Internal Width", value: ""},
                       {desc: "Internal Height", value: ""},
                       {desc: "Door Opening Width", value: ""},
                       {desc: "Door Opening Height", value: ""},
                       {desc: "Cubic Capacity", value: ""},
                       {desc: "External Length", value: ""},
                       {desc: "External Width", value: ""},
                       {desc: "External Height", value: ""},
                       {desc: "Tare Weight", value: ""},
                       {desc: "Maximum Payload", value: ""},
                       {desc: "Maximum Gross Weight", value: ""},
                       {desc: "Stacking Height", value: ""},
                       {desc: "Stacking Test Load per Post", value: ""},
                       {desc: "Racking Weight", value: ""},
                       {desc: "Floor Thickness", value: ""}
                  
  ];

var aEquipCatReefers = [
                        {desc: "External Width", value: ""},
                        {desc: "External Height", value: ""},
                        {desc: "External Length", value: ""},
                        {desc: "Internal Width", value: ""},
                        {desc: "Internal Height", value: ""},
                        {desc: "Internal Length", value: ""},
                        {desc: "Door Opening Width", value: ""},
                        {desc: "Door Opening Height", value: ""},
                        {desc: "Cubic Capacity", value: ""},
                        {desc: "Machinery Manufacturer", value: ""},
                        {desc: "Machinery Model", value: ""},
                        {desc: "Insulation Blowing Agent", value: ""},
                        {desc: "Maximum Gross Weight", value: ""},
                        {desc: "Tare Weight", value: ""},
                        {desc: "Tare Weight Including Machinery", value: ""},
                        {desc: "Payload", value: ""},
                        {desc: "Stacking Height", value: ""},
                        {desc: "Stacking Test Load per Post", value: ""},
                        {desc: "Racking Weight", value: ""}
                        ];

var aEquipCatReefersConst = [
                        {desc: "Top & Bottom Rail Material", value: ""}, 
                        {desc: "End Frames Material", value: ""},
                        {desc: "Outer Panels", value: ""},
                        {desc: "Underfloor", value: ""},
                        {desc: "Inner Side Lining", value: ""},
                        {desc: "Tee Floor Height", value: ""},
                        {desc: "Door Outer Material", value: ""},
                        {desc: "Lock Rods", value: ""},
                        {desc: "Goose Neck Tunnel Length", value: ""},
                        {desc: "Goose Neck Tunnel Width", value: ""},
                        {desc: "Goose Neck Tunnel Height", value: ""},
                        {desc: "Fork Lift Pockets", value: ""},
                        {desc: "Side Insulation", value: ""},
                        {desc: "Floor Insulation", value: ""},
                        {desc: "Roof Insulation", value: ""},
                        {desc: "Door Insulation", value: ""},
                        {desc: "Air Leakage", value: ""},
                        {desc: "Heat Leakage", value: ""},
                        {desc: "Door Sill", value: ""},
                        {desc: "Floor Rail", value: ""},
                        {desc: "Floor Stringer", value: ""},
                        {desc: "Scuff Liner", value: ""},
                        {desc: "Door Holder", value: ""},
                        {desc: "Door Gasket Outer", value: ""},
                        {desc: "Side Post & Stringers", value: ""},
                        {desc: "Roof Bow & Stringers", value: ""},
                        {desc: "Roof Lining", value: ""},
                        {desc: "Paint Corten Steel Parts", value: ""},
                        {desc: "Paint MGSS Parts", value: ""},
                        {desc: "Paint Under Structure", value: ""},
                        {desc: "Top Coat Colour", value: ""},
                        {desc: "Top & Bottom Lifting Test", value: ""},
                        {desc: "Remote Monitoring Unit", value: ""},
                        ];

var aEquipCatTanks = [
                      {desc: "Cubic Capacity", value: ""},
                      {desc: "Tare Weight", value: ""},
                      {desc: "Maximum Gross Weight", value: ""}
                      ];

var aEquipCatTanksConst = [
                      {desc: "Working Pressure", value: ""},
                      {desc: "Test Pressure", value: ""},
                      {desc: "Steam Working Pressure", value: ""},
                      {desc: "Steam Test Pressure", value: ""},
                      {desc: "Relief Valve", value: ""},
                      {desc: "Ambient Temp Range (High)", value: ""},
                      {desc: "Ambient Temp Range (Low)", value: ""},
                      {desc: "Maximum Cargo Temp", value: ""},
                      {desc: "Shell Material", value: ""},
                      {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                      {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                      {desc: "Shell Thickness - Barrel", value: ""},
                      {desc: "Shell Thickness - Ends", value: ""},
                      {desc: "Tank Type", value: ""}
                      ];

var aEquipCatTanksStdFit = [
                      {desc: "Manlid", value: ""},
                      {desc: "Calibration", value: ""},
                      {desc: "Cladding", value: ""},
                      {desc: "Handrail", value: ""},
                      {desc: "Insulation Material", value: ""},
                      {desc: "Insulation Material Thickness (side)", value: ""},
                      {desc: "Lining Material", value: ""},
                      {desc: "Valve, Airline - Primary Outlet Diameter", value: ""},
                      {desc: "Valve, Airline - Primary Outlet (Thread & Flange Type)", value: ""},
                      {desc: "Valve, Airline - Primary Outlet Type", value: ""},
                      {desc: "Safety Relief Valve - Secondary Outlet Diameter", value: ""},
                      {desc: "Safety Relief Valve - Secondary Outlet (Thread & Flange)", value: ""},
                      {desc: "Safety Relief Valve - Secondary Outlet Type", value: ""},
                      {desc: "Valve, Bottom - Outlet Diameter", value: ""},
                      {desc: "Valve, Bottom - Outlet (Thread & Flange Type)", value: ""},
                      {desc: "Valve, Bottom - Outlet Type", value: ""},
                      {desc: "Valve, Top - Outlet Type", value: ""},
                      {desc: "Valve, Top - Outlet Diameter", value: ""},
                      {desc: "Valve, Top - Outlet Location", value: ""},
                      {desc: "Valve, Top - Outlet (Thread & Flange Type)", value: ""},
                      {desc: "Valve, Vapour Return Type", value: ""},
                      {desc: "Valve, Vapour Return - Diameter", value: ""},
                      {desc: "Valve, Vapour Return (Thread & Flange Type)", value: ""},
                      {desc: "Walkway Type", value: ""},
                      {desc: "Insulation", value: ""},
                      {desc: "Steam Heating", value: ""},
                      {desc: "Steam Tube - Effective Area", value: ""},
                      {desc: "Steam Tube - Ducts", value: ""},
                      {desc: "Steam Tube - Inlet / Outlet", value: ""},
                      {desc: "Steam Working Pressure", value: ""},
                      {desc: "Relief Valve - Diameter", value: ""},
                      {desc: "Relief Valve - Outlet", value: ""},
                      {desc: "Relief Valve - Set @", value: ""},
                      {desc: "Relief Valve - Type", value: ""},
                      {desc: "Manlid / Load Hatch Fastening Type", value: ""},
                      {desc: "Relief Valve", value: ""},
                      {desc: "Weld Finish Internal", value: ""},
                      {desc: "Weld Material Grade", value: ""},
                      //{desc: "Relief Valve", value: ""},
                      //{desc: "Valve Airline - Primary Outlet", value: ""},
                      {desc: "Vapour Return", value: ""},
                      {desc: "Remote Closure", value: ""},
                      {desc: "Gaskets & Seals", value: ""},
                      {desc: "Temperature Gauge", value: ""},
   ];


sap.ui.model.json.JSONModel.extend("newnaSPECLevel", {
	
	createEqiupCatBoxes:function(){
		var oFlexboxEqiupCatBoxes = new sap.m.FlexBox("idEqiupCatBoxesFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxEqiupCatBoxes;
	},
	
       createEqiupCatBoxesFormView: function(){
    	   sap.ui.getCore().byId("idEqiupCatBoxesFlxBox").destroyItems();
    	   
    	   var oBtnFullSpecBoxesExport = new sap.m.Button({
               //text : "Export To PDF",
               type:sap.m.ButtonType.Unstyled,
               icon: "images/pdf_icon.png",
               press:function(){
                     //alert("Export to PDF");
   	                  var colWidthArr = [2.5, 4];
   		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
   		              var verticalOffset = 1.25; 
   		              generatePDFFullSpecBoxes(aEquipCatBoxes,FullSpecTitle,colWidthArr,verticalOffset);
               }
            }).addStyleClass("toolbarBtn");
    	   
              // Table
              var oEqiupCatTable = new sap.ui.table.Table("idBoxesTbl",{
               visibleRowCount: 20,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "50%",
               height:"100%"
        }).addStyleClass("font15 tblBorder marginTop10");
              
              // Table Columns
              oEqiupCatTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"200px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"335px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
              
              var oLabelFullSpecTitle = new sap.ui.commons.Label({text: FullSpecTitle,
                  wrapping: true}).addStyleClass("font15Bold");
              
              var oFlexFullSpecHeaderBtn = new sap.m.FlexBox({
		  		  items: [
		  		          	oBtnFullSpecBoxesExport
		     		  ],
		     		  direction: "RowReverse",
		     		  width:"15%"
		     		});
              
              var oFlexFullSpecTitle = new sap.m.FlexBox({
		  		  items: [
		  		          oLabelFullSpecTitle
		     		  ],
		     		  direction: "Row",
		     		  width:"35%"
		     		});
              
              var oFlexFullSpecHeader = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecTitle,oFlexFullSpecHeaderBtn
		     		  ],
		     		  direction: "Row",
		     		});
              
              var oFlexFullSpecData = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecHeader,oEqiupCatTable
		     		  ],
		     		  direction: "Column",
		     		});
              
              var disclText = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.'
            		+ 'Therefore, this information is provided "as is" without warranty of any kind.';
            	
            	 var oLblDisclaimer = new sap.ui.commons.Label({text: disclText,
            		 width:"50%",
                     wrapping: true}).addStyleClass("font11Light marginTop10");
            	 
            	 
       // Responsive Grid Layout
              var oEquipcatBoxesLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEquipcatBoxesLayout");
       
       // Online Form Starts
              var oEquipcatBoxesForm = new sap.ui.layout.form.Form("idEquipcatBoxesForm",{
                                     layout: oEquipcatBoxesLayout,
                                     formContainers: [
                                             
                                             new sap.ui.layout.form.FormContainer("idEquipcatBoxesFormC1",{
                                                    // title: oLabelFullSpecTitle, //FullSpecTitle,
                                                     formElements: [
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oFlexFullSpecData]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oLblDisclaimer]
                                                                    })
                                                             ]
                                             })                                
                                     ]
                             });

              var oFlexBoxFull = new sap.m.FlexBox({
		  		  items: [
		  		        oEquipcatBoxesForm
		     		  ],
		     		  direction: "Column",
		     		});
              
              sap.ui.getCore().byId("idEqiupCatBoxesFlxBox").addItem(oFlexBoxFull);
              
                                 //  return oFlexBoxFull;
       },
       
       bindBoxDetails: function(){
               aEquipCatBoxes = [		  {desc: "Serial No.", value: ""},
                                          {desc: "Manufacturer", value: ""},
                                          {desc: "ISO Code", value: ""},
                                          {desc: "CSC", value: ""},
                                          {desc: "TIR", value: ""},
                                          {desc: "Internal Length", value: ""},
                                          {desc: "Internal Width", value: ""},
                                          {desc: "Internal Height", value: ""},
                                          {desc: "Door Opening Width", value: ""},
                                          {desc: "Door Opening Height", value: ""},
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "External Length", value: ""},
                                          {desc: "External Width", value: ""},
                                          {desc: "External Height", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Maximum Payload", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""},
                                          {desc: "Stacking Height", value: ""},
                                          {desc: "Stacking Test Load per Post", value: ""},
                                          {desc: "Racking Weight", value: ""},
                                          {desc: "Floor Thickness", value: ""}
                                     
                     ];
               
               //unit status
               aEquipCatBoxes[0].value = aFullSpecificationBoxes[0].Equnr;
               aEquipCatBoxes[1].value = aFullSpecificationBoxes[0].Manufacturer;
               aEquipCatBoxes[2].value = aFullSpecificationBoxes[0].IsoCode;
               aEquipCatBoxes[3].value = aFullSpecificationBoxes[0].Csc;
               aEquipCatBoxes[4].value = aFullSpecificationBoxes[0].Tir;
               aEquipCatBoxes[5].value = aFullSpecificationBoxes[0].LengthInt;
               aEquipCatBoxes[6].value = aFullSpecificationBoxes[0].WidthInt;
               aEquipCatBoxes[7].value = aFullSpecificationBoxes[0].HeightInt;
               aEquipCatBoxes[8].value = aFullSpecificationBoxes[0].DoorOpeningWidth;
               aEquipCatBoxes[9].value = aFullSpecificationBoxes[0].DoorOpeningHeight;
               aEquipCatBoxes[10].value = aFullSpecificationBoxes[0].CubicCapacity;
               aEquipCatBoxes[11].value = aFullSpecificationBoxes[0].LengthExt;
               aEquipCatBoxes[12].value = aFullSpecificationBoxes[0].WidthExt;
               aEquipCatBoxes[13].value = aFullSpecificationBoxes[0].HeightExt;
               aEquipCatBoxes[14].value = aFullSpecificationBoxes[0].TareWeight;
               aEquipCatBoxes[15].value = aFullSpecificationBoxes[0].MaximumPayload;
               aEquipCatBoxes[16].value = aFullSpecificationBoxes[0].MaximumGrossWeight;
               aEquipCatBoxes[17].value = aFullSpecificationBoxes[0].StackingHeight;
               aEquipCatBoxes[18].value = aFullSpecificationBoxes[0].StackingTetsLoadPerPost;
               aEquipCatBoxes[19].value = aFullSpecificationBoxes[0].RackingWeight;
               aEquipCatBoxes[20].value = aFullSpecificationBoxes[0].FloorThickness;

        
               //Create a model and bind the table rows to this model
                      var oModelEquipCatBox = new sap.ui.model.json.JSONModel();
                      oModelEquipCatBox.setData({modelData: aEquipCatBoxes});
                      
                      // NP - Change here
                      sap.ui.getCore().byId("idBoxesTbl").setModel(oModelEquipCatBox);
                      sap.ui.getCore().byId("idBoxesTbl").bindRows("/modelData");
       },
       
       createEqiupCatReefers:function(){
   		var oFlexboxEqiupCatReefers = new sap.m.FlexBox("idEqiupCatReefersFlxBox",{
               items: [],
               direction: "Row"
   		  });
   		
   		return oFlexboxEqiupCatReefers;
   	},

          createEqiupCatReefersFormView: function(){
       	   sap.ui.getCore().byId("idEqiupCatReefersFlxBox").destroyItems();
                 var oLabelConstrReef = new sap.ui.commons.Label({text: "Construction : ",
               wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");

                 // Table - Reefers
                 var oEqiupCatReefersTable = new sap.ui.table.Table("idReefersTbl",{
                        visibleRowCount: 19,
                  firstVisibleRow: 3,
                  columnHeaderHeight: 30,
                  columnHeaderVisible : false,
                  selectionMode: sap.ui.table.SelectionMode.None,
                  width: "60%",
                  height:"100%"
           }).addStyleClass("font15 tblBorder marginTop10");
                 
                 // Table Columns
                 oEqiupCatReefersTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
            width:"150px",
            sortProperty: "desc",
            filterProperty: "desc",
                  }));
                  
                 oEqiupCatReefersTable.addColumn(new sap.ui.table.Column({
                         template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                         width:"335px",
                   sortProperty: "value",
                   filterProperty: "value",
                         }));
          
          // Table - Reefers CONSTRUCTION
                 var oEqiupCatReefersConstTable = new sap.ui.table.Table("idReefersConstTbl",{
                        visibleRowCount: 33,
                  firstVisibleRow: 3,
                  columnHeaderHeight: 30,
                  columnHeaderVisible : false,
                  selectionMode: sap.ui.table.SelectionMode.None,
                  width: "60%",
                  height:"100%"
           }).addStyleClass("font15 tblBorder");
                 
                 // Table Columns
                 oEqiupCatReefersConstTable.addColumn(new sap.ui.table.Column({
            template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
            width:"150px",
            sortProperty: "desc",
            filterProperty: "desc",
                  }));
                  
                 oEqiupCatReefersConstTable.addColumn(new sap.ui.table.Column({
                         template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                         width:"335px",
                         sortProperty: "value",
                   filterProperty: "value",
                         }));
                 var oLabelFullSpecTitle = new sap.ui.commons.Label({text: FullSpecTitle,
                     wrapping: true}).addStyleClass("font15Bold");
                 
                 var oBtnFullSpecReefersExport = new sap.m.Button({
                     text : "Export To PDF",
                     type:sap.m.ButtonType.Unstyled,
                     icon: "images/pdf_icon.png",
                     press:function(){
                           //alert("Export to PDF");
         	                  var colWidthArr = [2.0, 3.7];
         		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
         		              var verticalOffset = 1.25; 
         		            var Title1 = "Construction";
         		        generatePDFFullSpecReefers(aEquipCatReefers,aEquipCatReefersConst,FullSpecTitle,Title1,colWidthArr,verticalOffset);
                     }
                  }).addStyleClass("toolbarBtn");
                 
                 var oFlexFullSpecHeaderBtn = new sap.m.FlexBox({
   		  		  items: [
   		  		          oBtnFullSpecReefersExport
   		     		  ],
   		     		  direction: "RowReverse",
   		     		  width:"20%"
   		     		});
                 
                 var oFlexFullSpecTitle = new sap.m.FlexBox({
   		  		  items: [
   		  		          oLabelFullSpecTitle
   		     		  ],
   		     		  direction: "Row",
   		     		  width:"40%"
   		     		});
                 
                 var oFlexFullSpecHeader = new sap.m.FlexBox({
   		  		  items: [
   		  		          oFlexFullSpecTitle,oFlexFullSpecHeaderBtn
   		     		  ],
   		     		  direction: "Row",
   		     		});
                 
                 var oFlexFullSpecData = new sap.m.FlexBox({
   		  		  items: [
   		  		          oFlexFullSpecHeader,oEqiupCatReefersTable
   		     		  ],
   		     		  direction: "Column",
   		     		});
                 
                 var disclText = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.'
             		+ 'Therefore, this information is provided "as is" without warranty of any kind.';
             	
               var oLblDisclaimer = new sap.ui.commons.Label({text: disclText,
             	  width:"60%",
                   wrapping: true}).addStyleClass("font11Light marginTop10");
               
          // Responsive Grid Layout
                 var oEquipcatReefersLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEquipcatReefersLayout");
          
          // Online Form Starts
                 var oEquipcatReefersForm = new sap.ui.layout.form.Form("idEquipcatReefersForm",{
                                        layout: oEquipcatReefersLayout,
                                        formContainers: [
                                                
                                                new sap.ui.layout.form.FormContainer("idEquipcatReefersFormC1",{
                                                       // title: FullSpecTitle,
                                                        formElements: [
                                                                                                   new sap.ui.layout.form.FormElement({
                                                                                                       fields: [oFlexFullSpecData]
                                                                                                   }),
                                                                                                   new sap.ui.layout.form.FormElement({
                                                                                                       fields: [oLabelConstrReef]
                                                                                                   }),
                                                                                                   new sap.ui.layout.form.FormElement({
                                                                                                       fields: [oEqiupCatReefersConstTable]
                                                                                                   }),
                                                                                                   new sap.ui.layout.form.FormElement({
                                                                                                       fields: [oLblDisclaimer]
                                                                                                   })
                                                                ]
                                                })                                
                                        ]
                                });
                 
                 var oFlexBoxFull = new sap.m.FlexBox({
   		  		  items: [
   		  		          //oFlexBoxBackBtn,
   		  		        oEquipcatReefersForm
   		     		  ],
   		     		  direction: "Column",
   		     		});
                 
                 sap.ui.getCore().byId("idEqiupCatReefersFlxBox").addItem(oFlexBoxFull);
                                    //  return oFlexBoxFull;
          },
          
          bindReefersDetails: function(){
                  aEquipCatReefers = [		 {desc: "Serial No.", value: ""},
                                             {desc: "External Width", value: ""},
                                             {desc: "External Height", value: ""},
                                             {desc: "External Length", value: ""},
                                             {desc: "Internal Width", value: ""},
                                             {desc: "Internal Height", value: ""},
                                             {desc: "Internal Length", value: ""},
                                             {desc: "Door Opening Width", value: ""},
                                             {desc: "Door Opening Height", value: ""},
                                             {desc: "Cubic Capacity", value: ""},
                                             {desc: "Machinery Manufacturer", value: ""},
                                             {desc: "Machinery Model", value: ""},
                                             {desc: "Insulation Blowing Agent", value: ""},
                                             {desc: "Maximum Gross Weight", value: ""},
                                             {desc: "Tare Weight", value: ""},
                                             {desc: "Tare Weight Including Machinery", value: ""},
                                             {desc: "Payload", value: ""},
                                             {desc: "Stacking Height", value: ""},
                                             {desc: "Stacking Test Load per Post", value: ""},
                                             {desc: "Racking Weight", value: ""}
                                             ];

           aEquipCatReefersConst = [
                                             {desc: "Top & Bottom Rail Material", value: ""}, 
                                             {desc: "End Frames Material", value: ""},
                                             {desc: "Outer Panels", value: ""},
                                             {desc: "Underfloor", value: ""},
                                             {desc: "Inner Side Lining", value: ""},
                                             {desc: "Tee Floor Height", value: ""},
                                             {desc: "Door Outer Material", value: ""},
                                             {desc: "Lock Rods", value: ""},
                                             {desc: "Goose Neck Tunnel Length", value: ""},
                                             {desc: "Goose Neck Tunnel Width", value: ""},
                                             {desc: "Goose Neck Tunnel Height", value: ""},
                                             {desc: "Fork Lift Pockets", value: ""},
                                             {desc: "Side Insulation", value: ""},
                                             {desc: "Floor Insulation", value: ""},
                                             {desc: "Roof Insulation", value: ""},
                                             {desc: "Door Insulation", value: ""},
                                             {desc: "Air Leakage", value: ""},
                                             {desc: "Heat Leakage", value: ""},
                                             {desc: "Door Sill", value: ""},
                                             {desc: "Floor Rail", value: ""},
                                             {desc: "Floor Stringer", value: ""},
                                             {desc: "Scuff Liner", value: ""},
                                             {desc: "Door Holder", value: ""},
                                             {desc: "Door Gasket Outer", value: ""},
                                             {desc: "Side Post & Stringers", value: ""},
                                             {desc: "Roof Bow & Stringers", value: ""},
                                             {desc: "Roof Lining", value: ""},
                                             {desc: "Paint Corten Steel Parts", value: ""},
                                             {desc: "Paint MGSS Parts", value: ""},
                                             {desc: "Paint Under Structure", value: ""},
                                             {desc: "Top Coat Colour", value: ""},
                                             {desc: "Top & Bottom Lifting Test", value: ""},
                                             {desc: "Remote Monitoring Unit", value: ""},
                                             ];
                  
                  // REEFERS
           		  aEquipCatReefers[0].value = aFullSpecificationReefers[0].Equnr;
                  aEquipCatReefers[1].value = aFullSpecificationReefers[0].ExternalWidth;
                  aEquipCatReefers[2].value = aFullSpecificationReefers[0].ExternalHeight;
                  aEquipCatReefers[3].value = aFullSpecificationReefers[0].ExternalLength;
                  aEquipCatReefers[4].value = aFullSpecificationReefers[0].InternalWidth;
                  aEquipCatReefers[5].value = aFullSpecificationReefers[0].InternalHeight;
                  aEquipCatReefers[6].value = aFullSpecificationReefers[0].InternalLength;
                  aEquipCatReefers[7].value = aFullSpecificationReefers[0].DoorOpeningWidth;
                  aEquipCatReefers[8].value = aFullSpecificationReefers[0].DoorOpeningHeight;
                  aEquipCatReefers[9].value = aFullSpecificationReefers[0].CubicCapacity;
                  aEquipCatReefers[10].value = aFullSpecificationReefers[0].MachineryManufacturer;
                  aEquipCatReefers[11].value = aFullSpecificationReefers[0].MachineryModel;
                  aEquipCatReefers[12].value = aFullSpecificationReefers[0].InsulationBlowingAgrent;
                  aEquipCatReefers[13].value = aFullSpecificationReefers[0].MaximumGrossWeight;
                  aEquipCatReefers[14].value = aFullSpecificationReefers[0].TareWeight;
                  // no value for Tare Weight Including Machinery
                  //aEquipCatReefers[14].value = aFullSpecificationReefers[0].Csc;
                  
                  aEquipCatReefers[15].value = aFullSpecificationReefers[0].Payload;
                  // no value for Stacking Height
                 // aEquipCatReefers[16].value = aFullSpecificationReefers[0].Manufacturer;
                  
                  aEquipCatReefers[17].value = aFullSpecificationReefers[0].StackingTetsLoadPerPost;
                  aEquipCatReefers[18].value = aFullSpecificationReefers[0].RackingWeight;

           
                  //Create a model and bind the table rows to this model
                         var oModelEquipCatReefers = new sap.ui.model.json.JSONModel();
                         oModelEquipCatReefers.setData({modelData: aEquipCatReefers});
                         
                         // NP - Change here
                         sap.ui.getCore().byId("idReefersTbl").setModel(oModelEquipCatReefers);
                         sap.ui.getCore().byId("idReefersTbl").bindRows("/modelData");
                         
                         // REEFERS - CONSTRUCTION
                         // no value for Top & Bottom Rail Material
                        // aEquipCatReefersConst[0].value = aFullSpecificationReefers[0].Manufacturer;
                         
                         aEquipCatReefersConst[1].value = aFullSpecificationReefers[0].EndFramesMaterial;
                         aEquipCatReefersConst[2].value = aFullSpecificationReefers[0].OuterPanels;
                         aEquipCatReefersConst[3].value = aFullSpecificationReefers[0].Underfloor;
                         aEquipCatReefersConst[4].value = aFullSpecificationReefers[0].InnerSideLining;
                         aEquipCatReefersConst[5].value = aFullSpecificationReefers[0].TeeFloorHeight;
                         aEquipCatReefersConst[6].value = aFullSpecificationReefers[0].DoorOuterMaterial;
                         aEquipCatReefersConst[7].value = aFullSpecificationReefers[0].LockRods;
                         aEquipCatReefersConst[8].value = aFullSpecificationReefers[0].GooseNeckTunnelLength;
                         // no value for Goose Neck Tunnel Width
                        // aEquipCatReefersConst[9].value = aFullSpecificationReefers[0].IsoCode;
                         // no value for Goose Neck Tunnel Height
                        // aEquipCatReefersConst[10].value = aFullSpecificationReefers[0].Csc;
                         
                         aEquipCatReefersConst[11].value = aFullSpecificationReefers[0].ForkLiftPockets;
                         aEquipCatReefersConst[12].value = aFullSpecificationReefers[0].SideInsulation;
                         aEquipCatReefersConst[13].value = aFullSpecificationReefers[0].FloorInsulation;
                         aEquipCatReefersConst[14].value = aFullSpecificationReefers[0].RoofInsulation;
                         // no value for Door Insulation                 
                       //  aEquipCatReefersConst[15].value = aFullSpecificationReefers[0].AirLeakage;
                         
                         aEquipCatReefersConst[16].value = aFullSpecificationReefers[0].AirLeakage;
                         aEquipCatReefersConst[17].value = aFullSpecificationReefers[0].HeatLeakage;
                         aEquipCatReefersConst[18].value = aFullSpecificationReefers[0].DoorSill;
                         aEquipCatReefersConst[19].value = aFullSpecificationReefers[0].FloorRail;
                         aEquipCatReefersConst[20].value = aFullSpecificationReefers[0].FloorStringer;
                         aEquipCatReefersConst[21].value = aFullSpecificationReefers[0].ScuffLiner;
                         // no value for Door Holder
                       //  aEquipCatReefersConst[22].value = aFullSpecificationReefers[0].Csc;
                         // no value for Door Gasket Outer
                        // aEquipCatReefersConst[23].value = aFullSpecificationReefers[0].Tir;
                        // no value for Side Post & Stringers
                        // aEquipCatReefersConst[24].value = aFullSpecificationReefers[0].Manufacturer;
                         //no value for Roof Bow & Stringers
                        // aEquipCatReefersConst[25].value = aFullSpecificationReefers[0].IsoCode;
                         
                         aEquipCatReefersConst[26].value = aFullSpecificationReefers[0].RoofLining;
                         // no value for Paint Corten Steel Parts
                        // aEquipCatReefersConst[27].value = aFullSpecificationReefers[0].Tir;
                         // no value for Paint MGSS Parts
                        // aEquipCatReefersConst[28].value = aFullSpecificationReefers[0].Manufacturer;
                         // no value for Paint Under Structure
                        // aEquipCatReefersConst[29].value = aFullSpecificationReefers[0].IsoCode;
                         
                         aEquipCatReefersConst[30].value = aFullSpecificationReefers[0].TopCoatColour;
                         // no value for Top & Bottom Lifting Test
                        // aEquipCatReefersConst[31].value = aFullSpecificationReefers[0].Tir;
                         
                         aEquipCatReefersConst[32].value = aFullSpecificationReefers[0].RemoteMonitoringUnit;

                  
                         //Create a model and bind the table rows to this model
                                var oModelEquipCatReefersConst = new sap.ui.model.json.JSONModel();
                                oModelEquipCatReefersConst.setData({modelData: aEquipCatReefersConst});
                                
                                // NP - Change here
                                sap.ui.getCore().byId("idReefersConstTbl").setModel(oModelEquipCatReefersConst);
                                sap.ui.getCore().byId("idReefersConstTbl").bindRows("/modelData");
    },
    
    createEqiupCatTanks:function(){
		var oFlexboxEqiupCatTanks = new sap.m.FlexBox("idEqiupCatTanksFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxEqiupCatTanks;
	},
	
       createEqiupCatTanksFormView: function(){
    	   
    	   sap.ui.getCore().byId("idEqiupCatTanksFlxBox").destroyItems();
    	   var oLabelfull = new sap.ui.commons.Label({text: "Dimension : ",
               wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");
    	   
           var oLabelConstr = new sap.ui.commons.Label({text: "Construction : ",
            wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");
              
              var oLabelStdFit = new sap.ui.commons.Label({text: "Standard Fittings : ",
            wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");

              // Table - TANKS
              var oEqiupCatTanksTable = new sap.ui.table.Table("idTanksTbl",{
                     visibleRowCount: 3,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "67%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatTanksTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTanksTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"150px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
                     
      
       
       // Table - TANKS CONSTRUCTION
              var oEqiupCatTanksConstTable = new sap.ui.table.Table("idTanksConstTable",{
               visibleRowCount: 14,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "67%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatTanksConstTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTanksConstTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"150px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
      
       // Table - TANKS STANDARD FITTINGS
              var oEqiupCatTanksFitTable = new sap.ui.table.Table("idStdFittingTbl",{
               visibleRowCount: 42,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "67%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatTanksFitTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTanksFitTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"150px",
                sortProperty: "value",
                filterProperty: "value",
                      }));    
              
              var oBtnFullSpecTanksExport = new sap.m.Button({
                  text : "Export To PDF",
                  type:sap.m.ButtonType.Unstyled,
                  icon: "images/pdf_icon.png",
                  press:function(){
                        //alert("Export to PDF");
      	                  var colWidthArr = [3.5, 5];
      		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
      		              var verticalOffset = 1.25; 
      		              var Title1 = "Dimension";
      		            var Title2 = "Construction";
      		          var Title3 = "Standard Fittings";
      		            generatePDFFullSpecTanks(aEquipCatTanks,aEquipCatTanksConst,aEquipCatTanksStdFit,FullSpecTitle,Title1,Title2,Title3,colWidthArr,verticalOffset);
                  }
               }).addStyleClass("toolbarBtn");
              
              var oLabelFullSpecTitle = new sap.ui.commons.Label({text: FullSpecTitle,
                  wrapping: true}).addStyleClass("font15Bold");
              
              var oFlexFullSpecHeaderBtn = new sap.m.FlexBox({
		  		  items: [
		  		          oBtnFullSpecTanksExport
		     		  ],
		     		  direction: "RowReverse",
		     		  width:"20%"
		     		});
              
              var oFlexFullSpecTitle = new sap.m.FlexBox({
		  		  items: [
		  		          oLabelFullSpecTitle
		     		  ],
		     		  direction: "Row",
		     		  width:"47%"
		     		});
              
              var oFlexFullSpecHeader = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecTitle,oFlexFullSpecHeaderBtn
		     		  ],
		     		  direction: "Row",
		     		});
              
              var oFlexFullSpecData = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecHeader,oLabelfull,oEqiupCatTanksTable
		     		  ],
		     		  direction: "Column",
		     		});
              var disclText = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.'
            		+ 'Therefore, this information is provided "as is" without warranty of any kind.';
            	
              var oLblDisclaimer = new sap.ui.commons.Label({text: disclText,
              	 width:"67%",
                  wrapping: true}).addStyleClass("font11Light marginTop10");
              
       // Responsive Grid Layout
              var oEquipcatTanksLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEquipcatTanksLayout");
       
       // Online Form Starts
              var oEquipcatTanksForm = new sap.ui.layout.form.Form("idEquipcatTanksForm",{
                                     layout: oEquipcatTanksLayout,
                                     formContainers: [
                                             
                                             new sap.ui.layout.form.FormContainer("idEquipcatTanksFormC1",{
                                                     //title: FullSpecTitle,
                                                     formElements: [
																	/*new sap.ui.layout.form.FormElement({
																	    fields: [oLabelfull]
																	}),*/
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oFlexFullSpecData]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oLabelConstr]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oEqiupCatTanksConstTable]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oLabelStdFit]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oEqiupCatTanksFitTable]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oLblDisclaimer]
                                                                    })
                                                             ]
                                             })                                
                                     ]
                             });
            
              var oFlexBoxFull = new sap.m.FlexBox({
		  		  items: [
		  		          //oFlexBoxBackBtn,
		  		        oEquipcatTanksForm		  		      
		     		  ],
		     		  direction: "Column",
		     		});
              
              sap.ui.getCore().byId("idEqiupCatTanksFlxBox").addItem(oFlexBoxFull);
                                   //return oFlexBoxFull;
       },
       
       bindTankDetails: function(){
               aEquipCatTanks = [		  {desc: "Serial No.", value: ""},
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""}
                                          ];

                 aEquipCatTanksConst = [
                                          {desc: "Working Pressure", value: ""},
                                          {desc: "Test Pressure", value: ""},
                                          {desc: "Steam Working Pressure", value: ""},
                                          {desc: "Steam Test Pressure", value: ""},
                                          {desc: "Relief Valve", value: ""},
                                          {desc: "Ambient Temp Range (High)", value: ""},
                                          {desc: "Ambient Temp Range (Low)", value: ""},
                                          {desc: "Maximum Cargo Temp", value: ""},
                                          {desc: "Shell Material", value: ""},
                                          {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                                          {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                                          {desc: "Shell Thickness - Barrel", value: ""},
                                          {desc: "Shell Thickness - Ends", value: ""},
                                          {desc: "Tank Type", value: ""}
                                          ];

                 aEquipCatTanksStdFit = [
                                          {desc: "Manlid", value: ""},
                                          {desc: "Calibration", value: ""},
                                          {desc: "Cladding", value: ""},
                                          {desc: "Handrail", value: ""},
                                          {desc: "Insulation Material", value: ""},
                                          {desc: "Insulation Material Thickness (side)", value: ""},
                                          {desc: "Lining Material", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet Diameter", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet Type", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet Diameter", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet (Thread & Flange)", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet Type", value: ""},
                                          {desc: "Valve, Bottom - Outlet Diameter", value: ""},
                                          {desc: "Valve, Bottom - Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Bottom - Outlet Type", value: ""},
                                          {desc: "Valve, Top - Outlet Type", value: ""},
                                          {desc: "Valve, Top - Outlet Diameter", value: ""},
                                          {desc: "Valve, Top - Outlet Location", value: ""},
                                          {desc: "Valve, Top - Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Vapour Return Type", value: ""},
                                          {desc: "Valve, Vapour Return - Diameter", value: ""},
                                          {desc: "Valve, Vapour Return (Thread & Flange Type)", value: ""},
                                          {desc: "Walkway Type", value: ""},
                                          {desc: "Insulation", value: ""},
                                          {desc: "Steam Heating", value: ""},
                                          {desc: "Steam Tube - Effective Area", value: ""},
                                          {desc: "Steam Tube - Ducts", value: ""},
                                          {desc: "Steam Tube - Inlet / Outlet", value: ""},
                                          {desc: "Steam Working Pressure", value: ""},
                                          {desc: "Relief Valve - Diameter", value: ""},
                                          {desc: "Relief Valve - Outlet", value: ""},
                                          {desc: "Relief Valve - Set @", value: ""},
                                          {desc: "Relief Valve - Type", value: ""},
                                          {desc: "Manlid / Load Hatch Fastening Type", value: ""},
                                          {desc: "Relief Valve", value: ""},
                                          {desc: "Weld Finish Internal", value: ""},
                                          {desc: "Weld Material Grade", value: ""},
                                         // {desc: "Relief Valve", value: ""},
                                         // {desc: "Valve Airline - Primary Outlet", value: ""},
                                          {desc: "Vapour Return", value: ""},
                                          {desc: "Remote Closure", value: ""},
                                          {desc: "Gaskets & Seals", value: ""},
                                          {desc: "Temperature Gauge", value: ""},
                       ];

               // TANKS
               // NP - Change here
              // aEquipCatTanks[0].value = aFullSpecificationTanks[0].Manufacturer;
                 aEquipCatTanks[0].value = aFullSpecificationTanks[0].Equnr;
               aEquipCatTanks[1].value = aFullSpecificationTanks[0].CubicCapacity;
               aEquipCatTanks[2].value = aFullSpecificationTanks[0].TareWeight;
               aEquipCatTanks[3].value = aFullSpecificationTanks[0].MaximumGrossWeigh;

        
               //Create a model and bind the table rows to this model
                      var oModelEquipCatTank = new sap.ui.model.json.JSONModel();
                      oModelEquipCatTank.setData({modelData: aEquipCatTanks});
                      
                      // NP - Change here
                      sap.ui.getCore().byId("idTanksTbl").setModel(oModelEquipCatTank);
                      sap.ui.getCore().byId("idTanksTbl").bindRows("/modelData");
                      
                            // TANKS - CONSTRUCTION
                            // NP - Change here
                      aEquipCatTanksConst[0].value = aFullSpecificationTanks[0].WorkingPressure;
                      aEquipCatTanksConst[1].value = aFullSpecificationTanks[0].TestPressure;
                      aEquipCatTanksConst[2].value = aFullSpecificationTanks[0].SteamWorkingPressure;
                      aEquipCatTanksConst[3].value = aFullSpecificationTanks[0].SteamTestPressure;
                      aEquipCatTanksConst[4].value = aFullSpecificationTanks[0].ReliefValve;
                      aEquipCatTanksConst[5].value = aFullSpecificationTanks[0].AmbientTempRangeHigh;
                      aEquipCatTanksConst[6].value = aFullSpecificationTanks[0].AmbientTempRangeLow;
                      aEquipCatTanksConst[7].value = aFullSpecificationTanks[0].MaximumCargoTemp;
                      aEquipCatTanksConst[8].value = aFullSpecificationTanks[0].ShellMaterial;
                      aEquipCatTanksConst[9].value = aFullSpecificationTanks[0].ShellMildBar;
                      aEquipCatTanksConst[10].value = aFullSpecificationTanks[0].ShellMildEnd;
                      aEquipCatTanksConst[11].value = aFullSpecificationTanks[0].ShellThckBar;
                      aEquipCatTanksConst[12].value = aFullSpecificationTanks[0].ShellThckEnd;
                      aEquipCatTanksConst[13].value = aFullSpecificationTanks[0].TankType;

               
                      //Create a model and bind the table rows to this model
                             var oModelEquipCatTankConst = new sap.ui.model.json.JSONModel();
                             oModelEquipCatTankConst.setData({modelData: aEquipCatTanksConst});
                             
                             // NP - Change here
                             sap.ui.getCore().byId("idTanksConstTable").setModel(oModelEquipCatTankConst);
                             sap.ui.getCore().byId("idTanksConstTable").bindRows("/modelData");
                             
                             // TANKS - STANDARD FITTINGS
                             aEquipCatTanksStdFit[0].value = aFullSpecificationTanks[0].Manlid;
                             aEquipCatTanksStdFit[1].value = aFullSpecificationTanks[0].Calibration;
                             aEquipCatTanksStdFit[2].value = aFullSpecificationTanks[0].Cladding;
                             aEquipCatTanksStdFit[3].value = aFullSpecificationTanks[0].Handrail;
                             aEquipCatTanksStdFit[4].value = aFullSpecificationTanks[0].InsulationMaterial;
                             aEquipCatTanksStdFit[5].value = aFullSpecificationTanks[0].InsulationMaterialThickness;
                             aEquipCatTanksStdFit[6].value = aFullSpecificationTanks[0].LiningMaterial;
                             aEquipCatTanksStdFit[7].value = aFullSpecificationTanks[0].ValveAirlinePrimaryoutletdi;
                             aEquipCatTanksStdFit[8].value = aFullSpecificationTanks[0].ValveAirlinePrimaryoutletT;
                             aEquipCatTanksStdFit[9].value = aFullSpecificationTanks[0].ValveAirlinePrimaryoutletTy;
                             aEquipCatTanksStdFit[10].value = aFullSpecificationTanks[0].SafetyReliefSecOutDi;
                             aEquipCatTanksStdFit[11].value = aFullSpecificationTanks[0].SafetyReliefSecOutT;
                             aEquipCatTanksStdFit[12].value = aFullSpecificationTanks[0].SafetyReliefSecOutType;
                             aEquipCatTanksStdFit[13].value = aFullSpecificationTanks[0].ValveBottomOutletDi;
                             aEquipCatTanksStdFit[14].value = aFullSpecificationTanks[0].ValveBottomOutletT;
                             aEquipCatTanksStdFit[15].value = aFullSpecificationTanks[0].ValveBottomOutletType;
                             aEquipCatTanksStdFit[16].value = aFullSpecificationTanks[0].ValveTopOutletType;
                             aEquipCatTanksStdFit[17].value = aFullSpecificationTanks[0].ValveTopOutletDi;
                             aEquipCatTanksStdFit[18].value = aFullSpecificationTanks[0].ValveTopOutletLocation;
                             aEquipCatTanksStdFit[19].value = aFullSpecificationTanks[0].ValveTopOutletT;
                             aEquipCatTanksStdFit[20].value = aFullSpecificationTanks[0].ValveVapourReturnType;
                             aEquipCatTanksStdFit[21].value = aFullSpecificationTanks[0].ValveVapourReturnDiameter;
                             aEquipCatTanksStdFit[22].value = aFullSpecificationTanks[0].ValveVapourReturnThread;
                             aEquipCatTanksStdFit[23].value = aFullSpecificationTanks[0].WalkwayType;
                             aEquipCatTanksStdFit[24].value = aFullSpecificationTanks[0].Insulation;
                             aEquipCatTanksStdFit[25].value = aFullSpecificationTanks[0].SteamHeating;
                             aEquipCatTanksStdFit[26].value = aFullSpecificationTanks[0].SteamTubeEffectiveArea;
                             aEquipCatTanksStdFit[27].value = aFullSpecificationTanks[0].SteamTubeDucts;
                             aEquipCatTanksStdFit[28].value = aFullSpecificationTanks[0].SteamTubeInletOutlet;
                             aEquipCatTanksStdFit[29].value = aFullSpecificationTanks[0].SteamWorkingPressure;
                             aEquipCatTanksStdFit[30].value = aFullSpecificationTanks[0].ReliefValveDiameter;
                             aEquipCatTanksStdFit[31].value = aFullSpecificationTanks[0].ReliefValveOutlet;
                             aEquipCatTanksStdFit[32].value = aFullSpecificationTanks[0].ReliefValveSet;
                             aEquipCatTanksStdFit[33].value = aFullSpecificationTanks[0].ReliefVavleType;
                             aEquipCatTanksStdFit[34].value = aFullSpecificationTanks[0].ManlidLoadHatchFasteningTy;
                             aEquipCatTanksStdFit[35].value = aFullSpecificationTanks[0].ReliefValve;
                             aEquipCatTanksStdFit[36].value = aFullSpecificationTanks[0].WeldFinishInternal;
                             aEquipCatTanksStdFit[37].value = aFullSpecificationTanks[0].WeldMaterialGrad;
                             //aEquipCatTanksStdFit[38].value = aFullSpecificationTanks[0].ReliefValveR;
                            // aEquipCatTanksStdFit[39].value = aFullSpecificationTanks[0].ValveAirlinePrimaryOutl;
                             aEquipCatTanksStdFit[38].value = aFullSpecificationTanks[0].VapourReturn;
                             aEquipCatTanksStdFit[39].value = aFullSpecificationTanks[0].RemoteClosure;
                             aEquipCatTanksStdFit[40].value = aFullSpecificationTanks[0].GasketsSeals;
                             aEquipCatTanksStdFit[41].value = aFullSpecificationTanks[0].TemperatureGauge;

                      
                             //Create a model and bind the table rows to this model
                                   var oModelEquipCatTankStdFit = new sap.ui.model.json.JSONModel();
                                   oModelEquipCatTankStdFit.setData({modelData: aEquipCatTanksStdFit});
                                   
                                   // NP - Change here
                                   sap.ui.getCore().byId("idStdFittingTbl").setModel(oModelEquipCatTankStdFit);
                                   sap.ui.getCore().byId("idStdFittingTbl").bindRows("/modelData");
                                   
 },
 
 getFullSpec: function(type, equnr){
	 	var oCurrent = this;
		var urlToCall = "";
		aFullSpecificationBoxes = [];
		aFullSpecificationTanks = [];
		aFullSpecificationReefers = [];
		//alert("selUnitNumber " + selUnitNumber);
		if(type == "BOXES" || type == "SPECIALS" || type == "SWAPBODIES"){
			urlToCall= "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECPGW1_4_SRV/Full_Speci_Box_Dfs?$filter=Equnr eq '" + equnr + "'";
		}else if(type == "TANKS"){
			urlToCall= "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECPGW1_4_SRV/Full_Speci_Tank?$filter=Equnr eq '" + equnr + "'";
		}else if(type == "REEFERS"){
			urlToCall= "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECPGW1_4_SRV/Full_Speci_Reefer?$filter=Equnr eq '" + equnr + "'";
		}
		
		 oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		   OData.request({ 
		      requestUri: urlToCall,
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
		    	if(type == "BOXES" || type == "SPECIALS" || type == "SWAPBODIES"){
		    		aFullSpecificationBoxes  = data.results;
		    		oCurrent.createEqiupCatBoxesFormView();
		    		oCurrent.bindBoxDetails();
		    		app.to("naSPECBLevel");
				}else if(type == "TANKS"){
					aFullSpecificationTanks = data.results;
					oCurrent.createEqiupCatTanksFormView();
					oCurrent.bindTankDetails();
					app.to("naSPECTLevel");
				}else if(type == "REEFERS"){
					aFullSpecificationReefers  = data.results;
					oCurrent.createEqiupCatReefersFormView();
					oCurrent.bindReefersDetails();
					app.to("naSPECRLevel");
				}
		    },
		 function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading full specification : "+ window.JSON.stringify(err.response));
		    });
	},
});
