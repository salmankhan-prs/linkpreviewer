const axios = require("axios");
//node-html-parser is npm libary for genrating dom tree from given html for element query support .
const { parse } = require("node-html-parser");

//used to get the meta tags  values
const readMT = (el, name) => {
  var prop = el.getAttribute("name") || el.getAttribute("property");
  return prop == name ? el.getAttribute("content") : null;
};

const metaDataParser = async (url) => {
  //check the url is valid or not like [http or https present ,ends with .com or .in ,.io  ...so on]
  if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(url)) return {};
  //get the html page
  const { data } = await axios(url);
  //pass the the html page toParser to genrate Dom tree
  const $ = parse(data);

  /**
   * OG[open graph] mostly used for sharing the urls in social media
   * meta tags
   * creating All th OG tags as object and all the meta Tags as an object
   */
  const og = {},
    meta = {},
    images = [],
    icons = [];
  //Get the title
  const title = $.querySelector("title");
  if (title) meta.title = title.text;

  const canonical = $.querySelector("link[rel=canonical]");
  if (canonical) {
    meta.url = canonical.getAttribute("href");
  }
  //if image is not present on OG tags or meta tags then we will use website icon as Image If It exists
  const iconImages = $.querySelector("link[rel=icon]");
  if (iconImages) {
    let urlString = iconImages.getAttribute("href");
    //check for the icon image has  Relative url if it is Relative url make it has absolute Url
    if (
      urlString.indexOf("http://") === -1 ||
      urlString.indexOf("https://") === -1
    ) {
      urlString = url + urlString;

      icons.push(urlString);
    }
  }

  //Grab all the meta Tags
  const metas = $.querySelectorAll("meta");

  for (let i = 0; i < metas.length; i++) {
    const el = metas[i];
    //Get the each meta Tags value
    ["title", "description", "image"].forEach((s) => {
      const val = readMT(el, s);
      if (val) meta[s] = val;
    });

    //Get the each OG Tags value
    [
      "og:title",
      "og:description",
      "og:image",
      "og:url",
      "og:site_name",
      "og:type",
    ].forEach((s) => {
      const val = readMT(el, s);
      //if the conetent is there in tags then save it in OG Object
      if (val) og[s.split(":")[1]] = val;
    });
  }

  // if image is not present in Meta tags then we will use images used in website If Present
  $.querySelectorAll("img").forEach((el) => {
    let src = el.getAttribute("src");
    if (src) {
      src = new URL(src, url).href;
      images.push({ src });
    }
  });

  return { meta, og, images, icons };
};

module.exports = metaDataParser;
