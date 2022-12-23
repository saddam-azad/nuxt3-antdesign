import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import { customTheme } from "./tools/customTheme";

const isDev = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  ssr: true,

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["unplugin-icons/types/vue"],
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    "@vueuse/nuxt",
    "unplugin-icons/nuxt",
  ],
  //@ts-ignore
  buildModules: [], // fixed some libraries not yet updated to nuxt 3.0.0

  alias: {},
  build: {
    transpile: [
      "@ant-design/icons-vue",
      isDev ? "" : "@babel/runtime", // building time: Could not resolve import "@babel/runtime/helpers/esm/objectSpread2.js"
    ],
  },
  css: 
  [
    '~/assets/less/index.less'
  ],
  vite: {
    ssr: {
      noExternal: ["ant-design-vue"],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // https://www.antdv.com/docs/vue/customize-theme/#Ant-Design-Vue-Less-variables
          modifyVars: customTheme(),
        },
      },
    },
    define: {
      // fixed apollo client err
      __DEV__: isDev.toString(),
    },
    plugins: [
      Components({
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
          // resolveIcons true will error with NITRO_PRESET=cloudflare
          AntDesignVueResolver({ resolveIcons: true, importStyle: "less" }),
        ],
        dts: "types/components.d.ts",
      }),
    ],
    esbuild: isDev
      ? {}
      : {
          pure: !isDev ? ["console.log", "console.warn", "debugger"] : [],
          legalComments: "none",
        },
  },
});
