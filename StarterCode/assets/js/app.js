// Load data from CSV file
d3.csv("assets/data/data.csv").then(function(stateData) {
  console.log(stateData);

  // log states
  var states = stateData.map(data => data.state);
  console.log("States", states);
  
  // Create svg rectangle for chart
  var margin = {top: 30, right: 30, bottom: 80, left: 80},
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

  var svg = d3.select("#scatter")
      .append("svg")
          .attr("height", height + margin.top + margin.bottom)
          .attr("width", width + margin.left + margin.right)
      .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  // Create axes
  var xScale = d3.scaleLinear()
      .domain([0, 45])
      .range([0, width])

  var yScale = d3.scaleLinear()
      .domain([0, 28])
      .range([height, 0]);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
  svg.append("g")
      .call(d3.axisLeft(yScale));

  // append to page
  var circlesGroup = svg.append("g")
      .selectAll("dot")
      .data(stateData)
      .enter()
      .append("circle")
          .attr("cx", function(d) { return xScale(d.obesity);})
          .attr("cy", function(d) { return yScale(d.poverty);})
          .attr("r", 10)
          .attr("fill", "blue")
          .attr("opacity", ".75")

  // Add datapoint labels (states)
  svg.selectAll("dot")
      .data(stateData)
      .enter()
      .append("text")
      .text(function(d) { 
          return d.abbr;
      })
      .attr("x", function(d) {
          return xScale(d.obesity);
      })
      .attr("y", function(d) {
          return yScale(d.poverty);
      })
      .attr("font-family", "arial")
      .attr("font-size", "9px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")

  // Add label axes
  var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "black")
      .text("Obesity (%)");

      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 35)
      .attr("x", 0 - (height / 2))
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "black")
      .text("Poverty (%)");

  // Create tooltips
  var toolTip = d3.select("body").append("div")
      .attr("class", "tooltip");
  
  circlesGroup.on("mousover", function(d, i) {
      toolTip.style("display", "block")
      toolTip.html(`State: <strong>${d.state[i]}</strong><br></br><h3>Poverty Rate: ${d.poverty}</h3><h3>Obesity Rate: ${d.obesity}`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
  })

  .on("mouseout", function() {
      toolTip.style("display", "none");
  });
  
});
