//Purpose: queries.js contains functions that assemble Wikidata queries as strings based on user input and retreive data from
//the wikidata server based on the assembled queries. 'XQuery' functions assemble queries based on the input (disease) for their respective 
//comparison condition (treatments, symptoms, genes, structures). The 'Retreive' functions carries out a wikidata search based on the query string
//it receives and reurns data in an 'array'. 


//query building function for Treatments
//input: 'disease' stores Q-value of selected disease
//output: Treatments for 'disease' as an array
async function TreatQuery(disease) {
    var treat_query = `SELECT ?itemLabel	
                        WHERE {wd:` + disease + ` wdt:P2176 ?item. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel
                        ORDER BY ASC(?itemLabel)`; //adds the Q-value of selected disease to query string
                                                   //GROUP BY removes possible duplicates, ORDER BY arranges items in alphabetical order    
    var treatments = await Retrieve(treat_query);  //calls Retreive function to retreive data
    //console.log(treatments); //only for debugging
    return treatments; //returns data
}


//query building function for Symptoms
//input: 'disease' stores Q-value of selected disease
//output: Symptoms of 'disease' as an array
async function SymptQuery(disease) {
    var sympt_query = `SELECT ?itemLabel	
                        WHERE {wd:` + disease + ` wdt:P780 ?item. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`;//adds the Q-value of selected disease to query string
                                                  //GROUP BY removes possible duplicates, ORDER BY arranges items in alphabetical order    
    var symptoms = await Retrieve(sympt_query); //calls Retreive function to retreive data
   // console.log(symptoms); //only for debugging
    return symptoms;
}


//query building function for Genetic associatons
//input: 'disease' stores Q-value of selected disease
//output: Genes assosiacted with 'disease' as an array
async function GeneQuery(disease) {
    var gene_query = `SELECT ?itemLabel 
                        WHERE {wd:` + disease + ` wdt:P2293 ?item. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`;//adds the Q-value of selected disease to query string
                                                  //GROUP BY removes possible duplicates, ORDER BY arranges items in alphabetical order    
    //console.log(gene_query); //only for debugging
    var genes = await Retrieve(gene_query); //calls Retreive function to retreive data
    //console.log(genes); //only for debugging
    return genes;
}


//query building function for Brain structures
//input: 'disease' stores Q-value of selected disease
//output: Brain structures associated with 'disease' as an array
async function StructQuery(disease) {
    var struct_query = `SELECT ?itemLabel 
                        WHERE {
                        wd:` + disease + ` wdt:P2293 ?gene. 
                        ?gene wdt:P5572 ?item.
                        VALUES (?regions) {(wd:Q1620186) (wd:Q1073)}.
                        ?item wdt:P31|wdt:P2791 ?regions. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`; //adds the Q-value of selected disease to query string
                                                   //GROUP BY removes possible duplicates, ORDER BY arranges items in alphabetical order 
    var structures = await Retrieve(struct_query); //calls Retreive function to retreive data
    //console.log(structures); //only for debugging
    return structures;
}


//General function for retreiving data from Wikidata server and to transform data into 'array'
//input: query as string (assembled in 'XQuery functions)
//output: retreived data items as array
async function Retrieve(query) {
    let url = wdk.sparqlQuery(query);                      //create wikidata URL based on the recieved query string 
    let response = await fetch(url);                       //retreive data from the server
    let results = await response.json();                   //read and parse data as JSON
    let final = await wdk.simplify.sparqlResults(results); //simplifies JSON object for easier handling
     // console.log(final); //only for debugging
    
    let items = Array();                                   //create empty array for retreived items 
    for (let row in final){                                //loop thorugh items in 'final' and converts them to array items 
        items.push(final[row].itemLabel);                 
    }
    return items;                                        
}
