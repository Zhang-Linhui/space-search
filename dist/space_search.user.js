// ==UserScript==
// @name       space_search
// @namespace  https://github.com/Zhang-Linhui
// @version    1.0.1
// @author     zlh
// @icon       https://static.hdslb.com/images/favicon.ico
// @updateURL  https://gitee.com/ZLH2021/bili-space-search/raw/main/dist/space_search.user.js
// @include    /^http?s:\/\/space\.bilibili\.com\/[\d]+\/dynamic$/
// @require    https://cdn.bootcdn.net/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require    https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.min.js
// @resource   bootstrap/dist/css/bootstrap.min.css    https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
// @resource   jquery-ui/themes/base/autocomplete.css  https://cdn.jsdelivr.net/npm/jquery-ui@1.12.1/themes/base/autocomplete.css
// @grant      GM_getResourceText
// ==/UserScript==

(e=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.textContent=e,document.head.append(o)})(" #panel-space-bili{position:fixed;top:70%;left:80%;z-index:1000}.btn-group-center{display:flex;justify-content:center;padding-top:10px;padding-bottom:10px;background-color:coral}#panel-space-bili{max-width:600px}.card-header{background-color:coral;color:#fff;font-weight:700;font-size:24px;text-align:center}.card-body{height:300px;overflow-y:scroll;background-color:khaki}.card-body ul{list-style:none;margin:0;padding:0}.card-body li{padding:5px 0;border-bottom:1px solid #fff;text-align:center;color:#000}.card-body li:last-child{border-bottom:none}.btn-primary,.btn-secondary{background-color:coral;border-color:coral}.btn-primary:hover,.btn-secondary:hover{background-color:tomato;border-color:tomato}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0} ");

(function () {
  'use strict';

  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("bootstrap/dist/css/bootstrap.min.css");
  cssLoader("jquery-ui/themes/base/autocomplete.css");
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
  function loadBiliButton() {
    let htmlHostSpace = `
   <div class="container" id="panel-space-bili">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card" id="draggable-panel">
                    <div class="card-header">公告</div>
                    <div class="card-body">
                        <ul id="announcement-list">
                        </ul>
                    </div>
                    <div class="input-group">
                        <input type="number" class="form-control text-center" placeholder="请输入数字" aria-label="数字输入框"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="btn-group btn-group-lg btn-group-center" role="group">
                        <button type="button" class="btn btn-primary mr-2" id="button1">按钮1</button>
                        <button type="button" class="btn btn-secondary" id="button2">按钮2</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    $("body").append(htmlHostSpace);
  }
  const bindBiliButtonClick = () => {
    function addAnnouncement(announcement, link) {
      var li = document.createElement("li");
      var announcementList = document.getElementById("announcement-list");
      li.innerHTML = announcement;
      if (link) {
        var a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.appendChild(li);
        announcementList.appendChild(a);
      } else {
        announcementList.appendChild(li);
      }
    }
    addAnnouncement("公告1", "https://www.baidu.com");
    addAnnouncement("公告2");
    $(function() {
      $("#draggable-panel").draggable();
    });
    $(document).ready(function() {
      const $cardHeader = $(".card-header");
      const $cardBody = $(".card-body");
      const $btnGroup = $(".btn-group");
      $cardHeader.dblclick(function() {
        $cardBody.toggle();
        $btnGroup.toggle();
      });
      let button1Clicked = false;
      $("#button1").click(function() {
        if (!button1Clicked) {
          console.log("hello");
        } else {
          const inputValue = $(".form-control").val() || "没有输入";
          addAnnouncement(inputValue);
        }
        button1Clicked = !button1Clicked;
      });
      let button2Clicked = false;
      $("#button2").click(function() {
        if (!button2Clicked) {
          console.log("hello");
        } else {
          $("#announcement-list").empty();
        }
        button2Clicked = !button2Clicked;
      });
    });
  };
  const loadHostSpaceBili = () => {
    loadBiliButton();
    bindBiliButtonClick();
  };
  $(function() {
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
