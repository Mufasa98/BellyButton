function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let metadata = data.metadata;
    sample_obj = metadata.filter(sampleNumber => sampleNumber.id == sample)[0];
    let panel = d3.select('#sample-metadata')
    panel.html('')
    for (i in sample_obj) {
      panel.append('h6').text(`${i}: ${sample_obj[i]}`);
    }
    let Guage = {
      type: 'indicator',
      mode: 'gauge+number',
      value: sample_obj.wfreq,
      gauge: {
        axis:{range: [0, 9] },
        steps: [
          { range: [0, 1], color: '#BED78C'},
          { range: [1, 2], color: '#B0CF8B'},
          { range: [2, 3], color: '#9FC488'},
          { range: [3, 4], color: '#8FBC6E'},
          { range: [4, 5], color: '#9FD12B'},
          { range: [5, 6], color: '#9ECD2F'},
          { range: [6, 7], color: '#A1CB2D'},
          { range: [7, 8], color: '#8DC42E'},
          { range: [8, 9], color: '#82A24C'}
          
        ],
      threshold: {
        line: {color: 'red', width: 4},
        thickness: 0.75,
        value: sample_obj.wfreq
      }
      }
    };
    
    let layout = {
      width: 600,
      height: 400,
      title: 'Belly Button Washing Frequency per Week'

    };
  Plotly.newPlot('gauge', [Guage], layout)
  });
}

function buildCharts(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

    let bubbleData = {
      x: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].otu_ids,
      y: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].sample_values,
      text: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].otu_labels,
      mode: 'markers',
      marker: {
        size: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].sample_values
      }
    };
    
    let bubbleLayout = {
      height: 500,
      width: 1000,
      xaxis: {title: {
        text: 'OTU ID'

      }}
    };

    Plotly.newPlot("bubble", [bubbleData], bubbleLayout,{responsive:true});
    let barData = {
        x: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].sample_values.slice(0,10).reverse(),
        y: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
        text: data.samples.filter(sampleNumber => sampleNumber.id == sample)[0].otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
      };
      
      Plotly.newPlot("bar", [barData],{responsive:true});

  });
};

function init() {
  let dropdown = d3.select('#selDataset');
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let sampleNames = data.names;
    
    for (let i = 0; i < sampleNames.length; i++) {
      dropdown.append('option').property('value', sampleNames[i]).text(sampleNames[i]);
    };
  buildMetadata(sampleNames[0]);
  buildCharts(sampleNames[0]);
  })};

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
};

init();