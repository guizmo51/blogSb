$( document ).ready(function() {

	var data = [{"id":"2015-12","val":17},{"id":"2015-11","val":20},{"id":"2015-10","val":6},{"id":"2015-09","val":5},{"id":"2015-08","val":9},{"id":"2015-07","val":5},{"id":"2015-06","val":5},{"id":"2015-05","val":6},{"id":"2015-04","val":4},{"id":"2015-03","val":5},{"id":"2015-02","val":3},{"id":"2015-01","val":9},{"id":"2014-12","val":2},{"id":"2014-11","val":8},{"id":"2014-10","val":8},{"id":"2014-09","val":6},{"id":"2014-08","val":1},{"id":"2014-07","val":2},{"id":"2014-06","val":1},{"id":"2014-05","val":4},{"id":"2014-04","val":3},{"id":"2014-03","val":3},{"id":"2014-02","val":1},{"id":"2014-01","val":6},{"id":"2013-12","val":4},{"id":"2013-11","val":1},{"id":"2013-10","val":1},{"id":"2013-09","val":3},{"id":"2013-06","val":2},{"id":"2013-05","val":4},{"id":"2013-04","val":4},{"id":"2013-03","val":2}];
/**/
var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,
    responsive: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
var labels = [];
var values = [];
for (var x= data.length-1; x>=0; x--){
	labels.push(data[x].id)
	values.push(data[x].val);
}

var data = {
    labels: labels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: values
        }
    ]
}; 
var ctx = document.getElementById("myChart").getContext("2d");
var myBarChart = new Chart(ctx).Bar(data, options);

});