<template>
    <BasicModal size="large">
        <template v-slot:modalTitle>
            <h2>Load a Decision Tree</h2>
        </template>
        
        <template v-slot:modalContent>
            <ul>
                <li v-for="decisionTree in databaseRecords" 
                        :key="decisionTree.id" 
                        @click="onDecisionTreeClick($event, decisionTree.id)"
                        :class="{ selected: decisionTree.id === selectedDecisionTreeId }">
                    <div class="li-header">
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
                    </div>
                </li>
            </ul>
        </template>

        <template v-slot:modalFooter>
            <button class="submitButton" 
                    type="button" 
                    :disabled="!selectedDecisionTreeId"
                    @click="loadDecisionTree">
                Load Tree
            </button>
        </template>
            
    </BasicModal>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import DecisionTreeDTO from '../services/DecisionTreeDTO.js';
    import {formatDateTime} from '../services/Utils.js';
    import BasicModal from './BasicModal.vue';

    export default {
        name: 'LoadDataModal',
        components: {
            BasicModal
        },
        props: ['databaseRecords'],
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


<style scoped>

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

ul {
    height: 100%;
    width: 100%;
    padding-left: 0;
    margin-left: 0;
    list-style: none;
    overflow-y: scroll;
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