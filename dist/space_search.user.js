// ==UserScript==
// @name       space_search
// @namespace  https://github.com/Zhang-Linhui
// @version    1.0.0
// @author     monkey
// @icon       https://static.hdslb.com/images/favicon.ico
// @include    /^http?s:\/\/space\.bilibili\.com\/[\d]+\/dynamic$/
// @resource   bootstrap/dist/css/bootstrap.min.css  https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
// @grant      GM_getResourceText
// ==/UserScript==

(t=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=t,document.head.append(e)})(" #bili-zlh-button{position:fixed;top:70%;left:80%;z-index:1000} ");

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };
  var _hublist, _getHub, getHub_fn, _temporLi, _a, _key, _spHandle, _mainloop, mainloop_fn;
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("bootstrap/dist/css/bootstrap.min.css");
  const gongjv = {
    give: {
      getDate: () => (/* @__PURE__ */ new Date()).getFullYear() + ((/* @__PURE__ */ new Date()).getMonth() + 1 < 10 ? "0" : "") + ((/* @__PURE__ */ new Date()).getMonth() + 1) + ((/* @__PURE__ */ new Date()).getDate() < 10 ? "0" : "") + (/* @__PURE__ */ new Date()).getDate(),
      getUid: () => (document.cookie + ";").match(new RegExp("(?<=DedeUserID=).+?(?=;)"))[0],
      getJct: () => (document.cookie + ";").match(new RegExp("(?<=bili_jct=).+?(?=;)"))[0],
      getDid: () => window.location.pathname.match(/\d+/)[0],
      getRand: (max, min = 0) => Math.floor(Math.random() * (max - min)) + min,
      getDynamicUid: () => window.location.pathname.split("/")[1],
      getNoDuplicateList: (l) => Array.from(new Set(l))
    },
    judge: {
      judgeDate: (date, la) => parseInt("" + (/* @__PURE__ */ new Date()).getTime() / 1e3) - date > 3600 * 24 * la
    },
    action: {
      setCurry: (f, ...a) => f.length <= a.length ? f(...a) : gongjv.action.setCurry.bind(null, f, ...a),
      setPromise: (ff) => {
        return new Promise((resolve, reject) => {
          ff(resolve);
        });
      }
    }
  };
  class HubManage {
    /**
     * 基础类
     * @param  {...any} arge 选择要加入的库,规定字符串为要加入的自带库
     */
    constructor(...arge) {
      __privateAdd(this, _getHub);
      __privateAdd(this, _hublist, []);
      __publicField(this, "store_huose", {
        csshub: {
          base_conf: () => "cursor:pointer;\n-webkit-user-select: none;\n-moz-user-select: none;\n-ms-user-select: none;\nuser-select': none;\nz-index:100000;\ntext-align:center;",
          space_css: () => `
                <style type="text/css">
                .css_btn_class {
                    ${this.store_huose.k_css.base_conf()}
                    width:60px;
                    font-size:16px;
                    font-family:Arial;
                    font-weight:normal;
                    -moz-border-radius:8px;
                    -webkit-border-radius:8px;
                    border-radius:8px;
                    border:1px solid #3866a3;
                    padding:8px 9px;
                    text-decoration:none;
                    background:-webkit-gradient( linear, left top, left bottom, color-stop(102%, #63b8ee), color-stop(3%, #468ccf) );
                    background:-moz-linear-gradient( center top, #63b8ee 102%, #468ccf 3% );
                    background:-ms-linear-gradient( top, #63b8ee 102%, #468ccf 3% );
                    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf');
                    background-color:#63b8ee;
                    color:#14396a;
                    display:inline-block;
                    text-shadow:1px -7px 0px #7cacde;
                    -webkit-box-shadow:inset 1px 0px 20px 3px #bee2f9;
                    -moz-box-shadow:inset 1px 0px 20px 3px #bee2f9;
                    box-shadow:inset 1px 0px 20px 3px #bee2f9;
                }.css_btn_class:hover {
                    background:-webkit-gradient( linear, left top, left bottom, color-stop(102%, #468ccf), color-stop(3%, #63b8ee) );
                    background:-moz-linear-gradient( center top, #468ccf 102%, #63b8ee 3% );
                    background:-ms-linear-gradient( top, #468ccf 102%, #63b8ee 3% );
                    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#468ccf', endColorstr='#63b8ee');
                    background-color:#468ccf;
                }.css_btn_class:active {
                    position:relative;
                    top:1px;
                }
                </style>
`
        },
        httphub: {
          rmDynamic: (dth) => ({
            url: "https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/rm_dynamic",
            data: {
              dynamic_id: dth,
              csrf_token: gongjv.give.getJct(),
              csrf: gongjv.give.getJct()
            },
            type: "post"
          }),
          getAttentionlist: () => ({
            url: "https://api.vc.bilibili.com/feed/v1/feed/get_attention_list",
            data: {
              uid: gongjv.give.getUid()
            },
            type: "get"
          }),
          rmUid: (tuid) => ({
            url: "https://api.bilibili.com/x/relation/modify",
            data: {
              fid: tuid,
              act: 2,
              re_src: 11,
              jsonp: "jsonp",
              csrf: gongjv.give.getJct()
            },
            type: "post"
          }),
          getAttentionGroup: () => ({
            url: "https://api.bilibili.com/x/relation/tags",
            type: "get"
          }),
          getAttentionPage: (pn, tagid = -10) => ({
            url: "https://api.bilibili.com/x/relation/tag",
            data: {
              mid: gongjv.give.getUid(),
              tagid,
              pn,
              ps: 50
            },
            type: "get"
          }),
          getSpaceHistory: (host_uid, offset_dynamic_id = 0) => ({
            url: "https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history",
            data: {
              visitor_uid: gongjv.give.getUid(),
              offset_dynamic_id,
              host_uid,
              need_top: 1
            },
            type: "get"
          })
        }
      });
      arge.forEach((v) => {
        if (typeof v == "string") {
          let k = this.store_huose[v];
          if (k == void 0)
            throw "请输入正确的库名";
          __privateGet(this, _hublist).push(k);
        } else
          __privateGet(this, _hublist).push(v);
      });
    }
    get(name) {
      let t = __privateMethod(this, _getHub, getHub_fn).call(this, name);
      return t[name];
    }
  }
  _hublist = new WeakMap();
  _getHub = new WeakSet();
  getHub_fn = function(name) {
    let ku = Object.values(__privateGet(this, _hublist)).find((va, ii) => {
      return va[name] != void 0;
    }) ?? (() => {
      throw "找不到库" + name;
    })();
    return ku;
  };
  const base_mob = {
    blhttps: class {
      constructor() {
        __publicField(this, "kum", new HubManage("httphub"));
        __publicField(this, "_all_data", null);
      }
      z_ajax(all_data) {
        let er = (res) => {
          $.ajax({
            ...all_data,
            xhrFields: { withCredentials: true },
            dataType: "json",
            success: (data) => {
              console.log(data);
              if (!data.message || data.message == "0" || data.message == "success") {
                res(data.data);
              } else {
                console.log(data.message);
                res(0);
              }
            }
          });
        };
        return gongjv.action.setPromise(er);
      }
      blajax(type, url, data = {}) {
        return this.z_ajax({ type, url, data });
      }
      blget(...a) {
        return this.blajax("get", ...a);
      }
      blpost(...a) {
        return this.blajax("post", ...a);
      }
      async dataGet() {
        if (this._all_data == null) {
          throw "请重写该#all_data";
        }
        return await this.z_ajax(this._all_data);
      }
    }
  };
  class SpaceManage extends base_mob.blhttps {
    /**
     * 空间循环类
     * @param {string} hd 搜索的空间主人uid
     * @param {number} ld
     */
    constructor(cPM = () => {
      console.log("执行完毕");
    }, hd = gongjv.give.getUid(), ld = 60) {
      super();
      /**
       * 主循环
       */
      __privateAdd(this, _mainloop);
      /**符合条件的数据合集*/
      __publicField(this, "packageli", []);
      /**循环状态量 */
      __privateAdd(this, _key, true);
      /**生成器权柄 */
      __privateAdd(this, _spHandle, void 0);
      /**接受数据包的量 */
      __publicField(this, "sp_count", 0);
      /**
      * 单独的十次数据处理
      */
      __publicField(this, "dataArrange", (_a = class {
        constructor(lastday) {
          __privateAdd(this, _temporLi, []);
          this.ld = lastday;
        }
        /**
         *
         * @param {object} data 单独一次的原始的data数据
         * @returns offset
         */
        async dataAct(data) {
          let off = this.infoJudge(data);
          await this.infoExtract(data.cards);
          return off;
        }
        /**
         * 最终数据的获取
         */
        get data() {
          return __privateGet(this, _temporLi);
        }
        /**
         *提取需要的值
         * @param {object} 单独的space-desc值
         * @returns object
         */
        infoIndiv({ extra: { is_space_top: top }, desc: { dynamic_id_str: did, origin, previous, timestamp: ti } }) {
          let { status: exi, uid, dynamic_id_str: rdid } = previous ?? origin ?? { uid: gongjv.give.getUid(), status: 1, dynamic_id_str: "123456" };
          return { top, did, ti, exi, uid, rdid };
        }
        /**
         * 提取和处理相关变量
         * @param {object} apck
         */
        async infoExtract(apck) {
          let li = apck.map((v) => this.infoIndiv(v));
          for (let i of li) {
            if (i.rdid == "678854211508633640") {
              __privateGet(this, _temporLi).push(i.did);
              throw "找到了";
            }
          }
        }
        /**
         *判断是否停止
         * @param {object} packa
         * @returns string
         */
        infoJudge(packa) {
          if (packa.has_more != 1)
            throw "";
          return packa.next_offset;
        }
      }, _temporLi = new WeakMap(), _a));
      this.lastday = ld;
      this.hid = hd;
      __privateSet(this, _spHandle, __privateMethod(this, _mainloop, mainloop_fn).call(this));
      this.callbackProcessingMethod = cPM;
    }
    async start() {
      __privateSet(this, _key, true);
      return await __privateGet(this, _spHandle).next();
    }
    stop() {
      __privateSet(this, _key, false);
    }
    /**
     *
     * @param {string} off 输入值
     * @returns 原装变量
     */
    async spaceGet(off) {
      let data = await this.z_ajax(this.kum.get("getSpaceHistory")(this.hid, off));
      return data;
    }
  }
  _key = new WeakMap();
  _spHandle = new WeakMap();
  _mainloop = new WeakSet();
  mainloop_fn = async function* () {
    let off = "0";
    let dalist = new this.dataArrange(this.lastday);
    try {
      while (true) {
        let data = await this.spaceGet(off);
        console.log("数据包: " + ++this.sp_count);
        let off_b = off;
        off = await dalist.dataAct(data);
        if (off_b == off)
          throw "";
        if (!__privateGet(this, _key))
          throw "";
      }
    } catch (error) {
      console.log(error);
      this.packageli = dalist.data;
      console.log("找到了");
      console.log(this.packageli);
      console.log(this.callbackProcessingMethod);
      this.callbackProcessingMethod();
      return;
    }
  };
  function loadBiliButton() {
    $("body").append(`
    <button type="button" id="bili-zlh-button" class="btn btn-primary btn-lg">开始执行</button>`);
  }
  const bindBiliButtonClick = () => {
    let btnCPM = () => {
      $("#bili-zlh-button").text("开始执行");
      spaceSearch = new SpaceManage(btnCPM);
    };
    let spaceSearch = new SpaceManage(btnCPM);
    $(document).on("click", "#bili-zlh-button", function(e) {
      if ($(this).text() == "开始执行") {
        spaceSearch.start();
        $(this).text("执行中");
      } else {
        spaceSearch.stop();
        $(this).text("开始执行");
      }
    });
    $(document).on("click", "#navigator .n-tab-links .n-btn", function() {
      console.log("wwwww");
      if ($("#navigator .n-tab-links a.active").hasClass("n-dynamic")) {
        $("#bili-zlh-button").show();
      } else {
        $("#bili-zlh-button").hide();
      }
    });
  };
  const loadHostSpaceBili = () => {
    loadBiliButton();
    bindBiliButtonClick();
  };
  $(function() {
    console.log(window.location.href);
    let biliURL = window.location.href;
    if (biliURL.startsWith("https://space.bilibili.com/")) {
      let hostUid = gongjv.give.getDid();
      let uid = gongjv.give.getUid();
      if (hostUid == uid) {
        loadHostSpaceBili();
      }
    }
  });

})();
