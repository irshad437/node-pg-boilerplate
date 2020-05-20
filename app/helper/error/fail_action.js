var Boom = require("./boom_helper");

module.exports = async (req, h, err) => {
  if (err) throw Boom.badRequest("ROUTE_ERROR:" + err.details[0].message);
};
