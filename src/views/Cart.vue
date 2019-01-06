<template>
  <div class="cart">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="购物车"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <van-icon name="search" slot="right" color="#000" size="20px" />
      </van-nav-bar>
    </van-popup>
  </div>
</template>

<script>
import { titleNavBarMinxin } from "../mixins.js";
export default {
  name: "cart",
  components: {},
  mixins: [titleNavBarMinxin],
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.cart {
  .van-nav-bar {
    height: 50px;
  }
}
</style>
