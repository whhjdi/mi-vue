<template>
  <div class="detail">
    <header class="header">
      <svg class="icon" aria-hidden="true" @click="goback">
        <use xlink:href="#icon-left"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-home"></use>
      </svg>
    </header>
    <van-swipe :autoplay="3000" indicator-color="white" class="swiper">
      <van-swipe-item
        v-for="(item, index) in galleryView"
        :key="index"
        class="swiper-item"
      >
        <img :src="item" alt="" class="swiper-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Swipe, SwipeItem } from "vant";
import HomePage from "../api/home.js";
export default {
  name: "Detail",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {},
  data() {
    return {
      galleryView: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations({
      setShowFooter: "SET_SHOW_FOOTER"
    }),
    goback() {
      this.$router.go(-1);
    },
    async getProductView(id) {
      const res = await HomePage.fetchProductView(id);
      this.setProductView(res);
    },
    setProductView(res) {
      let data = res.data;
      let viewContent = data.view_content;
      let descTabsView = viewContent.descTabsView.descTabsView;
      this.galleryView = viewContent.galleryView.galleryView;
    }
  },
  created() {
    this.getProductView(this.$route.params.id);
  },
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
<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 40px;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    box-sizing: border-box;
    .icon {
      width: 24px;
      height: 24px;
      padding: 5px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      color: #fff;
    }
  }
  .swiper {
    .swiper-item {
      .swiper-img {
        width: 100%;
      }
    }
  }
}
</style>
