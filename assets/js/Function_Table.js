// function to generate table of the query results underneath the venn diagram
// disclaimer: due to unknown reasons the html index wouldn't update the function name, so the function does not work at the moment

async function GenTable(dis1, dis2, comp, names) {

    //output arrays for Venn diagram
    var AB = new Array(), A = new Array(), B = new Array(); //array for storing and counting items retreived by queries.js 

    // calls retrieve function from query.js file based on user inputs. Specific query called is based on comparison condition,
    //results1 and reuslts2 will hold data for dis1 and dis2 respectively
    if (comp == "treat") {
        compName = "Treatments";
        var results1 = await TreatQuery(dis1);
        var results2 = await TreatQuery(dis2);
    } else if (comp == "symp") {
        compName = "Symptoms";
        var results1 = await SymptQuery(dis1);
        var results2 = await SymptQuery(dis2);
    } else if (comp == "gene") {
        compName = "Genes";
        var results1 = await GeneQuery(dis1);
        var results2 = await GeneQuery(dis2);
    } else if (comp == "struct") {
        compName = "Brain structures";
        var results1 = await StructQuery(dis1);
        var results2 = await StructQuery(dis2);
    } else { alert('selected condition cannot be found') }


    // loops through data in both reults1 and results2 and checks if item are identical, if true adds to AB array
    for (let i in results1) { for (let j in results2) { if (results1[i] == results2[j]) { AB.push(results2[j]); } } }

    // loops through results 1. If element is not already in AB or A, assigns item to A 
    for (var i in results1) { if (!(AB.includes(results1[i])) && !(A.includes(results1[i]))) { A.push(results1[i]); } }

    // loops through results 2. If element is not already in AB or B, assigns item to B 
    for (var j in results2) { if (!(AB.includes(results2[j])) && !(B.includes(results2[j]))) { B.push(results2[j]); } }

    //get disease names from 'names' map    
    let dis1name = names.get(dis1);
    let dis2name = names.get(dis2);

    // creates variable and sets it to length of longest array for outer for-loop
    var longestArray;
    if(A.length>B.length && A.length>AB.length){
        longestArray = A.length;
    }
    else if(B.length>A.length && B.length>AB.length){
        longestArray = B.length;
    }
    else{
        longestArray = AB.length;
    }    
    
    var caseData;
    //checks if theres overlap or not, then constructs array with all relevant data to loop through
    if(AB.length==0){
        allData = [A, B];
        caseData = "noAB";
    }
    else if(A.length==0){
        allData = [AB, B];
        caseData = "noA";
    }
    else if(B.length==0){
        allData = [A, AB];
        caseData = "noB";
    }
    else{
        allData = [A, AB, B];
        caseData = "all";
    }
        
    // get the reference for the body
    var body = document.getElementById("table");
   
    // creates a <table> element, <thead> element and <tbody> element
    var tbl = document.createElement("table");
    var tblhead = document.createElement("thead");
    var tblBody = document.createElement("tbody");
    
    // sets table headings depending on overlap case
    
    switch(caseData){
        case "noA":{
            var hd2 = document.createElement("th");
            var hd3 = document.createElement("th");
            var rowhd = document.createElement("tr");
            var hd2text = document.createTextNode("Overlap in " + compName + " between " + dis1name + " and " + dis2name);
            var hd3text = document.createTextNode(compName + " associated with " + dis2name);
            hd2.appendChild(hd2text);
            hd3.appendChild(hd3text);
            rowhd.appendChild(hd2);
            rowhd.appendChild(hd3);
            tblhead.appendChild(rowhd);
            tbl.appendChild(tblhead);
            break;
        } 
        case "noB":{
            var hd1 = document.createElement("th");
            var hd2 = document.createElement("th");
            var rowhd = document.createElement("tr");
            var hd1text = document.createTextNode(compName + " associated with " + dis1name);
            var hd2text = document.createTextNode("Overlap in " + compName + " between " + dis1name + " and " + dis2name);
            hd1.appendChild(hd1text);
            hd2.appendChild(hd2text);
            rowhd.appendChild(hd1);
            rowhd.appendChild(hd2);
            tblhead.appendChild(rowhd);
            tbl.appendChild(tblhead);
            break;
        }
        case "noAB":{
            var hd1 = document.createElement("th");
            var hd3 = document.createElement("th");
            var rowhd = document.createElement("tr");
            var hd1text = document.createTextNode(compName + " associated with " + dis1name);
            var hd3text = document.createTextNode(compName + " associated with " + dis2name);
            hd1.appendChild(hd1text);
            hd3.appendChild(hd3text);
            rowhd.appendChild(hd1);
            rowhd.appendChild(hd3);
            tblhead.appendChild(rowhd);
            tbl.appendChild(tblhead);
            break;
        }
        case "all":{
            var hd1 = document.createElement("th");
            var hd2 = document.createElement("th");
            var hd3 = document.createElement("th");
            var rowhd = document.createElement("tr");
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
            break;
        }
    }
    //loops through data and constructs the cells and rows to form the table
    for (var j = 0; j<longestArray; j++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var i = 0; i < allData.length; i++) {
            var cell = document.createElement("td");
            //checks if array has entry at index j, otherwise puts blank
            if(allData[i][j]==undefined){
                var cellText = document.createTextNode(" ");
            }
            else{
                var cellText = document.createTextNode(allData[i][j]);
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
    // appends <table> into <div id="table">
    body.appendChild(tbl);   
}
