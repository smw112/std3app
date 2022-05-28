(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{578:function(t,e,n){"use strict";n.r(e);var o=n(31),c=(n(44),n(97),{middleware:function(t){var e=t.store,n=t.redirect;e.$auth.loggedIn||n("/login")},data:function(){return{dialog:!1,contact:{},contacts:[],search:"",headers:[{text:"ID",value:"id"},{text:"名前",value:"name"},{text:"電話番号",value:"phone_number"},{text:"操作",value:"actions"}]}},mounted:function(){this.load()},computed:{isPersistedContact:function(){return!!this.contact.id},formTitle:function(){return this.isPersistedContact?"連絡先編集":"連絡先追加"},user:function(){return this.$auth.user}},methods:{load:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.$auth.strategy.token.get()),e.next=3,t.$axios.get("https://std3app.herokuapp.com/api/contacts",{headers:{Authorization:t.$auth.strategy.token.get()}}).then((function(t){return t.data}));case 3:t.contacts=e.sent;case 4:case"end":return e.stop()}}),e)})))()},add:function(t){this.contact={},this.dialog=!0},create:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("https://std3app.herokuapp.com/api/contacts",{headers:{Authorization:t.$auth.strategy.token.get()},name:t.contact.name,phone_number:t.contact.phone_number}).then((function(t){console.log(t)}));case 2:t.close(),t.load();case 4:case"end":return e.stop()}}),e)})))()},edit:function(t){this.contact=Object.assign({},t),this.dialog=!0},update:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.put("https://std3app.herokuapp.com/api/contacts/".concat(t.contact.id),{headers:{Authorization:t.$auth.strategy.token.get()},name:t.contact.name,phone_number:t.contact.phone_number}).then((function(t){console.log(t)}));case 2:t.close(),t.load();case 4:case"end":return e.stop()}}),e)})))()},remove:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.delete("https://std3app.herokuapp.com/api/contacts/".concat(t.id),{headers:{Authorization:e.$auth.strategy.token.get()}}).then((function(t){console.log(t)}));case 2:e.load();case 3:case"end":return n.stop()}}),n)})))()},close:function(){this.dialog=!1,this.contact={}}}}),r=n(105),l=n(152),d=n.n(l),v=n(236),h=n(474),m=n(473),f=n(570),_=n(468),x=n(576),k=n(572),w=n(219),y=n(573),C=n(574),V=n(470),$=n(512),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-btn",{staticClass:"mb-2",attrs:{fab:"",light:"",small:"",color:"light"},on:{click:t.add}},[n("v-icon",{attrs:{light:""}},[t._v("\n      mdi-phone-plus-outline\n    ")])],1),t._v(" "),n("v-layout",{attrs:{column:"","justify-center":"","align-center":""},scopedSlots:t._u([{key:"activator",fn:function(t){t.on}}])},[t._v(" "),t.contacts?n("v-card",[n("v-card-title",[n("v-icon",{attrs:{light:""}},[t._v("mdi-book-open-variant")]),t._v("　連絡先一覧\n        "),n("v-spacer"),t._v(" "),n("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"検索","sigle-line":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.contacts,"items-per-page":5,search:t.search,"sort-by":"id","sort-desc":!0},scopedSlots:t._u([{key:"top",fn:function(){return[n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),t._v(" "),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"名前"},model:{value:t.contact.name,callback:function(e){t.$set(t.contact,"name",e)},expression:"contact.name"}})],1),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-text-field",{attrs:{label:"電話番号"},model:{value:t.contact.phone_number,callback:function(e){t.$set(t.contact,"phone_number",e)},expression:"contact.phone_number"}})],1)],1)],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{on:{click:t.close}},[t._v("閉じる")]),t._v(" "),t.isPersistedContact?n("v-btn",{staticClass:"primary",on:{click:t.update}},[t._v("更新する")]):n("v-btn",{staticClass:"primary",on:{click:t.create}},[t._v("追加する")]),t._v(" "),n("v-spacer")],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(e){var o=e.item;return[n("v-icon",{attrs:{small:""},on:{click:function(e){return t.edit(o)}}},[t._v("\n            mdi-pencil\n          ")]),t._v(" "),n("v-icon",{attrs:{small:""},on:{click:function(e){return t.remove(o)}}},[t._v("\n            mdi-delete\n          ")])]}}],null,!1,4181296833)})],1):t._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:v.a,VCard:h.a,VCardActions:m.a,VCardText:m.c,VCardTitle:m.d,VCol:f.a,VContainer:_.a,VDataTable:x.a,VDialog:k.a,VIcon:w.a,VLayout:y.a,VRow:C.a,VSpacer:V.a,VTextField:$.a})}}]);