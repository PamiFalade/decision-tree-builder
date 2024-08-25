<template>
    <div class="modalBody">
        <div class="header">
            <img src='../assets/close_icon_black.svg' 
                    class="closeButton"
                    @click="closeModal"/>
            <h3>Load a Decision Tree</h3>
        </div>
        
        <ul>
            <li v-for="decisionTree in databaseRecords" :key="decisionTree.TreeID" >
                <p> {{ decisionTree.TreeName }} </p>
            </li>
        </ul>

        <div class="footer">
            <button>
                Load Tree
            </button>
        </div>

    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import DecisionTreeDTO from '../services/DecisionTreeDTO.js';

    export default {

        setup(props, context) {
            // List of Decision Trees that are stored in the database
            let databaseRecords = ref([]);  

            // Fetch the list of decision trees in the database when the modal is created
            onMounted(() => {
                DecisionTreeDTO.getAllTrees()
                    .then(response => databaseRecords.value = response.data);
            });

            const closeModal = () => {
                context.emit('hideDatabaseModal');
            }

            return { databaseRecords, closeModal }
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
    height: 15%;
    background-color: green;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: center;
    align-items: center;
}

ul {
    height: 70%;
    list-style: none;
    overflow-y: scroll;
    background-color: blueviolet;
}

li {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

</style>