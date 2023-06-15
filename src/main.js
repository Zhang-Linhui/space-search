import "bootstrap/dist/css/bootstrap.min.css"
import "jquery-ui/themes/base/autocomplete.css"
// import $ from "jquery" //jquery 应该是b站自带的
import { gongjv } from "./service/SpaceSearch"
import loadHostSpaceBili from './component/host-space-bili'
import { biliURL } from "./utils/parameters-bili-util"

$(function () {

    if (biliURL.startsWith("https://space.bilibili.com/")) {
        let hostUid = gongjv.give.getDid()
        let uid = gongjv.give.getUid()
        if (hostUid == uid) {
            loadHostSpaceBili()
        }
    }
})
