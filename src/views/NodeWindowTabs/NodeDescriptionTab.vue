<template>
    <v-textarea
        bg-color="grey-lighten-2"
        v-model="text"
        auto-grow
        clearable
        @input="onTextChange"
        >
    </v-textarea>

</template>

<script>
import { onMounted, watch } from 'vue';

export default {
    name: 'NodeDescriptionTab',
    props: {
        nodeDescription: String
    },
    data() {
        return {
            text: ""
        }
    },
    watch: {
        nodeDescription(value) {
            this.text = value;
        },
    },
    mounted() {
        this.text = this.nodeDescription;
    },
    methods: {
        onTextChange(event) {
            this.$emit('nodeDescriptionChanged', event.target.value);
        }
    }

}
</script>