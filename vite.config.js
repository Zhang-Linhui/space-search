import { build, defineConfig, version } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://static.hdslb.com/images/favicon.ico',
        namespace: 'https://github.com/Zhang-Linhui',
        include: [/^http?s:\/\/space\.bilibili\.com\/[\d]+.*$/],
        version: "1.0.1",
        author: "zlh",
        require: ["https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js",],
        updateURL: "https://gitee.com/ZLH2021/bili-space-search/raw/main/dist/space_search.user.js"
      },
      build: {
        externalResource: {
          "bootstrap/dist/css/bootstrap.min.css": cdn.jsdelivr(),
          "jquery-ui/themes/base/autocomplete.css": cdn.jsdelivr()
        },
      },
      clientAlias: "zGM"
    }),
  ],
});
