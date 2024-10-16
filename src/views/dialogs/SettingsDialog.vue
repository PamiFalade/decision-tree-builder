<template>
    <DialogTemplate
        dialogTitle="Settings"
        :includeActionBtn="false"
    >
        <template v-slot:activator>
            <v-btn
                class="mx-1"
                icon 
                variant="text">
                <v-icon size="30" color="black" icon="mdi-cog"/>
            </v-btn>
        </template>

        <template v-slot:dialogBody>
            <v-container>
                <v-radio-group label="Path Highlight Options">
                    <v-radio label="None" value="highlight-none" @change="checkSelectedHighlight"></v-radio>
                    <v-radio label="Max" color="green-darken-2" value="highlight-max" @change="checkSelectedHighlight"></v-radio>
                    <v-radio label="Min" color="red-darken-2" value="highlight-min" @change="checkSelectedHighlight"></v-radio>
                </v-radio-group>
            </v-container>
        </template>
    </DialogTemplate>
</template>

<script>
import DialogTemplate from '../../components/DialogTemplate.vue';

export default {
    name: 'SettingsDialog',
    components: {
        DialogTemplate
    },
    emits: ['highlightPath'],
    setup(props, context) {

        const checkSelectedHighlight = (event) => {
            context.emit('highlightPath', event.target.value);
        }

        return { checkSelectedHighlight }
    }
}

</script>