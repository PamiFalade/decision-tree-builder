<template>
  <div id="mainPage">
    <TaskBar :title="treeTitle" @showDatabaseModal="showDatabaseModal"/>
    <LoadDataModal v-show="showModal" @hideDatabaseModal="hideDatabaseModal" @loadDecisionTree="loadDecisionTree"/>
    <MainWindow :decisionTreeNodes="decisionTreeNodes" />
  </div>
</template>

<script>

  import TaskBar from './components/TaskBar.vue';
  import MainWindow from './components/MainWindow.vue';
  import LoadDataModal from './components/LoadDataModal.vue';

  import json from "./data/Starting_Input_Data.json";
import DecisionTreeDTO from './services/DecisionTreeDTO';

  export default {
    name: 'App',
    components: {
      TaskBar,
      MainWindow,
      LoadDataModal
    },
    data() {
      return {
        inputData: json,
        treeTitle: "New Decision Tree",
        decisionTreeNodes: {
          "name": "Root Node",
          "id": 1,
          "attributes": {
              "type": "Root",
              "expectedValue": 82724,
              "probability": 1.0
          },
          "children": []
        },
        showModal: false
      }
    },
    methods: {
      showDatabaseModal() {
        this.showModal = true;
      },

      hideDatabaseModal() {
        this.showModal = false;
      },

      async loadDecisionTree(decisionTreeId) {
        this.showModal = false;
        const loadedTree = await DecisionTreeDTO.getTree(decisionTreeId);
        this.treeTitle = loadedTree.data.title;
        this.decisionTreeNodes = { ...loadedTree.data.decisionTreeNodes };
        console.log(this.decisionTreeNodes);
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
