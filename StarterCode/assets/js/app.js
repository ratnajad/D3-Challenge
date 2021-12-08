// @TODO: YOUR CODE HERE!
//completed with TA Nathan Darter on 11/19

var svgWidth = 800;
var svgHeight = 450;

var margin = {
    top: 30,
    bottom: 60,
    left: 100,
    right: 30
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    /*
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 50)
    */

d3.csv("assets/data/data.csv").then((censusData) => {
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    var xScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.poverty) - 1, d3.max(censusData, d => d.poverty) + 2])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.healthcare)])
        .range([height, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    chartGroup.append("g")
        .call(yAxis)

    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "skyblue")
        .attr("opacity", "0.9")
    
    chartGroup.append("g")
        .selectAll("text")
        .data(censusData)
        .enter()
        .append("text")
        .classed(".stateText", true)
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty) - 10)
        .attr("y", d => yScale(d.healthcare) + 5)
        .attr("fill", "white")
        .attr("font-size", "15px")

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 18)
        .attr("x", 0 - (height / 2) - 80)
        .attr("class", "axisText")
        .attr("font-size", "20px")
        .text("Lacks Healthcare (%)")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2 - 60}, ${height + margin.top - 13})`)
        .attr("class", "axisText")
        .attr("font-size", "20px")
        .text("Poverty (%)")

}).catch(function(error) {
    console.log(error);
})
