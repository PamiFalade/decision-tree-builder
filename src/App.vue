<template>
  <div id="mainPage">
    <TaskBar :initialTreeTitle="treeTitle" @showDatabaseModal="onShowDatabaseModal" @saveDecisionTree="onSaveDecisionTree" @updateTreeTitle="onUpdateTreeTitle"/>
    <LoadDataModal v-show="showModal" @hideDatabaseModal="onHideDatabaseModal" @loadDecisionTree="onLoadDecisionTree"/>
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
        currentUser: "pamilerin@intern.mudozangl",
        treeTitle: "New Decision Tree",
        treeDescription: "Practice decision tree saving",
        decisionTreeNodes: {
          "name": "Root Node",
          "id": 1,
          "attributes": {
              "type": "Root",
              "yield": null,
              "expectedValue": 0,
              "probability": 1.0,
              "onBestPath": false,
              "onWorstPath": false
          },
          "children": []
        },
        showModal: false
      }
    },
    methods: {
      onShowDatabaseModal() {
        this.showModal = true;
      },

      onHideDatabaseModal() {
        this.showModal = false;
      },

      onUpdateTreeTitle(newTitle) {
        this.treeTitle = newTitle;
      },

      async onLoadDecisionTree(decisionTreeId) {
        this.showModal = false;
        const loadedTree = await DecisionTreeDTO.getTree(decisionTreeId);
        this.treeTitle = loadedTree.data.title;
        this.decisionTreeNodes = { ...loadedTree.data.decisionTreeNodes };
        console.log(this.decisionTreeNodes);
      },

      async onSaveDecisionTree() {
        const newDecisionTree = {
          title: this.treeTitle,
          createdBy: this.currentUser,
          description: this.treeDescription,
          decisionTreeNodes: this.decisionTreeNodes
        }
        const savedTree = await DecisionTreeDTO.saveTree(newDecisionTree);
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
