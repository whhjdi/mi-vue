<template>
  <div class="cart">
    <!-- 顶栏 -->
    <van-popup v-model="showNavBar" position="top" :overlay="false">
      <van-nav-bar
        title="购物车"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" slot="left" color="#000" size="20px" />
        <div slot="right" @click="clearCart">清空</div>
      </van-nav-bar>
    </van-popup>
    <!-- 列表 -->
    <div class="content">
      <div class="noLogin"></div>
      <ul class="list">
        <li v-for="(item, index) in items" :key="index" class="list-item">
          <div class="item-wrapper">
            <!-- 单选 -->
            <div
              class="choose flex"
              :class="{ checked: item.sel_status }"
              @click="cartSelect(item, index)"
            >
              <van-icon
                v-if="!item.parent_goodsId"
                :name="item.sel_status ? 'checked' : 'passed'"
                size="20px"
              />
            </div>
            <!-- 图片 -->
            <router-link
              :to="{ name: 'detail', params: { id: item.goodsId } }"
              class="imgProduct"
            >
              <img v-lazy="item.image_url" />
            </router-link>
            <!-- 左侧详细信息 -->
            <div class="info">
              <p class="name">
                <span class="flex">{{ item.product_name }}</span>
              </p>
              <!-- 价格 -->
              <div v-if="item.price" class="price-without">
                <span>售价：</span> <span>{{ item.price }}元</span>
                <template v-if="item.isService">
                  <span>合计：</span> <span>{{ item.price * item.num }}元</span>
                </template>
              </div>
              <!-- 数量 -->
              <div class="num">
                <van-stepper
                  v-model="item.num"
                  :max="item.buy_limit"
                  integer
                  min="1"
                  @plus="plusCount(item)"
                  @minus="minusCount(item)"
                ></van-stepper>
                <!-- 删除 -->
                <div
                  v-if="item.price"
                  class="delete"
                  @click="cartDelete(item, index)"
                >
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底栏 -->
    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="allChecked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { titleNavBarMixin, setFooterMixin } from "../mixins.js";
import { Card, Button, Stepper, Checkbox, Toast, Dialog } from "vant";
import Cart from "../api/cart.js";
import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  mixins: [titleNavBarMixin, setFooterMixin],
  props: {},
  data() {
    return {
      items: []
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["isLogin"]),
    allPrice() {
      let price = 0;
      if (this.items.length > 0) {
        this.items.forEach(item => {
          if (item.sel_status) {
            price += item.price * item.num;
          }
        });
      }
      return price * 100;
    },
    allChecked: {
      get() {
        if (this.items && this.items.length) {
          return this.items.every(item => {
            return item.sel_status;
          });
        } else {
          return false;
        }
      },
      set(newVal) {
        this.items.forEach(item => {
          item.sel_status = newVal;
        });
      }
    }
  },
  methods: {
    async clearCart() {
      await Cart.fetchCartClear();
      this.items = [];
    },
    plusCount(item) {
      this.cartEdit(item, 1);
    },
    minusCount(item) {
      this.cartEdit(item, -1);
    },
    async cartEdit(item, num) {
      await Cart.fetchCartEdit({
        goodsId: item.goodsId,
        num
      });
    },

    async cartSelect(item) {
      // 获取当前商品的选择信息
      //取反
      let sel_status = item.sel_status ? 0 : 1;
      //更改接口的商品选择信息
      await Cart.fetchCartSelCart({
        GoodsId: item.goodsId,
        sel_status
      });
      //更新本地的信息
      item.sel_status = sel_status;
    },
    async cartDelete(item, index) {
      await Cart.fetchCartDel({
        GoodsId: item.goodsId
      });
      this.items.splice(index, 1);
    },
    //提交订单
    onSubmit() {
      if (this.items.length === 0) {
        Toast("先买的东西吧，客官");
        return;
      }
      if (!this.isLogin) {
        Dialog.confirm({
          title: "提示",
          message: "您还未登录，即将为您跳转到登录页面"
        })
          .then(() => {
            this.$router.push({
              name: "login",
              query: {
                redirect: "/cart"
              }
            });
          })
          .catch(() => {
            // on cancel
          });
        return;
      }
      let goods = [];
      this.items.forEach(item => {
        if (item.sel_status) {
          goods.push(item);
        }
      });
      this.$router.push({
        name: "orderCheckout",
        params: {
          goods
        }
      });
    },
    onClickRight() {},
    async getCart() {
      const res = await Cart.fetchCart();
      this.setCart(res);
    },
    setCart(res) {
      this.items = res.data.items;
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  activated() {
    this.getCart();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.cart {
  .content {
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 100%;
    overflow-y: scroll;
    .list {
      .list-item {
        padding: 5px 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .item-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #ddd;
          padding: 10px 0;
          .imgProduct {
            width: 100px;
            height: 100px;
            margin: 0 10px;
          }
          .checked {
            color: #1989fa;
          }
          .info {
            flex-direction: column;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex: 1;
            .name {
              font-size: 14px;
              text-align: left;
            }
            .num {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }
            .price-without {
              font-size: 14px;
              color: rgb(151, 149, 149);
            }
          }
        }
      }
    }
  }
  .van-nav-bar {
    height: 50px;
  }
  .van-checkbox {
    margin-left: 20px;
  }
}
</style>
