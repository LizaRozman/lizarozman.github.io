// Function that displays a Venn Diagram of the chosen features

function vennDiagram(disComp) {
      // set chart theme
      anychart.theme('pastel');

      // gets data from getData function
      // might need to add path or smth 
      var data = getData(disComp);

      // create venn diagram
      var chart = anychart.venn(data);
      
      // function that generates font size based on Array size
      var dataA = data[0];
      console.log(dataA);
      var dataB = data[1];
      var fontsizeLabel = 0, fontsizeTitle = 0;
      if(dataA.value.length>=dataB.value.length){
            fontsizeLabel = parseInt(16*(1/dataA.value.length));
            fontsizeTitle = parseInt(30*(1/dataA.value.length));
      }
      else{
            fontsizeLabel = parseInt(16*(1/dataB.value.length));
            fontsizeTitle = parseInt(30*(1/dataB.value.length));
          }

      // set chart title
      chart
        .title()
        .enabled(true)
        .fontFamily('Roboto, sans-serif')
        .fontSize(24)
        .padding({ bottom: 30 })
        .text('Overlap in brain region expression');

      // set chart stroke
      chart.stroke('1 #fff');

      // set labels settings
      chart
        .labels()
        .fontSize(16)
        .fontColor('#5e6469')
        .hAlign("center")
        .vAlign("center")
        .fontFamily('Roboto, sans-serif')
        .fontWeight('500')
        .format('{%Name}');

      // set intersections labels settings
      chart
        .intersections()
        .labels()
        .fontStyle('italic')
        .fontColor('#fff')
        .format('{%Name}');

      // disable legend
      chart.legend(false);

      // set tooltip settings
      chart
        .tooltip()
        .titleFormat('{%tooltipTitle}')
        .format("{%tooltipDesc}")
        .background().fill("#000 0.5");

      // set container id for the chart
      chart.container('container');

      // initiate chart drawing
      chart.draw();
    };
