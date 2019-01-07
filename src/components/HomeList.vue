<template>
  <div class="home-list">
    <img v-lazy="list.pic_url" alt="" class="banner" />
    <ul class="list-wrapper">
      <li v-for="(item, index) in list.items" :key="index" class="list-item">
        <div class="img-wrapper" @click="handleClick(item.item.gid)">
          <img v-lazy="item.item.pic_url" alt="" class="item-img" />
        </div>
        <div class="name">{{ item.item.name }}</div>
        <div class="price">￥{{ item.item.market_price / 10 }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(gid) {
      this.$emit("handleDetail", gid);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.home-list {
  width: 100%;
  .banner {
    width: 100%;
  }
  .list-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    text-align: left;
    .list-item {
      width: 30%;
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      .img-wrapper {
        background: #f8f8f8;
        margin-bottom: 5px;
        padding: 15px;
        .item-img {
          width: 100%;
        }
      }
      .name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 14px;
        margin-bottom: 5px;
        line-height: 16px;
      }
      .price {
        color: #b60b0a;
        font-size: 14px;
      }
    }
  }
}
</style>
