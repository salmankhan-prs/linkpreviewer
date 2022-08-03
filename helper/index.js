//function to send back response to client
const createResponse = (res, output, tagsInformation) => {
  if (!output) {
    return res.status(400).json({ metadata: null });
  }
  return res.status(200).json({ metadata: output, tagsInformation });
};
module.exports = createResponse;
