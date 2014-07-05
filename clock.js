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

time_data = [hour, minute, second]

svg.selectAll('.node')
  .data(time_data)
