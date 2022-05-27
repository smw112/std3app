(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{579:function(e,t,n){"use strict";n.r(t);var r=n(31),o=(n(30),n(81),n(97),{middleware:function(e){var t=e.store,n=e.redirect;t.$auth.loggedIn||n("/login")},data:function(){return{dialog:!1,defence:{},defences:[],unLoading:!0,submitForm:!1,search:"",headers:[{text:"作成日",value:"createdAt"},{text:".",value:"monster1"},{text:".",value:"monster2"},{text:".",value:"monster3"},{text:"操作",value:"actions"}],required:function(e){return!!e||"必ず入力してください"}}},mounted:function(){this.load()},computed:{isPersistedDefence:function(){return!!this.defence.id},formTitle:function(){return this.isPersistedDefence?"防衛編集":"防衛追加"},user:function(){return this.$auth.user},defCount:function(){return this.defences.length}},methods:{load:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("https://std3app.herokuapp.com/api/defences",{headers:{Authorization:e.$auth.strategy.token.get()}}).then((function(e){return e.data}));case 2:e.defences=t.sent,e.unLoading=!1,e.submitForm=!1;case 5:case"end":return t.stop()}}),t)})))()},add:function(e){this.defence={},this.dialog=!0},create:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$refs.defence_form.validate()){t.next=6;break}return e.submitForm=!0,t.next=4,e.$axios.post("https://std3app.herokuapp.com/api/defences",{headers:{Authorization:e.$auth.strategy.token.get()},monster1:e.defence.monster1,monster2:e.defence.monster2,monster3:e.defence.monster3,memo:e.defence.memo,is_five:e.defence.isFive}).then((function(e){console.log(e)}));case 4:e.close(),e.load();case 6:case"end":return t.stop()}}),t)})))()},edit:function(e){this.defence=Object.assign({},e),this.dialog=!0},move:function(e){this.$router.replace({path:"/defences/".concat(e.id)})},update:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$refs.defence_form.validate()){t.next=6;break}return e.submitForm=!0,t.next=4,e.$axios.put("https://std3app.herokuapp.com/api/defences/".concat(e.defence.id),{headers:{Authorization:e.$auth.strategy.token.get()},monster1:e.defence.monster1,monster2:e.defence.monster2,monster3:e.defence.monster3,memo:e.defence.memo,is_five:e.defence.isFive}).then((function(e){console.log(e)}));case 4:e.close(),e.load();case 6:case"end":return t.stop()}}),t)})))()},remove:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$axios.delete("https://std3app.herokuapp.com/api/defences/".concat(e.id),{headers:{Authorization:t.$auth.strategy.token.get()}}).then((function(e){console.log(e)}));case 2:t.load();case 3:case"end":return n.stop()}}),n)})))()},close:function(){this.dialog=!1,this.defence={}}}}),c=n(105),d=n(153),l=n.n(d),f=n(233),v=n(472),m=n(469),h=n(586),x=n(569),_=n(464),k=n(575),y=n(571),w=n(505),$=n(219),C=n(572),V=n(218),F=n(573),R=n(466),A=n(508),j=n(574),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-layout",{attrs:{column:"","justify-center":"","align-left":""},scopedSlots:e._u([{key:"activator",fn:function(e){e.on}}])},[n("br"),e._v(" "),e._v(" "),e.defences?n("v-card",{attrs:{"max-width":"800px",shaped:!0}},[n("v-card-title",[n("v-icon",{attrs:{light:""}},[e._v("mdi-folder")]),e._v("　防衛検索 (全"+e._s(e.defCount)+"件)\n        "),n("v-spacer"),e._v(" "),n("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"検索","sigle-line":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),n("v-card-subtitle",[n("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"blue-grey"},on:{click:e.add}},[e._v("\n          防衛追加\n          "),n("v-icon",{attrs:{right:"",dark:""}},[e._v("\n            mdi-folder-multiple-plus-outline\n          ")])],1),e._v(" "),n("p",{staticClass:"text-right grey--text text-caption"},[n("span",[n("v-icon",[e._v("mdi-chevron-right-circle")]),e._v("...詳細を見る")],1),e._v(" "),n("span",[n("v-icon",[e._v("mdi-pencil")]),e._v("...編集する")],1)])],1),e._v(" "),e.unLoading?n("v-data-table",{staticClass:"elevation-1",attrs:{loading:"","loading-text":"読込中"}}):n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.defences,"items-per-page":5,search:e.search,"sort-by":"id","sort-desc":!0,"no-data-text":"データがありません。"},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),e._v(" "),n("v-card-subtitle",[n("br"),e._v(" "),n("span",{staticClass:"text-right grey--text text-caption"},[n("v-icon",[e._v("mdi-alert-outline")]),e._v("モンスター名は正式名称で入力してください\n                ")],1)]),e._v(" "),n("v-card-text",[n("v-container",[n("v-form",{ref:"defence_form"},[n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{counter:"255",label:"モンスター1",rules:[e.required]},model:{value:e.defence.monster1,callback:function(t){e.$set(e.defence,"monster1",t)},expression:"defence.monster1"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{counter:"255",label:"モンスター2",rules:[e.required]},model:{value:e.defence.monster2,callback:function(t){e.$set(e.defence,"monster2",t)},expression:"defence.monster2"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{counter:"255",label:"モンスター3",rules:[e.required]},model:{value:e.defence.monster3,callback:function(t){e.$set(e.defence,"monster3",t)},expression:"defence.monster3"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-checkbox",{attrs:{label:"純5防衛"},model:{value:e.defence.isFive,callback:function(t){e.$set(e.defence,"isFive",t)},expression:"defence.isFive"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-textarea",{attrs:{label:"メモ"},model:{value:e.defence.memo,callback:function(t){e.$set(e.defence,"memo",t)},expression:"defence.memo"}})],1)],1)],1)],1)],1),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{on:{click:e.close}},[e._v("✕")]),e._v(" "),e.submitForm?n("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e.isPersistedDefence?n("v-btn",{staticClass:"primary",on:{click:e.update}},[e._v("更新する")]):n("v-btn",{staticClass:"primary",on:{click:e.create}},[e._v("追加する")]),e._v(" "),n("v-spacer")],1)],1)],1)]},proxy:!0},{key:"item.createdAt",fn:function(t){var r=t.item;return[n("span",[e._v(e._s(e.$dateFns.format(r.createdAt,"yyyy-MM-dd")))])]}},{key:"item.actions",fn:function(t){var r=t.item;return[n("v-icon",{on:{click:function(t){return e.move(r)}}},[e._v("\n            mdi-chevron-right-circle\n          ")]),e._v(" "),n("v-icon",{on:{click:function(t){return e.edit(r)}}},[e._v("\n            mdi-pencil\n          ")])]}}],null,!1,631146304)})],1):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports;l()(component,{VBtn:f.a,VCard:v.a,VCardActions:m.a,VCardSubtitle:m.b,VCardText:m.c,VCardTitle:m.d,VCheckbox:h.a,VCol:x.a,VContainer:_.a,VDataTable:k.a,VDialog:y.a,VForm:w.a,VIcon:$.a,VLayout:C.a,VProgressCircular:V.a,VRow:F.a,VSpacer:R.a,VTextField:A.a,VTextarea:j.a})}}]);