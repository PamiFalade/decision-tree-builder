<template>
    <div class="mainBody center" id="canvas">

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as d3 from "d3";
import setupTree from '../composables/d3Tree';
import { tree } from 'd3';

export default {
    name: 'TreeCanvas',
    props: {
        treeData: Object
    },
    setup(props){

        const treeData = props.treeData;

        const drawTree = () => { 

            // Variables for sizing
            let minScale = 0.5;
            let maxScale = 16;
            let circleRadius = 12;
            let fontSize = 15;

            // For input data to work for d3.hierarchy, it needs to be an object with two properties: name (string) and children (array of nodes)
            let rootNode = d3.hierarchy(treeData, function(d){
                return d.children;
            });
            var pathLinks = rootNode.links();

            var circleLinks = rootNode.descendants();
            var textLinks = rootNode.descendants();

            let svg = d3.select('#canvas').append('svg')
                    .style('background', 'white') 
                    .style('width', '100%')
                    .style('height', '100%');
            
            // Zoom
            const zoom = d3.zoom()
                    .scaleExtent([minScale, maxScale])
                    .on('zoom', zoomFunction);

            svg.call(zoom);

            function zoomFunction(event) {
                let treeComponents = svg.selectAll('.node, text, path');
                treeComponents.attr('transform', event.transform);
            };

            let g = svg.append('g')
                .attr('transform', 'translate(140,50)');
            
            let layout = d3.tree().size([600, 600]);
            layout(rootNode);
            

            // Functions for drawing paths
            function line(d, i) {
                return `M${d.source.y},${d.source.x}L${d.target.y},${d.target.x}`
            }
            function elbow(d, i) {
               return "M" + d.source.y + "," + d.source.x
                    + "V" + d.target.x + "H" + d.target.y;
            }
            
            function update(data){
                let group =  g.selectAll('path')
                .data(data, (d,i) => d.target.data.id) // Unique Identifier for each node
                .join(
                    function(enter){
                        return enter.append('path')
                                    .attr('x', d => 0)
                                    .attr('y', d => d.x)
                                    .attr('fill', 'none',)
                                    .attr('stroke', 'black')
                                    .attr('stroke-width', 0);
                                },
                        function(update){
                            return update;
                        },
                        function(exit){
                            return exit.call(path => path.transition().duration(300).remove()
                                                    .attr('d', line));
                        }
                ).call(path => path.transition().duration(1000).attr('d', line)
                            .attr("id", function(d,i){return "path"+i})
                            .attr('stroke-width', 1));
            }
            update(pathLinks);

            function generateNodeHtml(node) {

                let xCoord = node.y, yCoord = node.x;   // x = node.y and y = node.x because the tree is displayed horizontally

                 // If it's the Root node
                if(node.data.attributes === undefined){
                    return `<g> <rect width="20" height="20" x="${xCoord-15}" y="${yCoord-10}" fill="maroon" /> </g>`
                }
                // If it's a Decision node
                else if(node.data.attributes.type === "Decision") {
                    return `<g> <rect width="20" height="20" x="${xCoord-15}" y="${yCoord-10}" fill="red" /> </g>`
                }
                // If it's a Chance node
                else if(node.data.attributes.type === "Chance") {
                    return `<g> <circle r="15" cx="${xCoord}" cy="${yCoord}" fill="yellow" /> </g>`
                }
                // If it's a Terminal node
                else if(node.data.attributes.type === "Terminal") {
                    let trianglePoints = `${xCoord-10},${yCoord},${xCoord+5},${yCoord-10},${xCoord+5},${yCoord+10}`;
                    return `<g> <polygon points=${trianglePoints} fill='green'/> </g>`;
                }
            }
            
            function updateNodes(data){
                g.selectAll('.node')
                .data(data, (d) => d.data.id) // Unique Identifier for each node
                .join(
                    function(enter){
                        return enter.append('g') 
                                .html((d) => generateNodeHtml(d))
                                .attr('class', 'node')
                    },
                    function(update){
                        return update;
                    },
                    function(exit){
                        return exit.call(path => path.transition().duration(300).remove()
                            .attr('cx', (d) => mouseX)
                            .attr('r', (d) => 0)
                        );
                    }
                )
                .call(circle => circle.transition().duration(1000).attr('r', circleRadius))
                .on('mouseover', function(d){
                    d3.select(this)
                        .attr('fill', 'orange')
                        .attr('cursor', 'pointer')
                        .transition().duration(100).attr('r', 16)
                        .transition().duration(100).attr('width', 10)
                        .transition().duration(100).attr('height', 10);
                })
                .on('mouseout', function(d){
                    d3.select(this)
                        .attr('fill', (d)=>{
                            if(d.children ==undefined){
                                return 'red'
                            }
                            return 'green'
                        })
                        .transition().duration(100).attr('r', 12)

                })
                .on('click', function(d){
                    console.log(d);
                });
            }
            updateNodes(circleLinks);


            function updateText(data){
                g.selectAll('.nodeLabel')
                .data(data, (d) =>d.data.id)    // Unique Identifier for each node
                .join(
                    function(enter){
                        let label = enter.append('g')
                                    .attr('class', 'nodeLabel');

                        label.append('text')
                                    .attr('x', d => d.y+20)
                                    .attr('y', d => d.x-30)
                                    .attr('class', 'nodeLabelName')
                                    .text((d) => d.data.name);
                        
                        label.append('text')
                                    .attr('x', d => d.y+20)
                                    .attr('y', d => d.x-10)
                                    .attr('class', 'nodeLabelID')
                                    .text((d) => d.data.id);

                        return label;
                    },
                    function(update){
                        return update;
                    },
                    function(exit){
                            return exit.call(text => text.transition().duration(300).remove()
                                        .attr('x', (d) => mouseX)
                                        .attr('font-size', 0)
                                    );   
                    }

                )
                .call(g => {
                    let nameLabel = g.selectAll('.nodeLabelName');
                    let idLabel = g.selectAll('.nodeLabelID');
                    nameLabel.transition().duration(1000)
                        .attr('x', (d) => d.y+20)
                        .attr('y', (d) => d.x-30)
                        .attr('font-size', 15)
                        .attr('fill', 'black');
                    
                    idLabel.transition().duration(1000)
                        .attr('font-size', fontSize)
                        .attr('fill', 'black');
                });
            }
            updateText(textLinks);


        }

        onMounted(() => {
            drawTree();
        })
        

    },

}

</script>

<style>
.mainBody {
    width: 100%;
    height: 100%;
    background-color: none;
}

</style>