<template>
  <div class="home">
    <div class="nav-bar">
      <div class="title" slot="left">沐雪商城</div>
      <input
        placeholder="搜一搜"
        class="input"
        readonly
        @click="handleSearch"
      />
      <van-icon name="fire" size="24px" class="nav-icon"></van-icon>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <img :src="item.item.pic_url" alt="" class="banner" />
        </van-swipe-item>
      </van-swipe>
      <div class="recommend">
        <h3 class="title">{{ recommend.title }}</h3>
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
          <h3 class="title">{{ item.data.title }}</h3>
          <home-list :list="item.data" @handleDetail="handleDetail"></home-list>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast, PullRefresh, Icon } from "vant";
import HomePage from "../api/home.js";
import HomeList from "../components/HomeList";
export default {
  name: "Home",
  components: {
    HomeList,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon
  },
  props: {},
  data() {
    return {
      banners: [],
      recommend: {},
      newProduct: {},
      homeCategory: [],
      isLoading: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async onRefresh() {
      await this.getBanner();
      this.$toast({
        message: "刷新成功",
        type: "success",
        duration: 1000
      });
      this.isLoading = false;
    },
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
    },
    handleSearch() {
      console.log(1);
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
  background: #f3f3f3;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 0 10px 1px#ddd;
    height: 40px;
    color: #865c30;
    .title {
      padding: 5px;
      margin: 0 5px;
    }
    .nav-icon {
      padding: 5px;
      margin: 0 5px;
    }
    .input {
      height: 30px;
      font-size: 12px;
      background: #e7e7e7;
      flex: 1;
      outline: none;
      border: none;
      padding: 0 12px;
    }
  }
  .banner {
    width: 100%;
    margin-top: 40px;
  }
  .recommend {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 5px;
    .list-wrapper {
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 1%;
      background: #fff;
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
  .newProduct-wrapper {
    background: #fff;
    margin-bottom: 10px;
  }
  .home-list-wrapper {
    .home-list {
      padding: 10px 5px;
      margin-bottom: 10px;
      background: #fff;
    }
  }
}
</style>
