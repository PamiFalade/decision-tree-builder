<script setup>
    import { ref, computed } from 'vue';

    // Number of each types of node that will be added to the selectedNode's children
    const addDecisions = ref(null);
    const addChances = ref(null);
    const addTerminals = ref(null);

    // Emit for when adding children nodes from NodeWindow
    const emit = defineEmits(['addChildren']);

    // When the "Add Nodes" button is clicked, signal to the MainWindow to add the indicated number of each node
    const onAddNodes = () => {
        emit('addChildren', addDecisions.value.value, addChances.value.value, addTerminals.value.value);
        
        addDecisions.value.value = 0;
        addChances.value.value = 0; 
        addTerminals.value.value = 0;
    }

    const props = defineProps({
        selectedNode: {
            name: String,
            attributes: {
                type: String,
                expectedValue: Number,
                probability: Number
            },
            children: Array,
        },
    });

    const getNodeSvg = computed(() => {
        let svgPath = "";
            if(props.selectedNode.attributes.type === "Root"){
                svgPath = "../../maroon_square.svg"
            }
            else if(props.selectedNode.attributes.type === "Decision"){
                svgPath = "../../red_square.svg"
            }
            else if(props.selectedNode.attributes.type === "Chance"){
                svgPath = "../../yellow_circle.svg"
            }
            else if(props.selectedNode.attributes.type === "Terminal"){
                svgPath = "../../green_triangle.svg"
            }
            return svgPath;
    });


</script>

<template>
        <div id="nodeWindow">
            <div class="windowHeader">
                <img src='../assets/close_icon_black.svg' 
                    class="closeButton"
                    @click="closeWindow"/>
                <input id="h2Input" v-model="selectedNode.name" />
                <img :src="getNodeSvg" class="nodeImg" />

            </div>

            <div class="windowBody">
                <ul id="selectedNodeAttributes">
                    <li>
                        <p>Type</p>
                        <p> {{selectedNode.attributes.type}} </p>
                    </li>
                    <li>
                        <p>EV</p>
                        <input v-model="selectedNode.attributes.expectedValue" />
                    </li>
                    <li>
                        <p>Probability</p>
                        <input v-model="selectedNode.attributes.probability" />
                    </li>
                </ul>
                
                <div v-if="selectedNode.attributes.type !== 'Terminal'" id="childNodesSection">
                    <table>
                        <tr>
                            <th id="numCol" >#</th>
                            <th id="typeCol" >Type</th>
                            <th id="nameCol" >Name</th>
                            <th id="evCol" >EV</th>
                            <th id="probCol">p</th>
                        </tr>
                        <tr v-for="(childNode, index) in selectedNode.children" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ childNode.attributes.type }}</td>
                            <td class="editableCell" > <input v-model="childNode.name" /> </td>
                            <td class="editableCell" > <input v-model="childNode.attributes.expectedValue" /> </td>
                            <td class="editableCell" > <input v-model="childNode.attributes.probability" /> </td>
                        </tr>
                    </table>

                    <div id="addNodesSection">
                        <ul>
                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../red_square.svg" />
                                <input class="addNodeInput" type="number" value="0" min="0" ref="addDecisions" />
                            </div>

                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../yellow_circle.svg" />
                                <input class="addNodeInput" type="number" value="0" min="0" ref="addChances"/>
                            </div>

                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../green_triangle.svg" />
                                <input class="addNodeInput" type="number" value="0" min="0" ref="addTerminals"/>
                            </div>
                        </ul>

                        <button id="addNodeButton" @click="onAddNodes">Add Nodes</button>
                    </div>
                </div>
            </div>

        </div>
</template>


<script>

export default {
    name: 'NodeWindow',
    components: {
    },
    methods: {
        closeWindow(){
            this.$emit('closeNodeWindow');
        }
    }
}


</script>


<style scoped>

    #nodeWindow {
        position: absolute;
        bottom: 0;
        right: -3vw;
        background-color: lightgrey;
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 5%;
        transition: 0.4s;
        overflow-y: scroll;
    }


    .windowHeader {
        width: 90%;
        height: 15%;
        margin-left: 5%;
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: 1fr;
        justify-content: center;
        align-items: center;
    }

    .nodeImg {
        width: 50%;
    }

    .windowBody {
        height: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #selectedNodeAttributes {
        margin-right: 10%;
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        list-style-type: none;
    }


    #childNodesSection {
        width: 100%;
        height: auto;
    }

    table {
        border-collapse: collapse;
        right: 5%;
        width: 80%;
        margin: 5% 5% 10%;
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

    #evCol {
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

    #h2Input {
        width: 85%;
        height: 50%;
        font-size: xx-large;
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

    .addNodeImg {
        width: 15%;
        margin-right: 12%;
    }

    .addNodeInput {
        width: 20%;
        background-color: white;
    }

    #addNodeButton {
        width: 40%;
        height: auto;
        border-radius: 7%;
        border: 0.3px solid black;
    }

</style>