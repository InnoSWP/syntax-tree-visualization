// import * as d3 from "d3";

export function generateTree(data) {
    //console.log(input);
    const f = document.getElementById("tree-cont");
    d3.selectAll('svg').remove();

    // Assigns parent
    var nodes = d3.hierarchy(data);


    var margin = {top: 40, right: 10 , bottom: 50, left: 10},
        w = ((nodes.height + 10)*100) - margin.right - margin.left,
        h = nodes.height*100



    // append the svg object to the body of the page
    var svg = d3.select(f).append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom);




    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var g = svg.append('g')
        .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');

    // declares a tree layout and assigns the size
    var tree = d3.tree()
        .size([w, h]);

    // Assigns the x and y position for the nodes
    nodes = tree(nodes);
    console.log(nodes);


    // adds the links between the nodes
    g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", (d) => {
            return "M" + d.x + "," + d.y
                + "C" + d.x+ "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + d.parent.y;
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
        .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");


    node.append('circle')
        .attr('r', 9)
        .attr('fill', 'grey');

    node.append("text")
        .attr("dy", 3)
        .style('font-size', "16px")
        .attr("x", 15)           // set x position of left side of text
        .attr("y", 0)
        .attr("align-content", 'center')
        .attr("text-anchor", "middle")
        .style("text-anchor", (d) => d.children ? "end" : "start")
        .text((d) => d.data.type);

    node.on('mouseover', function (data) {
        var g = d3.select(this); // The node
        // The class is used to remove the additional text later
        var info = g
            .append("text")
            .classed("info", true)
            .attr("x", -20)
            .attr("y", 35)
            .text((d) => d.data.text);


    });

    node.on('mouseout', function () {
        d3.select(this)
            .select("text.info")
            .remove();

    });

    node.on('mouseout', function () {
        d3.select(this)
            .select("text.info")
            .remove();

    });
}
