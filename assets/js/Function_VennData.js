//Purpose: VennData functions is ued to retreive data, compute and assign Venn-diagram specifications (size, text),
//and display the specified Venn-diagrams in the indicated container.
//Inputs: 'dis1' and 'dis2' are the diseases selected by the user for comparison, 'comp' is the comparison condition selected by the user,
//'names' is a map connecting diseasse names with their respective Q values

//calls the correct queries to retreive data, computes Venn-digram compartment sizes and returns json object with digram specifications 
async function VennData(dis1, dis2, comp, names) {

    //output arrays for Venn diagram
    var AB = new Array(), A = new Array(), B = new Array(); //array for storing and counting items retreived by queries.js 
    var contDiagA = "", contDiagB = "", contDiagAB = ""; //strings used as output for the items retreived by queries.js



    // calls retrieve function from query.js file based on user inputs. Specific query called is based on comparison condition,
    //results1 and reuslts2 will hold data for dis1 and dis2 respectively
    if (comp == "treat") {
        compName = "treatments";
        var results1 = await TreatQuery(dis1);
        var results2 = await TreatQuery(dis2);
    } else if (comp == "symp") {
        compName = "symptoms";
        var results1 = await SymptQuery(dis1);
        var results2 = await SymptQuery(dis2);
    } else if (comp == "gene") {
        compName = "genes";
        var results1 = await GeneQuery(dis1);
        var results2 = await GeneQuery(dis2);
    } else if (comp == "struct") {
        compName = "brain structures";
        var results1 = await StructQuery(dis1);
        var results2 = await StructQuery(dis2);
    } else { alert('selected condition cannot be found') }




    // loops through data in both reults1 and results2 and checks if item are identical, if true adds to AB array
    for (let i in results1) {
        for (let j in results2) {
            if (results1[i] == results2[j]) {
                AB.push(results2[j]);
            }
        }
    }

    // loops through results 1. If element is not already in AB or A, assigns item to A 
    for (var i in results1) {
        if (!(AB.includes(results1[i])) && !(A.includes(results1[i]))) {
            A.push(results1[i]);
        }
    }

    // loops through results 2. If element is not already in AB or B, assigns item to B 
    for (var j in results2) {
        if (!(AB.includes(results2[j])) && !(B.includes(results2[j]))) {
            B.push(results2[j]);
        }
    }

    // computes relative size of the diagram parts (A, B, AB). 
    var AB_total = A.length + B.length + AB.length;
    var A_size = parseInt(A.length / AB_total * 100);
    var B_size = parseInt(B.length / AB_total * 100);
    var AB_size = parseInt(AB.length / AB_total * 100);

    // construct string of items in A, B and AB arrays for output. Items in the strings are sperarated by newline 
    for (let n in A) {
        contDiagA += A[(n)];
        contDiagA += '\n';
    }

    for (var m in B) {
        contDiagB += B[m];
        contDiagB += '\n';
    }

    for (var j in AB) {
        contDiagAB += AB[j];
        contDiagAB += '\n';
    }

    //get disease names from 'names' map    
    let dis1name = names.get(dis1);
    let dis2name = names.get(dis2);


    //save Venn-diagram specifications as an array of 3 json objects (one object for each compartment)
    var data = [
        {
            x: 'A',
            value: A_size,
            name: contDiagA,
            tooltipTitle: dis1name,
            normal: { fill: "#8ecafb 0.7" },
            hovered: { fill: "#8ecafb 1" },
            selected: { fill: "#8ecafb 1.3" }
        },
        {
            x: 'B',
            value: B_size,
            name: contDiagB,
            tooltipTitle: dis2name,
            normal: { fill: "#ffeaa6 0.7"},
            hovered: { fill: "#ffeaa6 1"},
            selected: { fill: "#ffeaa6 1.3"}
        },
        {
            x: ['A', 'B'],
            value: AB_size,
            name: contDiagAB,
            tooltipTitle: compName + ' associated with both ' + dis1name + ' and ' + dis2name,
            normal: { fill: "#9fdebe 0.8" },
            hovered: { fill: "#9fdebe 1" },
            selected: { fill: "#9fdebe 1.3" },
            hatchFill: {
            type: "weave",
            color: "#83c3a3"
            }
        }
    ]
                     
    // set chart theme
    anychart.theme('pastel');

    // create venn diagram
    var chart = anychart.venn(data);

    // set chart title
    chart
        .title()
        .enabled(true)
        .fontFamily('Roboto, sans-serif')
        .fontSize(24)
        .padding({ bottom: 30 })
        .text('Overlap in ' + compName + ' between ' + dis1name + ' and ' + dis2name + ':');
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
    chart.container("container");

    // initiate chart drawing
    chart.draw();
};
