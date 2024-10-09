<template>

    <v-text-field 
        class="mx-7 pt-1 title-input"
        :class="disabledStyle"
        type="input"
        :readonly="disableEditTitle"
        v-model="text"
        @hover="disableEditTitle ? cursor: pointer"
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
            text: "",
            disabledStyle: "disabled-element"
        }
    },
    watch: {
        inputValue(value) {
            this.text = value;
        },
        disableEditTitle(value){
            this.disabledStyle = value ? "disabled-element" : "";
        }
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

.disabled-element input {
    color: grey;
    cursor: not-allowed;
}

.disableEditTitleBtn {
    height: 100%;
}

</style>