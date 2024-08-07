<template>
  <div id="mainPage">
    <TaskBar :title="inputData.title"/>
    <MainWindow :decisionTreeNodes="inputData.decisionTreeNodes" />
  </div>
</template>

<script>

  import TaskBar from './components/TaskBar.vue';
  import MainWindow from './components/MainWindow.vue';
  import json from "./data/Input_Data.json";

  export default {
    name: 'App',
    components: {
      TaskBar,
      MainWindow,
    },
    data() {
      return {
        inputData: json
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 100vh;
    width: 100vw;
  }

  #mainPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10fr 85fr;
    row-gap: 0;
    overflow: hidden;
  }

</style>
