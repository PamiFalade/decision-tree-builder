<!-- Setting up a two-way bind between the MainWindow and NodeWindow over the shoWindow variable, which will control if the NodeWindow is in view, and for which node -->
<script setup>
    import { ref } from 'vue';

    const selectedNode = ref({
        nodeType: "chance",
        nodeName: "Selected Node #1",
        nodeChildren: [
                        {
                            nodeType: "Terminal",
                            nodeName: "High Demand",
                            expectedValue: "$300",
                            probability: "0.2"
                        },
                        {
                            nodeType: "Terminal",
                            nodeName: "Medium Demand",
                            expectedValue: "$50",
                            probability: "0.5"
                        },
                        {
                            nodeType: "Terminal",
                            nodeName: "Low Demand",
                            expectedValue: "($100)",
                            probability: "0.2"
                        },
                        {
                            nodeType: "Terminal",
                            nodeName: "Zero Demand",
                            expectedValue: "($500)",
                            probability: "0.1"
                        }
                    ],
    });

</script>

<template>
     <body>
        <TreeCanvas :treeData="decisionTree" />
        <NodePopup v-show="showNodePopup" 
                    @toggleNodeWindow="toggleShowNodeWindow" 
                    @addDecisionNode="addDecisionNode"
                    @addChanceNode="addChanceNode"
                    @addTerminalNode="addTerminalNode"
                    @deleteNode="deleteNode"
                    :xPos="xPos" 
                    :yPos="yPos"
                    :nodeType="selectedNode.nodeType" />
        <Transition>
            <NodeWindow v-show="showNodeWindow" v-model:selectedNode="selectedNode" @closeNodeWindow="toggleShowNodeWindow" />
        </Transition>
    </body>
</template>

<script>
    import NodeWindow from './NodeWindow.vue';
    import NodePopup from './NodePopup.vue';
    import TreeCanvas from './TreeCanvas.vue';

    import inputData from "../data/Input_Data.json";

    export default {
        name: 'MainWindow',
        components: {
            NodeWindow,
            NodePopup,
            TreeCanvas
        },
        data() {
            return { 
                decisionTree: {
                    name: inputData.decisionTreeNodes.name,
                    children: inputData.decisionTreeNodes.children
                },
                showNodeWindow: false,
                showNodePopup: false,
                selectedNode: {
                    name: '',
                    id: 0,
                    attributes: {
                        type: "",
                        expectedValue: 0,
                        probability: 0,
                    },
                    children: []
                },
                selectedNodeParent: {},
                xPos: 100,
                yPos: 250,
            }
        },
        methods: {
            toggleShowNodeWindow() {
                this.showNodeWindow = !this.showNodeWindow;
            },

            hideNodeWindow() {
                this.showNodeWindow = false;
            }, 

            displayNodePopup() {
                this.showNodePopup = true;
            },

            hideNodePopup() {
                this.showNodePopup = false;
            },

            updatePopupCoordinates(xCoord, yCoord){
                this.xPos = xCoord;
                this.yPos = yCoord;
            },

            updateSelectedNode(node) {
                this.selectedNode = this.bfs(node.id);
                console.log(node);
                
                this.selectedNodeParent = this.bfs(node.parentID);    // Find the node's parent as well, so that we can delete the selectedNode if needed
                this.displayNodePopup();
            },

            // Traverse through the tree breadth-first and set each node's parent using the node ID
            // Using a reference to the parent node causes an error with the react-d3-tree component
            setParentNodes() {
                let queue = [];
                let traversal = [];

                for(let i=0; i<this.decisionTree.children.length; i++){
                    this.decisionTree.children[i].parentID = this.decisionTree.id;
                    queue.push(this.decisionTree.children[i]);
                }

                for(let i=0; i<queue.length; i++){
                    traversal.push(`${queue[i].name}, ${queue[i].children?.map(child => child.name)}`);
                    queue[i].children?.forEach(child => {
                        child.parentID = queue[i].id
                        queue.push(child);
                    });
                }

            },

            // Used to find nodes by traversing through the tree breadth-first
            bfs(idToFind){
                if(idToFind === 1){
                    return this.decisionTree;
                }

                let nodeToFind = null;
                let queue = [];
                for(let i=0; i<this.decisionTree.children.length; i++){
                    queue.push(this.decisionTree.children[i]);
                }
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
               this.selectedNode.children.push({
                    name: "New Decision " + parseInt(this.selectedNode.children.length) + 3,
                    id: parseInt(`${this.selectedNode.id}` + this.selectedNode.children.length),
                    attributes: {
                        type: "Decision",
                        expectedValue: 0,
                        probability: 0,
                    },
                    children: []
                });
            },

            addChanceNode() {
               this.selectedNode.children.push({
                    name: "New Chance " + parseInt(this.selectedNode.children.length) + 2,
                    id: parseInt(`${this.selectedNode.id}` + this.selectedNode.children.length),
                    attributes: {
                        type: "Chance",
                        expectedValue: 0,
                        probability: 0,
                    },
                    children: []
                });
            },
            
            addTerminalNode() {
               this.selectedNode.children.push({
                    name: "New Terminal " + parseInt(this.selectedNode.children.length) + 1,
                    id: parseInt(`${this.selectedNode.id}` + this.selectedNode.children.length),
                    attributes: {
                        type: "Terminal",
                        expectedValue: 0,
                        probability: 0,
                    },
                    children: []
                });
            },

            deleteNode() {
                this.selectedNodeParent.children = this.selectedNodeParent.children.filter(node => node.id != this.selectedNode.id);
                this.selectedNode = {
                    name: "",
                    id: "",
                    attributes: {
                        type: "",
                        expectedValue: 0,
                        probability: 0,
                    },
                    children: []
                };
                this.hideNodePopup();
                this.hideNodeWindow();
            }
        },
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

    #testButton {
        background-color: white;
        width: 150px;
        height: 100px;
        border: solid 2px black;
    }

</style>