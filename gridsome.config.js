const config = require("./content/data/config.json");
const infoData = require("./content/data/info.json");

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
        typeName: "Post",
        baseDir: "./content/",
        path: "**/*.md",
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"]
        }
      }
    },
    {
      use: '@zefman/gridsome-source-instagram',
      options: {
        username: 'howtolivetogether',
        typeName: 'InstagramPhoto'
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Filter",
        baseDir: "./content/",
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
        baseDir: "./content/",
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
        baseDir: "./content/",
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
