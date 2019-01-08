<template>
  <div class="address">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="地址编辑"
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
import Address from "../api/address.js";
import { titleNavBarMinxin, setFooterMixin } from "../mixins.js";
import areaList from "../mock/area.js";
export default {
  name: "addressEdit",
  components: {
    [AddressEdit.name]: AddressEdit
  },
  props: {},
  mixins: [titleNavBarMinxin, setFooterMixin],
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {}
    };
  },
  watch: {},
  computed: {},
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
    onDelete() {},
    onClickLeft() {
      console.log(this.addressInfo);

      this.$router.push({
        name: "addressList",
        params: {
          item: this.addressInfo
        }
      });
    },
    onClickRight() {
      console.log(2);
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
  .content {
    margin-top: 46px;
  }
}
</style>
