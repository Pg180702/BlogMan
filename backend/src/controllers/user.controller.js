const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "sdsjadjasdsjahdjdh";
const registerUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    const user = await User.create({ username, name, email, password });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  const passOk = await bcrypt.compare(password, userDoc.password);
  if (passOk) {
    // logged in
    //return res.status(200).json(userDoc);
    const options = {
      httpOnly: true,
      secure: true,
    };
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      req.cookies.jwt = token;
      console.log(token);
      console.log(req.cookies.jwt);
      return res.status(200).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
};
const profileView = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};
const logout = async (req, res) => {
  res.cookie("token", "").json("ok");
};

module.exports = { registerUser, loginUser, profileView, logout };
