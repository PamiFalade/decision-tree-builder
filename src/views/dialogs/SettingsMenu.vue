<template>
    <v-menu 
        v-model="showMenu"
        :close-on-content-click="false"
    >
        <template v-slot:activator="{props}">
            <v-btn
                class="mx-1"
                icon 
                variant="text"
                v-bind="props">
                <v-icon size="30" color="black" icon="mdi-cog"/>
            </v-btn>
        </template>

        <v-card>
            <v-container>
                <v-radio-group v-model="highlightOption" label="Path Highlight Options">
                    <v-radio label="None" value="highlight-none" @change="checkSelectedHighlight"></v-radio>
                    <v-radio label="Max" color="green-darken-2" value="highlight-max" @change="checkSelectedHighlight"></v-radio>
                    <v-radio label="Min" color="red-darken-2" value="highlight-min" @change="checkSelectedHighlight"></v-radio>
                </v-radio-group>
            </v-container>
        </v-card>

    </v-menu>

</template>

<script>
import { ref } from 'vue';

export default {
    name: 'SettingsMenu',
    emits: ['highlightPath'],
    setup(props, context) {

        const showMenu = ref(false);

        const highlightOption = ref("highlight-none");

        const checkSelectedHighlight = (event) => {
            context.emit('highlightPath', event.target.value);
        }

        return { showMenu, highlightOption, checkSelectedHighlight }
    }
}
</script>