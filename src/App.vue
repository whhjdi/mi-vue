<template>
  <div id="app">
    <keep-alive><router-view /></keep-alive> <the-footer></the-footer>
  </div>
</template>
<script>
import TheFooter from "./components/TheFooter";
import { mapActions } from "vuex";
export default {
  components: { TheFooter },
  methods: {
    ...mapActions(["cartCount"])
  },
  created() {
    this.cartCount();
  }
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
