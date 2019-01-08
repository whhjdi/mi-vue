import {
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Area,
  Popup
} from "vant";
import HomePage from "../api/home.js";
import Sku from "../components/Sku";
import areaList from "../mock/area.js";
import { setFooterMixin } from "../mixins";
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Area.name]: Area,
    [Popup.name]: Popup,
    Sku
  },
  props: {},
  data() {
    return {
      showSku: false,
      showAddressPop: false,
      areaList: areaList,
      galleryView: [],
      productData: {},
      default_goods_id: null,
      buy_option: [],
      goods_info: [],
      titleView: {},
      canJoinActs: [],
      commentView: {},
      descTabsView: [],
      selectedGood: {},
      deliveryData: [
        {
          code: "110000",
          name: "北京市"
        },
        {
          code: "110100",
          name: "北京市"
        },
        {
          code: "110101",
          name: "东城区"
        }
      ],
      stock_status: "无货"
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["count"]),
    areaData() {
      let data = "";
      this.deliveryData.forEach(item => {
        data += " " + item.name;
      });
      return data;
    }
  },
  mixins: [setFooterMixin],
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({
        name: "home"
      });
    },
    async getProductView(id) {
      const res = await HomePage.fetchProductView(id);
      this.setProductView(res);
    },
    setProductView(res) {
      let data = res.data;
      let viewContent = data.view_content;
      this.productData = data;
      this.default_goods_id = data.default_goods_id;
      this.buy_option = data.buy_option;
      this.goods_info = data.goods_info;
      this.galleryView = viewContent.galleryView.galleryView; //轮播
      this.titleView = viewContent.titleView.titleView; //轮播下方的标题
      this.canJoinActs = this.titleView.canJoinActs[0];
      this.commentView = viewContent.commentView.commentView;
      let descTabsView = viewContent.descTabsView.descTabsView;
      descTabsView.forEach(item => {
        let tabContent = item.tabContent;
        if (tabContent.length > 3) {
          item.showTabContent = tabContent.slice(0, 3);
          item.moreTabContent = tabContent.slice(3);
        } else {
          item.showTabContent = tabContent;
        }
        item.showMore = false;
      });
      this.descTabsView = descTabsView;
    },
    onClickMiniBtn() {
      console.log("onClickMiniBtn");
    },
    onClickToCart() {
      this.$router.push({
        name: "cart"
      });
    },
    onClickBigBtn() {
      this.showSku = true;
    },
    closeSku() {
      this.showSku = false;
    },
    selectSKU(val) {
      this.selectedGood = val;
    },
    confirmArea(arr) {
      this.deliveryData = arr;
      this.getEstDelivery(arr);
      this.showAddressPop = false;
    },
    cancelArea() {
      this.showAddressPop = false;
    },
    async getEstDelivery(delivary) {
      const res = await HomePage.fetchEstDelivery(delivary);
      this.stock_status = res.data.stock_status;
    }
  },
  created() {
    this.getProductView(this.$route.params.id);
    this.getEstDelivery(this.delivaryData);
  }
};
