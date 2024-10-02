<template>
    <v-card-title>Type: {{ type }} Node</v-card-title>
    <v-number-input 
        label="Yield" 
        v-model="node_yield" 
        control-variant="split"
    />
    <v-number-input 
        v-if="probability >= 0"
        label="Probability" 
        v-model="node_probability"
        control-variant="split"
        :min="0"
        :max="1"
        :step="0.1"
    />
    <v-number-input 
        label="Duration (years)" 
        v-model="node_time" 
        control-variant="split"
        :min="0"
    />
</template>

<script>
import { ref, watch } from 'vue';

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
        const node_time = ref(0);
        const nodeData = [node_yield, node_probability];

        watch(props, () => {
            console.log(props.probability);
            node_yield.value = props.yield;
            node_probability.value = props.probability;
            node_time.value = 0;
        })

        watch(nodeData, () => {
            context.emit('nodeDataUpdated', node_yield.value, node_probability.value);
        });



        return { node_yield, node_probability, node_time };
    }
}

</script>