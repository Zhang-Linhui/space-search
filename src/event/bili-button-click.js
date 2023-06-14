import SpaceSearch from "../service/SpaceSearch"

export default () => {
    let btnCPM = () => {
        $("#bili-zlh-button").text("开始执行")
        spaceSearch = new SpaceSearch(btnCPM);
    }
    let spaceSearch = new SpaceSearch(btnCPM);
    $(document).on("click", "#bili-zlh-button", function (e) {
        if ($(this).text() == "开始执行") {
            spaceSearch.start()
            $(this).text("执行中")
        } else {
            spaceSearch.stop()
            $(this).text("开始执行")
        }
    })
    $(document).on("click", "#navigator .n-tab-links .n-btn", function () {
        console.log("wwwww")
        if ($("#navigator .n-tab-links a.active").hasClass("n-dynamic")) {
            $("#bili-zlh-button").show()
        }
        else {
            $("#bili-zlh-button").hide()
        }
    })
}