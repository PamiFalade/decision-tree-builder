<script setup>
    import { ref, computed } from 'vue';
import EditableTitle from '../components/EditableTitle.vue';

    // Number of each types of node that will be added to the selectedNode's children
    const addDecisions = ref(null);
    const addChances = ref(null);
    const addTerminals = ref(null);

    // Emit for when adding children nodes from NodeWindow
    const emit = defineEmits(['addChildren', 'closeNodeWindow', 'updateTreeValues']);

    // When the "Add Nodes" button is clicked, signal to the MainWindow to add the indicated number of each node
    const onAddNodes = () => {
        emit('addChildren', addDecisions.value.value, addChances.value.value, addTerminals.value.value);
        
        addDecisions.value.value = 0;
        addChances.value.value = 0; 
        addTerminals.value.value = 0;
    };

    const props = defineProps({
        selectedNode: {
            name: String,
            attributes: {
                type: String,
                yield: Number,
                probability: Number,
                expectedValue: Number,
                description: String
            },
            children: Array,
        },
    });

    const onEnteredInput = (event) => {
        // If the input field is left blank, default the value to 0
        if(event.target.value == "") {
            event.target.value = 0;
        }
        // Emit the event that the tree's node's values have been updated
        emit('updateTreeValues');
    }

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
    <v-card id="nodeWindow">
        <v-toolbar
            class="py-3 pr-4"
            extension-height="75"
            >
            <v-btn
                class="mx-2"
                icon 
                @click="closeWindow">
                <v-icon size="30" icon="mdi-close"/>
            </v-btn>

            <EditableTitle :inputValue="selectedNode.name" />

            <img :src="getNodeSvg" class="nodeImg" />
        </v-toolbar>

            <v-tabs-window v-model="tab">
                <v-container class="my-5">
                <v-tabs-window-item value="description">
                    <v-textarea></v-textarea>
                </v-tabs-window-item>

                <v-tabs-window-item value="add-children">
                    <div id="addNodesSection">
                        <ul>
                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../red_square.svg" />
                                <input class="addNodeInput" id="nodeWindowAddDecisions"  name="nodeWindowAddDecisions" type="number" value="0" min="0" ref="addDecisions" />
                            </div>

                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../yellow_circle.svg" />
                                <input class="addNodeInput" id="nodeWindowAddChances" name="nodeWindowAddChances" type="number" value="0" min="0" ref="addChances"/>
                            </div>

                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../green_triangle.svg" />
                                <input class="addNodeInput" id="nodeWindowAddTerminals" name="nodeWindowAddTerminals" type="number" value="0" min="0" ref="addTerminals"/>
                            </div>
                        </ul>

                        <button id="addNodeButton" @click="onAddNodes">Add Nodes</button>
                    </div>
                </v-tabs-window-item>
                
                <v-tabs-window-item value="table">
                    <table>
                        <tr>
                            <th id="numCol" >#</th>
                            <th id="typeCol" >Type</th>
                            <th id="nameCol" >Name</th>
                            <th id="yieldCol" >Yield</th>
                            <th id="probCol">p</th>
                        </tr>
                        <tr v-for="(childNode, index) in selectedNode.children" :key="childNode.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ childNode.attributes.type }}</td>
                            <td class="editableCell" > <input v-model="childNode.name" :id="'nodeWindowChildName' + childNode.id" :name="'nodeWindowChildName' + childNode.id" /> </td>
                            <td class="editableCell" > <input v-model="childNode.attributes.yield" value="0" :id="'nodeWindowChildYield' + childNode.id" :name="'nodeWindowChildYield' + childNode.id" @blur="onEnteredInput" /> </td>
                            <td class="editableCell" > <input v-model="childNode.attributes.probability" :id="'nodeWindowChildProbability' + childNode.id" :name="'nodeWindowChildProbability' + childNode.id" @blur="onEnteredInput" /> </td>
                        </tr>
                    </table>
                </v-tabs-window-item>
                </v-container>
            </v-tabs-window>

            <v-tabs 
            v-model="tab"
            bg-color="primary"
            >
            <v-tab value="add-children">Add Children</v-tab>
            <v-tab value="table">Children Table</v-tab>
            <v-tab value="description">Description</v-tab>
        </v-tabs>


    </v-card>
            <!-- <div class="windowHeader">
                <img src='../assets/close_icon_black.svg' 
                    class="closeButton"
                    @click="closeWindow"/>
                <input class="h2Input" v-model="selectedNode.name" />
                <img :src="getNodeSvg" class="nodeImg" />
            </div>

            <div class="windowBody">
                <div id="descriptionArea">
                    <textarea id="nodeDescription" v-model="selectedNode.attributes.description" name="nodeWindowDescription" rows="4" cols="50"></textarea>
                </div>
                <ul id="selectedNodeAttributes">
                    <li>
                        <p>Type</p>
                        <p> {{selectedNode.attributes.type}} </p>
                    </li>
                    <li>
                        <p>Yield</p>
                        <input v-model="selectedNode.attributes.yield" type="number" id="nodeWindowYield" name="nodeWindowYield" @blur="onEnteredInput" />
                    </li>
                    <li v-show="selectedNode.attributes.probability >= 0">
                        <p>Probability</p>
                        <input v-model="selectedNode.attributes.probability" type="number" max="1" id="nodeWindowProbability" name="nodeWindowProbability" @blur="onEnteredInput" />
                    </li>
                </ul>
                
                <div v-if="selectedNode.attributes.type !== 'Terminal'" id="childNodesSection">
                    <table>
                        <tr>
                            <th id="numCol" >#</th>
                            <th id="typeCol" >Type</th>
                            <th id="nameCol" >Name</th>
                            <th id="yieldCol" >Yield</th>
                            <th id="probCol">p</th>
                        </tr>
                        <tr v-for="(childNode, index) in selectedNode.children" :key="childNode.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ childNode.attributes.type }}</td>
                            <td class="editableCell" > <input v-model="childNode.name" :id="'nodeWindowChildName' + childNode.id" :name="'nodeWindowChildName' + childNode.id" /> </td>
                            <td class="editableCell" > <input v-model="childNode.attributes.yield" value="0" :id="'nodeWindowChildYield' + childNode.id" :name="'nodeWindowChildYield' + childNode.id" @blur="onEnteredInput" /> </td>
                            <td class="editableCell" > <input v-model="childNode.attributes.probability" :id="'nodeWindowChildProbability' + childNode.id" :name="'nodeWindowChildProbability' + childNode.id" @blur="onEnteredInput" /> </td>
                        </tr>
                    </table>

                    <div id="addNodesSection">
                        <ul>
                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../red_square.svg" />
                                <input class="addNodeInput" id="nodeWindowAddDecisions"  name="nodeWindowAddDecisions" type="number" value="0" min="0" ref="addDecisions" />
                            </div>

                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../yellow_circle.svg" />
                                <input class="addNodeInput" id="nodeWindowAddChances" name="nodeWindowAddChances" type="number" value="0" min="0" ref="addChances"/>
                            </div>

                            <div class="addNodeLine" >
                                <img class="addNodeImg" src="../../green_triangle.svg" />
                                <input class="addNodeInput" id="nodeWindowAddTerminals" name="nodeWindowAddTerminals" type="number" value="0" min="0" ref="addTerminals"/>
                            </div>
                        </ul>

                        <button id="addNodeButton" @click="onAddNodes">Add Nodes</button>
                    </div>
                </div>
            </div> -->

        <!-- </div> -->
</template>


<script>

export default {
    name: 'NodeWindow',
    components: {
    },
    data(){
        return {
            tab: null
        }
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
        right: 0;
        background-color: lightgrey;
        width: 35%;
        height: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top-left-radius: 5%;
        border-bottom-left-radius: 5%;
        transition: 0.4s;
        overflow-y: scroll;
    }


    .windowBody {
        height: 85%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .v-tabs-window {
        width: 100%;
        height: 100%;
        
    }



    .nodeImg {
        width: 7.5%;
    }

    #selectedNodeAttributes {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        list-style-type: none;
    }


    #childNodesSection {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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