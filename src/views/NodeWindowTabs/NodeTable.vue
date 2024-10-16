<template>

    <v-container class="table-container px-2 pt-0">
        <table>
            <tr>
                <th id="numCol" >#</th>
                <th id="typeCol" >Type</th>
                <th id="nameCol" >Name</th>
                <th id="yieldCol" >Yield</th>
                <th id="probCol">p</th>
            </tr>
            <tr v-for="(node, index) in nodes" :key="node.id">
                <td>{{ index + 1 }}</td>
                <td>{{ node.attributes.type }}</td>
                <td class="editableCell"> 
                    <input 
                        v-model="node.name" 
                        :id="'nodeWindowChildName' + node.id" 
                        :name="'nodeWindowChildName' + node.id" /> 
                </td>
                <td class="editableCell"> 
                    <input 
                        v-model="node.attributes.yield" 
                        value="0" 
                        :id="'nodeWindowChildYield' + node.id" 
                        :name="'nodeWindowChildYield' + node.id" 
                        @blur="onEnteredInput" /> 
                </td>
                <td class="editableCell"> 
                    <input 
                        v-model="node.attributes.probability" 
                        :id="'nodeWindowChildProbability' + node.id" 
                        :name="'nodeWindowChildProbability' + node.id" 
                        @blur="onEnteredInput" /> 
                </td>
            </tr>
        </table>
    </v-container>

</template>

<script>
import { ref } from 'vue';

export default {
    name: 'NodeTable',
    props: {
        nodes: Array
    },
    setup(props, context) {

        const onEnteredInput = (event) => {
            // If the input field is left blank, default the value to 0
            if(event.target.value == "") {
                event.target.value = 0;
            }
            // Emit the event that the tree's node's values have been updated
            context.emit('nodeValueUpdated');
        };


        return { onEnteredInput };
    }
}

</script>

<style>
    .table-container {
        overflow: scroll;
        height: 375px;
    }
    .table-container th { position: sticky; top: 0; z-index: 1; }

    table {
        border-collapse: collapse;
        width: 100%;
    }
    
    th {
        background-color: #000435;
        color: white;
    }
    td, th {
        border: 1px solid black;
        padding: 8px 0px 8px;
        height: 4vh;
        align-items: center;
    }
    
    #numCol {
        width: 5%;
    }

    #nameCol {
        max-width: 25%;
    }

    #yieldCol {
        width: 15%;
    }

    #probCol {
        width: 10%;
    }

    .editableCell {
        background-color: #E0E0E0;
    }

    input {
        background-color: inherit;
        text-align: center;
        outline: 0; 
        border-width: 0px; 
        border-width: 0 0 0.5px; 
        border-color: #7B7B7B;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    input:focus {
        border-width: 0 0 2px; 
        border-color: #3371FF;
    }

    td > input {
        width: 80%;
        height: 100%;
        font-size: medium;
    }
</style>