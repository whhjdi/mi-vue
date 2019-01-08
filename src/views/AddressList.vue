<template>
  <div class="address">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="地址列表"
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
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
// 由于接口是模拟的，所以无法真正的更改地址，所以每次进入addressList都会恢复到模拟接口的地址
//每次的更改是可以看到的，刷新后才会恢复默认
import { AddressList } from "vant";
import { titleNavBarMixin, setFooterMixin } from "../mixins.js";
import Address from "../api/address.js";
export default {
  name: "addressList",
  components: {
    [AddressList.name]: AddressList
  },
  props: {},
  mixins: [titleNavBarMixin, setFooterMixin],
  data() {
    return {
      showList: true,
      chosenAddressId: "0",
      list: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    onAdd() {
      this.$router.push({
        name: "addressEdit",
        params: {
          addressInfo: {
            id: Math.floor(Math.random() * 1000),
            name: "默认",
            tel: "12312312312"
          },
          option: "add"
        }
      });
    },
    onEdit(item) {
      this.$router.push({
        name: "addressEdit",
        params: {
          addressInfo: item,
          option: "edit"
        }
      });
    },
    onClickRight() {
      this.$router.push({
        name: "home"
      });
    },
    async getAddressList() {
      const res = await Address.fetchAddressList();
      this.setList(res);
    },
    setList(res) {
      this.list = res.data.list;

      //下边的完全可以不写，给后台发请求 ,然后根据返回值改变addressList即可
      let editItem = this.$route.params.item ? this.$route.params.item : null;
      if (editItem) {
        let editIndex = this.list.findIndex(item => {
          return item.id === editItem.id;
        });
        console.log(this.$route.params.option, 12);
        if (this.$route.params.option === "del") {
          this.list.splice(editIndex, 1);
          return;
          //这样理论上是正确的
        }
        if (editIndex === -1) {
          this.list.push(editItem);
        } else {
          this.list.splice(editIndex, 1, editItem);
        }
        //这个地方其实是没问题的，因为没有真正的接口，
        //当删除之后，进到地址列表会重新从服务器加载列表（列表没有真正改变）
        //所以删除一个没问题，删除俩个总会剩一个，这其实是正确的
      }
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
