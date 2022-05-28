(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{509:function(t,e,r){"use strict";var n=r(5),o=(r(63),r(77),r(233),r(14),r(9),r(15),r(78),r(197),r(16),r(17),r(20),r(21),r(19)),c=r(108),l=r(157);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:h({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},582:function(t,e,r){"use strict";r.r(e);var n=r(31),o=(r(97),{auth:!1,layout:"home",data:function(){return{showPassword:!1,user:{username:"",email:"",password:""}}},methods:{createUser:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("https://std3app.herokuapp.com/api/auth/signup",{username:t.user.username,email:t.user.email,password:t.user.password});case 2:return e.next=4,t.$router.push("/login");case 4:case"end":return e.stop()}}),e)})))()}}}),c=r(105),l=r(152),d=r.n(l),h=r(236),f=r(474),m=r(473),v=r(509),w=r(573),y=r(512),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-card",{staticClass:"mx-auto mt-5",attrs:{elevation:"16",width:"600px",shaped:""}},[r("v-card-title",[r("h2",{staticClass:"mx-auto"},[t._v("新規登録")])]),t._v(" "),r("v-card-text",[r("v-form",[r("v-text-field",{attrs:{"prepend-icon":"mdi-account-circle",label:"ユーザー名",placeholder:"yamadatarou",counter:"16"},model:{value:t.user.username,callback:function(e){t.$set(t.user,"username",e)},expression:"user.username"}}),t._v(" "),r("v-text-field",{attrs:{"prepend-icon":"mdi-email-outline",label:"メールアドレス",placeholder:"example@email.com",counter:"64"},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}}),t._v(" "),r("v-text-field",{attrs:{type:t.showPassword?"text":"password","prepend-icon":"mdi-lock",label:"パスワード",placeholder:"大文字・小文字・記号を含んで下さい",counter:"32","append-icon":t.showPassword?"mdi-eye":"mdi-eye-off"},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}}),t._v(" "),r("br"),t._v(" "),r("v-card-actions",[r("v-btn",{staticClass:"primary",attrs:{rounded:"","x-large":""},on:{click:t.createUser}},[t._v("登録")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:h.a,VCard:f.a,VCardActions:m.a,VCardText:m.c,VCardTitle:m.d,VForm:v.a,VLayout:w.a,VTextField:y.a})}}]);