<template>
    <div class="dot"></div>
    <div class="popups">
        <img src="../assets/close_icon_red.svg" />
        <div id="popupNodeButtons">
            <img src="../assets/red_square.svg" />
            <img src="../assets/yellow_circle.svg" />
            <img src="../assets/green_triangle.svg" />
            <div class="vLine"></div>
            <img src="../assets/info_icon.svg" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            xPos: Number,
            yPos: Number
        },
        computed: {
            cssProps(){
                return{
                    '--x-Coordinate': (this.xPos  + 64) + "px",
                    '--y-Coordinate': (this.yPos  + 376) + "px"
                }
            }
        }
    }
</script>


<style scoped>
.dot{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: greenyellow;
    position: absolute;
    top: 376px;
    left: 64px;
    /* top: var(--x-Coordinate); */
    /* left: var(--y-Coordinate); */
}

.popups {
    width: 160px;
    height: 25px;
    position: absolute;
    top: 335px;
    left: 30px;
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