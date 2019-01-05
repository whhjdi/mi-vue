<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img :src="item.item.pic_url" alt="" class="banner" />
      </van-swipe-item>
    </van-swipe>
    <div class="recommend">
      <h2 class="title">{{ recommend.title }}</h2>
      <ul class="list-wrapper">
        <li
          v-for="(item, index) in recommend.items"
          class="list-item"
          :key="index"
          :style="{ backgroundColor: item.item.bg_color }"
        >
          <div class="title" :style="{ color: item.item.title_color }">
            {{ item.item.title }}
          </div>
          <div class="subtitle" :style="{ color: item.item.subtitle_color }">
            {{ item.item.subtitle }}
          </div>
          <img v-lazy="item.item.pic_url" alt="" class="item-img" />
        </li>
      </ul>
    </div>
    <div class="newProduct-wrapper">
      <home-list :list="newProduct" @handleDetail="handleDetail"></home-list>
    </div>
    <div class="home-list-wrapper">
      <div
        class="home-list"
        v-for="item in homeCategory"
        :key="item.data.floor_id"
      >
        <h2 class="title">{{ item.data.title }}</h2>
        <home-list :list="item.data" @handleDetail="handleDetail"></home-list>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import HomePage from "../api/home.js";
import HomeList from "../components/HomeList";
export default {
  name: "Home",
  components: {
    HomeList,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {},
  data() {
    return {
      banners: [],
      recommend: {},
      newProduct: {},
      homeCategory: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getBanner() {
      const res = await HomePage.fetchHomePage();
      let homepage = res.data.homepage.floors;
      // let selfRecommend = res.data.recommend.floors;
      let homeCategory = [];
      homepage.forEach(item => {
        switch (item.floor_id) {
          case 189:
            this.banners = item.data.items;
            break;
          case 929:
            this.recommend = item.data;
            break;
          case 33:
            this.newProduct = item.data;
            break;
          default:
        }
        if (item.module_key === "product_category") {
          homeCategory = homeCategory.concat(item);
          this.homeCategory = homeCategory;
        }
      });
    },
    handleDetail(id) {
      this.$router.push({
        name: "detail",
        params: {
          id
        }
      });
    }
  },
  created() {
    this.getBanner();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  top: 0;
  bottom: 60px;
  left: 0;
  right: -8px;
  padding: 0 8px 8px 0;
  background: #fefefe;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .banner {
    width: 100%;
  }
  .recommend {
    margin-bottom: 10px;
    .list-wrapper {
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 1%;
      .list-item {
        width: 48%;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 4px;
        padding: 2px;
        .title {
          align-self: flex-start;
          margin: 10px 0 0 14px;
        }
        .subtitle {
          align-self: flex-start;
          font-size: 12px;
          margin: 10px 0 0 14px;
        }
        .item-img {
          width: 50%;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
