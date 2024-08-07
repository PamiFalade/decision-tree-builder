<template>
    <div class="popups" :style="cssProps" >
        <img src="../assets/close_icon_red.svg" class="imgButton" v-if="nodeType !='Root'" @click="deleteChildNode" />
        <div id="popupNodeButtons" >
            <div id="addNodeButtons" v-if="nodeType !='Terminal'" >
                <img src="../assets/red_square.svg" class="imgButton" @click="addDecisionChildNode" />
                <img src="../assets/yellow_circle.svg" class="imgButton" @click="addChanceChildNode" />
                <img src="../assets/green_triangle.svg" class="imgButton" @click="addTerminalChildNode" />
                <div class="vLine" v-if="nodeType !='Terminal'" ></div>
            </div>
            <img src="../assets/info_icon.svg" class="imgButton" @click="toggleNodeWindow" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            xPos: Number,
            yPos: Number,
            nodeType: String
        },
        methods: {
            toggleNodeWindow() {
                this.$emit('toggleNodeWindow');
            },
            addDecisionChildNode() {
                this.$emit('addDecisionNode');
            },
            addChanceChildNode() {
                this.$emit('addChanceNode');
            },
            addTerminalChildNode() {
                this.$emit('addTerminalNode');
            },
            deleteChildNode() {
                this.$emit('deleteNode');
            }
        },
        computed: {
            cssProps(){
                return{
                    '--x-Coordinate': (this.xPos - 30) + "px",    // It's this way because of how the d3 tree API does not change the coordinate system for horizontal trees
                    '--y-Coordinate': (this.yPos - 40) + "px"
                }
            }
        }
    }
</script>


<style scoped>

    .popups {
        width: auto;
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
        max-width: 80%;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: lightgrey;
        border: 1px solid black;
        border-radius: 7%;
        padding: 2px;
    }
    
    #addNodeButtons {
        max-width: 60%;
        height: 100%;
        margin-right: 3px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #popupNodeButtons > * {
        margin-left: 3px;
    }

    #addNodeButtons > * {
        margin-left: 3px;
    }

    .vLine {
        height: 90%;
        width: 1px;
        background-color: black;
        border: solid 1px black;
    }

    .imgButton {
        height: 90%;
    }

    .imgButton:hover {
        cursor: pointer;
    }
</style>