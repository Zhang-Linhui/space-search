import "./bili-button.css"

export default function () {
    let htmlHostSpace =
        `
   <div class="container" id="panel-space-bili">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card" id="draggable-panel">
                    <div class="card-header">查找动态</div>
                    <div class="card-body">
                        <ul id="announcement-list">
                        </ul>
                    </div>
                    <div class="input-group">
                        <input type="number" class="form-control text-center" placeholder="请输入动态号" aria-label="数字输入框"
                            aria-describedby="basic-addon1">
                    </div>
                    <div class="btn-group btn-group-sm btn-group-center" role="group">
                        <button type="button" class="btn btn-primary btn-sm mr-2" id="button1">开始</button>
                        <button type="button" class="btn btn-sm btn-secondary" id="button2">暂停</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    $("body").append(htmlHostSpace);

}
