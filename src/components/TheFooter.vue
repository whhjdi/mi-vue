<template>
  <div class="the-footer">
    <div class="footer-wrapper">
      <router-link
        :to="nav.link"
        v-for="nav in navigation"
        :key="nav.icon"
        active-class="on"
        tag="div"
        class="nav"
      >
        <svg class="icon" aria-hidden="true">
          <use
            :xlink:href="nav.link == $route.name ? nav.iconon : nav.icon"
          ></use></svg
        ><span>{{ nav.name }}</span></router-link
      >
    </div>
  </div>
</template>

<script>
const navigation = [
  {
    name: "首页",
    icon: "#icon-homepage",
    iconon: "#icon-homepage_fill",
    link: "home"
  },
  {
    name: "分类",
    icon: "#icon-createtask",
    iconon: "#icon-createtask_fill",
    link: "category"
  },
  {
    name: "购物车",
    icon: "#icon-caigou-xianxing",
    iconon: "#icon-caigou",
    link: "cart"
  },
  {
    name: "我的",
    icon: "#icon-people",
    iconon: "#icon-people_fill",
    link: "user"
  }
];
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      navigation
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.the-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1;
  background: #fff;
  opacity: 0.9;
  box-shadow: 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  .footer-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    color: #000;
    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 1 auto;
      &.on {
        color: #ff3f72;
      }
      .icon {
        margin-bottom: 2px;
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
