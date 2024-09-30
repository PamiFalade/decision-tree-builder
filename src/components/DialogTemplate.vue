<template>
    <v-dialog 
        v-model="dialog"
        max-width="800" 
        max-height="600" >
        
        <v-card title="Dialog 1">

        <slot name="cardBody">Dialog Content</slot>

        <v-card-actions>
            <!-- <v-spacer /> -->

            <v-btn 
                :text="actionBtnLabel" 
                variant="primary"
            />
        </v-card-actions>
        
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DialogTemplate',
    props: {
        cardTitle: String,
        actionBtnLabel: String
    },
    setup() {

    }
}
</script>