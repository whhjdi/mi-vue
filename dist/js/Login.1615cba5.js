(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Login"],{"01c5":function(t,e,n){"use strict";var i=n("a659"),r=n.n(i);r.a},1146:function(t,e,n){},"565f":function(t,e,n){"use strict";var i=n("c31d"),r=n("fe7e"),s=n("3583"),o=n("a142");e["a"]=Object(r["a"])({render:function(){var t,e=this,n=e.$createElement,i=e._self._c||n;return i("cell",{class:e.b((t={error:e.error,disabled:e.$attrs.disabled,"min-height":"textarea"===e.type&&!e.autosize},t["label-"+e.labelAlign]=e.labelAlign,t)),attrs:{icon:e.leftIcon,title:e.label,center:e.center,border:e.border,"is-link":e.isLink,required:e.required}},[e._t("left-icon",null,{slot:"icon"}),e._t("label",null,{slot:"title"}),i("div",{class:e.b("body")},["textarea"===e.type?i("textarea",e._g(e._b({ref:"input",class:e.b("control",e.inputAlign),attrs:{readonly:e.readonly},domProps:{value:e.value}},"textarea",e.$attrs,!1),e.listeners)):i("input",e._g(e._b({ref:"input",class:e.b("control",e.inputAlign),attrs:{type:e.type,readonly:e.readonly},domProps:{value:e.value}},"input",e.$attrs,!1),e.listeners)),e.showClear?i("icon",{class:e.b("clear"),attrs:{name:"clear"},on:{touchstart:function(t){return t.preventDefault(),e.onClear(t)}}}):e._e(),e.$slots.icon||e.icon?i("div",{class:e.b("icon"),on:{click:e.onClickIcon}},[e._t("icon",[i("icon",{attrs:{name:e.icon}})])],2):e._e(),e.$slots.button?i("div",{class:e.b("button")},[e._t("button")],2):e._e()],1),e.errorMessage?i("div",{class:e.b("error-message"),domProps:{textContent:e._s(e.errorMessage)}}):e._e()],2)},name:"field",inheritAttrs:!1,mixins:[s["a"]],props:{error:Boolean,leftIcon:String,readonly:Boolean,clearable:Boolean,labelAlign:String,inputAlign:String,onIconClick:Function,autosize:[Boolean,Object],errorMessage:String,type:{type:String,default:"text"}},data:function(){return{focused:!1}},watch:{value:function(){this.$nextTick(this.adjustSize)}},mounted:function(){this.format(),this.$nextTick(this.adjustSize)},computed:{showClear:function(){return this.clearable&&this.focused&&""!==this.value&&this.isDef(this.value)&&!this.readonly},listeners:function(){return Object(i["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress,focus:this.onFocus,blur:this.onBlur})}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},format:function(t){void 0===t&&(t=this.$refs.input);var e=t,n=e.value,i=this.$attrs.maxlength;return"number"===this.type&&this.isDef(i)&&n.length>i&&(n=n.slice(0,i),t.value=n),n},onInput:function(t){this.$emit("input",this.format(t.target))},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.readonly&&this.blur()},onBlur:function(t){this.focused=!1,this.$emit("blur",t)},onClickIcon:function(){this.$emit("click-icon"),this.onIconClick&&this.onIconClick()},onClear:function(){this.$emit("input",""),this.$emit("clear")},onKeypress:function(t){if("number"===this.type){var e=t.keyCode,n=-1===String(this.value).indexOf("."),i=e>=48&&e<=57||46===e&&n||45===e;i||t.preventDefault()}"search"===this.type&&13===t.keyCode&&this.blur(),this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){t.style.height="auto";var e=t.scrollHeight;if(Object(o["e"])(this.autosize)){var n=this.autosize,i=n.maxHeight,r=n.minHeight;i&&(e=Math.min(e,i)),r&&(e=Math.max(e,r))}e&&(t.style.height=e+"px")}}}})},"66b9":function(t,e,n){"use strict";n("68ef")},"8d81":function(t,e,n){var i;(function(r){"use strict";function s(t,e){var n=(65535&t)+(65535&e),i=(t>>16)+(e>>16)+(n>>16);return i<<16|65535&n}function o(t,e){return t<<e|t>>>32-e}function a(t,e,n,i,r,a){return s(o(s(s(e,t),s(i,a)),r),n)}function c(t,e,n,i,r,s,o){return a(e&n|~e&i,t,e,r,s,o)}function u(t,e,n,i,r,s,o){return a(e&i|n&~i,t,e,r,s,o)}function l(t,e,n,i,r,s,o){return a(e^n^i,t,e,r,s,o)}function f(t,e,n,i,r,s,o){return a(n^(e|~i),t,e,r,s,o)}function h(t,e){var n,i,r,o,a;t[e>>5]|=128<<e%32,t[14+(e+64>>>9<<4)]=e;var h=1732584193,d=-271733879,g=-1732584194,p=271733878;for(n=0;n<t.length;n+=16)i=h,r=d,o=g,a=p,h=c(h,d,g,p,t[n],7,-680876936),p=c(p,h,d,g,t[n+1],12,-389564586),g=c(g,p,h,d,t[n+2],17,606105819),d=c(d,g,p,h,t[n+3],22,-1044525330),h=c(h,d,g,p,t[n+4],7,-176418897),p=c(p,h,d,g,t[n+5],12,1200080426),g=c(g,p,h,d,t[n+6],17,-1473231341),d=c(d,g,p,h,t[n+7],22,-45705983),h=c(h,d,g,p,t[n+8],7,1770035416),p=c(p,h,d,g,t[n+9],12,-1958414417),g=c(g,p,h,d,t[n+10],17,-42063),d=c(d,g,p,h,t[n+11],22,-1990404162),h=c(h,d,g,p,t[n+12],7,1804603682),p=c(p,h,d,g,t[n+13],12,-40341101),g=c(g,p,h,d,t[n+14],17,-1502002290),d=c(d,g,p,h,t[n+15],22,1236535329),h=u(h,d,g,p,t[n+1],5,-165796510),p=u(p,h,d,g,t[n+6],9,-1069501632),g=u(g,p,h,d,t[n+11],14,643717713),d=u(d,g,p,h,t[n],20,-373897302),h=u(h,d,g,p,t[n+5],5,-701558691),p=u(p,h,d,g,t[n+10],9,38016083),g=u(g,p,h,d,t[n+15],14,-660478335),d=u(d,g,p,h,t[n+4],20,-405537848),h=u(h,d,g,p,t[n+9],5,568446438),p=u(p,h,d,g,t[n+14],9,-1019803690),g=u(g,p,h,d,t[n+3],14,-187363961),d=u(d,g,p,h,t[n+8],20,1163531501),h=u(h,d,g,p,t[n+13],5,-1444681467),p=u(p,h,d,g,t[n+2],9,-51403784),g=u(g,p,h,d,t[n+7],14,1735328473),d=u(d,g,p,h,t[n+12],20,-1926607734),h=l(h,d,g,p,t[n+5],4,-378558),p=l(p,h,d,g,t[n+8],11,-2022574463),g=l(g,p,h,d,t[n+11],16,1839030562),d=l(d,g,p,h,t[n+14],23,-35309556),h=l(h,d,g,p,t[n+1],4,-1530992060),p=l(p,h,d,g,t[n+4],11,1272893353),g=l(g,p,h,d,t[n+7],16,-155497632),d=l(d,g,p,h,t[n+10],23,-1094730640),h=l(h,d,g,p,t[n+13],4,681279174),p=l(p,h,d,g,t[n],11,-358537222),g=l(g,p,h,d,t[n+3],16,-722521979),d=l(d,g,p,h,t[n+6],23,76029189),h=l(h,d,g,p,t[n+9],4,-640364487),p=l(p,h,d,g,t[n+12],11,-421815835),g=l(g,p,h,d,t[n+15],16,530742520),d=l(d,g,p,h,t[n+2],23,-995338651),h=f(h,d,g,p,t[n],6,-198630844),p=f(p,h,d,g,t[n+7],10,1126891415),g=f(g,p,h,d,t[n+14],15,-1416354905),d=f(d,g,p,h,t[n+5],21,-57434055),h=f(h,d,g,p,t[n+12],6,1700485571),p=f(p,h,d,g,t[n+3],10,-1894986606),g=f(g,p,h,d,t[n+10],15,-1051523),d=f(d,g,p,h,t[n+1],21,-2054922799),h=f(h,d,g,p,t[n+8],6,1873313359),p=f(p,h,d,g,t[n+15],10,-30611744),g=f(g,p,h,d,t[n+6],15,-1560198380),d=f(d,g,p,h,t[n+13],21,1309151649),h=f(h,d,g,p,t[n+4],6,-145523070),p=f(p,h,d,g,t[n+11],10,-1120210379),g=f(g,p,h,d,t[n+2],15,718787259),d=f(d,g,p,h,t[n+9],21,-343485551),h=s(h,i),d=s(d,r),g=s(g,o),p=s(p,a);return[h,d,g,p]}function d(t){var e,n="",i=32*t.length;for(e=0;e<i;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function g(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;var i=8*t.length;for(e=0;e<i;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function p(t){return d(h(g(t),8*t.length))}function m(t,e){var n,i,r=g(t),s=[],o=[];for(s[15]=o[15]=void 0,r.length>16&&(r=h(r,8*t.length)),n=0;n<16;n+=1)s[n]=909522486^r[n],o[n]=1549556828^r[n];return i=h(s.concat(g(e)),512+8*e.length),d(h(o.concat(i),640))}function b(t){var e,n,i="0123456789abcdef",r="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),r+=i.charAt(e>>>4&15)+i.charAt(15&e);return r}function v(t){return unescape(encodeURIComponent(t))}function y(t){return p(v(t))}function k(t){return b(y(t))}function w(t,e){return m(v(t),v(e))}function x(t,e){return b(w(t,e))}function O(t,e,n){return e?n?w(e,t):x(e,t):n?y(t):k(t)}i=function(){return O}.call(e,n,e,t),void 0===i||(t.exports=i)})()},a55b:function(t,e,n){"use strict";n.r(e);var i,r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("van-field",{staticClass:"user-name",attrs:{placeholder:t.placeholderText,"left-icon":"contact","error-message":t.errMsg,clearable:""},model:{value:t.username,callback:function(e){t.username="string"===typeof e?e.trim():e},expression:"username"}}),n("van-field",{directives:[{name:"show",rawName:"v-show",value:!t.isSmsLogin,expression:"!isSmsLogin"}],staticClass:"user-psd",attrs:{placeholder:"请输入密码","left-icon":"smile-o",type:t.psdType,clearable:"","error-message":t.errMsg2},model:{value:t.password,callback:function(e){t.password="string"===typeof e?e.trim():e},expression:"password"}},[n("van-icon",{attrs:{slot:"icon",name:t.isOpen?"eye-o":"closed-eye"},on:{click:t.toggleOpen},slot:"icon"})],1),n("van-field",{directives:[{name:"show",rawName:"v-show",value:t.isSmsLogin,expression:"isSmsLogin"}],staticClass:"sms-code",attrs:{placeholder:"请输入验证码","left-icon":"smile-o",clearable:"","error-message":t.errMsg2},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}},[n("van-button",{attrs:{slot:"button",size:"small",type:"danger"},on:{click:t.getCode},slot:"button"},[t._v(t._s(t.codeMsg))])],1),n("van-button",{staticClass:"main-btn",attrs:{type:t.isSmsLogin?"warning":"primary",loading:t.isLoading},on:{click:t.submit}},[t._v(t._s(t.mainBtn))]),n("van-button",{staticClass:"sub-btn",attrs:{type:"default"},on:{click:function(e){t.isSmsLogin=!t.isSmsLogin}}},[t._v(t._s(t.subBtn))])],1)},s=[],o=(n("96cf"),n("3b8d")),a=n("cebc"),c=n("bd86"),u=(n("c3a6"),n("ad06")),l=(n("66b9"),n("b650")),f=(n("7f7f"),n("68ef"),n("1146"),n("565f")),h=n("c24f"),d=n("9c9e"),g=n("8d81"),p=n.n(g),m=n("2f62"),b={components:(i={},Object(c["a"])(i,f["a"].name,f["a"]),Object(c["a"])(i,l["a"].name,l["a"]),Object(c["a"])(i,u["a"].name,u["a"]),i),props:{},mixins:[d["a"]],data:function(){return{username:"",password:"",isSmsLogin:!0,isOpen:!1,errMsg:"",errMsg2:"",isLoading:!1,count:60,codeMsg:"获取验证码",code:""}},watch:{},computed:Object(a["a"])({},Object(m["c"])(["isLogin"]),{placeholderText:function(){return this.isSmsLogin?"手机号码":"邮箱/手机号码"},mainBtn:function(){return this.isSmsLogin?"立即登录/注册":"登录"},subBtn:function(){return this.isSmsLogin?"用户名密码登录":"手机短信登录/注册"},psdType:function(){return this.isOpen?"text":"password"}}),methods:Object(a["a"])({},Object(m["d"])({setIsLogin:"SET_IS_LOGIN",setUserInfo:"SET_USER_INFO"}),{login:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h["a"].fetchLogin(e);case 2:n=t.sent,this.isLoading=!1,1===n.data.code&&(this.setIsLogin(!0),this.getUserInfo());case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),getUserInfo:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n,i,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h["a"].fetchInfo(e);case 2:n=t.sent,i=n.data.user,this.setUserInfo(i),r=this.$route.query.redirect||"/user",this.$router.push(r);case 7:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),toggleOpen:function(){this.isOpen=!this.isOpen},getCode:function(){this.username?this.checkMobile()?(this.errMsg="",60===this.count&&this.setCode()):this.errMsg="手机号码格式不正确":this.errMsg="请输入手机号"},setCode:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h["a"].fetchCode();case 2:this.timer=setInterval(function(){e.codeMsg="重新发送".concat(e.count),console.log(1),e.count--,0===e.count&&(clearInterval(e.timer),e.timer=null,e.count=60,e.codeMsg="获取验证码")},1e3);case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),checkMobile:function(){var t=/^((1[3-8][0-9])+\d{8})$/;return t.test(this.username)},submit:function(){if(this.isSmsLogin){if(!this.username)return void(this.errMsg="请输入手机号");if(!this.checkMobile())return void(this.errMsg="手机号码格式不正确");if(!this.code)return void(this.errMsg2="请输入验证码")}else{if(!this.username)return void(this.errMsg="请输入账号");if(!this.password)return void(this.errMsg2="请输入密码")}if(!this.isLoading){this.isLoading=!0;var t={username:this.username};this.isSmsLogin?t.code=this.code:t.password=p()(this.password),this.login(t)}}}),beforeRouteEnter:function(t,e,n){n(function(t){t.isLogin&&t.$router.go(-1)})},created:function(){},mounted:function(){}},v=b,y=(n("01c5"),n("2877")),k=Object(y["a"])(v,r,s,!1,null,"68b86305",null);k.options.__file="Login.vue";e["default"]=k.exports},a659:function(t,e,n){},c24f:function(t,e,n){"use strict";var i=n("d225"),r=n("b0b4"),s=n("e1d2"),o=function(){function t(){Object(i["a"])(this,t)}return Object(r["a"])(t,null,[{key:"fetchInfo",value:function(){return Object(s["a"])("info")}},{key:"fetchLogin",value:function(t){return Object(s["a"])("login",{params:{data:t}})}},{key:"fetchLogout",value:function(){return Object(s["a"])("logout")}},{key:"fetchCode",value:function(){return Object(s["a"])("code")}}]),t}();e["a"]=o}}]);
//# sourceMappingURL=Login.1615cba5.js.map