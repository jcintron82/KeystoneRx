const mongoose = require("mongoose");
const userModel = require("../models/User.js")

module.exports = {
  postCartItem: async (req, res) => {
    console.log(req.body)
    await userModel.findOneAndUpdate({_id:'647a0f798b1968941055cf30'},{
        $push: {cart:[req.body]}
    });
    res.json({ message: "HI" });
  },

  getCart: async (req, res) => {
    console.log(req.body)
    const userCart = await userModel.findOne({
      _id: '647a0f798b1968941055cf30'
    });
    res.json({ userCart: userCart });
  },
};
