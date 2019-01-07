<template>
  <div class="category-group">
    <ul class="list-group">
      <li
        class="list-item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleClick(item.category_id)"
      >
        <div class="group-item-img">
          <img v-lazy="item.img_url" alt="" class="product-img" />
        </div>
        <div class="product-name">{{ item.product_name }}</div>
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
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(id) {
      this.$router.push({
        name: "detail",
        params: {
          id
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.category-group {
  .list-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .list-item {
      width: 33%;
      font-size: 14px;
      margin-bottom: 20px;
      .group-item-img {
        height: 60px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
