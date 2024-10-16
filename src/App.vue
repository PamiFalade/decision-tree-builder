<template>
  <v-app id="mainPage">
      <TaskBar 
          :initialTreeTitle="treeTitle"
          :databaseRecords="databaseRecords"
          @saveDecisionTree="onSaveDecisionTree" 
          @updateTreeTitle="onUpdateTreeTitle"
          @loadDecisionTree="onLoadDecisionTree"
          @deleteDecisionTree="onDeleteDecisionTree"
          @highlightPath="onSelectHighlightOption"
      />
      <MainWindow :decisionTreeNodes="decisionTreeNodes" :highlightOption="highlightOption"/>
  </v-app>
</template>

<script>

  import TaskBar from './views/TaskBar.vue';
  import MainWindow from './views/MainWindow.vue';

  import json from "./data/Starting_Input_Data.json";
  import DecisionTreeDTO from './services/DecisionTreeDTO';

  export default {
    name: 'App',
    components: {
      TaskBar,
      MainWindow,
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
              "yield": 0,
              "expectedValue": 0,
              "probability": 1.0,
              "onBestPath": false,
              "onWorstPath": false,
              "description": "New decision tree"
          },
          "children": []
        },
        databaseRecords: [],
        showSettingsModal: false,
        showDeleteModal: false,
        highlightOption: "none"
      }
    },
    methods: {

      onUpdateTreeTitle(newTitle) {
        this.treeTitle = newTitle;
      },
      
      onSelectHighlightOption(selectedOption){
        console.log(selectedOption);
        this.highlightOption = selectedOption;
      },

      async getAllDecisionTrees() {
        await DecisionTreeDTO.getAllTrees()
                    .then(response => {
                        console.log(response);
                        this.databaseRecords = response.data;
        });
      },

      async onLoadDecisionTree(decisionTreeId) {
        await DecisionTreeDTO.getTree(decisionTreeId)
          .then(loadedTree => {
            this.treeTitle = loadedTree.data.title;
            this.decisionTreeNodes = { ...loadedTree.data.decisionTreeNodes };
          });
        console.log(this.treeTitle);
      },

      async onSaveDecisionTree() {
        const newDecisionTree = {
          title: this.treeTitle,
          createdBy: this.currentUser,
          description: this.treeDescription,
          decisionTreeNodes: this.decisionTreeNodes
        }
        const savedTree = await DecisionTreeDTO.saveTree(newDecisionTree);
        await this.getAllDecisionTrees();
      },

      async onDeleteDecisionTree(treeIdToDelete) {
        await DecisionTreeDTO.deleteTree(treeIdToDelete);
        await this.getAllDecisionTrees();
      }
    },
    async mounted() {
      await this.getAllDecisionTrees();
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10fr 85fr;
    row-gap: 0;
    overflow: hidden;
  }

</style>
