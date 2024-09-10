<template>

    <div id="mainTaskBar">
        <div id="taskBarComponents">
            <div class="imgBtn">
                <img src="../assets/clear_icon.svg"/>
            </div>

            <div class="imgBtn" @click="saveTree">
                <img class="imgBtn" src="../assets/save_icon.svg"/>
            </div>
            
            <h2>{{ title }}</h2>

            <div class="dropdown">
                <button class="dropbtn">Export</button>
                <div class="dropdown-content">
                    <a href="#">PNG</a>
                    <a href="#">PDF</a>
                    <a href="#">Excel</a>
                </div>
            </div>
            
            <button id="loadBtn" @click="showDatabaseModal">
                Load Data
            </button>
        </div>
    </div>

</template>


<script>
export default {
    name: 'TaskBar',
    props: {
        title: String
    },
    methods: {
        showDatabaseModal(){
            this.$emit('showDatabaseModal');
        },
        saveTree(){
            this.$emit('saveDecisionTree')
        }
    }
}

</script>

<style>
.testBtn {
    background-color: #F3F3F3;
}
#mainTaskBar{
    width: 95vw;
    height: 8vh;
    background-color: grey;
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