const config = require("./src/assets/content/data/config.json");
const infoData = require("./src/assets/content/data/info.json");

module.exports = {
  siteName: config.title,
  //need this for forestry preview docker image
  host: process.env.HOSTNAME,
  port: 8080,
  //----------------
  //make editable config & data files available to graphql
  metaData: {
    siteName: config.title,
    siteDescription: config.description,
    infoData: infoData
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Filter",
        baseDir: "./src/assets/content/",
        path: "filter/**/*.md",
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"]
        }
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Focus",
        baseDir: "./src/assets/content/",
        path: "focus/**/*.md",
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"]
        }
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Forum",
        baseDir: "./src/assets/content/",
        path: "forum/**/*.md",
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"]
        }
      }
    }
  ]
};
