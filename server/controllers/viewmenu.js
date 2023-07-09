const mysql = require('mysql');
const menuModel = require("../models/menumodel")
const SQLConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dispensaryinfo",
});
let link = "";
module.exports = {
  postChoice: async (req, res) => {
    link = req.body.link;
    res.json({ message: "HI" });
  },

  getMenu: async (req, res) => {
    SQLConnection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
      } else {
        const query = 'SELECT strain_name, link, form, subform, price, THC, qty, sativa_indica FROM menus WHERE link = ?';
        console.log('Connected to MySQL - Scraping for menu');
        console.log(link)
        SQLConnection.query(query, [link], (err, results) => {
          if(err) {
            console.log(err)
          } else {
            res.json ({menu: results});
          }
        })
      }
    });
  },
};
