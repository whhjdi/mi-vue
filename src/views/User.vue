<template>
  <div class="user">
    <div class="header">
      <div class="isLogin" v-if="isLogin">
        <div class="userImg"><img :src="userInfo.user_img" alt /></div>
        <div class="content">
          <div class="userName">{{ userInfo.user_name }}</div>
          <div class="userId">{{ userInfo.user_id }}</div>
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
    <van-cell
      title="我的订单"
      is-link
      :to="{ name: 'orderList' }"
      class="order-title"
    />
    <div class="list">
      <div class="item">
        <van-icon
          name="balance-pay"
          @click="toOrderList(2)"
          size="20px"
          class="icon"
        ></van-icon>
        <div class="text">待付款</div>
      </div>
      <div class="item">
        <van-icon
          name="logistics"
          @click="toOrderList(3)"
          size="20px"
          class="icon"
        ></van-icon>
        <div class="text">待收货</div>
      </div>
      <div class="item">
        <van-icon
          name="passed"
          @click="toOrderList(4)"
          size="20px"
          class="icon"
        ></van-icon>
        <div class="text">待评价</div>
      </div>
      <div class="item">
        <van-icon
          name="balance-list-o"
          @click="toOrderList(5)"
          size="20px"
          class="icon"
        ></van-icon>
        <div class="text">退款订单</div>
      </div>
    </div>
    <div class="about">
      <van-cell
        title="查看源码"
        icon="fire"
        is-link
        url="https://github.com/whhjdi/shop-vue"
      />
      <van-cell
        title="在线预览"
        icon="hot"
        is-link
        url="http://wanghandi.top/shop-vue/dist/#/home"
      />
      <van-cell
        title="我的博客"
        icon="point-gift"
        is-link
        url="http://wanghandi.top"
      />
      <van-cell
        title="我的简历"
        icon="like"
        is-link
        url="http://wanghandi.top/my-cv/dist/#/home"
      />
    </div>
    <div class="logout" @click="userLogout" v-show="isLogin">退出登录</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { Icon, Cell, Dialog } from "vant";
import User from "../api/user.js";
export default {
  name: "user",
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters(["isLogin", "userInfo"])
  },
  methods: {
    ...mapMutations({
      setIsLogin: "SET_IS_LOGIN",
      setUserInfo: "SET_USER_INFO"
    }),
    userLogin() {
      this.$router.push({
        name: "login"
      });
    },
    async userLogout() {
      try {
        await Dialog.confirm({
          title: "提示",
          message: "确定要退出当前账号吗"
        });
        await User.fetchLogout();
        this.setIsLogin(false);
        this.setUserInfo({});
      } catch (error) {
        console.error(error);
      }
    },
    toOrderList(type) {
      this.$router.push({
        name: "orderList",
        params: {
          type
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.user {
  background: #f3f3f3;
  position: fixed;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
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
  .order-title {
    text-align: left;
  }
  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: #fff;
    margin-bottom: 20px;
    .item {
      flex: 1;
      color: #865c30;
      position: relative;
      .icon {
        margin-bottom: 2px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
  .about {
    text-align: left;
    margin-bottom: 20px;
  }
  .logout {
    background: #fff;
    padding: 10px;
  }
}
</style>
