<!-- Setting up a two-way bind between the MainWindow and NodeWindow over the shoWindow variable, which will control if the NodeWindow is in view, and for which node -->
<script setup>
    import { ref } from 'vue';

    const showWindow = ref('inactive');

</script>

<template>
    <div id='body'>
        <NodeWindow nodeType="Chance" nodeName="Largest Machine" />
    </div>
</template>

<script>
    import NodeWindow from './NodeWindow.vue';

    const placeholderData = [
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
            probability: "0.3"
        }
    ];

    export default {
        name: 'MainWindow',
        components: {
            NodeWindow
        }
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


</style>