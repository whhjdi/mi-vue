<template>
  <transition name="login">
    <div class="login">
      <header class="header">
        <img
          src="https://i.loli.net/2019/01/11/5c387009b68f6.png"
          alt
          class="img"
        />
        <div class="title">沐雪商城</div>
      </header>
      <van-field
        v-model.trim="username"
        :placeholder="placeholderText"
        left-icon="contact"
        class="user-name"
        :error-message="errMsg"
        clearable
      />
      <van-field
        v-model.trim="password"
        placeholder="请输入密码"
        left-icon="smile-o"
        v-show="!isSmsLogin"
        class="user-psd"
        :type="psdType"
        clearable
        :error-message="errMsg2"
      >
        <van-icon
          :name="isOpen ? 'eye-o' : 'closed-eye'"
          slot="icon"
          @click="toggleOpen"
        ></van-icon>
      </van-field>
      <van-field
        v-model="code"
        placeholder="请输入验证码"
        left-icon="smile-o"
        v-show="isSmsLogin"
        class="sms-code"
        clearable
        :error-message="errMsg2"
      >
        <van-button slot="button" size="small" type="danger" @click="getCode">
          {{ codeMsg }}
        </van-button>
      </van-field>
      <van-button
        :type="isSmsLogin ? 'warning' : 'primary'"
        class="main-btn"
        @click="submit"
        :loading="isLoading"
        >{{ mainBtn }}</van-button
      >
      <van-button
        type="default"
        @click="isSmsLogin = !isSmsLogin"
        class="sub-btn"
        >{{ subBtn }}</van-button
      >
    </div>
  </transition>
</template>

<script>
import User from "../api/user.js";
import { setFooterMixin } from "../mixins.js";
import { Field, Button, Icon, Toast, Dialog } from "vant";
import md5 from "blueimp-md5";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  props: {},
  mixins: [setFooterMixin],
  data() {
    return {
      username: "",
      password: "",
      isSmsLogin: true,
      isOpen: false,
      errMsg: "",
      errMsg2: "",
      isLoading: false,
      count: 60,
      codeMsg: "获取验证码",
      code: ""
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["isLogin"]),
    placeholderText() {
      return this.isSmsLogin ? "手机号码" : "邮箱/手机号码";
    },
    mainBtn() {
      return this.isSmsLogin ? "立即登录/注册" : "登录";
    },
    subBtn() {
      return this.isSmsLogin ? "用户名密码登录" : "手机短信登录/注册";
    },
    psdType() {
      return this.isOpen ? "text" : "password";
    }
  },
  methods: {
    ...mapMutations({
      setIsLogin: "SET_IS_LOGIN",
      setUserInfo: "SET_USER_INFO"
    }),
    async login(data) {
      // const res = await User.fetchLogin(data);
      // this.isLoading = false;
      // if (res.data.code === 1) {
      //   this.setIsLogin(true);
      //   this.getUserInfo();
      // }
      try {
        let res = await this.$axios({
          url: "http://127.0.0.1:3000/user/login",
          method: "post",
          data
        });
        console.log(res);
        this.isLoading = false;
        if (res.data.code === 200) {
          this.setIsLogin(true);
          Toast.success("登录成功");
          this.getUserInfo();
        } else if (res.data.code === 201) {
          Toast.success("注册成功");
          this.setIsLogin(true);
          this.getUserInfo();
        } else if (res.data.code === 202) {
          Dialog.alert({
            title: "提示",
            message: "用户名不存在，请使用手机号注册"
          });
        } else if (res.data.code === 300) {
          Dialog.alert({
            title: "提示",
            message: "密码不匹配"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getUserInfo(code) {
      const res = await User.fetchInfo(code);
      let user = res.data.user;
      this.setUserInfo(user);
      let path = this.$route.query.redirect || "/user";
      setTimeout(() => {
        this.$router.push(path);
      }, 1000);
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    getCode() {
      if (!this.username) {
        this.errMsg = "请输入手机号";
        return;
      }
      if (!this.checkMobile()) {
        this.errMsg = "手机号码格式不正确";
        return;
      } else {
        this.errMsg = "";
      }
      if (this.count !== 60) {
        return;
      }
      this.setCode();
    },
    async setCode() {
      await User.fetchCode();
      this.timer = setInterval(() => {
        this.codeMsg = `重新发送${this.count}`;
        console.log(1);
        this.count--;
        if (this.count === 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.count = 60;
          this.codeMsg = "获取验证码";
        }
      }, 1000);
    },
    checkMobile() {
      const reg = /^((1[3-8][0-9])+\d{8})$/;
      return reg.test(this.username);
    },
    submit() {
      if (this.isSmsLogin) {
        if (!this.username) {
          this.errMsg = "请输入手机号";
          return;
        }
        if (!this.checkMobile()) {
          this.errMsg = "手机号码格式不正确";
          return;
        }
        if (!this.code) {
          this.errMsg2 = "请输入验证码";
          return;
        }
      } else {
        if (!this.username) {
          this.errMsg = "请输入账号";
          return;
        }
        if (!this.password) {
          this.errMsg2 = "请输入密码";
          return;
        }
      }
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      let data = {
        userName: this.username
      };
      if (this.isSmsLogin) {
        data.code = md5(this.code);
      } else {
        data.password = md5(this.password);
      }
      data.isSmsLogin = this.isSmsLogin;
      this.login(data);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.isLogin) {
        vm.$router.go(-1);
      }
    });
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  &.login-enter-active,
  &.login-leave-active {
    transition: all 500ms;
  }
  &.login-enter,
  &.login-leave-to {
    transform: scale(0.8);
    opacity: 0;
  }
  .header {
    margin-top: 60px;
    margin-bottom: 20px;
    .img {
      width: 100px;
    }
  }
  .user-name {
    margin-bottom: 10px;
  }
  .user-psd {
    margin-bottom: 10px;
  }
  .sms-code {
    margin-bottom: 10px;
  }
  .main-btn {
    margin-bottom: 10px;
  }
}
</style>
