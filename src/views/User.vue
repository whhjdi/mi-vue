<template>
  <div class="user">
    <div class="header">
      <div class="isLogin" v-if="isLogin">
        <div class="userImg"><img v-lazy="user.user_img" alt="" /></div>
        <div class="content">
          <div class="userName">{{ user.user_name }}</div>
          <div class="userId">{{ user.user_id }}</div>
        </div>
      </div>
      <div class="noLogin" v-else @click="userLogin">
        <div class="user-img-wrapper">
          <van-icon name="manager-o" size="30px" class="icon" />
        </div>
        <div class="content">登录/注册</div>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
    <div class="logout" @click="userLogout">退出登录</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { Icon } from "vant";
import User from "../api/user.js";
export default {
  name: "",
  components: {
    [Icon.name]: Icon
  },
  props: {},
  data() {
    return {
      userName: "",
      password: "",
      user: {},
      send_order: 0,
      unpaid_order: 0
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    ...mapMutations({
      setIsLogin: "SET_IS_LOGIN"
    }),
    userLogin() {
      this.$router.push({
        name: "login"
      });
    },
    async userLogout() {
      await User.fetchLogout();
      this.setIsLogin(false);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "login") {
      next(vm => {
        vm.user = vm.$route.params.data.user;
        vm.send_order = vm.$route.params.data.send_order;
        vm.unpaid_order = vm.$route.params.data.user;
      });
    } else {
      next();
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.user {
  .header {
    height: 100px;
    background-color: transparent;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(https://m.youpin.mi.com/youpin/static/m/res/images/personal_bg_top.png);
    color: #fff;
    .isLogin {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .userImg {
        padding: 10px;
        width: 100px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        text-align: left;
        .userName {
          font-size: 18px;
          font-weight: bold;
        }
        .userId {
          font-size: 14px;
          color: #c2c2c2;
        }
      }
      .logout {
      }
    }
    .noLogin {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 40px;
      .user-img-wrapper {
        height: 50px;
        width: 50px;
        border: 1px solid #ddd;
        border-radius: 50%;
        margin-right: 30px;
        color: #ddd;
        .icon {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
