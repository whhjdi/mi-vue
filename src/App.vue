<template>
  <div id="app"><router-view /> <the-footer></the-footer></div>
</template>
<script>
import TheFooter from "./components/TheFooter";
export default {
  components: { TheFooter }
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
