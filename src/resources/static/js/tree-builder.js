// import * as d3 from "d3";
import {selectText} from "./editor.js";
/**
 * @param {any} data
 */
export function generateTree(data) {
  //console.log(input);
  const f = document.getElementById("tree-cont");
  // @ts-ignore
  d3.selectAll('svg').remove();
  // Assigns parent
  // @ts-ignore
  var nodes = d3.hierarchy(data);


  var margin = {top: 40, right: 10, bottom: 50, left: 10},
    w = ((nodes.height + 10) * 100) - margin.right - margin.left,
    h = nodes.height * 100


  // append the svg object to the body of the page
  // @ts-ignore
  var svg = d3.select(f).append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom);


  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var g = svg.append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

  // declares a tree layout and assigns the size
  // @ts-ignore
  var tree = d3.tree()
    .size([w, h]);
  // Assigns the x and y position for the nodes
  nodes = tree(nodes);

  // adds the links between the nodes
  g.selectAll(".link")
    .data(nodes.descendants().slice(1))
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", (d) => {
			// @ts-ignore
			return `M${d.x},${d.y}C${d.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${d.parent.y}`;
    })
    .attr('fill', 'none')
    .attr('stroke', '#438440')
    .attr('stroke-width', 1.5);

  // adds each node as a group
  var node = g.selectAll('.node')
    .data(nodes.descendants())
    .enter()
    .append('g')
    .attr('class', (d) => {
      return "node" +
        (d.children ? " node--internal" : " node--leaf");
    })
    // @ts-ignore
    .attr("transform", (d) => `translate(${d.x},${d.y})`);


  node.append('circle')
    .attr('r', 9)
    .attr('fill', 'grey');

  node.append("text")
    .attr("dy", 5)
    .style('font-size', "17px")
    .attr("x", -10)           // set x position of left side of text
    .attr("y", 0)
    .attr('font-family', "Roboto")
    .attr("align-content", 'left')
    .attr("text-anchor", "left")
    .style("text-anchor", (d) => d.children ? "end" : "start")
    .text((d) => d.data.type);

  node.on('mouseover', function () {
    // @ts-ignore
    var g = d3.select(this); // The node
    // The class is used to remove the additional text later
    var info = g
      .append("text")
      .attr('font-family', 'Roboto')
      .attr('color', 'grey' )
      .classed("info", true)
      .attr("x", -20)
      .attr("y", 35)
      .text((d) => d.data.meta.join(", "));
  });

  node.on('mouseout', function () {
    // @ts-ignore
    d3.select(this)
      .select("text.info")
      .remove();

  });

  node.on('click', function () {
    //@ts-ignore
   d3.select(this).each(function (e) {
     selectText(e.data.position);
    });
  });

}
