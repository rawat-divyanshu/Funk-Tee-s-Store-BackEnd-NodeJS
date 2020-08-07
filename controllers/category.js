const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO CATEGORIES FOUND",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "ERROR IN CREATING CATEGORY",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO CATEGORIES FOUND",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Unauthorized Update",
        });
      }
      res.json(category);
    }
  );
};

exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete({ _id: req.category._id }, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "ERROR IN DELETING CATEGORY",
      });
    }
    res.json({
      message: "CATEGORY DELETED SUCCESSFULLY",
    });
  });
};
