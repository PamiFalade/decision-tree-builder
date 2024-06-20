<template>
    <header>
        <p>{{ bfs }}</p>
    </header>
     <body>
        <Tree id="decisionTree" :decisionTree="decisionTree" :updateSelectedNode="updateSelectedNode"/>
        <NodePopup v-show="showNodePopup" 
                    @toggleNodeWindow="toggleShowNodeWindow" 
                    @addDecisionNode="addDecisionNode"
                    :xPos="this.selectedNode.xPos" 
                    :yPos="this.selectedNode.yPos" />
        <Transition>
            <NodeWindow v-show="showNodeWindow" v-model:selectedNode="selectedNode" @closeNodeWindow="toggleShowNodeWindow" />
        </Transition>
    </body>
</template>

<script>
    import NodeWindow from './NodeWindow.vue';
    import NodePopup from './NodePopup.vue';

    import { applyReactInVue } from 'veaury';
    import DecisionTree from './ReactD3Tree';
    

    export default {
        name: 'MainWindow',
        components: {
            NodeWindow,
            Tree: applyReactInVue(DecisionTree),
            NodePopup
        },
        data() {
            return {
                showNodeWindow: false,
                showNodePopup: false,
                selectedNode: {},
                decisionTree: {
                    name: 'CEO',
                    id: 1,
                    attributes: {
                        type: "root",
                        expectedValue: 10,
                        probability: 1.0,
                        xPos: 0,
                        yPos: 0
                    },
                    children: [
                    {
                        name: 'Manager',
                        id: 2,
                        attributes: {
                            type: "chance",
                            expectedValue: 11,
                            probability: 0.9,
                        },
                        children: [
                        {
                            name: 'Foreman 1',
                            id: 3,
                            attributes: {
                                type: "chance",
                                expectedValue: 12,
                                probability: 0.8,
                            },
                            children: [
                            {
                                name: 'Worker 1',
                                id: 5,
                                attributes: {
                                    type: "terminal",
                                    expectedValue: 13,
                                    probability: 0.7,
                                }
                            },
                            {
                                name: 'Worker 2',
                                id: 6,
                                attributes: {
                                    type: "terminal",
                                    expectedValue: 13.5,
                                    probability: 0.65,
                                }
                            },
                            ],
                        },
                        {
                            name: 'Foreman 2',
                            id: 4,
                            attributes: {
                                type: "chance",
                                expectedValue: 14,
                                probability: 0.6,
                            },
                            children: [
                            {
                                name: 'Worker 3',
                                id: 7,
                                attributes: {
                                    type: "terminal",
                                    expectedValue: 15,
                                    probability: 0.5,
                                },
                            },
                            ],
                        },
                        ],
                    },
                    {
                        name: 'Manager 2',
                        id: 12,
                        attributes: {
                            type: "chance",
                            expectedValue: 11,
                            probability: 0.9,
                        },
                        children: []
                    }
                    ],
                },
                numberOfNodes: 1
            }
        },
        methods: {
            toggleShowNodeWindow() {
                this.showNodeWindow = !this.showNodeWindow;
            }, 
            toggleShowNodePopup() {
                this.showNodePopup = !this.showNodePopup;
            }, 
            updateSelectedNode(node) {
                this.selectedNode = {
                nodeName: node.data.name,
                nodeType: node.data.attributes.type,
                expectedValue: node.data.attributes.expectedValue,
                probability: node.data.attributes.probability,
                xPos: node.x,
                yPos: node.y,
                children: node.children === undefined ? [] : node.children.map((childNode) => { 
                                                                                return {
                                                                                    nodeName: childNode.data.name,
                                                                                    nodeType: childNode.data.attributes.type,
                                                                                    expectedValue: childNode.data.attributes.expectedValue,
                                                                                    probability: childNode.data.attributes.probability,
                                                                                    xPos: childNode.x,
                                                                                    yPos: childNode.y
                                                                                }})
                };
                this.toggleShowNodePopup();
            },
        },
        computed: {
            bfs(){
                let idToFind = 5;
                let nodeToFind = null;
                let queue = [...this.decisionTree.children];
                let traversal = [];

                for(let i=0; i<queue.length; i++){
                    if(queue[i].id === idToFind){
                        nodeToFind = queue[i];
                        break;
                    }
                    traversal.push(queue[i].name);
                    queue[i].children?.forEach(child => {
                        queue.push(child);
                    });
                }
                return nodeToFind;
                
            },
            addDecisionNode() {
                // Step 1: Find the selected node in the tree

                // Step 2: Add nodes to that node's children array
                if(this.selectedNode.children) {
                    this.selectedNode.children.push({
                        nodeName: "New Decision " + this.selectedNode.children.length + 1,
                        nodeType: "Decision",
                        expectedValue: 0,
                        probability: undefined,
                        children: []
                    });
                    console.log(this.selectedNode);
                }
            },

            addChanceNode() {
                if(this.selectedNode.children){
                    this.selectedNode.children.push({
                        nodeName: "New Chance " + this.selectedNode.children.length + 1,
                        nodeType: "Chance",
                        expectedValue: 0,
                        probability: 1.0/this.selectedNode.children.length,
                        children: []
                    });
                    console.log(this.selectedNode);
                }
            },

            addTerminalNode() {
                if(this.selectedNode.children){
                    this.selectedNode.children.push({
                        nodeName: "New Terminal " + this.selectedNode.children.length + 1,
                        nodeType: "Terminal",
                        expectedValue: 0,
                        probability: 1.0/this.selectedNode.children.length,
                        children: undefined
                    });
                    console.log(this.selectedNode);
                }
            },
        }
    }

</script>

<style scoped>

    #body {
        position: relative;
        width: 99%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

     /* Slide-in and slide-out animation for nodeWindow */
     .v-enter-from {
        translate: 150vw 0;
    }
    .v-enter-to {
        translate: 97vw 0;
    }
    .v-leave-from {
        translate: 97vw 0;
    }
    .v-leave-to {
        translate: 150vw 0;
    }
    /* End lide-in and slide-out animation for nodeWindow */

</style>