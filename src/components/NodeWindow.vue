<script setup>
    import { computed } from 'vue';
    const modelValue = defineModel();
    const classInactive = "inactive";   // Used to switch the class of the node window on the click of the close button

    const props = defineProps({
        selectedNode: {
            name: String,
            attributes: {
                type: String,
                expectedValue: Number,
                probability: Number
            },
            children: Array,
        },
    });

    const getNodeSvg = computed(() => {
        let svgPath = "";
            if(props.selectedNode.attributes.type === "Root"){
                svgPath = "../../maroon_square.svg"
            }
            else if(props.selectedNode.attributes.type === "Decision"){
                svgPath = "../../red_square.svg"
            }
            else if(props.selectedNode.attributes.type === "Chance"){
                svgPath = "../../yellow_circle.svg"
            }
            else if(props.selectedNode.attributes.type === "Terminal"){
                svgPath = "../../green_triangle.svg"
            }
            return svgPath;
    });
</script>

<template>
        <div id="nodeWindow">
            <div class="windowHeader">
                <img src='../assets/close_icon_black.svg' 
                    class="closeButton"
                    @click="closeWindow"/>
                <input id="h2Input" v-model="selectedNode.name" />
                <img :src="getNodeSvg" class="nodeImg" />

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
                    <tr v-for="(childNode, index) in selectedNode.children" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ childNode.attributes.type }}</td>
                        <td class="editableCell" > <input v-model="childNode.name" /> </td>
                        <td>{{ childNode.attributes.expectedValue }}</td>
                        <td>{{ childNode.attributes.probability }}</td>
                    </tr>
                </table>

                <button id="addNodeButton">Add Nodes</button>
            </div>

        </div>
</template>


<script>

export default {
    name: 'NodeWindow',
    components: {
    },
    methods: {
        closeWindow(){
            this.$emit('closeNodeWindow');
        }
    }
}


</script>


<style>

    #nodeWindow {
        position: absolute;
        bottom: 0;
        right: -3vw;
        background-color: lightgrey;
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 5%;
        transition: 0.4s
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
        padding: 8px 0px 8px;
        max-width: 14vw;
        height: 4vh;
        align-items: center;
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

    .editableCell {
        background-color: #E0E0E0;
    }

    input {
        background-color: inherit;
        text-align: center;
        outline: 0; 
        border-width: 0px; 
        border-width: 0 0 0.5px; 
        border-color: #7B7B7B;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    td > input {
        width: 90%;
        height: 100%;
        font-size: medium;
    }

    #h2Input {
        width: 85%;
        height: 50%;
        font-size: xx-large;
    }

    input:focus {
        border-width: 0 0 2px; 
        border-color: #3371FF;
    }

</style>