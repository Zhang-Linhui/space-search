import SpaceSearch from "../service/SpaceSearch"


export default function searchSpaceHost() {
    // let btnCPM = () => {
    //     $("#bili-zlh-button").text("开始执行")
    //     spaceSearch = new SpaceSearch(btnCPM);
    // }
    // let spaceSearch = new SpaceSearch(btnCPM);
    // $(document).on("click", "#bili-zlh-button", function (e) {
    //     if ($(this).text() == "开始执行") {
    //         spaceSearch.start()
    //         $(this).text("执行中")
    //     } else {
    //         spaceSearch.stop()
    //         $(this).text("开始执行")
    //     }
    // })


    function addAnnouncement(announcement, link) {
        var li = document.createElement("li");
        var announcementList = document.getElementById("announcement-list");
        li.innerHTML = announcement;
        if (link) {
            var a = document.createElement("a");
            a.href = link;
            a.target = "_blank";
            a.appendChild(li);
            announcementList.appendChild(a)
        } else {
            announcementList.appendChild(li);
        }
    }

    // 设置公告面板为可拖动
    $(function () {
        // @ts-ignore
        $("#draggable-panel").draggable();
    });

    $(document).ready(function () {
        // 获取标题、内容面板和按钮部分元素
        const $cardHeader = $(".card-header");
        const $cardBody = $(".card-body");
        const $btnGroup = $(".btn-group");

        // 双击标题切换内容面板和按钮部分的显示状态
        $cardHeader.dblclick(function () {
            $cardBody.toggle();
            $btnGroup.toggle();
        });

        // 按钮1点击事件
        let button1Clicked = false;
        $("#button1").click(function () {
            if (!button1Clicked) {
                console.log("hello")
            } else {
                const inputValue = $(".form-control").val() || "没有输入";
                addAnnouncement(inputValue);
            }
            button1Clicked = !button1Clicked;
        });

        // 按钮2点击事件
        let button2Clicked = false;
        $("#button2").click(function () {
            if (!button2Clicked) {
                console.log("hello")
            } else {
                $("#announcement-list").empty();
            }
            button2Clicked = !button2Clicked;
        });

    });
}