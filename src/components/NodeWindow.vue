<!-- Setting up a two-way bind between the MainWindow and NodeWindow over the shoWindow variable, which will control if the NodeWindow is in view, and for which node -->
<script setup>
    const modelValue = defineModel();
    const classInactive = "inactive";   // Used to switch the class of the node window on the click of the close button

    const props = defineProps({
        nodeType: String,
        nodeName: String,
        showWindow: {
            type: String,
            required: true
        }
    });
</script>

<template>
    <div id="nodeWindow" :class="modelValue">
        <div class="windowHeader">
            <img src='../assets/close_icon.svg' 
                class="closeButton"
                @click="$emit('update:modelValue', classInactive)"/>
            <h2 class="windowTitle"> {{ nodeName }} </h2>
            <img src="../assets/yellow_circle.svg" class="nodeImg" />

        </div>

        <div class="windowBody">
            <table>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>EV</th>
                    <th>p</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Terminal</td>
                    <td>High Demand</td>
                    <td>$300</td>
                    <td>0.2</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Terminal</td>
                    <td>Medium Demand</td>
                    <td>$50</td>
                    <td>0.5</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Terminal</td>
                    <td>Low Demand</td>
                    <td>($100)</td>
                    <td>0.3</td>
                </tr>
            </table>

            <button id="addNodeButton">Add Nodes</button>
        </div>

    </div>
</template>


<script>

export default {
    name: 'NodeWindow',
}


</script>


<style>

    #nodeWindow {
        position: absolute;
        bottom: 0;
        background-color: lightgrey;
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 5%;
        transition: 0.4s
    }
    .active {
        right: -3vw;
    }
    .inactive {
        right: -40vw;
    }
    .windowHeader {
        width: 90%;
        height: 15%;
        margin-left: 5%;
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: 1fr;
        justify-content: center;
        align-items: center;
    }

    .closeButton {
        width: 40%;
    }
    .closeButton:hover {
        cursor: pointer;
    }

    .nodeImg {
        width: 50%;
    }

    .windowBody {
        height: 85%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    table {
        border-collapse: collapse;
        position: relative;
        right: 5%;
        width: 80%;
        margin: 5% 0% 10%;
    }
    th {
        background-color: #000435;
        color: white;
    }
    td, th {
        border: 1px solid black;
        padding: 8px;
    }

    #addNodeButton {
        width: 20%;
        height: 12%;
        background-color: #3371FF;
        border-radius: 7%;
        border: 0.3px solid black;
        color: white;
        font-weight: bold;
    }

</style>