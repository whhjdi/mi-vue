(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["OrderList"],{"2f94":function(t,e,i){"use strict";var s=i("d225"),n=i("b0b4"),a=i("e1d2"),r=function(){function t(){Object(s["a"])(this,t)}return Object(n["a"])(t,null,[{key:"fetchAddressList",value:function(){return Object(a["a"])("addressList")}},{key:"fetchCheckout",value:function(){return Object(a["a"])("checkout")}},{key:"fetchOrderList",value:function(t){return Object(a["a"])("orderList",{params:{type:t}})}}]),t}();e["a"]=r},8624:function(t,e,i){"use strict";(function(t){i.d(e,"a",function(){return c});var s=i("a142"),n=Date.now();function a(t){var e=Date.now(),i=Math.max(0,16-(e-n)),s=setTimeout(t,i);return n=e+i,s}var r=s["f"]?t:window,o=r.requestAnimationFrame||r.webkitRequestAnimationFrame||a;r.cancelAnimationFrame||r.webkitCancelAnimationFrame||r.clearTimeout;function c(t){return o.call(r,t)}}).call(this,i("c8ba"))},a092:function(t,e,i){"use strict";var s=i("c070"),n=i.n(s);n.a},b807:function(t,e,i){},bf4b:function(t,e,i){"use strict";i.r(e);var s,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"order-list"},[i("van-popup",{attrs:{position:"top",overlay:!1},model:{value:t.showNavBar,callback:function(e){t.showNavBar=e},expression:"showNavBar"}},[i("van-nav-bar",{attrs:{title:"订单列表"},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight}},[i("van-icon",{attrs:{slot:"left",name:"arrow-left",color:"#000",size:"20px"},slot:"left"}),i("van-icon",{attrs:{slot:"right",name:"search",color:"#000",size:"20px"},slot:"right"})],1)],1),i("div",{staticClass:"content"},[i("van-tabs",{on:{click:t.handleClick},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.types,function(e){return i("van-tab",{key:e.type,attrs:{title:e.name}},[i("ul",{staticClass:"list"},t._l(t.orderList,function(e){return i("li",{key:e.order_id,staticClass:"item"},[i("div",{staticClass:"title"},[i("div",{staticClass:"id"},[t._v("订单编号："+t._s(e.order_id))]),i("div",{staticClass:"addTime"},[t._v("下单时间:"+t._s(e.add_time))]),i("div",{staticClass:"info"},[t._v(t._s(e.order_status_info))])]),i("ul",{staticClass:"good-list"},t._l(e.product,function(e){return i("li",{key:e.goods_id,staticClass:"good-item"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.image_url,expression:"good.image_url"}],staticClass:"good-img",staticStyle:{width:"50px"},attrs:{alt:""}}),i("div",{staticClass:"good-name"},[t._v(t._s(e.product_name))]),i("div",{staticClass:"good-num"},[t._v("X"+t._s(e.product_count))])])}),0),i("div",{staticClass:"total"},[t._v("\n              共"+t._s(e.product.length)+"种商品，总金额："+t._s(e.goods_amount)+"\n            ")])])}),0)])}),1)],1)],1)},a=[],r=(i("96cf"),i("3b8d")),o=i("cebc"),c=i("bd86"),l=(i("68ef"),i("b807"),i("fe7e")),u=i("8624"),h=i("db78"),d=i("023d"),f=i("3875"),v=Object(l["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b([t.type])},[i("div",{ref:"wrap",class:[t.b("wrap",{scrollable:t.scrollable}),{"van-hairline--top-bottom":"line"===t.type}],style:t.wrapStyle},[i("div",{ref:"nav",class:t.b("nav",[t.type]),style:t.navStyle},["line"===t.type?i("div",{class:t.b("line"),style:t.lineStyle}):t._e(),t._l(t.tabs,function(e,s){return i("div",{ref:"tabs",refInFor:!0,staticClass:"van-tab",class:{"van-tab--active":s===t.curActive,"van-tab--disabled":e.disabled,"van-tab--complete":!t.ellipsis},style:t.getTabStyle(e,s),on:{click:function(e){t.onClick(s)}}},[i("span",{ref:"title",refInFor:!0,class:{"van-ellipsis":t.ellipsis},domProps:{textContent:t._s(e.title)}})])})],2)]),i("div",{ref:"content",class:t.b("content",{animated:t.animated})},[t.animated?i("div",{class:t.b("track"),style:t.trackStyle},[t._t("default")],2):t._t("default")],2)])},name:"tabs",mixins:[f["a"]],model:{prop:"active"},props:{color:String,sticky:Boolean,animated:Boolean,offsetTop:Number,swipeable:Boolean,ellipsis:{type:Boolean,default:!0},lineWidth:{type:Number,default:null},lineHeight:{type:Number,default:null},active:{type:[Number,String],default:0},type:{type:String,default:"line"},duration:{type:Number,default:.3},swipeThreshold:{type:Number,default:4}},data:function(){return{tabs:[],position:"",curActive:null,lineStyle:{backgroundColor:this.color},events:{resize:!1,sticky:!1,swipeable:!1}}},computed:{scrollable:function(){return this.tabs.length>this.swipeThreshold||!this.ellipsis},wrapStyle:function(){switch(this.position){case"top":return{top:this.offsetTop+"px",position:"fixed"};case"bottom":return{top:"auto",bottom:0};default:return null}},navStyle:function(){return{borderColor:this.color}},trackStyle:function(){if(this.animated)return{left:-1*this.curActive*100+"%",transitionDuration:this.duration+"s"}}},watch:{active:function(t){t!==this.curActive&&this.correctActive(t)},color:function(){this.setLine()},tabs:function(){this.correctActive(this.curActive||this.active),this.scrollIntoView(),this.setLine()},curActive:function(){this.scrollIntoView(),this.setLine(),"top"!==this.position&&"bottom"!==this.position||d["a"].setScrollTop(window,d["a"].getElementTop(this.$el))},sticky:function(){this.handlers(!0)},swipeable:function(){this.handlers(!0)}},mounted:function(){var t=this;this.correctActive(this.active),this.setLine(),this.$nextTick(function(){t.handlers(!0),t.scrollIntoView(!0)})},activated:function(){var t=this;this.$nextTick(function(){t.handlers(!0),t.scrollIntoView(!0)})},deactivated:function(){this.handlers(!1)},beforeDestroy:function(){this.handlers(!1)},methods:{handlers:function(t){var e=this.events,i=this.sticky&&t,s=this.swipeable&&t;if(e.resize!==t&&(e.resize=t,(t?h["b"]:h["a"])(window,"resize",this.setLine,!0)),e.sticky!==i&&(e.sticky=i,this.scrollEl=this.scrollEl||d["a"].getScrollEventTarget(this.$el),(i?h["b"]:h["a"])(this.scrollEl,"scroll",this.onScroll,!0),this.onScroll()),e.swipeable!==s){e.swipeable=s;var n=this.$refs.content,a=s?h["b"]:h["a"];a(n,"touchstart",this.touchStart),a(n,"touchmove",this.touchMove),a(n,"touchend",this.onTouchEnd),a(n,"touchcancel",this.onTouchEnd)}},onTouchEnd:function(){var t=this.direction,e=this.deltaX,i=this.curActive,s=50;"horizontal"===t&&this.offsetX>=s&&(e>0&&0!==i?this.setCurActive(i-1):e<0&&i!==this.tabs.length-1&&this.setCurActive(i+1))},onScroll:function(){var t=d["a"].getScrollTop(window)+this.offsetTop,e=d["a"].getElementTop(this.$el),i=e+this.$el.offsetHeight-this.$refs.wrap.offsetHeight;this.position=t>i?"bottom":t>e?"top":"";var s={scrollTop:t,isFixed:"top"===this.position};this.$emit("scroll",s)},setLine:function(){var t=this;this.$nextTick(function(){var e=t.$refs.tabs;if(e&&e[t.curActive]&&"line"===t.type){var i=e[t.curActive],s=t.lineWidth,n=t.lineHeight,a=t.isDef(s)?s:i.offsetWidth/2,r=i.offsetLeft+(i.offsetWidth-a)/2,o={width:a+"px",backgroundColor:t.color,transform:"translateX("+r+"px)",transitionDuration:t.duration+"s"};if(t.isDef(n)){var c=n+"px";o.height=c,o.borderRadius=c}t.lineStyle=o}})},correctActive:function(t){t=+t;var e=this.tabs.some(function(e){return e.index===t}),i=(this.tabs[0]||{}).index||0;this.setCurActive(e?t:i)},setCurActive:function(t){t=this.findAvailableTab(t,t<this.curActive),this.isDef(t)&&t!==this.curActive&&(this.$emit("input",t),null!==this.curActive&&this.$emit("change",t,this.tabs[t].title),this.curActive=t)},findAvailableTab:function(t,e){var i=e?-1:1,s=t;while(s>=0&&s<this.tabs.length){if(!this.tabs[s].disabled)return s;s+=i}},onClick:function(t){var e=this.tabs[t],i=e.title,s=e.disabled;s?this.$emit("disabled",t,i):(this.setCurActive(t),this.$emit("click",t,i))},scrollIntoView:function(t){var e=this.$refs.tabs;if(this.scrollable&&e&&e[this.curActive]){var i=this.$refs.nav,s=i.scrollLeft,n=i.offsetWidth,a=e[this.curActive],r=a.offsetLeft,o=a.offsetWidth;this.scrollTo(i,s,r-(n-o)/2,t)}},scrollTo:function(t,e,i,s){if(s)t.scrollLeft+=i-e;else{var n=0,a=Math.round(1e3*this.duration/16),r=function s(){t.scrollLeft+=(i-e)/a,++n<a&&Object(u["a"])(s)};r()}},renderTitle:function(t,e){var i=this;this.$nextTick(function(){var s=i.$refs.title[e];s.parentNode.replaceChild(t,s)})},getTabStyle:function(t,e){var i={},s=this.color,n=e===this.curActive,a="card"===this.type;return s&&(t.disabled||!a||n||(i.color=s),!t.disabled&&a&&n&&(i.backgroundColor=s),a&&(i.borderColor=s)),this.scrollable&&this.ellipsis&&(i.flexBasis=88/this.swipeThreshold+"%"),i}}}),p=(i("7f7f"),i("f331")),b=Object(l["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.isSelected||t.parent.animated,expression:"isSelected || parent.animated"}],class:t.b("pane")},[t.inited?t._t("default"):t._e(),t.$slots.title?i("div",{ref:"title"},[t._t("title")],2):t._e()],2)},name:"tab",mixins:[p["a"]],props:{title:String,disabled:Boolean},data:function(){return{inited:!1}},computed:{index:function(){return this.parent.tabs.indexOf(this)},isSelected:function(){return this.index===this.parent.curActive}},watch:{"parent.curActive":function(){this.inited=this.inited||this.isSelected},title:function(){this.parent.setLine()}},created:function(){this.findParent("van-tabs")},mounted:function(){var t=this.parent.tabs,e=this.parent.$slots.default.indexOf(this.$vnode);t.splice(-1===e?t.length:e,0,this),this.$slots.title&&this.parent.renderTitle(this.$refs.title,this.index)},beforeDestroy:function(){this.parent.tabs.splice(this.index,1)}}),m=i("2f94"),y=i("9c9e"),w=i("2f62"),g={name:"orderList",components:(s={},Object(c["a"])(s,b.name,b),Object(c["a"])(s,v.name,v),s),props:{},mixins:[y["b"],y["a"]],data:function(){return{orderList:[],active:0,type:1,types:[{type:1,name:"全部"},{type:2,name:"待付款"},{type:3,name:"待收货"},{type:4,name:"待评价"},{type:5,name:"退款订单"}]}},watch:{type:function(t){this.active=t-1,this.getOrderList(t)}},computed:Object(o["a"])({},Object(w["c"])(["isLogin"])),methods:{handleClick:function(t){this.getOrderList(t+1)},getOrderList:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m["a"].fetchOrderList(e);case 2:i=t.sent,this.setOrderList(i);case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),setOrderList:function(t){this.orderList=t.data.list},onClickLeft:function(){this.$router.push("/user")},onClickRight:function(){console.log("search")}},beforeRouteEnter:function(t,e,i){i(function(t){t.isLogin||t.$router.push({name:"login"})})},activated:function(){this.type=this.$route.params.type},created:function(){this.getOrderList(this.type)},mounted:function(){}},k=g,_=(i("a092"),i("2877")),C=Object(_["a"])(k,n,a,!1,null,"574e3ece",null);C.options.__file="OrderList.vue";e["default"]=C.exports},c070:function(t,e,i){}}]);
//# sourceMappingURL=OrderList.0ca79425.js.map