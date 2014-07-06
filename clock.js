var width = 960;
var height = 960;
var centerX = width/2;
var centerY = height/2;

var getTranslate = function(tick){
  var angle = (360/(60/tick) * Math.PI) / 180;
  var x = centerX + (420 * Math.sin(angle));
  var y = centerY - (420 * Math.cos(angle));
  return 'translate('+ x + ", " + y + ")";
};

var svg = d3.select('#clock').append('svg')
            .attr('width', width)
            .attr('height', height)


svg.append('circle')
  .attr('r', 10)
  .attr('transform', function(d){return 'translate(480, 480)'});

var update_clock = function(){
  date = new Date()
  hour = (date.getHours() % 12) * 5 // Standardize around 60
  minute = date.getMinutes()
  second = date.getSeconds()

  time_data = [{'value': hour, 'radius': 60, 'color': 'cyan'},
               {'value': minute, 'radius': 40, 'color': 'magenta'},
               {'value': second, 'radius': 20, 'color': 'yellow'}]

  nodes = svg.selectAll('.node')
      .data(time_data)

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

var foo = function(){
  console.log('foo')
  update_clock()
  setTimeout(foo, 500)
}

foo()
