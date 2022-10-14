
//function that initializes the dashboard

//function that updates the dashboard

//function that populates the meta data

function demoInfo(sample) {
   
    d3.json("../samples.json").then((data) => {
        //grab all of the meta data
        let metaData=data.metadata;
       // console.log(metaData)  for trobleshooting

       //filter based on value of the sample
       let result = metaData.filter(sampleResult => sampleResult.id == sample);
       let resultData = result[0];
       //call the function to build the metadata

       // -- for testing console.log(resultData );
       d3.select("#sample-metadata").html(""); //clear the selection

        //use Object.entries to get the value key pairs 
        Object.entries(resultData).forEach(([key,value]) =>{
       
            // add sample data / demographics section
        d3.select("#sample-metadata")
            .append("h5").text(`${key}: ${value}`);
       });
    });
}
//---------------------------------------------------
//function that builds the graphs 

function buildBarChart(sample){
    //console.log(sample)

    //let sampleData = d3.json("samples.json");
    //console.log(data); 

    d3.json("../samples.json").then((data) => {
        //grab all of the meta data
        let sampleData=data.samples;
       // console.log(metaData)  for trobleshooting

       //filter based on value of the sample
       let result = sampleData.filter(sampleResult => sampleResult.id == sample);
       let resultData = result[0];
       //call the function to build the metadata

        console.log(resultData );

        //get otu ids
        let out_ids = resultData.out_ids;
        let out_labels = resultData.out_labels
        let sample_values = resultData.sample_values;
        console.log(out_ids);
        console.log(out_labels);
        console.log(sample_values);

       //d3.select("#sample-metadata").html(""); //clear the selection

        //use Object.entries to get the value key pairs 
       // Object.entries(resultData).forEach(([key,value]) =>{
       
            // add sample data / demographics section
       // d3.select("#sample-metadata")
        //    .append("h5").text(`${key}: ${value}`);
       //})
    });

} // end of buildBarChart Function
    
//------------------------------------------------

//function that initializes the dashboard

function initialize() {
    //let data = d3.json("samples.json");
    //console.log(data); 
    // load the data from the json file
    
    //console.log(data);
    //access the drop down selectior from the index.html file 
    var select = d3.select ("#selDataset");

    //use d3.json in order to get the data 
    d3.json("../samples.json").then((data) =>  {
    let sampleNames = data.names; //made an array of just the names  
    //console.log(sampleNames);    // output array on names to the console

        // use for each in order to create options for each sample in the 
        //selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
         //when initialized , pass in the information for the first sample

        let sample1 = sampleNames[0];
        //call the function to build the metadata
        demoInfo(sample1);

        // call function to build barchart
        buildBarChart(sample1);
     });      
} //end of Initialize Function 
//------------------------------------------------

//function that updates the dashboard 
function optionChanged(item){
        //call update to meta data to pass in value of item
        demoInfo(item);
        
        //call the function to build the barchart 

        buildBarChart(item);
}  // end of optionChaned function
//----------------------------

initialize();    //call the initialized function

    