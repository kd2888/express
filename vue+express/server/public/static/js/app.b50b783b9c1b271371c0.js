webpackJsonp([1],{"4shS":function(e,t){},GmxA:function(e,t){},HClg:function(e,t){},NHnr:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("7+uW"),r=o("NYxO");n.default.use(r.a);var s={name:""};sessionStorage.getItem("name")&&(s.name=sessionStorage.getItem("name"));var a=new r.a.Store({state:s,mutations:{changeName:function(e,t){e.name=t}}}),i=o("mtWM"),l=o.n(i),m=function(e,t){return l.a.post("/login",{name:e,password:t})},c={name:"App",store:a,beforeCreate:function(){var e=this;l.a.post("/getUser",{}).then(function(t){if(console.log(t.data),1==t.data.code){var o=t.data.data;e.$store.commit("changeName",o),sessionStorage.setItem("name",o)}else e.$store.commit("changeName",""),sessionStorage.removeItem("name")}).catch(function(e){console.log(e)})}},u={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var f=o("VU/8")(c,u,!1,function(e){o("4shS")},null,null).exports,d=o("/ocq"),h={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"hello"},[o("h1",[e._v(e._s(e.msg))]),e._v(" "),o("h2",[e._v("Essential Links")]),e._v(" "),e._m(0),e._v(" "),o("h2",[e._v("Ecosystem")]),e._v(" "),e._m(1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[o("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[e._v("\n        Core Docs\n      ")])]),e._v(" "),o("li",[o("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[e._v("\n        Forum\n      ")])]),e._v(" "),o("li",[o("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[e._v("\n        Community Chat\n      ")])]),e._v(" "),o("li",[o("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[e._v("\n        Twitter\n      ")])]),e._v(" "),o("br"),e._v(" "),o("li",[o("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("\n        Docs for This Template\n      ")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};o("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},h,!1,function(e){o("Ugm9")},"data-v-694cd902",null).exports;var p={name:"index",store:a,data:function(){return{form:{name:"",passsword:""}}},methods:{onSubmit:function(){var e=this,t=(this.form.name,this.form.passsword,this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}));m(this.form.name,this.form.passsword).then(function(o){t.close(),1==(o=o.data).code?e.$message.success({message:"登陆成功",duration:2e3,onClose:function(){e.$store.commit("changeName",e.form.name),sessionStorage.setItem("name",e.form.name),e.$router.push("main")}}):e.$message.error(o.msg)}).catch(function(t){e.$message.error("登陆失败"),console.log(t)})}},mounted:function(){console.log(m)}},v={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"conent"},[o("h3",[e._v("登陆")]),e._v(" "),o("h5",[e._v("这是一个简单的记账本，可以让你知道你的钱花在哪了")]),e._v(" "),o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"0px"}},[o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{placeholder:"用户名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{placeholder:"密码",type:"password"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.form.passsword,callback:function(t){e.$set(e.form,"passsword",t)},expression:"form.passsword"}})],1),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("登陆")]),e._v(" "),o("router-link",{attrs:{to:"/register"}},[o("el-button",[e._v("注册")])],1)],1)],1)],1)},staticRenderFns:[]};var g=o("VU/8")(p,v,!1,function(e){o("HClg")},"data-v-66905cf6",null).exports,_={name:"register",store:a,data:function(){return{form:{name:"",passsword:"",repPasssword:""}}},methods:{onSubmit:function(){if(""!=this.form.name)if(""!=this.form.passsword)if(this.form.passsword==this.form.repPasssword){var e,t,o=this,n=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});(e=this.form.name,t=this.form.passsword,l.a.post("/register",{name:e,password:t})).then(function(e){n.close(),1==(e=e.data).code?o.$message.success({message:"注册成功",duration:2e3,onClose:function(){o.$store.commit("changeName",o.form.name),sessionStorage.setItem("name",o.form.name),o.$router.push("main")}}):o.$message.error(e.msg)}).catch(function(e){console.log(e),o.$message.error("注册失败")})}else this.$message.error("重复密码与密码不一致");else this.$message.error("请输入密码");else this.$message.error("请输入用户名")}}},b={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"conent"},[o("h3",[e._v("注册")]),e._v(" "),o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"0px"}},[o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{placeholder:"用户名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.form.passsword,callback:function(t){e.$set(e.form,"passsword",t)},expression:"form.passsword"}})],1),e._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{type:"password",placeholder:"重复密码"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onSubmit(t):null}},model:{value:e.form.repPasssword,callback:function(t){e.$set(e.form,"repPasssword",t)},expression:"form.repPasssword"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("注册")])],1)],1)],1)},staticRenderFns:[]};var w=o("VU/8")(_,b,!1,function(e){o("meCc")},"data-v-047d410f",null).exports;function k(e){return("00"+e).substr(e.length)}var x={name:"forms",store:a,data:function(){return{form:{date:"",breakfast:0,lunch:0,dinner:0,traffic:0,sock:0,work:1,clothes:0,clothesRemind:"",play:0,playRemind:"",others:0,othersRemind:"",user:""},now:""}},mounted:function(){var e=new Date;this.now=this.form.date=function(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));var o={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(var n in o)if(new RegExp("("+n+")").test(t)){var r=o[n]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?r:k(r))}return t}(e,"yyyy-MM-dd"),this.form.user=this.$store.state.name,this.init()},computed:{eat:function(){return parseFloat(this.form.breakfast)+parseFloat(this.form.lunch)+parseFloat(this.form.dinner)},all:function(){return parseFloat(this.eat)+parseFloat(this.form.traffic)+parseFloat(this.form.sock)+parseFloat(this.form.clothes)+parseFloat(this.form.play)+parseFloat(this.form.others)}},methods:{gosubmit:function(){var e=this;this.$confirm("确认提交消费?","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type:"warning"}).then(function(){e.onSubmit()}).catch(function(){})},onSubmit:function(){var e=this.form,t=1,o="";for(var n in e)if("playRemind"!=n&&"clothesRemind"!=n&&"othersRemind"!=n&&"date"!=n&&"user"!=n){if(console.log(e[n]),e[n]+""==""){t=0,o=n+"没填";break}e[n]=parseFloat(e[n]),console.log(e[n])}if(0!=t){var r,s=this;console.log(e),(r=e,l.a.post("/subSpending",r)).then(function(e){1==(e=e.data).code?(s.$message.success("提交成功"),s.$emit("goinit")):(console.log(o),s.$message.error("提交失败"))}).catch(function(e){s.$message.error("提交失败"),console.log(e)})}else this.$message.error(o)},change:function(){console.log(this.form.date),this.form.date<"2018-05-29"&&(this.form.date="2018-05-29",this.$message.error("2018-05-29是最早时间")),this.form.date>this.now&&(this.form.date=this.now,this.$message.error(this.now+"是最晚时间")),this.init()},init:function(){console.log(this.form.user);var e,t=this;(e=this.form.date,l.a.post("/getSpending",{date:e})).then(function(e){if(console.log(e),1==(e=e.data).code)if(e.data.length>0)t.form=e.data[0];else for(var o in t.form)console.log(o),"playRemind"!=o&&"clothesRemind"!=o&&"othersRemind"!=o&&"date"!=o&&"user"!=o?t.form[o]=0:"date"!=o&&"user"!=o&&(t.form[o]="");else t.$message.error("系统异常")}).catch(function(e){t.$message.error("系统异常")})},formatInput:function(e){},blurInput:function(e){console.log(e);var t=this.form[e]+"";console.log(t),""==(t=t.replace(/[^\-?\d.]/g,""))&&(t=0),this.$set(this.form,e,t)}}},y={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"消费时间"}},[o("el-col",{attrs:{span:11}},[o("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},on:{change:e.change},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1)],1),e._v(" "),o("el-form-item",{staticClass:"eat",attrs:{label:"吃饭费用"}},[o("el-input",{attrs:{placeholder:"早",maxlength:"5"},on:{input:function(t){e.formatInput("breakfast")},blur:function(t){e.blurInput("breakfast")}},model:{value:e.form.breakfast,callback:function(t){e.$set(e.form,"breakfast",t)},expression:"form.breakfast"}}),e._v(" "),o("el-input",{attrs:{placeholder:"中",maxlength:"5"},on:{input:function(t){e.formatInput("lunch")},blur:function(t){e.blurInput("lunch")}},model:{value:e.form.lunch,callback:function(t){e.$set(e.form,"lunch",t)},expression:"form.lunch"}}),e._v(" "),o("el-input",{attrs:{placeholder:"晚",maxlength:"5"},on:{input:function(t){e.formatInput("dinner")},blur:function(t){e.blurInput("dinner")}},model:{value:e.form.dinner,callback:function(t){e.$set(e.form,"dinner",t)},expression:"form.dinner"}}),e._v(" "),o("span",[e._v("总计："+e._s(e.eat))])],1),e._v(" "),o("el-form-item",{attrs:{label:"交通费用"}},[o("el-input",{attrs:{type:""},on:{input:function(t){e.formatInput("traffic")},blur:function(t){e.blurInput("traffic")}},model:{value:e.form.traffic,callback:function(t){e.$set(e.form,"traffic",t)},expression:"form.traffic"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"零食费用"}},[o("el-input",{on:{input:function(t){e.formatInput("sock")},blur:function(t){e.blurInput("sock")}},model:{value:e.form.sock,callback:function(t){e.$set(e.form,"sock",t)},expression:"form.sock"}}),e._v(" "),o("span",[e._v("包含饮料，零食，大包零食记录首天")])],1),e._v(" "),o("el-form-item",{attrs:{label:"是否上班"}},[o("el-radio-group",{model:{value:e.form.work,callback:function(t){e.$set(e.form,"work",t)},expression:"form.work"}},[o("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),o("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"游玩费用"}},[o("el-input",{on:{input:function(t){e.formatInput("play")},blur:function(t){e.blurInput("play")}},model:{value:e.form.play,callback:function(t){e.$set(e.form,"play",t)},expression:"form.play"}})],1),e._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{type:"textarea",placeholder:"游玩费用备注(非必填)"},model:{value:e.form.playRemind,callback:function(t){e.$set(e.form,"playRemind",t)},expression:"form.playRemind"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"服装费用"}},[o("el-input",{on:{input:function(t){e.formatInput("clothes")},blur:function(t){e.blurInput("clothes")}},model:{value:e.form.clothes,callback:function(t){e.$set(e.form,"clothes",t)},expression:"form.clothes"}})],1),e._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{type:"textarea",placeholder:"服装费用备注(非必填)"},model:{value:e.form.clothesRemind,callback:function(t){e.$set(e.form,"clothesRemind",t)},expression:"form.clothesRemind"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"其他费用"}},[o("el-input",{on:{input:function(t){e.formatInput("others")},blur:function(t){e.blurInput("others")}},model:{value:e.form.others,callback:function(t){e.$set(e.form,"others",t)},expression:"form.others"}})],1),e._v(" "),o("el-form-item",{attrs:{label:""}},[o("el-input",{attrs:{type:"textarea",placeholder:"其他费用备注(非必填)"},model:{value:e.form.othersRemind,callback:function(t){e.$set(e.form,"othersRemind",t)},expression:"form.othersRemind"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"费用总计"}},[e._v("\n    "+e._s(e.all)+"\n  ")]),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.gosubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]};var $=o("VU/8")(x,y,!1,function(e){o("GmxA")},"data-v-20543af4",null).exports,I={name:"mains",store:a,data:function(){return{list:[1,2],activeIndex:"1",activeIndex2:"1",month:"",count:0,now:"",form:{breakfast:0,lunch:0,dinner:0,traffic:0,sock:0,clothes:0,play:0,others:0},dialogVisible:!1,passsword:{origain:"",newword:"",remewword:""}}},mounted:function(){var e=new Date,t=e.getMonth()+1,o=e.getFullYear();t=t<10?"0"+t:t,this.month=o+"-"+t,console.log(this.nextmonth),this.now=o+"-"+t,this.init()},computed:{name:function(){return this.$store.state.name},eat:function(){return(this.form.breakfast+this.form.lunch+this.form.dinner).toFixed(2)},nextmonth:function(){var e=this.month.split("-"),t="";if(12==parseInt(e[1]))t=parseInt(e[0])+1+"-01";else{var o=parseInt(e[1])+1;t=e[0]+"-"+(o<10?"0"+o:o)}return t}},methods:{handleSelect:function(e,t){console.log(e,t)},init:function(){var e,t,o=this;o.count=0,(e=this.month,t=this.nextmonth,l.a.post("/getSumByDate",{month:e,nextmonth:t})).then(function(e){console.log(e.data.data[0]);var t=e.data.data[0];for(var n in t)if(null==t[n]){o.count+=0;var r=n.split(")")[0].split("(")[1];o.form[r]=0}else{o.count+=t[n],console.log(t[n]);var s=n.split(")")[0].split("(")[1];o.form[s]=t[n]}}).catch(function(e){console.log(e)})},change:function(){console.log(this.nextmonth),this.month<"2018-05"&&(this.month="2018-05",this.$message.error("2018-05是最早时间")),this.month>this.now&&(this.month=this.now,this.$message.error(this.now+"是最晚时间")),this.init()},loginout:function(){var e=this;this.$confirm("确认退出?","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type:"warning"}).then(function(){e.out()}).catch(function(){})},out:function(){sessionStorage.removeItem("name"),this.$router.push("/")},changePas:function(){if(""!=this.passsword.origain)if(""!=this.passsword.newword)if(""!=this.passsword.remewword)if(this.passsword.remewword==this.passsword.newword){var e,t,o=this;(e=this.passsword.origain,t=this.passsword.newword,l.a.post("/changePassword",{password:e,newPas:t})).then(function(e){console.log(e);var t=e.data;1==t.code?(o.$message.success("修改成功"),o.dialogVisible=!1):o.$message.error(t.msg)}).catch(function(e){console.log(e),o.$message.error("未知异常")})}else this.$message.error("新的的密码与重复密码不一致");else this.$message.error("重复密码");else this.$message.error("请输入新的的密码");else this.$message.error("请输入原来的密码")},getTwo:function(e){return parseInt(100*e)/100}},components:{forms:$}},R={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-container",{staticStyle:{height:"100%"}},[o("el-header",[o("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex2,mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.handleSelect}},[o("el-menu-item",{attrs:{index:"1"}},[e._v("消费记录")]),e._v(" "),o("el-submenu",{staticStyle:{float:"right"},attrs:{index:"4"}},[o("template",{slot:"title"},[o("span",[e._v("欢迎你 "+e._s(e.name))])]),e._v(" "),o("el-menu-item",{attrs:{index:"4-1"},on:{click:e.loginout}},[e._v("退出")]),e._v(" "),o("el-menu-item",{attrs:{index:"4-2"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("修改密码")])],2)],1)],1),e._v(" "),o("el-main",[o("div",{staticClass:"main"},[o("div",{staticClass:"mian-content"},[o("forms",{on:{goinit:e.init}})],1),e._v(" "),o("div",{staticClass:"main-remind"},[o("div",{staticClass:"remind"},[o("div",{staticClass:"remind-title"},[e._v("整月小结")]),e._v(" "),o("ul",[o("li",[e._v("月份"),o("el-date-picker",{staticStyle:{width:"150px",float:"right"},attrs:{type:"month",placeholder:"选择日期",format:"yyyy-MM","value-format":"yyyy-MM"},on:{change:e.change},model:{value:e.month,callback:function(t){e.month=t},expression:"month"}})],1),e._v(" "),o("li",[e._v("吃饭费用："+e._s(e.eat)+"   早中晚:("+e._s(e.form.breakfast)+","+e._s(e.form.lunch)+","+e._s(e.form.dinner)+" )")]),e._v(" "),o("li",[e._v("交通费用："+e._s(e.form.traffic))]),e._v(" "),o("li",[e._v("零食费用："+e._s(e.form.sock))]),e._v(" "),o("li",[e._v("衣服费用："+e._s(e.form.clothes))]),e._v(" "),o("li",[e._v("游玩费用："+e._s(e.form.play))]),e._v(" "),o("li",[e._v("其他费用："+e._s(e.form.others))]),e._v(" "),o("li",[e._v("费用总计："+e._s(e.count))])])])])])]),e._v(" "),o("el-dialog",{attrs:{title:"修改密码",visible:e.dialogVisible,width:"500px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("el-form",{ref:"passsword",attrs:{model:e.passsword,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"原来密码"}},[o("el-input",{attrs:{type:"password"},model:{value:e.passsword.origain,callback:function(t){e.$set(e.passsword,"origain",t)},expression:"passsword.origain"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"新的密码"}},[o("el-input",{attrs:{type:"password"},model:{value:e.passsword.newword,callback:function(t){e.$set(e.passsword,"newword",t)},expression:"passsword.newword"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"重复密码"}},[o("el-input",{attrs:{type:"password"},model:{value:e.passsword.remewword,callback:function(t){e.$set(e.passsword,"remewword",t)},expression:"passsword.remewword"}})],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.changePas}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var S=o("VU/8")(I,R,!1,function(e){o("RY0Z")},"data-v-4322f69f",null).exports;n.default.use(d.a);var C=new d.a({routes:[{path:"/",name:"index",component:g},{path:"/register",name:"register",component:w},{path:"/main",name:"main",component:S,meta:{requireAuth:!0}}]}),F=o("zL8q"),E=o.n(F);o("tvR6");n.default.use(r.a),n.default.prototype.$ajax=l.a,n.default.use(E.a),n.default.config.productionTip=!1,C.beforeEach(function(e,t,o){e.meta.requireAuth?(console.log(a.state.name),sessionStorage.getItem("name")?o():o({path:"/",query:{redirect:e.fullPath}})):o()}),new n.default({el:"#app",router:C,components:{App:f},template:"<App/>"})},RY0Z:function(e,t){},Ugm9:function(e,t){},meCc:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.b50b783b9c1b271371c0.js.map