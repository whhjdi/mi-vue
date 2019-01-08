<template>
  <div class="category">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="分类"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <van-icon name="search" slot="right" color="#000" size="20px" />
      </van-nav-bar>
    </van-popup>
    <div class="nav">
      <ul class="nav-list">
        <li
          v-for="(item, index) in nav"
          :key="item.ucid"
          class="list-item"
          :class="{ active: currentIndex === index }"
          @click="selectItem(item, index)"
        >
          <div class="name">{{ item.category_name }}</div>
        </li>
      </ul>
    </div>
    <div class="detail" ref="detail" id="detail" @touchstart="scrollDetail">
      <div
        v-for="(list, index) in nav"
        :key="list.category_id"
        :ref="'category' + index"
        class="list-item-wrapper"
      >
        <div class="content">
          <div class="group-title">
            <div class="group-img">
              <img v-lazy="list.category_img" alt="" />
            </div>
            <div class="category_name">-{{ list.category_name }}-</div>
          </div>
          <ul class="group-list-wrapper">
            <li
              v-for="(item, index) in list.category_list"
              :key="'title' + index"
              class="group-list-item"
            >
              <div class="category-title">{{ item.category_title }}</div>
              <div class="group-wrapper">
                <category-group :list="item.category_group"></category-group>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomePage from "../api/home.js";
import CategoryGroup from "../components/CategoryGroup";
import { titleNavBarMinxin } from "../mixins.js";
export default {
  name: "category",
  components: {
    CategoryGroup
  },
  mixins: [titleNavBarMinxin],
  props: {},
  data() {
    return {
      nav: [],
      currentIndex: 0,
      offsetTop: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    onClickRight() {},
    async getCategory() {
      const res = await HomePage.fetchCategory();
      this.setCategory(res);
    },
    setCategory(res) {
      this.nav = res.data.lists;
      this.$nextTick(() => {
        this.nav.forEach((item, index) => {
          this.offsetTop.push(this.$refs["category" + index][0].offsetTop);
        });
      });
    },
    selectItem(item, index) {
      this.currentIndex = index;
      let top = this.offsetTop[index];
      let detail = this.$refs.detail;
      detail.removeEventListener("scroll", this.scrollHandler);
      detail.scrollTo(0, top);
    },
    scrollDetail() {
      this.$refs.detail.addEventListener("scroll", this.handleScroll);
    },
    handleScroll() {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        let scrollTop = this.$refs.detail.scrollTop;
        let len = this.offsetTop.length;
        for (let index = 0; index < len; index++) {
          if (
            scrollTop >= this.offsetTop[index] &&
            scrollTop < this.offsetTop[index + 1]
          ) {
            this.currentIndex = index;
            break;
          }
        }
      }, 100);
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.category {
  .van-nav-bar {
    height: 50px;
  }
  .nav {
    width: 100px;
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 60px;
    right: -8px;
    padding: 8px 6px 8px 0;
    background: #fefefe;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .nav-list {
      border-right: 1px solid #e8e8e8;
      .list-item {
        font-size: 14px;
        padding: 5px 10px;
        margin-bottom: 20px;
        &.active {
          border-left: 4px solid #855a30;
          color: #855a30;
        }
      }
    }
  }
  .detail {
    margin-left: 100px;
    position: fixed;
    left: 0;
    top: 50px;
    bottom: 60px;
    overflow: auto;
    right: -8px;
    padding: 8px 6px 8px 0;
    background: #fefefe;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .list-item-wrapper {
      .content {
        .group-title {
          margin: 20px 0;
          .group-img {
            height: 120px;
          }
          .category_name {
            color: #855a30;
            margin: 10px 0;
          }
        }
        .group-list-wrapper {
          .group-list-item {
            margin-bottom: 10px;
            .category-title {
              margin-bottom: 15px;
              margin-left: 20px;
              font-size: 14px;
              text-align: left;
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>
