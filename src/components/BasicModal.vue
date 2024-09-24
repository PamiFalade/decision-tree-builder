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
            console.log('mounted');
            modalSize === 'large' ? modalRef.value.classList.add('largeModal') : modalRef.value.classList.add('smallModal');
        });

        // When close button is clicked, emit the event so that the modal will be closed.
        const closeModal = () => {
                context.emit('hideDatabaseModal');
            }

        return { closeModal, modalRef };
    }
}
</script>



<style scoped>

.modalCard {
    width: 50%;
    padding: 3px;
    position: absolute;
    top: 20%;
    left: 25%;
    padding: 5px;
    border-radius: 2%;
    background-color: lightgrey;
}
.largeModal {
    height: 65%;
}
.smallModal {
    height: 35%;
}

.modalHeader {
    height: 10%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: center;
    align-items: center;
}

.modalBody {
    height: 70%;
    width: 100%;
    padding-left: 0;
    margin-left: 2.5%;
    list-style: none;
    overflow-y: scroll;
}

.modalActions {
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row-reverse;
}

</style>