<template>
  <v-app>
      <TaskBar :initialTreeTitle="treeTitle" 
          @showDatabaseModal="onShowDatabaseModal" 
          @toggleShowSettingsModal="onToggleShowSettingsModal"
          @saveDecisionTree="onSaveDecisionTree" 
          @updateTreeTitle="onUpdateTreeTitle"
      />
      <LoadDataModal v-show="showDBModal" 
          :databaseRecords="databaseRecords" 
          @hideModal="handleHideModal" 
          @loadDecisionTree="onLoadDecisionTree" 
          @promptDeleteDecisionTree="onShowDeleteTreeModal"
      />
      <DeleteTreeModal :decisionTreeName="treeToDelete" :treeID="treeIdToDelete" v-show="showDeleteModal" @hideModal="handleHideModal" @deleteDecisionTree="onDeleteDecisionTree"/>
      <MainWindow :decisionTreeNodes="decisionTreeNodes" :highlightOption="highlightOption"/>
      <SettingsModal v-show="showSettingsModal" @highlightPath="onSelectHighlightOption"/> -->
  </v-app>
</template>

<script>

  import TaskBar from './components/TaskBar.vue';
  import MainWindow from './components/MainWindow.vue';
  import LoadDataModal from './components/LoadDataModal.vue';
  import SettingsModal from './components/SettingsModal.vue';
  import DeleteTreeModal from './components/DeleteTreeModal.vue';

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
        showDBModal: false,
        showSettingsModal: false,
        showDeleteModal: false,
        treeToDelete: "",
        treeIdToDelete: -1,
        highlightOption: "none"
      }
    },
    methods: {
      onShowDatabaseModal() {
        this.showDBModal = true;
      },

      onHideDatabaseModal() {
        this.showDBModal = false;
      },

      onToggleShowSettingsModal(){
        this.showSettingsModal = !this.showSettingsModal;
      },

      onShowDeleteTreeModal(tree_id, tree_name){
        this.showDBModal = false;
        this.showDeleteModal = true;
        this.treeIdToDelete = tree_id;
        this.treeToDelete = tree_name;
      },

      onHideDeleteModal() {
        this.showDeleteModal = false;
        this.showDBModal = true;
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
        else {
          this.onHideDatabaseModal();
        }
      },

      onSelectHighlightOption(selectedOption){
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
        this.showDBModal = false;
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

      async onDeleteDecisionTree() {
        await DecisionTreeDTO.deleteTree(this.treeIdToDelete);
        await this.getAllDecisionTrees();
        this.handleHideModal();
        this.resetDeleteVariables();
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
