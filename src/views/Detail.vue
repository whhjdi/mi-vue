<template>
  <div class="detail">
    <header class="header">
      <svg class="icon" aria-hidden="true" @click="goback">
        <use xlink:href="#icon-left"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="gohome">
        <use xlink:href="#icon-home"></use>
      </svg>
    </header>
    <van-swipe :autoplay="3000" indicator-color="white" class="swiper">
      <van-swipe-item
        v-for="(item, index) in galleryView"
        :key="index"
        class="swiper-item"
      >
        <img v-lazy="item" alt="" class="swiper-img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 标题 -->
    <div class="overview">
      <div class="goods-name">{{ titleView.name }}</div>
      <div class="goods-brief" v-html="titleView.product_desc"></div>
      <div class="goods-price">
        <div class="price cur-price">￥{{ selectedGood.price }}</div>
        <div
          class="price origin-price"
          v-show="selectedGood.market_price > selectedGood.price"
        >
          ￥{{ selectedGood.market_price }}
        </div>
      </div>
    </div>
    <!-- product-section 促销 -->
    <div class="product-section">
      <div class="wrapper">
        <div class="title">促销</div>
        <div class="flex">
          <div class="act-icon">
            <div class="icon-desc">{{ canJoinActs.type_desc }}</div>
            <div class="icon-title">{{ canJoinActs.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- product-section 已选 -->
    <div class="product-section more" @click="showSku = true">
      <div class="wrapper">
        <div class="title">已选</div>
        <div class="flex">
          <div class="info">
            {{ selectedGood.name }} x{{ selectedGood.buyNumber }}
          </div>
          <div class="act-icon"></div>
        </div>
      </div>
    </div>
    <!-- product-section 地址，现货 -->
    <div class="product-section more" @click="showAddressPop = true">
      <div
        class="border-top-1px ui-flex align-start justify-start J_linksign-customize"
      >
        <div class="title">送至</div>
        <div class="flex">
          <div class="info">
            <span class="mr1x">{{ areaData }}</span>
            <!-- <span class="on">{{
              deliveryData.datas.length ? "有现货" : "无现货"
            }}</span> -->
          </div>
        </div>
      </div>
    </div>
    <!-- product-section 保险-->
    <div class="product-section">
      <div class="wrapper service-policy-list">
        <!-- <div
          v-for="(list, index) in selectedGood.service_refound_policy_list.list"
          :key="index"
          class="flex service-policy-item"
        >
          <img :src="list.img_url" class="mr1x img-icon" />
          <span class="fsc1">{{ list.item_name }}</span>
        </div> -->
      </div>
    </div>
    <!-- area选择 -->
    <van-popup v-model="showAddressPop" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="confirmArea"
        @cancel="cancelArea"
      />
    </van-popup>

    <!-- 底栏 -->
    <van-goods-action>
      <van-goods-action-mini-btn
        icon="chat-o"
        text="客服"
        @click="onClickMiniBtn"
      />
      <van-goods-action-mini-btn
        icon="cart-o"
        text="购物车"
        @click="onClickMiniBtn"
      />
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn" />
      <van-goods-action-big-btn
        primary
        text="立即购买"
        @click="onClickBigBtn"
      />
    </van-goods-action>
    <!-- sku -->
    <van-popup v-model="showSku" position="bottom">
      <Sku
        ref="sku"
        :productData="productData"
        @hideSku="closeSku"
        @selectSKU="selectSKU"
      ></Sku>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Area,
  Popup
} from "vant";
import HomePage from "../api/home.js";
import Sku from "../components/Sku";
import areaList from "../mock/area.js";
export default {
  name: "Detail",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Area.name]: Area,
    [Popup.name]: Popup,
    Sku
  },
  props: {},
  data() {
    return {
      showSku: false,
      showAddressPop: false,
      areaList: areaList,
      galleryView: [],
      productData: {},
      default_goods_id: null,
      buy_option: [],
      goods_info: [],
      titleView: {},
      canJoinActs: [],
      commentView: {},
      descTabsView: [],
      selectedGood: {},
      deliveryData: [
        {
          code: "110000",
          name: "北京市"
        },
        {
          code: "110100",
          name: "北京市"
        },
        {
          code: "110101",
          name: "东城区"
        }
      ]
    };
  },
  watch: {},
  computed: {
    areaData() {
      let data = "";
      this.deliveryData.forEach(item => {
        data += " " + item.name;
      });
      return data;
    }
  },
  methods: {
    ...mapMutations({
      setShowFooter: "SET_SHOW_FOOTER"
    }),
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({
        name: "home"
      });
    },
    async getProductView(id) {
      const res = await HomePage.fetchProductView(id);
      this.setProductView(res);
    },
    setProductView(res) {
      let data = res.data;
      let viewContent = data.view_content;
      this.productData = data;
      this.default_goods_id = data.default_goods_id;
      this.buy_option = data.buy_option;
      this.goods_info = data.goods_info;
      this.galleryView = viewContent.galleryView.galleryView; //轮播
      this.titleView = viewContent.titleView.titleView; //轮播下方的标题
      this.canJoinActs = this.titleView.canJoinActs[0];
      this.commentView = viewContent.commentView.commentView;
      let descTabsView = viewContent.descTabsView.descTabsView;
      descTabsView.forEach(item => {
        let tabContent = item.tabContent;
        if (tabContent.length > 3) {
          item.showTabContent = tabContent.slice(0, 3);
          item.moreTabContent = tabContent.slice(3);
        } else {
          item.showTabContent = tabContent;
        }
        item.showMore = false;
      });
      this.descTabsView = descTabsView;
    },
    onClickMiniBtn() {
      console.log("onClickMiniBtn");
    },
    onClickBigBtn() {
      this.showSku = true;
    },
    closeSku() {
      this.showSku = false;
    },
    selectSKU(val) {
      this.selectedGood = val;
    },
    confirmArea(arr) {
      console.log(arr);
      this.deliveryData = arr;
      this.showAddressPop = false;
    },
    cancelArea() {
      this.showAddressPop = false;
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
  overflow: auto;
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
  .overview {
    margin-bottom: 20px;
    .goods-name {
      font-size: 24px;
      font-weight: 800px;
      text-align: left;
      margin: 20px;
    }
    .goods-brief {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.54);
    }
    .goods-price {
      padding: 10px;
      text-align: left;
      .cur-price {
        color: #ff6700;
        font-size: 24px;
        font-weight: 700;
      }
      .origin-price {
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        text-decoration: line-through;
      }
    }
  }
  .product-section {
    position: relative;
    padding: 10px 16px;
    background: #f6f6f6;
    border-top: 1px;
    text-align: left;
    border-radius: 8px;
    margin: 5px 10px;
    .title {
      width: 41px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
      line-height: 20px;
    }
    .flex {
      display: flex;
      .info {
        font-size: 14px;
      }
    }
    .act-icon {
      position: relative;
      padding-right: 10%;
      white-space: nowrap;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon-desc {
        color: #f56600;
        border-radius: 1px;
        padding: 1.5px 2.5px 0.5px;
        margin: 0 0 0.5px;
        font-size: 8px;
        &:before {
          border-color: #f56600;
        }
      }
      .icon-title {
        margin-left: 4.17px;
        font-size: 12px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.87);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .more:after {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-left: 1px solid currentColor;
    border-top: 1px solid currentColor;
    transform: translate3d(0, -50%, 0) rotate(135deg);
  }
}
</style>
