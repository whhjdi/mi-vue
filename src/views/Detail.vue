<template>
  <div class="detail">
    <svg class="icon" aria-hidden="true" @click="goback">
      <use xlink:href="#icon-left"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-home"></use>
    </svg>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations({
      setShowFooter: "SET_SHOW_FOOTER"
    }),
    goback() {
      this.$router.go(-1);
    }
  },
  created() {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setShowFooter(false);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.setShowFooter(true);
    next();
  }
};
</script>
<style lang="scss" scoped></style>
