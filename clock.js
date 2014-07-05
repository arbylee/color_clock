$(function(){
  console.log('hi')
})

var width = 960
var height = 960

var svg = d3.select('#clock').append('svg')
            .attr('width', width)
            .attr('height', height)

date = new Date()
hour = date.getHours() * 5 // Standardize around 60
minute = date.getMinutes()
second = date.getSeconds()

time_data = [{'value': hour, 'radius': 60, 'color': 'cyan'},
             {'value': minute, 'radius': 40, 'color': 'magenta'},
             {'value': second, 'radius': 20, 'color': 'yellow'}]

var node = svg.selectAll('.node')
    .data(time_data)
  .enter().append('g')
    .attr('class', 'node')

node.append('circle')
  .attr('r', function(d){ return d.radius; })
  .attr('fill', function(d){return d.color; })
  .attr('fill-opacity', '0.3')
