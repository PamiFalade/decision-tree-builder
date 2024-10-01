<template>

    <DialogTemplate
        :dialogTitle="`Delete '${decisionTreeName}'`"
        :includeActionBtn="true"
        actionBtnLabel="Delete Tree" 
        action="delete"
        :actionEnabled="true"
        @dialogAction="deleteDecisionTree"
    >

        <template v-slot:activator>
            <v-btn
                class="mx-1"
                icon 
                variant="plain">
                <v-icon color="red" size="20" icon="mdi-trash-can"/>
            </v-btn>
        </template>

        <template v-slot:dialogBody>
            <v-card-text>This cannot be undone</v-card-text>
        </template>

    </DialogTemplate>
</template>

<script>
import DialogTemplate from '../../components/DialogTemplate.vue';

export default {
    name: 'DeleteDialog',
    components: {
        DialogTemplate
    },
    props: {
        decisionTreeName: String
    },
    emits: ['deleteDecisionTree'],
    setup(props, context) {

        const deleteDecisionTree = () => {
            context.emit('deleteDecisionTree')
        };

        return { deleteDecisionTree }
    }
}

</script>

<stule>

</stule>