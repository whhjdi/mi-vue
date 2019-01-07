import { NavBar, Popup, Icon } from "vant";
import { mapMutations } from "vuex";
import { SubmitBar, Checkbox } from "vant";
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
const setFooterMixin = {
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox
  },
  methods: {
    ...mapMutations({
      setShowFooter: "SET_SHOW_FOOTER"
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setShowFooter(false);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.setShowFooter(true);
    next();
  }
};
export { titleNavBarMinxin, setFooterMixin };
