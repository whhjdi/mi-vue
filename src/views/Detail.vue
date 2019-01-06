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
            {{ selectedGood.name }} {{ selectedGood.buyNumber }}
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
      <van-goods-action-big-btn
        text="加入购物车"
        @click="onClickBigBtn"
        class="addCart"
      />
      <van-goods-action-big-btn
        primary
        text="立即购买"
        @click="onClickBigBtn"
        class="buyNow"
      />
    </van-goods-action>
    <!-- sku -->
    <van-popup v-model="showSku" position="bottom" :lazy-render="false">
      <Sku
        ref="sku"
        :productData="productData"
        @hideSku="closeSku"
        @selectSKU="selectSKU"
      ></Sku>
    </van-popup>
  </div>
</template>

<script src="./Detail.js"></script>
<style lang="scss" scoped src="./Detail.scss"></style>
