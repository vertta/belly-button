
//function that initializes the dashboard populates meta data and, updates the dashboard

function demographicInfo(sample) {
   
    d3.json("../data/samples.json").then((data) => {
        //grab all of the meta data
        var metaData=data.metadata;
       // console.log(metaData)  for trobleshooting

       //filter based on value of the sample
       var result = metaData.filter(sampleResult => sampleResult.id == sample);
       var resultData = result[0];
       //call the function to build the metadata

       // -- for testing console.log(resultData );
       d3.select("#sample-metadata").html(""); //clear the selection
       d3.html('');
          

        //use Object.entries to get the value key pairs 
        Object.entries(resultData).forEach(([key,value]) =>{
       
            // add sample data / demographics section
        d3.select("#sample-metadata")
            .append("h5").text(`${key}: ${value}`);  // add to the demographic section for sample data

       });
    });
} // end demographicInfo function
//---------------------------------------------------
//function that builds the graphs 

function buildBarChart(sample){
   

    d3.json("../data/samples.json").then((data) => {
        //grab all of the meta data
        var sampleData=data.samples;
       //console.log(sampleData) // for trobleshooting

       //filter based on value of the sample
       var result = sampleData.filter(sampleResult => sampleResult.id == sample);
       
       var resultData = result[0]; // access index 0 from array


       //d3.select("#sample-metadata").html(""); //clear the selection
       //call the function to build the metadata


        //get otu ids
        var otu_ids = resultData.otu_ids;
        var otu_labels = resultData.otu_labels;
        var sample_values = resultData.sample_values;
      

        // build the bar chart
        var yTicks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        var xValues = sample_values.slice(0,10);
        var textLabels = otu_labels.slice(0,10);
       
        var barChart = {
            y: yTicks,   
            x: xValues,
            text: textLabels,
            type: "bar",
            orientation : "h"
        }

        var layout = {
            title : " Top 10 Belly Button Bacteria",
            yaxis: {autorange: 'reversed'}
    
        };

        Plotly.newPlot("bar",[barChart], layout);

        //use Object.entries to get the value key pairs 
       // Object.entries(resultData).forEach(([key,value]) =>{
       
            // add sample data / demographics section
       // d3.select("#sample-metadata")
        //    .append("h5").text(`${key}: ${value}`);
       //});
    });

} // end of buildBarChart Function
    
//------------------------------------------------
// function that builds bubble chart 
function buildBubbleChart (sample) {

    d3.json("../data/samples.json").then((data) => {
        //grab all of the meta data
        var sampleData=data.samples;
       //console.log(sampleData) // for trobleshooting

       //filter based on value of the sample
       var result = sampleData.filter(sampleResult => sampleResult.id == sample);
       
       var resultData = result[0]; // access index 0 from array


       //d3.select("#sample-metadata").html(""); //clear the selection
       //call the function to build the metadata


        //get otu ids
        var otu_ids = resultData.otu_ids;
        var otu_labels = resultData.otu_labels;
        var sample_values = resultData.sample_values;

       
       
        var bubbleChart = {
            y: sample_values,   
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size : sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        var layout = {
            title : "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis:{title: "OTU ID"},
            autosize: true,
            height: 600 
        };

        Plotly.newPlot('bubble',[bubbleChart], layout);

  });
}

//----------------------------------------------

// function that builds gauge
function buildGauge(sample) {

    d3.json("../data/samples.json").then((data) => {
        //grab all of the meta data
        var metaData=data.metadata;
      
       //filter based on value of the sample
       var result = metaData.filter(sampleResult => sampleResult.id == sample);
       var resultData = result[0];
       //call the function to build the metadata


        var wfreqs = resultData.wfreq  //grab wash frequency from meta data
       
        // create gauge with wfreq values 
        var gaugeChart = {
            domain: {x: [0,1],y:[0,1]},   
            value : wfreqs,
            title: { text: "Wash Frequency" },
            type: "indicator",
            mode: "gauge+number",
            autosize: true
            };
    
        
        var layout = { 
            width: 600, 
            title : "Scrubs Per week",
            height: 500,
             margin: { t: 0, b: 0 }
             };

             //plot values on chart and display on page
        Plotly.newPlot('gauge',[gaugeChart], layout);

      });
    

}

//--------------------------------function that initializes the dashboard

function initialize() {
    //access the drop down selectior from the index.html file 
    var select = d3.select ("#selDataset");

    //use d3.json in order to get the data 
    d3.json("../data/samples.json").then((data) =>  {
    var sampleNames = data.names; //made an array of just the names  

        // use for each in order to create options for each sample in the selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
         //when initialized , pass in the information for the first sample

        var sample1 = sampleNames[0];
        //call the function to build the metadata
        demographicInfo(sample1);

        // call function to build barchart
        buildBarChart(sample1);

        // call function to build bubble chart
        buildBubbleChart(sample1);

         // call function to Gauge
        buildGauge(sample1);
     });      
} //end of Initialize Function 
//------------------------------------------------

//function that updates the dashboard 
function optionChanged(item){
        //call update to meta data to pass in value of item
        demographicInfo(item);
        
        //call the function to build the barchart 

        buildBarChart(item);

        // call function to build bubble chart 
        buildBubbleChart(item);
    // call function to build Gauge
        buildGauge(item)
}  // end of optionChaned function
//----------------------------

initialize();    //call the initialized function

    