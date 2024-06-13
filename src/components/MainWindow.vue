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
        <Tree id="decisionTree" :decisionTree="decisionTree"/>

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
                decisionTree: {
                    name: 'CEO',
                    children: [
                    {
                        name: 'Manager',
                        attributes: {
                        department: 'Production',
                        },
                        children: [
                        {
                            name: 'Foreman',
                            attributes: {
                            department: 'Fabrication',
                            },
                            children: [
                            {
                                name: 'Worker',
                            },
                            ],
                        },
                        {
                            name: 'Foreman',
                            attributes: {
                            department: 'Assembly',
                            },
                            children: [
                            {
                                name: 'Worker',
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
            } 
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