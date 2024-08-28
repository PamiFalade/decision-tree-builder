<template>
    <body>
        <Tree :decisionTree="decisionTree" :updateSelectedNode="updateSelectedNode" :updatePopupCoordinates="updatePopupCoordinates" :hideNodePopup="hideNodePopup" />
        <NodePopup v-show="showNodePopup" 
                    @toggleNodeWindow="toggleShowNodeWindow" 
                    @addDecisionNode="addDecisionNode"
                    @addChanceNode="addChanceNode"
                    @addTerminalNode="addTerminalNode"
                    @deleteNode="deleteNode"
                    :xPos="this.xPos" 
                    :yPos="this.yPos"
                    :nodeType="this.selectedNode.attributes.type" />
        <Transition>
            <NodeWindow v-show="showNodeWindow" v-model:selectedNode="selectedNode" @closeNodeWindow="toggleShowNodeWindow" @addChildren="addChildren"/>
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
        props: {
            decisionTreeNodes: {
                name: String,
                id: Number,
                attributes: {
                    type: String,
                    expectedValue: Number,
                    probability: Number
                },
                children: Array
            }
        },
        components: {
            NodeWindow,
            Tree: applyReactInVue(DecisionTree),
            NodePopup
        },
        watch: {
            decisionTreeNodes(value) {
                this.decisionTree = value;
            }
        },
        data() {
            return {
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
                xPos: 0,
                yPos: 0,
                decisionTree: this.decisionTreeNodes,
            }
        },

        beforeMount() {
            this.setParentNodes();
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
                this.selectedNode = this.bfs(node.data.id);
                console.log(node);
                
                this.selectedNodeParent = node.parent !== null ? this.bfs(node.parent.data.id) : null;    // Find the node's parent as well, so that we can delete the selectedNode if needed (IFF it's not the root node)
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
                if(idToFind === this.decisionTree.id){
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
                    id: this.selectedNode.id,
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
                    id: this.selectedNode.id,
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
                    id: this.selectedNode.id,
                    attributes: {
                        type: "Terminal",
                        expectedValue: 0,
                        probability: 0,
                    },
                    children: []
                });
            },

            // Method for adding children nodes from the NodeWindow
            addChildren(numNewDecisions, numNewChances, numNewTerminals) {
                // Add the new decision nodes
                for(let i=0; i<numNewDecisions; i++){
                    this.addDecisionNode();
                }
                // Add the new chance nodes
                for(let i=0; i<numNewChances; i++){
                    this.addChanceNode();
                }
                // Add the new terminal nodes
                for(let i=0; i<numNewTerminals; i++){
                    this.addTerminalNode();
                }
            },

            deleteNode() {
                // TODO: Properly connect this.selectedNodeParent
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

</style>