$(function(){
  console.log('hi')
})

var width = 960
var height = 960

var svg = d3.select('#clock').append('svg')
            .attr('width', width)
            .attr('height', height)
