<template>

    <v-text-field 
        class="mx-7 pt-1 title-input"
        type="input"
        :readonly="disableEditTitle"
        v-model="text"
        @input="onTextChange"
        >
        <template v-slot:append-inner >
            <v-icon class="disableEditTitleBtn"  @click="onClickTitleInput" v-if="!disableEditTitle" size="30" icon="mdi-pencil" color="black" />
            <v-icon class="disableEditTitleBtn"  @click="onClickTitleInput" v-else size="30" icon="mdi-pencil" color="grey" />
        </template>
    </v-text-field>

</template>

<script>
export default {
    name: 'EditableTitle',
    props: {
        inputValue: String
    },
    data() {
        return {
            disableEditTitle: true,
            text: ""
        }
    },
    watch: {
        inputValue(value) {
            this.text = value;
        },
    },
    mounted() {
        this.text = this.inputValue;
    },
    methods: {
        onClickTitleInput() {
            this.disableEditTitle = !this.disableEditTitle;
        },
        onTextChange(event) {
            this.$emit('textChanged', event.target.value);
        }
    }

}
</script>

<style>

.title-input input {
    text-align: center;
    font-size: xx-large;
}

.disableEditTitleBtn {
    height: 100%;
}

</style>