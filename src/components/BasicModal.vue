<template>
    <div ref="modalRef" class="modalCard">
        <div class="modalHeader">
            <img src='../assets/close_icon_black.svg' 
                    class="closeButton"
                    @click="closeModal"/>
            <slot name="modalTitle">
                Title
            </slot>
        </div>
        <div class="modalBody">
            <slot name="modalContent">
                Content
            </slot>
        </div>

        <div class="modalActions">
            <slot name="modalFooter">
                Footer
            </slot>
        </div>

    </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
    name: 'BasicModal',
    props: {
        'size': String
    },
    setup(props, context) {
        const modalSize = props.size;
        const modalRef = ref(null);

        onMounted(() => {
            modalSize === 'large' ? modalRef.value.classList.add('largeModal') : modalRef.value.classList.add('smallModal');
        });

        // When close button is clicked, emit the event so that the modal will be closed.
        const closeModal = () => {
            context.emit('hideModal');
        }

        return { closeModal, modalRef };
    }
}
</script>



<style scoped>

.modalCard {
    padding: 3px;
    position: absolute;
    top: 20%;
    left: 25%;
    padding: 0 2% 2% 2%;
    border-radius: 2%;
    background-color: lightgrey;
    border: solid 1px black;
}
.largeModal {
    height: 65%;
    width: 50%;
}
.smallModal {
    height: 25%;
    width: 40%;
}

.modalHeader {
    min-height: 10%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: center;
    align-items: center;
}

.modalBody {
    min-height: 50%;
    max-height: 75%;
    width: 100%;
    padding-left: 0;
    margin-left: 2.5%;
    list-style: none;
    overflow-y: scroll;
}

.modalActions {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row-reverse;
}

</style>