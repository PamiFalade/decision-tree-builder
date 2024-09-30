<template>
    
    <v-btn
        text="Open Dialog 20"
        @click="dialog = true"
    />

    <v-dialog 
        v-model="dialog"
        min-width="600" 
        min-height="500"
        max-width="800" 
        max-height="600"
        >
        <v-toolbar
            class="py-3 pr-4">
            <v-btn
                class="mx-2"
                icon 
                @click="dialog = false">
                <v-icon size="30" icon="mdi-close"/>
            </v-btn>
            <v-card-title>{{ dialogTitle }}</v-card-title>
        </v-toolbar>
        
        <v-card>

            <slot name="dialogBody">Dialog Content</slot>

            <v-card-actions>
                <v-btn 
                    :text="actionBtnLabel || 'Action Btn'" 
                    variant="elevated"
                    color="blue-darken-1"
                    @click="() => {
                        dialog = false;
                        onDialogAction();
                        }"
                    :disabled="!actionEnabled"
                />
            </v-card-actions>
        
        </v-card>
    </v-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'DialogTemplate',
    props: {
        dialogTitle: String,
        actionBtnLabel: String,
        action: String,
        actionEnabled: Boolean
    },
    emits: ['dialogAction'],
    setup(props, context) {
        
        let dialog = ref(false);
        
        const onDialogAction = () => {
            context.emit('dialogAction', props.dialogTitle);
        }

        return { dialog, onDialogAction };
    }
}
</script>