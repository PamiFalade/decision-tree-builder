<template>
  <div id="mainPage">
    <TaskBar title="Decision Tree #1"/>
    <MainWindow />
  </div>
</template>

<script>

  import TaskBar from './components/TaskBar.vue';

  export default {
    name: 'App',
    components: {
      TaskBar
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
  }

  #mainPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10fr 85fr;
    row-gap: 0;
  }

</style>
