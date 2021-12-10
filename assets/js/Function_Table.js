async function TableData(dis1, dis2, comp, names) {

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
    for (let i in results1) { for (let j in results2) { if (results1[i] == results2[j]) { AB.push(results2[j]); } } }

    // loops through results 1. If element is not already in AB or A, assigns item to A 
    for (var i in results1) { if (!(AB.includes(results1[i])) && !(A.includes(results1[i]))) { A.push(results1[i]); } }

    // loops through results 2. If element is not already in AB or B, assigns item to B 
    for (var j in results2) { if (!(AB.includes(results2[j])) && !(B.includes(results2[j]))) { B.push(results2[j]); } }

    // computes relative size of the diagram parts (A, B, AB). 
    var AB_total = A.length + B.length + AB.length;
    var A_size = parseInt(A.length / AB_total * 100);
    var B_size = parseInt(B.length / AB_total * 100);
    var AB_size = parseInt(AB.length / AB_total * 100);

    //get disease names from 'names' map    
    let dis1name = names.get(dis1);
    let dis2name = names.get(dis2);

    // creates array of entry arrays and determines longest one
    var allData = [A, AB, B], longestArray;
    if(A_size>B_size && A_size>AB_size){
        longestArray = A_size;
    }
    else if(B_size>A_size && B_size>AB_size){
        longestArray = B_size;
    }
    else{
        longestArray = AB_size;
    }
    console.log(allData);
    console.log(longestArray);
    // get the reference for the body
    var body = document.getElementsByTagName("table");
    
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblhead = document.createElement("thead");
    var tblBody = document.createElement("tbody");
    
    // sets table headings
    var hd1 = document.createElement("th");
    var hd2 = document.createElement("th");
    var hd3 = document.createElement("th");
    var hd1text = document.createTextNode(compName + " associated with " + dis1name);
    var hd2text = document.createTextNode("Overlap in " + compName + " between " + dis1name + " and " + dis2name);
    var hd3text = document.createTextNode(compName + " associated with " + dis2name);
    hd1.appendChild(hd1text);
    hd2.appendChild(hd2text);
    hd3.appendChild(hd3text);
    rowhd.appendChild(hd1);
    rowhd.appendChild(hd2);
    rowhd.appendChild(hd3);
    tblhead.appendChild(rowhd);
    tbl.appendChild(tblhead);
    console.log("head");

    // creating all cells
    for (var j = 0; j<longestArray; j++) {
        // creates a table row
        var row = document.createElement("tr");
    
        for (var i = 0; i < 2; i++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        if(j in allData[i]){
            var cellText = document.createTextNode(allData[][]);
        }
        else{
            var cellText = document.createTextNode(" ");
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        }
    
        // add the row to the end of the table body
        tblBody.appendChild(row);
        console.log("body");
    }
    
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    
}
