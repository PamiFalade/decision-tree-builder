<template>
    <div id="settingsModal" >
        <div id="highlightOptions">
            <h5>Highlight Options</h5>
            <div class="highlightOption">
                <label for="noHighlight">None</label>
                <input type="radio" id="noHighlight" 
                    name="highlightPathGroup" 
                    value="noHighlight" 
                    @change="checkSelectedHighlight"
                    checked>
            </div>

            <div class="highlightOption">
                <label for="highlightMax">Max</label>
                <input type="radio" id="highlightMax" name="highlightPathGroup" value="highlightMax" @change="checkSelectedHighlight">
            </div>
            
            <div class="highlightOption">
                <label for="highlightMax">Min</label>
                <input type="radio" id="highlightMin" name="highlightPathGroup" value="highlightMin" @change="checkSelectedHighlight">
            </div>
        </div>
    </div>
</template>

<script>
import { defineEmits } from 'vue';

export default {
    setup(props, context){

        const checkSelectedHighlight = (event) => {
            context.emit('highlightPath', event.target.value);
        }

        return { checkSelectedHighlight }
    }

}
</script>

<style scoped>

#settingsModal {
    width: 15vw;
    height: 20vh;
    border-radius: 3%;
    border: 2px solid black;
    background-color: lightgrey;
    position: absolute;
    top: 15%;
    left: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    overflow-x: scroll;
}

#highlightOptions {
    width: 70%;
    padding: 0 5% 5% 5%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: start;
    border: solid 1px grey;
    border-radius: 5%;
}

.highlightOption {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>