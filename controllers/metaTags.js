const createResponse = require("../helper");
const metaDataParser = require("../utils/parser");
/***
 * fuction to Generate meta tags for the given website
 *
 */
const getMetaData = async (req, res) => {
  try {
    //extract the url
    let url = req.query.url;
    //check the url is present or not
    if (!url) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    //get the url is prefixed with http or not if not Add
    url = url.indexOf("://") === -1 ? "http://" + url : url;

    const isUrlValid =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
        url
      );
    //final check whether the url is valid or not
    if (!isUrlValid) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    if (url && isUrlValid) {
      //constrct the url
      const { hostname } = new URL(url);

      let output;
      //pass the url to the metaDataParser  fun to get RAW Metadat
      const metadata = await metaDataParser(url);
      //if the metadat is not received return null response
      if (!metadata) {
        return createResponse(res, null);
      }
      //extract from the metadat Object
      const { images, og, meta, icons } = metadata;

      /*first check image from meta object if it  is present then assign it
       *  if  not  check in OG object if it  is present then assign it
       *  if not check in Icon sarray if it  is present then assign it
       * if not check in images array [images used in particulry website ]
       * if it  is present then assign it if not assign null */

      let image = meta.image
        ? meta.image
        : og.image
        ? og.image
        : icons
        ? icons[0]
        : images.length > 0
        ? images[0].src
        : null;
      /**
       * first check with meta description if it  is present then assign it
       * if Not assign og description
       */
      const description = meta.description
        ? meta.description
        : og.description
        ? og.description
        : null;
      const title = (meta.title ? meta.title : og.title) || "";
      const siteName = og.site_name || "";
      //create  an object with all the elements as output
      output = {
        title,
        description,
        image,
        siteName,
        hostname,
      };
      //send the response
      createResponse(res, output);
    }
  } catch (error) {
    //if any error
    console.log(error);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};

module.exports = getMetaData;
