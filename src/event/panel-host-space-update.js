import { biliURL } from "../utils/parameters-bili-util"

export default function updateSpaceHostPanel() {
    let $panelSpaceBili = $("#panel-space-bili")
    let sign = false
    $(document).on("click", "#navigator .n-tab-links .n-btn", function () {
        if ($("#navigator .n-tab-links a.active").index() == 1) {
            $panelSpaceBili.show()
        }
        else {
            $panelSpaceBili.hide()
        }

    })
    $(function () {
        if (biliURL.endsWith("dynamic")) {
            $panelSpaceBili.show()
        } else {
            $panelSpaceBili.hide()
        }
    })
}