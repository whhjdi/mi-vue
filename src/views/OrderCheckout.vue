<template>
  <div class="checkout">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="用户结算"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <van-icon name="wap-home" slot="right" color="#000" size="20px" />
      </van-nav-bar>
    </van-popup>
    <router-link
      :to="{ name: 'addressList' }"
      :style="{ marginTop: '100px' }"
      tag="div"
      >qwe</router-link
    >
  </div>
</template>

<script>
import { titleNavBarMixin, setFooterMixin } from "../mixins.js";
import { mapMutations } from "vuex";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  mixins: [titleNavBarMixin, setFooterMixin],
  computed: {},
  methods: {
    ...mapMutations({
      setShowFooter: "SET_SHOW_FOOTER"
    }),
    onClickRight() {
      this.$router.push({
        name: "home"
      });
    }
  },
  created() {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!from.name) {
        vm.$router.push({
          name: "home"
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped></style>
