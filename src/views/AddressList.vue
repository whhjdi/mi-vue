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
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
        v-show="showList"
      />
    </div>
  </div>
</template>

<script>
import { AddressList } from "vant";
import { titleNavBarMinxin, setFooterMixin } from "../mixins.js";
import Address from "../api/address.js";
export default {
  name: "",
  components: {
    [AddressList.name]: AddressList
  },
  props: {},
  mixins: [titleNavBarMinxin, setFooterMixin],
  data() {
    return {
      showList: true,
      addressList: {},
      chosenAddressId: "0",
      disabledList: [],
      list: []
    };
  },
  watch: {},
  computed: {
    // disabledList: {
    //   get() {
    //     return this.addressList.disabledList;
    //   },
    //   set(val) {
    //     this.addressList.disabledList = val;
    //   }
    // },
    // list: {
    //   get() {
    //     return this.addressList.list;
    //   },
    //   set(val) {
    //     this.addressList.list = val;
    //   }
    // }
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: "addressEdit",
        params: {
          addressInfo: {},
          option: "add"
        }
      });
    },
    onEdit(item, index) {
      console.log(item);

      this.$router.push({
        name: "addressEdit",
        params: {
          addressInfo: item,
          option: "edit",
          index
        }
      });
    },
    onClickRight() {
      console.log(2);
    },
    async getAddressList() {
      const res = await Address.fetchAddressList();
      this.addressList = res.data;
      this.disabledList = res.data.disabledList;
      this.list = res.data.list;
      this.setList();
    },
    setList() {
      let editItem = this.$route.params.item
        ? this.$route.params.item
        : this.list[0];
      console.log(this.list);
      console.log(editItem);
      let editIndex = this.list.findIndex(item => {
        return item.id === editItem.id;
      });
      let newList = JSON.parse(JSON.stringify(this.list));
      newList.splice(editIndex, 1, editItem);
      this.list = newList;
    }
  },

  created() {},
  mounted() {},
  activated() {
    this.getAddressList();
  }
};
</script>
<style lang="scss" scoped>
.address {
  .content {
    margin-top: 46px;
  }
}
</style>
