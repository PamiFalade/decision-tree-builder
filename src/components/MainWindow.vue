<template>
     <body>
        <Tree id="decisionTree" :decisionTree="decisionTree" :updateSelectedNode="updateSelectedNode"/>

        <button id="testButton" @click="toggleShowNodeWindow">Open Window</button>
        <Transition>
            <NodeWindow v-show="showNodeWindow" v-model:selectedNode="selectedNode" @closeNodeWindow="toggleShowNodeWindow" />
        </Transition>
    </body>
</template>

<script>
    import NodeWindow from './NodeWindow.vue';

    import { applyReactInVue } from 'veaury';
    import DecisionTree from './ReactD3Tree';

    export default {
        name: 'MainWindow',
        components: {
            NodeWindow,
            Tree: applyReactInVue(DecisionTree),
        },
        data() {
            return {
                showNodeWindow: false,
                selectedNode: {},
                decisionTree: {
                    name: 'CEO',
                    attributes: {
                        type: "root",
                        expectedValue: 10,
                        probability: 1.0,
                    },
                    children: [
                    {
                        name: 'Manager',
                        attributes: {
                            type: "chance",
                            expectedValue: 11,
                            probability: 0.9,
                        },
                        children: [
                        {
                            name: 'Foreman',
                            attributes: {
                                type: "chance",
                                expectedValue: 12,
                                probability: 0.8,
                            },
                            children: [
                            {
                                name: 'Worker',
                                attributes: {
                                    type: "terminal",
                                    expectedValue: 13,
                                    probability: 0.7,
                                }
                            },
                            {
                                name: 'Worker 2',
                                attributes: {
                                    type: "terminal",
                                    expectedValue: 13.5,
                                    probability: 0.65,
                                }
                            },
                            ],
                        },
                        {
                            name: 'Foreman',
                            attributes: {
                                type: "chance",
                                expectedValue: 14,
                                probability: 0.6,
                            },
                            children: [
                            {
                                name: 'Worker',
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
                    ],
                }
            }
        },
        methods: {
            toggleShowNodeWindow() {
                this.showNodeWindow = !this.showNodeWindow;
            }, 
            updateSelectedNode(node) {
                console.log(node);
                this.selectedNode = {
                nodeName: node.data.name,
                nodeType: node.data.attributes.type,
                expectedValue: node.data.attributes.expectedValue,
                probability: node.data.attributes.probability,
                children: node.children === undefined ? [] : node.children.map((childNode) => { 
                                                                                return {
                                                                                    nodeName: childNode.data.name,
                                                                                    nodeType: childNode.data.attributes.type,
                                                                                    expectedValue: childNode.data.attributes.expectedValue,
                                                                                    probability: childNode.data.attributes.probability,
                                                                                }})
                };
                this.toggleShowNodeWindow;
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

    #testButton {
        background-color: white;
        width: 150px;
        height: 100px;
        border: solid 2px black;
    }

</style>