<template>
    <v-card 
        id="add-nodes-section"
        class="pa-4"
        variant="tonal">
        <v-card-item>
            <v-row class="black-lighten-1" style="height: 80px;">
                <img class="add-node-img" src="../../assets/red_square.svg" />
                <v-spacer />
                <input class="add-node-input" id="nodeWindowAddDecisions"  name="nodeWindowAddDecisions" type="number" value="0" min="0" ref="addDecisions" />
            </v-row>
            <v-row class="bg-black-lighten-1" style="height: 80px;">
                <img class="add-node-img" src="../../assets/yellow_circle.svg" />
                <v-spacer />
                <input class="add-node-input" id="nodeWindowAddChances"  name="nodeWindowAddChances" type="number" value="0" min="0" ref="addChances" />
            </v-row>
            <v-row class="bg-black-lighten-1" style="height: 80px;">
                <img class="add-node-img" src="../../assets/green_triangle.svg" />
                <v-spacer />
                <input class="add-node-input" id="nodeWindowAddTerminals"  name="nodeWindowAddTerminals" type="number" value="0" min="0" ref="addTerminals" />
            </v-row>
            <v-btn
                class="mt-8 mb-2"
                prepend-icon="mdi-plus-circle"
                color="primary"
                :ripple="false"
                @click="onAddNodes"
            >
                Add Nodes
            </v-btn>
        </v-card-item>
    </v-card>

</template>

<script>
import { ref } from 'vue';

export default {
    name: 'AddNodesTab',
    setup(props, context) {
        // Number of each types of node that will be added to the selectedNode's children
        const addDecisions = ref(null);
        const addChances = ref(null);
        const addTerminals = ref(null);

        // When the "Add Nodes" button is clicked, signal to the MainWindow to add the indicated number of each node
        const onAddNodes = () => {
            context.emit('childrenAdded', addDecisions.value.value, addChances.value.value, addTerminals.value.value);
            
            addDecisions.value.value = 0;
            addChances.value.value = 0; 
            addTerminals.value.value = 0;
        };

        return { addDecisions, addChances, addTerminals, onAddNodes };
    }
}
</script>

<style>

    input {
        background-color: inherit;
        text-align: center;
        outline: 0; 
        border-width: 0px; 
        border-width: 0 0 0.5px; 
        border-color: #7B7B7B;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    #addNodesSection {
        width: 50%;
        padding: 10px;
        margin: 0 15% 0;
        border: solid 0.5px black;
        border-radius: 10%;
    }

    .addNodeLine {
        width: 90%;
        height: 30%;
        padding: 3px;
        margin-bottom: 3%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .add-node-img {
        width: 20%;
        height: 50%;
        margin: 10% 10% 10% 5%;
    }

    .add-node-input {
        width: 40%;
        height: 50%;
        margin: 10% 5% 10% 10%;
        border: black 1px solid;
    }

</style>