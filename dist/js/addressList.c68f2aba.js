(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["addressList"],{"0a49":function(t,e,n){var i=n("9b43"),s=n("626a"),a=n("4bf8"),r=n("9def"),o=n("cd1c");t.exports=function(t,e){var n=1==t,c=2==t,d=3==t,l=4==t,u=6==t,f=5==t||u,h=e||o;return function(e,o,p){for(var b,m,v=a(e),k=s(v),g=i(o,p,3),w=r(k.length),_=0,x=n?h(e,w):c?h(e,0):void 0;w>_;_++)if((f||_ in k)&&(b=k[_],m=g(b,_,v),t))if(n)x[_]=m;else if(m)switch(t){case 3:return!0;case 5:return b;case 6:return _;case 2:x.push(b)}else if(l)return!1;return u?-1:d||l?l:x}}},1169:function(t,e,n){var i=n("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"20d6":function(t,e,n){"use strict";var i=n("5ca1"),s=n("0a49")(6),a="findIndex",r=!0;a in[]&&Array(1)[a](function(){r=!1}),i(i.P+i.F*r,"Array",{findIndex:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(a)},"2f94":function(t,e,n){"use strict";var i=n("d225"),s=n("b0b4"),a=n("e1d2"),r=function(){function t(){Object(i["a"])(this,t)}return Object(s["a"])(t,null,[{key:"fetchAddressList",value:function(){return Object(a["a"])("addressList")}},{key:"fetchCheckout",value:function(){return Object(a["a"])("checkout")}},{key:"fetchOrderList",value:function(t){return Object(a["a"])("orderList",{params:{type:t}})}}]),t}();e["a"]=r},3211:function(t,e,n){},"9f14":function(t,e,n){"use strict";var i=n("fe7e"),s=n("f331");e["a"]=Object(i["a"])({render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.b({disabled:t.isDisabled}),on:{click:function(e){t.$emit("click")}}},[n("span",{class:t.b("input")},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],class:t.b("control"),attrs:{type:"radio",disabled:t.isDisabled},domProps:{value:t.name,checked:t._q(t.currentValue,t.name)},on:{change:function(e){t.currentValue=t.name}}}),n("icon",{style:t.iconStyle,attrs:{name:t.checked?"checked":"circle"}})],1),t.$slots.default?n("span",{class:t.b("label",t.labelPosition),on:{click:t.onClickLabel}},[t._t("default")],2):t._e()])},name:"radio",mixins:[s["a"]],props:{name:null,value:null,disabled:Boolean,checkedColor:String,labelDisabled:Boolean,labelPosition:Boolean},computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(t){(this.parent||this).$emit("input",t)}},checked:function(){return this.currentValue===this.name},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},iconStyle:function(){var t=this.checkedColor;if(t&&this.checked&&!this.isDisabled)return{color:t}}},created:function(){this.findParent("van-radio-group")},methods:{onClickLabel:function(){this.isDisabled||this.labelDisabled||(this.currentValue=this.name)}}})},c542:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"address"},[n("van-popup",{attrs:{position:"top",overlay:!1},model:{value:t.showNavBar,callback:function(e){t.showNavBar=e},expression:"showNavBar"}},[n("van-nav-bar",{attrs:{title:"地址列表"},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight}},[n("van-icon",{attrs:{slot:"left",name:"arrow-left",color:"#000",size:"20px"},slot:"left"}),n("van-icon",{attrs:{slot:"right",name:"wap-home",color:"#000",size:"20px"},slot:"right"})],1)],1),n("div",{staticClass:"content"},[n("van-address-list",{attrs:{list:t.list},on:{add:t.onAdd,edit:t.onEdit},model:{value:t.chosenAddressId,callback:function(e){t.chosenAddressId=e},expression:"chosenAddressId"}})],1)],1)},s=[],a=(n("20d6"),n("96cf"),n("3b8d")),r=n("bd86"),o=(n("7f7f"),n("68ef"),n("dde9"),n("e2c8"),n("fe7e")),c=n("e27c"),d=n("b650"),l=n("9f14"),u=Object(o["a"])({render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("cell",{class:t.b({disabled:t.disabled,unswitchable:!t.switchable}),attrs:{"is-link":!t.disabled&&t.switchable},on:{click:t.onSelect}},[n("radio",{attrs:{name:t.data.id}},[n("div",{class:t.b("name")},[t._v(t._s(t.data.name)+"，"+t._s(t.data.tel))]),n("div",{class:t.b("address"),domProps:{textContent:t._s(t.data.address)}})]),n("icon",{class:t.b("edit"),attrs:{slot:"right-icon",name:"edit"},on:{click:function(e){e.stopPropagation(),t.$emit("edit")}},slot:"right-icon"})],1)},name:"address-item",components:{Radio:l["a"]},props:{data:Object,disabled:Boolean,switchable:Boolean},methods:{onSelect:function(){this.switchable&&this.$emit("select")}}}),f=Object(o["a"])({render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.b()},[t._t("top"),n("radio-group",{attrs:{value:t.value},on:{input:function(e){t.$emit("input",e)}}},[n("cell-group",t._l(t.list,function(e,i){return n("address-item",{key:e.id,attrs:{data:e,switchable:t.switchable},on:{select:function(n){t.$emit("select",e,i)},edit:function(n){t.$emit("edit",e,i)}}})}),1)],1),t.disabledText?n("div",{class:t.b("disabled-text"),domProps:{textContent:t._s(t.disabledText)}}):t._e(),t.disabledList.length?n("cell-group",t._l(t.disabledList,function(e,i){return n("address-item",{key:e.id,attrs:{disabled:"",data:e},on:{select:function(n){t.$emit("select-disabled",e,i)},edit:function(n){t.$emit("edit-disabled",e,i)}}})}),1):t._e(),t._t("default"),n("van-button",{class:t.b("add"),attrs:{square:"",size:"large",type:"danger",text:t.addButtonText||t.$t("add")},on:{click:function(e){t.$emit("add")}}})],2)},name:"address-list",components:{RadioGroup:c["a"],VanButton:d["a"],AddressItem:u},props:{list:Array,disabledList:Array,disabledText:String,addButtonText:String,value:[String,Number],switchable:{type:Boolean,default:!0}}}),h=n("9c9e"),p=n("2f94"),b={name:"addressList",components:Object(r["a"])({},f.name,f),props:{},mixins:[h["b"],h["a"]],data:function(){return{showList:!0,chosenAddressId:"0",list:[]}},watch:{},computed:{},methods:{onAdd:function(){this.$router.push({name:"addressEdit",params:{addressInfo:{id:Math.floor(1e3*Math.random()),name:"默认",tel:"12312312312"},option:"add"}})},onEdit:function(t){this.$router.push({name:"addressEdit",params:{addressInfo:t,option:"edit"}})},onClickRight:function(){this.$router.push({name:"home"})},getAddressList:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].fetchAddressList();case 2:e=t.sent,this.setList(e);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),setList:function(t){this.list=t.data.list;var e=this.$route.params.item?this.$route.params.item:null;if(e){var n=this.list.findIndex(function(t){return t.id===e.id});if(console.log(this.$route.params.option,12),"del"===this.$route.params.option)return void this.list.splice(n,1);-1===n?this.list.push(e):this.list.splice(n,1,e)}}},created:function(){},mounted:function(){},activated:function(){this.getAddressList()}},m=b,v=(n("db1f"),n("2877")),k=Object(v["a"])(m,i,s,!1,null,"bfb20358",null);k.options.__file="AddressList.vue";e["default"]=k.exports},cd1c:function(t,e,n){var i=n("e853");t.exports=function(t,e){return new(i(t))(e)}},db1f:function(t,e,n){"use strict";var i=n("3211"),s=n.n(i);s.a},dde9:function(t,e,n){},e27c:function(t,e,n){"use strict";var i=n("fe7e");e["a"]=Object(i["a"])({render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.b()},[t._t("default")],2)},name:"radio-group",props:{value:null,disabled:Boolean},watch:{value:function(t){this.$emit("change",t)}}})},e2c8:function(t,e,n){},e853:function(t,e,n){var i=n("d3f4"),s=n("1169"),a=n("2b4c")("species");t.exports=function(t){var e;return s(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!s(e.prototype)||(e=void 0),i(e)&&(e=e[a],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=addressList.c68f2aba.js.map