
import "bootstrap/dist/css/bootstrap.min.css"
// import bootstrap from "bootstrap"
// import $ from "jquery"
//jquery 应该是b站自带的
import { gongjv } from "./service/SpaceSearch"
import loadHostSpaceBili from './component/host-space-bili'

$(function () {
    let biliURL = window.location.href;
    if (biliURL.startsWith("https://space.bilibili.com/")) {
        let hostUid = gongjv.give.getDid()
        let uid = gongjv.give.getUid()
        if (hostUid == uid) {
            loadHostSpaceBili()
        }
    }
})
