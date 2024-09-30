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
        
        <v-card>

            <slot name="dialogHeader">
                <v-card-title>
                    Dialog Title Example
                </v-card-title>
            </slot>

            <slot name="dialogBody">Dialog Content</slot>

            <v-card-actions>
                <!-- <v-spacer /> -->

                <v-btn 
                    :text="actionBtnLabel || 'Action Btn'" 
                    variant="outlined"
                />
            </v-card-actions>
        
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DialogTemplate',
    props: {
        dialog: Boolean,
        dialogTitle: String,
        actionBtnLabel: String
    },
    data() {
        return {
            dialog: false
        }
    },
    setup() {

    }
}
</script>