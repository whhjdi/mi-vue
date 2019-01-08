<template>
  <div class="sku" ref="sku">
    <van-icon name="cross" class="close" @click="hide" size="24px" />
    <div class="pop">
      <div v-if="selectedGood" class="goods-info">
        <div class="product-img">
          <img :src="selectedGood.img_url" class="img" />
        </div>
        <div class="product-desc">
          <div class="cur-price">
            <div class="price">￥{{ selectedGood.price }}</div>
          </div>
          <div class="name">{{ selectedGood.name }}</div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="max5">
          <!-- 规格选择 -->
          <div
            v-for="option in buyOption"
            :key="option.prop_cfg_id"
            class="option-wrapper"
            :class="{ no_price: !option.hasPrice }"
          >
            <div class="option-title">{{ option.name }}</div>
            <div class="options-group">
              <div
                v-for="(item, index) in option.list"
                :key="item.prop_value_id"
                :class="{
                  on: item.isOn,
                  line: option.hasPrice,
                  'justify-space-between': option.hasPrice
                }"
                class="option-item"
                @click="chooseItem(option, index)"
              >
                <p>{{ item.name }}</p>
                <p v-if="option.hasPrice">{{ item.price }}</p>
              </div>
            </div>
          </div>
          <!-- 数量选择 -->
          <div v-if="selectedGood" class="option-number">
            <div class="option-title">购买数量</div>
            <van-stepper
              v-model="selectedGood.buyNumber"
              :integer="true"
              :max="selectedGood.buy_limit"
            />
            <!-- <div class="xm-input-number">
              <div
                class="input-sub"
                :class="{ active: selectedGood.buyNumber > 1 }"
                @click="decrease"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-minus-circle"></use>
                </svg>
              </div>
              <div class="input-num">
                <span>{{ selectedGood.buyNumber }}</span>
              </div>
              <div
                class="input-add"
                :class="{
                  active: selectedGood.buyNumber < selectedGood.buy_limit
                }"
                @click="increase"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-plus-circle"></use>
                </svg>
              </div>
            </div> -->
          </div>
          <div class="ywb">
            <div
              v-for="(bargin, index) in serviceBargins"
              :key="index"
              class="option-wrapper"
            >
              <div class="option-title">
                {{ bargin.type_name }}
                <a :href="bargin.service_url" class="service-url">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjhFNUZBNEJBNjg2MTFFN0JGODNEMTFGMzE1NTJDREYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjhFNUZBNENBNjg2MTFFN0JGODNEMTFGMzE1NTJDREYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNEE0ODY5NEE2NzUxMUU3QkY4M0QxMUYzMTU1MkNERiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOEU1RkE0QUE2ODYxMUU3QkY4M0QxMUYzMTU1MkNERiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqoKySAAAALWSURBVHjatJfPS1RRFMef9002Q9BiRlPIzE2TusgWQZQFFS364aJwUZBEYW3atAv6S1y0K3chSEUbqQaSQoqKirJGwppxMaZvIaSTaPo98L1xebxf900d+KDMu/d+7zn33PPOa3KSmQuKYA/YBQogy2d1sAgqoAy+gvW4BZtinufAEXAIzINpMAsWwIoxpgV0gW7QBl6ASWOMlfB+MEAPnoGfCaMjmzjBCD0C7xLOcxQ4D24xrGlN5t7mWirOYxkwBJrBPfDbacy2gcvgFxgFf8KEz4F2cCckQeQ8DzLJJMHyoAo8JtZUSGIOM0fGzR+19YHDFA3ytAPcBL0UzfH37UyoXibYZ7BmzNsAH8EZel4zhWWRq+AuM9Zv4tkNjpNMnQAl8IZCeW6gwCiWffPXed0ugFeyMS18nLt5GXJWQ/RKbAS8Z3g9eiAh7qF4F6/Smm+NJa6xA3xT9Fru6ZMQ0TzP1KFANWTclO9YguwptVzF+zbP6uNELOqFJI82z7fZIFukVjFD4emYBccSXJ2dxv9zEeNEa6/ihO8N3tcO5onDxKpGjP0hmuJxq0U5DLJ9YJAZX2WhiDIJdUuGb5l6StFBFhTt6WjUi4Emz7OZBjw9Zog+5r1ObIreZi1Fc8aZ2orK3LpipWpNkUy6ZJYs54rWgmJC7E4Z7nKKOaI15zLcB8Bri8mSIDOs00uWwqekxit2GG0s8DbCcfc1yAqs1V9cvraaWeQ/WZyx3qxnITzASM3olmSSjVrSVuc0uE5sWqFuav3thSR0D8Altiv/2raCi+ChLjBmB1Jjh9gP3vIIwmwL29wy/8b15FfYCJSSNHvSjaz+r2bP9Q0ULz+ATvZIlRTXxTzTa3zz3TdFg4S1uLwzl9kjtfMYli0a+rPgpFFON9J8whxlu1JjwZhlJ2F+whTYa/Xwmknv9jztJ0zQR1uRIcwbtXqFd7nCYpToo21TgAEAWy6shL93DD4AAAAASUVORK5CYII="
                  />
                </a>
                <span class="desc">{{ bargin.selectedServiceDesc }}</span>
              </div>
              <div
                v-for="(info, infoIndex) in bargin.service_info"
                :key="info.phone_accidentIns_sku"
                class="options-group"
              >
                <div class="flex">
                  <div :class="{ on: info.selected }" class="option-item">
                    <p>
                      {{ info.service_short_name }} {{ info.service_price }}元
                    </p>
                  </div>
                </div>
                <div class="options-agree">
                  <div
                    :class="{ checked: info.selected }"
                    class="choose"
                    @click="changeService(bargin, info, infoIndex)"
                  >
                    <van-icon :name="info.selected ? 'checked' : 'passed'" />
                  </div>
                  <span>我已阅读</span>
                  <a
                    v-for="(accidentIns, index) in info.phone_accidentIns"
                    :key="index"
                    href="accidentIns.url"
                    class="org"
                    >{{ accidentIns.desc }} |
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 意外保 -->
      </div>
      <div class="addToCart">
        <div class="text" @click="addToCart">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import { default_goods_id, buy_option, goods_info } from "../mock/sku.js";
import {
  Icon,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Stepper
} from "vant";
export default {
  name: "SKU",
  components: {
    [Icon.name]: Icon,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Stepper.name]: Stepper
  },
  props: {
    productData: {
      required: true
    }
  },
  data() {
    return {
      buyOption: null,
      goodsInfo: null,
      selectedGood: null,
      selectedSKU: [],
      serviceBargins: null
    };
  },
  watch: {
    selectedGood: {
      deep: true,
      handler(val) {
        this.$emit("selectSKU", val);
      }
    }
  },
  computed: {},
  methods: {
    decrease() {
      if (this.selectedGood.buyNumber === 1) return;
      this.selectedGood.buyNumber--;
    },
    increase() {
      if (this.selectedGood.buyNumber === this.selectedGood.buy_limit) return;
      this.selectedGood.buyNumber++;
    },
    chooseItem(option, index) {
      let curIndex = 0;
      option.list.forEach((item, i) => {
        if (i === index) {
          curIndex = i;
          item.isOn = true;
        } else {
          item.isOn = false;
        }
      });
      let curSkuIndex = this.selectedSKU.findIndex(item => {
        return item.prop_cfg_id === option.prop_cfg_id;
      });
      this.selectedSKU[curSkuIndex].prop_value_id =
        option.list[curIndex].prop_value_id;
      this.selectedGood = this.goodsInfo.find(item => {
        return (
          JSON.stringify(item.prop_list) === JSON.stringify(this.selectedSKU)
        );
      });
      this.serviceBargins = this.selectedGood.service_bargins;
    },
    changeService(bargin, info, infoIndex) {
      bargin.selectedServiceDesc = !info.selected ? info.service_desc : "";
      bargin.service_info.forEach((item, index) => {
        index === infoIndex
          ? (item.selected = !item.selected)
          : (item.selected = false);
      });
    },
    hide() {
      this.$emit("hideSku");
    },
    init() {
      let buyOption = buy_option;
      goods_info.forEach(item => {
        item.buyNumber = 1;
        item.buy_limit = parseInt(item.buy_limit);
        item.service_bargins.forEach(list => {
          list.service_info.forEach(info => {
            info.selected = false;
          });
        });
      });
      this.goodsInfo = goods_info;
      this.selectedGood = this.goodsInfo.find(item => {
        return item.goods_id == default_goods_id;
      });
      this.selectedGood.service_bargins.forEach(item => {
        item.selectedServiceDesc = "";
      });
      this.serviceBargins = this.selectedGood.service_bargins;
      this.selectedSKU = JSON.parse(
        JSON.stringify(this.selectedGood.prop_list)
      );
      buyOption.forEach(item => {
        item.hasPrice = item.list[0].price != "";
        item.list.forEach(list => {
          list.isOn = false;
        });
      });
      this.selectedGood.prop_list.forEach(item => {
        let curOption = buyOption.find(option => {
          return option.prop_cfg_id === item.prop_cfg_id;
        });
        let curIndex = curOption.list.findIndex(list => {
          return list.prop_value_id === item.prop_value_id;
        });
        curOption.list[curIndex].isOn = true;
      });
      this.buyOption = buyOption;
    },
    addToCart() {
      //加入购物车
      this.hide();
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.sku {
  padding: fixed;
  bottom: 0;
  width: 100%;
  height: 600px;
  overflow: hidden;
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .pop {
    .goods-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 30px 20px 10px 10px;
      height: 150px;
      .product-img {
        width: 110px;
        height: 110px;
        background: #fff;
        padding: 10px;
        border: 1px solid #e7e7e7;
        margin-right: 10px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .product-desc {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        margin: 16px 8px;
        text-align: left;
        .cur-price {
          color: #b60b0a;
          font-size: 30px;
          margin-bottom: 10px;
        }
        .name {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.87);
          line-height: 20px;
        }
      }
    }
    .content-wrapper {
      height: 360px;
      overflow-y: scroll;
    }
    .max5 {
      padding: 20px;
      .option-wrapper {
        margin-bottom: 20px;
        .option-title {
          padding-bottom: 15px;
          line-height: 16px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.87);
          text-align: left;
          .service-url {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: middle;
            margin-right: 10px;
            img {
              width: 100%;
              height: auto;
            }
          }
          .desc {
            color: #555555;
          }
        }

        .options-group {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          .options-agree {
            margin-top: 10px;
            line-height: 20px;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            .choose {
              margin-top: 1px;
              margin-right: 4px;
            }
            .org {
              color: #b60b0a;
            }
          }
          .option-item {
            border: 1px solid #ddd;
            padding: 0 10px;
            margin-bottom: 10px;
            margin-right: 10px;
            border-radius: 4px;
            font-size: 14px;
            &.on {
              border-color: #b60b0a;
              color: #b60b0a;
            }
            &.line {
              width: 100%;
              margin-right: 0;
            }
            &.justify-space-between {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }
        }
      }
      .option-number {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .option-title {
          padding-bottom: 15px;
          line-height: 16px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.87);
          text-align: left;
        }
        .xm-input-number {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            width: 30px;
            height: 30px;
            color: #b60b0a;
          }
          .input-sub {
            margin-right: 5px;
          }
          .input-num {
            margin-right: 5px;
            color: #b60b0a;
          }
        }
      }
    }

    .addToCart {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      box-shadow: 0 0 4px 1px #ddd;
      height: 80px;
      .text {
        width: 50%;
        height: 50px;
        background: #ab8a59;
        line-height: 50px;
        margin: 15px auto;
        color: #fff;
      }
    }
  }
}
</style>
