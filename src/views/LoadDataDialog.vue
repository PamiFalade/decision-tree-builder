<template>

    <DialogTemplate 
        dialogTitle="Load a Decision Tree" 
        actionBtnLabel="Load Tree" 
        action="success"
        :actionEnabled="selectedDecisionTreeId > 0 ? true : false"
        @dialogAction="loadDecisionTree(dialogTitle)">

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
            openDialog: true,
        }
    },
    props: {
        databaseRecords: Array
    },
    emits: ['loadDecisionTree'],
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
        const loadDecisionTree = (dialogTitle) => {
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