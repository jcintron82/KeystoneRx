const mongoose = require("mongoose");
const userModel = require("../models/User.js")

module.exports = {
  postCartItem: async (req, res) => {
    await userModel.findOneAndUpdate({_id:'647a0f798b1968941055cf30'},{
        $push: {cart:[req.body]}
    });
    res.json({ message: "HI" });
  },

  getCart: async (req, res) => {
    const dispoMenu = await userModel.findOne({
      _id: localsName,
    });
    res.json({ scrapedMenuText: dispoMenu });
  },
};
