const express = require("express");
const portfolicontroller = express.Router();
const Portfolio = require("../models/portfolio");
const commonUtility = require("../models/commonUtility");
const portfolio = require("../models/portfolio");

require("dotenv/config");

portfolicontroller.get("/", async (req, res) => {

  // //Add Exchange to all portfolio
  // await Portfolio.update({},
  //   { $set: { exchange: 'NSE' } },
  //   { upsert: true, multi: true },
  //   function (err) {  });

  const data = await Portfolio.find();
  res.json(data);
});

portfolicontroller.post("/find", async (req, res) => {
  var { fieldName, fieldValue } = req.body;
  var result = {};
  if (fieldName && fieldValue) {
    result = await Portfolio.find({ [fieldName]: fieldValue }).sort({ createdon: -1 });
  } else {
    result = await Portfolio.find().sort({ createdon: -1 });
  }
  res.send(result);
});

portfolicontroller.post("/save", async (req, res) => {

  if (process.env.ISDEMO == 'false') {
  const { _id, name, exchange, description, createdon, updateui } = req.body;

  var _portfolioObject = {};
  if (_id) {
    _portfolioObject = await commonUtility.GetPortfolioById(_id);
    _portfolioObject.name = name;
    _portfolioObject.exchange = exchange;
    _portfolioObject.description = description;
    _portfolioObject.modifiedon = new Date();
  } else {
    _portfolioObject = new Portfolio({ name, exchange, description, createdon });
  }
  try {
    const result = await _portfolioObject.save();
    if (updateui) {
      const _allportfolio = await Portfolio.find();
      res.send(_allportfolio);
    } else {
      res.send(result);
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
}else{
  res.status(401);
  res.send({"error": "Cant edit portfolio on demo mode."})
}


});


portfolicontroller.post("/delete", async (req, res) => {
  var pid = req.body._id;
  if (pid) {
    if (process.env.ISDEMO == 'false') {
      commonUtility.DeleteStrategyUsingPortfolioID(pid);
      Portfolio.deleteOne({ _id: pid }, (err, doc) => {
        res.send(doc);
      });
    }else{
      res.status(401);
      res.send({"error": "Cant delete portfolio on demo mode."})
    }
  }
});

module.exports = portfolicontroller;
