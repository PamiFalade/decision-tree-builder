<template>
  <v-app id="mainPage">
      <TaskBar 
          :initialTreeTitle="treeTitle" 
          :databaseRecords="databaseRecords"
          @showDatabaseModal="onShowDatabaseModal" 
          @toggleShowSettingsModal="onToggleShowSettingsModal"
          @saveDecisionTree="onSaveDecisionTree" 
          @updateTreeTitle="onUpdateTreeTitle"
          @loadDecisionTree="onLoadDecisionTree"
          @deleteDecisionTree="onDeleteDecisionTree"
          @highlightPath="onSelectHighlightOption"
      />
      <DeleteTreeModal :decisionTreeName="treeToDelete" :treeID="treeIdToDelete" v-show="showDeleteModal" @hideModal="handleHideModal" @deleteDecisionTree="onDeleteDecisionTree"/>
      <MainWindow :decisionTreeNodes="decisionTreeNodes" :highlightOption="highlightOption"/>
      <SettingsModal v-show="showSettingsModal" @highlightPath="onSelectHighlightOption"/>
  </v-app>
</template>

<script>

  import TaskBar from './views/TaskBar.vue';
  import MainWindow from './views/MainWindow.vue';
  import LoadDataModal from './views/LoadDataModal.vue';
  import SettingsModal from './views/SettingsModal.vue';
  import DeleteTreeModal from './views/DeleteTreeModal.vue';

  import json from "./data/Starting_Input_Data.json";
  import DecisionTreeDTO from './services/DecisionTreeDTO';

  export default {
    name: 'App',
    components: {
      TaskBar,
      MainWindow,
      LoadDataModal,
      SettingsModal,
      DeleteTreeModal
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
        treeToDelete: "",
        treeIdToDelete: -1,
        highlightOption: "none"
      }
    },
    methods: {

      onToggleShowSettingsModal(){
        this.showSettingsModal = !this.showSettingsModal;
      },

      onShowDeleteTreeModal(tree_id, tree_name){
        this.showDeleteModal = true;
        this.treeIdToDelete = tree_id;
        this.treeToDelete = tree_name;
      },

      onHideDeleteModal() {
        this.showDeleteModal = false;
      },

      onUpdateTreeTitle(newTitle) {
        this.treeTitle = newTitle;
      },

      onDecisionTreeDeleted() {
        this.treeIdToDelete = -1;
        this.treeToDelete = "";
      },

      handleHideModal() {
        if(this.showDeleteModal) {
          this.onHideDeleteModal();
        }
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
