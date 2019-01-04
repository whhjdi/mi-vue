<template>
  <div class="home-list">
    <h2 class="title">{{ list.title }}</h2>
    <ul class="list-wrapper">
      <li v-for="(item, index) in list.items" :key="index" class="list-item">
        <img v-lazy="item.item.pic_url" alt="" class="item-img" />
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
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.home-list {
  width: 100%;
  .list-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .list-item {
      width: 30%;
      .item-img {
        width: 100%;
      }
    }
  }
}
</style>
