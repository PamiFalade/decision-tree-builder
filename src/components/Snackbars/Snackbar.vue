<template>
    <div class="text-center">
        <v-snackbar
            v-model="isVisible"
            :timeout="timeout"
            color="error"
            variant="tonal"
        >
            <p class="text-center">{{ text }}</p>
            <template v-slot:actions>
                <v-btn
                    color="blue"
                    variant="text"
                    @click="closeSnackbar"
                >
                    <v-icon icon="mdi-close" />
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    name: 'Snackbar',
    props: {
        snackbar: Boolean,
        text: String
    },
    emits: ['close-snackbar'],
    setup(props, context){
        const isVisible = ref(props.snackbar);

        watch(props, () => {
            isVisible.value = props.snackbar; 
        });

        const closeSnackbar = () => {
            context.emit('close-snackbar');
        }

        
        return { isVisible, closeSnackbar }
    }
}
</script>