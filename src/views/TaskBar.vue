<template>
    <v-app-bar class="px-3 py-4">

        <v-btn
            class="mx-2"
            icon 
            @click="toggleShowSettingsModal">
            <v-icon size="30" icon="mdi-cog"/>
        </v-btn>

        <v-btn
            class="mx-2"
            icon
            @click="saveTree">
            <v-icon size="30" icon="mdi-content-save" />
        </v-btn>

        <EditableTitle :inputValue="initialTreeTitle" @textChanged="updateTreeTitle"/>

        <v-btn 
            class="mx-2 bg-green"
            rounded="md" 
            @click="">
            Export
        </v-btn>

        <v-btn 
            class="mx-2 bg-blue-darken-2"
            rounded="md" 
            @click="showDatabaseModal">
            Load Tree
        </v-btn>

    </v-app-bar>
</template>


<script>
import EditableTitle from '../components/EditableTitle.vue';

export default {
    name: 'TaskBar',
    components: {
        EditableTitle
    },
    props: {
        initialTreeTitle: String
    },
    data() {
        return {
            title: "",
        }
    },
    mounted(){
        this.title = this.initialTreeTitle;
    },
    watch: {
        title(value) {
            this.$emit('updateTreeTitle', value);
        },
        initialTreeTitle(value) {
            this.title = value;
        }
    },
    methods: {
        showDatabaseModal(){
            this.$emit('showDatabaseModal');
        },
        toggleShowSettingsModal(){
            this.$emit('toggleShowSettingsModal');
        },
        saveTree(){
            this.$emit('saveDecisionTree')
        },
        updateTreeTitle(updatedTitle){
            console.log(updatedTitle);
            this.$emit('updateTreeTitle', updatedTitle);
        }
    }
}

</script>

<style>

#mainTaskBar{
    width: 100vw;
    height: 8vh;
    padding: 2vh 3vw;
    align-items: center;
    justify-content: center;
}

#taskBarComponents {
    display: grid;
    grid-template-columns: 1fr 1fr 5fr 1fr 1fr;
    column-gap: 2vw;
    grid-template-rows: 1fr;
    justify-content: center;
    align-items: center;
}

.imgBtn {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
 }
.imgBtn img {
    max-width: 30px;
    max-height: 30px;
}
.imgBtn:hover {
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
}

.middle {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightSide {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Styling for export dropdown menu */
.dropbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #3e8e41;}
/* End styling for export dropdown */

#loadBtn {
    width: 115px;
    padding: 16px;
}

</style>