const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/cloudinary");
const secret = "sdsjadjasdsjahdjdh";
const createPost = (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  console.log(req.cookies);
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, content } = req.body;
    //console.log(req.files);
    const imagePath = req.files?.image[0]?.path;
    //console.log(imagePath);
    const imageUpload = await uploadOnCloudinary(imagePath);
    //console.log(imageUpload);
    const postDoc = await Post.create({
      title,
      content,
      author: info.id,
      image: imageUpload.url,
    });
    res.json(postDoc);
    console.log(title, content, imageUpload.url);
  });
};
const allPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["name"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
  //console.log(posts);
};
const mainPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["name"]);
  console.log(post);
  res.json(post);
};
const editPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["name"]);
  console.log(post);
  res.json(post);
};
const updatePost = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(400).json("you are not the author");
    }
    const { title, content, id } = req.body;
    //console.log(req.files);
    const imagePath = req.files?.image[0]?.path;
    //console.log(imagePath);
    const imageUpload = await uploadOnCloudinary(imagePath);
    //console.log(imageUpload);
    const post = await Post.findById(id);
    const user = JSON.stringify(post.author) === JSON.stringify(info.id);
    if (!user) return res.status(400).json("you are not the author");
    await post.updateOne({
      title,
      content,
      image: imageUpload.url,
    });
    res.json(post);
  });
};
module.exports = { createPost, allPosts, mainPost, editPost, updatePost };
