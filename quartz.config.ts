import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🧠 My Second Brain",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "wueestry.github.io/my-second-brain",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "JetBrains Mono",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#1e1e2e", // base
          lightgray: "#313244", // surface 0
          gray: "#6c7086", // overlay 0
          darkgray: "#a6adc8", // subtext 0
          dark: "#cdd6f4", // text
          secondary: "#89b4fa", // blue
          tertiary: "#a6e3a1", // green
          highlight: "rgba(186, 194, 222, 0.15)", // subtext 1
          textHighlight: "rgba(250, 179, 135, 0.2)", // peach
          // light: "#eff1f5",
          // lightgray: "#ccd0da",
          // gray: "#9ca0b0",
          // darkgray: "#6c6f85",
          // dark: "#4c4f69",
          // secondary: "#1e66f5",
          // tertiary: "#40a02b",
          // highlight: "rgba(92, 95, 119, 0.15)",
          // textHighlight: "rgba(254, 100, 11, 0.2)",
        },
        darkMode: {
          light: "#1e1e2e", // base
          lightgray: "#313244", // surface 0
          gray: "#6c7086", // overlay 0
          darkgray: "#a6adc8", // subtext 0
          dark: "#cdd6f4", // text
          secondary: "#89b4fa", // blue
          tertiary: "#a6e3a1", // green
          highlight: "rgba(186, 194, 222, 0.15)", // subtext 1
          textHighlight: "rgba(250, 179, 135, 0.2)", // peach
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "catppuccin-mocha",  // "github-light",
          dark: "catppuccin-mocha",  // "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest"
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
