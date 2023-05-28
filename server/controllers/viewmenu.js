const mongoose = require("mongoose");
const menuModel = require("../models/menumodel")

let link = "";
module.exports = {
  postChoice: async (req, res) => {
    console.log(req.body);
    link = req.body.link;
    res.json({ message: "HI" });
  },

  getMenu: async (req, res) => {
    const dispoMenu = await menuModel.findOne({
      link:link,
    })
    res.json({ scrapedMenuText: dispoMenu });
  },
};
