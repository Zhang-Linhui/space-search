import loadBiliButton from "../static/panel-host-space-html"

import updateSpaceHostPanel from "../event/panel-host-space-update";
import searchSpaceHost from "../event/host-space-search";


export default () => {
    loadBiliButton();
    updateSpaceHostPanel()
    searchSpaceHost()
}