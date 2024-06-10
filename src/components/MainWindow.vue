<!-- Setting up a two-way bind between the MainWindow and NodeWindow over the shoWindow variable, which will control if the NodeWindow is in view, and for which node -->
<script setup>
    import { ref } from 'vue';

    const showWindow = ref(false);

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
    })


</script>

<template>
    <div id='body'>
        <button id="testButton" @click="showWindow=true">Open Window</button>
        <NodeWindow v-model:showWindow="showWindow" v-model:selectedNode="selectedNode" />
    </div>
</template>

<script>
    import NodeWindow from './NodeWindow.vue';

    export default {
        name: 'MainWindow',
        components: {
            NodeWindow
        },
    }

</script>

<style>

    #body {
        position: relative;
        width: 99%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    #testButton {
        background-color: white;
        width: 150px;
        height: 100px;
        border: solid 2px black;
    }

</style>