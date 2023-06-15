const gongjv = {
    give: {
        getDate: () => new Date().getFullYear() + ((new Date().getMonth() + 1) < 10 ? "0" : "") + (new Date().getMonth() + 1) + (new Date().getDate() < 10 ? "0" : "") + new Date().getDate(),
        getUid: () => (document.cookie + ";").match(/(?<=DedeUserID=).+?(?=;)/)[0],
        getJct: () => (document.cookie + ";").match(/(?<=bili_jct=).+?(?=;)/)[0],
        getDid: () => window.location.pathname.match(/\d+/)[0],
        getRand: (max, min = 0) => Math.floor(Math.random() * (max - min)) + min,
        getDynamicUid: () => window.location.pathname.split("/")[1],
        getNoDuplicateList: l => Array.from(new Set(l))
    },
    judge: {
        judgeDate: (date, la) => (parseInt("" + (new Date().getTime()) / 1000) - date) > 3600 * 24 * la,
    },
    action: {
        setCurry: (f, ...a) => f.length <= a.length ? f(...a) : gongjv.action.setCurry.bind(null, f, ...a),

        setPromise: (ff) => { return new Promise((resolve, reject) => { ff(resolve) }) },
    }
}
export { gongjv }
class HubManage {

    #hublist = []
    /**
     * 基础类
     * @param  {...any} arge 选择要加入的库,规定字符串为要加入的自带库
     */
    constructor(...arge) {
        arge.forEach((v) => {
            if (typeof (v) == "string") {
                let k = this.store_huose[v]
                if (k == undefined)
                    throw "请输入正确的库名"
                this.#hublist.push(k)
            }
            else
                this.#hublist.push(v)
        })
    }

    get(name) {
        let t = this.#getHub(name)
        return t[name]
    }
    #getHub(name) {
        let ku = Object.values(this.#hublist).find((va, ii) => {
            return va[name] != undefined
        }) ?? (() => { throw "找不到库" + name })()
        return ku
    }
    store_huose = {
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
`,

        },
        httphub: {
            rmDynamic: dth => ({
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
            rmUid: tuid => ({
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
                type: "get",
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
    }
}
const base_mob = {

    blhttps: class {

        kum = new HubManage("httphub")
        _all_data = null
        z_ajax(all_data) {
            let er = res => {
                $.ajax({
                    ...all_data,
                    xhrFields: { withCredentials: true },
                    dataType: "json",
                    success: data => {
                        console.log(data)
                        if (!data.message || data.message == '0' || data.message == 'success') {
                            res(data.data);
                        }
                        else {
                            console.log(data.message);
                            res(0);
                        }
                    }
                });
            }
            return gongjv.action.setPromise(er)
        }
        blajax(type, url, data = {}) {
            return this.z_ajax({ type, url, data })
        }
        blget(...a) {
            return this.blajax("get", ...a)
        }
        blpost(...a) {
            return this.blajax("post", ...a)
        }
        async dataGet() {
            if (this._all_data == null) {
                throw "请重写该#all_data"
            }
            return await this.z_ajax(this._all_data)
        }
    },


}

class SpaceManage extends base_mob.blhttps {

    /**符合条件的数据合集*/
    packageli = []
    /**循环状态量 */
    #key = true
    /**生成器权柄 */
    #spHandle
    /**接受数据包的量 */
    sp_count = 0
    /**
     * 空间循环类
     * @param {string} hd 搜索的空间主人uid
     * @param {number} ld
     */
    constructor(cPM = ({ }) => { console.log("执行完毕") }, riDynamic = "678854211508633640", hd = gongjv.give.getUid(), ld = 60) {
        super()
        this.lastday = ld
        this.hid = hd
        this.rid = riDynamic
        this.#spHandle = this.#mainloop()
        this.callbackProcessingMethod = cPM

    }
    /**
     * 主循环
     */
    async *#mainloop() {
        let off = "0"
        let dalist = new this.dataArrange(this.rid)
        try {
            while (true) {

                let data = await this.spaceGet(off)
                console.log("数据包: " + (++this.sp_count))
                let off_b = off
                off = await dalist.dataAct(data)

                if (off_b == off)
                    throw ""
                if (!this.#key)
                    throw ""
            }
        } catch (error) {
            console.log(error)
            this.packageli = dalist.data;
            console.log("找到了")
            console.log(this.packageli);
            this.callbackProcessingMethod({ text: "找到了：" + this.packageli[0], link: `https://t.bilibili.com/${this.packageli[0]}` });
            return
        }
    }
    async start() {
        this.#key = true
        return await this.#spHandle.next()
    }
    stop() {
        this.#key = false
    }
    /**
     *
     * @param {string} off 输入值
     * @returns 原装变量
     */
    async spaceGet(off) {
        let data = await this.z_ajax(this.kum.get("getSpaceHistory")(this.hid, off))
        return data
    }
    /**
    * 单独的十次数据处理
    */
    dataArrange = class {

        #temporLi = []

        constructor(rid) {
            this.riDynamic = rid
        }

        /**
         *
         * @param {object} data 单独一次的原始的data数据
         * @returns offset
         */
        async dataAct(data) {
            let off = this.infoJudge(data)
            await this.infoExtract(data.cards)
            return off
        }

        /**
         * 最终数据的获取
         */
        get data() {
            return this.#temporLi
        }

        /**
         *提取需要的值
         * @param {object} 单独的space-desc值
         * @returns object
         */
        infoIndiv({ extra: { is_space_top: top }, desc: { dynamic_id_str: did, origin, previous, timestamp: ti } }) {
            let { status: exi, uid, dynamic_id_str: rdid } = previous ??
                origin ??
                { uid: gongjv.give.getUid(), status: 1, dynamic_id_str: "123456" }
            return { top, did, ti, exi, uid, rdid }
        }

        /**
         * 提取和处理相关变量
         * @param {object} apck
         */
        async infoExtract(apck) {
            let li = apck.map(v => this.infoIndiv(v))
            for (let i of li) {
                if (i.rdid == this.riDynamic) {
                    this.#temporLi.push(i.did);
                    throw "找到了"
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
                throw ""
            return packa.next_offset
        }
    }
}
export default SpaceManage