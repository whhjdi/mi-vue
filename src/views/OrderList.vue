<template>
  <div class="order-list">
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="订单列表"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <van-icon name="search" slot="right" color="#000" size="20px" />
      </van-nav-bar>
    </van-popup>
    <div class="content">
      <van-tabs v-model="active" @click="handleClick">
        <van-tab :title="item.name" v-for="item in types" :key="item.type">
          <ul class="list">
            <li class="item" v-for="order in orderList" :key="order.order_id">
              <div class="title">
                <div class="id">订单编号：{{ order.order_id }}</div>
                <div class="addTime">下单时间:{{ order.add_time }}</div>
                <div class="info">{{ order.order_status_info }}</div>
              </div>
              <ul class="good-list">
                <li
                  class="good-item"
                  v-for="good in order.product"
                  :key="good.goods_id"
                >
                  <img
                    v-lazy="good.image_url"
                    alt
                    style="width:50px"
                    class="good-img"
                  />
                  <div class="good-name">{{ good.product_name }}</div>
                  <div class="good-num">X{{ good.product_count }}</div>
                </li>
              </ul>
              <div class="total">
                共{{ order.product.length }}种商品，总金额：{{
                  order.goods_amount
                }}
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Address from "../api/address.js";
import { titleNavBarMixin, setFooterMixin } from "../mixins.js";
import { Tab, Tabs } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "orderList",
  // eslint-disable-next-line
		components: { [Tab.name]: Tab, [Tabs.name]: Tabs },
  props: {},
  mixins: [titleNavBarMixin, setFooterMixin],
  data() {
    return {
      orderList: [],
      active: 0,
      type: 1,
      types: [
        {
          type: 1,
          name: "全部"
        },
        {
          type: 2,
          name: "待付款"
        },
        {
          type: 3,
          name: "待收货"
        },
        {
          type: 4,
          name: "待评价"
        },
        {
          type: 5,
          name: "退款订单"
        }
      ]
    };
  },
  watch: {
    type(newVal) {
      this.active = newVal - 1;
      this.getOrderList(newVal);
    }
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    handleClick(index) {
      this.getOrderList(index + 1);
    },
    async getOrderList(type) {
      const res = await Address.fetchOrderList(type);
      this.setOrderList(res);
    },
    setOrderList(res) {
      this.orderList = res.data.list;
    },
    onClickLeft() {
      this.$router.push("/user");
    },
    onClickRight() {
      console.log("search");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isLogin) {
        vm.$router.push({
          name: "login"
        });
      }
    });
  },
  activated() {
    this.type = this.$route.params.type;
  },
  created() {
    this.getOrderList(this.type);
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.order-list {
  position: fixed;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  overflow: auto;
  .content {
    margin-top: 46px;
    .list {
      background: #ececec;
      .item {
        background: #fff;
        padding: 10px;
        margin-bottom: 10px;
        .title {
          text-align: left;
          position: relative;
          padding: 10px;
          font-size: 14px;
          line-height: 20px;
          .info {
            position: absolute;
            right: 20px;
            top: 10px;
            color: #865c30;
          }
          .addTime {
            color: #777;
          }
        }
        .good-list {
          padding: 5px;
          border-top: 1px solid #ddd;
          .good-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .good-name {
              flex: 1;
              margin-right: 10px;
              font-size: 14px;
            }
          }
        }
        .total {
          text-align: right;
          font-size: 14px;
          color: #865c30;
        }
      }
    }
  }
}
</style>
