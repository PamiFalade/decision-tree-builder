<template>
     <body>
        <Tree :decisionTree="decisionTree" :updateSelectedNode="updateSelectedNode" :hideNodePopup="hideNodePopup" />
        <NodePopup v-show="showNodePopup" 
                    @toggleNodeWindow="toggleShowNodeWindow" 
                    @addDecisionNode="addDecisionNode"
                    @addChanceNode="addChanceNode"
                    @addTerminalNode="addTerminalNode"
                    @deleteNode="deleteNode"
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
                selectedNodeParent: {},
                decisionTree: {
                    name: 'CEO',
                    id: 1,
                    attributes: {
                        type: "root",
                        expectedValue: 10,
                        probability: 1.0,
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

            displayNodePopup() {
                this.showNodePopup = true;
            },

            hideNodePopup() {
                this.showNodePopup = false;
            },

            updateSelectedNode(node) {
                this.selectedNode = this.bfs(node.data.id);
                this.selectedNode.xPos = node.x;
                this.selectedNode.yPos = node.y;
                
                this.selectedNodeParent = this.bfs(node.parent.data.id);    // Find the node's parent as well, so that we can delete the selectedNode if needed
                this.displayNodePopup();
            },

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
                    xPos: 0,
                    yPos: 0
                };
                this.hideNodePopup();
                console.log(this.selectedNodeParent);
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

</style>