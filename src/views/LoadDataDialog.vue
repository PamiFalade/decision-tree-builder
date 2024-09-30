<template>

    <DialogTemplate :dialog="openDialog" dialogTitle="Load a Decision Tree" actionBtnLabel="Load Trees">
        <template v-slot:dialogHeader>
            <v-toolbar
                class="py-3 pr-4">
                <v-btn
                    class="mx-2"
                    icon 
                    @click="openDialog = false">
                    <v-icon size="30" icon="mdi-close"/>
                </v-btn>
                <v-card-title>Open Decision Tree</v-card-title>
            </v-toolbar>
        </template>

        <template v-slot:dialogBody>
            <v-card 
                class="ma-3 bg-grey-lighten-2"
                align="center">
                <v-container>
                    <ul>
                        <li v-for="decisionTree in databaseRecords" 
                                :key="decisionTree.id" 
                                @click="onDecisionTreeClick($event, decisionTree.id)"
                                :class="{ selected: decisionTree.id === selectedDecisionTreeId }">
                            
                            <v-card
                                height="100"
                                flat>

                                <v-row style="height: 40;">
                                    <v-btn
                                        class="mx-1"
                                        icon 
                                        variant="plain"
                                        @click="openDialog = false">
                                        <v-icon color="red" size="20" icon="mdi-trash-can"/>
                                    </v-btn>
                                    <v-spacer />
                                    <v-card-title>
                                        {{ decisionTree.tree_name }}
                                    </v-card-title>
                                    <v-spacer />
                                </v-row>
                                
                                <v-row class="px-5">
                                    <v-spacer />
                                    <v-card class="tree_info" variant="text">
                                        <v-card-title style="font-size: 15px;">{{ decisionTree.creator_email }}</v-card-title>
                                        <v-card-subtitle style="font-size: 10px">Owner</v-card-subtitle>
                                    </v-card>
                                    <v-spacer />
                                    <v-card class="tree_info" variant="text">
                                        <v-card-title style="font-size: 15px;">{{ formatDateTime(decisionTree.created_at) }}</v-card-title>
                                        <v-card-subtitle style="font-size: 10px">Created At</v-card-subtitle>
                                    </v-card>
                                    <v-spacer />
                                </v-row>
                                
                            </v-card>
                            <!-- <div class="li-header">
                                <div class="deleteButton" @click="onDeleteTreeClick(decisionTree.id, decisionTree.tree_name)">
                                    <img src="../assets/trash_icon.svg" />
                                </div>
                                <h4 class="treeName treeMenuItems"> {{ decisionTree.tree_name }} </h4>
                            </div>
                            <div class="li-metadata">
                                <div class="treeData">
                                    <p class="tree-data-values"> {{ decisionTree.creator_email }} </p>
                                    <h6 class="text-label">Created By</h6>
                                </div>
                                <div class="treeData">
                                    <p class="tree-data-values"> {{ formatDateTime(decisionTree.created_at) }} </p>
                                    <h6 class="text-label">Created At</h6>
                                </div>
                            </div> -->
                        </li>
                    </ul>
                </v-container>
            </v-card>
        </template>
    </DialogTemplate>

</template>

<script>
import { ref } from 'vue';

import DialogTemplate from '../components/DialogTemplate.vue';
import {formatDateTime} from '../services/Utils.js';

export default {
    name: 'LoadDataDialog',
    components: {
        DialogTemplate
    },
    data(){
        return {
            databaseRecords: [
                {
                    id: 1,
                    tree_name: 'Barry',
                    creator_email: 'pamilerin@intern.mudozangl.com',
                    created_at: '2024-12-09'
                },
                {
                    id: 2,
                    tree_name: 'Cisco',
                    creator_email: 'georg.zangl@mudozangl.com',
                    created_at: '2022-12-09'
                },
                {
                    id: 3,
                    tree_name: 'Iris',
                    creator_email: 'damir.gavrat@mudozangl.com',
                    created_at: '2021-12-09'
                },
                {
                    id: 1,
                    tree_name: 'Barry',
                    creator_email: 'Thawne',
                    created_at: '2024-12-09'
                },
                {
                    id: 2,
                    tree_name: 'Cisco',
                    creator_email: 'Frost',
                    created_at: '2022-12-09'
                },
                {
                    id: 3,
                    tree_name: 'Iris',
                    creator_email: 'West',
                    created_at: '2021-12-09'
                },
            ]
        }
    },
    setup(props, context) {

        // The decision tree that is loaded from the database
        const selectedDecisionTreeId = ref(null);

        // Highlight the selected decision tree
        const onDecisionTreeClick = (event, key) => {
            selectedDecisionTreeId.value = key;
        }

        // When close button is clicked, emit the event so that the modal will be closed.
        const closeModal = () => {
            selectedDecisionTreeId.value = null;
            context.emit('hideDatabaseModal');
        }

        // Trigger the load decision tree function in App.vue
        const loadDecisionTree = () => {
            context.emit('loadDecisionTree', selectedDecisionTreeId.value);
        }

        const onDeleteTreeClick = (tree_id, tree_name) => {
            context.emit('promptDeleteDecisionTree', tree_id, tree_name);
        }

        return { selectedDecisionTreeId, closeModal, onDecisionTreeClick, loadDecisionTree, formatDateTime, onDeleteTreeClick }
    }

}
</script>


<style >
.v-card {
    overflow-y: scroll;
}

.treeInfo > .v-card-title {
    color: red;
}

.modalBody {
    width: 50%;
    height: 65%;
    position: absolute;
    top: 20%;
    left: 25%;
    padding: 5px;
    border-radius: 2%;
    background-color: lightgrey;
}

.header {
    height: 10%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: center;
    align-items: center;
}

li {
    width: 95%;
    padding-bottom: 2px;
    margin-bottom: 5%;
    border-radius: 5px;
    background-color: #E0E0E0;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.li-header {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
}

.li-metadata {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.text-label {
    margin-top: -4%;
}

.deleteButton {
    margin-left: 1%;
    margin-top: 1%;
    width: 20px;
    height: 20px;
    padding: 5px;
    border-radius: 8%;
    align-content: center;
}
.deleteButton > img {
    width: 100%;
}
.deleteButton:hover {
    background-color: darkgrey;
}


.selected {
    border: 1px solid #646cff;
}

.treeMenuItems {
    margin-top: 2px;
    width: 100%;
    height: 100%;
}

.treeName {
    margin-top: 2%;
}

.submitButton {
    max-height: 50px;
}

</style>