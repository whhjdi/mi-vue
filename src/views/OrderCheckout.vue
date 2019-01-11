<template>
  <div class="checkout">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="用户结算"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <van-icon name="wap-home" slot="right" color="#000" size="20px" />
      </van-nav-bar>
    </van-popup>
    <van-cell-group class="address">
      <van-cell
        title="收货地址"
        value="修改地址"
        icon="shop-o"
        :label="addressDetail"
        is-link
        :to="{ name: 'addressList' }"
      />
    </van-cell-group>
    <div class="b2">
      <ul class="list-wrapper">
        <li
          v-for="(pay, index) in payMethod"
          :key="pay.type"
          class="item-wrapper"
        >
          <div
            class="item"
            :class="{ on: pay.checked }"
            @click="chosePay(index)"
          >
            <a href="javascript:;" :class="pay.type">{{ pay.value }}</a>
            <div class="sub">{{ pay.subtitle }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="b3">
      <ul class="list">
        <li v-for="(item, index) in cartList" :key="index" class="item">
          <img
            v-lazy="item.image_url"
            alt=""
            class="item-img"
            style="width:50px"
          />
          <div class="name">{{ item.short_name }}</div>
          <div class="num">x{{ item.num }}={{ item.subtotal }}</div>
        </li>
      </ul>
    </div>
    <van-submit-bar :price="allPrice" button-text="去付款" @submit="onPay" />
  </div>
</template>

<script>
import { titleNavBarMixin, setFooterMixin } from "../mixins.js";
import { mapMutations } from "vuex";
import Address from "../api/address.js";
import { Cell, CellGroup, RadioGroup, Radio, Icon, Dialog } from "vant";
export default {
  name: "orderCheckout",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog
  },
  props: {},
  data() {
    return {
      address: {},
      cartList: [],
      payMethod: [],
      productMoney: "",
      total: 0
    };
  },
  watch: {},
  mixins: [titleNavBarMixin, setFooterMixin],
  computed: {
    addressDetail() {
      return (
        this.address.province +
        this.address.city +
        this.address.district +
        this.address.area +
        this.address.address +
        "(" +
        this.address.zipcode +
        ")"
      );
    },
    allPrice() {
      let price = 0;
      this.cartList.forEach(item => {
        price += item.subtotal;
      });
      return price * 100;
    }
  },
  methods: {
    ...mapMutations({
      setShowFooter: "SET_SHOW_FOOTER"
    }),
    onPay() {
      Dialog.alert({
        title: "支付",
        message: "支付成功,确认进入订单"
      })
        .then(() => {
          this.$router.push({ name: "orderList" });
        })
        .catch(() => {
          // on cancel
        });
    },
    chosePay(index) {
      this.payMethod.forEach((pay, i) => {
        pay.checked = i === index;
      });
    },

    onClickRight() {
      this.$router.push({
        name: "home"
      });
    },
    async getCheckout() {
      const res = await Address.fetchCheckout();
      console.log(res);

      this.address = res.data.address;
      this.cartList = res.data.cartlist.items;
      this.payMethod = res.data.paymethod.slice(0, 5);
      this.productMoney = res.data.productMoney;
      this.total = res.data.total;
    }
  },
  created() {
    this.getCheckout();
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!from.name) {
        vm.$router.push({
          name: "home"
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.checkout {
  background: #f3f3f3;
  position: fixed;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  .address {
    margin-top: 46px;
    text-align: left;
  }
  .b2 {
    background: #fff;
    .list-wrapper {
      margin-top: 20px;
      overflow: hidden;
      max-height: 100rem;
      transition: max-height 0.3s ease-in-out;
      list-style: none;
      .item-wrapper {
        margin: 0 20px;
        border-bottom: 1px solid #eee;
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-right: 30px;
          background-image: url(//s1.mi.com/m/images/m/check_normal.png);
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 20px 20px;
          .sub {
            font-size: 12px;
            margin-left: 10px;
            color: #865c30;
          }
          a {
            display: block;
            font-size: 13px;
            line-height: 25px;
            padding-left: 35px;
            padding-top: 10px;
            padding-bottom: 10px;
            color: #333;
            text-decoration: none;
            &.weixin_wap {
              background: url(//s1.mi.com/m/images/m/pay_wx.png) 0 50% no-repeat;
              background-size: 25px 25px;
            }
            &.alipaywap {
              background: url(//s1.mi.com/m/images/m/pay_zfb2.png) 0 50%
                no-repeat;
              background-size: 25px 25px;
            }
            &.micash_wap {
              background: url(//s1.mi.com/m/images/m/micash_wap.png) 0 50%
                no-repeat;
              background-size: 25px 25px;
            }
            &.unionpaywap {
              background: url(//s1.mi.com/m/images/m/pay_yl1.png) 0 50%
                no-repeat;
              background-size: 25px 25px;
            }
            &.bestpay_wap {
              background: url(//s1.mi.com/m/images/m/pay_yzf.png) 0 50%
                no-repeat;
              background-size: 25px 25px;
            }
            &.mifinanceinstal_m {
              background: url(//s1.mi.com/m/images/m/pay_mifinanceinstal.png) 0
                50% no-repeat;
              background-size: 25px 25px;
            }
            &.antinstal_m {
              background: url(//s1.mi.com/m/images/m/pay_antinstalment.png) 0
                50% no-repeat;
              background-size: 25px 25px;
            }
          }
          &.on {
            background-image: url(//s1.mi.com/m/images/m/check_press.png);
          }
        }
      }
    }
    .payment-fold-switch {
      color: #bdbdbd;
      line-height: 40px;
      text-align: center;
      margin: 0 20px;
      border-top: 1px solid #eee;
      font-size: 12px;
      .iconfont.unfold {
        transform: rotate(90deg);
      }
      .iconfont {
        margin-left: 4px;
        transform: rotate(-90deg);
        transition: transform 0.2s linear;
      }
    }
  }
  .b3 {
    margin-top: 20px;
    background: #fff;
    .list {
      padding: 10px 10px 0 10px;
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        padding: 5px;
        .name {
          flex: 1;
          font-size: 12px;
          line-height: 20px;
          padding: 0 10px;
          text-align: left;
        }
        .num {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
