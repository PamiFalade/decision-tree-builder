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
                    <h4 class="treeName treeMenuItems"> {{ decisionTree.tree_name }} </h4>
                    <p class="owner treeMenuItems"> {{ decisionTree.creator_email }} </p>
                    <p class="creationDate treeMenuItems"> {{ formatDateTime(decisionTree.created_at) }} </p>
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
        setup(props, context) {
            // List of Decision Trees that are stored in the database
            let databaseRecords = ref([]);  

            // The decision tree that is loaded from the database
            const selectedDecisionTreeId = ref(null);

            // Highlight the selected decision tree
            const onDecisionTreeClick = (event, key) => {
                selectedDecisionTreeId.value = key;
            }

            // Fetch the list of decision trees in the database when the modal is created
            onMounted(async() => {
                await DecisionTreeDTO.getAllTrees()
                    .then(response => {
                        console.log(response);
                        databaseRecords.value = response.data;
                    });
            });

            // When close button is clicked, emit the event so that the modal will be closed.
            const closeModal = () => {
                selectedDecisionTreeId.value = null;
                context.emit('hideDatabaseModal');
            }

            // Trigger the load decision tree function in App.vue
            const loadDecisionTree = () => {
                context.emit('loadDecisionTree', selectedDecisionTreeId.value);
            }

            return { databaseRecords, selectedDecisionTreeId, closeModal, onDecisionTreeClick, loadDecisionTree, formatDateTime }
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
    height: 70%;
    width: 100%;
    padding-left: 0;
    margin-left: 2.5%;
    list-style: none;
    overflow-y: scroll;
}

li {
    width: 95%;
    height: 25%;
    margin-bottom: 5%;
    border-radius: 5px;
    background-color: #E0E0E0;
    display: grid;
    grid-template-rows: 3fr 1fr;
    grid-template-columns: 1fr 1fr;
    cursor: pointer;
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
    grid-column-end: span 2;
    align-content: center;
    /* background-color: red; */
}

.footer {
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row-reverse;
}

.submitButton {
    max-height: 50px;
}

</style>