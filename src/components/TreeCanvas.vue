<template>
    <div class="mainBody center" id="chart">
        <!-- <h1>This is the TreeCanvas</h1>
        <h3 v-for="child in treeData.children">
            {{ child.name }}
        </h3> -->
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as d3 from "d3";
import setupTree from '../composables/d3Tree';

export default {
    name: 'TreeCanvas',
    setup(){
        const treeData = {
            name: "Eve",
            children: [
                {id: "node1", name: "Cain"},
                {id: "node2", name: "Seth", children: [{id: "node3", name: "Enos"}, {id: "node4", name: "Noam"}]},
                {id: "node5", name: "Abel"},
                {id: "node6", name: "Awan", children: [{id: "node7", name: "Enoch"}]},
                {id: "node8", name: "Azura", children: [{id: "node9", name: "Zuko"}, {id: "node10", name: "Azula"}]},
                {id: "node99", name: "The Weeknd"}

            ]
        };

        const drawTree = () => {
            let mouseX = 0;

            let rootNode = d3.hierarchy(treeData, function(d){
                return d.children;
            });
            var pathLinks = rootNode.links();

            var circleLinks = rootNode.descendants();
            var textLinks = rootNode.descendants();

            let svg = d3.select('#chart').append('svg')
                    .style('background', 'white') 
                    .style('width', '100%')
                    .style('height', '100%')

            let g = svg.append('g')
                .attr('transform', 'translate(140,50)');
            
            let layout = d3.tree().size([600, 600]);
            layout(rootNode);
            console.log(rootNode.links());
            console.log("----------------------");
            console.log(rootNode.descendants());
            
            //first lets create a path 
            let lines = g.selectAll('path');  

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

            
            function updateCircles(data){
                g.selectAll('circle')
                .data(data, (d) => d.data.id) // Unique Identifier for each node
                .join(
                    function(enter){
                        return enter.append('circle')
                                    .attr('cx', (d) => d.y)
                                    .attr('cy', d => d.x)
                                    .attr('r', 0)
                                    .attr('fill', (d) => {
                                            if(d.children == undefined){
                                                return 'red';
                                            }
                                            return 'green';
                                        }
                                    )
                                    .attr('id', (d, i) => d.data.name)
                                    .attr('class', "sel");
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
                .call(circle => circle.transition().duration(1000).attr('r', 12))
                .on('mouseover', function(d){
                    d3.select(this)
                        .attr('fill', 'orange')
                        .attr('cursor', 'pointer')
                        .transition().duration(100).attr('r', 16);
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
            updateCircles(circleLinks);


            function updateText(data){
                g.selectAll('.nodeLabel')
                .data(data, (d) =>d.data.id)    // Unique Identifier for each node
                .join(
                    function(enter){
                        let label = enter.append('g')
                                    .attr('class', 'nodeLabel');

                        label.append('text')
                                    .attr('x', d => mouseX)
                                    .attr('y', d => d.x)
                                    .attr('class', 'nodeLabelName')
                                    .text((d) => d.data.name);
                        
                        label.append('text')
                                    .attr('x', d => mouseX)
                                    .attr('y', d => d.x+20)
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
                        .attr('x', (d) => d.y+20)
                        .attr('y', (d) => d.x-10)
                        .attr('font-size', 15)
                        .attr('fill', 'black');
                });
            }
            updateText(textLinks);


        }

        onMounted(() => {
            drawTree();
        })
        

        return { treeData };
    },

}

</script>

<style>
.mainBody {
    width: 100%;
    height: 100%;
    background-color: none;
}

.nodeLabel {
    color: white;
}

</style>