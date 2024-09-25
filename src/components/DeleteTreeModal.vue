<template>
    <BasicModal size="small">
        <template v-slot:modalTitle>
            <h2>Delete {{ decisionTreeName }}</h2>
        </template>
        
        <template v-slot:modalContent>
            <h3>This cannot be undone</h3>
        </template>

        <template v-slot:modalFooter>
            <button class="deleteButton" 
                    type="button" 
                    @click="deleteDecisionTree">
                Delete
            </button>
            <button class="secondaryButton"
                    type="button" 
                    @click="closeModal">
                Cancel
            </button>
        </template>
            
    </BasicModal>
</template>

<script>
import BasicModal from './BasicModal.vue';

export default {
    name: 'DeleteTreeModal',
    components: { BasicModal },
    props: {
        'treeName': String
    },
    setup(props, context) {
        
        const closeModal = () => {
            context.emit('hideModal');
        }

        const deleteDecisionTree = () => {
            context.emit('deleteDecisionTree');
        }
        return { closeModal, deleteDecisionTree };
    }
}

</script>

<style scoped>
button {
    margin: 0 10px 0 10px;
}

.deleteButton {
    background-color: red;
}

.secondaryButton {
    background-color: white;
    color: black
}
</style>