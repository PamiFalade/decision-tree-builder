<template>
    <div class="popups" :style="cssProps" >
        <img src="../assets/close_icon_red.svg" />
        <div id="popupNodeButtons">
            <img src="../assets/red_square.svg" />
            <img src="../assets/yellow_circle.svg" />
            <img src="../assets/green_triangle.svg" />
            <div class="vLine"></div>
            <img src="../assets/info_icon.svg" @click="toggleNodeWindow"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            xPos: Number,
            yPos: Number
        },
        methods: {
            toggleNodeWindow() {
                this.$emit('toggleNodeWindow');
            }
        },
        computed: {
            cssProps(){
                return{
                    '--x-Coordinate': (this.yPos  + 64 - 30) + "px",    // It's this way because of how the d3 tree API does not change the coordinate system for horizontal trees
                    '--y-Coordinate': (this.xPos  + 376 - 40) + "px"
                }
            }
        }
    }
</script>


<style scoped>

.popups {
    width: 160px;
    height: 25px;
    position: absolute;
    top: var(--y-Coordinate);
    left: var(--x-Coordinate);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.popups > * {
    height: 80%;
}

#popupNodeButtons {
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: lightgrey;
    border: 1px solid black;
    border-radius: 7%;
    padding: 2px;
}

.vLine {
    height: 90%;
    width: 1px;
    background-color: black;
    border: solid 1px black;
}

#popupNodeButtons > * {
    height: 80%;
    margin-left: 3px;
}

</style>