const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

module.exports = router;
