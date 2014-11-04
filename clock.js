var colorClock = function(){

  var diameter = 960;
  var radius = diameter/2;

  var twelve = {x1: 480, y1: 1, x2: 480, y2: 10}
  var nine = {x1: 0, y1: 480, x2: 10, y2: 480}
  var three = {x1: 960, y1: 480, x2: 950, y2: 480}
  var six = {x1: 480, y1: 950, x2: 480, y2: 960}
  var clockMarkerPoints = [twelve, nine, three, six] 

  var getTranslate = function(tick){
    var angle = (360/(60/tick) * Math.PI) / 180;
    var x = radius + (360 * Math.sin(angle));
    var y = radius - (360 * Math.cos(angle));
    return 'translate('+ x + ", " + y + ")";
  };

  var drawClockMarkers = function(svg, points){
    for(var i=0; i < points.length; i++){
      var clockMarker = points[i];
      svg.append('line')
      .attr('stroke', 'white')
      .attr('stroke-width', '5')
      .attr('x1', clockMarker.x1)
      .attr('y1', clockMarker.y1)
      .attr('x2', clockMarker.x2)
      .attr('y2', clockMarker.y2)
    }
  }

  var updateClock = function(){
    date = new Date()
    hour = (date.getHours() % 12) * 5 // Standardize around 60
    minute = date.getMinutes()
    second = date.getSeconds()

    time_data = [{'value': hour, 'radius': 120, 'color': 'blue'},
      {'value': minute, 'radius': 100, 'color': 'yellow'},
      {'value': second, 'radius': 80, 'color': 'crimson'}]

    nodes = svg.selectAll('.node').data(time_data)

    nodes.attr('transform', function(d){return getTranslate(d.value)});

    new_nodes = nodes
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function(d){return getTranslate(d.value)});

    new_nodes.append('circle')
    .attr('r', function(d){ return d.radius; })
    .attr('fill', function(d){return d.color; })
    .attr('fill-opacity', '0.3');
  }

  var svg = d3.select('#clock').append('svg')
    .attr('width', diameter)
    .attr('height', diameter)

  svg.append('circle')
    .attr('r', radius)
    .attr('fill', 'lightgrey')
    .attr('opacity', 0.4)
    .attr('transform', function(d){return 'translate(480, 480)'});

  svg.append('circle')
    .attr('r', 5)
    .attr('fill', 'white')
    .attr('transform', function(d){return 'translate(480, 480)'});

  drawClockMarkers(svg, clockMarkerPoints);


  var run = function(){
    updateClock()
    setTimeout(run, 1000)
  }

  return { 
    init: run
  }
}

colorClock().init();


