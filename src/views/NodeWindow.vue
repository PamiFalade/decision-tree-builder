<script setup>
    import { computed } from 'vue';
    import EditableTitle from '../components/EditableTitle.vue';
    import NodeDescriptionTab from './NodeWindowTabs/NodeDescriptionTab.vue';
    import NodeTable from './NodeWindowTabs/NodeTable.vue';
    import AddNodesTab from './NodeWindowTabs/AddNodesTab.vue';

    // Emit for when adding children nodes from NodeWindow
    const emit = defineEmits(['add', 'closeNodeWindow', 'updateTreeValues']);

    // When the "Add Nodes" button is clicked, signal to the MainWindow to add the indicated number of each node
    const updateChildNodes = (numDecisions, numChances, numTerminals) => {
        emit('addChildren', numDecisions, numChances, numTerminals);
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

    const closeWindow = () => {
        emit('closeNodeWindow');
    };

    const updateNodeName = (updatedNodeName) => {
        this.selectedNode.name = updatedNodeName;
    };

    const updateNodeDescription = (updatedText) => {
        props.selectedNode.attributes.description = updatedText;
    };

    const updateTreeValues = () => {
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
            extension-height="75">
            <v-btn
                class="mx-2"
                icon 
                @click="closeWindow">
                <v-icon size="30" icon="mdi-close"/>
            </v-btn>
            <EditableTitle :inputValue="selectedNode.name" @textChanged="updateNodeName"/>
            <img :src="getNodeSvg" class="nodeImg" />
        </v-toolbar>

        <v-card-title>{{ tab }}</v-card-title>
            <v-tabs-window v-model="tab">
                <v-container class="my-5 px-5 pt-2">
                    <!-- Add Child Nodes tab -->
                    <v-tabs-window-item class="pa-4"value="Add Child Nodes">
                        <AddNodesTab @childrenAdded="updateChildNodes"/>
                    </v-tabs-window-item>
                    
                    <!-- Child Nodes Table tab -->
                    <v-tabs-window-item value="View Child Nodes">
                        <NodeTable :nodes="selectedNode.children" @nodeValueUpdated="updateTreeValues"/>
                    </v-tabs-window-item>

                    <!-- Node Description tab -->
                    <v-tabs-window-item value="Description">
                        <NodeDescriptionTab @nodeDescriptionChanged="updateNodeDescription" :nodeDescription="selectedNode.attributes.description" />
                    </v-tabs-window-item>
                </v-container>
            </v-tabs-window>

            <v-tabs 
                v-model="tab"
                align-tabs="center"
                bg-color="white-darken-1"
                color="black"
                fixed-tabs
                >
                <v-tab value="Add Child Nodes">
                    <v-icon icon="mdi-plus-circle"/>
                </v-tab>
                <v-tab value="View Child Nodes">
                    <v-icon icon="mdi-table-large"/>
                </v-tab>
                <v-tab value="Description">
                    <v-icon icon="mdi-text-box"/>
                </v-tab>
            </v-tabs>

    </v-card>
</template>


<script>

export default {
    name: 'NodeWindow',
    components: {
    },
    data(){
        return {
            tab: null,
        }
    },
    methods: {
        closeWindow(){
            this.$emit('closeNodeWindow');
        },
        updateNodeName(updatedNodeName){
            this.selectedNode.name = updatedNodeName;
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

    .v-tab-item--selected {
        background-color: white;
    }
    .v-tab-item--selected:focus {
        outline-width: 0;
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


</style>