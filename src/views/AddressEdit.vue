<template>
  <div class="address">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        :title="title"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <van-icon name="wap-home" slot="right" color="#000" size="20px" />
      </van-nav-bar>
    </van-popup>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import { AddressEdit } from "vant";
import { titleNavBarMixin, setFooterMixin } from "../mixins.js";
import areaList from "../mock/area.js";
export default {
  name: "addressEdit",
  components: {
    [AddressEdit.name]: AddressEdit
  },
  props: {},
  mixins: [titleNavBarMixin, setFooterMixin],
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {}
    };
  },
  watch: {},
  computed: {
    title() {
      return this.$route.params.option === "add" ? "新增地址" : "编辑地址";
    }
  },
  methods: {
    onChangeDetail() {},
    onSave(item) {
      item.address =
        item.province + item.city + item.county + item.addressDetail;
      this.$router.push({
        name: "addressList",
        params: {
          item
        }
      });
    },
    onDelete(item) {
      this.$router.push({
        name: "addressList",
        params: {
          item,
          option: "del"
        }
      });
    },
    onClickLeft() {
      this.$router.push({
        name: "addressList",
        params: {
          item: this.addressInfo
        }
      });
    },
    onClickRight() {
      this.$router.push({
        name: "home"
      });
    }
  },
  activated() {
    this.addressInfo = this.$route.params.addressInfo;
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.address {
  position: fixed;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  .content {
    margin-top: 46px;
  }
}
</style>
