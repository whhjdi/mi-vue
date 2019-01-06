import { NavBar, Popup, Icon } from "vant";
const titleNavBarMinxin = {
  data() {
    return {
      showNavBar: false
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Icon.name]: Icon
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.showNavBar = true;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.showNavBar = false;
    next();
  }
};

export { titleNavBarMinxin };
