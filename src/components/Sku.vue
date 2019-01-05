<template>
  <div class="sku" ref="sku">
    <div class="pop">
      <div v-if="selectedGood" class="goods-info">
        <div class="product-img">
          <img :src="selectedGood.img_url" class="img" />
        </div>
        <div class="product-desc flex layout column justify-start">
          <div class="cur-price">
            <div class="price">{{ selectedGood.price }}</div>
          </div>
          <div class="name">{{ selectedGood.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { default_goods_id, buy_option, goods_info } from "../mock/sku.js";
export default {
  name: "",
  components: {},
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
    hide() {
      this.$emit("hideSku");
    },
    init() {
      console.log(1);
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
      console.log(this.selectedGood);
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
  width: 100%;
  height: 70vh;
  .pop {
    .goods-info {
      .product-img {
        .img {
          width: 100px;
        }
      }
    }
  }
}
</style>
