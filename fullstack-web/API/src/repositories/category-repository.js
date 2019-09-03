'use strict';

const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.get = async() => {
    const res = await Category
        .find({});
    return res;
}

exports.getById = async(id) => {
    const res = await Category
        .findById(id);
    return res;
}

exports.getByDescription = async(data) => {
    const res = await Category.find({ "description": { "$regex": data.description }}, 'id description');
    return res;
}

exports.create = async(data) => {
    var category = new Category(data);
    await category.save();
}

exports.update = async(data) => {
    await Category
        .findByIdAndUpdate(data.id, {
            $set: {
                description: data.description
            }
        })
}

exports.delete = async(id) => {
    await Category
        .findByIdAndRemove(id);
}