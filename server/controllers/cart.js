const mongoose = require("mongoose");
const userModel = require("../models/User.js")

module.exports = {
  postCartItem: async (req, res) => {
    console.log(req.body);
    
    await userModel.findOneAndUpdate({_id:'647a0f798b1968941055cf30', cart:[req.body]})

    res.json({ message: "HI" });
  },

//   getMenu: async (req, res) => {
//     const dispoMenu = await userModel.findOne({
//       link:link,
//     })
//     res.json({ scrapedMenuText: dispoMenu });
//   },
};
