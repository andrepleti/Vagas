'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.get = async() => {
    const res = await Post
        .find({});
    return res;
}

exports.getById = async(id) => {
    const res = await Post
        .findById(id, 'title text Category').populate('Category', 'description');
        
    var result = {};
    result.id = res.id;
    result.title = res.title;
    result.text = res.text;
    result.category = res.Category.id;
    
    return result;
}

exports.getByCategory = async(Category) => {
    const res = await Post.find({
        Category
    });
    return res;
}

exports.getByTitle = async(data) => {
        const res = await Post.find({ "title": { "$regex": data.title }}, 'id title text Category')
        .populate('Category' , 'id description');
        return res;
}

exports.create = async(data) => {
    var post = new Post(data);
    await post.save();
}

exports.update = async(data) => {
    await Post
        .findByIdAndUpdate(data.id, {
            $set: {
                title: data.title,
                text: data.text,
                Category: data.Category
            }
        })
}

exports.delete = async(id) => {
    await Post
        .findByIdAndRemove(id);
}