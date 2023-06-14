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
        include: [/^http?s:\/\/space\.bilibili\.com\/[\d]+\/dynamic$/],
        version: "1.0.0",
        author: "zlh",
      },
      build: {
        externalGlobals: [
          ["bootstrap", cdn.jsdelivr("bootstrap", "dist/js/bootstrap.min.js")],
          ["jquery", cdn.jsdelivr("jQuery", "dist/jquery.min.js")]
        ],
        externalResource: {
          "bootstrap/dist/css/bootstrap.min.css": cdn.jsdelivr()
        },
      },
      clientAlias: "zGM"
    }),
  ],
});
