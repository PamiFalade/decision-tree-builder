<template>
    <body>
        <button @click="calculateTreeValues(decisionTreeNodes, 0)">Test</button>
        <button @click="highlightPaths(decisionTreeNodes)">Test2</button>
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
            <NodeWindow v-show="showNodeWindow" v-model:selectedNode="selectedNode" v-model:selectedNodeParent="selectedNodeParent" @closeNodeWindow="toggleShowNodeWindow" @addChildren="addChildren"/>
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
                    yield: Number,
                    probability: Number,
                    expectedValue: Number,
                    onBestPath: Boolean
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
                this.showNodePopup = false;
                this.showNodeWindow = false;
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
                        yield: 0,
                        probability: 0,
                        expectedValue: 0,
                        onBestPath: false
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

            // Traverses through the tree post-order to aggregate yields and calculate expected values
            calculateTreeValues(currentNode, accumulatedYield) {
                // If the node has no children, its expected value is just the accumulated payoffs along its path
                if(currentNode.children.length === 0){
                    let expectedValue = parseInt(currentNode.attributes.yield) + accumulatedYield;
                    currentNode.attributes.expectedValue = expectedValue;
                    return;
                }
                for(let i=0; i<currentNode.children.length; i++) {
                    this.calculateTreeValues(currentNode.children[i], accumulatedYield + currentNode.attributes.yield);
                }
                // If the node is a chance node, its expected value is the weighted average of its children's expected values.
                if(currentNode.attributes.type === "Chance") {
                    const childNodes = [...currentNode.children];
                    const expectedValue = childNodes.reduce((sum, childNode) =>  sum + childNode.attributes.expectedValue * parseFloat(childNode.attributes.probability), 0);
                    currentNode.attributes.expectedValue = expectedValue;
                }
                // Else, the node is not a chance node, or a terminal node (i.e., a decision or root node), its expected value is the highest value of its children
                else {
                    currentNode.attributes.expectedValue = currentNode.children.map(childNode => childNode.attributes.expectedValue)
                                                            .reduce((best, current) => (best && best > current) ? best : current);
                    
                }
                if(currentNode.attributes.type === "Root") {
                    console.log(currentNode);
                }
            },

            // Set the properties that will indicate which nodes are part of the best path, and which ones are part of the worst path
            highlightPaths(currentNode) {
                // Set the node's onBestPath property to true
                currentNode.attributes.onBestPath = true;
                if(currentNode.children.length == 0) {
                    return;
                }

                // At chance nodes, all children are considered part of the "best" path
                if(currentNode.attributes.type === "Chance") {
                    currentNode.children.forEach(childNode => {
                        this.highlightPaths(childNode);
                    });
                }
                
                // At decision nodes, only the child nodes with the highest expected values are considered to be on the "best" path
                else {
                    const bestValue = currentNode.children.map(childNode => childNode.attributes.expectedValue)
                    .reduce((best, current) => (best && best > current) ? best : current );
                    currentNode.children.forEach(childNode => {
                        if(childNode.attributes.expectedValue === bestValue) {
                            this.highlightPaths(childNode);
                        }
                    });
                }
            },

            addDecisionNode() {
                this.selectedNode.children.push({
                    name: "New Decision " + parseInt(this.selectedNode.children.length) + 3,
                    id: parseInt(`${this.selectedNode.id}` + this.selectedNode.children.length),
                    attributes: {
                        type: "Decision",
                        yield: 0,
                        expectedValue: 0,
                        probability: this.selectedNode.attributes.type !== "Chance" ? null : 0.1,
                        onBestPath: false
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
                        yield: 0,
                        expectedValue: 0,
                        probability: this.selectedNode.attributes.type !== "Chance" ? null : 0.1,
                        onBestPath: false
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
                        yield: 0,
                        expectedValue: 0,
                        probability: this.selectedNode.attributes.type !== "Chance" ? null : 0.1,
                        onBestPath: false
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
                        yield: 0,
                        probability: 0,
                        expectedValue: 0,
                        onBestPath: false
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