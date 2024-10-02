<template>
    <v-card-title>Type: {{ type }} Node</v-card-title>
    <v-number-input 
        label="Yield" 
        v-model="node_yield" 
        control-variant="split"
    />
    <v-number-input 
        label="Probability" 
        v-model="node_probability"
        control-variant="split"
        :min="0"
        :max="1"
        :step="0.1"
    />
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
    name: 'EditNodeTab',
    props: {
        type: String,
        yield: Number,
        probability: Number
    },
    emits: ['nodeDataUpdated'],
    setup(props, context) {
        const node_yield = ref(null);
        const node_probability = ref(null);
        const nodeData = [node_yield, node_probability];

        watch(props, () => {
            node_yield.value = props.yield;
            node_probability.value = props.probability;
        })

        watch(nodeData, () => {
            context.emit('nodeDataUpdated', node_yield.value, node_probability.value);
        });



        return { node_yield, node_probability };
    }
}

</script>